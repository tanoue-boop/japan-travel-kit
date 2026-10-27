import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  fujiHakoneDayTour,
  hanedaLimousineBus,
  naritaHanedaLimousineBus,
  naritaLimousineBus,
  tokyoSightseeingBusTour,
} from "../../../lib/klook-links";

/**
 * Tokyo Airport Limousine Bus — restored 22 Oct 2026.
 *
 * This guide was removed in the September 2026 merge and 301'd to
 * tokyo-airport-transfer. Search Console still showed 39 impressions at an average
 * position of 10.3 for the old URL over the preceding 28 days, so the redirect was
 * throwing away a page that ranks. The 301 has been dropped from lib/redirects.js.
 *
 * Division of labour, to keep the two pages off each other's search term:
 *   - /guides/transport/tokyo-airport-transfer compares every option — trains,
 *     bus, taxi — and settles "how do I get from the airport to Tokyo".
 *   - this page is the bus only: every fare, the stops, the baggage rule, the
 *     reservation rule and the late-night service.
 *
 * Every fare, time and rule below was read off the operator's own site,
 * limousinebus.co.jp, on 22 Oct 2026. The site answers automated reads with HTTP
 * 403, so the figures were taken from its indexed line and timetable pages — the
 * `/en/line/detail/` page for each route, `/en/guide/terms/baggage/`,
 * `/en/guide/ticket/reserve/`, `/en/guide/others/accessbus/` and
 * `/en/guide/others/ticket/subwaypass/`. Nothing here is first-hand.
 *
 * Two things the old draft got wrong and are corrected here:
 *   - It printed a single "¥3,200 from Narita, ¥1,200 from Haneda". The operator
 *     does not have one fare per airport; it has one fare per route, and the
 *     Narita spread alone runs ¥2,900 to ¥3,600. The table is per route now.
 *   - It linked to /guides/transport/skyliner-vs-nex, which is still a 301 source.
 *     The train half of the decision now points at tokyo-airport-transfer, which
 *     absorbed that comparison.
 */

/** Everything on this page was read off limousinebus.co.jp on this date. */
const CHECKED_ISO = "2026-10-22";
const CHECKED = checkedLabel(CHECKED_ISO);

const naritaRows = [
  {
    route: "Shinjuku area (station, Keio department store, the Shinjuku hotels)",
    adult: "¥3,600",
    child: "¥1,800",
    note: "The biggest route, with the most hotel stops of any",
  },
  {
    route: "Shibuya",
    adult: "¥3,600",
    child: "¥1,800",
    note: "Same fare as Shinjuku; a separate Shibuya (LCB) line also runs",
  },
  {
    route: "Ikebukuro / Mejiro",
    adult: "¥3,100–3,600",
    child: "¥1,550–1,800",
    note: "The fare depends on the stop — Sunshine City is at the top of the band",
  },
  {
    route: "Hibiya / Ginza area",
    adult: "¥3,100–3,600",
    child: "¥1,550–1,800",
    note: "Also stop-dependent",
  },
  {
    route: "Tokyo Station (Yaesu North exit, Tekko Building)",
    adult: "¥3,100",
    child: "¥1,550",
    note: "The cheapest central-Tokyo Narita fare",
  },
  {
    route: "Tokyo City Air Terminal (T-CAT), Tokyo Station, Nihonbashi",
    adult: "¥3,100",
    child: "¥1,550",
    note: "T-CAT is the Nihonbashi Hakozaki hub the network is built around",
  },
  {
    route: "Tokyo Disney Resort area",
    adult: "¥2,900",
    child: "¥1,450",
    note: "The cheapest Narita route of all, and the one with no realistic train rival",
  },
  {
    route: "Haneda Airport",
    adult: "¥3,600",
    child: "¥1,800",
    note: "Airport to airport, for a trip that lands at one and leaves from the other",
  },
];

const hanedaRows = [
  {
    route: "Shinjuku / Nakano area",
    adult: "¥1,400",
    child: "¥700",
    note: "Buses towards the airport do not call at the Shinjuku west exit — use Busta Shinjuku",
  },
  {
    route: "Shibuya area",
    adult: "¥1,300",
    child: "¥650",
    note: "No reservation for the airport-bound direction; pay into the farebox on boarding",
  },
  {
    route: "Tokyo Disney Resort area",
    adult: "¥1,300",
    child: "¥650",
    note: "Bookable on the reservation site",
  },
  {
    route: "Tokyo Station (Yaesu North exit, Tekko Building)",
    adult: "¥1,200",
    child: "—",
    note: "The shortest run into the middle of the city",
  },
  {
    route: "Tokyo City Air Terminal (T-CAT / Nihonbashi Hakozaki)",
    adult: "¥1,000–1,200",
    child: "¥500–600",
    note: "The band depends on the stop and the service",
  },
  {
    route: "Late-night / early-morning access bus",
    adult: "¥2,800",
    child: "—",
    note: "A separate product from the daytime bus, at exactly double the Shinjuku fare",
  },
];

const passRows = [
  { pass: "Narita: 1 one-way bus + Tokyo Subway 24-hour ticket", adult: "¥4,200", child: "¥2,100" },
  { pass: "Narita: 2 one-way buses + Tokyo Subway 48-hour ticket", adult: "¥7,500", child: "¥3,750" },
  { pass: "Narita: 2 one-way buses + Tokyo Subway 72-hour ticket", adult: "¥8,000", child: "¥4,000" },
  { pass: "Haneda: 1 one-way bus + Tokyo Subway 24-hour ticket", adult: "¥2,300", child: "¥1,150" },
  { pass: "Haneda: 2 one-way buses + Tokyo Subway 48-hour ticket", adult: "¥4,100", child: "¥2,050" },
  { pass: "Haneda: 2 one-way buses + Tokyo Subway 72-hour ticket", adult: "¥4,600", child: "¥2,300" },
];

const whoFor = [
  {
    title: "Take the bus if…",
    desc: `Your bags are the problem. Two checked pieces per person go in the hold, each up to 50 × 60 × 120 cm and 30 kg, and you do not touch them again until your stop. No Tokyo airport train offers that, and no Tokyo station makes it easy to do without. Baggage rule read off limousinebus.co.jp on ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="7" width="16" height="13" rx="2" />
        <path d="M9 7V4h6v3" />
        <path d="M9 11v5M15 11v5" />
      </svg>
    ),
  },
  {
    title: "Take the bus if…",
    desc: "Your hotel is a named stop. The Shinjuku, Ikebukuro, Ginza and Shibuya routes call at individual hotels rather than only at stations, so the ride ends at your door instead of at a concourse with a suitcase and a map. The operator's own route page lists every stop on the line.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Take the train instead if…",
    desc: "You are travelling light and the clock matters. The bus sits in the same expressway traffic as everyone else, and the Narita run is 90 minutes to two hours against a train that is far more predictable. Our Tokyo airport transfer guide puts the trains, the bus and a taxi side by side on time and price.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <path d="M7 21l2-4M17 21l-2-4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Find your stop before you compare fares",
    desc: `The limousine bus has no single fare per airport — it has a fare per route, and from Narita they run from ¥2,900 to the Disney resort up to ¥3,600 to Shinjuku, Shibuya or Haneda. Two Ikebukuro stops on the same line can differ by ¥500. Look up the stop nearest your hotel first; the number follows from that. Fares read on ${CHECKED}.`,
  },
  {
    title: "Check whether your route is reserved or unreserved",
    desc: "This is the step people skip. Some routes have reserved seating and some are unreserved, and the operator states that it can differ by direction on the same line — the Shibuya⇔Haneda line, for instance, takes no reservation towards the airport and you pay into the farebox as you board. Reserved routes are the ones worth booking.",
  },
  {
    title: "Book from one month out, up to five minutes before departure",
    desc: `Reservations on the operator's own Limousine Web open at midnight one month before your travel date and stay open until five minutes before the departure time. There is no sell-out cliff like a timed museum ticket, but a peak-season Shinjuku bus is a seat you would rather have than hope for. Read on ${CHECKED}.`,
  },
  {
    title: "Or buy a QR code and skip the counter entirely",
    desc: "On a reseller the ticket is a QR code on your phone, bought in English on a foreign card before you fly, and scanned as you board instead of exchanged for a paper ticket at the arrivals-floor counter. Klook's Narita and Haneda listings both work that way; check the cancellation window shown for your own date before you pay, because it is set per listing rather than by the bus company.",
  },
  {
    title: "If there is no bus left, look at the access bus, not a taxi",
    desc: `Haneda has a separate late-night and early-morning service at ¥2,800 — four departures from Terminal 3 at 0:20, 1:00, 1:40 and 2:20, and early buses the other way from Ikebukuro at 3:35, Higashi-Shinjuku at 3:50 and Busta Shinjuku at 4:00. It is double the daytime Shinjuku fare and a fraction of a night taxi. Times read on ${CHECKED}.`,
  },
];

const faqItems = [
  {
    q: "How much is the Tokyo airport limousine bus?",
    a: `There is no single fare — the Airport Limousine prices each route separately. From Narita it is ¥3,600 for an adult to the Shinjuku area, Shibuya or Haneda Airport, ¥3,100 to Tokyo Station or the Tokyo City Air Terminal, ¥3,100–3,600 to Ikebukuro/Mejiro and Hibiya/Ginza depending on the stop, and ¥2,900 to the Tokyo Disney Resort. From Haneda the same network is far cheaper: ¥1,400 to Shinjuku/Nakano, ¥1,300 to Shibuya or the Disney resort, ¥1,200 to Tokyo Station and ¥1,000–1,200 to T-CAT. Child fares are half the adult fare on every route. All read off limousinebus.co.jp on ${CHECKED}.`,
  },
  {
    q: "How long does the Tokyo airport limousine bus take?",
    a: `It depends on the route and on the traffic, which is the honest answer and also the reason to look at the published timetable rather than a single number. On the operator's own schedules, a Narita Terminal 1 departure at 7:25 is booked into Tokyo Station Yaesu North at 9:05 — one hour forty. Narita Terminal 3 at 7:50 reaches Tokyo Disneyland at 8:56, about an hour. From Haneda, Terminal 1 at 11:35 is into Shinjuku Station at 12:15, about forty minutes. Allow longer than the timetable in the 7–9am and 5–8pm expressway peaks. Timetables read on ${CHECKED}.`,
  },
  {
    q: "Do you need to book the Tokyo airport limousine bus in advance?",
    a: `Sometimes, and the operator is specific about it: some routes have reserved seating and others are unreserved, and whether a seat can be reserved may differ depending on the direction you are travelling. On a reserved route, bookings open at midnight one month before your travel date and close five minutes before departure. On an unreserved route you buy a time-designated boarding pass on the day and queue at the stop. Either way nothing sells out the way a dated attraction ticket does — booking buys you a guaranteed seat and no counter queue after a long flight. Read on ${CHECKED}.`,
  },
  {
    q: "How much luggage can you take on the limousine bus?",
    a: `Two pieces of checked baggage per person into the hold, each no larger than 50 × 60 × 120 cm and up to 30 kg, plus up to 10 kg of hand luggage in the cabin. Cash, precious metals, jewellery, securities, art and fragile items such as watches, cameras, laptops and glassware must not go in checked baggage, and explosives, flammables and corrosives are not carried at all. The operator can refuse baggage whose quantity or size would hold up the service, and handling can differ on jointly operated routes. Baggage rules read off limousinebus.co.jp on ${CHECKED}.`,
  },
  {
    q: "Where does the Tokyo airport limousine bus go?",
    a: `To hotels and hubs rather than only to stations — which is the whole point of it. From Narita there are lines to the Shinjuku area, Shibuya, Ikebukuro/Mejiro, the Hibiya/Ginza area, Tokyo Station's Yaesu North exit, the Tokyo City Air Terminal at Nihonbashi Hakozaki, the Shiba/Shiodome/Odaiba/Ariake side of the bay, Kichijoji, Shin-Urayasu, the Tokyo Disney Resort and Haneda Airport. Haneda adds Toyosu, Kichijoji, Shakujii-koen/Wakoshi, Takao/Hachioji/Hino and the Kameari/Koiwa/Ichinoe/Kasai line. Each line's own page lists every stop on it; routes read on ${CHECKED}.`,
  },
  {
    q: "Does the airport limousine bus run late at night?",
    a: `Haneda has a dedicated late-night and early-morning access bus, which is a separate product from the daytime limousine. Four buses leave Terminal 3 at 0:20, 1:00, 1:40 and 2:20, reaching Shinjuku Station west exit at 0:48, 1:38, 2:18 and 2:58 and continuing to Busta Shinjuku, Higashi-Shinjuku and Ikebukuro east exit. In the other direction the early buses leave Ikebukuro east at 3:35, Higashi-Shinjuku at 3:50 and Busta Shinjuku at 4:00. The fare is ¥2,800, exactly double the ¥1,400 daytime Shinjuku fare — and still far below a night taxi. The operator publishes this service for Haneda only; there is no Narita equivalent on the limousine network. Read on ${CHECKED}.`,
  },
  {
    q: "Is the Limousine & Subway Pass worth it?",
    a: `From Narita, usually yes; from Haneda, barely. The Tokyo Subway Ticket costs ¥1,000, ¥1,500 and ¥2,000 for 24, 48 and 72 hours on its own. Two one-way Narita buses to Shinjuku are ¥7,200, so the ¥8,000 Narita bundle adds a 72-hour subway ticket for ¥800 and the ¥7,500 version adds a 48-hour one for ¥300 — both real discounts. From Haneda, ¥2,300 against a ¥1,400 Shinjuku bus leaves ¥900 for a ¥1,000 ticket, and the two-way Haneda bundles save about ¥200. Buy the Haneda version for the single checkout rather than the money. Pass prices read off limousinebus.co.jp on ${CHECKED}; subway prices are the official Tokyo Metro figures in our Tokyo Subway Ticket guide.`,
  },
  {
    q: "Can you take a child or a pushchair on the limousine bus?",
    a: "Yes. Every route publishes a child fare at half the adult fare, and Klook's Haneda listing states that children aged 0–5 travel free if they do not occupy a separate seat, with a child ticket required if they do. The same listing describes the vehicle as wheelchair-accessible and says a foldable wheelchair or pushchair may be brought along. With a pushchair and bags in the hold, the bus is usually the least painful arrival of the three options.",
  },
  {
    q: "Limousine bus or the train from Narita?",
    a: "The bus wins on luggage and on transfers; the train wins on time and predictability. From Narita the bus is roughly 90 minutes to two hours to central Tokyo and ¥2,900–3,600, and it shares the expressway with rush hour. A train is quicker and unaffected by traffic, but it leaves you at a station with your cases. The rule of thumb that holds up: if you can carry everything you brought up a flight of stairs without stopping, take the train. If you cannot, take the bus. Our Tokyo airport transfer guide compares all of them, including the taxi.",
  },
  {
    q: "What about the limousine bus from Haneda — is it better than the train there too?",
    a: "Haneda changes the question, because the trains are quick and cheap from there as well. The bus is ¥1,200–1,400 to central Tokyo and around forty minutes to Shinjuku on the timetable, so it is competing on comfort rather than on price. The case for it at Haneda is a hotel on the route, a pushchair, or an arrival too late for the trains — and the last of those has its own ¥2,800 access bus.",
  },
  {
    q: "How do you pay for the limousine bus?",
    a: "At the airport you can buy from a counter or an automatic ticket machine, entering your boarding date and time, destination and number of passengers; cash, credit cards and transport IC cards are all accepted. Online you can register on the operator's Limousine Web and pay by card. A reseller is the third route and the one that solves the two problems travellers actually hit — an English checkout and a foreign card that is accepted — and hands you a QR code instead of a counter visit.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/transport/tokyo-airport-limousine-bus") },
});

const TITLE = "Tokyo Airport Limousine Bus (2026): Narita & Haneda Fares, Times and Stops";
const DESC =
  "Tokyo airport limousine bus fares in 2026: ¥3,600 Narita to Shinjuku, ¥2,900 to the Disney resort and ¥1,400 from Haneda, with journey times, the 2-bag hold rule, when a seat must be reserved and the ¥2,800 late-night bus.";

export default function TokyoAirportLimousineBusPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/tokyo-airport-limousine-bus" />
        {hreflangLinks("/guides/transport/tokyo-airport-limousine-bus")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/tokyo-airport-limousine-bus" />
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
              route: "/guides/transport/tokyo-airport-limousine-bus",
              headline: TITLE,
              description: DESC,
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
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Tokyo Airport Limousine Bus",
                  item: "https://www.japan-travel-kit.com/guides/transport/tokyo-airport-limousine-bus",
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Tokyo Airport Limousine Bus</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo Airport Limousine Bus (2026):<br />Narita &amp; Haneda Fares, Times and Stops
          </h1>
          <p className={styles.heroSubtitle}>
            The bus that takes your suitcases off you and stops at the hotel door. Every
            route&apos;s fare, what the timetable says it takes, and the rules worth knowing
            before you book.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official fares, dated", "Every route listed"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Narita fares</p>
                <p className={styles.verdictStatValue}>¥2,900–3,600 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Haneda fares</p>
                <p className={styles.verdictStatValue}>¥1,000–1,400 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Journey time</p>
                <p className={styles.verdictStatValue}>Narita ~1h40, Haneda ~40 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Luggage in the hold</p>
                <p className={styles.verdictStatValue}>2 bags, 30 kg each</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> the Tokyo airport limousine bus has a fare per route, not a
              fare per airport. From <strong>Narita</strong> an adult pays <strong>¥3,600</strong> to
              the Shinjuku area or Shibuya, <strong>¥3,100</strong> to Tokyo Station or the Tokyo City
              Air Terminal and <strong>¥2,900</strong> to the Tokyo Disney Resort; from{" "}
              <strong>Haneda</strong> the same network is <strong>¥1,200–1,400</strong> into central
              Tokyo. Children travel at half fare. The timetable books Narita Terminal 1 into Tokyo
              Station in <strong>1 hour 40</strong> and Haneda Terminal 1 into Shinjuku in about{" "}
              <strong>40 minutes</strong>, traffic permitting. You get{" "}
              <strong>two checked bags of up to 30 kg</strong> in the hold, which is the real reason
              to choose it over a train. Some routes need a reserved seat and some do not — check
              yours before you queue. All figures read off limousinebus.co.jp on {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={naritaLimousineBus.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check the Narita bus on Klook →
              </KlookLink>
              <KlookLink href={hanedaLimousineBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                The Haneda bus →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is the Tokyo Airport Limousine Bus?</h2>
          <p className={styles.bodyText}>
            &quot;Limousine bus&quot; is a brand, not a vehicle class — it is the Airport Limousine
            network run by Airport Transport Service, and the bus is a normal coach with a luggage
            hold. What it sells is not speed. It is the two things a train cannot offer: your
            suitcases disappear into the hold at the terminal kerb and come back out at your stop,
            and on the big routes that stop is a named hotel rather than a station concourse.
          </p>
          <p className={styles.bodyText}>
            That makes this a decision about what you are carrying, not about minutes. This page
            covers the bus and only the bus — every route&apos;s fare, what the published timetable
            says the ride takes, the baggage limits, when a seat has to be reserved, and the separate
            late-night service at Haneda. If you have not yet decided between bus, train and taxi,
            start with our{" "}
            <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfer guide</Link>,
            which compares all of them including the Skyliner and the Narita Express.
          </p>
        </section>

        {/* Narita fares */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Narita fares</span>
          <h2 className={styles.sectionTitle}>How Much Is the Limousine Bus from Narita?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            There is no one Narita fare. The operator prices each line separately, and two stops on
            the same line can differ — which is why the single &quot;¥3,200 from Narita&quot; figure
            that circulates is wrong for most routes. Adult one-way fares, with the child fare at
            half:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route from Narita", "Adult", "Child", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {naritaRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.adult}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.child}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Every fare above read off the operator&apos;s own line pages at limousinebus.co.jp on{" "}
            {CHECKED}, and subject to change — confirm when you book. Lines also run to Kichijoji,
            Shin-Urayasu and the Shiba/Shiodome/Odaiba/Ariake side of the bay; discounted fares for
            passengers with a disability certificate are published on each line page.
          </p>
        </section>

        {/* Haneda fares */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Haneda fares</span>
          <h2 className={styles.sectionTitle}>How Much Is the Limousine Bus from Haneda?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Haneda is close enough to the city that the whole network costs roughly a third of the
            Narita equivalent. That changes the argument: at Narita the bus is price-competitive with
            the trains, while at Haneda it is competing on comfort.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route from Haneda", "Adult", "Child", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hanedaRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.adult}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.child}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off limousinebus.co.jp on {CHECKED}. A dash means the figure is not published on the
            line page we read, not that the fare does not exist. Haneda lines also serve Toyosu,
            Kichijoji, Shakujii-koen/Wakoshi, Takao/Hachioji/Hino and the
            Kameari/Koiwa/Ichinoe/Kasai route. For moving around once you are in town, our{" "}
            <Link href="/guides/transport/tokyo-transportation">getting around Tokyo guide</Link>{" "}
            covers the lines and the IC cards.
          </p>
        </section>

        {/* Journey time */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Journey time</span>
          <h2 className={styles.sectionTitle}>How Long Does the Bus Actually Take?</h2>
          <p className={styles.bodyText}>
            Long enough that it is worth being specific rather than quoting a range. Three pairs
            straight off the operator&apos;s published timetables, read on {CHECKED}:
            Narita Terminal 1 departing 7:25 is booked into Tokyo Station Yaesu North at{" "}
            <strong>9:05 — one hour forty</strong>. Narita Terminal 3 at 7:50 reaches Tokyo
            Disneyland at <strong>8:56, about an hour</strong>. Haneda Terminal 1 at 11:35 is into
            Shinjuku Station at <strong>12:15, about forty minutes</strong>.
          </p>
          <p className={styles.bodyText}>
            Those are scheduled times on a coach that shares the Shuto Expressway with everyone else.
            The morning 7–9 and evening 5–8 peaks are where the margin goes, and a Narita departure
            in rush hour is the one case where the bus can lose badly to a train. If your flight is
            the last thing between you and a missed connection, the predictability argument wins; if
            you are arriving and the day is already gone, it does not matter much.
          </p>
          <p className={styles.bodyText}>
            One practical consequence for a trip that starts in Tokyo and ends elsewhere: if you are
            taking the shinkansen out the next morning, a bus to Tokyo Station at ¥3,100 puts you
            next to the platform you need. Our{" "}
            <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto guide</Link> and the{" "}
            <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link> cover what
            happens after that.
          </p>
        </section>

        {/* Who it is for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Bus or train</span>
          <h2 className={styles.sectionTitle}>Should You Take the Bus or the Train?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.desc} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Luggage */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Luggage</span>
          <h2 className={styles.sectionTitle}>How Much Luggage Can You Bring?</h2>
          <p className={styles.bodyText}>
            This is the reason the bus exists, so the numbers matter. The operator accepts{" "}
            <strong>two pieces of checked baggage per person</strong> into the hold, each no larger
            than <strong>50 × 60 × 120 cm</strong> and up to <strong>30 kg</strong>, plus{" "}
            <strong>10 kg of hand luggage</strong> in the cabin with you. That covers a large
            suitcase and a second bag each for a couple, without anybody lifting anything.
          </p>
          <p className={styles.bodyText}>
            Three limits to know. Valuables — cash, precious metals, jewellery, securities, artwork —
            and fragile items such as watches, cameras, laptops and glassware must not go into
            checked baggage; keep them with you. Explosives, flammables and corrosives are not
            carried at all. And the operator reserves the right to refuse baggage whose quantity or
            size would interrupt the service, with handling that can differ on jointly operated
            routes. All read off limousinebus.co.jp on {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            If you are over that allowance, or you would rather take a fast train and have the cases
            follow, Japan&apos;s courier services will ship luggage from the airport to your hotel —
            the alternative worth pricing before you commit to either.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Book the Tokyo Airport Limousine Bus</h2>
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
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={naritaLimousineBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Narita limousine bus on Klook →
            </KlookLink>
            <KlookLink href={hanedaLimousineBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Haneda limousine bus →
            </KlookLink>
            <KlookLink href={naritaHanedaLimousineBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Airport to airport →
            </KlookLink>
          </div>
        </section>

        {/* Late night */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Late arrivals</span>
          <h2 className={styles.sectionTitle}>What If You Land After the Trains Stop?</h2>
          <p className={styles.bodyText}>
            Haneda has a separate answer for this, and it is cheap enough to be worth planning
            around. The <strong>late-night and early-morning access bus</strong> is its own product at{" "}
            <strong>¥2,800</strong> for an adult — exactly double the ¥1,400 daytime Shinjuku fare,
            and a long way below what a taxi from Haneda to Shinjuku costs at 1am.
          </p>
          <p className={styles.bodyText}>
            Four buses leave <strong>Terminal 3 at 0:20, 1:00, 1:40 and 2:20</strong>, reaching
            Shinjuku Station west exit at 0:48, 1:38, 2:18 and 2:58 and going on to Busta Shinjuku,
            Higashi-Shinjuku and Ikebukuro east exit. Going the other way for an early departure, the
            buses leave <strong>Ikebukuro east at 3:35, Higashi-Shinjuku at 3:50 and Busta Shinjuku
            at 4:00</strong>. The operator publishes this service for Haneda only — there is no
            Narita equivalent on the limousine network. Times read on {CHECKED}.
          </p>
        </section>

        {/* Subway pass combo */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Bus + subway</span>
          <h2 className={styles.sectionTitle}>Is the Limousine &amp; Subway Pass Worth It?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The operator sells its bus ticket bundled with the Tokyo Subway Ticket, which matters
            because foreign contactless cards do not open Tokyo Metro or Toei gates and this is one
            of the few ways to settle both before you fly. Official prices:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Limousine & Subway Pass", "Adult", "Child"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.pass}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.adult}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.child}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Run the subtraction before you decide, because the two airports give very different
            answers. The Tokyo Subway Ticket on its own is ¥1,000 for 24 hours, ¥1,500 for 48 and
            ¥2,000 for 72 — the official Metro prices our{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">Tokyo Subway Ticket guide</Link>{" "}
            works the break-even against. On the <strong>Narita</strong> side the bundle is a real
            discount: two one-way Shinjuku fares are ¥7,200, so the ¥8,000 pass adds a 72-hour
            subway ticket for ¥800 instead of ¥2,000, and the ¥7,500 48-hour version adds a ¥1,500
            ticket for ¥300. On the <strong>Haneda</strong> side it barely moves: ¥2,300 against a
            ¥1,400 Shinjuku bus leaves ¥900 for a ¥1,000 ticket, and the two-way versions save about
            ¥200 — a single purchase rather than a bargain. Either way,{" "}
            <Link href="/guides/transport/ic-cards-japan">IC cards in Japan</Link> explains what a
            Suica or Pasmo does that the subway ticket does not. Pass prices read off
            limousinebus.co.jp on {CHECKED}.
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

        <KlookTourPicks
          heading="For the Day After You Land"
          intro="Two Tokyo days booked on the same account as the bus ticket, for a first morning when the jet lag has not worn off and you would rather be driven. Klook blocks automated price reads, so open a listing for the current figure and the pick-up point."
          tours={[tokyoSightseeingBusTour, fujiHakoneDayTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/transport/tokyo-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Airport Transfer Guide (2026): Narita &amp; Haneda to the City</p>
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
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <circle cx="8.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
                  <circle cx="15.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
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
            <Link href="/guides/transport/tokyo-to-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="8" width="20" height="10" rx="2" />
                  <path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
                  <circle cx="7" cy="17" r="1" fill="currentColor" stroke="none" />
                  <circle cx="17" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Kyoto (2026): Cheapest &amp; Fastest Ways to Get There</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>All Japan Transport Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Put the suitcases in the hold</h2>
            <p className={styles.ctaBannerDesc}>
              Two bags of up to 30 kg each go under the coach and come out at your stop. Booking
              ahead means a seat you know you have and a QR code to scan instead of a counter queue
              on the arrivals floor — check the cancellation window shown for your own date before
              you pay.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={naritaLimousineBus.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Narita bus on Klook →
              </KlookLink>
              <KlookLink href={hanedaLimousineBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                View the Haneda bus →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
