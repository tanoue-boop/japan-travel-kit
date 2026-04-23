import Head from "next/head";
import Link from "next/link";
import { simCards } from "../../../lib/sim-cards";
import styles from "../../../styles/BestEsimJapan.module.css";

const topPicks = [
  {
    id: "airalo-japan",
    rank: 1,
    bestFor: "Best Overall",
    badgeCls: styles.pickBadgeBlue,
    target: "Most travellers — reliable, affordable, incredibly easy to set up.",
    ctaLabel: "Get Airalo eSIM →",
    ctaExternal: false,
  },
  {
    id: "holafly-japan",
    rank: 2,
    bestFor: "Best Unlimited",
    badgeCls: styles.pickBadgeOrange,
    target: "Heavy data users: remote workers, streamers, daily video callers.",
    ctaLabel: "Get Holafly eSIM →",
    ctaExternal: false,
  },
  {
    id: "esim-go-japan",
    rank: 3,
    bestFor: "Best Value",
    badgeCls: styles.pickBadgeBlue,
    target: "Budget travellers or those on a multi-country trip through Asia.",
    ctaLabel: "Get eSIM Go →",
    ctaExternal: true,
  },
  {
    id: "sakura-mobile",
    rank: 4,
    bestFor: "Best for Long Stay",
    badgeCls: styles.pickBadgeGreen,
    target: "Long-stay visitors (1 month+) who need voice calls and English support.",
    ctaLabel: "Get Sakura Mobile →",
    ctaExternal: false,
  },
];

const installSteps = [
  {
    title: "Purchase & receive your QR code",
    desc: "Buy online before you travel. You'll receive a QR code by email within minutes — delivered straight to your inbox.",
  },
  {
    title: "Scan the QR code in Settings",
    desc: "Go to Settings → Cellular (or Mobile Data) → Add eSIM → Scan QR Code. Takes under 2 minutes. You can do this at home before you even pack.",
  },
  {
    title: "Activate on arrival",
    desc: "Switch to your Japan eSIM profile as your plane lands. You'll have a 4G signal before you reach baggage claim — no airport SIM vending machine needed.",
  },
];

const faqItems = [
  {
    q: "What is an eSIM and do I need one for Japan?",
    a: "An eSIM is a digital SIM built into your phone — no physical card needed. You download a profile via QR code and it works instantly. You don't need an eSIM to visit Japan, but it's by far the most convenient option: buy and install before you fly, activate on landing.",
  },
  {
    q: "Which phones support eSIM in Japan?",
    a: "Most modern phones support eSIM: iPhone XS and later, Google Pixel 3 and later, Samsung Galaxy S20 and later, and many other Android flagships. Check your phone's Settings → About to confirm. Note: some carrier-locked phones may not support eSIM.",
  },
  {
    q: "Can I keep my home SIM active while using a Japan eSIM?",
    a: "Yes — this is one of the biggest advantages of eSIM. Most dual-SIM phones let you use both SIMs simultaneously. Keep your home SIM active for calls and texts while your Japan eSIM handles data.",
  },
  {
    q: "Is Airalo or Holafly better for Japan?",
    a: "Airalo is better for most people — it's cheaper, has flexible data caps, and uses both Docomo and SoftBank. Holafly wins if you genuinely need unlimited data (remote work, heavy streaming) and the premium price is justified for your trip.",
  },
  {
    q: "What if my eSIM doesn't work after landing in Japan?",
    a: "First, check that Data Roaming is enabled for your eSIM profile. If still no signal, toggle Airplane Mode on/off to force a network scan. All providers listed here offer 24/7 live chat support — Airalo and Holafly are especially responsive.",
  },
];

export default function BestEsimJapanPage() {
  return (
    <>
      <Head>
        <title>Best eSIM for Japan 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="The best eSIMs for Japan 2026: Airalo, Holafly, eSIM Go & Sakura Mobile compared on price, speed, and coverage. Independent review — no paid placements."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/best-esim-japan" />
        <meta property="og:title" content="Best eSIM for Japan 2026: Top 4 Picks Tested & Compared" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/best-esim-japan" />
        <meta property="og:description" content="The best eSIMs for Japan 2026: Airalo, Holafly, eSIM Go & Sakura Mobile compared on price, speed, and coverage. Independent review — no paid placements." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best eSIM for Japan 2026: Top 4 Picks Tested & Compared" />
        <meta name="twitter:description" content="The best eSIMs for Japan 2026: Airalo, Holafly, eSIM Go & Sakura Mobile compared on price, speed, and coverage. Independent review — no paid placements." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Best eSIM for Japan 2026: Top 4 Picks Tested & Compared",
              dateModified: "2026-04-01",
              publisher: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://japan-travel-kit.com",
              },
            }),
          }}
        />
      </Head>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Best eSIM Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📱</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            Best eSIM for Japan 2026:<br />Tested &amp; Compared
          </h1>
          <p className={styles.heroSubtitle}>
            We tested every major Japan eSIM so you don&apos;t have to.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "4 eSIMs Tested", "Independent Review"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Disclosure */}
        <div className={styles.disclosure}>
          <span className={styles.disclosureIcon}>ℹ️</span>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links below are affiliate links.
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our rankings or reviews.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Comparison Table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>At a glance</span>
          <h2 className={styles.sectionTitle}>Quick Comparison</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Provider", "Best For", "Price From", "Data", "Network", "Rating", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {topPicks.map(({ id, bestFor, ctaLabel }) => {
                    const sim = simCards.find((s) => s.id === id)!;
                    const cheapest = sim.plans.reduce((a, b) => (a.price < b.price ? a : b));
                    const url = sim.affiliateUrl === "#" ? "/sim-cards" : sim.affiliateUrl;
                    const isExternal = sim.affiliateUrl !== "#";
                    return (
                      <tr key={id}>
                        <td className={styles.tdProvider}>{sim.provider}</td>
                        <td className={styles.tdBestFor}>{bestFor}</td>
                        <td className={styles.tdPrice}>${cheapest.price.toFixed(2)}</td>
                        <td className={styles.tdNetwork}>{cheapest.data}</td>
                        <td className={styles.tdNetwork}>{sim.coverage.split("(")[0].trim()}</td>
                        <td>
                          <span className={styles.tdRating}>
                            <span style={{ color: "#fbbf24" }}>★</span>
                            {sim.rating}
                          </span>
                        </td>
                        <td>
                          {isExternal ? (
                            <a
                              href={url}
                              className={styles.tdLink}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                            >
                              {ctaLabel}
                            </a>
                          ) : (
                            <Link href="/sim-cards" className={styles.tdLink}>
                              {ctaLabel}
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Top Picks */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>Our picks</span>
          <h2 className={styles.sectionTitle}>Top 4 Japan eSIMs</h2>
          <div className={styles.picksList}>
            {topPicks.map(({ id, rank, bestFor, badgeCls, target, ctaLabel }) => {
              const sim = simCards.find((s) => s.id === id)!;
              const url = sim.affiliateUrl === "#" ? "/sim-cards" : sim.affiliateUrl;
              const isExternal = sim.affiliateUrl !== "#";
              return (
                <article key={id} id={id} className={styles.pickCard}>
                  <div className={styles.pickCardHeader}>
                    <div className={styles.pickRank}>
                      <span className={styles.pickNumber}>{rank}</span>
                      <div className={styles.pickMeta}>
                        <span className={`${styles.pickBadge} ${badgeCls}`}>{bestFor}</span>
                        <span className={styles.pickName}>{sim.name}</span>
                      </div>
                    </div>
                    <span className={styles.pickRating}>
                      <span style={{ color: "#fbbf24" }}>★</span>
                      {sim.rating}
                      <span style={{ color: "#9ca3af", fontWeight: 400 }}>({sim.reviewCount.toLocaleString()})</span>
                    </span>
                  </div>
                  <div className={styles.pickCardBody}>
                    <p className={styles.pickSummary}>{sim.summary}</p>
                    <div className={styles.pickTarget}>
                      <span className={styles.pickTargetLabel}>Best for:</span>
                      <span>{target}</span>
                    </div>
                    <div className={styles.pickGrid}>
                      <div className={styles.pickPros}>
                        <p className={styles.pickListLabel}>Pros</p>
                        <ul className={styles.pickList}>
                          {sim.pros.map((p) => (
                            <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.pickCons}>
                        <p className={styles.pickListLabel}>Cons</p>
                        <ul className={styles.pickList}>
                          {sim.cons.map((c) => (
                            <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className={styles.pickCtaRow}>
                      {isExternal ? (
                        <a
                          href={url}
                          className={styles.pickCta}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                        >
                          {ctaLabel}
                        </a>
                      ) : (
                        <Link href="/sim-cards" className={styles.pickCta}>
                          {ctaLabel}
                        </Link>
                      )}
                      <Link href="/sim-cards" className={styles.pickCtaInternal}>
                        Compare all plans
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* How to Install */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup guide</span>
          <h2 className={styles.sectionTitle}>How to Install a Japan eSIM</h2>
          <div className={styles.stepsList}>
            {installSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Common Questions</h2>
          <div className={styles.faqList}>
            {faqItems.map((item, i) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{i + 1}. {item.q}</span>
                  <svg className={styles.faqChevron} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className={styles.faqBody}>{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Ready to compare all options?</h2>
            <p className={styles.ctaBannerDesc}>
              See full plan details, pricing, and our complete reviews for every Japan SIM card and eSIM.
            </p>
            <Link href="/sim-cards" className={styles.ctaBannerBtn}>
              View Full SIM Card Comparison →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
