import styles from "../styles/BestEsimJapan.module.css";
import KlookLink from "./KlookLink";

/**
 * One line, at most two Klook links, directly under a ticket page's main CTA
 * (task-jtk-20261127-A32, 27 Nov 2026).
 *
 * Why. The tickets these pages sell are 2% (SHIBUYA SKY, Disney, teamLab) or 0%
 * (USJ Express Pass) on Klook. The reader who has just pressed the ticket button
 * is also deciding the things that pay 5% or more — the subway pass, the airport
 * bus, the hotel by the park, the eSIM. Card blocks lower down already list those;
 * this is the short version that sits next to the button itself. Two links at most,
 * so the ticket stays the main action.
 *
 * The links carry the page's own ad id (spare ids ran out on 27 Nov 2026); the
 * wrapper's `data-placement="addon-line"` separates them in GA4's affiliate_click.
 * No prices.
 */
export type KlookAddOn = { label: string; url: string };

type Props = {
  /** The lead phrase before the links, e.g. "Same trip:". */
  lead: string;
  /** One or two products. Anything past the second is ignored. */
  items: KlookAddOn[];
  placement?: string;
};

export default function KlookAddOnLine({ lead, items, placement = "addon-line" }: Props) {
  return (
    <p
      className={styles.bodyText}
      data-placement={placement}
      style={{ marginTop: "0.6rem", marginBottom: 0, fontSize: "0.88rem" }}
    >
      <strong>{lead}</strong>{" "}
      {items.slice(0, 2).map((item, i) => (
        <span key={item.url}>
          {i > 0 && " ・ "}
          <KlookLink
            href={item.url}
            target="_blank"
            rel="sponsored nofollow noopener"
            style={{ color: "var(--red)", fontWeight: 600 }}
          >
            {item.label}
          </KlookLink>
        </span>
      ))}
    </p>
  );
}
