import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Japan Travel Kit — Practical Travel Info for Foreign Visitors",
  description:
    "Compare Japan SIM cards, pocket WiFi, IC cards, and get practical travel tips for your trip to Japan. Updated 2025.",
};

const categories = [
  {
    href: "/sim-cards",
    icon: "📱",
    title: "SIM Cards & eSIM",
    description:
      "Stay connected in Japan. Compare the best tourist SIM cards and eSIMs for data, calls, and coverage.",
    badge: "Most Popular",
    badgeColor: "bg-red-100 text-red-700",
  },
  {
    href: "/wifi-pocket",
    icon: "📶",
    title: "Pocket WiFi",
    description:
      "Rent a portable WiFi router for unlimited data sharing across your group or family.",
    badge: "Great for Groups",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    href: "/transportation",
    icon: "🚅",
    title: "Transportation",
    description:
      "JR Pass, IC cards, Shinkansen tickets — everything you need to get around Japan.",
    badge: "Save Money",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    href: "/money",
    icon: "💴",
    title: "Money & Payment",
    description:
      "Best travel cards, ATM tips, and how to handle cash in Japan's largely cash-based economy.",
    badge: "Must Read",
    badgeColor: "bg-amber-100 text-amber-700",
  },
];

const quickTips = [
  {
    icon: "📱",
    title: "Get a SIM before you land",
    body: "Order an eSIM online and activate it the moment your plane touches down. No waiting in queues.",
  },
  {
    icon: "💴",
    title: "Carry cash",
    body: "Japan is still very cash-heavy. Convenience store ATMs (7-Eleven, Japan Post) accept foreign cards.",
  },
  {
    icon: "🚉",
    title: "Load an IC card",
    body: "Suica or Pasmo works on almost all trains and buses, and at many convenience stores and vending machines.",
  },
  {
    icon: "🔌",
    title: "Japan uses Type A plugs",
    body: "Same as the US (100V / 50-60Hz). Most devices from any country will work fine.",
  },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Japan Travel Kit",
    url: "https://japan-travel-kit.com",
    description:
      "Practical travel information for foreign visitors to Japan. Compare SIM cards, transportation, and more.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://japan-travel-kit.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
              <span>🇯🇵</span>
              <span>Updated for 2025 travel season</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
              Everything you need{" "}
              <span className="text-red-400">before landing in Japan</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Japan Travel Kit is your one-stop resource for practical travel
              info. Compare SIM cards, plan transport, and avoid tourist traps —
              all in plain English.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/sim-cards" className="btn-primary">
                Compare SIM Cards →
              </Link>
              <Link
                href="#categories"
                className="btn-secondary !border-white/30 !text-white hover:!bg-white/10"
              >
                Browse All Topics
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-japan-red text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap justify-center md:justify-between gap-4 text-sm text-center">
            {[
              { value: "4+", label: "SIM options compared" },
              { value: "100%", label: "Independently reviewed" },
              { value: "2025", label: "Prices updated" },
              { value: "Free", label: "No sign-up needed" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="font-bold text-base">{stat.value}</span>
                <span className="text-red-200">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            What do you need help with?
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Practical, unbiased guides on the essentials every Japan visitor
            needs to sort out.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="card p-6 hover:shadow-md hover:border-slate-200 transition-all duration-200 group"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{cat.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900 group-hover:text-japan-red transition-colors">
                      {cat.title}
                    </h3>
                    <span
                      className={`badge ${cat.badgeColor} !text-xs px-2 py-0.5`}
                    >
                      {cat.badge}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <span className="text-slate-300 group-hover:text-japan-red transition-colors text-lg">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Tips */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Quick tips before you go
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickTips.map((tip) => (
              <div key={tip.title} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <span className="text-2xl mb-3 block">{tip.icon}</span>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">
                  {tip.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {tip.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-10 border border-red-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Ready to plan your Japan trip?
          </h2>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">
            Start with connectivity — the most important thing to sort before
            you land.
          </p>
          <Link href="/sim-cards" className="btn-primary text-base px-8 py-3.5">
            Find the Best Japan SIM Card →
          </Link>
        </div>
      </section>
    </>
  );
}
