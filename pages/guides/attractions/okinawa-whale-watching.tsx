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
  keramaWhaleWatchingIslandDay,
  klookEsim,
  kokusaiStreetHotelsUrl,
  okinawaWhaleStayAreas,
  okinawaWhaleTripPrep,
  okinawaWhaleWatchingNaha,
  okinawaWhaleWatchingThreePorts,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Okinawa whale watching — Naha boats against Zamami's own. Added 18 Nov 2026
 * (task-jtk-20261118-02).
 *
 * Next to its neighbours: okinawa-day-tours is the land day out of Naha (north or
 * south); okinawa-3-day-itinerary puts the Kerama Islands on Day 3 as a snorkel. This
 * page is the winter boat — when it runs, whether it is guaranteed, and where to leave
 * from.
 *
 * Official reads on 18 Nov 2026:
 *   zwwa.okinawa/tour/               Zamami Village Whale Watching Association: 2026 season
 *                                    8 Jan – 25 Mar (dates vary by year); ¥7,700 adult,
 *                                    ¥3,850 child, plus ¥600 whale-search fee; about 1–2 h;
 *                                    mother-and-calf watching kept to about 1 h; book direct
 *                                    with member boats since Jan 2024; prices vary by boat
 *   note.com/zamamiwhale (10 Nov 2026) 2027 season opens 8 January
 *   vill.zamami.okinawa.jp/sempaku/   Queen Zamami ¥3,950 one way / ¥7,510 return; Ferry
 *     ryokin_jikoku/                 Zamami ¥2,900 / ¥5,510; ¥100 island tax per adult;
 *                                    Queen Zamami from Tomari Port north bank, Ferry Zamami
 *                                    from the south bank (in front of Tomarin)
 *   vill.zamami.okinawa.jp/ship/2026/12/  Queen Zamami in dock 20 Oct – 3 Dec; from 4 Dec:
 *                                    Tomari 9:00 → Zamami 9:50; Zamami 16:10 → Tomari 17:10
 *                                    (via Aka); booking from one month before
 *
 * Klook listings (confirmed en-US via the www.klook.com search index, 18 Nov 2026):
 * 2492 offers Naha, Chatan or Motobu departures and a full-refund window in February
 * to mid-March if no whales are seen (no refund outside it; a blow seen or two or more
 * guests spotting a whale counts as a sighting); Naha listings describe a season of
 * roughly December to April and boats of about 3 hours. Not printed: any Klook price.
 */

const ROUTE = "/guides/attractions/okinawa-whale-watching";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-18");

const ZAMAMI_TOUR = "¥7,700";
const ZAMAMI_FEE = "¥600";
const QUEEN = "¥3,950";

/** Table 1: Naha vs Zamami — first row is the answer. */
const compareRows = [
  {
    option: "Naha boat (Klook listings)",
    season: "Roughly December to April, per the listings",
    time: "About 3 hours, harbour to harbour",
    price: "On the listing (Klook)",
    guarantee: "Full refund if no whales in a February – mid-March window on the three-port listing; none outside it",
    best: "A half day from a Naha hotel, with pick-up or a short taxi",
  },
  {
    option: "Zamami Island boat (association member boats)",
    season: "From 8 January 2027 (2026 season: 8 Jan – 25 Mar)",
    time: "About 1–2 hours on the water",
    price: `${ZAMAMI_TOUR} adult, ¥3,850 child + ${ZAMAMI_FEE} whale-search fee; varies by boat`,
    guarantee: "No guarantee published by the association",
    best: "Shorter boat ride in the whales' own waters, plus a day or a night on the island",
  },
  {
    option: "Kerama day with a whale watching option (Klook)",
    season: "Winter option on the listing",
    time: "Day, as listed",
    price: "On the listing (Klook)",
    guarantee: "See the listing",
    best: "Islands and whales on one booking",
  },
];

/** Table 2: month by month. */
const monthRows = [
  { month: "December", naha: "Boats start; listings give roughly December onward", zamami: "Not yet (opens 8 Jan 2027)", refund: "No", note: "Queen Zamami back in service from 4 Dec after dock" },
  { month: "January", naha: "Running", zamami: "From 8 January", refund: "No", note: "Both options running from the second week" },
  { month: "February", naha: "Running", zamami: "Running", refund: "Yes (three-port listing)", note: "Inside the window Naha operators refund in" },
  { month: "1–mid March", naha: "Running", zamami: "Running", refund: "Yes, to mid-March", note: "Last of the refund window" },
  { month: "Late March", naha: "Running", zamami: "2026 season ended 25 March", refund: "No", note: "Check the 2027 end date with Zamami" },
  { month: "April", naha: "Listings run to about early April", zamami: "Closed (2026)", refund: "No", note: "End of season" },
];

/** Table 3: getting to Zamami. */
const ferryRows = [
  { boat: "Queen Zamami (high-speed)", from: "Tomari Port, north bank", time: "About 50 min (9:00 → 9:50 Zamami)", fare: `${QUEEN} one way, ¥7,510 return`, note: "Back 16:10 → Tomari 17:10 (via Aka). In dock until 3 Dec 2026" },
  { boat: "Ferry Zamami", from: "Tomari Port, south bank (in front of Tomarin)", time: "Slower; see the monthly timetable", fare: "¥2,900 one way, ¥5,510 return", note: "Cheaper; also carries cars" },
];

const faqItems = [
  {
    q: "When is whale watching season in Okinawa?",
    a: `Winter. Humpback whales come to the Kerama Islands west of Naha to give birth and raise calves. Naha boats on Klook describe roughly December to April; the Zamami Village Whale Watching Association opens its 2027 season on 8 January (its 2026 season ran 8 January to 25 March). Read on zwwa.okinawa ${OWN}.`,
  },
  {
    q: "Is whale watching in Okinawa guaranteed?",
    a: "Not all season. The Naha / Chatan / Motobu listing on Klook offers a full refund if no whales are seen, but only in a window from February to mid-March; outside it there is no refund, and a blow seen in the distance or two or more guests spotting a whale counts as a sighting. The Zamami association publishes no guarantee — whales are wild.",
  },
  {
    q: "Naha or Zamami: where should you go whale watching?",
    a: `Naha if you want a half day without leaving the main island: about 3 hours from the harbour, often with hotel pick-up. Zamami if you will spend a day on the island: the Queen Zamami takes about 50 minutes from Tomari Port (${QUEEN} one way), and the boats there spend about 1–2 hours in the whales' own waters for ${ZAMAMI_TOUR} plus a ${ZAMAMI_FEE} fee.`,
  },
  {
    q: "How much is whale watching in Okinawa?",
    a: `On Zamami, the association's price is ${ZAMAMI_TOUR} for adults and ¥3,850 for children, plus a ${ZAMAMI_FEE} whale-search fee that goes to protection and research; member boats can charge differently. Naha boats are priced on each listing. Add ${QUEEN} each way for the high-speed boat to Zamami.`,
  },
  {
    q: "Can you do Zamami whale watching as a day trip from Naha?",
    a: "Yes, on the Queen Zamami: Tomari 9:00 → Zamami 9:50, and back at 16:10 → Tomari 17:10 (December 2026 timetable). That leaves the middle of the day for a boat. Book the ferry from one month before; it does not run until 4 December 2026 while in dock.",
  },
  {
    q: "What happens if the sea is rough?",
    a: "Boats do not sail, and the ferries to Zamami can be cut or changed for weather. The Naha listings set out what happens to your booking; check before you pay, and keep the morning of your last day free if you can, so a cancelled boat can be moved.",
  },
  {
    q: "Is whale watching OK for children and people who get seasick?",
    a: "The Zamami association lists a child price (¥3,850), and the Naha listings set their own age rules, so check each one. Winter seas off Okinawa can be rough: take seasickness tablets before you board, not once the boat is moving.",
  },
];

const TITLE = "Okinawa Whale Watching 2027: Season, Kerama & Naha Tours";
const DESCRIPTION =
  "Okinawa Whale Watching: the Kerama whale watching season, whale watching Naha boats (3 hours) vs Zamami (¥7,700, from 8 Jan 2027), and the refund window.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const thStyle = { fontSize: "0.88rem" } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

export default function OkinawaWhaleWatchingPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
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
                { "@type": "ListItem", position: 4, name: "Okinawa Whale Watching", item: URL },
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
          <span className={styles.breadCurrent}>Okinawa Whale Watching</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Okinawa Whale Watching (2027): <br />Kerama Whale Watching Season, Naha Boats and Zamami
          </h1>
          <p className={styles.heroSubtitle}>
            Every winter humpback whales come back to the Kerama Islands, west of Naha. You can go out from Naha for a
            half day, or take the fast boat to Zamami and go from there.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "2027 season dates", "Refund window", "Naha vs Zamami"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Season</p>
                <p className={styles.verdictStatValue}>Winter: Dec–Apr from Naha; Zamami from 8 Jan 2027</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Naha boat</p>
                <p className={styles.verdictStatValue}>About 3 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Zamami boat</p>
                <p className={styles.verdictStatValue}>{ZAMAMI_TOUR} + {ZAMAMI_FEE}, 1–2 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Guaranteed?</p>
                <p className={styles.verdictStatValue}>Refund only Feb – mid-Mar (Naha listing)</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              <strong>Okinawa whale watching</strong> is a winter trip: humpback whales gather around the{" "}
              <strong>Kerama Islands</strong>, and Naha boats on Klook run from roughly <strong>December to April</strong>{" "}
              on trips of about <strong>3 hours</strong>. Zamami Island&apos;s own boats open on{" "}
              <strong>8 January 2027</strong> and charge <strong>{ZAMAMI_TOUR}</strong> plus a {ZAMAMI_FEE} fee for 1–2
              hours on the water; the high-speed Queen Zamami from Naha takes about <strong>50 minutes</strong> ({QUEEN}{" "}
              one way). Sightings are not guaranteed all season — the Naha listing&apos;s full refund applies only from
              February to mid-March. Read on official sites and the Klook listings {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={okinawaWhaleWatchingThreePorts.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Whale Watching from Naha / Chatan →
              </KlookLink>
              <KlookLink href={kokusaiStreetHotelsUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Naha Hotels →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What to Book for Whale Watching in Okinawa"
          intro="The boat, a Naha hotel within reach of the harbour, the airport bus and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={okinawaWhaleTripPrep}
        />

        <EsimCtaTop />

        {/* Season */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Season</span>
          <h2 className={styles.sectionTitle}>When Is Whale Watching Season in Okinawa?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Winter. The Naha boats on Klook describe roughly December to April, and the Zamami Village Whale Watching
            Association opens on <strong>8 January 2027</strong> (its 2026 season ran 8 January to 25 March). February
            to mid-March is the stretch Naha operators are confident enough in to refund a no-show whale.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Month", "Naha boats", "Zamami boats", "Refund window", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monthRows.map((row) => (
                    <tr key={row.month}>
                      <td className={styles.tdProvider} style={thStyle}>{row.month}</td>
                      <td style={thStyle}>{row.naha}</td>
                      <td style={thStyle}>{row.zamami}</td>
                      <td className={styles.tdPrice} style={thStyle}>{row.refund}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://zwwa.okinawa/tour/" target="_blank" rel="noopener">zwwa.okinawa/tour</a>,{" "}
            <a href="https://note.com/zamamiwhale/n/n00a10243c17e" target="_blank" rel="noopener">the association&apos;s 2027 notice</a>{" "}
            and the Klook listings. The association notes that its dates change by year and with the number of whales;
            the 2027 end date was not yet published. The refund column is the three-port Naha listing&apos;s window, not
            a promise of more whales.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={okinawaWhaleWatchingThreePorts.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check dates on the three-port tour →
            </KlookLink>
            <KlookLink href={okinawaWhaleWatchingNaha.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Naha whale watching cruise →
            </KlookLink>
          </div>
        </section>

        {/* Guarantee */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Guarantee</span>
          <h2 className={styles.sectionTitle}>Is Whale Watching in Okinawa Guaranteed?</h2>
          <p className={styles.bodyText}>
            Not all season. The Naha / Chatan / Motobu listing on Klook gives a full refund if no whales are seen, but
            only on dates in its <strong>February to mid-March</strong> window; outside it, no refund or rebooking for a
            no-show. A blow seen in the distance, or two or more guests spotting a whale, counts as a sighting. The
            Zamami association publishes no guarantee — the whales are wild, and boats watching a mother and calf leave
            after about an hour to avoid stressing them. If a sighting matters most, book a date inside the window and
            read the listing&apos;s terms for your exact date before you pay.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={okinawaWhaleWatchingThreePorts.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Read the refund terms →
            </KlookLink>
          </div>
        </section>

        {/* Naha vs Zamami */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to go from</span>
          <h2 className={styles.sectionTitle}>Naha or Zamami: Where Should You Go?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Naha for a half day without leaving the main island — about 3 hours from the harbour, with a refund window.
            Zamami if you will give it a whole day or a night: the whales are around the island, so the boat ride is
            1–2 hours, and you see the Kerama Islands too.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Season", "Time", "Price", "Guarantee", "Best for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={thStyle}>{row.option}</td>
                      <td style={thStyle}>{row.season}</td>
                      <td style={thStyle}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.guarantee}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://zwwa.okinawa/tour/" target="_blank" rel="noopener">zwwa.okinawa/tour</a>{" "}
            (Zamami price, time and booking) and the Klook listings (Naha time, season and refund window). Since January
            2024, individual bookings on Zamami go directly to each member boat; the association lists them.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={okinawaWhaleWatchingThreePorts.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Naha, Chatan or Motobu boat →
            </KlookLink>
            <KlookLink href={keramaWhaleWatchingIslandDay.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kerama day with whale watching →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            How Do You Get From Naha to Zamami?
          </h3>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            From Tomari Port in Naha, by the high-speed Queen Zamami (about 50 minutes, {QUEEN}) or the slower, cheaper
            Ferry Zamami. Seats can be booked from one month before.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Boat", "From", "Time", "Adult fare", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ferryRows.map((row) => (
                    <tr key={row.boat}>
                      <td className={styles.tdProvider} style={thStyle}>{row.boat}</td>
                      <td style={thStyle}>{row.from}</td>
                      <td style={thStyle}>{row.time}</td>
                      <td className={styles.tdPrice} style={thStyle}>{row.fare}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://www.vill.zamami.okinawa.jp/sempaku/ryokin_jikoku/" target="_blank" rel="noopener">vill.zamami.okinawa.jp (fares)</a>{" "}
            and{" "}
            <a href="https://www.vill.zamami.okinawa.jp/ship/2026/12/" target="_blank" rel="noopener">the December 2026 timetable</a>.
            Adults also pay a ¥100 island entry tax. The two boats leave from opposite sides of Tomari Port — the
            Queen Zamami from the north bank, about 10 minutes on foot from the Tomarin ticket office.
          </p>
        </section>

        {/* Prep */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>On the boat</span>
          <h2 className={styles.sectionTitle}>What Should You Bring Whale Watching in Okinawa?</h2>
          <p className={styles.bodyText}>
            A wind-proof layer, seasickness tablets taken before you board, and sunglasses — winter seas off Okinawa can
            be rough and the deck is exposed. Leave the morning of your last day free if you can, so a boat cancelled for
            weather can be moved. If the sea stays rough, the indoor alternative is the north: buy{" "}
            <Link href="/guides/attractions/okinawa-churaumi-aquarium-tickets">Churaumi Aquarium tickets</Link> and see
            the whale sharks instead.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            Do You Need to Book Ahead?
          </h3>
          <p className={styles.bodyText}>
            Yes — fix the boat as soon as your date is, and the Queen Zamami as well, which takes bookings from one
            month before. On Zamami, contact the member boat directly. On Klook, book the date and read the weather and
            refund terms on the listing.
          </p>
        </section>

        {/* Okinawa trip */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Same trip</span>
          <h2 className={styles.sectionTitle}>What Else Can You Do in Okinawa in Winter?</h2>
          <p className={styles.bodyText}>
            A whale boat takes a morning; the rest of the day can be Naha and Shuri Castle, or a tour north to the
            Churaumi Aquarium. Our{" "}
            <Link href="/guides/attractions/okinawa-day-tours">Okinawa day tours guide</Link> compares the north and
            south days out of Naha, and the{" "}
            <Link href="/guides/attractions/okinawa-3-day-itinerary">Okinawa 3-day itinerary</Link> puts the Kerama
            Islands on Day 3 — in winter, swap the snorkel for a whale boat. The{" "}
            <Link href="/guides/attractions/okinawa-churaumi-aquarium-tickets">Churaumi Aquarium tickets guide</Link>{" "}
            has prices and hours.
          </p>
        </section>

        <KlookStayAreas
          heading="Where to Stay for a Whale Watching Morning"
          intro="Naha hotels near Kokusai-dori, within reach of the whale boats and Tomari Port."
          areas={okinawaWhaleStayAreas}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Boats can be confirmed or cancelled on the morning for weather — you need data at the hotel and on
            the pier.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares the alternatives.
          </p>
        </section>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            After a morning on the water, <Link href="/guides/attractions/okinawa-world-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Okinawa World</Link> and Gyokusendo Cave are open until 17:30 (last entry 16:00).
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            For an evening after a whale-watching morning, <Link href="/guides/attractions/southeast-botanical-gardens-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Southeast Botanical Gardens</Link> has a night illumination ticket at ¥2,500 for adults.
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
          heading="Okinawa Whale Watching on Klook"
          intro="Two boats from the main island and a Kerama day. Meeting points, times and refund terms are on each listing."
          tours={[okinawaWhaleWatchingThreePorts, okinawaWhaleWatchingNaha, keramaWhaleWatchingIslandDay]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/okinawa-day-tours", title: "Okinawa Day Tours from Naha: North vs South Compared (2026)" },
              { href: "/guides/attractions/okinawa-3-day-itinerary", title: "Okinawa 3-Day Itinerary (2026): Naha, Churaumi & Kouri" },
              { href: "/guides/attractions/okinawa-churaumi-aquarium-tickets", title: "Churaumi Aquarium Tickets 2026: Price, Hours & JUNGLIA Combo" },
              { href: "/guides/attractions/japan-14-day-itinerary", title: "Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day" },
              { href: "/guides/attractions", title: "More Things to Do in Japan →" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                    <path d="M9 21v-6h6v6" />
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
            <h2 className={styles.ctaBannerTitle}>Pick a date inside the refund window</h2>
            <p className={styles.ctaBannerDesc}>
              February to mid-March is when the Naha boat refunds a no-show whale. Book the boat, then the hotel.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={okinawaWhaleWatchingThreePorts.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Whale Tour →
              </KlookLink>
              <KlookLink href={kokusaiStreetHotelsUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Naha Hotels →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
