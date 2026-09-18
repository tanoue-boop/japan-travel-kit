import Link from "next/link";
import type { SIMCard } from "../lib/sim-cards";
import { cheapestPlan, formatDate, formatUsd, getProvider, plansFor } from "../lib/esim-prices";
import StarRating from "./StarRating";
import styles from "../styles/SIMCardCard.module.css";

// Plans, prices, network and the affiliate link all come from data/esim-prices.json.
const PLAN_LIMIT = 6;

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
  const provider = getProvider(sim.esimId);
  const cheapest = cheapestPlan(sim.esimId);
  const plans = plansFor(sim.esimId);
  const shownPlans = plans.slice(0, PLAN_LIMIT);
  const affiliateUrl = provider.affiliateUrl;
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
          <StarRating rating={sim.rating} />
          <p className={styles.summary}>{sim.summary}</p>
        </div>
        <div className={styles.priceBlock}>
          <p className={styles.priceFrom}>From</p>
          <p className={styles.price}>{cheapest ? formatUsd(cheapest.priceUsd) : "—"}</p>
          <p className={styles.priceCurrency}>USD · checked {formatDate(provider.fetchedAt)}</p>
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
          <p className={styles.specValue}>{provider.network}</p>
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
        <p className={styles.plansLabel}>
          Available Plans{plans.length > PLAN_LIMIT ? ` (${PLAN_LIMIT} cheapest of ${plans.length})` : ""}
        </p>
        {shownPlans.map((plan) => (
          <div key={plan.id} className={styles.planRow}>
            <div className={styles.planLeft}>
              <span className={styles.planData}>{plan.unlimited ? "Unlimited" : `${plan.gb} GB`}</span>
              <span className={styles.planDur}>/ {plan.days} {plan.days === 1 ? "day" : "days"}</span>
            </div>
            <span className={styles.planPrice}>{formatUsd(plan.priceUsd)}</span>
          </div>
        ))}
        <Link href="/guides/esim/japan-esim-data-plans" className={styles.planDur} style={{ display: "inline-block", marginTop: "0.5rem", fontWeight: 600, color: "#c62828" }}>
          See all {plans.length} {provider.name} plans, sorted by price per GB →
        </Link>
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
        {affiliateUrl === "#" ? (
          <Link href="/guides/esim/holafly-japan-review" className={styles.ctaBtn}>
            Read our {sim.provider} review
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        ) : (
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={styles.ctaBtn}
          >
            Get {sim.provider}
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}
