import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import tools from "../../../styles/Tools.module.css";
import EsimPlanFinder from "../../../components/EsimPlanFinder";
import EsimPlanTable, { ProviderCta } from "../../../components/EsimPlanTable";
import EsimPriceStatus from "../../../components/EsimPriceStatus";
import {
  allEsimPlans,
  bestValuePlan,
  esimProviders,
  findPlansForTrip,
  formatDate,
  formatUsd,
  latestCheckedAt,
  type EsimPlanRow,
} from "../../../lib/esim-prices";

// Everything below is computed from data/esim-prices.json at build time, so the
// copy (and the FAQ structured data) never drifts from the table.
const checkedAt = latestCheckedAt();
const checkedLabel = formatDate(checkedAt);
const checkedIso = checkedAt ? checkedAt.slice(0, 10) : "2026-09-18";

const cheapestOf = (rows: EsimPlanRow[]) => (rows.length ? rows.reduce((a, b) => (b.priceUsd < a.priceUsd ? b : a)) : null);
const cheapestOverall = cheapestOf(allEsimPlans);
// 7+ days so a 1-day plan can't "win" the unlimited headline.
const cheapestUnlimitedAny = cheapestOf(allEsimPlans.filter((p) => p.unlimited && p.days >= 7));
const cheapest5gb = cheapestOf(allEsimPlans.filter((p) => !p.unlimited && (p.gb ?? 0) >= 5));
const cheapest10gb = cheapestOf(allEsimPlans.filter((p) => !p.unlimited && (p.gb ?? 0) >= 10));
const bestValue = bestValuePlan();

const label = (p: EsimPlanRow | null) => (p ? `${p.provider} ${p.name} (${formatUsd(p.priceUsd)})` : "—");

const dataUsage = [
  { activity: "Google Maps navigation", perDay: "~50 MB" },
  { activity: "Social media browsing", perDay: "~150 MB" },
  { activity: "Streaming video (SD)", perDay: "~500 MB" },
  { activity: "Video calls", perDay: "~300 MB" },
  { activity: "Light use total", perDay: "~300 MB" },
  { activity: "Heavy use total", perDay: "~1.5 GB" },
];

// "Average" traveller: ~0.7 GB/day, matching the finder's default preset.
const byTripLength = [3, 7, 14, 30].map((days) => {
  const gb = Math.ceil(0.7 * days * 10) / 10;
  const pick = findPlansForTrip(days, gb)[0] ?? null;
  const unlimited = findPlansForTrip(days, Infinity)[0] ?? null;
  return { days, gb, pick, unlimited };
});

const providerSummaries = esimProviders.map((p) => {
  const capped = p.plans.filter((x) => !x.unlimited);
  const cheapestCapped = capped.length ? capped.reduce((a, b) => (b.priceUsd < a.priceUsd ? b : a)) : null;
  const unlimited = p.plans.filter((x) => x.unlimited);
  const cheapestUnl = unlimited.length ? unlimited.reduce((a, b) => (b.priceUsd < a.priceUsd ? b : a)) : null;
  const perGbBest = capped.length
    ? capped.reduce((a, b) => (b.priceUsd / (b.gb ?? 1) < a.priceUsd / (a.gb ?? 1) ? b : a))
    : null;
  return { ...p, cheapestCapped, cheapestUnl, perGbBest };
});

const faqItems = [
  {
    q: "Which Japan eSIM has the best value per GB?",
    a: bestValue
      ? `As of ${checkedLabel}, the lowest cost per GB among fixed-allowance plans is ${bestValue.provider}'s ${bestValue.name} at ${formatUsd(bestValue.priceUsd)} — about ${formatUsd(bestValue.perGb ?? 0)} per GB. (Sakura Mobile's 3 GB/day plans show an even lower nominal $/GB, but a daily cap can't be saved up, so we don't count them here.) Big plans always win on per-GB price, but only buy what you'll actually use: a plan that matches your trip is better value than a huge one you use a third of.`
      : "Sort the comparison table above by Price / GB to see the current best-value plan.",
  },
  {
    q: "What is the cheapest Japan eSIM right now?",
    a: cheapestOverall
      ? `The cheapest plan we track is ${cheapestOverall.provider}'s ${cheapestOverall.name} at ${formatUsd(cheapestOverall.priceUsd)} (checked ${checkedLabel}). ${cheapest5gb ? `If you need more data, the cheapest 5 GB+ plan is ${label(cheapest5gb)}` : ""}${cheapest10gb ? ` and the cheapest 10 GB+ plan is ${label(cheapest10gb)}.` : "."}`
      : "Use the comparison table above, sorted by price, to see the cheapest current plan.",
  },
  {
    q: "What is the cheapest unlimited eSIM for Japan?",
    a: cheapestUnlimitedAny
      ? `For a week or longer, ${cheapestUnlimitedAny.provider}'s ${cheapestUnlimitedAny.name} at ${formatUsd(cheapestUnlimitedAny.priceUsd)} is the cheapest unlimited plan we track (checked ${checkedLabel}); shorter 1–5 day unlimited plans are cheaper still — see the table. Read the fine print: Holafly caps hotspot use at 1 GB/day, Airalo's unlimited plans have a fair-use policy, and eSIM Go's "Unlimited Essential" slows down after a daily high-speed allowance. Sakura Mobile's unlimited plan runs on au/KDDI with a hotspot allowance that depends on plan length.`
      : "Compare the unlimited plans in the table above.",
  },
  {
    q: "Is 5 GB enough for 2 weeks in Japan?",
    a: "For most travellers, yes. 5 GB over 14 days is about 350 MB per day — enough for navigation, messaging, social media, and occasional photo uploads. If you plan to stream video, make frequent video calls, or use your phone as a hotspot for a laptop, use the plan finder above with the \"Heavy\" preset, or pick an unlimited plan.",
  },
  {
    q: "How often are these prices updated?",
    a: `Every day. A script fetches the current Japan plans from each provider's official website (Airalo, Holafly, eSIM Go/Breeze and Sakura Mobile) and updates this page automatically. If a provider's site can't be read on a given day, we keep the last verified prices and show the date they were last checked, so you can always see how fresh each number is. Last successful check: ${checkedLabel}.`,
  },
  {
    q: "Can I buy more data if I run out in Japan?",
    a: "Yes, for most providers. Airalo lets you top up by purchasing an additional plan in the app — no new QR code required. eSIM Go (Breeze) allows top-ups through its website. Holafly's plans are unlimited, so you never run out, but they're fixed-length. Sakura Mobile allows data add-ons via its customer portal. Plan ahead if you're heading to rural areas — you'll need an internet connection to complete the top-up.",
  },
];

export default function JapanEsimDataPlansPage() {
  return (
    <>
      <Head>
        <title>Japan eSIM Data Plans 2026: Live Price Tracker | Japan Travel Kit</title>
        <meta
          name="description"
          content="Every Japan eSIM plan from Airalo, Holafly, eSIM Go and Sakura Mobile in one table — prices checked daily, sortable by price per GB, plus a tool that picks the cheapest plan for your trip."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-data-plans" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Japan eSIM Data Plans 2026: Live Price Tracker | Japan Travel Kit" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-data-plans" />
        <meta property="og:description" content="Every Japan eSIM plan from Airalo, Holafly, eSIM Go and Sakura Mobile in one table — prices checked daily, sortable by price per GB, plus a tool that picks the cheapest plan for your trip." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan eSIM Data Plans 2026: Live Price Tracker | Japan Travel Kit" />
        <meta name="twitter:description" content="Every Japan eSIM plan from Airalo, Holafly, eSIM Go and Sakura Mobile in one table — prices checked daily, sortable by price per GB, plus a tool that picks the cheapest plan for your trip." />
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
              headline: "Japan eSIM Data Plans Compared (2026): Live Price Tracker",
              dateModified: checkedIso,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://www.japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "Japan eSIM Data Plans", item: "https://www.japan-travel-kit.com/guides/esim/japan-esim-data-plans" },
              ],
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM &amp; SIM Cards</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Japan eSIM Data Plans</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📱</span> Prices checked {checkedLabel}
          </p>
          <h1 className={styles.heroTitle}>
            Japan eSIM Data Plans (2026):<br />Live Price Tracker
          </h1>
          <p className={styles.heroSubtitle}>
            Every Japan plan from Airalo, Holafly, eSIM Go and Sakura Mobile in one sortable table — with a tool that
            picks the cheapest plan for your exact trip.
          </p>
          <div className={styles.heroBadges}>
            <span className={`${tools.liveBadge} ${tools.liveBadgeOnDark}`}>
              <span className={tools.liveDot} /> Prices checked daily
            </span>
            {[`${allEsimPlans.length} plans tracked`, "4 providers", "Sortable by $/GB"].map((t) => (
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
            This doesn&apos;t affect our rankings or comparisons — the table is sorted by the numbers, not by commission.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer · {checkedLabel}</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest plan</p>
                <p className={styles.verdictStatValue}>{label(cheapestOverall)}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best value per GB</p>
                <p className={styles.verdictStatValue}>
                  {bestValue ? `${bestValue.provider} ${bestValue.name} — ${formatUsd(bestValue.perGb ?? 0)}/GB` : "—"}
                </p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest unlimited (7+ days)</p>
                <p className={styles.verdictStatValue}>{label(cheapestUnlimitedAny)}</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Most travellers should buy:</strong> {cheapest5gb ? label(cheapest5gb) : "a 5 GB plan"} — 5 GB covers two weeks of
              maps, messaging and social media. Need a Japanese phone number or English phone support? Sakura Mobile is the
              only provider here that offers both.
            </p>
            <a href="#plan-finder" className={styles.verdictBtn}>
              Find my cheapest plan ↓
            </a>
          </div>
        </div>

        {/* Plan finder */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Step 1</span>
          <h2 className={styles.sectionTitle}>Tell Us Your Trip — We&apos;ll Pick the Plan</h2>
          <EsimPlanFinder />
        </section>

        {/* Full sortable comparison */}
        <section className={styles.comparisonSection} id="all-plans">
          <span className={styles.sectionLabel}>Step 2</span>
          <h2 className={styles.sectionTitle} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
            Every Japan eSIM Plan, Sorted by Price per GB
            <span className={tools.liveBadge}>
              <span className={tools.liveDot} /> Prices checked daily
            </span>
          </h2>
          <p className={styles.bodyText}>
            Click any column header to re-sort. Unlimited plans have no per-GB price, so they sit at the bottom when
            sorting by data or $/GB — sort by <strong>Price</strong> or <strong>Validity</strong> to compare them directly.
          </p>
          <EsimPlanTable />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Prices in USD as listed on each provider&apos;s official site, checked automatically every day. All plans are data-only.
            Sakura Mobile&apos;s 3 GB/day plans are shown with their total high-speed allowance (3 GB × days). Prices at
            checkout can differ slightly due to your local currency or promotions.
          </p>
        </section>

        {/* Price update status */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Freshness</span>
          <h2 className={styles.sectionTitle}>When Was Each Price Last Verified?</h2>
          <p className={styles.bodyText}>
            A script reads each provider&apos;s official pricing page once a day. If a page can&apos;t be read, we keep the last
            verified numbers rather than guessing — so the &ldquo;checked&rdquo; date below tells you exactly how fresh each row is.
          </p>
          <EsimPriceStatus />
        </section>

        {/* Provider snapshot */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By provider</span>
          <h2 className={styles.sectionTitle}>Provider Snapshot</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Provider", "Network", "Cheapest plan", "Best $/GB", "Cheapest unlimited", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {providerSummaries.map((p) => (
                    <tr key={p.id}>
                      <td className={styles.tdProvider}>{p.name}</td>
                      <td className={styles.tdNetwork}>{p.network}</td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        {p.cheapestCapped ? (
                          <>
                            <span className={styles.tdPrice}>{formatUsd(p.cheapestCapped.priceUsd)}</span>{" "}
                            <span className={tools.tdMuted}>{p.cheapestCapped.name}</span>
                          </>
                        ) : (
                          <span className={tools.tdMuted}>unlimited only</span>
                        )}
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        {p.perGbBest ? (
                          <>
                            <span className={styles.tdPrice}>{formatUsd(p.perGbBest.priceUsd / (p.perGbBest.gb ?? 1))}/GB</span>{" "}
                            <span className={tools.tdMuted}>{p.perGbBest.name}</span>
                          </>
                        ) : (
                          <span className={tools.tdMuted}>—</span>
                        )}
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        {p.cheapestUnl ? (
                          <>
                            <span className={styles.tdPrice}>{formatUsd(p.cheapestUnl.priceUsd)}</span>{" "}
                            <span className={tools.tdMuted}>{p.cheapestUnl.name}</span>
                          </>
                        ) : (
                          <span className={tools.tdMuted}>—</span>
                        )}
                      </td>
                      <td>
                        <ProviderCta providerId={p.id} label={`Get ${p.name} →`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* How Much Data */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Data guide</span>
          <h2 className={styles.sectionTitle}>How Much Data Do You Need?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Estimated Per Day</th>
                  </tr>
                </thead>
                <tbody>
                  {dataUsage.map((row) => (
                    <tr key={row.activity} style={row.activity.includes("total") ? { fontWeight: 700, background: "#f8fafc" } : {}}>
                      <td className={styles.tdProvider}>{row.activity}</td>
                      <td className={styles.tdPrice}>{row.perDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Most travellers to Japan fall into the &ldquo;light&rdquo; or &ldquo;average&rdquo; category — maps, messaging, and
            Instagram. At ~300–700 MB/day, a 5 GB plan covers one to two weeks comfortably. If you stream video on trains, make
            regular video calls, or tether a laptop, budget 1–1.5 GB per day or go unlimited.
          </p>
        </section>

        {/* By Trip Length — derived from live data */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>By trip length</span>
          <h2 className={styles.sectionTitle}>Best Plan by Trip Length (Average User)</h2>
          <div className={styles.stepsList}>
            {byTripLength.map((row, i) => (
              <div key={row.days} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>
                    {row.days} days (~{row.gb} GB) → {row.pick ? `${row.pick.provider} ${row.pick.name} at ${formatUsd(row.pick.priceUsd)}` : "no single plan"}
                  </p>
                  <p className={styles.stepDesc}>
                    {row.pick
                      ? `Cheapest plan that covers ${row.days} days with at least ${row.gb} GB.`
                      : `No single plan currently covers ${row.days} days at this usage — buy a 30-day plan and top up.`}{" "}
                    {row.unlimited && `Prefer unlimited? ${row.unlimited.provider} ${row.unlimited.name} is ${formatUsd(row.unlimited.priceUsd)}.`}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Based on ~0.7 GB/day. Use the finder at the top of the page to change the trip length or usage level.
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

        {/* Related */}
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
            <Link href="/guides/esim/cheapest-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cheapest eSIM for Japan 2026: Best Budget Picks</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-unlimited" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
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
          </div>
        </section>
      </div>
    </>
  );
}
