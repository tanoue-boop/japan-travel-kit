import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import styles from "../../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import {
  hokkaidoPrivateCarCharterNiseko,
  japanWinterStayAreas,
  jrHokkaidoRailPass,
  klookEsim,
  newChitoseAirportTransfers,
  nisekoHirafuEnglishSkiLesson,
  nisekoHirafuLiftPassBusTour,
  nisekoResortShuttleBus,
  nisekoRusutsuKiroroPrivateLesson,
  nisekoSkiHotSpringTourFromSapporo,
  nisekoSkiSnowboardRental,
  noboribetsuToyaNisekoDayTour,
  rhythmNisekoPrivateSkiLesson,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
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

// Mirrors the English guide (pages/guides/attractions/niseko-ski-tours.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/niseko-ski-tours";
const trail: Crumb[] = [...TRAIL_BASE[LOCALE], { label: "二世谷滑雪" }];

const OWN_ISO = "2026-11-01";
const OWN = dateLabel(OWN_ISO, LOCALE);

const SEASON_ISO = "2026-11-06";
const SEASON = dateLabel(SEASON_ISO, LOCALE);

const LESSON_PEAK = "2026 年 12 月 14 日到 2027 年 1 月 3 日，以及 2027 年 2 月 6 到 12 日";

const AIRPORT_BUS = "2.5 小時";
const AIRPORT_BUS_FARE = "¥6,000";
const AIRPORT_TRAIN = "3 小時";
const AIRPORT_TRAIN_FARE = "¥6,200";
const SEASON_OPEN = "2026 年 11 月 28 日";
const PEAK_FROM = "2026 年 12 月 24 日";
const PEAK_TO = "2027 年 2 月 28 日";
const PEAK_DAY = "¥13,500";
const REGULAR_DAY = "¥12,600";
const EARLY_DAY = "¥8,800";

const accessRows = [
  {
    option: "新千歲機場直達巴士",
    time: AIRPORT_BUS,
    cost: AIRPORT_BUS_FARE,
    booking: "需預約",
    note: `第一次去的預設選擇，也是能放雪具的方式。數字出自 Niseko United。因為要預約，所以要在出發前決定，沒有現場購票的版本。查核日：${OWN}。`,
  },
  {
    option: "電車加路線巴士",
    time: AIRPORT_TRAIN,
    cost: AIRPORT_TRAIN_FARE,
    booking: "不需預約",
    note: "比巴士慢半小時、貴 ¥200，但這是唯一不用預約就能去的方式。不選它的原因是行李：帶著雪具在冬天的月台轉車，沒有人會事先想到。",
  },
  {
    option: "季節滑雪巴士",
    time: "3 到 3.5 小時",
    cost: AIRPORT_BUS_FARE,
    booking: "需預約；僅 12 月至 3 月",
    note: "票價與直達巴士相同，最多多一小時，因為沿途停靠度假村。住宿剛好在路線上才有用。",
  },
  {
    option: "租車",
    time: "2 小時",
    cost: "每天 ¥8,000 起",
    booking: "需預約",
    note: "官方列出最快的方式，但有條件：這是北海道冬季道路，沒開過冰雪路的話，兩小時這個數字沒有意義。",
  },
  {
    option: "包車接送",
    time: "2 小時",
    cost: "¥25,000 起",
    booking: "需預約",
    note: "以車計價而不是以人計價，所以對家庭或四人以上團體很合理。也是唯一配合班機實際抵達時間出發的方式。",
  },
];

const seasonRows = [
  { what: "四區全部開放", detail: `${SEASON_OPEN}` },
  { what: "Grand HIRAFU 與 Annupuri 關閉", detail: "2027 年 5 月 5 日" },
  { what: "Hanazono 關閉", detail: "2027 年 4 月 11 日" },
  { what: "Niseko Village 關閉", detail: "2027 年 4 月 4 日" },
  { what: "夜間滑雪", detail: "2026 年 12 月 12 日到 2027 年 3 月 22 日" },
  { what: "早季", detail: "2026 年 11 月 28 日到 12 月 11 日，這段期間不在線上販售" },
  { what: "一般季", detail: "2026 年 12 月 12 到 23 日，以及 2027 年 3 月 1 到 22 日" },
  { what: "旺季", detail: `${PEAK_FROM} 到 ${PEAK_TO}` },
  { what: "春季", detail: "2027 年 3 月 23 日到 4 月 4 日" },
  { what: "末季", detail: "2027 年 4 月 5 日到 5 月 5 日" },
];

const passRows = [
  { period: "早季（2026/11/28–12/11）", adult: EARLY_DAY, youth: "¥7,500", child: "¥5,300", senior: "¥7,500" },
  { period: "一般季（2026/12/12–23、2027/3/1–22）", adult: REGULAR_DAY, youth: "¥10,700", child: "¥7,600", senior: "¥10,700" },
  { period: `旺季（${PEAK_FROM}–${PEAK_TO}）`, adult: PEAK_DAY, youth: "¥11,500", child: "¥8,100", senior: "¥11,500" },
  { period: "春季（2027/3/23–4/4）", adult: EARLY_DAY, youth: "¥7,500", child: "¥5,300", senior: "¥7,500" },
  { period: "末季（2027/4/5–5/5）", adult: "¥6,300", youth: "¥5,400", child: "¥3,800", senior: "¥5,400" },
];

const areaRows = [
  {
    area: "Grand HIRAFU",
    what: "四區中最大，也有村落：餐廳、酒吧、租借店和度假村滑雪學校都在這裡",
    stay: "預設的住宿區，也是唯一晚上出門用走的、不用搭接駁車的區域",
    note: "Grand Hirafu 官方數字：22 條雪道（初級 9、中級 6、高級 7），2 座纜車與 7 座吊椅，垂直落差 940 公尺（山頂 1,200 公尺、山腳 260 公尺），最長雪道 5,300 公尺。",
  },
  {
    area: "Hanazono",
    what: "山上最安靜的一側，也是度假村直營 Niseko International Snowsports School 的所在地",
    stay: "適合家庭或新手：初級雪道人少，課程從這裡開始",
    note: "官方的教練課規定也出自這裡：旺季只能預約全日課程。想在聖誕節上半日課之前，請先看清楚。",
  },
  {
    area: "Niseko Village",
    what: "以飯店為主的區域，纜車就在住宿門口，不用隔一條街",
    stay: "適合重視 ski-in, ski-out 便利、晚上不外出的旅程",
    note: "四區中最早關閉：2027 年 4 月 4 日，比 Grand HIRAFU 和 Annupuri 早一個月。訂晚季時請確認。",
  },
  {
    area: "Annupuri",
    what: "四區中雪道最寬、最平緩，位於相連區域最西側",
    stay: "安靜的選擇，適合想要空間而不是夜生活的中級滑雪者",
    note: "與 Grand HIRAFU 一起營業到 2027 年 5 月 5 日，所以適合春季或黃金週。",
  },
];

const monthRows = [
  {
    month: "12 月",
    snow: "最近一個完整雪季 Grand Hirafu 累積 386 公分",
    crowds: "假期前纜車人少；旺季前的住宿價",
    verdict: "Niseko United 稱這是在地人的月份。早季是整個冬天最便宜的 ¥8,800，但 12 月 12 日前不在線上販售，聖誕夜起就是旺季價。",
  },
  {
    month: "1 月",
    snow: "累積 620 公分，是該季雪量遠超其他月份的月份",
    crowds: "人多，度假村自己也用「擁擠」形容",
    verdict: `「Japanuary」，Niseko United 說這裡是「全世界降雪最穩定的地方之一」。代價是整個月都是旺季價，每天 ${PEAK_DAY}。`,
  },
  {
    month: "2 月",
    snow: "累積 263 公分，山頂積雪達當季最深的 400 公分",
    crowds: "人多，農曆新年前後最多，熱門餐廳常客滿",
    verdict: "粉雪持續，被雪埋住的村落最上相。到 2 月 28 日都是旺季價，雪祭那週札幌也客滿。",
  },
  {
    month: "3 月",
    snow: "累積 75 公分，但山頂仍有 380 公分",
    crowds: "第一週後人變少",
    verdict: "最划算的月份，度假村自己也這麼說：晴天較多、氣溫較暖、教練課與租借有春季優惠，還是「最適合野雪探索的月份」。3 月 22 日前是一般價，之後春季價 ¥8,800。",
  },
  {
    month: "4 月到 5 月初",
    snow: "度假村資料：山頂積雪 4 月 315 公分、5 月 170 公分",
    crowds: "黃金週以外人少",
    verdict: "全年最便宜的雪票，4 月 5 日起每天 ¥6,300。這個時候只有 Grand HIRAFU 和 Annupuri 開放，Niseko Village 4 月 4 日、Hanazono 4 月 11 日關閉。",
  },
];

const faqItems = [
  {
    q: "新千歲機場怎麼到二世谷？",
    a: `Niseko United 列出五種方式，預設是直達巴士：依其交通頁（查核日：${OWN}）為 ${AIRPORT_BUS}、${AIRPORT_BUS_FARE}，需預約。其他選擇同一來源：電車加路線巴士 ${AIRPORT_TRAIN}、${AIRPORT_TRAIN_FARE}，不需預約；季節滑雪巴士 3 到 3.5 小時、${AIRPORT_BUS_FARE}，僅 12 月至 3 月；租車 2 小時，每天 ¥8,000 起；包車 2 小時，¥25,000 起。多數人由兩件事決定。第一是行李：巴士商品可放雪具加每人一件行李，1 月在北海道月台帶雪具轉車沒有人會事先想到。第二是預約：只有電車加巴士不用預約，其他都要在出發前決定。自駕的話，兩小時的前提是你習慣冰雪路。`,
  },
  {
    q: "二世谷什麼時候滑雪最好？",
    a: `要雪選 1 月，要划算選 3 月，要安靜選 12 月。Grand Hirafu 最近完整雪季在約 850 公尺的白樺雪道測得的累積降雪（查核日：${OWN}）為 12 月 386 公分、1 月 620 公分、2 月 263 公分、3 月 75 公分，1 月遙遙領先，Niseko United 形容這裡是「全世界降雪最穩定的地方之一」。代價是人潮和旺季價：整個 1 月都在 ${PEAK_FROM} 到 ${PEAK_TO} 的旺季區間，每天 ${PEAK_DAY}。2 月粉雪持續，加上農曆新年人潮，山頂積雪達當季最深的 400 公分。3 月是度假村主打划算的月份：晴天多、氣溫暖、教練課與租借有春季優惠，也是「最適合野雪探索的月份」，山頂仍有 380 公分，3 月 23 日起雪票降到 ${EARLY_DAY}。假期前的 12 月是在地人的選擇：纜車人少、旺季前價格，雪票是冬季最低的 ${EARLY_DAY}。`,
  },
  {
    q: "二世谷滑雪課要事先預約嗎？",
    a: `要，而且這不只是建議，而是官方規定。度假村直營的 Niseko International Snowsports School 在官網寫明（查核日：${SEASON}）「旺季僅可預約全日課程」，其教學旺季是 ${LESSON_PEAK}。這和纜車票的旺季不同：1 月下旬的半日課可以預約，12 月 20 日或 2 月 8 日的半日課只能現場詢問。如果那幾週你或孩子只適合上半天，請訂全日提早結束，或改日期。學校暫定 2026 年 11 月 28 日到 2027 年 4 月 11 日開課，有團體、私人和客製課程，2026-27 已開放預約。經銷商的私人課是另一批名額，可用海外信用卡付款，度假村學校額滿時很有用。`,
  },
  {
    q: "二世谷適合新手嗎？",
    a: `適合，比粉雪名聲看起來更適合。依 Grand Hirafu 官方雪道資料（查核日：${OWN}），22 條雪道中有 9 條是初級（中級 6、高級 7），四區中最寬最平緩的雪道在西側的 Annupuri。對新手有利的有兩點：通用的 All Mountain Pass 讓你進步時不會被困在一座山上；度假村滑雪學校在最安靜的 Hanazono，學習的雪道上快速滑行的人較少。不利的也有兩點：上面的預約規定是真正的問題，學校旺季 ${LESSON_PEAK} 只能預約全日課，對想謹慎上半天的新手不方便；旺季一日票成人 ${PEAK_DAY}，1 月的新手付的錢和高手滑全山一樣，卻只用九條初級道。這是選 12 月或 3 月的理由。`,
  },
  {
    q: "二世谷住哪裡好？",
    a: `沒有特別理由就選 Grand HIRAFU。它是四區中最大、唯一有村落的區域，餐廳、酒吧、租借店和晚上的活動都用走的。官方數字：22 條雪道、2 座纜車與 7 座吊椅、垂直落差 940 公尺（山頂 1,200 公尺、山腳 260 公尺）、最長雪道 5,300 公尺。其他三區各有明確的好處。Hanazono 最安靜，有度假村滑雪學校，適合家庭和新手。Niseko Village 以飯店為主，真正 ski-in, ski-out，適合晚上不外出的旅程。Annupuri 雪道最寬最緩，人也最少。有個常被忽略的日期：四區不是一起關閉。Niseko Village 2027 年 4 月 4 日、Hanazono 4 月 11 日關閉，Grand HIRAFU 和 Annupuri 到 5 月 5 日，所以晚季或黃金週只有兩區開放。所有日期出自 Niseko United，查核日：${OWN}。`,
  },
  {
    q: "二世谷纜車票多少錢？",
    a: `涵蓋四區的 All Mountain Pass 一日票，成人旺季 ${PEAK_DAY}、一般季 ${REGULAR_DAY}、早季或春季 ${EARLY_DAY}、末季 ¥6,300，均為 Niseko United 官方價，查核日：${OWN}。4 到 12 歲兒童旺季 ¥8,100、一般季 ¥7,600、早季或春季 ¥5,300、末季 ¥3,800。13 到 15 歲青少年和 65 歲以上銀髮族價格相同：旺季 ¥11,500、一般季 ¥10,700、早季或春季 ¥7,500、末季 ¥5,400。規劃時要看的是期間而不是價格：旺季 ${PEAK_FROM} 到 ${PEAK_TO}，包含聖誕、新年、整個 1 月和整個 2 月。還有一個實務細節：2026 年 11 月 28 日到 12 月 11 日的早季票不在線上販售，所以冬季最便宜的一週要到櫃台購買。`,
  },
  {
    q: "二世谷要跟團，還是可以自己去？",
    a: `完全看你住哪裡，這正是這個搜尋詞沒說出來的問題。住在二世谷就不用跟團：訂好機場巴士、教練課、裝備和雪票，日子自然過得去。住在札幌的話（不少人如此，因為飯店和餐廳都在市區），導覽一日遊是滑二世谷唯一合理的方式，因為依 Niseko United 的數字，從機場這側單程要 2 到 3.5 小時，自己安排的話大部分白天都花在巴士上。這就是札幌出發的雪票加巴士行程的用途：Grand Hirafu 固定六小時，交通和雪票一次訂好。第三種情況是同行者有人滑、有人不滑，這時包車最合適，因為是以車計價而不是以滑雪人數計價。`,
  },
  {
    q: "可以從札幌當天來回二世谷嗎？",
    a: `可以，但要是預訂好的行程，不能臨時湊。限制在距離：Niseko United 的交通頁寫新千歲到二世谷預約巴士 ${AIRPORT_BUS}、電車加路線巴士 ${AIRPORT_TRAIN}，札幌也在同一側，所以自己安排的一日遊大部分白天都在路上。解決這問題的商品是把巴士包進價格、販售固定的滑雪時段，通常是 Grand Hirafu 約六小時含雪票，在札幌市區多個地點上車。想在城市旅程中滑上一天，這最合適。想滑兩天的話，算法就變了，含住宿的兩三天行程不再是奢侈。如果山因強風關閉（這會發生，上方纜車尤其常見），走同一巴士網的登別與洞爺湖一日遊就是備案。`,
  },
  {
    q: "二世谷有夜間滑雪嗎？",
    a: `有，依 Niseko United 日期為 2026 年 12 月 12 日到 2027 年 3 月 22 日（查核日：${OWN}）。這是選二世谷而不是本州雪場的實際理由之一：在白天最短的緯度，燈光雪道延長了冬天短短的一天，而且正好是雪最多的那幾週。有兩點要注意。日期不涵蓋整季：${SEASON_OPEN} 開幕後的前兩週沒有夜滑，3 月 22 日後的春季和末季也沒有，如果選了便宜的 4 月就要留意。夜間營運也和這裡的一切一樣看天氣：上方纜車因風暫停，暴風雪的夜晚燈就不開。請看度假村每日的營運資訊，不要只看攻略，包括這一篇。`,
  },
  {
    q: "二世谷要玩幾天？",
    a: `為了雪而來的話至少三晚，原因在交通而不是山。依 Niseko United 的數字，機場單程預約巴士 ${AIRPORT_BUS}，兩晚的旅程有相當部分在車上，一晚不值得。三晚有兩個完整的滑雪日，加上抵達當天下午或離開當天早上。五到七晚才開始值回票價，因為二世谷最有名的穩定、反覆的粉雪是統計上的論點，不是一天的事，Grand Hirafu 1 月 620 公分代表的是很多個早晨。反過來說，如果旅程以城市為主、只想滑一天，就不要把據點搬到二世谷，訂札幌出發的導覽一日遊、留在市區飯店就好。`,
  },
];

const nisekoSameTrip: KlookTripPrepItem[] = [
  {
    label: "Klook 日本 eSIM",
    ctaLabel: "在 Klook 查看 eSIM →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "二世谷的一天由天氣決定：上方纜車因風暫停，暴風雪中各區關閉又重開，這些公告都傳到手機，不會出現在山腳的公告欄。",
  },
  {
    label: "二世谷接駁巴士（新千歲機場與札幌）",
    ctaLabel: "查看二世谷接駁 →",
    url: klookFor(nisekoResortShuttleBus.url, LOCALE),
    why: "依 Niseko United 的數字，新千歲直達巴士 2.5 小時、¥6,000，電車加巴士 3 小時、¥6,200。這款商品可放雪具加每人一件行李，並要求國內線抵達後 45 分鐘、國際線抵達後 90 分鐘，請配合班機。",
  },
  {
    label: "JR 北海道周遊券",
    ctaLabel: "查看 JR 北海道周遊券 →",
    url: klookFor(jrHokkaidoRailPass.url, LOCALE),
    why: "只有二世谷是環島長途旅程的一站才需要。依 JR 北海道頁面 5 天 ¥22,000 起，不含巴士，所以機場到度假村來回的旅程不用買。",
  },
  {
    label: "二世谷 Grand Hirafu 英語滑雪與單板課（4 或 6 小時）",
    ctaLabel: "查看二世谷教練課 →",
    url: klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE),
    why: `這項預訂背後有官方規定：度假村學校在其旺季 ${LESSON_PEAK} 只接受全日課預約，所以那幾週的半日課要透過經銷商或現場詢問。`,
  },
  {
    label: "二世谷雪具租借（Rhythm，比羅夫）",
    ctaLabel: "查看二世谷雪具租借 →",
    url: klookFor(nisekoSkiSnowboardRental.url, LOCALE),
    why: "出發前先預約裝備，在纜車腳下的比羅夫取用，差別在於第一個早晨是在滑雪還是在排隊。",
  },
  {
    label: "二世谷飯店",
    ctaLabel: "在 Klook 查看二世谷飯店 →",
    url: klookFor(japanWinterStayAreas[7].url, LOCALE),
    why: "決定其他一切的預訂。住在四區中的哪一區，決定纜車是走路還是搭接駁車，Niseko United 也說旺季假期很早就訂滿。",
  },
];

const TITLE = "二世谷滑雪（2027）：接送、教練課與四大區域";
const DESC =
  "二世谷滑雪與交通：新千歲機場預約巴士 2.5 小時，四大相連雪場，旺季纜車票 ¥13,500，附 2026-27 官方日期。";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function NisekoSkiToursPage({ updated }: { updated: PageUpdated }) {
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
二世谷滑雪：<br />交通、教練課與四大區域
</h1>
          <p className={styles.heroSubtitle}>
四座相連雪場，新千歲預約巴士 {AIRPORT_BUS}，還有一條常讓人措手不及的官方期限：旺季教練課規定。
</p>
          <div className={styles.heroBadges}>
            {[`更新於 ${monthLabel(updated.iso, LOCALE)}`, "2026-27 官方日期", "All Mountain Pass 票價", "旺季教練課規定，附出處"].map((t) => (
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
          heading={"2026-27 冬季該訂哪些二世谷滑雪行程？"}
          checkedIso={SEASON_ISO}
          deadline={
            <>
聖誕或新年期間，請在纜車開放的 11 月 28 日前訂好教練課和機場巴士：學校的教學旺季從 12 月 14 日開始，期間只能預約全日課。1、2 月的話，請在 12 月 31 日前訂好，趕在學校第二個旺季 2 月 6 到 12 日之前。
</>
          }
          tours={[
            {
              title: "札幌出發二世谷 Grand Hirafu 滑雪行程（6 小時雪票加巴士）",
              url: klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE),
              price: null,
              duration: "當天來回，6 小時雪票",
              departs: "札幌市區 10 個上車點",
            },
            {
              title: "二世谷 Grand Hirafu 英語滑雪與單板課（4 或 6 小時）",
              url: klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE),
              price: null,
              duration: "4 或 6 小時",
              departs: "Niseko Tokyu Grand Hirafu",
            },
            {
              title: "札幌出發登別、洞爺湖與二世谷一日遊",
              url: klookFor(noboribetsuToyaNisekoDayTour.url, LOCALE),
              price: null,
              duration: "約 10 小時",
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
從新千歲出發
</p>
                <p className={styles.verdictStatValue}>
預約巴士 {AIRPORT_BUS}
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
雪季
</p>
                <p className={styles.verdictStatValue}>
2026/11/28 – 2027/5/5
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
一日雪票
</p>
                <p className={styles.verdictStatValue}>
旺季 {PEAK_DAY}／早季 {EARLY_DAY}
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
要提早訂嗎？
</p>
                <p className={styles.verdictStatValue}>
教練課和接送要
</p>
              </div>
            </div>
                        <p className={styles.verdictText}>
<strong>二世谷滑雪</strong>要先從交通想起，因為這是最長的部分：Niseko United 的交通頁寫明<strong>新千歲機場到二世谷，預約直達巴士 {AIRPORT_BUS}、{AIRPORT_BUS_FARE}</strong>，不需預約的電車加路線巴士 {AIRPORT_TRAIN}、{AIRPORT_TRAIN_FARE}，租車或包車 2 小時。抵達的是<strong>一張雪票通用的四座相連雪場</strong>：<strong>Grand HIRAFU</strong>（最大，有村落）、<strong>Hanazono</strong>（最安靜，有度假村滑雪學校）、<strong>Niseko Village</strong>（ski-in, ski-out 飯店）和 <strong>Annupuri</strong>（最寬最緩）。四區都在 <strong>{SEASON_OPEN}</strong>開放，Grand HIRAFU 和 Annupuri 營業到 <strong>2027 年 5 月 5 日</strong>。All Mountain Pass 一日票在 <strong>{PEAK_FROM} 到 {PEAK_TO}</strong>的旺季是 <strong>{PEAK_DAY}</strong>，早季或春季 <strong>{EARLY_DAY}</strong>。唯一要預約而不是當天買的是<strong>教練課</strong>：度假村學校表示其旺季 {LESSON_PEAK} 只能預約全日課。所有數字均出自業者官方，{SEASON} 重新查核。
</p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
札幌出發二世谷一日 →
</KlookLink>
              <KlookLink href={klookFor(nisekoResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
二世谷機場接駁 →
</KlookLink>
            </div>
          </div>
        </div>

                <KlookTripPrep
          label={"同一趟旅程要訂的"}
          heading={"二世谷之旅實際要訂什麼"}
          intro={"先訂網路和機場巴士，因為這份清單上其他項目當天出錯都不致命。Niseko United 的交通頁標出了差距：預約巴士 2.5 小時，不預約的電車加巴士 3 小時。"}
          items={nisekoSameTrip}
        />

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
交通方式
</span>
          <h2 className={styles.sectionTitle}>
新千歲機場怎麼到二世谷？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
多數人的答案是<strong>預約直達巴士，{AIRPORT_BUS}、{AIRPORT_BUS_FARE}</strong>，這是 Niseko United 的官方數字。度假村公布五種方式，差別不在速度（2 到 3.5 小時），而在<strong>能不能不預約就去</strong>以及<strong>雪具怎麼辦</strong>。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["方式", "時間", "費用", "預約", "備註"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.booking}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
表中時間和票價都出自 Niseko United 的「Getting to Niseko」頁面，{SEASON} 重新查核；備註欄是我們寫的。有一件事表格看不出來，商品頁才有：這班巴士能不能放雪具、每人可帶多少行李。度假村接駁巴士的商品寫明一件行李加雪具，這正是它和電車不同的地方。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(nisekoResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
二世谷度假村接駁 →
</KlookLink>
            <KlookLink href={klookFor(hokkaidoPrivateCarCharterNiseko.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
二世谷包車 →
</KlookLink>
            <KlookLink href={klookFor(newChitoseAirportTransfers.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
新千歲接送 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
雪季
</span>
          <h2 className={styles.sectionTitle}>
2026-27 二世谷何時開放、何時關閉？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
四區都在 <strong>{SEASON_OPEN}</strong>開放，但不是一起關閉。而且五個<strong>票價期間</strong>比開幕日更影響預訂，因為旺季包含聖誕、新年、整個 1 月和整個 2 月。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", `Niseko United，2026-27（查核日：${SEASON}）`].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
所有日期出自 Niseko United，查核日：{SEASON}。度假村表示關閉日期為預定，北海道的春天可能使其變動。訂晚季前值得再看一次：<strong>Niseko Village 4 月 4 日、Hanazono 4 月 11 日關閉</strong>，Grand HIRAFU 和 Annupuri 到 5 月 5 日。
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
雪票
</span>
          <h2 className={styles.sectionTitle}>
二世谷纜車票多少錢？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
涵蓋四區的 <strong>All Mountain Pass</strong> 一日票，成人從 <strong>{EARLY_DAY}</strong> 到 <strong>{PEAK_DAY}</strong>，完全看你什麼時候去。13 到 15 歲青少年和 65 歲以上銀髮族價格相同，這並不常見，同行的話值得知道。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["期間", "成人", "青少年 13–15 歲", "兒童 4–12 歲", "銀髮 65 歲以上"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.period}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.period}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td className={styles.tdPrice}>{row.youth}</td>
                      <td className={styles.tdPrice}>{row.child}</td>
                      <td className={styles.tdPrice}>{row.senior}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
<strong>一個會改變計畫的實務細節。</strong>早季票是冬季最便宜的一週（2026 年 11 月 28 日到 12 月 11 日），但 Niseko United 註明<strong>不在線上販售</strong>。所以全季最便宜的滑雪要抵達後在櫃台買，這沒問題，只是無法在家先鎖定。多日票最長七天，另有僅限線上的 50 小時票；這裡只列一日票，因為那是我們能完整讀到的度假村票價表。所有價格查核日：{SEASON}。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
比羅夫雪票加巴士行程 →
</KlookLink>
            <KlookLink href={klookFor(nisekoSkiSnowboardRental.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
預約二世谷雪具 →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
教練課
</span>
          <h2 className={styles.sectionTitle}>
二世谷滑雪課要事先預約嗎？
</h2>
          <p className={styles.bodyText}>
<strong>要，而且這是官方規定，不只是建議。</strong>度假村直營的 <strong>Niseko International Snowsports School</strong> 在官網寫明（查核日：{SEASON}）：<em>「旺季僅可預約全日課程。」</em>學校的旺季是 <strong>{LESSON_PEAK}</strong>，和纜車票的旺季 {PEAK_FROM} 到 {PEAK_TO} 不同。所以聖誕新年那幾週和 2 月 6 到 12 日那週，半日課要現場詢問，而不是事先預約。
</p>
          <p className={styles.bodyText}>
對家庭或新手來說，這是本頁最重要的一句話，因為它顛覆了平常的計畫。如果那幾週你或孩子的體力只適合半天，有三個選擇：訂全日、午餐時結束；改到學校的一般週（12 月 8 到 13 日、1 月 4 日到 2 月 5 日、2 月 13 到 28 日）；或透過經銷商預訂，那是另一批名額，以你的貨幣計價，頁面也是英文。學校暫定 <strong>{SEASON_OPEN}到 2027 年 4 月 11 日</strong>開課，有團體、私人和客製課程，2026-27 已開放預約。
</p>
          <p className={styles.bodyText}>
學校的私人課最多六人一組，依官網（查核日：{SEASON}）：六小時 Niseko Classic 旺季 <strong>¥120,000</strong>、一般週 ¥93,000、早季與春季 ¥87,000；上午課 ¥93,000、¥71,000、¥59,000；下午課 ¥55,000、¥43,000、¥43,000。團體課另有票價，11 月 28 日到 12 月 7 日不開課。經銷商的價格請打開商品頁依日期查看。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
比羅夫英語課 →
</KlookLink>
            <KlookLink href={klookFor(rhythmNisekoPrivateSkiLesson.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
Rhythm 私人課 →
</KlookLink>
            <KlookLink href={klookFor(nisekoRusutsuKiroroPrivateLesson.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
二世谷／留壽都／喜樂樂 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
四大區域
</span>
          <h2 className={styles.sectionTitle}>
二世谷住哪裡好？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>沒有特別理由就選 Grand HIRAFU。</strong>它是四座相連雪場中最大、唯一有村落的區域，所以晚餐用走的，不用搭接駁車。其他三區各有明確的好處，真正的判斷在最後一欄。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["區域", "特色", "適合住這裡的人", "須知"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areaRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.stay}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
區域名稱和關閉日期出自 Niseko United，Grand HIRAFU 雪道數字出自 Grand Hirafu：22 條雪道（初級 9、中級 6、高級 7）、2 座纜車與 7 座吊椅、垂直落差 940 公尺（山頂 1,200 公尺、山腳 260 公尺）、135 公頃、最長雪道 5,300 公尺、最陡 40°。均於 {OWN} 查核。Niseko United 表示最熱門的住宿和旺季假期很早訂滿，但沒有公布多早，所以我們也不寫。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(japanWinterStayAreas[7].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
查看二世谷飯店 →
</KlookLink>
            <KlookLink href={klookFor(nisekoSkiHotSpringTourFromSapporo.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
2 或 3 晚一次訂好 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
哪個月
</span>
          <h2 className={styles.sectionTitle}>
二世谷什麼時候滑雪最好？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>要雪選 1 月，要划算選 3 月，要安靜選 12 月。</strong>降雪欄是 Grand Hirafu 最近完整雪季在約 850 公尺白樺雪道測得的每月累積量；人潮和評語欄依 Niseko United 的逐月說明和公布的票價期間。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["月份", "降雪（上一完整雪季）", "人潮", "評語"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monthRows.map((row) => (
                    <tr key={row.month}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.month}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.snow}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.crowds}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
降雪數字是單一雪季而非平均，也是度假村在山上單一地點的測量，請當作冬天的輪廓，不要當成預報。表中所有內容於 {OWN} 查核。<strong>夜間滑雪</strong>為 2026 年 12 月 12 日到 2027 年 3 月 22 日，所以開幕的前兩週和便宜的 4 月都沒有。
</p>
        </section>

                <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>
要不要跟團
</span>
          <h2 className={styles.sectionTitle}>
二世谷要跟團，還是可以自己去？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
完全看你住哪裡，這才是「二世谷滑雪行程」這個詞背後的問題。四種情況，要四種不同的預訂。
</p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
住二世谷？不用跟團
</p>
              <p className={styles.whoForDesc}>
訂好機場巴士和裝備，想上課就訂教練課，買雪票，其他自然就好，四區一張票通用。有期限的預訂只有接送、旺季教練課和住宿。
</p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
住札幌？訂一日行程
</p>
              <p className={styles.whoForDesc}>
這才是真正需要導覽行程的情況。依 Niseko United 的數字單程 2 到 3.5 小時，自己安排的話白天都在巴士上。雪票加巴士商品販售 Grand Hirafu 的固定時段，交通和雪票一個價。
</p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
同行有人不滑？以車計價
</p>
              <p className={styles.whoForDesc}>
有人滑、有人不滑是二世谷最難安排的旅程，以座位計價在這裡行不通。包車以車計價，所以四人以上時很合理。
</p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
不論如何都看天候條款
</p>
              <p className={styles.whoForDesc}>
這座山的特點：上方纜車常因風暫停，要當成規劃前提，而不是運氣不好。預訂前請看業者取消和自己取消時的規定，本頁無法告訴你，因為每款商品和日期都不同。
</p>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
有一項預訂不屬於以上任何一類：<strong>網路</strong>。二世谷的一天比日本其他滑雪旅程更受天氣左右：纜車在暴風雪中暫停又重開、區域關閉、公路接送延誤，這些公告都傳到手機，不會出現在山腳的公告欄。<KlookLink href={klookFor(klookEsim.url, LOCALE)} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>查看 Klook eSIM →</KlookLink> <Link href="/zh-tw/guides/esim/best-esim-japan">日本網卡推薦攻略</Link>比較了其他選擇，<Link href="/guides/money/japan-ski-travel-insurance" hrefLang="en">日本滑雪旅遊保險攻略（英文）</Link>則說明買雪票前要處理的另一件事：你的保單是否涵蓋雪上運動，以及有什麼條件。
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
冬季行程的其他部分
</span>
          <h2 className={styles.sectionTitle}>
二世谷可以搭配什麼？
</h2>
          <p className={styles.bodyText}>
2 月的旅程可以同時有城市和雪。<Link href="/zh-tw/guides/attractions/sapporo-snow-festival-tours">札幌雪祭攻略</Link>介紹 2027 年 2 月 4–11 日的八天，<Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">札幌出發小樽一日遊（英文）</Link>是回機場路上最輕鬆的休息日。如果雪只是一週的一部分，<Link href="/guides/attractions/hokkaido-7-day-itinerary" hrefLang="en">北海道 7 天行程（英文）</Link>有改成滑雪的版本，<Link href="/guides/attractions/japan-winter-itinerary" hrefLang="en">日本冬季行程（英文）</Link>則把北海道當成全國旅程的一段。
</p>
          <p className={styles.bodyText}>
會經過東京？如果沒滑過雪，想在決定去北海道前試試，<Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">東京出發 GALA 湯澤滑雪（英文）</Link>是負擔較小的版本。同行不滑雪的人可以選<Link href="/zh-tw/guides/attractions/jigokudani-snow-monkey-tour">地獄谷雪猴行程</Link>和<Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">高山與白川鄉行程（英文）</Link>，都是不用滑雪的雪地之旅，<Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">東京燈飾（英文）</Link>攻略則適合航班前後的夜晚。
</p>
        </section>

                <FaqList items={faqItems} />

                <KlookTourPicks
          heading={"實際可以預訂的二世谷行程"}
          intro={"同一趟旅程的四種形式：札幌出發的 Grand Hirafu 六小時含雪票、含住宿的兩三晚、同行有人不滑時的包車，以及上方纜車因風暫停那天早上的非滑雪北海道一日遊。"}
          tours={[withKlookLocale(nisekoHirafuLiftPassBusTour, LOCALE, { title: "札幌出發二世谷 Grand Hirafu 滑雪行程（6 小時雪票加巴士）", desc: "Grand Hirafu 六小時，札幌市區來回巴士和雪票一次訂好，在市區多個地點上車" }), withKlookLocale(nisekoSkiHotSpringTourFromSapporo, LOCALE, { title: "札幌出發二世谷滑雪與溫泉行程（2 天 1 夜／3 天 2 夜）", desc: "適合旅途中才發現一天不夠的旅客：小團、別墅住宿、札幌出發" }), withKlookLocale(hokkaidoPrivateCarCharterNiseko, LOCALE, { title: "北海道包車（札幌／新千歲到二世谷）", desc: "7 到 14 人座含司機，往返札幌或機場與二世谷、留壽都、洞爺湖或富良野，依你的時間出發，不受時刻表限制" }), withKlookLocale(noboribetsuToyaNisekoDayTour, LOCALE, { title: "札幌出發登別、洞爺湖與二世谷一日遊", desc: "地獄谷、洞爺湖和二世谷一側的全日導覽，是滑雪週的休息日，也是山因風關閉時可用的方案" })]}
        />

                <Related items={[{ href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "東京出發 GALA 湯澤滑雪一日遊：71 分鐘，纜車 ¥8,000 （英文）" }, { href: "/guides/money/best-travel-insurance-japan", title: "日本旅遊保險推薦 2026：誰需要什麼 （英文）" }, { href: "/guides/money/japan-ski-travel-insurance", title: "日本滑雪旅遊保險：一般保單不保什麼 （英文）" }, { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "北海道 7 天行程：每日路線 （英文）" }, { href: "/zh-tw/guides/attractions/sapporo-snow-festival-tours", title: "札幌雪祭（2027）：2/4–11 三會場免費，該訂什麼" }, { href: "/guides/attractions/japan-winter-itinerary", title: "日本冬季行程（2027）：12 天路線逐日安排 （英文）" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "札幌出發小樽一日遊（2027）：¥800，JR 33 分鐘 （英文）" }, { href: "/zh-tw/guides/attractions/jigokudani-snow-monkey-tour", title: "東京出發雪猴行程：地獄谷野猿公苑攻略（2027）" }, { href: "/guides/attractions/takayama-shirakawago-tour", title: "高山與白川鄉行程（2027）：該從哪裡出發 （英文）" }, { href: "/guides/attractions/tokyo-illumination-tours", title: "東京燈飾：日期、時間與免費景點 （英文）" }, { href: "/zh-tw/guides/esim/best-esim-japan", title: "日本 eSIM 推薦（2026）：業者、價格與怎麼選" }, { href: "/zh-tw/guides/attractions", title: "更多日本景點 →" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
四區、一張票、一個期限
</h2>
            <p className={styles.ctaBannerDesc}>
纜車 {SEASON_OPEN}開放，旺季價 {PEAK_FROM}開始。接送和教練課是有日期的兩項預訂：12 月 14 日到 1 月 3 日與 2 月 6 到 12 日，度假村學校只接受全日課預約。
</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
查看二世谷滑雪行程 →
</KlookLink>
              <KlookLink href={klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
預約二世谷教練課 →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
