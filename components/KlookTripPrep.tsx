import styles from "../styles/BestEsimJapan.module.css";
import KlookLink from "./KlookLink";
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
  /**
   * Eyebrow above the heading. Defaults to "Before your trip", which is wrong for
   * the one slot that sits next to a departure-day section rather than a planning
   * one (the tax-free guide's airport run).
   */
  label?: string;
};

export default function KlookTripPrep({ heading, intro, items, label = "Before your trip" }: Props) {
  return (
    <section className={styles.bodySection}>
      <span className={styles.sectionLabel}>{label}</span>
      <h2 className={styles.sectionTitle}>{heading}</h2>
      <p className={styles.bodyText}>{intro}</p>
      <ul className={styles.pickList}>
        {items.map((item) => (
          <li key={item.url}>
            <span className={styles.proIcon}>▸</span>
            <span>
              <strong>{item.label}</strong> — {item.why}{" "}
              <KlookLink
                href={item.url}
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
        These go to Klook, which pays us a commission at no extra cost to you. Prices and availability
        are Klook&apos;s — we do not quote them here because its product pages block automated checks.
      </p>
    </section>
  );
}
