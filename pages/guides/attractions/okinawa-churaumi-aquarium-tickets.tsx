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
  okinawaChuraumiStayAreas,
} from "../../../lib/klook-links";
import { gygChuraumiAquarium } from "../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";

/**
 * Okinawa Churaumi Aquarium tickets — written for the exact phrase "Okinawa Churaumi
 * Aquarium Tickets". Added 3 Nov 2026 (task jtk-20261103-01); the first Okinawa page
 * on this site.
 *
 * Every figure is the operator's own, read on 3 November 2026:
 *   churaumi.okinawa/en/guide/info/  and the   Adult ¥2,180, high-school ¥1,440, elementary
 *     Japanese /guide/info/                    and junior-high ¥710, under 6 free; groups of
 *                                              20+ ¥1,730 / ¥1,140 / ¥560, day of admission
 *                                              only; annual passport ¥4,360 / ¥2,880 /
 *                                              ¥1,420; a "WEB Ticket" link to asoview. The
 *                                              fee page carries no after-16:00 rate, so none
 *                                              is printed here.
 *   churaumi.okinawa/en/guide/hour/            Off season 8:30–18:30, last entry 17:30; peak
 *                                              ① 8:30–20:00 (last 19:00) on 25 Apr – 6 May and
 *                                              18 – 31 Jul 2026; peak ② 8:30–21:00 (last 20:00)
 *                                              in August 2026; year-end 8:30–18:30; "no
 *                                              scheduled closing days until 31/Mar/2027",
 *                                              temporary closures for typhoons possible.
 *   churaumi.okinawa/en/guide/access/          "about two hours by car from Naha Airport (via
 *                                              the Okinawa Expressway)", "approximately three
 *                                              hours by express bus"; Okinawa Airport
 *                                              Shuttle, Yanbaru Express Bus, routes 111 and
 *                                              117; "Parking lots at Ocean Expo Park are free".
 *   churaumi.okinawa/program/aquarium/kuroshio/ feeding schedule 9:30 (manta) and 15:00 /
 *                                              17:00 (the Kuroshio Sea tank), subject to
 *                                              change without notice.
 *   churaumi.okinawa/program/aquarium/         the paid Kuroshio Sea backyard tour, advance
 *                                              booking from 1 Nov 2026, bookings open 30 days
 *                                              ahead at 10:00.
 *   churaumi.okinawa/en/                       dolphin shows suspended 4 – 9 January 2027.
 *   oki-park.jp/kaiyohaku/faq/ and info/33     all nine park car parks free; Okichan Theater
 *                                              dolphin show times 10:30, 11:30, 13:00, 15:00,
 *                                              17:00, about 20 minutes. The programme page
 *                                              states no charge either way, so none is stated.
 *   oki-park.jp (Emerald Beach notice)         swimming 1 April – 31 October 2026, 8:30–17:00,
 *                                              free, only at the designated beach. Read
 *                                              through the oki-park.jp search index.
 *
 * Deliberately absent: an express-bus fare (the operator's fare page could not be read,
 * and aggregator figures are not the operator's own) and any whale-shark-specific feeding
 * claim beyond the Kuroshio tank schedule the aquarium publishes.
 *
 * Nothing here is first-hand, and no Klook price appears: Klook answers automated reads
 * of its product pages with HTTP 403.
 */
const CHECKED = checkedLabel("2026-11-03");
const ROUTE = "/guides/attractions/okinawa-churaumi-aquarium-tickets";
const SLUG = "okinawa-churaumi-aquarium-tickets";

const priceRows = [
  { ticket: "Adult", standard: "¥2,180", group: "¥1,730", annual: "¥4,360" },
  { ticket: "High-school student", standard: "¥1,440", group: "¥1,140", annual: "¥2,880" },
  { ticket: "Elementary & junior-high student", standard: "¥710", group: "¥560", annual: "¥1,420" },
  { ticket: "Preschool (under 6)", standard: "Free", group: "Free", annual: "—" },
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
    how: "Rental car from Naha Airport",
    time: "About 2 hours, via the Okinawa Expressway",
    note: "Ocean Expo Park's nine car parks are free. The only option that adds Kouri Island and Bise the same afternoon at your own pace.",
  },
  {
    how: "Express / route bus from Naha Airport",
    time: "About 3 hours",
    note: "Okinawa Airport Shuttle, Yanbaru Express Bus, routes 111 and 117. Check each operator's timetable for your date.",
  },
  {
    how: "Day tour from Naha or Chatan",
    time: "A full day (Klook's northern tour runs about 10 hours)",
    note: "Coach there and back with Kouri Island, Cape Manzamo and American Village; about 3 to 3.5 hours at the aquarium.",
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
    q: "How much are Okinawa Churaumi Aquarium tickets?",
    a: `¥2,180 for an adult, ¥1,440 for a high-school student, ¥710 for elementary and junior-high students, and free under 6 — the aquarium's own prices, tax included, read on ${CHECKED}. Groups of 20 or more pay ¥1,730 / ¥1,140 / ¥560 on the day only, and an annual passport is ¥4,360 for an adult, exactly two visits' worth.`,
  },
  {
    q: "Is there a discount after 4pm at Churaumi Aquarium?",
    a: `Not on the aquarium's current fee page. Older guides quote an after-16:00 rate, but the official fee table read on ${CHECKED} lists only the standard, group and annual-passport prices — so plan on the standard ¥2,180 whatever time you arrive.`,
  },
  {
    q: "What are Churaumi Aquarium's opening hours?",
    a: `8:30 to 18:30 with last entry at 17:30 for most of the year, extended to 20:00 (last entry 19:00) over Golden Week and late July and to 21:00 (last entry 20:00) through August in 2026. The aquarium states it has no scheduled closing days until 31 March 2027, though it can close temporarily for typhoons. Read ${CHECKED}.`,
  },
  {
    q: "How do I get to Churaumi Aquarium from Naha?",
    a: "About two hours by car from Naha Airport on the Okinawa Expressway, or about three hours by express bus — the aquarium names the Okinawa Airport Shuttle, the Yanbaru Express Bus and routes 111 and 117. A day tour from Naha or Chatan is the third option, and the only one where nobody has to drive or read a bus timetable.",
  },
  {
    q: "How long do you need at Churaumi Aquarium?",
    a: "Allow two to three and a half hours inside — Klook's northern day tour allots about 3 to 3.5 hours there. Add time for the Okichan Theater dolphin show and Emerald Beach in the surrounding Ocean Expo Park if you are driving yourself.",
  },
  {
    q: "What time is the whale shark feeding at Churaumi Aquarium?",
    a: `The aquarium's feeding schedule lists 15:00 and 17:00 for the Kuroshio Sea — the giant tank the whale sharks live in — and 9:30 for the manta rays. It warns that programmes can change or be cancelled without notice depending on the animals' condition. Read ${CHECKED}.`,
  },
  {
    q: "Is a day tour better than renting a car for Churaumi Aquarium?",
    a: "If nobody in your group drives, or you have one day in the north, yes — the tour strings the aquarium together with Kouri Island and Cape Manzamo in one booking. If you are a family, want more than three hours in the aquarium or plan to stay in Motobu, a car wins. Driving in Japan as a visitor needs an International Driving Permit alongside your own licence.",
  },
  {
    q: "Can you buy Churaumi Aquarium tickets at the door?",
    a: "Yes — standard tickets are sold at the aquarium, and the official site also links to web tickets through asoview. Resellers such as Klook sell an e-ticket scanned at the gate; check the validity window and cancellation terms at checkout, because a reseller sets its own.",
  },
];

const TITLE = "Okinawa Churaumi Aquarium Tickets 2026: Price, Hours, Access";
const DESCRIPTION =
  "Okinawa Churaumi Aquarium tickets are ¥2,180 adult, ¥710 for kids, under 6 free. Hours 8:30–18:30, 2 hours by car from Naha, tours vs renting a car.";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const thStyle = { fontSize: "0.82rem" } as const;
const tdSmall = { fontSize: "0.88rem" } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

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
                { "@type": "ListItem", position: 4, name: "Okinawa Churaumi Aquarium Tickets", item: `https://www.japan-travel-kit.com${ROUTE}` },
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
          <span className={styles.breadCurrent}>Okinawa Churaumi Aquarium Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Okinawa Churaumi Aquarium Tickets:<br />Price, Hours &amp; Getting There
          </h1>
          <p className={styles.heroSubtitle}>
            Okinawa&apos;s whale shark tank, two hours north of Naha. The official prices, the season hours, the
            feeding times, and whether to drive or take a tour.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices, checked", "Car vs bus vs tour", "Kouri Island & Bise"].map((t) => (
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
            <strong>Okinawa Churaumi Aquarium tickets</strong> are <strong>¥2,180</strong> for an adult,{" "}
            <strong>¥1,440</strong> for a high-school student, <strong>¥710</strong> for elementary and
            junior-high students and free for children under 6, sold at the gate and online. The aquarium opens{" "}
            <strong>8:30–18:30</strong> (last entry 17:30) for most of the year, with later closing over Golden
            Week, late July and August, and has no scheduled closing days until 31 March 2027. It sits in Ocean
            Expo Park on the Motobu Peninsula, <strong>about two hours by car from Naha Airport</strong> on the
            Okinawa Expressway or about three hours by express bus — which is why most visitors either rent a
            car or book a northern day tour from Naha that adds Kouri Island. Allow two to three and a half hours
            inside. All figures are the aquarium&apos;s own, read on {CHECKED}.
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
                <p className={styles.verdictStatLabel}>From Naha</p>
                <p className={styles.verdictStatValue}>~2 h by car · ~3 h by bus</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Kuroshio feeding</p>
                <p className={styles.verdictStatValue}>15:00 and 17:00</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> the ticket is the easy part — the decision is how you get there. Drive if
              you are a family or staying in Motobu; book a northern day tour from Naha if nobody wants to drive.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={churaumiKouriNorthernDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check the northern day tour →
              </KlookLink>
              <KlookLink href={churaumiAquariumTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                Aquarium ticket on Klook →
              </KlookLink>
              <GygCompareButton slug={SLUG} listing={gygChuraumiAquarium} />
            </div>
          </div>
        </div>

        {/* Price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How Much Are Okinawa Churaumi Aquarium Tickets?</h2>
          <p className={styles.bodyText}>
            ¥2,180 for an adult and ¥710 for a primary or junior-high child; under-6s are free. Group rates need
            20 or more people paying in one transaction on the day, and the annual passport costs exactly two
            standard visits.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Standard", "Group (20+, day only)", "Annual passport"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.standard}</td>
                      <td className={styles.tdPrice}>{row.group}</td>
                      <td className={styles.tdPrice}>{row.annual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Tax included; the aquarium&apos;s own English and Japanese fee pages, read {CHECKED}. Neither page lists an
            after-16:00 rate, so none is shown — guides that quote one are out of date.
          </p>
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
            The aquarium&apos;s own hours page, read {CHECKED}. The 2027 peak-season dates had not been published.
          </p>
        </section>

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to Churaumi Aquarium from Naha?</h2>
          <p className={styles.bodyText}>
            By car in about two hours, by express bus in about three, or on a day tour. No train goes there — the
            Okinawa Monorail stays within the Naha area.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["How", "Time from Naha", "What to know"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.how}>
                      <td className={styles.tdProvider}>{row.how}</td>
                      <td style={tdSmall}>{row.time}</td>
                      <td style={tdSmall}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Car and bus times and the route names are the aquarium&apos;s own access page; free parking is Ocean Expo
            Park&apos;s FAQ; read {CHECKED}. The tour duration and aquarium time are Klook&apos;s listing. No bus fare is
            printed because the operator&apos;s own fare page could not be read.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={nahaAirportCarRental.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Naha Airport car rental on Klook →
            </KlookLink>
            <KlookLink href={churaumiKouriNorthernDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Northern day tour from Naha →
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
            ticket and an English-speaking guide are included before you book.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do You Need to Book Churaumi Aquarium in Advance?</h2>
          <p className={styles.bodyText}>
            Usually not — the aquarium publishes its standard prices for buying on the day. Booking ahead saves the
            ticket-counter queue and, with a reseller, lets you pay in your own currency; the official site also
            links to web tickets through asoview. What does need booking is the paid Kuroshio Sea backyard tour,
            which runs from 1 November 2026 by advance reservation only, opening 30 days ahead at 10:00. And in
            summer and holiday weeks, the rental car and the day tour are what go first, not the ticket.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={churaumiAquariumTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Churaumi tickets on Klook →
            </KlookLink>
            <GygCompareButton slug={SLUG} listing={gygChuraumiAquarium} />
          </div>
        </section>

        {/* Duration and feeding */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>On the day</span>
          <h2 className={styles.sectionTitle}>How Long Do You Need at Churaumi Aquarium?</h2>
          <p className={styles.bodyText}>
            Two to three and a half hours inside; day tours allot about 3 to 3.5. Arrive at 8:30 and you are ahead of
            the coaches that leave Naha after breakfast.
          </p>
          <h2 className={styles.sectionTitle} style={{ marginTop: "1.5rem" }}>What Time Is the Whale Shark Feeding?</h2>
          <p className={styles.bodyText}>
            The aquarium&apos;s schedule lists feeding in the Kuroshio Sea — the main tank, home to the whale sharks —
            at <strong>15:00 and 17:00</strong>, and the manta rays at <strong>9:30</strong>. Programmes can change
            or be cancelled without notice depending on the animals&apos; condition (read {CHECKED}). If you are on a
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
          </ul>
          <p className={styles.bodyText} style={noteStyle}>
            Show times from Ocean Expo Park&apos;s programme page and FAQ, swimming season from the park&apos;s own notice,
            the January suspension from the aquarium&apos;s site — all read {CHECKED}.
          </p>
        </section>

        {/* Where to stay */}
        <KlookStayAreas
          heading="Where to Stay for Churaumi Aquarium"
          intro="Naha if the aquarium is one day of a longer Okinawa trip; the Motobu Peninsula if you want the 8:30 opening and the north to yourself the next morning."
          areas={okinawaChuraumiStayAreas}
        />

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
              { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "Osaka Aquarium Kaiyukan Tickets (2026): Prices, Hours and Time Slots" },
              { href: "/guides/attractions/japan-attraction-ticket-prices", title: "Japan Attraction Ticket Prices 2026: Official Prices and Booking Rules" },
              { href: "/guides/attractions/japan-14-day-itinerary", title: "Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day" },
              { href: "/guides/attractions/japan-10-day-itinerary", title: "Japan 10 Day Itinerary (2026): 10 Days in Japan, Day by Day" },
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
              <KlookLink href={churaumiKouriNorthernDayTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Northern day tour →
              </KlookLink>
              <KlookLink href={nahaAirportCarRental.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Naha Airport car rental →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
