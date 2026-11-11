import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import { GygCompareButton } from "../../../components/GygCompare";
import { PlanetsAnswer, PlanetsSameDay } from "../../../components/PlanetsBooking";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import {
  fujiDayTour,
  teamlabPlanetsTicketUrl,
  tokyoBaySunsetBoatCruise,
  tokyoJoypolisPassport,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
  tsukijiCultureFoodTour,
} from "../../../lib/klook-links";
import { gygTeamlabPlanets } from "../../../lib/gyg-links";
import { checkedLabel, PLANETS_FACTS, PRICES } from "../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd, attractionEventJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// CTA link — Klook affiliate redirect (teamLab Planets Toyosu ticket), shared with the
// ticket price table.
const PLANETS_URL = teamlabPlanetsTicketUrl;

// Everything below was read on 6 Nov 2026: prices, hours, closed days and access on
// teamlab.art/e/planets, and the booking mechanics on the Help pages of the official ticket
// store it links to (teamlabplanets.dmm.com). teamLab publishes no busy hours and no visit
// length, so those two say "Not stated officially" and the time to allow is labelled ours.
const P = PRICES.teamlabPlanets;
const CHECKED = checkedLabel(P.checked);

const priceRows = [
  {
    ticket: "Adult (18+)",
    price: P.adult,
    varies: "Yes — by date and admission time",
    note: "¥3,800 is the floor, not the price: the store prices every date and slot separately",
  },
  { ticket: "Junior & senior high school", price: "¥2,800", varies: "No — flat", note: "Bring student ID" },
  { ticket: "Children (4–12)", price: P.child, varies: "No — flat", note: "Under-4s do not need a ticket" },
  {
    ticket: "3 and under",
    price: "Free",
    varies: "No — free",
    note: "Bring a change of clothes — the water areas get everyone wet",
  },
  {
    ticket: "Visitor with a disability",
    price: "from ¥1,900",
    varies: "Yes — same calendar as the adult pass",
    note: "Bring your disability certificate",
  },
  {
    ticket: "Premium Pass (ages 4+)",
    price: "¥12,000",
    varies: "No — flat",
    note: "Admission at any time without joining the entry queue; it does not skip queues inside",
  },
];

// The figures that decide the rest of your day, each row with its own source.
const hoursRows = [
  { item: "Opening hours", detail: "08:00–22:00; 08:00–20:00 from Thursday 31 December to Saturday 2 January", source: `teamlab.art, ${CHECKED}` },
  { item: "Last entry", detail: "One hour before closing", source: `teamlab.art, ${CHECKED}` },
  { item: "Closed days", detail: "Thursday 3 December 2026 and Thursday 14 January 2027", source: `teamlab.art, ${CHECKED}` },
  { item: "Run", detail: "7 July 2018 to the end of 2027", source: `teamlab.art, ${CHECKED}` },
  {
    item: "Admission time",
    detail: "The time on the ticket is the admission time; 30 minutes from it is the entry preparing time",
    source: `Official ticket store, ${CHECKED}`,
  },
  { item: "Wait to be admitted", detail: "You may wait 30 to 60 minutes", source: `Official ticket store, ${CHECKED}` },
  { item: "Busiest times", detail: "Not stated officially", source: `Checked teamlab.art and the store, ${CHECKED}` },
  {
    item: "Late for your time",
    detail: "You can still enter the same day during opening hours, subject to last entry",
    source: `Official ticket store, ${CHECKED}`,
  },
  {
    item: "Time to allow",
    detail: "Not stated officially. Plan on 1.5–2 hours, including lockers and drying off",
    source: "Our planning figure",
  },
  {
    item: "Lockers",
    detail: "Free, 23 cm wide × 34 cm deep × 37 cm high; no cloakroom for anything bigger",
    source: `Official ticket store, ${CHECKED}`,
  },
];

// Entrance Pass vs Premium Pass, and the two sellers' own checkouts. The only
// difference the official store claims for the Premium Pass is the entry queue.
const ticketChoice = [
  {
    title: "Entrance Pass — ¥3,800~ for an adult",
    desc: `The normal ticket, and the one almost everyone wants. It fixes a date and an admission time, and the official store prices each combination separately, so the date you pick matters more than the seller you pick. Read on ${CHECKED}.`,
  },
  {
    title: "Premium Pass — ¥12,000, ages 4 and over",
    desc: `What the official store says it buys is one thing: admission at any time, without joining the entry queue — you go to the Information Centre instead. It explicitly does not let you skip the queues inside the exhibition. Worth it only if the 30–60 minute entrance wait would break your day, not as a general upgrade. Read on ${CHECKED}.`,
  },
  {
    title: "Changes, not refunds",
    desc: `Nothing is refundable once bought. What you can do is move it: the store's Help pages allow an Entrance Pass to be changed up to 2 hours before its admission time, a Premium Pass until 08:30 on the day, three changes maximum either way, and tickets bought with a coupon not at all. Read on ${CHECKED}.`,
  },
];

/** Read off the official ticket store and its Help pages on 6 Nov 2026. */
const PREP_CHECKED = "6 Nov 2026";
const prepRows = [
  { item: "Wear", detail: "Shorts or trousers that roll above the knee. Water reaches adult knee height, and mirrored floors make mini-skirts a poor choice. Free rental shorts come in XS to 6L and go back before you leave." },
  { item: "Your ticket", detail: "A QR e-ticket on a phone or tablet, or printed. One QR covers everyone on the purchase. A reminder email arrives 2 days before, and the QR code only displays from 00:00 on the day." },
  { item: "ID", detail: "Junior and senior high school tickets need a student ID or an official age document; disability tickets need an approved certificate." },
  { item: "Bags", detail: "Free lockers sit after the entrance gate, 23 × 34 × 37 cm. Anything larger stays at the stroller parking outside, on a wire lock." },
  { item: "Towel", detail: "Not needed: towels are provided at the exit of the water artworks." },
  { item: "With children", detail: "At least one adult for every three children, free entrants included. Bring a change of clothes. Baby carriers are fine inside; strollers stay outside." },
  { item: "Re-entry", detail: "Not permitted on any ticket, the Premium Pass included. Tickets cannot be refunded once you have entered." },
];

const steps = [
  {
    title: "Pick your date first, then read the price off the calendar",
    desc: `Adult tickets start at ¥3,800~ and the figure you pay depends on the date and the admission time you choose — the store's own Help pages confirm the rates differ between dates. Step through the dates you could take before you settle on one. Read on ${CHECKED}.`,
  },
  {
    title: "Choose the admission time, because that is the booking",
    desc: "The time on the ticket is your admission time, and 30 minutes from it is the entry preparing time. There is no counter at the museum to fall back on, so the slot you select is the visit you get — including on the day, when the calendar may already be full.",
  },
  {
    title: "Decide between the Entrance Pass and the Premium Pass",
    desc: "Four tiers plus a ¥12,000 Premium Pass, and only one of them is about queues. Read the ticket table above first: the Premium Pass buys entry without the entrance queue and nothing else, so most visitors want the Entrance Pass and an earlier slot instead.",
  },
  {
    title: "Buy from the official store or a seller it names",
    desc: `The official store's Help pages state that tickets are not sold on site at counters or vending machines, and name the channels that do sell them: the official Ticket Store, Lawson Ticket, Seven Ticket and Klook. Klook's checkout is in English and your own currency, which is the practical reason most visitors use it. Either way the ticket is a QR code on your phone. Read on ${CHECKED}.`,
  },
  {
    title: "Dress for water, and arrive at the start of your window",
    desc: "Wear shorts or trousers you can roll above the knee — some artworks are water spaces and the water can rise to adult knee height. Free rental shorts are available in sizes XS to 6L if you turn up in a skirt or wide-leg trousers, because parts of the floor are mirrored. The entrance wait can run 30 to 60 minutes, so get there when your window opens.",
  },
];

const faqItems = [
  {
    q: "How much are teamLab Planets tickets in 2026?",
    a: `On the official teamLab Planets ticket store, checked on ${CHECKED}, adult tickets start from ¥3,800, junior and senior high school students pay ¥2,800, children aged 4–12 pay ¥1,500, and children 3 and under enter free. Visitors with a disability pay from ¥1,900, and a Premium Pass is sold at ¥12,000 for ages 4 and over. The adult price varies by date and time slot, so confirm the figure for your own slot before you pay. Discounted tickets need proof of eligibility — bring student ID, a passport or a disability certificate.`,
  },
  {
    q: "Do I need to book teamLab Planets in advance?",
    a: `Yes. Tickets are for a set date and admission time, and the official store states that nothing is sold on site, so a full date cannot be rescued at the door. teamLab publishes no sell-out data, so how far ahead a date fills is not stated officially. Book as soon as your dates are fixed. Read on ${CHECKED}.`,
  },
  {
    q: "Can you buy teamLab Planets tickets at the door?",
    a: `No. The official ticket store's Help pages state that tickets are not available for purchase on-site at ticket counters or vending machines, and name the channels that do sell them: the official Ticket Store, Lawson Ticket, Seven Ticket and Klook. There is no walk-up window to fall back on if your date is full, which is the single biggest difference between Planets and most Tokyo attractions. Read on ${CHECKED}.`,
  },
  {
    q: "What time slot is cheapest at teamLab Planets?",
    a: `Whichever one the official calendar prices lowest on your own date — teamLab publishes no price-per-slot list, so that is the only honest answer. What the official store does confirm is that the adult Entrance Pass starts at ¥3,800~ and that rates differ between dates: its Help pages tell you a booking can be moved "even for dates with different rates". So open the store's calendar, step through the dates and admission times your trip could absorb, and compare the figures before you pay rather than after. Read on ${CHECKED}.`,
  },
  {
    q: "Are there lockers at teamLab Planets?",
    a: `Yes, and they are free. The official Help pages give the size as 23 cm wide by 34 cm deep by 37 cm high — a daypack fits, a suitcase does not. There is no cloakroom: anything larger has to be secured by you with a wire lock at the stroller parking outside the building. Shoes, socks and tights come off at the lockers too, because the museum is walked barefoot from that point on. Read on ${CHECKED}.`,
  },
  {
    q: "What should I wear to teamLab Planets?",
    a: "Shorts, or trousers you can roll up above the knee. Some of the artworks are water spaces and the water can rise to adult knee height, and the whole museum is experienced barefoot — you take off shoes, socks and tights in the locker room on the way in. Parts of the floor are mirrored, so skirts and wide-leg trousers are a bad idea; free rental shorts are available in sizes XS to 6L. If you're bringing children, pack a change of clothes, and note that strollers can't go inside (there's stroller parking, and baby carriers are fine).",
  },
  {
    q: "When do I get my teamLab Planets QR ticket?",
    a: `Tickets are QR e-tickets only. The purchase confirmation email carries the link, a reminder is sent 2 days before your date, and the QR code itself displays from 00:00 on the day of admission. One QR covers everyone on the purchase, and you can show it on a phone or tablet or print it. Read on ${PREP_CHECKED}.`,
  },
  {
    q: "How long do you need at teamLab Planets?",
    a: `teamLab states no visit length. Plan on 1.5 to 2 hours inside, including the lockers and drying off. Add the 30 to 60 minute wait the official store warns about, and do not book anything tight straight afterwards. At busy times the official store says guests who have stayed a long time may be asked to move on. Read on ${CHECKED}.`,
  },
  {
    q: "What are teamLab Planets opening hours, and when is it closed?",
    a: `teamlab.art lists 08:00–22:00, with 08:00–20:00 from 31 December to 2 January, and last entry one hour before closing. The closed days it lists are Thursday 3 December 2026 and Thursday 14 January 2027. Read on ${CHECKED}. Check the official site for your own dates before you book.`,
  },
  {
    q: "What if I miss my teamLab Planets time slot?",
    a: "You can still get in. The official help pages say the printed time is a reference and that you can enter on the same day, within opening hours, if you arrive late. Last admission is one hour before closing.",
  },
  {
    q: "Where is teamLab Planets and how do I get there?",
    a: `It is at 6-1-16 Toyosu, Koto-ku. teamlab.art lists 3 minutes on foot from Exit 1A of Shin-Toyosu Station on the Yurikamome line, 5 minutes from Shijomae Station and Toyosu Market, and 10 minutes from Exit 7 of Toyosu Station on the Tokyo Metro Yurakucho Line. It also lists 15 minutes by taxi from Tokyo Station and 15 minutes by highway from Haneda Airport. Read on ${CHECKED}.`,
  },
  {
    q: "Is teamLab Planets closing?",
    a: `teamlab.art lists its run as 7 July 2018 to the end of 2027. Read on ${CHECKED}. teamLab Borderless in Azabudai Hills is a separate museum with its own tickets.`,
  },
  {
    q: "What's the difference between teamLab Planets and Borderless?",
    a: "Planets, in Toyosu, is a museum where you walk barefoot through water. Borderless, in Azabudai Hills, is a map-less maze of artworks that move between rooms. They are separate museums with separate tickets. Our teamLab Tokyo comparison sets them side by side.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/teamlab-planets-tickets") } });

const ROUTE = "/guides/attractions/teamlab-planets-tickets";
const TITLE = "teamLab Planets Tickets 2026: ¥3,800~, Hours, How to Book";
const DESC =
  "teamLab Planets tickets from ¥3,800 by date and time. Hours, closed days, how to book, busy times and the walk from Shin-Toyosu and Toyosu stations.";

export default function TeamLabPlanetsTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/teamlab-planets-tickets" />
        {hreflangLinks("/guides/attractions/teamlab-planets-tickets")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/teamlab-planets-tickets" />
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
              route: "/guides/attractions/teamlab-planets-tickets",
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
                { "@type": "ListItem", position: 4, name: "teamLab Planets Tickets", item: "https://www.japan-travel-kit.com/guides/attractions/teamlab-planets-tickets" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: attractionEventJsonLd({
              route: ROUTE,
              name: "teamLab Planets TOKYO",
              description: DESC,
              facts: PLANETS_FACTS,
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
          <span className={styles.breadCurrent}>teamLab Planets Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            teamLab Planets Tickets (2026):<br />Price, Hours and How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            What a ticket to teamLab Planets in Toyosu costs, when it is open, how to book and how to get
            there from Shin-Toyosu or Toyosu Station.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices and hours", "Read on teamlab.art"].map((t) => (
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

        {/* The answer first: the table and the Klook button, then the same-day block. */}
        <PlanetsAnswer />

        <PlanetsSameDay />

        <p className={styles.bodyText}>
          Choosing between the two Tokyo museums? Our{" "}
          <Link href="/guides/attractions/teamlab-tokyo-tickets">teamLab Tokyo comparison of Planets and Borderless</Link>{" "}
          sets them side by side.
        </p>

        <EsimCtaTop />

        {/* Prices — the heading is the search query, and the first sentence is the answer. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How much are teamLab Planets tickets in 2026?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            An adult pays <strong>¥3,800~</strong>, a junior or senior high school student ¥2,800, a child aged
            4–12 ¥1,500, and under-4s nothing at all. Only the adult and disability tiers move: the official
            store prices each date and each admission time separately, which is why its own figure carries a
            tilde and why the cheapest ticket on your trip is a question about the calendar rather than about
            the seller.
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
            Read from the official teamLab Planets ticket store on {CHECKED}, in both its English and Japanese
            editions. Discounted tickets need proof of eligibility, so bring student ID, a passport or a
            disability certificate. Tickets are issued as a QR code on your phone.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>How far the adult price moves is not published.</strong> teamLab prints a starting figure
            and a calendar, not a price list, and its Help pages only confirm that the rates differ — a booking
            can be moved, they say, &ldquo;even for dates with different rates&rdquo;. So treat ¥3,800 as the
            floor, open the store&apos;s calendar for the dates your trip could absorb, and compare the
            admission times on each one before you pay. Shifting a Planets visit by a day is the lever here;
            shopping for a cheaper seller is not, because the date sets the price.
          </p>
        </section>

        {/* Hours, slots, how long to allow — the table the rest of the day is built on. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Before you book</span>
          <h2 className={styles.sectionTitle}>Hours, Entry Slots and How Long You Need</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The time printed on your ticket is an admission time, and the official store warns of a 30 to 60
            minute wait. teamLab states neither its busy hours nor a visit length.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "What the official sources say", "Source and date"].map((h) => (
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
            Planets also asks more of you than a normal museum ticket — you go in barefoot and part of the
            route is water:
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Barefoot:</strong> shoes, socks and tights come off at the lockers. The experience is barefoot throughout.</li>
            <li><strong>Water:</strong> some artworks are water spaces and the water can rise to adult knee height. Wear shorts or trousers you can roll up.</li>
            <li><strong>Mirrored floors:</strong> skirts and wide-leg trousers are a problem — the official FAQ says underwear may be visible. Free rental shorts are available in sizes XS to 6L.</li>
            <li><strong>With kids:</strong> bring a change of clothes. Strollers can&apos;t come inside — there&apos;s stroller parking outside, and baby carriers are accepted.</li>
            <li><strong>Luggage:</strong> the free lockers take 23 × 34 × 37 cm. There is no cloakroom, so a suitcase gets wire-locked at the stroller parking by you.</li>
            <li><strong>Water hygiene:</strong> the official FAQ states the water is filtered constantly and its chlorine measured hourly, with sanitised towels at the exits.</li>
            <li><strong>Wheelchairs:</strong> access is available and staff explain the route; some artworks cannot be reached, and the water areas need a transfer to a special wheelchair with a companion.</li>
          </ul>
          <p className={styles.bodyText}>
            Check the official site for your own dates before you book. Everything above except the time to
            allow is official, read on the dates in the table. The official store also says that at busy times
            guests who have stayed a long time may be asked to move on.
          </p>
        </section>

        {/* What it is */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What you&apos;re buying</span>
          <h2 className={styles.sectionTitle}>What teamLab Planets Actually Is</h2>
          <p className={styles.bodyText}>
            teamLab is a Tokyo-based art collective known for room-filling digital installations you walk
            through rather than look at. Planets, in Toyosu, is the physical one: you go barefoot, wade through
            water, and move through works that respond to your presence — a mirrored infinity room, a hall of
            floating orbs, a living garden. It&apos;s the easier of Tokyo&apos;s two teamLab museums to enjoy
            with children, and the one that lands hardest if you&apos;ve never seen digital art at this scale.
          </p>
          <p className={styles.bodyText}>
            teamlab.art lists its run as 7 July 2018 to the end of 2027, so a trip after that date needs
            rechecking.
          </p>
        </section>

        {/* Worth it — a judgement on the official numbers, not on a visit we are claiming. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The decision</span>
          <h2 className={styles.sectionTitle}>Is teamLab Planets worth it?</h2>
          <p className={styles.bodyText}>
            For most first-time visitors to Tokyo, yes — but it is a 1.5 to 2 hour attraction at ¥3,800~ a
            head, so it is priced like a half-day and consumed like a long lunch. Here is the arithmetic in
            front of you rather than a verdict behind it:
          </p>
          <ul className={styles.bodyList}>
            <li><strong>What you pay per hour is high.</strong> ¥3,800~ for 1.5–2 hours is more than twice the ¥1,500 Tokyo Tower Main Deck and well above Shibuya Sky&apos;s {PRICES.shibuyaSky.adult.split(" / ")[0]} daytime online ticket, both of which you can linger in. You are paying for something you cannot see anywhere else, not for length — compare the figures on our <Link href="/guides/attractions/japan-attraction-ticket-prices">Japan attraction ticket prices</Link> table.</li>
            <li><strong>The entry cost is time, not just money.</strong> The official store warns of a 30 to 60 minute wait to be admitted, on top of the barefoot changeover.</li>
            <li><strong>It is the most physical museum in Tokyo.</strong> Barefoot throughout, water to adult knee height, mirrored floors. If that sounds like an ordeal rather than an experience, Borderless in Azabudai is the same collective without the water.</li>
            <li><strong>It is weatherproof and it suits children.</strong> Indoors, under-4s free, and the thing children remember from the trip more often than the temples.</li>
            <li><strong>It cannot be rescued on the day.</strong> No on-site sales means a full calendar is final. The cost of getting this wrong is the whole plan for that afternoon, which is the real argument for booking it first.</li>
          </ul>
          <p className={styles.bodyText}>
            Skip it if your Tokyo days are already tight, if a 30-minute fixed window would wreck a day you
            want to improvise, or if nobody in the group wants to roll their trousers up. Those are the three
            reasons the ticket disappoints, and none of them is about the art.
          </p>
        </section>

        {/* Booking window and sell-outs. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Availability</span>
          <h2 className={styles.sectionTitle}>Do teamLab Planets tickets sell out?</h2>
          <p className={styles.bodyText}>
            Individual admission times do, and when your date fills there is no counter to fall back on: the
            official store states plainly that tickets are not sold on site at ticket counters or vending
            machines. That makes Planets the first thing to book in a Tokyo week rather than the last.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>How far ahead:</strong> not stated officially, and teamLab publishes no sell-out data. Book once your dates are fixed.</li>
            <li><strong>No door tickets:</strong> official, and checked on {CHECKED}. Online only, from the official Ticket Store, Lawson Ticket, Seven Ticket or Klook.</li>
            <li><strong>Ten at a time:</strong> the store caps a single purchase at 10 tickets, and stock can cap it lower. Groups of 20 or more apply through a separate group process.</li>
            <li><strong>Booked the wrong slot?</strong> Change it rather than rebook. An Entrance Pass can be moved up to two hours before its admission time, three changes maximum; a Premium Pass until 08:30 on the day. Nothing is refundable, and coupon tickets cannot be changed at all.</li>
            <li><strong>Late is survivable, missing the day is not:</strong> the official FAQ says you can still get in later the same day within opening hours, subject to last admission one hour before close.</li>
          </ul>
          <p className={styles.bodyText}>
            The practical consequence: pick the date, then the admission time, then the seller. Two of those
            three decide whether you get in at all.
          </p>
        </section>

        {/* Entrance Pass vs Premium Pass — the decision the CTA below belongs to. */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Which ticket</span>
          <h2 className={styles.sectionTitle}>Which teamLab Planets ticket should you buy?</h2>
          <p className={styles.bodyText}>
            The Entrance Pass, in all but one case. The only other option is the ¥12,000 Premium Pass, and the
            single thing the official store claims for it is entry without the entrance queue — so it is worth
            it if a 30 to 60 minute wait would break your day, and a waste of ¥8,000 if it would not.
          </p>
          <div className={styles.stepsList}>
            {ticketChoice.map((item, i) => (
              <div key={item.title} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>As for which admission time:</strong> which hours are busiest is not stated officially,
            and teamLab publishes no per-slot price list. The calendar shows the price for each time, one
            click into either seller below.
          </p>
          {/* The CTA sits here, directly after the date / slot / ticket-type decision —
              the point at which a reader has something to look up rather than read. */}
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PLANETS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check teamLab Planets dates and slots →
            </KlookLink>
            <GygCompareButton slug="teamlab-planets-tickets" listing={gygTeamlabPlanets} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook is one of the sellers the official store names; GetYourGuide is there as a second place to
            look when a slot has gone. Both price by date, so open the calendar rather than trusting a
            headline figure — including the one on this page.
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How do I book teamLab Planets Tokyo?</h2>
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
            <KlookLink href={PLANETS_URL} target="_blank" rel="sponsored noopener">
              Check Planets availability and prices on Klook →
            </KlookLink>
          </p>
        </section>

        {/* The official site question — asked often enough to deserve a heading. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Buying direct</span>
          <h2 className={styles.sectionTitle}>Where is the official teamLab Planets ticket site?</h2>
          <p className={styles.bodyText}>
            The museum&apos;s own page is <strong>teamlab.art/e/planets</strong>, and the tickets it sells are
            sold through the <strong>teamLab Planets TOKYO Official Ticket Store</strong> at{" "}
            <strong>teamlabplanets.dmm.com</strong> — that store, not a search result, is the official
            checkout. Its Help pages are also where every booking rule on this page comes from, read on{" "}
            {CHECKED}.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Who else is official:</strong> the store names Lawson Ticket, Seven Ticket and Klook alongside itself. Anything not on that list is a reseller you have no reason to use.</li>
            <li><strong>How the store takes payment:</strong> credit cards, PayPay and UnionPay through DMM. If your card is refused — which is the usual reason visitors end up elsewhere — a seller with an international checkout solves it.</li>
            <li><strong>How the ticket arrives:</strong> an email with a link to the QR ticket two days before, with the QR code itself displayed from 00:00 on the day of admission.</li>
            <li><strong>What direct does not buy you:</strong> a lower price. The date and admission time set the figure, and the store prices them on the same calendar whichever official channel you use.</li>
          </ul>
          <p className={styles.bodyText}>
            In other words: buy direct if your card works and you read the Japanese or English store happily;
            buy from a named seller if you want the checkout in your own language and currency. Both are
            official, and neither is a workaround.
          </p>
        </section>

        {/* Kids — the official rules, which are stricter than most visitors expect. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>With children</span>
          <h2 className={styles.sectionTitle}>Is teamLab Planets good for kids?</h2>
          <p className={styles.bodyText}>
            It is the most child-friendly museum in Tokyo and the one with the most rules. Under-4s are free,
            4–12s pay ¥1,500, the water in places reaches adult knee height — so higher on a child — and
            strollers cannot come inside at all. Everything below is the official wording, read on {CHECKED}.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Ages and prices:</strong> children 3 and under are free of ticket fare; 4–12 is ¥1,500; junior and senior high school is ¥2,800. The Premium Pass is sold from age 4.</li>
            <li><strong>Supervision:</strong> one adult has to accompany every three children. A single parent with four small children is not a booking the store will honour.</li>
            <li><strong>Strollers:</strong> not allowed in the museum. There is stroller parking outside the building where you lock it yourself with a wire key, and baby carriers are accepted inside.</li>
            <li><strong>Nappies:</strong> changing tables are in the ladies&apos; restrooms.</li>
            <li><strong>The water:</strong> knee height for an adult, and the whole route is barefoot. Bring a change of clothes and expect everyone to get wet, not just the children.</li>
            <li><strong>Clothes:</strong> shorts or roll-up trousers for everyone; the floors are mirrored in places. Free rental shorts run XS to 6L, so a child who turns up in a dress is not a problem.</li>
            <li><strong>Storage:</strong> the free lockers are 23 × 34 × 37 cm — a changing bag fits, a suitcase does not, and oversized items go to the stroller parking.</li>
          </ul>
          <p className={styles.bodyText}>
            Practically: book an early slot, feed them first, and keep the rest of the afternoon loose. The
            30 to 60 minute entrance wait is the part that tests small children, not the artworks.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Planets or Borderless</span>
          <h2 className={styles.sectionTitle}>Should you book Planets or Borderless?</h2>
          <p className={styles.bodyText}>
            They are separate museums with separate tickets. Planets is the barefoot one you walk through
            water in; Borderless is a map-less maze in Azabudai Hills. Our{" "}
            <Link href="/guides/attractions/teamlab-tokyo-tickets">teamLab Tokyo comparison</Link> has prices,
            hours and who each suits, and the{" "}
            <Link href="/guides/attractions/teamlab-borderless-tickets">teamLab Borderless ticket guide</Link>{" "}
            covers booking that museum.
          </p>
        </section>

        {/* What to wear and bring — the checklist the competing guides lead with. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you go</span>
          <h2 className={styles.sectionTitle}>What to Wear and Bring to teamLab Planets</h2>
          <ul className={styles.bodyList}>
            {prepRows.map((row) => (
              <li key={row.item}><strong>{row.item}:</strong> {row.detail}</li>
            ))}
          </ul>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            From the official ticket store and its Help pages, read on {PREP_CHECKED}.
          </p>
        </section>

        {/* Getting there */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How to get to teamLab Planets from Toyosu and Shin-Toyosu</h2>
          <p className={styles.bodyText}>
            The address is 6-1-16 Toyosu, Koto-ku (東京都江東区豊洲6-1-16). teamlab.art lists these routes,
            read on {CHECKED}:
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Shin-Toyosu Station</strong> (Yurikamome Line): 3 minutes on foot from Exit 1A. The official store&apos;s directions are to leave the ticket gate, go right and take the North Exit.</li>
            <li><strong>Toyosu Station</strong> (Tokyo Metro Yurakucho Line): 10 minutes on foot from Exit 7. Walk along the Yurikamome viaduct and the museum is on your right.</li>
            <li><strong>Shijomae Station</strong> (Yurikamome Line) and Toyosu Market: 5 minutes on foot.</li>
            <li><strong>Taxi:</strong> 10 minutes from Ginza, 15 from Tokyo Station, or 15 by highway from Haneda Airport.</li>
            <li><strong>Bus:</strong> teamlab.art warns of heavy congestion on the To-05-2 Toei bus from Tokyo Station, Ginza and Tsukiji, and suggests other transport. Paid shuttle buses run between GINZA SIX and the museum.</li>
            <li><strong>Parking:</strong> none at the museum.</li>
          </ul>
          <p className={styles.bodyText}>
            A{" "}
            <Link href="/guides/transport/ic-cards-japan">Suica or Pasmo IC card</Link>{" "}
            covers both the Yurakucho and Yurikamome legs —{" "}
            <Link href="/guides/transport/tokyo-transportation">our Tokyo transport guide</Link>{" "}
            explains the lines if Toyosu is new territory.
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

        {/* What else fits the same day. A Planets slot is 1.5–2 hours in a corner of
            Tokyo most itineraries visit once, so the rest of the day is a real
            question — and these are the listings that answer it. The ticket CTAs
            above are untouched. */}
        <KlookTourPicks
          heading="Book It For the Same Day in Toyosu and Odaiba"
          intro="A Planets slot fills an hour and a half of a day out east, and the Yurikamome line that drops you at the door carries on into Odaiba. The subway pass covers the Metro leg to Toyosu but not the Yurikamome; the other three are all within a short ride of the museum. Klook prices change by date, so open a listing for the figure and the times on your own date."
          tours={[tokyoJoypolisPassport, tokyoBaySunsetBoatCruise, tsukijiCultureFoodTour, tokyoSubwayTicket]}
        />

        {/* Klook tours in the same city — the ticket CTAs above are unchanged. */}
        <KlookTourPicks
          heading="Day Trips From the Same City"
          intro="Planets takes about an hour and a half on site, so it usually shares a day with something else. If you still have a free day in the Tokyo half of your trip, these two run out of the city and back the same evening."
          tours={[fujiDayTour, tokyoSightseeingBusTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/teamlab-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Tokyo Tickets (2026): Planets or Borderless?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            <Link href="/guides/attractions/warner-bros-studio-tour-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 4l-9 9 2 2 9-9z" />
                  <path d="M5 19l2-6 4 4-6 2z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Warner Bros. Studio Tour Tokyo Tickets (2026): Prices &amp; How to Book</p>
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
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Ready to book teamLab Planets?</h2>
            <p className={styles.ctaBannerDesc}>
              Tickets are for a set date and time, and nothing is sold at the museum. Klook is one of the agencies
              the official store lists, and the ticket is a QR code on your phone.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={PLANETS_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View teamLab Planets Tickets →
              </KlookLink>
              <GygCompareButton slug="teamlab-planets-tickets" listing={gygTeamlabPlanets} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
