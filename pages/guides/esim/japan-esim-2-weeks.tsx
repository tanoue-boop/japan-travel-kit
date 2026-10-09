import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import {
  allEsimPlans,
  findPlansForTrip,
  formatUsd,
  getProvider,
  pricesCheckedLabel,
  unlimitedFromLabel,
  type EsimPlanRow,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";

// Prices and affiliate links come from data/esim-prices.json (refreshed daily).
const link = (id: EsimProviderId) => getProvider(id).affiliateUrl;
const pricesCheckedAt = pricesCheckedLabel();

// Holafly runs no affiliate programme we can join (impact: Airalo only — checked 9 Oct 2026),
// so its purchase CTA points at Airalo's unlimited plans, the closest approved alternative.
const HOLAFLY_ALT_LABEL = "Get Airalo unlimited eSIM →";
const HOLAFLY_ALT_NOTE = "Holafly is not available through our links — Airalo is our recommended alternative.";

// A 14-day trip is awkward because most providers jump 7 → 15 → 30 days: the plan that
// fits on data may expire on day 7. Everything below is derived from the live catalogue
// so the recommendation can never outlive the plan it names.
const TRIP_DAYS = 14;
const TARGET_GB = 10;
const fitsTrip = findPlansForTrip(TRIP_DAYS, TARGET_GB);
const pick = (id: EsimProviderId): EsimPlanRow | undefined => fitsTrip.find((p) => p.providerId === id && !p.unlimited);
const bestValue = fitsTrip.find((p) => !p.unlimited);
const airaloPick = pick("airalo");
const esimgoPick = pick("esimgo");
const sakuraPick = pick("sakura");
/** Plans with enough data for the trip but too short a validity — the trap this page exists to flag. */
const tooShort = allEsimPlans.filter((p) => !p.unlimited && (p.gb ?? 0) >= TARGET_GB && p.days < TRIP_DAYS).length;
const planLabel = (p?: EsimPlanRow) => (p ? `${p.name} — ${formatUsd(p.priceUsd)}` : "—");

const dataTable = [
  { usageType: "Light",             perDay: "~300MB", total: "~4.2GB"  },
  { usageType: "Moderate",          perDay: "~600MB", total: "~8.4GB"  },
  { usageType: "Heavy (streaming)", perDay: "~1GB+",  total: "~14GB+"  },
];

const faqItems = [
  {
    q: "How much data do I need for 2 weeks in Japan?",
    a: "For light use — Maps, messaging, occasional browsing — you'll need around 4–5GB for 14 days. Moderate users who post regularly to social media and browse throughout the day should budget 7–9GB. Heavy users who stream video or share hotspots daily may need 14GB+ or an unlimited plan.",
  },
  {
    q: "Is 10GB enough for 2 weeks in Japan?",
    a: "Yes, for the majority of travellers. Most tourists on a 2-week trip use under 8–9GB even with active social media use. 10GB provides a comfortable buffer without overpaying. If you download offline maps and use hotel WiFi for streaming, you may finish with data to spare.",
  },
  {
    q: "What is the best eSIM for a 2-week Japan trip?",
    a: `${planLabel(bestValue)} from ${bestValue?.provider ?? "eSIM Go"} is the cheapest plan that carries ${TARGET_GB} GB past day 14 without expiring. Airalo's equivalent is ${planLabel(airaloPick)}, which costs more but adds 24/7 live chat. Check the validity, not just the allowance: ${tooShort} plans in the current catalogue have 10 GB or more but run out before a 14-day trip ends.`,
  },
  {
    q: "Should I get unlimited data for 2 weeks in Japan?",
    a: `Only if you genuinely use more than ${TARGET_GB} GB. An unlimited plan long enough for the trip runs ${unlimitedFromLabel("esimgo", TRIP_DAYS)} on eSIM Go or ${unlimitedFromLabel("holafly", TRIP_DAYS)} on Holafly, against ${planLabel(bestValue)} for a capped plan that covers most itineraries. Unlimited is for remote workers, constant streamers, and anyone sharing a hotspot all day.`,
  },
  {
    q: "Can I use Sakura Mobile as an eSIM for 2 weeks?",
    a: `Yes, and it is the only option here with a voice-call plan and English phone support — useful if a booking system needs to SMS a Japanese number. The eSIM that covers a 14-day trip is ${planLabel(sakuraPick)}, allowing 3 GB/day of high-speed data before it throttles. It costs considerably more than the data-only alternatives, so only choose it if you need the phone number or the support.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/japan-esim-2-weeks") } });

export default function JapanEsim2WeeksPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Best Japan eSIM for 2 Weeks 2026: 14-Day Trip Picks | Japan Travel Kit</title>
        <meta
          name="description"
          content="Visiting Japan for 2 weeks? Most travellers need 5–10GB. We compare the best eSIM plans for a 14-day trip — with data estimates and honest recommendations."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-2-weeks" />
        <meta property="og:title" content="Best Japan eSIM for 2 Weeks 2026: 14-Day Trip Picks | Japan Travel Kit" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-2-weeks" />
        <meta property="og:description" content="Visiting Japan for 2 weeks? Most travellers need 5–10GB. We compare the best eSIM plans for a 14-day trip — with data estimates and honest recommendations." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Japan eSIM for 2 Weeks 2026: 14-Day Trip Picks | Japan Travel Kit" />
        <meta name="twitter:description" content="Visiting Japan for 2 weeks? Most travellers need 5–10GB. We compare the best eSIM plans for a 14-day trip — with data estimates and honest recommendations." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://www.japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "Best Japan eSIM for 2 Weeks", item: "https://www.japan-travel-kit.com/guides/esim/japan-esim-2-weeks" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Best Japan eSIM for 2 Weeks (2026): Top Picks for Longer Stays",
              dateModified: updated.iso,
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
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
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
          <span className={styles.breadCurrent}>Best Japan eSIM for 2 Weeks</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📱</span> Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Best Japan eSIM for 2 Weeks (2026):<br />Top Picks for Longer Stays
          </h1>
          <p className={styles.heroSubtitle}>
            The catch on a 14-day trip isn&apos;t how much data you buy —
            it&apos;s how many days the plan stays valid.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Validity checked, not just GB", "14-day plans only"].map((t) => (
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
            <span className={styles.verdictLabel}>Quick Answer</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>2-Week Trips</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              Japan eSIMs are sold in 3, 5, 7, 15 and 30-day blocks — almost nobody sells a
              14-day plan. So the usual mistake on a two-week trip is buying on allowance alone
              and landing on a plan that <strong>expires on day 7 with data still on it</strong>:{" "}
              {tooShort} plans in the current catalogue hold {TARGET_GB} GB or more but run out
              before day 14. Filter for validity first, and the cheapest plan that actually lasts
              the trip is <strong>{bestValue?.provider} {planLabel(bestValue)}</strong>. Prices
              checked {pricesCheckedAt}.
            </p>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest that lasts 14 days</p>
                <p className={styles.verdictStatValue}>{bestValue?.provider} {planLabel(bestValue)}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Same data, better support</p>
                <p className={styles.verdictStatValue}>Airalo {planLabel(airaloPick)}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Unlimited, long enough</p>
                <p className={styles.verdictStatValue}>from {unlimitedFromLabel("esimgo", TRIP_DAYS)}</p>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", marginTop: "0.75rem", marginBottom: "1rem" }}>
              <strong style={{ color: "#fbbf24" }}>Data needed:</strong> 5GB–15GB for 2 weeks (most travellers: 10GB is enough)
            </p>
            <div className={styles.pickCtaRow}>
              <a
                href={link("esimgo")}
                className={styles.verdictBtn}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Get eSIM Go {esimgoPick?.name ?? "10 GB"} →
              </a>
              <a
                href={link("airalo")}
                className={styles.pickCtaInternal}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Get Airalo {airaloPick?.name ?? "10 GB"} →
              </a>
            </div>
          </div>
        </div>

        {/* Plans that actually last 14 days */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Validity filter</span>
          <h2 className={styles.sectionTitle}>Every Plan That Covers a Full 14 Days</h2>
          <p className={styles.bodyText}>
            This is the whole catalogue filtered down to plans with at least {TARGET_GB} GB of
            usable data <em>and</em> at least {TRIP_DAYS} days of validity, cheapest first. Daily-capped
            plans are measured on what you can actually use across 14 days, not the headline total.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Plan</th>
                    <th>Valid</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {fitsTrip.slice(0, 8).map((p) => (
                    <tr key={p.id}>
                      <td className={styles.tdProvider}>{p.provider}</td>
                      <td>{p.unlimited ? "Unlimited" : `${p.gb} GB`}</td>
                      <td className={styles.tdNetwork}>{p.days} days</td>
                      <td className={styles.tdPrice}>{formatUsd(p.priceUsd)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Read straight from our daily price feed, checked {pricesCheckedAt}. For the unfiltered
            list of every plan sorted by price per GB, see{" "}
            <Link href="/guides/esim/japan-esim-data-plans" style={{ color: "#1d4ed8", fontWeight: 600 }}>
              Japan eSIM data plans compared
            </Link>.
          </p>
        </section>

        {/* How Much Data */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Data Guide</span>
          <h2 className={styles.sectionTitle}>How Much Data Do You Need for 2 Weeks?</h2>
          <p className={styles.bodyText}>
            Two weeks in Japan gives you time to explore well beyond the Golden Route — but data
            needs are still manageable. Here&apos;s how usage breaks down by travel style:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Usage Type</th>
                    <th>Per Day</th>
                    <th>14 Days Total</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTable.map((row) => (
                    <tr key={row.usageType}>
                      <td className={styles.ftFeature}>{row.usageType}</td>
                      <td className={styles.ftEsim}>{row.perDay}</td>
                      <td className={styles.ftSim} style={{ fontWeight: 700 }}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Conclusion:</strong> A 10GB plan is enough for the vast majority of 2-week
            travellers — even those who use social media actively. Only daily video streaming
            pushes you above 10GB. Download offline maps, use hotel WiFi for uploads, and
            10GB will see you through.
          </p>
        </section>

        {/* 2-Week Itinerary */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Itinerary Guide</span>
          <h2 className={styles.sectionTitle}>Typical 2-Week Japan Itinerary &amp; Data Use</h2>
          <p className={styles.bodyText}>
            Two weeks allows you to cover all the major destinations plus some off-the-beaten-path
            highlights. Data usage is highest on travel days when you&apos;re navigating between cities.
          </p>

          <div style={{ marginTop: "1.25rem" }}>
            <p style={{ fontWeight: 700, color: "#0d1b4b", marginBottom: "0.5rem" }}>Week 1</p>
            <ul className={styles.pickList} style={{ marginBottom: "1.25rem" }}>
              <li><span className={styles.proIcon}>▸</span> <strong>Days 1–3:</strong> Tokyo — arrival, exploration, heavy map use (~900MB)</li>
              <li><span className={styles.proIcon}>▸</span> <strong>Day 4 (Nikko or Hakone):</strong> Day trip from Tokyo, moderate navigation (~300MB)</li>
              <li><span className={styles.proIcon}>▸</span> <strong>Day 5:</strong> Shinkansen to Kyoto — train WiFi available (~200MB)</li>
              <li><span className={styles.proIcon}>▸</span> <strong>Days 6–7:</strong> Kyoto — temple visits, maps, social posts (~600MB)</li>
            </ul>

            <p style={{ fontWeight: 700, color: "#0d1b4b", marginBottom: "0.5rem" }}>Week 2</p>
            <ul className={styles.pickList} style={{ marginBottom: "1.25rem" }}>
              <li><span className={styles.proIcon}>▸</span> <strong>Days 8–9:</strong> Osaka — active city use, food navigation (~600MB)</li>
              <li><span className={styles.proIcon}>▸</span> <strong>Day 10:</strong> Hiroshima day trip — Shinkansen + city maps (~300MB)</li>
              <li><span className={styles.proIcon}>▸</span> <strong>Days 11–12:</strong> Fukuoka — new city, heavy first-day map use (~500MB)</li>
              <li><span className={styles.proIcon}>▸</span> <strong>Days 13–14:</strong> Return journey &amp; departure — light use (~300MB)</li>
            </ul>
          </div>

          <p className={styles.bodyText}>
            Total estimated: approximately <strong>3.7GB</strong> for moderate use across the full
            14-day itinerary. A 10GB plan gives you generous headroom — including for social media,
            extra browsing, and unexpected navigation needs.
          </p>
          <p className={styles.bodyText}>
            <strong>Note:</strong> Data usage is heaviest on arrival days and travel days between
            cities — when you&apos;re navigating unfamiliar streets without the benefit of offline maps.
          </p>
        </section>

        {/* Best eSIMs for 2 Weeks */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Top Picks</span>
          <h2 className={styles.sectionTitle}>Best eSIMs for a 2-Week Japan Trip</h2>

          {/* eSIM Go */}
          <div className={styles.choiceGrid} style={{ marginBottom: "1.5rem" }}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderEsim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>1. eSIM Go {esimgoPick?.name ?? "10 GB"} – Best Value</p>
                  <p className={styles.choiceCardSubtitle}>
                    {esimgoPick ? formatUsd(esimgoPick.priceUsd) : "—"} · {getProvider("esimgo").network}
                  </p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Cheapest plan that outlasts a 14-day trip</li>
                  <li><span className={styles.choiceCheck}>✓</span> Docomo — Japan&apos;s widest rural coverage</li>
                  <li><span className={styles.choiceCheck}>✓</span> {esimgoPick?.days ?? 30}-day validity, so no day-7 cliff</li>
                  <li><span className={styles.conIcon}>−</span> Email-only support (no live chat)</li>
                  <li><span className={styles.conIcon}>−</span> No in-app top-up if you run dry</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            The value pick, and for the right reason: at {esimgoPick ? formatUsd(esimgoPick.priceUsd) : "—"} it
            is the cheapest plan in the whole catalogue that still has {TARGET_GB} GB and{" "}
            {esimgoPick?.days ?? 30} days of validity — comfortably past the day you fly home.
          </p>
          <a
            href={link("esimgo")}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.75rem", marginBottom: "2rem", display: "inline-flex" }}
          >
            Get eSIM Go {esimgoPick?.name ?? "10 GB"} →
          </a>

          {/* Airalo */}
          <div className={styles.choiceGrid} style={{ marginBottom: "1.5rem" }}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderSim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>2. Airalo {airaloPick?.name ?? "10 GB"} – Best Support</p>
                  <p className={styles.choiceCardSubtitle}>
                    {airaloPick ? formatUsd(airaloPick.priceUsd) : "—"} · {getProvider("airalo").network}
                  </p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> 24/7 live chat support from anywhere in Japan</li>
                  <li><span className={styles.choiceCheck}>✓</span> In-app top-up if you misjudge the fortnight</li>
                  <li><span className={styles.choiceCheck}>✓</span> {airaloPick?.days ?? 15}-day validity covers the trip</li>
                  <li><span className={styles.conIcon}>−</span> Dearer than eSIM Go for the same {TARGET_GB} GB</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            {airaloPick && esimgoPick
              ? `Airalo asks ${formatUsd(airaloPick.priceUsd - esimgoPick.priceUsd)} more for the same ${TARGET_GB} GB.`
              : `Airalo asks a little more for the same ${TARGET_GB} GB.`}{" "}
            On a fortnight-long trip that premium buys two things worth having: 24/7 live chat if
            the profile misbehaves in week two, and in-app top-up so a bad estimate costs you a
            few dollars rather than a whole second plan.
          </p>
          <a
            href={link("airalo")}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.75rem", marginBottom: "2rem", display: "inline-flex" }}
          >
            Get Airalo {airaloPick?.name ?? "10 GB"} →
          </a>

          {/* Holafly */}
          <div className={styles.choiceGrid} style={{ marginBottom: "1.5rem" }}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader}`} style={{ background: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)" }}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>3. Unlimited – For Heavy Users</p>
                  <p className={styles.choiceCardSubtitle}>
                    from {unlimitedFromLabel("esimgo", TRIP_DAYS)} · 15 days or longer
                  </p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Nothing to monitor across a long trip</li>
                  <li><span className={styles.choiceCheck}>✓</span> Best for remote workers and content creators</li>
                  <li><span className={styles.conIcon}>−</span> Several times the price of a capped plan</li>
                  <li><span className={styles.conIcon}>−</span> None is truly unmetered — see the plan notes</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            Unlimited plans long enough for a fortnight start at{" "}
            {unlimitedFromLabel("esimgo", TRIP_DAYS)} on eSIM Go,{" "}
            {unlimitedFromLabel("airalo", TRIP_DAYS)} on Airalo and{" "}
            {unlimitedFromLabel("holafly", TRIP_DAYS)} on Holafly — against{" "}
            {planLabel(bestValue)} for a capped plan. None of them is genuinely unmetered either:
            eSIM Go throttles after a daily high-speed allowance, Holafly caps hotspot use at
            1 GB/day, and Airalo applies a fair-use policy. Worth it for remote workers who video
            call all day or anyone tethering constantly; rarely worth it otherwise.
          </p>
          <a
            href={link("airalo")}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
            style={{ marginTop: "0.75rem", display: "inline-flex" }}
          >
            {HOLAFLY_ALT_LABEL}
          </a>
          <p style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: "0.6rem", marginBottom: "2rem", lineHeight: 1.6 }}>
            {HOLAFLY_ALT_NOTE}
          </p>

          {/* Sakura Mobile */}
          <div className={styles.choiceGrid} style={{ marginBottom: "1.5rem" }}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader}`} style={{ background: "linear-gradient(135deg, #be185d 0%, #9d174d 100%)" }}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>4. Sakura Mobile – Need Voice Calls</p>
                  <p className={styles.choiceCardSubtitle}>
                    eSIM {planLabel(sakuraPick)} · voice on their physical SIM
                  </p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Only tourist SIM with real voice call support</li>
                  <li><span className={styles.choiceCheck}>✓</span> Japanese phone number included</li>
                  <li><span className={styles.choiceCheck}>✓</span> English-speaking customer support</li>
                  <li><span className={styles.conIcon}>−</span> More expensive than data-only eSIMs</li>
                  <li><span className={styles.conIcon}>−</span> Requires advance ordering and SIM delivery</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            Sakura Mobile is the right choice if you need a real Japanese phone number — for hotel
            SMS verification, local taxi apps, or making calls. It&apos;s the only tourist-friendly SIM
            with voice support and English customer service. That said, it&apos;s not necessary for most visitors.
          </p>
          <a
            href={link("sakura")}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.75rem", marginBottom: "0.5rem", display: "inline-flex" }}
          >
            Get Sakura Mobile →
          </a>
        </section>

        {/* Physical SIM consideration */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>SIM vs eSIM</span>
          <h2 className={styles.sectionTitle}>Should I Consider a Physical SIM for 2 Weeks?</h2>
          <p className={styles.bodyText}>
            For most 2-week visitors, an eSIM is the better choice. But here are the scenarios
            where a physical SIM makes sense:
          </p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Voice calls needed</p>
              <p className={styles.whoForDesc}>
                If you need a real Japanese phone number for calls or SMS, Sakura Mobile&apos;s
                physical SIM or eSIM is your only tourist-friendly option.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>No eSIM-compatible phone</p>
              <p className={styles.whoForDesc}>
                Older smartphones (pre-2018) don&apos;t support eSIM. In this case, a physical SIM
                card from Sakura Mobile or a Japanese airport SIM is the only option.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Staying 1 month or more</p>
              <p className={styles.whoForDesc}>
                For stays over one month, consider Japan&apos;s domestic MVNO SIMs — IIJmio or
                Rakuten Mobile — which offer better long-term rates than tourist eSIMs.
              </p>
            </div>
          </div>
        </section>

        {/* Data saving tips */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Travel Tips</span>
          <h2 className={styles.sectionTitle}>Data Saving Tips for 2-Week Trips</h2>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Offline maps first</p>
              <p className={styles.whoForDesc}>
                Download Google Maps for every city before you visit. Offline navigation
                uses zero data — one of the biggest data savings on a 14-day trip.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M3 9h18" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>WiFi for video streaming</p>
              <p className={styles.whoForDesc}>
                Watch Netflix and YouTube only over hotel WiFi. Streaming consumes 1GB+
                per hour — the biggest single data drain on any trip.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Konbini WiFi as backup</p>
              <p className={styles.whoForDesc}>
                7-Eleven, Lawson, and FamilyMart all offer free WiFi. It comes in handy for quick
                tasks when you want to conserve your eSIM data on busy days.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M3 9h18" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Batch your social posts</p>
              <p className={styles.whoForDesc}>
                Write captions and queue photos during the day, then post everything over
                hotel WiFi in the evening. Reduces social media data use significantly.
              </p>
            </div>
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

        {/* Related Articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related Guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/esim/japan-esim-data-plans" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan eSIM Data Plans Compared: Every Plan by Price per GB</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-unlimited" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Unlimited eSIM for Japan (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/sakura-mobile-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sakura Mobile Review 2026: Best SIM for Long Stays?</p>
                <span className={styles.relatedArrow}>Read review →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Compared</p>
                <span className={styles.relatedArrow}>View comparison →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-students" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan for Students (2026): Budget Picks</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Ready to get connected in Japan?</h2>
            <p className={styles.ctaBannerDesc}>
              Compare all Japan eSIM options — Airalo, Holafly, eSIM Go, and Sakura Mobile —
              on price, coverage, and features.
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
