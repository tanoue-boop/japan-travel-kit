import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// CTA link — build-ahead. Plain Klook search link for now.
// TODO: replace with Klook affiliate redirect (aid=119070&aff_adid=...) once generated
const WARNER_BROS_URL = "https://www.klook.com/en-US/search/?query=Warner%20Bros%20Studio%20Tour%20Tokyo";

const priceRows = [
  { ticket: "Adult (18+)", price: "¥7,000" },
  { ticket: "Youth (12–17)", price: "¥5,800" },
  { ticket: "Child (4–11)", price: "¥4,200" },
  { ticket: "Under 4", price: "Free" },
];

const whoFor = [
  {
    title: "Go if you're a fan…",
    desc: "If the films mean something to you, this is the headline reason to come. It's Asia's first studio tour of its kind and the largest indoor facility of its type in the world, so you'll want a full half-day to take it in without rushing.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 6.9H22l-6 4.5 2.3 7L12 16.9 5.7 20.4 8 13.4l-6-4.5h7.6z" />
      </svg>
    ),
  },
  {
    title: "Go if you're travelling with kids…",
    desc: "It's an indoor, weatherproof day out that works regardless of the forecast. Allow three to four hours, build in a meal break, and remember there's no re-entry once you leave — so plan to do it in a single visit.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="3" />
        <circle cx="16" cy="9" r="2.5" />
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 14h1a4 4 0 0 1 4 4v3" />
      </svg>
    ),
  },
  {
    title: "Think twice if you're tight on time…",
    desc: "It sits in north-west Tokyo, a little out from the central sights, and a proper visit eats most of a day. If you're on a short, packed itinerary and aren't especially invested, your hours may be better spent elsewhere.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Book weeks — sometimes months — ahead",
    desc: "This is a timed-entry attraction and slots routinely sell out well in advance, especially on weekends, school holidays, and during special events. Treat tickets as the first thing to lock in once your Tokyo dates are fixed, not a same-day decision.",
  },
  {
    title: "Pick your entry time carefully",
    desc: "You choose a specific entry window when you book, and that's the time you must arrive. Because there's no re-entry once you go in, leave the rest of that part of the day open rather than scheduling something tight straight afterwards.",
  },
  {
    title: "Know that tickets are non-refundable",
    desc: "Admission is generally non-refundable and non-changeable once purchased, so confirm your date, your group's ages, and your travel plans before you pay. Double-check the age tiers — pricing is banded by age, and under-4s enter free.",
  },
  {
    title: "Book through an official partner if the site gives you trouble",
    desc: "Klook is an official sales partner, which makes it a reliable alternative to the official site — useful if you'd rather check out in English, pay with a foreign-issued card, or keep the booking alongside your other Tokyo tickets.",
  },
];

const faqItems = [
  {
    q: "How much are Warner Bros. Studio Tour Tokyo tickets?",
    a: "Standard admission is ¥7,000 for adults (18+), ¥5,800 for youths aged 12–17, and ¥4,200 for children aged 4–11. Children under 4 enter free. Prices are as of 2026 and subject to change, so confirm the current rates and age bands at the time of booking.",
  },
  {
    q: "Do I need to book Warner Bros. Studio Tour Tokyo in advance?",
    a: "Yes — strongly. It's a timed-entry attraction with no same-day gate sales to rely on, and slots regularly sell out weeks or even months ahead, particularly on weekends, holidays, and during special events. Book as soon as your Tokyo dates are confirmed and choose your entry time when you reserve.",
  },
  {
    q: "How long does the studio tour take?",
    a: "Plan for about three to four hours to see it properly, plus travel time to and from the site. It's a large, mostly indoor walk-through, so it works in any weather — but remember there's no re-entry once you leave, so allow enough time to do it in a single visit.",
  },
  {
    q: "How do I get to Warner Bros. Studio Tour Tokyo?",
    a: "The site is in north-west Tokyo at the former Toshimaen site, with Toshimaen Station the closest stop. It's served by the Seibu Ikebukuro Line and the Toei Oedo subway line, so it's reachable on a single transfer from much of central Tokyo. Allow extra time as it sits a little out from the main central sights.",
  },
  {
    q: "Can I get a refund if my plans change?",
    a: "Generally no — tickets are typically non-refundable and non-changeable once purchased. Because you also select a fixed entry time, it's worth being confident about your date and your group before you pay. Check the latest terms at booking, as policies can change.",
  },
  {
    q: "Is there a special event in 2026?",
    a: "Yes. For 2026 the studio tour runs a 25th-anniversary feature, \"Invitation from Hogwarts,\" scheduled from 18 March to 6 September. Special events tend to push demand higher, so if you're visiting during that window, book even earlier than usual.",
  },
];

export default function WarnerBrosStudioTourTokyoPage() {
  return (
    <>
      <Head>
        <title>Warner Bros Studio Tour Tokyo (Harry Potter) 2026: Tickets &amp; How to Book | Japan Travel Kit</title>
        <meta
          name="description"
          content="Warner Bros. Studio Tour Tokyo in 2026: ticket prices, why timed entry sells out weeks ahead, no re-entry, how to get to Toshimaen, and how to book."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/warner-bros-studio-tour-tokyo" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Warner Bros Studio Tour Tokyo (Harry Potter) 2026: Tickets & How to Book" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/warner-bros-studio-tour-tokyo" />
        <meta property="og:description" content="Warner Bros. Studio Tour Tokyo in 2026: ticket prices, why timed entry sells out weeks ahead, no re-entry, how to get to Toshimaen, and how to book." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Warner Bros Studio Tour Tokyo (Harry Potter) 2026: Tickets & How to Book" />
        <meta name="twitter:description" content="Warner Bros. Studio Tour Tokyo in 2026: ticket prices, why timed entry sells out weeks ahead, no re-entry, how to get to Toshimaen, and how to book." />
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
              headline: "Warner Bros Studio Tour Tokyo (Harry Potter) 2026: Tickets & How to Book",
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
                { "@type": "ListItem", position: 4, name: "Warner Bros. Studio Tour Tokyo", item: "https://www.japan-travel-kit.com/guides/attractions/warner-bros-studio-tour-tokyo" },
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
          <span className={styles.breadCurrent}>Warner Bros. Studio Tour Tokyo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🎬</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Warner Bros. Studio Tour Tokyo (2026):<br />Tickets &amp; How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Asia&apos;s first studio tour of its kind, and the largest indoor facility of its type in the world.
            Here&apos;s what tickets cost, why timed entry sells out early, and how to book without slip-ups.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Timed Entry", "Book Weeks Ahead"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Adult ticket</p>
                <p className={styles.verdictStatValue}>¥7,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Entry</p>
                <p className={styles.verdictStatValue}>Timed, no re-entry</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Book</p>
                <p className={styles.verdictStatValue}>Weeks–months ahead</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Allow</p>
                <p className={styles.verdictStatValue}>3–4 hours</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> This is a timed-entry, advance-booking attraction with non-refundable
              tickets and no re-entry. Reserve as soon as your dates are set — slots sell out weeks ahead, and
              earlier still during the 2026 anniversary event. Klook is an official sales partner if you&apos;d
              rather book in English or with a foreign card.
            </p>
            <a href={WARNER_BROS_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check Studio Tour Tickets →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is Warner Bros. Studio Tour Tokyo?</h2>
          <p className={styles.bodyText}>
            Warner Bros. Studio Tour Tokyo is a large indoor walk-through attraction in north-west Tokyo, built
            on the former Toshimaen amusement-park site. It opened as Asia&apos;s first studio tour of its kind
            and is the largest indoor facility of its type in the world, so it&apos;s designed as a half-day
            experience rather than a quick stop.
          </p>
          <p className={styles.bodyText}>
            For visitors, the practical points matter most: it runs on timed entry, it&apos;s extremely popular,
            and the logistics around booking, arrival time, and re-entry are strict. Get those right and it&apos;s
            a smooth, weatherproof day out. This guide sticks to the facts you need to plan and book — prices,
            timing, access, and policies.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Studio Tour Tokyo Ticket Prices</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Price"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Prices as of 2026 and subject to change — confirm the current rates and age bands at booking.
            Pricing is banded by age; children under 4 enter free.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Who it&apos;s for</span>
          <h2 className={styles.sectionTitle}>Is It Worth It for You?</h2>
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
          <h2 className={styles.sectionTitle}>How to Book the Studio Tour</h2>
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
          <h2 className={styles.sectionTitle}>How to Reach Toshimaen</h2>
          <p className={styles.bodyText}>
            The site is at Toshimaen in north-west Tokyo, with Toshimaen Station the nearest stop. It&apos;s on
            the Seibu Ikebukuro Line and the Toei Oedo subway line, both of which connect easily to central
            Tokyo — Ikebukuro is a short hop on the Seibu line, and the Oedo line threads through much of the
            city. From most central hubs it&apos;s a single transfer.
          </p>
          <p className={styles.bodyText}>
            Because it sits a little out from the main sightseeing districts, factor the journey into your day.
            For planning trains, IC cards, and transfers across the city, see our{" "}
            <Link href="/guides/transport/tokyo-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              getting around Tokyo guide
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
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V8l7-4 7 4v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-observation-decks" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20" />
                  <path d="M8 22h8" />
                  <path d="M9 7l3-3 3 3" />
                  <path d="M8 12h8" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower</p>
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
            <h2 className={styles.ctaBannerTitle}>Lock in your entry time</h2>
            <p className={styles.ctaBannerDesc}>
              Timed slots sell out weeks ahead — and earlier during the 2026 anniversary event. Booking through an
              official partner like Klook lets you check out in English and pay with a foreign-issued card.
            </p>
            <a href={WARNER_BROS_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
              View Studio Tour Tickets →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
