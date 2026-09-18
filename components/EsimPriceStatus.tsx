import { esimProviders, formatDate } from "../lib/esim-prices";
import tools from "../styles/Tools.module.css";

/** Per-provider "when did we last verify this" strip. */
export default function EsimPriceStatus() {
  return (
    <div className={tools.statusGrid}>
      {esimProviders.map((p) => (
        <div key={p.id} className={tools.statusCard}>
          <p className={tools.statusName}>{p.name}</p>
          <p className={tools.statusLine}>
            <strong>Prices checked:</strong> {formatDate(p.fetchedAt)}
          </p>
          <p className={tools.statusLine}>
            <strong>Last price change:</strong> {formatDate(p.updatedAt)}
          </p>
          <p className={tools.statusLine}>
            {p.plans.length} plans ·{" "}
            <a href={p.sourceUrl} className={tools.statusLink} target="_blank" rel="noopener noreferrer nofollow">
              source
            </a>
          </p>
        </div>
      ))}
    </div>
  );
}
