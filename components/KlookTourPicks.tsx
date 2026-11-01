import styles from "../styles/BestEsimJapan.module.css";
import KlookLink from "./KlookLink";
import { useComponentLocale } from "./componentLocale";
import type { KlookTour } from "../lib/klook-links";
import type { Locale } from "../lib/i18n";

/**
 * Tour and activity links for the end of a ticket guide — the 6.5% Klook band,
 * next to ticket listings that pay 0–2%. The ticket CTAs on those pages are
 * untouched; this is an extra slot alongside the related-guides block.
 *
 * The two fixed strings exist once per language (2026-11-01); the English ones are
 * unchanged. The translated pages pass tours whose title/desc are already in their
 * language and whose url is on their Klook locale path (lib/klook-locale.ts).
 */
type Props = {
  heading: string;
  intro: string;
  tours: KlookTour[];
  /** Defaults to the locale of the route the block renders on. */
  locale?: Locale;
};

const COPY: Record<Locale, { label: string; cta: string }> = {
  en: { label: "Same trip, same city", cta: "View on Klook →" },
  "zh-tw": { label: "同一趟旅程・同一座城市", cta: "在 Klook 查看 →" },
  "zh-cn": { label: "同一趟旅程・同一座城市", cta: "在 Klook 查看 →" },
  ko: { label: "같은 여행, 같은 도시", cta: "클룩에서 보기 →" },
  th: { label: "ทริปเดียวกัน เมืองเดียวกัน", cta: "ดูบน Klook →" },
};

export default function KlookTourPicks({ heading, intro, tours, locale }: Props) {
  const copy = COPY[useComponentLocale(locale)];
  return (
    <section className={styles.relatedSection}>
      <span className={styles.sectionLabel}>{copy.label}</span>
      <h2 className={styles.sectionTitle}>{heading}</h2>
      <p className={styles.bodyText}>{intro}</p>
      <div className={styles.relatedGrid}>
        {tours.map((tour) => (
          <KlookLink
            key={tour.url}
            href={tour.url}
            target="_blank"
            rel="sponsored noopener"
            className={styles.relatedCard}
          >
            <div className={styles.relatedIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18l6-13 5 8 3-4 4 9z" />
                <line x1="2" y1="21" x2="22" y2="21" />
              </svg>
            </div>
            <div className={styles.relatedMeta}>
              <p className={styles.relatedTitle}>{tour.title}</p>
              <span className={styles.relatedArrow}>{tour.desc} · {copy.cta}</span>
            </div>
          </KlookLink>
        ))}
      </div>
    </section>
  );
}
