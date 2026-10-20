import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import { sanrioPurolandTicket, tokyoSightseeingBusTour, warnerBrosStudioTourTokyo } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";

// Passport price bands, the 1 Aug 2026 revision, the arrival-reservation rule and
// the access routes below were read off puroland.jp (/passport/list/, /fee/,
// /news/passport_information_2026/, /ticket/guidance/ and /access/) on 20 Oct 2026.
// The Klook listing was confirmed live through the www.klook.com search index the
// same day; Klook answers automated reads of its product pages with HTTP 403, so no
// Klook price appears on this page.
const CHECKED = "20 October 2026";

const priceRows = [
  { ticket: "Day Passport — adult (18–64)", price: "¥3,900 – ¥6,900" },
  { ticket: "Day Passport — child (3–17) / senior (65+)", price: "¥2,800 – ¥5,800" },
  { ticket: "Afternoon Passport (from 14:00) — adult", price: "¥2,800 – ¥4,600" },
  { ticket: "Afternoon Passport (from 14:00) — child / senior", price: "¥2,500 – ¥4,300" },
  { ticket: "Under 3", price: "Free" },
  { ticket: "Annual passport — adult (digital / card)", price: "¥23,000 / ¥25,000" },
  { ticket: "Annual passport — child (digital / card)", price: "¥12,000 / ¥14,000" },
];

const whoFor = [
  {
    title: "Day Passport if…",
    desc: "You want the parades and the shows, which are the point of Puroland rather than the rides. A full day starts at ¥3,900 for an adult on the cheapest dates and runs to ¥6,900 on the busiest — a gap of ¥3,000 that depends entirely on which day you pick.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.4-7 10-7 10z" />
      </svg>
    ),
  },
  {
    title: "Afternoon Passport if…",
    desc: "You are fitting Puroland around something else, or travelling with small children who will not last a full day. It admits you from 14:00 and starts at ¥2,800 for an adult — roughly a thousand yen below the cheapest full day.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l4 2" />
      </svg>
    ),
  },
  {
    title: "Shift your date if…",
    desc: "Your schedule has any slack in it. Puroland prices by expected demand and added more price tiers on 1 August 2026 specifically to spread visitors out, so moving a visit off a weekend or a holiday is the single biggest saving available on this ticket.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 10h18M8 2v4M16 2v4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Check the price for your date before you commit to one",
    desc: `Puroland publishes a calendar with a price per date rather than one list price, and the official wording is plain about it: passport fees differ depending on your visit date. An adult Day Passport ranges from ¥3,900 to ¥6,900, so the calendar is worth opening before the ticket page. Checked ${CHECKED}.`,
  },
  {
    title: "Make the arrival reservation — it is separate from the ticket",
    desc: `This is the step that catches people out. The official site states that visitors without an arrival reservation will be refused entry, and that a reservation on its own is not enough either — you need both the reservation and a passport ticket. Whichever way you buy the ticket, check your voucher for how to register the reservation for your date. Checked ${CHECKED}.`,
  },
  {
    title: "Buy online rather than at the window",
    desc: `Puroland promotes its own e-passport as the cheaper route, and the window is only open from 30 minutes before the park opens until 90 minutes before it closes — so a late arrival can find it shut. A reseller voucher is the other way to hold a ticket before you travel.`,
  },
  {
    title: "Use a reseller if your card is issued abroad",
    desc: "Klook sells Sanrio Puroland admission with an English checkout and an e-ticket, which sidesteps the card and language friction that several Japanese attraction sites cause for overseas visitors — and the listing has been running long enough to have a six-figure booking count.",
  },
];

const faqItems = [
  {
    q: "How much are Sanrio Puroland tickets?",
    a: `A Day Passport is ¥3,900 to ¥6,900 for an adult aged 18–64 and ¥2,800 to ¥5,800 for a child aged 3–17 or a senior aged 65 and over. The Afternoon Passport, which admits you from 14:00, is ¥2,800 to ¥4,600 for an adult and ¥2,500 to ¥4,300 for a child or senior. Children under 3 are free. The range is real, not a rounding — the price depends on the date you pick. Figures read off puroland.jp on ${CHECKED}.`,
  },
  {
    q: "Why do Sanrio Puroland ticket prices change?",
    a: `Puroland uses variable pricing tied to expected demand, and on 1 August 2026 it revised the bands and added more tiers, stating the aim was to level out the difference between busy and quiet days. In practice that means a weekday outside the school holidays sits near the bottom of the range and a weekend or a Japanese public holiday near the top. For an adult Day Passport the spread is ¥3,900 to ¥6,900 — ¥3,000 of difference for the same park. Checked ${CHECKED}.`,
  },
  {
    q: "Do I need a reservation for Sanrio Puroland?",
    a: `Yes, and it is a second thing on top of the ticket. The official ticket guidance says that visitors arriving without an arrival reservation will be refused entry, and that an arrival reservation by itself does not admit you — you must also hold a passport ticket. So the order is: pick the date, get the ticket, register the arrival reservation for that date. Checked ${CHECKED}.`,
  },
  {
    q: "Is the Afternoon Passport worth it?",
    a: "It depends on what you came for. Puroland's draw is its theatre shows and parades rather than its rides, and a 14:00 start still leaves a full afternoon and evening of the schedule. At ¥2,800 to ¥4,600 for an adult it undercuts the cheapest full day on most dates. If you are travelling with a toddler, or pairing Puroland with something in central Tokyo in the morning, it is the better buy. If you want to see everything in the day's programme, pay for the full day.",
  },
  {
    q: "How do I get to Sanrio Puroland?",
    a: `The park is at Tama Center, west of central Tokyo, and three railways reach it: the Keio Line to Keio Tama Center, the Odakyu Line to Odakyu Tama Center, and the Tama Monorail to Tama Center from Tachikawa. The official access page walks you from the Keio central ticket gate straight ahead past Okano Plaza to the park. Note that none of those three lines is Tokyo Metro or Toei, so a Tokyo Subway Ticket does not cover the journey. Checked ${CHECKED}.`,
  },
  {
    q: "Is Sanrio Puroland indoors?",
    a: "Yes — it is an indoor theme park, which is the practical reason to keep it on the list. It is the obvious thing to move a rained-out day to, and it works in the height of summer and in winter without the weather deciding how the day goes. That also means it fills up on bad-weather weekends, which the variable pricing does not predict in advance.",
  },
  {
    q: "How long do you need at Sanrio Puroland?",
    a: "Klook's listing suggests 3 to 5 hours, which matches the shape of the place: it is compact, the time goes on sitting down for shows and parades rather than queuing for rides, and the schedule repeats. That is also why the Afternoon Passport is a genuine option here in a way it would not be at a larger park.",
  },
  {
    q: "Puroland or Tokyo Disney — which is better for a short trip?",
    a: "They are not really competing. Tokyo Disney is a full, hard day on your feet with date-specified tickets that sell out weeks ahead and no gate sales at all. Puroland is a half-day indoor park that you can book much closer to the date, and the Sanrio characters are the draw. On a short trip with one free day, Disney will eat it; Puroland will not.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/sanrio-puroland-tickets") } });

const TITLE = "Sanrio Puroland Tickets (2026): Prices, Variable Pricing & How to Book";
const DESCRIPTION =
  "Sanrio Puroland tickets in 2026: official passport prices (¥3,900–¥6,900 adult Day Passport), why the price changes by date, the arrival reservation you also need, and how to book from abroad.";

export default function SanrioPurolandTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE} | Japan Travel Kit</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/sanrio-puroland-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/sanrio-puroland-tickets" />
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: TITLE,
              dateModified: updated.iso,
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
                { "@type": "ListItem", position: 4, name: "Sanrio Puroland Tickets", item: "https://www.japan-travel-kit.com/guides/attractions/sanrio-puroland-tickets" },
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
          <span className={styles.breadCurrent}>Sanrio Puroland Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Sanrio Puroland Tickets (2026):<br />Prices, Variable Pricing &amp; How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            An adult Day Passport is ¥3,900 to ¥6,900 depending on the date, so picking the day matters more
            than picking where to buy. The Afternoon Passport starts at ¥2,800 and admits you from 14:00 —
            and whichever ticket you hold, Puroland also requires a separate arrival reservation.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Indoor park"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Day Passport (adult)</p>
                <p className={styles.verdictStatValue}>¥3,900 – ¥6,900</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Afternoon Passport (adult)</p>
                <p className={styles.verdictStatValue}>¥2,800 – ¥4,600</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Also required</p>
                <p className={styles.verdictStatValue}>Arrival reservation</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Where</p>
                <p className={styles.verdictStatValue}>Tama Center (Keio / Odakyu)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> the price is set by the date, not by the seller, so open Puroland&apos;s
              calendar and shift the visit to a quieter day if you can — that is worth up to ¥3,000 per adult.
              Buy the passport online rather than at the window, and register the arrival reservation for the
              same date, because the official site refuses entry without one. Prices read off puroland.jp on{" "}
              {CHECKED}.
            </p>
            <a href={sanrioPurolandTicket.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check Sanrio Puroland tickets on Klook →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Sanrio Puroland Actually Is</h2>
          <p className={styles.bodyText}>
            Sanrio Puroland is the indoor Hello Kitty park at Tama Center, on the western edge of Tokyo. It is
            a theatre park rather than a ride park: the day is built around stage shows, parades and character
            greetings, with a handful of gentle attractions in between. Being entirely indoors makes it the
            obvious place to move a rained-out day to.
          </p>
          <p className={styles.bodyText}>
            Two things about the ticket are worth knowing before you plan around it. The price is set per date
            rather than published as one figure, with a ¥3,000 spread on an adult Day Passport. And the ticket
            is not the only thing you need — the park also requires a date-specified arrival reservation, and
            says plainly that it will turn away visitors who do not have one.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Sanrio Puroland Passport Prices</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off puroland.jp on {CHECKED} and subject to change — confirm the figure for your own date on
            the official calendar. The child tier covers ages 3 to 17, including high-school students, and
            applies to seniors aged 65 and over as well. The bands above are the ones that took effect on
            1 August 2026.
          </p>
        </section>

        {/* Which passport */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which passport</span>
          <h2 className={styles.sectionTitle}>Day, Afternoon, or a Different Date?</h2>
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
          <h2 className={styles.sectionTitle}>How to Book Sanrio Puroland Tickets</h2>
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
          <h2 className={styles.sectionTitle}>Tama Center, and Why Your Subway Pass Will Not Help</h2>
          <p className={styles.bodyText}>
            Puroland is at Tama Center, reached by three railways: the Keio Line to Keio Tama Center, the
            Odakyu Line to Odakyu Tama Center, and the Tama Monorail to Tama Center from Tachikawa. From the
            Keio central ticket gate the official directions are straight ahead, past Okano Plaza and on to
            the park.
          </p>
          <p className={styles.bodyText}>
            None of those three is a Tokyo Metro or Toei line, which means a{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" style={{ color: "var(--text)", fontWeight: 600 }}>
              Tokyo Subway Ticket
            </Link>{" "}
            does not cover the trip out here — a detail worth knowing if you bought one on the assumption that
            it covers everything. Budget a separate return fare on Keio or Odakyu, or pay with an IC card.
            Checked {CHECKED}.
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

        {/* Klook picks for the other half of the day. The Puroland CTAs above are unchanged;
            the guided tour is the higher-commission slot and leads. */}
        <KlookTourPicks
          heading="The Other Half of a Puroland Day"
          intro="Puroland runs 3 to 5 hours by its own listing's estimate, which leaves most of a day free — and both of these are booked on the same Klook account as the passport. If the trip is built around character parks rather than temples, the Harry Potter studio tour in Nerima is the closest thing Tokyo has to a second one."
          tours={[tokyoSightseeingBusTour, warnerBrosStudioTourTokyo]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/tokyo-disney-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-2.8L7 19l1-6-4-4 5.5-.5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Disney Tickets (2026): Disneyland &amp; DisneySea — How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/warner-bros-studio-tour-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v14H4z" />
                  <path d="M8 5v14M16 5v14M4 10h16M4 14h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Warner Bros. Studio Tour Tokyo Tickets (2026): Prices &amp; How to Book</p>
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
            <h2 className={styles.ctaBannerTitle}>Hold the passport before you travel</h2>
            <p className={styles.ctaBannerDesc}>
              Klook sells Sanrio Puroland admission with an English checkout and an e-ticket — useful if a
              Japanese attraction site has already refused your card. Remember to register the arrival
              reservation for the same date.
            </p>
            <a href={sanrioPurolandTicket.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View Sanrio Puroland tickets →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
