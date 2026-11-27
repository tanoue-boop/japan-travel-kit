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
import {
  jrHarukaUrl,
  jrKansaiAreaPass3276,
  jrKansaiMiniPass,
  kansaiAreaPassSameDayCards,
  kansaiAreaPassSameDayPrep,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
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
  "JR關西地區鐵路周遊券 2026：1 日 ¥2,700 至 4 日 ¥6,700。關西機場到京都加奈良，單程票合計 ¥4,140。含 HARUKA，不含新幹線。";

// R18 (2026-11-27, task jtk-20261127-R18): aligned with the English page — itinerary
// table at JR West ordinary fares, coverage question H2, KANSAI ONE PASS re-check,
// same-day cards under the main CTA, Klook pass listing 1107 → 3276.
const CHECKED_ISO = "2026-11-27";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const R04_CHECKED = dateLabel("2026-11-13", LOCALE);
const PREV_CHECKED = dateLabel("2026-11-03", LOCALE);
const OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/westqr/kansaiarea/";
const HARUKA_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/westqr/haruka/";
const WIDE_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/pass/kansai_wide/";
const ICOCA_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/howto/icoca/";
const FARE_PDF_URL = "https://www.westjr.co.jp/press/article/items/240515_00_press_keihanshin_unchin.pdf";
const HIMEJI_FARE_URL = "https://www.westjr.co.jp/press/article/items/260225_00_press_JRWESTQR2daypass_1.pdf";
const KOP_NOTICE_URL = "https://www.hanshin.co.jp/press/docs/20241223-toshikotsu-wanpasssyuryo2.pdf";

const KANSAI_PASS_URL = klookFor(jrKansaiAreaPass3276.url, LOCALE);
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
    shinkansen: "非周遊券：每次搭乘從卡片餘額扣除車資",
    price: "訪日旅客版 ICOCA ¥2,000，含 ¥500 押金（關西機場站 JR 售票處）",
    who: "只住一座城市、搭地鐵與私鐵的日子，或搭配周遊券支付適用範圍外的車資",
  },
];

const priceRows = [
  { days: "1 日", qrAdult: QR_1_DAY, qrChild: "¥1,350", perDay: "¥2,700", oldAdult: "¥2,800" },
  { days: "2 日", qrAdult: "¥4,700", qrChild: "¥2,350", perDay: "¥2,350", oldAdult: "¥4,800" },
  { days: "3 日", qrAdult: "¥5,500", qrChild: "¥2,750", perDay: "¥1,833", oldAdult: "¥5,800" },
  { days: "4 日", qrAdult: QR_4_DAY, qrChild: "¥3,350", perDay: "¥1,675", oldAdult: "¥7,000" },
];

const breakEvenRows = [
  { trip: "關西機場 → 京都，1 天", singles: "¥2,700", pass: `${QR_1_DAY}（1 日券）`, result: "價格相同，當天搭乘其他適用的 JR 列車也不必另外付費" },
  { trip: "關西機場 → 神戶，1 天", singles: "¥2,300", pass: `${QR_1_DAY}（1 日券）`, result: "當天其他 JR 車資再達 ¥400 才划算" },
  { trip: "關西機場 → 奈良，1 天", singles: "¥2,200", pass: `${QR_1_DAY}（1 日券）`, result: "當天其他 JR 車資再達 ¥500 才划算" },
  { trip: "關西機場 → 大阪／新大阪，1 天", singles: "¥1,900", pass: `${QR_1_DAY}（1 日券）`, result: "當天其他 JR 車資再達 ¥800 才划算" },
  { trip: "關西機場 → 只到天王寺", singles: "¥1,600", pass: `${QR_1_DAY}（1 日券）`, result: "單程票便宜 ¥1,100，不必買周遊券" },
  { trip: "關西機場往返京都，2 天行程", singles: "¥2,700 + ¥2,700 = ¥5,400", pass: "¥4,700（2 日券）", result: "即使不搭其他列車，也能省下 ¥700" },
  { trip: "抵達後前往京都、從大阪返回機場，3 天行程", singles: "¥2,700 + ¥1,900 = ¥4,600", pass: "¥5,500（3 日券）", result: "3 天內其他 JR 車資再達 ¥900 才划算" },
  { trip: "關西機場往返京都，4 天行程", singles: "¥2,700 + ¥2,700 = ¥5,400", pass: `${QR_4_DAY}（4 日券）`, result: "4 天內其他 JR 車資再達 ¥1,300 才划算" },
];

// R18: JR West ordinary adult fares (same sources and numbers as the English page).
const fareRows = [
  { route: "關西機場 → 京都（HARUKA 單程票）", fare: "¥2,700", onPass: "✓ HARUKA 自由席，或 2 次指定席之一" },
  { route: "關西機場 → 大阪／新大阪（HARUKA 單程票）", fare: "¥1,900", onPass: "✓ HARUKA（新大阪）或關空快速" },
  { route: "大阪 ↔ 京都（JR 京都線新快速）", fare: "¥580", onPass: "✓ 新快速；✗ 新大阪–京都的新幹線" },
  { route: "京都 ↔ 奈良（JR 奈良線）", fare: "¥720", onPass: "✓" },
  { route: "天王寺 ↔ 奈良（JR 大和路線）", fare: "¥510", onPass: "✓" },
  { route: "大阪 ↔ 三之宮（神戶，JR 神戶線）", fare: "¥420", onPass: "✓" },
  { route: "大阪 ↔ 姬路（JR 神戶線新快速）", fare: "¥1,460", onPass: "✓ 新快速；✗ 新大阪–姬路的新幹線" },
];

// R18: itineraries priced as singles vs the pass (lead row = verdict).
const itineraryRows = [
  { plan: "第 1 天：關西機場 → 京都，再京都 ↔ 奈良來回", singles: "¥2,700 + ¥720 + ¥720 = ¥4,140", pass: "¥2,700（1 日券）", result: "✓ 周遊券省 ¥1,440" },
  { plan: "大阪 ↔ 姬路一日遊", singles: "¥1,460 × 2 = ¥2,920", pass: "¥2,700（1 日券）", result: "✓ 周遊券省 ¥220" },
  { plan: "只有大阪 ↔ 京都一日遊", singles: "¥580 × 2 = ¥1,160", pass: "¥2,700（1 日券）", result: "✗ 單程票便宜 ¥1,540" },
  { plan: "只有天王寺 ↔ 奈良一日遊", singles: "¥510 × 2 = ¥1,020", pass: "¥2,700（1 日券）", result: "✗ 單程票便宜 ¥1,680" },
  { plan: "3 天：關西機場 → 京都；京都 ↔ 奈良；京都 → 大阪 → 關西機場", singles: "¥2,700 + ¥1,440 + ¥580 + ¥1,900 = ¥6,620", pass: "¥5,500（3 日券）", result: "✓ 周遊券省 ¥1,120" },
  { plan: "4 天：上述 3 天行程，第 3 天加大阪 ↔ 姬路", singles: "¥6,620 + ¥2,920 = ¥9,540", pass: `${QR_4_DAY}（4 日券）`, result: "✓ 周遊券省 ¥2,840" },
  { plan: "2 天，只在大阪：關西機場 → 大阪、大阪 → 關西機場", singles: "¥1,900 × 2 = ¥3,800", pass: "¥4,700（2 日券）", result: "✗ 單程票便宜 ¥900" },
];

const lineRows = [
  { service: "JR 京都線／神戶線新快速", allowed: "✓ 不限次數", note: "行駛於京都、大阪、三之宮與姬路之間的 JR 快速列車一般座位。A-Seat 付費座位須另行付費。" },
  { service: "JR 奈良線與大和路線", allowed: "✓ 不限次數", note: "奈良線為京都–稻荷（伏見稻荷）–奈良，大和路線為天王寺／JR 難波–奈良。" },
  { service: "關西機場線快速（關空快速）", allowed: "✓ 不限次數", note: "經天王寺前往大阪、速度較慢的 JR 機場列車；HARUKA 班次時間不合適時的選擇。" },
  { service: "關西機場特快 HARUKA，自由席", allowed: "✓ 不限次數", note: "從關西機場到天王寺、新大阪、京都的機場列車。這是買這張周遊券最主要的理由。" },
  { service: "關西機場特快 HARUKA，普通車廂指定席", allowed: "✓ 2 次", note: "含 2 次指定席，不需另外付費。自乘車日前 30 天起，可於 WEST-QR 網站預約；JR 西日本說明無法在車上、售票機或售票櫃檯預約。" },
  { service: "HARUKA 綠色車廂（Green Car）", allowed: "✗ 不含", note: "需另外購票。周遊券只能搭普通車廂。" },
  { service: "JR 西日本新快速、快速與普通列車", allowed: "✓ 不限次數", note: "適用範圍內的 JR 路線：大阪–京都、大阪–神戶、大阪–奈良、大阪–姬路等。" },
  { service: "新幹線（東海道、山陽）", allowed: "✗ 不能搭", note: "任何區間都不能搭。即使在周遊券有效的那一天，新大阪到京都搭新幹線也要另外買票。" },
  { service: "其他特急列車", allowed: "✗ 不含", note: "周遊券能搭的特急只有 HARUKA。Thunderbird（雷鳥號）、KUROSHIO（黑潮號）等都要另外買票。" },
  { service: "私鐵：阪急、京阪、近鐵、南海", allowed: "✗ 不含", note: "這是 JR 西日本的票券；JR 西日本舊版周遊券頁面上的京阪、阪急乘車券，也是另外販售的兌換券。在京都與大阪觀光時，許多景點搭這些私鐵比搭 JR 更方便。" },
  { service: "大阪地鐵（Osaka Metro）、京都市營地下鐵與市區公車", allowed: "✗ 不含", note: "不能搭地鐵與市區公車。在這兩座城市觀光時，仍需使用 IC 卡或市區交通周遊券。" },
  { service: "JR 列車付費座位（A-Seat）與普通列車綠色車廂", allowed: "✗ 需加價", note: "新快速、快速與普通列車的一般座位可以搭；付費的 A-Seat 與綠色車廂需要加價。" },
];

const compareRows = [
  { option: "結論", price: "—", covers: "只在關西、搭 JR 與 HARUKA → 關西地區鐵路周遊券。搭近鐵去奈良 → 近鐵周遊券。同一趟旅程也會前往廣島 → 關西＆廣島地區鐵路周遊券", pick: "KANSAI ONE PASS 是 IC 卡，不是可替代的周遊券" },
  { option: "WEST QR 關西地區鐵路周遊券", price: `${QR_1_DAY}（1 日）至 ${QR_4_DAY}（4 日），成人`, covers: "大阪、京都、神戶、奈良、姬路、和歌山、大津、敦賀、伊賀上野一帶的 JR 西日本一般列車，加上 HARUKA 自由席不限次數與 2 次指定席", pick: "以關西機場為起點或終點的關西行程，首選這款" },
  { option: "關西迷你鐵路周遊券", price: "連續 3 天 ¥3,000，成人（兒童 ¥1,500）", covers: "JR 西日本快速、普通列車與關空快速。HARUKA 需另購特急券", pick: "如果機場交通改搭速度較慢的關空快速而非 HARUKA，這款最便宜" },
  { option: "HARUKA 單程票（HARUKA One-way Ticket）", price: "從關西機場：天王寺 ¥1,600、大阪／新大阪 ¥1,900、神戶 ¥2,300、奈良 ¥2,200、京都 ¥2,700", covers: "僅含單程機場交通，不含後續城市間移動", pick: "整趟旅程只有機場這一段搭 JR 時" },
  { option: "近鐵周遊券（KINTETSU RAIL PASS）", price: "¥1,900（1 日）、¥3,700（2 日）、¥4,900（5 日）、¥6,700（5 日 plus）", covers: "只限近鐵：大阪難波到近鐵奈良與京都，5 日券可到伊勢志摩與名古屋。不含 JR 與 HARUKA", pick: "如果一日遊主要安排在奈良公園，而且住在難波附近（從難波到奈良的是近鐵，不是 JR）" },
  { option: "關西＆廣島地區鐵路周遊券", price: "連續 5 天 ¥17,000，成人（兒童 ¥8,500）", covers: "關西的 JR 西日本，加上山陽新幹線新大阪 ⇄ 廣島指定席、含 HARUKA 在內的特急，以及 JR 宮島渡輪", pick: "同一趟要去廣島與宮島時；關西地區鐵路周遊券完全不能搭新幹線" },
  { option: "KANSAI ONE PASS", price: "非周遊券：可儲值、按次扣款的交通 IC 卡", covers: "JR、私鐵、地鐵與巴士按次扣款；2027 年 3 月前陸續停售", pick: "不能取代鐵路周遊券。若要按次付費，ICOCA 等交通 IC 卡都具備相同功能" },
  { option: "關西廣域鐵路周遊券", price: "連續 5 天 ¥12,000，成人（兒童 ¥6,000）", covers: "關西地區鐵路周遊券的範圍再加上山陽新幹線新大阪 ⇄ 岡山指定席，以及高松、城崎溫泉、天橋立、鳥取、白濱", pick: "如果行程不只到姬路為止；若安排關西以外的一日遊，適合的周遊券也不同" },
  { option: "大阪周遊卡（OSAKA AMAZING PASS）", price: `1 日 ¥3,500、2 日 ¥5,000（${PREV_CHECKED}確認）`, covers: "不限次數搭乘大阪指定路線範圍內的巴士與電車，並可進入指定景點：這是市區觀光周遊卡，不是區域鐵路周遊券", pick: "在大阪市區玩一天時使用。無法取代關西地區鐵路周遊券的機場路段，以及往返京都、奈良的移動" },
  { option: "JR Pass 全國版（2026 年 10 月 1 日改版後）", price: `7 天普通車廂：官網 ¥50,000，海外旅行社兌換券 ¥53,000（${PREV_CHECKED}確認）`, covers: "適用全國 JR 路線，含大部分新幹線：範圍遠大於關西，價格為關西地區鐵路周遊券 4 日券的 7 倍以上", pick: "行程包含東京時才考慮；划算與否請看 JR Pass 攻略" },
];

const worthRows = [
  { plan: "抵達關西機場後直接去京都", verdict: "✓ 買 1 日券", why: "2026 年 11 月 1 日起售出的 HARUKA 單程票到京都為 ¥2,700，與 1 日券同價。周遊券不用多花錢，當天搭的其他 JR 也全都不用再付車資。" },
  { plan: "搭乘 JR 在大阪、京都、奈良與神戶之間旅行 3 或 4 天", verdict: "✓ 買 3 日或 4 日券", why: `4 天 ${QR_4_DAY} 涵蓋機場來回與城市間移動。機場兩段：HARUKA 單程到京都 ¥2,700、從大阪出 ¥1,900，兩段機場交通合計 ¥4,600，與 ¥6,700 的周遊券相差 ¥2,100。` },
  { plan: "只在單一城市停留，以步行、地鐵與公車為主要交通方式", verdict: "✗ 不用買", why: "大阪地鐵、京都市營地下鐵與市區公車都不能搭。如果每天都在同一座城市，IC 卡加城市周遊卡比較便宜，周遊券能用到的就只剩機場交通。" },
  { plan: "搭乘阪急、京阪或近鐵遊覽京都寺廟", verdict: "✗ 不適用", why: "伏見稻荷、嵐山與奈良都同時有 JR 與私鐵可到；周遊券只能用在 JR 車站（稻荷、嵯峨嵐山、JR 奈良）。買 JR 票券之前，請先確認目的地車站屬於哪家鐵路公司。" },
  { plan: "同一趟旅程包含東京，或需要搭乘新幹線", verdict: "✗ 不適合此行程", why: "任何區間的新幹線都不能搭，東京也遠超出這款周遊券的適用範圍。請比較全國版 JR Pass 的價格，或另外買新幹線那一段，只在關西的日子使用關西周遊券。" },
  { plan: "持日本護照或居住在日本", verdict: "✗ 不符合資格", why: "JR 西日本只販售給持外國政府核發護照、以「短期停留」（短期滯在）身分入境的旅客。日本國籍者不能使用，在日本有永住權的外國人也不能使用。" },
];

const faqItems: FaqItem[] = [
  {
    q: "JR 關西地區鐵路周遊券要多少錢？",
    a: `成人連續 1 天 ${QR_1_DAY}、2 天 ¥4,700、3 天 ¥5,500、4 天 ${QR_4_DAY}；6 至 11 歲兒童半價（¥1,350／¥2,350／¥2,750／¥3,350）。這是目前販售中的 JR 西日本 WEST QR 關西地區鐵路周遊券的價格。舊版紙本周遊券（¥2,800／¥4,800／¥5,800／¥7,000）已於 2026 年 9 月 30 日停售。${CHECKED}於 westjr.co.jp 確認。`,
  },
  {
    q: "關西地區鐵路周遊券和關西廣域鐵路周遊券，哪一張比較好？",
    a: `對大多數首次前往關西的旅客而言，關西地區鐵路周遊券就足夠；只有要去比姬路更遠的地方，才需要關西廣域鐵路周遊券。關西地區鐵路周遊券 1 至 4 天 ${QR_1_DAY}–${QR_4_DAY}，不能搭新幹線。關西廣域鐵路周遊券連續 5 天 ¥12,000，另外包含新大阪與岡山之間的山陽新幹線指定席，以及城崎溫泉、天橋立、鳥取、白濱與高松。如果行程僅限於京都、大阪、奈良、神戶與姬路，4 日券（${QR_4_DAY}）便宜 ¥5,300。兩者皆於${CHECKED}在 westjr.co.jp 確認。`,
  },
  {
    q: "KANSAI ONE PASS 停售了嗎？",
    a: `是。KANSAI ONE PASS 是可儲值的 IC 卡，不是鐵路周遊券。依 JR 西日本等 10 家業者 2024 年 12 月 23 日的聯合公告，各公司自 2025 年 11 月 1 日起庫存售完即停售，並預定於 2026 會計年度結束前（2027 年 3 月）全面停售。已購買的卡片仍可作為 IC 卡使用，商店與景點優惠則於 2026 會計年度結束時終止。公告沒有指定替代的卡片。${CHECKED}確認。`,
  },
  {
    q: "去京都和大阪，買關西地區鐵路周遊券划算嗎？",
    a: `從關西機場入境、在城市之間搭 JR 移動的話划算；只有一趟大阪–京都來回的話不划算。依 JR 西日本的車資，關西機場到京都的 HARUKA 單程票（¥2,700）加上京都–奈良來回（¥1,440）共 ¥4,140，1 日券只要 ¥2,700；關西機場 → 京都 → 奈良 → 大阪 → 關西機場的 3 天行程，單程票合計 ¥6,620，3 日券為 ¥5,500。大阪–京都來回只要 ¥1,160（單程 ¥580），若只搭這一趟來回，購買 ¥2,700 的 1 日券並不划算。大阪地鐵、京都市營地下鐵、市區公車，以及近鐵、阪急、京阪、南海都不能搭。車資來自 westjr.co.jp，${CHECKED}確認。`,
  },
  {
    q: "關西地區鐵路周遊券可以搭新幹線、HARUKA 和地鐵嗎？",
    a: `可以搭 HARUKA，但不能搭新幹線與地鐵。JR 西日本說明 WEST QR 關西地區鐵路周遊券可不限次數搭乘 HARUKA 自由席，另含 2 次指定席，且「即使支付追加費用，也不能搭乘新幹線」。大阪地鐵、京都市營地下鐵、市區公車與私鐵都不是 JR 西日本，也不能搭。如果需要可搭新幹線的關西周遊券，關西廣域鐵路周遊券（¥12,000，5 天）包含山陽新幹線新大阪 ⇔ 岡山指定席，關西＆廣島地區鐵路周遊券（¥17,000，5 天）則是新大阪 ⇔ 廣島。${CHECKED}確認（關西＆廣島為${R04_CHECKED}）。`,
  },
];

// R18: the three same-day cards sit under the main CTA, in the order of
// kansaiAreaPassSameDayCards (Kyoto & Nara tour, Kyoto Station hotel, Klook eSIM).
const sameDayCards: KlookSameDayCard[] = [
  withKlookLocale(kansaiAreaPassSameDayCards[0], LOCALE, {
    label: "京都、奈良一日遊（清水寺、伏見稻荷、奈良公園）",
    kind: "一日遊",
    ctaLabel: "查看京都奈良一日遊 →",
    why: "預訂巴士導覽一日遊，即可一次遊覽京都與奈良公園，景點之間的巴士與步行路段都包含在內，這些都不包含在 JR 周遊券內。",
  }),
  withKlookLocale(kansaiAreaPassSameDayCards[1], LOCALE, {
    label: "京都站周邊飯店",
    kind: "飯店",
    ctaLabel: "查看京都站周邊飯店 →",
    why: "京都站是 HARUKA 的終點站，也是 JR 奈良線的起點，從這一帶的飯店出發，即可方便搭乘周遊券最常使用的兩條路線。",
  }),
  withKlookLocale(kansaiAreaPassSameDayCards[2], LOCALE, {
    label: "Klook 日本 eSIM",
    kind: "eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "WEST QR 周遊券以手機上的 QR 碼作為乘車憑證：按下「Use ticket（使用車票）」與預約 2 次 HARUKA 指定席，從抵達大廳起就需要行動數據。",
  }),
];

// The lower list drops the products already shown as same-day cards (matched on the source URL).
const prepPairs: [KlookTripPrepItem, Partial<KlookTripPrepItem>][] = [
  [kansaiAreaPassSameDayPrep[0], {}],
  [kansaiAreaPassSameDayPrep[1], {
    label: "大阪出發姬路城巴士一日遊（團體行程）",
    ctaLabel: "查看姬路一日遊 →",
    why: "姬路在周遊券的 JR 有效區域內；如果不想自行規劃姬路城一日遊，可以改參加從大阪出發的巴士團體行程。",
  }],
  [kansaiAreaPassSameDayPrep[2], {
    label: "JR HARUKA 機場特快車票（關西機場）",
    ctaLabel: "查看 HARUKA 車票 →",
    why: "如果機場路段不在周遊券的有效天數內，或整趟只有這一段搭 JR，比較關西機場交通時，應拿 HARUKA 單程票與周遊券比價。",
  }],
  [kansaiAreaPassSameDayPrep[3], {}],
  [kansaiAreaPassSameDayPrep[4], {
    label: "梅田／大阪站周邊飯店",
    ctaLabel: "查看大阪站周邊飯店 →",
    why: "大阪站是搭乘 JR 西日本新快速前往京都、神戶及姬路的主要車站，而這些城市之間的移動，正是多日周遊券划算的關鍵。",
  }],
  [kansaiAreaPassSameDayPrep[5], {}],
];
const tripPrepItems = prepPairs
  .filter(([src]) => !kansaiAreaPassSameDayCards.some((c) => c.url === src.url))
  .map(([src, overrides]) => withKlookLocale(src, LOCALE, overrides));

const tourPicks = [
  withKlookLocale(jrKansaiAreaPass3276, LOCALE, {
    title: "JR 西日本關西地區鐵路周遊券",
    desc: "Klook 販售的關西地區鐵路周遊券：大阪、京都、神戶、奈良、姬路一帶的 JR 西日本普通、快速與新快速列車不限次數搭乘，並含關西機場的 HARUKA。",
  }),
  withKlookLocale(jrKansaiMiniPass, LOCALE, {
    title: "JR 關西迷你鐵路周遊券（3 日）",
    desc: "適合不搭 HARUKA 的旅客、價格較低的 3 日券：只能搭 JR 西日本快速與普通列車，含關空快速。",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "JR 關西地區鐵路周遊券" }];

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
          <p className={styles.heroSubtitle}>1 日券與 3 日券的價格、從關西機場搭乘 HARUKA 的適用範圍，以及何時改用關西廣域鐵路周遊券或 ICOCA 比較划算。</p>
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
            依 JR 西日本官方 WEST QR 頁面（{CHECKED}確認），<strong>JR 西日本關西地區鐵路周遊券</strong>成人 <strong>1 日 {QR_1_DAY}、2 日 ¥4,700、3 日 ¥5,500、4 日 {QR_4_DAY}</strong>（6 至 11 歲兒童半價）；只透過海外旅行社販售，因此沒有另外的日本國內價格。1 日券與關西機場到京都的 HARUKA 單程票同為 {QR_1_DAY}，當天若再往返京都與奈良（單程 ¥720），周遊券就比單程票便宜 ¥1,440。可搭乘 <strong>京都、大阪、奈良、神戶與關西機場</strong>之間的 JR 西日本列車，包含機場特快 <strong>HARUKA</strong> 自由席不限次數，但不適用於新幹線，以及近鐵、阪急、京阪與南海電鐵。只有行程超出姬路、前往岡山、城崎溫泉或天橋立時，才選 <strong>關西廣域鐵路周遊券</strong>（5 天 ¥12,000）；如果只在一座城市裡搭地鐵，兩張都不用買，改用 <strong>ICOCA</strong> 卡即可。
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>重點速覽</span>
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
              <strong>JR 西日本關西地區鐵路周遊券</strong>成人 <strong>1 日 {QR_1_DAY}</strong>、2 日 ¥4,700、3 日 ¥5,500、<strong>4 日 {QR_4_DAY}</strong>（6 至 11 歲兒童半價；JR 西日本 WEST QR 關西地區鐵路周遊券，{CHECKED}於 westjr.co.jp 確認）。可不限次數搭乘 <strong>關西機場與天王寺、新大阪、京都之間的 HARUKA</strong> 自由席（另含 2 次指定席），以及大阪、京都、神戶、奈良、姬路一帶的 JR 西日本新快速、快速與普通列車。新幹線、其他特急、大阪地鐵與京都市營地下鐵、市區公車，以及阪急、京阪、近鐵、南海等私鐵都 <strong>不能搭</strong>。最划算的情況是 <strong>抵達關西機場後前往京都</strong>：HARUKA 單程到京都也是 ¥2,700，1 日券同價，當天搭乘其他適用的 JR 列車也不必另外付費。紙本版已於 2026 年 9 月 30 日停售。前往 <Link href="/guides/attractions/arima-onsen-day-trip" style={linkStyle}>有馬溫泉一日遊（英文）</Link>時，可使用周遊券搭到三宮，但從三宮到溫泉的巴士與神戶市營地下鐵不能搭。
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

        {/* R18: the 6.5% tour and hotel and the 20% eSIM, directly under the main pass CTA. */}
        <KlookSameDayCards heading="搭配關西地區鐵路周遊券的預訂推薦" cards={sameDayCards} locale={LOCALE} />

        {/* R18: itinerary-by-itinerary break-even at JR West's ordinary fares. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>周遊券與單程票</span>
          <h2 className={styles.sectionTitle}>依您的行程，關西地區鐵路周遊券划算嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            從關西機場搭乘 HARUKA 前往京都，或安排姬路一日遊時，就很划算；若當天只往返大阪與京都，或大阪與奈良，就不划算。依 JR 西日本的車資，關西機場 → 京都 → 奈良 → 大阪 → 關西機場的 3 天行程，單程票合計 ¥6,620，3 日券為 ¥5,500。
          </p>
          <Table
            head={["行程", "單程票（成人）", "周遊券", "結果"]}
            lead={{ label: "結論", text: "抵達後先前往京都、安排姬路一日遊，或安排 3–4 天跨城市移動時建議購買；若只往返大阪與京都或大阪與奈良一次，則不必購買" }}
            rows={itineraryRows.map((r) => [r.plan, r.singles, r.pass, r.result])}
          />
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}>JR 單程票要多少錢？</h3>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            JR 西日本一般列車成人單程：大阪–京都 ¥580、京都–奈良 ¥720、大阪–姬路 ¥1,460；關西機場到京都的 HARUKA 單程票為 ¥2,700。
          </p>
          <Table
            head={["路線", "成人單程", "關西地區鐵路周遊券可以搭嗎？"]}
            lead={{ label: "結論", text: "以下路線皆可使用周遊券搭乘 JR 一般列車或 HARUKA，但不適用於新幹線" }}
            rows={fareRows.map((r) => [r.route, r.fare, r.onPass])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最後確認：{CHECKED_ISO}。官方來源：<a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，WEST QR 關西地區鐵路周遊券</a>、<a href={HARUKA_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，WEST QR HARUKA One-way Ticket</a>（2026 年 11 月 1 日起售出車票的票價）、<a href={FARE_PDF_URL} target="_blank" rel="noopener noreferrer">JR 西日本，京阪神車資表（特定車資，2025 年 4 月 1 日起）</a>、<a href={HIMEJI_FARE_URL} target="_blank" rel="noopener noreferrer">JR 西日本新聞稿，2026 年 2 月 25 日（大阪–姬路 ¥1,460）</a>。大阪站至奈良不適用公告中的特定區間票價，所以奈良路線以天王寺為起點。以上為成人一般紙本車票的票價，兒童半價。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 查看關西地區鐵路周遊券 →
            </KlookLink>
          </div>
        </section>

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>關西地區鐵路周遊券是什麼？</h2>
          <p className={styles.bodyText}>
            這是 JR 西日本各區域周遊券中，適用範圍最小、價格最低的一款，也是大多數首次前往關西的旅客所需要的周遊券。連續 1 至 4 天內，可不限次數搭乘 JR 西日本的一般列車（普通、快速、新快速），JR 西日本說明的有效區域涵蓋 <strong>大阪、京都、神戶、奈良、姬路、和歌山、大津、敦賀與伊賀上野</strong>；此外，還有一般 IC 卡沒有的優惠：關西機場特快 HARUKA 自由席不限次數，普通車廂指定席 2 次。
          </p>
          <p className={styles.bodyText}>
            2026 年有一項比價格更重要的變化。JR 西日本的頁面寫明，關西地區鐵路周遊券已於 <strong>2026 年 9 月 30 日停售</strong>，在此之前購買的票券在有效期間內仍可使用。這款周遊券並未取消，而是改為 <strong>WEST QR 關西地區鐵路周遊券</strong>：同樣提供 1 至 4 天的有效期間，改為須在線上登錄、並於驗票閘門掃描的 QR 碼票券，價格也略低。如果看到舊攻略寫 1 天 ¥2,800，那是舊版周遊券的票價。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>JR 關西地區鐵路周遊券要多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            成人連續 1 天 {QR_1_DAY}、2 天 ¥4,700、3 天 ¥5,500、4 天 {QR_4_DAY}，6 至 11 歲兒童享半價。JR 西日本只公布一份 WEST QR 周遊券價目表，沒有依販售通路另訂價格。
          </p>
          <Table
            head={["天數", "成人（WEST QR）", "兒童 6–11 歲", "成人每日平均", "舊版紙本周遊券（成人）"]}
            lead={{ label: "結論", text: `1 日券（${QR_1_DAY}）與 HARUKA 單程到京都同價；4 日券（${QR_4_DAY}）每天 ¥1,675，最便宜` }}
            rows={priceRows.map((r) => [r.days, r.qrAdult, r.qrChild, r.perDay, r.oldAdult])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最後確認：{CHECKED_ISO}。官方來源：<a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，WEST QR 關西地區鐵路周遊券</a>。舊版一欄（JR 西日本：「2026 年 9 月 30 日停售」）僅供辨識已不適用的舊價格。每日平均以成人票價除以天數計算。周遊券以日本時間計算，從開始日 04:00 到最後一天 24:00，須為連續日期。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 查看關西地區鐵路周遊券 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.88rem" }}>
            購買前，請在商品頁面確認票價表未列出的兩項資訊：兌換券的可兌換期間是否與您的航班日期相符，以及販售平台的退款規定。按下「Use ticket（使用車票）」之後，JR 西日本不予退款。
          </p>
          <KlookTripPrep
            label="同一趟旅程一起預訂"
            heading="買了關西地區鐵路周遊券，還要預訂什麼？"
            intro="周遊券用於城市之間的移動；其他就是住在周遊券適用的 JR 路線沿線、去奈良或姬路的導覽一日遊，以及顯示 QR 碼需要的行動數據。這裡不列價格，請打開各商品頁查看目前價格。"
            items={tripPrepItems}
          />
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>地區、廣域與 ICOCA</span>
          <h2 className={styles.sectionTitle}>關西地區鐵路周遊券和關西廣域鐵路周遊券，哪一張比較好？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            如果行程只在京都、大阪、奈良、神戶與姬路之間，選關西地區鐵路周遊券：4 日券（{QR_4_DAY}）比 5 天的關西廣域鐵路周遊券（¥12,000）便宜 ¥5,300。行程中至少有一天前往較遠地區，廣域周遊券才划算，例如搭山陽新幹線到岡山，或搭乘特急列車指定席前往城崎溫泉、天橋立、白濱。ICOCA 並非周遊券，而是按次扣款的儲值交通卡，適合只待在一座城市的行程。
          </p>
          <Table
            head={["", "有效區域", "新幹線", "價格（成人）", "適合誰"]}
            lead={{ label: vsLead.option, text: `${vsLead.area}／${vsLead.shinkansen}／${vsLead.price}` }}
            rows={vsRest.map((r) => [r.option, r.area, r.shinkansen, r.price, r.who])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最後確認：{CHECKED_ISO}。官方來源：<a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，WEST QR 關西地區鐵路周遊券</a>、<a href={WIDE_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，關西廣域鐵路周遊券</a>、<a href={ICOCA_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，ICOCA 說明</a>。三者的購買及領取方式不同：關西地區鐵路周遊券是只由海外旅行社販售的 WEST QR 兌換券，不需要換票；廣域周遊券是向海外旅行社購買兌換券，或在 JR-WEST ONLINE TRAIN RESERVATION 預訂後，憑護照至 JR 西日本車站領取；訪日旅客版 ICOCA 在關西機場站的 JR 售票處購買。廣域周遊券自使用首日 00:00 起生效，地區周遊券從 04:00 起。兩張都不能搭往東京的東海道新幹線。
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.88rem" }}>
            不論選哪一張，划算與否都取決於一日遊：姬路（<Link href="/guides/attractions/himeji-castle-day-trip" style={linkStyle}>姬路城一日遊（英文）</Link>）位於地區周遊券適用範圍的最邊緣，而 <Link href="/guides/attractions/amanohashidate-ine-day-trip" style={linkStyle}>天橋立一日遊（英文）</Link>則需要廣域周遊券。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>適用與不適用</span>
          <h2 className={styles.sectionTitle}>關西地區鐵路周遊券可以搭新幹線、HARUKA 和地鐵嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            可以搭 HARUKA（自由席不限次數、指定席 2 次），但不能搭新幹線與地鐵。HARUKA 以外只能搭 JR 西日本一般列車（新快速、快速、普通），路線包括 JR 京都線、神戶線、奈良線、大和路線與關西機場線；其他特急、公車與私鐵都不能搭。決定要不要買這張票的，往往是它不含的部分，而不是它包含的部分。
          </p>
          <Table
            head={["交通工具", "可以搭嗎？", "使用說明"]}
            lead={{ label: "結論", text: "JR 西日本一般列車加上 HARUKA。不能搭新幹線、其他特急、地鐵、公車或私鐵。" }}
            rows={lineRows.map((r) => [r.service, r.allowed, r.note])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最後確認：{CHECKED_ISO}。官方來源：<a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，WEST QR 關西地區鐵路周遊券</a>（可搭乘列車一覽）。周遊券不含的市區交通，請看 <Link href="/guides/transport/osaka-transportation" style={linkStyle}>大阪交通攻略（英文）</Link>與 <Link href="/guides/transport/kyoto-transportation" style={linkStyle}>京都交通攻略（英文）</Link>，兩篇攻略都整理了須另外付費的地鐵、公車與 <Link href="/guides/transport/ic-cards-japan" style={linkStyle}>IC 卡（英文）</Link>選擇。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>從機場出發</span>
          <h2 className={styles.sectionTitle}>從關西機場搭 HARUKA 時，關西地區鐵路周遊券怎麼用？</h2>
          <p className={styles.bodyText}>在 JR 車站驗票閘門掃描 QR 碼，就能搭任何一班 HARUKA：關西機場與天王寺、新大阪、京都之間的自由席不限次數，另含 2 次普通車廂指定席（綠色車廂需加價）。</p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem" }}>關西地區鐵路周遊券可以搭新幹線嗎？</h3>
          <p className={styles.bodyText}>不行。JR 西日本說明這張周遊券「即使支付追加費用，也不能搭乘新幹線」。若需要搭新幹線，可選擇關西廣域鐵路周遊券，可搭新大阪與岡山之間的山陽新幹線指定席。</p>
          <p className={styles.bodyText}>
            自抵達當天 04:00 起即可點選「Use ticket（使用車票）」，在關西機場的 JR 驗票閘門掃描 QR 碼，搭 HARUKA 前往 <strong>天王寺</strong>、<strong>新大阪</strong>或 <strong>京都</strong>。即使在周遊券有效的日子，新大阪到京都搭新幹線也要另外買票；如果行程有往廣島的新幹線路段，含新幹線的是 <Link href="/guides/transport/kansai-hiroshima-area-pass" style={linkStyle}>關西＆廣島地區鐵路周遊券（英文）</Link>，兩張周遊券的分界就在廣島。
          </p>
          <p className={styles.bodyText}>
            建議將 2 次指定席用在攜帶行李箱搭車的行程。依 JR 西日本說明，指定席可自乘車日前 30 天起於 WEST-QR 網站預約，無法在車上、售票機或售票櫃檯預約，請在出發前先訂好。{CHECKED}確認。
          </p>
          <p className={styles.bodyText}>
            要去難波與道頓堀一帶的話，HARUKA 不適合這段路線：前往該區要搭南海電鐵，而周遊券不適用。<Link href="/guides/transport/haruka-vs-nankai-rapit" style={linkStyle}>HARUKA 與南海 Rapi:t 比較（英文）</Link>以目的地而非票價比較兩條機場路線，<Link href="/guides/transport/osaka-airport-transfer" style={linkStyle}>大阪機場交通攻略（英文）</Link>也涵蓋伊丹機場。簡單來說，這款周遊券是否適合用於機場交通，取決於您的住宿地點。
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
          <h2 className={styles.sectionTitle}>除了關西地區鐵路周遊券，還有哪些關西周遊券可以選擇？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            只在關西、搭 JR 與 HARUKA 的行程，就買關西地區鐵路周遊券。近鐵周遊券適合搭近鐵去奈良，關西＆廣島地區鐵路周遊券適合往西搭新幹線，KANSAI ONE PASS 則是 IC 卡，不是周遊券。
          </p>
          <Table
            head={["選項", "價格（成人）", "涵蓋範圍", "適合的行程"]}
            lead={{ label: cmpLead.option, text: `${cmpLead.covers}。${cmpLead.pick}` }}
            rows={cmpRest.map((r) => [r.option, r.price, r.covers, r.pick])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最後確認：JR 西日本關西地區、HARUKA 單程票、關西迷你與關西廣域鐵路周遊券頁面（westjr.co.jp），以及 KANSAI ONE PASS 公告為 {CHECKED_ISO}；關西＆廣島頁面與近鐵（kintetsu.co.jp/foreign/english/ticket/）為{R04_CHECKED}；全國版 JR Pass（japanrailpass.net）與大阪周遊卡官網為{PREV_CHECKED}。如果奈良是主要的一日遊，<Link href="/guides/transport/kintetsu-rail-pass" style={linkStyle}>近鐵周遊券攻略（英文）</Link>比較近鐵周遊券在哪些情況下比單程票划算；在大阪市區玩一天，<Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>大阪周遊卡攻略（英文）</Link>介紹關西地區鐵路周遊券無法取代的城市周遊卡。去城崎溫泉的話，關西地區鐵路周遊券不能搭特急 KONOTORI（東方白鸛號），廣域周遊券則含其指定席；<Link href="/guides/attractions/kinosaki-onsen-day-trip" style={linkStyle}>城崎溫泉一日遊攻略（英文）</Link>整理了從大阪出發的 KONOTORI 時刻。HARUKA 單程票是給以「短期停留」（短期滯在）身分入境的外國護照持有人的優惠單程票；上表票價適用於 2026 年 11 月 1 日 JR 西日本調漲後售出的車票，京都單程現在與 1 日券同價。想了解全國版周遊券是否划算，請參考 <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>JR Pass 攻略（英文）</Link>；從東京出發、經金澤前往關西的環狀行程，7 天的 <Link href="/guides/transport/hokuriku-arch-pass" style={linkStyle}>北陸拱型鐵路周遊券（英文）</Link>可搭北陸新幹線，也可搭 Thunderbird 與 HARUKA；一般關西地區周遊券到不了的廣島，<Link href="/guides/transport/osaka-to-hiroshima-shinkansen" style={linkStyle}>大阪到廣島新幹線攻略（英文）</Link>比較了 JR 西日本關西＆廣島地區鐵路周遊券與單程票。ICOCA &amp; HARUKA 未列入：查詢當日，JR 西日本官方英文頁面並未標示價格。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>划算嗎</span>
          <h2 className={styles.sectionTitle}>去京都和大阪，買關西地區鐵路周遊券划算嗎？</h2>
          <p className={styles.bodyText}>
            從關西機場入境、在京都與大阪之間搭 JR 移動的話划算；只待在一座城市搭地鐵的話不划算。1 天的例子（關西機場到京都）：HARUKA 單程 ¥2,700，與 1 日券同價。3 天行程範例（抵達後前往京都、從大阪返回機場）：兩張單程票合計 ¥4,600，3 日券 ¥5,500，旅程中其他 JR 車資再達 ¥900 就划算。
          </p>
          <div style={{ marginBottom: "1rem" }}>
            <Table
              head={["行程", "HARUKA 單程票合計", "同天數周遊券", "結果"]}
              lead={{ label: "結論", text: "抵達後前往京都，或機場往返都在有效期間內時建議購買；如果只有機場到天王寺或大阪這一段搭 JR，就不用買" }}
              rows={breakEvenRows.map((r) => [r.trip, r.singles, r.pass, r.result])}
            />
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            最後確認：{CHECKED_ISO}。官方來源：<a href={HARUKA_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，WEST QR HARUKA One-way Ticket</a>（2026 年 11 月 1 日起售出車票的成人票價）與 <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">WEST QR 關西地區鐵路周遊券</a>。單程票僅限單向，往返需購買兩張；周遊券只有在機場來回都落在連續有效天數內時才包含回程。京都–大阪、京都–奈良、大阪–姬路等城市間的 JR 車資，請看上方「依您的行程，關西地區鐵路周遊券划算嗎？」的車資表。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              選擇周遊券較划算：查看關西地區鐵路周遊券 →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              單程票較便宜：查看 HARUKA 車票 →
            </KlookLink>
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <Table head={["您的行程", "建議", "原因"]} rows={worthRows.map((r) => [r.plan, r.verdict, r.why])} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            有兩項資訊未列在公開票價表中，請在商品頁確認：您旅行日期販售的是哪一種版本（QR 碼，或在日本兌換的兌換券），以及取消規定；周遊券只能在您指定的連續日期使用，所以取消規定很重要。兌換券通常設有可兌換期間，而非指定單一日期，購買前請確認該期間與您的航班相符。
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
          <h2 className={styles.sectionTitle}>哪些行程能讓周遊券值回票價？</h2>
          <p className={styles.bodyText}>
            旅客該比較的不是一般車資，而是優惠的 <strong>HARUKA 單程票</strong>，這是 JR 西日本賣給外國護照持有人、價格最低的官方機場單程票。<strong>2026 年 11 月 1 日</strong>起售出的票價為：天王寺 ¥1,600、大阪或新大阪 ¥1,900、京都 ¥2,700、神戶 ¥2,300、奈良 ¥2,200。周遊券的價格低於這些單程票合計時才划算。
          </p>
          <p className={styles.bodyText}>
            <strong>抵達後前往京都，1 日券（{QR_1_DAY}）。</strong>京都單程 ¥2,700，剛好等於周遊券價格。機場路段不用多付錢，當天其他 JR，包括京都–奈良或京都–大阪，也都不用再付車資。
          </p>
          <p className={styles.bodyText}>
            <strong>關西 4 天，4 日券（{QR_4_DAY}）。</strong>從關西機場入境及出境：關西機場前往京都 ¥2,700、從大阪返回關西機場 ¥1,900，兩段機場交通合計 ¥4,600，與 {QR_4_DAY} 的周遊券相差 ¥2,100。其餘 ¥2,100 的價差，可由 4 天內的城市間 JR 車資抵銷，例如京都到奈良、大阪到神戶、大阪到姬路；如果這些都搭 JR，很容易超過。但如果那幾天都在同一座城市搭地鐵，就 <em>無法抵銷價差</em>，因為那些都不在周遊券範圍內。只在大阪的那一天，<Link href="/guides/transport/osaka-metro-pass" style={linkStyle}>大阪地鐵一日券（Enjoy Eco Card）（英文）</Link>可在同一使用日內搭乘地鐵與市區公車。5 天行程中有一天待在大阪時，最後 3 天用 3 日券比 4 日券便宜，逐日計算請看 <Link href="/guides/attractions/kansai-5-day-itinerary" style={linkStyle}>關西 5 天行程（英文）</Link>。
          </p>
          <p className={styles.bodyText}>
            <strong>不划算的情況。</strong>周遊券有效期間內有一天不搭乘列車、搭近鐵去奈良且搭阪急去嵐山，或行程中有往東京的新幹線路段。在這三種情況下，購買周遊券都不划算。車資於{CHECKED}確認。如果只想安排一天，<Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" style={linkStyle}>大阪出發京都奈良一日遊（英文）</Link>含巴士接送，那一天就不需要鐵路周遊券。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>KANSAI ONE PASS 與鐵路周遊券的差異</span>
          <h2 className={styles.sectionTitle}>KANSAI ONE PASS 停售了嗎？</h2>
          <p className={styles.bodyText}>
            是，正在逐步停售，而且 KANSAI ONE PASS 本來就不是 JR 鐵路周遊券。KANSAI ONE PASS 是給旅客用的可儲值交通 IC 卡。在 2024 年 12 月 23 日的聯合公告中，JR 西日本、阪急、近鐵、京阪、南海、阪神、大阪地鐵、大阪市巴士，以及京都市與神戶市交通局表示，各公司自 2025 年 11 月 1 日起庫存售完即停止販售，並於 2026 會計年度結束前（2027 年 3 月）全面停售。
          </p>
          <p className={styles.bodyText}>
            同一份公告說明，已購買的卡片仍可作為儲值 IC 卡繼續使用，商店與景點優惠則於 2026 會計年度結束時終止。公告沒有指定替代的卡片，停售的理由是「KANSAI MaaS」電子票券等服務已普及。這張卡從來不能取代關西地區鐵路周遊券：IC 卡按次扣款，周遊券則已涵蓋這些車資。要按次扣款的話，ICOCA 也能做到一樣的事。
          </p>
          <p className={styles.bodyText} style={noteStyle}>
            最後確認：{CHECKED_ISO}。官方來源：<a href={KOP_NOTICE_URL} target="_blank" rel="noopener noreferrer">2024 年 12 月 23 日聯合公告（JR 西日本、阪急、近鐵、京阪、南海、阪神、大阪地鐵等），hanshin.co.jp</a>。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>購買方式</span>
          <h2 className={styles.sectionTitle}>關西地區鐵路周遊券在哪裡買、在哪裡兌換？</h2>
          <p className={styles.bodyText}>
            出發前向海外旅行社購買 WEST-QR 兌換券即可，抵達日本後無須再到車站換票。JR 西日本說明這張周遊券無法在日本國內旅行社或 JR-WEST ONLINE TRAIN RESERVATION 購買，車站也沒有販售。
          </p>
          <ol className={styles.bodyText} style={{ paddingLeft: "1.25rem" }}>
            <li>向海外旅行社購買兌換券（Klook 是其中之一）。</li>
            <li>前往兌換券上標示的 WEST-QR 網站，登錄兌換券資料。</li>
            <li>自乘車日前 30 天起，可於同一網站預約 2 次 HARUKA 指定席。</li>
            <li>第一天 04:00 以後按下「Use ticket（使用車票）」，在驗票閘門掃描 QR 碼。</li>
          </ol>
          <p className={styles.bodyText}>
            點選「Use ticket」前如需變更或退款，請聯繫原購票旅行社辦理，旅行社可能另收手續費；按下「Use ticket」之後，即使列車延誤或停駛，JR 西日本也不予退款。使用時須準備可上網的智慧型手機（也可以用同行者的手機顯示）。購買資格為持外國政府核發的護照、以「短期停留」（短期滯在）身分入境，日本國籍者不能使用。2026 年 9 月 30 日前販售的舊版紙本周遊券，才是需要到 JR 西日本車站換票的版本。{CHECKED}於 <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">westjr.co.jp</a> 確認。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              購買關西地區鐵路周遊券兌換券 →
            </KlookLink>
          </div>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="JR 關西地區鐵路周遊券常見問題" />

        <KlookTourPicks
          heading="兩款關西鐵路周遊券比較"
          intro="兩項商品都是上文介紹的 JR 西日本周遊券，可透過繁體中文介面完成預訂。地區周遊券含 HARUKA；迷你周遊券較便宜，但不含 HARUKA。請至商品頁面選擇您的日期，查看最新價格。"
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
            { href: "/guides/attractions/osaka-attractions-pass", title: "大阪周遊卡 2026：¥3,500 是否划算？一日行程推薦（英文）" },
            { href: "/guides/attractions/nara-day-trip", title: "奈良一日遊（2026）：大阪或京都出發與東大寺門票（英文）" },
            { href: "/guides/attractions/hiroshima-miyajima-day-trip", title: "廣島宮島一日遊（2026）：一天夠嗎（英文）" },
            { href: "/guides/attractions/things-to-do-osaka", title: "大阪必去景點（2026）：哪些景點使用周遊卡才划算？（英文）" },
            { href: "/zh-tw/guides/attractions", title: "更多日本景點門票攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>不只機場交通，還能搭乘關西地區適用的 JR 列車</h2>
            <p className={styles.ctaBannerDesc}>1 至 4 天內搭乘大阪、京都、神戶、奈良、姬路一帶的 JR 西日本列車，並含關西機場的 HARUKA。如果整趟旅程只有機場交通需要搭 JR，請改買單程票。</p>
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
