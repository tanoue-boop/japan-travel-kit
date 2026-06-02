import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const SAKURA_URL = "https://p.sakuramobile.jp/idevaffiliate.php?id=486";
const HOLAFLY_URL = "#";

const compareTable = [
  { feature: "Price",           sakura: "From $28/month",  holafly: "From $19/5 days" },
  { feature: "Data",            sakura: "7GB",             holafly: "Unlimited" },
  { feature: "Voice calls",     sakura: "Yes",             holafly: "No" },
  { feature: "SMS",             sakura: "Yes",             holafly: "No" },
  { feature: "Network",         sakura: "Docomo",          holafly: "SoftBank" },
  { feature: "Contract",        sakura: "Monthly",         holafly: "No contract" },
  { feature: "English support", sakura: "Phone & email",   holafly: "Chat & email" },
  { feature: "Best for",        sakura: "Long stays & voice", holafly: "Heavy data users" },
];

const costTable = [
  { trip: "5 days",   sakura: "$28 (min)", holafly: "$19"  },
  { trip: "10 days",  sakura: "$28",       holafly: "$27"  },
  { trip: "30 days",  sakura: "$28",       holafly: "$49"  },
  { trip: "3 months", sakura: "$84",       holafly: "$147" },
];

const faqItems = [
  {
    q: "Is Sakura Mobile or Holafly better for Japan?",
    a: "It depends on what you need. Sakura Mobile is better if you need voice calls, a Japanese phone number, or are staying long-term — it runs on Docomo with strong rural coverage and real English phone support. Holafly is better for short to medium trips where you just want unlimited data and don't need calls or SMS. Neither is universally 'best' — they solve different problems.",
  },
  {
    q: "Does Holafly offer voice calls in Japan?",
    a: "No. Holafly is a data-only eSIM — there are no voice calls or SMS included. You can still make calls over the internet using apps like WhatsApp, LINE, or FaceTime, but you won't get a Japanese phone number or be able to make traditional phone calls. If you need voice calls, Sakura Mobile is the better choice.",
  },
  {
    q: "Is Sakura Mobile worth it for a short trip?",
    a: "Usually not. Sakura Mobile's minimum is a monthly plan from around $28, so for a 5-day trip you'd pay the full month for 7GB. For short trips, Holafly's unlimited 5-day plan at $19 — or a cheaper data eSIM like Airalo — typically offers better value. Sakura Mobile makes most sense for longer stays or when you genuinely need voice and SMS.",
  },
  {
    q: "Which has better rural coverage in Japan?",
    a: "Sakura Mobile. It runs on the Docomo network, which has the broadest coverage in Japan including mountainous and rural areas. Holafly uses SoftBank, which is excellent in cities but slightly weaker in some remote regions. If your itinerary includes the countryside or smaller towns, Sakura Mobile's Docomo coverage is the safer bet.",
  },
  {
    q: "Can I use Holafly for a 1-month stay in Japan?",
    a: "Yes. Holafly offers plans up to 30 days and beyond, with unlimited data throughout. For a 1-month stay expect to pay around $49. That said, if you need voice calls or a Japanese number during a long stay, Sakura Mobile's monthly plan (~$28) is both cheaper and more capable for that use case.",
  },
];

export default function SakuraMobileVsHolaflyPage() {
  const metaTitle = "Sakura Mobile vs Holafly Japan 2026: Which Is Better? | Japan Travel Kit";
  const metaDescription =
    "Sakura Mobile or Holafly for Japan? One offers voice calls on Docomo, the other unlimited data on SoftBank. We compare both for every trip type and budget.";
  const canonical = "https://www.japan-travel-kit.com/guides/esim/sakura-mobile-vs-holafly-japan";

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:url" content={canonical} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
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
                { "@type": "ListItem", position: 4, name: "Sakura Mobile vs Holafly Japan", item: "https://www.japan-travel-kit.com/guides/esim/sakura-mobile-vs-holafly-japan" },
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
              headline: "Sakura Mobile vs Holafly for Japan (2026): Which Should You Choose?",
              dateModified: "2026-06-02",
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
          <span className={styles.breadCurrent}>Sakura Mobile vs Holafly</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📱</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Sakura Mobile vs Holafly for Japan (2026):<br />Which Should You Choose?
          </h1>
          <p className={styles.heroSubtitle}>
            Sakura Mobile has voice calls and Docomo coverage.
            Holafly has unlimited data and no contracts.
            Here&apos;s which one is right for your Japan trip.
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
            This doesn&apos;t affect our comparison or verdict.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Verdict Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Verdict</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>Voice vs Unlimited</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Choose Sakura Mobile if</p>
                <p className={styles.verdictStatValue}>You need voice calls, a long stay, or a Japanese phone number</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Choose Holafly if</p>
                <p className={styles.verdictStatValue}>You&apos;re a heavy data user on a short–medium, data-only trip</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Key Difference</p>
                <p className={styles.verdictStatValue}>Sakura from $28/month vs Holafly from $19/5 days</p>
              </div>
            </div>
            <div className={styles.pickCtaRow}>
              <a
                href={SAKURA_URL}
                className={styles.verdictBtn}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Get Sakura Mobile →
              </a>
              <a
                href={HOLAFLY_URL}
                className={styles.pickCtaInternal}
              >
                Get Holafly →
              </a>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>At a Glance</span>
          <h2 className={styles.sectionTitle}>Side-by-Side Comparison</h2>
          <p className={styles.bodyText}>
            These two providers sit at opposite ends of the spectrum: a full-service Japanese carrier with
            voice and SMS, versus a data-only unlimited eSIM. Here&apos;s how they line up feature by feature:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Sakura Mobile</th>
                    <th>Holafly</th>
                  </tr>
                </thead>
                <tbody>
                  {compareTable.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.ftFeature}>{row.feature}</td>
                      <td className={styles.ftSim}>{row.sakura}</td>
                      <td className={styles.ftEsim}>{row.holafly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Sakura Mobile strengths */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Option 1</span>
          <h2 className={styles.sectionTitle}>Sakura Mobile: Key Strengths</h2>
          <div className={styles.choiceGrid} style={{ marginBottom: "1.5rem" }}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderSim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>Sakura Mobile – Voice & Coverage</p>
                  <p className={styles.choiceCardSubtitle}>From $28/month · Docomo · 7GB</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Voice calls and SMS included — not just data</li>
                  <li><span className={styles.choiceCheck}>✓</span> Runs on Docomo — Japan&apos;s strongest rural coverage</li>
                  <li><span className={styles.choiceCheck}>✓</span> Genuine English support by phone and email</li>
                  <li><span className={styles.choiceCheck}>✓</span> Can provide a real Japanese phone number</li>
                  <li><span className={styles.conIcon}>−</span> Monthly minimum — less suited to very short trips</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            Sakura Mobile is built for travellers who need more than data. The Docomo network gives you the
            broadest coverage in the country, and the voice/SMS support plus a Japanese phone number make it
            ideal for long stays, working visits, or anyone who needs to be reachable on a local number.
          </p>
          <p className={styles.bodyText}>
            For the full picture, read our{" "}
            <Link href="/guides/esim/sakura-mobile-review" style={{ color: "#1d4ed8", fontWeight: 600 }}>
              Sakura Mobile review
            </Link>.
          </p>
          <a
            href={SAKURA_URL}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.5rem", display: "inline-flex" }}
          >
            Get Sakura Mobile →
          </a>
        </section>

        {/* Holafly strengths */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Option 2</span>
          <h2 className={styles.sectionTitle}>Holafly: Key Strengths</h2>
          <div className={styles.choiceGrid} style={{ marginBottom: "1.5rem" }}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderEsim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>Holafly – Unlimited Data</p>
                  <p className={styles.choiceCardSubtitle}>From $19/5 days · SoftBank · Unlimited</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Truly unlimited data — never worry about a cap</li>
                  <li><span className={styles.choiceCheck}>✓</span> No contract — buy per trip and you&apos;re done</li>
                  <li><span className={styles.choiceCheck}>✓</span> Ideal for short to medium trips</li>
                  <li><span className={styles.choiceCheck}>✓</span> Great for streaming, maps, and heavy browsing</li>
                  <li><span className={styles.conIcon}>−</span> Data-only — no voice calls or SMS</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            Holafly is the pick for data-hungry travellers who don&apos;t need calls. With unlimited data and
            no contract, you simply buy a plan for your trip length and stop thinking about your usage. The
            SoftBank network is excellent in cities and along the main tourist routes.
          </p>
          <p className={styles.bodyText}>
            For the full picture, read our{" "}
            <Link href="/guides/esim/holafly-japan-review" style={{ color: "#1d4ed8", fontWeight: 600 }}>
              Holafly Japan review
            </Link>.
          </p>
          <a
            href={HOLAFLY_URL}
            className={styles.pickCtaInternal}
            style={{ marginTop: "0.5rem", display: "inline-flex" }}
          >
            Get Holafly →
          </a>
        </section>

        {/* Cost Comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost</span>
          <h2 className={styles.sectionTitle}>Cost Comparison</h2>
          <p className={styles.bodyText}>
            Price tells the clearest story. For short trips Holafly is cheaper, but because Sakura Mobile&apos;s
            monthly rate stays flat while Holafly&apos;s climbs with trip length, the longer you stay the more
            Sakura Mobile pulls ahead:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Trip Length</th>
                    <th>Sakura Mobile</th>
                    <th>Holafly</th>
                  </tr>
                </thead>
                <tbody>
                  {costTable.map((row) => (
                    <tr key={row.trip}>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{row.trip}</td>
                      <td className={styles.ftSim}>{row.sakura}</td>
                      <td className={styles.ftEsim}>{row.holafly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>The takeaway:</strong> for anything beyond a couple of weeks, Sakura Mobile wins
            decisively on price — and that&apos;s before you factor in the voice calls and SMS you also get.
          </p>
        </section>

        {/* Network Comparison */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Coverage</span>
          <h2 className={styles.sectionTitle}>Network Comparison</h2>
          <ul className={styles.bodyList}>
            <li><strong>Sakura Mobile (Docomo):</strong> the widest coverage in Japan, including rural areas, mountains, and smaller towns. The safest choice if you&apos;re heading off the main tourist trail.</li>
            <li><strong>Holafly (SoftBank):</strong> excellent in cities and along major routes like Tokyo–Kyoto–Osaka, but slightly weaker than Docomo in some remote or mountainous regions.</li>
          </ul>
          <p className={styles.bodyText}>
            For most city-focused itineraries, both networks perform well. If your trip includes the
            countryside, Docomo&apos;s reach gives Sakura Mobile the edge.
          </p>
        </section>

        {/* Verdict */}
        <section className={styles.verdictSection}>
          <span className={styles.sectionLabel}>Bottom line</span>
          <h2 className={styles.sectionTitle}>Our Verdict</h2>
          <p className={styles.verdictText}>
            There&apos;s no single winner here — the right choice depends entirely on what you need from your
            connection. The decision comes down to one question: do you need to make calls, or do you just
            need data?
          </p>
          <p className={styles.verdictText}>
            <strong>Need voice calls or staying long-term?</strong> Choose Sakura Mobile. The Docomo coverage,
            English phone support, Japanese number, and flat monthly price make it the clear pick for longer
            or more demanding trips.
          </p>
          <p className={styles.verdictText}>
            <strong>Just need unlimited data for a short trip?</strong> Choose Holafly. With no contract and
            no data cap, it&apos;s the simplest way to stay connected for a one- or two-week, data-only visit.
          </p>
          <div className={styles.pickCtaRow}>
            <a
              href={SAKURA_URL}
              className={styles.pickCta}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Sakura Mobile →
            </a>
            <a
              href={HOLAFLY_URL}
              className={styles.pickCtaInternal}
            >
              Get Holafly →
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
                  <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sakura Mobile Review 2026</p>
                <span className={styles.relatedArrow}>Read review →</span>
              </div>
            </Link>
            <Link href="/guides/esim/holafly-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Holafly Japan eSIM Review 2026</p>
                <span className={styles.relatedArrow}>Read review →</span>
              </div>
            </Link>
            <Link href="/guides/esim/sakura-mobile-vs-airalo-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3v18M16 3v18M3 8h5M3 16h5M16 8h5M16 16h5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sakura Mobile vs Airalo Japan</p>
                <span className={styles.relatedArrow}>Read comparison →</span>
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
            <h2 className={styles.ctaBannerTitle}>Still weighing up your options?</h2>
            <p className={styles.ctaBannerDesc}>
              Compare all Japan eSIM and SIM options — Airalo, Holafly, eSIM Go, and Sakura Mobile —
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
