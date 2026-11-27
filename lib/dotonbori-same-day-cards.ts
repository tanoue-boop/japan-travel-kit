/**
 * Same-day cards directly under the main Osaka Amazing Pass button of the Dotonbori river
 * cruise guide, in every edition (task-jtk-20261127-04).
 *
 * The English cards and their sources live in lib/klook-links.ts
 * (dotonboriCruiseSameDayCards): the 6.5% Dotonbori food walk, the 5% Osaka Amazing Pass
 * (with the one-line break-even: 1day ¥3,500 against the ¥2,000 fare), the 5% Nankai Rapi:t
 * from Kansai Airport and the 20% Klook eSIM. This file adds the four translations on the
 * edition's own Klook locale path. Same products, same order. No Klook prices.
 */
import type { Locale, TranslatedLocale } from "./i18n";
import { dotonboriCruiseSameDayCards, type KlookSameDayCard } from "./klook-links";
import { withKlookLocale } from "./klook-locale";

type CardCopy = { kind: string; label: string; ctaLabel: string; why: string };

const T: Record<TranslatedLocale, { heading: string; cards: CardCopy[] }> = {
  ko: {
    heading: "도톤보리 리버크루즈와 같은 날 예약할 것은?",
    cards: [
      { kind: "푸드 투어", label: "오사카 도톤보리 낮 음식 투어", ctaLabel: "푸드 투어 보기 →", why: "도톤보리에서 11:00~14:00으로 올라 있는 3시간 그룹 도보 투어입니다. 점심을 먹은 뒤 에비스바시에서 1분 거리의 선착장으로 가면 됩니다." },
      { kind: "패스", label: "오사카 주유패스(1일권/2일권)", ctaLabel: "주유패스 보기 →", why: "톤보리 리버크루즈는 패스 무료 시설 7번입니다. 1일권 ¥3,500에서 크루즈 ¥2,000을 빼면 ¥1,500이므로, 같은 날 다른 무료 시설이나 지하철을 ¥1,500어치 넘게 쓰면 이득입니다." },
      { kind: "공항 이동", label: "난카이 특급 라피트 승차권", ctaLabel: "라피트 보기 →", why: "간사이공항에서 난바까지 직행합니다(클룩 상품 기준 약 34분). 난바역에서 선착장까지 걸어서 5~10분입니다." },
      { kind: "eSIM", label: "클룩 일본 eSIM", ctaLabel: "eSIM 보기 →", why: "오사카 주유패스는 스마트폰으로 쓰는 디지털 패스라 공항에 도착한 순간부터 데이터가 필요합니다." },
    ],
  },
  "zh-tw": {
    heading: "搭道頓堀遊船的同一天，還要預訂什麼？",
    cards: [
      { kind: "美食導覽", label: "大阪道頓堀白天美食導覽", ctaLabel: "查看美食導覽 →", why: "道頓堀 11:00–14:00 的 3 小時小團步行美食導覽；吃完午餐，走到離戎橋 1 分鐘的碼頭。" },
      { kind: "周遊卡", label: "大阪周遊卡（1 日／2 日）", ctaLabel: "查看大阪周遊卡 →", why: "道頓堀遊船是周遊卡免費設施第 7 號。一日卡 ¥3,500 減去船票 ¥2,000 是 ¥1,500，同一天再用 ¥1,500 以上的免費設施或地鐵就划算。" },
      { kind: "機場交通", label: "南海特急 Rapi:t 車票", ctaLabel: "查看 Rapi:t →", why: "從關西機場直達難波（Klook 商品頁標示約 34 分鐘），難波站步行 5–10 分鐘到碼頭。" },
      { kind: "eSIM", label: "Klook 日本 eSIM", ctaLabel: "查看 eSIM →", why: "大阪周遊卡是用手機出示的數位票券，一落地就需要網路。" },
    ],
  },
  "zh-cn": {
    heading: "坐道顿堀游船的同一天，还要预订什么？",
    cards: [
      { kind: "美食导览", label: "大阪道顿堀白天美食导览", ctaLabel: "查看美食导览 →", why: "道顿堀 11:00–14:00 的 3 小时小团步行美食导览；吃完午餐，走到离戎桥 1 分钟的码头。" },
      { kind: "周游卡", label: "大阪周游卡（1 日／2 日）", ctaLabel: "查看大阪周游卡 →", why: "道顿堀游船是周游卡免费设施第 7 号。一日卡 ¥3,500 减去船票 ¥2,000 是 ¥1,500，同一天再用 ¥1,500 以上的免费设施或地铁就划算。" },
      { kind: "机场交通", label: "南海特急 Rapi:t 车票", ctaLabel: "查看 Rapi:t →", why: "从关西机场直达难波（Klook 商品页标注约 34 分钟），难波站步行 5–10 分钟到码头。" },
      { kind: "eSIM", label: "Klook 日本 eSIM", ctaLabel: "查看 eSIM →", why: "大阪周游卡是用手机出示的电子票，一落地就需要流量。" },
    ],
  },
  th: {
    heading: "ล่องเรือโดทงโบริวันเดียวกัน ควรจองอะไรอีก?",
    cards: [
      { kind: "ทัวร์อาหาร", label: "ทัวร์อาหารกลางวันย่านโดทงโบริ โอซาก้า", ctaLabel: "ดูทัวร์อาหาร →", why: "ทัวร์เดินกินแบบกลุ่ม 3 ชั่วโมงในโดทงโบริ ช่วง 11:00–14:00 กินมื้อกลางวันเสร็จแล้วเดินไปท่าเรือซึ่งห่างจากสะพานเอบิสึบาชิ 1 นาที" },
      { kind: "พาส", label: "Osaka Amazing Pass (1 วัน / 2 วัน)", ctaLabel: "ดู Osaka Amazing Pass →", why: "ล่องเรือ Tombori เป็นสถานที่ฟรีลำดับที่ 7 ของพาส พาส 1 วัน ¥3,500 ลบค่าเรือ ¥2,000 เหลือ ¥1,500 ถ้าวันเดียวกันใช้สถานที่ฟรีหรือรถไฟใต้ดินเกิน ¥1,500 ก็คุ้ม" },
      { kind: "เดินทางจากสนามบิน", label: "ตั๋วรถไฟด่วนพิเศษนันไก Rapi:t", ctaLabel: "ดูตั๋ว Rapi:t →", why: "จากสนามบินคันไซตรงถึงนัมบะ (ประมาณ 34 นาทีตามหน้าสินค้า Klook) จากสถานีนัมบะเดินไปท่าเรือ 5–10 นาที" },
      { kind: "eSIM", label: "Klook eSIM ญี่ปุ่น", ctaLabel: "ดู eSIM →", why: "Osaka Amazing Pass เป็นพาสดิจิทัลบนสมาร์ทโฟน จึงต้องมีอินเทอร์เน็ตตั้งแต่ลงเครื่อง" },
    ],
  },
};

const EN_HEADING = "What else to book for a Dotonbori cruise day?";

export function dotonboriSameDayCards(locale: Locale): { heading: string; cards: KlookSameDayCard[] } {
  if (locale === "en") return { heading: EN_HEADING, cards: dotonboriCruiseSameDayCards };
  const copy = T[locale];
  return {
    heading: copy.heading,
    cards: dotonboriCruiseSameDayCards.map((card, i) => withKlookLocale(card, locale, copy.cards[i])),
  };
}
