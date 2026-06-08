import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// CTA / provider links — normal (non-affiliate) links for now.
// TODO: replace with approved affiliate link
const SAFETYWING_URL = "https://safetywing.com/";
// TODO: replace with approved affiliate link
const HEYMONDO_URL = "https://heymondo.com/";

const compareRows = [
  { factor: "Policy model", sw: "Subscription, billed every 4 weeks", hm: "Single trip with fixed dates" },
  { factor: "Pricing", sw: "Flat 4-weekly rate (quote-based)", hm: "Per-trip premium (quote-based, by age/length)" },
  { factor: "Best trip length", sw: "Long or open-ended / undated", hm: "Defined trips (days to a few weeks)" },
  { factor: "Medical limits", sw: "Solid but leaner", hm: "High medical & evacuation cover" },
  { factor: "App & medical chat", sw: "App-based claims", hm: "24/7 in-app doctor chat (advantage)" },
  { factor: "Adventure / skiing", sw: "Limited", hm: "Winter-sports add-on available" },
  { factor: "Waiting period (buy after departure)", sw: "Cover from your chosen start", hm: "Waiting period applies (often ~72h)" },
  { factor: "Deductible / excess", sw: "Per-claim excess applies", hm: "Varies by plan" },
];

const pickSafetyWing = [
  "Your trip is long, undated, or open-ended (working holiday, sabbatical, nomad life)",
  "You want predictable monthly billing you can cancel when you leave",
  "You're already abroad and want cover that starts simply",
  "You don't need extensive trip-cancellation or baggage perks",
];

const pickHeymondo = [
  "You have a defined trip of a few days to a few weeks",
  "You want high medical limits and strong emergency cover",
  "24/7 in-app English medical chat matters to you in Japan",
  "You're skiing or doing adventure activities (with the add-on)",
];

const faqItems = [
  {
    q: "SafetyWing or Heymondo for Japan — which is better?",
    a: "It depends on your trip. Heymondo is the stronger all-round choice for a standard, defined Japan trip: higher medical limits, 24/7 in-app medical chat, and winter-sports add-ons. SafetyWing is better for long or open-ended stays thanks to its subscription model, which you can cancel when you leave. Neither is universally 'better' — match the model to your trip.",
  },
  {
    q: "Is SafetyWing or Heymondo cheaper for Japan?",
    a: "There's no fixed answer because both are quote-based. SafetyWing charges a flat rate every four weeks, which can work out cheaper for very long, undated stays. Heymondo prices a single trip by your age and dates, which is often better value for a short, defined trip with higher cover. Always get a quote for your exact dates and compare the cover, not just the price.",
  },
  {
    q: "Does Heymondo or SafetyWing cover skiing in Japan?",
    a: "Heymondo offers winter-sports cover as an add-on, which suits a Niseko or Hakuba ski trip. SafetyWing's standard cover for skiing is more limited. Either way, confirm that your specific activity is named in the policy wording before you travel — winter sports are commonly excluded unless explicitly added.",
  },
  {
    q: "Can I buy either policy after arriving in Japan?",
    a: "Yes for both, with conditions. SafetyWing can be started while you're already travelling. Heymondo can be bought after departure, but a waiting period (commonly around 72 hours) usually applies before cover begins, and anything already known or pre-existing won't be covered. Buying before you leave home is always the safer option.",
  },
  {
    q: "Which has better support if I get sick in Japan?",
    a: "Heymondo's 24/7 in-app doctor chat is a real advantage when you're navigating Japanese hospitals in another language — it helps you find appropriate care and coordinate payment. SafetyWing handles claims through its app but is leaner on real-time medical assistance. For peace of mind in a language-barrier situation, Heymondo edges it.",
  },
];

export default function SafetyWingVsHeymondoJapanPage() {
  return (
    <>
      <Head>
        <title>SafetyWing vs Heymondo for Japan (2026): Which Should You Pick? | Japan Travel Kit</title>
        <meta
          name="description"
          content="SafetyWing vs Heymondo for Japan in 2026. We compare subscription vs trip cover, medical limits, app support, ski cover, and waiting periods to help you choose."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money/safetywing-vs-heymondo-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="SafetyWing vs Heymondo for Japan (2026): Which Should You Pick?" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money/safetywing-vs-heymondo-japan" />
        <meta property="og:description" content="SafetyWing vs Heymondo for Japan in 2026. We compare subscription vs trip cover, medical limits, app support, ski cover, and waiting periods to help you choose." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SafetyWing vs Heymondo for Japan (2026): Which Should You Pick?" />
        <meta name="twitter:description" content="SafetyWing vs Heymondo for Japan in 2026. We compare subscription vs trip cover, medical limits, app support, ski cover, and waiting periods to help you choose." />
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
              headline: "SafetyWing vs Heymondo for Japan (2026): Which Should You Pick?",
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
                { "@type": "ListItem", position: 4, name: "SafetyWing vs Heymondo for Japan", item: "https://www.japan-travel-kit.com/guides/money/safetywing-vs-heymondo-japan" },
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
          <span className={styles.breadCurrent}>SafetyWing vs Heymondo</span>
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
            SafetyWing vs Heymondo for Japan (2026):<br />Which Should You Pick?
          </h1>
          <p className={styles.heroSubtitle}>
            One is a flexible monthly subscription; the other is comprehensive trip cover with in-app medical
            support. We break down which wins for your Japan trip — and why.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Subscription vs Trip Cover", "Head-to-Head"].map((t) => (
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
            <a href={SAFETYWING_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "#92400e", fontWeight: 600 }}>SafetyWing</a>{" "}
            and{" "}
            <a href={HEYMONDO_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "#92400e", fontWeight: 600 }}>Heymondo</a>{" "}
            sites.
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Pick SafetyWing if</p>
                <p className={styles.verdictStatValue}>Long / open-ended stay</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Pick Heymondo if</p>
                <p className={styles.verdictStatValue}>Defined trip, want high cover</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Pricing model</p>
                <p className={styles.verdictStatValue}>Subscription vs per-trip</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>In-app medical chat</p>
                <p className={styles.verdictStatValue}>Heymondo wins</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Heymondo is the better all-round pick for a standard Japan trip;
              SafetyWing is the flexible choice for long or undated stays. Prices are quote-based — get a quote
              for your exact dates before deciding.
            </p>
          </div>
        </div>

        {/* The core difference */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The core difference</span>
          <h2 className={styles.sectionTitle}>Subscription vs Trip Cover</h2>
          <p className={styles.bodyText}>
            The two products work in fundamentally different ways. <strong>SafetyWing</strong> is a
            subscription: you pay a flat rate every four weeks and keep it running until you cancel. That&apos;s
            ideal if you don&apos;t have a fixed return date — a working holiday, a sabbatical, or nomad life
            based partly in Japan.
          </p>
          <p className={styles.bodyText}>
            <strong>Heymondo</strong> is trip-based: you insure a defined set of dates, and the premium reflects
            your age and trip length. In exchange you typically get higher medical limits, more comprehensive
            trip benefits, and Heymondo&apos;s standout feature — 24/7 in-app doctor chat, which is genuinely
            useful when you&apos;re unwell in a country where you don&apos;t speak the language.
          </p>
          <p className={styles.bodyText}>
            Neither model is better in the abstract. The right one depends on how long you&apos;re staying,
            how much cover you want, and whether you value real-time medical support.
          </p>
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>SafetyWing vs Heymondo: Head-to-Head</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Factor", "SafetyWing", "Heymondo"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sw}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.hm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Details are a 2026 general guide and vary by plan, country of residence, and date — confirm on each
            provider&apos;s site before you buy.
          </p>
        </section>

        {/* Who should pick which */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>The verdict</span>
          <h2 className={styles.sectionTitle}>Which Should You Choose?</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pick SafetyWing if…</p>
              <ul className={styles.pickList}>
                {pickSafetyWing.map((item) => (
                  <li key={item}><span className={styles.proIcon}>✓</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Pick Heymondo if…</p>
              <ul className={styles.pickList}>
                {pickHeymondo.map((item) => (
                  <li key={item}><span className={styles.proIcon}>✓</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <a href={SAFETYWING_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
              Get a SafetyWing quote →
            </a>
            <a href={HEYMONDO_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
              Get a Heymondo quote →
            </a>
          </div>
        </section>

        {/* Japan usability */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>In Japan</span>
          <h2 className={styles.sectionTitle}>How They Compare in Practice in Japan</h2>
          <p className={styles.bodyText}>
            In Japan, two things tip the balance for a typical traveller. First, <strong>medical support in
            English</strong>: Heymondo&apos;s in-app doctor chat helps you find appropriate care and coordinate
            payment when you don&apos;t speak Japanese — a real edge over SafetyWing&apos;s app-based claims.
            Second, <strong>how bills are paid</strong>: most Japanese hospitals require payment upfront and a
            claim afterwards, so keep every itemised receipt (領収書) whichever provider you choose.
          </p>
          <p className={styles.bodyText}>
            Where SafetyWing pulls ahead is flexibility. If you&apos;re in Japan for an undefined stretch —
            studying, working remotely, or slow-travelling — paying every four weeks and cancelling on the way
            out is simpler and often cheaper than insuring an uncertain block of trip dates.
          </p>
          <p className={styles.bodyText}>
            Want the wider field, including World Nomads for ski trips? See our roundup of the{" "}
            <Link href="/guides/money/best-travel-insurance-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              best travel insurance for Japan
            </Link>, or start with whether you{" "}
            <Link href="/guides/money/japan-travel-insurance" style={{ color: "var(--red)", fontWeight: 600 }}>
              need travel insurance for Japan
            </Link>{" "}
            at all.
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
            <Link href="/guides/money/best-travel-insurance-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 1 8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6a10 10 0 0 1 8-4z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Travel Insurance for Japan (2026): Compared &amp; Reviewed</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/japan-travel-insurance" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Travel Insurance (2026): Do You Actually Need It?</p>
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
