import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import {
  getProvider,
  priceFrom,
  priceFromLabel,
  pricesCheckedLabel,
  siteCheapestFrom,
  unlimitedFromLabel,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";

// Prices and affiliate links come from data/esim-prices.json (refreshed daily).
const link = (id: EsimProviderId) => getProvider(id).affiliateUrl;
const pricesCheckedAt = pricesCheckedLabel();
const ESIM_FROM = siteCheapestFrom();

// Holafly runs no affiliate programme we can join (impact: Airalo only — checked 9 Oct 2026),
// so its purchase CTA points at Airalo's unlimited plans, the closest approved alternative.
const HOLAFLY_ALT_LABEL = "Get Airalo unlimited eSIM →";
const HOLAFLY_ALT_NOTE = "Holafly is not available through our links — Airalo is our recommended alternative.";

const comparisonRows = [
  { feature: "Setup", esim: "QR code — install before you fly", physicalSim: "At airport kiosk or mail delivery" },
  { feature: "Installation", esim: "Digital, no physical card", physicalSim: "Insert physical SIM card" },
  { feature: "Phone requirement", esim: "eSIM-compatible device only", physicalSim: "Any unlocked phone" },
  { feature: "Voice calls", esim: "Data-only (every Japan eSIM)", physicalSim: "Available (Sakura Mobile)" },
  { feature: "Japanese phone number", esim: "No", physicalSim: "Yes" },
  { feature: "Price", esim: `From ${ESIM_FROM}`, physicalSim: "From ~¥3,000 (~$20)" },
  { feature: "Best for", esim: "Short trips (1 day – 1 month)", physicalSim: "Long stays (1 month+) or voice needs" },
];

const esimPros = [
  "Instant setup — install before you fly",
  "No physical card to lose or swap",
  "Cheaper for short trips",
  "Keep your home SIM active in the other slot",
  "Works in 190+ countries with multi-country plans",
];

const esimCons = [
  "Requires an eSIM-compatible device",
  "Data-only on most Japan plans (no voice)",
  "Less English support on some providers",
];

const simPros = [
  "Works on any unlocked phone",
  "Voice calls and SMS available",
  "English customer support (Sakura Mobile)",
  "Better value for stays of 1 month or longer",
  "No need to check device compatibility",
];

const simCons = [
  "Must pick up at airport or wait for delivery",
  "More expensive than eSIM for short trips",
  "Physical card can be lost or damaged",
  "Must swap your home SIM out",
];

const esimPicks = [
  {
    rank: 1,
    badge: "Best Overall eSIM",
    badgeClass: "pickBadgeBlue" as const,
    name: "Airalo",
    summary:
      `Our top pick on the eSIM side: plans from ${priceFromLabel("airalo")} on ${getProvider("airalo").network}, instant QR activation, and the only iOS app here that installs the profile for you. Data-only, like every Japan eSIM.`,
    bestFor: "Most travellers visiting for 1 week to 1 month",
    pros: [`Prices from ${priceFrom("airalo")}`, "iOS app installs the profile for you", "24/7 live chat support"],
    cons: ["Data-only — no Japanese number", "Dearer than eSIM Go per GB"],
    href: link("airalo"),
    cta: "Get Airalo Japan eSIM →",
  },
  {
    rank: 2,
    badge: "Best Budget eSIM",
    badgeClass: "pickBadgeGreen" as const,
    name: "eSIM Go",
    summary:
      `The cheapest Japan eSIM, from ${priceFromLabel("esimgo")} on ${getProvider("esimgo").network} — the network with the broadest rural reach, which is unusual at this price. Sold to consumers under the Breeze brand.`,
    bestFor: "Budget travellers on short trips (1–14 days)",
    pros: [`Cheapest entry price at ${priceFrom("esimgo")}`, "Docomo — widest rural coverage", "Simple QR setup"],
    cons: ["Less well-known brand", "Data-only — no Japanese number", "Email-only support"],
    href: link("esimgo"),
    cta: "Get eSIM Go Japan →",
  },
  {
    rank: 3,
    badge: "Best Unlimited eSIM",
    badgeClass: "pickBadgeOrange" as const,
    name: "Holafly",
    summary:
      `Unlimited on-device data from ${unlimitedFromLabel("holafly")}, with nothing to monitor mid-trip. Worth knowing that Airalo (${unlimitedFromLabel("airalo")}) and eSIM Go (${unlimitedFromLabel("esimgo")}) now sell unlimited Japan plans too, and for less.`,
    bestFor: "Heavy data users, streamers, long itineraries",
    pros: ["Unlimited on-device data", "No overage worries", "Plain QR install on any eSIM phone"],
    cons: ["Dearest unlimited of the four", "Hotspot capped at 1 GB/day", "Data-only — no Japanese number"],
    href: link("airalo"),
    cta: HOLAFLY_ALT_LABEL,
    ctaNote: HOLAFLY_ALT_NOTE,
  },
];

const simPick = {
  rank: 1,
  badge: "Best Physical SIM",
  badgeClass: "pickBadgeBlue" as const,
  name: "Sakura Mobile",
  summary:
    "Sakura Mobile is the only Japan tourist SIM with genuine English-speaking customer support, voice calls, and flexible plans designed for both short and long stays. Runs on Docomo — Japan's most extensive network.",
  bestFor: "Longer stays, travellers who need voice calls, those wanting English support",
  pros: [
    "Voice calls & SMS included",
    "English-speaking support team",
    "Docomo network — best rural coverage",
    "Flexible plan lengths",
  ],
  cons: [
    "More expensive than eSIM for short stays",
    "Requires airport pickup or delivery",
    "Need to swap your home SIM",
  ],
  href: link("sakura"),
  cta: "Get Sakura Mobile SIM →",
};

const scenarios = [
  { trip: "1 week or under", recommendation: "eSIM", reason: `A physical SIM cannot compete at ${priceFrom("esimgo")} — and there is nothing to collect on arrival` },
  { trip: "2–4 weeks", recommendation: "eSIM", reason: "Still cheaper, and 15- or 30-day plans cover the trip without a kiosk visit" },
  { trip: "1 month or more", recommendation: "Physical SIM", reason: "Per-day rates flip in the SIM's favour, and voice is bundled rather than impossible" },
  { trip: "Voice calls needed", recommendation: "Physical SIM", reason: "No Japan eSIM sells voice — this is the one requirement eSIM cannot meet at any price" },
  { trip: "Phone made before 2018", recommendation: "Physical SIM", reason: "No eSIM hardware, so the comparison does not apply — any unlocked phone takes a SIM" },
  { trip: "Group of 3+", recommendation: "Neither — Pocket WiFi", reason: "One shared router beats buying either a SIM or an eSIM per person" },
];

const faqItems = [
  {
    q: "Is eSIM better than a SIM card for Japan?",
    a: "For most tourists visiting Japan for 1–30 days, an eSIM is the better choice. It is cheaper, faster to set up, and requires no visit to an airport kiosk. The main limitation is that most Japan eSIMs are data-only — if you need voice calls or SMS, a physical SIM (Sakura Mobile) is the better option. eSIM also requires a compatible device — most smartphones made after 2018 and most current-generation tablets qualify.",
  },
  {
    q: "Can I get a physical SIM at Japan airports?",
    a: "Yes. Physical SIM cards and eSIM QR codes are available at vending machines and kiosks in most major Japanese airports, including Narita, Haneda, Kansai, and Chubu. However, airport prices are typically higher than when you pre-order online. Pre-ordering from Sakura Mobile before you fly is usually cheaper and avoids any queue time on arrival.",
  },
  {
    q: "Which is cheaper, eSIM or physical SIM for Japan?",
    a: `eSIMs are significantly cheaper for short trips. Japan eSIM plans start at ${ESIM_FROM}, while a physical tourist SIM typically starts around ¥3,000–¥4,000 (~$20–$27) for a basic plan. For stays of 1 month or longer the gap narrows and a physical SIM can offer better per-day value — with voice capability included, which no Japan eSIM offers at any price.`,
  },
  {
    q: "Do I need to be in Japan to activate a physical SIM?",
    a: "Generally, yes — a Japan SIM card must be inserted and activated in Japan. However, Sakura Mobile ships SIMs internationally, so you receive the card before you travel and insert it when you land. Some providers also offer pre-activated eSIM QR codes that you scan before departure and activate on arrival.",
  },
  {
    q: "What happens if my eSIM doesn't work in Japan?",
    a: "First, ensure the eSIM profile is toggled on in your phone's settings and that your device is not in airplane mode. If you still have no signal, check that the eSIM is set as the primary data line. Contact your eSIM provider's support — Airalo, Holafly, and eSIM Go all offer online support. As a backup, 7-Eleven convenience stores in Japan sell physical SIM cards at reasonable prices.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/japan-sim-card-vs-esim-2026") } });

export default function JapanSimCardVsEsim2026Page({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Japan SIM Card vs eSIM 2026: Which Is Better? | Japan Travel Kit</title>
        <meta
          name="description"
          content="SIM card or eSIM for Japan in 2026? We compare setup, price, coverage and voice calls across Airalo, eSIM Go, Holafly and Sakura Mobile to help you decide."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-sim-card-vs-esim-2026" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Japan SIM Card vs eSIM 2026: Which Is Better? | Japan Travel Kit" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-sim-card-vs-esim-2026" />
        <meta property="og:description" content="SIM card or eSIM for Japan in 2026? We compare setup, price, coverage and voice calls across Airalo, eSIM Go, Holafly and Sakura Mobile to help you decide." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan SIM Card vs eSIM 2026: Which Is Better? | Japan Travel Kit" />
        <meta name="twitter:description" content="SIM card or eSIM for Japan in 2026? We compare setup, price, coverage and voice calls across Airalo, eSIM Go, Holafly and Sakura Mobile to help you decide." />
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
              headline: "Japan SIM Card vs eSIM (2026): Which Should You Choose?",
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
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://www.japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "SIM Card vs eSIM", item: "https://www.japan-travel-kit.com/guides/esim/japan-sim-card-vs-esim-2026" },
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
          <span className={styles.breadCurrent}>SIM Card vs eSIM</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📶</span> Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Japan SIM Card vs eSIM (2026):<br />Which Should You Choose?
          </h1>
          <p className={styles.heroSubtitle}>
            eSIM for almost everyone — unless you need a Japanese phone number,
            or your handset cannot take one. Those are the only two real reasons.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Full Comparison", "Live 2026 prices"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Affiliate Disclosure */}
        <div className={styles.disclosure}>
          <span className={styles.disclosureIcon}>ℹ️</span>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our comparisons or recommendations.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>For most travellers</p>
                <p className={styles.verdictStatValue}>eSIM (Airalo or eSIM Go)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Need voice calls?</p>
                <p className={styles.verdictStatValue}>Physical SIM (Sakura Mobile)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Older phone?</p>
                <p className={styles.verdictStatValue}>Physical SIM</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>eSIM wins for most trips</strong> — from {ESIM_FROM} against roughly
              $20 for the cheapest physical tourist SIM, with nothing to collect on arrival.
              But cost is not what decides this. There are exactly two situations where the
              price comparison is irrelevant and a physical SIM is the only option:{" "}
              <strong>you need a Japanese phone number</strong> (no Japan eSIM sells voice or
              SMS, at any price), or <strong>your handset has no eSIM hardware</strong> — any
              phone from before about 2018, and any iPhone bought in mainland China. If neither
              applies to you, buy an eSIM and stop reading. Prices checked {pricesCheckedAt}.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>What&apos;s the Difference?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Feature", "eSIM", "Physical SIM"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.tdProvider}>{row.feature}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.esim}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.physicalSim}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* eSIM Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>eSIM</span>
          <h2 className={styles.sectionTitle}>eSIM: Full Pros &amp; Cons</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {esimPros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {esimCons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Physical SIM Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Physical SIM</span>
          <h2 className={styles.sectionTitle}>Physical SIM: Full Pros &amp; Cons</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {simPros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {simCons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Best eSIMs */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>Top eSIM picks</span>
          <h2 className={styles.sectionTitle}>Best eSIMs for Japan 2026</h2>
          <div className={styles.picksList}>
            {esimPicks.map((pick) => (
              <div key={pick.rank} className={styles.pickCard}>
                <div className={styles.pickCardHeader}>
                  <div className={styles.pickRank}>
                    <span className={styles.pickNumber}>{pick.rank}</span>
                    <div className={styles.pickMeta}>
                      <span className={`${styles.pickBadge} ${styles[pick.badgeClass]}`}>{pick.badge}</span>
                      <span className={styles.pickName}>{pick.name}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.pickCardBody}>
                  <p className={styles.pickSummary}>{pick.summary}</p>
                  <div className={styles.pickTarget}>
                    <span className={styles.pickTargetLabel}>Best for:</span>
                    <span>{pick.bestFor}</span>
                  </div>
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
                  <a
                    href={pick.href}
                    className={styles.pickCta}
                    target="_blank"
                    rel={pick.ctaNote ? "sponsored noopener" : "noopener noreferrer nofollow"}
                  >
                    {pick.cta}
                  </a>
                  {pick.ctaNote && (
                    <p style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: "0.6rem", lineHeight: 1.6 }}>
                      {pick.ctaNote}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Best Physical SIM */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>Top SIM pick</span>
          <h2 className={styles.sectionTitle}>Best Physical SIM for Japan 2026</h2>
          <div className={styles.picksList}>
            <div className={styles.pickCard}>
              <div className={styles.pickCardHeader}>
                <div className={styles.pickRank}>
                  <span className={styles.pickNumber}>{simPick.rank}</span>
                  <div className={styles.pickMeta}>
                    <span className={`${styles.pickBadge} ${styles[simPick.badgeClass]}`}>{simPick.badge}</span>
                    <span className={styles.pickName}>{simPick.name}</span>
                  </div>
                </div>
              </div>
              <div className={styles.pickCardBody}>
                <p className={styles.pickSummary}>{simPick.summary}</p>
                <div className={styles.pickTarget}>
                  <span className={styles.pickTargetLabel}>Best for:</span>
                  <span>{simPick.bestFor}</span>
                </div>
                <div className={styles.pickGrid}>
                  <div className={styles.pickPros}>
                    <p className={styles.pickListLabel}>Pros</p>
                    <ul className={styles.pickList}>
                      {simPick.pros.map((p) => (
                        <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.pickCons}>
                    <p className={styles.pickListLabel}>Cons</p>
                    <ul className={styles.pickList}>
                      {simPick.cons.map((c) => (
                        <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <a
                  href={simPick.href}
                  className={styles.pickCta}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  {simPick.cta}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Which Should You Choose */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Decision guide</span>
          <h2 className={styles.sectionTitle}>Which Should You Choose?</h2>
          <p className={styles.bodyText}>
            The right option depends on your trip length, device, and whether you need voice calls.
            Here&apos;s a quick scenario guide:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your Situation", "Recommendation", "Reason"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scenarios.map((row) => (
                    <tr key={row.trip}>
                      <td className={styles.tdProvider}>{row.trip}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{row.recommendation}</td>
                      <td style={{ fontSize: "0.83rem" }}>{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Compared</p>
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
            <Link href="/guides/esim/pocket-wifi-vs-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4" />
                  <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Pocket WiFi vs eSIM for Japan (2026): Which Is Better?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/does-esim-work-in-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Does eSIM Work in Japan? (2026): Everything You Need to Know</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Compare all Japan connectivity options</h2>
            <p className={styles.ctaBannerDesc}>
              eSIM, physical SIM, Pocket WiFi — we compare every way to stay connected
              in Japan so you can choose with confidence.
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
