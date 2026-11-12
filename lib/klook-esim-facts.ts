import type { Locale } from "./i18n";

/**
 * What Klook's Japan eSIM listing (activity 109393) says about itself, in each
 * language, so the booking card, the use-case table and the pillar pages cannot
 * disagree.
 *
 * Read in a browser on 6 Nov 2026, because Klook answers automated reads with HTTP
 * 403. The US$1.05 is the listing's from-price before days and data are chosen, and
 * the page does not say which plan it belongs to. So it is written only as a
 * from-price, no per-plan price appears on this site, and it is never ranked against
 * the plans in data/esim-prices.json.
 */
export const KLOOK_ESIM_FROM = "US$1.05";

/** The from-price as it sits in a price cell. */
export const KLOOK_ESIM_FROM_LABEL: Record<Locale, string> = {
  en: `From ${KLOOK_ESIM_FROM}`,
  ko: `${KLOOK_ESIM_FROM}부터`,
  "zh-tw": `${KLOOK_ESIM_FROM} 起`,
  "zh-cn": `${KLOOK_ESIM_FROM} 起`,
  th: `เริ่ม ${KLOOK_ESIM_FROM}`,
};

export const KLOOK_ESIM_FACTS: Record<Locale, string> = {
  en: `Klook eSIM: from ${KLOOK_ESIM_FROM}, the price Klook shows before you choose days and data; it does not say which plan that is. Rated 4.6 (50K+ reviews), 2M+ booked. SoftBank 5G / IIJ (Docomo), tethering allowed, and unlimited plans run at high speed up to 10 GB a day. Listing read 6 Nov 2026.`,
  ko: `클룩 eSIM: ${KLOOK_ESIM_FROM}부터. 이용 기간과 데이터 용량을 고르기 전에 표시되는 시작 가격이며, 어떤 요금제의 가격인지는 나와 있지 않습니다. 평점 4.6(리뷰 50K+), 2M+ 예약. SoftBank 5G / IIJ(Docomo) 회선, 테더링 가능, 무제한 요금제는 하루 10 GB까지 고속입니다. 2026년 11월 6일 상품 페이지 확인.`,
  "zh-tw": `Klook eSIM：${KLOOK_ESIM_FROM} 起。這是選擇天數與流量前顯示的起價，頁面未標明對應哪個方案。評分 4.6（超過 50K 則評價），已有超過 2M 筆預訂。使用 SoftBank 5G／IIJ（Docomo）線路，可分享熱點，吃到飽方案每日前 10 GB 為高速。商品頁確認日：2026年11月6日。`,
  "zh-cn": `Klook eSIM：${KLOOK_ESIM_FROM} 起。这是选择套餐天数和流量前显示的起售价，页面未注明该起售价对应的具体套餐。评分 4.6（超过 50K 条评价），已有超过 2M 笔预订。使用 SoftBank 5G／IIJ（Docomo）网络，支持热点共享，无限流量套餐每天前 10 GB 为高速流量。商品信息核查日期：2026年11月6日。`,
  th: `Klook eSIM: เริ่ม ${KLOOK_ESIM_FROM} เป็นราคาที่แสดงก่อนเลือกระยะเวลาใช้งานและปริมาณอินเทอร์เน็ต โดยไม่ได้ระบุว่าเป็นแพ็กเกจใด คะแนน 4.6 (50K+ รีวิว) จองแล้ว 2M+ ใช้เครือข่าย SoftBank 5G / IIJ (Docomo) แชร์เน็ตได้ และแพ็กเกจไม่จำกัดใช้ความเร็วสูงได้ถึง 10 GB ต่อวัน ตรวจสอบหน้าสินค้าเมื่อ 6 พ.ย. 2026`,
};
