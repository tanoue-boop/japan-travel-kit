import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const METRO_URL =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1267428&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F11515-osaka-metro-1-2-day-pass-osaka%2F";

const compareRows = [
  { feature: "Who can buy",        eco: "Anyone (residents & tourists)", pass: "Short-term foreign visitors*" },
  { feature: "Price",             eco: "¥820 weekday / ¥620 weekend",   pass: "2-day ¥1,800 (1-day also sold)" },
  { feature: "Child price",        eco: "¥310",                          pass: "Confirm at purchase" },
  { feature: "Duration",          eco: "1 day",                         pass: "1 or 2 days" },
  { feature: "Covers",            eco: "Osaka Metro + city buses",      pass: "Osaka Metro + city buses" },
  { feature: "Reaches Yumeshima", eco: "Yes (Chuo Line)",               pass: "Yes — incl. the Expo 2025 site" },
  { feature: "Attraction discounts", eco: "~30 facilities",             pass: "Confirm — varies" },
  { feature: "Sold on Klook",     eco: "No (station machines)",         pass: "Yes" },
];

const vsRows = [
  { scenario: "One day, on a weekend or holiday", pick: "Enjoy Eco Card", note: "At ¥620 it's the cheapest unlimited day in any major Japanese city — and anyone can buy it." },
  { scenario: "One day, on a weekday",            pick: "Enjoy Eco Card", note: "Still good value at ¥820, and it comes with ~30 attraction discounts." },
  { scenario: "Two full days of sightseeing",     pick: "Osaka Metro Pass", note: "The 2-day pass at ¥1,800 spreads the cost and saves swapping tickets each day." },
  { scenario: "Only 2–3 rides in a day",          pick: "ICOCA / Suica",  note: "Pay-as-you-go is cheaper than any day pass at this level of use." },
];

const ecoPoints = [
  {
    title: "Anyone can buy it",
    desc: "The Enjoy Eco Card is open to residents and tourists alike — no passport needed. Buy it from any Osaka Metro station ticket machine. It gives unlimited rides on the Osaka Metro and city buses for one day.",
  },
  {
    title: "Cheaper at weekends",
    desc: "The card costs ¥820 on weekdays and just ¥620 on Saturdays, Sundays, and public holidays (¥310 for children). The weekend price is the single best-value transit pass in Osaka — it pays for itself in about three rides.",
  },
  {
    title: "Around 30 attraction discounts",
    desc: "The card also unlocks discounts at roughly 30 Osaka attractions, from observation decks to museums and gardens. If your day includes a couple of paid sights, those savings stack on top of the free travel.",
  },
];

const passPoints = [
  {
    title: "Aimed at tourists, sold for 1 or 2 days",
    desc: "The Osaka Metro Pass is a tourist-oriented unlimited-ride ticket sold in 1-day and 2-day versions. It's typically offered to short-term foreign visitors — eligibility is a 2026 guide, so confirm the current conditions when you buy.",
  },
  {
    title: "The 2-day pass is the standout",
    desc: "The 2-day pass is normally ¥1,800 and is the version most travellers buy. For two consecutive days of sightseeing it removes the daily ticket decision and usually beats buying two single-day passes back to back.",
  },
  {
    title: "Reaches Yumeshima",
    desc: "Its coverage extends along the Chuo Line out to Yumeshima — the artificial island that hosted the Expo 2025 site. If your plans take you out to that side of the bay, the pass covers the ride.",
  },
];

const faqItems = [
  {
    q: "Osaka Metro Pass or Enjoy Eco Card — which should tourists buy?",
    a: "For a single day, the Enjoy Eco Card is usually the better pick — it's cheaper (¥620 at weekends, ¥820 on weekdays), anyone can buy it, and it includes around 30 attraction discounts. For two consecutive days of heavy sightseeing, the 2-day Osaka Metro Pass (about ¥1,800) spreads the cost and saves swapping tickets. If you'll only take a couple of rides, skip both and use a pay-as-you-go ICOCA.",
  },
  {
    q: "How much is the Enjoy Eco Card?",
    a: "The Enjoy Eco Card costs ¥820 on weekdays and ¥620 on Saturdays, Sundays, and public holidays, with a child price of ¥310. It gives unlimited rides on the Osaka Metro and city buses for one day, plus discounts at roughly 30 attractions. Buy it at any Osaka Metro station ticket machine.",
  },
  {
    q: "Is a day pass worth it in Osaka?",
    a: "More often than in Tokyo, yes. The break-even point is about four rides for the ¥820 weekday pass — and just three for the ¥620 weekend Enjoy Eco Card — which most sightseeing days clear easily. A single Midosuji Line hop from Umeda to Namba is ¥230, so the maths adds up quickly once you're moving around the city.",
  },
  {
    q: "Does the pass cover the trip to Yumeshima?",
    a: "Yes. Both the Enjoy Eco Card and the Osaka Metro Pass cover the Chuo Line out to Yumeshima, the island that hosted the Expo 2025 site. As always with extended-area coverage, treat it as a 2026 guide and confirm current conditions before you travel.",
  },
  {
    q: "Can I use ICOCA instead of a day pass?",
    a: "Yes, and for light days it's cheaper. An ICOCA (or a Suica from Tokyo — they're interchangeable) works on the Osaka Metro, JR, private railways, and buses on a pay-as-you-go basis. It's the better choice if you'll only take two or three rides. A day pass wins once you're making four or more journeys in a day.",
  },
];

export default function OsakaMetroPassPage() {
  return (
    <>
      <Head>
        <title>Osaka Metro Pass vs Enjoy Eco Card 2026: Which to Buy? | Japan Travel Kit</title>
        <meta
          name="description"
          content="Osaka Metro Pass or Enjoy Eco Card? We compare price, who can buy, coverage, and the break-even point so tourists know which Osaka day pass to buy in 2026."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/osaka-metro-pass" />
        <meta property="og:title" content="Osaka Metro Pass vs Enjoy Eco Card (2026): Which Should Tourists Buy?" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/osaka-metro-pass" />
        <meta property="og:description" content="Osaka Metro Pass or Enjoy Eco Card? We compare price, who can buy, coverage, and the break-even point so tourists know which Osaka day pass to buy in 2026." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Osaka Metro Pass vs Enjoy Eco Card (2026)" />
        <meta name="twitter:description" content="Osaka Metro Pass or Enjoy Eco Card? We compare price, who can buy, coverage, and the break-even point so tourists know which Osaka day pass to buy in 2026." />
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
                { "@type": "ListItem", position: 4, name: "Osaka Metro Pass vs Enjoy Eco Card", item: "https://www.japan-travel-kit.com/guides/transport/osaka-metro-pass" },
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
              headline: "Osaka Metro Pass vs Enjoy Eco Card (2026): Which Should Tourists Buy?",
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
          <span className={styles.breadCurrent}>Osaka Metro Pass vs Enjoy Eco Card</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🚇</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Osaka Metro Pass vs Enjoy Eco Card<br />(2026): Which Should Tourists Buy?
          </h1>
          <p className={styles.heroSubtitle}>
            Two Osaka day passes, often confused. One is cheaper for a single day; the other is built for two.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Side-by-Side", "Break-Even Maths"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Best for one day</p>
                <p className={styles.verdictStatValue}>Enjoy Eco Card (¥620–820)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best for two days</p>
                <p className={styles.verdictStatValue}>Osaka Metro Pass (¥1,800)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Worth it from</p>
                <p className={styles.verdictStatValue}>~4 rides / day</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Bottom line:</strong> For a single day, the <strong>Enjoy Eco Card</strong> is usually the smarter
              buy — cheaper (especially at weekends), open to anyone, and bundled with attraction discounts. For two
              straight days of sightseeing, the <strong>2-day Osaka Metro Pass</strong> spreads the cost. Just a couple
              of rides? Use a pay-as-you-go <strong>ICOCA</strong>.
            </p>
            <p className={styles.bodyText} style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
              This guide compares the two passes head-to-head. For the full rundown on lines, hubs, and IC cards, see our{" "}
              <Link href="/guides/transport/osaka-transportation" style={{ fontWeight: 600 }}>getting around Osaka guide</Link>.
            </p>
          </div>
        </div>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Head-to-head</span>
          <h2 className={styles.sectionTitle}>Enjoy Eco Card vs Osaka Metro Pass</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Enjoy Eco Card", "Osaka Metro Pass"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.tdProvider}>{row.feature}</td>
                      <td>{row.eco}</td>
                      <td>{row.pass}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            *Tourist-pass eligibility, the 1-day price, and discount details are a 2026 guide and can change — confirm before buying. Prices shown are current 2026 figures.
          </p>
        </section>

        {/* Enjoy Eco Card */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Enjoy Eco Card</span>
          <h2 className={styles.sectionTitle}>When to Choose the Enjoy Eco Card</h2>
          <div className={styles.stepsList}>
            {ecoPoints.map((point, i) => (
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

        {/* Osaka Metro Pass */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Osaka Metro Pass</span>
          <h2 className={styles.sectionTitle}>When to Choose the Osaka Metro Pass</h2>
          <div className={styles.stepsList}>
            {passPoints.map((point, i) => (
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
            href={METRO_URL}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Buy Osaka Metro Pass on Klook →
          </a>
        </section>

        {/* Which to use */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Which to use</span>
          <h2 className={styles.sectionTitle}>Which Pass Fits Your Trip?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your trip looks like", "Best choice", "Why"].map((h) => (
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
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to buy</span>
          <h2 className={styles.sectionTitle}>Where to Buy Each Pass</h2>
          <p className={styles.bodyText}>
            The <strong>Enjoy Eco Card</strong> is sold at Osaka Metro station ticket machines — no advance booking
            needed, and anyone can buy it on the spot. Decide on the day based on how much you plan to move around.
          </p>
          <p className={styles.bodyText}>
            The tourist <strong>Osaka Metro Pass</strong> is the version sold online through Klook. Buy a voucher
            before you fly and exchange it after you arrive, which locks in the price and saves time on the ground.
            It&apos;s the easier option to secure in advance for a planned two-day itinerary.
          </p>
          <a
            href={METRO_URL}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.5rem", display: "inline-block" }}
          >
            Buy Osaka Metro Pass on Klook →
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/transport/osaka-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 11V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
                  <path d="M4 11H2v5l2 2h16l2-2v-5H4Z" />
                  <circle cx="7.5" cy="16.5" r="1.5" />
                  <circle cx="16.5" cy="16.5" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Osaka (2026): Subway, Trains &amp; IC Cards Explained</p>
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
            <h2 className={styles.ctaBannerTitle}>Two days in Osaka?</h2>
            <p className={styles.ctaBannerDesc}>
              If you&apos;re sightseeing across two days, lock in the 2-day Osaka Metro Pass online and exchange it
              after you land.
            </p>
            <a href={METRO_URL} className={styles.ctaBannerBtn} target="_blank" rel="noopener noreferrer nofollow">
              Buy Osaka Metro Pass on Klook →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
