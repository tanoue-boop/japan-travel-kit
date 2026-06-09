import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// CTA links — normal Klook product/search links for now.
// TODO: replace with Klook affiliate redirect (aid=119070&aff_adid=...) once generated
const PLANETS_URL = "https://www.klook.com/en-US/search/?query=teamLab%20Planets%20Tokyo";
// TODO: replace with Klook affiliate redirect (aid=119070&aff_adid=...) once generated
const BORDERLESS_URL = "https://www.klook.com/en-US/search/?query=teamLab%20Borderless%20Tokyo";

const compareRows = [
  { factor: "Location", planets: "Toyosu (Koto City)", borderless: "Azabudai Hills (Minato City)" },
  { factor: "Concept", planets: "Immersive, barefoot, walk through water", borderless: "50+ artworks across a borderless maze" },
  { factor: "Best for", planets: "Families, first-timers, sensory experience", borderless: "Art lovers, slow exploration, photography" },
  { factor: "Time needed", planets: "~1.5–2 hours", borderless: "~2–3 hours" },
  { factor: "Price (from)", planets: "from ¥3,800 weekday / ¥4,200 weekend", borderless: "from ¥3,800" },
  { factor: "Entry", planets: "Timed entry (date + slot)", borderless: "Timed entry (date + slot)" },
  { factor: "Good to know", planets: "Open through end of 2027; expanding in 2026", borderless: "Klook is the exclusive third-party seller" },
];

const whoFor = [
  {
    title: "Choose Planets if…",
    desc: "You're travelling with kids, want a hands-on, physical experience, and don't mind getting your feet wet (literally — you walk barefoot through water). It's the more playful, sensory of the two and easier to enjoy with children.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Choose Borderless if…",
    desc: "You want to lose yourself in art. Borderless has no fixed route — works move between rooms and you wander freely through 50+ spaces. It rewards time and patience, and it's the more photogenic of the two for adults.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="1.5" />
        <circle cx="17.5" cy="10.5" r="1.5" />
        <circle cx="8.5" cy="7.5" r="1.5" />
        <circle cx="6.5" cy="12.5" r="1.5" />
        <path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-1.4-1-1.9-1-3a2 2 0 0 1 2-2h2a4 4 0 0 0 4-4 9 9 0 0 0-9-9z" />
      </svg>
    ),
  },
  {
    title: "Do both if…",
    desc: "You have two free half-days and you're a serious teamLab fan. They're genuinely different experiences in different parts of the city, so doing both isn't repetitive — just space them out and book each timed slot in advance.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Pick your museum and date first",
    desc: "Planets (Toyosu) and Borderless (Azabudai) are separate venues with separate tickets. Decide which one — or both, on different days — before you book.",
  },
  {
    title: "Book a timed-entry slot 2–3 weeks ahead",
    desc: "Both museums use timed entry, and popular slots (weekends, evenings) regularly sell out 2–3 weeks in advance. The earlier you book, the more slot choice you get.",
  },
  {
    title: "Reserve through an official ticketing partner",
    desc: "Klook is an official teamLab ticketing partner — and for Borderless it's the exclusive third-party seller. Booking through it means English checkout and confirmation, and it accepts foreign cards.",
  },
  {
    title: "Arrive a little early and travel light",
    desc: "Get there 10–15 minutes before your slot. At Planets you'll go barefoot and walk through water, so wear shorts or roll-up trousers and skip anything you can't carry.",
  },
];

const faqItems = [
  {
    q: "What's the difference between teamLab Planets and Borderless?",
    a: "Planets (in Toyosu) is an immersive, barefoot experience where you walk through water and large-scale installations — it's the more physical and family-friendly of the two. Borderless (in Azabudai Hills) is a maze of 50+ artworks with no fixed route, where works move between spaces and you wander freely. Planets suits families and first-timers; Borderless suits art lovers who want to explore slowly.",
  },
  {
    q: "How much are teamLab tickets in 2026?",
    a: "Adult tickets start from around ¥3,800. teamLab Planets uses variable pricing — roughly from ¥3,800 on weekdays and ¥4,200 on weekends — while Borderless also starts from about ¥3,800. Prices are dynamic and change by date and demand, so always confirm the exact price for your chosen slot at the time of booking. Children's and student tickets are cheaper.",
  },
  {
    q: "Do I need to book teamLab tickets in advance?",
    a: "Yes. Both museums use timed entry, and popular slots regularly sell out 2–3 weeks ahead, especially on weekends and during holidays. Walk-up tickets are not reliable. Book your date and time slot in advance through an official partner to guarantee entry.",
  },
  {
    q: "Is teamLab Planets closing?",
    a: "teamLab Planets in Toyosu is currently scheduled to remain open through the end of 2027, and it has been expanding with new areas in 2026. Dates can change, so check the latest before planning a trip specifically around it. teamLab Borderless in Azabudai Hills is a separate, ongoing museum.",
  },
  {
    q: "Where are the teamLab museums and how do I get there?",
    a: "teamLab Planets is in Toyosu, reached via the Yurikamome line (Shin-Toyosu Station) or the Yurakucho line (Toyosu Station). teamLab Borderless is in Azabudai Hills near Kamiyacho Station (Hibiya line). Both are easy to reach with a Suica or Pasmo IC card — see our Tokyo transport and IC card guides for the simplest routes.",
  },
];

export default function TeamLabTokyoTicketsPage() {
  return (
    <>
      <Head>
        <title>teamLab Tokyo Tickets (2026): Planets vs Borderless &amp; How to Book | Japan Travel Kit</title>
        <meta
          name="description"
          content="teamLab Planets or Borderless? We compare Tokyo's two teamLab museums, explain which suits your trip, and show how to book timed-entry tickets before they sell out."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/teamlab-tokyo-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="teamLab Tokyo Tickets (2026): Planets vs Borderless & How to Book" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/teamlab-tokyo-tickets" />
        <meta property="og:description" content="teamLab Planets or Borderless? We compare Tokyo's two teamLab museums, explain which suits your trip, and show how to book timed-entry tickets before they sell out." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="teamLab Tokyo Tickets (2026): Planets vs Borderless & How to Book" />
        <meta name="twitter:description" content="teamLab Planets or Borderless? We compare Tokyo's two teamLab museums, explain which suits your trip, and show how to book timed-entry tickets before they sell out." />
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
              headline: "teamLab Tokyo Tickets (2026): Planets vs Borderless & How to Book",
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
                { "@type": "ListItem", position: 4, name: "teamLab Tokyo Tickets", item: "https://www.japan-travel-kit.com/guides/attractions/teamlab-tokyo-tickets" },
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
          <span className={styles.breadCurrent}>teamLab Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🎟️</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            teamLab Tokyo Tickets (2026):<br />Planets vs Borderless &amp; How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Tokyo has two teamLab museums, and they&apos;re genuinely different. Here&apos;s which one suits
            your trip — and how to lock in a timed slot before it sells out.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Planets vs Borderless", "Booking Tips"].map((t) => (
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
                <p className={styles.verdictStatLabel}>For families / sensory fun</p>
                <p className={styles.verdictStatValue}>teamLab Planets</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>For art &amp; slow exploring</p>
                <p className={styles.verdictStatValue}>teamLab Borderless</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Price (from)</p>
                <p className={styles.verdictStatValue}>from ¥3,800</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Key tip</p>
                <p className={styles.verdictStatValue}>Book timed slots 2–3 weeks ahead</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Both are world-class digital-art museums — they&apos;re just different.
              Planets is barefoot, watery, and playful; Borderless is a wandering maze of 50+ artworks.
              Whichever you pick, book a timed entry early.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <a href={PLANETS_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                teamLab Planets tickets →
              </a>
              <a href={BORDERLESS_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                teamLab Borderless tickets →
              </a>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Two teamLab Museums, Two Experiences</h2>
          <p className={styles.bodyText}>
            teamLab is a Tokyo-based art collective famous for room-filling digital installations you walk
            through rather than look at. In Tokyo there are two permanent museums, and first-time visitors
            often assume they&apos;re the same — they&apos;re not.
          </p>
          <p className={styles.bodyText}>
            <strong>teamLab Planets</strong> in Toyosu is the immersive, physical one: you go barefoot, wade
            through knee-deep water, and move through installations that respond to your presence. It&apos;s the
            easier choice with kids. <strong>teamLab Borderless</strong> in Azabudai Hills is a labyrinth of
            50+ artworks with no map and no fixed route — works literally cross between rooms, and you explore
            until you stumble on them. It rewards curiosity and time.
          </p>
          <p className={styles.bodyText}>
            Both use timed entry and both are popular enough to sell out, so the real decision is which one
            fits your trip — and booking early once you&apos;ve chosen.
          </p>
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>teamLab Planets vs Borderless</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "teamLab Planets", "teamLab Borderless"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Prices are &quot;from&quot; figures as of 2026 and use variable, date-based pricing — confirm the exact
            price for your slot at booking. Opening dates and areas can change; check the latest before you go.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which is for you</span>
          <h2 className={styles.sectionTitle}>Which teamLab Should You Pick?</h2>
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
          <h2 className={styles.sectionTitle}>How to Book teamLab Tickets</h2>
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
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M6 21V8l6-4 6 4v13" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
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
            <h2 className={styles.ctaBannerTitle}>Ready to book teamLab?</h2>
            <p className={styles.ctaBannerDesc}>
              Lock in a timed-entry slot before your dates sell out. Klook is an official teamLab ticketing
              partner — and the exclusive third-party seller for Borderless.
            </p>
            <a href={PLANETS_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
              View teamLab Tickets →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
