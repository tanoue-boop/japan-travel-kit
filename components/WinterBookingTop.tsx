import type { ReactNode } from "react";
import styles from "../styles/BestEsimJapan.module.css";
import KlookLink from "./KlookLink";
import { useComponentLocale } from "./componentLocale";
import { dateLabel, type Locale } from "../lib/i18n";
import { checkedLabel } from "../lib/attraction-prices";

/**
 * The top-of-page booking block on the winter guides (task jtk-20261106-A21): how
 * far ahead to book, three tours with price, length and departure point, and a
 * button on each. It sits directly under the affiliate disclosure, so the December
 * to February reader reaches a bookable product before the long read.
 *
 * Klook's product pages answer automated reads with HTTP 403, so a price here is
 * only ever the from-price Klook's own indexed listing showed on `checkedIso`, in
 * the currency that listing showed. Where no such price could be tied to the
 * activity id, the page passes `price: null` and the row says to open the listing:
 * a blank is honest and a guessed figure is not.
 *
 * The three tours are the page's editorial picks. Klook publishes no ranking of
 * the listings, so nothing here claims they are the best sellers.
 */
export type WinterTourRow = {
  title: string;
  url: string;
  /** e.g. "from about US$57". Null when no listing price could be confirmed. */
  price: string | null;
  duration: string;
  departs: string;
};

type Props = {
  heading: string;
  /** The booking-deadline guide, in one or two sentences. */
  deadline: ReactNode;
  tours: WinterTourRow[];
  /** ISO date the prices and listings were read. */
  checkedIso: string;
  /** Defaults to the locale of the route the block renders on. */
  locale?: Locale;
};

type Copy = {
  label: string;
  deadlineLabel: string;
  columns: [string, string, string, string, string];
  button: string;
  noPrice: string;
  note: (date: string) => string;
};

const COPY: Record<Locale, Copy> = {
  en: {
    label: "Book early",
    deadlineLabel: "When to book:",
    columns: ["Tour", "Price", "Duration", "Departs from", ""],
    button: "Check dates on Klook →",
    noPrice: "Shown on Klook for your date",
    note: (date) =>
      `Our picks for this trip, not a Klook ranking. Prices are the from-prices on Klook's listings as of ${date}; they change by date and currency, so the listing is the final word. Klook pays us a commission at no extra cost to you.`,
  },
  "zh-tw": {
    label: "提早預訂",
    deadlineLabel: "建議預訂時間：",
    columns: ["行程", "價格", "所需時間", "出發地", ""],
    button: "在 Klook 查看日期 →",
    noPrice: "請在 Klook 依日期查看",
    note: (date) =>
      `以上是本站依這趟旅程挑選的行程，並非 Klook 的排名。價格為 ${date} 時 Klook 商品頁的起價，會依日期與幣別變動，請以商品頁為準。透過連結預訂時我們會獲得分潤，您支付的價格不變。`,
  },
  "zh-cn": {
    label: "提前预订",
    deadlineLabel: "建议预订时间：",
    columns: ["行程", "价格", "所需时间", "出发地", ""],
    button: "在 Klook 查看日期 →",
    noPrice: "请在 Klook 按日期查看",
    note: (date) =>
      `以上是本站根据这趟旅程挑选的行程，并非 Klook 的排名。价格为 ${date} 时 Klook 商品页的起价，会随日期与币种变动，请以商品页为准。如果你通过链接预订，我们可能获得佣金，你无需支付额外费用。`,
  },
  ko: {
    label: "미리 예약",
    deadlineLabel: "예약 시기:",
    columns: ["투어", "가격", "소요 시간", "출발지", ""],
    button: "클룩에서 날짜 확인 →",
    noPrice: "클룩에서 날짜별로 확인",
    note: (date) =>
      `이 여행에 맞춰 저희가 고른 투어이며 클룩의 순위가 아닙니다. 가격은 ${date} 기준 클룩 상품 페이지의 최저가로, 날짜와 통화에 따라 달라지므로 상품 페이지가 기준입니다. 이 링크로 예약하시면 추가 비용 없이 저희가 수수료를 받습니다.`,
  },
  th: {
    label: "จองล่วงหน้า",
    deadlineLabel: "ควรจองเมื่อไร:",
    columns: ["ทัวร์", "ราคา", "ระยะเวลา", "จุดออกเดินทาง", ""],
    button: "ดูวันที่บน Klook →",
    noPrice: "ดูบน Klook ตามวันที่เดินทาง",
    note: (date) =>
      `ทัวร์เหล่านี้เป็นตัวเลือกของเราสำหรับทริปนี้ ไม่ใช่อันดับของ Klook ราคาเป็นราคาเริ่มต้นจากหน้าสินค้าของ Klook ณ ${date} และเปลี่ยนตามวันที่และสกุลเงิน โปรดยึดหน้าสินค้าเป็นหลัก หากจองผ่านลิงก์ เราได้รับค่าคอมมิชชันโดยคุณไม่ต้องจ่ายเพิ่ม`,
  },
};

export default function WinterBookingTop({ heading, deadline, tours, checkedIso, locale }: Props) {
  const resolved = useComponentLocale(locale);
  const copy = COPY[resolved];
  const date = resolved === "en" ? checkedLabel(checkedIso) : dateLabel(checkedIso, resolved);
  return (
    <section className={styles.comparisonSection}>
      <span className={styles.sectionLabel}>{copy.label}</span>
      <h2 className={styles.sectionTitle}>{heading}</h2>
      <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
        <strong>{copy.deadlineLabel}</strong> {deadline}
      </p>
      <div className={styles.tableWrap}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                {copy.columns.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour.url}>
                  <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{tour.title}</td>
                  <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{tour.price ?? copy.noPrice}</td>
                  <td style={{ fontSize: "0.88rem" }}>{tour.duration}</td>
                  <td style={{ fontSize: "0.88rem" }}>{tour.departs}</td>
                  <td style={{ fontSize: "0.86rem" }}>
                    <KlookLink
                      href={tour.url}
                      target="_blank"
                      rel="sponsored noopener"
                      style={{ color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" }}
                    >
                      {copy.button}
                    </KlookLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
        <KlookLink href={tours[0].url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
          {tours[0].title} →
        </KlookLink>
      </div>
      <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
        {copy.note(date)}
      </p>
    </section>
  );
}
