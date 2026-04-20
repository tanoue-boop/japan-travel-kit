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
    badgeCls: "badge--soft-red",
  },
  {
    href: "/wifi-pocket",
    icon: "📶",
    title: "Pocket WiFi",
    description:
      "Rent a portable WiFi router for unlimited data. Great for groups, families, or heavy data users.",
    badge: "Great for Groups",
    badgeCls: "badge--soft-blue",
  },
  {
    href: "/transportation",
    icon: "🚅",
    title: "Transportation",
    description:
      "JR Pass, IC cards, Shinkansen tickets. Everything you need to travel Japan quickly and affordably.",
    badge: "Save Money",
    badgeCls: "badge--soft-green",
  },
  {
    href: "/money",
    icon: "💴",
    title: "Money & Payment",
    description:
      "Best travel cards, ATM tips, and how to handle cash in Japan&apos;s largely cash-based economy.",
    badge: "Must Read",
    badgeCls: "badge--soft-amber",
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
    body: "Same shape as the US. Most devices work without an adapter — just check your voltage.",
  },
];

const stats = [
  { value: "4+",   label: "SIM options compared" },
  { value: "100%", label: "Independent reviews"   },
  { value: "2025", label: "Prices verified"        },
  { value: "Free", label: "No sign-up required"    },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Japan Travel Kit",
    url: "https://japan-travel-kit.com",
    description: "Practical travel information for foreign visitors to Japan.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />

        <div className="hero__inner">
          <div className="hero__pill">
            <span className="hero__pill-dot" />
            Updated for the 2025 travel season
          </div>

          <h1 className="hero__title">
            Everything you need
            <br />
            <span className="hero__title-accent">before Japan</span>
          </h1>

          <p className="hero__desc">
            Japan Travel Kit is your no-nonsense guide to connectivity,
            transport, and money — all in plain English, before you land.
          </p>

          <div className="hero__actions">
            <Link href="/sim-cards" className="btn-primary">
              Compare SIM Cards →
            </Link>
            <Link href="#categories" className="btn-ghost">
              Browse Topics
            </Link>
          </div>
        </div>

        <div className="hero__wave">
          <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ height: "48px" }}>
            <path d="M0 48L1440 48L1440 12C1200 44 960 52 720 36C480 20 240 4 0 28L0 48Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <p className="stat-card__value">{s.value}</p>
              <p className="stat-card__label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="categories-section">
        <div className="categories-section__head">
          <span className="section-label">What we cover</span>
          <h2 className="section-title">What do you need help with?</h2>
          <p className="desc">
            Practical, unbiased guides on everything every Japan visitor needs
            to sort out before and after landing.
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href} className="cat-card">
              <div className="cat-card__top">
                <div className="cat-card__left">
                  <div className="cat-card__icon-row">
                    <span className="cat-card__icon">{cat.icon}</span>
                    <span className={`badge ${cat.badgeCls}`}>{cat.badge}</span>
                  </div>
                  <h3 className="cat-card__title">{cat.title}</h3>
                  <p className="cat-card__desc">{cat.description}</p>
                </div>
                <div className="cat-card__arrow">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── QUICK TIPS ── */}
      <section className="tips-section">
        <div className="tips-section__inner">
          <div className="tips-section__head">
            <span className="section-label">Before you go</span>
            <h2>Quick tips every visitor should know</h2>
            <p>Japan has some quirks. Here are the four things to sort before you board the plane.</p>
          </div>

          <div className="tips-grid">
            {quickTips.map((tip) => (
              <div key={tip.title} className="tip-card">
                <div className="tip-card__icon">{tip.icon}</div>
                <h3 className="tip-card__title">{tip.title}</h3>
                <p className="tip-card__body">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="trust-section">
        <div className="trust-box">
          <div className="trust-box__flag">🇯🇵</div>
          <div className="trust-box__content">
            <h2>Independent. Honest. Up-to-date.</h2>
            <p>
              We research and test every product we recommend. Our reviews are
              never sponsored — we only earn a small affiliate commission if you
              buy through our links, at no extra cost to you.
            </p>
          </div>
          <div className="trust-checklist">
            {["No paid placements", "Verified prices", "Updated monthly"].map((t) => (
              <div key={t} className="trust-checklist__item">
                <span className="trust-check">✓</span>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-box">
          <div className="cta-box__orb" />
          <div className="cta-box__inner">
            <p className="cta-box__label">Start here</p>
            <h2 className="cta-box__title">Ready to plan your Japan trip?</h2>
            <p className="cta-box__desc">
              Start with connectivity — the most important thing to sort before
              you land.
            </p>
            <Link href="/sim-cards" className="btn-primary">
              Find the Best Japan SIM Card →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
