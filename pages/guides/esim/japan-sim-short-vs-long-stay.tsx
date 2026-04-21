import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const AIRALO_URL = "https://airalo.pxf.io/c/7213504/1268485/15608";
const SAKURA_URL = "https://p.sakuramobile.jp/idevaffiliate.php?id=486";
const ESIMGO_URL = "https://breezesim.com?sca_ref=11082101.AF8vabyRKN";
const HOLAFLY_URL = "#";

const quickRecs = [
  { length: "1–7 days",    pick: "eSIM Go 1 GB",          price: "$3.50",  url: ESIMGO_URL  },
  { length: "1–2 weeks",   pick: "Airalo 3 GB",            price: "$9.50",  url: AIRALO_URL  },
  { length: "2–4 weeks",   pick: "Holafly Unlimited",      price: "$27–49", url: HOLAFLY_URL },
  { length: "1 month+",    pick: "Sakura Mobile 7–30 GB",  price: "$28+",   url: SAKURA_URL  },
];

const dataTable = [
  { activity: "Google Maps (navigation)",   perDay: "~50 MB"  },
  { activity: "Social media (browsing)",    perDay: "~150 MB" },
  { activity: "Streaming video (1 hr HD)",  perDay: "~500 MB" },
  { activity: "Light use total",            perDay: "~200 MB" },
  { activity: "Heavy use total",            perDay: "~1 GB"   },
];

const faqItems = [
  {
    q: "How much data do I need for 2 weeks in Japan?",
    a: "For typical tourist use over two weeks — Google Maps, messaging, social media, and occasional browsing — 3 GB is usually comfortable. Airalo's 3 GB / 30-day plan at $9.50 is our top pick for two-week trips. If you plan to stream video or use a hotspot frequently, go for 5–10 GB or consider Holafly's unlimited plan.",
  },
  {
    q: "Is 1 GB enough for a week in Japan?",
    a: "Yes, for light use. 1 GB covers roughly 5 hours of navigation, around 600 social media posts scrolled, and plenty of messaging over seven days. If you avoid streaming video and use Wi-Fi at your accommodation, 1 GB is plenty. eSIM Go's 1 GB / 7-day plan at $3.50 is a solid choice for light users.",
  },
  {
    q: "Can I extend my eSIM plan in Japan?",
    a: "Yes, with Airalo. You can top up directly from the app without scanning a new QR code. eSIM Go also allows additional purchases. Holafly's unlimited plan means you'll never need an extension. Sakura Mobile plans can be renewed through their website. For Airalo and eSIM Go, we recommend buying a slightly larger plan than you think you need rather than managing top-ups mid-trip.",
  },
  {
    q: "Should I get an eSIM or physical SIM for Japan?",
    a: "eSIM if your phone supports it — it's faster, cheaper, and you can install it before you fly. Physical SIMs require queuing at an airport kiosk or vending machine on arrival. The only reason to choose a physical SIM is if your phone doesn't support eSIM (older devices) or if you want Sakura Mobile's physical SIM option for a longer stay.",
  },
  {
    q: "What's the best SIM for a month in Japan?",
    a: "Sakura Mobile is our top pick for one-month stays. At $28 for 7 GB / 30 days (or $52 for 30 GB), it includes voice calls, SMS, and dedicated English-language support — things that matter on a longer trip. For data-only users, eSIM Go's 10 GB / 30-day plan at $14 is the most cost-effective option.",
  },
];

export default function JapanSimShortVsLongStayPage() {
  return (
    <>
      <Head>
        <title>Best Japan SIM Card by Trip Length 2025: 1 Week, 2 Weeks, 1 Month+ | Japan Travel Kit</title>
        <meta
          name="description"
          content="Not sure how much data you need for Japan? We match the best SIM card to your trip length — from 1 day to 1 month+."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/japan-sim-short-vs-long-stay" />
        <meta property="og:title" content="Best Japan SIM Card by Trip Length 2025: 1 Week, 2 Weeks, 1 Month+" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/japan-sim-short-vs-long-stay" />
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
          <span className={styles.breadCurrent}>SIM by Trip Length</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🗓️</span> Updated April 2025
          </p>
          <h1 className={styles.heroTitle}>
            Best Japan SIM Card for<br />Your Trip Length (2025)
          </h1>
          <p className={styles.heroSubtitle}>
            1 week or 1 month? The right SIM depends on how long you&apos;re staying.
            Here&apos;s exactly what to get.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2025", "All Trip Lengths", "Independently Reviewed"].map((t) => (
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

        {/* Quick Recommendation Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Recommendation</span>
          </div>
          <div className={styles.verdictBody}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
              {quickRecs.map((rec) => (
                <div key={rec.length} style={{ background: "rgba(255,255,255,0.08)", borderRadius: "10px", padding: "0.9rem 1rem" }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "0.3rem" }}>
                    {rec.length}
                  </p>
                  <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", marginBottom: "0.15rem" }}>{rec.pick}</p>
                  <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)" }}>{rec.price}</p>
                </div>
              ))}
            </div>
            <a href={ESIMGO_URL} className={styles.verdictBtn} target="_blank" rel="noopener noreferrer nofollow">
              Get eSIM Go Japan (from $3.50) →
            </a>
          </div>
        </div>

        {/* Short Trip */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Short trip</span>
          <h2 className={styles.sectionTitle}>1–7 Days: Best SIM for a Short Stay</h2>
          <p className={styles.bodyText}>
            For a week or less, you don&apos;t need much data. Light tourist use — Google Maps, messaging,
            and occasional social media — typically comes to 150–300 MB per day. A 1 GB plan covers
            a week comfortably with room to spare.
          </p>
          <p className={styles.bodyText}>
            <strong>Our pick: eSIM Go 1 GB / 7 days ($3.50).</strong> It&apos;s the cheapest Japan eSIM on
            the market, runs on Docomo (Japan&apos;s best network), and activates via QR code before you
            fly. Airalo&apos;s 1 GB plan at $4.50 is a solid alternative if you want 24/7 live chat support.
          </p>

          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Why eSIM Go</p>
              <ul className={styles.pickList}>
                <li><span className={styles.proIcon}>+</span>Cheapest price at $3.50</li>
                <li><span className={styles.proIcon}>+</span>Docomo network coverage</li>
                <li><span className={styles.proIcon}>+</span>Instant QR code setup</li>
                <li><span className={styles.proIcon}>+</span>No wasted data on short trips</li>
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Limitations</p>
              <ul className={styles.pickList}>
                <li><span className={styles.conIcon}>−</span>Data-only (no voice calls)</li>
                <li><span className={styles.conIcon}>−</span>Email support only</li>
                <li><span className={styles.conIcon}>−</span>Requires eSIM-compatible phone</li>
              </ul>
            </div>
          </div>

          <a href={ESIMGO_URL} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
            Get eSIM Go 1 GB / 7 days ($3.50) →
          </a>
        </section>

        {/* Medium Trip */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Medium trip</span>
          <h2 className={styles.sectionTitle}>1–2 Weeks: Best SIM for Two Weeks in Japan</h2>
          <p className={styles.bodyText}>
            A two-week trip is the sweet spot for most tourists. You&apos;ll be navigating constantly,
            sharing photos, and maybe streaming on bullet trains. Plan for 200–500 MB per day,
            which puts a two-week total at 3–7 GB.
          </p>
          <p className={styles.bodyText}>
            <strong>Our pick: Airalo 3 GB / 30 days ($9.50).</strong> At under $10, it covers a
            full two-week trip with buffer. The 30-day validity means it&apos;ll still be active if your
            trip extends slightly. If you expect heavier data use, consider eSIM Go&apos;s 5 GB / 15-day
            plan at $8.00 — the best price-per-GB for medium trips.
          </p>
          <p className={styles.bodyText}>
            Heavy users (frequent video calls, hotspot sharing, or streaming) should consider
            Holafly&apos;s unlimited plan from $27 / 10 days — no data worries for the entire trip.
          </p>

          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Why Airalo 3 GB</p>
              <ul className={styles.pickList}>
                <li><span className={styles.proIcon}>+</span>$9.50 for a full two-week trip</li>
                <li><span className={styles.proIcon}>+</span>30-day validity, no rush</li>
                <li><span className={styles.proIcon}>+</span>24/7 live chat support</li>
                <li><span className={styles.proIcon}>+</span>Top-up available if needed</li>
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Limitations</p>
              <ul className={styles.pickList}>
                <li><span className={styles.conIcon}>−</span>Data-only (no calls or SMS)</li>
                <li><span className={styles.conIcon}>−</span>3 GB tight for heavy streamers</li>
                <li><span className={styles.conIcon}>−</span>eSIM-compatible phone required</li>
              </ul>
            </div>
          </div>

          <a href={AIRALO_URL} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
            Get Airalo Japan 3 GB ($9.50) →
          </a>
        </section>

        {/* Long Trip */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Long trip</span>
          <h2 className={styles.sectionTitle}>2–4 Weeks: Best SIM for a Month in Japan</h2>
          <p className={styles.bodyText}>
            Trips of two to four weeks cover a huge range of data needs. If you&apos;re a light user,
            eSIM Go&apos;s 10 GB / 30-day plan at $14 is the most cost-effective option. But if you
            stream, hotspot your laptop, or simply don&apos;t want to track your data — unlimited is
            worth the peace of mind.
          </p>
          <p className={styles.bodyText}>
            <strong>Our pick: Holafly Unlimited.</strong> At $27 for 10 days or $49 for 30 days,
            Holafly is the only genuinely unlimited eSIM we tested for Japan. No throttling after
            a threshold, no fair-use policy surprises. For travellers who work remotely, stream
            video daily, or share a hotspot with companions, the premium is justified.
          </p>

          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Why Holafly Unlimited</p>
              <ul className={styles.pickList}>
                <li><span className={styles.proIcon}>+</span>Truly unlimited — no caps at all</li>
                <li><span className={styles.proIcon}>+</span>No need to monitor usage</li>
                <li><span className={styles.proIcon}>+</span>SoftBank nationwide coverage</li>
                <li><span className={styles.proIcon}>+</span>Easy QR code setup</li>
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Limitations</p>
              <ul className={styles.pickList}>
                <li><span className={styles.conIcon}>−</span>More expensive than capped plans</li>
                <li><span className={styles.conIcon}>−</span>Data-only (no voice calls)</li>
                <li><span className={styles.conIcon}>−</span>eSIM-only device required</li>
              </ul>
            </div>
          </div>

          {HOLAFLY_URL === "#" ? (
            <Link href="/sim-cards" className={styles.pickCta}>
              View Holafly Japan Unlimited →
            </Link>
          ) : (
            <a href={HOLAFLY_URL} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              View Holafly Japan Unlimited →
            </a>
          )}
        </section>

        {/* Extended Stay */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Extended stay</span>
          <h2 className={styles.sectionTitle}>1 Month+: Best SIM for Long-Term Stays</h2>
          <p className={styles.bodyText}>
            Staying a month or more changes what you need from a SIM. Data alone isn&apos;t enough —
            you may need to make calls to book restaurants, contact your accommodation, or handle
            admin tasks. English-language support becomes genuinely important when something goes wrong
            three weeks in.
          </p>
          <p className={styles.bodyText}>
            <strong>Our pick: Sakura Mobile.</strong> It&apos;s the only tourist-oriented SIM that
            includes voice calls, SMS, and dedicated English phone and email support. Plans start
            at $28 for 7 GB / 30 days on Docomo — Japan&apos;s most reliable network. Physical SIM
            or eSIM available. For data-only long stays, eSIM Go&apos;s 10 GB / 30-day plan at $14
            remains the best value.
          </p>

          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Why Sakura Mobile</p>
              <ul className={styles.pickList}>
                <li><span className={styles.proIcon}>+</span>Voice calls &amp; SMS included</li>
                <li><span className={styles.proIcon}>+</span>English phone &amp; email support</li>
                <li><span className={styles.proIcon}>+</span>Physical SIM or eSIM available</li>
                <li><span className={styles.proIcon}>+</span>Docomo — best rural coverage</li>
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Limitations</p>
              <ul className={styles.pickList}>
                <li><span className={styles.conIcon}>−</span>Higher price than data-only options</li>
                <li><span className={styles.conIcon}>−</span>Requires advance setup</li>
                <li><span className={styles.conIcon}>−</span>Overkill for short trips</li>
              </ul>
            </div>
          </div>

          <a href={SAKURA_URL} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
            Get Sakura Mobile Japan SIM →
          </a>
        </section>

        {/* Data usage table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Data guide</span>
          <h2 className={styles.sectionTitle}>How Much Data Do You Need?</h2>
          <p className={styles.bodyText}>
            Use this table to estimate your daily data consumption, then multiply by your trip length to pick the right plan.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Data Per Day</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTable.map((row) => (
                    <tr key={row.activity}>
                      <td className={styles.tdProvider}>{row.activity}</td>
                      <td className={styles.tdPrice}>{row.perDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Estimates based on standard app usage. Streaming quality, background app refresh, and hotspot sharing increase consumption significantly.
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
            <Link href="/guides/esim/cheapest-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cheapest eSIM for Japan 2025: Best Budget Picks</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/sakura-mobile-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sakura Mobile Review 2025: Best SIM for Long Stays?</p>
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
              See how eSIM Go, Airalo, Holafly, and Sakura Mobile compare on price, coverage, and features.
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
