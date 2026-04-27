import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const allPlans = [
  { provider: "eSIM Go",      plan: "Japan S",    data: "1 GB",       duration: "7 days",  price: "$3.50",  network: "Docomo"   },
  { provider: "eSIM Go",      plan: "Japan M",    data: "5 GB",       duration: "15 days", price: "$8.00",  network: "Docomo"   },
  { provider: "eSIM Go",      plan: "Japan L",    data: "10 GB",      duration: "30 days", price: "$14.00", network: "Docomo"   },
  { provider: "Airalo",       plan: "Moshi S",    data: "1 GB",       duration: "7 days",  price: "$4.50",  network: "Docomo"   },
  { provider: "Airalo",       plan: "Moshi M",    data: "3 GB",       duration: "30 days", price: "$9.50",  network: "Docomo"   },
  { provider: "Airalo",       plan: "Moshi L",    data: "10 GB",      duration: "30 days", price: "$18.00", network: "Docomo"   },
  { provider: "Holafly",      plan: "Unlimited",  data: "Unlimited",  duration: "5 days",  price: "$19.00", network: "SoftBank" },
  { provider: "Holafly",      plan: "Unlimited",  data: "Unlimited",  duration: "10 days", price: "$27.00", network: "SoftBank" },
  { provider: "Holafly",      plan: "Unlimited",  data: "Unlimited",  duration: "30 days", price: "$49.00", network: "SoftBank" },
  { provider: "Sakura Mobile", plan: "Standard",  data: "7 GB",       duration: "30 days", price: "$28.00", network: "Docomo"   },
];

const dataUsage = [
  { activity: "Google Maps navigation", perDay: "~50 MB"  },
  { activity: "Social media browsing",  perDay: "~150 MB" },
  { activity: "Streaming video (SD)",   perDay: "~500 MB" },
  { activity: "Video calls",            perDay: "~300 MB" },
  { activity: "Light use total",        perDay: "~200 MB" },
  { activity: "Heavy use total",        perDay: "~1 GB"   },
];

const byTripLength = [
  { length: "1–3 days",   pick: "eSIM Go 1 GB ($3.50)",      reason: "The cheapest plan available. More than enough data for a short city visit using navigation and messaging." },
  { length: "4–7 days",   pick: "eSIM Go 1 GB or Airalo 1 GB", reason: "Either 1 GB plan covers a week of moderate use. eSIM Go is slightly cheaper; Airalo has a more established app." },
  { length: "1–2 weeks",  pick: "Airalo 3 GB ($9.50)",       reason: "The best-value plan for a standard Japan holiday. 3 GB comfortably covers maps, messaging, and social media for 14 days." },
  { length: "2–4 weeks",  pick: "Holafly Unlimited or eSIM Go 10 GB", reason: "Heavy users and those travelling for 3–4 weeks should consider unlimited (Holafly) or a large data plan (eSIM Go 10 GB at $14)." },
  { length: "1 month+",   pick: "Sakura Mobile ($28)",       reason: "For long stays, Sakura Mobile offers Docomo coverage, optional voice calls, and English-language customer support — worth the premium." },
];

const byUsage = [
  {
    type: "Light user",
    desc: "Mostly maps and messaging. No video streaming. 1–2 GB is plenty for a standard 2-week trip.",
    pick: "eSIM Go Japan S (1 GB, $3.50)",
    affiliateUrl: "https://breezesim.com?sca_ref=11082101.AF8vabyRKN",
  },
  {
    type: "Average user",
    desc: "Maps, social media, occasional photo uploads to the cloud. Standard tourist behaviour over 1–2 weeks.",
    pick: "Airalo Moshi M (3 GB, $9.50)",
    affiliateUrl: "https://airalo.pxf.io/c/7213504/1268485/15608",
  },
  {
    type: "Heavy user",
    desc: "Streaming video, frequent video calls, uploading content, or travelling for 3+ weeks.",
    pick: "Holafly Unlimited",
    affiliateUrl: "#",
  },
  {
    type: "Need voice calls",
    desc: "Requires a real Japanese phone number for reservations, SIM-dependent apps, or calling hotels.",
    pick: "Sakura Mobile Standard ($28)",
    affiliateUrl: "https://p.sakuramobile.jp/idevaffiliate.php?id=486",
  },
];

const pricePerGb = [
  { provider: "eSIM Go",      plan: "Japan L (10 GB)",  pricePerGb: "$1.40/GB",  note: "Best value per GB"     },
  { provider: "eSIM Go",      plan: "Japan M (5 GB)",   pricePerGb: "$1.60/GB",  note: ""                      },
  { provider: "Airalo",       plan: "Moshi L (10 GB)",  pricePerGb: "$1.80/GB",  note: ""                      },
  { provider: "Airalo",       plan: "Moshi M (3 GB)",   pricePerGb: "$3.17/GB",  note: ""                      },
  { provider: "Sakura Mobile", plan: "Standard (7 GB)", pricePerGb: "$4.00/GB",  note: "Includes voice option" },
  { provider: "Holafly",      plan: "Unlimited",        pricePerGb: "N/A",        note: "Flat rate per day"     },
];

const faqItems = [
  {
    q: "Which Japan eSIM has the best data plan?",
    a: "For pure value, eSIM Go's 10 GB plan at $14 offers the lowest cost per GB ($1.40/GB) of any Japan eSIM. For most holiday travellers, Airalo's 3 GB 30-day plan at $9.50 is the most practical — enough data for two weeks of maps, messaging, and social media. Holafly's unlimited plan suits heavy users or those who stream video regularly.",
  },
  {
    q: "Is 3 GB enough for 2 weeks in Japan?",
    a: "For most travellers, yes. 3 GB over 14 days works out to about 200 MB per day — enough for navigation, messaging, social media, and occasional photo uploads. If you plan to stream video, make frequent video calls, or upload large files, consider a 5–10 GB plan or Holafly's unlimited option instead.",
  },
  {
    q: "Which is cheaper: Airalo or eSIM Go?",
    a: "eSIM Go is consistently cheaper at every data tier. Their 1 GB plan costs $3.50 vs Airalo's $4.50, and their 10 GB plan costs $14.00 vs Airalo's $18.00. Both run on Docomo — so coverage is identical. eSIM Go wins on price; Airalo wins on app experience and brand recognition.",
  },
  {
    q: "Can I buy more data if I run out in Japan?",
    a: "Yes, for most providers. Airalo lets you top up by purchasing an additional plan in the app — no new QR code required. eSIM Go allows top-ups through its website. Holafly's unlimited plan means you never run out. Sakura Mobile allows data add-ons via their customer portal. Plan ahead if you're heading to rural areas — you'll need an internet connection to complete the top-up.",
  },
  {
    q: "Which Japan eSIM has the fastest speeds?",
    a: "Speed depends more on the underlying network than the eSIM provider. Plans running on Docomo (eSIM Go, Airalo, Sakura Mobile) typically offer excellent 4G LTE speeds of 20–80 Mbps in cities. Holafly runs on SoftBank, which is also fast but has slightly less rural coverage than Docomo. In practice, you're unlikely to notice a difference for everyday use — Japan's LTE networks are outstanding nationwide.",
  },
];

export default function JapanEsimDataPlansPage() {
  return (
    <>
      <Head>
        <title>Japan eSIM Data Plans 2026: Full Comparison | Japan Travel Kit</title>
        <meta
          name="description"
          content="Compare every major Japan eSIM data plan from Airalo, eSIM Go, Holafly, and Sakura Mobile. Find the right plan for your trip length and data needs."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/japan-esim-data-plans" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Japan eSIM Data Plans 2026: Full Comparison | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/japan-esim-data-plans" />
        <meta property="og:description" content="Compare every major Japan eSIM data plan from Airalo, eSIM Go, Holafly, and Sakura Mobile. Find the right plan for your trip length and data needs." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan eSIM Data Plans 2026: Full Comparison | Japan Travel Kit" />
        <meta name="twitter:description" content="Compare every major Japan eSIM data plan from Airalo, eSIM Go, Holafly, and Sakura Mobile. Find the right plan for your trip length and data needs." />
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
              headline: "Japan eSIM Data Plans Compared (2026): Which Is Right for You?",
              dateModified: "2026-04-27",
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
                { "@type": "ListItem", position: 1, name: "Home",                item: "https://japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",              item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards",    item: "https://japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "Japan eSIM Data Plans", item: "https://japan-travel-kit.com/guides/esim/japan-esim-data-plans" },
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
            <span>📱</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            Japan eSIM Data Plans Compared (2026):<br />Which Is Right for You?
          </h1>
          <p className={styles.heroSubtitle}>
            Not all Japan eSIM plans are equal. Here&apos;s a clear comparison of every major data plan —
            so you can pick the right one before you fly.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "All Providers", "Prices Verified"].map((t) => (
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
            This doesn&apos;t affect our rankings or comparisons.{" "}
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
                <p className={styles.verdictStatLabel}>Best 1 GB Plan</p>
                <p className={styles.verdictStatValue}>eSIM Go ($3.50 / 7 days)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best 3 GB Plan</p>
                <p className={styles.verdictStatValue}>Airalo ($9.50 / 30 days)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Unlimited</p>
                <p className={styles.verdictStatValue}>Holafly ($19 / 5 days)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Best with voice calls:</strong> Sakura Mobile ($28 / 30 days) — the only eSIM provider on this list that offers an optional Japanese phone number and English-language customer support.
            </p>
          </div>
        </div>

        {/* Full Plan Comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>All plans</span>
          <h2 className={styles.sectionTitle}>Full Data Plan Comparison</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Provider", "Plan", "Data", "Duration", "Price", "Network"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allPlans.map((row, i) => (
                    <tr key={i}>
                      <td className={styles.tdProvider}>{row.provider}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.plan}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b", whiteSpace: "nowrap" }}>{row.data}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.duration}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td className={styles.tdNetwork}>{row.network}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Prices shown in USD. All plans are data-only except Sakura Mobile, which offers an optional voice add-on. Prices verified April 2026 — check provider websites for current rates.
          </p>
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
            Most travellers to Japan fall into the &ldquo;light use&rdquo; category — maps, messaging, and occasional Instagram posts. At ~200 MB/day, a 3 GB plan covers 15 days comfortably. If you stream video on trains or make regular FaceTime calls, budget for 500 MB–1 GB per day.
          </p>
        </section>

        {/* By Trip Length */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>By trip length</span>
          <h2 className={styles.sectionTitle}>Best Plan by Trip Length</h2>
          <div className={styles.stepsList}>
            {byTripLength.map((row, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{row.length} → {row.pick}</p>
                  <p className={styles.stepDesc}>{row.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* By Usage Type */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>By usage type</span>
          <h2 className={styles.sectionTitle}>Best Plan by Usage Type</h2>

          {byUsage.map((item) => (
            <div key={item.type} className={styles.providerBlock}>
              <div className={styles.providerHeader}>
                <h3 className={styles.providerName}>{item.type}</h3>
              </div>
              <p className={styles.bodyText} style={{ margin: "0 0 0.75rem" }}>{item.desc}</p>
              <p className={styles.bodyText} style={{ margin: "0 0 0.75rem" }}>
                <strong>Our pick:</strong> {item.pick}
              </p>
              <a
                href={item.affiliateUrl}
                className={styles.pickCta}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Get this plan →
              </a>
            </div>
          ))}
        </section>

        {/* Price Per GB */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Value comparison</span>
          <h2 className={styles.sectionTitle}>Price Per GB Comparison</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Provider", "Plan", "Price / GB", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pricePerGb.map((row) => (
                    <tr key={row.provider + row.plan}>
                      <td className={styles.tdProvider}>{row.provider}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.plan}</td>
                      <td className={styles.tdPrice}>{row.pricePerGb}</td>
                      <td style={{ fontSize: "0.83rem", color: "var(--text-muted)" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Price per GB favours larger plans — but only buy what you&apos;ll actually use. A 1 GB plan that lasts your trip is better value than a 10 GB plan you only use 2 GB of.
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
            <Link href="/guides/esim/japan-sim-short-vs-long-stay" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Japan SIM Card for Your Trip Length (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
