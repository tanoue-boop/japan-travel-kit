import { useRouter } from "next/router";
import { useComponentLocale } from "./componentLocale";
import KlookLink from "./KlookLink";
import { ESIM_PLACEMENT, pageTag } from "../lib/esim-placement";
import { cheapestPlan, formatUsd, latestCheckedAt, pricesCheckedLabel, siteCheapest } from "../lib/esim-prices";
import { dateLabel, type Locale } from "../lib/i18n";
import { KLOOK_ESIM_FACTS } from "../lib/klook-esim-facts";
import { klookEsim } from "../lib/klook-links";
import { klookFor } from "../lib/klook-locale";
import { SIMBYE_DISCOUNT_CODE, SIMBYE_DISCOUNT_PERCENT, simbyeTrackedUrl } from "../lib/simbye";
import styles from "../styles/EsimBuyBlocks.module.css";

/**
 * "Your eSIM" card, directly after the booking button on a ticket page, for the reader
 * who has just decided to buy and still needs data in Japan.
 *
 * Two choices in commission order: Simbye (25%) with its cheapest plan, then Klook eSIM
 * (20%). The Klook side quotes the listing's facts from lib/klook-esim-facts.ts. Its
 * US$1.05 is a from-price that names no plan, so Simbye's tag says "confirmed plan" and
 * no plan-by-plan price is written for Klook.
 *
 * Words live here once per language. Which language comes from the route.
 *
 * On a guide with no booking to follow, a page passes `lead`: its own one-line title.
 * The eyebrow and intro then drop the booking and ticket wording.
 */
type Copy = {
  eyebrow: string;
  guideEyebrow: string;
  title: string;
  intro: string;
  guideIntro: string;
  lowest: string;
  simbyeFrom: string;
  simbyeCode: string;
  simbyeCta: string;
  klookTag: string;
  klookCta: string;
  note: string;
  /** "{n} days" in a plan name, in this language. */
  days: string;
};

const COPY: Record<Locale, Copy> = {
  en: {
    eyebrow: "Next, after your booking",
    title: "Get your Japan eSIM sorted before you fly",
    intro:
      "Set it up by QR code before you leave and it works as soon as you land, so your ticket, maps and train times are on your phone from the airport.",
    guideEyebrow: "Mobile data for Japan",
    guideIntro:
      "Set it up by QR code before you leave and it works as soon as you land, so maps and train times are on your phone from the airport.",
    lowest: "Lowest confirmed plan price",
    simbyeFrom: "From {price} ({plan})",
    simbyeCode: "{discounted} with code {code}, {percent}% off",
    simbyeCta: "Get Simbye from {price} →",
    klookTag: "Keep it with your Klook bookings",
    klookCta: "Check Klook eSIM →",
    note: "Affiliate links: we may earn a commission at no extra cost to you. Simbye price checked {date}. Klook's from-price names no plan, so the two are not compared like for like.",
    days: "{n} days",
  },
  "zh-tw": {
    eyebrow: "訂完票之後",
    title: "出發前先把日本 eSIM 準備好",
    intro: "出發前掃 QR Code 完成設定，抵達後馬上就能上網。門票、地圖和電車時刻，從機場開始都能用手機查看。",
    guideEyebrow: "日本行動上網",
    guideIntro: "出發前掃 QR Code 完成設定，抵達後馬上就能上網。地圖和電車時刻，從機場開始都能用手機查看。",
    lowest: "已確認方案中的最低價",
    simbyeFrom: "{price} 起（{plan}）",
    simbyeCode: "輸入折扣碼 {code} 享 {percent}% 折扣：{discounted}",
    simbyeCta: "查看 Simbye，{price} 起 →",
    klookTag: "和 Klook 訂單放在一起",
    klookCta: "查看 Klook eSIM →",
    note: "以上為聯盟連結，您支付的價格不變，我們可能獲得分潤。Simbye 價格查核日：{date}。Klook 的起價未標明方案，因此兩者無法在相同條件下比較。",
    days: "{n} 天",
  },
  "zh-cn": {
    eyebrow: "订好门票后",
    title: "别忘了在出发前准备日本 eSIM",
    intro: "出发前扫二维码完成设置，抵达日本后马上就能上网。从抵达机场起，就可以用手机查看电子门票、地图和电车时刻表。",
    guideEyebrow: "日本移动上网",
    guideIntro: "出发前扫二维码完成设置，抵达日本后马上就能上网。从抵达机场起，就可以用手机查看地图和电车时刻表。",
    lowest: "已核实套餐中的最低价",
    simbyeFrom: "{price} 起（{plan}）",
    simbyeCode: "输入优惠码 {code} 可享受 {percent}% 折扣：{discounted}",
    simbyeCta: "查看 Simbye，{price} 起 →",
    klookTag: "可与其他 Klook 订单统一管理",
    klookCta: "查看 Klook eSIM →",
    note: "以上部分链接为推广联盟链接，你无需支付额外费用，我们可能获得佣金。Simbye 价格核查日期：{date}。Klook 未注明起售价对应的具体套餐，因此无法在相同条件下直接比较两者的价格。",
    days: "{n} 天",
  },
  ko: {
    eyebrow: "예약 다음 단계",
    title: "출국 전에 일본 eSIM까지 준비하세요",
    intro: "출발 전에 QR 코드로 설정해 두면 도착하자마자 쓸 수 있습니다. 티켓, 지도, 열차 시간을 공항에서부터 휴대폰으로 확인하세요.",
    guideEyebrow: "일본 모바일 데이터",
    guideIntro: "출발 전에 QR 코드로 eSIM을 설정해 두면 도착하자마자 쓸 수 있습니다. 지도와 열차 시간을 공항에서부터 휴대폰으로 확인하세요.",
    lowest: "확인한 요금제 중 최저가",
    simbyeFrom: "{price}부터 ({plan})",
    simbyeCode: "코드 {code} 입력 시 {percent}% 할인: {discounted}",
    simbyeCta: "Simbye {price}부터 보기 →",
    klookTag: "클룩의 다른 예약과 함께 관리",
    klookCta: "클룩 eSIM 보기 →",
    note: "제휴 링크이며, 추가 비용 없이 저희가 수수료를 받을 수 있습니다. Simbye 요금 확인일: {date}. 클룩의 시작 가격은 요금제가 표시되지 않아 같은 조건으로 비교할 수 없습니다.",
    days: "{n}일",
  },
  th: {
    eyebrow: "หลังจองเสร็จ",
    title: "เตรียม eSIM ญี่ปุ่นให้พร้อมก่อนออกเดินทาง",
    intro: "ตั้งค่าด้วย QR Code ก่อนออกเดินทาง แล้วใช้งานได้ทันทีเมื่อถึงญี่ปุ่น ทั้งตั๋ว แผนที่ และเวลารถไฟดูบนมือถือได้ตั้งแต่สนามบิน",
    guideEyebrow: "อินเทอร์เน็ตมือถือในญี่ปุ่น",
    guideIntro: "ตั้งค่าด้วย QR Code ก่อนออกเดินทาง แล้วใช้งานได้ทันทีเมื่อถึงญี่ปุ่น ทั้งแผนที่และเวลารถไฟดูบนมือถือได้ตั้งแต่สนามบิน",
    lowest: "ราคาต่ำสุดในแพ็กเกจที่ยืนยันได้",
    simbyeFrom: "เริ่ม {price} ({plan})",
    simbyeCode: "ใส่โค้ด {code} ลด {percent}% เหลือ {discounted}",
    simbyeCta: "ดู Simbye เริ่ม {price} →",
    klookTag: "จัดการรวมกับการจองอื่นใน Klook",
    klookCta: "ดู Klook eSIM →",
    note: "เป็นลิงก์พันธมิตร เราอาจได้รับค่าคอมมิชชันโดยคุณไม่ต้องจ่ายเพิ่ม ตรวจสอบราคา Simbye เมื่อ {date} ราคาเริ่มต้นของ Klook ไม่ได้ระบุแพ็กเกจ จึงเปรียบเทียบในเงื่อนไขเดียวกันไม่ได้",
    days: "{n} วัน",
  },
};

export default function BookingEsimCard({ lead }: { lead?: string }) {
  const locale = useComponentLocale();
  const route = useRouter().pathname;
  const copy = COPY[locale];
  const plan = cheapestPlan("simbye");
  if (!plan?.discountedUsd) return null;

  const price = formatUsd(plan.priceUsd);
  const planName = plan.name.replace(/(\d+) days?/, (_, n) => copy.days.replace("{n}", n));
  const checkedAt = latestCheckedAt()?.slice(0, 10);
  const checked = locale !== "en" && checkedAt ? dateLabel(checkedAt, locale) : pricesCheckedLabel();

  return (
    <aside className={styles.card} data-placement={ESIM_PLACEMENT.bookingCard} data-cta="booking-esim-card">
      <span className={styles.label}>{lead ? copy.guideEyebrow : copy.eyebrow}</span>
      <p className={styles.cardTitle}>{lead ?? copy.title}</p>
      <p className={styles.cardIntro}>{lead ? copy.guideIntro : copy.intro}</p>
      <div className={styles.choices}>
        <div className={styles.choice}>
          <p className={styles.choiceName}>Simbye</p>
          {siteCheapest()?.providerId === "simbye" && <p className={styles.choiceTag}>{copy.lowest}</p>}
          <p className={styles.choiceText}>{copy.simbyeFrom.replace("{price}", price).replace("{plan}", planName)}</p>
          <p className={styles.choiceText}>
            <strong>
              {copy.simbyeCode
                .replace("{discounted}", formatUsd(plan.discountedUsd))
                .replace("{code}", SIMBYE_DISCOUNT_CODE)
                .replace("{percent}", String(SIMBYE_DISCOUNT_PERCENT))}
            </strong>
          </p>
          <a
            href={simbyeTrackedUrl(ESIM_PLACEMENT.bookingCard, pageTag(route))}
            className={styles.buy}
            target="_blank"
            rel="sponsored noopener"
          >
            {copy.simbyeCta.replace("{price}", price)}
          </a>
        </div>
        <div className={styles.choice}>
          <p className={styles.choiceName}>Klook eSIM</p>
          <p className={styles.choiceTag}>{copy.klookTag}</p>
          <p className={styles.choiceText}>{KLOOK_ESIM_FACTS[locale]}</p>
          <KlookLink
            href={locale === "en" ? klookEsim.url : klookFor(klookEsim.url, locale)}
            adPlacement={ESIM_PLACEMENT.bookingCard}
            className={styles.buySecondary}
            target="_blank"
            rel="sponsored noopener"
          >
            {copy.klookCta}
          </KlookLink>
        </div>
      </div>
      <p className={styles.note}>{copy.note.replace("{date}", checked)}</p>
    </aside>
  );
}
