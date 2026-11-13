import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { teamlabBorderlessTicketUrl, teamlabBorderlessTripPrep } from "../../../lib/klook-links";
import { GygCompareButton } from "../../../components/GygCompare";
import { gygTeamlabBorderless, GYG_CHECKED_AT } from "../../../lib/gyg-links";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// CTA link — Klook affiliate redirect (teamLab Borderless admission ticket), shared with
// the ticket price table.
const BORDERLESS_URL = teamlabBorderlessTicketUrl;

// The adult and child figures are owned by lib/attraction-prices.ts, which also feeds
// the ticket price table. On 13 November 2026 (task-jtk-20261113-R01) the prices, the
// Flexible Pass, the hours and closed days were re-read off the server-rendered
// teamlab.art/e/tokyo/ page, and the sale window, time needed, cancellation, re-entry
// and child rules off the FAQPage data of teamlab.art/faq/tokyo/ — so this page carries
// that date. The shared record keeps its own date for the other pages that use it.
const P = PRICES.teamlabBorderless;
const CHECKED_ISO = "2026-11-13";
const CHECKED = checkedLabel(CHECKED_ISO);
const OFFICIAL_URL = "https://www.teamlab.art/e/tokyo/";
const FAQ_URL = "https://www.teamlab.art/faq/tokyo/";

// The Planets column of the Borderless-vs-Planets table has its own record and its own
// date — that store is server-rendered and was re-read on 25 October 2026.
const PLANETS = PRICES.teamlabPlanets;
const PLANETS_CHECKED = checkedLabel(PLANETS.checked);

// The one thing that *was* confirmed first-hand on 26 October 2026: where the official
// ticket address now points. See the "official ticket site" section below.
const ADDRESS_CHECKED = checkedLabel("2026-10-26");

// The headline search term is "teamLab Borderless tickets", so it stays verbatim and
// first in the title, the H1 and the description. This page is the Borderless booking
// page; "Planets or Borderless?" belongs to teamlab-tokyo-tickets (13 Nov 2026).
const TITLE = "teamLab Borderless Tickets 2026: Price, Slots & How to Book";
const H1 = "teamLab Borderless Tickets 2026: Price, Time Slots & How to Book";
const DESC =
  "teamLab Borderless tickets 2026: adults from ¥3,400 by date and time slot, sales open about 2 months ahead, 1.5–2 hours inside. How to book, then compare.";

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
  {
    ticket: "Flexible Pass (no entry time)",
    price: "¥12,000",
    varies: "Listed as one adult / child price",
    note: "Valid all day on the date you pick, up to last entry",
  },
  {
    ticket: "Bought on site",
    price: "+¥200 adult",
    varies: "—",
    note: "Only while slots remain; the official page lists different on-site prices",
  },
];

// The sale window and what happens after you buy — every row is teamLab's own wording,
// read off the official FAQ, except the worked example, which is that rule applied.
const saleRows = [
  {
    item: "When tickets go on sale",
    detail: "Around the 1st of the month, two months before your admission date",
    source: "teamlab.art FAQ",
  },
  {
    item: "Worked example",
    detail: "Visiting in January 2027 → sales open around 1 November 2026; February 2027 → around 1 December 2026",
    source: "The FAQ rule applied",
  },
  {
    item: "Do they sell out?",
    detail: "Yes — teamLab says tickets can sell out and recommends buying as soon as your dates are set",
    source: "teamlab.art FAQ",
  },
  {
    item: "Same-day tickets",
    detail: "On the official ticket site if not sold out; on site too, at a different price",
    source: "teamlab.art FAQ",
  },
  {
    item: "Cancellation",
    detail: "In general, tickets cannot be cancelled once purchased",
    source: "teamlab.art FAQ",
  },
  {
    item: "Changing the date",
    detail: "Official tickets only: up to 3 times, until 2 hours before your entry time (Flexible Pass: 2 hours before last entry)",
    source: "teamlab.art FAQ",
  },
  {
    item: "Bought on Klook or elsewhere",
    detail: "The reseller's own terms apply — teamLab says to check them",
    source: "teamlab.art FAQ",
  },
];

// Hours, the calendar and the slot mechanics in one table, because these are the figures
// the rest of your day is built on. Every row carries the source it was read off and the
// date it was read — including the one row that is ours rather than teamLab's.
const hoursRows = [
  {
    item: "Time to allow",
    detail: "About 1.5–2 hours — teamLab gives an average of about an hour and a half, and \"about 2 hours\"; there is no time limit, and no re-entry",
    source: `teamlab.art FAQ, ${CHECKED}`,
  },
  { item: "Opening hours", detail: "Listed 08:30–21:00, varying by date", source: `teamlab.art, ${CHECKED}` },
  { item: "Last entry", detail: "One hour before closing — a 21:00 close means in by 20:00", source: `teamlab.art, ${CHECKED}` },
  {
    item: "Shorter and longer days",
    detail: "22:00 close on 2, 5, 6, 9, 12, 13 November and 26–30 December 2026; 17:00 close on 26 January 2027",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "Closed days",
    detail: "Tuesday 24 November and Tuesday 8 December 2026; Wednesday 13 January and Tuesday 19 January 2027",
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
    detail: "Sold at the museum while slots remain, at +¥200 for an adult",
    source: `teamlab.art, ${CHECKED}`,
  },
];

// Borderless against Planets, from the Borderless side. The deep comparison of what the
// two museums *are* lives on the Planets guide; this table is the booking arithmetic.
const vsPlanetsRows = [
  {
    factor: "Where",
    borderless: "Azabudai Hills, Minato City — 2 min from Kamiyacho",
    planets: "Toyosu — 3 min from Shin-Toyosu",
  },
  { factor: "Adult ticket", borderless: `${P.adult}, by date and slot`, planets: `${PLANETS.adult}, by date and slot` },
  { factor: "Ages 4–12", borderless: P.child ?? "—", planets: PLANETS.child ?? "—" },
  {
    factor: "What you do",
    borderless: "Walk a map-less maze of about 70 artworks, shoes on",
    planets: "Barefoot, through water that reaches adult knee height",
  },
  {
    factor: "What to wear",
    borderless: "Anything; teamLab suggests white or bright solid colours for photos",
    planets: "Trousers that roll up above the knee — the water is knee-deep",
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
  { factor: "Time to allow", borderless: "About 1.5–2 hours (official FAQ)", planets: "About 1.5–2 hours" },
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
    door: "+¥200 adult; other on-site prices also differ",
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
    desc: "You're visiting on a weekend, a holiday or in an evening slot. On-site tickets cost ¥200 more for an adult and only exist while slots remain — which, at the times most visitors want, they often don't.",
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
    title: "Buy once your dates are set — sales open about two months out",
    desc: "Tickets go on sale around the 1st of the month, two months before the admission date, and teamLab's own advice is to buy as soon as your dates are fixed because tickets can sell out. Weekend and evening slots are the ones to secure first.",
  },
  {
    title: "Show the ticket on your phone, and allow 1.5–2 hours",
    desc: "An official ticket opens from the link in the confirmation email — no printing needed if you have a phone. There's no time limit once inside and no re-entry, and teamLab puts a visit at about 1.5–2 hours. Strollers go in the luggage room, and Kamiyacho and Roppongi-itchome both connect underground.",
  },
];

// Five questions, each one a query that already lands on this page in Search Console
// (28 days to 10 Nov 2026). The older questions — the door, date changes, the two
// passes, hours, location, official vs Klook, Planets — are answered in the body.
const faqItems = [
  {
    q: "How do I book teamLab Borderless timed-entry tickets?",
    a: `Pick a date on the official ticket calendar (teamlab.art/e/tokyo) or on Klook, which teamLab lists as its other official sales site, check the adult price that date carries, then choose an admission time for an Entrance Pass — or a ¥12,000 Flexible Pass with no fixed entry time. Pay by card (the official site also takes PayPay) and the ticket arrives as a link in the confirmation email that you show on your phone at the entrance. Prices and rules as listed on the official site on ${CHECKED}.`,
  },
  {
    q: "When do teamLab Borderless tickets go on sale?",
    a: `Around the 1st of the month, two months before your admission date — so a January 2027 visit goes on sale around 1 November 2026. teamLab's FAQ, read on ${CHECKED}, says tickets can sell out and recommends buying as soon as your dates are set; same-day tickets are sold online or on site only if any remain.`,
  },
  {
    q: "How much do teamLab Borderless tickets cost online?",
    a: `On the official ticket site, checked on ${CHECKED}: adults (18+) from ¥3,400, ages 13–17 ¥2,800, ages 4–12 ¥1,500, children 3 and under free, and visitors with a disability from ¥1,700 (one companion at the same rate). Adult and disability prices change with the date and time slot, so ¥3,400 is the floor. The Flexible Pass is ¥12,000, and buying on site costs ¥200 more for an adult.`,
  },
  {
    q: "How long do you need at teamLab Borderless?",
    a: `About 1.5 to 2 hours. teamLab's FAQ, read on ${CHECKED}, gives an average visit of about an hour and a half and also says a visit takes about 2 hours; there is no time limit, you do not have to leave when the next slot starts, and re-entry is not permitted.`,
  },
  {
    q: "Do children under 4 need a ticket for teamLab Borderless?",
    a: `No — children aged 3 and under enter free, and there is no minimum age; ages 4–12 pay ¥1,500. Children of elementary-school age and below must be with an adult aged 18 or over, at one adult for every five children (free under-4s included), and strollers are not allowed inside — they go in the luggage room. Official FAQ, read on ${CHECKED}.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/teamlab-borderless-tickets") } });

export default function TeamLabBorderlessTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
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
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            What a ticket to teamLab Borderless in Azabudai Hills costs, when each month&apos;s tickets go on
            sale, how the timed slots work, and whether to buy on the official site or through Klook.
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
          <strong>teamLab Borderless tickets</strong> cost from <strong>¥3,400</strong> for adults, ¥2,800 for
          ages 13–17 and ¥1,500 for ages 4–12 on the official site, and children 3 and under enter free; the
          adult price rises on busier dates and time slots. Each Entrance Pass is for a set date and{" "}
          <strong>admission time</strong>, and tickets <strong>go on sale around the 1st of the month, two
          months before</strong> the visit date — around 1 November 2026 for a January 2027 visit. teamLab puts
          a visit at <strong>about 1.5–2 hours</strong>, with no time limit once you are inside.
        </p>
        <p className={styles.bodyText}>
          All figures were read from the official teamLab site and its FAQ on {CHECKED}. Still choosing which
          museum to book? The{" "}
          <Link href="/guides/attractions/teamlab-tokyo-tickets">teamLab Planets vs Borderless comparison</Link>{" "}
          answers that; this page is about booking Borderless itself.
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
                <p className={styles.verdictStatValue}>About 1.5–2 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>On sale</p>
                <p className={styles.verdictStatValue}>~1st of the month, 2 months ahead</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Adult admission starts from ¥3,400 and is dynamically priced, so your
              date and slot decide the final figure. Tickets are date- and time-specified, cannot be cancelled,
              and can sell out; buying on site costs ¥200 more for an adult and depends on slots being left. The
              museum is open roughly 08:30–21:00 with last entry an hour before closing. Allow 1.5–2 hours, and get there via Kamiyacho
              (Hibiya line, 2 minutes on foot) or Roppongi-itchome (Namboku line, 6 minutes) — both connect
              underground. Buy on the official site for the base price and up to three free date changes; buy
              through Klook for an English, own-currency checkout that accepts foreign cards.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={BORDERLESS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Book teamLab Borderless tickets →
              </KlookLink>
              <GygCompareButton slug="teamlab-borderless-tickets" listing={gygTeamlabBorderless} />
            </div>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              Prices, hours and closed dates on this page were read from the official teamLab site on {CHECKED}.
              Borderless uses dynamic pricing and a shifting calendar, so confirm both for your own date at checkout.
            </p>
          </div>
        </div>

        {/* Directly under the existing Borderless CTA: what else to book for the same day. */}
        <KlookTripPrep
          label="Book the same day"
          heading="What else should you book for a teamLab Borderless day?"
          headingLevel={3}
          intro="A timed slot fixes where you need to be and when. These three book on the same Klook account as the ticket: a room near Azabudai Hills, the subway pass for both access stations, and data for the e-ticket."
          items={teamlabBorderlessTripPrep()}
        />

        <BookingEsimCard />

        <EsimCtaTop />

        {/* Prices — the heading is the search query, and the first sentence is the answer. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How much do teamLab Borderless tickets cost online?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Online, an adult pays <strong>from ¥3,400</strong>, a 13–17-year-old ¥2,800, a child aged 4–12
            ¥1,500, and under-4s nothing at all; the Flexible Pass is ¥12,000. Only the adult and disability tiers
            move: Borderless prices those two by date and admission slot, which is why the official figure
            carries a &ldquo;from&rdquo; and why the cheapest ticket on your trip is a question about the
            calendar rather than about the seller.
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
            Last checked: {CHECKED_ISO} —{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">teamlab.art/e/tokyo</a>. Tickets
            bought on site cost ¥200 more for an adult. Discounted tickets need proof of eligibility, so bring ID.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.2rem", marginTop: "2rem" }}>
            Do children under 4 need a ticket?
          </h3>
          <p className={styles.bodyText}>
            No. Children aged 3 and under enter free and there is no minimum age, but every child of
            elementary-school age or younger needs an adult aged 18 or over with them — one adult for every five
            children, free under-4s included. Strollers are not allowed inside and go in the luggage room
            (official FAQ, {CHECKED}).
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
          <h2 className={styles.sectionTitle}>How long do you need at teamLab Borderless?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            About 1.5 to 2 hours: teamLab gives an average visit of about an hour and a half, there is no time
            limit, and you do not have to leave when the next slot begins — but there is no re-entry. The
            calendar catches people out more often than the clock does: the museum closes on scattered days and
            some dates shut early or late, so check the table before you pick a slot.
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
            Last checked: {CHECKED_ISO} —{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">teamlab.art/e/tokyo</a> (hours,
            closures, passes) and{" "}
            <a href={FAQ_URL} target="_blank" rel="noopener noreferrer">teamlab.art/faq/tokyo</a> (time to
            allow). Hours and closures shift month to month, so open the official calendar for your own dates
            before you book the slot.
          </p>
        </section>

        {/* What it is */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What you&apos;re buying</span>
          <h2 className={styles.sectionTitle}>What teamLab Borderless Actually Is</h2>
          <p className={styles.bodyText}>
            Borderless is a museum without a map. About 70 artworks occupy a connected warren of
            rooms, and the works themselves move — they wander out of one space and into another, respond to
            the people in the room, and change through the day. There is no suggested route and no numbered
            stops, so two visitors on the same ticket can have genuinely different visits.
          </p>
          <p className={styles.bodyText}>
            That design is why the ticket is worth planning around. A rushed hour will get you the famous
            rooms and little else; 1.5–2 hours lets you wander, double back, and find the works that only
            appear if you wait. It also means Borderless is the more adult, more photographic of Tokyo&apos;s
            two teamLab museums — see our{" "}
            <Link href="/guides/attractions/teamlab-planets-tickets">teamLab Planets ticket guide</Link>{" "}
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
            <li><strong>What you pay per hour is high.</strong> ¥3,400 for 1.5–2 hours is more than twice the ¥1,500 Tokyo Tower Main Deck and above Shibuya Sky&apos;s {PRICES.shibuyaSky.adult.split(" / ")[0]} daytime online ticket, both of which you can linger in — compare the figures on our <Link href="/guides/attractions/japan-attraction-ticket-prices">Japan attraction ticket prices</Link> table. You are paying for something you cannot see anywhere else, not for length.</li>
            <li><strong>The map-less design is the value, and the risk.</strong> About 70 artworks with no route and no numbered stops means a rushed hour gets you the famous rooms and little else. If you only have an hour, the ticket is poor value rather than a shortened good one.</li>
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
          <h2 className={styles.sectionTitle}>When do teamLab Borderless tickets go on sale?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Around the 1st of the month, two months before the admission date — so January 2027 dates open
            around 1 November 2026. teamLab says tickets can sell out and advises buying as soon as your dates are
            set, and an official ticket cannot be cancelled, only moved to another date.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "What teamLab says", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {saleRows.map((row) => (
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
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {CHECKED_ISO} —{" "}
            <a href={FAQ_URL} target="_blank" rel="noopener noreferrer">teamlab.art/faq/tokyo</a>. teamLab
            publishes no figure for how many days ahead a given slot fills, so none is given here.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Plan the purchase, not only the visit:</strong> if your trip is in a month whose sales open while you are still deciding, the release day is the date to put in your calendar.</li>
            <li><strong>Same-day is a fallback:</strong> online or on site only if any remain, and the on-site adult price is ¥200 higher.</li>
            <li><strong>If your date moves, change it rather than rebook:</strong> an official ticket can be moved up to three times, at least 2 hours before the booked entry time; if the new date costs more you pay the new price and the old one is refunded.</li>
            <li><strong>Reseller terms are their own:</strong> change and cancellation windows on Klook and GetYourGuide are set per option, so read them on the booking page before you pay rather than assuming teamLab&apos;s three changes carry over.</li>
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
            table for what is and is not confirmed about it.
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
            {GYG_CHECKED_AT}, but its price, its card handling and its change terms are not verified here, so
            check them on the listing. Those cells say so instead of guessing.
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
          <h2 className={styles.sectionTitle}>How do I book teamLab Borderless timed-entry tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            Pick the date first, read the price that date carries, choose an admission time on an Entrance Pass
            (or the ¥12,000 Flexible Pass with no fixed time), then buy — on the official site, or on Klook,
            which teamLab lists as its other official sales site. Four steps, and the first one is the only one
            that changes what you pay.
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
            both its English and Japanese addresses now redirect to the teamlab.art page above, as
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
            <Link href="/guides/attractions/teamlab-planets-tickets">teamLab Planets ticket guide</Link>.
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
            both calendars change, so confirm for your own date. The Borderless time to allow is from the
            official FAQ; the Planets one is planning guidance, not an official figure.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            If you have time for both, do them on different days: four hours of digital art in one afternoon is
            the fastest way to stop seeing any of it, and the two venues are 30 minutes apart on opposite sides
            of the city. Still choosing between them? Our{" "}
            <Link href="/guides/attractions/teamlab-tokyo-tickets">teamLab Tokyo tickets comparison</Link> sets out
            the cost of one museum or both, ticket by ticket.
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

        <EsimCtaBottom />

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
            {/* Added 29 Oct 2026: the fifth venue, and the one furthest from
                Tokyo in both geography and format. */}
            <Link href="/guides/attractions/teamlab-fukuoka-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21c0-6 3-9 7-10-1 5-3 8-7 10z" />
                  <path d="M12 21c0-6-3-9-7-10 1 5 3 8 7 10z" />
                  <path d="M12 21V11" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Fukuoka Tickets 2026: Price, Hours &amp; Booking</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-kyoto-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Kyoto Tickets: Prices, Hours &amp; Booking</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-botanical-garden-osaka-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21c0-6 3-9 7-10-1 5-3 8-7 10z" />
                  <path d="M12 21c0-6-3-9-7-10 1 5 3 8 7 10z" />
                  <path d="M12 21V11" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Botanical Garden Osaka Tickets: Prices &amp; Hours</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            <Link href="/guides/attractions/teamlab-planets-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Planets Tickets (2026): Price, Hours and How to Book</p>
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
