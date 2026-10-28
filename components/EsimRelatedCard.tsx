import Link from "next/link";
import type { ReactNode } from "react";
import styles from "../styles/BestEsimJapan.module.css";

/**
 * One card in an eSIM page's "Keep reading" grid.
 *
 * The href stays a literal in the calling page rather than moving into a list here:
 * scripts/check-internal-links.js counts inbound article links by matching
 * `href="/…"` in pages/, so a route passed as data would be invisible to the audit.
 */
export default function EsimRelatedCard({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={styles.relatedCard}>
      <div className={styles.relatedIcon}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <line x1="9" y1="16" x2="13" y2="16" />
        </svg>
      </div>
      <div className={styles.relatedMeta}>
        <p className={styles.relatedTitle}>{children}</p>
        <span className={styles.relatedArrow}>Read guide →</span>
      </div>
    </Link>
  );
}
