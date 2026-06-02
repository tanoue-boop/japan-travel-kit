import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const optionsTable = [
  { option: "Nozomi Shinkansen", time: "2h 15min",   price: "¥14,720",       best: "Speed" },
  { option: "Hikari Shinkansen", time: "2h 45min",   price: "¥13,850",       best: "JR Pass users" },
  { option: "Highway bus",       time: "8–9 hours",  price: "¥3,000–¥5,000", best: "Budget" },
  { option: "Local trains",      time: "8–9 hours",  price: "¥2,270",        best: "Ultra budget" },
  { option: "Rental car",        time: "4–5 hours",  price: "¥15,000+",      best: "Flexibility" },
];

const faqItems = [
  {
    q: "What is the cheapest way from Tokyo to Kyoto?",
    a: "The absolute cheapest option is a chain of local trains, which costs around ¥2,270 but takes 8–9 hours with several transfers. For most budget travellers, an overnight highway bus (¥3,000–¥5,000) is the better choice — it's nearly as cheap, more comfortable, and saves you a night's accommodation since you sleep on board.",
  },
  {
    q: "Can I use the JR Pass on the Shinkansen to Kyoto?",
    a: "Yes — but only on the Hikari and Kodama trains, not the faster Nozomi. The JR Pass does not cover the Nozomi, so pass holders should board a Hikari (2h 45min) instead. The Hikari is only about 30 minutes slower and is fully covered by the pass at no extra cost.",
  },
  {
    q: "How long does the Shinkansen take from Tokyo to Kyoto?",
    a: "The Nozomi, the fastest Shinkansen, takes about 2 hours 15 minutes from Tokyo Station to Kyoto Station. The Hikari takes around 2 hours 45 minutes, and the all-stops Kodama takes closer to 3 hours 40 minutes. All three run on the same Tokaido Shinkansen line.",
  },
  {
    q: "Is the Nozomi faster than the Hikari?",
    a: "Yes. The Nozomi makes fewer stops and reaches Kyoto in about 2h 15min, while the Hikari stops at more stations and takes about 2h 45min — roughly 30 minutes longer. The Nozomi costs slightly more (¥14,720 vs ¥13,850) and, importantly, is not covered by the JR Pass.",
  },
  {
    q: "Can I take a night bus from Tokyo to Kyoto?",
    a: "Yes. Overnight highway buses depart Tokyo in the evening and arrive in Kyoto early the next morning, taking 8–9 hours. They're operated by companies like Willer Express and JR Bus, cost ¥3,000–¥5,000, and let you save on a night's accommodation. Reclining and premium seats are available for a more comfortable sleep.",
  },
];

export default function TokyoToKyotoPage() {
  const metaTitle = "Tokyo to Kyoto 2026: Cheapest & Fastest Ways | Japan Travel Kit";
  const metaDescription =
    "How to get from Tokyo to Kyoto in 2026. We compare the Shinkansen, highway bus, and local trains on price, speed, and comfort — with 2026 fares.";
  const canonical = "https://www.japan-travel-kit.com/guides/transport/tokyo-to-kyoto";

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:url" content={canonical} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport & Getting Around", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Tokyo to Kyoto", item: "https://www.japan-travel-kit.com/guides/transport/tokyo-to-kyoto" },
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
              headline: "Tokyo to Kyoto (2026): Cheapest & Fastest Ways to Get There",
              dateModified: "2026-06-02",
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Tokyo to Kyoto</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🚄</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Tokyo to Kyoto (2026):<br />Cheapest &amp; Fastest Ways to Get There
          </h1>
          <p className={styles.heroSubtitle}>
            The Shinkansen is fast but not always the cheapest.
            Here&apos;s every option — from the bullet train to overnight buses —
            so you can choose what suits your trip.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "All Options", "2026 Prices"].map((t) => (
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
            This doesn&apos;t affect our advice or rankings.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>Tokyo → Kyoto</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Fastest</p>
                <p className={styles.verdictStatValue}>Nozomi Shinkansen (2h 15min, ¥14,720)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest</p>
                <p className={styles.verdictStatValue}>Highway bus (¥3,000–¥5,000)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Value</p>
                <p className={styles.verdictStatValue}>Hikari Shinkansen with JR Pass</p>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", marginTop: "0.75rem", marginBottom: "1rem" }}>
              <strong style={{ color: "#fbbf24" }}>Recommended:</strong> The Shinkansen is the right choice for most travellers — fast, frequent, and stress-free.
            </p>
            <a
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264855&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1420-7-day-whole-japan-rail-pass-jr-pass%2F"
              className={styles.verdictBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Check JR Pass prices on Klook →
            </a>
          </div>
        </div>

        {/* All Options Compared */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>All Options Compared</h2>
          <p className={styles.bodyText}>
            Tokyo and Kyoto are about 450km apart. There&apos;s a route for every budget and travel style —
            from the 2-hour bullet train to a ¥2,270 local-train marathon. Here&apos;s how the main options
            stack up on time, price, and who they suit best.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Time", "Price", "Best For"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {optionsTable.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td className={styles.ftEsim}>{row.time}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td className={styles.tdBestFor}>{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Shinkansen */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Most Popular</span>
          <h2 className={styles.sectionTitle}>Shinkansen: The Most Popular Option</h2>
          <p className={styles.bodyText}>
            The Tokaido Shinkansen is how the vast majority of travellers make the Tokyo–Kyoto trip.
            Trains depart Tokyo Station every few minutes, run with famous punctuality, and deliver you
            to the heart of Kyoto in well under three hours. There are three train types on the line:
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Nozomi</strong> — the fastest (2h 15min). Makes the fewest stops, but is <strong>not covered by the JR Pass</strong>.</li>
            <li><strong>Hikari</strong> — slightly slower (2h 45min) with a few more stops. <strong>Fully covered by the JR Pass</strong>, making it the go-to for pass holders.</li>
            <li><strong>Kodama</strong> — the all-stops local Shinkansen (around 3h 40min). Rarely worth it for this route.</li>
          </ul>
          <p className={styles.bodyText}>
            A standard one-way ticket breaks down into a base fare plus a Shinkansen reservation charge.
            For Tokyo–Kyoto you&apos;re looking at roughly:
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Non-reserved seat (自由席):</strong> ~¥13,320 — cheapest, but no guaranteed seat</li>
            <li><strong>Reserved seat (指定席):</strong> ~¥14,170 — your own guaranteed seat</li>
            <li><strong>Green Car (グリーン車):</strong> ~¥18,690 — first-class, extra legroom and quiet</li>
          </ul>
          <p className={styles.bodyText}>
            If you&apos;re also travelling to other cities, a JR Pass can cover the Hikari at no per-trip cost.
            You can check current pass prices and book online before you fly:
          </p>
          <a
            href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264855&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1420-7-day-whole-japan-rail-pass-jr-pass%2F"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.5rem", display: "inline-flex" }}
          >
            Get the JR Pass on Klook →
          </a>
        </section>

        {/* JR Pass worth it */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Pass Maths</span>
          <h2 className={styles.sectionTitle}>Is the JR Pass Worth It Tokyo–Kyoto?</h2>
          <p className={styles.bodyText}>
            This is the question every traveller asks — and for a simple Tokyo–Kyoto round trip, the answer
            is usually no. Let&apos;s run the numbers:
          </p>
          <ul className={styles.bodyList}>
            <li>Tokyo ↔ Kyoto return (reserved Hikari): <strong>~¥27,700</strong></li>
            <li>7-day JR Pass: <strong>~¥50,000</strong></li>
          </ul>
          <p className={styles.bodyText}>
            <strong>Conclusion:</strong> A return trip alone costs roughly ¥27,700 — far less than the
            ¥50,000 pass. The JR Pass only pays off if you&apos;re covering more ground: adding Hiroshima,
            Hakone, or a Tokyo–Osaka–Kyoto loop, for example. If Kyoto is your only major Shinkansen
            destination, buy individual tickets and skip the pass.
          </p>
        </section>

        {/* Highway bus */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Budget Option</span>
          <h2 className={styles.sectionTitle}>Highway Bus: The Budget Option</h2>
          <p className={styles.bodyText}>
            If your budget matters more than your time, the highway bus is unbeatable. An overnight
            (夜行) service departs Tokyo in the evening and reaches Kyoto the next morning — so you also
            save a night&apos;s accommodation while you sleep on board.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Main operators:</strong> Willer Express, JR Bus, and a range of smaller companies</li>
            <li><strong>Price:</strong> ¥3,000–¥5,000 one way — a fraction of the Shinkansen fare</li>
            <li><strong>Comfort tiers:</strong> from basic 4-across seating up to premium reclining and curtained single seats</li>
          </ul>
          <p className={styles.bodyText}>
            The trade-off is comfort and time: 8–9 hours versus the Shinkansen&apos;s 2-and-a-bit. But for
            backpackers and budget-focused travellers, the savings are hard to argue with — especially on
            the overnight services.
          </p>
        </section>

        {/* Tips */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Travel Tips</span>
          <h2 className={styles.sectionTitle}>Tips for the Tokyo–Kyoto Journey</h2>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" /><path d="M9 9v.01M9 12v.01M9 15v.01" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Sit on the right for Mt. Fuji</p>
              <p className={styles.whoForDesc}>
                Heading from Tokyo to Kyoto, book seat E (window, right-hand side) for the best Mt. Fuji
                views — clearest on the Hikari and Kodama, which run a touch slower past it.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Send luggage ahead</p>
              <p className={styles.whoForDesc}>
                Use a takkyubin (宅急便) courier to forward large bags from your Tokyo hotel to Kyoto a day
                ahead. You&apos;ll travel light and skip wrestling suitcases through busy stations.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>IC cards don&apos;t cover the Shinkansen</p>
              <p className={styles.whoForDesc}>
                A Suica or Pasmo won&apos;t pay for the bullet train — you need a separate Shinkansen ticket.
                Buy at a machine, ticket office, or online before you travel.
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
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M6 15h4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" /><path d="M4 11h16M8 21l2-4M16 21l-2-4" /><circle cx="8.5" cy="14" r="0.5" fill="currentColor" /><circle cx="15.5" cy="14" r="0.5" fill="currentColor" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide 2026: Tickets, Passes &amp; Tips</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Compare Japan Transport Options</p>
                <span className={styles.relatedArrow}>View comparison →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Planning your Japan rail trip?</h2>
            <p className={styles.ctaBannerDesc}>
              Compare the JR Pass against individual tickets and see whether it pays off for your
              itinerary — with 2026 prices and real route examples.
            </p>
            <Link href="/guides/transport/jr-pass-guide" className={styles.ctaBannerBtn}>
              Read the JR Pass Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
