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
    a: "International roaming with your home carrier is usually very expensive ($10–15/day). A tourist SIM or eSIM is far cheaper — typically $10–30 for 2–4 weeks of data.",
  },
  {
    q: "What's the difference between a SIM card and an eSIM?",
    a: "A physical SIM is a tiny card you insert into your phone. An eSIM is digital — you scan a QR code and it's activated instantly, no card needed. Most modern phones (iPhone XS+, recent Android) support eSIM.",
  },
  {
    q: "Which network has the best coverage in Japan?",
    a: "Docomo has the most extensive rural coverage. SoftBank and au are excellent in cities. For most tourist routes (Tokyo, Kyoto, Osaka, Hiroshima), any major carrier will work well.",
  },
  {
    q: "Can I make phone calls with a tourist SIM?",
    a: "Most data-only tourist SIMs don't include voice calls. If you need to call local numbers, IIJmio and Sakura Mobile offer voice-enabled plans. For international calls, apps like WhatsApp and LINE work over data.",
  },
  {
    q: "When should I buy my Japan SIM card?",
    a: "Buy an eSIM before you leave home — you can activate it the moment your plane lands. Physical SIMs can be picked up at the airport on arrival, but popular options sometimes sell out.",
  },
];

export default function SIMCardsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Japan SIM Cards 2025",
    description: "Comparison of the best tourist SIM cards for Japan",
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
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-sm text-slate-500">
          <Link href="/" className="hover:text-japan-red">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 font-medium">SIM Cards</span>
        </div>
      </div>

      {/* Page header */}
      <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-sm text-red-600 font-medium mb-3">
              <span>📱</span>
              <span>Last updated: April 2025</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
              Best Japan SIM Cards & eSIMs for Tourists (2025)
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-5">
              We compared {simCards.length} popular tourist SIM options on
              price, coverage, and ease of use. Here&apos;s what we recommend
              for each type of traveler.
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <span className="text-green-500">✓</span> Independently
                reviewed
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-500">✓</span> Prices verified
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-500">✓</span> Affiliate disclosure
                below
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Affiliate disclosure */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-5 py-3 mb-8 text-sm text-amber-800 flex gap-2">
          <span className="shrink-0">ℹ️</span>
          <p>
            <strong>Affiliate disclosure:</strong> Some links on this page are
            affiliate links. We may earn a small commission if you purchase
            through them, at no extra cost to you. This doesn&apos;t affect our
            rankings or reviews.
          </p>
        </div>

        {/* Quick nav */}
        <div className="card p-5 mb-8">
          <p className="text-sm font-semibold text-slate-700 mb-3">
            Quick picks:
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {simCards.map((sim) => (
              <a
                key={sim.id}
                href={`#${sim.id}`}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-japan-red transition-colors"
              >
                <span className="text-japan-red">→</span>
                <span className="font-medium">{sim.name}</span>
                {sim.badge && (
                  <span className="text-xs text-slate-400">({sim.badge})</span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* SIM Cards */}
        <div className="space-y-6">
          {simCards.map((sim) => (
            <div key={sim.id} id={sim.id}>
              <SIMCardCard sim={sim} />
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Quick Comparison Table
          </h2>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {[
                    "Provider",
                    "From",
                    "Network",
                    "eSIM",
                    "Voice",
                    "Rating",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {simCards.map((sim) => {
                  const cheapest = sim.plans.reduce((a, b) =>
                    a.price < b.price ? a : b,
                  );
                  return (
                    <tr key={sim.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        <a
                          href={`#${sim.id}`}
                          className="hover:text-japan-red transition-colors"
                        >
                          {sim.name}
                        </a>
                        {sim.badge && (
                          <span
                            className={`ml-2 badge ${sim.badgeColor} text-xs`}
                          >
                            {sim.badge}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900">
                        ${cheapest.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-slate-600 text-xs max-w-[140px]">
                        {sim.coverage.split("(")[0].trim()}
                      </td>
                      <td className="px-4 py-3">
                        {sim.esim ? (
                          <span className="text-green-500 font-bold">✓</span>
                        ) : (
                          <span className="text-slate-300">✗</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {sim.voiceCall ? (
                          <span className="text-green-500 font-bold">✓</span>
                        ) : (
                          <span className="text-slate-300">✗</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {sim.rating} / 5
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.q} className="card p-6">
                <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
