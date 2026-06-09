import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// CTA link — normal Klook product link for now.
// TODO: replace with Klook affiliate redirect (aid=119070&aff_adid=...) once generated
const SHIBUYA_SKY_URL = "https://www.klook.com/activity/70672-shibuya-sky-ticket-tokyo/";

const priceRows = [
  { ticket: "Adult (advance, online)", price: "¥2,500" },
  { ticket: "Adult (at the door)", price: "¥3,000" },
  { ticket: "Children under 5", price: "Free" },
];

const whoFor = [
  {
    title: "Go for sunset if…",
    desc: "You want the iconic shot and you can plan ahead. The sunset slots are the most beautiful — and the first to sell out. Enter 30–60 minutes before sunset to catch daylight, golden hour, and the city lighting up, all in one visit.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="4.2" y1="10.2" x2="5.6" y2="11.6" />
        <line x1="1" y1="18" x2="3" y2="18" />
        <line x1="21" y1="18" x2="23" y2="18" />
        <line x1="18.4" y1="11.6" x2="19.8" y2="10.2" />
        <line x1="2" y1="22" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    title: "Go in daytime if…",
    desc: "You want flexibility and a shorter booking window. Daytime slots are easier to get, often available closer to your visit, and on a clear day you can see all the way to Mt. Fuji. Great if your schedule is unpredictable.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "Go at night if…",
    desc: "You're after the neon cityscape and don't mind missing the horizon. Night slots show off Tokyo's sea of lights and are usually the easiest to book on short notice — a solid backup if sunset is sold out.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Decide your time slot — sunset is the prize",
    desc: "Sunset slots deliver day, golden hour, and night views in one visit, which is why they vanish first. If you want sunset, treat booking as time-sensitive.",
  },
  {
    title: "Book about two weeks ahead, at midnight JST",
    desc: "Tickets are released roughly two weeks in advance, and new dates tend to open at 00:00 (midnight) Japan time. For sunset, log in and book the moment your date opens.",
  },
  {
    title: "Use a reseller if you have a foreign card",
    desc: "Since July 2024, the official Shibuya Sky site has rejected many foreign-issued cards. Klook accepts foreign cards, checks out in English, and offers free cancellation up to 24 hours before — a useful hedge against Tokyo's weather.",
  },
  {
    title: "Arrive 30–60 minutes before your sunset slot",
    desc: "Give yourself time to clear the entrance, store loose items in the provided lockers (the rooftop is open-air and windy), and get into position before the light turns.",
  },
];

const faqItems = [
  {
    q: "How much are Shibuya Sky tickets?",
    a: "Adult tickets are ¥2,500 when booked in advance online, or ¥3,000 if bought on the day at the door. Children under 5 enter free, and discounted child and senior tiers are available. Booking online is both cheaper and safer, since popular slots — especially sunset — sell out before the day.",
  },
  {
    q: "What is the best time to visit Shibuya Sky?",
    a: "Sunset is the most popular and most beautiful time — you get daylight, golden hour, and the night cityscape in a single visit. Because of that, sunset slots sell out fastest. Aim to enter 30–60 minutes before sunset. If sunset is gone, a clear daytime slot offers Mt. Fuji views, while night slots show Tokyo's full sea of lights and are easiest to book last-minute.",
  },
  {
    q: "How far in advance should I book Shibuya Sky?",
    a: "Tickets are typically released about two weeks ahead, with new dates opening around midnight (00:00) Japan time. For sunset slots, book as soon as your date becomes available — they can sell out within minutes during busy seasons. Daytime and night slots are more relaxed but still worth booking ahead.",
  },
  {
    q: "Can I buy Shibuya Sky tickets with a foreign credit card?",
    a: "On the official Shibuya Sky website, often no — since July 2024 it has rejected many foreign-issued cards. The reliable workaround is to book through a reseller like Klook, which accepts foreign cards, provides an English checkout and e-ticket, and offers free cancellation up to 24 hours before your slot.",
  },
  {
    q: "How high is Shibuya Sky and what will I see?",
    a: "Shibuya Sky is a rooftop observation deck about 229 metres above Shibuya, spread across open-air and indoor areas. From the top you get a 360-degree view over the Shibuya Scramble Crossing, Tokyo's skyline, and — on clear days — Mt. Fuji. The open-air rooftop is the highlight, so dress for wind and check the weather before you go.",
  },
];

export default function ShibuyaSkyTicketsPage() {
  return (
    <>
      <Head>
        <title>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book | Japan Travel Kit</title>
        <meta
          name="description"
          content="Shibuya Sky tickets in 2026: prices, the best time to visit (sunset sells out fast), and how to book — even with a foreign card the official site may reject."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/shibuya-sky-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Shibuya Sky Tickets (2026): Price, Best Time & How to Book" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/shibuya-sky-tickets" />
        <meta property="og:description" content="Shibuya Sky tickets in 2026: prices, the best time to visit (sunset sells out fast), and how to book — even with a foreign card the official site may reject." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shibuya Sky Tickets (2026): Price, Best Time & How to Book" />
        <meta name="twitter:description" content="Shibuya Sky tickets in 2026: prices, the best time to visit (sunset sells out fast), and how to book — even with a foreign card the official site may reject." />
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
              headline: "Shibuya Sky Tickets (2026): Price, Best Time & How to Book",
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
                { "@type": "ListItem", position: 4, name: "Shibuya Sky Tickets", item: "https://www.japan-travel-kit.com/guides/attractions/shibuya-sky-tickets" },
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
          <span className={styles.breadCurrent}>Shibuya Sky Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🌇</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Shibuya Sky Tickets (2026):<br />Price, Best Time &amp; How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Tokyo&apos;s best rooftop view — 229 metres above the Scramble Crossing. Here&apos;s what tickets
            cost, when to go, and how to book the sunset slot before it sells out.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Sunset Booking Tips", "Foreign Cards OK"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Price (online)</p>
                <p className={styles.verdictStatValue}>¥2,500 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best time</p>
                <p className={styles.verdictStatValue}>Sunset (sells out fast)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Book</p>
                <p className={styles.verdictStatValue}>~2 weeks ahead, midnight JST</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Foreign card?</p>
                <p className={styles.verdictStatValue}>Use a reseller</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Book online (¥2,500, cheaper than the door) and aim for a sunset slot —
              they sell out fastest. If your card is issued abroad, book through Klook, which accepts foreign
              cards and allows free cancellation up to 24 hours before.
            </p>
            <a href={SHIBUYA_SKY_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check Shibuya Sky Tickets →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is Shibuya Sky?</h2>
          <p className={styles.bodyText}>
            Shibuya Sky is the rooftop observation deck atop Shibuya Scramble Square, about 229 metres above
            one of the busiest crossings on earth. It spans an open-air rooftop and indoor areas, giving you a
            360-degree view over the Scramble Crossing, the Tokyo skyline, and — on a clear day — Mt. Fuji.
          </p>
          <p className={styles.bodyText}>
            It&apos;s become one of Tokyo&apos;s most photographed spots, which is both the appeal and the
            catch: the best slots sell out, and the booking system has a couple of quirks for foreign visitors.
            Get those right and it&apos;s one of the best-value experiences in the city.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Shibuya Sky Ticket Prices</h2>
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
            Prices as of 2026 and subject to change — confirm at booking. Booking online (¥2,500) is both
            cheaper than the door (¥3,000) and the only reliable way to secure a sunset slot.
          </p>
        </section>

        {/* Best time / who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Best time to go</span>
          <h2 className={styles.sectionTitle}>When Should You Visit?</h2>
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
          <h2 className={styles.sectionTitle}>How to Book Shibuya Sky</h2>
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
            <Link href="/guides/attractions/teamlab-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Tokyo Tickets (2026): Planets vs Borderless &amp; How to Book</p>
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
            <h2 className={styles.ctaBannerTitle}>Catch the Shibuya sunset</h2>
            <p className={styles.ctaBannerDesc}>
              Book online to save versus the door and lock in a sunset slot. Klook accepts foreign cards and
              allows free cancellation up to 24 hours before — handy if Tokyo&apos;s weather turns.
            </p>
            <a href={SHIBUYA_SKY_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
              View Shibuya Sky Tickets →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
