import type { SIMCard } from "@/lib/sim-cards";
import StarRating from "./StarRating";

function Check({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="text-green-500 font-bold">✓</span>
  ) : (
    <span className="text-slate-300">✗</span>
  );
}

export default function SIMCardCard({ sim }: { sim: SIMCard }) {
  const cheapestPlan = sim.plans.reduce((a, b) =>
    a.price < b.price ? a : b,
  );

  return (
    <article className="card overflow-visible">
      {/* Card header */}
      <div className="p-6 pb-4 border-b border-slate-100">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-lg font-bold text-slate-900">{sim.name}</h3>
              {sim.badge && (
                <span className={`badge ${sim.badgeColor} text-xs`}>
                  {sim.badge}
                </span>
              )}
            </div>
            <StarRating rating={sim.rating} reviewCount={sim.reviewCount} />
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              {sim.summary}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-slate-400 mb-0.5">from</p>
            <p className="text-2xl font-extrabold text-slate-900">
              ${cheapestPlan.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Specs grid */}
      <div className="p-6 pb-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-sm border-b border-slate-100">
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wide mb-0.5">
            Network
          </p>
          <p className="font-medium text-slate-700 text-xs">{sim.coverage}</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wide mb-0.5">
            Speed
          </p>
          <p className="font-medium text-slate-700 text-xs">{sim.speed}</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wide mb-0.5">
            Support
          </p>
          <p className="font-medium text-slate-700 text-xs">{sim.support}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            <Check ok={sim.voiceCall} /> Voice calls
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            <Check ok={sim.esim} /> eSIM
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            <Check ok={sim.physicalSim} /> Physical SIM
          </span>
        </div>
      </div>

      {/* Plans */}
      <div className="p-6 pb-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
          Available Plans
        </p>
        <div className="grid gap-2">
          {sim.plans.map((plan, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-sm bg-slate-50 rounded-lg px-4 py-2.5"
            >
              <span className="text-slate-600">
                {plan.data} / {plan.duration}
              </span>
              <span className="font-bold text-slate-900">
                ${plan.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pros / Cons */}
      <div className="px-6 pb-5 grid sm:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">
            Pros
          </p>
          <ul className="space-y-1">
            {sim.pros.map((p) => (
              <li key={p} className="text-slate-600 flex gap-1.5">
                <span className="text-green-500 mt-0.5 shrink-0">+</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">
            Cons
          </p>
          <ul className="space-y-1">
            {sim.cons.map((c) => (
              <li key={c} className="text-slate-600 flex gap-1.5">
                <span className="text-red-400 mt-0.5 shrink-0">−</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6">
        <a
          href={sim.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="btn-primary w-full justify-center py-3 text-base"
        >
          Get {sim.provider} →
        </a>
      </div>
    </article>
  );
}
