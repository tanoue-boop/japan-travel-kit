import type { SIMCard } from "@/lib/sim-cards";
import StarRating from "./StarRating";

const badgeClass: Record<string, string> = {
  "bg-blue-500":   "badge--blue",
  "bg-green-500":  "badge--green",
  "bg-orange-500": "badge--orange",
};

function FeaturePill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={`feature-pill ${ok ? "feature-pill--yes" : "feature-pill--no"}`}>
      {ok ? "✓" : "✗"} {label}
    </span>
  );
}

export default function SIMCardCard({ sim }: { sim: SIMCard }) {
  const cheapest = sim.plans.reduce((a, b) => (a.price < b.price ? a : b));
  const badgeCls = sim.badgeColor ? (badgeClass[sim.badgeColor] ?? "badge--blue") : "";

  return (
    <article className="sim-card">
      {/* Header */}
      <div className="sim-card__header">
        <div className="sim-card__name-block">
          {sim.badge && (
            <div className="sim-card__badge-row">
              <span className={`badge ${badgeCls}`}>{sim.badge}</span>
            </div>
          )}
          <h3 className="sim-card__name">{sim.name}</h3>
          <StarRating rating={sim.rating} reviewCount={sim.reviewCount} />
          <p className="sim-card__summary">{sim.summary}</p>
        </div>

        <div className="sim-card__price-block">
          <p className="sim-card__price-from">From</p>
          <p className="sim-card__price">${cheapest.price.toFixed(0)}</p>
          <p className="sim-card__price-currency">USD</p>
        </div>
      </div>

      {/* Feature pills */}
      <div className="sim-card__pills">
        <FeaturePill ok={sim.voiceCall}   label="Voice calls"  />
        <FeaturePill ok={sim.smsIncluded} label="SMS"          />
        <FeaturePill ok={sim.esim}        label="eSIM"         />
        <FeaturePill ok={sim.physicalSim} label="Physical SIM" />
      </div>

      {/* Specs */}
      <div className="sim-card__specs">
        <div className="spec-item">
          <p className="spec-item__label">Network</p>
          <p className="spec-item__value">{sim.coverage}</p>
        </div>
        <div className="spec-item">
          <p className="spec-item__label">Speed</p>
          <p className="spec-item__value">{sim.speed}</p>
        </div>
        <div className="spec-item">
          <p className="spec-item__label">Support</p>
          <p className="spec-item__value">{sim.support}</p>
        </div>
      </div>

      {/* Plans */}
      <div className="sim-card__plans">
        <p className="plans-label">Available Plans</p>
        {sim.plans.map((plan, i) => (
          <div key={i} className="plan-row">
            <div className="plan-row__left">
              <span className="plan-row__data">{plan.data}</span>
              <span className="plan-row__duration">/ {plan.duration}</span>
            </div>
            <span className="plan-row__price">${plan.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Pros / Cons */}
      <div className="sim-card__pros-cons">
        <div>
          <p className="pros-cons__label pros-cons__label--pros">✓ Pros</p>
          <ul className="pros-cons__list">
            {sim.pros.map((p) => (
              <li key={p} className="pros-cons__item">
                <span className="pros-cons__item-icon pros-cons__item-icon--pro">+</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="pros-cons__label pros-cons__label--cons">✗ Cons</p>
          <ul className="pros-cons__list">
            {sim.cons.map((c) => (
              <li key={c} className="pros-cons__item">
                <span className="pros-cons__item-icon pros-cons__item-icon--con">−</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="sim-card__cta">
        <a
          href={sim.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="sim-card__cta-btn"
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
