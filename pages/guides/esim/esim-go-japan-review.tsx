import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const AFFILIATE_URL = "https://breezesim.com?sca_ref=11082101.AF8vabyRKN";

const plans = [
  { name: "Japan S", data: "1 GB",  duration: "7 days",  price: "$3.50"  },
  { name: "Japan M", data: "5 GB",  duration: "15 days", price: "$8.00"  },
  { name: "Japan L", data: "10 GB", duration: "30 days", price: "$14.00" },
];

const pros = [
  "Best price-per-GB on the market",
  "Works in 190+ countries",
  "Instant activation via QR code",
  "Docomo network (excellent coverage)",
  "Great for multi-country trips",
];

const cons = [
  "Data-only (no voice or SMS)",
  "Smaller brand than Airalo or Holafly",
  "Email support only (no live chat)",
  "eSIM-compatible phone required",
];

const whoFor = [
  {
    title: "Budget-conscious travellers",
    desc: "eSIM Go consistently undercuts every major competitor on price. If keeping costs down matters, no Japan eSIM offers better value.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
      </svg>
    ),
  },
  {
    title: "Multi-country travellers",
    desc: "Planning Japan as part of a longer Asia trip? eSIM Go's single platform covers 190+ countries, so one account handles your entire itinerary.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: "Short-trip visitors",
    desc: "For a 5–7 day trip to Japan, eSIM Go's 1 GB / 7-day plan at $3.50 covers typical tourist usage — maps, messaging, and browsing — at the lowest available price.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
];

const vsRows = [
  { feature: "1 GB / 7 days",   esimgo: "$3.50",          airalo: "$4.50"           },
  { feature: "5 GB / 30 days",  esimgo: "$8.00",          airalo: "$9.50"           },
  { feature: "10 GB / 30 days", esimgo: "$14.00",         airalo: "$18.00"          },
  { feature: "Network",         esimgo: "Docomo",         airalo: "Docomo/SoftBank" },
  { feature: "Support",         esimgo: "Email only",     airalo: "24/7 live chat"  },
];

const setupSteps = [
  {
    title: "Purchase at breezesim.com",
    desc: "Visit the eSIM Go Japan page, select your plan (Japan S, M, or L), and complete checkout. The process takes under 2 minutes.",
  },
  {
    title: "Receive your QR code by email",
    desc: "Your QR code is delivered to your inbox immediately after purchase. No waiting — you can install it the same day you buy.",
  },
  {
    title: "Scan the QR code in Settings",
    desc: "Go to Settings → Cellular (iPhone) or Settings → Network & Internet → Add eSIM (Android). Scan the QR code from your email. The profile installs in under 2 minutes.",
  },
  {
    title: "Activate on arrival in Japan",
    desc: "Leave the eSIM Go profile switched off until your plane lands. Enable it once you land and you'll connect to Docomo within seconds — no airport queues.",
  },
];

const faqItems = [
  {
    q: "Is eSIM Go reliable in Japan?",
    a: "Yes. eSIM Go Japan runs on Docomo, Japan's largest and most reliable network. Docomo covers over 99% of the Japanese population and has the widest rural coverage of any domestic carrier. In practice, you will have a strong 4G signal in virtually every location tourists visit, from central Tokyo to rural Kyoto, Hakone, and beyond.",
  },
  {
    q: "What network does eSIM Go use in Japan?",
    a: "eSIM Go Japan uses the Docomo network exclusively. Docomo is Japan's largest carrier and is widely considered to have the best rural and regional coverage. For most destinations — cities, coastal towns, mountain resort areas — Docomo provides excellent speeds and reliability.",
  },
  {
    q: "How does eSIM Go compare to Airalo?",
    a: "eSIM Go is cheaper than Airalo on every comparable plan. The 1 GB / 7-day plan is $3.50 vs Airalo's $4.50, and the 10 GB / 30-day plan is $14.00 vs Airalo's $18.00. Both use Docomo (eSIM Go exclusively; Airalo uses Docomo and SoftBank). The main trade-off is support: Airalo offers 24/7 live chat while eSIM Go is email-only. For straightforward trips where you're unlikely to need support, eSIM Go's lower price is compelling.",
  },
  {
    q: "Can I use eSIM Go on iPhone?",
    a: "Yes. eSIM Go works on iPhone XS (2018) and all later models. Go to Settings → Cellular → Add eSIM and scan the QR code from your eSIM Go confirmation email. Make sure your iPhone is unlocked before purchasing — carrier-locked iPhones may not support third-party eSIMs.",
  },
  {
    q: "Is eSIM Go good for rural Japan?",
    a: "Yes — better than most alternatives. Because eSIM Go uses Docomo exclusively, and Docomo has the strongest rural coverage of any Japanese carrier, eSIM Go is actually the best eSIM choice for off-the-beaten-path travel. Whether you're hiking in Nikko, visiting Shikoku, or exploring the Noto Peninsula, Docomo is the safest bet for maintaining signal.",
  },
];

export default function EsimGoJapanReviewPage() {
  return (
    <>
      <Head>
        <title>eSIM Go Japan Review 2026: Cheapest eSIM for Japan? Honest Test | Japan Travel Kit</title>
        <meta
          name="description"
          content="Is eSIM Go the best budget eSIM for Japan? We tested their plans, Docomo coverage, and setup. Read our honest review."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/esim-go-japan-review" />
        <meta property="og:title" content="eSIM Go Japan Review 2026: Cheapest eSIM for Japan? Honest Test" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/esim-go-japan-review" />
        <meta property="og:description" content="Is eSIM Go the best budget eSIM for Japan? We tested their plans, Docomo coverage, and setup. Read our honest review." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="eSIM Go Japan Review 2026: Cheapest eSIM for Japan? Honest Test" />
        <meta name="twitter:description" content="Is eSIM Go the best budget eSIM for Japan? We tested their plans, Docomo coverage, and setup. Read our honest review." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "eSIM Go Japan Review 2026: Cheapest eSIM for Japan? Honest Test",
              dateModified: "2026-04-01",
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>eSIM Go Japan Review</span>
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
            eSIM Go Japan Review 2026:<br />Best Budget eSIM for Japan?
          </h1>
          <p className={styles.heroSubtitle}>
            The cheapest Japan eSIM we tested. But does it actually deliver on speed and coverage?
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "Independently Reviewed", "Best Value Pick"].map((t) => (
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
              <span className={styles.verdictScore}>4.2 / 5</span>
            </div>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best For</p>
                <p className={styles.verdictStatValue}>Budget travellers, multi-country trips</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Price From</p>
                <p className={styles.verdictStatValue}>$3.50 / 7 days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Network</p>
                <p className={styles.verdictStatValue}>Docomo</p>
              </div>
            </div>
            <a
              href={AFFILIATE_URL}
              className={styles.verdictBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get eSIM Go Japan →
            </a>
          </div>
        </div>

        {/* What is eSIM Go */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What is eSIM Go?</h2>
          <p className={styles.bodyText}>
            eSIM Go is a global eSIM provider operating through the Breeze platform, covering 190+
            countries with data-only plans designed for international travellers. While it lacks the
            brand recognition of Airalo or Holafly, eSIM Go consistently undercuts both on price —
            making it one of the most cost-effective ways to stay connected abroad.
          </p>
          <p className={styles.bodyText}>
            For Japan, eSIM Go runs exclusively on Docomo — Japan&apos;s largest carrier and the network
            with the best rural coverage. Plans range from 1 GB / 7 days at $3.50 up to 10 GB /
            30 days at $14.00, all delivered via QR code with instant activation.
          </p>
          <p className={styles.bodyText}>
            The platform is straightforward: buy a plan, receive a QR code by email, scan it in
            your phone Settings, and activate on arrival. There is no dedicated app required —
            everything is managed through your device&apos;s native eSIM settings.
          </p>
        </section>

        {/* Plans table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>eSIM Go Japan Plans</h2>
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
                  {plans.map((plan) => (
                    <tr key={plan.name}>
                      <td className={styles.tdProvider}>{plan.name}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{plan.data}</td>
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
          <h2 className={styles.sectionTitle}>Who Is eSIM Go Best For?</h2>
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

        {/* eSIM Go vs Airalo */}
        <section className={styles.comparisonFeature}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>eSIM Go vs Airalo: Which Is Cheaper?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.featureTable}>
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>eSIM Go</th>
                    <th>Airalo</th>
                  </tr>
                </thead>
                <tbody>
                  {vsRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.ftFeature}>{row.feature}</td>
                      <td className={styles.ftEsim}>{row.esimgo}</td>
                      <td className={styles.ftSim}>{row.airalo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ fontSize: "0.82rem", color: "#6b7280", marginTop: "1rem", lineHeight: 1.6 }}>
            <strong style={{ color: "#0d1b4b" }}>Bottom line:</strong> eSIM Go is cheaper than Airalo
            on every plan. The trade-off is support — Airalo&apos;s 24/7 live chat is more reassuring
            for first-time eSIM users. If you&apos;re comfortable with the setup process, eSIM Go saves
            you money with no compromise on network quality.
          </p>
        </section>

        {/* Setup steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup guide</span>
          <h2 className={styles.sectionTitle}>How to Set Up eSIM Go</h2>
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
            eSIM Go Japan is the clearest recommendation for budget-conscious travellers who
            want the lowest possible price without sacrificing network quality. At $3.50 for
            1 GB / 7 days on Docomo — Japan&apos;s best-coverage carrier — nothing on the market
            beats it for value.
          </p>
          <p className={styles.verdictText}>
            The only meaningful weakness is support. Airalo and Holafly both offer 24/7 live
            chat; eSIM Go is email-only. For experienced eSIM users who are unlikely to run into
            problems, this is a non-issue. For first-time eSIM users who want the reassurance of
            instant support, Airalo is the safer choice even at a slightly higher price.
          </p>
          <p className={styles.verdictText}>
            For multi-country Asia trips, eSIM Go also makes particular sense: one platform, one
            account, and competitive pricing across 190+ countries. If Japan is one stop on a
            longer journey, eSIM Go simplifies the entire trip.
          </p>
          <a
            href={AFFILIATE_URL}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Get eSIM Go Japan →
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
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airalo Japan Review 2026: Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/esim-vs-sim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="9" height="14" rx="1" />
                  <rect x="13" y="5" width="9" height="14" rx="1" />
                  <line x1="11" y1="12" x2="13" y2="12" />
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
              See how eSIM Go stacks up against Airalo, Holafly, and Sakura Mobile on price,
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
