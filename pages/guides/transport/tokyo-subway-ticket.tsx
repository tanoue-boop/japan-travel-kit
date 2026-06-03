import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const SUBWAY_URL =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1267427&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1552-subway-ticket-tokyo%2F";

const priceRows = [
  { pass: "24-hour", price: "¥800",   perDay: "¥800 / day",   breakeven: "~4–5 rides" },
  { pass: "48-hour", price: "¥1,200", perDay: "¥600 / day",   breakeven: "~3–4 rides / day" },
  { pass: "72-hour", price: "¥1,500", perDay: "¥500 / day",   breakeven: "~3 rides / day" },
];

const vsRows = [
  { scenario: "1–3 subway rides per day",   pick: "Suica / Pasmo", note: "Pay-as-you-go is cheaper and more flexible at this level of use." },
  { scenario: "4+ subway rides per day",    pick: "Subway Ticket", note: "The flat-rate pass beats per-ride fares once you're hopping around a lot." },
  { scenario: "Using JR (Yamanote) a lot",  pick: "Suica / Pasmo", note: "The Subway Ticket does not cover JR lines — an IC card does." },
  { scenario: "One intense sightseeing day", pick: "Subway Ticket", note: "A packed day of Asakusa → Ueno → Ginza → Roppongi → Shibuya easily clears 5 rides." },
];

const coveragePoints = [
  {
    title: "Covers Tokyo Metro + Toei Subway",
    desc: "The Tokyo Subway Ticket gives unlimited rides on all 9 Tokyo Metro lines and all 4 Toei Subway lines for the duration you buy. That's 13 lines reaching Asakusa, Ginza, Shinjuku, Shibuya, Roppongi, Ueno, and most major tourist areas.",
  },
  {
    title: "Does NOT cover JR lines",
    desc: "Crucially, the pass does not work on JR East lines — including the Yamanote Line that loops around central Tokyo. If your day relies heavily on the Yamanote Line, a pay-as-you-go IC card (Suica or Pasmo) is the better tool.",
  },
  {
    title: "Sold to short-term visitors",
    desc: "The ticket is aimed at tourists and short-term visitors. As of 2026 it's typically sold on a foreign-passport basis, but eligibility and pickup rules can change — confirm the current conditions at the point of purchase.",
  },
];

const buyPoints = [
  {
    title: "At Narita & Haneda airports",
    desc: "Both airports sell the Tokyo Subway Ticket — for example at the Keisei counters and Bic Camera stores in the arrivals area. Buying on arrival means it's ready before you reach the city. (Locations are a 2026 guide and can move — check signage on arrival.)",
  },
  {
    title: "Online via Klook (voucher)",
    desc: "You can buy a voucher online in advance and exchange it for the physical pass at a designated counter after you land. This locks in the price and skips the decision-making after a long flight.",
  },
  {
    title: "Tourist information centres",
    desc: "Major tourist information centres and some electronics retailers in central Tokyo also stock the pass. If you decide you want one mid-trip, you usually won't have to go far to find it.",
  },
];

const faqItems = [
  {
    q: "Is the Tokyo Subway Ticket worth it?",
    a: "It's worth it if you take roughly 4 or more subway rides per day on the Tokyo Metro and Toei lines. The 24-hour pass costs about ¥800 (a 2026 estimate, subject to change), while individual Metro rides run around ¥170–210 each — so 4–5 rides in a day cover the cost. If you only make a couple of journeys, or rely heavily on the JR Yamanote Line, a pay-as-you-go Suica or Pasmo is cheaper and more flexible.",
  },
  {
    q: "What does the Tokyo Subway Ticket cover?",
    a: "It covers unlimited rides on all 9 Tokyo Metro lines and all 4 Toei Subway lines for 24, 48, or 72 hours. It does not cover JR lines (including the Yamanote Line) or private railways. For trips that mix subway and JR, an IC card handles both automatically.",
  },
  {
    q: "How much does the Tokyo Subway Ticket cost?",
    a: "As a 2026 guide, prices are approximately ¥800 for 24 hours, ¥1,200 for 48 hours, and ¥1,500 for 72 hours. These figures can change, so confirm the current price when you buy. Note that the clock runs in hours from first use, not calendar days — a 24-hour pass first tapped at 3pm is valid until 3pm the next day.",
  },
  {
    q: "Subway Ticket or Suica — which is better?",
    a: "For most travellers who use a mix of JR and subway, a Suica or Pasmo IC card is the simplest all-round choice because it works on every line, bus, and many shops. The Tokyo Subway Ticket only makes sense on days when you'll take several subway-only journeys. Many visitors carry an IC card as their default and add a Subway Ticket only for an especially busy sightseeing day.",
  },
  {
    q: "Where can I buy the Tokyo Subway Ticket?",
    a: "You can buy it at Narita and Haneda airports (for example at Keisei counters and Bic Camera), at major tourist information centres, and online through Klook as a voucher you exchange after landing. Specific outlets are a 2026 guide and can change, so follow the in-airport signage or your voucher instructions.",
  },
];

export default function TokyoSubwayTicketPage() {
  return (
    <>
      <Head>
        <title>Is the Tokyo Subway Ticket Worth It? 2026 Pass Guide | Japan Travel Kit</title>
        <meta
          name="description"
          content="Is the Tokyo Subway Ticket worth it? We break down the 24/48/72-hour pass prices, what it covers, the break-even point, and when Suica is the smarter choice in 2026."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/tokyo-subway-ticket" />
        <meta property="og:title" content="Is the Tokyo Subway Ticket Worth It? (2026): 24/48/72-Hour Pass Guide" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/tokyo-subway-ticket" />
        <meta property="og:description" content="Is the Tokyo Subway Ticket worth it? We break down the 24/48/72-hour pass prices, what it covers, the break-even point, and when Suica is the smarter choice in 2026." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Is the Tokyo Subway Ticket Worth It? (2026)" />
        <meta name="twitter:description" content="Is the Tokyo Subway Ticket worth it? We break down the 24/48/72-hour pass prices, what it covers, the break-even point, and when Suica is the smarter choice in 2026." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home",      item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",    item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Tokyo Subway Ticket", item: "https://www.japan-travel-kit.com/guides/transport/tokyo-subway-ticket" },
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
              headline: "Is the Tokyo Subway Ticket Worth It? (2026): 24/48/72-Hour Pass Guide",
              dateModified: "2026-06-03",
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
          <span className={styles.breadCurrent}>Tokyo Subway Ticket</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🎫</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Is the Tokyo Subway Ticket Worth It?<br />(2026): 24 / 48 / 72-Hour Pass Guide
          </h1>
          <p className={styles.heroSubtitle}>
            A flat-rate metro pass that&apos;s either a bargain or a waste — it all comes down to how many rides you take.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Break-Even Maths", "vs Suica"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Worth it from</p>
                <p className={styles.verdictStatValue}>~4 subway rides / day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Covers</p>
                <p className={styles.verdictStatValue}>Tokyo Metro + Toei</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Does not cover</p>
                <p className={styles.verdictStatValue}>JR (Yamanote Line)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Bottom line:</strong> The Tokyo Subway Ticket pays off only on days with <strong>around four or more
              subway journeys</strong> on the Metro and Toei lines. For lighter days — or any day leaning on the JR
              Yamanote Line — a pay-as-you-go <strong>Suica or Pasmo</strong> is cheaper and far more flexible.
            </p>
            <p className={styles.bodyText} style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
              This guide weighs up the pass on its own. For the bigger picture on navigating the city, see our{" "}
              <Link href="/guides/transport/tokyo-transportation" style={{ fontWeight: 600 }}>getting around Tokyo guide</Link>.
            </p>
          </div>
        </div>

        {/* Pricing & break-even */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Prices &amp; Break-Even Point</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Price", "Cost per day", "Breaks even at"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{row.perDay}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.breakeven}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Prices are approximate 2026 estimates and subject to change — confirm before buying. Break-even assumes a typical
            Tokyo Metro fare of around ¥170–210 per ride (single IC fares in central Tokyo run roughly ¥160–280). The longer
            passes are better value per day, so they reward a packed multi-day itinerary.
          </p>
        </section>

        {/* Coverage */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Coverage</span>
          <h2 className={styles.sectionTitle}>What the Pass Covers (and What It Doesn&apos;t)</h2>
          <div className={styles.stepsList}>
            {coveragePoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ticket vs Suica */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Which to use</span>
          <h2 className={styles.sectionTitle}>Subway Ticket vs Suica / Pasmo</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your day looks like", "Best choice", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vsRows.map((row) => (
                    <tr key={row.scenario}>
                      <td className={styles.tdProvider}>{row.scenario}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b", whiteSpace: "nowrap" }}>{row.pick}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Where to buy */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Where to buy</span>
          <h2 className={styles.sectionTitle}>Where to Buy the Tokyo Subway Ticket</h2>
          <div className={styles.stepsList}>
            {buyPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href={SUBWAY_URL}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Buy Tokyo Subway Ticket on Klook →
          </a>
        </section>

        {/* Worked example */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Worked example</span>
          <h2 className={styles.sectionTitle}>A Day Where the Pass Wins</h2>
          <p className={styles.bodyText}>
            Picture a classic first day in Tokyo: Asakusa in the morning, over to Ueno, down to Ginza for lunch, up to
            Roppongi in the afternoon, then Shibuya at night. That&apos;s five subway hops, all on Metro and Toei lines.
          </p>
          <p className={styles.bodyText}>
            At roughly ¥170–210 a ride, those five journeys would cost around ¥850–1,050 on a pay-as-you-go IC card.
            A 24-hour Tokyo Subway Ticket at about ¥800 (2026 estimate) covers the lot — and any extra detours are free.
            On a day like that, the pass is the clear winner.
          </p>
          <p className={styles.bodyText}>
            Flip it around, though: a relaxed day with two subway rides plus a couple of Yamanote Line trips would cost
            less on an IC card, and the pass would leave you out of pocket. The maths is entirely about how busy your day is.
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/transport/tokyo-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="8" width="20" height="10" rx="2" />
                  <path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
                  <circle cx="7" cy="17" r="1" fill="currentColor" stroke="none" />
                  <circle cx="17" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Tokyo (2026): Trains, Subway &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Compare Japan Transport Options →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Planning a packed sightseeing day?</h2>
            <p className={styles.ctaBannerDesc}>
              If you&apos;ll be hopping around the Metro and Toei lines, lock in the Tokyo Subway Ticket online and
              exchange it after you land.
            </p>
            <a href={SUBWAY_URL} className={styles.ctaBannerBtn} target="_blank" rel="noopener noreferrer nofollow">
              Buy Tokyo Subway Ticket on Klook →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
