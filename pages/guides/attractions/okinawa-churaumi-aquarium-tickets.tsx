import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookLink from "../../../components/KlookLink";
import { GygCompareButton } from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import {
  churaumiAquariumTicket,
  churaumiKouriNorthernDayTour,
  churaumiSameDayPrep,
  nahaAirportCarRental,
  nahaAirportLimousineBus,
  okinawaChuraumiStayAreas,
  okinawaManzamoKouriChuraumiTour,
} from "../../../lib/klook-links";
import { gygChuraumiAquarium } from "../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Okinawa Churaumi Aquarium tickets. Added 3 Nov 2026 (task jtk-20261103-01), the first
 * Okinawa page on this site; rank rewrite 22 Nov 2026 (task jtk-20261122-R08) after the
 * search result showed the slug in place of the old price-and-hours title.
 *
 * Re-read on 22 November 2026:
 *   churaumi.okinawa/en/guide/info/   Adult ¥2,180, high-school ¥1,440, elementary and
 *                                     junior-high ¥710, under 6 free; groups of 20+ ¥1,730 /
 *                                     ¥1,140 / ¥560, day of admission only; annual passport
 *                                     ¥4,360 / ¥2,880 / ¥1,420. The after-16:00 ticket
 *                                     (¥1,510 / ¥1,000 / ¥490) is marked as no longer sold,
 *                                     ended Friday 31 March 2023.
 *   churaumi.okinawa/en/guide/hour/   Off season 8:30–18:30, last entry 17:30; peak ① 8:30–20:00
 *                                     on 25 Apr – 6 May and 18 – 31 Jul 2026; peak ② 8:30–21:00
 *                                     in August 2026; year-end 8:30–18:30; no scheduled closing
 *                                     days until 31 Mar 2027 (typhoon closures possible).
 *   okinawa-hokubu.org (Japan Entertainment, the JUNGLIA operator) — the Churaumi Aquarium
 *                                     set with JUNGLIA's "Furatto Ticket": adult ¥5,150, high
 *                                     school ¥4,410, junior high ¥3,680, elementary ¥2,690,
 *                                     preschool ¥1,980; free park tram, priority-lane entry.
 *   prtimes.jp release 000000034.000148025 (Japan Entertainment, 30 Mar 2026) — the launch
 *                                     version with a JUNGLIA afternoon ticket: ¥6,800 / ¥6,060 /
 *                                     ¥5,330 / ¥4,010 / ¥3,300, sold on asoview, use within one
 *                                     month of purchase, the two can be on different days.
 *   junglia.jp/ticket/furatto-ticket  One standby attraction plus shows, about 3 hours; the
 *                                     stand-alone price is labelled as the Japan-resident price.
 *   yanbaru-expressbus.com timetable PDF 260109-time-d — Naha Airport to 記念公園前 / Royal View
 *                                     Hotel Churaumi (aquarium) ¥2,000; e.g. 10:10 → 12:27.
 *
 * Read on 3 November 2026 and not changed since: the access page (about two hours by car,
 * about three by express bus; Okinawa Airport Shuttle, Yanbaru Express, routes 111 and 117),
 * the feeding schedule, the Okichan Theater times, Emerald Beach and the backyard tour.
 *
 * Nothing here is first-hand. No Klook price appears. The Klook JUNGLIA listing that bundles
 * the aquarium (141671) surfaced only without a locale, so it is not linked.
 */
const CHECKED = checkedLabel("2026-11-22");
const CHECKED_ISO = "2026-11-22";
const PROGRAMMES = checkedLabel("2026-11-03");
const ROUTE = "/guides/attractions/okinawa-churaumi-aquarium-tickets";
const SLUG = "okinawa-churaumi-aquarium-tickets";

const priceRows = [
  { ticket: "Adult", standard: "¥2,180", after16: "Not sold", group: "¥1,730", annual: "¥4,360" },
  { ticket: "High-school student", standard: "¥1,440", after16: "Not sold", group: "¥1,140", annual: "¥2,880" },
  { ticket: "Elementary & junior-high student", standard: "¥710", after16: "Not sold", group: "¥560", annual: "¥1,420" },
  { ticket: "Preschool (under 6)", standard: "Free", after16: "Free", group: "Free", annual: "—" },
];

const hoursRows = [
  { season: "Off season (most of the year)", hours: "8:30–18:30", last: "17:30" },
  { season: "Peak ① — 25 Apr – 6 May and 18 – 31 Jul 2026", hours: "8:30–20:00", last: "19:00" },
  { season: "Peak ② — 1 – 31 Aug 2026", hours: "8:30–21:00", last: "20:00" },
  { season: "Year-end and New Year", hours: "8:30–18:30", last: "17:30" },
  { season: "Closed", hours: "No scheduled closing days until 31 Mar 2027", last: "Typhoon closures possible" },
];

const accessRows = [
  {
    how: "Rental car from Naha Airport (fastest)",
    time: "About 2 hours, via the Okinawa Expressway",
    fare: "Rental + fuel + expressway toll; parking free",
    note: "Ocean Expo Park's nine car parks are free. The only option that adds Kouri Island and Bise the same afternoon at your own pace.",
  },
  {
    how: "Yanbaru Express Bus (cheapest without driving)",
    time: "About 2 h 20 min — e.g. 10:10 Naha Airport → 12:27 at the aquarium stop",
    fare: "¥2,000 adult, Naha Airport to the aquarium",
    note: "No reservation; board at the stop. Stops: Kinen Koen-mae (Central Gate) and Royal View Hotel Churaumi (Aquarium). Expressway traffic can delay it.",
  },
  {
    how: "Okinawa Airport Shuttle, routes 111 / 117",
    time: "About 3 hours (the aquarium's figure for the express bus)",
    fare: "Check the operator's fare page",
    note: "Named on the aquarium's access page as the other bus options from Naha Airport.",
  },
  {
    how: "Day tour from Naha or Chatan",
    time: "A full day (Klook's northern tour runs about 10 hours)",
    fare: "Tour price on Klook; check whether the ticket is included",
    note: "Coach there and back with Kouri Island, Cape Manzamo and American Village; about 3 to 3.5 hours at the aquarium.",
  },
];

const comboRows = [
  {
    version: "Churaumi + JUNGLIA “Furatto Ticket” set (on sale now)",
    adult: "¥5,150",
    teen: "High school ¥4,410 · junior high ¥3,680",
    child: "Elementary ¥2,690 · preschool ¥1,980",
    what: "Aquarium admission + JUNGLIA Furatto Ticket (one standby attraction plus shows, about 3 hours); free park tram, priority-lane entry",
  },
  {
    version: "Launch version with a JUNGLIA afternoon ticket (30 Mar 2026)",
    adult: "¥6,800",
    teen: "High school ¥6,060 · 12+ to junior high ¥5,330",
    child: "Grade 1 to age 11 ¥4,010 · age 4 to preschool ¥3,300",
    what: "Aquarium admission + JUNGLIA afternoon ticket (entry from 13:00 or 14:00 by closing time); use within one month, different days allowed",
  },
];

const compareRows = [
  { factor: "Who drives", tour: "Nobody in your group", self: "One of you, on the left, for about 2 hours each way" },
  { factor: "Time at the aquarium", tour: "Fixed — about 3 to 3.5 hours", self: "As long as you like, from 8:30" },
  { factor: "Kouri Island & Bise", tour: "Kouri Island and Cape Manzamo on the route", self: "Both, in the order you choose" },
  { factor: "Aquarium ticket", tour: "Check the option — some include it, some do not", self: "Buy separately (¥2,180 adult)" },
  { factor: "Paperwork", tour: "None", self: "Your licence plus an International Driving Permit, passport and a credit card" },
  { factor: "Best for", tour: "Non-drivers, solo travellers, one day in the north", self: "Families, and anyone staying a night in Motobu" },
];

const faqItems = [
  {
    q: "How much is the Churaumi Aquarium ticket?",
    a: `¥2,180 for an adult, ¥1,440 for a high-school student, ¥710 for elementary and junior-high students, and free under 6 — the aquarium's own prices, tax included, read on ${CHECKED}. Groups of 20 or more pay ¥1,730 / ¥1,140 / ¥560 on the day only, and an annual passport is ¥4,360 for an adult, the price of two visits.`,
  },
  {
    q: "Is there a discount after 4pm at Churaumi Aquarium?",
    a: `No. The aquarium's fee page states that the after-16:00 ticket (¥1,510 adult) stopped being sold after 31 March 2023, so the standard ¥2,180 applies whatever time you arrive. Read ${CHECKED}.`,
  },
  {
    q: "Can I buy Churaumi tickets at the door?",
    a: "Yes. Standard tickets are sold at the aquarium ticket desk on the day, by card or cash, and there is no time slot to reserve. The official site also links to web tickets through asoview, and resellers such as Klook sell an e-ticket scanned at the gate; a reseller sets its own validity and cancellation terms.",
  },
  {
    q: "How do I get to Churaumi Aquarium from Naha?",
    a: `About two hours by car from Naha Airport on the Okinawa Expressway, or by bus: the Yanbaru Express Bus takes about 2 hours 20 minutes from Naha Airport and costs ¥2,000 for an adult on its January 2026 timetable, and the aquarium gives about three hours for the express buses in general. A day tour from Naha or Chatan is the option where nobody drives. Read ${CHECKED}.`,
  },
  {
    q: "Is there a Churaumi and JUNGLIA combo ticket?",
    a: `Yes. JUNGLIA's operator, Japan Entertainment, sells a set with the aquarium: ¥5,150 for an adult with JUNGLIA's short "Furatto Ticket" on its northern Okinawa portal, read ${CHECKED}. The version launched on 30 March 2026 paired the aquarium with a JUNGLIA afternoon ticket for ¥6,800, sold on asoview and valid for one month. The two are about 30 minutes apart by car.`,
  },
];

const TITLE = "Churaumi Aquarium Tickets 2026: Price, Hours & JUNGLIA Combo";
const DESCRIPTION =
  "Okinawa Churaumi Aquarium ticket price: ¥2,180 adult, ¥710 child, no 4pm discount. Open 8:30–18:30, 2h from Naha by car, ¥2,000 bus, JUNGLIA combo.";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const thStyle = { fontSize: "0.82rem" } as const;
const tdSmall = { fontSize: "0.88rem" } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;
const linkStyle = { color: "var(--text)", textDecoration: "underline" } as const;

export default function OkinawaChuraumiAquariumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`https://www.japan-travel-kit.com${ROUTE}`} />
        {hreflangLinks(ROUTE)}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={`https://www.japan-travel-kit.com${ROUTE}`} />
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
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, updated }),
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
                { "@type": "ListItem", position: 4, name: "Churaumi Aquarium Tickets", item: `https://www.japan-travel-kit.com${ROUTE}` },
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Churaumi Aquarium Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Churaumi Aquarium Tickets 2026: Price, Hours &amp; JUNGLIA Combo
          </h1>
          <p className={styles.heroSubtitle}>
            Okinawa&apos;s whale shark aquarium, two hours north of Naha: the official ticket prices, the season hours,
            the bus and car times from Naha, and the new set ticket with JUNGLIA OKINAWA.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices, checked", "Car vs bus vs tour", "JUNGLIA combo"].map((t) => (
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

        {/* Lead */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>Okinawa Churaumi Aquarium tickets</strong> cost <strong>¥2,180</strong> for an adult,{" "}
            <strong>¥1,440</strong> for a high-school student and <strong>¥710</strong> for elementary and
            junior-high students (under 6 free), and there is no after-4pm discount — that ticket ended in March 2023.
            The aquarium is open <strong>8:30–18:30</strong> (last entry 17:30) for most of the year, later over Golden
            Week, late July and August. From Naha Airport it is <strong>about 2 hours by car</strong> or about 2 hours
            20 minutes on the Yanbaru Express Bus for <strong>¥2,000</strong>. Prices, hours and the bus fare are the
            operators&apos; own, read on {CHECKED}.
          </p>
        </section>

        {/* Quick answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Adult / child</p>
                <p className={styles.verdictStatValue}>¥2,180 / ¥710</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hours</p>
                <p className={styles.verdictStatValue}>8:30–18:30, last entry 17:30</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Naha Airport</p>
                <p className={styles.verdictStatValue}>~2 h by car · ¥2,000 bus</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JUNGLIA combo</p>
                <p className={styles.verdictStatValue}>From ¥5,150 adult</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> the ticket sells at the door, so the decision is how you get there. Drive if
              you are a family or staying in Motobu; book a northern day tour from Naha if nobody wants to drive.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={churaumiKouriNorthernDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check the northern day tour →
              </KlookLink>
              <KlookLink href={churaumiAquariumTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
                Aquarium ticket on Klook →
              </KlookLink>
              <GygCompareButton slug={SLUG} listing={gygChuraumiAquarium} />
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How Much Is the Churaumi Aquarium Ticket?</h2>
          <p className={styles.bodyText}>
            ¥2,180 for an adult and ¥710 for an elementary or junior-high child; under-6s are free. There is no
            after-16:00 rate any more, group rates need 20 or more people paying together on the day, and the annual
            passport costs the same as two visits.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Standard", "After 16:00", "Group (20+, day only)", "Annual passport"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.standard}</td>
                      <td style={tdSmall}>{row.after16}</td>
                      <td className={styles.tdPrice}>{row.group}</td>
                      <td className={styles.tdPrice}>{row.annual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO} —{" "}
            <a href="https://churaumi.okinawa/en/guide/info/" target="_blank" rel="noopener" style={linkStyle}>churaumi.okinawa/en/guide/info/</a>.
            Tax included. The fee page states the after-16:00 ticket (¥1,510 adult) was sold until 31 March 2023 and
            is no longer available, so guides that still quote it are out of date.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={churaumiAquariumTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Churaumi Aquarium ticket on Klook →
            </KlookLink>
            <KlookLink href={okinawaManzamoKouriChuraumiTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Churaumi &amp; Kouri Island tour from Naha →
            </KlookLink>
          </div>
        </section>

        {/* Door */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Can I Buy Churaumi Tickets at the Door?</h2>
          <p className={styles.bodyText}>
            Yes — the aquarium sells standard tickets at its ticket desk on the day, by card or cash, and there is no
            time slot to book. Buying ahead saves the counter queue and, with a reseller, lets you pay in your own
            currency; the official site also links to web tickets through asoview. What does need booking is the paid
            Kuroshio Sea backyard tour, by advance reservation only from 1 November 2026, opening 30 days ahead at
            10:00. In summer and holiday weeks, the rental car and the day tour are what fill up first, not the ticket.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={churaumiAquariumTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check Churaumi tickets on Klook →
            </KlookLink>
            <GygCompareButton slug={SLUG} listing={gygChuraumiAquarium} />
          </div>
        </section>

        <KlookTripPrep
          label="Book for the same day"
          heading="What to Book Alongside Your Churaumi Ticket"
          intro="The ticket is one line of the day. Getting two hours north of Naha — and back — is the rest, and these are the bookings that settle it."
          items={churaumiSameDayPrep}
        />

        {/* Hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hours</span>
          <h2 className={styles.sectionTitle}>What Are Churaumi Aquarium&apos;s Opening Hours?</h2>
          <p className={styles.bodyText}>
            8:30 to 18:30 for most of the year, with last entry an hour before closing. The aquarium stays open
            later over Golden Week, the second half of July and all of August.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Season", "Hours", "Last entry"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.season}>
                      <td className={styles.tdProvider}>{row.season}</td>
                      <td style={tdSmall}>{row.hours}</td>
                      <td style={tdSmall}>{row.last}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO} —{" "}
            <a href="https://churaumi.okinawa/en/guide/hour/" target="_blank" rel="noopener" style={linkStyle}>churaumi.okinawa/en/guide/hour/</a>.
            The 2027 peak-season dates had not been published.
          </p>
        </section>

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to Churaumi Aquarium from Naha?</h2>
          <p className={styles.bodyText}>
            Fastest by rental car, about 2 hours from Naha Airport; cheapest without driving on the Yanbaru Express
            Bus, ¥2,000 and about 2 hours 20 minutes. No train goes there — the Okinawa Monorail stays in the Naha
            area.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["How", "Time from Naha Airport", "Fare", "What to know"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.how}>
                      <td className={styles.tdProvider}>{row.how}</td>
                      <td style={tdSmall}>{row.time}</td>
                      <td style={tdSmall}>{row.fare}</td>
                      <td style={tdSmall}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO} —{" "}
            <a href="https://yanbaru-expressbus.com/" target="_blank" rel="noopener" style={linkStyle}>yanbaru-expressbus.com</a>{" "}
            (timetable dated 9 January 2026: fare and times) and{" "}
            <a href="https://churaumi.okinawa/en/guide/access/" target="_blank" rel="noopener" style={linkStyle}>churaumi.okinawa/en/guide/access/</a>{" "}
            (car and express-bus times, route names, read {PROGRAMMES}). Free parking is Ocean Expo Park&apos;s FAQ. Tour
            length and aquarium time are Klook&apos;s listing. The child bus fare is not shown here.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={nahaAirportCarRental.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Naha Airport car rental on Klook →
            </KlookLink>
            <KlookLink href={churaumiKouriNorthernDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Northern day tour from Naha →
            </KlookLink>
            <KlookLink href={nahaAirportLimousineBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Naha Airport transfer →
            </KlookLink>
          </div>
        </section>

        {/* JUNGLIA combo */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Combo ticket</span>
          <h2 className={styles.sectionTitle}>Is There a Churaumi and JUNGLIA Combo Ticket?</h2>
          <p className={styles.bodyText}>
            Yes — JUNGLIA&apos;s operator, Japan Entertainment, sells a set with the aquarium, from ¥5,150 for an adult
            with JUNGLIA&apos;s short &ldquo;Furatto Ticket&rdquo;. The two are about 30 minutes apart by car, so the
            usual plan is the aquarium at opening and JUNGLIA in the afternoon.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Set", "Adult", "Teen", "Child", "What's included"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comboRows.map((row) => (
                    <tr key={row.version}>
                      <td className={styles.tdProvider}>{row.version}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td style={tdSmall}>{row.teen}</td>
                      <td style={tdSmall}>{row.child}</td>
                      <td style={tdSmall}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO} —{" "}
            <a href="https://okinawa-hokubu.org/" target="_blank" rel="noopener" style={linkStyle}>okinawa-hokubu.org</a>{" "}
            (Japan Entertainment&apos;s northern Okinawa portal, current set) and its{" "}
            <a href="https://prtimes.jp/main/html/rd/p/000000034.000148025.html" target="_blank" rel="noopener" style={linkStyle}>30 March 2026 release</a>{" "}
            (launch version, sold on asoview). Tax included. JUNGLIA lists the stand-alone Furatto Ticket as a
            Japan-resident price, so check at checkout that the set is open to you before paying.
          </p>
          <p className={styles.bodyText}>
            Not set on JUNGLIA? A northern day tour from Naha covers the aquarium with Kouri Island and Cape Manzamo
            instead, and nobody has to drive.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={churaumiKouriNorthernDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Northern day tour from Naha →
            </KlookLink>
            <KlookLink href={nahaAirportCarRental.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Rent a car to do both →
            </KlookLink>
          </div>
        </section>

        {/* Tour vs car */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tour or car</span>
          <h2 className={styles.sectionTitle}>Is a Day Tour Better Than Renting a Car?</h2>
          <p className={styles.bodyText}>
            A tour, if nobody in your group drives or you have a single day for the north. A car, if you are a
            family, want longer than three hours inside, or are staying a night on the Motobu Peninsula.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Day tour from Naha", "Rental car"].map((h) => (
                      <th key={h || "blank"} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider}>{row.factor}</td>
                      <td style={tdSmall}>{row.tour}</td>
                      <td style={tdSmall}>{row.self}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Klook&apos;s car-rental page states that non-residents need a passport, their own licence, an International
            Driving Permit and a credit card. Tour inclusions differ by option and date — check whether the aquarium
            ticket and an English-speaking guide are included before you book. More routes are compared in the{" "}
            <Link href="/guides/attractions/okinawa-day-tours" style={linkStyle}>Okinawa day tours</Link> guide.
          </p>
        </section>

        {/* Duration and feeding */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>On the day</span>
          <h2 className={styles.sectionTitle}>How Long Do You Need at Churaumi Aquarium?</h2>
          <p className={styles.bodyText}>
            Two to three and a half hours inside; day tours allot about 3 to 3.5. Arrive at 8:30 and you are ahead of
            the coaches that leave Naha after breakfast. For a full trip plan, the{" "}
            <Link href="/guides/attractions/okinawa-3-day-itinerary" style={linkStyle}>Okinawa 3 day itinerary</Link> puts
            the aquarium on Day 2.
          </p>
          <h2 className={styles.sectionTitle} style={{ marginTop: "1.5rem" }}>What Time Is the Whale Shark Feeding?</h2>
          <p className={styles.bodyText}>
            The aquarium&apos;s schedule lists feeding in the Kuroshio Sea — the main tank, home to the whale sharks —
            at <strong>15:00 and 17:00</strong>, and the manta rays at <strong>9:30</strong>. Programmes can change
            or be cancelled without notice depending on the animals&apos; condition (read {PROGRAMMES}). If you are on a
            day tour, check that its aquarium window covers 15:00.
          </p>
        </section>

        {/* Nearby */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Nearby</span>
          <h2 className={styles.sectionTitle}>What Else Is There Around Churaumi Aquarium?</h2>
          <ul className={styles.pickList}>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
                <strong>Okichan Theater dolphin show</strong> — in Ocean Expo Park outside the aquarium, at 10:30,
                11:30, 13:00, 15:00 and 17:00 on the park&apos;s programme page, about 20 minutes. Dolphin shows are
                suspended 4–9 January 2027.
              </span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
                <strong>Emerald Beach</strong> — the park&apos;s own beach. Swimming is free from 1 April to 31 October
                (8:30–17:00 in 2026) at the designated beach only; outside that season it is a walk, not a swim.
              </span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
                <strong>Bise Fukugi tree road</strong> — the village lanes of Bise lined with fukugi trees, just
                north of Ocean Expo Park; a short stop for a self-drive afternoon or one of the longer tours.
              </span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
                <strong>Kouri Island</strong> — reached by bridge from the Motobu Peninsula; the stop most northern day
                tours pair with the aquarium, and an easy drive for a self-drive afternoon.
              </span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
                <strong>Whales in winter</strong> — humpback whale boats from Naha and the Kerama Islands run roughly
                December to April, per their Klook listings; see{" "}
                <Link href="/guides/attractions/okinawa-whale-watching" style={linkStyle}>Okinawa whale watching</Link>.
              </span>
            </li>
          </ul>
          <p className={styles.bodyText} style={noteStyle}>
            Show times from Ocean Expo Park&apos;s programme page and FAQ, swimming season from the park&apos;s own notice,
            the January suspension from the aquarium&apos;s site — all read {PROGRAMMES}.
          </p>
        </section>

        {/* Where to stay */}
        <KlookStayAreas
          heading="Where to Stay for Churaumi Aquarium"
          intro="Naha if the aquarium is one day of a longer Okinawa trip; the Motobu Peninsula if you want the 8:30 opening and the north to yourself the next morning."
          areas={okinawaChuraumiStayAreas}
        />

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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/okinawa-day-tours", title: "Okinawa Day Tours from Naha: North vs South Compared (2026)" },
              { href: "/guides/attractions/okinawa-3-day-itinerary", title: "Okinawa 3 Day Itinerary (2026): Naha, Churaumi and Kerama" },
              { href: "/guides/attractions/okinawa-whale-watching", title: "Okinawa Whale Watching 2027: Season, Kerama & Naha Tours" },
              { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "Osaka Aquarium Kaiyukan Tickets (2026): Prices, Hours and Time Slots" },
              { href: "/guides/attractions/japan-attraction-ticket-prices", title: "Japan Attraction Ticket Prices 2026: Official Prices and Booking Rules" },
              { href: "/guides/attractions/japan-14-day-itinerary", title: "Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day" },
              { href: "/guides/attractions/japan-10-day-itinerary", title: "Japan Itinerary 10 Days: Tokyo, Kyoto, Osaka & Hakone (2026)" },
              { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids: 5 Days, Day by Day (2026)" },
              { href: "/guides/attractions", title: "More Things to Do in Japan →" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                    <path d="M13 6v2M13 11v2M13 16v2" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{r.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Settle how you get north</h2>
            <p className={styles.ctaBannerDesc}>
              ¥2,180 at the gate is the easy part. A northern day tour from Naha does the driving; a car from Naha
              Airport does it on your schedule.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={churaumiKouriNorthernDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Northern day tour →
              </KlookLink>
              <KlookLink href={nahaAirportCarRental.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Naha Airport car rental →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
