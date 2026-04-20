import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const plans = [
  { name: "Standard", data: "7 GB",  duration: "30 days", price: "$28.00" },
  { name: "Standard", data: "15 GB", duration: "30 days", price: "$38.00" },
  { name: "Standard", data: "30 GB", duration: "30 days", price: "$52.00" },
];

const pros = [
  "Full English customer support",
  "Voice calls & SMS included",
  "Physical SIM or eSIM available",
  "Docomo network (best rural coverage)",
  "Best for stays of 1 month+",
];

const cons = [
  "Higher price than data-only options",
  "Not ideal for short trips",
  "Slower setup than eSIM-only providers",
];

const whoFor = [
  {
    title: "Long-stay travellers",
    desc: "Staying a month or more? Sakura Mobile's 30-day plans and easy renewal make it the most practical option for extended visits.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: "Travellers who need voice calls",
    desc: "Sakura Mobile is one of the only tourist SIMs that includes real voice calls and SMS — essential if you need to call hotels, restaurants, or local services.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: "Rural & countryside explorers",
    desc: "Docomo has the widest rural coverage of any Japanese carrier. If you're heading beyond major cities — Tohoku, Shikoku, rural Kyushu — Sakura Mobile on Docomo is the safest bet.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Those who value English support",
    desc: "Sakura Mobile's English-speaking support team is available by email and chat — a significant advantage if something goes wrong mid-trip.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

const setupSteps = [
  {
    title: "Order online before your trip",
    desc: "Visit Sakura Mobile's website and select your plan. Both physical SIM and eSIM options are available. Complete checkout and you'll receive confirmation by email.",
  },
  {
    title: "Choose delivery to hotel or airport pickup",
    desc: "Physical SIM cards can be shipped to your hotel in Japan or collected at a designated counter. eSIM orders receive a QR code by email immediately after purchase.",
  },
  {
    title: "Insert SIM or scan QR on arrival",
    desc: "For physical SIM, insert it when you arrive. For eSIM, scan the QR code in Settings before you fly and activate on landing. You'll be connected to Docomo within seconds.",
  },
];

const faqItems = [
  {
    q: "Does Sakura Mobile have English support?",
    a: "Yes — English support is one of Sakura Mobile's main selling points. They offer English-language customer service via email and live chat. Response times are typically within a few hours during business hours. This is significantly better than most other Japan SIM providers, which offer Japanese-only support.",
  },
  {
    q: "Can I make phone calls with Sakura Mobile?",
    a: "Yes. Unlike most eSIM providers for Japan (such as Airalo and Holafly), Sakura Mobile includes voice calls and SMS on all plans. You'll receive a Japanese phone number. Call rates to local numbers are included; international calls are billed separately.",
  },
  {
    q: "Is Sakura Mobile good for rural Japan?",
    a: "Yes. Sakura Mobile runs on Docomo, which has the broadest rural coverage of any Japanese carrier. If you're visiting areas beyond major cities — such as Tohoku, rural Hokkaido, the Noto Peninsula, or remote parts of Shikoku — Docomo is the network most likely to have signal.",
  },
  {
    q: "How long does delivery take?",
    a: "Delivery to a Japanese hotel typically takes 1–3 business days after your order is placed. Airport pickup is available for same-day collection. If you choose eSIM, the QR code is delivered by email immediately and can be installed before you fly.",
  },
  {
    q: "Can I extend my Sakura Mobile plan?",
    a: "Yes. Sakura Mobile allows plan renewals and top-ups. If you extend your stay, you can purchase an additional month's plan through their website. The process is straightforward and managed entirely in English.",
  },
];

export default function SakuraMobileReviewPage() {
  return (
    <>
      <Head>
        <title>Sakura Mobile Review 2025: Best SIM Card for Long Stays in Japan? | Japan Travel Kit</title>
        <meta
          name="description"
          content="Sakura Mobile offers voice calls, English support and Docomo coverage. But is it worth the price? Our honest review."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/sakura-mobile-review" />
        <meta property="og:title" content="Sakura Mobile Review 2025: Best SIM Card for Long Stays in Japan?" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/sakura-mobile-review" />
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
          <span className={styles.breadCurrent}>Sakura Mobile Review</span>
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
            Sakura Mobile Review 2025:<br />Best SIM for Long Stays in Japan?
          </h1>
          <p className={styles.heroSubtitle}>
            The only tourist SIM with real English support and voice calls.
            But is it worth the higher price?
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2025", "Independently Reviewed", "Physical SIM & eSIM"].map((t) => (
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
              <span className={styles.verdictScore}>4.4 / 5</span>
            </div>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best For</p>
                <p className={styles.verdictStatValue}>Long stays, voice calls needed</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Price From</p>
                <p className={styles.verdictStatValue}>$28 / 30 days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Network</p>
                <p className={styles.verdictStatValue}>Docomo</p>
              </div>
            </div>
            <a href="#" className={styles.verdictBtn}>
              Get Sakura Mobile →
            </a>
          </div>
        </div>

        {/* What is Sakura Mobile */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What is Sakura Mobile?</h2>
          <p className={styles.bodyText}>
            Sakura Mobile is a Japan-focused SIM and eSIM provider specifically designed for foreign
            visitors. Unlike global eSIM marketplaces such as Airalo, Sakura Mobile operates as a
            Japan-specialist service with a dedicated English-speaking support team and plans built
            around tourist and long-stay visitor needs.
          </p>
          <p className={styles.bodyText}>
            All plans run on the Docomo network — Japan&apos;s largest carrier and the one with the
            widest rural coverage. Sakura Mobile offers both physical SIM cards (delivered to your
            hotel or collected at the airport) and eSIM, making it accessible to virtually all
            compatible devices.
          </p>
          <p className={styles.bodyText}>
            The standout feature is support for voice calls and SMS. Most tourist eSIM providers
            (Airalo, Holafly, eSIM Go) are data-only. Sakura Mobile includes a Japanese phone
            number, voice calls, and SMS — essential for booking restaurants, contacting your accommodation,
            or contacting local services during a longer stay.
          </p>
        </section>

        {/* Plans table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Sakura Mobile Plans</h2>
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
          <h2 className={styles.sectionTitle}>Who Is Sakura Mobile Best For?</h2>
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

        {/* Sakura Mobile vs Airalo */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>Sakura Mobile vs Airalo</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Sakura Mobile</th>
                    <th>Airalo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.ftFeature}>SIM type</td>
                    <td className={styles.ftEsim}>Physical + eSIM</td>
                    <td className={styles.ftSim}>eSIM only</td>
                  </tr>
                  <tr>
                    <td className={styles.ftFeature}>Voice calls</td>
                    <td className={styles.ftEsim}>✓ Included</td>
                    <td className={styles.ftSim}>✗ Data only</td>
                  </tr>
                  <tr>
                    <td className={styles.ftFeature}>Network</td>
                    <td className={styles.ftEsim}>Docomo</td>
                    <td className={styles.ftSim}>Docomo / SoftBank</td>
                  </tr>
                  <tr>
                    <td className={styles.ftFeature}>Price (30 days)</td>
                    <td className={styles.ftEsim}>From $28</td>
                    <td className={styles.ftSim}>From $9.50</td>
                  </tr>
                  <tr>
                    <td className={styles.ftFeature}>Best for</td>
                    <td className={styles.ftEsim}>Long stay</td>
                    <td className={styles.ftSim}>Short trip</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Setup steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup guide</span>
          <h2 className={styles.sectionTitle}>How to Get Sakura Mobile</h2>
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
            Sakura Mobile occupies a unique position in the Japan SIM market: it&apos;s the go-to
            option for travellers who need more than data. If you&apos;re staying a month or longer,
            need to make local phone calls, or want the reassurance of English-speaking customer
            support, Sakura Mobile is the clear choice.
          </p>
          <p className={styles.verdictText}>
            The price premium is real — at $28 for 7 GB / 30 days, it&apos;s three times the cost
            of Airalo&apos;s entry-level plan. But for what you get (voice calls, SMS, Docomo&apos;s
            unrivalled rural coverage, and genuine English support), the premium is justified for
            the right traveller.
          </p>
          <p className={styles.verdictText}>
            For short trips of a week or two where you only need data, Airalo or eSIM Go offer
            better value. But for anyone spending a month in Japan — whether studying, working
            remotely, or taking an extended holiday — Sakura Mobile is the most complete solution available.
          </p>
          <a href="#" className={styles.pickCta}>
            Get Sakura Mobile →
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
            <Link href="/guides/esim/airalo-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airalo Japan Review 2025: Is It Worth It?</p>
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
              See how Sakura Mobile stacks up against Airalo, Holafly, and eSIM Go on price,
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
