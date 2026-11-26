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
import KlookTripPrep from "../../../../components/KlookTripPrep";
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import BookingEsimCard from "../../../../components/BookingEsimCard";
import {
  jrHarukaUrl,
  osakaAmazingPass,
  osakaCastleNishinomaruWalkingTour,
  osakaCastleSameDayCards,
  osakaCastleTicket,
  osakaCastleTripPrep,
  osakaCastleUmedaTonboriDayTour,
  osakaSkyVistaHalfDayBusTour,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/osaka-castle-tickets) section by section as of
// 2026-11-26 (task-jtk-20261126-TR02): same sections, tables, FAQ (10) and Klook CTAs in the same
// places. Every figure, date and source is the English page's (osakacastle.net, osaka-info.jp,
// osaka-amazing-pass.com, read 23 Oct 2026; price line re-read 23 Nov 2026); nothing is added.
// Title term: 大阪城天守閣門票 — osaka-info.jp's zh-Hant-HK spot page (osaka-castle-main-keep) names
// the keep 大阪城天守閣, and Taiwan / Hong Kong guides search 大阪城天守閣門票 and 大阪城御座船.

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/osaka-castle-tickets";
const TITLE = "大阪城天守閣門票 2026：票價、開放時間與御座船";
const H1 = "大阪城天守閣門票 2026：票價、開放時間與周遊卡免費設施";
const DESC =
  "大阪城天守閣門票成人 ¥1,200、高中與大學生 ¥600，國中生以下免費。開放 9:00–18:00，最後入場 17:30。附城內 5 項收費設施與周遊卡。";

const LAST_CHECKED_ISO = "2026-11-23";
const CHECKED_ISO = "2026-10-23";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const OFFICIAL_URL = "https://www.osakacastle.net/guide/";
// The pass price is owned by lib/attraction-prices.ts, shared with the English page.
const PASS_1_DAY = priceLabel(PRICES.osakaAmazingPass.adult, LOCALE);

const TICKET_URL = klookFor(osakaCastleTicket.url, LOCALE);
const PASS_URL = klookFor(osakaAmazingPass.url, LOCALE);
const WALK_URL = klookFor(osakaCastleNishinomaruWalkingTour.url, LOCALE);
const DAY_TOUR_URL = klookFor(osakaCastleUmedaTonboriDayTour.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  {
    tier: "成人",
    price: "¥1,200",
    what: "包含天守閣 8 個樓層，以及同一天的豐臣石垣館",
  },
  {
    tier: "大學生與高中生",
    price: "¥600",
    what: "需在售票櫃檯出示學生證，海外學生請出示 ISIC 國際學生證。未出示證件以成人票價計算",
  },
  {
    tier: "國中生以下",
    price: "免費",
    what: "需出示年齡證明，學生手冊、健保卡或護照都可以",
  },
  {
    tier: "團體票（付費人數 15 人以上）",
    price: "¥1,080 / ¥540",
    what: "分別為成人與學生票價，免費對象仍為免費",
  },
  {
    tier: "大阪周遊卡持有者",
    price: "免費",
    what: "周遊卡每個使用日可入場 1 次，這個設施沒有時段限制",
  },
];

const parkRows = [
  {
    place: "大阪城天守閣（天守閣博物館）",
    fee: "成人 ¥1,200",
    hours: "9:00–18:00（最後入場 17:30）",
    pass: "周遊卡免費",
    note: "門票包含豐臣石垣館。12 月 28 日至 1 月 1 日休館",
  },
  {
    place: "西之丸庭園",
    fee: "¥300（賞櫻季 ¥350）",
    hours: "3 月至 10 月 9:00–17:00，11 月至 2 月 9:00–16:30（閉園前 30 分鐘停止入園）",
    pass: "周遊卡免費",
    note: "可拍到明信片角度天守閣的草坪，約有 300 棵櫻花樹。週一與新年期間休園",
  },
  {
    place: "大阪城御座船",
    fee: "成人（16 歲以上）¥1,800，學齡兒童 ¥900，65 歲以上 ¥1,200，學齡前兒童免費",
    hours: "10:00–16:30（末班出航）",
    pass: "周遊卡免費，但抵達時需換票",
    note: "繞行內護城河約 20 分鐘。國中生以下兒童不可單獨搭乘",
  },
  {
    place: "大阪城櫓（Yagura）",
    fee: "高中生以上 ¥900",
    hours: "10:00–16:30（最後入場 16:00）",
    pass: "周遊卡免費",
    note: "列為重要文化財的櫓，看的是城郭防禦設施的內部，而不是天守閣",
  },
  {
    place: "海洋堂 Figure Museum（MIRAIZA OSAKA-JO 內）",
    fee: "成人 ¥1,000 / 兒童 ¥500",
    hours: "9:30–17:30（最後入場 17:00）",
    pass: "周遊卡免費",
    note: "位於天守閣下方的舊陸軍司令部建築內，MIRAIZA OSAKA-JO 本身可免費進入",
  },
];

const accessRows = [
  {
    station: "JR 大阪城公園站（大阪環狀線）",
    walk: "約 15–20 分鐘",
    note: "多數遊客從這裡進入，經過大阪城音樂廳一側，沿途有公園的咖啡店街",
  },
  {
    station: "JR／大阪地鐵 森之宮站",
    walk: "約 15–20 分鐘",
    note: "地鐵 1 號與 3-B 號出口。從南側進入，比大阪城公園站的路線安靜",
  },
  {
    station: "大阪地鐵 谷町四丁目站",
    walk: "約 15–20 分鐘",
    note: "谷町線 1-B 號出口、中央線 9 號出口。從西側穿過大手門進入，這是歷史上正式的入城路線",
  },
  {
    station: "大阪地鐵／京阪 天滿橋站",
    walk: "約 15–20 分鐘",
    note: "地鐵谷町線 3 號出口。從北側進入，離御座船乘船處最近",
  },
  {
    station: "大阪地鐵 大阪商務園區站（OBP）",
    walk: "約 15–20 分鐘",
    note: "長堀鶴見綠地線 1 號出口，住在 OBP 大樓一帶的人可利用",
  },
];

const whoFor = [
  {
    title: "這種情況 9:00 入場",
    desc: `想參觀天守閣又不想排隊。天守閣 9:00 開館，博物館官網說明館內擁擠時可能在 17:30 截止前就提早限制入場，因此開館時段是唯一不會被限制的時間。下午也能完整留給庭園與御座船。${CHECKED}查核。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "這種情況下午前往",
    desc: "比起博物館，您更想逛公園。園區免費，天守閣 18:00 關閉後仍可進入，入夜後天守閣有夜間燈光，黃昏時從大手門走進來的路線是整個園區最好拍的畫面。但請留意城內較早結束的設施：御座船 16:30 末班，櫓也是 16:30 結束。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="2" y1="22" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    title: "這種情況購買周遊卡",
    desc: `您不只參觀天守閣。大阪城公園內 5 項收費設施，成人在現場購票合計 ¥5,200，而這 5 項用每日 ${PASS_1_DAY} 的大阪周遊卡都免費，還包含地鐵。光是天守閣、御座船與海洋堂 Figure Museum（¥4,000）就超過周遊卡價格。設施清單於${CHECKED}查核，周遊卡價格於 2026 年 11 月 9 日查核。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16v5a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z" />
        <path d="M12 6v12" strokeDasharray="2 3" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "購票前先數一數要去幾項收費設施",
    desc: `天守閣是 ¥1,200，多數人只看到這裡。同一座城牆內還有 4 項收費設施：西之丸庭園、大阪城御座船、大阪城櫓與 MIRAIZA OSAKA-JO 的海洋堂 Figure Museum，成人合計 ¥5,200。要去其中 2 項還是 5 項全去，才是決定該買哪種票的關鍵，而不是天守閣本身。${CHECKED}查核。`,
  },
  {
    title: "3 項以上，買周遊卡比較划算",
    desc: `5 項都可用大阪周遊卡免費入場，1 日券 ${PASS_1_DAY}（官方價格，2026 年 11 月 9 日查核）。天守閣加御座船現場合計 ¥3,000，天守閣加庭園加御座船為 ¥3,300，兩者都略低於周遊卡價格，要再加上當天的地鐵車資才划算。天守閣、御座船與海洋堂 Figure Museum 合計 ¥4,000，在城內就超過周遊卡價格。`,
  },
  {
    title: "只去天守閣，就提前購買單張門票",
    desc: "博物館有自己的線上購票網站，Klook 則可以用中文介面與海外發行的信用卡購買同一張門票。兩者都不是必要的，售票櫃檯當天也有販售，但線上購票可以用手機裡的票碼入場，不必在入口排隊，春季週末特別有差。付款前請確認您訂單上顯示的取消期限。",
  },
  {
    title: "御座船請當天到現場購票",
    desc: "御座船是這裡唯一無法提前處理的項目：船票在天守閣北側、極樂橋西邊的售票亭販售，周遊卡持有者也在同一個櫃檯換取指定時段的乘船券。座位有限，只能在乘船券上的時間登船，所以請在一早換票，不要等到 16:00。",
  },
  {
    title: "天守閣預留 1 小時，城郭再留 1 小時",
    desc: `大阪官方觀光網站估計參觀博物館約需 60 分鐘，8 個樓層加上搭電梯到頂樓，這個時間很合理。周邊公園另需 1 到 2 小時：護城河、大手門入城路線與豐臣時代的石牆都不用付費，也是最值得花時間的地方。${CHECKED}查核。`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "大阪城天守閣門票多少錢？",
    a: `天守閣（大阪城天守閣博物館）成人票 ¥1,200。大學生與高中生出示學生證 ¥600，國中生以下出示年齡證明免費。付費人數 15 人以上的團體為 ¥1,080 與 ¥540。門票也包含同一天的豐臣石垣館。海外學生請出示 ISIC 國際學生證，未出示證件以成人票價計算。以上皆於${CHECKED}取自 osakacastle.net 與大阪官方觀光網站。`,
  },
  {
    q: "大阪城天守閣的開放時間是？",
    a: `天守閣開放時間為 9:00 至 18:00，售票與最後入場到 17:30，也就是閉館前 30 分鐘。12 月 28 日至 1 月 1 日休館。博物館官網有一點在人多的日子很重要：參觀人數多時，可能在 17:30 之前提早限制入場，所以賞櫻季 17:00 才抵達，不一定進得去。公園本身沒有大門，也沒有關閉時間。${CHECKED}查核。`,
  },
  {
    q: "參觀大阪城需要多少時間？",
    a: `大阪官方觀光網站估計博物館約需 60 分鐘，這個數字很實在：8 個樓層的展覽，搭電梯到頂樓展望台再一路往下走。城郭至少再留 1 小時：外護城河與內護城河、大手門入城路線與豐臣時代的石牆都免費，也是這裡值得一訪的原因。如果再加上庭園與御座船，請把大阪城當作半天行程，而不是順路停留一下。`,
  },
  {
    q: "大阪城公園內還有哪些收費設施？",
    a: `天守閣以外還有 4 項，這就是參觀大阪城可能從 ¥1,200 變成 ¥5,200 的原因。西之丸庭園 ¥300（賞櫻季 ¥350），3 月至 10 月 9:00–17:00、11 月至 2 月 9:00–16:30，週一休園。大阪城御座船成人（16 歲以上）¥1,800、學齡兒童 ¥900、65 歲以上 ¥1,200、學齡前兒童免費，10:00 至 16:30 運航。大阪城櫓高中生以上 ¥900，10:00–16:30，最後入場 16:00。MIRAIZA OSAKA-JO 內的海洋堂 Figure Museum 成人 ¥1,000、兒童 ¥500，9:30–17:30。公園內其他地方，包括護城河、城門、石牆與 MIRAIZA OSAKA-JO 建築本身，都是免費的。費用於${CHECKED}查核。`,
  },
  {
    q: "大阪周遊卡可以免費參觀大阪城嗎？",
    a: `可以，園內另外 4 項收費設施也一樣。周遊卡營運公司的設施清單包含大阪城天守閣、西之丸庭園、大阪城櫓、MIRAIZA OSAKA-JO 的海洋堂 Figure Museum 與大阪城御座船，成人現場票價合計 ¥5,200，而 1 日券是 ${PASS_1_DAY}。梅田藍天大廈的周遊卡免費入場只到 15:00，大阪城的設施則都沒有時段限制，但御座船需要在自己的櫃檯用周遊卡換取指定時段的乘船券。設施清單於${CHECKED}查核。`,
  },
  {
    q: "只去大阪城，買大阪周遊卡划算嗎？",
    a: `要去 3 項收費設施，或 2 項加上一整天搭地鐵，才划算。周遊卡 ${PASS_1_DAY}（官方價格，2026 年 11 月 9 日查核）。天守閣（¥1,200）加御座船（¥1,800）現場合計 ¥3,000，再加庭園為 ¥3,300，兩者都低於周遊卡價格，要算上周遊卡也包含的大阪地鐵車資才划算。天守閣、御座船與海洋堂 Figure Museum（¥1,000）合計 ¥4,000，直接超過周遊卡價格。只去天守閣則不划算。大阪周遊卡攻略（英文）用同樣的方式計算了整個大阪市的行程。`,
  },
  {
    q: "怎麼去大阪城？",
    a: `有 5 個車站可到，每一站步行都約 15 到 20 分鐘：公園很大，天守閣在正中央，沒有更近的走法。最常用的是 JR 大阪環狀線的大阪城公園站；森之宮站是 JR 與地鐵都有的南側入口；大阪地鐵谷町四丁目站（谷町線 1-B 號出口、中央線 9 號出口）會從大手門進入，這是歷史上正式的入城路線；地鐵與京阪的天滿橋站是北側入口，離御座船最近；大阪商務園區站適合住在 OBP 大樓一帶的人。市區公車停靠大阪城大手前與馬場町，河上的遊船則停靠大阪城港。車站與出口於${CHECKED}取自 osakacastle.net。`,
  },
  {
    q: "大阪城什麼時候人比較少？",
    a: `一早，以及避開 4 月上旬的兩週。天守閣 9:00 開館，博物館官網提到人多時可能在 17:30 截止前限制入場，可見人潮集中在中午前後。春季的旺季很明確，可以刻意避開，也可以特地前往：2026 年西之丸庭園的賞櫻夜間開放為 3 月 20 日至 4 月 12 日，開放時間延長到 21:00，最後入場 20:30，門票 ¥350。這是整個園區最美的兩週，也是遠比其他時候擁擠的兩週。避開這段期間的平日上午，人潮完全不同。`,
  },
  {
    q: "大阪城天守閣門票需要提前購買嗎？",
    a: "不需要。沒有入場時段，也不會售罄，天守閣售票櫃檯在開放時間內都販售當日門票。提前購票是為了方便：博物館有自己的線上購票網站，Klook 則可以用海外發行的信用卡購買同一張門票，入場時掃描票碼即可。真正不能拖到傍晚的只有兩項：座位有限、需換取指定時段乘船券的御座船，以及需要湊足人數與固定出發時間的導覽行程。",
  },
  {
    q: "帶小孩去大阪城適合嗎？",
    a: "從票價來看很適合：國中生以下出示年齡證明免費，天守閣是大阪市內家庭參觀最便宜的主要景點之一。實際要注意的是距離與樓梯。每個車站到天守閣都要走 15 到 20 分鐘，博物館有 8 個樓層，電梯常有人排隊，盛夏時開闊的入城路線幾乎沒有遮蔭。不過公園本身是大阪市中心少數可以讓小孩盡情奔跑的地方。御座船是小孩通常最有印象的加購項目，但國中生以下兒童需要成人陪同才能搭乘。",
  },
  {
    q: "下雨天去大阪城好嗎？",
    a: "一半適合，而且界線很清楚。天守閣是 8 層樓的室內博物館，¥1,200 的門票不受天氣影響，MIRAIZA OSAKA-JO 的海洋堂 Figure Museum 也在室內。下雨受影響的是其他部分：御座船在露天的護城河上航行，西之丸庭園是一片草坪，櫓要走過開闊的空地，從每個車站步行 15 到 20 分鐘的路上也沒有遮蔽。下雨天只買天守閣門票，御座船與庭園留到其他天。",
  },
];

/** Same seven cards as the English page, in the same order, with Traditional Chinese copy. */
const SAME_DAY_COPY: Pick<KlookSameDayCard, "label" | "kind" | "ctaLabel" | "why">[] = [
  {
    label: "大阪周遊卡（1 日／2 日）",
    kind: "周遊卡",
    ctaLabel: "查看大阪周遊卡 →",
    why: "天守閣、西之丸庭園、大阪城御座船、大阪城櫓與海洋堂 Figure Museum 都包含在周遊卡內，設施之間的地鐵也可搭乘。大阪海遊館不包含在內。",
  },
  {
    label: "大阪城與西之丸庭園半日徒步導覽",
    kind: "導覽",
    ctaLabel: "查看大阪城徒步導覽 →",
    why: "併團的半日導覽，走訪大阪城園區與天守閣下方需另外購票的西之丸庭園草坪。",
  },
  {
    label: "道頓堀美食導覽",
    kind: "美食導覽",
    ctaLabel: "查看美食導覽 →",
    why: "行程時間為 11:00 至 14:00，地點在道頓堀：9:00 參觀天守閣，接著邊走邊吃午餐。",
  },
  {
    label: "道頓堀遊船",
    kind: "遊船",
    ctaLabel: "查看道頓堀遊船 →",
    why: "從太左衛門橋碼頭出發、經過固力果看板的 20 分鐘遊船，適合排在從大阪城開始的一天的傍晚。",
  },
  {
    label: "難波周邊飯店",
    kind: "飯店",
    ctaLabel: "在 Klook 查看難波飯店 →",
    why: "從難波可步行到道頓堀，前往關西機場的南海電鐵也從這裡出發。",
  },
  {
    label: "Klook 日本 eSIM",
    kind: "eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "門票票碼、車站出口與御座船售票亭的地圖都在手機上，而穿過這座公園要走 15 到 20 分鐘。",
  },
  {
    label: "南海特急 Rapi:t 車票",
    kind: "機場交通",
    ctaLabel: "查看 Rapi:t 車票 →",
    why: "關西機場與難波之間的對號座，適合大阪行程的抵達或離開那一段。",
  },
];

const sameDayCards: KlookSameDayCard[] = osakaCastleSameDayCards.map((card, i) => ({
  ...card,
  ...SAME_DAY_COPY[i],
  url: klookFor(card.url, LOCALE),
}));

/** Traditional Chinese copy for the English trip-prep list, keyed by its index there. */
const TRIP_PREP_COPY: Record<number, Pick<KlookTripPrepItem, "label" | "ctaLabel" | "why">> = {
  0: {
    label: "大阪梅田飯店",
    ctaLabel: "在 Klook 查看梅田飯店 →",
    why: "梅田是御堂筋線北端的主要車站，與大阪站相連，大阪城、梅田展望台以及離開大阪的列車都在短程車程內。",
  },
  1: {
    label: "難波周邊飯店",
    ctaLabel: "在 Klook 查看難波飯店 →",
    why: "同一天的南半段：從難波可步行到道頓堀與黑門市場，前往關西機場的南海電鐵也從這裡出發。",
  },
  2: {
    label: "道頓堀遊船",
    ctaLabel: "查看道頓堀遊船 →",
    why: "從太左衛門橋碼頭出發、經過固力果看板的 20 分鐘遊船，適合排在從大阪城開始的一天的傍晚。",
  },
  3: {
    label: "大阪「Nani Wonder」雙層露天巴士夜間觀光",
    ctaLabel: "查看夜間巴士行程 →",
    why: "從大阪站巴士總站出發的露天夜間巴士，沿御堂筋開往新世界，適合天守閣關閉之後的時間。",
  },
  4: {
    label: "大阪周遊卡（1 日／2 日）",
    ctaLabel: "查看大阪周遊卡 →",
    why: "周遊卡的市內設施包含大阪城天守閣，也包含設施之間的地鐵，所以購買任何一種之前，都值得和單張門票比較價格。",
  },
};

const sameDayUrls = new Set(osakaCastleSameDayCards.map((c) => c.url));
const tripPrepItems: KlookTripPrepItem[] = osakaCastleTripPrep
  .map((item, i) => ({ ...item, ...TRIP_PREP_COPY[i], url: item.url }))
  .filter((item) => !sameDayUrls.has(item.url))
  .map((item) => ({ ...item, url: klookFor(item.url, LOCALE) }));

const tourPicks = [
  withKlookLocale(osakaCastleNishinomaruWalkingTour, LOCALE, {
    title: "大阪城與西之丸庭園半日徒步導覽",
    desc: "併團的半日導覽，走訪大阪城園區與西之丸庭園，這片需另外購票的草坪可拍到明信片角度的天守閣，約有 300 棵櫻花樹",
  }),
  withKlookLocale(osakaCastleUmedaTonboriDayTour, LOCALE, {
    title: "大阪城、梅田藍天大廈與道頓堀遊船一日導覽",
    desc: "由導遊帶領一天走訪大阪城、梅田展望台與道頓堀遊船，路線由導遊安排",
  }),
  withKlookLocale(osakaSkyVistaHalfDayBusTour, LOCALE, {
    title: "大阪 Sky Vista 雙層露天巴士半日遊",
    desc: "併團的半日雙層露天巴士，行經大阪城、道頓堀與通天閣，可以坐著看完市區",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "大阪城天守閣門票" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
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
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.86rem" }}>
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

export default function ZhTwOsakaCastleTicketsPage({ updated }: { updated: PageUpdated }) {
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
            天守閣門票 ¥1,200，參觀約 1 小時。同一座城牆內還有 4 項收費設施，全部加起來是 ¥5,200，持有大阪周遊卡則全部免費。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "官方票價與查核日期", "園內 5 項收費設施票價"].map((t) => (
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
            <span className={styles.verdictLabel}>快速結論</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>天守閣</p>
                <p className={styles.verdictStatValue}>成人 ¥1,200、學生 ¥600</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>開放時間</p>
                <p className={styles.verdictStatValue}>9:00–18:00，最後入場 17:30</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>參觀時間</p>
                <p className={styles.verdictStatValue}>館內約 60 分鐘</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>交通</p>
                <p className={styles.verdictStatValue}>各車站步行 15–20 分鐘</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>重點整理：</strong>大阪城天守閣門票成人 <strong>¥1,200</strong>，大學生與高中生出示學生證{" "}
              <strong>¥600</strong>，國中生以下<strong>免費</strong>。一張門票也包含豐臣石垣館。天守閣開放時間為{" "}
              <strong>9:00 至 18:00，最後入場 17:30</strong>，12 月 28 日至 1 月 1 日休館，大阪官方觀光網站估計參觀約{" "}
              <strong>60 分鐘</strong>。每個車站步行都要 <strong>15 到 20 分鐘</strong>。多數人沒算進預算的是：公園內還有 4
              項收費設施，西之丸庭園、大阪城御座船、大阪城櫓與海洋堂 Figure Museum，
              <strong>5 項合計現場票價 ¥5,200，用 {PASS_1_DAY} 的大阪周遊卡則全部免費</strong>。以上皆於{CHECKED}查核。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看大阪城天守閣門票 →
              </KlookLink>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                大阪周遊卡 →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookSameDayCards
          heading="大阪城這一天可以一起預訂的項目"
          cards={sameDayCards}
          footnote={
            <>
              大阪周遊卡包含天守閣（osaka-amazing-pass.com 的第 18 號設施，2026 年 11 月 23 日查核），但不包含大阪海遊館，請看{" "}
              <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets" hrefLang="en">
                海遊館門票攻略（英文）
              </Link>
              。從關西機場前往京都、新大阪或天王寺，而不是難波？{" "}
              <KlookLink href={klookFor(jrHarukaUrl, LOCALE)} target="_blank" rel={KLOOK_REL}>
                在 Klook 查看 JR HARUKA 車票 →
              </KlookLink>
            </>
          }
        />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>大阪城天守閣門票包含什麼？</h2>
          <p className={styles.bodyText}>
            只包含一棟建築。¥1,200 的門票可進入<strong>大阪城天守閣博物館</strong>，也就是重建的天守閣，8
            個樓層展示豐臣秀吉與終結豐臣家的戰役，有電梯可到頂樓的展望台；同一天還可進入<strong>豐臣石垣館</strong>。這就是這張門票的全部內容。
          </p>
          <p className={styles.bodyText}>
            大阪城的其他地方，不是免費就是另外收費，本頁就是要把這兩者分清楚。護城河、城門、大手門入城路線，以及天守閣下方的
            MIRAIZA OSAKA-JO 建築都可以免費通行。西之丸庭園、內護城河上的大阪城御座船（Gozabune）、大阪城櫓（Yagura）與海洋堂
            Figure Museum（KAIYODO）則各有自己的費用、較早的結束時間與排隊隊伍。5 項全部加起來，成人在同一座城牆內就要{" "}
            <strong>¥5,200</strong>，這也是大阪城成為大阪最能發揮周遊卡價值的單一景點的原因。費用於{CHECKED}查核。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>大阪城天守閣門票多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            票價依身分固定，沒有浮動票價，也沒有提前購票折扣，售票櫃檯與線上價格相同。博物館官網註明目前票價自 2025 年 4 月 1 日起實施：
          </p>
          <Table head={["對象", "門票", "說明"]} rows={priceRows.map((r) => [r.tier, r.price, r.what])} />
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{LAST_CHECKED_ISO}——
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">
              osakacastle.net/guide/
            </a>
            （¥1,200／¥600／免費，9:00–18:00，最後入場 17:30）。學生與團體票價於{CHECKED}取自 osakacastle.net
            與大阪官方觀光網站。票價可能變動，購票前請再確認。日本其他景點的門票與各自的查核日期，請看{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" hrefLang="en" style={linkStyle}>
              日本景點門票價格總表（英文）
            </Link>
            。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>開放時間</span>
          <h2 className={styles.sectionTitle}>大阪城天守閣幾點開放？</h2>
          <p className={styles.bodyText}>
            天守閣開放時間為 <strong>9:00 至 18:00，售票與最後入場到 17:30</strong>，也就是閉館前 30 分鐘。
            <strong>12 月 28 日至 1 月 1 日</strong>休館，其他日子全年開放。
          </p>
          <p className={styles.bodyText}>
            博物館官網有一句話值得留意：參觀人數多時，可能<strong>在 17:30 之前提早限制入場</strong>
            。因此賞櫻季傍晚才抵達，不一定進得去；這也是營運方對館內何時擁擠最明確的說明。天守閣外的公園沒有大門，也沒有關閉時間，博物館關閉後仍可以看城牆與夜間燈光下的天守閣。開放時間於
            {CHECKED}查核。
          </p>
          <div className={styles.whoForGrid} style={{ marginTop: "1.5rem" }}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>城牆內</span>
          <h2 className={styles.sectionTitle}>大阪城公園內還有哪些收費設施？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            一座公園，5 項收費設施。天守閣是每個人都會買的，預算主要花在另外 4 項，其中 3 項比天守閣更早結束：
          </p>
          <Table
            head={["設施", "一般票價", "開放時間", "周遊卡", "補充"]}
            rows={parkRows.map((r) => [r.place, r.fee, r.hours, r.pass, r.note])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            費用與開放時間於{CHECKED}取自大阪周遊卡營運公司的設施清單，御座船票價與庭園休園日則於同一天取自大阪官方觀光網站。有一點要說清楚：西之丸庭園在周遊卡營運公司目前的清單上是{" "}
            <strong>¥300</strong>，在大阪官方觀光網站較舊的頁面上仍是 <strong>¥200</strong>，請把庭園費用視為 ¥200–300，並在入口確認。公園內其他地方，包括護城河、大手門入城路線、石牆與
            MIRAIZA OSAKA-JO 建築本身，都是免費的。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看大阪城天守閣門票 →
            </KlookLink>
            <KlookLink href={WALK_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              大阪城與西之丸庭園徒步導覽 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>周遊卡</span>
          <h2 className={styles.sectionTitle}>在大阪城用大阪周遊卡划算嗎？</h2>
          <p className={styles.bodyText}>
            <strong>去 3 項設施就划算。</strong>周遊卡營運公司的清單包含大阪城公園內全部 5 項收費設施：天守閣博物館、西之丸庭園、大阪城櫓、海洋堂
            Figure Museum 與大阪城御座船。成人現場票價合計 <strong>¥5,200</strong>，1 日券是{" "}
            <strong>{PASS_1_DAY}</strong>，而且和梅田藍天大廈不同，這裡每一項都沒有時段限制。
          </p>
          <p className={styles.bodyText}>
            計算很簡單。周遊卡 1 日券 {PASS_1_DAY}（官方價格，2026 年 11 月 9 日查核）。天守閣加御座船是 <strong>¥3,000</strong>
            ，天守閣加庭園加御座船是 <strong>¥3,300</strong>，兩者都略低於周遊卡價格，要算上當天的地鐵車資才划算。天守閣、御座船與海洋堂
            Figure Museum 合計 <strong>¥4,000</strong>，不出城就超過周遊卡價格。只去天守閣則周遊卡不划算，所以原則是：去 1
            項就買門票，去 3 項以上就買周遊卡。
            <Link href="/guides/attractions/osaka-attractions-pass" hrefLang="en" style={linkStyle}>
              大阪周遊卡價格與划算試算表（英文）
            </Link>
            用同樣的方式計算了整個大阪市的行程。
          </p>
          <p className={styles.bodyText}>
            用大阪城安排周遊卡行程之前，有一點要先知道，而它在城市的另一邊。
            <Link href="/zh-tw/guides/attractions/umeda-sky-building-tickets" style={linkStyle}>
              梅田藍天大廈門票攻略
            </Link>
            說明了周遊卡只在 <strong>15:00 前</strong>可免費進入那座展望台，這決定了周遊卡一天的順序：上午去梅田展望台，下午去大阪城，不要反過來。
            <Link href="/guides/attractions/osaka-attractions-pass" hrefLang="en" style={linkStyle}>
              大阪周遊卡攻略（英文）
            </Link>
            列出了 40 多項適用設施、2 日券價格與兩個主要的不適用設施，
            <Link href="/guides/attractions/things-to-do-osaka" hrefLang="en" style={linkStyle}>
              大阪景點攻略（英文）
            </Link>
            則說明如何依這些設施安排 2 到 3 天的行程。設施清單於{CHECKED}查核。想看原始建造的天守閣而不是重建的，
            <Link href="/guides/attractions/himeji-castle-day-trip" hrefLang="en" style={linkStyle}>
              大阪出發姬路城一日遊（英文）
            </Link>
            搭 JR 新快速單程約 1 小時。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看大阪周遊卡 →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              只買天守閣門票 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>怎麼去大阪城？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            公園周邊有 5 個車站，<strong>每一站到天守閣步行都約 15 到 20 分鐘</strong>
            。園區就是這麼大，沒有捷徑。選哪一站差別在於從哪一側進入，而不是距離：
          </p>
          <Table head={["車站", "步行到天守閣", "沿途情況"]} rows={accessRows.map((r) => [r.station, r.walk, r.note])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            市區公車停靠大阪城大手前與馬場町，河上的遊船則停靠北側的大阪城港。車站與出口於{CHECKED}取自
            osakacastle.net，步行時間於同一天取自大阪官方觀光網站。
            <Link href="/guides/transport/osaka-transportation" hrefLang="en" style={linkStyle}>
              大阪交通攻略（英文）
            </Link>
            說明中央線與谷町線在整個路網中的位置，
            <Link href="/guides/transport/osaka-metro-pass" hrefLang="en" style={linkStyle}>
              大阪地鐵一日券攻略（英文）
            </Link>
            則計算不買周遊卡時，一般一日券是否比刷 IC 卡便宜。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>大阪城天守閣門票怎麼買？</h2>
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
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看大阪城天守閣門票 →
            </KlookLink>
            <KlookLink href={DAY_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              加上梅田展望台與道頓堀遊船 →
            </KlookLink>
          </div>
        </section>

        <BookingEsimCard lead="買好大阪城門票了嗎？出發前先準備好行動數據。" />

        <KlookTripPrep
          label="同一天一起預訂"
          heading="大阪城這一天還有什麼值得預訂？"
          intro="天守閣與城郭約需半天，大阪城位於梅田與難波之間，剩下要決定的是住在哪裡，以及晚上怎麼安排。"
          items={tripPrepItems}
        />

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="常見問題" />

        <KlookTourPicks
          heading="參加導覽，或走訪大阪其他地方"
          intro="天守閣 1 小時、城郭 1 小時，就是半天，而大阪城剛好位在梅田與道頓堀之間。第一個是有導遊帶領參觀城郭與庭園的行程，第二個在一天內走訪大阪城、梅田展望台與道頓堀遊船。Klook 價格依日期而異，請打開商品頁查看目前價格與集合地點。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/zh-tw/guides/attractions/dotonbori-river-cruise", title: "道頓堀遊船（2026）：票價、時刻、碼頭與周遊卡" },
            { href: "/zh-tw/guides/attractions/umeda-sky-building-tickets", title: "梅田藍天大廈門票 2026：票價、營業時間與日落" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "大阪周遊卡 2026：¥3,500 划算嗎？附一日行程（英文）" },
            { href: "/guides/attractions/things-to-do-osaka", title: "大阪景點攻略（2026）：周遊卡划算與不划算的地方（英文）" },
            { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "海遊館門票（2026）：票價、開放時間與入場時段（英文）" },
            { href: "/zh-tw/guides/attractions/usj-tickets-express-pass", title: "日本環球影城門票與快速通關（2026）：該買哪一種" },
            { href: "/guides/transport/osaka-transportation", title: "大阪交通攻略（2026）：地鐵、電車與 IC 卡（英文）" },
            { href: "/guides/transport/osaka-metro-pass", title: "大阪地鐵一日券 2026：1 日券與 2 日券、Enjoy Eco Card 比較（英文）" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "日本景點門票價格 2026：官方票價與購票規則（英文）" },
            { href: "/zh-tw/guides/attractions", title: "更多日本景點門票攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>去 1 項設施，還是 5 項？</h2>
            <p className={styles.ctaBannerDesc}>
              在這裡，費用只取決於這個問題。只去天守閣是 ¥1,200，買單張門票就好。加上御座船、庭園或櫓，還沒離開城牆，周遊卡就比較便宜，而且還包含地鐵。付款前請確認您訂單上顯示的取消期限。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                在 Klook 查看大阪城天守閣門票 →
              </KlookLink>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                大阪周遊卡 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
