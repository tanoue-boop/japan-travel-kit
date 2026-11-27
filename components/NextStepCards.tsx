import { useRouter } from "next/router";
import styles from "../styles/BestEsimJapan.module.css";
import KlookLink from "./KlookLink";
import { NEXT_STEP_PLACEMENT, NEXT_STEP_SETS, type NextStepSet } from "../lib/next-step";
import { normalizeKlookPagePath } from "../lib/klook-adids";

/**
 * One block of 2–4 tappable cards directly under a page's opening answer: what the
 * reader of that page does next (task jtk-20261127-A29). The sets live in
 * lib/next-step.ts, keyed by page path, so a page only drops in <NextStepCards />.
 *
 * Every card is one whole link, so the tap target is the card, not a small text
 * link. All links go through KlookLink (Klook URLs get the page's ad id; the
 * Simbye URL passes through untouched). The section's data-placement="next-step"
 * is what pages/_app.tsx reads into affiliate_click's `placement`.
 *
 * English only for now: the 18 pages in the task are English routes.
 */
type Props = {
  /** Defaults to the route the block renders on. */
  path?: string;
  /** h3 when the block sits above the page's first answer h2; defaults to h2. */
  as?: "h2" | "h3";
  /** Use this set instead of the one keyed by the route. */
  set?: NextStepSet;
  /**
   * A single row of pill links (each card's `short` label) for inside the home hero,
   * where four full cards would push the page's H1 out of the first screen.
   */
  compact?: boolean;
};

const NOTE =
  "These go to Klook and Simbye, which pay us a commission at no extra cost to you. Prices and availability are theirs, so check the listing for your date.";

export default function NextStepCards({ path, as = "h2", set, compact = false }: Props) {
  const router = useRouter();
  const key = normalizeKlookPagePath(path ?? router.asPath);
  const data = set ?? NEXT_STEP_SETS[key];
  if (!data) return null;
  if (compact) {
    return (
      <nav aria-label={data.heading} data-placement={NEXT_STEP_PLACEMENT} style={{ marginTop: "1.25rem" }}>
        <p style={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 0.5rem", color: "var(--text-muted)" }}>
          {data.heading}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {data.cards.map((card) => (
            <KlookLink
              key={card.href}
              href={card.href}
              target="_blank"
              rel="sponsored nofollow noopener"
              style={{
                display: "inline-block",
                padding: "0.55rem 0.85rem",
                border: "1px solid var(--accent)",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--accent)",
                textDecoration: "none",
                background: "var(--white)",
              }}
            >
              {card.short ?? card.title}
            </KlookLink>
          ))}
        </div>
        <p style={{ fontSize: "0.72rem", opacity: 0.75, margin: "0.5rem 0 0" }}>Affiliate links: we may earn a commission at no extra cost to you.</p>
      </nav>
    );
  }
  const Heading = as;
  const hasSimbye = data.cards.some((c) => c.href.includes("simbye.com"));
  return (
    <section className={styles.bodySection} data-placement={NEXT_STEP_PLACEMENT}>
      <span className={styles.sectionLabel}>Next step</span>
      <Heading className={styles.sectionTitle} style={as === "h3" ? { fontSize: "1.15rem" } : undefined}>
        {data.heading}
      </Heading>
      {data.intro && <p className={styles.bodyText}>{data.intro}</p>}
      <div className={styles.sameDayGrid}>
        {data.cards.map((card) => (
          <KlookLink
            key={card.href}
            href={card.href}
            target="_blank"
            rel="sponsored nofollow noopener"
            className={styles.sameDayCard}
          >
            <span className={styles.sameDayKind}>{card.kind}</span>
            <span className={styles.sameDayTitle}>{card.title}</span>
            <span className={styles.sameDayWhy}>{card.why}</span>
            <span className={styles.sameDayCta}>{card.cta}</span>
          </KlookLink>
        ))}
      </div>
      <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
        {hasSimbye ? NOTE : NOTE.replace("Klook and Simbye, which pay", "Klook, which pays").replace("theirs", "Klook's")}
      </p>
    </section>
  );
}
