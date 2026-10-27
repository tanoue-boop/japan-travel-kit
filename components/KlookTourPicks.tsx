import styles from "../styles/BestEsimJapan.module.css";
import KlookLink from "./KlookLink";
import type { KlookTour } from "../lib/klook-links";

/**
 * Tour and activity links for the end of a ticket guide — the 6.5% Klook band,
 * next to ticket listings that pay 0–2%. The ticket CTAs on those pages are
 * untouched; this is an extra slot alongside the related-guides block.
 */
type Props = {
  heading: string;
  intro: string;
  tours: KlookTour[];
};

export default function KlookTourPicks({ heading, intro, tours }: Props) {
  return (
    <section className={styles.relatedSection}>
      <span className={styles.sectionLabel}>Same trip, same city</span>
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
              <span className={styles.relatedArrow}>{tour.desc} · View on Klook →</span>
            </div>
          </KlookLink>
        ))}
      </div>
    </section>
  );
}
