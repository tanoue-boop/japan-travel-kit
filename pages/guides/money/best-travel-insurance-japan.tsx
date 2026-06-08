import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// CTA / provider links — normal (non-affiliate) links for now.
// TODO: replace with approved affiliate link
const HEYMONDO_URL = "https://heymondo.com/";
// TODO: replace with approved affiliate link
const SAFETYWING_URL = "https://safetywing.com/";
// TODO: replace with approved affiliate link
const WORLDNOMADS_URL = "https://www.worldnomads.com/";

const whatToLookFor = [
  {
    rank: 1,
    name: "High medical & evacuation limits",
    desc: "This is the one that matters most in Japan. Hospital treatment for an uninsured visitor can run from ¥30,000 for a clinic visit to ¥100,000+ for an inpatient stay, and emergency evacuation can exceed $100,000. Look for medical cover well into the hundreds of thousands of dollars.",
  },
  {
    rank: 2,
    name: "English-speaking 24/7 assistance",
    desc: "When you're unwell in a country where you don't speak the language, a 24-hour English helpline (or in-app medical chat) is worth more than a slightly cheaper premium. It helps you find an English-speaking hospital and coordinate payment.",
  },
  {
    rank: 3,
    name: "The way it pays — upfront vs direct billing",
    desc: "Most Japanese hospitals make you pay first and claim later. Some insurers can arrange direct payment or fast cashless treatment for larger bills. Either way, keep every itemised receipt (領収書) for your claim.",
  },
  {
    rank: 4,
    name: "Adventure & winter-sports cover",
    desc: "Japan has world-class skiing in Hokkaido and Nagano. Standard policies often exclude winter sports and adventure activities, or require a paid add-on. If you'll ski, snowboard, hike, or dive, confirm it's covered.",
  },
];

const providers = [
  {
    name: "Heymondo",
    badge: "Best Overall",
    badgeColor: "#16a34a",
    url: HEYMONDO_URL,
    pros: [
      "App-first: 24/7 in-app doctor chat and one-tap assistance",
      "High medical limits and strong emergency cover",
      "No upfront payment needed for approved larger medical bills (cashless assistance)",
      "Can add winter-sports and adventure cover for Japan ski trips",
    ],
    cons: [
      "Single-trip structure — less suited to open-ended or very long stays",
      "If bought after your trip has already started, a waiting period applies (often around 72 hours)",
      "Premium varies a lot by age and trip length — always get a quote",
    ],
    verdict: "Heymondo is our top all-round pick for a standard Japan trip. The app-based medical chat and assistance are genuinely useful when you're navigating an unfamiliar healthcare system in another language, and the medical limits are high enough for Japan's costs.",
  },
  {
    name: "SafetyWing",
    badge: "Best for Long / Open-Ended Trips",
    badgeColor: "#2563eb",
    url: SAFETYWING_URL,
    pros: [
      "Subscription model (billed every 4 weeks) — ideal for long or undated stays",
      "You can buy it after you've already left home and cancel when you're done",
      "Popular with digital nomads and remote workers basing themselves in Japan",
      "Simple, predictable monthly pricing",
    ],
    cons: [
      "Per-claim deductible (excess) applies",
      "Cover limits and benefits are leaner than a comprehensive trip policy",
      "Fewer trip-cancellation and baggage perks than trip-based insurers",
    ],
    verdict: "SafetyWing suits travellers who don't have a fixed return date — long stays, working holidays, or nomads. The subscription model means you pay only for the weeks you need, but check the deductible and limits against your needs.",
  },
  {
    name: "World Nomads",
    badge: "Best for Adventure & Skiing",
    badgeColor: "#7c3aed",
    url: WORLDNOMADS_URL,
    pros: [
      "Covers a wide range of adventure activities — strong for Japan's ski and hiking trips",
      "Trip-based cover including cancellation, delay, and baggage",
      "Can be purchased while you're already travelling",
      "Well-known name with established 24/7 assistance",
    ],
    cons: [
      "Availability and exact benefits vary by country of residence",
      "Not a subscription — built around defined trip dates",
      "Adventure tiers cost more than basic plans",
    ],
    verdict: "World Nomads is the pick if your Japan trip is built around skiing in Niseko or Hakuba, or other outdoor activities. Its activity list is broad, but always confirm your specific sport is named in the policy wording before you rely on it.",
  },
];

const compareRows = [
  { factor: "Policy type", heymondo: "Single trip (app-based)", safetywing: "Subscription (4-weekly)", worldnomads: "Single / multi-trip" },
  { factor: "Best for", heymondo: "Standard trips, all-round", safetywing: "Long / open-ended stays", worldnomads: "Adventure & ski trips" },
  { factor: "Medical chat / app", heymondo: "24/7 in-app doctor", safetywing: "App-based claims", worldnomads: "24/7 phone assistance" },
  { factor: "Adventure / ski", heymondo: "Add-on available", safetywing: "Limited", worldnomads: "Strong (wide activity list)" },
  { factor: "Deductible / excess", heymondo: "Varies by plan", safetywing: "Per-claim excess applies", worldnomads: "Varies by plan" },
  { factor: "Buy after departure", heymondo: "Yes (waiting period)", safetywing: "Yes", worldnomads: "Yes" },
];

const useCases = [
  {
    title: "First-time visitor, 1–3 week trip",
    desc: "Go with Heymondo. The combination of high medical limits, in-app English support, and cashless assistance covers the realistic risks of a standard Japan trip — typhoon delays, a clinic visit, a hospital stay.",
  },
  {
    title: "Long stay, working holiday, or nomad",
    desc: "SafetyWing's subscription is the natural fit. You pay every four weeks and cancel when you leave, so you're not locked into fixed trip dates or paying for weeks you don't use.",
  },
  {
    title: "Ski or snowboard trip (Niseko, Hakuba, Nozawa)",
    desc: "Choose World Nomads, or add winter-sports cover to a Heymondo plan. Confirm your specific activity is named in the policy — standard cover usually excludes it.",
  },
];

const faqItems = [
  {
    q: "Do I really need travel insurance for Japan?",
    a: "It's not legally required to enter Japan, but it's strongly recommended. Japan's national health system doesn't cover tourists, so you pay the full uninsured rate for any treatment — a hospital stay can reach hundreds of thousands of yen, and emergency evacuation can exceed $100,000. For the price of a policy, the financial protection is well worth it. For the full case, see our guide on whether you need travel insurance for Japan.",
  },
  {
    q: "Which travel insurance is best for Japan?",
    a: "There's no single winner for everyone. For a standard trip we'd pick Heymondo for its high medical limits and app-based English support. For long or open-ended stays, SafetyWing's subscription model is more flexible. For ski and adventure trips, World Nomads has the broadest activity cover. The right choice depends on your trip length, activities, and budget — always get a quote for your specific dates.",
  },
  {
    q: "Does travel insurance cover skiing in Japan?",
    a: "Only if winter sports are explicitly included or added. Standard policies typically exclude skiing and snowboarding. World Nomads covers many winter and adventure activities on its higher tiers, and Heymondo offers winter-sports add-ons. Always check the policy wording names your specific activity before you travel.",
  },
  {
    q: "Can I buy travel insurance after I've already arrived in Japan?",
    a: "Often yes. SafetyWing and World Nomads can be purchased while you're already travelling, and Heymondo can be bought after departure — though a waiting period (commonly around 72 hours) usually applies before cover starts, and pre-existing or already-known issues won't be covered. It's always better to buy before you leave home.",
  },
  {
    q: "How do insurance claims work at Japanese hospitals?",
    a: "Most Japanese hospitals require you to pay upfront and claim the cost back from your insurer afterwards, so make sure you have enough on your card. Keep every itemised receipt (領収書) and any medical reports. Some insurers can arrange direct or cashless payment for larger bills — contact the assistance line before treatment where possible.",
  },
];

export default function BestTravelInsuranceJapanPage() {
  return (
    <>
      <Head>
        <title>Best Travel Insurance for Japan (2026): Compared &amp; Reviewed | Japan Travel Kit</title>
        <meta
          name="description"
          content="The best travel insurance for Japan in 2026, compared. We review Heymondo, SafetyWing, and World Nomads on medical cover, price structure, ski cover, and support."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money/best-travel-insurance-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Best Travel Insurance for Japan (2026): Compared & Reviewed" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money/best-travel-insurance-japan" />
        <meta property="og:description" content="The best travel insurance for Japan in 2026, compared. We review Heymondo, SafetyWing, and World Nomads on medical cover, price structure, ski cover, and support." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Travel Insurance for Japan (2026): Compared & Reviewed" />
        <meta name="twitter:description" content="The best travel insurance for Japan in 2026, compared. We review Heymondo, SafetyWing, and World Nomads on medical cover, price structure, ski cover, and support." />
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
              headline: "Best Travel Insurance for Japan (2026): Compared & Reviewed",
              dateModified: "2026-06-03",
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
                { "@type": "ListItem", position: 3, name: "Money & Payment", item: "https://www.japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "Best Travel Insurance for Japan", item: "https://www.japan-travel-kit.com/guides/money/best-travel-insurance-japan" },
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
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Best Travel Insurance</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🛡️</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Best Travel Insurance for Japan (2026):<br />Compared &amp; Reviewed
          </h1>
          <p className={styles.heroSubtitle}>
            We compared the leading providers on what actually matters in Japan — medical limits, English
            support, ski cover, and how they pay out. Here are our picks for every type of trip.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Heymondo · SafetyWing · World Nomads", "By Trip Type"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Disclaimer */}
        <div className={styles.disclosure}>
          <span className={styles.disclosureIcon}>ℹ️</span>
          <p className={styles.disclosureText}>
            <strong>Not insurance advice.</strong> This is general information only — not insurance advice.
            Coverage and prices vary by age, trip length, and plan, and change over time. Always get a quote
            and read the policy wording before you buy. Confirm the latest details on the official{" "}
            <a href={HEYMONDO_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "#92400e", fontWeight: 600 }}>Heymondo</a>,{" "}
            <a href={SAFETYWING_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "#92400e", fontWeight: 600 }}>SafetyWing</a>, and{" "}
            <a href={WORLDNOMADS_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "#92400e", fontWeight: 600 }}>World Nomads</a>{" "}
            sites.
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
                <p className={styles.verdictStatLabel}>Best Overall</p>
                <p className={styles.verdictStatValue}>Heymondo</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best for Long Stays</p>
                <p className={styles.verdictStatValue}>SafetyWing</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best for Skiing</p>
                <p className={styles.verdictStatValue}>World Nomads</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Key rule:</strong> Prices depend on your age, trip length, and plan — there&apos;s no
              fixed price. Get a quote for your exact dates, and make sure medical and evacuation limits are
              high enough for Japan&apos;s costs.
            </p>
          </div>
        </div>

        {/* What to Look For */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Criteria</span>
          <h2 className={styles.sectionTitle}>What to Look For in Japan Travel Insurance</h2>
          <div className={styles.stepsList}>
            {whatToLookFor.map((item) => (
              <div key={item.rank} className={styles.stepCard}>
                <span className={styles.stepNum}>{item.rank}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.name}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Providers */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Our picks</span>
          <h2 className={styles.sectionTitle}>The Best Travel Insurance for Japan</h2>

          {providers.map((p) => (
            <div key={p.name} className={styles.providerBlock}>
              <div className={styles.providerHeader}>
                <h3 className={styles.providerName}>{p.name}</h3>
                <span className={styles.providerBadge} style={{ background: p.badgeColor }}>
                  {p.badge}
                </span>
              </div>
              <div className={styles.pickGrid}>
                <div className={styles.pickPros}>
                  <p className={styles.pickListLabel}>Pros</p>
                  <ul className={styles.pickList}>
                    {p.pros.map((item) => (
                      <li key={item}><span className={styles.proIcon}>+</span>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.pickCons}>
                  <p className={styles.pickListLabel}>Cons</p>
                  <ul className={styles.pickList}>
                    {p.cons.map((item) => (
                      <li key={item}><span className={styles.conIcon}>−</span>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className={styles.bodyText} style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
                <strong>Our verdict:</strong> {p.verdict}
              </p>
              <a href={p.url} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
                Get a {p.name} quote →
              </a>
            </div>
          ))}
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>Heymondo vs SafetyWing vs World Nomads</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Factor", "Heymondo", "SafetyWing", "World Nomads"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.heymondo}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.safetywing}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.worldnomads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Details are a 2026 general guide and vary by plan, country of residence, and date — confirm on each
            provider&apos;s site. Comparing SafetyWing and Heymondo directly? See our{" "}
            <Link href="/guides/money/safetywing-vs-heymondo-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              SafetyWing vs Heymondo guide
            </Link>.
          </p>
        </section>

        {/* Use cases */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>By trip type</span>
          <h2 className={styles.sectionTitle}>Which Should You Pick?</h2>
          <div className={styles.stepsList}>
            {useCases.map((uc, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{uc.title}</p>
                  <p className={styles.stepDesc}>{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why it matters in Japan */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Japan context</span>
          <h2 className={styles.sectionTitle}>Why Cover Matters Specifically in Japan</h2>
          <p className={styles.bodyText}>
            Japan is extremely safe, so the real risk is financial, not physical. As a short-term visitor you
            are not covered by Japan&apos;s national health insurance, which means you pay the full uninsured
            rate — typically several times what a resident pays. A simple clinic visit can be ¥5,000–¥15,000;
            a hospital stay with tests and treatment can reach ¥100,000–¥500,000 or more.
          </p>
          <p className={styles.bodyText}>
            Two Japan-specific factors are worth weighing. First, the language barrier: an insurer with 24/7
            English support or in-app medical chat makes a genuine difference when you&apos;re trying to find
            the right hospital. Second, the seasons — typhoon season (June–October) brings flight and train
            disruption, and winter brings world-class but injury-prone skiing. Match your policy to when and
            how you&apos;re travelling.
          </p>
          <p className={styles.bodyText}>
            Still deciding whether you need cover at all? Start with our{" "}
            <Link href="/guides/money/japan-travel-insurance" style={{ color: "var(--red)", fontWeight: 600 }}>
              guide to whether you need travel insurance for Japan
            </Link>.
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
            <Link href="/guides/money/japan-travel-insurance" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 1 8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6a10 10 0 0 1 8-4z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Travel Insurance (2026): Do You Actually Need It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/safetywing-vs-heymondo-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18" />
                  <path d="M5 8h14M5 16h14" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>SafetyWing vs Heymondo for Japan (2026): Which Should You Pick?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/japan-travel-budget" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Travel Budget Guide (2026): How Much Does Japan Cost?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/money" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Compare Japan Money &amp; Payment Options →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
