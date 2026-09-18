import Head from "next/head";
import Link from "next/link";
import { simCards } from "../../../lib/sim-cards";
import {
  cheapestPlan,
  formatDate,
  formatUsd,
  getProvider,
  latestCheckedAt,
  priceAtLeastLabel,
  priceFromLabel,
  unlimitedFromLabel,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import styles from "../../../styles/BestEsimJapan.module.css";
import tools from "../../../styles/Tools.module.css";

// "Price From" / "Cheapest Plan" in the quick comparison come from data/esim-prices.json,
// which is refreshed daily by scripts/fetch-esim-prices.mjs.
const pricesCheckedAt = formatDate(latestCheckedAt());

const topPicks = [
  {
    id: "airalo-japan",
    esimId: "airalo" as EsimProviderId,
    rank: 1,
    bestFor: "Best Overall",
    badgeCls: styles.pickBadgeBlue,
    target: "Most travellers — reliable, affordable, incredibly easy to set up.",
    ctaLabel: "Get Airalo eSIM →",
    ctaExternal: false,
  },
  {
    // TODO: Holafly affiliate link pending approval. affiliateUrl is "#" in data/esim-prices.json,
    // so the CTA below renders as the same button style but routes to /sim-cards.
    // Once approved, set affiliateUrl in the JSON and this CTA becomes external automatically.
    id: "holafly-japan",
    esimId: "holafly" as EsimProviderId,
    rank: 2,
    bestFor: "Best Unlimited",
    badgeCls: styles.pickBadgeOrange,
    target: "Heavy data users: remote workers, streamers, daily video callers.",
    ctaLabel: "Get Holafly eSIM →",
    ctaExternal: false,
  },
  {
    id: "esim-go-japan",
    esimId: "esimgo" as EsimProviderId,
    rank: 3,
    bestFor: "Best Value",
    badgeCls: styles.pickBadgeBlue,
    target: "Budget travellers or those on a multi-country trip through Asia.",
    ctaLabel: "Get eSIM Go →",
    ctaExternal: true,
  },
  {
    id: "sakura-mobile",
    esimId: "sakura" as EsimProviderId,
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
  {
    q: "What's the difference between eSIM and a physical SIM card for Japan?",
    a: "Both give you mobile data in Japan, but eSIM is faster to set up (no queuing at the airport), cheaper in most cases, and available before you travel. Physical SIM cards require waiting at the airport counter or vending machine after landing. The main advantage of a physical SIM is that it works on phones that don't support eSIM.",
  },
  {
    q: "Can I use my home carrier in Japan instead of buying an eSIM?",
    a: "Yes, but roaming is expensive. Most international carriers charge $10–15 per day for Japan roaming. For a 10-day trip, that's $100–150 just for data — versus $9–18 for a full Japan eSIM plan. Unless your carrier offers a flat travel add-on with good Japan coverage, a dedicated Japan eSIM is almost always cheaper.",
  },
  {
    q: "What network does Airalo use in Japan?",
    a: "Airalo Japan eSIM plans run on Docomo and SoftBank networks. Docomo has the widest coverage in Japan, including rural areas, mountains, and remote islands. SoftBank has strong urban and suburban coverage. In practice, most travellers won't notice a difference between the two in tourist areas.",
  },
  {
    q: "What is Sakura Mobile and who is it for?",
    a: "Sakura Mobile is a Japan-based carrier that offers both SIM cards and eSIMs specifically designed for tourists and long-term visitors. Unlike Airalo and Holafly, Sakura Mobile includes voice call capability, English-speaking customer support, and plans suitable for stays up to 90 days. It runs on Docomo (Japan's largest carrier). It costs more than budget eSIM options but is the best choice for anyone who needs a Japanese phone number or plans an extended stay.",
  },
  {
    q: "How much data do I need for Japan?",
    a: "For typical tourist use — Google Maps, messaging, light browsing, and a few photos — 1 GB per day is a reasonable estimate. A 10-day trip would use around 8–10 GB. If you use maps heavily for driving, stream video, or work remotely, budget 2 GB+ per day. Most travellers find a 3–5 GB plan sufficient for a week-long trip to Japan.",
  },
  {
    q: "How much does a Japan eSIM cost?",
    a: `Japan eSIM prices vary by provider and plan size (checked ${pricesCheckedAt}). Budget options: eSIM Go from ${priceFromLabel("esimgo")}, Airalo from ${priceFromLabel("airalo")}. Mid-range: a 5 GB plan is ${priceAtLeastLabel("esimgo", 5)} from eSIM Go or ${priceAtLeastLabel("airalo", 5)} from Airalo. Unlimited: Holafly from ${unlimitedFromLabel("holafly")}. Japan-based with English phone support: Sakura Mobile from ${priceFromLabel("sakura")}. For a typical tourist week, expect to pay $10–20.`,
  },
  {
    q: "Is unlimited data worth it for a Japan trip?",
    a: "For most tourists: no. Japan has excellent Wi-Fi coverage in hotels, convenience stores, and tourist areas. A 3–5 GB plan covers a typical week of maps, messaging, and browsing. Unlimited plans (like Holafly) cost 2–3x more and mainly benefit heavy users who stream video, use video calls frequently, or travel to areas with poor Wi-Fi. If you're unsure, start with a 5 GB plan and consider whether you need more.",
  },
  {
    q: "Can I top up my eSIM once I'm in Japan?",
    a: "Yes — most providers support in-app top-ups without needing a new QR code. With Airalo, purchase an additional plan through the app and it tops up your existing eSIM profile automatically. eSIM Go and Sakura Mobile have similar top-up flows. Holafly unlimited plans are fixed-duration and require purchasing a new plan if you stay longer.",
  },
  {
    q: "Do Japan eSIM plans include calls and SMS?",
    a: "Most tourist-oriented eSIM plans — including Airalo, eSIM Go, and Holafly — are data-only. They don't include voice calls or SMS. For calls in Japan, you can use WhatsApp, LINE, or FaceTime over data. If you genuinely need a Japanese phone number with voice capability, Sakura Mobile is the best option among the main providers.",
  },
  {
    q: "When should I activate my Japan eSIM?",
    a: "Install the eSIM (scan the QR code) before you leave home — this takes 2–5 minutes and requires a Wi-Fi connection. However, most plans start counting days from the first time you connect to a network in Japan, not from when you install the profile. Switch to the Japan eSIM data line once your plane lands, so your plan starts when you need it.",
  },
  {
    q: "Why is my Japan eSIM speed slow?",
    a: "A few possible causes: you've used most of your data allowance (many plans throttle speed after a threshold), you're in a low-coverage area (tunnels, rural mountains), or peak network congestion in crowded tourist areas like Shibuya or Kyoto Station. Try toggling Airplane Mode. If speeds don't improve and you're under your data limit, contact your provider's support.",
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
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/best-esim-japan" />
        <meta property="og:title" content="Best eSIM for Japan 2026: Top 4 Picks Tested & Compared" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/best-esim-japan" />
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
              dateModified: "2026-09-16",
              author: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://www.japan-travel-kit.com",
              },
              publisher: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://www.japan-travel-kit.com",
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
            <span>📱</span> Updated September 2026
          </p>
          <h1 className={styles.heroTitle}>
            Best eSIM for Japan 2026:<br />Tested &amp; Compared
          </h1>
          <p className={styles.heroSubtitle}>
            We tested every major Japan eSIM so you don&apos;t have to.
          </p>
          <div className={styles.heroBadges}>
            {["Updated September 2026", "4 eSIMs Tested", "Independent Review"].map((t) => (
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
                    {["Provider", "Best For", "Price From", "Cheapest Plan", "Network", "Rating", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {topPicks.map(({ id, esimId, bestFor, ctaLabel }) => {
                    const sim = simCards.find((s) => s.id === id)!;
                    const cheapest = cheapestPlan(esimId);
                    const affiliateUrl = getProvider(esimId).affiliateUrl;
                    const url = affiliateUrl === "#" ? "/sim-cards" : affiliateUrl;
                    const isExternal = affiliateUrl !== "#";
                    return (
                      <tr key={id}>
                        <td className={styles.tdProvider}>{sim.provider}</td>
                        <td className={styles.tdBestFor}>{bestFor}</td>
                        <td className={styles.tdPrice}>{cheapest ? formatUsd(cheapest.priceUsd) : "—"}</td>
                        <td className={styles.tdNetwork}>{cheapest ? cheapest.name : "—"}</td>
                        <td className={styles.tdNetwork}>{getProvider(esimId).network}</td>
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
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem" }}>
            <span className={tools.liveBadge}><span className={tools.liveDot} /> Prices checked daily</span>
            <span>
              &ldquo;Price From&rdquo; is each provider&apos;s cheapest Japan plan as of {pricesCheckedAt}.{" "}
              <Link href="/guides/esim/japan-esim-data-plans" className={tools.inlineLink}>See every plan, sorted by price per GB →</Link>
            </span>
          </p>
        </section>

        {/* Top Picks */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>Our picks</span>
          <h2 className={styles.sectionTitle}>Top 4 Japan eSIMs</h2>
          <div className={styles.picksList}>
            {topPicks.map(({ id, esimId, rank, bestFor, badgeCls, target, ctaLabel }) => {
              const sim = simCards.find((s) => s.id === id)!;
              const affiliateUrl = getProvider(esimId).affiliateUrl;
              const url = affiliateUrl === "#" ? "/sim-cards" : affiliateUrl;
              const isExternal = affiliateUrl !== "#";
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/esim/cheapest-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v10M9.5 9.5a2 2 0 0 1 2-1.5h1a1.8 1.8 0 0 1 .3 3.55l-2.6.9A1.8 1.8 0 0 0 14.5 14a2 2 0 0 1-2 1.5h-1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cheapest eSIM for Japan 2026: Best Budget Picks</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/airalo-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airalo Japan Review 2026: Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/sakura-mobile-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sakura Mobile Review 2026: Best SIM for Long Stays?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-unlimited" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                  <line x1="12" y1="2" x2="12" y2="12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Unlimited eSIM for Japan (2026): Top Picks for Heavy Users</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/how-to-set-up-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>How to Set Up an eSIM in Japan (Step-by-Step)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/airalo-vs-holafly-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airalo vs Holafly for Japan: Which eSIM Wins?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
