import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const sakuraPlans = [
  { name: "Standard",  data: "7 GB",  voice: "✓", duration: "30 days", price: "$28" },
  { name: "Standard",  data: "15 GB", voice: "✓", duration: "30 days", price: "$38" },
  { name: "Standard",  data: "30 GB", voice: "✓", duration: "30 days", price: "$52" },
];

const voipApps = [
  {
    name: "WhatsApp",
    desc: "Free voice and video calls over Wi-Fi or data. Works in any country. The default choice for most international travellers.",
    best: "International calls to family and friends",
  },
  {
    name: "LINE",
    desc: "Japan's most popular messaging app. Most Japanese businesses, hotels, and locals use LINE. Excellent for communicating with Japanese contacts.",
    best: "Contacting Japanese hotels, restaurants, and locals",
  },
  {
    name: "Google Voice",
    desc: "Gives you a real US phone number for free. You can make calls and receive SMS to a US number from anywhere with a data connection.",
    best: "US travellers who need a consistent phone number",
  },
  {
    name: "Skype",
    desc: "Allows you to call real phone numbers (including Japanese landlines and mobiles) for a small per-minute fee. No subscription needed.",
    best: "Calling Japanese landlines and mobile numbers",
  },
];

const faqItems = [
  {
    q: "Can I get a Japanese phone number as a tourist?",
    a: "Yes, but options are limited. Sakura Mobile is the main eSIM/SIM provider that offers voice calls and a temporary Japanese number to tourists. Most other tourist eSIMs (Airalo, Holafly, eSIM Go) are data-only.",
  },
  {
    q: "Do I need a Japanese phone number to use hotel services?",
    a: "In most cases, no. Hotels accept reservations via email or booking platforms (Booking.com, Expedia, etc.). Restaurant reservations can often be made via Tabelog, Google Maps, or email. That said, some smaller ryokans and local businesses prefer phone calls — for these, Skype or a VoIP app calling a Japanese number is usually sufficient.",
  },
  {
    q: "Will my home phone number work in Japan?",
    a: "If you keep your physical home SIM active (roaming), yes — you can receive calls and SMS to your home number in Japan. However, roaming costs can be high. A more cost-effective approach is to use a Japan data eSIM for internet and keep your home SIM on Wi-Fi calling only.",
  },
  {
    q: "Can I use dual SIM to keep my home number and get Japan data?",
    a: "Yes. Most modern smartphones support dual SIM (one physical SIM + one eSIM). You can keep your home physical SIM active for calls and SMS while using a Japan eSIM (Airalo, Holafly, or eSIM Go) for all mobile data. Just set the Japan eSIM as the default data SIM in settings.",
  },
  {
    q: "Does Sakura Mobile eSIM work on iPhone?",
    a: "Yes. Sakura Mobile's eSIM works on iPhone XS (2018) and later. Setup is via QR code, similar to other eSIM providers. Sakura Mobile also offers physical SIM cards if your phone doesn't support eSIM.",
  },
];

export default function JapanEsimWithPhoneNumberPage() {
  return (
    <>
      <Head>
        <title>Japan eSIM with Phone Number 2026: Best Options for Voice &amp; Data | Japan Travel Kit</title>
        <meta
          name="description"
          content="Need a Japan eSIM with a phone number? Most eSIMs are data-only. We explain your options for voice calls in Japan."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/japan-esim-with-phone-number" />
        <meta property="og:title" content="Japan eSIM with Phone Number 2026: Best Options for Voice & Data" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/japan-esim-with-phone-number" />
        <meta property="og:description" content="Need a Japan eSIM with a phone number? Most eSIMs are data-only. We explain your options for voice calls in Japan." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan eSIM with Phone Number 2026: Best Options for Voice & Data" />
        <meta name="twitter:description" content="Need a Japan eSIM with a phone number? Most eSIMs are data-only. We explain your options for voice calls in Japan." />
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
              headline: "Japan eSIM with Phone Number 2026: Best Options for Voice & Data",
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
          <span className={styles.breadCurrent}>Japan eSIM with Phone Number</span>
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
            Japan eSIM with<br />Phone Number (2026): Your Options
          </h1>
          <p className={styles.heroSubtitle}>
            Most Japan eSIMs are data-only. But if you need a local number, here&apos;s what actually works.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "Voice & Data", "Local Number Options"].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.{" "}
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
                <p className={styles.verdictStatLabel}>Data-only eSIM</p>
                <p className={styles.verdictStatValue}>Airalo · Holafly · eSIM Go</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>With phone number</p>
                <p className={styles.verdictStatValue}>Sakura Mobile</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Keep home number + Japan data</p>
                <p className={styles.verdictStatValue}>Dual SIM</p>
              </div>
            </div>
            <a href="https://p.sakuramobile.jp/idevaffiliate.php?id=486" className={styles.verdictBtn} target="_blank" rel="noopener noreferrer nofollow">
              Get Sakura Mobile (with voice) →
            </a>
          </div>
        </div>

        {/* Do you actually need a Japanese number */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Reality check</span>
          <h2 className={styles.sectionTitle}>Do You Actually Need a Japanese Number?</h2>
          <p className={styles.bodyText}>
            Most tourists visiting Japan <strong>do not need a Japanese phone number</strong>. The vast majority of hotels, restaurants, and tourist services accept online reservations, email communication, or messaging apps like WhatsApp and LINE.
          </p>

          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0d1b4b", margin: "1.25rem 0 0.5rem" }}>
            You probably don&apos;t need a Japanese number if you:
          </h3>
          {[
            "Have pre-booked accommodation via Booking.com, Expedia, or Airbnb",
            "Plan to use Google Maps and data for navigation",
            "Communicate primarily via WhatsApp, LINE, or email",
            "Are staying for 30 days or less",
          ].map((item) => (
            <p key={item} className={styles.bodyText} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", margin: "0.25rem 0" }}>
              <span style={{ color: "#16a34a", fontWeight: 700, flexShrink: 0 }}>✓</span>
              {item}
            </p>
          ))}

          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0d1b4b", margin: "1.25rem 0 0.5rem" }}>
            You might need a Japanese number if you:
          </h3>
          {[
            "Are making reservations at small local restaurants or ryokan that only accept phone calls",
            "Need to receive Japanese bank or payment verification SMS",
            "Are staying long-term and need a number for contracts or registrations",
            "Need to receive calls from Japanese contacts who prefer calling over messaging apps",
          ].map((item) => (
            <p key={item} className={styles.bodyText} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", margin: "0.25rem 0" }}>
              <span style={{ color: "#dc2626", fontWeight: 700, flexShrink: 0 }}>→</span>
              {item}
            </p>
          ))}
        </section>

        {/* Options Section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Your options</span>
          <h2 className={styles.sectionTitle}>Options for Japan eSIM with Phone Number</h2>
        </section>

        {/* Option 1: Sakura Mobile */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>#1</span>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.25rem" }}>Sakura Mobile — Best eSIM with Voice</h3>
          <p className={styles.bodyText}>
            Sakura Mobile is the only major tourist-oriented provider offering a Japanese phone number alongside data. Plans use <strong>Docomo&apos;s network</strong> — the best coverage in Japan — and include English customer support.
          </p>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {["Real Japanese phone number included", "Docomo network (best rural coverage)", "English customer support", "Available as eSIM or physical SIM"].map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {["More expensive than data-only plans", "Requires registration before arrival"].map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
          <a href="https://p.sakuramobile.jp/idevaffiliate.php?id=486" className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow" style={{ marginTop: "1rem", display: "inline-block" }}>
            Get Sakura Mobile →
          </a>
        </section>

        {/* Option 2: Dual SIM */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>#2</span>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.25rem" }}>Keep Your Home SIM + Japan Data eSIM</h3>
          <p className={styles.bodyText}>
            If your phone supports dual SIM (one physical SIM + one eSIM), you can keep your home SIM active for incoming calls and messages while using a Japan data eSIM for all mobile internet. This is often the most cost-effective approach for short trips.
          </p>
          <p className={styles.bodyText}>
            <strong>How it works:</strong> Insert your home SIM as usual, add a Japan eSIM (Airalo, Holafly, or eSIM Go), and set the Japan eSIM as the default mobile data SIM. Your home number remains active for calls and SMS (subject to your home carrier&apos;s roaming rates for receiving, which are often free or low-cost). All data usage goes through the Japan eSIM — no roaming data charges.
          </p>
          <p className={styles.bodyText}>
            Most iPhone XS and later, and most Android flagships since 2020, support this configuration. Check your phone&apos;s settings for &ldquo;SIM Management&rdquo; or &ldquo;Dual SIM&rdquo; to confirm.
          </p>
        </section>

        {/* Option 3: VoIP */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>#3</span>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.25rem" }}>Use VoIP Apps (Free Alternative)</h3>
          <p className={styles.bodyText}>
            For most communication needs in Japan, a data eSIM combined with a free VoIP app is all you need. These apps work over Wi-Fi or mobile data and are free (or very cheap) to use.
          </p>
        </section>

        {/* VoIP apps */}
        <section className={styles.whoForSection}>
          <div className={styles.whoForGrid}>
            {voipApps.map((app) => (
              <div key={app.name} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{app.name}</p>
                <p className={styles.whoForDesc}>{app.desc}</p>
                <p style={{ fontSize: "0.78rem", color: "#16a34a", fontWeight: 600, marginTop: "0.5rem" }}>
                  Best for: {app.best}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Sakura Mobile Plans table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Sakura Mobile Plans with Voice</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Plan", "Data", "Voice", "Duration", "Price"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sakuraPlans.map((plan, i) => (
                    <tr key={i}>
                      <td className={styles.tdProvider}>{plan.name}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{plan.data}</td>
                      <td className={styles.tdNetwork}>{plan.voice}</td>
                      <td className={styles.tdNetwork}>{plan.duration}</td>
                      <td className={styles.tdPrice}>{plan.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#6b7280" }}>
            Prices are approximate and subject to change. Please verify the latest pricing on each provider&apos;s official website.
          </p>
          <a href="https://p.sakuramobile.jp/idevaffiliate.php?id=486" className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow" style={{ marginTop: "1rem", display: "inline-block" }}>
            View Sakura Mobile plans →
          </a>
        </section>

        {/* Using Dual SIM */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>How-to</span>
          <h2 className={styles.sectionTitle}>Using Dual SIM for Japan</h2>
          <div className={styles.stepsList}>
            {[
              { title: "Check dual SIM support", desc: "Go to Settings → General → About (iPhone) or Settings → About Phone (Android) and look for eSIM or SIM Management options." },
              { title: "Keep your home SIM in the physical slot", desc: "Don't remove your home SIM — you'll still receive calls and texts on your home number." },
              { title: "Add a Japan data eSIM", desc: "Purchase Airalo, Holafly, or eSIM Go and scan the QR code to download the eSIM profile to your device." },
              { title: "Set Japan eSIM as default data", desc: "In Settings, set the Japan eSIM as the default SIM for mobile data. Keep your home SIM as the default for calls and SMS." },
              { title: "Enable Data Roaming on home SIM (optional)", desc: "If you want to receive calls on your home number using the home carrier's network in Japan, enable data roaming on the home SIM. Note: receiving calls while roaming is often free or low-cost — check with your carrier." },
            ].map((step, i) => (
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
            <Link href="/guides/esim/sakura-mobile-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sakura Mobile Review 2026: Best SIM Card for Long Stays in Japan?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            <h2 className={styles.ctaBannerTitle}>Need a Japan eSIM with voice?</h2>
            <p className={styles.ctaBannerDesc}>
              Sakura Mobile is the only tourist-friendly provider with a Japanese phone number and English support.
            </p>
            <a href="https://p.sakuramobile.jp/idevaffiliate.php?id=486" className={styles.ctaBannerBtn} target="_blank" rel="noopener noreferrer nofollow">
              Get Sakura Mobile →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
