/**
 * "Same trip, book next" rows placed directly under the main CTA of the ticket pages
 * with the most traffic and the lowest earnings per Klook click (task jtk-20261127-A34,
 * 27 Nov 2026).
 *
 * Why. Klook's per-ad-id report for 28 Oct–26 Nov 2026 showed a 30x gap in earnings
 * per click by page type: day trips, rail passes, the shinkansen and activities
 * (hakone-free-pass, tokyo-go-kart, the Kyoto–Tokyo shinkansen, kansai-area-pass,
 * sagano-romantic-train-tickets …) earned ¥70–195 a click, while the ticket pages
 * that get most of the clicks (shibuya-sky-tickets, teamlab-tokyo-tickets,
 * tokyo-disney-tickets, usj-tickets-express-pass, osaka-aquarium-kaiyukan-tickets and
 * their translations) earned ¥0–7. Those readers are planning the same trip, so each
 * row offers the next booking of that trip twice over: our guide to it (internal
 * link) and that guide's main Klook product.
 *
 * Ad ids. The Klook link in a row carries the ad id of the *destination* page (the
 * guide the row is about), not of the page it is rendered on — so a booking made from
 * the row shows up on the row of the product it sells in Klook's report. GA4 still
 * tells the two apart: the block's data-placement="next-booking" goes into
 * affiliate_click's `placement`. scripts/check-klook-adids.js accepts the foreign id
 * because the anchor names its page in `data-ad-page`.
 *
 * Every product is an existing constant in lib/klook-links.ts and the one each
 * destination page uses for its own main button (checked 27 Nov 2026). No prices.
 * Translated editions link to the same-language guide where one exists, otherwise to
 * the English guide with the edition's "(English)" suffix; the Klook product is moved
 * onto the edition's Klook locale with klookFor, as on every translated page.
 */
import type { Locale, TranslatedLocale } from "./i18n";
import { klookFor } from "./klook-locale";
import {
  hakoneFreepass,
  jrKansaiAreaPass3276,
  saganoRomanticTrainTicket,
  shibuyaAnnexGoKartTour,
  shinkansenOsakaHiroshima,
  shinkansenTokyoKyoto,
} from "./klook-links";

/** GA4 placement (data-placement) of the block. */
export const NEXT_BOOKING_PLACEMENT = "next-booking";

export type NextBookingRegion = "tokyo" | "osaka";

type Copy = { guide: string; note: string; klook: string };

type Destination = {
  /** English route of the guide. */
  path: string;
  /** Editions that have their own translation of the guide. */
  translated: TranslatedLocale[];
  /** The guide's main Klook product. */
  url: string;
  copy: Record<Locale, Copy>;
};

const ALL: TranslatedLocale[] = ["ko", "zh-cn", "zh-tw", "th"];

const HAKONE: Destination = {
  path: "/guides/attractions/hakone-free-pass",
  translated: ALL,
  url: hakoneFreepass.url,
  copy: {
    en: { guide: "Hakone Free Pass", note: "Odakyu's 2- or 3-day pass for a Hakone day trip from Tokyo", klook: "Hakone Freepass on Klook" },
    ko: { guide: "하코네 프리패스", note: "도쿄에서 가는 하코네 여행용 오다큐 2일·3일 패스", klook: "Klook 하코네 프리패스" },
    "zh-cn": { guide: "箱根周游券", note: "从东京去箱根用的小田急 2 日・3 日周游券", klook: "Klook 箱根周游券" },
    "zh-tw": { guide: "箱根周遊券", note: "從東京去箱根用的小田急 2 日・3 日周遊券", klook: "Klook 箱根周遊券" },
    th: { guide: "Hakone Free Pass", note: "พาส 2 วัน/3 วันของโอดะคิวสำหรับเที่ยวฮาโกเน่จากโตเกียว", klook: "Hakone Freepass บน Klook" },
  },
};

const GO_KART: Destination = {
  path: "/guides/attractions/tokyo-go-kart",
  translated: ALL,
  url: shibuyaAnnexGoKartTour.url,
  copy: {
    en: { guide: "Tokyo go-kart", note: "street karting through Shibuya Crossing; the driving-permit rules first", klook: "Shibuya go-kart tour on Klook" },
    ko: { guide: "도쿄 고카트", note: "시부야 스크램블 교차로를 달리는 공도 카트, 국제운전면허증 조건 정리", klook: "Klook 시부야 고카트 투어" },
    "zh-cn": { guide: "东京卡丁车", note: "开过涩谷十字路口的街头卡丁车，先看国际驾照条件", klook: "Klook 涩谷卡丁车" },
    "zh-tw": { guide: "東京卡丁車", note: "開過澀谷十字路口的街頭卡丁車，先看國際駕照條件", klook: "Klook 澀谷卡丁車" },
    th: { guide: "โกคาร์ทโตเกียว", note: "ขับโกคาร์ทบนถนนผ่านสี่แยกชิบูย่า อ่านเงื่อนไขใบขับขี่สากลก่อน", klook: "ทัวร์โกคาร์ทชิบูย่าบน Klook" },
  },
};

const TOKYO_KYOTO: Destination = {
  path: "/guides/transport/tokyo-to-kyoto",
  translated: [],
  url: shinkansenTokyoKyoto.url,
  copy: {
    en: { guide: "Tokyo to Kyoto by shinkansen", note: "the Tokaido Shinkansen leg to Kyoto, seats and QR boarding", klook: "Tokyo → Kyoto shinkansen on Klook" },
    ko: { guide: "도쿄 → 교토 신칸센 (영어)", note: "교토로 가는 도카이도 신칸센 구간", klook: "Klook 도쿄 → 교토 신칸센" },
    "zh-cn": { guide: "东京到京都新干线（英文）", note: "去京都的东海道新干线", klook: "Klook 东京 → 京都新干线" },
    "zh-tw": { guide: "東京到京都新幹線（英文）", note: "去京都的東海道新幹線", klook: "Klook 東京 → 京都新幹線" },
    th: { guide: "ชินคันเซ็นโตเกียว → เกียวโต (ภาษาอังกฤษ)", note: "ชินคันเซ็นสายโทไคโดไปเกียวโต", klook: "ชินคันเซ็นโตเกียว → เกียวโตบน Klook" },
  },
};

const KANSAI_PASS: Destination = {
  path: "/guides/attractions/kansai-area-pass",
  translated: ALL,
  url: jrKansaiAreaPass3276.url,
  copy: {
    en: { guide: "Kansai Area Pass", note: "JR West's pass for Kyoto, Nara, Kobe and Himeji days, with the HARUKA from Kansai Airport", klook: "JR West Kansai Area Pass on Klook" },
    ko: { guide: "JR 간사이 패스", note: "교토·나라·고베·히메지 당일치기와 간사이공항 하루카용 JR 서일본 패스", klook: "Klook JR 간사이 패스" },
    "zh-cn": { guide: "JR关西地区铁路周游券", note: "京都、奈良、神户、姬路一日游和关西机场 HARUKA 用的 JR 西日本周游券", klook: "Klook JR关西地区铁路周游券" },
    "zh-tw": { guide: "JR關西地區鐵路周遊券", note: "京都、奈良、神戶、姬路一日遊與關西機場 HARUKA 用的 JR 西日本周遊券", klook: "Klook JR關西地區鐵路周遊券" },
    th: { guide: "JR Kansai Area Pass", note: "พาส JR West สำหรับเที่ยวเกียวโต นารา โกเบ ฮิเมจิ และ HARUKA จากสนามบินคันไซ", klook: "JR Kansai Area Pass บน Klook" },
  },
};

const SAGANO: Destination = {
  path: "/guides/attractions/sagano-romantic-train-tickets",
  translated: ALL,
  url: saganoRomanticTrainTicket.url,
  copy: {
    en: { guide: "Sagano Romantic Train tickets", note: "the Arashiyama scenic train; when seats open and which car to pick", klook: "Sagano Romantic Train seat on Klook" },
    ko: { guide: "사가노 토롯코 열차", note: "아라시야마 관광 열차, 예매 시기와 좌석 고르기", klook: "Klook 사가노 토롯코 열차" },
    "zh-cn": { guide: "嵯峨野小火车", note: "岚山观光小火车：什么时候开票、选哪节车厢", klook: "Klook 嵯峨野小火车" },
    "zh-tw": { guide: "嵯峨野小火車", note: "嵐山觀光小火車：什麼時候開賣、選哪節車廂", klook: "Klook 嵯峨野小火車" },
    th: { guide: "รถไฟสายโรแมนติกซากาโนะ", note: "รถไฟชมวิวอาราชิยามะ เปิดจองเมื่อไร และควรเลือกตู้ไหน", klook: "ตั๋วรถไฟซากาโนะบน Klook" },
  },
};

const OSAKA_HIROSHIMA: Destination = {
  path: "/guides/transport/osaka-to-hiroshima-shinkansen",
  translated: [],
  url: shinkansenOsakaHiroshima.url,
  copy: {
    en: { guide: "Osaka to Hiroshima by shinkansen", note: "the Sanyo Shinkansen for a Hiroshima and Miyajima day or stay", klook: "Osaka → Hiroshima shinkansen on Klook" },
    ko: { guide: "오사카 → 히로시마 신칸센 (영어)", note: "히로시마·미야지마로 가는 산요 신칸센", klook: "Klook 오사카 → 히로시마 신칸센" },
    "zh-cn": { guide: "大阪到广岛新干线（英文）", note: "去广岛、宫岛的山阳新干线", klook: "Klook 大阪 → 广岛新干线" },
    "zh-tw": { guide: "大阪到廣島新幹線（英文）", note: "去廣島、宮島的山陽新幹線", klook: "Klook 大阪 → 廣島新幹線" },
    th: { guide: "ชินคันเซ็นโอซาก้า → ฮิโรชิม่า (ภาษาอังกฤษ)", note: "ชินคันเซ็นสายซันโยไปฮิโรชิม่าและมิยาจิมะ", klook: "ชินคันเซ็นโอซาก้า → ฮิโรชิม่าบน Klook" },
  },
};

const ROWS: Record<NextBookingRegion, Destination[]> = {
  tokyo: [HAKONE, GO_KART, TOKYO_KYOTO],
  osaka: [KANSAI_PASS, SAGANO, OSAKA_HIROSHIMA],
};

export const NEXT_BOOKING_HEADING: Record<Locale, string> = {
  en: "Same trip: what to book next",
  ko: "같은 여행에서 다음으로 예약할 것",
  "zh-cn": "同一趟旅程，接下来要订的",
  "zh-tw": "同一趟旅程，接下來要訂的",
  th: "ทริปเดียวกัน จองอะไรต่อ",
};

export const NEXT_BOOKING_NOTE: Record<Locale, string> = {
  en: "Guide first, then the Klook listing. Klook links are affiliate links; prices and dates are on the listing.",
  ko: "가이드를 먼저 보고 Klook 상품으로 이동하세요. Klook 링크는 제휴 링크이며 가격과 날짜는 상품 페이지에서 확인하세요.",
  "zh-cn": "先看攻略，再看 Klook 商品。Klook 链接为联盟链接，价格与日期以商品页为准。",
  "zh-tw": "先看攻略，再看 Klook 商品。Klook 連結為聯盟連結，價格與日期以商品頁為準。",
  th: "อ่านคู่มือก่อน แล้วค่อยดูหน้าสินค้าบน Klook ลิงก์ Klook เป็นลิงก์พันธมิตร ราคาและวันที่ดูได้ที่หน้าสินค้า",
};

export type NextBookingRow = {
  /** Internal link target (same-language guide where there is one). */
  guideHref: string;
  /** The route whose Klook ad id the product link carries. */
  adPage: string;
  /** The guide's main Klook product, on the edition's Klook locale. */
  klookUrl: string;
} & Copy;

export function nextBookingRows(region: NextBookingRegion, locale: Locale = "en"): NextBookingRow[] {
  return ROWS[region].slice(0, 3).map((d) => {
    const own = locale !== "en" && d.translated.includes(locale as TranslatedLocale);
    const guideHref = own ? `/${locale}${d.path}` : d.path;
    return {
      ...d.copy[locale],
      guideHref,
      adPage: guideHref,
      klookUrl: locale === "en" ? d.url : klookFor(d.url, locale as TranslatedLocale),
    };
  });
}
