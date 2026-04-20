import type { SIMCard } from "../lib/sim-cards";
import StarRating from "./StarRating";
import styles from "../styles/SIMCardCard.module.css";

const badgeColorMap: Record<string, string> = {
  "bg-blue-500":   styles.badgeBlue,
  "bg-green-500":  styles.badgeGreen,
  "bg-orange-500": styles.badgeOrange,
};

function Pill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={ok ? styles.pillYes : styles.pillNo}>
      {ok ? "✓" : "✗"} {label}
    </span>
  );
}

export default function SIMCardCard({ sim }: { sim: SIMCard }) {
  const cheapest = sim.plans.reduce((a, b) => (a.price < b.price ? a : b));
  const badgeCls = sim.badgeColor ? (badgeColorMap[sim.badgeColor] ?? styles.badgeBlue) : "";

  return (
    <article className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.nameBlock}>
          {sim.badge && (
            <div className={styles.badgeRow}>
              <span className={`${styles.badge} ${badgeCls}`}>{sim.badge}</span>
            </div>
          )}
          <h3 className={styles.name}>{sim.name}</h3>
          <StarRating rating={sim.rating} reviewCount={sim.reviewCount} />
          <p className={styles.summary}>{sim.summary}</p>
        </div>
        <div className={styles.priceBlock}>
          <p className={styles.priceFrom}>From</p>
          <p className={styles.price}>${cheapest.price.toFixed(0)}</p>
          <p className={styles.priceCurrency}>USD</p>
        </div>
      </div>

      {/* Feature pills */}
      <div className={styles.pills}>
        <Pill ok={sim.voiceCall}   label="Voice calls"  />
        <Pill ok={sim.smsIncluded} label="SMS"          />
        <Pill ok={sim.esim}        label="eSIM"         />
        <Pill ok={sim.physicalSim} label="Physical SIM" />
      </div>

      {/* Specs */}
      <div className={styles.specs}>
        <div>
          <p className={styles.specLabel}>Network</p>
          <p className={styles.specValue}>{sim.coverage}</p>
        </div>
        <div>
          <p className={styles.specLabel}>Speed</p>
          <p className={styles.specValue}>{sim.speed}</p>
        </div>
        <div>
          <p className={styles.specLabel}>Support</p>
          <p className={styles.specValue}>{sim.support}</p>
        </div>
      </div>

      {/* Plans */}
      <div className={styles.plans}>
        <p className={styles.plansLabel}>Available Plans</p>
        {sim.plans.map((plan, i) => (
          <div key={i} className={styles.planRow}>
            <div className={styles.planLeft}>
              <span className={styles.planData}>{plan.data}</span>
              <span className={styles.planDur}>/ {plan.duration}</span>
            </div>
            <span className={styles.planPrice}>${plan.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Pros / Cons */}
      <div className={styles.proscons}>
        <div>
          <p className={`${styles.pcLabel} ${styles.prosLabel}`}>✓ Pros</p>
          <ul className={styles.pcList}>
            {sim.pros.map((p) => (
              <li key={p} className={styles.pcItem}>
                <span className={styles.iconPro}>+</span>{p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={`${styles.pcLabel} ${styles.consLabel}`}>✗ Cons</p>
          <ul className={styles.pcList}>
            {sim.cons.map((c) => (
              <li key={c} className={styles.pcItem}>
                <span className={styles.iconCon}>−</span>{c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <a
          href={sim.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={styles.ctaBtn}
        >
          Get {sim.provider}
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </article>
  );
}
