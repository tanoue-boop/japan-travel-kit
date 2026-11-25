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
import { jrHarukaUrl, jrKansaiAreaPass, jrKansaiMiniPass, kansaiAreaPassSameDayPrep } from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd, productOfferJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/kansai-area-pass) section by section as of
// 2026-11-25 (task-jtk-20261125-TR02): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's; nothing is added.
// Title term: 關西地區鐵路周遊券 — JR West's own Traditional Chinese name
// ("WEST QR關西地區鐵路周遊券", westjr.co.jp/global/tc/ticket/westqr/kansaiarea/), also the
// name Taiwan and Hong Kong guides use. Other pass names follow JR West's tc pages
// (關西廣域鐵路周遊券, 關西迷你鐵路周遊券, 關西&廣島地區鐵路周遊券).

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/kansai-area-pass";
const TITLE = "JR關西地區鐵路周遊券 2026：價格與關西廣域比較";
const H1 = "JR關西地區鐵路周遊券 2026：價格、HARUKA 與關西廣域周遊券比較";
const DESC =
  "JR關西地區鐵路周遊券 2026 價格：1 日 ¥2,700、3 日 ¥5,500，含關西機場 HARUKA，不含新幹線。與關西廣域周遊券、ICOCA 比較。";

const CHECKED_ISO = "2026-11-20";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const R04_CHECKED = dateLabel("2026-11-13", LOCALE);
const PREV_CHECKED = dateLabel("2026-11-03", LOCALE);
const OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/westqr/kansaiarea/";
const HARUKA_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/westqr/haruka/";
const WIDE_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/pass/kansai_wide/";
const ICOCA_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/howto/icoca/";

const KANSAI_PASS_URL = klookFor(jrKansaiAreaPass.url, LOCALE);
const HARUKA_URL = klookFor(jrHarukaUrl, LOCALE);

const QR_1_DAY = "¥2,700";
const QR_4_DAY = "¥6,700";

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const vsWideRows = [
  {
    option: "結論",
    area: "搭 JR 往返京都、大阪、奈良、神戶、姬路與關西機場 → 關西地區鐵路周遊券",
    shinkansen: "要搭新幹線到岡山，或去城崎溫泉、天橋立、白濱 → 關西廣域",
    price: "只在一座城市內搭地鐵 → ICOCA",
    who: "",
  },
  {
    option: "JR 西日本關西地區鐵路周遊券（WEST QR）",
    area: "京都、大阪、奈良、神戶、姬路、和歌山、大津、敦賀、伊賀上野一帶的 JR 西日本一般列車；HARUKA 自由席不限次數，指定席 2 次",
    shinkansen: "✗ 不能搭新幹線；HARUKA 以外的特急也不能搭",
    price: "¥2,700（1 日）、¥4,700（2 日）、¥5,500（3 日）、¥6,700（4 日），成人",
    who: "從關西機場開始或結束的 1–4 天關西行程",
  },
  {
    option: "JR 西日本關西廣域鐵路周遊券",
    area: "關西地區周遊券的全部範圍，再加上岡山、高松、城崎溫泉、天橋立、鳥取、白濱；HARUKA、KUROSHIO、KONOTORI、SUPER HAKUTO 等特急的指定席",
    shinkansen: "✓ 山陽新幹線指定席，僅限新大阪 ⇔ 岡山（不含往東京的東海道新幹線）",
    price: "連續 5 天 ¥12,000，成人（兒童 ¥6,000）",
    who: "5 天行程中至少有一天要去比姬路更遠的地方",
  },
  {
    option: "ICOCA（JR 西日本 IC 卡）",
    area: "在日本全國 IC 卡適用範圍內的鐵路與巴士按次扣款：JR、地鐵、私鐵與巴士",
    shinkansen: "不是周遊券：每次車資從餘額扣除",
    price: "訪日旅客版 ICOCA ¥2,000，含 ¥500 押金（關西機場站 JR 售票處）",
    who: "只住一座城市、搭地鐵與私鐵的日子，以及搭配周遊券補足車資",
  },
];

const priceRows = [
  { days: "1 日", qrAdult: QR_1_DAY, qrChild: "¥1,350", perDay: "¥2,700", oldAdult: "¥2,800" },
  { days: "2 日", qrAdult: "¥4,700", qrChild: "¥2,350", perDay: "¥2,350", oldAdult: "¥4,800" },
  { days: "3 日", qrAdult: "¥5,500", qrChild: "¥2,750", perDay: "¥1,833", oldAdult: "¥5,800" },
  { days: "4 日", qrAdult: QR_4_DAY, qrChild: "¥3,350", perDay: "¥1,675", oldAdult: "¥7,000" },
];

const breakEvenRows = [
  { trip: "關西機場 → 京都，1 天", singles: "¥2,700", pass: `${QR_1_DAY}（1 日券）`, result: "價格相同，當天其他 JR 都不用再付車資" },
  { trip: "關西機場 → 神戶，1 天", singles: "¥2,300", pass: `${QR_1_DAY}（1 日券）`, result: "當天還要再搭 ¥400 的 JR 才划算" },
  { trip: "關西機場 → 奈良，1 天", singles: "¥2,200", pass: `${QR_1_DAY}（1 日券）`, result: "當天還要再搭 ¥500 的 JR 才划算" },
  { trip: "關西機場 → 大阪／新大阪，1 天", singles: "¥1,900", pass: `${QR_1_DAY}（1 日券）`, result: "當天還要再搭 ¥800 的 JR 才划算" },
  { trip: "關西機場 → 只到天王寺", singles: "¥1,600", pass: `${QR_1_DAY}（1 日券）`, result: "單程票便宜 ¥1,100，不必買周遊券" },
  { trip: "京都進、京都出，住 2 天", singles: "¥2,700 + ¥2,700 = ¥5,400", pass: "¥4,700（2 日券）", result: "不搭其他車也便宜 ¥700" },
  { trip: "京都進、大阪出，3 天", singles: "¥2,700 + ¥1,900 = ¥4,600", pass: "¥5,500（3 日券）", result: "3 天內還要再搭 ¥900 的 JR 才划算" },
  { trip: "京都進、京都出，4 天", singles: "¥2,700 + ¥2,700 = ¥5,400", pass: `${QR_4_DAY}（4 日券）`, result: "4 天內還要再搭 ¥1,300 的 JR 才划算" },
];

const lineRows = [
  { service: "關西機場特快 HARUKA，自由席", allowed: "✓ 不限次數", note: "從關西機場到天王寺、新大阪、京都的機場列車。這是買這張周遊券最主要的理由。" },
  { service: "關西機場特快 HARUKA，普通車廂指定席", allowed: "✓ 2 次", note: "含 2 次指定席，不需另外付費。請在乘車日 30 天前起於 WEST-QR 網站預約；JR 西日本說明無法在車上、售票機或售票櫃檯預約。" },
  { service: "HARUKA 綠色車廂（頭等）", allowed: "✗ 不含", note: "需另外購票。周遊券只能搭普通車廂。" },
  { service: "JR 西日本新快速、快速與普通列車", allowed: "✓ 不限次數", note: "有效區域內的一般路線：大阪–京都、大阪–神戶、大阪–奈良、大阪–姬路等。" },
  { service: "新幹線（東海道、山陽）", allowed: "✗ 不能搭", note: "任何區間都不能搭。即使在周遊券有效的那一天，新大阪到京都搭新幹線也要另外買票。" },
  { service: "其他特急列車", allowed: "✗ 不含", note: "周遊券能搭的特急只有 HARUKA。Thunderbird（雷鳥號）、KUROSHIO（黑潮號）等都要另外買票。" },
  { service: "私鐵：阪急、京阪、近鐵、南海", allowed: "✗ 不含", note: "這是 JR 西日本的票券；JR 西日本舊版周遊券頁面上的京阪、阪急乘車券，也是另外販售的兌換券。京都與大阪最方便觀光的路線常常是這些私鐵，而不是 JR。" },
  { service: "大阪地鐵（Osaka Metro）、京都市營地下鐵與市區公車", allowed: "✗ 不含", note: "不能搭地鐵與市區公車。在這兩座城市裡，仍需要 IC 卡或城市周遊券。" },
  { service: "JR 列車付費座位（A-Seat）與普通列車綠色車廂", allowed: "✗ 需加價", note: "新快速、快速與普通列車的一般座位可以搭；付費的 A-Seat 與綠色車廂需要加價。" },
];

const compareRows = [
  { option: "結論", price: "—", covers: "只在關西、搭 JR 與 HARUKA → 關西地區鐵路周遊券。搭近鐵去奈良 → 近鐵周遊券。同一趟去廣島 → 關西&廣島地區鐵路周遊券", pick: "KANSAI ONE PASS 是 IC 卡，不是可替代的周遊券" },
  { option: "WEST QR 關西地區鐵路周遊券", price: `${QR_1_DAY}（1 日）至 ${QR_4_DAY}（4 日），成人`, covers: "大阪、京都、神戶、奈良、姬路、和歌山、大津、敦賀、伊賀上野一帶的 JR 西日本一般列車，加上 HARUKA 自由席不限次數與 2 次指定席", pick: "從關西機場開始或結束的關西行程，首選這張" },
  { option: "關西迷你鐵路周遊券", price: "連續 3 天 ¥3,000，成人（兒童 ¥1,500）", covers: "JR 西日本快速、普通列車與關空快速。HARUKA 需另購特急券", pick: "如果機場段改搭較慢的關空快速而不是 HARUKA，這張最便宜" },
  { option: "HARUKA 單程票（HARUKA One-way Ticket）", price: "從關西機場：天王寺 ¥1,600、大阪／新大阪 ¥1,900、神戶 ¥2,300、奈良 ¥2,200、京都 ¥2,700", covers: "只有一趟機場路程，之後的城市間移動不含", pick: "整趟旅程只有機場這一段搭 JR 時" },
  { option: "近鐵周遊券（KINTETSU RAIL PASS）", price: "¥1,900（1 日）、¥3,700（2 日）、¥4,900（5 日）、¥6,700（5 日 plus）", covers: "只限近鐵：大阪難波到近鐵奈良與京都，5 日券可到伊勢志摩與名古屋。不含 JR 與 HARUKA", pick: "如果奈良公園是主要的一日遊，而且住在難波附近（從難波到奈良的是近鐵，不是 JR）" },
  { option: "關西&廣島地區鐵路周遊券", price: "連續 5 天 ¥17,000，成人（兒童 ¥8,500）", covers: "關西的 JR 西日本，加上山陽新幹線新大阪 ⇄ 廣島指定席、含 HARUKA 在內的特急，以及 JR 宮島渡輪", pick: "同一趟要去廣島與宮島時；關西地區鐵路周遊券完全不能搭新幹線" },
  { option: "KANSAI ONE PASS", price: "不是周遊券價格：可儲值、按次扣款的 IC 卡", covers: "JR、私鐵、地鐵與巴士按次扣款；2027 年 3 月前陸續停售", pick: "不能取代鐵路周遊券。要按次扣款的話，ICOCA 等任何 IC 卡都一樣" },
  { option: "關西廣域鐵路周遊券", price: "連續 5 天 ¥12,000，成人（兒童 ¥6,000）", covers: "以上範圍再加上山陽新幹線新大阪 ⇄ 岡山指定席，以及高松、城崎溫泉、天橋立、鳥取、白濱", pick: "如果行程不只到姬路為止；去關西以外一日遊時，答案就不同" },
  { option: "大阪周遊卡（OSAKA AMAZING PASS）", price: `1 日 ¥3,500、2 日 ¥5,000（${PREV_CHECKED}確認）`, covers: "免費搭乘大阪路線圖內的巴士與電車，並可進入指定景點：這是城市周遊卡，不是區域鐵路周遊券", pick: "在大阪市區玩一天時使用。無法取代關西地區鐵路周遊券的機場路段，以及往返京都、奈良的移動" },
  { option: "JR Pass 全國版（2026 年 10 月 1 日改版後）", price: `7 天普通車廂：官網 ¥50,000，海外旅行社兌換券 ¥53,000（${PREV_CHECKED}確認）`, covers: "全國 JR，含大部分新幹線：範圍遠大於關西，價格是關西 4 日券的 7 倍以上", pick: "行程包含東京時才考慮；划算與否請看 JR Pass 攻略" },
];

const worthRows = [
  { plan: "抵達關西機場後直接去京都", verdict: "✓ 買 1 日券", why: "2026 年 11 月 1 日起售出的 HARUKA 單程票到京都為 ¥2,700，與 1 日券同價。周遊券不用多花錢，當天搭的其他 JR 也全都不用再付車資。" },
  { plan: "在大阪、京都、奈良、神戶之間搭 JR 玩 3 或 4 天", verdict: "✓ 買 3 日或 4 日券", why: `4 天 ${QR_4_DAY} 涵蓋機場來回與城市間移動。光是機場兩段：HARUKA 單程到京都 ¥2,700、從大阪出 ¥1,900，就占了 ¥6,700 中的 ¥4,600，只剩 ¥2,100 要靠其他行程補足。` },
  { plan: "住在一座城市，靠步行、地鐵與公車觀光", verdict: "✗ 不用買", why: "大阪地鐵、京都市營地下鐵與市區公車都不能搭。如果每天都在同一座城市，IC 卡加城市周遊卡比較便宜，周遊券只會和機場路段重複。" },
  { plan: "搭阪急、京阪或近鐵逛京都寺廟", verdict: "✗ 買錯票", why: "伏見稻荷、嵐山與奈良都可以搭這張周遊券不能用的私鐵前往。買 JR 票券之前，請先確認要去的車站是哪家公司的路線。" },
  { plan: "同一趟有東京，或有新幹線路段", verdict: "✗ 不是這張", why: "任何區間的新幹線都不能搭，有效區域也遠遠到不了東京。請比較全國版 JR Pass 的價格，或另外買新幹線那一段，只在關西的日子使用關西周遊券。" },
  { plan: "持日本護照或居住在日本", verdict: "✗ 不符合資格", why: "JR 西日本只販售給持外國政府核發護照、以「短期滯在」身分入境的旅客。日本國籍者不能使用，在日本有永住權的外國人也不能使用。" },
];

const faqItems: FaqItem[] = [
  {
    q: "JR關西地區鐵路周遊券多少錢？",
    a: `成人連續 1 天 ${QR_1_DAY}、2 天 ¥4,700、3 天 ¥5,500、4 天 ${QR_4_DAY}；6 至 11 歲兒童半價（¥1,350／¥2,350／¥2,750／¥3,350）。這是目前販售中的 JR 西日本 WEST QR 關西地區鐵路周遊券的價格。舊版紙本周遊券（¥2,800／¥4,800／¥5,800／¥7,000）已於 2026 年 9 月 30 日停售。${CHECKED}於 westjr.co.jp 確認。`,
  },
  {
    q: "關西地區鐵路周遊券和關西廣域鐵路周遊券，哪一張比較好？",
    a: `第一次去關西，大多數人買關西地區鐵路周遊券就夠了；只有要去比姬路更遠的地方，才需要關西廣域鐵路周遊券。關西地區鐵路周遊券 1 至 4 天 ${QR_1_DAY}–${QR_4_DAY}，不能搭新幹線。關西廣域鐵路周遊券連續 5 天 ¥12,000，另外包含新大阪與岡山之間的山陽新幹線指定席，以及城崎溫泉、天橋立、鳥取、白濱與高松。如果行程只有京都、大阪、奈良、神戶與姬路，4 日券（${QR_4_DAY}）便宜 ¥5,300。兩者皆於${CHECKED}在 westjr.co.jp 確認。`,
  },
  {
    q: "關西地區鐵路周遊券可以從關西機場搭 HARUKA 嗎？",
    a: `可以。依 JR 西日本 WEST QR 頁面，關西機場與天王寺、新大阪、京都之間的特急 HARUKA 自由席可不限次數搭乘，另含 2 次普通車廂指定席；指定席需在乘車日 30 天前起於 WEST-QR 網站預約，無法在車上或車站售票櫃檯預約。綠色車廂需另外購票。往難波的南海 Rapi:t 不能搭。${CHECKED}確認。`,
  },
  {
    q: "去京都和大阪，買關西地區鐵路周遊券划算嗎？",
    a: `從關西機場入境、在京都與大阪之間搭 JR 移動的話划算；只待在一座城市搭地鐵的話不划算。2026 年 11 月 1 日起售出的關西機場到京都 HARUKA 單程票為 ¥2,700，與 1 日券同價；京都進、大阪出的 3 天行程，兩張單程票（¥4,600）與 3 日券（¥5,500）只差 ¥900，用 JR 移動補足即可。大阪地鐵、京都市營地下鐵、市區公車，以及近鐵、阪急、京阪、南海都不能搭。車資於${CHECKED}在 westjr.co.jp 確認。`,
  },
  {
    q: "關西地區鐵路周遊券可以搭新幹線嗎？",
    a: `不行。JR 西日本說明 WEST QR 關西地區鐵路周遊券「即使支付追加費用，也不能搭乘新幹線」，新大阪到京都搭新幹線需另外購票。想要含新幹線區間的關西周遊券，關西廣域鐵路周遊券（¥12,000，5 天）包含山陽新幹線新大阪 ⇔ 岡山指定席，關西&廣島地區鐵路周遊券（¥17,000，5 天）則是新大阪 ⇔ 廣島。${CHECKED}確認（關西&廣島為${R04_CHECKED}）。`,
  },
];

const tripPrepItems = [
  withKlookLocale(kansaiAreaPassSameDayPrep[0], LOCALE, {
    label: "京都、奈良一日遊（清水寺、伏見稻荷、奈良公園）",
    ctaLabel: "查看京都奈良一日遊 →",
    why: "周遊券可以搭 JR 到京都與奈良，但不能搭往伏見稻荷的京阪，也不能搭進奈良公園的近鐵；巴士一日遊一次預訂就能走完這三個地方。",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[1], LOCALE, {
    label: "大阪出發姬路城巴士一日遊（團體行程）",
    ctaLabel: "查看姬路一日遊 →",
    why: "姬路在周遊券的 JR 有效區域內；如果不想自己安排姬路城這一天，可以改參加從大阪出發的巴士團體行程。",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[2], LOCALE, {
    label: "JR HARUKA 機場特快車票（關西機場）",
    ctaLabel: "查看 HARUKA 車票 →",
    why: "如果機場路段不在周遊券的有效天數內，或整趟只有這一段搭 JR，要拿來和周遊券比價的關西機場車票就是 HARUKA 單程票。",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[3], LOCALE, {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "WEST QR 周遊券是手機上的 QR 碼：按下「Use ticket（使用車票）」與線上預約 2 次 HARUKA 指定席都要上網，從抵達的那一刻起就需要行動數據。",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[4], LOCALE, {
    label: "梅田／大阪站周邊飯店",
    ctaLabel: "查看大阪站周邊飯店 →",
    why: "大阪站是 JR 西日本往京都、神戶、姬路新快速的轉乘站，而多日周遊券要划算，靠的正是這些城市間的移動。",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[5], LOCALE, {
    label: "京都站周邊飯店",
    ctaLabel: "查看京都站周邊飯店 →",
    why: "京都站是從關西機場出發的 HARUKA 終點站，住在這裡，周遊券的機場路段就不用轉車。",
  }),
];

const tourPicks = [
  withKlookLocale(jrKansaiAreaPass, LOCALE, {
    title: "JR 西日本關西地區鐵路周遊券（1–4 日）",
    desc: "Klook 販售的關西地區鐵路周遊券：大阪、京都、神戶、奈良、姬路一帶的 JR 西日本普通、快速與新快速列車不限次數搭乘，並含關西機場的 HARUKA。",
  }),
  withKlookLocale(jrKansaiMiniPass, LOCALE, {
    title: "JR 關西迷你鐵路周遊券（3 日）",
    desc: "給不搭 HARUKA 的旅客、價格較低的 3 日券：只能搭 JR 西日本快速與普通列車，含關空快速。",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "JR關西地區鐵路周遊券" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows, lead }: { head: string[]; rows: ReactNode[][]; lead?: { label: string; text: ReactNode } }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={h || `blank-${i}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lead && (
              <tr>
                <td className={styles.tdProvider} style={{ fontWeight: 700 }}>{lead.label}</td>
                <td className={styles.tdPrice} colSpan={head.length - 1} style={{ fontSize: "0.88rem" }}>{lead.text}</td>
              </tr>
            )}
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={c === 0 ? undefined : { fontSize: "0.88rem" }}>
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

export default function ZhTwKansaiAreaPassPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);
  const [vsLead, ...vsRest] = vsWideRows;
  const [cmpLead, ...cmpRest] = compareRows;

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: productOfferJsonLd({
              route: ROUTE,
              name: "WEST QR 關西地區鐵路周遊券（Kansai Area Pass）",
              description: DESC,
              brand: "JR West",
              currency: "JPY",
              lowPrice: 2700,
              highPrice: 6700,
              offerCount: 4,
            }),
          }}
        />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel}更新</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>1 日券與 3 日券的價格、從關西機場搭 HARUKA 包含哪些，以及什麼時候改買關西廣域鐵路周遊券或 ICOCA 比較好。</p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "JR 西日本官方票價", "與關西廣域周遊券比較"].map((t) => (
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
            依 JR 西日本官方 WEST QR 頁面（{CHECKED}確認），<strong>JR 西日本關西地區鐵路周遊券</strong>成人 <strong>1 日 {QR_1_DAY}、2 日 ¥4,700、3 日 ¥5,500、4 日 {QR_4_DAY}</strong>（6 至 11 歲兒童半價）。可搭乘 <strong>京都、大阪、奈良、神戶與關西機場</strong>之間的 JR 西日本列車，包含機場特快 <strong>HARUKA</strong> 自由席不限次數，但不能搭新幹線，也不能搭近鐵、阪急、京阪與南海。只有要越過姬路去岡山、城崎溫泉或天橋立時，才選 <strong>關西廣域鐵路周遊券</strong>（5 天 ¥12,000）；如果只在一座城市裡搭地鐵，兩張都不用買，改用 <strong>ICOCA</strong> 卡即可。
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速解答</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>1 日券</p>
                <p className={styles.verdictStatValue}>{QR_1_DAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>4 日券</p>
                <p className={styles.verdictStatValue}>{QR_4_DAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>HARUKA</p>
                <p className={styles.verdictStatValue}>包含（指定席 2 次）</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>新幹線</p>
                <p className={styles.verdictStatValue}>不含</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>JR 西日本關西地區鐵路周遊券</strong>成人 <strong>1 日 {QR_1_DAY}</strong>、2 日 ¥4,700、3 日 ¥5,500、<strong>4 日 {QR_4_DAY}</strong>（6 至 11 歲兒童半價；JR 西日本 WEST QR 關西地區鐵路周遊券，{CHECKED}於 westjr.co.jp 確認）。可不限次數搭乘 <strong>關西機場與天王寺、新大阪、京都之間的 HARUKA</strong> 自由席（另含 2 次指定席），以及大阪、京都、神戶、奈良、姬路一帶的 JR 西日本新快速、快速與普通列車。新幹線、其他特急、大阪地鐵與京都市營地下鐵、市區公車，以及阪急、京阪、近鐵、南海等私鐵都 <strong>不能搭</strong>。最划算的情況是 <strong>抵達關西機場後前往京都</strong>：HARUKA 單程到京都也是 ¥2,700，1 日券同價，當天其他 JR 都不用再付車資。紙本版已於 2026 年 9 月 30 日停售。周遊券可以坐到三宮，用於 <Link href="/guides/attractions/arima-onsen-day-trip" style={linkStyle}>有馬溫泉一日遊（英文）</Link>，但從三宮到溫泉的巴士與神戶市營地下鐵不能搭。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                在 Klook 查看關西地區鐵路周遊券 →
              </KlookLink>
              <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                改買 HARUKA 單程票 →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>關西地區鐵路周遊券是什麼？</h2>
          <p className={styles.bodyText}>
            這是 JR 西日本區域周遊券中範圍最小、價格最低的一張，也是大多數第一次去關西的旅客真正需要的那一張。連續 1 至 4 天內，可不限次數搭乘 JR 西日本的一般列車（普通、快速、新快速），JR 西日本說明的有效區域涵蓋 <strong>大阪、京都、神戶、奈良、姬路、和歌山、大津、敦賀與伊賀上野</strong>；另外還有一般 IC 卡做不到的一項：關西機場特快 HARUKA 自由席不限次數，普通車廂指定席 2 次。
          </p>
          <p className={styles.bodyText}>
            2026 年有一項比價格更重要的變化。JR 西日本的頁面寫明，關西地區鐵路周遊券已於 <strong>2026 年 9 月 30 日停售</strong>，在此之前購買的票券在有效期間內仍可使用。商品並沒有消失，而是改成 <strong>WEST QR 關西地區鐵路周遊券</strong>：同樣 1 至 4 天的範圍，改以線上登錄、在剪票口掃描的 QR 碼販售，價格也略低。如果看到舊攻略寫 1 天 ¥2,800，那是已經不再使用的價格。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>JR關西地區鐵路周遊券多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            成人連續 1 天 {QR_1_DAY}、2 天 ¥4,700、3 天 ¥5,500、4 天 {QR_4_DAY}，6 至 11 歲兒童剛好半價。JR 西日本只公布一份 WEST QR 周遊券價目表，沒有依販售通路另訂價格。
          </p>
          <Table
            head={["天數", "成人（WEST QR）", "兒童 6–11 歲", "成人每日", "舊版紙本，成人"]}
            lead={{ label: "結論", text: `1 日券（${QR_1_DAY}）與 HARUKA 單程到京都同價；4 日券（${QR_4_DAY}）每天 ¥1,675，最便宜` }}
            rows={priceRows.map((r) => [r.days, r.qrAdult, r.qrChild, r.perDay, r.oldAdult])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最後確認：{CHECKED_ISO}。官方來源：<a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，WEST QR 關西地區鐵路周遊券</a>。舊版一欄（JR 西日本：「2026 年 9 月 30 日停售」）只是讓您辨認過時的報價。每日金額為成人價格除以天數。周遊券以日本時間計算，從開始日 04:00 到最後一天 24:00，須為連續日期。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 查看關西地區鐵路周遊券 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.88rem" }}>
            購買前，請在商品頁確認兩件票價表看不出來的事：兌換券的可兌換期間是否與您的航班日期相符，以及販售平台的退款規定。按下「Use ticket（使用車票）」之後，JR 西日本不予退款。
          </p>
          <KlookTripPrep
            label="同一趟旅程一起預訂"
            heading="買了關西地區鐵路周遊券，還要預訂什麼？"
            intro="周遊券負責城市之間的移動；其餘是住在周遊券可搭的 JR 路線附近、去奈良或姬路的導覽一日遊，以及顯示 QR 碼需要的行動數據。這裡不列價格，請打開各商品頁查看目前價格。"
            items={tripPrepItems}
          />
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>地區、廣域與 ICOCA</span>
          <h2 className={styles.sectionTitle}>關西地區鐵路周遊券和關西廣域鐵路周遊券，哪一張比較好？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            如果行程只在京都、大阪、奈良、神戶與姬路之間，選關西地區鐵路周遊券：4 日券（{QR_4_DAY}）比 5 天的關西廣域鐵路周遊券（¥12,000）便宜 ¥5,300。廣域周遊券要有一天跑得比較遠才划算，例如搭山陽新幹線到岡山，或搭指定席特急去城崎溫泉、天橋立、白濱。ICOCA 根本不是周遊券，而是按次扣款，適合只待在一座城市的行程。
          </p>
          <Table
            head={["", "有效區域", "新幹線", "價格（成人）", "適合誰"]}
            lead={{ label: vsLead.option, text: `${vsLead.area}／${vsLead.shinkansen}／${vsLead.price}` }}
            rows={vsRest.map((r) => [r.option, r.area, r.shinkansen, r.price, r.who])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最後確認：{CHECKED_ISO}。官方來源：<a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，WEST QR 關西地區鐵路周遊券</a>、<a href={WIDE_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，關西廣域鐵路周遊券</a>、<a href={ICOCA_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，ICOCA 說明</a>。三者的取得方式不同：關西地區鐵路周遊券是只由海外旅行社販售的 WEST QR 兌換券，不需要換票；廣域周遊券是向海外旅行社購買兌換券，或在 JR-WEST ONLINE TRAIN RESERVATION 預訂後，持護照到 JR 西日本車站領取；訪日旅客版 ICOCA 在關西機場站的 JR 售票處購買。廣域周遊券從第一天 00:00 起有效，地區周遊券從 04:00 起。兩張都不能搭往東京的東海道新幹線。
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.88rem" }}>
            不論選哪一張，划算與否都取決於一日遊：<Link href="/guides/attractions/himeji-castle-day-trip" style={linkStyle}>姬路城一日遊（英文）</Link>位在地區周遊券範圍的最邊緣，而 <Link href="/guides/attractions/amanohashidate-ine-day-trip" style={linkStyle}>天橋立一日遊（英文）</Link>則需要廣域周遊券。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>包含與不含</span>
          <h2 className={styles.sectionTitle}>關西地區鐵路周遊券可以搭哪些車？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            關西有效區域內的 JR 西日本一般列車（新快速、快速、普通），加上機場特快 HARUKA（自由席不限次數、指定席 2 次）。其他都不能搭：沒有新幹線、其他特急、地鐵、公車或私鐵。決定要不要買這張票的，往往是它不含的部分，而不是它包含的部分。
          </p>
          <Table head={["交通工具", "可以搭嗎？", "代表什麼"]} rows={lineRows.map((r) => [r.service, r.allowed, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            適用範圍於{CHECKED}在 westjr.co.jp 確認。周遊券不含的市區交通，請看 <Link href="/guides/transport/osaka-transportation" style={linkStyle}>大阪交通攻略（英文）</Link>與 <Link href="/guides/transport/kyoto-transportation" style={linkStyle}>京都交通攻略（英文）</Link>，兩篇都整理了仍需另外準備的地鐵、公車與 <Link href="/guides/transport/ic-cards-japan" style={linkStyle}>IC 卡（英文）</Link>選擇。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>從機場出發</span>
          <h2 className={styles.sectionTitle}>關西地區鐵路周遊券可以從關西機場搭 HARUKA 嗎？</h2>
          <p className={styles.bodyText}>可以。關西機場與天王寺、新大阪、京都之間的 HARUKA 自由席不限次數，另含 2 次普通車廂指定席（綠色車廂需加價）。</p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem" }}>關西地區鐵路周遊券可以搭新幹線嗎？</h3>
          <p className={styles.bodyText}>不行。JR 西日本說明這張周遊券「即使支付追加費用，也不能搭乘新幹線」。含新幹線的關西周遊券是關西廣域鐵路周遊券，可搭新大阪與岡山之間的山陽新幹線指定席。</p>
          <p className={styles.bodyText}>
            抵達當天 04:00 以後按下「Use ticket（使用車票）」，在關西機場的 JR 剪票口掃描 QR 碼，搭 HARUKA 前往 <strong>天王寺</strong>、<strong>新大阪</strong>或 <strong>京都</strong>。即使在周遊券有效的日子，新大阪到京都搭新幹線也要另外買票；如果行程有往廣島的新幹線路段，含新幹線的是 <Link href="/guides/transport/kansai-hiroshima-area-pass" style={linkStyle}>關西&廣島地區鐵路周遊券（英文）</Link>，兩張周遊券的分界就在廣島。
          </p>
          <p className={styles.bodyText}>
            2 次指定席適合用在提著行李箱移動的日子。依 JR 西日本說明，指定席需在乘車日 30 天前起於 WEST-QR 網站預約，無法在車上、售票機或售票櫃檯預約，請在出發前先訂好。{CHECKED}確認。
          </p>
          <p className={styles.bodyText}>
            要去難波與道頓堀一帶的話，HARUKA 幫不上忙：那是周遊券不能搭的南海電鐵。<Link href="/guides/transport/haruka-vs-nankai-rapit" style={linkStyle}>HARUKA 與南海 Rapi:t 比較（英文）</Link>依目的地而非票價比較兩條路線，<Link href="/guides/transport/osaka-airport-transfer" style={linkStyle}>大阪機場交通攻略（英文）</Link>也涵蓋伊丹機場。簡單來說，這張周遊券適不適合當機場車票，取決於您的住宿地點。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              含 HARUKA 的關西地區鐵路周遊券 →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              HARUKA 單程票 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比較</span>
          <h2 className={styles.sectionTitle}>還有哪些關西周遊券可以取代關西地區鐵路周遊券？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            只在關西、搭 JR 與 HARUKA 的行程，就買關西地區鐵路周遊券。近鐵周遊券適合搭近鐵去奈良，關西&廣島地區鐵路周遊券適合往西搭新幹線，KANSAI ONE PASS 則是 IC 卡，不是周遊券。
          </p>
          <Table
            head={["選項", "價格（成人）", "涵蓋範圍", "什麼時候選"]}
            lead={{ label: cmpLead.option, text: `${cmpLead.covers}。${cmpLead.pick}` }}
            rows={cmpRest.map((r) => [r.option, r.price, r.covers, r.pick])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最後確認：JR 西日本關西地區、HARUKA 單程票與關西廣域鐵路周遊券頁面（westjr.co.jp）為 {CHECKED_ISO}；關西迷你與關西&廣島頁面，以及近鐵（kintetsu.co.jp/foreign/english/ticket/）為{R04_CHECKED}；全國版 JR Pass（japanrailpass.net）、大阪周遊卡官網與 KANSAI ONE PASS 公告為{PREV_CHECKED}。如果奈良是主要的一日遊，<Link href="/guides/transport/kintetsu-rail-pass" style={linkStyle}>近鐵周遊券攻略（英文）</Link>算出近鐵周遊券何時比單程票划算；在大阪市區玩一天，<Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>大阪周遊卡攻略（英文）</Link>介紹關西地區鐵路周遊券無法取代的城市周遊卡。去城崎溫泉的話，關西地區鐵路周遊券不能搭特急 KONOTORI（東方白鸛號），廣域周遊券則含其指定席；<Link href="/guides/attractions/kinosaki-onsen-day-trip" style={linkStyle}>城崎溫泉一日遊攻略（英文）</Link>整理了從大阪出發的 KONOTORI 時刻。HARUKA 單程票是給以短期滯在身分入境的外國護照持有人的優惠單程票；上表票價適用於 2026 年 11 月 1 日 JR 西日本調漲後售出的車票，京都單程現在與 1 日券同價。全國版周遊券的划算計算請看 <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>JR Pass 攻略（英文）</Link>；從東京出發、經金澤進入關西的環線，7 天的 <Link href="/guides/transport/hokuriku-arch-pass" style={linkStyle}>北陸拱型鐵路周遊券（英文）</Link>可搭北陸新幹線，也可搭 Thunderbird 與 HARUKA；任何關西周遊券都到不了的廣島，<Link href="/guides/transport/osaka-to-hiroshima-shinkansen" style={linkStyle}>大阪到廣島新幹線攻略（英文）</Link>比較了 JR 西日本關西&廣島地區鐵路周遊券與單程票。ICOCA &amp; HARUKA 未列入：確認當天 JR 西日本目前的英文頁面沒有標示價格。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>划算嗎</span>
          <h2 className={styles.sectionTitle}>去京都和大阪，買關西地區鐵路周遊券划算嗎？</h2>
          <p className={styles.bodyText}>
            從關西機場入境、在京都與大阪之間搭 JR 移動的話划算；只待在一座城市搭地鐵的話不划算。1 天的例子（關西機場到京都）：HARUKA 單程 ¥2,700，與 1 日券同價。3 天的例子（京都進、大阪出）：兩張單程票合計 ¥4,600，3 日券 ¥5,500，中間再搭 ¥900 的 JR 就划算。
          </p>
          <div style={{ marginBottom: "1rem" }}>
            <Table
              head={["行程", "HARUKA 單程票合計", "同天數周遊券", "結果"]}
              lead={{ label: "結論", text: "從京都入境，或機場來回都落在有效期間內就買；如果只有機場到天王寺或大阪這一段搭 JR，就不用買" }}
              rows={breakEvenRows.map((r) => [r.trip, r.singles, r.pass, r.result])}
            />
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            最後確認：{CHECKED_ISO}。官方來源：<a href={HARUKA_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，WEST QR HARUKA One-way Ticket</a>（2026 年 11 月 1 日起售出車票的成人票價）與 <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">WEST QR 關西地區鐵路周遊券</a>。單程票只有單程，來回就是兩張；周遊券只有在機場來回都落在連續有效天數內時才包含回程。其餘京都–大阪、大阪–奈良、大阪–姬路的車資這裡沒有列出，請用 JR 西日本的車資查詢輸入您的車站確認。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              周遊券划算：查看關西地區鐵路周遊券 →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              單程票較便宜：查看 HARUKA 車票 →
            </KlookLink>
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <Table head={["您的行程", "建議", "原因"]} rows={worthRows.map((r) => [r.plan, r.verdict, r.why])} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            有兩件事不是公開票價，請在商品頁確認：您旅行日期販售的是哪一種版本（QR 碼，或在日本兌換的兌換券），以及取消規定；周遊券只能在您指定的連續日期使用，所以取消規定很重要。兌換券通常是設定可兌換期間販售，而不是固定日期，購買前請確認該期間與您的航班相符。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看關西地區鐵路周遊券 →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              比較 HARUKA 單程票 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>划算的行程</span>
          <h2 className={styles.sectionTitle}>哪些行程能把周遊券的錢搭回來？</h2>
          <p className={styles.bodyText}>
            旅客該比較的不是一般車資，而是優惠的 <strong>HARUKA 單程票</strong>，這是 JR 西日本賣給外國護照持有人、最便宜的正規機場單程票。<strong>2026 年 11 月 1 日</strong>起售出的票價為：天王寺 ¥1,600、大阪或新大阪 ¥1,900、京都 ¥2,700、神戶 ¥2,300、奈良 ¥2,200。周遊券要比這些數字便宜才划算。
          </p>
          <p className={styles.bodyText}>
            <strong>從京都入境，1 日券（{QR_1_DAY}）。</strong>京都單程 ¥2,700，剛好等於周遊券價格。機場路段不用多付錢，當天其他 JR，包括京都–奈良或京都–大阪，也都不用再付車資。
          </p>
          <p className={styles.bodyText}>
            <strong>關西 4 天，4 日券（{QR_4_DAY}）。</strong>從關西進、從關西出：京都進 ¥2,700、大阪出 ¥1,900，光是兩段機場路程就用掉 {QR_4_DAY} 中的 ¥4,600。剩下的 ¥2,100 要靠 4 天內的城市間移動補足，例如京都到奈良、大阪到神戶、大阪到姬路；如果這些都搭 JR，很容易超過。但如果那幾天都在同一座城市搭地鐵，就 <em>補不回來</em>，因為那些都不在周遊券範圍內。只在大阪的那一天，<Link href="/guides/transport/osaka-metro-pass" style={linkStyle}>大阪地鐵一日券（Enjoy Eco Card）（英文）</Link>可在一個日曆日內搭乘地鐵與市區公車。5 天行程中有一天待在大阪時，最後 3 天用 3 日券比 4 日券便宜，逐日計算請看 <Link href="/guides/attractions/kansai-5-day-itinerary" style={linkStyle}>關西 5 天行程（英文）</Link>。
          </p>
          <p className={styles.bodyText}>
            <strong>不划算的情況。</strong>周遊券期間中間有一天不用車、搭近鐵去奈良且搭阪急去嵐山，或行程中有往東京的新幹線路段。這三種情況一開始就算不划算。車資於{CHECKED}確認。如果只想安排一天，<Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" style={linkStyle}>大阪出發京都奈良一日遊（英文）</Link>含巴士接送，那一天就不需要鐵路周遊券。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>不是同一種商品</span>
          <h2 className={styles.sectionTitle}>KANSAI ONE PASS 停售了嗎？</h2>
          <p className={styles.bodyText}>
            是，正在逐步停售，而且它從來就不是 JR 鐵路周遊券。KANSAI ONE PASS 是給旅客用的可儲值交通 IC 卡。在 2024 年 12 月 23 日的聯合公告中，JR 西日本、阪急、近鐵、京阪、南海、阪神、大阪地鐵、大阪市巴士，以及京都市與神戶市交通局表示，各公司自 2025 年 11 月 1 日起庫存售完即停止販售，並於 2026 財政年度結束前（2027 年 3 月）全面停售。
          </p>
          <p className={styles.bodyText}>
            同一份公告說明，已購買的卡片仍可作為儲值 IC 卡繼續使用，商店與景點優惠則在 2026 財政年度結束。這張卡從來不能取代關西地區鐵路周遊券：IC 卡按次付費，周遊券則取代這些車資。{PREV_CHECKED}確認。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>購買方式</span>
          <h2 className={styles.sectionTitle}>關西地區鐵路周遊券在哪裡買、在哪裡兌換？</h2>
          <p className={styles.bodyText}>
            出發前向海外旅行社購買 WEST-QR 兌換券即可，到日本後不需要兌換。JR 西日本說明這張周遊券無法在日本國內旅行社或 JR-WEST ONLINE TRAIN RESERVATION 購買，車站也沒有販售。
          </p>
          <ol className={styles.bodyText} style={{ paddingLeft: "1.25rem" }}>
            <li>向海外旅行社購買兌換券（Klook 是其中之一）。</li>
            <li>在兌換券上印的 WEST-QR 使用網站登錄兌換券資料。</li>
            <li>在同一網站，於乘車日 30 天前起預約 2 次 HARUKA 指定席。</li>
            <li>第一天 04:00 以後按下「Use ticket（使用車票）」，在剪票口掃描 QR 碼。</li>
          </ol>
          <p className={styles.bodyText}>
            按下「Use ticket」之前的變更與退款，請向購買的旅行社辦理，旅行社可能另收手續費；按下「Use ticket」之後，即使列車延誤或停駛，JR 西日本也不予退款。需要能上網的智慧型手機（也可以用同行者的手機顯示）。購買資格為持外國政府核發的護照、以短期滯在身分入境，日本國籍者不能使用。2026 年 9 月 30 日前販售的舊版紙本周遊券，才是需要到 JR 西日本車站換票的版本。{CHECKED}於 <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">westjr.co.jp</a> 確認。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              購買關西地區鐵路周遊券兌換券 →
            </KlookLink>
          </div>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="JR關西地區鐵路周遊券常見問題" />

        <KlookTourPicks
          heading="兩張關西鐵路周遊券並列比較"
          intro="兩項商品都是上文介紹的 JR 西日本周遊券，可用繁體中文頁面結帳。地區周遊券含 HARUKA；迷你周遊券較便宜，但不含 HARUKA。請打開商品頁查看您日期的目前價格。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/kinosaki-onsen-day-trip", title: "城崎溫泉一日遊（2026）：大阪出發、外湯券與旅館（英文）" },
            { href: "/guides/attractions/kumano-kodo-tour", title: "熊野古道行程（2026）：一日遊、中邊路與步行距離（英文）" },
            { href: "/guides/attractions/amanohashidate-ine-day-trip", title: "天橋立一日遊（2026）：伊根舟屋、行程與京都出發列車（英文）" },
            { href: "/guides/attractions/hiroshima-peace-memorial-tours", title: "廣島和平紀念公園行程：導覽、資料館與門票（英文）" },
            { href: "/guides/transport/kintetsu-rail-pass", title: "近鐵周遊券（2026）：價格與是否划算（英文）" },
            { href: "/guides/attractions/osaka-kyoto-3-day-itinerary", title: "大阪京都 3 天行程（2026）：逐日安排與預訂（英文）" },
            { href: "/guides/attractions/himeji-castle-day-trip", title: "姬路城一日遊（2026）：門票 ¥2,500 與時間（英文）" },
            { href: "/guides/attractions/kyoto-nara-day-tour-from-osaka", title: "大阪出發京都奈良一日遊（2026）：該訂哪一個（英文）" },
            { href: "/guides/attractions/kobe-day-trip-from-osaka", title: "大阪出發神戶一日遊（2026）：路線、神戶牛與一天行程（英文）" },
            { href: "/guides/transport/haruka-vs-nankai-rapit", title: "HARUKA 與南海 Rapi:t 比較（2026）：關西機場最佳列車（英文）" },
            { href: "/guides/transport/osaka-airport-transfer", title: "大阪機場交通攻略（2026）：關西機場與伊丹到市區（英文）" },
            { href: "/guides/transport/kyoto-transportation", title: "京都交通攻略（2026）：公車、電車與計程車（英文）" },
            { href: "/guides/transport/osaka-transportation", title: "大阪交通攻略（2026）：地鐵、電車與 IC 卡（英文）" },
            { href: "/guides/transport/jr-pass-guide", title: "JR Pass 攻略 2026：價格、是否划算與購買方式（英文）" },
            { href: "/guides/transport/osaka-metro-pass", title: "大阪地鐵一日券與 Enjoy Eco Card（2026）：該買哪一張（英文）" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "大阪周遊卡 2026：¥3,500 划算嗎與一日行程（英文）" },
            { href: "/guides/attractions/nara-day-trip", title: "奈良一日遊（2026）：大阪或京都出發與東大寺門票（英文）" },
            { href: "/guides/attractions/hiroshima-miyajima-day-trip", title: "廣島宮島一日遊（2026）：一天夠嗎（英文）" },
            { href: "/guides/attractions/things-to-do-osaka", title: "大阪必去景點（2026）：周遊卡划算與不划算的地方（英文）" },
            { href: "/zh-tw/guides/attractions", title: "更多日本景點門票攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>機場路段之外，整個關西都能搭</h2>
            <p className={styles.ctaBannerDesc}>1 至 4 天內搭乘大阪、京都、神戶、奈良、姬路一帶的 JR 西日本列車，並含關西機場的 HARUKA。如果整趟只有機場這段搭 JR，請改買單程票。</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看關西地區鐵路周遊券 →
              </KlookLink>
              <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看 HARUKA 車票 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
