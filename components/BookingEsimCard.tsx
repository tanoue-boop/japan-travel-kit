import { useRouter } from "next/router";
import { useComponentLocale } from "./componentLocale";
import KlookLink from "./KlookLink";
import { ESIM_PLACEMENT, pageTag } from "../lib/esim-placement";
import { cheapestPlan, formatUsd, latestCheckedAt, pricesCheckedLabel, siteCheapest } from "../lib/esim-prices";
import { dateLabel, type Locale } from "../lib/i18n";
import { klookEsim } from "../lib/klook-links";
import { klookFor } from "../lib/klook-locale";
import { SIMBYE_DISCOUNT_CODE, SIMBYE_DISCOUNT_PERCENT, simbyeTrackedUrl } from "../lib/simbye";
import styles from "../styles/EsimBuyBlocks.module.css";

/**
 * "Your eSIM" card, directly after the booking button on a ticket page, for the reader
 * who has just decided to buy and still needs data in Japan.
 *
 * Two choices in commission order: Simbye (25%) with its cheapest plan, then Klook eSIM
 * (20%). The Klook side has no price: Klook answers automated reads with HTTP 403, so
 * data/esim-prices.json holds none and klookEsim.priceVerified is false. It quotes only
 * the tiers from klookEsim.specData. Add a price here once one has been read off the
 * listing, not before.
 *
 * Words live here once per language. Which language comes from the route.
 */
type Copy = {
  eyebrow: string;
  title: string;
  intro: string;
  lowest: string;
  simbyeFrom: string;
  simbyeCode: string;
  simbyeCta: string;
  klookTag: string;
  klookBody: string;
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
    lowest: "Lowest price we track",
    simbyeFrom: "From {price} ({plan})",
    simbyeCode: "{discounted} with code {code}, {percent}% off",
    simbyeCta: "Get Simbye from {price} →",
    klookTag: "Keep it with your Klook bookings",
    klookBody:
      "Sold as a QR code voucher. Choose your days and data on the listing, 500 MB to 50 GB or unlimited, and Klook shows the price.",
    klookCta: "Check Klook eSIM →",
    note: "Affiliate links: we may earn a commission at no extra cost to you. Simbye price checked {date}. Klook blocks automated price checks, so no Klook price is shown here.",
    days: "{n} days",
  },
  "zh-tw": {
    eyebrow: "訂完票之後",
    title: "出發前先把日本 eSIM 準備好",
    intro: "出發前掃 QR Code 完成設定，抵達後馬上就能上網。門票、地圖和電車時刻，從機場開始都能用手機查看。",
    lowest: "我們追蹤的最低價",
    simbyeFrom: "{price} 起（{plan}）",
    simbyeCode: "輸入折扣碼 {code} 享 {percent}% 折扣：{discounted}",
    simbyeCta: "查看 Simbye，{price} 起 →",
    klookTag: "和 Klook 訂單放在一起",
    klookBody: "以 QR Code 票券販售。在商品頁選擇天數與流量（500 MB 至 50 GB，或吃到飽），即可看到價格。",
    klookCta: "查看 Klook eSIM →",
    note: "以上為聯盟連結，您支付的價格不變，我們可能獲得分潤。Simbye 價格查核日：{date}。Klook 會阻擋自動查價，因此這裡不列 Klook 價格。",
    days: "{n} 天",
  },
  "zh-cn": {
    eyebrow: "订完票之后",
    title: "出发前先把日本 eSIM 准备好",
    intro: "出发前扫二维码完成设置，落地后马上就能上网。门票、地图和电车时刻，从机场开始都能用手机查看。",
    lowest: "我们追踪的最低价",
    simbyeFrom: "{price} 起（{plan}）",
    simbyeCode: "输入折扣码 {code} 享 {percent}% 折扣：{discounted}",
    simbyeCta: "查看 Simbye，{price} 起 →",
    klookTag: "和 Klook 订单放在一起",
    klookBody: "以二维码凭证销售。在商品页选择天数与流量（500 MB 至 50 GB，或不限流量），即可看到价格。",
    klookCta: "查看 Klook eSIM →",
    note: "以上为联盟链接，您支付的价格不变，我们可能获得分成。Simbye 价格核查日期：{date}。Klook 会阻止自动查价，因此这里不列 Klook 价格。",
    days: "{n} 天",
  },
  ko: {
    eyebrow: "예약 다음 단계",
    title: "출국 전에 일본 eSIM까지 준비하세요",
    intro: "출발 전에 QR 코드로 설정해 두면 도착하자마자 쓸 수 있습니다. 티켓, 지도, 열차 시간을 공항에서부터 휴대폰으로 확인하세요.",
    lowest: "확인한 요금 중 최저가",
    simbyeFrom: "{price}부터 ({plan})",
    simbyeCode: "코드 {code} 입력 시 {percent}% 할인: {discounted}",
    simbyeCta: "Simbye {price}부터 보기 →",
    klookTag: "클룩 예약과 함께 관리",
    klookBody: "QR 코드 바우처로 판매됩니다. 상품 페이지에서 일수와 데이터(500MB~50GB 또는 무제한)를 고르면 요금이 표시됩니다.",
    klookCta: "클룩 eSIM 보기 →",
    note: "제휴 링크이며, 추가 비용 없이 저희가 수수료를 받을 수 있습니다. Simbye 요금 확인일: {date}. 클룩은 자동 요금 확인을 막고 있어 여기에 클룩 요금을 적지 않습니다.",
    days: "{n}일",
  },
  th: {
    eyebrow: "หลังจองเสร็จ",
    title: "เตรียม eSIM ญี่ปุ่นให้พร้อมก่อนออกเดินทาง",
    intro: "ตั้งค่าด้วย QR Code ก่อนออกเดินทาง แล้วใช้งานได้ทันทีเมื่อถึงญี่ปุ่น ทั้งตั๋ว แผนที่ และเวลารถไฟดูบนมือถือได้ตั้งแต่สนามบิน",
    lowest: "ราคาต่ำสุดที่เราติดตาม",
    simbyeFrom: "เริ่ม {price} ({plan})",
    simbyeCode: "ใส่โค้ด {code} ลด {percent}% เหลือ {discounted}",
    simbyeCta: "ดู Simbye เริ่ม {price} →",
    klookTag: "อยู่รวมกับการจองใน Klook",
    klookBody: "ขายเป็นวอเชอร์ QR Code เลือกจำนวนวันและดาต้า (500 MB ถึง 50 GB หรือไม่จำกัด) ในหน้าสินค้าเพื่อดูราคา",
    klookCta: "ดู Klook eSIM →",
    note: "เป็นลิงก์พันธมิตร เราอาจได้รับค่าคอมมิชชันโดยคุณไม่ต้องจ่ายเพิ่ม ตรวจสอบราคา Simbye เมื่อ {date} Klook บล็อกการตรวจสอบราคาอัตโนมัติ เราจึงไม่ระบุราคา Klook ไว้ที่นี่",
    days: "{n} วัน",
  },
};

export default function BookingEsimCard() {
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
    <aside className={styles.card} data-placement={ESIM_PLACEMENT.bookingCard}>
      <span className={styles.label}>{copy.eyebrow}</span>
      <p className={styles.cardTitle}>{copy.title}</p>
      <p className={styles.cardIntro}>{copy.intro}</p>
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
          <p className={styles.choiceText}>{copy.klookBody}</p>
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
