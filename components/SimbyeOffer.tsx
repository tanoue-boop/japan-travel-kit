import { cheapestAtLeastGb, formatUsd } from "../lib/esim-prices";
import { SIMBYE_DISCOUNT_CODE, SIMBYE_DISCOUNT_PERCENT } from "../lib/simbye";
import styles from "../styles/BestEsimJapan.module.css";

type OfferCopy = {
  /** Lead-in label, e.g. "Simbye discount:". */
  label: string;
  /** Sentence with {code}, {percent}, {plan}, {list} and {price} placeholders. */
  text: string;
  cta: string;
};

const EN: OfferCopy = {
  label: "Simbye discount:",
  text: "Code {code} takes {percent}% off every eSIM plan: {plan} is {list} at list price and {price} with the code.",
  cta: "Get Simbye eSIM →",
};

/**
 * The discount line that goes next to a Simbye CTA, once per page. The prices are the
 * feed's own `standard` and `current` figures, and the link is the feed's purchase URL,
 * so what the reader sees here is what the checkout was built to show.
 */
export default function SimbyeOffer({ gb = 10, copy = EN }: { gb?: number; copy?: OfferCopy }) {
  const plan = cheapestAtLeastGb("simbye", gb);
  if (!plan?.discountedUsd || !plan.link) return null;
  const text = copy.text
    .replace("{code}", SIMBYE_DISCOUNT_CODE)
    .replace("{percent}", String(SIMBYE_DISCOUNT_PERCENT))
    .replace("{plan}", plan.name)
    .replace("{list}", formatUsd(plan.priceUsd))
    .replace("{price}", formatUsd(plan.discountedUsd));
  return (
    <div className={styles.pickTarget} style={{ marginTop: "1.25rem", flexWrap: "wrap", gap: "0.6rem" }}>
      <span className={styles.pickTargetLabel}>{copy.label}</span>
      <span>
        {text}{" "}
        <a
          href={plan.link}
          target="_blank"
          rel="sponsored noopener"
          style={{ color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" }}
        >
          {copy.cta}
        </a>
      </span>
    </div>
  );
}
