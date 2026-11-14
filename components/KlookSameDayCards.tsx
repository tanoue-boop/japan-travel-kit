import type { ReactNode } from "react";
import styles from "../styles/BestEsimJapan.module.css";
import KlookLink from "./KlookLink";
import { useComponentLocale } from "./componentLocale";
import type { KlookSameDayCard } from "../lib/klook-links";
import type { Locale } from "../lib/i18n";

/**
 * Two or three small Klook cards for directly under a ticket page's main CTA
 * (task-jtk-20261114-P01, 14 Nov 2026).
 *
 * Why: the most-clicked ticket pages sell a 2% observation-deck ticket, while the
 * reader who books it is also deciding the same day's hotel, tour or activity —
 * the 5% and 6.5% bands. KlookTripPrep is a long list placed lower down; this is
 * the compact version that sits beside the button the reader has just looked at.
 *
 * Links go through KlookLink with `adPlacement`, so the block has its own row in
 * Klook's report (`<page>#same-day-cards` in data/klook-adids.json). No prices.
 * The heading is an h3: the block sits above the page's first H2.
 */
type Props = {
  heading: string;
  cards: KlookSameDayCard[];
  /** Defaults to "same-day-cards". */
  adPlacement?: string;
  /** Defaults to the locale of the route the block renders on. */
  locale?: Locale;
  /** Optional line under the cards — the page's own guides to the same products. */
  footnote?: ReactNode;
};

const COPY: Record<Locale, { label: string; note: string }> = {
  en: {
    label: "Book for the same day",
    note: "Links go to Klook, which pays us a commission at no extra cost to you. Check the listing for your date.",
  },
  "zh-tw": {
    label: "同一天一起預訂",
    note: "連結前往 Klook，透過連結預訂我們會獲得分潤，您支付的價格不變。請查看你出發日期的商品頁。",
  },
  "zh-cn": {
    label: "同一天一起预订",
    note: "链接前往 Klook，为推广联盟链接，你无需支付额外费用。请查看出行日期对应的商品页面。",
  },
  ko: {
    label: "같은 날 예약",
    note: "링크는 클룩으로 연결되며, 추가 비용 없이 저희가 수수료를 받습니다. 여행 날짜의 상품 페이지를 확인하세요.",
  },
  th: {
    label: "จองไว้สำหรับวันเดียวกัน",
    note: "ลิงก์ไปที่ Klook ซึ่งจ่ายค่าคอมมิชชันให้เราโดยคุณไม่ต้องจ่ายเพิ่ม โปรดดูหน้าสินค้าสำหรับวันที่ของคุณ",
  },
};

export default function KlookSameDayCards({ heading, cards, adPlacement = "same-day-cards", locale, footnote }: Props) {
  const copy = COPY[useComponentLocale(locale)];
  return (
    <section className={styles.bodySection} data-placement={adPlacement}>
      <span className={styles.sectionLabel}>{copy.label}</span>
      <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem" }}>{heading}</h3>
      <div className={styles.sameDayGrid}>
        {cards.map((card) => (
          <KlookLink
            key={card.url}
            href={card.url}
            adPlacement={adPlacement}
            target="_blank"
            rel="sponsored noopener"
            className={styles.sameDayCard}
          >
            <span className={styles.sameDayKind}>{card.kind}</span>
            <span className={styles.sameDayTitle}>{card.label}</span>
            <span className={styles.sameDayWhy}>{card.why}</span>
            <span className={styles.sameDayCta}>{card.ctaLabel}</span>
          </KlookLink>
        ))}
      </div>
      {footnote && (
        <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem" }}>
          {footnote}
        </p>
      )}
      <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
        {copy.note}
      </p>
    </section>
  );
}
