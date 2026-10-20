import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import { tokyoTowerTicket, tokyoSightseeingBusTour, tokyoSubwayTicket } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";

// Prices, hours, deck heights and station walking times below were read off
// tokyotower.co.jp (/fee/ and /access/) on 20 Oct 2026. The Klook listing was
// confirmed live through the www.klook.com search index the same day; Klook
// answers automated reads of its product pages with HTTP 403, so no Klook price
// appears anywhere on this page.
//
// The Main Deck adult and child figures and the check date are owned by
// lib/attraction-prices.ts, shared with the ticket price table.
const P = PRICES.tokyoTower;
const CHECKED = checkedLabel(P.checked);

const priceRows = [
  { ticket: "Main Deck — adult", advance: P.adult, door: P.adult },
  { ticket: "Main Deck — high school", advance: "¥1,200", door: "¥1,200" },
  { ticket: "Main Deck — elementary / junior high", advance: "¥900", door: "¥900" },
  { ticket: `Main Deck — child aged ${P.childAges.replace(/^ages /, "")}`, advance: P.child, door: P.child },
  { ticket: "Top Deck Tour — adult", advance: "¥3,300", door: "¥3,500" },
  { ticket: "Top Deck Tour — high school", advance: "¥3,100", door: "¥3,300" },
  { ticket: "Top Deck Tour — elementary / junior high", advance: "¥2,100", door: "¥2,300" },
  { ticket: "Top Deck Tour — child aged 4 and over", advance: "¥1,500", door: "¥1,700" },
];

const whoFor = [
  {
    title: "Main Deck only is enough if…",
    desc: "You want the landmark and the view without the upsell. The Main Deck sits at 150 metres, costs ¥1,500 for an adult, and includes the glass-floor Lookdown Window. It is the cheapest ticket of Tokyo's three big paid towers.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l4 10h-8l4-10z" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <line x1="6" y1="21" x2="18" y2="21" />
      </svg>
    ),
  },
  {
    title: "Add the Top Deck Tour if…",
    desc: "You want the 250-metre level, which is only sold as a guided tour with a reserved entry time. It is ¥3,300 for an adult booked online against ¥3,500 at the window, and it includes the Main Deck — so it replaces the cheaper ticket rather than adding to it.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l8-16 8 16" />
        <path d="M7.5 13h9" />
      </svg>
    ),
  },
  {
    title: "Go after dark if…",
    desc: "You would rather see the city lit than the horizon. The Main Deck runs to 23:00 with last admission at 22:30 — far later than Shibuya Sky or Skytree — which makes Tokyo Tower the one deck you can still get into after dinner.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const deckRows = [
  {
    deck: "Tokyo Tower",
    height: "150 m Main Deck · 250 m Top Deck",
    price: "¥1,500 (Main Deck) · ¥3,300 online (Top Deck Tour)",
    highlight: "The 1958 landmark itself, open until 23:00, and the one deck with Skytree in the view",
    area: "Akabanebashi / Kamiyacho / Onarimon",
  },
  {
    deck: "Tokyo Skytree",
    height: "Floor 350 and Floor 450",
    price: "from ¥1,800 (Floor 350) · from ¥3,000 combo",
    highlight: "The highest decks in Tokyo, and the only glass skywalk",
    area: "Oshiage / Tokyo Skytree Station",
  },
  {
    deck: "Shibuya Sky",
    height: "~229 m rooftop",
    price: "¥2,500 advance online",
    highlight: "Open-air rooftop over the Scramble Crossing — the photo, not the altitude",
    area: "Shibuya Station",
  },
  {
    deck: "Tokyo Metropolitan Gov. Building",
    height: "~202 m",
    price: "Free",
    highlight: "No ticket at all — the best-value city panorama in Tokyo",
    area: "Shinjuku",
  },
];

const steps = [
  {
    title: "Decide Main Deck or Top Deck Tour first",
    desc: `They are two different products, not two tiers of one. The Main Deck ticket is ¥1,500 for an adult and admits you whenever you turn up during opening hours. The Top Deck Tour is ¥3,300 online, carries a reserved entry time, and includes the Main Deck in the price. Checked ${CHECKED}.`,
  },
  {
    title: "Book the Top Deck Tour online, not at the window",
    desc: `This is the only place on the ticket list where booking ahead is cheaper: the Top Deck Tour is ¥3,300 for an adult online against ¥3,500 bought on site, and ¥2,100 against ¥2,300 for an elementary or junior-high child. The Main Deck price is the same either way, so for that ticket advance booking buys you the queue rather than a discount. Checked ${CHECKED}.`,
  },
  {
    title: "Use a reseller if your card is issued abroad",
    desc: "Klook sells Tokyo Tower admission with an English checkout and an e-ticket, which avoids the card and language friction that several Japanese attraction sites cause for overseas visitors. The same listing carries the Top Deck Tour upgrade.",
  },
  {
    title: "Pick your station — Akabanebashi is the closest",
    desc: `Tokyo Tower publishes six walking routes: Akabanebashi on the Toei Oedo Line at 5 minutes, Onarimon on the Mita Line at 6, Kamiyacho on the Hibiya Line at 7, Shibakoen on the Mita Line and Daimon on the Asakusa Line at 10 each, and JR Hamamatsucho at 15. Checked ${CHECKED}.`,
  },
];

const faqItems = [
  {
    q: "How much are Tokyo Tower tickets?",
    a: `Main Deck admission on the official site is ¥1,500 for an adult, ¥1,200 for a high-school student, ¥900 for elementary and junior-high children and ¥600 for a child aged 4 and over. The Top Deck Tour, which covers both the 150 m and 250 m levels, is ¥3,300 for an adult booked online or ¥3,500 at the window, with child tiers from ¥1,500. Prices read off tokyotower.co.jp on ${CHECKED}.`,
  },
  {
    q: "What is the difference between the Main Deck and the Top Deck?",
    a: `The Main Deck is the 150-metre observation level and the one the standard ticket covers; it includes the glass-floor Lookdown Window. The Top Deck is the 250-metre level, and it is sold only as the Top Deck Tour — a reserved-time guided entry that includes the Main Deck as well. You do not buy the two separately: the Top Deck Tour replaces the Main Deck ticket. Checked ${CHECKED}.`,
  },
  {
    q: "Is it cheaper to buy Tokyo Tower tickets in advance?",
    a: `For the Top Deck Tour, yes — ¥3,300 online against ¥3,500 at the window for an adult, a ¥200 saving per person, with the same ¥200 gap on every child tier. For the Main Deck the price is ¥1,500 either way, so booking ahead there saves you the ticket queue rather than money. Checked ${CHECKED}.`,
  },
  {
    q: "What time does Tokyo Tower close?",
    a: `The Main Deck runs 9:00 to 23:00 with last admission at 22:30, and the Top Deck Tour runs 9:00 to 22:45 with last admission at 22:15. That makes it the latest-closing of Tokyo's major observation decks and a realistic after-dinner stop. Hours can change for events, so confirm the date you are going. Checked ${CHECKED}.`,
  },
  {
    q: "How do I get to Tokyo Tower?",
    a: `Six routes are published on the official access page. Akabanebashi Station on the Toei Oedo Line is closest at a 5-minute walk, followed by Onarimon on the Toei Mita Line at 6 minutes and Kamiyacho on the Tokyo Metro Hibiya Line at 7. Shibakoen (Mita Line) and Daimon (Asakusa Line) are both about 10 minutes, and JR Hamamatsucho is about 15. All of the subway options are covered by a Tokyo Subway Ticket; JR is not. Checked ${CHECKED}.`,
  },
  {
    q: "Tokyo Tower or Tokyo Skytree — which should I pick?",
    a: "Skytree is higher and newer: Floor 350 and Floor 450, from ¥1,800 for an adult, with far-distance views that include Mt. Fuji on a clear day. Tokyo Tower is the landmark, is cheaper at ¥1,500, closes much later, and has one thing Skytree structurally cannot — Skytree in the view. If you want maximum altitude, go to Skytree. If you want the red 333-metre tower that defines the Tokyo skyline, and a late slot, go to Tokyo Tower.",
  },
  {
    q: "Can you see Mt. Fuji from Tokyo Tower?",
    a: "On a clear day it is possible, but the odds are lower than from Skytree simply because the decks are lower — 150 m and 250 m against 350 m and 450 m. Visibility is best in the cooler, drier months and in the early morning, and there is never a guarantee on any given day. Treat Fuji as a bonus rather than the reason to buy the ticket.",
  },
  {
    q: "Is Tokyo Tower worth it compared with the free decks?",
    a: "The Tokyo Metropolitan Government Building in Shinjuku has decks at about 202 metres and charges nothing, so on height-per-yen it wins outright. What it does not give you is the building itself: Tokyo Tower is a 1958 landmark, lit at night, and the visit is as much about standing inside it as about the panorama. At ¥1,500 for the Main Deck that is a reasonable trade — but if your budget is tight, see Tocho for free and spend the money elsewhere.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-tower-tickets") } });

const TITLE = "Tokyo Tower Tickets (2026): Prices, Main Deck vs Top Deck & How to Book";
const DESCRIPTION =
  "Tokyo Tower tickets in 2026: official prices (¥1,500 Main Deck, ¥3,300 Top Deck Tour online), what each deck covers, opening hours to 23:00 and how to book from abroad.";

export default function TokyoTowerTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE} | Japan Travel Kit</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-tower-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-tower-tickets" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
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
              route: "/guides/attractions/tokyo-tower-tickets",
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
                { "@type": "ListItem", position: 4, name: "Tokyo Tower Tickets", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-tower-tickets" },
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
          <span className={styles.breadCurrent}>Tokyo Tower Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo Tower Tickets (2026):<br />Prices, Main Deck vs Top Deck &amp; How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Main Deck admission is ¥1,500 for an adult and the same price at the door, so there is nothing to
            rush. The Top Deck Tour is the one worth booking online — ¥3,300 instead of ¥3,500 — and the Main
            Deck stays open until 23:00, later than any other major deck in the city.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Open to 23:00"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Main Deck (150 m)</p>
                <p className={styles.verdictStatValue}>¥1,500 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Top Deck Tour (250 m)</p>
                <p className={styles.verdictStatValue}>¥3,300 online / ¥3,500 door</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hours</p>
                <p className={styles.verdictStatValue}>9:00–23:00 (last entry 22:30)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Closest station</p>
                <p className={styles.verdictStatValue}>Akabanebashi, 5 min walk</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> if you only want the view, buy the Main Deck ticket — ¥1,500, no
              timed slot, and the price is identical online and at the window. If you want the 250-metre
              level, book the Top Deck Tour online instead: it is ¥200 cheaper per person than the window
              price, it carries a reserved entry time, and it already includes the Main Deck. Prices read off
              the official site on {CHECKED}.
            </p>
            <a href={tokyoTowerTicket.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check Tokyo Tower tickets on Klook →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What You Are Buying</h2>
          <p className={styles.bodyText}>
            Tokyo Tower is a 333-metre broadcasting tower in Shiba-koen, finished in 1958 and still the
            shape most people picture when they picture Tokyo. It has two paid levels: the Main Deck at 150
            metres, which includes a glass-floor Lookdown Window, and the Top Deck at 250 metres, which is
            sold only as a guided, reserved-time tour.
          </p>
          <p className={styles.bodyText}>
            That split is the whole decision. The Main Deck is an ordinary walk-up admission at a flat
            ¥1,500 for an adult; the Top Deck Tour is more than double that and behaves like a timed ticket.
            Everything below is the official pricing, the hours, and the one case where booking in advance
            actually saves money.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Tokyo Tower Ticket Prices</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Online", "At the window"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.advance}</td>
                      <td className={styles.tdPrice}>{row.door}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off tokyotower.co.jp on {CHECKED} and subject to change — confirm at booking. The Main Deck
            price is the same whichever way you buy it; only the Top Deck Tour is cheaper online, by ¥200 on
            every tier. The Top Deck Tour price includes the Main Deck.
          </p>
        </section>

        {/* Which ticket */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which ticket</span>
          <h2 className={styles.sectionTitle}>Main Deck, Top Deck, or After Dark?</h2>
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

        {/* vs other decks */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Tokyo Tower vs the Other Tokyo Decks</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Tokyo Tower is neither the highest deck in the city nor the most photographed, and it does not
            try to be. What it has is the cheapest paid ticket of the three, the latest closing time, and the
            landmark itself. Here is how the four main options line up.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Deck", "Height", "Price (approx)", "Highlight", "Area / nearest"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Tokyo Tower figures read off the official site on {CHECKED}; the other three are the official
            prices covered in our{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={{ color: "var(--text)", fontWeight: 600 }}>
              Tokyo observation decks comparison
            </Link>
            . All are approximate and subject to change.
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Book Tokyo Tower Tickets</h2>
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

        {/* Klook picks for the rest of the day — the ticket CTAs above are unchanged. */}
        <KlookTourPicks
          heading="The Rest of the Day in Tokyo"
          intro="An observation deck fills an hour. Both of these are booked on the same Klook account as the ticket, and the subway pass covers five of the six stations listed on Tokyo Tower's own access page — Akabanebashi, Onarimon, Kamiyacho, Shibakoen and Daimon are all Metro or Toei."
          tours={[tokyoSightseeingBusTour, tokyoSubwayTicket]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/tokyo-observation-decks" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M6 21V9l6-6 6 6v12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower</p>
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
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 18a5 5 0 0 0-10 0" />
                  <line x1="12" y1="2" x2="12" y2="9" />
                  <line x1="2" y1="22" x2="22" y2="22" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
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
            <Link href="/guides/attractions/fuji-q-highland-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17c4 0 4-9 9-9s5 9 9 9" />
                  <path d="M3 21h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Fuji-Q Highland Tickets (2026): Free Pass Prices, the Q Pack &amp; How to Get There</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l4 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book the deck, skip the window</h2>
            <p className={styles.ctaBannerDesc}>
              Klook sells Tokyo Tower admission with an English checkout, an e-ticket and the Top Deck Tour
              upgrade on the same listing — useful if a Japanese attraction site has already refused your
              card.
            </p>
            <a href={tokyoTowerTicket.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View Tokyo Tower tickets →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
