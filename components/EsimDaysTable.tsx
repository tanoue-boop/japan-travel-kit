import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import KlookLink from "./KlookLink";
import { airaloTrackedUrl, ESIM_PLACEMENT, pageTag } from "../lib/esim-placement";
import { cheapestCovering, formatUsd, pricesCheckedLabel } from "../lib/esim-prices";
import { klookEsim } from "../lib/klook-links";
import { SIMBYE_DISCOUNT_CODE, SIMBYE_DISCOUNT_PERCENT, simbyeTrackedUrl } from "../lib/simbye";
import styles from "../styles/EsimBuyBlocks.module.css";

const DAY_CHOICES = [3, 5, 7, 10, 14, 30];
const PLACEMENT = ESIM_PLACEMENT.daysTable;

/**
 * "Pick your days, see the cheapest plan, buy": the top of the pages read by someone
 * about to buy. Runs in commission order. Simbye and Airalo prices come from
 * data/esim-prices.json for the chosen length; the server renders `defaultDays`, so the
 * page's own answer is in the HTML. Klook has no price to show: see BookingEsimCard.
 */
export default function EsimDaysTable({ defaultDays = 7 }: { defaultDays?: number }) {
  const [days, setDays] = useState(defaultDays);
  const tag = pageTag(useRouter().pathname);
  const simbye = cheapestCovering("simbye", days);
  const airalo = cheapestCovering("airalo", days);

  return (
    <section className={styles.block} data-placement={PLACEMENT}>
      <h2 className={styles.heading}>Cheapest Japan eSIM for your trip</h2>

      <div className={styles.days} role="group" aria-label="Trip length in days">
        {DAY_CHOICES.map((d) => (
          <button
            key={d}
            type="button"
            className={`${styles.day} ${d === days ? styles.dayOn : ""}`}
            aria-pressed={d === days}
            onClick={() => setDays(d)}
          >
            {d} days
          </button>
        ))}
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>eSIM</th>
            <th>Cheapest plan for {days} days</th>
            <th>Price</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.seller}>Simbye</td>
            <td>{simbye?.name ?? "—"}</td>
            <td className={styles.price}>
              {simbye?.discountedUsd ? (
                <>
                  <s>{formatUsd(simbye.priceUsd)}</s> <strong>{formatUsd(simbye.discountedUsd)}</strong>
                  <span className={styles.withCode}>with code</span>
                </>
              ) : (
                "—"
              )}
            </td>
            <td className={styles.buyCell}>
              <a href={simbyeTrackedUrl(PLACEMENT, tag)} className={styles.buy} target="_blank" rel="sponsored noopener">
                Get Simbye →
              </a>
            </td>
          </tr>
          <tr>
            <td className={styles.seller}>Klook eSIM</td>
            <td>Choose days and data on the listing</td>
            <td className={styles.price}>{klookEsim.priceUnknownLabel}</td>
            <td className={styles.buyCell}>
              <KlookLink
                href={klookEsim.url}
                adPlacement={PLACEMENT}
                className={styles.buy}
                target="_blank"
                rel="sponsored noopener"
              >
                Check Klook eSIM →
              </KlookLink>
            </td>
          </tr>
          <tr>
            <td className={styles.seller}>Airalo</td>
            <td>{airalo?.name ?? "—"}</td>
            <td className={styles.price}>{airalo ? <strong>{formatUsd(airalo.priceUsd)}</strong> : "—"}</td>
            <td className={styles.buyCell}>
              <a href={airaloTrackedUrl(PLACEMENT, tag)} className={styles.buy} target="_blank" rel="sponsored noopener">
                Get Airalo →
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <p className={styles.code}>
        Code <strong className={styles.codeValue}>{SIMBYE_DISCOUNT_CODE}</strong> takes {SIMBYE_DISCOUNT_PERCENT}% off
        any Simbye eSIM plan. The Simbye button applies it for you.
      </p>
      <p className={styles.note}>
        Each row is the lowest-priced plan that lasts the whole trip, which is often a small one. Plan on 0.5 to 1 GB a
        day and see <Link href="/guides/esim/japan-esim-data-plans">how much data you need</Link>. Affiliate links.
        Prices checked {pricesCheckedLabel()}; Klook prices change by date, so no Klook price is shown.
      </p>
    </section>
  );
}
