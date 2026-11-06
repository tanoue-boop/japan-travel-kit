import { formatUsd, getProvider, type EsimPlan } from "../lib/esim-prices";
import type { EsimPicksCopy } from "../lib/esim-picks-copy";
import { pickRows, type PickSeller } from "../lib/esim-picks";
import { KLOOK_ESIM_FACTS, KLOOK_ESIM_FROM_LABEL } from "../lib/klook-esim-facts";
import { klookEsim } from "../lib/klook-links";
import { klookFor } from "../lib/klook-locale";
import type { TranslatedLocale } from "../lib/i18n";
import { SIMBYE_DISCOUNT_CODE, SIMBYE_DISCOUNT_PERCENT, SIMBYE_JAPAN_DISCOUNT_URL } from "../lib/simbye";
import KlookLink from "./KlookLink";
import styles from "../styles/EsimUseCase.module.css";

const SELLER_NAME: Record<PickSeller, string> = {
  simbye: "Simbye",
  klook: "Klook",
  airalo: "Airalo",
  sakura: "Sakura Mobile",
};

function Buy({
  seller,
  plan,
  label,
  klookLocale,
}: {
  seller: PickSeller;
  plan: EsimPlan | null;
  label: string;
  klookLocale?: TranslatedLocale;
}) {
  if (seller === "klook") {
    return (
      <KlookLink
        href={klookLocale ? klookFor(klookEsim.url, klookLocale) : klookEsim.url}
        className={styles.buy}
        target="_blank"
        rel="sponsored noopener"
      >
        {label}
      </KlookLink>
    );
  }
  const href = seller === "simbye" ? (plan?.link ?? SIMBYE_JAPAN_DISCOUNT_URL) : getProvider(seller).affiliateUrl;
  return (
    <a href={href} className={styles.buy} target="_blank" rel="sponsored noopener">
      {label}
    </a>
  );
}

/**
 * "Which eSIM for which need": one row per need, each with its own button, plus the
 * Simbye discount code with the discounted prices worked out. Every price comes from
 * data/esim-prices.json through lib/esim-picks.ts. Shared by the pillar page in all five
 * languages and by the Reddit summary, so they cannot disagree.
 */
export default function EsimUseCaseTable({
  copy,
  checkedLabel,
  formatPlan = (name) => name,
  klookLocale,
}: {
  copy: EsimPicksCopy;
  /** The last price check, already formatted for the page's language. */
  checkedLabel: string;
  /** A translated page passes its own formatter, so "30 days" comes out localised. */
  formatPlan?: (name: string) => string;
  /** On a translated page, so the Klook button opens Klook in the reader's language. */
  klookLocale?: TranslatedLocale;
}) {
  return (
    <section className={styles.section} data-placement="esim-use-case-table">
      <span className={styles.label}>{copy.sectionLabel}</span>
      <h2 className={styles.heading}>{copy.heading}</h2>
      <p className={styles.intro}>
        {copy.intro} <strong>{copy.pricesChecked.replace("{date}", checkedLabel)}</strong>
      </p>

      <div className={styles.code}>
        <div>
          <p className={styles.codeHeading}>{copy.codeHeading}</p>
          <p className={styles.codeValue}>{SIMBYE_DISCOUNT_CODE}</p>
        </div>
        <div>
          <p className={styles.codeText}>{copy.codeText.replace("{percent}", String(SIMBYE_DISCOUNT_PERCENT))}</p>
          <p className={styles.codeNote}>{copy.codeNote}</p>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>{copy.cols.need}</th>
            <th>{copy.cols.pick}</th>
            <th>{copy.cols.plan}</th>
            <th>{copy.cols.price}</th>
            <th>{copy.cols.buy}</th>
          </tr>
        </thead>
        <tbody>
          {pickRows.map(({ id, seller, plan }) => (
            <tr key={id}>
              <td className={styles.need}>
                {copy.rows[id].need}
                <span className={styles.why}>{copy.rows[id].why}</span>
              </td>
              <td className={styles.seller}>{SELLER_NAME[seller]}</td>
              <td>{plan ? formatPlan(plan.name) : "—"}</td>
              <td className={styles.price}>
                {plan?.discountedUsd ? (
                  <>
                    <s>{formatUsd(plan.priceUsd)}</s> <strong>{formatUsd(plan.discountedUsd)}</strong>
                    <span className={styles.withCode}>{copy.withCode}</span>
                  </>
                ) : plan ? (
                  <strong>{formatUsd(plan.priceUsd)}</strong>
                ) : seller === "klook" ? (
                  KLOOK_ESIM_FROM_LABEL[klookLocale ?? "en"]
                ) : (
                  copy.noPrice[seller as "klook" | "sakura"]
                )}
              </td>
              <td className={styles.buyCell}>
                <Buy seller={seller} plan={plan} label={copy.cta[seller]} klookLocale={klookLocale} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.note}>{copy.tableNote}</p>
      <p className={styles.note}>{KLOOK_ESIM_FACTS[klookLocale ?? "en"]}</p>
    </section>
  );
}
