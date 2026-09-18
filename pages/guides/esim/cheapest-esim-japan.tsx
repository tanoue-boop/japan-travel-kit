import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import tools from "../../../styles/Tools.module.css";
import { ProviderCta } from "../../../components/EsimPlanTable";
import {
  allEsimPlans,
  cheapestAtLeastGb,
  cheapestUnlimited,
  esimProviders,
  formatDate,
  formatUsd,
  latestCheckedAt,
  type EsimPlan,
} from "../../../lib/esim-prices";

const AIRALO_URL = "https://airalo.pxf.io/c/7213504/1268485/15608";
const SAKURA_URL = "https://p.sakuramobile.jp/idevaffiliate.php?id=486";
const ESIMGO_URL = "https://breezesim.com?sca_ref=11082101.AF8vabyRKN";
const HOLAFLY_URL = "#";

// Price comparison is drawn from data/esim-prices.json (refreshed daily by
// scripts/fetch-esim-prices.mjs): cheapest plan per provider at each data tier.
const pricesCheckedAt = formatDate(latestCheckedAt());
const TIERS = [1, 5, 10];
const priceTable = esimProviders.map((p) => ({
  id: p.id,
  provider: p.name,
  tiers: TIERS.map((gb) => cheapestAtLeastGb(p.id, gb)),
  unlimited: cheapestUnlimited(p.id),
}));
const cheapestOf = (rows: typeof allEsimPlans) => (rows.length ? rows.reduce((a, b) => (b.priceUsd < a.priceUsd ? b : a)) : null);
const cheapestOverall = cheapestOf(allEsimPlans);
const cheapestUnlimitedAny = cheapestOf(allEsimPlans.filter((p) => p.unlimited && p.days >= 7));
const cheapestLongStay = cheapestOf(allEsimPlans.filter((p) => p.days >= 30 && !p.unlimited && (p.gb ?? 0) >= 10));
const p = (plan: EsimPlan | null) => (plan ? `${formatUsd(plan.priceUsd)} / ${plan.name}` : "—");
const priceOf = (plan: EsimPlan | null) => (plan ? formatUsd(plan.priceUsd) : "—");
const esimgoCheapest = cheapestAtLeastGb("esimgo", 1);
const airaloCheapest = cheapestAtLeastGb("airalo", 1);
const holaflyCheapest = cheapestUnlimited("holafly", 7);
const sakuraCheapest = cheapestAtLeastGb("sakura", 1);
const esimgo5 = cheapestAtLeastGb("esimgo", 5);
const esimgo10 = cheapestAtLeastGb("esimgo", 10);
const cell = (plan: EsimPlan | null) =>
  plan ? (
    <>
      {formatUsd(plan.priceUsd)}
      <span className={tools.tdNote}>{plan.name}</span>
    </>
  ) : (
    "✗"
  );

const picks = [
  {
    num: 1,
    name: "eSIM Go",
    badge: "Cheapest Per GB",
    badgeColor: "#1565c0",
    priceFrom: p(esimgoCheapest),
    network: "Docomo / SoftBank",
    affiliateUrl: ESIMGO_URL,
    ctaLabel: "Get eSIM Go Japan →",
    pros: [
      "Lowest price per GB on the market",
      "Docomo network — best rural coverage",
      "Instant QR code activation",
      "Works in 190+ countries",
    ],
    cons: [
      "Data-only (no voice or SMS)",
      "Smaller brand — less community support",
      "Email-only customer service",
    ],
    summary:
      `eSIM Go (sold through its consumer brand Breeze) is consistently the cheapest Japan eSIM we track, from ${p(esimgoCheapest)}${esimgo10 ? `, and its ${esimgo10.name} plan at ${priceOf(esimgo10)} is one of the lowest prices per GB anywhere` : ""}. It activates instantly via QR code. Ideal for short visits or anyone watching their budget.`,
  },
  {
    num: 2,
    name: "Airalo",
    badge: "Best Balance",
    badgeColor: "#0d1b4b",
    priceFrom: p(airaloCheapest),
    network: "SoftBank & KDDI",
    affiliateUrl: AIRALO_URL,
    ctaLabel: "Get Airalo Japan eSIM →",
    pros: [
      "Trusted by 10M+ travellers worldwide",
      "Slightly more data options than eSIM Go",
      "24/7 live chat support",
      "Easy-to-use app",
    ],
    cons: [
      "Data-only (no voice calls or SMS)",
      "Slightly pricier than eSIM Go",
      "eSIM-compatible phone required",
    ],
    summary:
      `Airalo's Japan plans start at ${p(airaloCheapest)} — close to eSIM Go on price, but you get 24/7 live chat support, in-app top-ups and the backing of the world's largest eSIM marketplace. A great choice if you want budget pricing with stronger customer support.`,
  },
  {
    num: 3,
    name: "Holafly",
    badge: "Cheapest Unlimited",
    badgeColor: "#e65100",
    priceFrom: p(holaflyCheapest),
    network: "SoftBank / KDDI",
    affiliateUrl: HOLAFLY_URL,
    ctaLabel: "Get Holafly Japan eSIM →",
    pros: [
      "Unlimited on-device data",
      "Plans from 1 to 90 days, any length",
      "Easy QR code setup",
      "Popular with US & European travellers",
    ],
    cons: [
      "Data-only (no calls or SMS)",
      "Pricier than capped alternatives",
      "eSIM-only device required",
    ],
    summary:
      `If you stream constantly, use Google Maps all day, or simply want peace of mind about your data, Holafly's unlimited plans start at ${p(holaflyCheapest)}. Hotspot use is capped at 1 GB/day. It costs more than a capped plan, but on an unlimited plan, per-GB cost is irrelevant.`,
  },
  {
    num: 4,
    name: "Sakura Mobile",
    badge: "Cheapest with Voice",
    badgeColor: "#2e7d32",
    priceFrom: p(sakuraCheapest),
    network: "Docomo (3 GB/day) or au/KDDI (unlimited)",
    affiliateUrl: SAKURA_URL,
    ctaLabel: "Get Sakura Mobile SIM →",
    pros: [
      "Optional Japanese phone number on SIM plans",
      "Full English customer support by phone",
      "Physical SIM or eSIM available",
      "Best for stays of 1 month+",
    ],
    cons: [
      "Higher price than data-only options",
      "Requires advance order for physical SIM",
      "Not ideal for short trips",
    ],
    summary:
      `Sakura Mobile is the Japan-based option with English phone support and (on its SIM plans) a real Japanese phone number. Travel eSIMs start at ${p(sakuraCheapest)} with 3 GB of high-speed data per day, or go unlimited on au/KDDI. Pricier than the resellers, but the pick if you need local support or a number.`,
  },
];

const dealTips = [
  {
    trip: "Short trip (up to 7 days)",
    pick: esimgoCheapest ? `eSIM Go ${esimgoCheapest.name} — ${priceOf(esimgoCheapest)}` : "eSIM Go 1 GB",
    why: "Covers typical tourist data use (maps, social, messaging) without overpaying.",
    url: ESIMGO_URL,
  },
  {
    trip: "Two-week trip",
    pick: esimgo5 ? `eSIM Go ${esimgo5.name} — ${priceOf(esimgo5)}` : "eSIM Go 5 GB",
    why: "Plenty of data for navigation, translation apps, and social media over two weeks.",
    url: ESIMGO_URL,
  },
  {
    trip: "One-month stay",
    pick: `eSIM Go 10 GB (${priceOf(esimgo10)}) or Sakura Mobile (from ${priceOf(sakuraCheapest)})`,
    why: "eSIM Go if data-only is fine; Sakura Mobile if you want English phone support or a Japanese number.",
    url: ESIMGO_URL,
  },
  {
    trip: "Heavy data user",
    pick: `Holafly Unlimited — from ${priceOf(holaflyCheapest)}`,
    why: "Stream video, use your phone as a hotspot, or simply stop worrying about data altogether.",
    url: HOLAFLY_URL,
  },
];

const faqItems = [
  {
    q: "What is the cheapest eSIM for Japan?",
    a: `As of ${pricesCheckedAt}, ${cheapestOverall ? `${cheapestOverall.provider} is the cheapest Japan eSIM we track, at ${priceOf(cheapestOverall)} for ${cheapestOverall.name}` : "eSIM Go is usually the cheapest Japan eSIM"}. Airalo is a close second at ${p(airaloCheapest)}. Both are data-only eSIMs that activate instantly via QR code. Prices on this page are re-checked every day.`,
  },
  {
    q: "Is a cheap eSIM reliable in Japan?",
    a: "Yes. Cheap eSIMs like eSIM Go and Airalo run on the same Docomo and SoftBank infrastructure used by expensive plans. Network quality in Japan is world-class regardless of which reseller you buy from — you're paying less for distribution, not for a worse connection.",
  },
  {
    q: "How much data do I need for 1 week in Japan?",
    a: "For typical tourist use — Google Maps, messaging apps, light social media — 1 GB is usually enough for a week. If you plan to stream video, use a hotspot, or navigate heavily, go for 3–5 GB. Heavy users (constant streaming, working remotely) should consider an unlimited plan like Holafly.",
  },
  {
    q: "Can I top up a cheap eSIM in Japan?",
    a: "Yes, with Airalo. You can purchase an additional plan from the Airalo app while in Japan and it tops up your existing profile without scanning a new QR code. eSIM Go also allows additional data purchases, though the process varies. Holafly's unlimited plan means you'll never need a top-up.",
  },
  {
    q: "Is eSIM cheaper than roaming in Japan?",
    a: `Almost always, yes. Most international roaming plans charge $10–15 per day. eSIM Go starts at ${p(esimgoCheapest)} — less than a single day of roaming. Even Holafly's unlimited plan at ${p(holaflyCheapest)} works out far cheaper than roaming charges for the same period.`,
  },
];

export default function CheapestEsimJapanPage() {
  return (
    <>
      <Head>
        <title>Cheapest eSIM for Japan 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content={`Looking for the cheapest eSIM for Japan? We compared prices across Airalo, eSIM Go, Holafly and Sakura Mobile — checked daily. From ${cheapestOverall ? formatUsd(cheapestOverall.priceUsd) : "$3.99"}.`}
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/cheapest-esim-japan" />
        <meta property="og:title" content="Cheapest eSIM for Japan 2026: Best Budget Picks Tested & Compared" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/cheapest-esim-japan" />
        <meta property="og:description" content={`Looking for the cheapest eSIM for Japan? We compared prices across Airalo, eSIM Go, Holafly and Sakura Mobile — checked daily. From ${cheapestOverall ? formatUsd(cheapestOverall.priceUsd) : "$3.99"}.`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cheapest eSIM for Japan 2026: Best Budget Picks Tested & Compared" />
        <meta name="twitter:description" content={`Looking for the cheapest eSIM for Japan? We compared prices across Airalo, eSIM Go, Holafly and Sakura Mobile — checked daily. From ${cheapestOverall ? formatUsd(cheapestOverall.priceUsd) : "$3.99"}.`} />
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
              headline: "Cheapest eSIM for Japan 2026: Best Budget Picks Tested & Compared",
              dateModified: "2026-09-18",
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
          <span className={styles.breadCurrent}>Cheapest eSIM for Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>💰</span> Prices checked {pricesCheckedAt}
          </p>
          <h1 className={styles.heroTitle}>
            Cheapest eSIM for Japan 2026:<br />Best Budget Picks
          </h1>
          <p className={styles.heroSubtitle}>
            You don&apos;t need to overpay to stay connected in Japan. Here are the best value eSIMs we tested.
          </p>
          <div className={styles.heroBadges}>
            {["Prices checked daily", "4 eSIMs Compared", "Verified on official sites"].map((t) => (
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
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our review or verdict.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer · prices checked {pricesCheckedAt}</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest Overall</p>
                <p className={styles.verdictStatValue}>
                  {cheapestOverall ? `${cheapestOverall.provider} ${cheapestOverall.name} — ${formatUsd(cheapestOverall.priceUsd)}` : "—"}
                </p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest Unlimited (7+ days)</p>
                <p className={styles.verdictStatValue}>
                  {cheapestUnlimitedAny ? `${cheapestUnlimitedAny.provider} ${cheapestUnlimitedAny.name} — ${formatUsd(cheapestUnlimitedAny.priceUsd)}` : "—"}
                </p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest 30-Day (10 GB+)</p>
                <p className={styles.verdictStatValue}>
                  {cheapestLongStay ? `${cheapestLongStay.provider} ${cheapestLongStay.name} — ${formatUsd(cheapestLongStay.priceUsd)}` : "—"}
                </p>
              </div>
            </div>
            {cheapestOverall && (
              <ProviderCta providerId={cheapestOverall.providerId} className={styles.verdictBtn} label={`Get ${cheapestOverall.provider} Japan (from ${formatUsd(cheapestOverall.priceUsd)}) →`} />
            )}
          </div>
        </div>

        {/* Price Comparison Table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>At a glance</span>
          <h2 className={styles.sectionTitle} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
            Price Comparison
            <span className={tools.liveBadge}><span className={tools.liveDot} /> Prices checked daily</span>
          </h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Provider", "1 GB+", "5 GB+", "10 GB+", "Unlimited", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceTable.map((row) => (
                    <tr key={row.id}>
                      <td className={styles.tdProvider} style={{ fontWeight: 700 }}>{row.provider}</td>
                      {row.tiers.map((plan, i) => (
                        <td key={TIERS[i]} className={plan ? styles.tdPrice : tools.tdMuted}>{cell(plan)}</td>
                      ))}
                      <td className={row.unlimited ? styles.tdPrice : tools.tdMuted}>{cell(row.unlimited)}</td>
                      <td><ProviderCta providerId={row.id} label="Buy →" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Each cell is the provider&apos;s cheapest plan with <em>at least</em> that much data, in USD, read from the provider&apos;s
            official site on {pricesCheckedAt}. All plans are eSIM-only.{" "}
            <Link href="/guides/esim/japan-esim-data-plans" className={tools.inlineLink}>See every plan sorted by price per GB →</Link>
          </p>
        </section>

        {/* Best Cheap eSIMs */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Rankings</span>
          <h2 className={styles.sectionTitle}>Best Cheap eSIMs for Japan</h2>

          {picks.map((pick) => (
            <div key={pick.num} style={{ marginBottom: "2.5rem", paddingBottom: "2.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  background: pick.badgeColor,
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  flexShrink: 0,
                }}>{pick.num}</span>
                <h3 className={styles.sectionTitle} style={{ margin: 0, fontSize: "1.2rem" }}>
                  {pick.name}
                  <span style={{
                    display: "inline-block",
                    marginLeft: "0.6rem",
                    background: pick.badgeColor,
                    color: "#fff",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    verticalAlign: "middle",
                  }}>{pick.badge}</span>
                </h3>
              </div>

              <div style={{ display: "flex", gap: "1.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.82rem", color: "#6b7280" }}>
                  <strong style={{ color: "#0d1b4b" }}>From:</strong> {pick.priceFrom}
                </span>
                <span style={{ fontSize: "0.82rem", color: "#6b7280" }}>
                  <strong style={{ color: "#0d1b4b" }}>Network:</strong> {pick.network}
                </span>
              </div>

              <p className={styles.bodyText}>{pick.summary}</p>

              <div className={styles.pickGrid}>
                <div className={styles.pickPros}>
                  <p className={styles.pickListLabel}>Pros</p>
                  <ul className={styles.pickList}>
                    {pick.pros.map((p) => (
                      <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.pickCons}>
                  <p className={styles.pickListLabel}>Cons</p>
                  <ul className={styles.pickList}>
                    {pick.cons.map((c) => (
                      <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {pick.affiliateUrl !== "#" ? (
                <a
                  href={pick.affiliateUrl}
                  className={styles.pickCta}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  style={{ marginTop: "1rem" }}
                >
                  {pick.ctaLabel}
                </a>
              ) : (
                <Link
                  href="/sim-cards"
                  className={styles.pickCta}
                  style={{ marginTop: "1rem" }}
                >
                  {pick.ctaLabel}
                </Link>
              )}
            </div>
          ))}
        </section>

        {/* How to Get the Best Deal */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Buying guide</span>
          <h2 className={styles.sectionTitle}>How to Get the Best Deal</h2>
          <div className={styles.stepsList}>
            {dealTips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.trip}</p>
                  <p className={styles.stepDesc}>
                    <strong>{tip.pick}</strong> — {tip.why}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Are Cheap eSIMs Reliable */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Network quality</span>
          <h2 className={styles.sectionTitle}>Are Cheap eSIMs Reliable in Japan?</h2>
          <p className={styles.bodyText}>
            Yes — and here&apos;s why. Japan&apos;s mobile infrastructure is among the best in the world.
            Docomo and SoftBank, the two networks used by budget eSIMs like eSIM Go and Airalo,
            consistently rank among the world&apos;s top 10 for 4G coverage and download speeds.
          </p>
          <p className={styles.bodyText}>
            When you buy a cheap eSIM for Japan, you&apos;re not buying a worse network — you&apos;re buying
            the same Docomo or SoftBank signal at a lower price. The cost savings come from lower
            distribution overhead (no physical SIM cards, no airport kiosks) and competitive
            reseller pricing, not from degraded network access.
          </p>
          <p className={styles.bodyText}>
            In practice, eSIM Go and Airalo both provide the same download speeds and coverage as
            plans that cost three times more. The main trade-off at lower price points is customer
            support quality — eSIM Go offers email-only support, while Airalo has 24/7 live chat.
            For most travellers who just need their eSIM to work, support rarely comes up.
          </p>
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
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="9" y1="16" x2="13" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Tested &amp; Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/esim-go-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>eSIM Go Japan Review 2026: Best Budget eSIM?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/pocket-wifi-vs-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Pocket WiFi vs eSIM for Japan (2026): Which Is Better?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Compare all Japan eSIM options</h2>
            <p className={styles.ctaBannerDesc}>
              See how eSIM Go, Airalo, Holafly, and Sakura Mobile compare on price, coverage, and features.
            </p>
            <Link href="/guides/esim/best-esim-japan" className={styles.ctaBannerBtn}>
              View Full eSIM Comparison →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
