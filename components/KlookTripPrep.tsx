import styles from "../styles/BestEsimJapan.module.css";
import type { KlookTripPrepItem } from "../lib/klook-links";

/**
 * A short "Before your trip" block for the money guides, which until now had
 * no Klook route at all despite being some of the most-read pages on the site.
 *
 * One line per product, each with a reason drawn from what the host page is
 * actually about. No prices: Klook answers automated reads of its product
 * pages with HTTP 403, so nothing here could be verified.
 */
type Props = {
  heading: string;
  intro: string;
  items: KlookTripPrepItem[];
};

export default function KlookTripPrep({ heading, intro, items }: Props) {
  return (
    <section className={styles.bodySection}>
      <span className={styles.sectionLabel}>Before your trip</span>
      <h2 className={styles.sectionTitle}>{heading}</h2>
      <p className={styles.bodyText}>{intro}</p>
      <ul className={styles.pickList}>
        {items.map((item) => (
          <li key={item.url}>
            <span className={styles.proIcon}>▸</span>
            <span>
              <strong>{item.label}</strong> — {item.why}{" "}
              <a
                href={item.url}
                target="_blank"
                rel="sponsored noopener"
                style={{ color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                {item.ctaLabel}
              </a>
            </span>
          </li>
        ))}
      </ul>
      <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
        These go to Klook, which pays us a commission at no extra cost to you. Prices and availability
        are Klook&apos;s — we do not quote them here because its product pages block automated checks.
      </p>
    </section>
  );
}
