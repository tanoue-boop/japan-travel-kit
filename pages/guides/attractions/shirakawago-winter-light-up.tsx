import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  japanWinterStayAreas,
  klookEsim,
  shirakawagoLightUpTripPrep,
  shirakawagoTakayamaKanazawaDayTour,
  shirakawagoWinterLightUpTakayamaNagoyaBusTour,
  takayamaShirakawagoNagoyaDayTrip,
} from "../../../lib/klook-links";
import { shirakawagoLightUp2027NagoyaTour } from "../../../lib/klook-links-winter-hub";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";
import { hreflangLinks } from "../../../components/Hreflang";

/**
 * The Shirakawa-go winter light-up, written as a dates, reservation and how-to-get-in
 * guide. Added 16 Nov 2026 (task-jtk-20261116-02).
 *
 * Next to its neighbours: takayama-shirakawago-tour answers "which daytime tour or bus,
 * all year"; kanazawa-2-day-itinerary puts Shirakawa-go into two Kanazawa days. This page
 * answers "how do I see the four January evenings", and sends the daytime detail there.
 *
 * Official reads on 16 Nov 2026:
 *   shirakawa-go.gr.jp/events/441/ (dated 1 Oct 2026)  41st light-up, 11 (Mon, holiday),
 *       17, 24, 31 Jan 2027, 17:30–19:30; complete advance reservation + entry tickets, none
 *       sold on the day; gate from 15:30; deck ticket not sold alone; five ways in; parking
 *       sale 1 sold out (¥6,000 / ¥9,000), sale 2 from 1 Dec 2026 13:00 at ¥7,000 (1–5 people) /
 *       ¥10,000 (6–10); no changes or refunds unless the committee cancels; may be cancelled
 *       for a nationwide cold wave; route-bus tour sales from 13, 19, 26 Oct and 2 Nov 14:00;
 *       agency plans linked 2 Dec 13:00; last route buses from the village leave in the
 *       16:00–17:00s; −10°C to 0°C during the event, frozen roads; daytime parking limits
 *   shirakawa-go.gr.jp/events/459/ (10 Nov 2026)  stay lottery winners mailed 10 Nov; any
 *       declined rooms re-offered first come on 26 Nov 2026 13:00
 *   shirakawa-go.gr.jp/events/460/ (6 Nov 2026)  day-visit rules on the four dates
 *   nouhibus.co.jp/shirakawa_lightup_2027/  courses A ¥13,000 (15:40 → 20:20), B ¥16,000 with
 *       deck (15:10 → 20:45), C ¥14,000 with onsen ticket (14:40 → 20:20); web only, up to 6
 *       per booking; ¥100 cancellation fee before departure; no waiting list; no route bus
 *       back to Takayama after the light-up
 *   hokutetsu.co.jp/news/shirakawago-lightup2027/  Kanazawa Sta West Exit 14:30 → village
 *       16:30–19:50 → Kanazawa 21:50; adult ¥18,500, child ¥16,500, deck ticket included;
 *       web and phone, up to 4 per booking
 *   hokutetsu.co.jp/highway-bus/takayama/  Kanazawa–Shirakawa-go 1h15m, ¥2,800 (child ¥1,400);
 *       Kanazawa–Takayama 2h15m, ¥4,200; reserved seating, sales one month ahead; last
 *       Shirakawa-go departures 17:30 to Kanazawa and to Takayama
 *
 * Carried with its date: Nohi Bus's notice of a Takayama–Shirakawa-go fare of ¥2,900 from
 * 1 Dec 2026 (takayama-shirakawago-tour, read 6 Nov 2026).
 * Klook: 80951 and 79800 confirmed in the www.klook.com index on 16 Nov 2026. No Klook price.
 */

const ROUTE = "/guides/attractions/shirakawago-winter-light-up";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-16");
const NOHI_FARE_READ = checkedLabel("2026-11-06");

/** Table 1: dates and the five ways in. First row is the answer. */
const wayRows = [
  {
    way: "Easiest now: a light-up bus tour (route-bus company or travel agency)",
    deck: "Route-bus tours: some yes, some no. Agency tours: no",
    status: "Route-bus tours on sale since 13 Oct – 2 Nov 2026 by date; agency plans linked on 2 Dec 2026, 13:00",
    book: "With the bus company or agency, not the tourist association",
  },
  {
    way: "Stay overnight in the village",
    deck: "Yes",
    status: "Lottery closed 31 Oct; winners told 10 Nov. Declined rooms re-offered first come on 26 Nov 2026, 13:00",
    book: "Tourist association website",
  },
  {
    way: "Your own car, reserved parking (Midashima car park)",
    deck: "No",
    status: "Sale 1 sold out. Sale 2 opens 1 Dec 2026, 13:00: ¥7,000 per car (1–5 people), ¥10,000 (6–10)",
    book: "Tourist association website, credit card; no refunds",
  },
  {
    way: "Taxi, on a reserved parking space",
    deck: "No",
    status: "Same parking sale as cars; the village taxi company does not run on event days",
    book: "Reserve parking first, then the taxi",
  },
  {
    way: "Turn up on the day",
    deck: "—",
    status: "Not possible: no entry tickets are sold on the day, and a gate closes the village to non-ticket holders from 15:30",
    book: "—",
  },
];

/** Table 2: ways to get there, on each operator's own figures. */
const routeRows = [
  {
    option: "Klook light-up coach from Nagoya (Hida Takayama on the way)",
    time: "12h25m on the listing, from the Meitetsu Bus Center",
    cost: "See the listing for your date",
    book: "On Klook; English-speaking staff; all four dates guaranteed on the listing",
  },
  {
    option: "Klook small-group light-up tour from Nagoya",
    time: "A long day; village only, no observation deck",
    cost: "See the listing for your date",
    book: "On Klook; about nine people, hotel pick-up in Sakae or at Nagoya Station",
  },
  {
    option: "Nohi Bus light-up bus from Takayama",
    time: "Leaves 14:40–15:40, back 20:20–20:45",
    cost: "¥13,000 (museum + zenzai), ¥14,000 (onsen ticket), ¥16,000 (observation deck)",
    book: "Nohi Bus website only, up to 6 per booking; no waiting list",
  },
  {
    option: "Hokutetsu light-up bus from Kanazawa",
    time: "Kanazawa 14:30 → village 16:30–19:50 → Kanazawa 21:50",
    cost: "¥18,500 adult, ¥16,500 child, observation-deck ticket included",
    book: "Hokutetsu web or phone, up to 4 per booking",
  },
  {
    option: "Route highway bus (daytime only)",
    time: "Kanazawa 1h15m; Takayama about 50 min",
    cost: `Kanazawa ¥2,800 adult (Hokutetsu); Takayama ¥2,900 from 1 Dec (Nohi Bus, read ${NOHI_FARE_READ})`,
    book: "Reserved seating; but the last buses leave the village at 17:30, before the lights end",
  },
];

/** Table 3: where to sleep. */
const stayRows = [
  {
    base: "Takayama",
    why: "Nohi Bus's light-up buses start and end at the bus centre beside JR Takayama Station, back by 20:45",
    watch: "No route bus returns to Takayama after the light-up, so the Nohi light-up bus is the way back",
  },
  {
    base: "Kanazawa",
    why: "Hokutetsu's light-up bus leaves Kanazawa Station West Exit and is back at 21:50; on the Hokuriku Shinkansen",
    watch: "A 21:50 return — sleep in Kanazawa that night rather than taking a late train onward",
  },
  {
    base: "A farmhouse inn (minshuku) in Shirakawa-go",
    why: "The only stay that includes the observation-deck ticket and the village after the coaches leave",
    watch: "Light-up nights are by lottery (closed); cancelled rooms re-offered first come on 26 Nov 2026, 13:00",
  },
  {
    base: "Nagoya",
    why: "Where the Klook light-up coaches start; on the Tokaido Shinkansen",
    watch: "The longest day of the four bases",
  },
];

const faqItems = [
  {
    q: "When is the Shirakawa-go light up 2027?",
    a: `Four evenings: 11 January (Monday, a public holiday), 17, 24 and 31 January 2027, each from 17:30 to 19:30, in the Ogimachi village. It is the 41st light-up, as announced by the Shirakawa-go Tourist Association (read ${OWN}). The association may cancel it if a nationwide cold wave threatens major transport disruption.`,
  },
  {
    q: "Do you need a reservation for the Shirakawa-go light up?",
    a: `Yes. It runs on a complete advance-reservation system with entry tickets worn round the neck; no tickets are sold on the day, and from 15:30 a gate keeps anyone without one out of the village. The five ways in are a village stay, reserved parking for a car or taxi, a route-bus company's light-up tour, or a travel agency's bus tour (read ${OWN}).`,
  },
  {
    q: "Is a tour the best way to see the light up?",
    a: "For most visitors, yes. The last route buses leave the village at 17:30, before the lights end, the village stays went by lottery, and parking needs a car with studless tyres on snow roads. A light-up bus from Nagoya, Takayama or Kanazawa holds a slot and brings you back the same night.",
  },
  {
    q: "Can I see the light up from the observation deck?",
    a: "Only with a deck ticket, which is not sold on its own. It comes with a village stay booked on a deck plan or with a route-bus company's deck tour, such as Nohi Bus's ¥16,000 course from Takayama or Hokutetsu's ¥18,500 bus from Kanazawa. Car, taxi and agency-tour visitors see the light-up from inside the village.",
  },
  {
    q: "How cold is Shirakawa-go at night in January?",
    a: `The tourist association gives −10°C to 0°C during the light-up hours, with frozen roads. It recommends a warm coat, waterproof insulated boots, spikes for your shoes and a torch, because paths are dark underfoot (read ${OWN}).`,
  },
  {
    q: "Can I visit Shirakawa-go in the daytime on a light-up day?",
    a: "Yes, with limits. Cars need no booking but must enter by 15:00 and leave by 17:00; tour buses need a parking booking, enter by 14:00 and leave by 16:00. Route-bus visitors must arrive on a bus that reaches the village by 15:20. The walking route to the observation deck closes at 15:45 and the deck at 16:10.",
  },
  {
    q: "Can I cancel or change a light-up booking?",
    a: "Parking bookings cannot be changed or refunded unless the committee cancels the event. Nohi Bus charges a ¥100 fee for cancelling before departure and accepts no changes after payment. For a Klook tour, read the cancellation line on the listing before you pay.",
  },
  {
    q: "Is there a Shirakawago light up tour from Tokyo?",
    a: "Not as a single day. Go to Nagoya or Kanazawa by shinkansen the day before and take a light-up coach from there; the Kanazawa route is in our Tokyo to Kanazawa guide.",
  },
];

const TITLE = "Shirakawago Winter Light Up 2027: Dates, Tickets & Tours";
const DESCRIPTION =
  "Shirakawago Winter Light Up: the Shirakawa-go light up 2027 is 11, 17, 24 & 31 Jan, reservation only. Compare each Shirakawago light up tour from Nagoya.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const thStyle = { fontSize: "0.88rem" } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

export default function ShirakawagoWinterLightUpPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        {hreflangLinks(ROUTE)}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={URL} />
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
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESCRIPTION, updated }),
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
                { "@type": "ListItem", position: 4, name: "Shirakawago Winter Light Up", item: URL },
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
          <span className={styles.breadCurrent}>Shirakawago Winter Light Up</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Shirakawago Winter Light Up 2027: <br />Dates, Reservations and Light-Up Tours
          </h1>
          <p className={styles.heroSubtitle}>
            Four January evenings, reservation only. Every way in, the buses that bring you back the same night, and
            where to sleep.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Tourist association rules, dated", "Nohi Bus & Hokutetsu fares", "Nagoya, Takayama, Kanazawa"].map((t) => (
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

        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>2027 dates</p>
                <p className={styles.verdictStatValue}>11, 17, 24 &amp; 31 January</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Lights on</p>
                <p className={styles.verdictStatValue}>17:30–19:30</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Reservation</p>
                <p className={styles.verdictStatValue}>Required — no tickets on the day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best way in</p>
                <p className={styles.verdictStatValue}>A light-up bus tour</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>Shirakawago winter light up</strong> is on <strong>four evenings: 11, 17, 24 and 31 January
              2027, from 17:30 to 19:30</strong>, and entry is by advance reservation only — no tickets are sold on the
              day. Cars need a reserved parking space (the second sale opens <strong>1 December 2026 at 13:00</strong>),
              and the last route buses leave the village at 17:30, before the lights end. A light-up bus tour from{" "}
              <strong>Nagoya, Takayama or Kanazawa</strong> is the most reliable way in and back. Rules read on the
              Shirakawa-go Tourist Association&apos;s site {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={shirakawagoWinterLightUpTakayamaNagoyaBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Light-Up Tour From Nagoya →
              </KlookLink>
              <KlookLink href={japanWinterStayAreas[3].url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Takayama Hotels →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Dates */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Dates and booking</span>
          <h2 className={styles.sectionTitle}>When Is the Shirakawa-go Light Up 2027?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>11 January (Monday, a public holiday), 17, 24 and 31 January 2027</strong>, 17:30 to 19:30 each
            evening, in Ogimachi. These are the 41st light-up&apos;s only dates; the association may cancel an evening if a
            nationwide cold wave threatens major transport disruption. How you get in decides whether you can go up to
            the observation deck:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Way in", "Observation deck?", "Status (16 Nov 2026)", "Where to book"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {wayRows.map((row) => (
                    <tr key={row.way}>
                      <td className={styles.tdProvider} style={thStyle}>{row.way}</td>
                      <td style={thStyle}>{row.deck}</td>
                      <td style={thStyle}>{row.status}</td>
                      <td style={thStyle}>{row.book}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://shirakawa-go.gr.jp/events/441/" target="_blank" rel="noopener">Shirakawa-go Tourist Association, 2027 light-up outline</a>,{" "}
            <a href="https://shirakawa-go.gr.jp/events/459/" target="_blank" rel="noopener">stay lottery notice</a>. Each
            entry ticket is valid only on its day and must be worn round the neck in the village.
          </p>
        </section>

        {/* Reservation */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Reservation</span>
          <h2 className={styles.sectionTitle}>Do You Need a Reservation for the Shirakawa-go Light Up?</h2>
          <p className={styles.bodyText}>
            Yes, always. The association runs it on a <strong>complete advance-reservation system with entry
            tickets</strong>: arrive without one and you are turned away, and <strong>no tickets are sold on the
            day</strong>. From 15:30 a gate stands at the village entrance. Deck tickets are never sold alone, and
            reservations cannot be changed or refunded unless the committee cancels the event (read {OWN}).
          </p>
          <p className={styles.bodyText}>
            <strong>Which booking fills first:</strong> village stays (lottery, closed), then the first parking sale
            (sold out on the day it opened). The second parking sale opens <strong>1 December 2026 at 13:00</strong>,
            and travel agencies&apos; plans are linked from the association&apos;s site on <strong>2 December 2026 at
            13:00</strong>. Klook&apos;s Nagoya light-up listings already name the January evenings; check your date on the listing.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shirakawagoWinterLightUpTakayamaNagoyaBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Light-up + Takayama from Nagoya →
            </KlookLink>
            <KlookLink href={shirakawagoLightUp2027NagoyaTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Small-group light-up tour →
            </KlookLink>
          </div>
        </section>

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>Is a Tour the Best Way to See the Light Up?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, for most visitors. Route buses stop at 17:30, before the lights end; a light-up bus or{" "}
            <strong>Shirakawago light up tour</strong> holds an entry slot and drives you back the same night. Pick the
            one that starts where you are sleeping.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Time", "Price", "Booking"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routeRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={thStyle}>{row.option}</td>
                      <td style={thStyle}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.cost}</td>
                      <td style={thStyle}>{row.book}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://www.nouhibus.co.jp/shirakawa_lightup_2027/" target="_blank" rel="noopener">Nohi Bus light-up bus</a>,{" "}
            <a href="https://www.hokutetsu.co.jp/news/shirakawago-lightup2027/" target="_blank" rel="noopener">Hokutetsu light-up bus</a>,{" "}
            <a href="https://www.hokutetsu.co.jp/highway-bus/takayama/" target="_blank" rel="noopener">Hokutetsu Shirakawa-go–Takayama line</a>. Nohi
            Bus&apos;s ¥2,900 Takayama fare from 1 December was read {NOHI_FARE_READ}. Nohi Bus and Hokutetsu opened
            their light-up seats by date between 13 October and 2 November; Nohi keeps no waiting list, and seats freed by
            cancellations reappear on its booking page. Klook tour contents are as the listings describe them.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            Which Light-Up Bus Should I Choose?
          </h3>
          <p className={styles.bodyText}>
            <strong>Staying in Takayama:</strong> Nohi Bus&apos;s course B (¥16,000) if you want the deck — about a
            20-minute walk uphill each way on snow — or course A (¥13,000) for the village and the open-air museum.{" "}
            <strong>Staying in Kanazawa:</strong> Hokutetsu&apos;s bus (¥18,500, deck included), with about 3 hours 20
            minutes in the village. <strong>Staying in Nagoya, or Japanese booking sites are a hurdle:</strong> a Klook
            coach, which you book in English.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shirakawagoWinterLightUpTakayamaNagoyaBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Nagoya light-up coach (English staff) →
            </KlookLink>
          </div>
        </section>

        {/* Daytime */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Daytime</span>
          <h2 className={styles.sectionTitle}>Can I Visit Shirakawa-go in the Daytime on a Light-Up Day?</h2>
          <p className={styles.bodyText}>
            Yes, but leave early. On the four dates, cars park without a booking but must <strong>enter by 15:00 and
            leave by 17:00</strong>; tour buses need a parking booking, enter by 14:00 and leave by 16:00. If you come
            by route bus, take one that <strong>reaches the village by 15:20</strong>. The walking route to the deck closes
            at 15:45 and the deck at 16:10. The association suggests 2 to 3 hours for the village and parking by 12:00
            (read {OWN}).
          </p>
          <p className={styles.bodyText}>
            For a daytime visit on any other day, the departures and bus fares are compared in our{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour">Takayama and Shirakawa-go tour guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shirakawagoTakayamaKanazawaDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Daytime tour from Kanazawa →
            </KlookLink>
            <KlookLink href={takayamaShirakawagoNagoyaDayTrip.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Daytime tour from Nagoya →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What to Book for the Shirakawa-go Light Up"
          intro="The light-up coach, a room where it starts, the rail pass if it pays, and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={shirakawagoLightUpTripPrep}
        />

        {/* Cold */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Weather</span>
          <h2 className={styles.sectionTitle}>How Cold Is Shirakawa-go at Night in January?</h2>
          <p className={styles.bodyText}>
            <strong>−10°C to 0°C</strong> during the light-up hours, on the tourist association&apos;s own figure, with
            frozen roads. Bring a warm coat, waterproof insulated boots, spikes for your shoes and a torch — the paths
            between the houses are dark. Tripods are banned on the observation deck and drones over the whole village.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            Is the Light Up OK With Children?
          </h3>
          <p className={styles.bodyText}>
            Yes, dressed for the cold. Nohi Bus charges the same fare for adults and primary-school children, and
            under-6s ride free without a seat; Hokutetsu&apos;s child price is ¥16,500. The deck walk is a climb on snow.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            What If It Is Cancelled for Snow?
          </h3>
          <p className={styles.bodyText}>
            Parking is refunded only when the committee cancels the event. Nohi Bus warns that snow can delay its buses
            and shorten the time in the village. For a Klook tour, the weather and refund lines are on the listing.
          </p>
        </section>

        {/* Stay */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should I Stay for the Light Up?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Where your light-up bus starts: Takayama for Nohi Bus, Kanazawa for Hokutetsu, Nagoya for the Klook coaches.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Base", "Why", "Watch out for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stayRows.map((row) => (
                    <tr key={row.base}>
                      <td className={styles.tdProvider} style={thStyle}>{row.base}</td>
                      <td style={thStyle}>{row.why}</td>
                      <td style={thStyle}>{row.watch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}: <a href="https://shirakawa-go.gr.jp/events/441/" target="_blank" rel="noopener">shirakawa-go.gr.jp</a>,{" "}
            <a href="https://www.nouhibus.co.jp/shirakawa_lightup_2027/" target="_blank" rel="noopener">nouhibus.co.jp</a>,{" "}
            <a href="https://www.hokutetsu.co.jp/news/shirakawago-lightup2027/" target="_blank" rel="noopener">hokutetsu.co.jp</a>. Two
            Kanazawa days with Shirakawa-go are planned in our{" "}
            <Link href="/guides/attractions/kanazawa-2-day-itinerary">Kanazawa 2 day itinerary</Link>, and a January
            route built around the light-up in our{" "}
            <Link href="/guides/attractions/japan-winter-itinerary">Japan winter itinerary</Link>.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for the Light Up"
          intro="Room prices and availability change by date, so each base links to Klook's hotel search for it."
          areas={[japanWinterStayAreas[3], japanWinterStayAreas[2]]}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Entry details, coach pick-up messages and any cold-wave cancellation arrive online.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Coming from Tokyo? The shinkansen leg is in our{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa">Tokyo to Kanazawa guide</Link>, and the{" "}
            <Link href="/guides/transport/hokuriku-arch-pass">Hokuriku Arch Pass</Link> guide works out whether a
            seven-day pass beats single tickets when Kanazawa sits between Tokyo and Osaka.
          </p>
        </section>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            On ordinary days, the <Link href="/guides/transport/shirakawa-go-bus" style={{ color: "var(--red)", fontWeight: 600 }}>Shirakawa-go bus</Link> from Takayama is ¥2,900 one way from 1 December 2026; to Kanazawa it is also ¥2,900.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            For a winter view of the Northern Alps, the <Link href="/guides/attractions/shinhotaka-ropeway-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Shinhotaka Ropeway</Link> runs all year: ¥3,800 return for adults.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Back in Kanazawa, <Link href="/guides/attractions/kenrokuen-garden-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Kenrokuen</Link> is ¥320 for adults, open 8:00–17:00 in winter.
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

        <KlookTourPicks
          heading="Shirakawa-go Tours on Klook"
          intro="Two light-up coaches from Nagoya, and two daytime days for the other dates. Durations, pick-up and inclusions are on each listing."
          tours={[
            shirakawagoWinterLightUpTakayamaNagoyaBusTour,
            shirakawagoLightUp2027NagoyaTour,
            shirakawagoTakayamaKanazawaDayTour,
            takayamaShirakawagoNagoyaDayTrip,
          ]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/takayama-shirakawago-tour", title: "Takayama and Shirakawa-go Tour: Which Departure" },
              { href: "/guides/attractions/kanazawa-2-day-itinerary", title: "Kanazawa 2 Day Itinerary: Kanazawa and Shirakawa-go" },
              { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary" },
              { href: "/guides/transport/tokyo-to-kanazawa", title: "Tokyo to Kanazawa by Shinkansen" },
              { href: "/guides/transport/hokuriku-arch-pass", title: "Hokuriku Arch Pass" },
              { href: "/guides/attractions/hokkaido-winter-tours", title: "Hokkaido Winter Tours From Sapporo" },
              { href: "/guides/attractions", title: "More Things to Do in Japan →" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M3 9h18M8 2v4M16 2v4" />
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

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Four evenings, no tickets on the day</h2>
            <p className={styles.ctaBannerDesc}>
              Choose your date, book a light-up coach from the city you sleep in, and dress for −10°C.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={shirakawagoWinterLightUpTakayamaNagoyaBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Light-Up Tour →
              </KlookLink>
              <KlookLink href={japanWinterStayAreas[2].url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Kanazawa Hotels →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
