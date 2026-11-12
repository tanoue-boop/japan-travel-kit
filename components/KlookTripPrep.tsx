import styles from "../styles/BestEsimJapan.module.css";
import KlookLink from "./KlookLink";
import { useComponentLocale } from "./componentLocale";
import type { KlookTripPrepItem } from "../lib/klook-links";
import type { Locale } from "../lib/i18n";

/**
 * A short "Before your trip" block for the money guides, which until now had
 * no Klook route at all despite being some of the most-read pages on the site.
 *
 * One line per product, each with a reason drawn from what the host page is
 * actually about. No prices: Klook answers automated reads of its product
 * pages with HTTP 403, so nothing here could be verified.
 *
 * The default eyebrow and disclosure exist once per language (2026-11-01); the
 * English ones are unchanged.
 */
type Props = {
  heading: string;
  intro: string;
  items: KlookTripPrepItem[];
  /**
   * Eyebrow above the heading. Defaults to "Before your trip", which is wrong for
   * the one slot that sits next to a departure-day section rather than a planning
   * one (the tax-free guide's airport run).
   */
  label?: string;
  /**
   * The disclosure line under the list. Defaults to the one in the page's
   * language; a page can still pass its own.
   */
  note?: string;
  /** Defaults to the locale of the route the block renders on. */
  locale?: Locale;
  /**
   * Gives the block's Klook links their own ad id (key `<page>#<placement>` in
   * data/klook-adids.json); without it they carry the page's id.
   */
  adPlacement?: string;
  /**
   * 3 for a block placed above a page's first H2 (12 Nov 2026), so the page's first
   * H2 is still its first answer section. Defaults to 2.
   */
  headingLevel?: 2 | 3;
};

const COPY: Record<Locale, { label: string; note: string }> = {
  en: {
    label: "Before your trip",
    note: "These go to Klook, which pays us a commission at no extra cost to you. Prices and availability are Klook's, so check the listing for your date.",
  },
  "zh-tw": {
    label: "出發之前",
    note: "以上連結前往 Klook，透過連結預訂我們會獲得分潤，您支付的價格不變。價格與庫存以 Klook 為準——Klook 價格依日期而變，因此這裡不列價格，請查看你出發日期的商品頁。",
  },
  "zh-cn": {
    label: "出发之前",
    note: "以上链接前往 Klook，为推广联盟链接。如果你通过这些链接预订，我们可能获得佣金，你无需支付额外费用。价格及可预订名额以 Klook 公布的信息为准。Klook 价格随日期变化，因此这里不列价格，请查看出行日期对应的商品页面。",
  },
  ko: {
    label: "출발 전에",
    note: "이 목록의 링크는 클룩으로 연결되며, 추가 비용 없이 저희가 수수료를 받습니다. 가격과 재고는 클룩 기준이며, 가격이 날짜에 따라 달라져 여기에는 적지 않으니 여행 날짜의 상품 페이지를 확인하세요.",
  },
  th: {
    label: "ก่อนออกเดินทาง",
    note: "ลิงก์เหล่านี้ไปที่ Klook ซึ่งจ่ายค่าคอมมิชชันให้เราโดยคุณไม่ต้องจ่ายเพิ่ม ราคาและที่ว่างเป็นของ Klook — ราคาของ Klook เปลี่ยนตามวันที่ จึงไม่ได้ระบุไว้ที่นี่ โปรดดูหน้าสินค้าสำหรับวันที่ของคุณ",
  },
};

export default function KlookTripPrep({ heading, intro, items, label, note, locale, adPlacement, headingLevel = 2 }: Props) {
  const copy = COPY[useComponentLocale(locale)];
  const Heading = headingLevel === 3 ? "h3" : "h2";
  return (
    <section className={styles.bodySection}>
      <span className={styles.sectionLabel}>{label ?? copy.label}</span>
      <Heading className={styles.sectionTitle}>{heading}</Heading>
      <p className={styles.bodyText}>{intro}</p>
      <ul className={styles.pickList}>
        {items.map((item) => (
          <li key={item.url}>
            <span className={styles.proIcon}>▸</span>
            <span>
              <strong>{item.label}</strong> — {item.why}{" "}
              <KlookLink
                href={item.url}
                adPlacement={adPlacement}
                target="_blank"
                rel="sponsored noopener"
                style={{ color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                {item.ctaLabel}
              </KlookLink>
            </span>
          </li>
        ))}
      </ul>
      <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
        {note ?? copy.note}
      </p>
    </section>
  );
}
