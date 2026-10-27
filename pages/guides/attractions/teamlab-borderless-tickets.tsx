import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { teamlabBorderlessTicketUrl } from "../../../lib/klook-links";
import { GygCompareButton } from "../../../components/GygCompare";
import { gygTeamlabBorderless, GYG_CHECKED_AT } from "../../../lib/gyg-links";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";

// CTA link — Klook affiliate redirect (teamLab Borderless admission ticket), shared with
// the ticket price table.
const BORDERLESS_URL = teamlabBorderlessTicketUrl;

// All figures below were read from the official teamLab site (teamlab.art) on 9 October
// 2026. The adult and child figures and the check date are owned by
// lib/attraction-prices.ts, which also feeds the ticket price table.
//
// They keep that 9 October date. teamlab.art renders its ticket, hours and calendar
// panels client-side: a re-read was attempted on 26 October 2026 against the English
// page, the Japanese page and the old borderless.teamlab.art store, and none of them
// returns a price to an automated fetch. Borrowing a fresher date for a figure nobody
// re-read is how a price table starts lying, so nothing here moves until the figures
// themselves can be read again.
const P = PRICES.teamlabBorderless;
const CHECKED = checkedLabel(P.checked);

// The Planets column of the Borderless-vs-Planets table has its own record and its own
// date — that store is server-rendered and was re-read on 25 October 2026.
const PLANETS = PRICES.teamlabPlanets;
const PLANETS_CHECKED = checkedLabel(PLANETS.checked);

// The one thing that *was* confirmed first-hand on 26 October 2026: where the official
// ticket address now points. See the "official ticket site" section below.
const ADDRESS_CHECKED = checkedLabel("2026-10-26");

// The headline search term is "teamLab Borderless tickets", so it stays verbatim and in
// that order in the title, the H1 and the description, each of which also carries the two
// words the query is actually asking about — the price, and how to book.
const TITLE = "teamLab Borderless Tickets (2026): Price, How to Book and Time Slots";
const DESC =
  "teamLab Borderless tickets in 2026, from the official site: adult from ¥3,400 and priced by date and slot, timed entry in Azabudai Hills, hours, closed days, about two hours inside — and how to book direct or on Klook.";

// `varies` is the column that stops the ¥3,400 being read as a price: only the adult and
// disability tiers move with the date, and teamLab publishes no range for how far.
const priceRows = [
  {
    ticket: "Adult (18 and over)",
    price: P.adult,
    varies: "Yes — by date and admission slot",
    note: "¥3,400 is the floor, not the price: check the figure for your own date before you pay",
  },
  { ticket: "Ages 13–17", price: "¥2,800", varies: "No — flat", note: "Bring ID if you look older" },
  { ticket: "Ages 4–12", price: P.child, varies: "No — flat", note: "Fixed whatever date you pick" },
  { ticket: "3 and under", price: "Free", varies: "No — free", note: "No ticket needed" },
  {
    ticket: "Visitor with a disability",
    price: "from ¥1,700",
    varies: "Yes — same calendar as the adult pass",
    note: "One accompanying person gets the same discounted rate; bring proof of eligibility",
  },
];

// Hours, the calendar and the slot mechanics in one table, because these are the figures
// the rest of your day is built on. Every row carries the source it was read off and the
// date it was read — including the one row that is ours rather than teamLab's.
const hoursRows = [
  { item: "Opening hours", detail: "Listed 08:30–21:00, varying by date", source: `teamlab.art, ${CHECKED}` },
  { item: "Last entry", detail: "One hour before closing — a 21:00 close means in by 20:00", source: `teamlab.art, ${CHECKED}` },
  {
    item: "Shorter and longer days",
    detail: "Some dates close early (17:00 on 17 November 2026) and some late (22:00 on selected dates)",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "Closed days",
    detail: "Scattered Tuesdays — 20 October, 24 November and 8 December 2026 among them",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "Entrance Pass",
    detail: "Specifies both a date and an admission time; the slot is the booking",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "Flexible Pass",
    detail: "Valid on a chosen date with no designated entry time, at a premium",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "Changing your date",
    detail: "Up to three times on a ticket bought direct from teamLab",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "Buying on site",
    detail: "Sold at the museum while slots remain, at +¥200 adult and +¥100 child or disability",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "Time to allow",
    detail: "About two hours — longer if you photograph, and there is no fixed route to hurry along",
    source: "Our planning figure — teamLab publishes none",
  },
];

// Borderless against Planets, from the Borderless side. The deep comparison of what the
// two museums *are* lives on the Planets guide; this table is the booking arithmetic.
const vsPlanetsRows = [
  {
    factor: "Where",
    borderless: "Azabudai Hills, Minato City — 2 min from Kamiyacho",
    planets: "Toyosu — 1 min from Shin-Toyosu",
  },
  { factor: "Adult ticket", borderless: `${P.adult}, by date and slot`, planets: `${PLANETS.adult}, by date and slot` },
  { factor: "Ages 4–12", borderless: P.child ?? "—", planets: PLANETS.child ?? "—" },
  {
    factor: "What you do",
    borderless: "Walk a map-less maze of 50+ artworks, shoes on",
    planets: "Barefoot, through water that reaches adult knee height",
  },
  {
    factor: "Entry",
    borderless: "Date + admission time, or a Flexible Pass with no fixed time",
    planets: "Date + admission time only",
  },
  {
    factor: "At the door",
    borderless: "Sold while slots remain, +¥200 for an adult",
    planets: "Not sold on site at all — online in advance or not at all",
  },
  { factor: "Time to allow", borderless: "About 2 hours", planets: "About 1.5–2 hours" },
  {
    factor: "Book it for",
    borderless: "Art, photography, adults, and a rainy afternoon in central Tokyo",
    planets: "Children, and the single biggest first-visit impression",
  },
];

/**
 * The `official`, `klook` and `door` cells are unchanged. The `gyg` column was
 * added on 21 Oct 2026, and it is deliberately the thinnest of the four:
 * GetYourGuide answers automated reads of its pages with HTTP 403, so the only
 * thing that could be confirmed is that the Borderless listing exists and what
 * it carries. Everything that would need the product page open — the price, the
 * cancellation window, the change terms — says so rather than guessing.
 */
const buyingRows = [
  {
    factor: "Price",
    official: "Base price, dynamic by date and slot",
    klook: "Same ticket, listed in your own currency",
    gyg: "Set per option; read it on the listing",
    door: "+¥200 adult, +¥100 child / disability",
  },
  {
    factor: "Checkout language",
    official: "English site available",
    klook: "English checkout, instant e-ticket",
    gyg: "English listing",
    door: "On site, at the museum",
  },
  {
    factor: "Foreign cards",
    official: "Usually fine, but no guarantee",
    klook: "Built for foreign cards and wallets",
    gyg: "Not verified — check at checkout",
    door: "Card accepted on site",
  },
  {
    factor: "Changing your date",
    official: "Date can be changed up to three times",
    klook: "Depends on the Klook option you pick — check before paying",
    gyg: "Not verified — varies by option, read before paying",
    door: "Not applicable",
  },
  {
    factor: "Risk of missing out",
    official: "Low if you book early",
    klook: "Low if you book early",
    gyg: "A second counter worth trying if your slot has gone on the first",
    door: "High — busy slots sell out before the day",
  },
];

const whoFor = [
  {
    title: "Buy on the official site if…",
    desc: "You want the lowest base price and the most flexibility on dates. teamLab lets you change the date of an officially bought ticket up to three times, which is useful if your Tokyo itinerary is still moving around.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),
  },
  {
    title: "Buy on Klook if…",
    desc: "You'd rather check out in your own currency, in English, with a card issued outside Japan and an e-ticket in the app alongside your other bookings. Klook is an official teamLab ticketing partner, so it's the same admission — just a different counter.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M14 6v12" strokeDasharray="2 2" />
        <path d="M6 10h4M6 14h4" />
      </svg>
    ),
  },
  {
    title: "Don't plan on buying at the door if…",
    desc: "You're visiting on a weekend, a holiday or in an evening slot. On-site tickets cost ¥200 more for adults (¥100 more for children and disability tickets) and only exist while slots remain — which, at the times most visitors want, they often don't.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Pick a date, then check the price for it",
    desc: "Adult and disability tickets at Borderless are dynamically priced, so the figure you see depends on the date and time slot you select. Weekday mornings are usually the cheapest and the quietest.",
  },
  {
    title: "Choose an entry time — or a Flexible Pass",
    desc: "The standard Entrance Pass has a specified admission time. teamLab also sells a Flexible Pass that is valid on a specific date with no designated entry time, which is worth the premium if your day is unpredictable.",
  },
  {
    title: "Book 2–3 weeks ahead for weekends and evenings",
    desc: "Borderless has run at well over a million visitors a year, and the popular slots go first. Booking early is the difference between choosing your time and taking whatever's left.",
  },
  {
    title: "Allow about two hours, and go easy on the luggage",
    desc: "There's no fixed route and artworks move between rooms, so most visitors want roughly two hours inside. Arrive a little before your slot and travel light — Kamiyacho and Roppongi-itchome stations both connect underground, so you can get there without going up to street level.",
  },
];

const faqItems = [
  {
    q: "How much are teamLab Borderless tickets in 2026?",
    a: `On the official teamLab site, checked on ${CHECKED}, the Entrance Pass starts from ¥3,400 for adults (18 and over), with ¥2,800 for ages 13–17, ¥1,500 for ages 4–12, and free admission for children 3 and under. Visitors with a disability pay from ¥1,700, and one accompanying person gets the same discounted rate. Adult and disability tickets use dynamic pricing, so the exact amount depends on the date and time slot you choose — check the price for your own date before you pay. Buying on site costs ¥200 more for adults and ¥100 more for children and disability tickets.`,
  },
  {
    q: "Can you buy teamLab Borderless tickets at the door?",
    a: `Yes, but only while slots remain and at a surcharge: the official site listed on-site tickets at ¥200 more for adults and ¥100 more for children and disability tickets when we checked on ${CHECKED}. That makes the door a fallback rather than a plan — on weekends, holidays and evening slots the times most visitors want are gone before the day, and a sold-out calendar cannot be rescued at the counter. It is also the clearest difference from teamLab Planets in Toyosu, where the official store states nothing is sold on site at all.`,
  },
  {
    q: "Can I change the date on a teamLab Borderless ticket?",
    a: `A ticket bought direct from teamLab can have its date changed up to three times, as listed on the official site on ${CHECKED} — which is the main practical reason to buy direct rather than through a reseller if your Tokyo days are still moving around. Resellers set their own change and cancellation terms per option, and those vary, so read them on the booking page before you pay rather than assuming the official allowance carries over.`,
  },
  {
    q: "What is the difference between the Entrance Pass and the Flexible Pass?",
    a: `The Entrance Pass specifies a date and an admission time — you pick a slot at checkout and that slot is your booking. The Flexible Pass is valid on a specific date with no designated entry time, so you arrive when you arrive, and it costs a premium for that freedom. Both were listed on the official site on ${CHECKED}. If your day around Azabudai Hills is unpredictable the Flexible Pass buys back the thing a timed slot takes away; if your day is settled, the Entrance Pass is the cheaper ticket.`,
  },
  {
    q: "Is teamLab Borderless timed entry? Can I just turn up?",
    a: "The standard Entrance Pass is date- and time-specified: you choose an admission slot when you book. teamLab also sells a Flexible Pass, which is valid for a specific date with no designated entry time. Tickets are sold on site too, but at a ¥200 surcharge for adults and only while slots are still available — on weekends, holidays and evening slots they frequently aren't. Treat walk-up as a fallback, not a plan.",
  },
  {
    q: "What are teamLab Borderless opening hours?",
    a: `Hours vary by date. When we checked the official site on ${CHECKED}, the museum was listed as open 08:30–21:00, with some dates closing earlier (17:00 on 17 November 2026) and some later (22:00 on selected dates). Last entry is one hour before closing. It is also closed on scattered Tuesdays — 20 October, 24 November and 8 December 2026 among them. Always open the official calendar for your own date before you book a slot.`,
  },
  {
    q: "How long do you need at teamLab Borderless?",
    a: "Plan on about two hours. Borderless has no map and no fixed route — more than 50 artworks spread through a maze of rooms, with works that cross between spaces and change over the day — so how long you stay is genuinely up to you. Two hours is enough to see the headline rooms without rushing; art lovers and photographers often stay closer to three.",
  },
  {
    q: "Where is teamLab Borderless and how do I get there?",
    a: "It's in Azabudai Hills Garden Plaza B, on level B1, in the Toranomon 5-chome area of Minato City, Tokyo. The official access information puts it two minutes' walk from Exit 5 of Kamiyacho Station on the Tokyo Metro Hibiya line, and six minutes from Exit 4 of Roppongi-itchome Station on the Namboku line. Both stations connect to Azabudai Hills by underground passage, so you can follow the signs the whole way without going up to street level — handy in rain or summer heat.",
  },
  {
    q: "Should I book teamLab Borderless on the official site or on Klook?",
    a: "Both are legitimate: Klook is an official teamLab ticketing partner, so you're buying the same admission either way. The official site gives you the base price and lets you change your date up to three times. Klook gives you an English checkout in your own currency, reliable acceptance of foreign-issued cards, and an e-ticket sitting alongside your other bookings. If flexibility on dates matters most, buy official; if a frictionless checkout matters most, buy through Klook.",
  },
  {
    q: "teamLab Borderless or teamLab Planets — which should I book?",
    a: "They're different museums in different parts of Tokyo, not two branches of the same thing. Borderless, in Azabudai Hills, is a wandering maze of 50+ artworks that rewards time and curiosity. Planets, in Toyosu, is the barefoot one — you walk through knee-deep water and it's the easier choice with children. If you only have time for one, pick Borderless for art and photography and Planets for a physical, sensory experience with kids.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/teamlab-borderless-tickets") } });

export default function TeamLabBorderlessTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/teamlab-borderless-tickets" />
        {hreflangLinks("/guides/attractions/teamlab-borderless-tickets")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/teamlab-borderless-tickets" />
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
              route: "/guides/attractions/teamlab-borderless-tickets",
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
                { "@type": "ListItem", position: 4, name: "teamLab Borderless Tickets", item: "https://www.japan-travel-kit.com/guides/attractions/teamlab-borderless-tickets" },
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
          <span className={styles.breadCurrent}>teamLab Borderless Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            teamLab Borderless Tickets (2026):<br />Price, How to Book and Time Slots
          </h1>
          <p className={styles.heroSubtitle}>
            What a ticket to teamLab Borderless in Azabudai Hills actually costs, how the timed slots
            work, and whether to buy on the official site or through Klook.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Timed entry explained"].map((t) => (
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

        {/* The answer, in one paragraph, before anything else in the body — the hero
            subtitle above describes the page, it does not answer the question. */}
        <p className={styles.bodyText}>
          An adult ticket to <strong>teamLab Borderless</strong> in <strong>Azabudai Hills</strong> starts at{" "}
          <strong>¥3,400</strong> on the official teamLab site, and the adult tier is dynamically priced, so
          ¥3,400 is the floor rather than the price for your own date. Entry is{" "}
          <strong>date- and time-specified</strong> — the standard Entrance Pass fixes an admission slot, and a
          Flexible Pass fixes the date only — and you should <strong>allow about two hours</strong> inside a
          museum that has no map and no fixed route to hurry along. Prices, hours and closed dates on this page
          were read from the official teamLab site (teamlab.art) on {CHECKED}; because the adult figure moves
          with the calendar, confirm the amount for your date before you pay.
        </p>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Adult ticket</p>
                <p className={styles.verdictStatValue}>from ¥3,400</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Entry</p>
                <p className={styles.verdictStatValue}>Date + time slot</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Time needed</p>
                <p className={styles.verdictStatValue}>About 2 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Where</p>
                <p className={styles.verdictStatValue}>Azabudai Hills, Minato City</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Adult admission starts from ¥3,400 and is dynamically priced, so your
              date and slot decide the final figure. Tickets are date- and time-specified, buying on site costs
              ¥200 more for adults and depends on slots being left, and the museum is open roughly 08:30–21:00
              with last entry an hour before closing. Allow about two hours, and get there via Kamiyacho
              (Hibiya line, 2 minutes on foot) or Roppongi-itchome (Namboku line, 6 minutes) — both connect
              underground. Buy on the official site for the base price and up to three free date changes; buy
              through Klook for an English, own-currency checkout that accepts foreign cards.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={BORDERLESS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check teamLab Borderless Tickets →
              </KlookLink>
              <GygCompareButton slug="teamlab-borderless-tickets" listing={gygTeamlabBorderless} />
            </div>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              Prices, hours and closed dates on this page were read from the official teamLab site on {CHECKED}.
              Borderless uses dynamic pricing and a shifting calendar, so confirm both for your own date at checkout.
            </p>
          </div>
        </div>

        {/* Prices — the heading is the search query, and the first sentence is the answer. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How much are teamLab Borderless tickets in 2026?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            An adult pays <strong>from ¥3,400</strong>, a 13–17-year-old ¥2,800, a child aged 4–12 ¥1,500, and
            under-4s nothing at all. Only the adult and disability tiers move: Borderless prices those two by
            date and admission slot, which is why the official figure carries a &ldquo;from&rdquo; and why the
            cheapest ticket on your trip is a question about the calendar rather than about the seller.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Price (from)", "Moves with the date?", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.varies}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read from the official teamLab site on {CHECKED}. Tickets bought on site cost ¥200 more for adults
            and ¥100 more for children and disability tickets. Discounted tickets need proof of eligibility,
            so bring ID.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>How far the adult price moves is not published.</strong> teamLab prints a starting figure
            and a calendar, not a price list, so no honest guide can tell you what a Saturday evening in
            Borderless costs — and any page that quotes you a range for one has made it up. Treat ¥3,400 as the
            floor, open the official calendar for every date your trip could absorb, and compare the figures
            before you pay. Shifting the visit by a day is the lever here; shopping for a cheaper seller is
            not, because the date and the slot set the price.
          </p>
        </section>

        {/* Hours, the calendar and how long to allow — the table the rest of the day is
            built on, with each row's source and read date in its own column. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Before you book</span>
          <h2 className={styles.sectionTitle}>Hours, Time Slots, Closed Days and How Long You Need</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Borderless runs long days but the calendar moves around, which catches people out more often than
            the price does — the museum closes on scattered Tuesdays, and some dates shut at 17:00. Allow about
            two hours inside and don&apos;t book anything tight behind it.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "What the official site says", "Source and date"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Because hours and closures shift month to month, open the official calendar for your own travel
            dates before you commit — then book the slot. Weekday mornings are the quietest and usually the
            cheapest; weekend and evening slots are the first to disappear. The only row above that is not
            teamLab&apos;s own wording is the time to allow, and it says so: the museum publishes no figure for
            how long a visit takes, because the route is yours to choose.
          </p>
        </section>

        {/* What it is */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What you&apos;re buying</span>
          <h2 className={styles.sectionTitle}>What teamLab Borderless Actually Is</h2>
          <p className={styles.bodyText}>
            Borderless is a museum without a map. More than 50 digital artworks occupy a connected warren of
            rooms, and the works themselves move — they wander out of one space and into another, respond to
            the people in the room, and change through the day. There is no suggested route and no numbered
            stops, so two visitors on the same ticket can have genuinely different visits.
          </p>
          <p className={styles.bodyText}>
            That design is why the ticket is worth planning around. A rushed hour will get you the famous
            rooms and little else; about two hours lets you wander, double back, and find the works that only
            appear if you wait. It also means Borderless is the more adult, more photographic of Tokyo&apos;s
            two teamLab museums — see our{" "}
            <Link href="/guides/attractions/teamlab-tokyo-tickets">teamLab Planets ticket guide</Link>{" "}
            for the barefoot, walk-through-water one in Toyosu, and for what the Planets side of the decision
            looks like.
          </p>
        </section>

        {/* Worth it — a judgement on the published numbers, not on a visit we are claiming. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The decision</span>
          <h2 className={styles.sectionTitle}>Is teamLab Borderless worth it?</h2>
          <p className={styles.bodyText}>
            For anyone who likes art, photography or simply being somewhere that looks like nowhere else, yes —
            but it is a roughly two-hour attraction from ¥3,400 a head, so it is priced like an afternoon and
            consumed like a long lunch. Here is the arithmetic in front of you rather than a verdict behind it:
          </p>
          <ul className={styles.bodyList}>
            <li><strong>What you pay per hour is high.</strong> ¥3,400 for about two hours is more than twice the ¥1,500 Tokyo Tower Main Deck and above the ¥2,500 Shibuya Sky, both of which you can linger in — compare the figures on our <Link href="/guides/attractions/japan-attraction-ticket-prices">Japan attraction ticket prices</Link> table. You are paying for something you cannot see anywhere else, not for length.</li>
            <li><strong>The map-less design is the value, and the risk.</strong> More than 50 artworks with no route and no numbered stops means a rushed hour gets you the famous rooms and little else. If you only have an hour, the ticket is poor value rather than a shortened good one.</li>
            <li><strong>It is the least physical of the two.</strong> Shoes stay on, there is no water to wade and no change of clothes to pack. If the Planets format sounds like an ordeal rather than an experience, this is the same collective without it.</li>
            <li><strong>It is weatherproof and central.</strong> Azabudai Hills is two minutes underground from Kamiyacho, so a wet afternoon costs you nothing in transit — which is more than can be said for most rainy-day plans in Tokyo.</li>
            <li><strong>Getting it wrong is survivable here.</strong> Unlike Planets, Borderless does sell at the door while slots remain, so a missed booking is a ¥200 surcharge and a worse time slot rather than a lost afternoon.</li>
          </ul>
          <p className={styles.bodyText}>
            Skip it if your Tokyo days are already tight, if you would only be able to give it an hour, or if
            you are travelling with small children and can only fit one teamLab museum in — Planets is the
            easier one with them. Those are the three reasons the ticket disappoints, and none of them is about
            the art.
          </p>
        </section>

        {/* The booking decision: when to buy, whether the door is an option, and what
            moving a ticket costs. The CTA sits directly after it, because this is the
            point at which a reader has something to look up rather than read. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Availability</span>
          <h2 className={styles.sectionTitle}>Do teamLab Borderless tickets sell out?</h2>
          <p className={styles.bodyText}>
            Individual time slots do, and the popular ones go first: Borderless has run at well over a million
            visitors a year, and weekend and evening admissions are the first to disappear. What does not
            happen is a hard wall — tickets are still sold at the museum while slots remain, which makes
            Borderless more forgiving than most timed-entry attractions in Tokyo, at a price.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Our booking window:</strong> two to three weeks ahead for a weekend, a holiday or an evening slot; a few days is usually enough for a weekday morning. That is our planning guidance from how the calendar behaves, not an official figure — teamLab publishes no sell-out data.</li>
            <li><strong>Same-day and at the door:</strong> sold while slots remain, at ¥200 more for an adult and ¥100 more for a child or disability ticket. Official, read on {CHECKED}. Treat it as a fallback, not a plan: on the dates most visitors want, the slots most visitors want have gone.</li>
            <li><strong>If your date moves, change it rather than rebook:</strong> a ticket bought direct from teamLab can have its date changed up to three times. Official, read on {CHECKED}.</li>
            <li><strong>Reseller terms are their own:</strong> change and cancellation windows on Klook and GetYourGuide are set per option and vary between them, so read the terms on the booking page before you pay rather than assuming teamLab&apos;s three changes carry over.</li>
            <li><strong>The cheapest slot is a calendar question:</strong> weekday mornings are both the quietest and usually the cheapest, but teamLab publishes no price-per-slot list, so the figure for your own date only exists on the calendar itself.</li>
          </ul>
          <p className={styles.bodyText}>
            The practical order, then: pick the date, read the price it carries, then pick the seller. Only the
            first two change what you pay.
          </p>
          {/* Existing Klook CTA, unchanged, with the GetYourGuide comparison beside it. */}
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={BORDERLESS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check teamLab Borderless dates and slots →
            </KlookLink>
            <GygCompareButton slug="teamlab-borderless-tickets" listing={gygTeamlabBorderless} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook is an official teamLab ticketing partner; GetYourGuide is there as a second place to look when
            the slot you wanted has gone. Neither carries a price on this page — both price by date, so open the
            calendar rather than trusting a headline figure, including the one on this page.
          </p>
        </section>

        {/* Where to buy */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to buy</span>
          <h2 className={styles.sectionTitle}>Official Site vs Klook vs GetYourGuide vs the Door</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Klook is an official teamLab ticketing partner, so the admission is identical whichever counter you
            use. What differs is the checkout, the flexibility, and — if you leave it to the day — the price.
            GetYourGuide sells Borderless too, and the column below is thin on purpose: see the note under the
            table for what we could and could not confirm about it.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Official site", "Klook", "GetYourGuide", "On the day, on site"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyingRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.official}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.klook}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.gyg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.door}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            On-site surcharge and date-change allowance as listed on the official teamLab site on {CHECKED}.
            Cancellation and change terms on resellers vary by option — read them on the booking page before paying.
            The GetYourGuide column is deliberately short: its Borderless listing was confirmed live on{" "}
            {GYG_CHECKED_AT}, but GetYourGuide blocks automated reads of its pages, so we could not verify its
            price, its card handling or its change terms. Those cells say so instead of guessing.
          </p>
        </section>

        {/* Which route suits you */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which route suits you</span>
          <h2 className={styles.sectionTitle}>How Should You Buy?</h2>
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

        {/* How to book — the heading is the query, and the four steps are the answer. */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How do I book teamLab Borderless?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            Pick the date first, read the price that date carries, choose between a timed Entrance Pass and a
            Flexible Pass, then buy — on the official site, or through Klook if you would rather check out in
            your own currency. Four steps, and the first one is the only one that changes what you pay.
          </p>
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
            Ready to lock a slot in?{" "}
            <KlookLink href={BORDERLESS_URL} target="_blank" rel="sponsored noopener">
              Check Borderless availability and prices on Klook →
            </KlookLink>
          </p>
        </section>

        {/* The official-site question — asked often enough to deserve a heading, and the
            one claim on this page that could be confirmed first-hand on 26 Oct 2026. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Buying direct</span>
          <h2 className={styles.sectionTitle}>Where is the official teamLab Borderless ticket site?</h2>
          <p className={styles.bodyText}>
            The museum&apos;s own page is <strong>teamlab.art/e/tokyo</strong> — in English, with the Japanese
            edition at teamlab.art/jp/e/tokyo — and the ticket calendar and checkout open from there. If you
            have an older link saved, <strong>borderless.teamlab.art</strong> is no longer a separate store:
            both its English and Japanese addresses now redirect to the teamlab.art page above, which we
            confirmed on {ADDRESS_CHECKED}.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Why &ldquo;official&rdquo; matters here:</strong> the base price lives on teamLab&apos;s own calendar, and the three free date changes only exist on a ticket bought direct. A reseller sells the same admission under its own terms.</li>
            <li><strong>Who else is legitimate:</strong> Klook is an official teamLab ticketing partner, so a Klook ticket is the same admission at a different counter — not a workaround and not a markup on the gate price.</li>
            <li><strong>What direct does not buy you:</strong> a discount. The date and the slot set the adult figure, and that calendar is the same one behind every official channel.</li>
            <li><strong>What it can cost you:</strong> a refused card. A Japanese checkout is the usual reason visitors end up on a reseller, and an international checkout is a reasonable answer to that rather than a mistake.</li>
          </ul>
          <p className={styles.bodyText}>
            So: buy direct if your card works and you want the date flexibility; buy through Klook if you want
            the checkout in your own language and currency with the e-ticket alongside your other bookings.
          </p>
        </section>

        {/* Borderless vs Planets, from the Borderless side. The Planets guide carries the
            mirror of this section, and the two link to each other rather than repeating
            each other: this table is the booking arithmetic, that one is the experience. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>teamLab Borderless vs Planets: which should I book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Book Borderless if you want to look at art; book Planets if you want to walk through
            it, or if you are bringing children.</strong> Tokyo has two teamLab museums and visitors routinely
            book the wrong one. They are separate venues with separate tickets in different parts of the city,
            and the figures below are the ones that decide it. For the Planets side in full — the barefoot
            rules, the lockers, the kids&apos; policies — see our{" "}
            <Link href="/guides/attractions/teamlab-tokyo-tickets">teamLab Planets ticket guide</Link>.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "teamLab Borderless", "teamLab Planets"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vsPlanetsRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Borderless figures read from the official teamLab site on {CHECKED}; Planets figures from its own
            official ticket store on {PLANETS_CHECKED}. Both museums price adult admission by date and slot and
            both calendars change, so confirm for your own date. The time to allow on each is our planning
            guidance, not an official figure.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            If you have time for both, do them on different days: four hours of digital art in one afternoon is
            the fastest way to stop seeing any of it, and the two venues are 30 minutes apart on opposite sides
            of the city.
          </p>
        </section>

        {/* Getting there */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>Where teamLab Borderless Is</h2>
          <p className={styles.bodyText}>
            The museum sits on level B1 of Azabudai Hills Garden Plaza B, in the Toranomon 5-chome area of
            Minato City. It is not the old Odaiba Borderless — that site closed — so ignore any route that
            points you at the waterfront.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Kamiyacho Station</strong> (Tokyo Metro Hibiya line) — 2 minutes&apos; walk from Exit 5.</li>
            <li><strong>Roppongi-itchome Station</strong> (Tokyo Metro Namboku line) — 6 minutes&apos; walk from Exit 4.</li>
            <li>Both stations connect to Azabudai Hills by underground passage, so you can follow the signs the whole way without going up to street level.</li>
          </ul>
          <p className={styles.bodyText}>
            Tap in and out with a{" "}
            <Link href="/guides/transport/ic-cards-japan">Suica or Pasmo IC card</Link>{" "}
            and neither station needs any planning —{" "}
            <Link href="/guides/transport/tokyo-transportation">our Tokyo transport guide</Link>{" "}
            covers the lines in more detail.
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
            <Link href="/guides/attractions/tokyo-joypolis-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="12" rx="2" />
                  <circle cx="12" cy="10" r="2" />
                  <path d="M8 20h8M12 16v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Joypolis Tickets (2026): Passport Prices, Hours &amp; Height Limits</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Planets Tickets (2026): Prices, How to Book &amp; Planets vs Borderless</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            <h2 className={styles.ctaBannerTitle}>Book your Borderless slot</h2>
            <p className={styles.ctaBannerDesc}>
              Timed entry means the slot you want is the one that sells out. Klook is an official teamLab
              ticketing partner, with an English checkout in your own currency and an e-ticket on your phone.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={BORDERLESS_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View teamLab Borderless Tickets →
              </KlookLink>
              <GygCompareButton slug="teamlab-borderless-tickets" listing={gygTeamlabBorderless} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
