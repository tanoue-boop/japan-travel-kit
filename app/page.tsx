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
      "Stay connected from day one. Compare tourist SIM cards and eSIMs — data, coverage, and instant activation.",
    badge: "Most Popular",
    badgeBg: "bg-crimson-50 text-crimson-500",
    accent: "from-red-500/10 to-rose-500/5",
    border: "hover:border-red-200",
  },
  {
    href: "/wifi-pocket",
    icon: "📶",
    title: "Pocket WiFi",
    description:
      "Rent a portable WiFi router for unlimited data. Great for groups, families, or heavy data users.",
    badge: "Great for Groups",
    badgeBg: "bg-blue-50 text-blue-600",
    accent: "from-blue-500/10 to-indigo-500/5",
    border: "hover:border-blue-200",
  },
  {
    href: "/transportation",
    icon: "🚅",
    title: "Transportation",
    description:
      "JR Pass, IC cards, Shinkansen tickets. Everything you need to travel Japan quickly and affordably.",
    badge: "Save Money",
    badgeBg: "bg-emerald-50 text-emerald-600",
    accent: "from-emerald-500/10 to-teal-500/5",
    border: "hover:border-emerald-200",
  },
  {
    href: "/money",
    icon: "💴",
    title: "Money & Payment",
    description:
      "Best travel cards, ATM tips, and how to handle cash in Japan's largely cash-based economy.",
    badge: "Must Read",
    badgeBg: "bg-amber-50 text-amber-600",
    accent: "from-amber-500/10 to-yellow-500/5",
    border: "hover:border-amber-200",
  },
];

const quickTips = [
  {
    icon: "📱",
    title: "Get a SIM before you land",
    body: "Order an eSIM online and activate it the moment your plane touches down — no airport queues.",
  },
  {
    icon: "💴",
    title: "Always carry cash",
    body: "Japan is still cash-heavy. 7-Eleven and Japan Post ATMs accept foreign Visa/Mastercard.",
  },
  {
    icon: "🚉",
    title: "Load an IC card",
    body: "Suica or Pasmo works on almost every train, bus, and at convenience stores nationwide.",
  },
  {
    icon: "🔌",
    title: "Type A plugs (100V)",
    body: "Same shape as the US. Most devices work without an adapter — just check your device's voltage.",
  },
];

const stats = [
  { value: "4+",    label: "SIM options compared"   },
  { value: "100%",  label: "Independent reviews"     },
  { value: "2025",  label: "Prices verified"         },
  { value: "Free",  label: "No sign-up required"     },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Japan Travel Kit",
    url: "https://japan-travel-kit.com",
    description:
      "Practical travel information for foreign visitors to Japan.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ───── HERO ───── */}
      <section className="relative bg-hero-gradient hero-pattern overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-crimson-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full bg-navy-700/40 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-32 lg:py-36">
          <div className="max-w-3xl">
            {/* Pill label */}
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white/80 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Updated for the 2025 travel season
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6 tracking-tight">
              Everything you need
              <br />
              <span className="text-gradient bg-gradient-to-r from-red-300 to-rose-400 [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                before Japan
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-xl">
              Japan Travel Kit is your no-nonsense guide to connectivity,
              transport, and money — all in plain English, before you land.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/sim-cards" className="btn-primary text-base px-8 py-4">
                Compare SIM Cards →
              </Link>
              <Link href="#categories" className="btn-ghost text-base px-8 py-4">
                Browse Topics
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 48L1440 48L1440 12C1200 44 960 52 720 36C480 20 240 4 0 28L0 48Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* ───── STATS ───── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="shimmer bg-white rounded-2xl shadow-card border border-gray-100 px-5 py-5 text-center"
            >
              <p className="font-display text-3xl font-bold text-navy-800 mb-0.5">{s.value}</p>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── CATEGORIES ───── */}
      <section id="categories" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <p className="section-label">What we cover</p>
          <h2 className="section-title mb-4">What do you need help with?</h2>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
            Practical, unbiased guides on everything every Japan visitor needs to sort out before and after landing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`group relative bg-white rounded-2xl border border-gray-100 p-7 overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 ${cat.border}`}
            >
              {/* Accent gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-gray-50 group-hover:bg-white flex items-center justify-center text-2xl shadow-sm transition-colors duration-300">
                      {cat.icon}
                    </div>
                    <span className={`badge ${cat.badgeBg} font-semibold`}>
                      {cat.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1.5 group-hover:text-navy-800 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="shrink-0 w-8 h-8 rounded-full bg-gray-100 group-hover:bg-crimson-500 flex items-center justify-center text-gray-400 group-hover:text-white transition-all duration-300 mt-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ───── QUICK TIPS ───── */}
      <section className="bg-navy-800 relative overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-12">
            <p className="section-label !text-red-400">Before you go</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Quick tips every visitor should know
            </h2>
            <p className="text-white/50 max-w-md mx-auto">
              Japan has some quirks. Here are the four things to sort before you board the plane.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickTips.map((tip, i) => (
              <div
                key={tip.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors duration-200"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl mb-4">
                  {tip.icon}
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm leading-snug">
                  {tip.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {tip.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TRUST BANNER ───── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-cream border border-amber-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="text-5xl shrink-0">🇯🇵</div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-800 mb-2">
              Independent. Honest. Up-to-date.
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-xl">
              We research and test every product we recommend. Our reviews are never sponsored —
              we only earn a small affiliate commission if you buy through our links, at no extra cost to you.
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-2 text-sm text-gray-500">
            {["No paid placements", "Verified prices", "Updated monthly"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">✓</span>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative bg-hero-gradient rounded-3xl overflow-hidden p-10 md:p-14 text-center hero-pattern">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-crimson-500/20 blur-3xl pointer-events-none" />
          <div className="relative">
            <p className="text-red-300 text-xs font-bold uppercase tracking-widest mb-3">Start here</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Ready to plan your Japan trip?
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto leading-relaxed">
              Start with connectivity — the most important thing to sort before you land.
            </p>
            <Link href="/sim-cards" className="btn-primary text-base px-9 py-4 inline-flex">
              Find the Best Japan SIM Card →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
