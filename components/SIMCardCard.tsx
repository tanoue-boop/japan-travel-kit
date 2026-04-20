import type { SIMCard } from "@/lib/sim-cards";
import StarRating from "./StarRating";

function FeaturePill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
        ok
          ? "bg-emerald-50 text-emerald-700"
          : "bg-gray-50 text-gray-400 line-through"
      }`}
    >
      {ok ? "✓" : "✗"} {label}
    </span>
  );
}

export default function SIMCardCard({ sim }: { sim: SIMCard }) {
  const cheapestPlan = sim.plans.reduce((a, b) => (a.price < b.price ? a : b));

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* ── Header ── */}
      <div className="p-7 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {sim.badge && (
                <span className={`badge ${sim.badgeColor} font-semibold text-white text-xs`}>
                  {sim.badge}
                </span>
              )}
            </div>
            <h3 className="font-bold text-xl text-navy-800 mb-1 leading-snug">
              {sim.name}
            </h3>
            <StarRating rating={sim.rating} reviewCount={sim.reviewCount} />
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              {sim.summary}
            </p>
          </div>

          {/* Price */}
          <div className="shrink-0 text-right bg-gray-50 rounded-xl px-4 py-3">
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">From</p>
            <p className="font-display text-3xl font-bold text-navy-800 leading-none">
              ${cheapestPlan.price.toFixed(0)}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">USD</p>
          </div>
        </div>
      </div>

      {/* ── Feature pills ── */}
      <div className="px-7 pb-5 flex flex-wrap gap-2">
        <FeaturePill ok={sim.voiceCall}    label="Voice calls"  />
        <FeaturePill ok={sim.smsIncluded}  label="SMS"          />
        <FeaturePill ok={sim.esim}         label="eSIM"         />
        <FeaturePill ok={sim.physicalSim}  label="Physical SIM" />
      </div>

      {/* ── Specs ── */}
      <div className="mx-7 mb-5 bg-gray-50 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <div>
          <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Network</p>
          <p className="text-gray-700 font-medium text-xs leading-snug">{sim.coverage}</p>
        </div>
        <div>
          <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Speed</p>
          <p className="text-gray-700 font-medium text-xs">{sim.speed}</p>
        </div>
        <div>
          <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Support</p>
          <p className="text-gray-700 font-medium text-xs leading-snug">{sim.support}</p>
        </div>
      </div>

      {/* ── Plans ── */}
      <div className="px-7 mb-5">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          Available Plans
        </p>
        <div className="space-y-2">
          {sim.plans.map((plan, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-gray-50 hover:bg-crimson-50 rounded-xl px-4 py-3 transition-colors duration-150"
            >
              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-navy-800">{plan.data}</span>
                <span className="text-xs text-gray-400">/ {plan.duration}</span>
              </div>
              <span className="font-bold text-crimson-500 text-sm">
                ${plan.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pros / Cons ── */}
      <div className="px-7 mb-6 grid sm:grid-cols-2 gap-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 mb-2.5">
            ✓ Pros
          </p>
          <ul className="space-y-1.5">
            {sim.pros.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-emerald-400 mt-0.5 shrink-0 font-bold">+</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-crimson-500 mb-2.5">
            ✗ Cons
          </p>
          <ul className="space-y-1.5">
            {sim.cons.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-crimson-400 mt-0.5 shrink-0 font-bold">−</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="px-7 pb-7">
        <a
          href={sim.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="btn-primary w-full justify-center py-4 text-base rounded-xl"
        >
          Get {sim.provider}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </article>
  );
}
