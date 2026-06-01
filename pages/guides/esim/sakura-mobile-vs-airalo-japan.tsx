import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const comparisonRows = [
  { feature: "Price",            airalo: "From $4.50",         sakura: "From $28 / month" },
  { feature: "Data",             airalo: "1 GB – 10 GB",       sakura: "7 GB – Unlimited" },
  { feature: "Voice calls",      airalo: "No",                 sakura: "Yes" },
  { feature: "SMS",              airalo: "No",                 sakura: "Yes" },
  { feature: "Network",          airalo: "Docomo & SoftBank",  sakura: "Docomo" },
  { feature: "English support",  airalo: "24/7 chat",          sakura: "Phone & email" },
  { feature: "Contract",         airalo: "None",               sakura: "Monthly" },
  { feature: "Best for",         airalo: "Short trips",        sakura: "Long stays" },
  { feature: "Setup",            airalo: "QR code",            sakura: "QR code or physical" },
];

const costRows = [
  { trip: "1 week",   airalo: "$9.50 (3 GB)",  sakura: "$28 (minimum)", winner: "Airalo" },
  { trip: "2 weeks",  airalo: "$18 (10 GB)",   sakura: "$28",            winner: "Airalo" },
  { trip: "1 month",  airalo: "$18 (10 GB)",   sakura: "$28",            winner: "Airalo" },
  { trip: "3 months", airalo: "$54 (×3)",      sakura: "$84",            winner: "Sakura Mobile" },
];

const sakuraMakesSense = [
  {
    title: "Stays of 1 month or more",
    desc: "If you're staying longer than a typical tourist visit, monthly billing and a real local plan make more sense than buying back-to-back prepaid eSIMs.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: "You need a Japanese phone number",
    desc: "Restaurant reservations, Uber, banking confirmations, and many delivery services require a Japanese mobile number. Airalo cannot provide one.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: "Phone-based verification & calls",
    desc: "Uber, banks, couriers like Yamato, and Japanese services often call to confirm. Without a working voice line, you can end up waiting on confirmations that never come.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Business travel in Japan",
    desc: "Conference calls, client coordination, and reliable English-speaking support matter more than the cheapest monthly rate.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
];

const faqItems = [
  {
    q: "Is Sakura Mobile better than Airalo for Japan?",
    a: "It depends on what you need. Airalo is better for short-trip tourists who only need data — it's much cheaper and activates instantly. Sakura Mobile is better for long stays, business travel, or anyone who needs voice calls, SMS, and a Japanese phone number. They serve different purposes rather than competing head-on.",
  },
  {
    q: "Can I make phone calls with Airalo in Japan?",
    a: "No. Airalo's Japan plans are data-only. You can use VoIP apps like WhatsApp, LINE, FaceTime, or Skype to make calls over the internet, but you can't make or receive regular cellular calls, and you won't get a Japanese phone number. If real voice service matters, Sakura Mobile is the more practical choice.",
  },
  {
    q: "Is Sakura Mobile worth it for a 2-week trip?",
    a: "Usually not. A 2-week tourist trip is exactly the scenario Airalo is built for — $18 for 10 GB over 30 days is more than enough for most travellers. Sakura Mobile's $28+ monthly plans only pay off if you specifically need voice calls, SMS, or a Japanese number during those two weeks (for example, restaurant reservations or Uber confirmation calls).",
  },
  {
    q: "Does Sakura Mobile work as an eSIM?",
    a: "Yes. Sakura Mobile offers eSIM plans delivered by QR code, alongside their physical SIM option. The eSIM works on most modern iPhones (XS and later) and major Android models. Setup is similar to Airalo — scan a QR code in your phone's cellular settings — but activation can take 1–2 business days.",
  },
  {
    q: "Which is better for business travel in Japan?",
    a: "Sakura Mobile, in most cases. Business trips often involve client calls, conference dial-ins, restaurant bookings made by phone, and verification SMS — none of which Airalo supports. Sakura Mobile also runs on Docomo, the most reliable network in Japan, and their English-speaking support team is based in Japan and handles billing and technical issues during local business hours.",
  },
];

export default function SakuraMobileVsAiraloJapanPage() {
  return (
    <>
      <Head>
        <title>Sakura Mobile vs Airalo Japan 2026: Which Is Better? | Japan Travel Kit</title>
        <meta
          name="description"
          content="Sakura Mobile or Airalo for Japan? One offers voice calls and long-term plans, the other low prices and simplicity. We compare both for every trip type."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/sakura-mobile-vs-airalo-japan" />
        <meta property="og:title" content="Sakura Mobile vs Airalo Japan 2026: Which Is Better?" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/sakura-mobile-vs-airalo-japan" />
        <meta property="og:description" content="Sakura Mobile or Airalo for Japan? One offers voice calls and long-term plans, the other low prices and simplicity. We compare both for every trip type." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sakura Mobile vs Airalo Japan 2026: Which Is Better?" />
        <meta name="twitter:description" content="Sakura Mobile or Airalo for Japan? One offers voice calls and long-term plans, the other low prices and simplicity. We compare both for every trip type." />
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
                { "@type": "ListItem", position: 4, name: "Sakura Mobile vs Airalo Japan", item: "https://www.japan-travel-kit.com/guides/esim/sakura-mobile-vs-airalo-japan" },
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
              headline: "Sakura Mobile vs Airalo for Japan (2026): Which Is Right for You?",
              dateModified: "2026-06-01",
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
          <span className={styles.breadCurrent}>Sakura Mobile vs Airalo Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>⚔️</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Sakura Mobile vs Airalo for Japan (2026):<br />Which Is Right for You?
          </h1>
          <p className={styles.heroSubtitle}>
            Sakura Mobile offers voice calls and long-term plans. Airalo offers simplicity and low prices.
            Here&apos;s which one suits your trip.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Head-to-Head", "Honest Verdict"].map((t) => (
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

        {/* Quick Verdict Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Verdict</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>Head-to-Head</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Choose Airalo if</p>
                <p className={styles.verdictStatValue}>Data-only, short trip (1–2 weeks), budget-conscious</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Choose Sakura Mobile if</p>
                <p className={styles.verdictStatValue}>Need voice calls, long stay (1 month+), want English support</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Key Difference</p>
                <p className={styles.verdictStatValue}>Airalo from $4.50 vs Sakura Mobile from $28 / month</p>
              </div>
            </div>
            <div className={styles.pickCtaRow}>
              <a
                href="https://airalo.pxf.io/c/7213504/1268485/15608"
                className={styles.verdictBtn}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Get Airalo →
              </a>
              <a
                href="https://p.sakuramobile.jp/idevaffiliate.php?id=486"
                className={styles.pickCtaInternal}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Get Sakura Mobile →
              </a>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>Side-by-Side Comparison</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Airalo</th>
                    <th>Sakura Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.ftFeature}>{row.feature}</td>
                      <td className={styles.ftEsim}>{row.airalo}</td>
                      <td className={styles.ftSim}>{row.sakura}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Airalo Key Strengths */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Provider Deep Dive</span>
          <h2 className={styles.sectionTitle}>Airalo for Japan: Key Strengths</h2>
          <div className={styles.choiceGrid}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderEsim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>Airalo Japan</p>
                  <p className={styles.choiceCardSubtitle}>From $4.50 / 7 days</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Dramatically cheaper than monthly plans</li>
                  <li><span className={styles.choiceCheck}>✓</span> Perfect for short tourist visits</li>
                  <li><span className={styles.choiceCheck}>✓</span> Works in 190+ countries (not just Japan)</li>
                  <li><span className={styles.choiceCheck}>✓</span> Instant QR delivery — activate before you fly</li>
                  <li><span className={styles.choiceCheck}>✓</span> No contract, no commitment</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Airalo&apos;s strength is simplicity at a low price. For a typical 1–2 week tourist trip
            built around maps, messaging and social media, the 3 GB plan at $9.50 or the 10 GB
            plan at $18 covers everything most travellers will use. There&apos;s nothing to set up beyond
            scanning a QR code, and the same Airalo app works in dozens of other countries — useful
            if Japan is one stop on a longer trip.
          </p>
          <Link href="/guides/esim/airalo-japan-review" className={styles.pickCtaInternal} style={{ marginTop: "0.5rem", display: "inline-flex" }}>
            Full Airalo Japan Review →
          </Link>
        </section>

        {/* Sakura Mobile Key Strengths */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Provider Deep Dive</span>
          <h2 className={styles.sectionTitle}>Sakura Mobile for Japan: Key Strengths</h2>
          <div className={styles.choiceGrid}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderSim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>Sakura Mobile</p>
                  <p className={styles.choiceCardSubtitle}>From $28 / month</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Voice calls and SMS included</li>
                  <li><span className={styles.choiceCheck}>✓</span> Real English-speaking support based in Japan</li>
                  <li><span className={styles.choiceCheck}>✓</span> Built for long stays and business travel</li>
                  <li><span className={styles.choiceCheck}>✓</span> Japanese phone number for bookings &amp; deliveries</li>
                  <li><span className={styles.choiceCheck}>✓</span> Docomo network — best rural coverage in Japan</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Sakura Mobile is one of the few foreigner-friendly carriers in Japan that offers
            voice calls, SMS, and a real Japanese phone number to non-residents. For long stays,
            business travel, or anyone whose itinerary depends on phone-based confirmations
            (restaurant reservations, Uber, banking calls, courier deliveries), it solves problems
            Airalo cannot.
          </p>
          <Link href="/guides/esim/sakura-mobile-review" className={styles.pickCtaInternal} style={{ marginTop: "0.5rem", display: "inline-flex" }}>
            Full Sakura Mobile Review →
          </Link>
        </section>

        {/* When does Sakura Mobile make sense */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Decision Guide</span>
          <h2 className={styles.sectionTitle}>When Does Sakura Mobile Make Sense?</h2>
          <div className={styles.whoForGrid}>
            {sakuraMakesSense.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cost Comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Value Analysis</span>
          <h2 className={styles.sectionTitle}>Cost Comparison by Trip Length</h2>
          <p className={styles.bodyText}>
            Price is where the gap is widest. For typical tourist trip lengths, Airalo is always
            cheaper. Sakura Mobile only starts to look reasonable once the convenience of a single
            monthly bill outweighs the hassle of stacking multiple short-term Airalo plans.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Trip Length</th>
                    <th>Airalo</th>
                    <th>Sakura Mobile</th>
                    <th>Cheaper</th>
                  </tr>
                </thead>
                <tbody>
                  {costRows.map((row) => (
                    <tr key={row.trip}>
                      <td className={styles.ftFeature}>{row.trip}</td>
                      <td className={styles.ftEsim}>{row.airalo}</td>
                      <td className={styles.ftSim}>{row.sakura}</td>
                      <td>
                        <span className={row.winner === "Airalo" ? styles.ftWinnerEsim : styles.ftWinnerSim} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", fontWeight: 700, padding: "0.15rem 0.55rem", borderRadius: "9999px" }}>
                          {row.winner}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Bottom line:</strong> For short stays, Airalo wins decisively. For stays of
            three months or longer — or when voice calls and a Japanese number are part of the
            requirement — Sakura Mobile starts to make more sense.
          </p>
        </section>

        {/* Verdict */}
        <section className={styles.verdictSection}>
          <span className={styles.sectionLabel}>Bottom Line</span>
          <h2 className={styles.sectionTitle}>Our Verdict</h2>
          <p className={styles.verdictText}>
            <strong>For tourists:</strong> Airalo wins on price and simplicity. A 1–2 week visit
            built around sightseeing, maps and messaging needs data, not a phone number. Airalo
            delivers exactly that for a fraction of the cost.
          </p>
          <p className={styles.verdictText}>
            <strong>For long-term residents or business travellers:</strong> Sakura Mobile is
            worth the premium. Voice calls, SMS, English-speaking support and a Japanese phone
            number solve real problems that Airalo&apos;s data-only model cannot.
          </p>
          <p className={styles.verdictText}>
            These two providers don&apos;t really compete — they serve different travellers. Pick
            based on whether you mainly need <em>data connectivity</em> or a proper{" "}
            <em>local phone line</em>.
          </p>
          <div className={styles.pickCtaRow}>
            <a
              href="https://airalo.pxf.io/c/7213504/1268485/15608"
              className={styles.pickCta}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Airalo Japan eSIM →
            </a>
            <a
              href="https://p.sakuramobile.jp/idevaffiliate.php?id=486"
              className={styles.pickCtaInternal}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Sakura Mobile →
            </a>
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
            <Link href="/guides/esim/airalo-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airalo Japan Review 2026: Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read review →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/sim-cards" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Compare All Japan SIM Options</p>
                <span className={styles.relatedArrow}>View comparison →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Still deciding between data-only and voice?</h2>
            <p className={styles.ctaBannerDesc}>
              See how Airalo, Sakura Mobile, Holafly and eSIM Go compare side-by-side on price,
              coverage and features for every trip type.
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
