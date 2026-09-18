import Link from "next/link";
import { formatUsd, getProvider, plansFor, formatDate, type EsimProviderId } from "../lib/esim-prices";
import styles from "../styles/BestEsimJapan.module.css";
import tools from "../styles/Tools.module.css";

/**
 * A single provider's Japan plans, straight from data/esim-prices.json.
 * Used on the review pages so they can never drift from the tracker.
 */
export default function ProviderPlanTable({ providerId, limit }: { providerId: EsimProviderId; limit?: number }) {
  const provider = getProvider(providerId);
  const all = plansFor(providerId);
  const rows = limit ? all.slice(0, limit) : all;

  return (
    <div>
      <div className={styles.tableWrap}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                {["Plan", "Data", "Validity", "Price", "Price / GB"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((plan) => (
                <tr key={plan.id}>
                  <td className={styles.tdProvider}>{plan.name}</td>
                  <td style={{ fontWeight: 700, color: plan.unlimited ? "#c62828" : "#0d1b4b", whiteSpace: "nowrap" }}>
                    {plan.unlimited ? "Unlimited" : `${plan.gb} GB`}
                    {plan.note && <span className={tools.tdNote}>{plan.note}</span>}
                  </td>
                  <td className={styles.tdNetwork} style={{ whiteSpace: "nowrap" }}>
                    {plan.days} {plan.days === 1 ? "day" : "days"}
                  </td>
                  <td className={styles.tdPrice}>{formatUsd(plan.priceUsd)}</td>
                  <td className={plan.perGb === null ? tools.tdMuted : undefined} style={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                    {plan.perGb === null ? "—" : `${formatUsd(plan.perGb)}/GB`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className={styles.bodyText} style={{ marginTop: "0.9rem", fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem" }}>
        <span className={tools.liveBadge}><span className={tools.liveDot} /> Prices checked daily</span>
        <span>
          USD prices from {provider.name}&apos;s official site, checked {formatDate(provider.fetchedAt)}.
          {limit && all.length > limit ? ` Showing the ${limit} cheapest of ${all.length} plans.` : ""}{" "}
          <Link href="/guides/esim/japan-esim-data-plans" className={tools.inlineLink}>Compare all providers →</Link>
        </span>
      </p>
    </div>
  );
}
