import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import { skytreeTicket, skytreeAquariumCombo, fujiHakoneDayTour, tokyoSightseeingBusTour } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";

// Prices, tiers and hours below were read off tokyo-skytree.jp on 19 Oct 2026. The
// Floor 350 adult and child figures and that date are owned by lib/attraction-prices.ts,
// which also feeds /guides/attractions/japan-attraction-ticket-prices.
const P = PRICES.tokyoSkytree;
const CHECKED = checkedLabel(P.checked);

const priceRows = [
  { ticket: "Floor 350 — adult (15+)", advance: P.adult, sameDay: "+¥500 service fee" },
  { ticket: "Floor 350 — child (6–14)", advance: P.child, sameDay: "+¥500 service fee" },
  { ticket: "Combo, Floor 350 + 450 — adult", advance: "from ¥3,000", sameDay: "+¥500 service fee" },
  { ticket: "Combo, Floor 350 + 450 — child", advance: "from ¥1,500", sameDay: "+¥500 service fee" },
  { ticket: "Floor 450 added on site — adult", advance: "Not sold online", sameDay: "¥1,400" },
  { ticket: "Floor 450 added on site — child", advance: "Not sold online", sameDay: "¥700" },
  { ticket: "Age 5 and under", advance: "Free", sameDay: "Free" },
];

const whoFor = [
  {
    title: "Floor 350 only is enough if…",
    desc: "You want the view and not the upsell. Floor 350 is the main three-storey observation deck and it already looks out over the whole Kanto plain. At from ¥1,800 for an adult it is the cheapest of Tokyo's major paid decks per metre of height.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 7h-6l3-7z" />
        <line x1="12" y1="9" x2="12" y2="21" />
        <line x1="6" y1="21" x2="18" y2="21" />
      </svg>
    ),
  },
  {
    title: "Add Floor 450 if…",
    desc: "Height is the point of the trip. Floor 450 is the Tembo Galleria, a sloping glass skywalk that spirals up to the tower's highest accessible point. The combo is from ¥3,000 online; added on the day it is ¥1,400 on top of a Floor 350 ticket.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l8-16 8 16" />
        <path d="M7.5 13h9" />
      </svg>
    ),
  },
  {
    title: "Go late if…",
    desc: "You would rather have the night panorama than the horizon. On the date we checked, the decks ran to 22:00 with last admission at 21:00, and the late slots are the ones still showing availability when the daytime ones have gone.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const deckRows = [
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
    deck: "Tokyo Tower",
    height: "~150 m and ~250 m decks",
    price: "approx ¥3,300 (Top Deck tour)",
    highlight: "The 1958 landmark, and a view that includes Skytree",
    area: "Shiba-koen / Akabanebashi",
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
    title: "Decide Floor 350 or the combo before you book",
    desc: "Floor 450 is cheaper as part of the online combo (from ¥3,000 adult) than bought on the day on top of a Floor 350 ticket (¥1,400 extra). If there is any chance you will want the skywalk, buy the combo up front.",
  },
  {
    title: "Book a date-specified ticket online",
    desc: `The official site sells date-specified tickets from the "from" prices above, and the figure for your actual date can be higher. Buying same-day at the 4th-floor counter or a convenience store adds a ¥500 service fee per ticket — the single clearest reason to book ahead. Checked ${CHECKED}.`,
  },
  {
    title: "Use a reseller if your card is issued abroad",
    desc: "Klook sells the same timed admission with an English checkout and an e-ticket, which avoids the card and language friction several visitors hit on Japanese attraction sites. The listing also carries the Floor 450 combo.",
  },
  {
    title: "Check the hours for your date, not the general ones",
    desc: `Skytree publishes a per-date calendar and says plainly that "opening hours may change without prior notice", with last admission one hour before closing. On the date we checked the decks ran 10:00–22:00 with last admission at 21:00.`,
  },
];

const faqItems = [
  {
    q: "How much are Tokyo Skytree tickets?",
    a: `Date-specified tickets on the official site start from ¥1,800 for an adult (15+) and ¥900 for a child aged 6–14 for Floor 350, the main observation deck. The combo ticket covering Floor 350 and Floor 450 starts from ¥3,000 for an adult and ¥1,500 for a child. Children aged 5 and under are free. These are "from" prices and the figure for a specific date can be higher. Figures checked on the official site on ${CHECKED}.`,
  },
  {
    q: "Is it cheaper to buy Tokyo Skytree tickets in advance?",
    a: `Yes, and the saving is explicit rather than a matter of fluctuating demand. Buying on the day at the 4th-floor ticket counter — or at a convenience store — adds a ¥500 service fee per ticket on top of the admission price. For a family of four that is ¥2,000 of avoidable cost. Booking a date-specified ticket online, either on the official site or through a reseller, skips the fee and the counter queue. Checked ${CHECKED}.`,
  },
  {
    q: "What is the difference between Floor 350 and Floor 450?",
    a: "Floor 350 is the Tembo Deck, the main three-storey observation level and the one every ticket includes. Floor 450 is the Tembo Galleria, a sloping glass-walled skywalk that spirals up to the tower's highest accessible point. Floor 450 cannot be visited on its own: you need a Floor 350 ticket first, either as part of an online combo or by adding it on site for ¥1,400 (adult) at the ticket machines.",
  },
  {
    q: "Can I buy the Floor 450 ticket online?",
    a: `Not as a standalone ticket. The official site sells Floor 450 only as part of the combo ticket; if you arrive with a Floor 350 ticket and change your mind, you add Floor 450 at the on-site ticket machines for ¥1,400 (adult) or ¥700 (child 6–14). Buying the combo online is the cheaper route — from ¥3,000 for an adult against ¥1,800 plus ¥1,400 bought in two steps. Checked ${CHECKED}.`,
  },
  {
    q: "What are Tokyo Skytree's opening hours?",
    a: `Skytree runs a per-date calendar rather than one fixed timetable, and the official site notes that "opening hours may change without prior notice" and that the last admission is one hour before closing. On the date we checked, the observation decks were open 10:00–22:00 with last admission at 21:00. Check the calendar for your own date before you build an evening around it. Checked ${CHECKED}.`,
  },
  {
    q: "Tokyo Skytree or Shibuya Sky — which is better?",
    a: "They answer different questions. Skytree is about altitude and reach: Floor 350 and Floor 450 are the highest decks in Tokyo, the view covers the whole Kanto plain, and on a clear day Mt. Fuji is in it. Shibuya Sky is about the photograph: an open-air rooftop at about 229 m directly above the Scramble Crossing, best at sunset, and more atmosphere than altitude. If you are picking one, go Skytree for the panorama and Shibuya Sky for the shot everyone recognises.",
  },
  {
    q: "Can you see Mt. Fuji from Tokyo Skytree?",
    a: "On a clear day, yes — and Skytree has the best odds of any deck in the city thanks to its height. Visibility is entirely weather-dependent, and tends to be better in the cooler, drier months and earlier in the day. There is no guarantee on any given date, which is worth remembering before you pay the combo price specifically for the Fuji view.",
  },
  {
    q: "How do I get to Tokyo Skytree?",
    a: "The tower sits above Tokyo Skytree Station on the Tobu Skytree Line and Oshiage Station, which is served by the Tokyo Metro Hanzomon Line, the Toei Asakusa Line and the Keisei Oshiage Line. Oshiage is covered by the Tokyo Subway Ticket, so if you are already carrying that pass the trip there costs nothing extra. Asakusa is two stops away on the Asakusa Line, which makes the two easy to pair in one afternoon.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-skytree-tickets") } });

const TITLE = "Tokyo Skytree Tickets (2026): Prices, Floor 350 vs 450 & How to Book";
const DESC =
  "Tokyo Skytree ticket prices for 2026 from the official site: Floor 350 from ¥1,800, the Floor 450 combo from ¥3,000, and the ¥500 same-day fee that makes booking ahead worth it.";

export default function TokyoSkytreeTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-skytree-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-skytree-tickets" />
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
              route: "/guides/attractions/tokyo-skytree-tickets",
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
                { "@type": "ListItem", position: 4, name: "Tokyo Skytree Tickets", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-skytree-tickets" },
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
          <span className={styles.breadCurrent}>Tokyo Skytree Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Tokyo Skytree Tickets (2026):<br />Prices, Floor 350 vs 450 &amp; How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            The highest decks in Tokyo, and the one attraction where buying on the day has a published
            penalty. Here are the official prices, what Floor 450 actually adds, and how to book from abroad.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Floor 350 vs Floor 450"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Floor 350 (adult)</p>
                <p className={styles.verdictStatValue}>from ¥1,800</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Combo 350 + 450</p>
                <p className={styles.verdictStatValue}>from ¥3,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Buying on the day</p>
                <p className={styles.verdictStatValue}>+¥500 per ticket</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Under 5s</p>
                <p className={styles.verdictStatValue}>Free</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> book a date-specified ticket online. Skytree charges a ¥500 service fee
              per ticket at the same-day counter, so advance booking is cheaper by a published amount rather
              than by luck. If you might want the Floor 450 skywalk, buy the combo up front — adding it on site
              afterwards costs ¥1,400 more. Prices read off the official site on {CHECKED}.
            </p>
            <a href={skytreeTicket.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check Tokyo Skytree tickets on Klook →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What You Are Buying</h2>
          <p className={styles.bodyText}>
            Tokyo Skytree sells admission to two separate levels. <strong>Floor 350</strong> is the Tembo Deck,
            a three-storey observation level and the one included in every ticket. <strong>Floor 450</strong> is
            the Tembo Galleria, a sloping glass-walled skywalk that spirals up to the tower&apos;s highest
            accessible point — and it cannot be visited on its own.
          </p>
          <p className={styles.bodyText}>
            That two-tier structure is where most of the confusion comes from, because the two levels are priced
            differently depending on whether you buy them together online or separately on the day. The section
            below sets both routes side by side.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Tokyo Skytree Ticket Prices</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Date-specified online", "On the day"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.advance}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sameDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off the official Tokyo Skytree site on {CHECKED}. The official page lists these as
            &ldquo;from&rdquo; prices, so the figure for a specific date can be higher — confirm at booking. The
            ¥500 same-day service fee applies per ticket at the 4th-floor counter and at convenience stores.
          </p>
        </section>

        {/* Which ticket */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which ticket</span>
          <h2 className={styles.sectionTitle}>Floor 350, the Combo, or a Late Slot?</h2>
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
          <h2 className={styles.sectionTitle}>Skytree vs Tokyo&apos;s Other Observation Decks</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Skytree is the altitude pick. If what you actually want is the Scramble Crossing photograph,{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets">Shibuya Sky</Link> is the better buy, and if you
            want a city panorama for nothing at all, the Tokyo Metropolitan Government Building in Shinjuku is
            free.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Deck", "Height", "Price (approx)", "Highlight", "Area"].map((h) => (
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
            Skytree and Shibuya Sky figures are from the operators&apos; own sites; Tokyo Tower and Tocho are
            approximate and subject to change. Confirm at booking.
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Book Tokyo Skytree Tickets</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Getting there is the easy part: the tower sits on top of Tokyo Skytree Station and Oshiage, and
            Oshiage is a subway stop — so it is covered by the{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">Tokyo Subway Ticket</Link> if you are carrying
            one. Our <Link href="/guides/transport/tokyo-transportation">guide to getting around Tokyo</Link>{" "}
            covers how the Metro and Toei networks fit together.
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

        <KlookTourPicks
          heading="Book It With the Rest of the Day"
          intro="A Skytree slot takes an hour or two. These listings sit on the same Klook account as the ticket, so the rest of the day books in the same checkout."
          tours={[skytreeAquariumCombo, tokyoSightseeingBusTour, fujiHakoneDayTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/tokyo-tower-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l4 10h-8l4-10z" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Tower Tickets (2026): Prices, Main Deck vs Top Deck &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
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
            <Link href="/guides/attractions/warner-bros-studio-tour-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 4l-9 9 2 2 9-9z" />
                  <path d="M5 19l2-6 4 4-6 2z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Warner Bros. Studio Tour Tokyo Tickets (2026): Prices &amp; How to Book</p>
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
            <h2 className={styles.ctaBannerTitle}>Book before the counter charges you more</h2>
            <p className={styles.ctaBannerDesc}>
              Same-day tickets carry a ¥500 service fee per person. A date-specified ticket booked online skips
              both the fee and the queue — and Klook checks out in English on a foreign card.
            </p>
            <a href={skytreeTicket.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View Tokyo Skytree tickets on Klook →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
