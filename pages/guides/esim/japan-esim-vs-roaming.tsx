import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const AIRALO_URL = "https://airalo.pxf.io/c/7213504/1268485/15608";
const ESIMGO_URL = "https://breezesim.com?sca_ref=11082101.AF8vabyRKN";
const HOLAFLY_URL = "#";

const roamingCarriers = [
  { carrier: "AT&T (US)",       daily: "$10/day",    limit: "Unlimited data",      notes: "Passport plan required" },
  { carrier: "Verizon (US)",    daily: "$10/day",    limit: "Unlimited data",      notes: "TravelPass required" },
  { carrier: "T-Mobile (US)",   daily: "Free*",      limit: "~5 GB at full speed", notes: "*Then throttled to 256 kbps" },
  { carrier: "EE (UK)",         daily: "£2/day",     limit: "20 GB/month",         notes: "Europe Zone included; Japan extra" },
  { carrier: "Vodafone (UK)",   daily: "£1–£3/day",  limit: "Varies by plan",      notes: "Japan is in 'World' roaming zone" },
  { carrier: "SoftBank (JP)",   daily: "¥3,000/day", limit: "20 MB (!)",           notes: "Data-only — not for regular use" },
];

const esimCosts = [
  { provider: "eSIM Go",  data: "1 GB",       duration: "7 days",  price: "$3.50",  url: ESIMGO_URL  },
  { provider: "eSIM Go",  data: "10 GB",      duration: "30 days", price: "$14.00", url: ESIMGO_URL  },
  { provider: "Airalo",   data: "3 GB",       duration: "30 days", price: "$9.50",  url: AIRALO_URL  },
  { provider: "Airalo",   data: "10 GB",      duration: "30 days", price: "$18.00", url: AIRALO_URL  },
  { provider: "Holafly",  data: "Unlimited",  duration: "10 days", price: "$27.00", url: HOLAFLY_URL },
];

const comparisonRows = [
  { aspect: "Cost (1 week)",   esim: "$3.50–$27",      roaming: "$70–$105"         },
  { aspect: "Setup",           esim: "QR code scan",   roaming: "Automatic"        },
  { aspect: "Speed",           esim: "4G/LTE",         roaming: "4G/LTE"           },
  { aspect: "Home number",     esim: "New local number", roaming: "Keep home number" },
  { aspect: "Top-up needed",   esim: "Buy more via app", roaming: "Never (daily rate)" },
  { aspect: "Best for",        esim: "Most travellers", roaming: "Emergency backup" },
];

const whenRoamingMakesSense = [
  {
    title: "Stays of one day or less",
    desc: "If you're transiting through Japan for a single day, a roaming day pass at $10 costs less than buying and setting up a Japan eSIM for a single day's use. The break-even point is roughly two days — after that, even the cheapest eSIM is cheaper.",
  },
  {
    title: "T-Mobile or similar free-roaming plans",
    desc: "T-Mobile's Magenta and Go5G plans include free international data roaming (throttled to 256 kbps once you exceed around 5 GB at full speed). If you have T-Mobile and mostly use messaging and maps, this built-in plan may be sufficient — though the speed limit makes video streaming impossible.",
  },
  {
    title: "Emergency backup on arrival",
    desc: "Roaming on arrival lets you use your phone while you find an ATM, get through customs, and get your eSIM set up. Keep roaming enabled as a fallback for the first few minutes in Japan, then switch to your Japan eSIM profile once activated.",
  },
];

const setupSteps = [
  {
    title: "Choose your eSIM provider",
    desc: "For most travellers, Airalo (from $4.50) or eSIM Go (from $3.50) offers the best combination of price and reliability. Both run on Docomo and SoftBank networks in Japan.",
  },
  {
    title: "Purchase before you fly",
    desc: "Buy your Japan eSIM online at least a few hours before departure. You'll receive a QR code by email or in the app. You need a Wi-Fi or data connection to download it — do this at home, not at the airport gate.",
  },
  {
    title: "Scan the QR code in your phone settings",
    desc: "On iPhone: Settings → Cellular → Add eSIM → Use QR Code. On Android: Settings → Network → SIM management → Add eSIM. Scan the QR code from your email or the provider's app. The process takes under 2 minutes.",
  },
  {
    title: "Activate on arrival",
    desc: "Keep your home SIM as the default for calls and SMS. Switch your data SIM to the Japan eSIM when your plane lands. You'll have 4G signal before you reach baggage claim — no queuing at airport SIM machines.",
  },
];

const faqItems = [
  {
    q: "Is roaming expensive in Japan?",
    a: "Yes — very. Most international carriers charge $10–$15 per day for international roaming in Japan (AT&T, Verizon, EE). For a 10-day trip that's $100–$150 in roaming charges versus $3.50–$27 for a dedicated Japan eSIM covering the same period. The exception is T-Mobile, which offers throttled free roaming, though speeds are limited to 256 kbps after 5 GB.",
  },
  {
    q: "Does T-Mobile work in Japan for free?",
    a: "Yes, with limitations. T-Mobile's Magenta and Go5G plans include free international data roaming in Japan, but data speeds are throttled to 256 kbps after approximately 5 GB at full speed. This is fine for messaging and light browsing but unusable for video calls, streaming, or heavy navigation. If you need reliable 4G speeds throughout your trip, a Japan eSIM is still the better option.",
  },
  {
    q: "Can I use my UK phone in Japan without roaming charges?",
    a: "Most UK carriers (EE, Vodafone, O2, Three) do not include Japan in their free roaming zones. Japan is typically in an extra-cost 'rest of world' zone costing £1–£3 per day depending on your plan. Three's Go Roam plan includes some destinations but Japan is not always covered. Check your plan before travelling. A Japan eSIM from eSIM Go or Airalo will almost always be cheaper.",
  },
  {
    q: "Is eSIM better than roaming for Japan?",
    a: "For almost everyone, yes. A Japan eSIM gives you the same 4G speed and coverage as roaming, at a fraction of the cost. The only real advantage of roaming is keeping your home number active for calls and texts — but this is easily solved by keeping your home SIM installed alongside the Japan eSIM on a dual-SIM phone. On a single-SIM phone, apps like WhatsApp and LINE replace the need for a local number.",
  },
  {
    q: "Can I use eSIM and keep my home number?",
    a: "Yes, if your phone supports dual SIM. Most modern iPhones (XS onwards) and many Android flagships support Dual SIM Dual Standby (DSDS) — one physical SIM and one eSIM active simultaneously. Your home SIM handles calls and SMS; the Japan eSIM handles data. On a single-SIM phone, your home SIM is replaced by the eSIM — you keep your home number for outgoing calls only by toggling between profiles.",
  },
];

export default function JapanEsimVsRoamingPage() {
  return (
    <>
      <Head>
        <title>Japan eSIM vs Roaming 2026: Which Is Cheaper? | Japan Travel Kit</title>
        <meta
          name="description"
          content="Is roaming or an eSIM cheaper for Japan? We compare costs from AT&T, Verizon, T-Mobile, EE and more against Airalo, eSIM Go and Holafly. The answer is clear."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/japan-esim-vs-roaming" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Japan eSIM vs Roaming 2026: Which Is Cheaper?" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/japan-esim-vs-roaming" />
        <meta property="og:description" content="Is roaming or an eSIM cheaper for Japan? We compare costs from AT&T, Verizon, T-Mobile, EE and more against Airalo, eSIM Go and Holafly. The answer is clear." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan eSIM vs Roaming 2026: Which Is Cheaper?" />
        <meta name="twitter:description" content="Is roaming or an eSIM cheaper for Japan? We compare costs from AT&T, Verizon, T-Mobile, EE and more against Airalo, eSIM Go and Holafly. The answer is clear." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "eSIM vs Roaming", item: "https://japan-travel-kit.com/guides/esim/japan-esim-vs-roaming" },
              ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Japan eSIM vs Roaming (2026): Which Is Cheaper?",
              datePublished: "2026-04-28",
              dateModified: "2026-04-28",
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM &amp; SIM Cards</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>eSIM vs Roaming</span>
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
            Japan eSIM vs Roaming (2026):<br />Which Is Cheaper?
          </h1>
          <p className={styles.heroSubtitle}>
            Your phone plan&apos;s roaming option sounds convenient. But it almost always costs more. Here&apos;s the real comparison.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "Cost Comparison", "All Carriers"].map((t) => (
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
            This doesn&apos;t affect our recommendations.{" "}
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
                <p className={styles.verdictStatLabel}>eSIM cost</p>
                <p className={styles.verdictStatValue}>From $3.50 for 7 days total</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Roaming cost</p>
                <p className={styles.verdictStatValue}>$10–$15 per day (most carriers)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Verdict</p>
                <p className={styles.verdictStatValue}>eSIM is almost always cheaper</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Our pick</p>
                <p className={styles.verdictStatValue}>Get a Japan eSIM before you fly</p>
              </div>
            </div>
            <a href={AIRALO_URL} className={styles.verdictBtn} target="_blank" rel="noopener noreferrer nofollow">
              Get Airalo Japan eSIM →
            </a>
          </div>
        </div>

        {/* What Is Roaming */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is International Roaming?</h2>
          <p className={styles.bodyText}>
            International roaming lets you use your home SIM card on a foreign network. When you arrive in Japan, your carrier connects your phone to a local network (usually Docomo, SoftBank, or KDDI) and bills you at a premium rate for the privilege. You keep your home phone number throughout.
          </p>
          <p className={styles.bodyText}>
            The convenience is real — no setup, no new number, no configuration. The problem is the cost. Most carriers charge a daily flat rate ($10–$15 in the US, £1–£3 in the UK) for a set daily data allowance. On a 10-day Japan trip, that adds up to $100–$150 in roaming charges alone. A Japan eSIM covering the same period costs $3.50–$27.
          </p>
          <p className={styles.bodyText}>
            Japan is not covered by most carriers&apos; free roaming zones. EU roaming rules do not apply, and most &apos;inclusive&apos; international plans exclude Japan or charge extra for it. Always check your specific plan before relying on roaming.
          </p>
        </section>

        {/* Roaming by Carrier */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Carrier comparison</span>
          <h2 className={styles.sectionTitle}>Roaming Costs by Carrier</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Carrier", "Daily Rate", "Data Limit", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {roamingCarriers.map((row) => (
                    <tr key={row.carrier}>
                      <td className={styles.tdProvider}>{row.carrier}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.daily}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.limit}</td>
                      <td style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Rates correct as of April 2026. Always check your carrier&apos;s current international rates before travelling.
          </p>
        </section>

        {/* eSIM Costs */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>eSIM pricing</span>
          <h2 className={styles.sectionTitle}>eSIM Costs for Japan</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Provider", "Data", "Duration", "Price", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {esimCosts.map((row, i) => (
                    <tr key={i}>
                      <td className={styles.tdProvider}>{row.provider}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{row.data}</td>
                      <td className={styles.tdNetwork}>{row.duration}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td>
                        <a
                          href={row.url}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          style={{ fontSize: "0.82rem", color: "#2563eb", whiteSpace: "nowrap" }}
                        >
                          Get plan →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Full Comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Head-to-head</span>
          <h2 className={styles.sectionTitle}>eSIM vs Roaming: Full Comparison</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "eSIM", "Roaming"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.aspect}>
                      <td className={styles.tdProvider}>{row.aspect}</td>
                      <td style={{ fontSize: "0.9rem" }}>{row.esim}</td>
                      <td style={{ fontSize: "0.9rem" }}>{row.roaming}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Assessment</span>
          <h2 className={styles.sectionTitle}>eSIM vs Roaming: Pros &amp; Cons</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>eSIM advantages</p>
              <ul className={styles.pickList}>
                {[
                  "Dramatically cheaper for stays of 2+ days",
                  "Same 4G/LTE speed as roaming",
                  "No daily cutoffs or surprise charges",
                  "Works on dual-SIM phones alongside home number",
                  "Install before you fly — active on landing",
                ].map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Roaming advantages</p>
              <ul className={styles.pickList}>
                {[
                  "Keep your home phone number active",
                  "Zero setup required",
                  "Good for single-day trips",
                  "T-Mobile offers free (throttled) roaming",
                ].map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* When Roaming Makes Sense */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Exceptions</span>
          <h2 className={styles.sectionTitle}>When Roaming Makes Sense</h2>
          <div className={styles.whoForGrid}>
            {whenRoamingMakesSense.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Setup Guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup guide</span>
          <h2 className={styles.sectionTitle}>How to Set Up a Japan eSIM</h2>
          <div className={styles.stepsList}>
            {setupSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem", fontSize: "0.9rem" }}>
            For a full step-by-step guide with screenshots for iPhone and Android, see our{" "}
            <Link href="/guides/esim/how-to-set-up-esim-japan" style={{ color: "#2563eb", fontWeight: 600 }}>
              How to Set Up an eSIM in Japan guide →
            </Link>
          </p>
          <a href={AIRALO_URL} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow" style={{ marginTop: "1.5rem", display: "inline-block" }}>
            Get Airalo Japan eSIM ($4.50 / 7 days) →
          </a>
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
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Tested &amp; Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/how-to-set-up-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>How to Set Up an eSIM in Japan (Step-by-Step)</p>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Stop paying $10/day for roaming</h2>
            <p className={styles.ctaBannerDesc}>
              Get a Japan eSIM from $3.50 for 7 days. Same 4G speed. Set up at home. Active before you land.
            </p>
            <a href={ESIMGO_URL} className={styles.ctaBannerBtn} target="_blank" rel="noopener noreferrer nofollow">
              Get eSIM Go Japan ($3.50) →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
