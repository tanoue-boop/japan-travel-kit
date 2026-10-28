import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { GygCompareButton } from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import {
  fujiHakoneDayTour,
  shibuyaSkyDayTripPrep,
  shibuyaSkyTicketUrl,
  tokyoSightseeingBusTour,
} from "../../../lib/klook-links";
import { gygShibuyaSky } from "../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { PRICES, checkedLabel } from "../../../lib/attraction-prices";

// CTA link — Klook affiliate redirect, shared with the ticket price table.
const SHIBUYA_SKY_URL = shibuyaSkyTicketUrl;

// The headline figures below are owned by lib/attraction-prices.ts, which is also what
// /guides/attractions/japan-attraction-ticket-prices reads — one set of prices, two pages.
const P = PRICES.shibuyaSky;

/**
 * Rewritten 28 Oct 2026 for the exact phrase "shibuya sky tickets", which this page
 * ranked 4.6th for on Bing while sitting 32.8th on Google with 465 impressions and no
 * clicks over 28 days. The lead, the three tables below, the eight question headings and
 * the ten FAQ entries are all new; the Klook and GetYourGuide CTAs are unchanged.
 *
 * The rewrite also corrected the price. Every figure on this page is an official one,
 * read on 28 Oct 2026, and sourced per row:
 *
 *   shibuya-scramble-square.com   the operator's own release of 27 Feb 2025,           28 Oct 2026
 *     /assets/pdf/about/          "SHIBUYA SKY 入場チケットの改定について": for admission
 *     20250227scsq.pdf            from 1 April 2025, web tickets are ¥2,700 for a
 *                                 10:00–14:59 entry and ¥3,400 for 15:00–21:20, counter
 *                                 tickets ¥3,000 and ¥3,700; sales for a date open at
 *                                 00:00 two weeks before it; free cancellation up to the
 *                                 admission day.
 *   shibuya-scramble-square.com   the ticket page's own child rule — ¥1,200 for ages     28 Oct 2026
 *     /sky/ticket/                6–12 including 12-year-olds still in elementary
 *                                 school, sold at the 14th-floor counter only, and free
 *                                 admission for preschool children.
 *   gotokyo.org/en/spot/1749      the Tokyo Metropolitan Government's official tourism   28 Oct 2026
 *   gotokyo.org/jp/spot/1749      site, in both languages: "Open 10:00 to 22:30 (last
 *                                 admission is 21:20)", the same two-band prices, and
 *                                 "SHIBUYA SKY closes on New Year's Day, and it may
 *                                 temporarily close or have reduced hours on other days".
 *
 * The operator's own /sky/ticket/ page is client-rendered — an automated read returns the
 * navigation and nothing else — which is why the price rows cite the release that set
 * them and the government listing that still carries them, rather than the ticket page.
 * Nothing here is first-hand, and no Klook price appears anywhere.
 */
const CHECKED = checkedLabel(P.checked);

/** What each ticket costs, by entry time and by where you buy it. */
const priceRows = [
  { ticket: "Adult, entering 10:00–14:59", online: "¥2,700", counter: "¥3,000" },
  { ticket: "Adult, entering 15:00–21:20", online: "¥3,400", counter: "¥3,700" },
  {
    ticket: "Child, ages 6–12 (including 12-year-olds still in elementary school)",
    online: "Not sold online",
    counter: "¥1,200",
  },
  { ticket: "Preschool children (not yet in elementary school)", online: "Free", counter: "Free" },
];

/** Hours, last admission and closures — the part that decides which band you pay. */
const hoursRows = [
  { what: "Opening hours", detail: "10:00–22:30" },
  { what: "Last admission", detail: "21:20" },
  { what: "Cheaper band", detail: "Entry from 10:00 to 14:59" },
  { what: "Dearer band", detail: "Entry from 15:00 to 21:20 — the band every sunset slot falls in" },
  {
    what: "Closed",
    detail: "New Year's Day. Temporary closures and shortened hours are possible on other days",
  },
];

/** The booking window, the counter and the cancellation terms. */
const bookingRows = [
  {
    q: "When does a date go on sale?",
    a: "At 00:00 Japan time, two weeks before the admission date. The 27 February 2025 release moved it to that moment specifically to make the window predictable.",
  },
  {
    q: "Can I cancel?",
    a: "The same release introduced free cancellation up to the admission day on web tickets. Confirm the terms shown at your own checkout — a reseller sets its own, and Klook's listing states free cancellation up to 24 hours before.",
  },
  {
    q: "Is there a ticket at the door?",
    a: "Yes — the 14th-floor counter sells at ¥3,000 for an entry before 15:00 and ¥3,700 from 15:00. What the counter cannot do is hold a time slot in advance, so it is a fallback rather than a plan.",
  },
  {
    q: "What is counter-only?",
    a: "Child tickets. Ages 6–12 are ¥1,200 and are sold at the 14th-floor counter on the day, not online — so a family booking online buys adult tickets and pays for the children on arrival.",
  },
];

const deckRows = [
  {
    deck: "Shibuya Sky",
    height: "~229 m (rooftop)",
    highlight: "Open-air rooftop directly above the Scramble Crossing — the iconic Tokyo shot",
    price: `${P.adult} online (${P.atDoor} counter)`,
    area: "Shibuya Station",
  },
  {
    deck: "Tokyo Skytree",
    height: "350 m & 450 m decks (634 m tower)",
    highlight: "Highest views, glass-floor section; Mt. Fuji visible on clear days",
    price: `${PRICES.tokyoSkytree.adult} (Floor 350)`,
    area: "Oshiage, near Asakusa",
  },
  {
    deck: "Tokyo Tower",
    height: "~150 m & ~250 m decks (332 m tower)",
    highlight: "Retro 1958 landmark; Top Deck tour for the higher level",
    price: `${PRICES.tokyoTower.adult} Main Deck`,
    area: "Shiba-koen / Akabanebashi",
  },
  {
    deck: "Tokyo Metropolitan Gov. Building (Tocho)",
    height: "~202 m",
    highlight: "Free admission; great-value city panorama with no ticket",
    price: PRICES.tochoDeck.adult,
    area: "Shinjuku",
  },
];

const whoFor = [
  {
    title: "Go for sunset if…",
    desc: "You want the iconic shot and you can plan ahead. Sunset falls inside the ¥3,400 band whichever month you visit, so the only thing you are trading is availability — and these are the slots that go first. Aim to enter 30–60 minutes before sunset to catch daylight, golden hour and the city lighting up in one visit.",
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
    title: "Go before 15:00 if…",
    desc: "Price matters more than the light. An entry from 10:00 to 14:59 is ¥2,700 against ¥3,400 — ¥700 less for the same rooftop — and the earlier bands are the easiest to get at short notice. On a clear, dry day the daytime view reaches furthest, Mt. Fuji included.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "Go late if…",
    desc: "You are after the neon cityscape and sunset has gone. Late slots sit in the same ¥3,400 band as sunset but are usually the last to sell, and last admission is 21:20 with the deck open until 22:30 — a solid rescue when your date opened two weeks ago and the golden hour is already taken.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Count back two weeks from your date",
    desc: "A date goes on sale at 00:00 Japan time exactly two weeks ahead. Put that moment in your calendar in your own time zone before you do anything else — it is the single thing that decides whether sunset is available to you at all.",
  },
  {
    title: "Decide your band before you look at slots",
    desc: "Entry before 15:00 is ¥2,700, entry from 15:00 is ¥3,400. Sunset and night are both in the dearer band, so there is no cheap sunset — pick the light you want, then the time.",
  },
  {
    title: "Book online rather than at the counter",
    desc: "Online is ¥300 less than the 14th-floor counter at either band, and it is the only way to hold a slot in advance. Child tickets are the exception: ages 6–12 are sold at the counter on the day.",
  },
  {
    title: "Use a reseller if you have a foreign card",
    desc: "Since July 2024 the official Shibuya Sky site has rejected many foreign-issued cards. Klook accepts foreign cards, checks out in English, and states free cancellation up to 24 hours before — a useful hedge against Tokyo's weather.",
  },
  {
    title: "Arrive 30–60 minutes before your slot if it is sunset",
    desc: "Give yourself time to clear the entrance, store loose items in the lockers (the rooftop is open-air and windy) and get into position before the light turns.",
  },
];

const faqItems = [
  {
    q: "How much are Shibuya Sky tickets in 2026?",
    a: `An adult web ticket is ¥2,700 for an entry between 10:00 and 14:59 and ¥3,400 for an entry from 15:00 to 21:20. The same tickets at the 14th-floor counter are ¥3,000 and ¥3,700, so booking online saves ¥300 either way. Children aged 6–12 are ¥1,200 at the counter only, and preschool children enter free. Those prices have applied to admission since 1 April 2025 under Shibuya Scramble Square's own ticket revision, read on ${CHECKED}.`,
  },
  {
    q: "What time is Shibuya Sky open, and when is last admission?",
    a: `Shibuya Sky is open 10:00 to 22:30 with last admission at 21:20, on the Tokyo Metropolitan Government's official tourism listing read on ${CHECKED}. It closes on New Year's Day and may close temporarily or run shortened hours on other days. The hours matter for the price as well as the plan: the ¥2,700 band ends at 14:59 and everything from 15:00 to the 21:20 cut-off is ¥3,400.`,
  },
  {
    q: "Do you need to book Shibuya Sky in advance?",
    a: "For sunset, yes — treat it as the whole decision. For a daytime or late slot, usually not, but booking still saves ¥300 a head against the counter and removes the risk that your preferred time has gone. The counter on the 14th floor does sell on the day, so a visit is not impossible without a booking; what you cannot do on the day is choose when you go up.",
  },
  {
    q: "How far in advance do Shibuya Sky tickets go on sale?",
    a: `Two weeks. A date opens at 00:00 Japan time exactly fourteen days before it, which the operator's 27 February 2025 release set deliberately so the window is predictable. For sunset on a popular date, book at that moment rather than later in the day. Read on ${CHECKED}.`,
  },
  {
    q: "Which Shibuya Sky time slot sells out first?",
    a: "Sunset, and by a wide margin — it is the one slot that delivers daylight, golden hour and the night cityscape in a single visit, and in Tokyo it moves from around 16:30 in December to past 19:00 in June, so the slot in demand changes month by month. Daytime bands are the most relaxed. Late evening is the usual fallback: same ¥3,400 band, far less competition, and the city lit up instead of the horizon.",
  },
  {
    q: "Can I cancel or change a Shibuya Sky ticket?",
    a: `The 27 February 2025 release that introduced the current prices also introduced free cancellation up to the admission day on web tickets bought from the operator. A reseller sets its own terms — Klook's listing states free cancellation up to 24 hours before the slot — so check what your own checkout shows. Read on ${CHECKED}.`,
  },
  {
    q: "Can I buy Shibuya Sky tickets with a foreign credit card?",
    a: "On the official Shibuya Sky website, often no — since July 2024 it has rejected many foreign-issued cards. The reliable workaround is a reseller such as Klook, which accepts foreign cards, provides an English checkout and e-ticket, and states free cancellation up to 24 hours before your slot.",
  },
  {
    q: "How high is Shibuya Sky and what will you see?",
    a: "Shibuya Sky is a rooftop observation deck about 229 metres above Shibuya, across open-air and indoor areas. From the top you get a 360-degree view over the Shibuya Scramble Crossing, Tokyo's skyline and — on clear days — Mt. Fuji. The open-air rooftop is the highlight, so dress for wind and check the weather before you go.",
  },
  {
    q: "Shibuya Sky vs Skytree — which should you pick?",
    a: `Shibuya Sky is the experience and the photo: an open-air rooftop ~229 m above the Scramble Crossing, best at sunset, at ¥2,700 before 15:00 or ¥3,400 after. Tokyo Skytree is altitude and reach: decks at 350 m and 450 m, a glass-floor section and far-distance views, from ${PRICES.tokyoSkytree.adult} for Floor 350. Choose Shibuya Sky for the crossing shot and the atmosphere, Skytree for the highest, widest panorama.`,
  },
  {
    q: "Are there any free observation decks in Tokyo?",
    a: `Yes. The Tokyo Metropolitan Government Building (Tocho) in Shinjuku has decks at about 202 m that are free to enter — the best no-cost city view in Tokyo, and a sensible swap if ¥3,400 at sunset is not where you want the budget to go. Hours and deck availability vary, so confirm before you go.`,
  },
  {
    q: "Can you see Mt. Fuji from Shibuya Sky?",
    a: "On a clear day, yes — though Tokyo Skytree offers the better chance thanks to its height. Visibility is weather-dependent and tends to be best in the cooler, drier months and early in the day, which is an argument for the ¥2,700 daytime band if Fuji is the reason you are going up. There is never a guarantee on any given day.",
  },
];

const TITLE = "Shibuya Sky Tickets 2026: Price, Hours & Sunset Slots";
const DESCRIPTION =
  "Shibuya Sky tickets are ¥2,700 online for entry before 15:00 and ¥3,400 from 15:00, ¥300 more at the counter. Hours, the booking window and sunset slots.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/shibuya-sky-tickets") } });

export default function ShibuyaSkyTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/shibuya-sky-tickets" />
        {hreflangLinks("/guides/attractions/shibuya-sky-tickets")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/shibuya-sky-tickets" />
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
              route: "/guides/attractions/shibuya-sky-tickets",
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
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Shibuya Sky Tickets 2026:<br />Price, Hours &amp; the Sunset Slot
          </h1>
          <p className={styles.heroSubtitle}>
            Tokyo&apos;s best rooftop view — 229 metres above the Scramble Crossing. Two price bands, a
            two-week booking window, and one slot that actually sells out.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices, checked", "Sunset booking window", "vs Skytree & Tokyo Tower"].map((t) => (
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

        {/* Lead paragraph — the whole answer, before anything else on the page. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>Shibuya Sky tickets</strong> are priced by the time you go up: an adult web ticket is{" "}
            <strong>¥2,700</strong> for an entry between 10:00 and 14:59 and <strong>¥3,400</strong> for an
            entry from 15:00 to 21:20, while the same two tickets at the 14th-floor counter are ¥3,000 and
            ¥3,700 — so booking online saves ¥300 whichever band you pick, and children aged 6–12 are ¥1,200
            at the counter only. Buy them from the operator&apos;s own site or a reseller such as Klook, and
            buy them early: a date goes on sale at <strong>00:00 Japan time exactly two weeks ahead</strong>,
            and the sunset slots are the ones that go, which is why the practical deadline is the moment your
            date opens rather than the week of your trip. The deck is open 10:00–22:30 with last admission
            21:20. All figures read on {CHECKED} — prices from Shibuya Scramble Square&apos;s own ticket
            revision of 27 February 2025, hours from the Tokyo Metropolitan Government&apos;s tourism listing.
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Price (online)</p>
                <p className={styles.verdictStatValue}>¥2,700 / ¥3,400 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hours</p>
                <p className={styles.verdictStatValue}>10:00–22:30, last entry 21:20</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>On sale</p>
                <p className={styles.verdictStatValue}>00:00 JST, 2 weeks ahead</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Sells out</p>
                <p className={styles.verdictStatValue}>Sunset slots, first</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> book online (¥300 under the counter at both bands) and, if you want
              sunset, book it the minute your date opens two weeks out. If your card is issued abroad, book
              through Klook, which accepts foreign cards and states free cancellation up to 24 hours before.
            </p>
            {/* The Klook CTA is unchanged; GetYourGuide sells the same rooftop and sits beside it. */}
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn}>
                Check Shibuya Sky Tickets →
              </KlookLink>
              <GygCompareButton slug="shibuya-sky-tickets" listing={gygShibuyaSky} />
            </div>
          </div>
        </div>

        {/* Q1 — price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How Much Are Shibuya Sky Tickets in 2026?</h2>
          <p className={styles.bodyText}>
            ¥2,700 for an adult entering before 15:00, ¥3,400 from 15:00 — and ¥300 more on each if you buy at
            the counter instead of online. That two-band structure is the thing most guides still get wrong:
            there has been no single Shibuya Sky price since 1 April 2025, when Shibuya Scramble Square split
            admission by entry time.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Web (advance)", "14F counter"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.online}</td>
                      <td className={styles.tdPrice}>{row.counter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Prices read on {CHECKED}, and in force for admission from 1 April 2025 under Shibuya Scramble
            Square&apos;s own release, &ldquo;SHIBUYA SKY 入場チケットの改定について&rdquo; of 27 February 2025. The child
            figure and the counter-only rule are off the operator&apos;s ticket page. Confirm at booking — these
            figures sit alongside every other attraction we have checked in our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>
            , which carries the check date for each one.
          </p>
        </section>

        {/* Q2 — hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hours</span>
          <h2 className={styles.sectionTitle}>What Time Is Shibuya Sky Open, and When Is Last Admission?</h2>
          <p className={styles.bodyText}>
            10:00 to 22:30, with last admission at 21:20. The hours are also the price: 14:59 is the last entry
            in the ¥2,700 band, and everything from 15:00 to the cut-off is ¥3,400 — so the question
            &ldquo;what time shall we go?&rdquo; is a ¥700 question before it is a daylight one.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", `Shibuya Sky (read ${CHECKED})`].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Hours, last admission and the New Year&apos;s Day closure are the Tokyo Metropolitan
            Government&apos;s own listing for SHIBUYA SKY on gotokyo.org, which carries the same wording in
            English and Japanese, read on {CHECKED}. The rooftop is open-air, so it can close on the day in
            high wind, lightning or heavy rain while the indoor floors stay open.
          </p>
        </section>

        {/* Q3 — booking window, sell-outs, cancellation, then the CTA stack.
            This is the part an AI answer does not finish: the moment a date opens, what
            the counter can and cannot do, and what the cancellation terms actually are. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking window</span>
          <h2 className={styles.sectionTitle}>Do You Need to Book Shibuya Sky in Advance?</h2>
          <p className={styles.bodyText}>
            For sunset, yes — and the deadline is earlier than people expect. A date goes on sale at
            <strong> 00:00 Japan time exactly two weeks before it</strong>, which is 11:00 the previous morning
            in London, 06:00 in New York and 02:00 in Los Angeles. Sunset slots on a popular date are the ones
            that go, so the practical rule is: be at the checkout when your date opens, not the week of your
            trip. For a daytime or late slot you have far more room — but online still saves ¥300 a head.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Question", `What the operator publishes (read ${CHECKED})`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Two sellers, because a slot gone on one is not always gone on the other — and because the official
            site has rejected many foreign-issued cards since July 2024:
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.pickCta}>
              Check Shibuya Sky tickets on Klook →
            </KlookLink>
            <GygCompareButton slug="shibuya-sky-tickets" listing={gygShibuyaSky} />
          </div>
        </section>

        {/* Q4 — which slot */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which slot</span>
          <h2 className={styles.sectionTitle}>Which Shibuya Sky Time Slot Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Sunset if you can get it, before 15:00 if price is the deciding factor, late evening if sunset has
            gone. Sunset in Tokyo moves from around 16:30 in December to past 19:00 in June, so the slot in
            demand is not the same slot all year — but it always falls inside the ¥3,400 band.
          </p>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            An hour on the rooftop is one block of an evening, so the slot usually gets picked around the rest
            of the day. Ours sits inside a{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              three-day Tokyo itinerary
            </Link>{" "}
            and on the shortlist in{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              things to do in Tokyo
            </Link>.
          </p>
        </section>

        {/* Klook: the evening the slot sits inside. The ticket CTAs above are unchanged. */}
        <KlookTripPrep
          label="The rest of the day"
          heading="What Else Should You Book for Your Shibuya Sky Day?"
          intro="The deck itself is about an hour, so whichever slot you picked above leaves most of a day or an evening open around it. These are the bookings that follow from that slot — a bed in the same district, somewhere to go afterwards, and the pass that covers the moving between them."
          items={shibuyaSkyDayTripPrep}
        />

        {/* Q5 — vs other decks */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Shibuya Sky vs Skytree vs Tokyo Tower — Which Deck?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Shibuya Sky wins on the iconic crossing shot, but it is neither the highest deck in Tokyo nor the
            cheapest — and since the April 2025 revision a 15:00 entry costs more than Tokyo Tower&apos;s Top
            Deck tour. Skytree is the pick for sheer altitude and Mt. Fuji views, Tokyo Tower for the retro
            landmark, and Tocho in Shinjuku if you want a panorama for nothing.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Deck", "Height", "Highlight", "Adult price", "Area / nearest"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Heights are approximate; every price is the operator&apos;s own, carried from{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              our ticket price table
            </Link>{" "}
            with its own check date per row. The four are compared in full, slot by slot, in our{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={{ color: "var(--text)", fontWeight: 600 }}>
              Tokyo observation decks guide
            </Link>.
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How Do You Book Shibuya Sky?</h2>
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

        {/* Klook tours in the same city — the Shibuya Sky CTAs above are unchanged. */}
        <KlookTourPicks
          heading="Day Trips From the Same City"
          intro="A Shibuya Sky slot fills an hour of an evening, which leaves the rest of the day open. If a Tokyo day is still unplanned, both of these are booked on the same Klook account as your ticket."
          tours={[tokyoSightseeingBusTour, fujiHakoneDayTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/tokyo-observation-decks" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V8l5-3 5 3v13" />
                  <path d="M13 21V11l5-3 3 2v11" />
                  <path d="M7 11v.01M7 15v.01M17 13v.01M17 17v.01" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 3 Day Itinerary (2026): What to Book, and in What Order</p>
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
            <Link href="/guides/attractions/teamlab-borderless-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="13.5" cy="6.5" r="1.5" />
                  <circle cx="17.5" cy="10.5" r="1.5" />
                  <circle cx="8.5" cy="7.5" r="1.5" />
                  <circle cx="6.5" cy="12.5" r="1.5" />
                  <path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-1.4-1-1.9-1-3a2 2 0 0 1 2-2h2a4 4 0 0 0 4-4 9 9 0 0 0-9-9z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Borderless Tickets (2026): Price, How to Book and Time Slots</p>
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
            <Link href="/guides/attractions/tokyo-disney-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Disneyland Tickets 2026: Prices, Rules &amp; DisneySea</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/sumo-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sumo in Tokyo (2026): Tournament Tickets vs Morning Practice</p>
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
              Online is ¥300 under the counter at both bands, and a date opens two weeks ahead at midnight JST.
              Klook accepts foreign cards and states free cancellation up to 24 hours before — handy if
              Tokyo&apos;s weather turns.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
                View Shibuya Sky Tickets →
              </KlookLink>
              <GygCompareButton slug="shibuya-sky-tickets" listing={gygShibuyaSky} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
