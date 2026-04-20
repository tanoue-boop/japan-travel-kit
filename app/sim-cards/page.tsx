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
    a: "Most data-only tourist SIMs don't include voice calls. IIJmio and Sakura Mobile offer voice-enabled plans. For international calls, WhatsApp and LINE work over data.",
  },
  {
    q: "When should I buy my Japan SIM card?",
    a: "Buy an eSIM before you leave home — activate it the moment your plane lands. Physical SIMs can be picked up at the airport on arrival, but popular options sometimes sell out.",
  },
];

const badgeColorMap: Record<string, string> = {
  "bg-blue-500":   "badge--blue",
  "bg-green-500":  "badge--green",
  "bg-orange-500": "badge--orange",
};

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

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="breadcrumb__inner">
          <Link href="/" className="breadcrumb__link">Home</Link>
          <svg className="breadcrumb__sep" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="breadcrumb__current">SIM Cards</span>
        </div>
      </div>

      {/* Page header */}
      <section className="page-header">
        <div className="page-header__inner">
          <p className="page-header__updated">
            <span>📱</span> Updated April 2025
          </p>
          <h1 className="page-header__title">
            Best Japan SIM Cards<br />&amp; eSIMs for Tourists
          </h1>
          <p className="page-header__desc">
            We compared {simCards.length} popular tourist SIM options on price,
            coverage, and ease of use. Here&apos;s our honest recommendation for
            each type of traveler.
          </p>
          <div className="page-header__badges">
            {["Independently reviewed", "Prices verified", "No paid placements"].map((t) => (
              <span key={t} className="page-header__badge">
                <span className="page-header__badge-check">✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="page-content">
        {/* Affiliate disclosure */}
        <div className="disclosure">
          <span className="disclosure__icon">ℹ️</span>
          <p className="disclosure__text">
            <strong>Affiliate disclosure:</strong> Some links below are affiliate
            links. We may earn a small commission if you buy through them, at no
            extra cost to you. This doesn&apos;t affect our rankings or reviews.
          </p>
        </div>

        {/* Quick nav */}
        <div className="quick-nav">
          <p className="quick-nav__label">Jump to:</p>
          <div className="quick-nav__grid">
            {simCards.map((sim) => (
              <a key={sim.id} href={`#${sim.id}`} className="quick-nav__item">
                <span className="quick-nav__arrow">→</span>
                <span>{sim.name}</span>
                {sim.badge && (
                  <span className="quick-nav__badge-text">{sim.badge}</span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* SIM cards */}
        <div className="sim-list">
          {simCards.map((sim) => (
            <div key={sim.id} id={sim.id}>
              <SIMCardCard sim={sim} />
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <section className="comparison">
          <div className="comparison__head">
            <span className="section-label">At a glance</span>
            <h2 className="section-title">Quick Comparison</h2>
          </div>
          <div className="comparison__wrap">
            <div className="comparison__scroll">
              <table className="comparison__table">
                <thead>
                  <tr>
                    {["Provider", "From", "Network", "eSIM", "Voice", "Rating"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {simCards.map((sim) => {
                    const cheapest = sim.plans.reduce((a, b) => (a.price < b.price ? a : b));
                    const badgeCls = sim.badgeColor ? (badgeColorMap[sim.badgeColor] ?? "badge--blue") : "";
                    return (
                      <tr key={sim.id}>
                        <td>
                          <a href={`#${sim.id}`} className="comparison__td-name">
                            {sim.name}
                          </a>
                          {sim.badge && (
                            <span className={`badge ${badgeCls}`} style={{ marginLeft: "0.4rem" }}>
                              {sim.badge}
                            </span>
                          )}
                        </td>
                        <td className="comparison__td-price">${cheapest.price.toFixed(2)}</td>
                        <td style={{ fontSize: "0.78rem" }}>{sim.coverage.split("(")[0].trim()}</td>
                        <td>{sim.esim ? <span className="check-yes">✓</span> : <span className="check-no">✗</span>}</td>
                        <td>{sim.voiceCall ? <span className="check-yes">✓</span> : <span className="check-no">✗</span>}</td>
                        <td>
                          <span className="comparison__td-rating">
                            <span style={{ color: "#fbbf24" }}>★</span>
                            {sim.rating}
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

        {/* FAQ */}
        <section className="faq">
          <div className="faq__head">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Common Questions</h2>
          </div>
          <div className="faq__list">
            {faqItems.map((item, i) => (
              <details key={item.q} className="faq__item">
                <summary className="faq__summary">
                  <span>{i + 1}. {item.q}</span>
                  <svg className="faq__chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="faq__body">{item.a}</div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
