import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const plans = [
  { name: "Moshi Moshi S", data: "1 GB",  duration: "7 days",  price: "$4.50"  },
  { name: "Moshi Moshi M", data: "3 GB",  duration: "30 days", price: "$9.50"  },
  { name: "Moshi Moshi L", data: "10 GB", duration: "30 days", price: "$18.00" },
];

const pros = [
  "World's largest eSIM marketplace",
  "Instant activation before you land",
  "Competitive pricing from $4.50",
  "Trusted by 10M+ travellers",
  "Easy-to-use app",
];

const cons = [
  "Data-only (no voice calls or SMS)",
  "Requires eSIM-compatible phone",
  "Customer support can be slow",
];

const whoFor = [
  {
    title: "Short-trip travellers",
    desc: "1–4 week visits where you need data, not calling. Airalo's 7-day and 30-day plans cover most tourist itineraries.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    title: "First-time eSIM users",
    desc: "Airalo's app makes scanning and activating a QR code straightforward — even if you've never used an eSIM before.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Budget-conscious travellers",
    desc: "At $4.50 for 1 GB / 7 days, Airalo is one of the most affordable options for staying connected in Japan.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
      </svg>
    ),
  },
];

const setupSteps = [
  {
    title: "Download the Airalo app",
    desc: "Available free on iOS and Android. Create an account — it takes under a minute.",
  },
  {
    title: "Purchase your Japan plan",
    desc: "Search for Japan, pick your plan (we recommend Moshi Moshi M for most visitors), and checkout. You'll receive a QR code instantly.",
  },
  {
    title: "Scan QR code in Settings",
    desc: "Go to Settings → Cellular (or Mobile Data) → Add eSIM → Scan QR Code. Takes under 2 minutes and can be done at home before you fly.",
  },
  {
    title: "Activate on arrival in Japan",
    desc: "Switch to your Airalo Japan eSIM profile when your plane lands. You'll have a live 4G signal before you reach baggage claim.",
  },
];

const faqItems = [
  {
    q: "Is Airalo legit?",
    a: "Yes. Airalo is a legitimate, well-established company founded in 2019 and trusted by over 10 million travellers worldwide. They operate as a licensed eSIM marketplace and partner with major carriers globally, including Docomo and SoftBank in Japan.",
  },
  {
    q: "Does Airalo work in rural Japan?",
    a: "Airalo Japan runs on Docomo and SoftBank networks — two of Japan's three main carriers. Docomo has the broadest rural coverage in Japan. In practice, you'll have signal on popular tourist routes including mountainous areas like Nikko and Hakone. Very remote areas (deep mountains, some islands) may have limited coverage regardless of carrier.",
  },
  {
    q: "Can I top up my Airalo eSIM in Japan?",
    a: "Yes. You can purchase an additional plan from the Airalo app while in Japan and it will top up your existing eSIM profile. No need to scan a new QR code.",
  },
  {
    q: "Is Airalo cheaper than roaming?",
    a: "Almost always, yes. Most international roaming plans charge $10–15 per day. Airalo's Japan plans start at $4.50 for 7 days — that's the full week for less than the daily roaming rate. For a two-week trip, Airalo's 3 GB 30-day plan at $9.50 is dramatically cheaper than roaming.",
  },
  {
    q: "Can I use Airalo on iPhone?",
    a: "Yes. iPhone XS (2018) and later support eSIM. Go to Settings → Cellular → Add eSIM and scan the Airalo QR code. Note: iPhones purchased from some carriers (especially older unlocked units from certain regions) may have eSIM locked. Check with your carrier if unsure.",
  },
];

export default function AiraloJapanReviewPage() {
  return (
    <>
      <Head>
        <title>Airalo Japan Review 2025: Honest Test &amp; Verdict | Japan Travel Kit</title>
        <meta
          name="description"
          content="Is Airalo worth it for Japan? We tested their Japan eSIM plans, speeds, and setup. Read our honest review before you buy."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/airalo-japan-review" />
        <meta property="og:title" content="Airalo Japan Review 2025: Honest Test & Verdict" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/airalo-japan-review" />
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
          <span className={styles.breadCurrent}>Airalo Japan Review</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📱</span> Updated April 2025
          </p>
          <h1 className={styles.heroTitle}>
            Airalo Japan Review 2025:<br />Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            We tested Airalo&apos;s Japan eSIM. Here&apos;s everything you need to know.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2025", "Independently Reviewed", "Data-Only eSIM"].map((t) => (
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
              <span className={styles.verdictScore}>4.5 / 5</span>
            </div>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best For</p>
                <p className={styles.verdictStatValue}>Short trips, first-time eSIM users</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Price From</p>
                <p className={styles.verdictStatValue}>$4.50 / 7 days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Network</p>
                <p className={styles.verdictStatValue}>Docomo &amp; SoftBank</p>
              </div>
            </div>
            <a href="#" className={styles.verdictBtn}>
              Get Airalo Japan eSIM →
            </a>
          </div>
        </div>

        {/* What is Airalo */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What is Airalo?</h2>
          <p className={styles.bodyText}>
            Airalo is the world&apos;s largest eSIM marketplace, founded in 2019 and now trusted by over
            10 million travellers across 190+ countries. Rather than operating its own network, Airalo
            partners with local carriers — in Japan&apos;s case, Docomo and SoftBank — and sells data-only
            eSIM plans through its app and website.
          </p>
          <p className={styles.bodyText}>
            For Japan, Airalo sells plans under the &ldquo;Moshi Moshi&rdquo; brand. Plans range from 1 GB / 7 days
            at $4.50 up to 10 GB / 30 days at $18.00. All plans are data-only — there are no voice calls
            or SMS included.
          </p>
          <p className={styles.bodyText}>
            The key appeal is simplicity: buy before you fly, scan a QR code, and you have working 4G
            the moment you land at Narita or Haneda. No queuing at airport SIM vending machines.
          </p>
        </section>

        {/* Plans table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Airalo Japan Plans</h2>
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
          <h2 className={styles.sectionTitle}>Who Is Airalo Best For?</h2>
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

        {/* Setup steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup guide</span>
          <h2 className={styles.sectionTitle}>How to Set Up Airalo Japan eSIM</h2>
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
            Airalo Japan is an excellent choice for most travellers, especially those visiting for
            a week to a month. The combination of reliable Docomo/SoftBank coverage, competitive
            pricing, and near-instant setup makes it hard to beat as a first-time eSIM experience.
          </p>
          <p className={styles.verdictText}>
            The only real downsides are the data-only limitation (no calls or SMS) and occasionally
            slow customer support responses — neither of which will affect most tourists who rely on
            WhatsApp or LINE for communication.
          </p>
          <p className={styles.verdictText}>
            For budget travellers or anyone who wants the simplest possible connectivity solution,
            Airalo Japan is our top pick. For unlimited data or longer stays with voice requirements,
            consider Holafly or Sakura Mobile instead.
          </p>
          <a href="#" className={styles.pickCta}>
            Get Airalo Japan eSIM →
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
                <p className={styles.relatedTitle}>Best eSIM for Japan 2025: Top 4 Picks Tested &amp; Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <div className={styles.relatedCardSoon}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>eSIM vs SIM Card for Japan: Which Should You Get?</p>
                <span className={styles.relatedSoon}>Coming soon</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Compare all Japan eSIM options</h2>
            <p className={styles.ctaBannerDesc}>
              See how Airalo stacks up against Holafly, eSIM Go, and Sakura Mobile on price,
              coverage, and features.
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
