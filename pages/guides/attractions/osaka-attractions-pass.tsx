import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// CTA links — Klook affiliate redirects.
// TODO: replace with Klook affiliate redirect (aid=119070&aff_adid=...) once generated
const OSAKA_AMAZING_PASS_URL = "https://www.klook.com/en-US/activity/30889-osaka-amazing-pass-osaka/";
// TODO: replace with Klook affiliate redirect (aid=119070&aff_adid=...) once generated
const KAIYUKAN_URL = "https://www.klook.com/en-US/activity/598-osaka-aquarium-kaiyukan-ticket-osaka/";

const includedRows = [
  { attraction: "Osaka Castle (Castle Tower)", included: "✓ Included", price: "approx ¥600" },
  { attraction: "Umeda Sky Building — Floating Garden Observatory", included: "✓ Included", price: "approx ¥2,000" },
  { attraction: "Tsutenkaku Tower", included: "✓ Included", price: "approx ¥1,000" },
  { attraction: "HEP FIVE Ferris Wheel", included: "✓ Included", price: "approx ¥800" },
  { attraction: "Tombori River Cruise & other river cruises", included: "✓ Included", price: "approx ¥1,500" },
  { attraction: "Metro / subway & city buses (Osaka city)", included: "✓ Unlimited", price: "Pay-as-you-go otherwise" },
  { attraction: "Universal Studios Japan (USJ)", included: "✗ Not included", price: "Buy separately" },
  { attraction: "Osaka Aquarium Kaiyukan", included: "✗ Not included", price: "approx ¥2,300" },
];

const whoFor = [
  {
    title: "Worth it if…",
    desc: "You plan to hit several included sights in a single day — say Osaka Castle, the Umeda Sky Building observatory, Tsutenkaku, and a river cruise — while criss-crossing the city by subway. The included transport plus 40+ free admissions add up fast, and a busy day can clear the pass price on attractions alone.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
  {
    title: "Maybe skip it if…",
    desc: "Your Osaka wishlist is mostly USJ and Kaiyukan — neither is on the pass. If you're only visiting one or two included spots, or you walk most places, buying single tickets and a simple IC card may cost less than the pass.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M15 9l-6 6M9 9l6 6" />
      </svg>
    ),
  },
  {
    title: "1-day vs 2-day",
    desc: "The 1-day pass includes unlimited transport for the day; the 2-day pass spreads admissions across two days but, on most years, the transport benefit applies to fewer trips than two full days of riding. Choose 1-day for an intense single sightseeing blitz, 2-day if you'd rather pace yourself across more facilities.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="16" y1="2" x2="16" y2="6" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Map your day around included sights",
    desc: "List the attractions you actually want to see and check which are on the pass — Osaka Castle, the Umeda Sky Building observatory, Tsutenkaku, the HEP FIVE Ferris wheel, and river cruises are all included. Roughly add up their standalone prices to see if the pass pays for itself.",
  },
  {
    title: "Pick 1-day or 2-day",
    desc: "Choose the 1-day pass for a single packed sightseeing day, or the 2-day pass if you'd rather spread the included facilities over two days. Both bundle unlimited Osaka city subway and bus travel within their valid period.",
  },
  {
    title: "Buy online — the pass is now fully digital",
    desc: "The Osaka Amazing Pass is digital, with no physical card to collect. Booking through a reseller like Klook gives you an English checkout, foreign-card support, and a QR code or voucher you activate on first use.",
  },
  {
    title: "Activate on your sightseeing day and scan to enter",
    desc: "The pass starts when you first use it, so activate it on the day you'll sightsee most. Scan it at participating facilities and at subway/bus gates within Osaka city; keep your separate USJ and Kaiyukan tickets handy, since those aren't covered.",
  },
];

const faqItems = [
  {
    q: "Is the Osaka Amazing Pass worth it?",
    a: "It depends on how much you'll sightsee in a day. The pass bundles unlimited Osaka city subway and bus travel with free admission to 40+ facilities. If you visit several included sights in one day — for example Osaka Castle, the Umeda Sky Building Floating Garden Observatory (about ¥2,000 on its own), Tsutenkaku, and a river cruise — while moving around by subway, the admissions and transport easily add up past the pass price. If you're only seeing one or two spots, or your main targets are USJ and Kaiyukan (neither is included), single tickets may be cheaper.",
  },
  {
    q: "What's included in the Osaka Amazing Pass?",
    a: "Two things: unlimited rides on the Osaka Metro/subway and city buses within Osaka city, plus free admission to more than 40 facilities. Highlights include Osaka Castle, the Umeda Sky Building Floating Garden Observatory, Tsutenkaku, the HEP FIVE Ferris wheel, and river cruises. The exact list of facilities can change year to year, so confirm the current inclusions at booking (2026, subject to change).",
  },
  {
    q: "Does the Osaka Amazing Pass include USJ or Kaiyukan?",
    a: "No. Universal Studios Japan (USJ) and the Osaka Aquarium Kaiyukan are both excluded from the Osaka Amazing Pass. You'll need to buy separate tickets for each — USJ uses its own Studio Pass, and Kaiyukan admission is roughly ¥2,300 on its own ticket.",
  },
  {
    q: "Is the Osaka Amazing Pass digital now?",
    a: "Yes. The Osaka Amazing Pass is now fully digital — there's no physical card to pick up. You receive a QR code or voucher you activate on first use, then scan to enter facilities and pass through subway and bus gates within Osaka city.",
  },
  {
    q: "Should I get the 1-day or 2-day Osaka Amazing Pass?",
    a: "Choose the 1-day pass for a single intense sightseeing day, where the unlimited same-day transport and back-to-back admissions deliver the most value. The 2-day pass lets you spread the included facilities across two days at a gentler pace. Pick based on how packed your itinerary is rather than simply the headline price.",
  },
  {
    q: "Does the Osaka Amazing Pass include transport?",
    a: "Yes — it includes unlimited rides on the Osaka Metro/subway and city buses within Osaka city for its valid period. Because transport is bundled in, you generally don't need a separate transit pass for the days you're using the Amazing Pass. If you want to compare standalone transit options for other days, see our Osaka Metro pass guide.",
  },
];

export default function OsakaAttractionsPassPage() {
  return (
    <>
      <Head>
        <title>Osaka Attractions &amp; Passes (2026): Amazing Pass, Kaiyukan, Umeda Sky &amp; More | Japan Travel Kit</title>
        <meta
          name="description"
          content="Osaka attractions and passes in 2026: what the Osaka Amazing Pass includes (and what it doesn't — USJ and Kaiyukan are out), whether it's worth it, and 1-day vs 2-day."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/osaka-attractions-pass" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Osaka Attractions & Passes (2026): Amazing Pass, Kaiyukan, Umeda Sky & More" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/osaka-attractions-pass" />
        <meta property="og:description" content="Osaka attractions and passes in 2026: what the Osaka Amazing Pass includes (and what it doesn't — USJ and Kaiyukan are out), whether it's worth it, and 1-day vs 2-day." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Osaka Attractions & Passes (2026): Amazing Pass, Kaiyukan, Umeda Sky & More" />
        <meta name="twitter:description" content="Osaka attractions and passes in 2026: what the Osaka Amazing Pass includes (and what it doesn't — USJ and Kaiyukan are out), whether it's worth it, and 1-day vs 2-day." />
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
              headline: "Osaka Attractions & Passes (2026): Amazing Pass, Kaiyukan, Umeda Sky & More",
              dateModified: "2026-06-15",
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
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
                { "@type": "ListItem", position: 4, name: "Osaka Attractions & Passes", item: "https://www.japan-travel-kit.com/guides/attractions/osaka-attractions-pass" },
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
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Osaka Attractions &amp; Passes</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🎡</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Osaka Attractions &amp; Passes (2026):<br />Amazing Pass, Kaiyukan, Umeda Sky &amp; More
          </h1>
          <p className={styles.heroSubtitle}>
            The Osaka Amazing Pass bundles unlimited city transport with 40+ free admissions — but USJ and
            Kaiyukan are out. Here&apos;s what&apos;s included, whether it pays off, and 1-day vs 2-day.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "What's Included vs Not", "Now Fully Digital"].map((t) => (
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
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Amazing Pass includes</p>
                <p className={styles.verdictStatValue}>Transport + 40+ admissions</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Options</p>
                <p className={styles.verdictStatValue}>1-day or 2-day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Not included</p>
                <p className={styles.verdictStatValue}>USJ &amp; Kaiyukan</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Format</p>
                <p className={styles.verdictStatValue}>Fully digital now</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> The Osaka Amazing Pass pays off when you visit several included sights
              in a day while moving by subway. It does <strong>not</strong> cover USJ or the Osaka Aquarium
              Kaiyukan — buy those separately.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <a href={OSAKA_AMAZING_PASS_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Osaka Amazing Pass →
              </a>
              <a href={KAIYUKAN_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Kaiyukan Aquarium Ticket →
              </a>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is the Osaka Amazing Pass?</h2>
          <p className={styles.bodyText}>
            The <strong>Osaka Amazing Pass</strong> is a sightseeing pass that combines two benefits in one:
            unlimited rides on the Osaka Metro/subway and city buses within Osaka city, plus free admission to
            more than 40 facilities. It comes as a <strong>1-day</strong> or <strong>2-day</strong> pass, and
            it&apos;s now fully digital — there&apos;s no physical card to collect.
          </p>
          <p className={styles.bodyText}>
            Included highlights span the city&apos;s biggest names: <strong>Osaka Castle</strong>, the{" "}
            <strong>Umeda Sky Building</strong> Floating Garden Observatory (about ¥2,000 on its own),{" "}
            <strong>Tsutenkaku</strong>, the <strong>HEP FIVE Ferris wheel</strong>, and various river cruises.
            The one big caveat: <strong>Universal Studios Japan (USJ)</strong> and the{" "}
            <strong>Osaka Aquarium Kaiyukan</strong> are <em>not</em> included, so plan those as separate tickets.
          </p>
        </section>

        {/* Included vs not table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Included vs not</span>
          <h2 className={styles.sectionTitle}>What the Amazing Pass Covers (and What It Doesn&apos;t)</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Attraction", "On Amazing Pass?", "Standalone price (approx)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {includedRows.map((row) => (
                    <tr key={row.attraction}>
                      <td className={styles.tdProvider}>{row.attraction}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.included}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Standalone prices are approximate and the included-facility list can change — figures are for 2026
            and subject to change; confirm at booking. USJ and Kaiyukan are not covered by the pass and must be
            bought separately.
          </p>
        </section>

        {/* Is the pass worth it / who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Is the pass worth it?</span>
          <h2 className={styles.sectionTitle}>Does the Osaka Amazing Pass Pay Off?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.5rem" }}>
            The math is simple: add up the standalone admission prices of the included sights you&apos;ll
            actually visit, plus what you&apos;d otherwise spend on subway and bus fares that day. If that total
            beats the pass price, you&apos;re ahead. Because transport is bundled in, you generally won&apos;t
            need a separate{" "}
            <Link href="/guides/transport/osaka-metro-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              Osaka metro pass
            </Link>{" "}
            for the days you&apos;re using the Amazing Pass.
          </p>
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

        {/* Kaiyukan note */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Not on the pass</span>
          <h2 className={styles.sectionTitle}>USJ &amp; Kaiyukan: Buy These Separately</h2>
          <p className={styles.bodyText}>
            The two attractions visitors most often assume are covered — and aren&apos;t — are USJ and the{" "}
            <strong>Osaka Aquarium Kaiyukan</strong>. Kaiyukan is famous for its enormous central tank and
            resident whale sharks; admission is roughly ¥2,300 on a separate ticket. It&apos;s well worth a
            visit, just budget for it outside the Amazing Pass.
          </p>
          <p className={styles.bodyText}>
            For the theme park, see our{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              Universal Studios Japan tickets &amp; Express Pass guide
            </Link>{" "}
            — USJ has its own Studio Pass and online-only rules. You can book a Kaiyukan ticket below.
          </p>
        </section>

        {/* How to use / step-by-step */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Choose &amp; Use the Pass</h2>
          <div className={styles.stepsList}>
            {steps.map((step, i) => (
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

        {/* Getting there */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting around</span>
          <h2 className={styles.sectionTitle}>Getting Into Osaka &amp; Around the City</h2>
          <p className={styles.bodyText}>
            Most of the Amazing Pass sights sit on the Osaka Metro network, which the pass covers in full within
            Osaka city. Arriving from Kansai Airport first? Compare your options in our{" "}
            <Link href="/guides/transport/haruka-vs-nankai-rapit" style={{ color: "var(--red)", fontWeight: 600 }}>
              Haruka vs Nankai Rapi:t guide
            </Link>
            , then weigh standalone transit for non-pass days with the{" "}
            <Link href="/guides/transport/osaka-metro-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              Osaka Metro pass vs Enjoy Eco Card comparison
            </Link>
            .
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
            <Link href="/guides/attractions/usj-tickets-express-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 11a8 8 0 0 1 16 0v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
                  <path d="M12 3v8M9 6h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Universal Studios Japan Tickets &amp; Express Pass (2026): What to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/haruka-vs-nankai-rapit" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Haruka vs Nankai Rapi:t (2026): Best Train from Kansai Airport</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-metro-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18" />
                  <circle cx="8" cy="14.5" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Metro Pass vs Enjoy Eco Card (2026): Which to Buy?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>More Things to Do in Japan →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>See more of Osaka for less</h2>
            <p className={styles.ctaBannerDesc}>
              Bundle unlimited city transport with 40+ free admissions on the Osaka Amazing Pass — and add a
              Kaiyukan aquarium ticket, since the whale sharks aren&apos;t on the pass.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <a href={OSAKA_AMAZING_PASS_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
                View Osaka Amazing Pass →
              </a>
              <a href={KAIYUKAN_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
                View Kaiyukan Ticket →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
