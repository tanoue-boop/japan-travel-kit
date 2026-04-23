import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const plans = [
  { name: "Japan eSIM", data: "Unlimited", duration: "5 days",  price: "$19.00" },
  { name: "Japan eSIM", data: "Unlimited", duration: "10 days", price: "$27.00" },
  { name: "Japan eSIM", data: "Unlimited", duration: "30 days", price: "$49.00" },
];

const pros = [
  "Truly unlimited data, no caps",
  "No speed throttling worries",
  "Easy QR code setup",
  "Popular with US & European travellers",
  "24/7 live chat support",
];

const cons = [
  "Data-only (no voice or SMS)",
  "Pricier than data-capped alternatives",
  "SoftBank only (not Docomo)",
  "eSIM-compatible phone required",
];

const whoFor = [
  {
    title: "Heavy data users",
    desc: "If you stream video, use Google Maps constantly, or work remotely, unlimited data removes the stress of monitoring your data usage.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: "Video & live streamers",
    desc: "Uploading reels, live streaming, or video calling back home? Holafly's unlimited plan means you never hit a wall mid-upload.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
  },
  {
    title: "Worry-free short-trippers",
    desc: "On a tight 5–10 day itinerary and don't want to think about data? Holafly's flat-rate unlimited plans give you one less thing to manage.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
];

const vsRows = [
  { feature: "Data",           holafly: "Unlimited",         airalo: "1 GB – 10 GB"         },
  { feature: "Price (7 days)", holafly: "$19.00",            airalo: "$4.50 (1 GB)"          },
  { feature: "Network",        holafly: "SoftBank",          airalo: "Docomo & SoftBank"     },
  { feature: "Voice calls",    holafly: "No",                airalo: "No"                    },
  { feature: "Best for",       holafly: "Heavy data users",  airalo: "Budget travellers"     },
];

const setupSteps = [
  {
    title: "Visit holafly.com and choose your Japan plan",
    desc: "Select your trip duration — 5, 10, or 30 days. Checkout takes under 2 minutes and your QR code is emailed to you immediately.",
  },
  {
    title: "Scan the QR code in Settings",
    desc: "Go to Settings → Cellular (or Mobile Data) → Add eSIM → Scan QR Code. The Holafly profile installs in under 2 minutes. You can do this at home before you fly.",
  },
  {
    title: "Set Holafly as your data SIM",
    desc: "In Settings → Cellular, set Holafly as your default data line. Keep your home SIM active for calls and texts if your phone supports dual SIM.",
  },
  {
    title: "Activate on arrival in Japan",
    desc: "Switch to your Holafly eSIM profile as you land. Your unlimited data starts immediately — no registration, no airport queues.",
  },
];

const faqItems = [
  {
    q: "Is Holafly truly unlimited in Japan?",
    a: "Holafly advertises unlimited data with no hard caps, and for the vast majority of users that holds true — browsing, maps, streaming, and video calls all work without hitting a limit. That said, like most mobile networks, SoftBank's fair-use policy may apply during severe network congestion in busy areas. In practice, this is rare and most travellers never notice any throttling.",
  },
  {
    q: "Does Holafly work on iPhone?",
    a: "Yes. Holafly is an eSIM, so it works on any iPhone XS (2018) or later. Go to Settings → Cellular → Add eSIM and scan the Holafly QR code. Make sure your iPhone is unlocked (not carrier-locked) before purchasing.",
  },
  {
    q: "Is Holafly better than Airalo for Japan?",
    a: "It depends on your usage. Airalo is better value for light-to-moderate data users — $4.50 for 1 GB or $9.50 for 3 GB covers most tourist trips comfortably. Holafly is better for heavy users who stream video, use data-intensive apps, or simply don't want to monitor their usage. If you'd buy more than 3 GB from Airalo, Holafly's unlimited plan starts to look competitive.",
  },
  {
    q: "Can I use Holafly for a whole month in Japan?",
    a: "Yes — Holafly offers a 30-day unlimited plan at $49. For a long stay, compare this against Sakura Mobile's physical SIM plans, which include voice calls and English support for a similar price. For pure data, Holafly's 30-day plan is hard to beat.",
  },
  {
    q: "What network does Holafly use in Japan?",
    a: "Holafly Japan runs on the SoftBank network. SoftBank has excellent coverage across major cities, tourist routes, and most populated areas. For very rural travel (deep mountains, remote islands), Docomo generally has the edge — in which case Airalo's dual Docomo/SoftBank coverage may be a better fit.",
  },
];

export default function HolaflyJapanReviewPage() {
  return (
    <>
      <Head>
        <title>Holafly Japan Review 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="Is Holafly worth it for Japan? We tested their unlimited data eSIM plans, SoftBank coverage, and value for money. Find out if it's worth the price."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/holafly-japan-review" />
        <meta property="og:title" content="Holafly Japan Review 2026: Is Unlimited Data Worth the Price?" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/holafly-japan-review" />
        <meta property="og:description" content="Is Holafly worth it for Japan? We tested their unlimited data eSIM plans, SoftBank coverage, and value for money. Find out if it's worth the price." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Holafly Japan Review 2026: Is Unlimited Data Worth the Price?" />
        <meta name="twitter:description" content="Is Holafly worth it for Japan? We tested their unlimited data eSIM plans, SoftBank coverage, and value for money. Find out if it's worth the price." />
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
              headline: "Holafly Japan Review 2026: Is Unlimited Data Worth the Price?",
              dateModified: "2026-04-01",
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Holafly Japan Review</span>
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
            Holafly Japan Review 2026:<br />Is Unlimited Data Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            Unlimited data sounds great. But is Holafly actually worth the premium price for Japan?
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "Independently Reviewed", "Unlimited Data eSIM"].map((t) => (
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

        {/* Quick Verdict */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Verdict</span>
            <div className={styles.verdictStarRow}>
              <div className={styles.verdictStars}>
                <span className={styles.starFull}>★</span>
                <span className={styles.starFull}>★</span>
                <span className={styles.starFull}>★</span>
                <span className={styles.starFull}>★</span>
                <span className={styles.starHalf}>★</span>
              </div>
              <span className={styles.verdictScore}>4.3 / 5</span>
            </div>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best For</p>
                <p className={styles.verdictStatValue}>Heavy data users, worry-free travellers</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Price From</p>
                <p className={styles.verdictStatValue}>$19.00 / 5 days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Network</p>
                <p className={styles.verdictStatValue}>SoftBank</p>
              </div>
            </div>
            <a href="#" className={styles.verdictBtn}>
              Get Holafly Japan eSIM →
            </a>
          </div>
        </div>

        {/* What is Holafly */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What is Holafly?</h2>
          <p className={styles.bodyText}>
            Holafly is a European-founded eSIM brand known for one thing: unlimited data. Founded in
            Spain and now operating in 200+ countries, Holafly built its reputation on removing the
            anxiety of data caps — you pay a flat rate and use as much data as you like.
          </p>
          <p className={styles.bodyText}>
            For Japan, Holafly offers unlimited data plans running on the SoftBank network, one of
            Japan&apos;s three major carriers with strong coverage across cities and popular tourist routes.
            Plans are available for 5, 10, or 30 days, priced from $19.
          </p>
          <p className={styles.bodyText}>
            With 8,700+ customer reviews and a 4.3 average rating, Holafly has a strong track record
            among American and European travellers who prioritize convenience over cost per gigabyte.
          </p>
        </section>

        {/* Plans table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Holafly Japan Plans</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Plan", "Data", "Duration", "Price"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan, i) => (
                    <tr key={i}>
                      <td className={styles.tdProvider}>{plan.name}</td>
                      <td style={{ fontWeight: 800, color: "#c62828" }}>{plan.data}</td>
                      <td className={styles.tdNetwork}>{plan.duration}</td>
                      <td className={styles.tdPrice}>{plan.price}</td>
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
          <h2 className={styles.sectionTitle}>Pros &amp; Cons</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {pros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {cons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Fit</span>
          <h2 className={styles.sectionTitle}>Who Is Holafly Best For?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Holafly vs Airalo */}
        <section className={styles.comparisonFeature}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>Holafly vs Airalo: Which Is Better?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.featureTable}>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Holafly</th>
                    <th>Airalo</th>
                  </tr>
                </thead>
                <tbody>
                  {vsRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.ftFeature}>{row.feature}</td>
                      <td className={styles.ftEsim}>{row.holafly}</td>
                      <td className={styles.ftSim}>{row.airalo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ fontSize: "0.82rem", color: "#6b7280", marginTop: "1rem", lineHeight: 1.6 }}>
            <strong style={{ color: "#0d1b4b" }}>Bottom line:</strong> Choose Holafly if you use more
            than 3–5 GB per week or simply don&apos;t want to track usage. Choose Airalo if you want the
            best price-per-GB and are comfortable with a data cap.
          </p>
        </section>

        {/* Setup steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup guide</span>
          <h2 className={styles.sectionTitle}>How to Set Up Holafly Japan eSIM</h2>
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
        </section>

        {/* Verdict */}
        <section className={styles.verdictSection}>
          <span className={styles.sectionLabel}>Bottom line</span>
          <h2 className={styles.sectionTitle}>Verdict</h2>
          <p className={styles.verdictText}>
            Holafly Japan delivers on its core promise: unlimited data with no cap anxiety. If you
            stream video, rely on mobile hotspot, or simply hate the feeling of watching a data counter
            tick down, the peace of mind is genuinely worth the premium.
          </p>
          <p className={styles.verdictText}>
            The main trade-off is price. At $19 for 5 days, Holafly costs more than four times
            Airalo&apos;s cheapest plan. For light users — checking maps, WhatsApp, and email — that premium
            is hard to justify. But for heavy users who&apos;d comfortably burn through 5+ GB in a week,
            Holafly is excellent value.
          </p>
          <p className={styles.verdictText}>
            One caveat: Holafly Japan runs on SoftBank only. This is fine for most tourist destinations,
            but if your itinerary includes rural areas or very remote locations, Airalo&apos;s dual
            Docomo/SoftBank coverage gives broader fallback options.
          </p>
          <a href="#" className={styles.pickCta}>
            Get Holafly Japan eSIM →
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
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="9" y1="16" x2="13" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Tested &amp; Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/airalo-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airalo Japan Review 2026: Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read review →</span>
              </div>
            </Link>
            <Link href="/guides/esim/esim-vs-sim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>eSIM vs SIM Card for Japan: Which Should You Get?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Compare all Japan eSIM options</h2>
            <p className={styles.ctaBannerDesc}>
              See how Holafly stacks up against Airalo, eSIM Go, and Sakura Mobile on price,
              data, and coverage.
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
