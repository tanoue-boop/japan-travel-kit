import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import NextBookingBlock from "../../../components/NextBookingBlock";
import {
  fujiDayTour,
  klookEsim,
  teamlabBorderlessTicketUrl,
  teamlabPlanetsTicketUrl,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
  type KlookTour,
} from "../../../lib/klook-links";
import { PRICES } from "../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";
import HotelStayBlock from "../../../components/HotelStayBlock";
import KlookSameDayCards from "../../../components/KlookSameDayCards";
import { teamlabSameDayCards } from "../../../lib/teamlab-same-day-cards";

// Same-day cards under the main CTA (task-jtk-20261115-P01).
const SAME_DAY = teamlabSameDayCards("tokyo", "en");

// Since 6 Nov 2026 (task jtk-20261106-A24) this URL answers one question: which of Tokyo's
// two teamLab museums to book. Planets tickets, hours and access have their own page at
// /guides/attractions/teamlab-planets-tickets, so this page does not repeat them. It targets
// "teamlab tokyo tickets", "teamlab tickets" and "planets vs borderless".
//
// 11 Nov (R05), 15 Nov (21), 20 Nov (R01) and 23 Nov 2026 (21): answer-first rewrites, because
// GSC kept showing "teamlab planets tickets" landing here in the 20s instead of on the Planets
// page (6–8th).
//
// 28 Nov 2026 (task jtk-20261128-R01): still the site's most-shown URL (3,551 impressions,
// 13.2 average position in 28 days) with most impressions on Planets-only terms. Title and H1
// lead with "teamLab Tokyo Tickets … Planets vs Borderless", the opening paragraph gives both
// price floors, the visit length and the booking rule in three sentences, the comparison table
// now has location, price, time, what to wear, when booking opens and tickets on the day, the
// H2s are the four questions people ask, and the two Klook buttons plus a same-day block (Tokyo
// day tour, Subway Ticket, Klook eSIM) sit straight under the table. Every official figure was
// re-read on 28 Nov 2026 from the __NEXT_DATA__ of teamlab.art/e/planets,
// teamlab.art/e/borderless-azabudai and teamlab.art/faq/Tokyo, and from
// teamlabplanets.dmm.com/en/ticket (the official Planets ticket store).
const ROUTE = "/guides/attractions/teamlab-tokyo-tickets";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;
const TITLE = "teamLab Tokyo Tickets 2026: Planets vs Borderless Compared";
const H1_A = "teamLab Tokyo Tickets 2026:";
const H1_B = "Planets vs Borderless (Price & Which to Pick)";
const DESC =
  "teamLab Tokyo tickets compared: Planets in Toyosu (barefoot, in water) from ¥3,800 vs Borderless in Azabudai (shoes on) from ¥3,400, plus time and booking.";

const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
/** The day every official figure on this page was re-read. */
const CHECKED_ISO = "2026-11-28";
const CHECKED = "28 November 2026";

// Row one is the verdict; the rest are the facts that decide it.
const compareRows = [
  { factor: "Pick it if", planets: "You want to walk barefoot through water (the pick with children)", borderless: "You want to roam the art at your own pace, shoes on, with no fixed route" },
  { factor: "Where", planets: "Toyosu, Koto ward", borderless: "Azabudai Hills, Minato ward" },
  { factor: "Nearest station", planets: "Shin-Toyosu (Yurikamome), 3 min from Exit 1A", borderless: "Kamiyacho (Hibiya Line), 2 min from Exit 5" },
  { factor: "Adult (18+)", planets: `${P.adult}; rises on busier dates and times`, borderless: `${B.adult}; rises on busier dates and times` },
  { factor: "Ages 13–17 / 4–12", planets: `¥2,800 / ${P.child}; 3 and under free`, borderless: `¥2,800 / ${B.child}; 3 and under free` },
  { factor: "Time to allow", planets: "teamLab publishes none; plan 1.5–2 hours", borderless: "About 1.5–2 hours (official FAQ), no time limit inside" },
  { factor: "What to wear", planets: "Barefoot; water up to adult knee height; free rental shorts", borderless: "Shoes on; no water" },
  { factor: "Booking opens", planets: "No release date published; timed slots sold online", borderless: "Around the 1st of the month, two months ahead" },
  { factor: "Tickets on the day", planets: "Not sold on site, so buy online before you go", borderless: "Online on the day if not sold out, or on site at ¥200 more" },
  { factor: "Opening hours", planets: "08:00–22:00 (08:00–20:30 on 31 Dec–2 Jan)", borderless: "08:30–21:00, some dates differ" },
  { factor: "Run", planets: "Until the end of 2027", borderless: "Permanent" },
];

// Ticket-by-ticket cost of one museum or both. The "Both" column is plain addition of the
// official floors, so it is a floor too: the adult and disability tiers move with the date.
const costRows = [
  { who: "Cheapest option", planets: "One museum only", borderless: "Lower adult floor of the two", both: "Only with two free half-days" },
  { who: "Adult (18+)", planets: P.adult, borderless: B.adult, both: "from ¥7,200" },
  { who: "Ages 13–17", planets: "¥2,800", borderless: "¥2,800", both: "¥5,600" },
  { who: "Child (ages 4–12)", planets: P.child ?? "—", borderless: B.child ?? "—", both: "¥3,000" },
  { who: "3 and under", planets: "Free", borderless: "Free", both: "Free" },
  { who: "Visitor with a disability", planets: "from ¥1,900", borderless: "from ¥1,700", both: "from ¥3,600" },
  { who: "Buying at the door", planets: "Not sold on site", borderless: "+¥200 adult", both: "—" },
];

const faqItems = [
  {
    q: "Which teamLab in Tokyo is better, Planets or Borderless?",
    a: "Neither is better overall. Planets is the one to pick for walking barefoot through water up to adult knee height, which makes it the choice with children; Borderless is the one to pick for roaming art at your own pace with shoes on, with no map and no fixed route.",
  },
  {
    q: "How much are teamLab Tokyo tickets in 2026?",
    a: `An adult ticket costs ${P.adult} at teamLab Planets and ${B.adult} at teamLab Borderless on teamlab.art (read on ${CHECKED}); both adult prices rise on busier dates and times. Ages 13–17 pay ¥2,800, children aged 4–12 pay ${P.child} at either museum, and children 3 and under are free. Seeing both costs from ¥7,200 for an adult.`,
  },
  {
    q: "Can you buy teamLab tickets on the day?",
    a: "Only for Borderless. teamLab Borderless sells tickets on the day through the official ticket site if they are not sold out, and on site at ¥200 more for an adult. teamLab Planets sells no tickets on site, so a Planets visit has to be bought online before you go.",
  },
  {
    q: "Can you visit Planets and Borderless in one day?",
    a: "Yes, because each ticket is for its own date and time, but the museums are in different parts of the city — Toyosu and Azabudai Hills — and teamLab puts a Borderless visit at about 1.5–2 hours. Leave a gap of at least that plus the journey between the two slots, or use two separate half-days.",
  },
  {
    q: "Where is the cheapest place to buy teamLab tickets?",
    a: "The official ticket sites set the base price, and teamLab lists Klook as an official sales channel for Borderless. The bigger saving is the date: adult prices at both museums rise on busier dates and times, so compare a few dates before you pay. At Borderless, buying at the door costs ¥200 more than online.",
  },
];

// Same-day bookings under the comparison table: a 6.5% Tokyo day tour, the 5% Subway Ticket
// and the 20% Klook eSIM. Klook prices move by date, so no prices here.
const esimTour: KlookTour = {
  title: "Klook Japan eSIM",
  desc: "Both museums scan a phone ticket at the gate, so set up data before the day",
  url: klookEsim.url,
};
const sameDayBookings: KlookTour[] = [tokyoSightseeingBusTour, tokyoSubwayTicket, esimTour];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const BTN_LINK = { color: "var(--text)", fontWeight: 600 } as const;
const SOURCE_NOTE = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

export default function TeamLabTokyoTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={URL} />
        {hreflangLinks(ROUTE)}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={URL} />
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
          dangerouslySetInnerHTML={{ __html: articleJsonLd({ route: ROUTE, headline: TITLE, updated }) }}
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
                { "@type": "ListItem", position: 4, name: "teamLab Tokyo Tickets", item: URL },
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
          <span className={styles.breadCurrent}>teamLab Tokyo Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            {H1_A} <br />{H1_B}
          </h1>
          <p className={styles.heroSubtitle}>
            Tokyo has two teamLab museums, and each sells its own ticket. This page sets them side by side and
            tells you which one to book.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Side by side"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              An adult <strong>teamLab Tokyo ticket</strong> costs <strong>{P.adult}</strong> at Planets in
              Toyosu and <strong>{B.adult}</strong> at Borderless in Azabudai Hills, and both adult prices rise
              on busier dates and times (official prices, read on {CHECKED}). teamLab puts a Borderless visit at
              about 1.5–2 hours and publishes no visit length for Planets, so allow 1.5–2 hours at either. Both
              sell timed tickets online, and only Borderless also sells at the door, at ¥200 more.
            </p>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0 }}>
              Pick <strong>Planets</strong> to walk barefoot through water, <strong>Borderless</strong> to roam
              shoes-on art at your own pace. Prices by date and booking steps for{" "}
              <Link href="/guides/attractions/teamlab-planets-tickets" style={BTN_LINK}>teamLab Planets tickets</Link>{" "}
              have their own guide, and the step-by-step booking of timed entry for{" "}
              <Link href="/guides/attractions/teamlab-borderless-tickets" style={BTN_LINK}>teamLab Borderless tickets</Link>{" "}
              — official site or Klook, sale dates and sold-out slots — has its own too.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check Planets dates &amp; prices on Klook →
              </KlookLink>
              <KlookLink href={teamlabBorderlessTicketUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check Borderless dates &amp; prices on Klook →
              </KlookLink>
            </div>
            {/* A34 (27 Nov 2026): the next booking of the same trip (high-EPC guides) — lib/next-booking.ts. */}
            <NextBookingBlock region="tokyo" />
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>Which teamLab in Tokyo is better, Planets or Borderless?</h2>
          <p className={styles.bodyText}>
            Planets is better for walking through water, which makes it the pick with children; Borderless is better
            for roaming the art at your own pace with shoes on. The table sets out the rest.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "teamLab Planets", "teamLab Borderless"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={SOURCE_NOTE}>
            Last checked: {CHECKED_ISO}. Sources:{" "}
            <a href="https://www.teamlab.art/e/planets/" target="_blank" rel="noopener noreferrer">teamlab.art/e/planets</a>,{" "}
            <a href="https://teamlabplanets.dmm.com/en/ticket" target="_blank" rel="noopener noreferrer">teamlabplanets.dmm.com/en/ticket</a>,{" "}
            <a href="https://www.teamlab.art/e/borderless-azabudai/" target="_blank" rel="noopener noreferrer">teamlab.art/e/borderless-azabudai</a>{" "}
            and the Borderless FAQ at{" "}
            <a href="https://www.teamlab.art/faq/Tokyo/" target="_blank" rel="noopener noreferrer">teamlab.art/faq/Tokyo</a>.
            Both museums use dynamic pricing for adult tickets and publish only the lowest price, so confirm the
            figure for your own date. The Planets visit length is a planning figure; teamLab publishes none.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check Planets tickets for your date →
            </KlookLink>
            <KlookLink href={teamlabBorderlessTicketUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check Borderless tickets for your date →
            </KlookLink>
          </div>
        </section>

        <KlookTourPicks
          heading="Book the same day with your teamLab ticket"
          intro="A guided Tokyo day, the subway pass and data for the phone ticket. The Subway Ticket covers Kamiyacho for Borderless; for Planets it reaches Toyosu Station on the Yurakucho Line, 10 minutes' walk away, but not the Yurikamome to Shin-Toyosu. Klook prices change by date, so open a listing for the price on your own date."
          tours={sameDayBookings}
        />

        {/* 22 Nov 2026 (task-jtk-20261122-04): same-day cards near the first Klook buttons. */}
        <KlookSameDayCards heading={SAME_DAY.heading} cards={SAME_DAY.cards} />

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="tokyo" areas={["ginza", "odaiba", "roppongi", "tokyoStation"]} />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost</span>
          <h2 className={styles.sectionTitle}>How much are teamLab Tokyo tickets?</h2>
          <p className={styles.bodyText}>
            An adult pays {P.adult} at Planets and {B.adult} at Borderless, and seeing both costs from
            ¥7,200 for an adult and ¥3,000 for a child aged 4–12, because each museum needs its own ticket.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "teamLab Planets", "teamLab Borderless", "Both museums"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costRows.map((row) => (
                    <tr key={row.who}>
                      <td className={styles.tdProvider}>{row.who}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.both}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={SOURCE_NOTE}>
            Last checked: {CHECKED_ISO} on{" "}
            <a href="https://www.teamlab.art/e/planets/" target="_blank" rel="noopener noreferrer">teamlab.art/e/planets</a>{" "}
            and{" "}
            <a href="https://www.teamlab.art/e/borderless-azabudai/" target="_blank" rel="noopener noreferrer">teamlab.art/e/borderless-azabudai</a>.
            Adult and disability prices are floors that rise on some dates; the &quot;Both museums&quot; column adds
            the two floors together.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>On the day</span>
          <h2 className={styles.sectionTitle}>Can you buy teamLab tickets on the day?</h2>
          <p className={styles.bodyText}>
            Only for Borderless: it sells tickets on the day on the official ticket site if they are not sold out,
            and at the door at ¥200 more for an adult. Planets sells no tickets on site, so a Planets visit has to
            be bought online before you go.
          </p>
          <p className={styles.bodyText}>
            Borderless tickets go on sale around the 1st of the month, two months before the visit, and teamLab
            warns they may sell out. Planets publishes no release date. The{" "}
            <Link href="/guides/attractions/teamlab-borderless-tickets" style={BTN_LINK}>teamLab Borderless tickets</Link>{" "}
            guide covers release dates, the Flexible Pass and door sales; the{" "}
            <Link href="/guides/attractions/teamlab-planets-tickets" style={BTN_LINK}>teamLab Planets tickets</Link>{" "}
            guide covers prices by date, the Premium Pass and what to wear for the water.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Both museums</span>
          <h2 className={styles.sectionTitle}>Can you visit both in one day?</h2>
          <p className={styles.bodyText}>
            Yes, with two timed tickets and a gap between them: allow 1.5–2 hours inside each museum plus the trip
            between Toyosu and Azabudai Hills, or split them across two half-days.
          </p>
          <p className={styles.bodyText}>
            Both together cost from ¥7,200 for an adult. Kamiyacho, for Borderless, is on the Tokyo Metro Hibiya
            Line; for Planets, Toyosu Station on the Yurakucho Line is 10 minutes&apos; walk and Shin-Toyosu on the
            Yurikamome is 3 minutes. Building the rest of the day? See{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={BTN_LINK}>things to do in Tokyo</Link>, the{" "}
            <Link href="/guides/attractions/tokyo-1-day-itinerary" style={BTN_LINK}>Tokyo 1-day itinerary</Link> and the{" "}
            <Link href="/guides/attractions/tokyo-2-day-itinerary" style={BTN_LINK}>Tokyo 2-day itinerary</Link>. Tokyo
            Disney tickets are dated too — see the{" "}
            <Link href="/guides/attractions/tokyo-disney-tickets" style={BTN_LINK}>Tokyo Disneyland tickets guide</Link>.
          </p>
        </section>

        <BookingEsimCard />

        <EsimCtaBottom />

        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>teamLab Tokyo tickets: common questions</h2>
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
          heading="A day trip out of Tokyo"
          intro="Either museum fills part of a Tokyo day. For a full day out of the city, this tour covers Mt. Fuji. Klook prices change by date, so open the listing for the price on your own date."
          tours={[fujiDayTour]}
        />

        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets Tickets (2026): Price, Hours and How to Book" },
              { href: "/guides/attractions/teamlab-borderless-tickets", title: "teamLab Borderless Tickets 2026: How to Book Timed Entry & Price" },
              { href: "/guides/attractions", title: "Japan Attraction Tickets 2026: What to Book in Advance, When" },
              { href: "/guides/attractions/teamlab-kyoto-tickets", title: "teamLab Kyoto Tickets: Prices, Hours & Booking" },
              { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab Fukuoka Tickets 2026: Price, Hours & Booking" },
              { href: "/guides/transport/tokyo-transportation", title: "Getting Around Tokyo (2026): Trains, Subway & IC Cards Explained" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className={styles.relatedCard}>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{item.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
