import Head from "next/head";
import Link from "next/link";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { GygCompareButton } from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { warnerBrosStudioTourTokyo, warnerBrosStudioTourSameDayPrep } from "../../../lib/klook-links";
import { gygWarnerBrosStudioTourTokyo } from "../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// Sources, all on wbstudiotour.jp:
// - /en/tickets/ — standard entry from ¥6,600 / ¥5,500 / ¥4,000, prices vary through the
//   year, non-refundable, ¥1,500 per date/time change via Visitor Services before the
//   original booking time, unauthorised and auction tickets not valid. Read 8 Nov 2026.
// - /en/ticket-information/price/ — age bands (adult 18+, junior 12–17, child 4–11, 3 and
//   under free infant ticket), group and Nerima-resident rates, tea packages. Read 8 Nov 2026.
// - /en/faqs/tickets/ — enter within 30 minutes of the slot, late arrivals moved to the next
//   available time, non-transferable. Read 8 Nov 2026.
// - /en/faqs/facilities/ — allow three to four hours, coin lockers inside and outside,
//   pushchairs, photography. Read 8 Nov 2026.
// - /en/authorised-distributors/ — Klook and GetYourGuide both listed. Read 8 Nov 2026.
// - /en/plan-your-visit/location/ — address and journey times. Read 8 Nov 2026.
// The standard-entry adult and child figures and the check date are owned by
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

/** The rules a booker needs, each read off the official site on the check date. */
const ruleRows = [
  { item: "Adult (18 and over)", value: `${P.adult} — varies by date`, source: "Tickets page" },
  { item: "Junior (12–17)", value: "¥5,500~ — varies by date", source: "Tickets page, price list" },
  { item: "Child (4–11)", value: `${P.child} — varies by date`, source: "Tickets page, price list" },
  { item: "3 and under", value: "Free — select the free infant ticket", source: "Price list" },
  { item: "Refunds", value: "Non-refundable and non-transferable", source: "Tickets FAQ" },
  { item: "Changing date or time", value: "¥1,500 each time; contact Visitor Services before the original slot", source: "Tickets page" },
  { item: "Entry window", value: "Enter within 30 minutes of your booked time", source: "Tickets FAQ" },
  { item: "Time to allow", value: "3–4 hours (no set limit)", source: "Facilities FAQ" },
  { item: "Nearest station", value: "Toshimaen, 2-minute walk", source: "Location page" },
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

/** Official site or an authorised reseller — only what each side states. */
const sellerRows = [
  {
    where: "Official site (wbstudiotour.jp)",
    lang: "Japanese and English site; a WeChat Mini Program for Chinese visitors",
    change: "Non-refundable; ¥1,500 per date/time change through Visitor Services, before the original slot",
  },
  {
    where: "Klook (authorised distributor)",
    lang: "English checkout, e-ticket on your phone",
    change: "Klook's own terms apply — they are shown on the listing for your date",
  },
  {
    where: "GetYourGuide (authorised distributor)",
    lang: "Checkout in the language of your GetYourGuide account",
    change: "GetYourGuide's own terms apply — read them on the listing",
  },
  {
    where: "On-site ticket office",
    lang: "At the entrance in Nerima",
    change: "Only if your date and time have not sold out",
  },
];

const steps = [
  {
    title: "Pick your date and arrival time first",
    desc: "Admission is timed, and the official site warns that preferred slots sell out. The official FAQ recommends allowing three to four hours, so an afternoon slot will take up your evening too. You must enter within 30 minutes of the time on your ticket.",
  },
  {
    title: "Check the price for your actual date",
    desc: `The official site lists standard entry from ¥6,600 (adult, 18+), ¥5,500 (junior, 12–17) and ¥4,000 (child, 4–11) and states that "ticket prices vary throughout the year". Ages 3 and under go free on an infant ticket. Treat the figures as floors, not fixed prices. Checked ${CHECKED}.`,
  },
  {
    title: "Decide on a tea package before you check out",
    desc: "Afternoon Tea and Evening High Tea are bought with the ticket, not added later. They roughly double the adult price, so settle it at booking rather than discovering the option on arrival.",
  },
  {
    title: "Buy from the official site or an authorised distributor only",
    desc: "The official site states that only tickets bought directly or from an authorised distributor are valid, and that tickets from unauthorised third parties, including auction sites, will not get you in. Klook and GetYourGuide are both on the official distributor list; Klook sells the same date- and time-specified admission with an English checkout and an e-ticket.",
  },
  {
    title: "Be sure of the date before you pay",
    desc: "Tickets are non-refundable. A date or time change costs ¥1,500 each time on the official booking, and has to be requested through Visitor Services before your original slot. A reseller applies its own change terms, shown on its listing.",
  },
];

const faqItems = [
  {
    q: "How much are Warner Bros. Studio Tour Tokyo tickets?",
    a: `Standard entry on the official site is listed from ¥6,600 for an adult (18+), ¥5,500 for a junior (12–17) and ¥4,000 for a child (4–11), with the site noting that "ticket prices vary throughout the year" — so these are starting prices rather than fixed ones. Ages 3 and under are free. Group tickets for parties of 20 or more are ¥6,000 / ¥5,000 / ¥3,600, and Nerima residents pay ¥5,000 / ¥4,150 / ¥3,000. Figures checked on ${CHECKED}.`,
  },
  {
    q: "Can I buy tickets on the day at the studio tour?",
    a: `The official site says tickets are available at the on-site ticket office, but adds that pre-booking is recommended because your preferred admission date and time may be sold out. That makes walk-up a fallback rather than a plan — the tour runs on timed admission, and turning up without a slot on a busy date risks no entry at all. Checked ${CHECKED}.`,
  },
  {
    q: "How long does the Warner Bros. Studio Tour Tokyo take?",
    a: `The official FAQ recommends allowing three to four hours, and says there is no set limit on how long you stay once inside. It is self-paced rather than guided, so a morning slot fills the morning and an afternoon slot will run into the evening. Plan one other thing that day, not three. Checked ${CHECKED}.`,
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
    a: `The official price list sets the bands: adult is 18 and over, junior is 12 to 17, and child is 4 to 11. Children aged 3 and under go free, but the official site asks you to select the free infant ticket when booking, so they still need one. Confirm the band again when you select tickets — the official price list is the source. Checked ${CHECKED}.`,
  },
  {
    q: "Should I visit the studio tour or a Tokyo theme park?",
    a: "They are different days out. The studio tour is an indoor, self-paced walk through film sets, with no rides and no queues for attractions once you are inside — three to four hours, in Nerima. Tokyo Disney and Universal Studios Japan are full-day parks with ride queues, timed entry systems and considerably more planning. The studio tour is the easier day to slot into an itinerary that already has other things in it.",
  },
  {
    q: "Can I use a ticket bought on an auction or resale site?",
    a: `No. The official site states that tickets bought from unauthorised third parties, including online auction sites, are not valid for entry, and that tickets are non-transferable. Buy from wbstudiotour.jp or from a seller on the official authorised-distributor list, which includes Klook and GetYourGuide. Checked ${CHECKED}.`,
  },
  {
    q: "What happens if I arrive late for my time slot?",
    a: `The official FAQ asks you to enter within 30 minutes of your booked time. If you are later than that, staff will offer the next available entry time, subject to availability on the day — and arriving after the final tour start time can mean missing parts of the tour or being refused entry. Allow for the train to Toshimaen when you pick a slot. Checked ${CHECKED}.`,
  },
  {
    q: "Can I take photos inside the studio tour?",
    a: `Yes, in most areas. The official FAQ allows photos and video on handheld cameras and phones, except in the pre-show cinema and the green-screen areas. Coin lockers are available inside and outside the building, and large suitcases are meant to go in the outdoor ones. Checked ${CHECKED}.`,
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/warner-bros-studio-tour-tokyo-tickets") },
});

const TITLE = "Harry Potter Studio Tour Tokyo Tickets 2026: Price & Booking";
const DESC =
  "Warner Bros. Studio Tour Tokyo tickets: adult ¥6,600~, child ¥4,000~, timed entry, non-refundable, ¥1,500 to change date, and the walk from Toshimaen.";

export default function WarnerBrosStudioTourTokyoTicketsPage({ updated }: { updated: PageUpdated }) {
  const muted = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;
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
            Harry Potter Studio Tour Tokyo Tickets (2026):<br />Warner Bros. Studio Tour Price &amp; How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Warner Bros. Studio Tour Tokyo — The Making of Harry Potter, in Nerima on the old Toshimaen site, is
            sold as date- and time-specified tickets: adult (18+) {P.adult}, junior (12–17) ¥5,500~ and child
            (4–11) {P.child}, varying by date, with ages 3 and under free. Tickets are non-refundable, and a date
            or time change costs ¥1,500. Toshimaen Station is a 2-minute walk, and the official advice is to
            allow three to four hours. Official figures checked {CHECKED}.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices & rules", "Access from Shinjuku"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Child entry (4–11)</p>
                <p className={styles.verdictStatValue}>¥4,000~</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Allow</p>
                <p className={styles.verdictStatValue}>3–4 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Nearest station</p>
                <p className={styles.verdictStatValue}>Toshimaen (2 min)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> book a dated, timed slot in advance from the official site or an
              authorised distributor such as Klook — preferred slots sell out, tickets are non-refundable, and
              each date change is ¥1,500. Resale and auction tickets are not valid. Prices checked on {CHECKED}.
            </p>
            <KlookLink href={warnerBrosStudioTourTokyo.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check studio tour tickets on Klook →
            </KlookLink>
          </div>
        </div>

        <EsimCtaTop />

        {/* Rules table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The rules</span>
          <h2 className={styles.sectionTitle}>What do Harry Potter Studio Tour Tokyo tickets cost, and what are the rules?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Every line below is from the official Warner Bros. Studio Tour Tokyo site, read on {CHECKED}. The
            three prices are starting points: the site says they vary through the year, so the figure for your
            date is the one shown at booking.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", `Official rule (checked ${CHECKED})`, "Where it is stated"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ruleRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={muted}>
            Sources: wbstudiotour.jp — tickets page, ticket price list, tickets FAQ, facilities FAQ and location
            page, all read {CHECKED}.
          </p>
        </section>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What is the Warner Bros. Studio Tour Tokyo?</h2>
          <p className={styles.bodyText}>
            Warner Bros. Studio Tour Tokyo — The Making of Harry Potter is a self-paced indoor walk through film
            sets, costumes and props, on the former Toshimaen amusement park site in Nerima. It was the first
            Warner Bros. Studio Tour in Asia, and it covers the sets most visitors come for: the Great Hall,
            Diagon Alley and the Hogwarts Express at Platform 9¾.
          </p>
          <p className={styles.bodyText}>
            Tokyo also has sections London does not, including a Ministry of Magic atrium with the Floo Network
            fireplaces and a green-screen Quidditch sequence. It is not a theme park: there are no rides, and
            the time you spend is reading, looking and photographing rather than queuing. It is one of the few
            Tokyo sights that has to be booked ahead —{" "}
            <Link href="/guides/attractions/things-to-do-tokyo">our things to do in Tokyo guide</Link> lists the
            others that need a dated ticket.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How much are Warner Bros. Studio Tour Tokyo tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Standard entry starts at {P.adult} for an adult, ¥5,500~ for a junior and {P.child} for a child, and
            ages 3 and under go free on an infant ticket. The tea packages bundle a sitting with the same tour.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Adult (18+)", "Junior (12–17)", "Child (4–11)"].map((h) => (
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
          <p className={styles.bodyText} style={muted}>
            Read off the official Warner Bros. Studio Tour Tokyo site on {CHECKED}. The tilde (~) is the
            official site&apos;s own notation, and it states that &ldquo;ticket prices vary throughout the
            year&rdquo; — so treat these as starting prices. The official price list page gives standard adult
            entry as a date-by-date range (¥6,300–¥7,300 on {CHECKED}), so confirm the figure for your date at
            booking. Age bands are from the official price list; children aged 3 and under need the free infant
            ticket.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Travelling with children? The{" "}
            <Link href="/guides/attractions/tokyo-itinerary-with-kids">Tokyo itinerary with kids</Link> sets out
            the other dated family tickets — Disney, LEGOLAND Discovery Center and Sanrio Puroland — so the
            studio tour date can be chosen around them.
          </p>
        </section>

        {/* Which ticket */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which ticket</span>
          <h2 className={styles.sectionTitle}>Is standard entry or a tea package better?</h2>
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
          <h2 className={styles.sectionTitle}>How do I book Harry Potter Studio Tour Tokyo tickets?</h2>
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
          <p className={styles.bodyText} style={muted}>
            The official sources checked on {CHECKED} do not give a date on which each month&apos;s tickets go on
            sale, or say which days sell out first — only that preferred dates and times may sell out. Check the
            calendar for your dates as soon as they are fixed.
          </p>
        </section>

        {/* Cancel / change */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Changes</span>
          <h2 className={styles.sectionTitle}>Can I cancel or change Harry Potter Studio Tour Tokyo tickets?</h2>
          <p className={styles.bodyText}>
            You cannot cancel for a refund: the official site states that tickets are non-refundable and
            non-transferable. You can move the date or time for ¥1,500 per change, by contacting Visitor
            Services before your original booking time. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            A ticket from an authorised reseller follows that reseller&apos;s own change terms, which are shown
            on the listing — check them for your date before you pay.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1rem" }}>
            <KlookLink href={warnerBrosStudioTourTokyo.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check studio tour tickets on Klook →
            </KlookLink>
            <GygCompareButton slug="warner-bros-studio-tour-tokyo-tickets" listing={gygWarnerBrosStudioTourTokyo} />
          </div>
        </section>

        <KlookTripPrep
          label="Same day, same booking"
          heading="What should you book for the rest of the studio tour day?"
          intro="Three to four hours in Nerima leaves the rest of the day open, and the Shinjuku route there is a subway ride. These book on the same Klook account as the ticket."
          items={warnerBrosStudioTourSameDayPrep}
        />

        {/* Authorised sellers */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to buy</span>
          <h2 className={styles.sectionTitle}>Is Klook an authorised seller for Studio Tour Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes. Klook is on the official authorised-distributor list on wbstudiotour.jp, as is GetYourGuide,
            checked {CHECKED}. The official site states that only tickets bought directly or from an authorised
            distributor are valid, and that tickets from unauthorised third parties, including online auction
            sites, will not get you in.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where", "Language and ticket", "Refunds and changes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sellerRows.map((row) => (
                    <tr key={row.where}>
                      <td className={styles.tdProvider}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.lang}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={muted}>
            Official rules and the distributor list from wbstudiotour.jp, read {CHECKED}. Reseller prices
            change with the date and currency, so none are given here — check the listing for your date.
          </p>
        </section>

        {/* Time needed */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Time needed</span>
          <h2 className={styles.sectionTitle}>How long do you need at the Harry Potter Studio Tour Tokyo?</h2>
          <p className={styles.bodyText}>
            The official FAQ recommends three to four hours, with no set limit once you are in. You have to
            enter within 30 minutes of the time on your ticket; arrive later and staff will offer the next
            available slot, subject to availability on the day. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            That makes it half a day, not a whole one. In the{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary">5-day Tokyo itinerary</Link> it fits as a
            swap for a rainy city day; on a shorter trip, fit it around the{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">3-day Tokyo itinerary</Link> by giving it
            one morning or one afternoon.
          </p>
        </section>

        {/* At the door */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>On the day</span>
          <h2 className={styles.sectionTitle}>Can you buy tickets at the door?</h2>
          <p className={styles.bodyText}>
            Sometimes. The official site says tickets are also sold at the on-site ticket office, but recommends
            pre-booking because your preferred date and time may be sold out. Without a booking you get
            whatever slot is left that day, if any. Checked {CHECKED}.
          </p>
        </section>

        {/* What to bring */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Bags and buggies</span>
          <h2 className={styles.sectionTitle}>Are there lockers, and can you bring a pushchair?</h2>
          <p className={styles.bodyText}>
            Coin-operated lockers are available both inside and outside the building, and the official FAQ asks
            for large suitcases to go in the outdoor ones. Pushchairs are welcome, with a limited number of free
            rentals at the Information Desk; wagon-style buggies and other non-standard ones are not allowed.
            Photos and video on phones and handheld cameras are allowed in most areas, but not in the pre-show
            cinema or the green-screen areas. Checked {CHECKED}.
          </p>
        </section>

        {/* Access */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How do I get to Warner Bros. Studio Tour Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Take the Toei Oedo Line from Shinjuku (20 minutes) or the Seibu Ikebukuro Line from Ikebukuro (17
            minutes) to Toshimaen, then walk two minutes. The address is 1-1-7 Kasugacho, Nerima-ku, Tokyo
            179-0074 — north-west Tokyo, well outside the Yamanote loop.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["From", "Route", `Time (checked ${CHECKED})`].map((h) => (
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
            operator runs what. A hotel on the Oedo Line makes the trip a single ride;{" "}
            <Link href="/guides/attractions/where-to-stay-in-tokyo">where to stay in Tokyo</Link> compares the
            main areas, Shinjuku among them.
          </p>
          <p className={styles.bodyText} style={muted}>
            Address and journey times from the official site&apos;s location page, checked {CHECKED}.
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
            <Link href="/guides/attractions/teamlab-planets-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Planets Tickets (2026): Price, Hours and How to Book</p>
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
