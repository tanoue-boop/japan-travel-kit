import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { warnerBrosStudioTourTokyo, tokyoSubwayTicket, tokyoSightseeingBusTour } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";

// Prices, address and access below are from wbstudiotour.jp, read 19 Oct 2026. The
// standard-entry adult and child figures and the check date are owned by
// lib/attraction-prices.ts, shared with the ticket price table.
const P = PRICES.wbStudioTour;
const CHECKED = checkedLabel(P.checked);

const priceRows = [
  { ticket: "Standard entry", adult: P.adult, junior: "¥5,500~", child: P.child },
  { ticket: "With Afternoon Tea", adult: "¥14,000~", junior: "¥12,900~", child: "¥11,400~" },
  { ticket: "With Evening High Tea", adult: "¥16,500~", junior: "¥15,300~", child: "¥13,700~" },
  { ticket: "Group (20+ people)", adult: "¥6,000", junior: "¥5,000", child: "¥3,600" },
  { ticket: "Nerima residents", adult: "¥5,000", junior: "¥4,150", child: "¥3,000" },
];

const whoFor = [
  {
    title: "Standard entry is the right default…",
    desc: "At ¥6,600~ for an adult it covers the whole tour: the Great Hall, Diagon Alley, the Hogwarts Express at Platform 9¾, the Ministry of Magic atrium and the sets, costumes and props. Nothing in the tour itself is gated behind a higher tier.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 4l-9 9 2 2 9-9z" />
        <path d="M5 19l2-6 4 4-6 2z" />
      </svg>
    ),
  },
  {
    title: "The tea packages are a meal, not more tour…",
    desc: "Afternoon Tea takes an adult ticket from ¥6,600~ to ¥14,000~, and Evening High Tea to ¥16,500~. You are paying roughly ¥7,400–¥9,900 for the sitting, not for extra access. Worth it if the meal is the occasion; otherwise skip it.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8z" />
        <path d="M16 9h2a2 2 0 0 1 0 4h-2" />
        <line x1="3" y1="21" x2="17" y2="21" />
      </svg>
    ),
  },
  {
    title: "Book a date and time, don't turn up…",
    desc: "Tickets are date- and time-specified. The official site does keep an on-site ticket office, but it says plainly that pre-booking is recommended because your preferred date and time may be sold out. Treat the walk-up option as a fallback, not a plan.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="8" y1="3" x2="8" y2="7" />
        <line x1="16" y1="3" x2="16" y2="7" />
      </svg>
    ),
  },
];

const accessRows = [
  { from: "Toshimaen Station", route: "2-minute walk to the entrance", time: "2 min" },
  { from: "Seibu-Ikebukuro Station", route: "Seibu Ikebukuro Line to Toshimaen", time: "17 min" },
  { from: "Shinjuku Station", route: "Toei Oedo Line to Toshimaen", time: "20 min" },
];

const steps = [
  {
    title: "Pick your date and arrival time first",
    desc: `Admission is timed, and the official site warns that preferred slots sell out. Allow around four hours inside — the figure the Klook listing gives for seeing the tour properly — so an afternoon slot will take up your evening too.`,
  },
  {
    title: "Check the price for your actual date",
    desc: `The official site lists standard entry from ¥6,600 (adult), ¥5,500 (junior) and ¥4,000 (child) and states that "ticket prices vary throughout the year". The tilde on each figure is doing real work: treat them as floors, not fixed prices. Checked ${CHECKED}.`,
  },
  {
    title: "Decide on a tea package before you check out",
    desc: "Afternoon Tea and Evening High Tea are bought with the ticket, not added later. They roughly double the adult price, so settle it at booking rather than discovering the option on arrival.",
  },
  {
    title: "Book through a reseller if your card is issued abroad",
    desc: "Klook sells the same date- and time-specified admission with an English checkout and an e-ticket. That sidesteps the card and language friction several visitors run into on Japanese attraction sites, and it is the same listing that handles the rest of a Tokyo itinerary.",
  },
  {
    title: "Work out the journey — it is not central Tokyo",
    desc: "The studio tour is in Nerima, in the north-west of the city, two minutes' walk from Toshimaen Station. From Shinjuku it is about 20 minutes on the Toei Oedo Line; from Seibu-Ikebukuro about 17 minutes on the Seibu Ikebukuro Line. The Oedo Line is a Toei line, so that route is covered by the Tokyo Subway Ticket.",
  },
];

const faqItems = [
  {
    q: "How much are Warner Bros. Studio Tour Tokyo tickets?",
    a: `Standard entry on the official site is listed from ¥6,600 for an adult, ¥5,500 for a junior and ¥4,000 for a child, with the site noting that "ticket prices vary throughout the year" — so these are starting prices rather than fixed ones. Group tickets for parties of 20 or more are ¥6,000 / ¥5,000 / ¥3,600, and Nerima residents pay ¥5,000 / ¥4,150 / ¥3,000. Figures checked on ${CHECKED}.`,
  },
  {
    q: "Can I buy tickets on the day at the studio tour?",
    a: `The official site says tickets are available at the on-site ticket office, but adds that pre-booking is recommended because your preferred admission date and time may be sold out. In practice that makes walk-up a fallback rather than a plan — the tour runs on timed admission, and turning up without a slot risks a long wait or no entry at all on a busy date. Checked ${CHECKED}.`,
  },
  {
    q: "How long does the Warner Bros. Studio Tour Tokyo take?",
    a: "The Klook listing says to expect about four hours to see the tour fully. It is self-paced rather than guided, so the time is yours to spend, but four hours is the figure to budget — which means a morning slot fills the morning and an afternoon slot will run into the evening. Plan one other thing that day, not three.",
  },
  {
    q: "Is the Afternoon Tea package worth it?",
    a: "It is a meal upgrade, not extra access to the tour. Afternoon Tea takes an adult ticket from ¥6,600~ to ¥14,000~, and Evening High Tea to ¥16,500~ — so the sitting itself is costing roughly ¥7,400 to ¥9,900 per adult. Nothing in the studio tour is reserved for those tiers. If the meal is the point of the day, it is a fair price for a themed sitting; if the sets are the point, put the money elsewhere.",
  },
  {
    q: "Where is Warner Bros. Studio Tour Tokyo and how do I get there?",
    a: "It is at 1-1-7 Kasugacho, Nerima-ku, Tokyo 179-0074, on the former Toshimaen amusement park site in north-west Tokyo. Toshimaen Station is a two-minute walk. The official site gives 17 minutes from Seibu-Ikebukuro Station on the Seibu Ikebukuro Line, and 20 minutes from Shinjuku Station on the Toei Oedo Line. The Oedo Line route is covered by the Tokyo Subway Ticket.",
  },
  {
    q: "Is this the same as the Harry Potter studio tour in London?",
    a: "It is the same concept from the same operator, and Tokyo was the first Warner Bros. Studio Tour in Asia. The core sets — the Great Hall, Diagon Alley, Platform 9¾ — appear in both. Tokyo adds its own, including a Ministry of Magic atrium with the Floo Network fireplaces and a green-screen Quidditch sequence. If you have done London, Tokyo is not a repeat, but the overlap is real.",
  },
  {
    q: "What ages do the junior and child tickets cover?",
    a: "The official ticket page lists three tiers — adult, junior and child — but does not state the age bands on the pricing page itself, so we are not going to guess them. Check the age definition at the point of booking, where the tier is selected; it is also the only place the price for your specific date is shown.",
  },
  {
    q: "Should I visit the studio tour or a Tokyo theme park?",
    a: "They are different days out. The studio tour is an indoor, self-paced walk through film sets, with no rides and no queues for attractions once you are inside — around four hours, in Nerima. Tokyo Disney and Universal Studios Japan are full-day parks with ride queues, timed entry systems and considerably more planning. The studio tour is the easier day to slot into an itinerary that already has other things in it.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/warner-bros-studio-tour-tokyo-tickets") },
});

const TITLE = "Warner Bros. Studio Tour Tokyo Tickets (2026): Prices";
const DESC =
  "Official prices for the Harry Potter studio tour in Tokyo: standard entry from ¥6,600, what the tea packages add, timed entry, and getting to Toshimaen.";

export default function WarnerBrosStudioTourTokyoTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/warner-bros-studio-tour-tokyo-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/warner-bros-studio-tour-tokyo-tickets" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
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
            __html: articleJsonLd({
              route: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets",
              headline: TITLE,
              updated,
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
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Warner Bros. Studio Tour Tokyo Tickets",
                  item: "https://www.japan-travel-kit.com/guides/attractions/warner-bros-studio-tour-tokyo-tickets",
                },
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
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Warner Bros. Studio Tour Tokyo Tickets (2026):<br />Prices &amp; How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            The Harry Potter studio tour in Nerima runs on timed admission and prices that move through the
            year. Here are the official figures, what the tea packages actually buy, and how to get there.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Access from Shinjuku"].map((t) => (
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
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
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
                <p className={styles.verdictStatLabel}>Adult entry</p>
                <p className={styles.verdictStatValue}>¥6,600~</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Child entry</p>
                <p className={styles.verdictStatValue}>¥4,000~</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Allow</p>
                <p className={styles.verdictStatValue}>About 4 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Nearest station</p>
                <p className={styles.verdictStatValue}>Toshimaen (2 min)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> standard entry starts at ¥6,600~ for an adult and the official site says
              prices vary through the year, so check the figure for your date. Admission is date- and
              time-specified; there is an on-site ticket office, but the official advice is to pre-book because
              slots sell out. Allow about four hours. Prices checked on {CHECKED}.
            </p>
            <KlookLink href={warnerBrosStudioTourTokyo.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check studio tour tickets on Klook →
            </KlookLink>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What the Studio Tour Is</h2>
          <p className={styles.bodyText}>
            Warner Bros. Studio Tour Tokyo — The Making of Harry Potter is a self-paced indoor walk through film
            sets, costumes and props, on the former Toshimaen amusement park site in Nerima. It was the first
            Warner Bros. Studio Tour in Asia, and it covers the sets most visitors come for: the Great Hall,
            Diagon Alley and the Hogwarts Express at Platform 9¾.
          </p>
          <p className={styles.bodyText}>
            Tokyo also has sections London does not, including a Ministry of Magic atrium with the Floo Network
            fireplaces and a green-screen Quidditch sequence. It is not a theme park: there are no rides, and
            the time you spend is reading, looking and photographing rather than queuing.
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
                    {["Ticket", "Adult", "Junior", "Child"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.junior}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.child}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off the official Warner Bros. Studio Tour Tokyo site on {CHECKED}. The tilde (~) is the
            official site&apos;s own notation, and it states that &ldquo;ticket prices vary throughout the
            year&rdquo; — so treat these as starting prices and confirm the figure for your date at booking. The
            site lists three age tiers without publishing the age bands on the pricing page; check the band when
            you select a tier.
          </p>
        </section>

        {/* Which ticket */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which ticket</span>
          <h2 className={styles.sectionTitle}>Standard Entry or a Tea Package?</h2>
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

        {/* Access */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How to Reach Toshimaen</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The address is 1-1-7 Kasugacho, Nerima-ku, Tokyo 179-0074 — north-west Tokyo, well outside the
            Yamanote loop. These are the journey times from the official site.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["From", "Route", "Time"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.from}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.from}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td className={styles.tdPrice}>{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The Shinjuku route runs on the Toei Oedo Line, which is a subway line — so it is covered by the{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">Tokyo Subway Ticket</Link> if you are carrying
            one. The Seibu Ikebukuro Line is a private railway and is not. Our{" "}
            <Link href="/guides/transport/tokyo-transportation">Tokyo transport guide</Link> explains which
            operator runs what.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Address and journey times from the official site, checked {CHECKED}.
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Book Studio Tour Tokyo Tickets</h2>
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

        <KlookTourPicks
          heading="The Other Half of That Day"
          intro="Four hours in Nerima leaves the rest of the day open, and the journey there is a subway ride. These listings book on the same Klook account as the ticket."
          tours={[tokyoSubwayTicket, tokyoSightseeingBusTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/sanrio-puroland-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.4-7 10-7 10z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sanrio Puroland Tickets (2026): Prices, Variable Pricing &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-skytree-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Skytree Tickets (2026): Prices, Floor 350 vs 450 &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-subway-ticket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-disney-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Disney Tickets (2026): Disneyland &amp; DisneySea — How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Planets Tickets (2026): Prices, How to Book &amp; Planets vs Borderless</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Tour From Tokyo (2026): Which Tour, and What You Actually See</p>
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
            <h2 className={styles.ctaBannerTitle}>Timed admission, so pick a slot</h2>
            <p className={styles.ctaBannerDesc}>
              The official advice is to pre-book, because preferred dates and times sell out. Klook sells the
              same date- and time-specified admission with an English checkout and an e-ticket.
            </p>
            <KlookLink href={warnerBrosStudioTourTokyo.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View studio tour tickets on Klook →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
