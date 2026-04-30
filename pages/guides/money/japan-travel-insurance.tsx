import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const coverageItems = [
  { type: "Medical expenses", why: "Hospital visits cost ¥30,000–¥100,000+ without cover" },
  { type: "Emergency evacuation", why: "Rare but extremely costly — can exceed $100,000" },
  { type: "Trip cancellation", why: "Flights and hotels are often non-refundable" },
  { type: "Baggage loss", why: "Electronics and valuables are expensive to replace" },
  { type: "Travel delay", why: "Common during Japan's typhoon season (June–October)" },
];

const costRows = [
  { length: "1 week",  cost: "$30–$60" },
  { length: "2 weeks", cost: "$50–$100" },
  { length: "1 month", cost: "$80–$150" },
];

const japanRisks = [
  {
    title: "Typhoon season (June–October)",
    desc: "Japan sees 20–30 typhoons annually. Flights get cancelled, trains suspend, and hotels can be inaccessible for days. Trip cancellation and delay cover is essential if you're travelling in this window.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12c0-2.76 1.12-5.26 2.93-7.07" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Earthquakes & natural disasters",
    desc: "Japan sits on the Pacific Ring of Fire. Minor earthquakes are common; major ones are rare but can disrupt transport and accommodation. Emergency evacuation cover protects against worst-case scenarios.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Skiing & outdoor activities",
    desc: "Japan has world-class skiing in Hokkaido and Nagano. Standard policies may exclude winter sports — check your policy wording and add adventure or winter sports cover if needed.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" />
        <path d="m6 20 4-4 4 4 4-4" />
        <path d="m6 16 4-4 4 4 4-4" />
      </svg>
    ),
  },
];

const tips = [
  {
    title: "Carry your policy documents",
    desc: "Save a digital copy and a printed version. Japanese hospitals and assistance lines will need your policy number and insurer's contact details before treating you.",
  },
  {
    title: "Keep every receipt",
    desc: "Japanese hospitals issue itemised receipts (領収書). Collect all of them — prescriptions, consultations, transport to hospital. Without receipts, your claim may be rejected.",
  },
  {
    title: "Most claims are submitted after you return home",
    desc: "Japan's hospitals rarely bill your insurer directly. You pay upfront and submit receipts to your insurer once you're home. Make sure you have enough on your card to cover costs.",
  },
  {
    title: "Find English-speaking hospitals before you go",
    desc: "JNTO (Japan National Tourism Organization) maintains a list of hospitals with English-speaking staff. Clinics in major tourist areas — Shinjuku, Shibuya, Ginza — often have English-speaking doctors.",
  },
];

const faqItems = [
  {
    q: "Is travel insurance required for Japan?",
    a: "No, travel insurance is not legally required to enter Japan. There is no visa condition that mandates cover (unlike some countries). However, given that Japan's healthcare costs are high for uninsured foreigners, it is strongly recommended for all visitors.",
  },
  {
    q: "Does Japan have free healthcare for tourists?",
    a: "No. Japan's national health insurance system covers Japanese residents and registered long-term foreign residents — not tourists. As a short-term visitor, you pay the full cost of any hospital visit or treatment. Emergency treatment is never refused, but you will be billed in full.",
  },
  {
    q: "What happens if I get sick in Japan without insurance?",
    a: "You will receive treatment — Japanese hospitals do not turn away patients. However, you will be billed the full uninsured rate, which is typically 3–10× higher than what Japanese residents pay. A simple consultation can cost ¥5,000–¥15,000; a hospital stay with tests and medication can easily reach ¥100,000–¥500,000 or more.",
  },
  {
    q: "Does my credit card cover travel insurance for Japan?",
    a: "Some credit cards include basic travel insurance as a perk, but the cover is usually limited. Common limitations include low medical expense ceilings (often $50,000–$100,000 — which sounds like a lot, but major illness or evacuation can exceed this), exclusions for pre-existing conditions, and requirements to have purchased flights with that card. Read your card's policy booklet before relying on it.",
  },
  {
    q: "Is Japan safe to travel without insurance?",
    a: "Japan is one of the safest countries in the world for travellers — crime is extremely low and the healthcare system is excellent. The risk is financial, not physical. Without insurance, a serious illness, accident, or emergency evacuation could leave you with bills of tens of thousands of dollars. For the cost of a good policy ($30–$150 depending on trip length), the financial protection is well worth it.",
  },
];

export default function JapanTravelInsurancePage() {
  return (
    <>
      <Head>
        <title>Japan Travel Insurance 2026: Do You Need It? | Japan Travel Kit</title>
        <meta
          name="description"
          content="Do you need travel insurance for Japan? We explain the risks, what to cover, and the best policies for every budget — with 2026 cost estimates."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/money/japan-travel-insurance" />
        <meta property="og:title" content="Japan Travel Insurance 2026: Do You Need It?" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/money/japan-travel-insurance" />
        <meta property="og:description" content="Do you need travel insurance for Japan? We explain the risks, what to cover, and the best policies for every budget — with 2026 cost estimates." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan Travel Insurance 2026: Do You Need It?" />
        <meta name="twitter:description" content="Do you need travel insurance for Japan? We explain the risks, what to cover, and the best policies for every budget — with 2026 cost estimates." />
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
              headline: "Japan Travel Insurance 2026: Do You Actually Need It?",
              dateModified: "2026-04-30",
              publisher: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://japan-travel-kit.com",
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Money & Payment", item: "https://japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "Japan Travel Insurance", item: "https://japan-travel-kit.com/guides/money/japan-travel-insurance" },
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
          <span className={styles.breadCurrent}>Japan Travel Insurance</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🛡️</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            Japan Travel Insurance (2026):<br />Do You Actually Need It?
          </h1>
          <p className={styles.heroSubtitle}>
            Japan has excellent healthcare — but without insurance, a hospital visit can cost thousands. Here&apos;s what you need to know.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "Medical & Trip Cover", "All Nationalities"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Recommended?</p>
                <p className={styles.verdictStatValue}>Yes — strongly</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Most Important</p>
                <p className={styles.verdictStatValue}>Medical coverage</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Avg Hospital Visit</p>
                <p className={styles.verdictStatValue}>¥30,000–¥100,000+</p>
              </div>
            </div>
          </div>
        </div>

        {/* Do You Need It */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Do You Need Travel Insurance for Japan?</h2>
          <p className={styles.bodyText}>
            Japan is not legally required to have travel insurance for entry — there is no visa condition that mandates it.
            But Japan&apos;s national health insurance system is designed for residents, not visitors. As a tourist, you are
            billed at the full uninsured rate for any medical treatment, which is significantly higher than what Japanese
            residents pay.
          </p>
          <p className={styles.bodyText}>
            A minor doctor&apos;s visit might cost ¥5,000–¥15,000. A hospital stay with tests, IV treatment, or
            surgery can run into hundreds of thousands of yen. Emergency medical evacuation back to your home country
            can exceed $100,000. Without insurance, these costs fall entirely on you.
          </p>
          <p className={styles.bodyText}>
            Some travellers rely on credit card travel insurance, which can provide adequate basic cover. But limits
            are often low and exclusions are common. A dedicated travel insurance policy from a provider like World
            Nomads or Allianz typically costs $30–$100 for a two-week trip — a small price for genuine peace of mind.
          </p>
        </section>

        {/* What to Cover */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Coverage</span>
          <h2 className={styles.sectionTitle}>What Should Your Policy Cover?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Coverage Type", "Why It Matters"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coverageItems.map((row) => (
                    <tr key={row.type}>
                      <td className={styles.tdProvider}>{row.type}</td>
                      <td className={styles.tdBestFor}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Best Options */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Best policies</span>
          <h2 className={styles.sectionTitle}>Best Travel Insurance for Japan</h2>

          <div className={styles.stepsList}>
            <div className={styles.stepCard}>
              <span className={styles.stepNum}>1</span>
              <div className={styles.stepBody}>
                <p className={styles.stepTitle}>World Nomads – Best for Backpackers &amp; Adventure Travellers</p>
                <p className={styles.stepDesc}>
                  World Nomads is built for independent travellers and backpackers. Their Standard and Explorer plans
                  cover medical expenses, trip cancellation, baggage loss, and a wide range of adventure activities
                  including skiing, hiking, and scuba diving. Available to travellers from 140+ countries and can be
                  purchased even after you&apos;ve already left home. Plans start around $50–$80 for two weeks in Japan.
                </p>
              </div>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepNum}>2</span>
              <div className={styles.stepBody}>
                <p className={styles.stepTitle}>Allianz – Best Comprehensive Cover</p>
                <p className={styles.stepDesc}>
                  Allianz is one of the world&apos;s largest travel insurance providers, offering robust medical cover,
                  trip interruption protection, and 24/7 assistance. Their AllTrips plans are ideal for frequent
                  travellers — one annual policy covers multiple Japan trips. Medical limits are high (often $500,000+),
                  making it a strong option for longer stays or travellers with health concerns.
                </p>
              </div>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepNum}>3</span>
              <div className={styles.stepBody}>
                <p className={styles.stepTitle}>Your Credit Card – Free but Limited</p>
                <p className={styles.stepDesc}>
                  Many premium credit cards (Chase Sapphire, Amex Platinum, Barclaycard Avios) include complimentary
                  travel insurance. This can be sufficient for healthy travellers on short trips. Check your card&apos;s
                  policy for medical expense limits, pre-existing condition exclusions, and whether you must have
                  booked flights using that card for cover to apply. If limits seem low, top up with a dedicated policy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Japan-Specific Risks */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Japan-specific risks</span>
          <h2 className={styles.sectionTitle}>Japan-Specific Risks to Cover</h2>
          <div className={styles.whoForGrid}>
            {japanRisks.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cost table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Does Travel Insurance Cost?</h2>
          <p className={styles.bodyText}>
            Costs vary based on age, nationality, cover level, and trip length. The figures below are rough
            estimates for a healthy adult in their 20s–40s purchasing standard cover with medical, cancellation,
            and baggage included.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Trip Length", "Estimated Cost (Standard Cover)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costRows.map((row) => (
                    <tr key={row.length}>
                      <td className={styles.tdProvider}>{row.length}</td>
                      <td className={styles.tdPrice}>{row.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Practical tips</span>
          <h2 className={styles.sectionTitle}>Tips for Using Insurance in Japan</h2>
          <div className={styles.stepsList}>
            {tips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.title}</p>
                  <p className={styles.stepDesc}>{tip.desc}</p>
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
            <Link href="/guides/money/cash-vs-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cash vs Card in Japan (2026): What Actually Works?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Tested &amp; Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Planning your Japan trip?</h2>
            <p className={styles.ctaBannerDesc}>
              See our full money and budgeting guides — from ATMs to daily budgets and the best travel cards for Japan.
            </p>
            <Link href="/guides/money" className={styles.ctaBannerBtn}>
              View All Money Guides →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
