import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// Official ticket source (Ticket Oosumo). TODO: swap to Klook Tokyo tournament-tour affiliate link when listed in-season (~Sept 2026 basho)
const SUMO_TOURNAMENT_URL = "https://sumo.pia.jp/en/";
// Klook affiliate redirect.
const SUMO_PRACTICE_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1307055&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F130115-sumo-morning-practice-viewing-tour-tokyo%2F";

const scheduleRows = [
  { basho: "January (Hatsu)", dates: "11–25 Jan 2026", days: "15 days" },
  { basho: "May (Natsu)", dates: "10–24 May 2026", days: "15 days" },
  { basho: "September (Aki)", dates: "13–27 Sep 2026", days: "15 days" },
];

const seatRows = [
  {
    seat: "Masuseki (box seats)",
    detail: "Floor-level boxes near the ring, seated on cushions (zabuton). The traditional, closest experience.",
  },
  {
    seat: "Isu-seki (chair seats)",
    detail: "Western-style chairs on the upper tiers. More comfortable for longer sessions and generally cheaper.",
  },
  {
    seat: "Same-day tickets",
    detail: "Around 400 are sold each tournament day, roughly ¥2,200, on a first-come basis early in the morning.",
  },
];

const whoFor = [
  {
    title: "Go to a tournament if…",
    desc: "Your Tokyo dates fall in January, May, or September — the three months the capital hosts a 15-day basho at Ryogoku Kokugikan. It's the real thing: top-division bouts, the full ceremony, and a packed arena. Just book the moment tickets go on sale.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21h16" />
        <path d="M6 21V9a6 6 0 0 1 12 0v12" />
        <circle cx="12" cy="9" r="2" />
      </svg>
    ),
  },
  {
    title: "See morning practice if…",
    desc: "You're visiting outside tournament months, or want a closer, quieter look. A sumo stable (heya) morning practice tour puts you ringside for the training session — usually around three hours, often with a chanko hot-pot meal, and generally for ages 12 and up.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Try same-day tickets if…",
    desc: "You're flexible and don't mind queuing. About 400 same-day tickets (roughly ¥2,200) are released each tournament day, sold first-come early in the morning. It's the budget route in if advance tickets have already sold out.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 15h4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Check whether you're in town for a basho",
    desc: "Tokyo hosts three of the year's six grand tournaments — in January, May, and September — each running 15 days at Ryogoku Kokugikan in Sumida. If your dates line up, a tournament is the headline experience. If not, a morning practice tour is the year-round alternative.",
  },
  {
    title: "Buy from the official seller — and only the official seller",
    desc: "Advance tickets go on sale roughly one month before each tournament and sell out fast. The official, legitimate channel is Ticket Oosumo (sumo.pia.jp/en). Avoid resale sites such as Viagogo and StubHub, which are not official and are widely cautioned against.",
  },
  {
    title: "Choose your seat type",
    desc: "Box seats (masuseki) put you at floor level on cushions for the closest, most traditional experience, while chair seats (isu-seki) on the upper tiers are more comfortable and usually cheaper. Pick based on budget and how long you plan to stay.",
  },
  {
    title: "If it's sold out, consider a tour or same-day tickets",
    desc: "When official tickets are gone, a guided tour that includes tournament admission is a practical fallback. Alternatively, around 400 same-day tickets (about ¥2,200) are sold each day on a first-come basis early in the morning — be prepared to queue.",
  },
];

const faqItems = [
  {
    q: "When are the 2026 sumo tournaments in Tokyo?",
    a: "Tokyo hosts three of the six annual grand tournaments in 2026: the January (Hatsu) basho on 11–25 January, the May (Natsu) basho on 10–24 May, and the September (Aki) basho on 13–27 September. Each runs for 15 days at Ryogoku Kokugikan in Sumida. The other three tournaments are held in Osaka, Nagoya, and Fukuoka.",
  },
  {
    q: "How do I buy official sumo tickets?",
    a: "Advance tickets go on sale roughly one month before each tournament and tend to sell out quickly. The official, legitimate seller is Ticket Oosumo (sumo.pia.jp/en) — buy there. Steer clear of resale platforms like Viagogo and StubHub, which are not official channels and are widely warned against for sumo tickets.",
  },
  {
    q: "What seat types are available, and how much do they cost?",
    a: "There are two main types: masuseki (traditional floor-level box seats where you sit on cushions, closest to the ring) and isu-seki (Western-style chair seats on the upper tiers, more comfortable and usually cheaper). Exact prices vary by seat and tournament, so check current rates on the official site. Same-day tickets run about ¥2,200.",
  },
  {
    q: "Can I get same-day sumo tickets?",
    a: "Yes. Around 400 same-day tickets, priced at roughly ¥2,200, are released each tournament day and sold on a first-come basis early in the morning. They're the budget way in and a useful backup if advance tickets have sold out — but expect to queue, especially on popular days.",
  },
  {
    q: "What if I'm not visiting during a tournament?",
    a: "You can still experience sumo by joining a morning practice (keiko) tour at a sumo stable. These put you ringside for the training session, typically last around three hours, and often include a chanko hot-pot meal. They generally have a minimum age of about 12. It's a closer, quieter alternative available outside the tournament months.",
  },
  {
    q: "Where is Ryogoku Kokugikan and how do I get there?",
    a: "Ryogoku Kokugikan, Tokyo's national sumo arena, is in the Ryogoku district of Sumida ward, right by Ryogoku Station. It's easily reached on the JR Sobu Line and the Toei Oedo subway line. For planning trains and IC cards across the city, see our getting around Tokyo guide.",
  },
];

export default function SumoTokyoTicketsPage() {
  return (
    <>
      <Head>
        <title>Sumo in Tokyo (2026): Tournament Tickets vs Morning Practice | Japan Travel Kit</title>
        <meta
          name="description"
          content="Sumo in Tokyo 2026: the January, May and September tournament dates, how to buy official tickets (and avoid resale scams), seat types, same-day tickets, and morning practice tours."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/sumo-tokyo-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Sumo in Tokyo (2026): Tournament Tickets vs Morning Practice" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/sumo-tokyo-tickets" />
        <meta property="og:description" content="Sumo in Tokyo 2026: the January, May and September tournament dates, how to buy official tickets (and avoid resale scams), seat types, same-day tickets, and morning practice tours." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sumo in Tokyo (2026): Tournament Tickets vs Morning Practice" />
        <meta name="twitter:description" content="Sumo in Tokyo 2026: the January, May and September tournament dates, how to buy official tickets (and avoid resale scams), seat types, same-day tickets, and morning practice tours." />
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
              headline: "Sumo in Tokyo (2026): Tournament Tickets vs Morning Practice",
              dateModified: "2026-06-17",
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
                { "@type": "ListItem", position: 4, name: "Sumo in Tokyo", item: "https://www.japan-travel-kit.com/guides/attractions/sumo-tokyo-tickets" },
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
          <span className={styles.breadCurrent}>Sumo in Tokyo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🥋</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Sumo in Tokyo (2026):<br />Tournament Tickets vs Morning Practice
          </h1>
          <p className={styles.heroSubtitle}>
            Tokyo hosts three 15-day grand tournaments a year at Ryogoku Kokugikan. Here&apos;s when they run,
            how to buy official tickets safely, and how to see a stable&apos;s morning practice the rest of the year.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Official Tickets Only", "Year-Round Option"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Tokyo basho</p>
                <p className={styles.verdictStatValue}>Jan, May &amp; Sep</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Venue</p>
                <p className={styles.verdictStatValue}>Ryogoku Kokugikan</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Official tickets</p>
                <p className={styles.verdictStatValue}>Ticket Oosumo only</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>No tournament?</p>
                <p className={styles.verdictStatValue}>Morning practice tour</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> If your dates hit a January, May, or September basho, buy from the
              official seller (Ticket Oosumo) the day tickets release — and avoid resale sites. Outside those
              months, a sumo stable morning practice tour gets you ringside year-round.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <a href={SUMO_TOURNAMENT_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Tournament Experiences →
              </a>
              <a href={SUMO_PRACTICE_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Morning Practice Tours →
              </a>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Two Ways to See Sumo in Tokyo</h2>
          <p className={styles.bodyText}>
            There are two quite different ways to experience Japan&apos;s national sport in Tokyo. The first is a
            grand tournament (basho): Tokyo hosts three of the year&apos;s six, each a 15-day spectacle at
            Ryogoku Kokugikan, the national sumo arena in Sumida. The second is a morning practice (keiko) at a
            sumo stable, where you watch the wrestlers train up close — an option that runs year-round, including
            in the months between tournaments.
          </p>
          <p className={styles.bodyText}>
            Which one fits depends mostly on your dates. Below we cover the 2026 Tokyo tournament schedule, how to
            buy tickets safely, the seat types and prices, and how the morning practice alternative works.
          </p>
        </section>

        {/* Schedule table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>2026 schedule</span>
          <h2 className={styles.sectionTitle}>Tokyo Grand Tournaments in 2026</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tournament", "Dates", "Length"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scheduleRows.map((row) => (
                    <tr key={row.basho}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.basho}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.dates}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.days}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Dates as of 2026 — confirm on the official site before booking travel. The remaining three of the
            year&apos;s six grand tournaments are held in Osaka, Nagoya, and Fukuoka.
          </p>
        </section>

        {/* Seat types table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Seats</span>
          <h2 className={styles.sectionTitle}>Seat Types Explained</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Type", "What to expect"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seatRows.map((row) => (
                    <tr key={row.seat}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.seat}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Safety / official note */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Buy safely</span>
          <h2 className={styles.sectionTitle}>Use the Official Seller — Avoid Resale Sites</h2>
          <p className={styles.bodyText}>
            Sumo tickets are in high demand, and that draws resellers. The only official, legitimate channel is{" "}
            <strong>Ticket Oosumo</strong> (sumo.pia.jp/en). Resale platforms such as Viagogo and StubHub are not
            official sellers and are widely cautioned against — tickets there can be heavily marked up or invalid.
            Buy from the official site the day tickets go on sale, roughly a month before the tournament, since
            they sell out quickly.
          </p>
          <p className={styles.bodyText}>
            Tournament tickets for the Tokyo basho (held at Ryogoku Kokugikan in January, May, and September) are
            bought from the official Ticket Oosumo site. Klook&apos;s ticket-inclusive spectator tours are listed
            only intermittently, during the Tokyo tournament season — so if official tickets are gone, such a
            guided tour is a reasonable in-season fallback, as is queuing for one of the roughly 400 same-day
            tickets (about ¥2,200) released each morning.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which suits you</span>
          <h2 className={styles.sectionTitle}>Tournament or Morning Practice?</h2>
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

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to See Sumo, Step by Step</h2>
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
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Things to Do in Tokyo (2026): Tickets, Attractions &amp; Experiences</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Tokyo (2026): Trains, Subway &amp; IC Cards Explained</p>
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
            <h2 className={styles.ctaBannerTitle}>Experience sumo in Tokyo</h2>
            <p className={styles.ctaBannerDesc}>
              Catch a grand tournament in January, May, or September — or get ringside at a sumo stable&apos;s
              morning practice any time of year. Booking ahead is the safest way to secure a spot.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <a href={SUMO_TOURNAMENT_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
                Tournament Experiences →
              </a>
              <a href={SUMO_PRACTICE_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
                Morning Practice Tours →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
