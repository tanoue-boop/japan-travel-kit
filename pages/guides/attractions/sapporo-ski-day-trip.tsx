import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  kiroroLiftPassShuttleFromSapporo,
  nisekoHirafuLiftPassBusTour,
  otaruAsarigawaSkiDayTour,
  sapporoKokusaiSkiOtaruAquariumDayTour,
  sapporoSkiDayTripPrep,
  sapporoSkiSnowboardListUrl,
  sapporoTeineDestinationUrl,
  teineAllInclusiveSkiDayTrip,
  teineChineseLessonDayTour,
  teineNightSkiingTour,
  teinePrivateSkiDayWithTransfer,
  teinePrivateSkiLessons,
  teineSharedBusTransfer,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Sapporo ski day trip. Added 10 Nov 2026 (task-jtk-20261110-02). niseko-ski-tours is the
 * Niseko trip with nights at the resort; this page is the day out of a Sapporo hotel.
 *
 * Official reads on 10 Nov 2026:
 *   sapporo-teine.com/snow/            opening scheduled for 21 Nov (posted 17 Oct 2026)
 *   sapporo-teine.com/snow/lift-time   2026–2027 1-day ticket (valid to the end of night
 *                                      skiing), window / online: early season (open–18 Dec)
 *                                      adult ¥9,400 / ¥8,400, child (4–12) ¥6,200 / ¥5,200;
 *                                      regular (19 Dec–7 Mar) adult ¥9,800 / ¥8,800, child
 *                                      ¥6,500 / ¥5,500; spring (8–28 Mar) ¥7,600 / ¥6,600;
 *                                      special spring (29 Mar–5 May, Highland zone only)
 *                                      ¥7,000 / ¥6,000. 3 and under ride free.
 *                                      Night ticket 16:00–20:00 adult ¥3,900 / ¥2,900.
 *   sapporo-teine.com/snow/lift-fee/night-skiing  Olympia zone, 5 Dec 2026 – 28 Mar 2027,
 *                                      16:00–20:00, last lift 19:40.
 *   sapporo-teine.com/snow/access      about 40 min by car from central Sapporo; about 45 min
 *                                      by taxi from JR Sapporo Station; JR Hokkaido Bus 16 min
 *                                      from Teine Station.
 *   kiroro.co.jp/lift_price/           1 Day Pass high season (12 Dec 2026–11 Apr 2027) adult
 *                                      ¥9,200, child (6–12) ¥5,500; early / spring ¥5,800 /
 *                                      ¥3,800. The table header still says 2025-26 while its
 *                                      dates are 2026–27.
 *   kiroro.co.jp/operating_hours/      season 28 Nov 2026 – 5 May 2027; Center Express to 19:00
 *                                      until 31 Mar ("Night skiing 7pm until 31st March").
 *   rusutsu.com/en/winter-lift-tickets/ 2026–27 regular season (19 Dec 2026–14 Mar 2027) adult
 *                                      ¥16,700 at the counter / ¥13,200 online, child (4–12)
 *                                      ¥8,300 / ¥6,400; early season 1 (28 Nov–11 Dec) ¥7,900;
 *                                      spring to 31 Mar 2027. Night 16:00–20:00, mid-Dec to
 *                                      30 Mar 2027, adult ¥4,000.
 *   rusutsu.com/en/access-shuttle-bus-sapporo/  RUSUTSU EXPRESS 28 Nov 2026–31 Mar 2027,
 *                                      105 min, ¥3,000 one way, online by 15:00 the day before,
 *                                      Sapporo 8:00 → Rusutsu 9:45–10:05, back 16:40–17:00 →
 *                                      Sapporo 18:45.
 *
 * Kiroro's own access page gives no Sapporo journey time; the Klook package's listed
 * schedule (Sapporo Station 7:00, Kiroro 8:15) is used and labelled as such.
 * Not printed: any Klook price, any insurance price.
 */

const ROUTE = "/guides/attractions/sapporo-ski-day-trip";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-10");

const resortRows = [
  {
    resort: "Sapporo Teine",
    time: "About 40 min by car from central Sapporo; about 45 min by taxi from Sapporo Station",
    lift: "¥9,800 at the window, ¥8,800 online (adult, 19 Dec–7 Mar); child 4–12 ¥6,500 / ¥5,500",
    night: "Yes: Olympia zone, 16:00–20:00, 5 Dec 2026 – 28 Mar 2027",
    source: "sapporo-teine.com",
  },
  {
    resort: "Kiroro",
    time: "Klook's 6-hour package lists Sapporo Station 7:00 → Kiroro 8:15",
    lift: "¥9,200 adult, ¥5,500 child 6–12 (high season, 12 Dec 2026 – 11 Apr 2027)",
    night: "Center Express runs to 19:00 until 31 March",
    source: "kiroro.co.jp; Klook listing",
  },
  {
    resort: "Rusutsu",
    time: "105 min on the RUSUTSU EXPRESS bus (¥3,000 one way)",
    lift: "¥16,700 at the counter, ¥13,200 online (adult, 19 Dec 2026 – 14 Mar 2027); child 4–12 ¥8,300 / ¥6,400",
    night: "Yes: 16:00–20:00, mid-December to 30 March 2027",
    source: "rusutsu.com",
  },
];

const tourRows = [
  { type: "Bus only", what: "A seat on the ski bus; you buy the lift ticket and bring or rent gear", fits: "Skiers with their own gear", url: teineSharedBusTransfer.url, label: "Teine ski bus" },
  { type: "Lift pass + bus", what: "Round-trip bus and a 6-hour lift pass in one booking", fits: "Kiroro powder, or Niseko for a day", url: kiroroLiftPassShuttleFromSapporo.url, label: "Kiroro lift + bus" },
  { type: "All-inclusive (rental included)", what: "Transfer, lift, skis or board, boots and ski wear", fits: "Arriving with no gear; first-timers", url: teineAllInclusiveSkiDayTrip.url, label: "Teine all-inclusive" },
  { type: "Group lesson included", what: "Shuttle, equipment, lift and a lesson with a Chinese-speaking instructor", fits: "Beginners who want a group class", url: teineChineseLessonDayTour.url, label: "Teine with lesson" },
  { type: "Private lesson", what: "A private instructor for the day, with or without the transfer", fits: "Families and a first day on skis", url: teinePrivateSkiDayWithTransfer.url, label: "Teine private day" },
  { type: "Night skiing", what: "An evening at Teine with transfer, rental and lift", fits: "A day in the city first", url: teineNightSkiingTour.url, label: "Teine night tour" },
  { type: "Ski + sightseeing", what: "Half a day on the snow, half in Otaru", fits: "A mixed group of skiers and non-skiers", url: sapporoKokusaiSkiOtaruAquariumDayTour.url, label: "Kokusai + Otaru" },
];

const seasonRows = [
  { resort: "Sapporo Teine", open: "21 November 2026 (scheduled)", close: "5 May 2027 (Highland zone only from 29 March)", note: "Regular season 19 Dec – 7 Mar" },
  { resort: "Kiroro", open: "28 November 2026", close: "5 May 2027", note: "High season 12 Dec – 11 Apr" },
  { resort: "Rusutsu", open: "28 November 2026 (scheduled)", close: "31 March 2027", note: "Regular season 19 Dec – 14 Mar" },];

const faqItems = [
  {
    q: "Which ski resort is closest to Sapporo?",
    a: `Sapporo Teine, about 40 minutes by car from central Sapporo on the resort's own figure (checked ${OWN}). A 1-day lift ticket in the regular season (19 December 2026 to 7 March 2027) is ¥9,800 at the window or ¥8,800 online for an adult.`,
  },
  {
    q: "Can you ski in a day trip from Sapporo?",
    a: "Yes. Teine is about 40 minutes away, Kiroro about an hour and a quarter on the Klook package's schedule, and Rusutsu 105 minutes on the RUSUTSU EXPRESS. Tours bundle the bus, the lift ticket and, on all-inclusive versions, the rental and ski wear.",
  },
  {
    q: "Do Sapporo ski tours include rental and lessons?",
    a: "Some do. All-inclusive Teine tours include the transfer, lift ticket, skis or board, boots and ski wear; others add a group or private lesson. Bus-only and lift-plus-bus packages do not include rental, so check the inclusions on the listing.",
  },
  {
    q: "Teine, Kiroro or Rusutsu: which one?",
    a: "Teine for the shortest trip and night skiing; Kiroro for snow at a resort about an hour and a quarter away with a lift pass and bus on one ticket; Rusutsu for the biggest day, at a higher lift price (¥16,700 at the counter in the regular season) and 105 minutes each way.",
  },
  {
    q: "Is night skiing worth it at Teine?",
    a: "For a day spent in Sapporo first, yes. Teine's night skiing runs 16:00–20:00 in the Olympia zone from 5 December 2026 to 28 March 2027, and a night ticket is ¥3,900 at the window or ¥2,900 online for an adult. It is the lower zone only; the Highland zone does not open at night.",
  },
  {
    q: "When does the ski season start in Sapporo?",
    a: "Sapporo Teine is scheduled to open on 21 November 2026; Kiroro and Rusutsu open on 28 November 2026. The regular seasons, with the most terrain open, start on 12 December at Kiroro and on 19 December at Teine and Rusutsu.",
  },
  {
    q: "Do you need ski insurance for a day trip?",
    a: "Some lesson listings require accident insurance before the lesson, and a standard travel policy may exclude skiing. The ski travel insurance guide covers what to check.",
  },
];

const TITLE = "Sapporo Ski Day Trip (2026–27): Teine, Kiroro or Rusutsu";
const DESCRIPTION =
  "Sapporo ski day trip guide: a ski day trip from Sapporo to Teine (40 min), Kiroro or Rusutsu, lift prices, night skiing, and the Sapporo Teine ski tour.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function SapporoSkiDayTripPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Sapporo Ski Day Trip", item: URL },
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
          <span className={styles.breadCurrent}>Sapporo Ski Day Trip</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Sapporo Ski Day Trip (2026–27):<br />Teine, Kiroro or Rusutsu, and Which Tour to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Three resorts within a day of a Sapporo hotel: the travel time, the official lift prices, night
            skiing, the season dates and the kinds of tour.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official lift prices, dated", "Night skiing", "Tours compared"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Closest</p>
                <p className={styles.verdictStatValue}>Sapporo Teine, about 40 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Teine lift, 1 day</p>
                <p className={styles.verdictStatValue}>¥9,800 window / ¥8,800 online</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Further out</p>
                <p className={styles.verdictStatValue}>Kiroro (~1 h 15) · Rusutsu (105 min)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Season opens</p>
                <p className={styles.verdictStatValue}>Teine 21 Nov 2026 (scheduled)</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              For a <strong>Sapporo ski day trip</strong>, the closest resort is <strong>Sapporo Teine</strong>,
              about <strong>40 minutes by car</strong> from central Sapporo, with a regular-season 1-day lift ticket
              of ¥9,800 at the window or ¥8,800 online (sapporo-teine.com, checked {OWN}). An{" "}
              <strong>all-inclusive Teine tour</strong> covers the transfer, lift, rental and ski wear, so you can
              go with nothing. For more powder, <strong>Kiroro</strong> (about an hour and a quarter by ski bus) and{" "}
              <strong>Rusutsu</strong> (105 minutes) are still day trips. Niseko is possible in a day too, but the
              trip is longer; it has its own guide.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={teineAllInclusiveSkiDayTrip.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Teine all-inclusive day →
              </KlookLink>
              <KlookLink href={kiroroLiftPassShuttleFromSapporo.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Kiroro lift + bus →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Closest */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Resorts</span>
          <h2 className={styles.sectionTitle}>Which Ski Resort Is Closest to Sapporo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Sapporo Teine</strong>, about 40 minutes by car from the city centre. It is also the only one of
            the three where a night ticket makes an easy evening out of a Sapporo hotel. Kiroro and Rusutsu take
            longer to reach, and Rusutsu has the highest lift price of the three.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Resort", "From Sapporo", "1-day lift ticket (2026–27)", "Night skiing", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {resortRows.map((row) => (
                    <tr key={row.resort}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.resort}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.lift}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.night}</td>
                      <td style={{ fontSize: "0.8rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Each resort&apos;s own lift and access pages, checked {OWN}. Teine&apos;s 1-day ticket is valid until
            night skiing ends. Kiroro&apos;s official access page gives no journey time from Sapporo, so the
            Kiroro time is the schedule on Klook&apos;s package listing; Kiroro&apos;s price table is headed
            2025-26 but carries the 2026–27 dates. Prices for the early and spring seasons are lower; see the
            season table below.
          </p>
        </section>

        {/* Day trip */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Ski day trip from Sapporo</span>
          <h2 className={styles.sectionTitle}>Can You Ski in a Day Trip from Sapporo?</h2>
          <p className={styles.bodyText}>
            <strong>Yes, at all three.</strong> Teine is the short one: about 40 minutes by car, or JR to Teine
            Station and a 16-minute JR Hokkaido Bus ride. For Kiroro, Klook&apos;s package leaves Sapporo Station at
            7:00 and reaches the resort at 8:15. For Rusutsu, the RUSUTSU EXPRESS leaves central Sapporo at 8:00,
            arrives 9:45–10:05, and leaves the resort at 16:40–17:00 to reach Sapporo at 18:45; it runs from 28
            November 2026 to 31 March 2027 and must be booked online by 15:00 the day before.
          </p>
          <p className={styles.bodyText}>
            A <strong>Niseko</strong> day from Sapporo exists as a lift-and-bus package too, but it is a longer
            ride. For nights at the resort, lessons and the four Niseko areas, see the{" "}
            <Link href="/guides/attractions/niseko-ski-tours">Niseko ski tours guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nisekoHirafuLiftPassBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Niseko lift + bus from Sapporo →
            </KlookLink>
          </div>
        </section>

        {/* Tours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Sapporo Teine ski tour</span>
          <h2 className={styles.sectionTitle}>Do Sapporo Ski Tours Include Rental and Lessons?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Some do, some do not.</strong> The all-inclusive Teine tours bundle the transfer, lift, skis or
            board, boots and ski wear; lesson tours add an instructor. Bus-only and lift-plus-bus packages leave the
            rental to you.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Type", "What is in the booking", "Suits", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.type}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.type}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.fits}</td>
                      <td style={{ fontSize: "0.85rem" }}>
                        <KlookLink href={row.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                          {row.label} →
                        </KlookLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            From each Klook listing, checked {OWN}. No price is printed, because Klook prices change by date.
            Pick-up points, lesson language, age limits and what happens if the lifts stop for wind are set per
            listing. The private-lesson listing without a transfer (Teine, Mt Moiwa or Bankei) asks you to arrange
            rental yourself and to have accident insurance before the lesson.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={teinePrivateSkiLessons.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Teine private lessons →
            </KlookLink>
            <KlookLink href={sapporoSkiSnowboardListUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              All Sapporo ski tours on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Which one */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Choosing</span>
          <h2 className={styles.sectionTitle}>Teine, Kiroro or Rusutsu: Which One?</h2>
          <p className={styles.bodyText}>
            <strong>Teine</strong> if the day is short, you are new to skiing, or you want to ski under the lights
            after an afternoon in the city. <strong>Kiroro</strong> if you want a resort about an hour and a quarter
            out and a package that bundles the bus and a 6-hour lift pass. <strong>Rusutsu</strong> for the long
            day out, but the counter price is the highest (¥16,700 for an adult in the regular season, ¥13,200
            online) and the bus is 105 minutes each way. For a family, Teine&apos;s child ticket (4–12) is ¥6,500
            at the window in the regular season, and children 3 and under ride free.
          </p>
          <p className={styles.bodyText}>
            Skiers and non-skiers in one group: the Sapporo Kokusai and Otaru day splits the time between the
            snow and the canal town, and Otaru&apos;s own Asarigawa ski area is the shortest ski outing on that
            side. The <Link href="/guides/attractions/otaru-day-trip-from-sapporo">Otaru day trip guide</Link> covers
            the town half.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={sapporoKokusaiSkiOtaruAquariumDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kokusai ski + Otaru →
            </KlookLink>
            <KlookLink href={otaruAsarigawaSkiDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Otaru Asarigawa ski day →
            </KlookLink>
          </div>
        </section>

        {/* Night */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Night skiing</span>
          <h2 className={styles.sectionTitle}>Is Night Skiing Worth It at Teine?</h2>
          <p className={styles.bodyText}>
            <strong>For a day spent in Sapporo first, yes.</strong> Teine&apos;s night skiing runs{" "}
            <strong>16:00–20:00</strong> (last lift 19:40) in the Olympia zone from 5 December 2026 to 28 March
            2027. A night ticket is ¥3,900 at the window or ¥2,900 online for an adult, and ¥2,800 / ¥1,800 for a
            child. It covers the lower Olympia zone only: the Highland zone, the upper mountain, has no night
            operation. Rusutsu also runs 16:00–20:00 from mid-December, but at 105 minutes each way it is a long
            evening.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={teineNightSkiingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Teine night skiing tour →
            </KlookLink>
          </div>
        </section>

        {/* Season */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Season</span>
          <h2 className={styles.sectionTitle}>When Does the Ski Season Start in Sapporo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Late November.</strong> Teine is scheduled to open on 21 November 2026 and Kiroro and Rusutsu
            on 28 November. Early-season days are cheaper but have less terrain open; the regular seasons start in
            mid-December.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Resort", "Opens", "Closes", "Peak pricing"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row.resort}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.resort}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.open}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.close}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            sapporo-teine.com, kiroro.co.jp and rusutsu.com, checked {OWN}. Opening dates depend on snow. Early
            season adult 1-day: Teine ¥9,400 / ¥8,400 online (to 18 Dec), Kiroro ¥5,800 (to 11 Dec), Rusutsu
            ¥7,900 at the ticket office (to 11 Dec).
          </p>
        </section>

        {/* Booking */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>When Should You Book, and What If It Is Windy?</h2>
          <p className={styles.bodyText}>
            Book the day before at the latest. The RUSUTSU EXPRESS closes bookings at 15:00 the day before, and
            Teine&apos;s online lift ticket is ¥1,000 below the window price. If your dates overlap the February
            Snow Festival, book the Sapporo hotel first; the{" "}
            <Link href="/guides/attractions/sapporo-snow-festival-tours">Snow Festival guide</Link> has the dates.
            On a windy day, upper lifts may not
            run, and Teine notes that its hours change for weather; what a tour refunds or reschedules is set per
            listing, so read the cancellation terms before you pick a date.
          </p>
          <p className={styles.bodyText}>
            <strong>Insurance:</strong> some lesson listings require accident insurance, and a standard travel
            policy may exclude skiing. Our guide to{" "}
            <Link href="/guides/money/japan-ski-travel-insurance">travel insurance for skiing in Japan</Link> covers
            what to check, including what a family ski trip to Hokkaido needs.
          </p>
        </section>

        <KlookTripPrep
          label="Book with the tour"
          heading="Book These on the Same Day as Your Ski Day"
          intro="A bed near the pick-up, the airport transfer and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={sapporoSkiDayTripPrep}
        />

        {/* Clothing */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What to wear</span>
          <h2 className={styles.sectionTitle}>What Should You Wear If You Have No Ski Gear?</h2>
          <p className={styles.bodyText}>
            Book a tour that includes ski wear: the all-inclusive Teine day lists skis or board, boots and ski
            wear. Bring gloves, a hat, goggles if you have them, and warm layers to go underneath. Lift-plus-bus
            packages do not include rental, so add it at the resort or pick an all-inclusive tour.
          </p>
        </section>

        <BookingEsimCard lead="Pick-up messages, lift status and bus times all reach your phone. Get mobile data before you land." />

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
          heading="Sapporo Ski Day Trips on Klook"
          intro="Teine day and night tours, a private day, and the Kiroro lift-and-bus package. Inclusions and pick-up points are on each listing."
          tours={[teineAllInclusiveSkiDayTrip, teineNightSkiingTour, teinePrivateSkiDayWithTransfer, kiroroLiftPassShuttleFromSapporo]}
        />

        <div className={styles.pickCtaRow} style={{ marginTop: "1rem", justifyContent: "center" }}>
          <KlookLink href={sapporoTeineDestinationUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
            Everything at Sapporo Teine on Klook →
          </KlookLink>
        </div>

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/niseko-ski-tours", title: "Niseko Ski Tours (2027): Transfers, Lessons & 4 Areas" },
              { href: "/guides/attractions/sapporo-snow-festival-tours", title: "Sapporo Snow Festival Tours" },
              { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "Otaru Day Trip from Sapporo" },
              { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "Hokkaido 7-Day Itinerary" },
              { href: "/guides/money/japan-ski-travel-insurance", title: "Japan Ski Travel Insurance" },
              { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary" },
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
            <h2 className={styles.ctaBannerTitle}>Forty minutes from Sapporo to the lifts</h2>
            <p className={styles.ctaBannerDesc}>
              Teine with everything included, or Kiroro with the lift pass and bus.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={teineAllInclusiveSkiDayTrip.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Teine All-Inclusive Day →
              </KlookLink>
              <KlookLink href={kiroroLiftPassShuttleFromSapporo.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Kiroro Lift + Bus →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
