import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import {
  dotonboriCityCruise,
  osakaAmazingPass,
  osakaPrivateWalkingTour,
  shinsekaiNightFoodTour,
  teamlabBotanicalGardenOsakaTicket,
  teamlabBotanicalTripPrep,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";

/**
 * teamLab Botanical Garden Osaka — written 28 Oct 2026 for the exact phrase
 * "teamLab Botanical Garden Osaka Tickets".
 *
 * This site already covers the two Tokyo teamLabs (Planets in Toyosu, Borderless in
 * Azabudai Hills) and both of those are indoor, daytime-capable museums. The Osaka
 * venue is a different proposition — it opens only after dark, it is outdoors inside a
 * working botanical garden, and its hours move with sunset every few weeks — which is
 * why it needed a page rather than a paragraph.
 *
 * Every figure here is an official one, read on 28 Oct 2026, and sourced per claim:
 *
 *   teamlab.art/e/            the exhibition's own page: adult (16+) ¥1,800, ages 6–15
 *     botanicalgarden/        ¥500, disability ¥900, preschool free; dynamic pricing, so
 *                             the figure moves with the date; on site adults pay +¥200
 *                             and children and disability +¥100, same-day only and
 *                             subject to selling out. The dated hours table, the three
 *                             published closed days and the adjacent-stadium notice are
 *                             off the same page.
 *   teamlab.art/faq/          the official FAQ: open in rain, with closure or temporary
 *     botanicalgarden/        closure possible on venue conditions; a storm, heavy-rain
 *                             or thunder warning can delay opening or close it; no limit
 *                             on how long you stay once admitted; official-site tickets
 *                             can have their date changed up to three times and can be
 *                             cancelled, both until 21:00 on the admission date.
 *   metronine.osaka/en        Osaka Metro's own spot listing: "M26 Nagai" on the
 *     (spot_id=16932883533092) Midosuji Line, "About 10 mins walk from Exit 3 at Nagai
 *                             Station", and the 2026 closed dates.
 *
 * Both teamlab.art pages are client-rendered — an automated read returns the page title
 * and nothing else — so the figures were taken from the www.teamlab.art search index for
 * those two URLs on 28 Oct 2026 rather than from a rendered read. That is the same
 * method the Klook listing is confirmed by on every page of this site, and it is why
 * each table carries its check date. Nothing here is first-hand, and no Klook price
 * appears anywhere.
 */
const CHECKED = checkedLabel("2026-10-28");

const TEAMLAB_URL = teamlabBotanicalGardenOsakaTicket.url;

/** What each ticket costs, advance against on site. */
const priceRows = [
  { ticket: "Adult (16 and over)", advance: "¥1,800", door: "¥2,000 (+¥200)" },
  { ticket: "Child, ages 6–15", advance: "¥500", door: "¥600 (+¥100)" },
  { ticket: "Disability discount", advance: "¥900", door: "¥1,000 (+¥100)" },
  { ticket: "Preschool children", advance: "Free", door: "Free" },
];

/** The hours, as the official page publishes them — period by period. */
const hoursRows = [
  { period: "1–9 October 2026", open: "18:15–21:30", last: "20:30" },
  { period: "10–27 October 2026", open: "18:00–21:30", last: "20:30" },
  { period: "28 October – 1 November 2026", open: "18:00–22:30", last: "21:30" },
  { period: "2 November 2026", open: "18:00–21:30", last: "20:30" },
  { period: "3–8 November 2026", open: "18:00–22:30", last: "21:30" },
  { period: "9 November 2026 – 31 January 2027", open: "18:00–21:30", last: "20:30" },
];

/** The booking rules an AI answer stops short of. */
const bookingRows = [
  {
    q: "Is there a ticket at the gate?",
    a: "Yes, but only the same day's, and it costs more: an adult pays ¥200 extra and a child or disability ticket ¥100 extra on site. The official page also states that on-site tickets may sell out, so it is a fallback rather than a plan.",
  },
  {
    q: "Can I change the date?",
    a: "On a ticket bought from the official site, yes — up to three times, until 21:00 on the admission date shown on the ticket. A reseller sets its own terms, so read what your own checkout says before you pay.",
  },
  {
    q: "Can I cancel?",
    a: "An official-site ticket can be cancelled, and the cancellation has to be completed by 21:00 on the scheduled admission date. Again, a reseller's terms are its own.",
  },
  {
    q: "Does the price change with the date?",
    a: "Yes. teamLab states a dynamic pricing system is in place, so ¥1,800 is the published adult figure rather than a fixed one — check the figure for your own date at the checkout.",
  },
  {
    q: "Which days is it closed?",
    a: "The official page lists 26 October 2026, 14 December 2026 and 18 January 2027. Osaka Metro's own listing adds 14 and 28 September 2026 — all of them Mondays, so check your own date against the official calendar rather than assuming a weekly pattern.",
  },
];

/** How this venue differs from the two in Tokyo. */
const venueRows = [
  {
    venue: "teamLab Botanical Garden Osaka",
    where: "Nagai Botanical Garden, Higashisumiyoshi-ku, Osaka",
    indoors: "Outdoors, in a working botanical garden",
    when: "Night only — opens 18:00 or 18:15, closes 21:30 or 22:30 by period",
    adult: "¥1,800 (dynamic)",
  },
  {
    venue: "teamLab Planets TOKYO",
    where: "Toyosu, Tokyo",
    indoors: "Indoors; barefoot and water areas",
    when: "Daytime and evening, in 30-minute admission slots",
    adult: "from ¥3,800",
  },
  {
    venue: "teamLab Borderless",
    where: "Azabudai Hills, Tokyo",
    indoors: "Indoors; a walk-through labyrinth of rooms",
    when: "Daytime and evening, timed entry or a Flexible Pass",
    adult: "from ¥3,400",
  },
];

const steps = [
  {
    title: "Check whether your date is one of the closed ones",
    desc: "Before anything else. The official page publishes the closures individually — 26 October 2026, 14 December 2026, 18 January 2027 — and they fall on Mondays, so a Monday evening in Osaka is the one to verify rather than assume.",
  },
  {
    title: "Look up the hours for your own period, not the venue's 'usual' hours",
    desc: "This is a night venue whose opening follows sunset, and it changes every few weeks. From 9 November 2026 to 31 January 2027 it is 18:00–21:30 with last entry 20:30; a week earlier it closed an hour later. Your last entry, not the closing time, is the deadline that matters.",
  },
  {
    title: "Buy in advance rather than at the gate",
    desc: "An advance adult ticket is ¥1,800 against ¥2,000 on site, and a child's ¥500 against ¥600. The official page also warns that same-day tickets may sell out, which an advance ticket removes entirely.",
  },
  {
    title: "Pick the seller your card and your plans suit",
    desc: "The official ticket site lets you change the date up to three times until 21:00 on the admission day, which is the most flexible option if your Osaka days are still moving. Klook's listing checks out in English, takes foreign cards, and sells the admission either alone or bundled with a one-way JR HARUKA leg from Kansai Airport.",
  },
  {
    title: "Dress for a park after dark, and check the forecast",
    desc: "The whole exhibition is outdoors. teamLab's own guidance is to wear what suits the season and the weather, and the FAQ confirms the garden opens in rain — but a storm, heavy-rain or thunder warning can delay opening or close it, so look at the forecast on the day.",
  },
];

const faqItems = [
  {
    q: "How much are teamLab Botanical Garden Osaka tickets?",
    a: `An adult aged 16 or over is ¥1,800 and a child aged 6 to 15 is ¥500 on teamLab's own published prices, with a ¥900 disability rate and free entry for preschool children. Buying on site costs more — ¥200 extra for an adult, ¥100 extra for a child or disability ticket — and the official page states that same-day tickets may sell out. teamLab also runs dynamic pricing here, so treat ¥1,800 as the published figure rather than a fixed one and confirm the price for your own date at the checkout. Read on ${CHECKED}.`,
  },
  {
    q: "Is teamLab Botanical Garden Osaka open in the rain?",
    a: `Yes — teamLab's official FAQ states the exhibition will be open even if it rains, while adding that it may close or close temporarily depending on conditions at the venue. The exception is severe weather: if a storm warning, a heavy-rain warning or a thunder advisory is in effect, opening can be delayed or the garden can shut. Buying from the official ticket site has one practical advantage here — closure notices are emailed to the address used at purchase. The whole venue is outdoors and unsheltered, so a wet evening is a different visit from a dry one even when the gate is open. Read on ${CHECKED}.`,
  },
  {
    q: "How long do you need at teamLab Botanical Garden Osaka?",
    a: `As long as you want: teamLab's official FAQ states there is no limit on the length of your stay once you have been admitted. What is limited is the window — last entry is 20:30 in most periods and 21:30 in the late-closing ones, so the practical constraint is arriving in time rather than being moved on. Plan the walk around the closing time published for your own date and give yourself more than the gap between last entry and closing, which is one hour.`,
  },
  {
    q: "How do I get to teamLab Botanical Garden Osaka?",
    a: `Nagai Station on the Osaka Metro Midosuji Line — station M26 — then about ten minutes on foot from Exit 3, which is Osaka Metro's own published figure for the venue. The exhibition sits inside Nagai Botanical Garden in Nagai Park, at 1-23 Nagaikoen, Higashisumiyoshi-ku. From Namba the Midosuji Line runs straight there with no change, which is the reason a Namba or Shinsaibashi base works well for a visit that finishes after 21:00. Read on ${CHECKED}.`,
  },
  {
    q: "Is it worth it with kids?",
    a: "On price, clearly: ages 6 to 15 pay ¥500 and preschool children nothing, which is the cheapest teamLab admission in Japan by a wide margin. On practicalities, think about the hours rather than the art — nothing opens before 18:00, so this is an after-dark outing on paths through a park, and the youngest children will be doing it at or past bedtime. Klook's listing states the activity is stroller and wheelchair accessible and warns that there may be flashing lights and loud noises, which is the thing to weigh for a child who is sensitive to either.",
  },
  {
    q: "What time does teamLab Botanical Garden Osaka open and close?",
    a: `It changes through the year, because the venue only opens after dark. On the official schedule read on ${CHECKED}: 18:15–21:30 from 1 to 9 October 2026, 18:00–21:30 from 10 to 27 October, 18:00–22:30 from 28 October to 1 November, 18:00–21:30 on 2 November, 18:00–22:30 from 3 to 8 November, then 18:00–21:30 from 9 November 2026 all the way to 31 January 2027. Last entry is one hour before closing in every one of those periods.`,
  },
  {
    q: "Do you need to book teamLab Botanical Garden Osaka in advance?",
    a: "Not strictly — the venue does sell same-day tickets on site — but there are two good reasons to. It is ¥200 cheaper per adult and ¥100 cheaper per child bought ahead, and teamLab's own page warns that on-site tickets may sell out. The flexibility argument also runs the other way from most attractions: a ticket bought on the official site can have its date changed up to three times until 21:00 on the admission day, so booking early costs you very little optionality.",
  },
  {
    q: "How is this different from teamLab Planets or Borderless?",
    a: "Three ways that matter before you book. It is outdoors, in a real botanical garden, rather than inside a building. It is night-only — nothing before 18:00, where both Tokyo venues run through the day. And it is far cheaper: ¥1,800 for an adult against from ¥3,800 at Planets in Toyosu and from ¥3,400 at Borderless in Azabudai Hills. It is also in Osaka, which is the practical difference for most trips: if you are choosing between them rather than doing both, the choice is usually made by which city you are sleeping in.",
  },
  {
    q: "Which days is teamLab Botanical Garden Osaka closed?",
    a: `The official page lists 26 October 2026, 14 December 2026 and 18 January 2027, and Osaka Metro's own spot listing adds 14 and 28 September 2026. Every one of those is a Monday, but they are published as individual dates rather than as a rule, so check your own date against the official calendar instead of working from a pattern. Read on ${CHECKED}.`,
  },
  {
    q: "Is there anything else to know before you go?",
    a: `Two things off the official pages. First, the garden warns that sound and light from concerts and rehearsals at the adjacent stadium may affect the viewing environment of certain artworks — it names 28 October to 1 November and 3 to 8 November 2026, between 18:00 and 20:15 — so if your evening falls in one of those windows, later is better. Second, this is a park at night in winter: January's mean daily minimum in Osaka is 3.0°C on the Japan Meteorological Agency's 1991–2020 normals, and you will be walking outdoors in it for an hour or more.`,
  },
];

const TITLE = "teamLab Botanical Garden Osaka Tickets: Prices & Hours";
const DESCRIPTION =
  "teamLab Botanical Garden Osaka tickets are ¥1,800 adult and ¥500 for ages 6–15, ¥200 more on site. Night-only hours, the rain rule and getting to Nagai.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/teamlab-botanical-garden-osaka-tickets") },
});

export default function TeamlabBotanicalGardenOsakaTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link
          rel="canonical"
          href="https://www.japan-travel-kit.com/guides/attractions/teamlab-botanical-garden-osaka-tickets"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta
          property="og:url"
          content="https://www.japan-travel-kit.com/guides/attractions/teamlab-botanical-garden-osaka-tickets"
        />
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
              route: "/guides/attractions/teamlab-botanical-garden-osaka-tickets",
              headline: TITLE,
              description: DESCRIPTION,
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
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Things to Do",
                  item: "https://www.japan-travel-kit.com/guides/attractions",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "teamLab Botanical Garden Osaka Tickets",
                  item: "https://www.japan-travel-kit.com/guides/attractions/teamlab-botanical-garden-osaka-tickets",
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
          <span className={styles.breadCurrent}>teamLab Botanical Garden Osaka Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            teamLab Botanical Garden Osaka Tickets:<br />Prices, Hours and the Rain Rule
          </h1>
          <p className={styles.heroSubtitle}>
            The cheapest teamLab in Japan, and the only one that is outdoors and opens only after dark — in a
            working botanical garden ten minutes from Nagai Station.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices, checked", "Night-only hours", "vs Planets & Borderless"].map((t) => (
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
            <strong>teamLab Botanical Garden Osaka tickets</strong> are <strong>¥1,800</strong> for an adult
            aged 16 or over and <strong>¥500</strong> for a child aged 6 to 15, with a ¥900 disability rate and
            free entry for preschool children — and ¥200 more per adult, ¥100 more per child, if you buy at the
            gate instead. It is a <strong>night-only, outdoor</strong> exhibition inside Nagai Botanical Garden,
            about <strong>ten minutes on foot from Exit 3 at Nagai Station</strong> on the Midosuji Line, and
            nothing opens before 18:00: from 9 November 2026 to 31 January 2027 the published hours are
            18:00–21:30 with <strong>last entry at 20:30</strong>. There is no limit on how long you stay once
            you are in, teamLab prices the venue dynamically so ¥1,800 moves with the date, and the garden
            opens in rain — though a storm, heavy-rain or thunder warning can delay or close it. All figures
            read on {CHECKED} off teamLab&apos;s own exhibition page and FAQ, with the access figure from Osaka
            Metro&apos;s official listing.
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
                <p className={styles.verdictStatLabel}>Adult / child</p>
                <p className={styles.verdictStatValue}>¥1,800 / ¥500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hours (to 31 Jan 2027)</p>
                <p className={styles.verdictStatValue}>18:00–21:30, last entry 20:30</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Getting there</p>
                <p className={styles.verdictStatValue}>Nagai (M26), 10 min walk</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>On site</p>
                <p className={styles.verdictStatValue}>+¥200 adult, may sell out</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> book ahead — it is cheaper than the gate and the gate can run out —
              and check the hours published for your own date rather than the ones you read somewhere else,
              because this venue&apos;s opening follows sunset and moves every few weeks.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink
                href={TEAMLAB_URL}
                target="_blank"
                rel="sponsored noopener"
                className={styles.verdictBtn}
              >
                Check teamLab Botanical Garden tickets →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Q1 — price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How Much Are teamLab Botanical Garden Osaka Tickets?</h2>
          <p className={styles.bodyText}>
            ¥1,800 for an adult, ¥500 for a child aged 6 to 15 — and ¥200 or ¥100 more respectively if you buy
            at the venue on the day. That makes this the cheapest teamLab admission in Japan by a long way, and
            it is the single most useful thing to know before comparing it with the Tokyo venues.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Bought in advance", "Bought on site"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.advance}</td>
                      <td className={styles.tdPrice}>{row.door}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Prices read on {CHECKED} off teamLab&apos;s own exhibition page for the venue, which also states
            that a dynamic pricing system is in place — so the adult figure can differ by date, and the
            checkout is the only authority on what you will actually pay. The on-site column is that page&apos;s
            own surcharge (+¥200 adult, +¥100 child and disability), and the same page notes that only
            same-day tickets are sold on site and that they may sell out. For every other attraction we have
            verified, see our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>.
          </p>
        </section>

        {/* Q2 — hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hours</span>
          <h2 className={styles.sectionTitle}>What Time Does teamLab Botanical Garden Osaka Open and Close?</h2>
          <p className={styles.bodyText}>
            After dark, and not at a fixed time. This is the detail that trips people up: the garden is a
            night venue whose opening follows sunset, so the hours are published period by period rather than
            as one line, and last entry is an hour before closing in every period.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Period", "Open", "Last entry"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.period}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.period}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.open}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.last}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Hours as the official exhibition page publishes them, read on {CHECKED}. The same page lists the
            closures individually — 26 October 2026, 14 December 2026 and 18 January 2027 — and Osaka
            Metro&apos;s own spot listing adds 14 and 28 September 2026. It also carries a notice that sound
            and light from the adjacent stadium may affect certain artworks between 18:00 and 20:15 on 28
            October to 1 November and 3 to 8 November 2026. Anything beyond 31 January 2027 is not published
            yet, so check the calendar for your own date.
          </p>
        </section>

        {/* Q3 — booking rules and the CTA. The part an AI answer does not finish:
            what the gate can and cannot do, and what the date-change terms are. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do You Need to Book teamLab Botanical Garden Osaka in Advance?</h2>
          <p className={styles.bodyText}>
            Not strictly — same-day tickets are sold at the venue — but booking ahead is both cheaper and
            safer, and it costs you less flexibility here than at most attractions, because a ticket from the
            official site can have its date changed up to three times.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Question", `What teamLab publishes (read ${CHECKED})`].map((h) => (
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
            Two sellers worth knowing about. The official ticket site is the one with the three date changes
            and the closure emails; Klook&apos;s listing checks out in English, takes foreign cards, and sells
            the admission either on its own or bundled with a one-way JR HARUKA leg from Kansai Airport —
            which is worth a look if this is the evening you land.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={TEAMLAB_URL} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check tickets on Klook →
            </KlookLink>
            <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Osaka Amazing Pass →
            </KlookLink>
          </div>
        </section>

        {/* Q4 — rain */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Weather</span>
          <h2 className={styles.sectionTitle}>Is teamLab Botanical Garden Osaka Open in the Rain?</h2>
          <p className={styles.bodyText}>
            Yes — teamLab&apos;s official FAQ states the exhibition will be open even if it rains, with the
            caveat that it may close or close temporarily depending on conditions at the venue. The hard limit
            is a warning: if a storm warning, a heavy-rain warning or a thunder advisory is in effect, opening
            can be delayed or the garden can shut for the evening.
          </p>
          <p className={styles.bodyText}>
            Two practical consequences. First, the whole exhibition is outdoors and unsheltered, so a wet
            evening is a genuinely different visit even when the gate is open — teamLab&apos;s own advice is
            simply to dress for the season and the weather. Second, buying from the official ticket site has
            an advantage nobody advertises: closure notices go to the email address used at purchase, so you
            find out before you travel across the city. If your date is fixed and the forecast is bad, the
            date-change option is the thing to use rather than the gate.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Weather policy read on {CHECKED} off teamLab&apos;s official FAQ for the venue. Winter visitors
            should note what an hour outdoors after 18:00 means in Osaka: the Japan Meteorological
            Agency&apos;s 1991–2020 normals put January&apos;s mean daily minimum at 3.0°C and the monthly
            mean at 6.2°C.
          </p>
        </section>

        {/* Klook: the rest of the Osaka day the garden sits at the end of. */}
        <KlookTripPrep
          label="The rest of the day"
          heading="What Else Should You Book for a Nagai Evening?"
          intro="Nothing here opens before 18:00, so the booking question is really about the afternoon in front of it — and about getting back up the Midosuji Line afterwards. These are the pieces that follow from a 6 pm entry on the far south side of the city."
          items={teamlabBotanicalTripPrep}
        />

        {/* Q5 — vs the Tokyo venues */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Botanical Garden Osaka vs teamLab Planets vs Borderless</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            If you are choosing rather than collecting, the honest answer is the city you are sleeping in —
            these are not interchangeable experiences. Osaka&apos;s is outdoors, after dark and less than half
            the price; Tokyo&apos;s two are indoors, open through the day, and built around rooms rather than
            paths.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Venue", "Where", "Indoors or out", "When it is open", "Adult price"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {venueRows.map((row) => (
                    <tr key={row.venue}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.venue}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.indoors}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.adult}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The Osaka row is read on {CHECKED}; the two Tokyo figures are the ones verified on our{" "}
            <Link href="/guides/attractions/teamlab-tokyo-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>
              teamLab Planets guide
            </Link>{" "}
            and our{" "}
            <Link href="/guides/attractions/teamlab-borderless-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>
              teamLab Borderless guide
            </Link>
            , each with its own check date. All three price by date, so each figure is a floor rather than a
            fare.
          </p>
        </section>

        {/* Q6 — access */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to teamLab Botanical Garden Osaka?</h2>
          <p className={styles.bodyText}>
            Nagai Station on the Midosuji Line — M26 — then about ten minutes on foot from Exit 3, which is
            Osaka Metro&apos;s own published walking time for the venue. The exhibition is inside Nagai
            Botanical Garden in Nagai Park, at 1-23 Nagaikoen in Higashisumiyoshi-ku, on the far south side of
            the city.
          </p>
          <p className={styles.bodyText}>
            The Midosuji Line is the detail that makes the evening easy: Namba, Shinsaibashi and Umeda are all
            on it, so the trip out and the trip back are one train with no change at an hour when you will not
            want one. Our{" "}
            <Link href="/guides/transport/osaka-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              getting around Osaka guide
            </Link>{" "}
            covers the line and the IC-card fares, and our{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={{ color: "var(--red)", fontWeight: 600 }}>
              where to stay in Osaka guide
            </Link>{" "}
            explains why a Midosuji base is worth paying for. If you are arriving from Kansai Airport the same
            day, our{" "}
            <Link href="/guides/transport/osaka-airport-transfer" style={{ color: "var(--red)", fontWeight: 600 }}>
              Osaka airport transfer guide
            </Link>{" "}
            compares the HARUKA and the Rapi:t — and Klook sells this admission bundled with a one-way HARUKA
            leg, which is the combination that suits a landing day.
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How Do You Book teamLab Botanical Garden Osaka?</h2>
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
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={TEAMLAB_URL} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check teamLab Botanical Garden tickets →
            </KlookLink>
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

        {/* Klook tours in the same city — the ticket CTAs above are unchanged. */}
        <KlookTourPicks
          heading="The Afternoon Before, and the Evening After"
          intro="A 6 pm entry leaves a whole Osaka afternoon in front of it and, if you take a late slot, an appetite afterwards. All three of these are booked on the same Klook account as the admission."
          tours={[osakaPrivateWalkingTour, dotonboriCityCruise, shinsekaiNightFoodTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
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
            <Link href="/guides/attractions/things-to-do-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V8l5-3 5 3v13" />
                  <path d="M13 21V11l5-3 3 2v11" />
                  <path d="M7 11v.01M7 15v.01M17 13v.01M17 17v.01" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Osaka (2026): Where the Pass Pays and Where It Doesn&apos;t</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-2-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka 2 Day Itinerary (2026): Day by Day, and What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-attractions-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 10h18M7 15h4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Amazing Pass (2026): ¥2,500 a Day — Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M10 21v-6h4v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Osaka (2026): Best Areas, Compared by Line and Airport</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Osaka (2026): Subway, Trains &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-attraction-ticket-prices" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v14H4z" />
                  <path d="M4 10h16M9 10v9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Attraction Ticket Prices 2026: Official Prices and Booking Rules</p>
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
            <h2 className={styles.ctaBannerTitle}>Book before the gate does it for you</h2>
            <p className={styles.ctaBannerDesc}>
              An advance adult ticket is ¥1,800 against ¥2,000 on site, and teamLab&apos;s own page warns that
              same-day tickets may sell out. Klook&apos;s listing takes foreign cards, checks out in English,
              and sells the admission alone or with a one-way JR HARUKA leg from Kansai Airport.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TEAMLAB_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View teamLab Botanical Garden tickets →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
