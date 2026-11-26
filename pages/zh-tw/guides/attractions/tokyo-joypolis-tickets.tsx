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
  klookEsim,
  odaibaHotelsUrl,
  skyhopHopOnHopOffBus,
  teamlabPlanetsTicketUrl,
  tokyoBayDinnerCruiseSymphony,
  tokyoBaySunsetBoatCruise,
  tokyoBaySunsetCruise,
  tokyoBayYakatabuneDinnerShow,
  tokyoJoypolisPassport,
  tokyoJoypolisTicket,
  tokyoSightseeingBusTour,
  tokyoAirportStayAreas,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/tokyo-joypolis-tickets) section by section as of
// 2026-11-26 (task-jtk-20261126-TR01): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's (tokyo-joypolis.com, read 17 Nov
// 2026); nothing is added. Title term: 東京JOYPOLIS — the Tokyo Convention & Visitors Bureau's
// Traditional Chinese page and Taiwanese guides (trip.com tw, LINE TODAY) write the park's name
// in Latin capitals; "東京SEGA JOYPOLIS" also appears, so SEGA is given once in the hero.

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/tokyo-joypolis-tickets";
const TITLE = "東京JOYPOLIS門票 2026：通行證價格與值不值得";
const H1 = "東京JOYPOLIS門票 2026：JOYPOLIS通行證價格，值不值得買？";
const DESC =
  "東京JOYPOLIS門票：入場券 ¥1,700，設施無限暢玩的通行證 ¥6,000（15:00 後 ¥5,000），玩到第 5 項就回本。附台場一日行程。";

const CHECKED_ISO = "2026-11-17";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);

const PASSPORT_URL = klookFor(tokyoJoypolisPassport.url, LOCALE);
const TICKET_URL = klookFor(tokyoJoypolisTicket.url, LOCALE);
const SUNSET_URL = klookFor(tokyoBaySunsetCruise.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const OFFICIAL = [
  { label: "tokyo-joypolis.com 票價頁", href: "https://tokyo-joypolis.com/ticket/" },
  { label: "設施列表與單次費用", href: "https://tokyo-joypolis.com/attraction/" },
  { label: "交通資訊頁", href: "https://tokyo-joypolis.com/access/" },
];

const priceRows = [
  {
    ticket: "結論：該買哪一種？",
    adult: "玩第 5 項起買通行證",
    child: "玩第 4 項起買通行證",
    what: "只買入場券時，每項設施 ¥700–¥1,000。打算玩 5 項以上（學生 4 項以上）就買通行證；少於這個數量，就買入場券再逐項付費",
  },
  {
    ticket: "入場券（入場券）",
    adult: "¥1,700",
    child: "¥1,400",
    what: "只能入園，每項設施都要另外付費",
  },
  {
    ticket: "持入場券玩單項設施",
    adult: "¥700–¥1,000",
    child: "¥700–¥1,000",
    what: "每人每次。雲霄飛車、Halfpipe Tokyo 與 NARUTO 為 ¥1,000，其他多為 ¥700–¥900",
  },
  {
    ticket: "通行證（パスポート）",
    adult: "¥6,000",
    child: "¥5,000",
    what: "入場加當天設施無限暢玩，幾乎所有人要買的都是這一張",
  },
  {
    ticket: "入園後在館內購買通行證（館内料金）",
    adult: "¥4,300",
    child: "¥3,600",
    what: "已持入場券入園後的升級價格。¥1,700 + ¥4,300 = ¥6,000，所以不是折扣",
  },
  {
    ticket: "傍晚通行證（イブニングパスポート）",
    adult: "¥5,000",
    child: "¥4,000",
    what: "15:00 起販售，22:00 閉園的日子為 16:00 起。當天剩下的時間設施無限暢玩",
  },
  {
    ticket: "入園後在館內購買傍晚通行證",
    adult: "¥3,300",
    child: "¥2,600",
    what: "算法同上：¥1,700 + ¥3,300 = ¥5,000",
  },
  {
    ticket: "CHOI-NORI-NIGHT 2 次券（ちょいのりナイト2回券）",
    adult: "¥3,100",
    child: "¥3,100",
    what: "入場加任選 2 項設施，國小以上同一價格。17:00 起販售，22:00 閉園的日子為 18:00 起",
  },
  {
    ticket: "年票（年間パスポート）",
    adult: "¥29,000",
    child: "¥24,000",
    what: "一年內設施無限暢玩，只適合住在東京的人",
  },
];

const heightRows = [
  {
    limit: "無身高限制",
    rides:
      "Pirate's Plunder、NARUTO Music Dancer、MISSION SPARK、Gyakuten Saiban in Joypolis、Fortune Forest、Laura & Carla、Attack on Titan THE ATTRACTION、MURDER LODGE",
    note: "21 項中的 8 項，足以帶幼童玩上一段時間，但都不是刺激類設施",
  },
  {
    limit: "90 公分以上",
    rides: "Spicy Taxi、House of the Dead ~Scarlet Dawn~ THE ATTRACTION",
    note: "園內最低的身高限制",
  },
  {
    limit: "110 公分以上",
    rides:
      "LASER SHOOTING ISSEN、Sonic Athletics、Ayakashi Yashiki、Wild Wing、Wild Jungle Brothers、Wild River The Treasure Hunt",
    note: "大多數家庭行程卡在這一級，也正好是免費入場標準的 110 公分",
  },
  {
    limit: "130 公分以上",
    rides: "Gekion Live Coaster、Halfpipe Tokyo、Transformers Human Alliance Special",
    note: "室內雲霄飛車與 Halfpipe，正是 JOYPOLIS 最有名的兩項設施",
  },
  {
    limit: "140 公分以上，並有上限",
    rides: "Sadako ~Kurui Uranai no Yakata~（140–185 公分）、Storm-G（140–200 公分）",
    note: "同時設有最低與最高身高限制的只有這兩項",
  },
];

const comboRows = [
  {
    when: "結論",
    what: "上午 teamLab Planets，15:00 起用傍晚通行證玩 JOYPOLIS，晚上到台場海濱公園看夜景",
    ticket: "先買 Planets 的入場時段；JOYPOLIS 不必指定日期",
  },
  {
    when: "上午",
    what: "teamLab Planets TOKYO（豐洲）：百合海鷗線新豐洲站 1A 出口步行 3 分鐘。開放 8:00–22:00，最後入場為閉館前 1 小時",
    ticket: "指定日期與入場時段的門票；官方售票網站成人 ¥3,800 起",
  },
  {
    when: "中午",
    what: "同一條百合海鷗線從新豐洲直達台場海濱公園，不必轉乘；午餐在 DECKS Tokyo Beach",
    ticket: "IC 卡",
  },
  {
    when: "15:00 起",
    what: "東京JOYPOLIS，位於 DECKS 3–5 樓，台場海濱公園站步行 2 分鐘。傍晚通行證 15:00 起販售（22:00 閉園的日子為 16:00）",
    ticket: "傍晚通行證成人 ¥5,000／學生 ¥4,000；最後入場為閉園前 45 分鐘",
  },
  {
    when: "晚上",
    what: "DECKS 前方的台場海濱公園：公園管理單位特別介紹從沙灘、觀景台或空中步道看出去的夕陽與夜景",
    ticket: "不需預訂",
  },
  {
    when: "替代方案",
    what: "東京灣夕陽遊船，行經彩虹大橋與台場海岸，適合想從海上看夜景的人",
    ticket: "請提前購票；參考遊船攻略",
  },
];

const whoFor = [
  {
    title: "以下情況買通行證",
    desc: `您會玩 5 項以上設施（學生 4 項以上）。通行證成人 ¥6,000、學生 ¥5,000，其中設施部分相當於 ¥4,300 與 ¥3,600，而單項設施為 ¥700–¥1,000，所以選 ¥1,000 的設施時，從第 5 項起通行證就比較划算，也不必每次排隊前都算一次錢。票價取自 ${CHECKED} 的 tokyo-joypolis.com。`,
  },
  {
    title: "以下情況只買入場券",
    desc: `您只想玩兩三項、逛電玩樓層，或是幫大家顧包包的大人。入場券成人 ¥1,700、學生 ¥1,400，入園後可用 ¥4,300 升級為通行證，合計同樣是 ¥6,000，所以到現場再決定也不吃虧。${CHECKED} 查核。`,
  },
  {
    title: "以下情況買傍晚票",
    desc: `JOYPOLIS 排在台場一日行程的後半段。傍晚通行證 15:00 起販售（22:00 閉園的日子為 16:00 起），成人 ¥5,000、兒童 ¥4,000；CHOI-NORI-NIGHT 2 次券 17:00 起販售，國小以上一律 ¥3,100。${CHECKED} 查核。`,
  },
];

const steps = [
  {
    title: "先在官方行事曆確認日期",
    desc: `這是唯一不能省略的一步。JOYPOLIS 沒有公布固定的營業時間：官網以行事曆按期間公布，並說明時間可能不經通知變更。您的日期有哪一種傍晚票、幾點開賣，取決於當天是否 22:00 閉園。${CHECKED} 查核。`,
  },
  {
    title: "先決定票種，再決定在哪裡買",
    desc: "入場券、通行證、傍晚通行證與 2 次夜間券是四種不同的商品，最便宜與最貴之間相差超過 ¥4,000。先從上方表格選好票種，再打開售票平台，順序不要顛倒。",
  },
  {
    title: "想用中文介面或海外信用卡付款，就提前購票",
    desc: "JOYPOLIS 現場也有販售，所以不必擔心售罄；麻煩的是付款。Klook 的商品頁可用中文介面結帳、接受海外信用卡，入口出示手機 QR Code 即可入場，不必在售票櫃檯排隊。商品頁也標示可預訂當日、即時確認與免費取消；付款前請確認您的日期所顯示的取消期限。",
  },
  {
    title: "至少在閉園前 90 分鐘抵達，最好更早",
    desc: `最後入場為閉園前 45 分鐘，這是當天的硬性期限。此外，Klook 商品頁建議預留 2 到 4 小時，設施又分布在三個樓層，閉園前 1 小時才到只夠繞一圈。最後入場規定取自 ${CHECKED} 的 tokyo-joypolis.com。`,
  },
  {
    title: "保留 JOYPOLIS 卡以便再入場",
    desc: `官方英文頁說明，持 JOYPOLIS 卡者在發卡當天可無限次再入場；日文官網補充，再入場可到閉園前 45 分鐘為止。正因如此，JOYPOLIS 可以和台場的其他行程搭配，而不必花上一整天。${CHECKED} 查核。`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "東京JOYPOLIS通行證多少錢？",
    a: `JOYPOLIS 通行證（入場加當天設施無限暢玩）現場售價成人（18 歲以上）¥6,000，國小、國中、高中學生 ¥5,000。持入場券入園後在館內購買為 ¥4,300 與 ¥3,600，合計相同。15:00 後（22:00 閉園的日子為 16:00 後）的傍晚通行證為 ¥5,000 與 ¥4,000。只買入場券為 ¥1,700 與 ¥1,400。取自 ${CHECKED} 的 tokyo-joypolis.com。`,
  },
  {
    q: "東京JOYPOLIS值得去嗎？",
    a: `如果同行的人會玩至少 5 項設施，而且每個人都符合身高限制，就值得。只持入場券時每項設施 ¥700 到 ¥1,000，所以成人通行證中 ¥4,300 的設施部分，從第 5 項（選 ¥1,000 的設施）到第 7 項（選 ¥700 的設施）起回本。身高未滿 110 公分的兒童只能玩無身高限制的設施，就比較不划算。${CHECKED} 查核的票價。`,
  },
  {
    q: "JOYPOLIS 需要玩多久？",
    a: `預留 2 到 4 小時，這是 Klook 商品頁提供的時間。三個樓層共有 21 項設施，最後入場為閉園前 45 分鐘，所以即使只是短暫停留，也請至少在閉園前 90 分鐘抵達。當天在最後入場前都可以再入場，可以出去吃午餐再回來。${CHECKED} 查核。`,
  },
  {
    q: "JOYPOLIS 適合大人嗎？",
    a: `適合。園區以青少年與成人的設施為主：Gekion Live Coaster 與 Halfpipe Tokyo 需 130 公分以上，Storm-G 為 140 到 200 公分，3D 音效恐怖設施 MURDER LODGE 不開放 7 歲以下兒童。成人通行證 ¥6,000；60 歲以上出示年齡證明可免費入場，並可用館內價格 ¥4,300 購買通行證。${CHECKED} 查核。`,
  },
  {
    q: "怎麼去東京JOYPOLIS？",
    a: `搭百合海鷗線到台場海濱公園站，步行 2 分鐘；或搭臨海線到東京電訊港站，步行 5 分鐘。官方交通頁標示百合海鷗線從新橋約 13 分鐘、從東京站經新橋約 23 分鐘，臨海線從澀谷約 18 分鐘、從新宿約 23 分鐘。JOYPOLIS 位於台場 1-6-1 DECKS Tokyo Beach 3 至 5 樓。${CHECKED} 查核。`,
  },
];

const moreFaqItems: FaqItem[] = [
  {
    q: "東京JOYPOLIS門票多少錢？",
    a: `只買入場券為 18 歲以上成人 ¥1,700，國小、國中、高中學生 ¥1,400。加上當天設施無限暢玩的通行證為成人 ¥6,000、學生 ¥5,000。傍晚通行證 15:00 起販售（22:00 閉園的日子為 16:00 起），為 ¥5,000 與 ¥4,000；CHOI-NORI-NIGHT 券（入場加任選 2 項設施，17:00 起販售）國小以上一律 ¥3,100。年票為成人 ¥29,000、學生 ¥24,000。全部取自 ${CHECKED} 的 tokyo-joypolis.com。`,
  },
  {
    q: "入場券和 JOYPOLIS 通行證有什麼不同？",
    a: `入場券讓您進入建築物，通行證讓您搭乘設施。持成人入場券 ¥1,700 入園後，每項設施都要另外付費，也可以在館內用 ¥4,300 升級為通行證，合計正好是現場通行證的 ¥6,000，所以分兩次購買不會省錢也不會多花錢。單項設施為 ¥700 到 ¥1,000，想玩 5 項以上就買通行證。${CHECKED} 查核。`,
  },
  {
    q: "JOYPOLIS 傍晚有更便宜的門票嗎？",
    a: `有兩種。傍晚通行證成人 ¥5,000、學生 ¥4,000，比一日通行證便宜 ¥1,000，平日 15:00 起販售，22:00 閉園的日子為 16:00 起。更便宜的是 CHOI-NORI-NIGHT 2 次券，國小以上一律 ¥3,100，17:00 起販售（22:00 閉園的日子為 18:00 起），包含入場與任選 2 項設施。兩者皆取自 ${CHECKED} 的官方票價頁。`,
  },
  {
    q: "東京JOYPOLIS營業時間是幾點？",
    a: `沒有單一答案，而這正是官方的說法：tokyo-joypolis.com 以行事曆按期間公布營業時間，並說明可能不經通知變更。每天都適用的規則有兩條：最後入場為閉園前 45 分鐘，再入場也是到閉園前 45 分鐘為止。傍晚票的開賣時間取決於閉園時間（傍晚通行證 15:00 或 16:00，夜間券 17:00 或 18:00），所以在行事曆確認日期時，也就知道當天有哪一種傍晚票。${CHECKED} 查核。`,
  },
  {
    q: "東京JOYPOLIS有身高限制嗎？",
    a: `有，21 項設施中有 13 項，而且影響比一般樂園大。90 公分以上 2 項、110 公分以上 6 項、130 公分以上 3 項（包括園區最有名的 Gekion Live Coaster 與 Halfpipe Tokyo），另有 2 項同時設有上限：Sadako 為 140 到 185 公分，Storm-G 為 140 到 200 公分。其餘 8 項完全沒有限制。取自 ${CHECKED} 的官方設施頁。`,
  },
  {
    q: "可以帶幼童去東京JOYPOLIS嗎？",
    a: `可以免費入場，但在排定整個下午之前，請先看身高限制表。官網規定未滿 110 公分的學齡前兒童免費入場，而 110 公分同時也是 6 項設施的最低身高，另有 3 項為 130 公分。實際上，未滿 110 公分的兒童可以玩 8 項無身高限制的設施與電玩樓層，值得一去，但時間不長。限制最低的 Spicy Taxi 與 House of the Dead 設施為 90 公分起。${CHECKED} 查核。`,
  },
  {
    q: "還有哪些人可以免費入場？",
    a: `官方票價頁列出四類：未滿 110 公分的學齡前兒童；出示年齡證明的 60 歲以上旅客；出示母子手冊的孕婦；身心障礙者手冊持有人與最多 2 名陪同者。同行者若屬於其中一類，請在現場購買他們的門票，不要在線上購買。${CHECKED} 查核。`,
  },
  {
    q: "東京JOYPOLIS門票需要提前購買嗎？",
    a: "不需要。和東京迪士尼或 teamLab 不同，JOYPOLIS 是直接入園的樂園，沒有指定日期的門票，也沒有入場時段，所以不會售罄，也不必提前幾週安排。線上購票的好處在於結帳，而不在於名額：透過售票平台可以用中文介面購買、使用能順利付款的信用卡，並在入口出示 QR Code。如果您已經在台場，身上又有日本發行的信用卡，在售票櫃檯購買也完全沒問題。",
  },
  {
    q: "下雨天去東京JOYPOLIS是好選擇嗎？",
    a: "是東京較好的雨天選擇之一。整個園區都在購物中心內的室內，購物中心與台場海岸其他設施之間部分有遮蔽通道相連，百合海鷗線車站也只要 2 分鐘。如果東京灣遊船或戶外觀景台因雨取消，這是不需要重新預訂就能替換的行程；加上可再入場，也能出去 DECKS 用餐再回來。",
  },
  {
    q: "同一天在台場還能做什麼？",
    a: "最順的搭配是東京灣遊船：船從台場與不遠的日之出棧橋出發，傍晚的航班和傍晚通行證的時間剛好接得上。有一點要更正，因為仍有不少人弄錯：teamLab Borderless 已經不在台場。它在台場閉館後，搬到麻布台之丘重新開幕，所以 JOYPOLIS 加 teamLab 的一天，如今是東京兩個不同的區域，而不是同一片海岸。另外，曾與 JOYPOLIS 同在 DECKS 大樓、常和 JOYPOLIS 一起以套票販售的東京杜莎夫人蠟像館，其官網說明已於 2026 年 9 月 30 日結束營業。",
  },
];

const sameDayCards: KlookSameDayCard[] = [
  {
    kind: "門票",
    label: "teamLab Planets TOKYO 門票",
    ctaLabel: "購買 teamLab Planets 入場時段 →",
    url: klookFor(teamlabPlanetsTicketUrl, LOCALE),
    why: "Planets 位於與 JOYPOLIS 同一條百合海鷗線的新豐洲站，步行 3 分鐘，但門票指定日期與入場時段，是台場一日行程中最該先購買的部分。",
  },
  {
    kind: "住宿",
    label: "台場飯店",
    ctaLabel: "在 Klook 查看台場飯店 →",
    url: klookFor(odaibaHotelsUrl, LOCALE),
    why: "傍晚通行證可以用到閉園，海岸夜景又在那之後，住在台場就不必深夜再跨海回市區。",
  },
  {
    kind: "eSIM",
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    url: ESIM_URL,
    why: "JOYPOLIS 以行事曆公布營業時間，而不是固定時間，傍晚票也取決於當天的時間，出發前請用手機確認日期。",
  },
];

const tripPrepItems: KlookTripPrepItem[] = [
  {
    label: "東京灣夕陽遊船",
    ctaLabel: "查看東京灣夕陽遊船 →",
    url: SUNSET_URL,
    why: "配合日落時間出航，行經彩虹大橋與台場海岸，和在 JOYPOLIS 用傍晚通行證度過的下午時間接得上。",
  },
  {
    label: "東京灣 Symphony 號晚餐遊船",
    ctaLabel: "查看 Symphony 晚餐遊船 →",
    url: klookFor(tokyoBayDinnerCruiseSymphony.url, LOCALE),
    why: "同一個晚上的晚餐版本：從日之出棧橋出發，繞行彩虹大橋一圈的 2 小時 30 分鐘全餐遊船。",
  },
  {
    label: "東京敞篷觀光巴士（Skyhop Bus）",
    ctaLabel: "查看敞篷巴士車票 →",
    url: klookFor(skyhopHopOnHopOffBus.url, LOCALE),
    why: "路線除了淺草與六本木、澀谷，也包含台場，去程與台場周邊的其餘時間都能搭乘。",
  },
  {
    label: "東京車站、丸之內周邊飯店",
    ctaLabel: "在 Klook 查看飯店價格 →",
    url: klookFor(tokyoAirportStayAreas[0].url, LOCALE),
    why: "兩座機場的利木津巴士與成田的 N'EX 都停靠這裡，若在旅程前段安排台場一日遊，這是最單純的住宿地點。",
  },
];

const tourPicks = [
  withKlookLocale(tokyoBaySunsetBoatCruise, LOCALE, {
    title: "東京灣白天與夕陽小船遊船",
    desc: "從芝浦出發、船上有導覽員的 1 小時小船遊船，是不含晚餐的東京灣遊船",
  }),
  withKlookLocale(tokyoBayYakatabuneDinnerShow, LOCALE, {
    title: "東京灣屋形船晚餐遊船（含表演）",
    desc: "1 小時 30 分鐘的傳統屋形船，含壽喜燒與無限暢飲軟性飲料，可在台場外海走上甲板",
  }),
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "東京觀光巴士一日遊",
    desc: "附多語語音導覽，遊覽皇居庭園、淺草與東京晴空塔的導覽行程",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "東京JOYPOLIS門票" }];

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
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.88rem" }}>
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

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)" }}>
    {label}
  </a>
);

export default function ZhTwTokyoJoypolisTicketsPage({ updated }: { updated: PageUpdated }) {
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
            SEGA 經營的室內遊樂園東京JOYPOLIS（東京ジョイポリス）位於台場一棟大樓的 3 樓以上，距離百合海鷗線車站 2 分鐘。各種門票的價格、通行證從第幾項設施開始回本，以及如何排進台場一日行程。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "官方票價，附查核日期", "通行證回本點"].map((t) => (
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
            東京JOYPOLIS門票成人只買入場券為 ¥1,700，設施無限暢玩的 JOYPOLIS 通行證為 ¥6,000（國小至高中學生為 ¥1,400 與 ¥5,000）；只持入場券時每項設施 ¥700–¥1,000，所以通行證大約從第 5 項起回本。傍晚另有價格：傍晚通行證 15:00 起（22:00 閉園的日子為 16:00 起）¥5,000，可玩 2 項的 CHOI-NORI-NIGHT 券 17:00 起 ¥3,100。預留 2 到 4 小時，搭百合海鷗線到台場海濱公園站（步行 2 分鐘，從新橋約 13 分鐘），或搭臨海線到東京電訊港站（步行 5 分鐘）。票價與交通取自 {CHECKED} 的 tokyo-joypolis.com。
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速解答</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>只買入場券</p>
                <p className={styles.verdictStatValue}>成人 ¥1,700／學生 ¥1,400</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>通行證（設施無限暢玩）</p>
                <p className={styles.verdictStatValue}>成人 ¥6,000／學生 ¥5,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>預留時間</p>
                <p className={styles.verdictStatValue}>2–4 小時，最後入場為閉園前 45 分鐘</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>交通</p>
                <p className={styles.verdictStatValue}>台場海濱公園站步行 2 分鐘</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>重點整理：</strong>東京JOYPOLIS門票共有四種。只買入場券為成人 ¥1,700、學生 ¥1,400；加上設施無限暢玩的通行證為 ¥6,000 與 ¥5,000；15:00 起販售的傍晚通行證為 ¥5,000 與 ¥4,000；17:00 起販售的 2 次夜間券一律 ¥3,100。沒有指定日期，也不會售罄，所以要買的是適合的票，而不是最早的票。購買前也請先看下方的身高限制表：21 項設施中有 13 項設有最低身高，最有名的兩項需要 130 公分。票價取自 {CHECKED} 的 tokyo-joypolis.com。
            </p>
            <KlookLink
              href={PASSPORT_URL}
              target="_blank"
              rel={KLOOK_REL}
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
              在 Klook 查看 JOYPOLIS 通行證 →
            </KlookLink>
          </div>
        </div>

        <KlookSameDayCards
          heading="台場一日行程的其他預訂：teamLab Planets、海邊住宿與行動數據"
          cards={sameDayCards}
          footnote={
            <>
              入場時段與票價請參考{" "}
              <Link href="/zh-tw/guides/attractions/teamlab-planets-tickets">teamLab Planets 門票攻略</Link>。
            </>
          }
        />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>東京JOYPOLIS是什麼樣的地方？</h2>
          <p className={styles.bodyText}>
            東京JOYPOLIS是 SEGA 的室內遊樂園，位於台場 1-6-1 DECKS Tokyo Beach 購物中心的 3 至 5 樓。它不是迪士尼那種主題樂園，也沒有打算假裝是：21 項設施——室內雲霄飛車、Halfpipe 模擬器、數個步行體驗的恐怖與解謎設施，以及幾項授權作品的體驗——全部和電玩機台樓層一起在同一個屋頂下。
          </p>
          <p className={styles.bodyText}>
            所以它的用途很明確：完全在室內、離車站步行 2 分鐘、不需提前預訂，而且 2 到 4 小時就能玩完，不必花上一整天。下雨的下午、青少年同行，或是台場一日行程的後半段，這裡都是東京最容易加進行程的地方之一。真正要決定好的是四種門票買哪一種，以及同行的每個人是否都符合身高限制。
          </p>
          <p className={styles.bodyText}>
            如果同行的人比起搭設施，更想看表演、和角色見面，東京另一個大型室內樂園是多摩中心的三麗鷗彩虹樂園。和 JOYPOLIS 不同，它販售指定日期的通行證，還需要預約入園時間，選日期前請先看{" "}
            <Link href="/guides/attractions/sanrio-puroland-tickets" hrefLang="en" style={linkStyle}>
              三麗鷗彩虹樂園門票攻略（英文）
            </Link>
            。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>東京JOYPOLIS通行證多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            成人 ¥6,000、學生 ¥5,000；15:00 起的傍晚通行證為 ¥5,000 與 ¥4,000。以下列出東京JOYPOLIS所有門票，第一列是通行證開始回本的設施數量。「學生」是園方自己的票種（國小、國中、高中學生），「成人」指 18 歲以上。
          </p>
          <Table
            head={["票種", "成人（18 歲以上）", "學生", "說明"]}
            rows={priceRows.map((r) => [r.ticket, r.adult, r.child, r.what])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{CHECKED_ISO}。官方資料來源：
            {OFFICIAL.map((o, i) => (
              <span key={o.href}>
                {ext(o.href, o.label)}
                {i < OFFICIAL.length - 1 ? "、" : "。"}
              </span>
            ))}
            回本那一列是用這些票價計算的：通行證減去入場券為成人 ¥4,300、學生 ¥3,600，所以選 ¥1,000 的設施時從第 5 項（學生第 4 項）起回本，選 ¥700 的設施時從第 7 項（第 6 項）起。票價可能調整，購買時請再確認，且園方不退票。可免費入場的有四類：未滿 110 公分的學齡前兒童、出示年齡證明的 60 歲以上旅客、出示母子手冊的孕婦，以及身心障礙者手冊持有人與最多 2 名陪同者。日本各地景點門票與各自的查核日期，請見{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" hrefLang="en" style={linkStyle}>
              日本景點門票價格總表（英文）
            </Link>
            。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>選哪種票</span>
          <h2 className={styles.sectionTitle}>東京JOYPOLIS值得去嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            如果您會玩 5 項以上設施，而且每個人都符合身高限制，就值得；只玩兩三項的話，入場券加單項費用比較便宜。四種當日門票各適合的情況如下：
          </p>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASSPORT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Klook JOYPOLIS 通行證 →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              以入場為主的門票商品 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>身高限制</span>
          <h2 className={styles.sectionTitle}>哪些設施有身高限制？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            21 項設施中有 13 項設有最低身高，其中 2 項另有最高身高。要幫身高 105 公分的孩子買 ¥5,000 學生通行證之前，就該先看這張表；這也是免費入場標準 110 公分值得再看一眼的原因，因為它同時是園內最常見的最低身高。
          </p>
          <Table head={["身高", "設施", "代表什麼"]} rows={heightRows.map((r) => [r.limit, r.rides, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            以上所有限制取自 {CHECKED} tokyo-joypolis.com 的各設施頁面。合作設施會更換，如果是為了某一項設施而去，請確認您當天的設施列表。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>成人</span>
          <h2 className={styles.sectionTitle}>JOYPOLIS 適合大人嗎？</h2>
          <p className={styles.bodyText}>
            適合。園區最有名的兩項設施 Gekion Live Coaster 與 Halfpipe Tokyo 需 130 公分以上，Storm-G 為 140 到 200 公分。其他設施也是同樣取向：House of the Dead、LASER SHOOTING ISSEN 等射擊設施、步行體驗的貞子設施，以及不開放 7 歲以下兒童的 3D 音效恐怖設施 MURDER LODGE。成人通行證 ¥6,000；60 歲以上出示年齡證明可免費入場，並可用館內價格 ¥4,300 購買通行證。取自 {CHECKED} 的 tokyo-joypolis.com。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>營業時間與交通</span>
          <h2 className={styles.sectionTitle}>怎麼去東京JOYPOLIS？</h2>
          <p className={styles.bodyText}>
            搭百合海鷗線到台場海濱公園站步行 2 分鐘，或搭臨海線到東京電訊港站步行 5 分鐘；各出發地的完整路線列在本節最後。
          </p>
          <h2 className={styles.sectionTitle}>JOYPOLIS 需要玩多久？</h2>
          <p className={styles.bodyText}>
            依 Klook 商品頁的建議預留 2 到 4 小時，並至少在閉園前 90 分鐘抵達。JOYPOLIS 沒有公布固定的營業時間：官網以行事曆按期間公布，並明確說明時間可能不經通知變更。所以比較實在的做法是確認您自己的日期，而不是相信任何其他網站上的數字，包括本頁。每天都適用的規則有兩條：<strong>最後入場為閉園前 45 分鐘</strong>，再入場也是到閉園前 45 分鐘為止；官方英文頁並說明，持 JOYPOLIS 卡者在發卡當天可無限次再入場。
          </p>
          <p className={styles.bodyText}>
            閉園時間也決定傍晚票。平日傍晚通行證 15:00 起、2 次夜間券 17:00 起販售；22:00 閉園的日子分別延後到 16:00 與 18:00。打算買傍晚票的話，第一件事就是看行事曆。
          </p>
          <p className={styles.bodyText}>
            交通很簡單。官方交通頁標示搭百合海鷗線到台場海濱公園站步行約 2 分鐘，或搭臨海線到東京電訊港站步行約 5 分鐘。到台場海濱公園，從新橋約 13 分鐘、從東京站經新橋約 23 分鐘、從豐洲約 18 分鐘；搭臨海線從澀谷、新宿、池袋分別約 18、23、29 分鐘。官方請遊客搭乘大眾運輸。全部為 {CHECKED} 查核。{" "}
            <Link href="/guides/transport/tokyo-transportation" hrefLang="en" style={linkStyle}>
              東京交通攻略（英文）
            </Link>
            說明百合海鷗線與臨海線如何搭配 IC 卡與周遊卡，而{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" hrefLang="en" style={linkStyle}>
              東京地鐵通票（英文）
            </Link>
            這兩條路線都不能使用，請特別留意。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>購票步驟</span>
          <h2 className={styles.sectionTitle}>東京JOYPOLIS門票怎麼買</h2>
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
            <KlookLink href={PASSPORT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看通行證 →
            </KlookLink>
          </div>
        </section>

        <BookingEsimCard lead="JOYPOLIS 門票買好了？出發前先準備行動數據。" />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>台場一日</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 和 JOYPOLIS 可以排在同一天嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            可以：兩者都在百合海鷗線上，上午去 Planets，15:00 起用傍晚通行證玩 JOYPOLIS，天黑後到台場海岸。需要預約入場時段的只有 Planets。
          </p>
          <Table head={["時間", "行程", "門票"]} rows={comboRows.map((r) => [r.when, r.what, r.ticket])} />
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{CHECKED_ISO}。官方資料來源：{ext("https://tokyo-joypolis.com/ticket/", "東京JOYPOLIS票價")}；
            {ext("https://www.teamlab.art/e/planets/", "teamLab Planets 開放時間與交通")}及其
            {ext("https://teamlabplanets.dmm.com/en", "官方售票網站")}；{ext("https://www.tptc.co.jp/park/01_02", "台場海濱公園")}。teamLab 成人票價依日期與時段而異。遊船請見{" "}
            <Link href="/guides/attractions/tokyo-bay-cruise" hrefLang="en" style={linkStyle}>
              東京灣遊船攻略（英文）
            </Link>
            。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={PASSPORT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Klook JOYPOLIS 通行證 →
            </KlookLink>
            <KlookLink href={SUNSET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              東京灣夕陽遊船 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>當天其他行程</span>
          <h2 className={styles.sectionTitle}>當天在台場還能做什麼？</h2>
          <p className={styles.bodyText}>
            在裡面玩 2 到 4 小時，一天還剩下大半，而且可以再入場，所以 JOYPOLIS 可以當作行程中的一段，而不是整天的安排。最順的搭配是海上：東京灣遊船從台場海岸與不遠的日之出棧橋出發，傍晚的航班和 15:00 買的傍晚通行證時間剛好接得上。{" "}
            <Link href="/guides/attractions/tokyo-bay-cruise" hrefLang="en" style={linkStyle}>
              東京灣遊船攻略（英文）
            </Link>
            區分了以同一個搜尋詞販售、但完全不同的兩種船，並附官方航班時間與價格。
          </p>
          <p className={styles.bodyText}>
            有一點值得更正，因為仍有人因此跑到東京另一頭：<strong>teamLab Borderless 已經不在台場。</strong>它在台場閉館後，搬到麻布台之丘重新開幕，所以 JOYPOLIS 加 teamLab 的一天，如今是兩個不同的區域、兩段電車路程。{" "}
            <Link href="/zh-tw/guides/attractions/teamlab-borderless-tickets" style={linkStyle}>
              teamLab Borderless 門票攻略
            </Link>
            有目前的地點、指定時段與票價。東京另一個 teamLab——Planets——就在前往台場的百合海鷗線上，依 teamLab 官方資訊，從新豐洲站 1A 出口步行 3 分鐘；{" "}
            <Link href="/zh-tw/guides/attractions/teamlab-planets-tickets" style={linkStyle}>
              teamLab Planets 門票攻略
            </Link>
            整理了入場時段與官方售票網站。同樣地，曾與 JOYPOLIS 同在 DECKS 大樓、常一起以套票販售的東京杜莎夫人蠟像館，其官網說明已於 2026 年 9 月 30 日結束營業，所以這個組合已經不存在。
          </p>
          <p className={styles.bodyText}>
            如果要把 JOYPOLIS 排進較短的旅程，{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary" hrefLang="en" style={linkStyle}>
              東京 3 天行程（英文）
            </Link>
            示範了如何在不擠掉兩個真正需要指定時段的景點下，安排一個海岸下午；{" "}
            <Link href="/zh-tw/guides/attractions/things-to-do-tokyo" style={linkStyle}>
              東京必做清單
            </Link>
            則把東京景點分成需要提前幾週購票的，與可以直接去的。JOYPOLIS 明確屬於後者。
          </p>
        </section>

        <KlookTripPrep
          label="同一天一起預訂"
          heading="台場一日行程還值得預訂什麼？"
          intro="在裡面玩 2 到 4 小時，晚上還空著，最適合的安排就是海上。"
          items={tripPrepItems}
        />

        <EsimCtaBottom />

        <FaqList items={[...faqItems, ...moreFaqItems]} heading="東京JOYPOLIS門票常見問題" />

        <KlookTourPicks
          heading="台場一日行程的其餘時間"
          intro="兩項從台場與日之出一側出航的東京灣遊船，加上市區觀光巴士，適合 JOYPOLIS 前後的時段。Klook 價格依日期而異，請打開商品頁確認您日期的價格與上船地點。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/legoland-japan-tickets", title: "日本樂高樂園門票（2026）：價格、營業時間與值不值得（英文）" },
            { href: "/guides/attractions/ghibli-park-tickets", title: "吉卜力公園門票（2026）：價格、開賣時間與海外購票（英文）" },
            { href: "/zh-tw/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets 門票：票價、開放時間與購票方式" },
            { href: "/guides/attractions/tokyo-bay-cruise", title: "東京灣遊船（2026）：屋形船與 Symphony 號、時間與價格（英文）" },
            { href: "/zh-tw/guides/attractions/teamlab-borderless-tickets", title: "teamLab Borderless 門票：票價、購票方式與入場時段" },
            { href: "/guides/attractions/sanrio-puroland-tickets", title: "三麗鷗彩虹樂園門票 2026：價格與購票（英文）" },
            { href: "/guides/attractions/fuji-q-highland-tickets", title: "富士急樂園門票（2026）：一日券價格與交通（英文）" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "東京 3 天行程（2026）：要買什麼票、依什麼順序（英文）" },
            { href: "/zh-tw/guides/attractions/things-to-do-tokyo", title: "東京必做清單：哪些要提前購票、哪些可以直接去" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "東京地鐵通票（2026）：24、48、72 小時（英文）" },
            { href: "/guides/transport/tokyo-transportation", title: "東京交通攻略（2026）：電車、地鐵與 IC 卡（英文）" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>買適合的票，而不是第一眼看到的票</h2>
            <p className={styles.ctaBannerDesc}>
              這裡沒有指定日期，也不會售罄，唯一要決定的是四種商品中要買哪一種。Klook 商品頁可用中文介面結帳、接受海外信用卡，並提供入口用的 QR Code；付款前請確認您日期所顯示的取消期限。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={PASSPORT_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                在 Klook 查看 JOYPOLIS 通行證 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
