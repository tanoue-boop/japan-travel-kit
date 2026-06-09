import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// CTA links — Klook affiliate redirects.
const STUDIO_PASS_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1299137&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F46604-universal-studios-japan-e-ticket-osaka-qr-code-direct-entry%2F";
const EXPRESS_PASS_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1299138&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F3407-universal-studios-japan-express-pass-osaka%2F";

const ticketRows = [
  { ticket: "1-Day Studio Pass", what: "Park entry for one day; ride standard attractions in standby queues", price: "Tiered by date — confirm at booking" },
  { ticket: "2-Day Studio Pass", what: "Two consecutive days of entry, often cheaper per day", price: "Tiered by date — confirm at booking" },
  { ticket: "Express Pass (add-on)", what: "Skip-the-line at selected rides + Super Nintendo World timed entry", price: "Variable, often a large add-on — confirm at booking" },
];

const expressRows = [
  { pass: "Express Pass 4", rides: "~4 selected attractions", snw: "Usually includes SNW timed entry (varies)", bestFor: "Short visits, hitting the headline rides" },
  { pass: "Express Pass 7", rides: "~7 selected attractions", snw: "Usually includes SNW timed entry", bestFor: "Most popular — busy weekends & holidays" },
  { pass: "Express Pass 8 / Premium", rides: "Widest attraction coverage", snw: "Includes SNW timed entry", bestFor: "Peak crowds & the 25th-anniversary season" },
];

const whoFor = [
  {
    title: "Off-peak weekday visitor",
    desc: "If you're going on a quiet weekday and you're flexible, a Studio Pass alone can be enough. Use the free Super Nintendo World area timed-entry ticket via the official USJ app, and ride standby queues for everything else.",
  },
  {
    title: "Weekend / holiday visitor",
    desc: "On weekends, holidays, and through the 2026 25th-anniversary season, standby waits can hit 180–240 minutes on top rides. A Studio Pass plus an Express Pass 7 is the realistic way to ride the headliners and guarantee Super Nintendo World.",
  },
  {
    title: "One day, want it all",
    desc: "If you only have a single day and want to cover the big attractions plus SNW without queuing for hours, an Express Pass 7 or 8 is worth the premium. It effectively buys back the time you'd otherwise lose in line.",
  },
];

const steps = [
  {
    title: "Buy your Studio Pass online — before you arrive",
    desc: "Since May 2025, USJ no longer sells same-day tickets at the gate, so online purchase is effectively required. Klook is an official USJ partner with English checkout and foreign-card support.",
  },
  {
    title: "Decide whether you need an Express Pass",
    desc: "Check your visit date against expected crowds. For weekends, holidays, and the anniversary season, add an Express Pass; for a quiet weekday you may not need one.",
  },
  {
    title: "Sort out Super Nintendo World entry",
    desc: "SNW often uses timed entry on busy days. An Express Pass that includes SNW timed entry guarantees access; otherwise, get a free area timed-entry ticket through the official USJ app once you're inside.",
  },
  {
    title: "Arrive before opening",
    desc: "Gates can open earlier than the official time on busy days. Arriving 30–60 minutes early helps you secure SNW timed-entry tickets and get a head start on standby queues.",
  },
];

const faqItems = [
  {
    q: "Do I need to buy USJ tickets in advance?",
    a: "Yes. Since May 2025, Universal Studios Japan stopped selling same-day tickets at the gate, so you need to buy online before you go. Booking through an official partner like Klook gives you an English checkout, accepts foreign cards, and delivers an e-ticket you can scan at entry.",
  },
  {
    q: "Is the USJ Express Pass worth it in 2026?",
    a: "On busy days, yes. 2026 is USJ's 25th-anniversary season, and standby waits on the most popular rides can reach 180–240 minutes. An Express Pass turns those multi-hour waits into priority entry and, on most variants, guarantees Super Nintendo World timed entry. On a quiet off-peak weekday it's less essential — but for weekends, holidays, and anniversary crowds it's close to a must-have if you want to ride the headliners.",
  },
  {
    q: "What's the difference between Express Pass 4, 7, and 8?",
    a: "The number roughly reflects how many selected attractions you can skip the line for — Express Pass 4 covers around four, Express Pass 7 around seven, and the 8/Premium tiers cover the widest range. Most variants also include a Super Nintendo World timed-entry ticket. Express Pass 7 is the most popular balance of coverage and price; 8/Premium suits the busiest days. Exact attraction lists vary by date, so check what's included before buying.",
  },
  {
    q: "How do I get into Super Nintendo World?",
    a: "On busy days, Super Nintendo World uses timed entry. There are two reliable ways in: buy an Express Pass that includes an SNW timed-entry ticket, or get a free area timed-entry ticket through the official USJ app after you enter the park. On quiet days you may be able to walk in, but don't count on it during weekends, holidays, or the anniversary season.",
  },
  {
    q: "How much are USJ tickets?",
    a: "USJ uses tiered, date-based pricing, so the same ticket costs more on busy dates than quiet ones. Because prices change by date and demand, we don't quote a fixed figure — check the live price for your specific date at the time of booking. Express Passes are a separate add-on on top of the Studio Pass and vary widely by date.",
  },
];

export default function UsjTicketsExpressPassPage() {
  return (
    <>
      <Head>
        <title>Universal Studios Japan Tickets &amp; Express Pass (2026): What to Buy | Japan Travel Kit</title>
        <meta
          name="description"
          content="USJ now requires online tickets and Super Nintendo World needs timed entry. We explain Studio Pass tiers, whether the Express Pass is worth it, and what to buy in 2026."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/usj-tickets-express-pass" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Universal Studios Japan Tickets & Express Pass (2026): What to Buy" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/usj-tickets-express-pass" />
        <meta property="og:description" content="USJ now requires online tickets and Super Nintendo World needs timed entry. We explain Studio Pass tiers, whether the Express Pass is worth it, and what to buy in 2026." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Universal Studios Japan Tickets & Express Pass (2026): What to Buy" />
        <meta name="twitter:description" content="USJ now requires online tickets and Super Nintendo World needs timed entry. We explain Studio Pass tiers, whether the Express Pass is worth it, and what to buy in 2026." />
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
              headline: "Universal Studios Japan Tickets & Express Pass (2026): What to Buy",
              dateModified: "2026-06-08",
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
                { "@type": "ListItem", position: 4, name: "USJ Tickets & Express Pass", item: "https://www.japan-travel-kit.com/guides/attractions/usj-tickets-express-pass" },
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
          <span className={styles.breadCurrent}>USJ Tickets &amp; Express Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🎢</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Universal Studios Japan Tickets &amp;<br />Express Pass (2026): What to Buy
          </h1>
          <p className={styles.heroSubtitle}>
            Online tickets are now required, Super Nintendo World needs timed entry, and 2026 is the
            25th-anniversary crush. Here&apos;s exactly what to buy for your visit.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Studio Pass + Express Pass", "Super Nintendo World"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Everyone needs</p>
                <p className={styles.verdictStatValue}>A Studio Pass (online)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Add Express Pass if</p>
                <p className={styles.verdictStatValue}>Weekend / holiday / anniversary</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Super Nintendo World</p>
                <p className={styles.verdictStatValue}>Needs timed entry on busy days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Buy at the gate?</p>
                <p className={styles.verdictStatValue}>No — online only since 2025</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Buy a Studio Pass online for entry. On busy dates — and 2026 is
              busy — add an Express Pass to skip multi-hour queues and guarantee Super Nintendo World.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <a href={STUDIO_PASS_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ Studio Pass →
              </a>
              <a href={EXPRESS_PASS_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ Express Pass →
              </a>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How USJ Tickets Work in 2026</h2>
          <p className={styles.bodyText}>
            There are two things to understand before you buy. First, the <strong>Studio Pass</strong> is your
            park entry — everyone needs one, and since May 2025 you can no longer buy it at the gate on the day.
            It&apos;s online-only, with tiered pricing that&apos;s higher on busy dates.
          </p>
          <p className={styles.bodyText}>
            Second, the <strong>Express Pass</strong> is an optional add-on that lets you skip the standby line
            at selected attractions and, on most variants, includes a timed-entry ticket for{" "}
            <strong>Super Nintendo World</strong>. It is not park entry on its own — you buy it on top of a
            Studio Pass. With 2026 being USJ&apos;s 25th-anniversary season, crowds are heavy and the Express
            Pass is far more valuable than in a quiet year.
          </p>
        </section>

        {/* Ticket types table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Ticket types</span>
          <h2 className={styles.sectionTitle}>USJ Ticket Types at a Glance</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "What it is", "Pricing"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            USJ uses tiered, date-based pricing — the same ticket costs more on busy dates. We don&apos;t quote
            fixed figures; check the live price for your date at booking (2026, variable, confirm at checkout).
          </p>
        </section>

        {/* Express pass tiers */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Express Pass tiers</span>
          <h2 className={styles.sectionTitle}>Express Pass 4 vs 7 vs 8</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Express Pass", "Ride skips", "Super Nintendo World", "Best for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {expressRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.rides}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.snw}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            The exact attractions covered and whether Super Nintendo World timed entry is included vary by
            variant and date — always check the inclusions for your specific date before buying.
          </p>
        </section>

        {/* Who should buy what */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Who buys what</span>
          <h2 className={styles.sectionTitle}>What Should You Buy?</h2>
          <div className={styles.stepsList}>
            {whoFor.map((item, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Book &amp; Plan Your Visit</h2>
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
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>Getting to USJ from Osaka &amp; Kansai Airport</h2>
          <p className={styles.bodyText}>
            USJ is in Konohana-ku, western Osaka, a short walk from Universal City Station on the JR Yumesaki
            (Sakurajima) Line — usually reached by changing at Nishikujo. From Kansai Airport, the Haruka or
            Nankai routes get you into the city; from there it&apos;s a straightforward train transfer.
          </p>
          <p className={styles.bodyText}>
            Plan your route with our{" "}
            <Link href="/guides/transport/osaka-airport-transfer" style={{ color: "var(--red)", fontWeight: 600 }}>
              Osaka airport transfer guide
            </Link>,{" "}
            <Link href="/guides/transport/haruka-vs-nankai-rapit" style={{ color: "var(--red)", fontWeight: 600 }}>
              Haruka vs Nankai Rapi:t
            </Link>, and the{" "}
            <Link href="/guides/transport/osaka-metro-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              Osaka Metro pass guide
            </Link>.
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
            <Link href="/guides/transport/osaka-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 16l20-5-9-2-3-6-1 5-7 8z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Airport Transfer Guide (2026): KIX &amp; ITM to the City</p>
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
            <h2 className={styles.ctaBannerTitle}>Skip the queues at USJ</h2>
            <p className={styles.ctaBannerDesc}>
              Buy your Studio Pass online (required since 2025) and add an Express Pass to beat the
              25th-anniversary crowds and guarantee Super Nintendo World.
            </p>
            <a href={EXPRESS_PASS_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
              View USJ Tickets &amp; Passes →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
