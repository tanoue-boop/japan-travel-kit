import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import { sumoTokyoTripPrep } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// Klook affiliate redirect — Tokyo Grand Sumo Tournament tour (Ryogoku Kokugikan), activity 1432.
// Uses the account-level aid; add an aff_adid from the Klook affiliate dashboard for per-link tracking.
const SUMO_TOURNAMENT_URL = "https://affiliate.klook.com/redirect?aid=119070&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F1432-grand-sumo-tournament-tokyo%2F";
// Klook affiliate redirect.
const SUMO_PRACTICE_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1307055&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F130115-sumo-morning-practice-viewing-tour-tokyo%2F";

/**
 * Re-read on 19 Nov 2026 (task jtk-20261119-C01), replacing the 2026 dates (all three Tokyo
 * tournaments of 2026 are over) and the unsourced "about 400 same-day tickets at ¥2,200":
 *
 * - sumo.pia.jp/en/ (Ticket Oosumo, the official seller linked from sumo.or.jp): 2027
 *   January 10–24 (Tokyo, advance sales from Sat 5 Dec 2026), May 9–23 (Tokyo, from Sat
 *   10 Apr 2027), September 12–26 (Tokyo, from Sat 7 Aug 2027).
 * - sumo.pia.jp/en/sumo01.jsp (2027 January tournament): English site on sale 5 Dec 10:00
 *   JST, credit card only, ¥2,000 service fee per ticket, tickets printed at 7-Eleven in
 *   Japan, no changes or refunds; prices incl. tax by weekday / weekend & holiday / 14th and
 *   final day; box seats for 4 guests; "If tickets are sold out by the day of the event, no
 *   tickets will be sold on the day"; doors 8:45 (10:30 on 22–23 Jan, 10:00 on 24 Jan);
 *   top-division bouts from about 14:00, finish about 18:00; re-entry once, by 17:00.
 * - sumo.or.jp/EnTicket/ (Japan Sumo Association, How to Buy): box seats priced per box of
 *   four, chair seats priced per seat.
 */
const SUMO_CHECKED_ISO = "2026-11-19";
const TICKET_OOSUMO_URL = "https://sumo.pia.jp/en/";
const TICKET_OOSUMO_JAN_URL = "https://sumo.pia.jp/en/sumo01.jsp";
const JSA_HOW_TO_BUY_URL = "https://www.sumo.or.jp/EnTicket/";

const scheduleRows = [
  { basho: "Answer: next Tokyo basho", dates: "Sun 10 – Sun 24 Jan 2027", sale: "Sat 5 Dec 2026, 10:00 JST" },
  { basho: "January (Hatsu) 2027", dates: "10–24 Jan 2027", sale: "5 Dec 2026" },
  { basho: "May (Natsu) 2027", dates: "9–23 May 2027", sale: "10 Apr 2027" },
  { basho: "September (Aki) 2027", dates: "12–26 Sep 2027", sale: "7 Aug 2027" },
];

/** January 2027 tournament prices incl. tax, as Ticket Oosumo lists them. */
const priceRows = [
  { seat: "Answer: price range", weekday: "Chair ¥5,000–¥11,000 · Box ¥38,000–¥72,000", weekend: "Chair ¥6,000–¥12,000 · Box ¥42,000–¥80,000", finalDays: "Chair ¥7,000–¥13,000 · Box ¥46,000–¥88,000" },
  { seat: "Chair seat C (per seat)", weekday: "¥5,000", weekend: "¥6,000", finalDays: "¥7,000" },
  { seat: "Chair seat B (per seat)", weekday: "¥6,000", weekend: "¥7,000", finalDays: "¥8,000" },
  { seat: "Chair seat A (per seat)", weekday: "¥10,000", weekend: "¥11,000", finalDays: "¥12,000" },
  { seat: "Chair seat S (per seat)", weekday: "¥11,000", weekend: "¥12,000", finalDays: "¥13,000" },
  { seat: "Box seat C (box for 4)", weekday: "¥38,000", weekend: "¥42,000", finalDays: "¥46,000" },
  { seat: "Box seat B (box for 4)", weekday: "¥44,000", weekend: "¥50,000", finalDays: "¥56,000" },
  { seat: "Box seat A (box for 4)", weekday: "¥60,000", weekend: "¥66,000", finalDays: "¥72,000" },
  { seat: "Box seat S (box for 4, Japanese site only)", weekday: "¥72,000", weekend: "¥80,000", finalDays: "¥88,000" },
];

const seatRows = [
  {
    seat: "Masuseki (box seats)",
    detail: "Floor-level boxes near the ring: you remove your shoes and sit on cushions, and boxes are sold whole, for four guests.",
  },
  {
    seat: "Isu-seki (chair seats)",
    detail: "Western-style chairs on the upper tiers, sold per seat. More comfortable for a long day and the cheaper way in.",
  },
  {
    seat: "On the day",
    detail: "Ticket Oosumo states that if tickets are sold out by the day of the event, no tickets are sold on the day — so do not plan around the box office.",
  },
];

const whoFor = [
  {
    title: "Go to a tournament if…",
    desc: "Your Tokyo dates fall in January, May, or September — the three months the capital hosts a 15-day basho at Ryogoku Kokugikan. It's the real thing: top-division bouts, the full ceremony, and a packed arena. Just book the moment tickets go on sale.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21h16" />
        <path d="M6 21V9a6 6 0 0 1 12 0v12" />
        <circle cx="12" cy="9" r="2" />
      </svg>
    ),
  },
  {
    title: "See morning practice if…",
    desc: "You're visiting outside tournament months, or want a closer, quieter look. A sumo stable (heya) morning practice tour puts you ringside for the training session — usually around three hours, often with a chanko hot-pot meal, and generally for ages 12 and up.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Don't count on the day if…",
    desc: "Advance tickets are already gone. Ticket Oosumo states that when tickets sell out before the day, none are sold on the day, so the realistic fallbacks are a guided tour that includes tournament admission or a morning practice outside the arena.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 15h4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Check whether you're in town for a basho",
    desc: "Tokyo hosts three of the year's six grand tournaments — in January, May, and September — each running 15 days at Ryogoku Kokugikan in Sumida. If your dates line up, a tournament is the headline experience. If not, a morning practice tour is the year-round alternative.",
  },
  {
    title: "Buy from the official seller — and only the official seller",
    desc: "Advance tickets for the January 2027 basho go on sale at 10:00 JST on Saturday 5 December 2026 — about five weeks ahead — on Ticket Oosumo (sumo.pia.jp/en), the official seller. The English site takes credit cards only, adds a ¥2,000 service fee per ticket, and tickets cannot be changed or refunded. Avoid resale sites: the organiser prohibits unauthorised resale and may refuse entry.",
  },
  {
    title: "Choose your seat type",
    desc: "Box seats (masuseki) put you at floor level on cushions for the closest, most traditional experience, while chair seats (isu-seki) on the upper tiers are more comfortable and usually cheaper. Pick based on budget and how long you plan to stay.",
  },
  {
    title: "If it's sold out, consider a tour or a morning practice",
    desc: "When official tickets are gone, a guided tour that includes tournament admission is a practical fallback in season. Do not plan on the box office: Ticket Oosumo states that if tickets are sold out by the day of the event, none are sold on the day.",
  },
];

const faqItems = [
  {
    q: "When is the next sumo tournament in Tokyo?",
    a: `The January 2027 (Hatsu) basho, Sunday 10 to Sunday 24 January 2027 at Ryogoku Kokugikan. The other Tokyo tournaments of 2027 are 9–23 May and 12–26 September; the remaining three are in Osaka (March), Nagoya (July) and Fukuoka (November). Ticket Oosumo schedule checked ${SUMO_CHECKED_ISO}.`,
  },
  {
    q: "When do sumo tickets go on sale?",
    a: `For the January 2027 basho, at 10:00 JST on Saturday 5 December 2026 on Ticket Oosumo (sumo.pia.jp/en), the official seller. May 2027 tickets go on sale on 10 April 2027 and September 2027 tickets on 7 August 2027. The English site takes credit cards only, charges a ¥2,000 service fee per ticket, and purchased tickets cannot be changed or cancelled. Checked ${SUMO_CHECKED_ISO}.`,
  },
  {
    q: "How much are sumo tickets in Tokyo?",
    a: `For the January 2027 basho, chair seats are ¥5,000 to ¥13,000 per seat and box seats ¥38,000 to ¥88,000 per box for four, including tax; prices rise from weekdays to weekends and holidays and again on the 14th and final days. The cheapest is chair seat C at ¥5,000 on a weekday. The English site adds a ¥2,000 service fee per ticket. Ticket Oosumo, checked ${SUMO_CHECKED_ISO}.`,
  },
  {
    q: "Can I get same-day sumo tickets?",
    a: `Not if the day has sold out. Ticket Oosumo states that if tickets are sold out by the day of the event, no tickets are sold on the day at the Kokugikan box office, so buy in advance from the sale date. If you miss out, a guided tour that includes tournament admission or a morning practice tour is the fallback. Checked ${SUMO_CHECKED_ISO}.`,
  },
  {
    q: "What if I'm not visiting during a tournament?",
    a: "You can still experience sumo by joining a morning practice (keiko) tour at a sumo stable. These put you ringside for the training session, typically last around three hours, and often include a chanko hot-pot meal. They generally have a minimum age of about 12. It's a closer, quieter alternative available outside the tournament months.",
  },
  {
    q: "Where is Ryogoku Kokugikan and how do I get there?",
    a: "Ryogoku Kokugikan, Tokyo's national sumo arena, is in the Ryogoku district of Sumida ward, right by Ryogoku Station. It's easily reached on the JR Sobu Line and the Toei Oedo subway line. For planning trains and IC cards across the city, see our getting around Tokyo guide.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/sumo-tokyo-tickets") } });

export default function SumoTokyoTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Sumo Tickets in Tokyo (2026–27): Dates, Prices & How to Book</title>
        <meta
          name="description"
          content="Sumo tickets in Tokyo: the Jan 2027 basho runs 10–24 Jan at Ryogoku, on sale 5 Dec 2026. Chair seats ¥5,000–¥13,000, 4-person boxes ¥38,000–¥88,000."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/sumo-tokyo-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Sumo Tickets in Tokyo (2026–27): Dates, Prices & How to Book" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/sumo-tokyo-tickets" />
        <meta property="og:description" content="Sumo tickets in Tokyo: the Jan 2027 basho runs 10–24 Jan at Ryogoku, on sale 5 Dec 2026. Chair seats ¥5,000–¥13,000, 4-person boxes ¥38,000–¥88,000." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sumo Tickets in Tokyo (2026–27): Dates, Prices & How to Book" />
        <meta name="twitter:description" content="Sumo tickets in Tokyo: the Jan 2027 basho runs 10–24 Jan at Ryogoku, on sale 5 Dec 2026. Chair seats ¥5,000–¥13,000, 4-person boxes ¥38,000–¥88,000." />
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
              route: "/guides/attractions/sumo-tokyo-tickets",
              headline: "Sumo Tickets in Tokyo (2026–27): Dates, Prices & How to Book",
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
                { "@type": "ListItem", position: 4, name: "Sumo in Tokyo", item: "https://www.japan-travel-kit.com/guides/attractions/sumo-tokyo-tickets" },
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
          <span className={styles.breadCurrent}>Sumo in Tokyo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Sumo Tickets in Tokyo (2026–27): <br />Dates, Prices &amp; How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Tokyo hosts three 15-day grand tournaments a year at Ryogoku Kokugikan. Here&apos;s when they run,
            how to buy official tickets safely, and how to see a stable&apos;s morning practice the rest of the year.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official Tickets Only", "Year-Round Option"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Tokyo basho</p>
                <p className={styles.verdictStatValue}>Jan, May &amp; Sep</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Venue</p>
                <p className={styles.verdictStatValue}>Ryogoku Kokugikan</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Official tickets</p>
                <p className={styles.verdictStatValue}>Ticket Oosumo only</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>No tournament?</p>
                <p className={styles.verdictStatValue}>Morning practice tour</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>
                The next Tokyo sumo tournament is the January 2027 basho, 10–24 January 2027 at Ryogoku
                Kokugikan, with advance tickets on sale from 10:00 JST on Saturday 5 December 2026 on Ticket
                Oosumo, the official seller.
              </strong>{" "}
              Chair seats cost ¥5,000–¥13,000 per seat and box seats ¥38,000–¥88,000 per box of four,
              depending on class and day, and the English site adds a ¥2,000 service fee per ticket. If a day
              sells out, no tickets are sold at the door — outside January, May and September, a morning
              practice tour is the year-round alternative (Ticket Oosumo, checked {SUMO_CHECKED_ISO}).
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={SUMO_TOURNAMENT_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Tournament Tour on Klook →
              </KlookLink>
              <KlookLink href={SUMO_PRACTICE_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Morning Practice Tours →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Two Ways to See Sumo in Tokyo</h2>
          <p className={styles.bodyText}>
            There are two quite different ways to experience Japan&apos;s national sport in Tokyo. The first is a
            grand tournament (basho): Tokyo hosts three of the year&apos;s six, each a 15-day spectacle at
            Ryogoku Kokugikan, the national sumo arena in Sumida. The second is a morning practice (keiko) at a
            sumo stable, where you watch the wrestlers train up close — an option that runs year-round, including
            in the months between tournaments.
          </p>
          <p className={styles.bodyText}>
            Which one fits depends mostly on your dates. Below are the 2027 Tokyo tournament dates and sale dates,
            the official seat prices, how to buy safely, and how the morning practice alternative works. If the
            tournament is one evening of a longer stay, our{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={{ color: "var(--text)", fontWeight: 600 }}>
              things to do in Tokyo
            </Link>{" "}
            guide lists which other sights need booking ahead, and Ryogoku is on the Toei Oedo Line, one of the
            lines covered by the{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" style={{ color: "var(--text)", fontWeight: 600 }}>
              Tokyo Subway Ticket
            </Link>
            .
          </p>
        </section>

        {/* Schedule table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>2027 schedule</span>
          <h2 className={styles.sectionTitle}>When Is the Next Sumo Tournament in Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>
              The January 2027 basho, 10–24 January 2027 at Ryogoku Kokugikan, with advance tickets on sale from
              10:00 JST on Saturday 5 December 2026.
            </strong>{" "}
            Each Tokyo tournament runs 15 days; doors open at 8:45 (later on the last three days), top-division bouts start around 14:00 and the
            day finishes around 18:00, and one ticket covers the whole day (Ticket Oosumo, January 2027 page).
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tokyo tournament", "Dates (15 days)", "Advance sales open"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scheduleRows.map((row, i) => (
                    <tr key={row.basho}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{i === 0 ? <strong>{row.basho}</strong> : row.basho}</td>
                      <td style={{ fontSize: "0.88rem" }}>{i === 0 ? <strong>{row.dates}</strong> : row.dates}</td>
                      <td style={{ fontSize: "0.88rem" }}>{i === 0 ? <strong>{row.sale}</strong> : row.sale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {SUMO_CHECKED_ISO} · Source:{" "}
            <a href={TICKET_OOSUMO_URL} target="_blank" rel="noopener" style={{ color: "var(--text)" }}>Ticket Oosumo (sumo.pia.jp/en, official)</a>.
            The other three of the year&apos;s six grand tournaments are in Osaka (March), Nagoya (July) and
            Fukuoka (November).
          </p>
        </section>

        {/* Price table (19 Nov 2026, C01) */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices</span>
          <h2 className={styles.sectionTitle}>How Much Are Sumo Tickets in Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>
              For the January 2027 basho, chair seats cost ¥5,000–¥13,000 per seat and box seats
              ¥38,000–¥88,000 per box for four, including tax.
            </strong>{" "}
            Prices step up from weekdays to weekends and holidays, and again on the 14th and final days; Ticket
            Oosumo English adds a ¥2,000 service fee per ticket, takes credit cards only, and tickets cannot be
            changed or refunded.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Seat", "Weekday", "Weekend & holiday", "14th & final day"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row, i) => (
                    <tr key={row.seat}>
                      <td className={styles.tdProvider}>{i === 0 ? <strong>{row.seat}</strong> : row.seat}</td>
                      <td style={{ fontSize: "0.86rem" }}>{i === 0 ? <strong>{row.weekday}</strong> : row.weekday}</td>
                      <td style={{ fontSize: "0.86rem" }}>{i === 0 ? <strong>{row.weekend}</strong> : row.weekend}</td>
                      <td style={{ fontSize: "0.86rem" }}>{i === 0 ? <strong>{row.finalDays}</strong> : row.finalDays}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {SUMO_CHECKED_ISO} · Sources:{" "}
            <a href={TICKET_OOSUMO_JAN_URL} target="_blank" rel="noopener" style={{ color: "var(--text)" }}>Ticket Oosumo, 2027 January tournament</a>{" "}
            and{" "}
            <a href={JSA_HOW_TO_BUY_URL} target="_blank" rel="noopener" style={{ color: "var(--text)" }}>Japan Sumo Association, How to Buy</a>{" "}
            (which prices box seats per box of four and chair seats per seat). Box seat S and ¥20,000 ringside
            seats are sold only on the Japanese Ticket Oosumo site. Children aged 4 and over need a ticket, with no
            child discount.
          </p>
        </section>

        {/* Seat types table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Seats</span>
          <h2 className={styles.sectionTitle}>Seat Types Explained</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Type", "What to expect"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seatRows.map((row) => (
                    <tr key={row.seat}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.seat}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Safety / official note */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Buy safely</span>
          <h2 className={styles.sectionTitle}>Use the Official Seller — Avoid Resale Sites</h2>
          <p className={styles.bodyText}>
            Sumo tickets are in high demand, and that draws resellers. The only official, legitimate channel is{" "}
            <strong>Ticket Oosumo</strong> (sumo.pia.jp/en). Resale platforms such as Viagogo and StubHub are not
            official sellers and are widely cautioned against — tickets there can be heavily marked up or invalid.
            Buy from the official site the day tickets go on sale — 5 December 2026 for the January 2027
            tournament — since they sell out quickly; Ticket Oosumo&apos;s own notice says the November 2026
            tournament in Fukuoka was sold out on all dates.
          </p>
          <p className={styles.bodyText}>
            Tournament tickets for the Tokyo basho (held at Ryogoku Kokugikan in January, May, and September) are
            bought from the official Ticket Oosumo site. Klook&apos;s ticket-inclusive spectator tours are listed
            only intermittently, during the Tokyo tournament season — so if official tickets are gone, such a
            guided tour is a reasonable in-season fallback. The box office is not: Ticket Oosumo states that if
            tickets are sold out by the day of the event, no tickets are sold on the day.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which suits you</span>
          <h2 className={styles.sectionTitle}>Tournament or Morning Practice?</h2>
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
          <h2 className={styles.sectionTitle}>How to See Sumo, Step by Step</h2>
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

        <BookingEsimCard lead="Sumo seats booked? Get mobile data before you land." />

        <KlookTripPrep
          label="Book for the same day"
          heading="What Else Is Worth Booking Around a Sumo Day?"
          intro="A tournament day or a morning practice fixes the start of the day on the east side of Tokyo. Where you stay and what fills the rest of it are the bookings left to make."
          items={sumoTokyoTripPrep}
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V8l5-3 5 3v13" />
                  <path d="M13 21V11l5-3 3 2v11" />
                  <path d="M7 11v.01M7 15v.01M17 13v.01M17 17v.01" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets 2026: Price, Hours &amp; the Sunset Slot</p>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Experience sumo in Tokyo</h2>
            <p className={styles.ctaBannerDesc}>
              Catch a grand tournament in January, May, or September — or get ringside at a sumo stable&apos;s
              morning practice any time of year. Booking ahead is the safest way to secure a spot.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={SUMO_TOURNAMENT_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
                Tournament Tour on Klook →
              </KlookLink>
              <KlookLink href={SUMO_PRACTICE_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
                Morning Practice Tours →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
