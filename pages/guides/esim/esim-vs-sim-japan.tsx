import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const comparisonRows = [
  { feature: "Activation",       esim: "Before you fly",          sim: "On arrival (airport/shop)", winner: "esim" },
  { feature: "Phone requirement", esim: "eSIM-compatible device",  sim: "Any unlocked phone",        winner: "sim"  },
  { feature: "Voice calls",      esim: "Data-only (most plans)",  sim: "Included on some plans",    winner: "sim"  },
  { feature: "Price (7 days)",   esim: "From $4.50",              sim: "From ¥2,000 (~$13)",        winner: "esim" },
  { feature: "Keep home SIM",    esim: "Yes (dual SIM)",          sim: "No — must swap",            winner: "esim" },
  { feature: "Setup effort",     esim: "QR code scan, 2 min",     sim: "Airport queue + card swap", winner: "esim" },
  { feature: "Lost/stolen risk", esim: "None (digital)",          sim: "Possible (physical card)",  winner: "esim" },
  { feature: "Late-night arrival", esim: "Works instantly",       sim: "Shops may be closed",       winner: "esim" },
];

const esimPros = [
  "Activate before you land — no airport queues",
  "Keep your home SIM active simultaneously",
  "No physical card to lose or damage",
  "Cheaper than most airport SIM options",
  "Works across 190+ countries with one app",
];
const esimCons = [
  "Requires iPhone XS+ or compatible Android",
  "Data-only on most Japan plans (no calls)",
  "Some older or carrier-locked phones not supported",
];

const simPros = [
  "Works on any unlocked phone",
  "Some plans include voice calls",
  "No tech setup — just swap the card",
  "Available at major airports on arrival",
];
const simCons = [
  "Must queue at an airport SIM vending machine",
  "Can't use your home number while the Japan SIM is active",
  "More expensive than eSIM equivalents",
  "Shops may be closed on late-night arrivals",
];

const whoFor = [
  {
    choice: "eSIM",
    badgeCls: styles.pickBadgeBlue,
    title: "Get an eSIM if…",
    items: [
      "Your phone is iPhone XS or newer",
      "You want to activate before you fly",
      "You're arriving late at night",
      "You're visiting multiple countries",
      "You want the cheapest data option",
    ],
  },
  {
    choice: "Physical SIM",
    badgeCls: styles.pickBadgeGreen,
    title: "Get a Physical SIM if…",
    items: [
      "Your phone doesn't support eSIM",
      "Your phone is carrier-locked",
      "You need voice calls included",
      "You prefer sorting things on arrival",
      "You're sharing data with a companion",
    ],
  },
];

const setupSteps = [
  {
    title: "Check eSIM compatibility",
    desc: "Go to Settings → About (Android) or Settings → General → About → Available SIMs (iPhone). If you see an eSIM option, you're good to go.",
  },
  {
    title: "Choose your provider and plan",
    desc: "For most visitors, Airalo Japan is the best-value eSIM. For unlimited data, Holafly. For physical SIM, Sakura Mobile and IIJmio are reliable options.",
  },
  {
    title: "eSIM: scan QR code | Physical SIM: collect at airport",
    desc: "eSIM users scan their QR code at home before flying. Physical SIM users collect their card at the airport SIM vending machines (Narita, Haneda, Kansai, Chubu all have them).",
  },
  {
    title: "Activate and connect",
    desc: "eSIM: switch to your Japan profile when you land. Physical SIM: insert card and enable Data Roaming. Both should connect within seconds of activation.",
  },
];

const faqItems = [
  {
    q: "Does an eSIM work on all phones in Japan?",
    a: "No — eSIM requires hardware support. Compatible devices include iPhone XS and later, Google Pixel 3 and later, Samsung Galaxy S20 and later, and many other modern flagships. Importantly, some carrier-locked phones (especially older Japanese market devices) may not support eSIM even if the hardware exists. Check Settings → About on your phone to confirm.",
  },
  {
    q: "Can I buy a physical SIM card at the airport in Japan?",
    a: "Yes. All major international airports in Japan (Narita, Haneda, Kansai, Chubu) have SIM card vending machines operated by IIJmio, Softbank, and others. Operating hours vary — most operate from 7am to 11pm. If you arrive late at night, you may find the machines closed, which is another reason eSIM is often preferable.",
  },
  {
    q: "Is eSIM more reliable than a physical SIM in Japan?",
    a: "Both eSIM and physical SIM use the same underlying networks (Docomo, SoftBank, au). Reliability is determined by the network and the plan, not the SIM format itself. eSIM has one practical advantage: there's no physical card to lose, damage, or have rejected by a slightly dirty SIM tray.",
  },
  {
    q: "Can I use both an eSIM and a physical SIM at the same time?",
    a: "Yes, if your phone supports dual SIM. Most modern phones allow one physical SIM plus one or more eSIMs to be active simultaneously. This lets you keep your home SIM active for calls and texts while using a Japan eSIM for data — the ideal setup for most travellers.",
  },
  {
    q: "Which is better for a two-week trip to Japan?",
    a: "For a two-week trip, eSIM is almost always the better choice if your phone supports it. Airalo's 3 GB / 30-day plan at $9.50 covers two weeks comfortably for most users, is cheaper than airport SIM options, and can be activated before you board. If you need voice calls, Sakura Mobile's physical SIM (with voice included) is the best alternative.",
  },
];

export default function EsimVsSimJapanPage() {
  return (
    <>
      <Head>
        <title>eSIM vs SIM Card for Japan 2026: Which Should You Get? | Japan Travel Kit</title>
        <meta
          name="description"
          content="eSIM or physical SIM card for Japan? We compare price, convenience, phone compatibility, and coverage to help you choose the right option for your trip."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/esim-vs-sim-japan" />
        <meta property="og:title" content="eSIM vs SIM Card for Japan: Which Should You Get?" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/esim-vs-sim-japan" />
        <meta property="og:description" content="eSIM or physical SIM card for Japan? We compare price, convenience, phone compatibility, and coverage to help you choose the right option for your trip." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="eSIM vs SIM Card for Japan: Which Should You Get?" />
        <meta name="twitter:description" content="eSIM or physical SIM card for Japan? We compare price, convenience, phone compatibility, and coverage to help you choose the right option for your trip." />
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
              headline: "eSIM vs SIM Card for Japan: Which Should You Get?",
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
          <span className={styles.breadCurrent}>eSIM vs SIM Card</span>
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
            eSIM vs SIM Card for Japan:<br />Which Should You Get?
          </h1>
          <p className={styles.heroSubtitle}>
            Both work well in Japan. But one is faster, cheaper, and easier to set up.
            Here&apos;s how to choose.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "Practical Guide", "All Phone Types"].map((t) => (
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

        {/* Quick Answer — 2-choice box */}
        <section className={styles.choiceSection}>
          <span className={styles.sectionLabel}>Quick answer</span>
          <h2 className={styles.sectionTitle}>Which Is Right for You?</h2>
          <div className={styles.choiceGrid}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderEsim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <path d="M12 18h.01" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>Get an eSIM if…</p>
                  <p className={styles.choiceCardSubtitle}>Recommended for most travellers</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  {[
                    "Your phone is iPhone XS or newer",
                    "You want to activate before you fly",
                    "You're arriving late at night",
                    "You want to keep your home SIM active",
                    "You're visiting multiple countries",
                  ].map((item) => (
                    <li key={item}><span className={styles.choiceCheck}>✓</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderSim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>Get a Physical SIM if…</p>
                  <p className={styles.choiceCardSubtitle}>Best when eSIM isn&apos;t an option</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  {[
                    "Your phone doesn't support eSIM",
                    "Your phone is carrier-locked",
                    "You need voice calls included in your plan",
                    "You prefer sorting connectivity on arrival",
                    "You're sharing a device with a travel companion",
                  ].map((item) => (
                    <li key={item}><span className={styles.choiceCheck}>✓</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What's the difference */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Explained</span>
          <h2 className={styles.sectionTitle}>What&apos;s the Difference?</h2>
          <p className={styles.bodyText}>
            A <strong>physical SIM card</strong> is the tiny plastic chip you insert into your phone.
            To use a Japan tourist SIM, you buy or collect a card at the airport, swap out your home SIM,
            and insert the Japan SIM. When you leave Japan, you swap back. Simple, but it requires a trip
            to a vending machine or shop — and you lose access to your home number while the Japan SIM is in.
          </p>
          <p className={styles.bodyText}>
            An <strong>eSIM</strong> (embedded SIM) is a digital version built directly into modern phones.
            Instead of a physical card, you scan a QR code and download a profile. Your phone stores
            multiple profiles simultaneously and you switch between them in Settings. The big advantage:
            you can activate your Japan eSIM at home before you fly, and keep your home SIM active at
            the same time.
          </p>
          <p className={styles.bodyText}>
            Both formats use exactly the same underlying networks (Docomo, SoftBank, au) — so coverage
            and speeds are identical. The difference is entirely in convenience and setup.
          </p>
        </section>

        {/* Feature comparison table */}
        <section className={styles.comparisonFeature}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>eSIM vs Physical SIM: Feature Comparison</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.featureTable}>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>eSIM</th>
                    <th>Physical SIM</th>
                    <th>Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.ftFeature}>{row.feature}</td>
                      <td className={styles.ftEsim}>{row.esim}</td>
                      <td className={styles.ftSim}>{row.sim}</td>
                      <td>
                        {row.winner === "esim" && <span className={`${styles.ftWinner} ${styles.ftWinnerEsim}`}>eSIM</span>}
                        {row.winner === "sim"  && <span className={`${styles.ftWinner} ${styles.ftWinnerSim}`}>Physical SIM</span>}
                        {row.winner === "tie"  && <span className={`${styles.ftWinner} ${styles.ftWinnerTie}`}>Tie</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* eSIM Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>eSIM</span>
          <h2 className={styles.sectionTitle}>eSIM for Japan: Pros &amp; Cons</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {esimPros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {esimCons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Physical SIM Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Physical SIM</span>
          <h2 className={styles.sectionTitle}>Physical SIM Card for Japan: Pros &amp; Cons</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {simPros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {simCons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Who for — recs by traveller type */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Recommendations</span>
          <h2 className={styles.sectionTitle}>Which Option Is Best for Your Trip?</h2>
          <div className={styles.pickGrid}>
            {whoFor.map((group) => (
              <div
                key={group.choice}
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "16px",
                  padding: "1.25rem",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                <span className={`${styles.pickBadge} ${group.badgeCls}`} style={{ marginBottom: "0.75rem", display: "inline-block" }}>
                  {group.choice}
                </span>
                <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0d1b4b", marginBottom: "0.75rem" }}>
                  {group.title}
                </p>
                <ul className={styles.pickList}>
                  {group.items.map((item) => (
                    <li key={item}><span className={styles.proIcon}>✓</span>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How to get connected — steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Getting started</span>
          <h2 className={styles.sectionTitle}>How to Get Connected in Japan</h2>
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
          <h2 className={styles.sectionTitle}>Our Verdict</h2>
          <p className={styles.verdictText}>
            For most travellers visiting Japan in 2026, <strong>eSIM is the better choice</strong>.
            It&apos;s cheaper than airport SIM options, faster to set up, and lets you arrive in Japan
            already connected. If you have a phone from 2018 or later, there&apos;s a good chance it
            supports eSIM — check Settings before dismissing the option.
          </p>
          <p className={styles.verdictText}>
            Physical SIM cards remain the right call if your phone doesn&apos;t support eSIM, if it&apos;s
            carrier-locked, or if you specifically need a plan with voice calls included. Sakura Mobile
            and IIJmio are both solid physical SIM options with English-language support.
          </p>
          <p className={styles.verdictText}>
            Either way, buying in advance — whether eSIM or pre-ordered physical SIM — beats sorting
            it out at the airport vending machine after a long flight.
          </p>
          <Link href="/sim-cards" className={styles.pickCta}>
            Compare All Japan SIM Options →
          </Link>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Ready to pick your Japan eSIM?</h2>
            <p className={styles.ctaBannerDesc}>
              Compare Airalo, Holafly, eSIM Go, and Sakura Mobile side by side —
              price, data, coverage, and who each one is best for.
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
