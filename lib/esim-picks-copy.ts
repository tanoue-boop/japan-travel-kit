import type { PickRowId, PickSeller } from "./esim-picks";

/**
 * Wording for the pillar page's shared blocks, one record per published language.
 * components/EsimUseCaseTable.tsx and components/EsimBuyGuide.tsx render it, so the five
 * editions keep one structure and cannot drift apart.
 *
 * Provider statements were read on the date in `GUIDE_CHECKED_AT` where a page answered.
 * simbye.com and breezesim.com returned HTTP 429 that day, so those two rows stay on the
 * earlier readings recorded in lib/esim-specs.ts and pages/guides/esim/best-esim-japan.tsx.
 */
export const GUIDE_CHECKED_AT = "6 Nov 2026";

export type PhoneRowId = "simbye" | "klook" | "airalo" | "esimgo" | "sakura" | "holafly";

export type EsimPicksCopy = {
  sectionLabel: string;
  heading: string;
  intro: string;
  /** {date} is the price job's last run. */
  pricesChecked: string;
  cols: { need: string; pick: string; plan: string; price: string; buy: string };
  rows: Record<PickRowId, { need: string; why: string }>;
  cta: Record<PickSeller, string>;
  /** Shown where we have no verified price. */
  noPrice: Record<"klook" | "sakura", string>;
  /** Printed under a discounted price. */
  withCode: string;
  codeHeading: string;
  /** {percent} is the discount. */
  codeText: string;
  codeNote: string;
  tableNote: string;
  phoneHeading: string;
  phoneIntro: string;
  phoneCols: { provider: string; how: string };
  phoneRows: Record<PhoneRowId, string>;
  notStated: string;
  phoneLabel: string;
  /** What was read and when; printed under the phone table. */
  guideChecked: string;
  stepsLabel: string;
  stepsHeading: string;
  steps: { title: string; desc: string }[];
  failLabel: string;
  failHeading: string;
  fails: { title: string; desc: string }[];
};

export const esimPicksCopy: Record<"en" | "ko" | "zh-tw" | "zh-cn" | "th", EsimPicksCopy> = {
  en: {
    sectionLabel: "Answer by need",
    heading: "Which eSIM to buy for Japan, by what you need",
    intro: "Find your row and use its button. Simbye prices include the discount code below.",
    pricesChecked: "Prices checked {date}",
    cols: { need: "You want", pick: "Buy", plan: "Plan", price: "Price", buy: "" },
    rows: {
      cheapest: { need: "The lowest price", why: "The cheapest plan in our price data." },
      short: { need: "A short trip", why: "About 0.5 GB a day for ten days, with 30 days to use it." },
      unlimited: { need: "Unlimited data", why: "2 GB a day at full speed, then unlimited at 1 Mbps." },
      heavy: { need: "More data", why: "A fixed 20 GB, about 1 GB a day for a 20-day trip." },
      long: { need: "A long stay", why: "Valid for 180 days. Simbye says this plan runs on NTT Docomo only." },
      klook: { need: "One checkout with your Klook bookings", why: "Sold as a QR-code voucher. Tethering is supported, per the listing." },
      iphone: { need: "An easy first eSIM on iPhone", why: "Installs from Airalo's own app, with live chat if you get stuck." },
      tether: { need: "Unlimited with a laptop", why: "3 GB a day at full speed, then 1 Mbps. No limit on tethering." },
      number: { need: "A Japanese phone number", why: "Only its Voice + Data plan has one. It needs an in-person ID check in Japan." },
    },
    cta: { simbye: "Get Simbye →", klook: "Check Klook eSIM →", airalo: "Get Airalo →", sakura: "See Sakura Mobile →" },
    noPrice: { klook: "See listing", sakura: "See plans" },
    withCode: "with code",
    codeHeading: "Simbye discount code",
    codeText: "{percent}% off every Simbye eSIM plan. The buttons here apply it for you; you can also type it at checkout.",
    codeNote: "The code does not apply to Simbye's phone numbers.",
    tableNote:
      "Holafly is compared further down, but we have no link to it, so it has no button. Links are affiliate links: we may earn a commission at no extra cost to you.",
    phoneHeading: "How to check that your phone takes an eSIM",
    phoneIntro:
      "Your phone must support eSIM and be carrier-unlocked. On any phone, look for an EID under Settings → About. Then use the provider's own check if it has one:",
    phoneCols: { provider: "Provider", how: "What the provider offers" },
    phoneRows: {
      simbye: "",
      klook: "",
      airalo: "A \"Check compatibility\" link on its Japan page, leading to its compatible-devices list.",
      esimgo: "",
      sakura: "A checker on its travel eSIM page, which asks whether your device is SIM-free (unlocked).",
      holafly: "A \"Check compatibility\" form on its Japan page.",
    },
    notStated: "Not stated officially",
    phoneLabel: "Before you buy",
    guideChecked: "Airalo, Holafly and Sakura Mobile read on 6 Nov 2026. Simbye, eSIM Go and Klook could not be read that day, so check their pages before you buy.",
    stepsLabel: "From purchase to connected",
    stepsHeading: "How to buy and activate a Japan eSIM",
    steps: [
      { title: "Check your phone", desc: "Confirm the EID and that the phone is unlocked. If your carrier has to unlock it, do this first: it can take a day or two." },
      { title: "Buy and get the QR code", desc: "Airalo uses its app. Sakura Mobile emails a link to My Page, where you issue the QR code. The others send it after purchase." },
      { title: "Install on Wi-Fi before you fly", desc: "Scan the QR code on a stable connection. The exception is Sakura Mobile's 3 GB/day plan: its usage period starts when you install, so install that one on arrival." },
      { title: "Switch it on when you land", desc: "Turn on the eSIM line, allow data roaming on it and set it as your mobile data line. Sakura Mobile also lists an APN setting as a step." },
    ],
    failLabel: "Common mistakes",
    failHeading: "Why a Japan eSIM fails, and how to avoid it",
    fails: [
      { title: "The phone is carrier-locked", desc: "This is the most common cause. A locked phone can refuse the eSIM even when it shows an EID, so ask your carrier before you buy." },
      { title: "Data roaming is off", desc: "Travel eSIMs connect as roaming. If there is no signal after landing, turn roaming on for the eSIM line and toggle Airplane Mode." },
      { title: "The eSIM line is not the data line", desc: "Your phone may still use your home SIM for data, which can bring roaming charges. Set the eSIM for mobile data and turn off roaming on the home line." },
      { title: "Installing Sakura's 3 GB/day plan at home", desc: "Sakura Mobile says this plan's usage period starts once you install it, so days are used up before you travel." },
      { title: "Expecting full speed all day on unlimited", desc: "Most unlimited plans slow down after a daily allowance. Check the speed table above before you rely on one for work." },
      { title: "Expecting a phone number", desc: "Most travel eSIMs are data only, so there is no Japanese number or SMS. Keep your home SIM on for bank codes." },
    ],
  },
  ko: {
    sectionLabel: "용도별 결론",
    heading: "용도별로 고르는 일본 eSIM",
    intro: "해당하는 줄을 찾아 버튼을 누르세요. Simbye 가격은 아래 할인 코드를 적용한 금액입니다.",
    pricesChecked: "가격 확인일 {date}",
    cols: { need: "원하는 것", pick: "추천", plan: "요금제", price: "가격", buy: "" },
    rows: {
      cheapest: { need: "최저가", why: "가격 데이터에서 가장 저렴한 요금제입니다." },
      short: { need: "짧은 여행", why: "10일 동안 하루 약 0.5 GB를 쓸 수 있고, 30일 안에 쓰면 됩니다." },
      unlimited: { need: "무제한 데이터", why: "하루 2 GB까지 최고 속도, 이후 1 Mbps로 무제한입니다." },
      heavy: { need: "넉넉한 데이터", why: "20 GB 고정 용량으로, 20일 여행이면 하루 약 1 GB입니다." },
      long: { need: "장기 체류", why: "유효기간 180일. Simbye는 이 요금제가 NTT Docomo만 쓴다고 안내합니다." },
      klook: { need: "클룩 예약과 한 번에 결제", why: "QR 코드 바우처로 판매되며, 상품 설명에 테더링 지원이 명시되어 있습니다." },
      iphone: { need: "아이폰으로 처음 쓰는 eSIM", why: "Airalo 앱으로 설치하며, 막히면 라이브 채팅으로 물어볼 수 있습니다." },
      tether: { need: "노트북을 연결하는 무제한", why: "하루 3 GB까지 최고 속도, 이후 1 Mbps. 테더링 제한은 없습니다." },
      number: { need: "일본 전화번호", why: "음성+데이터 요금제에만 번호가 있습니다. 일본에서 대면 신분 확인이 필요합니다." },
    },
    cta: { simbye: "Simbye 보기 →", klook: "클룩 eSIM 보기 →", airalo: "Airalo 보기 →", sakura: "Sakura Mobile 보기 →" },
    noPrice: { klook: "상품 페이지 참고", sakura: "요금제 참고" },
    withCode: "코드 적용 시",
    codeHeading: "Simbye 할인 코드",
    codeText: "모든 Simbye eSIM 요금제 {percent}% 할인. 이 페이지의 버튼을 누르면 자동으로 적용되며, 결제 때 직접 입력해도 됩니다.",
    codeNote: "Simbye 전화번호 상품에는 적용되지 않습니다.",
    tableNote:
      "Holafly는 아래에서 비교하지만 제휴 링크가 없어 버튼을 두지 않았습니다. 링크는 제휴 링크이며, 구매 시 추가 비용 없이 저희가 수수료를 받을 수 있습니다.",
    phoneHeading: "내 휴대폰이 eSIM을 지원하는지 확인하는 방법",
    phoneIntro:
      "휴대폰이 eSIM을 지원하고 통신사 잠금이 풀려 있어야 합니다. 어떤 기종이든 설정 → 휴대전화 정보에서 EID를 찾으세요. 사업자가 확인 도구를 제공하면 함께 쓰세요.",
    phoneCols: { provider: "사업자", how: "사업자가 제공하는 확인 방법" },
    phoneRows: {
      simbye: "",
      klook: "",
      airalo: "일본 페이지의 “Check compatibility” 링크에서 지원 기기 목록으로 이동합니다.",
      esimgo: "",
      sakura: "여행용 eSIM 페이지의 확인 도구가 기기의 SIM 프리(잠금 해제) 여부를 묻습니다.",
      holafly: "일본 페이지에 “Check compatibility” 양식이 있습니다.",
    },
    notStated: "공식 안내 없음",
    phoneLabel: "구매 전 확인",
    guideChecked: "Airalo, Holafly, Sakura Mobile은 2026년 11월 6일에 확인했습니다. Simbye, eSIM Go, 클룩은 이날 페이지를 읽지 못했으니 구매 전에 각 페이지를 확인하세요.",
    stepsLabel: "구매부터 개통까지",
    stepsHeading: "일본 eSIM 구매와 개통 순서",
    steps: [
      { title: "휴대폰 확인", desc: "EID와 잠금 해제 여부를 확인합니다. 통신사에 잠금 해제를 요청해야 한다면 하루이틀 걸릴 수 있으니 먼저 하세요." },
      { title: "구매하고 QR 코드 받기", desc: "Airalo는 앱을 씁니다. Sakura Mobile은 이메일로 My Page 링크를 보내고, 거기서 QR 코드를 발급합니다. 나머지는 구매 후 받습니다." },
      { title: "출국 전 와이파이로 설치", desc: "안정적인 연결에서 QR 코드를 스캔합니다. 예외는 Sakura Mobile 하루 3 GB 요금제로, 설치하면 이용 기간이 시작되므로 도착해서 설치하세요." },
      { title: "도착하면 켜기", desc: "eSIM 회선을 켜고 데이터 로밍을 허용한 뒤 모바일 데이터 회선으로 지정합니다. Sakura Mobile은 APN 설정도 단계로 안내합니다." },
    ],
    failLabel: "자주 하는 실수",
    failHeading: "일본 eSIM이 안 되는 이유와 예방법",
    fails: [
      { title: "통신사 잠금이 걸려 있음", desc: "가장 흔한 원인입니다. EID가 보여도 잠긴 휴대폰은 eSIM을 거부할 수 있으니 구매 전에 통신사에 확인하세요." },
      { title: "데이터 로밍이 꺼져 있음", desc: "여행용 eSIM은 로밍으로 연결됩니다. 도착 후 신호가 없으면 eSIM 회선의 로밍을 켜고 비행기 모드를 껐다 켜세요." },
      { title: "eSIM이 데이터 회선이 아님", desc: "휴대폰이 집에서 쓰던 심으로 데이터를 쓰면 로밍 요금이 나올 수 있습니다. 모바일 데이터를 eSIM으로 지정하고 원래 회선의 로밍은 끄세요." },
      { title: "Sakura 하루 3 GB 요금제를 집에서 설치", desc: "Sakura Mobile은 이 요금제의 이용 기간이 설치 시점에 시작된다고 안내합니다. 여행 전에 일수가 줄어듭니다." },
      { title: "무제한이면 종일 최고 속도라고 생각", desc: "대부분의 무제한 요금제는 하루 허용량을 넘으면 느려집니다. 업무에 쓴다면 위의 속도 표를 먼저 확인하세요." },
      { title: "전화번호가 있다고 생각", desc: "여행용 eSIM은 대부분 데이터 전용이라 일본 번호와 문자가 없습니다. 은행 인증을 받으려면 원래 심을 켜 두세요." },
    ],
  },
  "zh-tw": {
    sectionLabel: "依需求的結論",
    heading: "依需求選日本 eSIM",
    intro: "找到符合的一列，按下按鈕即可。Simbye 價格已含下方優惠碼。",
    pricesChecked: "價格確認日 {date}",
    cols: { need: "你要的是", pick: "推薦", plan: "方案", price: "價格", buy: "" },
    rows: {
      cheapest: { need: "最低價", why: "我們價格資料中最便宜的方案。" },
      short: { need: "短期旅行", why: "十天每天約 0.5 GB，30 天內用完即可。" },
      unlimited: { need: "吃到飽", why: "每天 2 GB 全速，之後以 1 Mbps 無限使用。" },
      heavy: { need: "較多流量", why: "固定 20 GB，20 天旅行約每天 1 GB。" },
      long: { need: "長期停留", why: "效期 180 天。Simbye 表示此方案僅使用 NTT Docomo。" },
      klook: { need: "與 Klook 訂單一起結帳", why: "以 QR Code 票券販售，商品說明標示支援熱點分享。" },
      iphone: { need: "iPhone 第一次用 eSIM", why: "用 Airalo 自家 App 安裝，遇到問題可線上客服。" },
      tether: { need: "接筆電用的吃到飽", why: "每天 3 GB 全速，之後 1 Mbps。熱點分享無上限。" },
      number: { need: "日本電話號碼", why: "只有語音＋數據方案有號碼，須在日本當面核對身分。" },
    },
    cta: { simbye: "查看 Simbye →", klook: "查看 Klook eSIM →", airalo: "查看 Airalo →", sakura: "查看 Sakura Mobile →" },
    noPrice: { klook: "見商品頁", sakura: "見方案" },
    withCode: "使用優惠碼",
    codeHeading: "Simbye 優惠碼",
    codeText: "所有 Simbye eSIM 方案享 {percent}% 折扣。按本頁按鈕會自動套用，也可在結帳時輸入。",
    codeNote: "優惠碼不適用於 Simbye 的電話號碼商品。",
    tableNote:
      "Holafly 在下方比較，但因沒有合作連結，所以沒有按鈕。連結為聯盟連結，你不需多付費用，我們可能獲得佣金。",
    phoneHeading: "如何確認手機支援 eSIM",
    phoneIntro:
      "手機必須支援 eSIM 且未被電信商鎖定。任何機型都可在「設定 → 關於手機」尋找 EID。業者若有提供檢查工具，也請一併使用。",
    phoneCols: { provider: "業者", how: "業者提供的確認方式" },
    phoneRows: {
      simbye: "",
      klook: "",
      airalo: "日本頁面的「Check compatibility」連結，可前往支援機型清單。",
      esimgo: "",
      sakura: "旅遊 eSIM 頁面有檢查工具，會詢問裝置是否為 SIM-free（未鎖定）。",
      holafly: "日本頁面有「Check compatibility」表單。",
    },
    notStated: "官方未載明",
    phoneLabel: "購買前確認",
    guideChecked: "Airalo、Holafly、Sakura Mobile 於 2026年11月6日確認。Simbye、eSIM Go、Klook 當日無法讀取頁面，購買前請至各頁確認。",
    stepsLabel: "從購買到開通",
    stepsHeading: "日本 eSIM 的購買與開通步驟",
    steps: [
      { title: "確認手機", desc: "確認 EID 與手機是否解鎖。若需請電信商解鎖，可能要一兩天，請先處理。" },
      { title: "購買並取得 QR Code", desc: "Airalo 使用 App。Sakura Mobile 會以電子郵件寄送 My Page 連結，在該處發行 QR Code。其他業者於購買後提供。" },
      { title: "出發前用 Wi-Fi 安裝", desc: "在穩定的網路下掃描 QR Code。例外是 Sakura Mobile 每日 3 GB 方案，安裝即開始計算使用期間，請抵達後再安裝。" },
      { title: "落地後開啟", desc: "開啟 eSIM 門號，允許數據漫遊，並設為行動數據門號。Sakura Mobile 另將 APN 設定列為步驟之一。" },
    ],
    failLabel: "常見失誤",
    failHeading: "日本 eSIM 無法使用的原因與預防",
    fails: [
      { title: "手機被電信商鎖定", desc: "這是最常見的原因。即使看得到 EID，鎖定的手機仍可能拒絕 eSIM，購買前請先向電信商確認。" },
      { title: "數據漫遊未開啟", desc: "旅遊 eSIM 以漫遊方式連線。落地後沒有訊號時，請開啟 eSIM 門號的漫遊並切換飛航模式。" },
      { title: "eSIM 不是數據門號", desc: "手機可能仍用原本的 SIM 上網，可能產生漫遊費。請將行動數據設為 eSIM，並關閉原門號的漫遊。" },
      { title: "在家安裝 Sakura 每日 3 GB 方案", desc: "Sakura Mobile 表示此方案自安裝起計算使用期間，出發前天數就會減少。" },
      { title: "以為吃到飽整天都是全速", desc: "多數吃到飽方案超過每日額度後會降速。若要用於工作，請先看上方的速度表。" },
      { title: "以為有電話號碼", desc: "旅遊 eSIM 多為純數據，沒有日本號碼與簡訊。需要收銀行驗證碼時，請保持原 SIM 開啟。" },
    ],
  },
  "zh-cn": {
    sectionLabel: "按需求的结论",
    heading: "按需求选日本 eSIM",
    intro: "找到符合的一行，点按钮即可。Simbye 价格已含下方优惠码。",
    pricesChecked: "价格确认日 {date}",
    cols: { need: "你想要", pick: "推荐", plan: "套餐", price: "价格", buy: "" },
    rows: {
      cheapest: { need: "最低价", why: "我们价格数据中最便宜的套餐。" },
      short: { need: "短途旅行", why: "十天每天约 0.5 GB，30 天内用完即可。" },
      unlimited: { need: "不限流量", why: "每天 2 GB 全速，之后以 1 Mbps 不限量使用。" },
      heavy: { need: "更多流量", why: "固定 20 GB，20 天旅行约每天 1 GB。" },
      long: { need: "长期停留", why: "有效期 180 天。Simbye 表示此套餐仅使用 NTT Docomo。" },
      klook: { need: "与 Klook 订单一起结账", why: "以二维码凭证销售，商品说明标注支持热点共享。" },
      iphone: { need: "iPhone 第一次用 eSIM", why: "用 Airalo 自家 App 安装，遇到问题可在线客服。" },
      tether: { need: "连笔记本用的不限流量", why: "每天 3 GB 全速，之后 1 Mbps。热点共享无上限。" },
      number: { need: "日本电话号码", why: "只有语音＋数据套餐有号码，须在日本当面核验身份。" },
    },
    cta: { simbye: "查看 Simbye →", klook: "查看 Klook eSIM →", airalo: "查看 Airalo →", sakura: "查看 Sakura Mobile →" },
    noPrice: { klook: "见商品页", sakura: "见套餐" },
    withCode: "使用优惠码",
    codeHeading: "Simbye 优惠码",
    codeText: "所有 Simbye eSIM 套餐享 {percent}% 折扣。点本页按钮会自动使用，也可在结账时输入。",
    codeNote: "优惠码不适用于 Simbye 的电话号码商品。",
    tableNote:
      "Holafly 在下方比较，但因没有合作链接，所以没有按钮。链接为联盟链接，你无需多付费用，我们可能获得佣金。",
    phoneHeading: "如何确认手机支持 eSIM",
    phoneIntro:
      "手机必须支持 eSIM 且未被运营商锁定。任何机型都可在“设置 → 关于手机”查找 EID。商家若提供检查工具，也请一并使用。",
    phoneCols: { provider: "商家", how: "商家提供的确认方式" },
    phoneRows: {
      simbye: "",
      klook: "",
      airalo: "日本页面的“Check compatibility”链接，可进入支持机型列表。",
      esimgo: "",
      sakura: "旅行 eSIM 页面有检查工具，会询问设备是否为 SIM-free（未锁定）。",
      holafly: "日本页面有“Check compatibility”表单。",
    },
    notStated: "官方未说明",
    phoneLabel: "购买前确认",
    guideChecked: "Airalo、Holafly、Sakura Mobile 于 2026年11月6日确认。Simbye、eSIM Go、Klook 当日无法读取页面，购买前请到各页确认。",
    stepsLabel: "从购买到开通",
    stepsHeading: "日本 eSIM 的购买与开通步骤",
    steps: [
      { title: "确认手机", desc: "确认 EID 以及手机是否解锁。如需运营商解锁，可能要一两天，请先处理。" },
      { title: "购买并获取二维码", desc: "Airalo 使用 App。Sakura Mobile 会通过邮件发送 My Page 链接，在那里生成二维码。其他商家在购买后提供。" },
      { title: "出发前用 Wi-Fi 安装", desc: "在稳定的网络下扫描二维码。例外是 Sakura Mobile 每日 3 GB 套餐，安装即开始计算使用期，请到达后再安装。" },
      { title: "落地后开启", desc: "开启 eSIM 线路，允许数据漫游，并设为移动数据线路。Sakura Mobile 另将 APN 设置列为步骤之一。" },
    ],
    failLabel: "常见失误",
    failHeading: "日本 eSIM 无法使用的原因与预防",
    fails: [
      { title: "手机被运营商锁定", desc: "这是最常见的原因。即使能看到 EID，锁定的手机仍可能拒绝 eSIM，购买前请先向运营商确认。" },
      { title: "数据漫游未开启", desc: "旅行 eSIM 以漫游方式连接。落地后没有信号时，请开启 eSIM 线路的漫游并切换飞行模式。" },
      { title: "eSIM 不是数据线路", desc: "手机可能仍用原 SIM 上网，可能产生漫游费。请将移动数据设为 eSIM，并关闭原线路的漫游。" },
      { title: "在家安装 Sakura 每日 3 GB 套餐", desc: "Sakura Mobile 表示此套餐自安装起计算使用期，出发前天数就会减少。" },
      { title: "以为不限流量全天都是全速", desc: "多数不限流量套餐超过每日额度后会降速。如要用于工作，请先看上方的速度表。" },
      { title: "以为有电话号码", desc: "旅行 eSIM 多为纯数据，没有日本号码和短信。需要收银行验证码时，请保持原 SIM 开启。" },
    ],
  },
  th: {
    sectionLabel: "สรุปตามการใช้งาน",
    heading: "เลือก eSIM ญี่ปุ่นตามการใช้งาน",
    intro: "หาแถวที่ตรงกับคุณแล้วกดปุ่ม ราคา Simbye รวมโค้ดส่วนลดด้านล่างแล้ว",
    pricesChecked: "ตรวจสอบราคาเมื่อ {date}",
    cols: { need: "สิ่งที่ต้องการ", pick: "แนะนำ", plan: "แพ็กเกจ", price: "ราคา", buy: "" },
    rows: {
      cheapest: { need: "ราคาถูกที่สุด", why: "แพ็กเกจที่ถูกที่สุดในข้อมูลราคาของเรา" },
      short: { need: "ทริปสั้น", why: "ใช้ได้ราววันละ 0.5 GB เป็นเวลา 10 วัน และมีอายุ 30 วัน" },
      unlimited: { need: "เน็ตไม่จำกัด", why: "ความเร็วเต็มวันละ 2 GB จากนั้นไม่จำกัดที่ 1 Mbps" },
      heavy: { need: "ดาต้าเยอะขึ้น", why: "20 GB คงที่ ราววันละ 1 GB สำหรับทริป 20 วัน" },
      long: { need: "พักยาว", why: "อายุ 180 วัน Simbye ระบุว่าแพ็กเกจนี้ใช้เฉพาะ NTT Docomo" },
      klook: { need: "จ่ายรวมกับการจองใน Klook", why: "ขายเป็นคูปอง QR รายละเอียดสินค้าระบุว่ารองรับการแชร์เน็ต" },
      iphone: { need: "ใช้ eSIM ครั้งแรกบน iPhone", why: "ติดตั้งผ่านแอป Airalo และแชตสอบถามได้เมื่อติดปัญหา" },
      tether: { need: "เน็ตไม่จำกัดสำหรับแล็ปท็อป", why: "ความเร็วเต็มวันละ 3 GB จากนั้น 1 Mbps แชร์เน็ตได้ไม่จำกัด" },
      number: { need: "เบอร์โทรญี่ปุ่น", why: "มีเบอร์เฉพาะแพ็กเกจ Voice + Data และต้องยืนยันตัวตนต่อหน้าในญี่ปุ่น" },
    },
    cta: { simbye: "ดู Simbye →", klook: "ดู Klook eSIM →", airalo: "ดู Airalo →", sakura: "ดู Sakura Mobile →" },
    noPrice: { klook: "ดูหน้าสินค้า", sakura: "ดูแพ็กเกจ" },
    withCode: "เมื่อใช้โค้ด",
    codeHeading: "โค้ดส่วนลด Simbye",
    codeText: "ลด {percent}% ทุกแพ็กเกจ eSIM ของ Simbye ปุ่มในหน้านี้ใช้โค้ดให้อัตโนมัติ หรือจะกรอกตอนชำระเงินก็ได้",
    codeNote: "โค้ดนี้ใช้กับสินค้าเบอร์โทรของ Simbye ไม่ได้",
    tableNote:
      "Holafly มีการเปรียบเทียบด้านล่าง แต่เราไม่มีลิงก์พันธมิตรจึงไม่มีปุ่ม ลิงก์ในหน้านี้เป็นลิงก์พันธมิตร เราอาจได้รับค่าคอมมิชชันโดยคุณไม่ต้องจ่ายเพิ่ม",
    phoneHeading: "วิธีตรวจสอบว่าโทรศัพท์รองรับ eSIM",
    phoneIntro:
      "โทรศัพท์ต้องรองรับ eSIM และไม่ถูกล็อกเครือข่าย ทุกรุ่นดู EID ได้ที่ การตั้งค่า → เกี่ยวกับโทรศัพท์ หากผู้ให้บริการมีเครื่องมือตรวจสอบ ให้ใช้ร่วมด้วย",
    phoneCols: { provider: "ผู้ให้บริการ", how: "วิธีตรวจสอบที่ผู้ให้บริการมีให้" },
    phoneRows: {
      simbye: "",
      klook: "",
      airalo: "ลิงก์ “Check compatibility” ในหน้าญี่ปุ่น ไปยังรายการอุปกรณ์ที่รองรับ",
      esimgo: "",
      sakura: "เครื่องมือในหน้า eSIM สำหรับนักท่องเที่ยว ถามว่าอุปกรณ์เป็น SIM-free (ปลดล็อก) หรือไม่",
      holafly: "แบบฟอร์ม “Check compatibility” ในหน้าญี่ปุ่น",
    },
    notStated: "ไม่ได้ระบุอย่างเป็นทางการ",
    phoneLabel: "ก่อนซื้อ",
    guideChecked: "ตรวจสอบ Airalo, Holafly และ Sakura Mobile เมื่อ 6 พ.ย. 2026 ส่วน Simbye, eSIM Go และ Klook อ่านหน้าไม่ได้ในวันนั้น โปรดตรวจสอบหน้าของแต่ละรายก่อนซื้อ",
    stepsLabel: "ตั้งแต่ซื้อจนใช้งานได้",
    stepsHeading: "ขั้นตอนซื้อและเปิดใช้ eSIM ญี่ปุ่น",
    steps: [
      { title: "ตรวจสอบโทรศัพท์", desc: "ตรวจ EID และการปลดล็อก หากต้องให้ผู้ให้บริการปลดล็อกอาจใช้เวลาหนึ่งถึงสองวัน จึงควรทำก่อน" },
      { title: "ซื้อและรับ QR โค้ด", desc: "Airalo ใช้แอป Sakura Mobile ส่งลิงก์ My Page ทางอีเมลเพื่อออก QR โค้ด ส่วนรายอื่นจะส่งให้หลังซื้อ" },
      { title: "ติดตั้งผ่าน Wi-Fi ก่อนบิน", desc: "สแกน QR โค้ดขณะเน็ตเสถียร ยกเว้นแพ็กเกจ 3 GB ต่อวันของ Sakura Mobile ที่เริ่มนับเมื่อติดตั้ง จึงควรติดตั้งเมื่อถึงญี่ปุ่น" },
      { title: "เปิดใช้เมื่อถึงญี่ปุ่น", desc: "เปิดสาย eSIM อนุญาตโรมมิ่งข้อมูล และตั้งเป็นสายสำหรับเน็ตมือถือ Sakura Mobile ระบุการตั้งค่า APN เป็นขั้นตอนหนึ่งด้วย" },
    ],
    failLabel: "ข้อผิดพลาดที่พบบ่อย",
    failHeading: "สาเหตุที่ eSIM ญี่ปุ่นใช้ไม่ได้ และวิธีป้องกัน",
    fails: [
      { title: "โทรศัพท์ถูกล็อกเครือข่าย", desc: "เป็นสาเหตุที่พบบ่อยที่สุด แม้เห็น EID เครื่องที่ถูกล็อกก็อาจปฏิเสธ eSIM จึงควรสอบถามผู้ให้บริการก่อนซื้อ" },
      { title: "ปิดโรมมิ่งข้อมูลไว้", desc: "eSIM สำหรับเดินทางเชื่อมต่อแบบโรมมิ่ง หากไม่มีสัญญาณ ให้เปิดโรมมิ่งของสาย eSIM แล้วสลับโหมดเครื่องบิน" },
      { title: "eSIM ไม่ได้เป็นสายเน็ตมือถือ", desc: "เครื่องอาจยังใช้ซิมเดิม ซึ่งอาจมีค่าโรมมิ่ง ให้ตั้งเน็ตมือถือเป็น eSIM และปิดโรมมิ่งของซิมเดิม" },
      { title: "ติดตั้งแพ็กเกจ 3 GB ต่อวันของ Sakura ที่บ้าน", desc: "Sakura Mobile ระบุว่าแพ็กเกจนี้เริ่มนับเมื่อติดตั้ง จำนวนวันจึงลดลงก่อนเดินทาง" },
      { title: "คิดว่าไม่จำกัดคือเร็วเต็มทั้งวัน", desc: "แพ็กเกจไม่จำกัดส่วนใหญ่จะลดความเร็วเมื่อเกินโควตารายวัน หากใช้ทำงานควรดูตารางความเร็วด้านบนก่อน" },
      { title: "คิดว่าได้เบอร์โทร", desc: "eSIM สำหรับเดินทางส่วนใหญ่มีแต่ดาต้า ไม่มีเบอร์ญี่ปุ่นและ SMS หากต้องรับรหัสธนาคาร ให้เปิดซิมเดิมไว้" },
    ],
  },
};
