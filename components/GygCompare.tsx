import styles from "../styles/BestEsimJapan.module.css";
import { gygLink, GYG_REL, type GygListing } from "../lib/gyg-links";

/**
 * "Compare on GetYourGuide" — a second seller next to the Klook CTA that is
 * already on the page.
 *
 * Why it exists: Klook's Special Activities band pays 2% (SHIBUYA SKY, Tokyo
 * Disney) and some tickets pay 0% (the USJ Express Pass), while GetYourGuide's
 * floor is 8%. The Klook links and every factual claim around them are
 * unchanged — this only adds somewhere else to look.
 *
 * What it must not do: claim first-hand experience, print a price, or compare
 * cancellation terms. GetYourGuide answers automated reads with HTTP 403, so
 * none of that could be verified; see lib/gyg-links.ts.
 */

type Props = {
  /** Reporting key sent as `cmp` — the article slug. */
  slug: string;
  heading: string;
  /** Why a reader of *this* page might want the second seller. */
  intro: string;
  listings: GygListing[];
};

export default function GygCompare({ slug, heading, intro, listings }: Props) {
  return (
    <section className={styles.relatedSection}>
      <span className={styles.sectionLabel}>Also sold elsewhere</span>
      <h2 className={styles.sectionTitle}>{heading}</h2>
      <p className={styles.bodyText}>{intro}</p>
      <div className={styles.relatedGrid}>
        {listings.map((listing) => (
          <a
            key={listing.url}
            href={gygLink(listing.url, slug)}
            target="_blank"
            rel={GYG_REL}
            className={styles.relatedCard}
          >
            <div className={styles.relatedIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
              </svg>
            </div>
            <div className={styles.relatedMeta}>
              <p className={styles.relatedTitle}>{listing.title}</p>
              <span className={styles.relatedArrow}>{listing.what} · Compare on GetYourGuide →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/**
 * The inline form: one outlined button to sit directly beside a filled Klook
 * CTA. `pickCtaRow` is the flex row the pick cards already use, so the two
 * buttons wrap together on a phone.
 */
export function GygCompareButton({
  slug,
  listing,
  label = "Compare on GetYourGuide →",
}: {
  slug: string;
  listing: GygListing;
  label?: string;
}) {
  return (
    <a
      href={gygLink(listing.url, slug)}
      target="_blank"
      rel={GYG_REL}
      className={styles.pickCtaInternal}
    >
      {label}
    </a>
  );
}
