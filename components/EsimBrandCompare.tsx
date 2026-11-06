import { useRouter } from "next/router";
import KlookLink from "./KlookLink";
import { airaloTrackedUrl, ESIM_PLACEMENT, pageTag } from "../lib/esim-placement";
import {
  cheapestCovering,
  cheapestUnlimited,
  formatUsd,
  getProvider,
  pricesCheckedLabel,
  type EsimPlan,
} from "../lib/esim-prices";
import { klookEsim } from "../lib/klook-links";
import { SIMBYE_DISCOUNT_CODE, SIMBYE_DISCOUNT_PERCENT, simbyeTrackedUrl } from "../lib/simbye";
import styles from "../styles/EsimBuyBlocks.module.css";

export type EsimBrand = "airalo" | "holafly" | "esimgo" | "sakura";

const PLACEMENT = ESIM_PLACEMENT.brandCompare;
const TRIP_LENGTHS = [3, 7, 15, 30];

/** Each row: the brand's cheapest plan for the trip, and Simbye's for the same days and data. */
function compareRows(brand: EsimBrand) {
  const rows: { trip: string; plan: EsimPlan; simbye: EsimPlan | null }[] = [];
  const add = (trip: string, days: number, plan: EsimPlan | null) => {
    if (plan) rows.push({ trip, plan, simbye: cheapestCovering("simbye", days, plan) });
  };
  for (const days of TRIP_LENGTHS) add(`${days} days`, days, cheapestCovering(brand, days));
  if (!rows.every((r) => r.plan.unlimited)) add("7 days, unlimited", 7, cheapestUnlimited(brand, 7));
  return rows;
}

/**
 * The title shape A19 set on the Sakura review, "price vs cheaper options". Built from
 * the price file, so it moves with the table under it.
 */
export function brandReviewTitle(brand: EsimBrand, name: string): string {
  const week = cheapestCovering(brand, 7);
  return `${name} Japan Review 2026: 7 Days ${week ? formatUsd(week.priceUsd) : ""} vs Cheaper eSIMs`;
}

/**
 * "The same trip, side by side" at the top of a brand review. The reader searched the
 * brand by name, so the first thing to answer is what it costs against the alternatives.
 * The brand's own price wins some rows, and those are left to show it.
 */
export default function EsimBrandCompare({ brand }: { brand: EsimBrand }) {
  const tag = pageTag(useRouter().pathname);
  const provider = getProvider(brand);
  const brandUrl = brand === "airalo" ? airaloTrackedUrl(PLACEMENT, tag) : provider.affiliateUrl;

  return (
    <section className={styles.block} data-placement={PLACEMENT}>
      <h2 className={styles.heading}>{provider.name} vs Simbye vs Klook eSIM: same trip, side by side</h2>
      <p className={styles.intro}>
        Each row takes {provider.name}&apos;s cheapest plan for that trip, then the cheapest Simbye plan with at least
        the same days and data.
      </p>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Trip</th>
            <th>{provider.name}</th>
            <th>Simbye</th>
            <th>Klook eSIM</th>
          </tr>
        </thead>
        <tbody>
          {compareRows(brand).map(({ trip, plan, simbye }) => (
            <tr key={trip}>
              <td className={styles.seller}>{trip}</td>
              <td data-label={provider.name}>
                <strong>{formatUsd(plan.priceUsd)}</strong>
                <span className={styles.withCode}>{plan.name}</span>
              </td>
              <td data-label="Simbye">
                {simbye ? (
                  <>
                    <strong>{formatUsd(simbye.priceUsd)}</strong>
                    {simbye.discountedUsd ? ` (${formatUsd(simbye.discountedUsd)} with code)` : ""}
                    <span className={styles.withCode}>{simbye.name}</span>
                  </>
                ) : (
                  "—"
                )}
              </td>
              <td data-label="Klook eSIM">{klookEsim.priceUnknownLabel}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.buttons}>
        <a href={simbyeTrackedUrl(PLACEMENT, tag)} className={styles.buy} target="_blank" rel="sponsored noopener">
          Get Simbye →
        </a>
        <KlookLink
          href={klookEsim.url}
          adPlacement={PLACEMENT}
          className={styles.buySecondary}
          target="_blank"
          rel="sponsored noopener"
        >
          Check Klook eSIM →
        </KlookLink>
        {brandUrl !== "#" && (
          <a href={brandUrl} className={styles.buySecondary} target="_blank" rel="sponsored noopener">
            Get {provider.name} →
          </a>
        )}
      </div>
      <p className={styles.code}>
        Code <strong className={styles.codeValue}>{SIMBYE_DISCOUNT_CODE}</strong> takes {SIMBYE_DISCOUNT_PERCENT}% off
        any Simbye eSIM plan. The Simbye button applies it for you.
      </p>
      <p className={styles.note}>
        Prices in USD, checked {pricesCheckedLabel()}. Unlimited plans differ in their full-speed limits, so read those
        before comparing on price alone. Klook shows from US$1.05 before you choose days and data, with no plan named, so no per-plan price is shown.
        {brandUrl === "#" ? ` We have no link to ${provider.name}.` : ""} Affiliate links.
      </p>
    </section>
  );
}
