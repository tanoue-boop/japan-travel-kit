import styles from "../styles/BestEsimJapan.module.css";
import KlookLink from "./KlookLink";
import { useComponentLocale } from "./componentLocale";
import type { KlookStayArea } from "../lib/klook-links";
import type { Locale } from "../lib/i18n";

/**
 * "Where to stay so getting around is easy" — a short section for the city
 * transport and airport-transfer guides. One Klook hotel link per area, which
 * is the 6.5% Klook band rather than the 5% transport band the rest of those
 * pages sell into.
 *
 * The `why` text on each area comes from lib/klook-links.ts and is written to
 * agree with the lines and fares the host page already states. The fixed strings
 * exist once per language (2026-11-01); the English ones are unchanged.
 */
type Props = {
  heading: string;
  intro: string;
  areas: KlookStayArea[];
  /** Defaults to the locale of the route the block renders on. */
  locale?: Locale;
};

const COPY: Record<Locale, { label: string; cta: string; note: string }> = {
  en: {
    label: "Where to stay",
    cta: "Hotels on Klook →",
    note: "Hotel links go to Klook's own search for that area, which pays us a commission at no extra cost to you. Prices and availability are Klook's.",
  },
  "zh-tw": {
    label: "住哪裡",
    cta: "在 Klook 看飯店 →",
    note: "飯店連結前往 Klook 該區域的搜尋結果，透過連結預訂我們會獲得分潤，您支付的價格不變。價格與空房以 Klook 為準。",
  },
  "zh-cn": {
    label: "住哪里",
    cta: "在 Klook 看酒店 →",
    note: "酒店链接前往 Klook 该区域的搜索结果，通过链接预订我们会获得分成，您支付的价格不变。价格与空房以 Klook 为准。",
  },
  ko: {
    label: "어디에 묵을까",
    cta: "클룩에서 호텔 보기 →",
    note: "호텔 링크는 해당 지역의 클룩 검색 결과로 연결되며, 추가 비용 없이 저희가 수수료를 받습니다. 가격과 객실 현황은 클룩 기준입니다.",
  },
  th: {
    label: "พักที่ไหนดี",
    cta: "ดูโรงแรมบน Klook →",
    note: "ลิงก์โรงแรมไปที่หน้าค้นหาของ Klook สำหรับย่านนั้น ซึ่งจ่ายค่าคอมมิชชันให้เราโดยคุณไม่ต้องจ่ายเพิ่ม ราคาและห้องว่างเป็นของ Klook",
  },
};

export default function KlookStayAreas({ heading, intro, areas, locale }: Props) {
  const copy = COPY[useComponentLocale(locale)];
  return (
    <section className={styles.bodySection}>
      <span className={styles.sectionLabel}>{copy.label}</span>
      <h2 className={styles.sectionTitle}>{heading}</h2>
      <p className={styles.bodyText}>{intro}</p>
      <ul className={styles.pickList}>
        {areas.map((a) => (
          <li key={a.area}>
            <span className={styles.proIcon}>▸</span>
            <span>
              <strong>{a.area}</strong> — {a.why}{" "}
              <KlookLink
                href={a.url}
                target="_blank"
                rel="sponsored noopener"
                style={{ color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                {copy.cta}
              </KlookLink>
            </span>
          </li>
        ))}
      </ul>
      <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
        {copy.note}
      </p>
    </section>
  );
}
