import type { ReactNode } from "react";
import styles from "../styles/BestEsimJapan.module.css";
import KlookLink from "./KlookLink";

/** The rel every outbound link in this block carries. */
export const PARTNER_REL = "sponsored noopener";

/**
 * A short paid-link block for the pages that are not articles: the category hubs and
 * the about and legal pages, which until 5 Nov 2026 carried no link that pays
 * (scripts/check-revenue-links.mjs now fails the build check on any such page).
 *
 * One paragraph with the in-text links, passed as children, one button and one
 * disclosure line. Everything goes through KlookLink, which stamps a Klook URL with
 * the ad id of the page it renders on and leaves any other URL untouched, so the
 * button can be a Wise link as easily as a Klook one. The in-text links use
 * <PartnerTextLink>.
 *
 * No prices, for the same reason as KlookTripPrep: Klook blocks automated reads of
 * its product pages, so nothing printed here could be verified.
 */
type Props = {
  label: string;
  heading: string;
  children: ReactNode;
  cta: { href: string; label: string };
  note?: string;
};

const DEFAULT_NOTE =
  "These are affiliate links: we earn a commission if you buy through them, at no extra cost to you. Check the current price and terms on the seller's own page.";

export function PartnerTextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <KlookLink
      href={href}
      target="_blank"
      rel={PARTNER_REL}
      style={{ color: "var(--accent)", fontWeight: 600 }}
    >
      {children}
    </KlookLink>
  );
}

export default function PartnerPick({ label, heading, children, cta, note = DEFAULT_NOTE }: Props) {
  return (
    <section className={styles.bodySection}>
      <span className={styles.sectionLabel}>{label}</span>
      <h2 className={styles.sectionTitle}>{heading}</h2>
      <p className={styles.bodyText}>{children}</p>
      <p style={{ marginTop: "1.25rem" }}>
        <KlookLink href={cta.href} target="_blank" rel={PARTNER_REL} className={styles.verdictBtn}>
          {cta.label}
        </KlookLink>
      </p>
      <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
        {note}
      </p>
    </section>
  );
}
