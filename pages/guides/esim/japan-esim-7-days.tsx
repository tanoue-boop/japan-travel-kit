import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const dataTable = [
  { activity: "Google Maps",              perDay: "50MB",   total: "350MB"  },
  { activity: "Social media",             perDay: "150MB",  total: "1,050MB" },
  { activity: "Messaging",                perDay: "20MB",   total: "140MB"  },
  { activity: "Browsing",                 perDay: "100MB",  total: "700MB"  },
  { activity: "Total (light)",            perDay: "~320MB", total: "~2.2GB" },
  { activity: "Total (moderate)",         perDay: "~600MB", total: "~4.2GB" },
  { activity: "Total (heavy/streaming)",  perDay: "~1GB+",  total: "~7GB+"  },
];

const itinerary = [
  { day: "Day 1–2",  location: "Tokyo",              note: "Heavy map usage — arrival and exploration", data: "~700MB" },
  { day: "Day 3",    location: "Shinkansen to Kyoto", note: "Train WiFi available; light use",    data: "~200MB" },
  { day: "Day 4–5",  location: "Kyoto & Nara",        note: "Maps, photos, social posts",         data: "~500MB" },
  { day: "Day 6",    location: "Osaka",               note: "Active city use, navigation",        data: "~350MB" },
  { day: "Day 7",    location: "Departure",           note: "Airport navigation, messaging",      data: "~200MB" },
];

const faqItems = [
  {
    q: "How much data do I need for 7 days in Japan?",
    a: "For light use — Google Maps, messaging, occasional browsing — you'll use around 2–2.5GB over 7 days. Moderate users who post regularly to social media and browse throughout the day should budget 3–5GB. Heavy users who stream video or share their hotspot should consider 7GB+ or an unlimited plan.",
  },
  {
    q: "Is 3GB enough for a week in Japan?",
    a: "Yes, for most travellers. Airalo's 3GB 30-day plan at $9.50 is comfortably sufficient for a typical 7-day Tokyo and Kyoto itinerary, especially if you use hotel WiFi in the evenings and download offline maps before you go. Only heavy users who stream video daily will need more.",
  },
  {
    q: "What is the best eSIM for a Tokyo and Kyoto trip?",
    a: "Airalo's 3GB plan ($9.50) is our top pick for a Tokyo–Kyoto 7-day itinerary. It covers typical data usage with headroom to spare. Budget-conscious travellers can start with eSIM Go's 5GB plan ($8.00), which offers even more data at a lower price.",
  },
  {
    q: "Should I get unlimited data for 7 days in Japan?",
    a: "For most 7-day visitors, unlimited is unnecessary. The difference between Airalo 3GB ($9.50) and Holafly Unlimited ($19) is $9.50 — and you'd need to use well over 5GB to justify the cost. Only consider unlimited if you stream video daily, share your hotspot with others, or work remotely during your trip.",
  },
  {
    q: "Can I top up my eSIM if I run out in Japan?",
    a: "Yes. Both Airalo and eSIM Go allow in-app top-ups while you're in Japan. You can purchase additional data and it activates instantly — no need to scan a new QR code. This makes it safe to start with a smaller plan and top up only if needed.",
  },
];

export default function JapanEsim7DaysPage() {
  return (
    <>
      <Head>
        <title>Best Japan eSIM for 7 Days 2026: One Week Picks | Japan Travel Kit</title>
        <meta
          name="description"
          content="Visiting Japan for 7 days? You'll need 2–5GB. We compare the best eSIM plans for a one-week Tokyo and Kyoto trip — with honest data usage estimates."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-7-days" />
        <meta property="og:title" content="Best Japan eSIM for 7 Days 2026: One Week Picks | Japan Travel Kit" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-7-days" />
        <meta property="og:description" content="Visiting Japan for 7 days? You'll need 2–5GB. We compare the best eSIM plans for a one-week Tokyo and Kyoto trip — with honest data usage estimates." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Japan eSIM for 7 Days 2026: One Week Picks | Japan Travel Kit" />
        <meta name="twitter:description" content="Visiting Japan for 7 days? You'll need 2–5GB. We compare the best eSIM plans for a one-week Tokyo and Kyoto trip — with honest data usage estimates." />
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
                { "@type": "ListItem", position: 4, name: "Best Japan eSIM for 7 Days", item: "https://www.japan-travel-kit.com/guides/esim/japan-esim-7-days" },
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
              headline: "Best Japan eSIM for 7 Days (2026): Top Picks for One Week",
              dateModified: "2026-05-28",
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
          <span className={styles.breadCurrent}>Best Japan eSIM for 7 Days</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📱</span> Updated May 2026
          </p>
          <h1 className={styles.heroTitle}>
            Best Japan eSIM for 7 Days (2026):<br />Top Picks for One Week
          </h1>
          <p className={styles.heroSubtitle}>
            One week in Japan is the sweet spot for most visitors.
            Here&apos;s exactly which eSIM plan to get —
            and how much data you&apos;ll actually use.
          </p>
          <div className={styles.heroBadges}>
            {["Updated May 2026", "1-Week Trips", "Best Value"].map((t) => (
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

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>7-Day Trips</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Overall</p>
                <p className={styles.verdictStatValue}>Airalo 3GB ($9.50)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Budget</p>
                <p className={styles.verdictStatValue}>eSIM Go 5GB ($8.00)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Heavy Users</p>
                <p className={styles.verdictStatValue}>Holafly Unlimited ($19)</p>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", marginTop: "0.75rem", marginBottom: "1rem" }}>
              <strong style={{ color: "#fbbf24" }}>Data needed:</strong> 2GB–5GB for 7 days (most travellers)
            </p>
            <div className={styles.pickCtaRow}>
              <a
                href="https://airalo.pxf.io/c/7213504/1268485/15608"
                className={styles.verdictBtn}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Get Airalo 3GB ($9.50) →
              </a>
              <a
                href="https://breezesim.com?sca_ref=11082101.AF8vabyRKN"
                className={styles.pickCtaInternal}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Get eSIM Go 5GB ($8.00) →
              </a>
            </div>
          </div>
        </div>

        {/* How Much Data */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Data Guide</span>
          <h2 className={styles.sectionTitle}>How Much Data Do You Need for 7 Days?</h2>
          <p className={styles.bodyText}>
            Seven days in Japan means more destinations, more navigation, and more opportunities
            to post photos. Your actual data use depends heavily on how much you rely on your
            phone throughout the day. Here&apos;s a realistic breakdown by activity:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Per Day</th>
                    <th>7 Days Total</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTable.map((row) => (
                    <tr key={row.activity} style={row.activity.startsWith("Total") ? { fontWeight: 700 } : {}}>
                      <td className={styles.ftFeature}>{row.activity}</td>
                      <td className={styles.ftEsim}>{row.perDay}</td>
                      <td className={styles.ftSim}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Recommendation:</strong> A 3GB plan covers most 7-day itineraries comfortably.
            If you use social media heavily or prefer extra headroom, step up to 5GB.
            Unlimited is rarely necessary for a one-week trip.
          </p>
        </section>

        {/* 7-Day Itinerary */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Itinerary Guide</span>
          <h2 className={styles.sectionTitle}>Typical 7-Day Japan Itinerary &amp; Data Use</h2>
          <p className={styles.bodyText}>
            The classic Tokyo → Kyoto → Osaka route is Japan&apos;s most popular one-week itinerary.
            Here&apos;s how data usage breaks down day by day:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Location</th>
                    <th>Notes</th>
                    <th>Est. Data</th>
                  </tr>
                </thead>
                <tbody>
                  {itinerary.map((row) => (
                    <tr key={row.day}>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{row.day}</td>
                      <td className={styles.ftFeature}>{row.location}</td>
                      <td className={styles.ftEsim} style={{ fontSize: "0.8rem" }}>{row.note}</td>
                      <td className={styles.ftSim}>{row.data}</td>
                    </tr>
                  ))}
                  <tr style={{ fontWeight: 700 }}>
                    <td colSpan={3} className={styles.ftFeature}>Total estimated</td>
                    <td className={styles.ftSim}>~2GB</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Based on this itinerary, most travellers will use around 2GB. We recommend a
            <strong> 3GB plan</strong> for a comfortable buffer — Airalo 3GB at $9.50 is
            the sweet spot for a 7-day trip.
          </p>
        </section>

        {/* Best eSIMs for 7 Days */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Top Picks</span>
          <h2 className={styles.sectionTitle}>Best eSIMs for a 7-Day Japan Trip</h2>

          {/* Airalo */}
          <div className={styles.choiceGrid} style={{ marginBottom: "1.5rem" }}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderSim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>1. Airalo 3GB – Best Overall</p>
                  <p className={styles.choiceCardSubtitle}>$9.50 / 30 days · Docomo &amp; SoftBank</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> 3GB covers a typical 7-day Tokyo–Kyoto itinerary</li>
                  <li><span className={styles.choiceCheck}>✓</span> Docomo &amp; SoftBank — dual network, strong nationwide coverage</li>
                  <li><span className={styles.choiceCheck}>✓</span> 24/7 live chat support via app</li>
                  <li><span className={styles.choiceCheck}>✓</span> In-app top-up if you need more data</li>
                  <li><span className={styles.conIcon}>−</span> Data-only — no voice calls or SMS</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            Airalo&apos;s 3GB Moshi Moshi M plan is our top recommendation for a 7-day Japan trip.
            At $9.50, it delivers solid coverage, easy setup, and a trusted app experience.
            Most one-week visitors will finish their trip with data to spare.
          </p>
          <a
            href="https://airalo.pxf.io/c/7213504/1268485/15608"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.75rem", marginBottom: "2rem", display: "inline-flex" }}
          >
            Get Airalo Japan eSIM →
          </a>

          {/* eSIM Go */}
          <div className={styles.choiceGrid} style={{ marginBottom: "1.5rem" }}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderEsim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>2. eSIM Go 5GB – Best Value</p>
                  <p className={styles.choiceCardSubtitle}>$8.00 / 30 days · Docomo network</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> 5GB at $8.00 — better price per GB than Airalo</li>
                  <li><span className={styles.choiceCheck}>✓</span> Docomo network — reliable nationwide coverage</li>
                  <li><span className={styles.choiceCheck}>✓</span> More headroom for active social media users</li>
                  <li><span className={styles.conIcon}>−</span> Support is email-only (no live chat)</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            eSIM Go offers more data for less money than Airalo. The 5GB plan at $8.00
            is excellent value for a 7-day trip, particularly if you post a lot to Instagram
            or TikTok. The trade-off is email-only support, which is rarely an issue once
            you&apos;re up and running.
          </p>
          <a
            href="https://breezesim.com?sca_ref=11082101.AF8vabyRKN"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.75rem", marginBottom: "2rem", display: "inline-flex" }}
          >
            Get eSIM Go for Japan →
          </a>

          {/* Holafly */}
          <div className={styles.choiceGrid} style={{ marginBottom: "1.5rem" }}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader}`} style={{ background: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)" }}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>3. Holafly Unlimited – For Heavy Users</p>
                  <p className={styles.choiceCardSubtitle}>$19 / Unlimited · SoftBank</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Truly unlimited — no data cap to worry about</li>
                  <li><span className={styles.choiceCheck}>✓</span> Best for daily video streaming or hotspot sharing</li>
                  <li><span className={styles.conIcon}>−</span> $19 vs Airalo $9.50 — double the price</li>
                  <li><span className={styles.conIcon}>−</span> Fair use policy may throttle above certain thresholds</li>
                  <li><span className={styles.conIcon}>−</span> SoftBank only — slightly less rural coverage</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            Holafly is only worth the premium if you genuinely stream video, share your hotspot
            with a travel companion, or work remotely during your trip. For typical tourists on
            a 7-day visit, paying $19 vs $9.50 for Airalo&apos;s 3GB plan rarely makes sense.
          </p>
          <a
            href="#"
            className={styles.pickCtaInternal}
            style={{ marginTop: "0.75rem", marginBottom: "0.5rem", display: "inline-flex" }}
          >
            Get Holafly Japan eSIM →
          </a>
        </section>

        {/* Should I Get Unlimited */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Unlimited vs Limited</span>
          <h2 className={styles.sectionTitle}>Should I Get Unlimited for 7 Days?</h2>
          <p className={styles.bodyText}>
            For most 7-day visitors, unlimited data is unnecessary. The numbers tell the story:
          </p>
          <ul className={styles.pickList} style={{ marginBottom: "1rem" }}>
            <li><span className={styles.proIcon}>+</span> Airalo 3GB: $9.50 — covers light to moderate use all week</li>
            <li><span className={styles.proIcon}>+</span> eSIM Go 5GB: $8.00 — covers even heavy social media users</li>
            <li><span className={styles.conIcon}>−</span> Holafly Unlimited: $19 — double the price of Airalo</li>
          </ul>
          <p className={styles.bodyText}>
            You&apos;d need to consistently use over 5GB during a single week to justify Holafly&apos;s
            unlimited plan. That means streaming Netflix every day, uploading large video files,
            or sharing your hotspot continuously — which is uncommon for tourists.
          </p>
          <p className={styles.bodyText}>
            <strong>Our verdict:</strong> Start with Airalo 3GB or eSIM Go 5GB. If you do
            run low, both providers let you top up instantly from within the app. The flexibility
            of topping up makes starting with unlimited a poor value proposition.
          </p>
        </section>

        {/* Tips */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Travel Tips</span>
          <h2 className={styles.sectionTitle}>Tips for Managing Data on a 7-Day Trip</h2>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Download offline maps</p>
              <p className={styles.whoForDesc}>
                Pre-download Google Maps areas for Tokyo, Kyoto, and Osaka before you leave home.
                This cuts navigation data use by up to 80%.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M3 9h18" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Batch uploads to hotel WiFi</p>
              <p className={styles.whoForDesc}>
                Save Instagram stories and large photo uploads for your hotel&apos;s WiFi at night.
                This alone can save 200–400MB per day.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" /><path d="M3 12h4l3-9 4 18 3-9h4" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>4G beats Shinkansen WiFi</p>
              <p className={styles.whoForDesc}>
                The Shinkansen has WiFi, but your eSIM&apos;s 4G signal is often more reliable through
                tunnels. Either works — just don&apos;t stream video on the train.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Install before you fly</p>
              <p className={styles.whoForDesc}>
                Set up your eSIM at home — it takes under 2 minutes. You&apos;ll have a live 4G
                signal the moment your plane lands at Narita or Haneda.
              </p>
            </div>
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
            <Link href="/guides/esim/japan-esim-5-days" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Japan eSIM for 5 Days (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-10-days" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Japan eSIM for 10 Days (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
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
            <h2 className={styles.ctaBannerTitle}>Ready to get connected in Japan?</h2>
            <p className={styles.ctaBannerDesc}>
              Compare all Japan eSIM options — Airalo, Holafly, eSIM Go, and Sakura Mobile —
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
