import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import styles from "../../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import {
  jozankeiHotSpringBusTrip,
  jrHokkaidoRailPass,
  klookEsim,
  lakeShikotsuIceFestivalHalfDayTour,
  lakeShikotsuIceFestivalShuttleBus,
  newChitoseAirportTransfers,
  noboribetsuToyaOtaruDayTour,
  otaruSnowParkDayTour,
  sapporoFuranoAreaPass,
  sapporoJozankeiBuddhaDayTour,
  sapporoSnowFestivalStayAreas,
  sapporoSnowParkHalfDayTour,
  sapporoTvTowerMoiwaSetTicket,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import {
  asahiyamaBieiHighlightsTour,
  lakeShikotsuTomamuIceVillageDayTour,
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

// Mirrors the English guide (pages/guides/attractions/sapporo-snow-festival-tours.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/sapporo-snow-festival-tours";
const trail: Crumb[] = [...TRAIL_BASE[LOCALE], { label: "札幌雪祭" }];

const OWN_ISO = "2026-10-30";
const OWN = dateLabel(OWN_ISO, LOCALE);

const SEASON_ISO = "2026-11-06";
const SEASON = dateLabel(SEASON_ISO, LOCALE);

const JMA_CHECKED = dateLabel("2026-10-28", LOCALE);

const FEB_MEAN = "−2.7°C";
const FEB_MAX = "0.4°C";
const FEB_MIN = "−6.2°C";
const FEB_SNOW = "116 公分";
const AIRPORT_FARE = "¥1,230";
const SUBWAY_FARE = "¥210";
const SUBWAY_DAY_PASS = "¥830";
const DONICHIKA = "¥520";
const SHUTTLE_FARE = "¥200";

const siteRows = [
  {
    site: "大通會場（大通会場）",
    where: "大通公園西 1 丁目到西 11 丁目，從札幌電視塔腳下開始，十一個街區連成一直線",
    when: "雪祭期間隨時可看；雪雕點燈到 22:00",
    cost: "免費",
    what: "大型雪雕、市民雪雕比賽和美食攤位。一般說的雪祭就是指這個會場",
  },
  {
    site: "薄野會場（すすきの会場）",
    where: "站前通南 4 條到南 6 條，穿過夜生活區的大馬路",
    when: "隨時可看；點燈到 23:00，最後一天到 22:00",
    cost: "免費",
    what: "這裡是冰雕而不是雪雕，就立在酒吧之間的街邊。三個會場中最晚結束，從大通走一小段或搭一站地鐵就到",
  },
  {
    site: "Tsudome 會場（つどーむ会場）",
    where: "札幌市體育交流設施「つどーむ」，位於地鐵東豐線東北端",
    when: "僅 10:00–16:00。人多時體驗項目可能提早截止受理",
    cost: "免費入場；部分體驗項目收費",
    what: "雪上滑梯、雪上泛舟等親子體驗，是家庭會場，也是唯一有閉場時間的會場",
  },
];

const tourRows = [
  {
    tour: "小樽、白色戀人公園與雪上樂園一日遊",
    adds: "搭快速 Airport 往西 33 到 41 分鐘的運河小鎮、蒸汽時鐘和玩雪，一次訂好一整天",
    fits: "一整天。請搭配雪祭的夜晚，不要再排另一個一日遊",
    note: "小樽 2027 年 2 月 6–13 日有自己的小樽雪燈之路，所以雪祭週比 12 月更適合去",
  },
  {
    tour: "旭山動物園、美瑛青池與精靈露台一日遊",
    adds: "在企鵝散步的季節造訪旭川動物園，再加上美瑛；冬季可加購雪上摩托車",
    fits: "一整天的長途行程，是這幾項中離札幌最遠的",
    note: "企鵝散步需要雪道，2026-27 的開始日期尚未公布，不過 2 月落在動物園所說的 12 月下旬到 3 月中旬之內",
  },
  {
    tour: "支笏湖冰濤祭：半日遊、接駁座位或 Tomamu 一日遊",
    adds: "北海道這一側另一個 2 月冰雪活動，2027 年 1 月 30 日到 2 月 23 日，16:30 到 20:00 點燈",
    fits: "半天或一個晚上，正好適合雪祭當天空出來的下午",
    note: "有三種賣法：導覽半日遊、單純的來回巴士座位，以及結合 Tomamu 冰之村的十小時行程。門票平日 ¥1,000、週末與國定假日 ¥3,000，Tomamu 商品註明不含門票，其他請自行確認",
  },
  {
    tour: "定山溪：溫泉一日遊或頭大佛一日遊",
    adds: "市區以南不到一小時的峽谷溫泉鄉，或同一趟加上安藤忠雄的頭大佛和白色戀人公園",
    fits: "依商品不同，半天或一整天",
    note: "雪祭會場都在戶外，這是解決旅程真正問題的最佳答案：讓一天的中段待在室內",
  },
  {
    tour: "Wonderland Sapporo 雪上樂園半日遊",
    adds: "市郊的雪上樂園，含飯店接送和成吉思汗烤肉",
    fits: "半天",
    note: "這款商品專為不帶雪具的旅客設計，雪祭旅客大多如此",
  },
  {
    tour: "登別、洞爺湖與小樽一日遊",
    adds: "往南往西的全景路線：溫泉谷、火山口湖和運河小鎮一天走完",
    fits: "一整天的長途行程，適合多出一天的旅程",
    note: "四天以上的旅程值得。三天的話，會賠掉一個回不來的雪祭夜晚",
  },
];

const transportRows = [
  {
    leg: "新千歲機場 → 札幌，快速 Airport",
    time: "特別快速最快 33 分鐘，快速 37 分鐘",
    fare: `成人 ${AIRPORT_FARE}；uシート對號座加 ¥1,000，或無票預約 ¥800`,
    note: `JR 北海道白天每小時六班：特別快速一班、快速三班、區間快速兩班。查核日：${OWN}。`,
  },
  {
    leg: "新千歲機場 → 札幌，預約接送",
    time: "走公路，2 月受天候影響",
    fare: "依車型與日期。Klook 價格依日期而變，請打開頁面查看",
    note: "Klook 的新千歲機場接送頁，條款依車型而定，所以要在出發前預訂。",
  },
  {
    leg: "札幌站 → 大通",
    time: "地鐵一站，或步行約 10 分鐘，大多在地下",
    fare: `單區成人 ${SUBWAY_FARE}，兒童 ¥110`,
    note: `兩站之間的地下通道，正是 2 月住札幌站也方便的原因。票價查核日：${OWN}。`,
  },
  {
    leg: "大通 → 薄野",
    time: "地鐵南北線一站，或走幾個街區",
    fare: `成人 ${SUBWAY_FARE}`,
    note: "兩個會場很近，多數人用走的，薄野的燈比大通晚一小時熄。",
  },
  {
    leg: "札幌 → Tsudome 會場",
    time: "地鐵東豐線到榮町，再搭接駁巴士",
    fare: `2026 年接駁車成人單程 ${SHUTTLE_FARE}，僅收現金；小學生以下、65 歲以上與身障者免費`,
    note: "以上是執行委員會公告的 2026 年安排，2027 年接駁車尚未公布。地鐵轉接駁沒有折扣，會場 16:00 關閉。",
  },
  {
    leg: "地鐵一日券",
    time: "一個日曆日",
    fare: `平日成人 ${SUBWAY_DAY_PASS}、兒童 ¥420；週末、國定假日與 12 月 29 日到 1 月 3 日 ${DONICHIKA} 與 ¥260`,
    note: `札幌市交通局官方票價，查核日：${OWN}。以單區 ${SUBWAY_FARE} 計算，週末券搭三次、平日券搭四次就回本。`,
  },
];

const bookingWindow = [
  {
    title: "現在就訂，如果你 2027 年 2 月要去：住宿",
    desc: "執行委員會在 2026 年 2 月 11 日第 76 屆閉幕公告中就公布了日期。同一座城市八個固定的夜晚，一年前就知道，當然人人都提早訂。官方沒有公布住房率，所以這裡也不寫，但這是雪祭旅程中唯一沒有備案的部分。",
  },
  {
    title: "出發前：機場交通與北海道周遊券",
    desc: "電車 ¥1,230，不用預訂；要在出發前訂的是公路接送。鐵路周遊券只有離開市區去小樽、旭川或登別才划算，請先拿 ¥11,000 的 4 日札幌–富良野區域周遊券和單程票比較。",
  },
  {
    title: "12 月 31 日前：季節限定一日遊",
    desc: "支笏湖冰濤祭半日遊和雪上樂園都是季節商品，旭山動物園行程則要看企鵝季。它們正好和雪祭同時段，所以抵達前先訂好一個，趁還能更改時看清楚取消條款。",
  },
  {
    title: "完全不用訂：雪祭本身",
    desc: "依執行委員會的常見問題，三個會場全部免費。大通和薄野是隨時都能進入的公園和街道，Tsudome 免費入場，內部部分體驗收費。沒有門票、沒有時段，也沒有什麼要預訂。",
  },
];

const faqItems = [
  {
    q: "2027 年札幌雪祭是什麼時候？",
    a: `2027 年 2 月 4 日到 11 日，共八天。執行委員會公告寫著「2027年2月4日（木）から11日（木・祝）の8日間」，所以是確定日期而不是推估，且涵蓋三個會場。相關活動 さっぽろスノースポーツパーク2027 接著在 2027 年 2 月 12 到 14 日舉行。Tsudome 會場是唯一有閉場時間的會場，10:00 到 16:00。查核日：${OWN}。執行委員會每屆閉幕時公布隔年日期，2027 年的日期在 2026 年 2 月 11 日公布，想查 2028 年的話，請先看那份公告。`,
  },
  {
    q: "札幌雪祭免費嗎？",
    a: `免費。執行委員會的常見問題只寫了「全会場無料です」（所有會場免費），雪祭沒有任何部分需要門票。${OWN} 查核的實際情況：大通會場是公園，八天內隨時可看，雪雕點燈到 22:00。薄野會場是街道，隨時可看，點燈到 23:00，最後一天到 22:00。Tsudome 會場免費入場，10:00 到 16:00 開放，內部部分活動另收費，人多時受理可能提早結束。所以雪祭旅程的花費在住宿、機票和一日遊，不在雪祭本身。`,
  },
  {
    q: "札幌雪祭需要跟團嗎？",
    a: `不需要，而且任何標榜雪祭團的商品都要小心。三個會場都免費、可直接入場，大通和薄野是相隔幾個街區的公園與街道，Tsudome 則是搭地鐵再加一小段接駁。沒有隊伍可以跳過，也沒有門票要先拿。這趟旅程真正用得上行程的是每天的另一半：會場全在戶外，而 2 月平均最高溫是 ${FEB_MAX}，多數人白天想去室內或郊外，晚上再看點燈的大通。這一頁的商品正是這些：小樽運河、旭山動物園冬季行程、支笏湖冰濤祭夜晚、定山溪溫泉半日遊、雪上樂園。沒有一個是雪祭團，因為根本不存在，也不需要。`,
  },
  {
    q: "雪祭期間住哪裡好？",
    a: `札幌站或薄野，差別在你重視晚上的哪一段。札幌站距離大通一站地鐵，大多可走地下，2 月平均最高溫 ${FEB_MAX} 時，這比任何景觀都重要，而且新千歲來的快速 Airport 就停這裡。薄野的門外就是冰雕會場：會場沿站前通南 4 條到南 6 條，點燈到 23:00，晚場看完走回去就好，不用趕末班車。如果札幌訂滿，小樽是合理的備案：依 JR 北海道的數字，搭快速 Airport 33 到 41 分鐘、¥800，同一時期還有小樽雪燈之路。不論選哪裡，日期從 2026 年 2 月就公開了，這是最該先確定的預訂。`,
  },
  {
    q: "2 月的札幌有多冷，該穿什麼？",
    a: `冷到會改變行李內容，但還不到遠征等級。依日本氣象廳 1991–2020 年札幌平年值，2 月月均溫 ${FEB_MEAN}，平均最高 ${FEB_MAX}，平均最低 ${FEB_MIN}，全月降雪 ${FEB_SNOW}。查核日：${JMA_CHECKED}。由此可知三件事。最高溫約在冰點，雪雕不會融化，地面也不濕，而是壓實又滑，所以有抓地力的鞋最重要。建築、商店、電車和地下通道暖氣都很強，能脫的多層穿搭比一件厚外套好。雪雕天黑後最美，這時氣溫接近最低而非平均，所以大通的那個夜晚是整趟最冷的時候，手套、帽子和遮臉的衣物都不能省。`,
  },
  {
    q: "新千歲機場怎麼到札幌？",
    a: `搭快速 Airport，33 到 37 分鐘，${AIRPORT_FARE}。JR 北海道的數字（查核日：${OWN}）：特別快速最快 33 分鐘，快速 37 分鐘，白天每小時六班（特別快速一班、快速三班、區間快速兩班）。4 號車是 uシート 對號座，票價外加 ¥1,000，無票預約 ¥800，2 月普通車廂常被雪具塞滿，所以值得。另一個選擇是預約公路接送，對雪祭旅程有個實際好處：直接到飯店門口，不用拖著行李在雪中出車站。要在出發前購買，條款依車型列在 Klook 頁面。`,
  },
  {
    q: "三個會場之間怎麼移動？",
    a: `大通和薄野用走的，Tsudome 搭地鐵和接駁車。大通和薄野在同一條路上相隔幾個街區，天氣不好就搭一站南北線；札幌站在另一方向一站，大多有地下通道。地鐵單區成人 ${SUBWAY_FARE}、兒童 ¥110。Tsudome 是例外：搭東豐線到榮町再轉接駁巴士，2026 年成人單程 ${SHUTTLE_FARE}，僅收現金，小學生以下、65 歲以上與身障者免費，地鐵轉乘沒有折扣。2027 年接駁車尚未公布。一天搭三趟以上地鐵，交通局一日券平日 ${SUBWAY_DAY_PASS}，週末與國定假日 ${DONICHIKA}。除 2026 年公告的接駁車外，所有票價查核日：${OWN}。`,
  },
  {
    q: "札幌雪祭要玩幾天？",
    a: `至少三晚，四晚更好。雪祭本身是兩個半天：下午在大通看雕刻細節，晚上在大通和薄野看點燈，同樣的雪雕卻是完全不同的感受。Tsudome 是第三個半天，16:00 關閉又最遠，有帶小孩才值得去。其餘的日子留給只有這個季節才賣的行程：小樽運河、旭山動物園冬季團、支笏湖冰濤祭夜晚、定山溪溫泉下午。兩晚也行，但有一晚要花在機場交通上；五晚可以加上登別或洞爺湖，又不必放棄點燈的夜晚。`,
  },
  {
    q: "雪祭適合帶小孩嗎？",
    a: `Tsudome 會場就是為孩子設計的，也是有規則的會場。免費入場，10:00 到 16:00 開放，重點是雪上滑梯和雪上泛舟，但部分項目收費，常見問題也提醒人多時受理可能在 16:00 前截止，所以請排上午而不是下午。大通和薄野免費、隨時可看，帶小孩也沒問題，只是最好看的時段是天黑後最冷的時候。兩點費用提醒：2026 年 Tsudome 接駁車小學生以下免費；兒童地鐵一日券平日 ¥420、週末 ¥260，單區是 ¥110。`,
  },
  {
    q: "雪祭旅程值得買 JR 北海道周遊券嗎？",
    a: `只有離開札幌才值得。依 JR 北海道的數字，機場段單程 ${AIRPORT_FARE}，來回約 ¥2,460，遠遠不到周遊券的價格。要把小樽、旭川或登別也當成自己搭車的行程，而不是訂好的巴士團，周遊券才開始回本。留在市區、訂兩個導覽團的旅程完全用不到：導覽團本身含交通，市區內只有交通局平日 ${SUBWAY_DAY_PASS}、週末 ${DONICHIKA} 的地鐵一日券有用。購買前請用自己的路段算一次，這就是全部的方法，JR Pass 攻略也用同樣方式計算全國版。`,
  },
  {
    q: "雪祭週北海道還有什麼活動？",
    a: `有三項，日期都已公布。執行委員會公告新增 さっぽろスノースポーツパーク2027，於雪祭閉幕後的 2027 年 2 月 12 到 14 日在大和房屋 Premist 巨蛋舉行，八天中較晚抵達的旅程可以兩者都看。支笏湖冰濤祭依主辦單位官網為 2027 年 1 月 30 日到 2 月 23 日，10:00 到 20:00 開放，16:30 起點燈，國中以上平日 ¥1,000、週末與國定假日 ¥3,000，以下免費。所以 2 月 11 日（四，國定假日）是 ¥3,000。主辦單位表示日期可能因天氣變動。第三項是小樽雪燈之路，依小樽觀光協會頁面為 2027 年 2 月 6 到 13 日，一樣往西 33 到 41 分鐘；時間與會場待官方公布。以上均於 ${SEASON} 查核。`,
  },
];

const festivalSameTrip: KlookTripPrepItem[] = [
  {
    label: "Klook 日本 eSIM",
    ctaLabel: "在 Klook 查看 eSIM →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "三個戶外會場、2027 年時刻表尚未公布的 Tsudome 接駁車，再加上平均最高溫 0.4°C 的一個月：所有會場公告與天氣變化都會傳到手機，不會傳到櫃台。",
  },
  {
    label: "新千歲機場接送（包車與共乘）",
    ctaLabel: "查看新千歲接送 →",
    url: klookFor(newChitoseAirportTransfers.url, LOCALE),
    why: "2 月帶行李時，快速 Airport 以外的選擇：直接到飯店門口，不用站在雪中的車站，班機晚到或住薄野時最有用。",
  },
  {
    label: "北海道札幌–富良野區域周遊券（4 天）",
    ctaLabel: "查看區域周遊券 →",
    url: klookFor(sapporoFuranoAreaPass.url, LOCALE),
    why: "只有搭電車離開市區才需要。依 JR 北海道頁面預購 ¥11,000，涵蓋新千歲、小樽和旭川，而機場來回只要 ¥2,460。留在札幌並訂導覽團的旅程用不到。",
  },
  {
    label: "札幌站周邊飯店",
    ctaLabel: "在 Klook 查看札幌飯店 →",
    url: klookFor(sapporoSnowFestivalStayAreas[0].url, LOCALE),
    why: "日期從 2026 年 2 月 11 日就公開了，所以這八晚的房間是最該先確定的預訂，也是本頁無法標價的項目。",
  },
];

const TITLE = "札幌雪祭（2027）：2/4–11 三會場免費，該訂什麼";
const DESC =
  "札幌雪祭行程怎麼排：第 77 屆於 2027 年 2 月 4–11 日舉行，三個會場都免費，值得預訂的是住宿與周邊一日遊。";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function SapporoSnowFestivalToursPage({ updated }: { updated: PageUpdated }) {
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
札幌雪祭行程（2027）：<br />日期、免費會場與該訂什麼
</h1>
          <p className={styles.heroSubtitle}>
八天、三個會場、不用門票。值得訂的是雪祭前後的行程，而住宿是唯一沒有備案的部分。
</p>
          <div className={styles.heroBadges}>
            {[`更新於 ${monthLabel(updated.iso, LOCALE)}`, "執行委員會公布的 2027 日期", "三會場全免費", "票價與時間，附查核日期"].map((t) => (
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
          heading={"2027 年 2 月札幌雪祭該訂哪些行程？"}
          checkedIso={SEASON_ISO}
          deadline={
            <>
現在就訂住宿：雪祭的八天從 2026 年 2 月 11 日就確定了，這是旅程中唯一沒有備案的部分。一日遊請在 12 月 31 日前訂好，趁還能看清取消條款、改變主意。
</>
          }
          tours={[
            {
              title: "小樽、白色戀人公園與雪上樂園一日遊",
              url: klookFor(otaruSnowParkDayTour.url, LOCALE),
              price: "約 US$65–76",
              duration: "一整天",
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
              title: "支笏湖冰濤祭與 Tomamu 冰之村一日遊",
              url: klookFor(lakeShikotsuTomamuIceVillageDayTour.url, LOCALE),
              price: "約 US$103 起",
              duration: "10 小時",
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
時間
</p>
                <p className={styles.verdictStatValue}>
2027 年 2 月 4–11 日，共八天
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
地點
</p>
                <p className={styles.verdictStatValue}>
大通、薄野與 Tsudome
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
門票
</p>
                <p className={styles.verdictStatValue}>
三個會場全免費
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
需要跟團嗎？
</p>
                <p className={styles.verdictStatValue}>
不用，訂住宿和一日遊就好
</p>
              </div>
            </div>
                        <p className={styles.verdictText}>
想找<strong>札幌雪祭行程</strong>的話，首先要知道你並不需要跟團。<strong>第 77 屆札幌雪祭於 2027 年 2 月 4 日到 11 日舉行</strong>，共八天，分三個會場：<strong>大通公園西 1 到西 11 丁目</strong>、<strong>薄野站前通南 4 到南 6 條</strong>，以及 <strong>Tsudome</strong> 市立體育設施，執行委員會的常見問題寫明全部<strong>免費</strong>。大通隨時可看，雪雕點燈到 <strong>22:00</strong>；薄野到 <strong>23:00</strong>（最後一天 22:00）；Tsudome <strong>10:00–16:00</strong>開放，內部部分活動收費。沒有門票、沒有時段，也沒有隊伍要跳過。值得預訂的是雪祭前後這一週：唯一沒有備案的住宿，以及只有這個季節才有的郊外行程，例如小樽、旭山動物園、支笏湖冰濤祭和定山溪溫泉的下午。2 月札幌平均最高溫 <strong>{FEB_MAX}</strong>，所以每個雪祭日的中段都要待在室內。雪祭資訊查核日：{OWN}；氣溫平年值：{JMA_CHECKED}。
</p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={klookFor(sapporoSnowFestivalStayAreas[0].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
查看這些日期的札幌飯店 →
</KlookLink>
              <KlookLink href={klookFor(otaruSnowParkDayTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
小樽一日遊 →
</KlookLink>
            </div>
          </div>
        </div>

                <KlookTripPrep
          label={"同一趟旅程要訂的"}
          heading={"雪祭旅程出發前要訂什麼"}
          intro={"八天之外還有四項要訂：網路、以車而不是月台解決的機場交通、用路線算過的鐵路周遊券，以及一年前就定好日期、沒有備案的住宿。"}
          items={festivalSameTrip}
        />

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
日期與會場
</span>
          <h2 className={styles.sectionTitle}>
2027 年札幌雪祭在何時、何地舉行？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
依執行委員會公告，<strong>2027 年 2 月 4 日到 11 日</strong>，共八天（「2027年2月4日（木）から11日（木・祝）の8日間」）。這是確定日期，不是依往年推估，同一份公告也列出三個會場與範圍。相關活動札幌 Snow Sports Park 接著於 <strong>2027 年 2 月 12 到 14 日</strong>在大和房屋 Premist 巨蛋舉行。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["會場", "確切位置", "時間", "門票", "內容"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {siteRows.map((row) => (
                    <tr key={row.site}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.site}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
日期與會場範圍出自札幌雪祭執行委員會第 77 屆公告；時間與門票資訊出自其常見問題（「全会場無料です」）。兩者於 {OWN} 首次查核，{SEASON} 重新確認無變動。委員會表示 2027 年資訊確定後會更新，接近時請再次確認會場範圍；薄野會場南端已由 2026 年的南 7 條改為 2027 年的南 6 條。
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
免費嗎？
</span>
          <h2 className={styles.sectionTitle}>
札幌雪祭免費嗎？需要跟團嗎？
</h2>
          <p className={styles.bodyText}>
免費，也不需要跟團。執行委員會的常見問題用一句話回答票價：<strong>「全会場無料です」</strong>，所有會場免費，雪祭沒有任何部分需要門票。大通會場是八天內隨時能進入的公園，薄野會場是公共街道。Tsudome 會場免費入場，內部部分活動另收費，委員會也提醒人多時受理可能在 16:00 前截止。查核日：{OWN}。
</p>
          <p className={styles.bodyText}>
這讓它在本站介紹的活動中很特別：沒有隊伍可跳過、沒有時段入場，所以也不存在有意義的「免排隊」商品。Klook 上沒有販售札幌雪祭本身的商品，也不應該有。雪祭旅程真正要花錢預訂的是<strong>每天的另一半</strong>。會場全在戶外，日本氣象廳平年值的平均最高溫是 <strong>{FEB_MAX}</strong>，雪雕又以天黑後最美，所以理想的雪祭日是上午去郊外或下午待室內，晚上再看大通和薄野的點燈。下面的商品就是前半段。
</p>
          <p className={styles.bodyText}>
有一張票因為位置值得一提：<strong>札幌電視塔</strong>展望台位在西 1 丁目，正是大通會場十一個街區雪雕的起點，也是雪祭唯一能看到步行看不到畫面的收費項目：整個會場點燈後連成一直線。<KlookLink href={klookFor(sapporoTvTowerMoiwaSetTicket.url, LOCALE)} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>查看電視塔與藻岩山套票 →</KlookLink>
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
行程
</span>
          <h2 className={styles.sectionTitle}>
雪祭週哪些行程值得訂？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
只有這個季節才賣的，以及能讓戶外的一天有室內中段的。下列商品都於 {SEASON} 用 Klook 搜尋索引重新確認；沒有一個是雪祭團，每一列都寫明它實際增加什麼、適合怎樣的一天。表格不列價格，因為 Klook 價格依日期而變。本頁最上方的起價是索引顯示的數字，你的日期請打開商品頁查看。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["商品", "增加什麼", "適合怎樣的一天", "須知"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.tour}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.adds}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.fits}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
<strong>怎麼選。</strong>三晚的話，排一個全日和一個半日行程，留兩個晚上看大通和薄野點燈：白天的雕刻細節和晚上的燈光是同樣雪雕的不同體驗，多數人錯過一個都會後悔。四晚以上，登別與洞爺湖的長途行程就值得了。帶小孩的話，上午 Tsudome、下午雪上樂園最合適。不論訂什麼，都請確認取消條款：這些是 2 月北海道的出發班次，下雪時最先取消的就是巴士團。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(otaruSnowParkDayTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
小樽與雪上樂園 →
</KlookLink>
            <KlookLink href={klookFor(asahiyamaBieiHighlightsTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
旭山動物園 →
</KlookLink>
            <KlookLink href={klookFor(lakeShikotsuIceFestivalHalfDayTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
支笏湖冰濤祭 →
</KlookLink>
            <KlookLink href={klookFor(jozankeiHotSpringBusTrip.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
定山溪溫泉 →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
住宿
</span>
          <h2 className={styles.sectionTitle}>
雪祭期間住哪裡好？
</h2>
          <p className={styles.bodyText}>
<strong>札幌站或薄野</strong>，取決於你重視晚上的哪一段。札幌站距離大通一站地鐵，大多可走地下，新千歲來的快速 Airport 也停這裡；八天戶外、平均最高溫 {FEB_MAX}，能在會場之間回到室內比景觀更有價值。<strong>薄野</strong>門外就是冰雕會場，點燈到 23:00，晚場看完走回去就好。<strong>小樽</strong>搭 JR 函館本線快速 Airport 往西 33 到 41 分鐘，是札幌訂滿時的備案，同時期還有小樽雪燈之路。
</p>
          <p className={styles.bodyText}>
關於時間，以下清楚區分已確認和未確認的部分。<strong>日期從 2026 年 2 月 11 日就公開了</strong>，執行委員會在第 76 屆閉幕公告中公布 2027 年日期，所以同一座城市八個固定夜晚已知八個月，這是提早預訂最強的理由。這裡刻意不寫住房率或售罄數字：官方沒有公布，因此不做推估。把住宿當成沒有備案的預訂，其他都可以彈性調整。
</p>
        </section>

        <KlookStayAreas
          heading={"上述三個據點的飯店搜尋"}
          intro={"還有哪些房間、多少錢要看日期，所以每個據點都連到 Klook 的飯店搜尋。雪祭期間要比較的不是每晚房價，而是離有暖氣的建築有多遠，每一項的說明就是在講這件事。"}
          areas={sapporoSnowFestivalStayAreas.map((item, i) => withKlookLocale(item, LOCALE, ([{ why: "到大通一站地鐵或走有遮蔽的路，新千歲來的快速 Airport 也停這裡。2 月的八天裡，這比任何景觀都重要，因為這個據點讓你能在會場之間回到室內。", area: "札幌站" }, { why: "門外的街道就是冰雕會場：薄野會場沿站前通南 4 到南 6 條，點燈到 23:00，晚場看完走回去就好，不用趕末班地鐵。", area: "薄野" }, { why: "札幌訂滿時的備案，本身也是目的地：小樽搭 JR 函館本線快速 Airport 33 到 41 分鐘，同樣在 2 月舉辦小樽雪燈之路。", area: "小樽站" }] as Partial<typeof item>[])[i]))}
        />

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
天氣與穿著
</span>
          <h2 className={styles.sectionTitle}>
2 月的札幌有多冷，該穿什麼？
</h2>
          <p className={styles.bodyText}>
依日本氣象廳 1991–2020 年札幌平年值，2 月月均溫 <strong>{FEB_MEAN}</strong>，<strong>平均最高 {FEB_MAX}</strong>，<strong>平均最低 {FEB_MIN}</strong>，全月降雪 <strong>{FEB_SNOW}</strong>。查核日：{JMA_CHECKED}。
</p>
          <p className={styles.bodyText}>
這些數字帶來三個實際結論。第一，最高溫約在冰點，腳下的雪是壓實又滑，而不是濕的，所以抓地力比防水重要，這是最該做對的一件事。第二，札幌的建築、電車和地下通道暖氣都很強，能脫的多層穿搭比一件厚外套好；札幌站到大通的地下通道正是為此而建，也是規劃雪祭夜晚的一部分。第三，雪雕天黑後最美，這時氣溫接近最低，所以你最想在外面的時間就是一天中最冷的時候，手套、帽子和遮臉衣物不是可有可無。<Link href="/zh-tw/guides/attractions/japan-winter-itinerary">日本冬季行程</Link>把東京、京都、大阪和札幌的氣象廳平年值放在一起，可以看出北海道為什麼要穿得不一樣。
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
交通方式
</span>
          <h2 className={styles.sectionTitle}>
新千歲機場怎麼到札幌？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>搭快速 Airport，33 到 37 分鐘，{AIRPORT_FARE}</strong>。這是 JR 北海道的數字，幾乎適用所有抵達的旅客。下表補上其他資訊：對號座費用、如何前往各會場，以及兩種地鐵一日券，都附業者官方票價。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["路段", "時間", "票價", "備註"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transportRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
有兩件事要自己決定。4 號車的 <strong>uシート 對號座</strong>票價外加 ¥1,000，無票預約 ¥800，2 月普通車廂常被雪具塞滿，所以值得。<strong>JR 北海道周遊券</strong>只有離開市區才划算：機場來回約 ¥2,460，所以周遊券要看的是小樽、旭川和登別，而不是機場。請用自己的路段計算。票價查核日：{OWN}；<Link href="/guides/transport/jr-pass-guide" hrefLang="en">JR Pass 攻略（英文）</Link>用同樣方法計算全國版。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(newChitoseAirportTransfers.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
新千歲接送 →
</KlookLink>
            <KlookLink href={klookFor(jrHokkaidoRailPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
JR 北海道周遊券 →
</KlookLink>
            <KlookLink href={klookFor(lakeShikotsuIceFestivalShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
支笏湖接駁座位 →
</KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
抵達當天還有一項不是交通的預訂：網路。三個戶外會場、2027 年時刻表未公布的接駁車，加上會當天改變計畫的 2 月天氣，相關公告都傳到手機而不是櫃台。<KlookLink href={klookFor(klookEsim.url, LOCALE)} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>查看 Klook eSIM →</KlookLink> <Link href="/zh-tw/guides/esim/best-esim-japan">日本網卡推薦攻略</Link>比較了其他選擇。
</p>
        </section>

                <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>
預訂時程
</span>
          <h2 className={styles.sectionTitle}>
到底要訂什麼、什麼時候訂？
</h2>
          <p className={styles.bodyText}>
四件事，依這個順序，而且雪祭本身不在其中。按需要提前多久排列。
</p>
          <div className={styles.whoForGrid}>
            {bookingWindow.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
這趟旅程的取消條款比多數行程更重要，原因是 2 月的北海道：下雪不會關閉雪祭，會場在戶外又免費，雪雕也還在，但可能封閉出城的道路、讓班機停飛。請確認所訂巴士行程的取消條款；如果最後一天早上要飛，不要訂新千歲的第一班。
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
冬季行程的其他部分
</span>
          <h2 className={styles.sectionTitle}>
雪祭可以搭配什麼？
</h2>
          <p className={styles.bodyText}>
先留在北海道。<Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">札幌出發小樽一日遊（英文）</Link>最容易加上，小樽雪燈之路和雪祭大部分重疊。有一整週的話，<Link href="/zh-tw/guides/attractions/hokkaido-7-day-itinerary">北海道 7 天行程</Link>把雪祭放進到旭川和富良野的路線；如果滑雪比大通第三晚更重要，<Link href="/zh-tw/guides/attractions/niseko-ski-tours">二世谷滑雪攻略</Link>介紹札幌出發的導覽行程。
</p>
          <p className={styles.bodyText}>
如果經東京進出，本州的冬天值得再加一站。<Link href="/zh-tw/guides/attractions/jigokudani-snow-monkey-tour">地獄谷雪猴行程</Link>和<Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">高山與白川鄉行程（英文）</Link>不用飛往北方就能看到深雪；只想滑一天雪的話，<Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">東京出發 GALA 湯澤滑雪（英文）</Link>更省時。北海道前後的晚上，可以看<Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">東京燈飾（英文）</Link>攻略，了解哪些到 2 月還有展出。
</p>
        </section>

                <FaqList items={faqItems} />

                <KlookTourPicks
          heading={"只有這個季節才有的一日遊"}
          intro={"四個札幌出發的行程，安排雪祭日不在大通的那一半。冬季路線和夏季不同，所以請在抵達前就打開來看，不要等到當天早上。"}
          tours={[withKlookLocale(otaruSnowParkDayTour, LOCALE, { title: "小樽、白色戀人公園與雪上樂園一日遊", desc: "結合小樽運河、蒸汽時鐘、白色戀人公園和玩雪的北海道一日遊" }), withKlookLocale(asahiyamaBieiHighlightsTour, LOCALE, { title: "札幌出發旭山動物園、美瑛青池與精靈露台一日遊", desc: "從札幌前往旭川動物園、美瑛青池和精靈露台的一日巴士，有多條路線，冬季可加購雪上摩托車" }), withKlookLocale(sapporoJozankeiBuddhaDayTour, LOCALE, { title: "札幌、定山溪與頭大佛一日遊", desc: "結合定山溪峽谷、安藤忠雄頭大佛、白色戀人公園和啤酒博物館的全日導覽，是雪祭會場以外的札幌一天" }), withKlookLocale(noboribetsuToyaOtaruDayTour, LOCALE, { title: "札幌出發登別、洞爺湖與小樽一日遊", desc: "市區南方和西方的全景跟團行程，適合多一天、又不想在大通度過第四晚的雪祭旅程" })]}
        />

                <Related items={[{ href: "/guides/transport/hokkaido-rail-pass", title: "北海道周遊券（2026）：價格與是否划算 （英文）" }, { href: "/zh-tw/guides/attractions/niseko-ski-tours", title: "二世谷滑雪（2027）：接送、教練課與四大區域" }, { href: "/zh-tw/guides/attractions/hokkaido-7-day-itinerary", title: "北海道 7 天行程：每日路線" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "札幌出發小樽一日遊（2027）：¥800，JR 33 分鐘 （英文）" }, { href: "/zh-tw/guides/attractions/japan-winter-itinerary", title: "日本冬季行程：12 天逐日安排（2027）" }, { href: "/guides/money/japan-ski-travel-insurance", title: "日本滑雪旅遊保險（2027）：該保什麼 （英文）" }, { href: "/guides/attractions/tokyo-illumination-tours", title: "東京燈飾行程：日期、免費景點與該訂什麼 （英文）" }, { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "東京出發 GALA 湯澤滑雪一日遊：71 分鐘，纜車 ¥8,000 （英文）" }, { href: "/zh-tw/guides/attractions/jigokudani-snow-monkey-tour", title: "東京出發雪猴行程：地獄谷野猿公苑攻略（2027）" }, { href: "/guides/attractions/takayama-shirakawago-tour", title: "高山與白川鄉行程（2027）：該從哪裡出發 （英文）" }, { href: "/guides/transport/jr-pass-guide", title: "JR Pass 攻略（2026）：價格、範圍與是否划算 （英文）" }, { href: "/zh-tw/guides/esim/best-esim-japan", title: "日本 eSIM 推薦（2026）：業者、價格與怎麼選" }, { href: "/zh-tw/guides/attractions", title: "更多日本景點 →" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
八天免費，一項沒有備案的預訂
</h2>
            <p className={styles.ctaBannerDesc}>
雪祭不花錢也不用預訂。2027 年 2 月 4–11 日的住宿要訂，只有這幾週才有的郊外行程也一樣。
</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={klookFor(sapporoSnowFestivalStayAreas[0].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
查看札幌飯店 →
</KlookLink>
              <KlookLink href={klookFor(sapporoSnowParkHalfDayTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
查看雪上樂園半日遊 →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
