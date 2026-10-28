import type { ReactNode } from "react";
import {
  formatUsd,
  getProvider,
  pricesCheckedLabel,
  type EsimPlan,
  type EsimProviderId,
} from "../lib/esim-prices";
import { esimSpecs, SPECS_CHECKED_AT } from "../lib/esim-specs";
import styles from "../styles/BestEsimJapan.module.css";
import tools from "../styles/Tools.module.css";

/**
 * The six columns a reader needs before they can choose: who sells it, how much data,
 * how long it lasts, what it costs, whether a Japanese phone number comes with it and
 * whether you can tether.
 *
 * Each page supplies its own `pick`, because the right row differs by question — a
 * study month is not a business week is not a family's seven days — but the columns,
 * the wording of the phone-number and tethering clauses and the two check dates are
 * the same everywhere. Prices come from data/esim-prices.json (daily); the other two
 * come from lib/esim-specs.ts. Both dates are printed under the table.
 */
export default function EsimAnswerTable({
  pick,
  firstColumnLabel = "Provider",
  note,
}: {
  /** Which plan to show for a provider, or null where it sells nothing that fits. */
  pick: (id: EsimProviderId) => EsimPlan | null;
  firstColumnLabel?: string;
  /** Page-specific caption, printed above the two source dates. */
  note?: ReactNode;
}) {
  const rows = esimSpecs.map((spec) => ({ spec, plan: pick(spec.id) }));

  return (
    <div>
      <div className={styles.tableWrap}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                {[firstColumnLabel, "Data", "Valid for", "Price", "Japanese phone number", "Tethering"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ spec, plan }) => (
                <tr key={spec.id}>
                  <td className={styles.tdProvider}>
                    {spec.label}
                    <span className={tools.tdNote}>{getProvider(spec.id).network}</span>
                  </td>
                  <td style={{ fontWeight: 700, color: plan?.unlimited ? "var(--accent)" : "var(--sumi)", whiteSpace: "nowrap" }}>
                    {plan ? (plan.unlimited ? "Unlimited" : `${plan.gb} GB`) : "—"}
                    {plan?.dailyCapGb ? <span className={tools.tdNote}>{plan.dailyCapGb} GB/day cap</span> : null}
                  </td>
                  <td className={styles.tdNetwork} style={{ whiteSpace: "nowrap" }}>
                    {plan ? `${plan.days} ${plan.days === 1 ? "day" : "days"}` : "—"}
                  </td>
                  <td className={styles.tdPrice}>{plan ? formatUsd(plan.priceUsd) : "—"}</td>
                  <td style={{ fontSize: "0.85rem" }}>{spec.phoneNumberShort}</td>
                  <td style={{ fontSize: "0.85rem" }}>{spec.tetheringShort}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className={styles.bodyText} style={{ marginTop: "0.9rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
        {note ? <>{note}{" "}</> : null}
        Data, validity and price are each provider&apos;s own figures, read by our daily
        feed on {pricesCheckedLabel()}. The phone-number and tethering clauses were read off
        the same providers&apos; own pages and help centres on {SPECS_CHECKED_AT}.
      </p>
    </div>
  );
}
