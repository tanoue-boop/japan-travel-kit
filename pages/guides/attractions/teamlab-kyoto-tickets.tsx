import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookStayAreas from "../../../components/KlookStayAreas";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import {
  kyotoHighlightBusTour,
  kyotoKimonoYumeyakata,
  kyotoTeamlabBiovortexWalkingTour,
  saganoRomanticTrainTicket,
  teamlabBiovortexKyotoTicket,
  teamlabKyotoTripPrep,
  whereToStayKyotoAreas,
} from "../../../lib/klook-links";
import { gygKyotoEntryTickets, gygTeamlabBiovortexKyoto } from "../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";

/**
 * teamLab Kyoto Tickets — written 28 Oct 2026 for the exact phrase
 * "teamLab Kyoto Tickets", which is what people search for even though the
 * museum's own name is longer.
 *
 * This is the fourth teamLab venue on this site, after Planets in Toyosu,
 * Borderless in Azabudai Hills and the night-only Botanical Garden in Osaka.
 * It needed its own page for three reasons: it is the largest of the four, it
 * is a seven-minute walk from Kyoto Station rather than a trek, and its adult
 * tier is dynamically priced, so the number everybody quotes is a floor.
 *
 * Every figure here is an official one, read on 28 Oct 2026 and sourced per
 * claim:
 *
 *   teamlab.art/e/kyoto/   the venue's own page: the 9:00–21:00 hours and 19:30
 *                          last entry; adult (18+) ¥3,800, ages 13–17 ¥2,800,
 *                          ages 4–12 ¥1,800, 3 and under free; the variable
 *                          pricing note; the ¥12,000 Flexible Pass and that it
 *                          specifies only a date; the ID requirement for ages
 *                          13–17; the date change up to three times on
 *                          official-site tickets; the address at 21-5
 *                          Higashikujo Higashi-Iwamotocho, Minami-ku; the
 *                          seven-minute walk from Kyoto Station's Hachijo East
 *                          Gate and eleven minutes from Shichijo on the Keihan
 *                          Line; the published closed days; the 10:00–17:00
 *                          telephone line
 *   teamlab.art/faq/kyoto/ the official FAQ: no limit on how long you stay once
 *                          admitted, and that strollers are not permitted and go
 *                          in the luggage room
 *   teamlab.art/press/     the opening date of 7 October 2025, "its largest
 *                          museum in Japan", over 50 artworks, more than 10,000
 *                          square metres across four floors
 *
 * Both teamlab.art pages are client-rendered — an automated read returns the
 * page title and nothing else — so the figures were taken from the
 * www.teamlab.art search index for those URLs rather than from a rendered read.
 * That is the same method used on the teamLab Botanical Garden Osaka page, and
 * it is why every table carries its check date.
 *
 * The 1-to-2-hour suggested duration and the full street address are Klook's own,
 * off its listing for the museum, confirmed through the www.klook.com search
 * index the same day. Nothing here is first-hand, and no Klook or GetYourGuide
 * price appears anywhere: both answer automated reads with HTTP 403.
 *
 * Commission note: this is a museum admission, so the Klook ticket is not
 * assumed to pay the 6.5% tours band. The Kyoto walking tour that ends inside the
 * museum, the Kyoto hotel searches and the Kyoto highlight day are the 6.5%
 * links, and GetYourGuide sits beside the bare ticket — see lib/gyg-links.ts.
 */
const CHECKED = checkedLabel("2026-10-28");

const TEAMLAB_URL = teamlabBiovortexKyotoTicket.url;
const SLUG = "teamlab-kyoto-tickets";

/** What each ticket costs on teamLab's own published prices. */
const priceRows = [
  {
    ticket: "Adult, 18 and over",
    price: "¥3,800",
    note: "The published figure, not a fixed one — teamLab states adult admission uses a variable pricing system, so it moves with the date and time you pick",
  },
  {
    ticket: "Ages 13–17",
    price: "¥2,800",
    note: "Proof of ID is required at the entrance gate for this tier",
  },
  { ticket: "Ages 4–12", price: "¥1,800", note: "A flat rate rather than a variable one" },
  { ticket: "3 and under", price: "Free", note: "No ticket needed" },
  {
    ticket: "Flexible Pass",
    price: "¥12,000",
    note: "Adult or child. You specify only the date and enter any time during opening hours — the option for a day whose shape is not settled yet",
  },
];

/** Hours and the published closures, as the official page gives them. */
const hoursRows = [
  { item: "Opening hours", value: "9:00 – 21:00", note: "Published as subject to change; teamLab's own figure" },
  { item: "Last entry", value: "19:30", note: "An hour and a half before closing — the deadline that actually binds your evening" },
  {
    item: "How long you can stay",
    value: "No limit",
    note: "The official FAQ states there is no limit on the length of your stay once you have been admitted",
  },
  {
    item: "Published closed days",
    value: "Tue 17 Nov, Thu 19 Nov, Tue 15 Dec",
    note: "Listed as individual dates and as subject to change, so check your own date rather than assuming a weekly pattern",
  },
  {
    item: "Suggested duration",
    value: "1 to 2 hours",
    note: "Klook's own figure on its listing. With over 50 artworks across four floors, treat it as a floor rather than a plan",
  },
];

/** The booking rules an AI answer stops short of. */
const bookingRows = [
  {
    q: "Is entry timed?",
    a: "Yes. The standard Entrance Pass is bought for a date and an admission time, which is why the price you are quoted depends on the slot you choose. The Flexible Pass is the exception: it specifies a date only, and you enter whenever you like during opening hours.",
  },
  {
    q: "Can I change the date?",
    a: "On a ticket bought from teamLab's own ticketing site, yes — up to three times, by selecting 'Modify ticket date' on the QR ticket itself. A reseller sets its own terms, so read your own checkout before you pay.",
  },
  {
    q: "Does the price change with the date?",
    a: "For adults, yes. teamLab states adult admission is based on a variable pricing system and varies depending on the date and time. ¥3,800 is the published figure; the 13–17, 4–12 and free tiers are flat.",
  },
  {
    q: "Is there a ticket at the gate?",
    a: "teamLab sells through its own ticketing site and through resellers, and the museum's variable pricing is applied per slot. Treat the door as a fallback rather than a plan on a weekend, a holiday or an evening slot — and note that a sold-out calendar cannot be rescued at a counter.",
  },
  {
    q: "What do I need to bring?",
    a: "Your QR ticket, and ID if anyone in the party is aged 13 to 17 — that tier is checked at the entrance gate. Strollers are not permitted inside and go in the luggage room instead.",
  },
];

/** How this venue differs from the two in Tokyo and the one in Osaka. */
const venueRows = [
  {
    venue: "teamLab Biovortex Kyoto",
    where: "Minami-ku, 7 minutes from Kyoto Station",
    what: "Four floors, over 10,000 m², more than 50 artworks — teamLab's largest museum in Japan",
    when: "9:00–21:00, last entry 19:30, timed entry or a Flexible Pass",
    adult: "¥3,800 (variable)",
  },
  {
    venue: "teamLab Planets TOKYO",
    where: "Toyosu, Tokyo",
    what: "Barefoot, with water spaces that reach adult knee height",
    when: "Daytime and evening, in 30-minute admission slots",
    adult: "from ¥3,800",
  },
  {
    venue: "teamLab Borderless",
    where: "Azabudai Hills, Tokyo",
    what: "A walk-through labyrinth with no fixed route",
    when: "Daytime and evening, timed entry or a Flexible Pass",
    adult: "from ¥3,400",
  },
  {
    venue: "teamLab Botanical Garden Osaka",
    where: "Nagai Botanical Garden, Osaka",
    what: "Outdoors, in a working botanical garden",
    when: "Night only — nothing before 18:00",
    adult: "¥1,800 (dynamic)",
  },
];

const steps = [
  {
    title: "Check your date against the published closures",
    desc: "First, because it is the cheapest mistake to avoid. teamLab lists 17 November, 19 November and 15 December 2026 as closed and states closed days are subject to change, so verify your own date on the official calendar rather than working from a weekly rule.",
  },
  {
    title: "Pick the entry time before you compare prices",
    desc: "Adult admission is variable-priced by date and time, so the ¥3,800 you have seen quoted is a floor. Step through the slots your Kyoto day could absorb and compare the figures the calendar shows before you settle on one.",
  },
  {
    title: "Decide between the Entrance Pass and the ¥12,000 Flexible Pass",
    desc: "The Entrance Pass is cheaper and ties you to a time. The Flexible Pass specifies only the date and lets you walk in whenever you like during opening hours, which is worth the premium on a day built around temples that may run long.",
  },
  {
    title: "Buy from the seller whose terms suit your trip",
    desc: "teamLab's own ticketing site is the one that lets you change the date up to three times from the QR ticket. Klook's listing checks out in English and takes foreign cards, and GetYourGuide carries the same museum — useful if your slot has gone on one platform.",
  },
  {
    title: "Work out your walk, then your evening",
    desc: "The museum is a seven-minute walk from the Hachijo East Gate of Kyoto Station on teamLab's own figure, and eleven minutes from Shichijo on the Keihan Line. With last entry at 19:30 and closing at 21:00, a late slot ends on foot at the station rather than on a bus across the city — which is an argument for a Kyoto Station base.",
  },
  {
    title: "Leave the stroller and check the ID rule",
    desc: "The official FAQ states strollers are not permitted inside and go in the luggage room. And anyone aged 13 to 17 needs proof of ID at the entrance gate to use the ¥2,800 tier, which is easy to forget when the ticket was bought weeks earlier.",
  },
];

const faqItems = [
  {
    q: "How much are teamLab Kyoto tickets?",
    a: `¥3,800 for an adult aged 18 or over, ¥2,800 for ages 13 to 17, ¥1,800 for ages 4 to 12 and free for children 3 and under, on teamLab's own published prices read on ${CHECKED}. The adult figure is the one to treat carefully: teamLab states adult admission uses a variable pricing system, so it moves with the date and the admission time you choose, and ¥3,800 is a floor rather than a fare. There is also a Flexible Pass at ¥12,000 for an adult or a child, which specifies only the date and lets you enter any time during opening hours. Ages 13 to 17 need proof of ID at the entrance gate — bring a passport if that applies to anyone in the party.`,
  },
  {
    q: "Where is teamLab Biovortex Kyoto?",
    a: `At 21-5 Higashikujo Higashi-Iwamotocho in Minami-ku, Kyoto — which in practice means a seven-minute walk from the Hachijo East Gate of Kyoto Station, on teamLab's own figure, or about eleven minutes from Shichijo Station on the Keihan Line. That is the single most useful thing about it: of the four teamLab venues in Japan, this is the only one you can reach on foot from a shinkansen platform. It opened on 7 October 2025 and teamLab describes it as its largest museum in Japan — over 50 artworks across four floors and more than 10,000 square metres. Read on ${CHECKED}.`,
  },
  {
    q: "How long do you need at teamLab Kyoto?",
    a: `Klook's listing suggests 1 to 2 hours, and teamLab's official FAQ states there is no limit on how long you can stay once you have been admitted. Between those two facts, the honest planning answer is two to three hours if you want to see the place rather than pass through it: this is four floors and over 50 artworks, which is more than either Tokyo venue. What is limited is the window rather than the visit — last entry is 19:30 and the museum closes at 21:00, so a late slot gives you ninety minutes whether you want them or not. If your Kyoto day is likely to overrun, the ¥12,000 Flexible Pass removes the entry time from the problem entirely.`,
  },
  {
    q: "Do I need to book teamLab Kyoto in advance?",
    a: `Yes, and for a different reason from most attractions: the standard Entrance Pass is bought for a specific date and admission time, so booking ahead is how you choose the slot rather than how you save money. teamLab reported more than a million visitors in the museum's first nine months, which is the context for treating a weekend or holiday slot as something to secure rather than assume. Booking early also costs you less flexibility here than elsewhere — a ticket bought on teamLab's own ticketing site can have its date changed up to three times, from the QR ticket itself. Read on ${CHECKED}.`,
  },
  {
    q: "teamLab Kyoto or teamLab Tokyo: which is better?",
    a: "They are not the same kind of visit, so the answer is mostly which city you are sleeping in. Kyoto's Biovortex is the largest of the four — four floors, over 10,000 square metres, more than 50 artworks — and the only one within a seven-minute walk of a shinkansen station, at ¥3,800 for an adult. teamLab Planets in Toyosu is barefoot, with water spaces that reach adult knee height, and is the better one with young children; it starts from ¥3,800 too. Borderless in Azabudai Hills is a labyrinth with no fixed route, from ¥3,400, and is the most photogenic for adults. If you are choosing one and you are going to Kyoto anyway, take Kyoto: it is bigger and far easier to reach. If you are collecting them, they genuinely are different buildings rather than the same show in three cities.",
  },
  {
    q: "What time does teamLab Kyoto open and close?",
    a: `9:00 to 21:00, with last entry at 19:30 — teamLab's own published hours, read on ${CHECKED} and stated there as subject to change. That is a long day by museum standards and it includes something the Tokyo venues do not really offer: a genuine first-thing slot, which on a Kyoto itinerary is the hour when Fushimi Inari and Kiyomizu-dera are at their worst for crowds. The closed days teamLab publishes are 17 November, 19 November and 15 December 2026, listed individually rather than as a rule.`,
  },
  {
    q: "Can you change or cancel a teamLab Kyoto ticket?",
    a: "The date can be changed up to three times on a ticket bought directly from teamLab's official ticketing website — you select 'Modify ticket date' on the QR ticket. That is the clearest reason to buy from teamLab itself if your Kyoto days are still moving. A reseller is bound by its own terms rather than teamLab's, so if you book through Klook or GetYourGuide, read the cancellation and change conditions shown at that checkout rather than assuming the official policy carries across.",
  },
  {
    q: "Is teamLab Kyoto worth it with kids?",
    a: "On price it is reasonable — ¥1,800 for ages 4 to 12 and free under 4 — and the museum includes Athletics Forest and Future Park, which are the physical and the co-creation areas rather than rooms you walk through looking. Two practical notes off the official FAQ and the listings: strollers are not permitted inside and have to go in the luggage room, and the listings warn about flashing lights and loud noises, which is the thing to weigh for a child sensitive to either. The exhibition spaces are largely dark, so a nervous toddler is a harder visit here than at Planets in Toyosu, where the water areas carry the day.",
  },
  {
    q: "How do I get to teamLab Kyoto from Kyoto Station?",
    a: `On foot, in about seven minutes from the Hachijo East Gate — the south side of the station, the same side the shinkansen gates are on. From the Keihan Line, Shichijo Station is about eleven minutes' walk. That makes this the easiest major attraction in Kyoto to fit around a train: you can do it on an arrival afternoon before checking in, or on a departure morning with the cases in station lockers. Our getting around Kyoto guide covers the buses and the two subway lines for everything else in the city, which is a harder problem than this particular walk. Read on ${CHECKED}.`,
  },
  {
    q: "What else should I know before going?",
    a: `Three things, all of them small and all of them easy to get wrong. Anyone aged 13 to 17 needs proof of ID at the gate for the ¥2,800 tier. The adult price is variable, so the figure in the calendar for your own date is the only one that matters — not the ¥3,800 quoted everywhere, including here. And the museum has a telephone line answered 10:00 to 17:00, which is worth knowing because it is the only channel that can answer a question about a ticket on the day. Read on ${CHECKED}.`,
  },
];

const TITLE = "teamLab Kyoto Tickets: Prices, Hours & Booking";
const DESCRIPTION =
  "teamLab Kyoto tickets are ¥3,800 adult and ¥1,800 for ages 4–12, variable by slot. Hours 9:00–21:00, last entry 19:30, 7 minutes from Kyoto Station.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/teamlab-kyoto-tickets") },
});

export default function TeamlabKyotoTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/teamlab-kyoto-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/teamlab-kyoto-tickets" />
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
              route: "/guides/attractions/teamlab-kyoto-tickets",
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
                  name: "teamLab Kyoto Tickets",
                  item: "https://www.japan-travel-kit.com/guides/attractions/teamlab-kyoto-tickets",
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
          <span className={styles.breadCurrent}>teamLab Kyoto Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            teamLab Kyoto Tickets:<br />Prices, Hours and How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            teamLab Biovortex Kyoto is the largest of the four teamLab museums in Japan — and the only one you
            can walk to from a shinkansen platform in seven minutes.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices, checked", "9:00–21:00, last entry 19:30", "vs Planets & Borderless"].map((t) => (
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
            <strong>teamLab Kyoto tickets</strong> are <strong>¥3,800</strong> for an adult aged 18 or over,{" "}
            <strong>¥2,800</strong> for ages 13–17, <strong>¥1,800</strong> for ages 4–12 and free for children
            3 and under — with a <strong>¥12,000 Flexible Pass</strong> that specifies only the date. The venue
            is <strong>teamLab Biovortex Kyoto</strong>, which opened on <strong>7 October 2025</strong> at
            21-5 Higashikujo Higashi-Iwamotocho in Minami-ku: teamLab&apos;s largest museum in Japan, over 50
            artworks across four floors and more than 10,000 square metres,{" "}
            <strong>seven minutes on foot</strong> from the Hachijo East Gate of Kyoto Station. It opens{" "}
            <strong>9:00–21:00</strong> with <strong>last entry at 19:30</strong>, there is no limit on how long
            you stay once you are in, and entry is timed — so the adult price moves with the slot you choose and
            ¥3,800 is a floor rather than a fare. One distinction worth making before you book: this is a
            different museum from the two in Tokyo, not the same show relocated. All figures read on {CHECKED}{" "}
            off teamLab&apos;s own pages.
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
                <p className={styles.verdictStatLabel}>Adult / child 4–12</p>
                <p className={styles.verdictStatValue}>¥3,800 / ¥1,800</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hours</p>
                <p className={styles.verdictStatValue}>9:00–21:00, last entry 19:30</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Getting there</p>
                <p className={styles.verdictStatValue}>7 min walk, Kyoto Station</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Flexible Pass</p>
                <p className={styles.verdictStatValue}>¥12,000, date only</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> book a slot rather than a day — the adult tier is variable-priced, so
              the calendar for your own date is the only figure that counts — and buy from teamLab&apos;s own
              site if your Kyoto days might still move, because that is the ticket whose date can be changed
              three times.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TEAMLAB_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check teamLab Kyoto tickets →
              </KlookLink>
              <GygCompareButton slug={SLUG} listing={gygTeamlabBiovortexKyoto} />
            </div>
          </div>
        </div>

        {/* Q1 — price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How Much Are teamLab Kyoto Tickets?</h2>
          <p className={styles.bodyText}>
            ¥3,800 for an adult, ¥1,800 for a child aged 4 to 12 — and the adult figure is variable, so it is a
            starting point rather than a price. Of the four teamLab venues in Japan this is the joint most
            expensive, which is reasonable given it is also the biggest.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Price", `What it means (read ${CHECKED})`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Prices read on {CHECKED} off teamLab&apos;s own page for the museum, which states that adult
            admission is based on a variable pricing system and varies depending on the date and time. The
            checkout is the only authority on what you will actually pay. For every other attraction we have
            verified, see our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>.
          </p>
        </section>

        {/* Q2 — where */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where it is</span>
          <h2 className={styles.sectionTitle}>Where Is teamLab Biovortex Kyoto?</h2>
          <p className={styles.bodyText}>
            At <strong>21-5 Higashikujo Higashi-Iwamotocho, Minami-ku, Kyoto</strong> — and the number that
            matters is <strong>seven minutes</strong>, which is teamLab&apos;s own walking time from the{" "}
            <strong>Hachijo East Gate</strong> of Kyoto Station. That is the south side of the station, the
            same side the shinkansen gates are on. From the Keihan Line, Shichijo Station is about eleven
            minutes on foot.
          </p>
          <p className={styles.bodyText}>
            This is the thing that makes the museum unusually easy to slot into a Kyoto trip. Most of what
            people come to Kyoto for is a bus ride or a subway change away; this is a walk you can do on an
            arrival afternoon before check-in, or on a departure morning with the cases in station lockers.
            It also means a <strong>Kyoto Station base</strong> is worth more for this particular attraction
            than it usually is — a 19:00 slot ends at closing time with nothing to catch. Our{" "}
            <Link href="/guides/transport/kyoto-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              getting around Kyoto guide
            </Link>{" "}
            covers the buses and the two subway lines for everything else, and our{" "}
            <Link href="/guides/attractions/where-to-stay-in-kyoto" style={{ color: "var(--red)", fontWeight: 600 }}>
              where to stay in Kyoto guide
            </Link>{" "}
            compares the areas by exactly that logic.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Address and both walking times read on {CHECKED} — the station walk off teamLab&apos;s own page,
            the full street address off Klook&apos;s listing for the museum. The museum opened on 7 October
            2025 and teamLab describes it as its largest in Japan: over 50 artworks across four floors and
            more than 10,000 square metres.
          </p>
        </section>

        {/* Q3 — hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hours</span>
          <h2 className={styles.sectionTitle}>How Long Do You Need, and When Is It Open?</h2>
          <p className={styles.bodyText}>
            9:00 to 21:00, last entry 19:30 — and no limit on how long you stay once you are inside. The
            planning constraint is the window rather than the visit, which is why the last-entry time is the
            figure to build the evening around rather than the closing time.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Value", "Note"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Hours, last entry and the closed days as teamLab&apos;s own page publishes them, read on {CHECKED}{" "}
            and stated there as subject to change. The no-limit rule is from the official FAQ for the venue;
            the 1-to-2-hour suggestion is Klook&apos;s own figure on its listing. Anything beyond the three
            published closures is not announced yet, so check the calendar for your own date.
          </p>
        </section>

        {/* Q4 — booking rules and the CTA. The part an AI answer does not finish:
            timed entry, the Flexible Pass, the three date changes, the ID rule. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do I Need to Book teamLab Kyoto in Advance?</h2>
          <p className={styles.bodyText}>
            Yes — but for a reason worth understanding, because it is not really about selling out. Entry is
            timed, so booking ahead is how you choose your slot rather than how you save money. And it costs
            you less than you think: a ticket from teamLab&apos;s own site can have its date changed up to
            three times.
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
            Three sellers, and they are not interchangeable. teamLab&apos;s own ticketing site is the one with
            the three date changes built into the QR ticket. Klook&apos;s listing checks out in English, takes
            foreign cards and suggests 1 to 2 hours for the visit. GetYourGuide carries the same museum, which
            matters on a date where one platform&apos;s slots have gone — a museum that reported over a million
            visitors in its first nine months is not one to leave to the day.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={TEAMLAB_URL} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check tickets on Klook →
            </KlookLink>
            <GygCompareButton slug={SLUG} listing={gygTeamlabBiovortexKyoto} />
            <KlookLink href={kyotoTeamlabBiovortexWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the guided Kyoto version →
            </KlookLink>
          </div>
        </section>

        {/* Q5 — vs the other venues */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>teamLab Kyoto or teamLab Tokyo: Which Is Better?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Mostly, whichever city you are sleeping in — these are four different buildings rather than one
            show in four places. Where Kyoto wins outright is scale and access: it is the largest of the four
            and the only one within a seven-minute walk of a shinkansen station.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Venue", "Where", "What it is", "When it is open", "Adult price"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {venueRows.map((row) => (
                    <tr key={row.venue}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.venue}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.where}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.when}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.adult}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The Kyoto row is read on {CHECKED}; the three others are the figures verified on our{" "}
            <Link href="/guides/attractions/teamlab-tokyo-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>
              teamLab Planets guide
            </Link>
            , our{" "}
            <Link href="/guides/attractions/teamlab-borderless-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>
              teamLab Borderless guide
            </Link>{" "}
            and our{" "}
            <Link href="/guides/attractions/teamlab-botanical-garden-osaka-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>
              teamLab Botanical Garden Osaka guide
            </Link>
            , each with its own check date. All four price the adult tier by date, so every figure is a floor
            rather than a fare.
          </p>
        </section>

        {/* Klook: the rest of a Kyoto day built around a slot. */}
        <KlookTripPrep
          label="The rest of the day"
          heading="What Else Should You Book Around a teamLab Slot?"
          intro="The museum is a ticket rather than a day, and because it sits at the station it slots in at either end of one. These are the pieces that follow from a timed entry a seven-minute walk from the shinkansen gates."
          items={teamlabKyotoTripPrep}
        />

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How Do You Book teamLab Kyoto?</h2>
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
              Check teamLab Kyoto tickets →
            </KlookLink>
            <GygCompareButton slug={SLUG} listing={gygTeamlabBiovortexKyoto} />
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
          heading="The Kyoto Day the Museum Sits Inside"
          intro="Three bookings that fit either side of a timed slot: the walking tour that finishes inside the museum, the guided day that covers the four temples you would otherwise spend a day on buses reaching, and two Kyoto classics. Open a listing for availability and the current price on your dates."
          tours={[
            kyotoTeamlabBiovortexWalkingTour,
            kyotoHighlightBusTour,
            saganoRomanticTrainTicket,
            kyotoKimonoYumeyakata,
          ]}
        />

        <KlookStayAreas
          heading="Where to Stay for a Late Slot"
          intro="Last entry is 19:30 and the museum closes at 21:00, which makes this one of the few Kyoto attractions where a Kyoto Station base is objectively the right answer rather than a compromise — the walk back is seven minutes. The other three areas are here for the rest of the trip."
          areas={whereToStayKyotoAreas}
        />

        {/* GetYourGuide — a second seller beside the Klook ticket, nothing changed above. */}
        <GygCompare
          slug={SLUG}
          heading="Also Sold on GetYourGuide"
          intro="A museum admission is the one product where a second seller is worth having open. teamLab prices and releases this venue by date and admission time, so the question on a busy date is not which platform is cheaper but which one still has your slot."
          listings={[gygTeamlabBiovortexKyoto, gygKyotoEntryTickets]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 29 Oct 2026: Kyoto is the largest of the venues and Fukuoka
                the shortest and cheapest, which makes it the useful opposite end. */}
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
            <Link href="/guides/attractions/teamlab-botanical-garden-osaka-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21V9" />
                  <path d="M12 9c0-3 2-5 5-5 0 3-2 5-5 5zM12 9c0-3-2-5-5-5 0 3 2 5 5 5z" />
                  <path d="M7 21h10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Botanical Garden Osaka Tickets: Prices &amp; Hours</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 18h16M6 18V9l6-4 6 4v9" />
                  <path d="M10 18v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Kyoto (2026): What to Book Ahead and What to Turn Up To</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M10 21v-6h4v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Kyoto (2026): Best Areas, Compared by Line and Bus</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4" />
                  <path d="M6 21V8l2-5M18 21V8l-2-5" />
                  <path d="M6 21h12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto Kimono Rental (2026): Prices, Shops and What Is Included</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026): Buses, Subway &amp; Passes Explained</p>
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
            <h2 className={styles.ctaBannerTitle}>Pick the slot, not the day</h2>
            <p className={styles.ctaBannerDesc}>
              Adult admission is variable-priced by date and time, so the calendar for your own date is the
              only figure that counts. Last entry is 19:30, the museum is seven minutes from Kyoto Station, and
              a ticket bought direct can move its date three times.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TEAMLAB_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View teamLab Kyoto tickets →
              </KlookLink>
              <GygCompareButton slug={SLUG} listing={gygTeamlabBiovortexKyoto} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
