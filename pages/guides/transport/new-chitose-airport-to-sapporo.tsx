import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  jrHokkaidoRailPass,
  newChitoseAirportTransfers,
  newChitoseSapporoStayAreas,
  newChitoseSapporoTripPrep,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";
import { hreflangLinks } from "../../../components/Hreflang";

/**
 * New Chitose Airport to Sapporo, added 28 Nov 2026 (task-jtk-20261128-02).
 *
 * The arrival page for a winter Hokkaido trip. sapporo-3-day-itinerary and
 * hokkaido-7-day-itinerary each give the airport run one line; this page is every
 * way from New Chitose to central Sapporo, side by side. Niseko is
 * sapporo-to-niseko-transfer.
 *
 * Read on 28 Nov 2026:
 *   jrhokkaido.co.jp/airport/  Rapid Airport fastest 37 min, Special Rapid fastest
 *     33 min (36 min in the 9:00–16:00 pattern), six an hour 9:00–16:00 (1 Special
 *     Rapid, 3 Rapid, 2 Semi-Rapid), 163 trains a day; the 23:21 Special Rapid from
 *     the airport leaves on time whatever the flights; station under the domestic
 *     terminal; car 4 u-seat ¥1,000 extra (¥800 ticketless); IC cards accepted.
 *   jrhokkaido.co.jp/global/english/travel/airport.html  same pattern in English;
 *     luggage on board up to 2 items, 250 cm total (max 2 m), 30 kg each.
 *   jrhokkaido.co.jp/global/english/ticket/regular/  New Chitose Airport–Sapporo
 *     ¥1,230 non-reserved, ¥2,230 reserved; ages 6–11 half price; Hokkaido Rail Pass
 *     5-day ¥22,000 (advance).
 *   jrhokkaidonorikae.com vtime (Rapid Airport, timetable data from the Nov 2026 JR
 *     timetable)  first Rapid Airport from the airport 6:38, last 23:21.
 *   chuo-bus.co.jp/feature/airport  the renewed city-centre line (Hokuto Kotsu and
 *     Chuo Bus jointly): ¥1,500 adult, ¥750 child to Sapporo; domestic terminal (ANA
 *     side) 8:40 → Sapporo Station-mae 9:51, last 22:55 → 24:04; international
 *     terminal about 6 min after the ANA-side time; hotel-loop route from the airport
 *     12:30–19:30; no reservation; cases in the trunk.
 *   hokto.co.jp/information/49138/  renewal from 11 Dec 2026: Sapporo Station-mae /
 *     Susukino route 72 a day from the airport, hotel loop 11, total 83 (161 before
 *     across both directions, 171 after); new Susukino → airport direct about 1 hr
 *     2 min, airport-bound only; fares unchanged.
 *   hokto.co.jp/sapporo-chitose/  current timetable (from 1 Apr 2026); "所要時間は
 *     目安"; pay by cash, contactless credit card or PayPay.
 *   hokto.co.jp/information/40781/  (22 Nov 2026) some runs may be cancelled while
 *     vehicle maintenance is stepped up.
 *   hokto.co.jp/hire-chitose/  Chitose taxis: ¥740 for the first 1.4 km, ¥100 per
 *     293 m after (revised 10 Jul 2026), +20% 22:00–5:00, +20% winter surcharge
 *     10 Dec – 26 Mar, tolls extra, no fixed-fare taxis in the Chitose area.
 *   hokkaido-airports.com/en/new-chitose/access/taxi/  taxi stands at both
 *     terminals; tourist and large taxis at the arrivals information desk.
 * Japan Rail Pass ¥53,000 for 7 days is the figure on hokkaido-rail-pass (3 Nov 2026).
 * No metered total to Sapporo is printed: no operator publishes one. No Klook price.
 */

const CHECKED = checkedLabel("2026-11-28");
const JRP_CHECKED = checkedLabel("2026-11-03");

const ROUTE = "/guides/transport/new-chitose-airport-to-sapporo";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const JR_AIRPORT_URL = "https://www.jrhokkaido.co.jp/airport/";
const JR_EN_URL = "https://www.jrhokkaido.co.jp/global/english/travel/airport.html";
const JR_FARE_URL = "https://www.jrhokkaido.co.jp/global/english/ticket/regular/";
const BUS_URL = "https://www.chuo-bus.co.jp/feature/airport";
const HOKUTO_URL = "https://www.hokto.co.jp/sapporo-chitose/";
const RENEWAL_URL = "https://www.hokto.co.jp/information/49138/";
const TAXI_URL = "https://www.hokto.co.jp/hire-chitose/";
const CTS_BUS_URL = "https://www.hokkaido-airports.com/en/new-chitose/access/bus/";

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
);

type ModeRow = { mode: string; time: string; fare: string; service: string; snow: string; bags: string };

const modeRows: ModeRow[] = [
  {
    mode: "Best for most: JR Rapid Airport",
    time: "37 min to Sapporo (Special Rapid 33 min at fastest)",
    fare: "¥1,230; ¥2,230 in the reserved u-seat car",
    service: "6 an hour 9:00–16:00; first 6:38, last 23:21 from the airport",
    snow: "Off the roads, so no traffic; when JR suspends trains, JR Hokkaido's airport page has a disruption guide",
    bags: "Up to 2 items, 250 cm and 30 kg each; you lift them on",
  },
  {
    mode: "Airport bus (Hokuto Kotsu / Chuo Bus)",
    time: "About 70 min to Sapporo Station-mae; Susukino and Odori on the way",
    fare: "¥1,500 (child ¥750)",
    service: "About every 10–20 min, 8:40–22:55 from the domestic terminal; 83 a day from 11 Dec 2026",
    snow: "Same roads as cars; the operators call the times a guide and warn of traffic delays",
    bags: "Cases in the trunk; no reservation",
  },
  {
    mode: "Taxi from the rank",
    time: "Door to door; by road like the bus",
    fare: "Meter: ¥740 first 1.4 km, then ¥100 per 293 m; +20% in winter and +20% at night; tolls extra",
    service: "Ranks at both terminals, any hour",
    snow: "Same roads; the winter surcharge runs 10 Dec – 26 Mar",
    bags: "In the boot; wagons and 9-seat vans on request",
  },
  {
    mode: "Booked private car (Klook)",
    time: "Door to door",
    fare: "Priced per vehicle — see the listing for your date",
    service: "Book before you fly; driver meets the flight",
    snow: "Same roads as the bus",
    bags: "Pick the car size for ski bags",
  },
];

const faqItems = [
  {
    q: "How do I get from New Chitose Airport to Sapporo?",
    a: `Take the JR Rapid Airport from the station under the domestic terminal: 37 minutes to Sapporo Station for ¥1,230, six trains an hour in the daytime, the last at 23:21. The airport bus takes about 70 minutes for ¥1,500 and stops at Susukino, Odori and Sapporo Station. Checked ${CHECKED}.`,
  },
  {
    q: "Is the train or the bus better from New Chitose?",
    a: "The train for speed and snow: it is about half an hour faster, ¥270 cheaper and does not sit in road traffic. The bus if your hotel is by a bus stop in Susukino or Odori, or if your cases are too heavy to lift — they ride in the trunk.",
  },
  {
    q: "Can I use the JR Pass or the Hokkaido Rail Pass to Sapporo?",
    a: `Yes. Both cover JR Hokkaido's Rapid Airport. The Hokkaido Rail Pass starts at ¥22,000 for 5 days bought in advance, so it pays only when the trip also uses JR to Otaru, Asahikawa, Hakodate or towards Niseko; the airport run alone is ¥1,230. The airport buses are private companies and take neither pass.`,
  },
  {
    q: "What time is the last train from New Chitose Airport to Sapporo?",
    a: `23:21, a Special Rapid Airport that JR Hokkaido runs for late flights and that leaves on time even if your flight is late. The last airport bus from the domestic terminal is 22:55. After that it is a metered taxi or a car booked in advance. Checked ${CHECKED}.`,
  },
  {
    q: "How much is a taxi from New Chitose Airport to Sapporo?",
    a: "No company publishes a fixed fare: Chitose taxis run on the meter — ¥740 for the first 1.4 km and ¥100 for every 293 m after — with 20% added between 10 December and 26 March and another 20% from 22:00 to 5:00, plus tolls. A car booked on Klook is priced per vehicle before you fly.",
  },
];

const TITLE = "New Chitose Airport to Sapporo 2026: Train vs Bus & Fares";
const DESCRIPTION =
  "New Chitose Airport to Sapporo: JR Rapid Airport 37 min for ¥1,230 until 23:21, airport bus about 70 min for ¥1,500, taxi meter rules and snow-day tips.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <><svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg><span className="sr-only"> / </span></>
);

const related = [
  { href: "/guides/transport/sapporo-to-niseko-transfer", title: "Sapporo to Niseko in Winter: Ski Bus, Train & Transfer" },
  { href: "/guides/attractions/sapporo-3-day-itinerary", title: "Sapporo 3 Day Itinerary" },
  { href: "/guides/transport/hokkaido-rail-pass", title: "Hokkaido Rail Pass (2026): Price and Is It Worth It?" },
  { href: "/guides/attractions/sapporo-snow-festival-tours", title: "Sapporo Snow Festival Tours" },
  { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "Hokkaido 7 Day Itinerary" },
  { href: "/guides/attractions/sapporo-ski-day-trip", title: "Sapporo Ski Day Trip" },
  { href: "/guides/transport/japan-luggage-delivery", title: "Japan Luggage Delivery" },
  { href: "/guides/transport", title: "More Transport Guides →" },
];

function SimpleTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((cells, i) => (
              <tr key={i}>
                {cells.map((c, j) => (
                  <td key={j} className={j === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.88rem" }}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const note = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

export default function NewChitoseAirportToSapporoPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "New Chitose Airport to Sapporo", item: URL },
              ],
            }),
          }}
        />
      </Head>

      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          {crumbSep}
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          {crumbSep}
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          {crumbSep}
          <span className={styles.breadCurrent}>New Chitose Airport to Sapporo</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            New Chitose Airport to Sapporo 2026: <br />Train vs Bus, Fares &amp; Times
          </h1>
          <p className={styles.heroSubtitle}>
            The JR Rapid Airport, the airport bus, a taxi and a booked car from New Chitose to central Sapporo — with
            the fares, the first and last departures, and which one to take on a snowy day.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Fares from JR Hokkaido and the bus operators", "No Klook prices — check per date"].map((t) => (
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
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Fastest</p>
                <p className={styles.verdictStatValue}>JR, 37 min, ¥1,230</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Bags in the trunk</p>
                <p className={styles.verdictStatValue}>Bus, ~70 min, ¥1,500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Last departure</p>
                <p className={styles.verdictStatValue}>Train 23:21 (bus 22:55)</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              From <strong>New Chitose Airport to Sapporo</strong>, the <strong>JR Rapid Airport</strong> takes{" "}
              <strong>37 minutes</strong> to Sapporo Station for <strong>¥1,230</strong>, six trains an hour in the
              daytime and the last at <strong>23:21</strong>. The <strong>airport bus</strong> takes about{" "}
              <strong>70 minutes</strong> to Sapporo Station-mae for <strong>¥1,500</strong>, with stops at Susukino and
              Odori and cases in the trunk. A taxi runs on the meter — ¥740 for the first 1.4 km plus 20% from
              10 December to 26 March — so for a fixed price to the hotel door, book a private car before you fly. JR
              Hokkaido, Hokuto Kotsu and Hokkaido Chuo Bus, checked {CHECKED}.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              Heading straight to the slopes? See{" "}
              <Link href="/guides/transport/sapporo-to-niseko-transfer">Sapporo to Niseko in winter</Link> for the
              ski buses from the airport.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={newChitoseAirportTransfers.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                New Chitose transfers →
              </KlookLink>
              <KlookLink href={jrHokkaidoRailPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                JR Hokkaido Rail Pass →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Every option</span>
          <h2 className={styles.sectionTitle}>How Do I Get from New Chitose Airport to Sapporo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            By the JR Rapid Airport for most arrivals: 37 minutes, ¥1,230, from the station directly under the domestic
            terminal. One row per option, adult one-way fares; the first row is the answer.
          </p>
          <SimpleTable
            head={["Option", "Time", "Adult fare", "Departures", "On a snowy day", "Luggage"]}
            rows={modeRows.map((r) => [r.mode, r.time, r.fare, r.service, r.snow, r.bags])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: 2026-11-28. Sources: {ext(JR_AIRPORT_URL, "JR Hokkaido, Rapid Airport")};{" "}
            {ext(JR_EN_URL, "JR Hokkaido, airport travel information (English)")}; {ext(JR_FARE_URL, "JR Hokkaido fares")};{" "}
            {ext(BUS_URL, "Hokkaido Chuo Bus, airport bus timetable")}; {ext(HOKUTO_URL, "Hokuto Kotsu, Sapporo city centre line")};{" "}
            {ext(TAXI_URL, "Hokuto Kotsu Chitose taxi fares")}; {ext(CTS_BUS_URL, "New Chitose Airport bus platforms")}. Bus times are
            from the domestic terminal (ANA side); the international terminal stop is about six minutes later. Children
            6–11 ride JR at half fare.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Train or bus</span>
          <h2 className={styles.sectionTitle}>Is the Train or Bus Better from New Chitose?</h2>
          <p className={styles.bodyText}>
            The train, unless your bags decide it. The Rapid Airport is about half an hour faster than the bus, ¥270
            cheaper, and runs on rails rather than the expressway, which matters on a snowy evening; five of its six
            cars take an IC card with no ticket, and car 4 is the reserved u-seat for ¥1,000 extra (¥800 ticketless),
            with room for large cases. JR Hokkaido allows two items of up to 250 cm and 30 kg each on board. The bus
            wins when you cannot lift your cases — they go in the trunk — or when your hotel is in Susukino or by Odori
            Park, where it stops before Sapporo Station-mae. Both operators call the bus times a guide that traffic can
            stretch, and Hokuto Kotsu posted on 22 November 2026 that some runs may be cancelled while it steps up
            vehicle maintenance.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={newChitoseAirportTransfers.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Private car instead →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>From 11 December</span>
          <h2 className={styles.sectionTitle}>What Changes on the Airport Bus This Winter?</h2>
          <p className={styles.bodyText}>
            More buses and simpler routes, at the same fare. From 11 December 2026, Hokuto Kotsu and Chuo Bus split the
            Sapporo city-centre line in two: a <strong>Sapporo Station-mae / Susukino</strong> route with 72 buses a
            day from the airport, and a <strong>city-centre hotel loop</strong> with 11, running roughly 12:30 to 19:30
            from the airport and calling at Keio Plaza, Grand Mercure and other hotels and Nakajima Park. Towards the
            airport, a new <strong>Susukino direct</strong> takes about 1 hour 2 minutes via the Sapporo-minami IC, for
            the winter days when buses filled at Susukino and left later stops behind. The adult fare stays ¥1,500
            (¥1,400 from the Kiyota stops). Pay in cash, by contactless credit card or PayPay; no reservation is taken.
          </p>
          <p className={styles.bodyText} style={note}>
            Last checked: 2026-11-28. Source: {ext(RENEWAL_URL, "Hokuto Kotsu news release, 21 Oct 2026")} and{" "}
            {ext(BUS_URL, "Hokkaido Chuo Bus timetable")}.
          </p>
        </section>

        <KlookTripPrep
          label="Book before you land"
          heading="What Should You Book Before Flying into New Chitose?"
          intro="A room by Sapporo Station, data, and — if you have ski bags or land late — a car. Klook prices change by date, so open a listing for the figure on yours."
          items={newChitoseSapporoTripPrep}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Rail passes</span>
          <h2 className={styles.sectionTitle}>Can I Use the JR Pass or Hokkaido Rail Pass to Sapporo?</h2>
          <p className={styles.bodyText}>
            Yes — both cover the Rapid Airport, which is a JR Hokkaido train; neither covers the airport buses, which are
            run by private companies. Whether either pays is another question. The{" "}
            <Link href="/guides/transport/hokkaido-rail-pass">Hokkaido Rail Pass</Link> is ¥22,000 for 5 days bought in
            advance (JR Hokkaido, {CHECKED}), against ¥1,230 each way to the airport, so it earns its price only with
            longer JR days: Otaru, Asahikawa, Hakodate, or the train via Otaru towards Niseko. The nationwide Japan Rail
            Pass, ¥53,000 for 7 days ({JRP_CHECKED}), makes sense only if the same week includes shinkansen travel on
            Honshu.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrHokkaidoRailPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              JR Hokkaido Rail Pass →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Late and snowy arrivals</span>
          <h2 className={styles.sectionTitle}>What If I Land Late or It Is Snowing?</h2>
          <p className={styles.bodyText}>
            Work back from two times: the last airport bus leaves the domestic terminal at <strong>22:55</strong>, and
            the last train, a Special Rapid Airport, at <strong>23:21</strong>. JR Hokkaido runs that train for late
            flights but says it leaves on schedule whether or not a flight is delayed. In snow, the train is the safer
            choice because it avoids the roads; if JR suspends services, its airport page explains the alternatives.
            After the last train, the choice is a metered taxi from the rank — with the 20% winter surcharge from
            10 December and another 20% between 22:00 and 5:00, plus tolls — or a car booked in advance. In February,
            when the <Link href="/guides/attractions/sapporo-snow-festival-tours">Sapporo Snow Festival</Link> fills
            the city, book the room first; for ski bags all the way to the slopes, the{" "}
            <Link href="/guides/transport/sapporo-to-niseko-transfer">Niseko transfer</Link> leaves from the same
            airport.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={newChitoseAirportTransfers.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Book a car from New Chitose →
            </KlookLink>
          </div>
        </section>

        <KlookStayAreas
          heading="Where Should You Stay in Sapporo After Landing?"
          intro="The train ends at Sapporo Station and the bus stops at Susukino, Odori and the station. Availability and price change by date, so each area links to Klook's hotel search."
          areas={newChitoseSapporoStayAreas}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Next</span>
          <h2 className={styles.sectionTitle}>What Comes After the Airport?</h2>
          <p className={styles.bodyText}>
            Three days in the city are laid out in the{" "}
            <Link href="/guides/attractions/sapporo-3-day-itinerary">Sapporo 3 day itinerary</Link>, and a week around
            the island in the <Link href="/guides/attractions/hokkaido-7-day-itinerary">Hokkaido 7 day itinerary</Link>.
            For a ski day from a Sapporo hotel, see the{" "}
            <Link href="/guides/attractions/sapporo-ski-day-trip">Sapporo ski day trip</Link>; to send cases ahead
            instead of carrying them, <Link href="/guides/transport/japan-luggage-delivery">Japan luggage delivery</Link>.
          </p>
        </section>

        <BookingEsimCard lead="Train times, the bus platform and your hotel map — get mobile data before you land at New Chitose." />

        <EsimCtaBottom />

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

        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {related.map((r) => (
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

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>New Chitose to Sapporo in one ride</h2>
            <p className={styles.ctaBannerDesc}>
              Take the Rapid Airport, or book a car for ski bags and late flights — and settle the first night by Sapporo Station.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={newChitoseAirportTransfers.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                New Chitose transfers →
              </KlookLink>
              <KlookLink href={newChitoseSapporoStayAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Sapporo Station hotels →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
