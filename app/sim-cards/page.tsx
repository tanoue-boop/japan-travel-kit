import type { Metadata } from "next";
import { simCards } from "@/lib/sim-cards";
import SIMCardCard from "@/components/SIMCardCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Japan SIM Cards 2025 — Compare Tourist SIM & eSIM",
  description:
    "Compare the best Japan tourist SIM cards and eSIMs for 2025. Airalo, IIJmio, Klook, Sakura Mobile — prices, coverage, and honest reviews.",
  openGraph: {
    title: "Best Japan SIM Cards 2025 — Compare Tourist SIM & eSIM",
    description:
      "Compare the best Japan tourist SIM cards and eSIMs for 2025. Honest reviews with prices and coverage details.",
    url: "https://japan-travel-kit.com/sim-cards",
  },
  alternates: {
    canonical: "https://japan-travel-kit.com/sim-cards",
  },
};

const faqItems = [
  {
    q: "Do I need a Japan SIM card or can I use my home carrier?",
    a: "International roaming is usually very expensive ($10–15/day). A tourist SIM or eSIM is far cheaper — typically $10–30 for 2–4 weeks of data.",
  },
  {
    q: "What's the difference between a SIM card and an eSIM?",
    a: "A physical SIM is a tiny card you insert into your phone. An eSIM is digital — scan a QR code and it activates instantly. Most modern phones (iPhone XS+, recent Android) support eSIM.",
  },
  {
    q: "Which network has the best coverage in Japan?",
    a: "Docomo has the most extensive rural coverage. SoftBank and au are excellent in cities. For most tourist routes (Tokyo, Kyoto, Osaka, Hiroshima), any major carrier works well.",
  },
  {
    q: "Can I make phone calls with a tourist SIM?",
    a: "Most data-only tourist SIMs don't include voice calls. IIJmio and Sakura Mobile offer voice-enabled plans. For international calls, apps like WhatsApp and LINE work over data.",
  },
  {
    q: "When should I buy my Japan SIM card?",
    a: "Buy an eSIM before you leave home — activate it the moment your plane lands. Physical SIMs can be picked up at the airport on arrival, but popular options sometimes sell out.",
  },
];

export default function SIMCardsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Japan SIM Cards 2025",
    numberOfItems: simCards.length,
    itemListElement: simCards.map((sim, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: sim.name,
      url: `https://japan-travel-kit.com/sim-cards#${sim.id}`,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-crimson-500 transition-colors">Home</Link>
          <svg className="w-3 h-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <span className="text-gray-800 font-medium">SIM Cards</span>
        </div>
      </div>

      {/* ── Page Header ── */}
      <section className="bg-gradient-to-b from-navy-800 to-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-18">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
              <span>📱</span>
              <span>Updated April 2025</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Best Japan SIM Cards<br />& eSIMs for Tourists
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-xl">
              We compared {simCards.length} popular tourist SIM options on price, coverage, and ease of use. Here&apos;s our honest recommendation for each type of traveler.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Independently reviewed", "Prices verified", "No paid placements"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 bg-white/10 text-white/70 rounded-full px-3 py-1.5 text-xs font-medium">
                  <span className="text-emerald-400">✓</span> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* ── Affiliate disclosure ── */}
        <div className="flex gap-3 items-start bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-8">
          <span className="text-xl shrink-0 mt-0.5">ℹ️</span>
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong className="font-semibold">Affiliate disclosure:</strong>{" "}
            Some links below are affiliate links. We may earn a small commission if you buy through them, at no extra cost to you. This doesn&apos;t affect our rankings or reviews.
          </p>
        </div>

        {/* ── Quick nav ── */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-10 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Jump to:</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {simCards.map((sim) => (
              <a
                key={sim.id}
                href={`#${sim.id}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-crimson-50 hover:text-crimson-500 transition-colors group"
              >
                <span className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-crimson-500 group-hover:text-white flex items-center justify-center text-xs font-bold transition-all duration-200">→</span>
                <span>{sim.name}</span>
                {sim.badge && (
                  <span className="ml-auto text-xs text-gray-400 font-normal">{sim.badge}</span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* ── SIM Cards ── */}
        <div className="space-y-7">
          {simCards.map((sim) => (
            <div key={sim.id} id={sim.id}>
              <SIMCardCard sim={sim} />
            </div>
          ))}
        </div>

        {/* ── Comparison table ── */}
        <section className="mt-16">
          <div className="mb-6">
            <p className="section-label">At a glance</p>
            <h2 className="section-title">Quick Comparison</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy-800 text-white">
                    {["Provider", "From", "Network", "eSIM", "Voice", "Rating"].map((h) => (
                      <th key={h} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {simCards.map((sim) => {
                    const cheapest = sim.plans.reduce((a, b) => (a.price < b.price ? a : b));
                    return (
                      <tr key={sim.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4">
                          <a href={`#${sim.id}`} className="font-semibold text-navy-800 hover:text-crimson-500 transition-colors">
                            {sim.name}
                          </a>
                          {sim.badge && (
                            <span className={`ml-2 badge ${sim.badgeColor} text-white text-xs`}>{sim.badge}</span>
                          )}
                        </td>
                        <td className="px-5 py-4 font-bold text-crimson-500">
                          ${cheapest.price.toFixed(2)}
                        </td>
                        <td className="px-5 py-4 text-gray-500 text-xs max-w-[140px]">
                          {sim.coverage.split("(")[0].trim()}
                        </td>
                        <td className="px-5 py-4">
                          {sim.esim
                            ? <span className="text-emerald-500 font-bold text-base">✓</span>
                            : <span className="text-gray-200 text-base">✗</span>}
                        </td>
                        <td className="px-5 py-4">
                          {sim.voiceCall
                            ? <span className="text-emerald-500 font-bold text-base">✓</span>
                            : <span className="text-gray-200 text-base">✗</span>}
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1">
                            <span className="text-amber-400 text-xs">★</span>
                            <span className="font-bold text-gray-800">{sim.rating}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mt-16">
          <div className="mb-8">
            <p className="section-label">FAQ</p>
            <h2 className="section-title">Common Questions</h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <details
                key={item.q}
                className="group bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-semibold text-gray-900 hover:text-crimson-500 transition-colors">
                  <span>{i + 1}. {item.q}</span>
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
