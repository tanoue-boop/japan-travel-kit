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
  ginzanNikkoTwoDayTourFromShinjuku,
  ginzanOnsenDestinationUrl,
  ginzanOnsenRyokanMatsumoto,
  ginzanOnsenTripPrep,
  ginzanWineryTwoDayTourFromTokyo,
  ginzanZaoFoxVillageTourFromSendai,
  jrEastPass,
  yamaderaGinzanDayTourFromSendai,
  zaoGinzanDayTourFromSendai,
  zaoGinzanTwoDayOnsenTour,
  zaoTwoDayTourFromTokyo,
} from "../../../lib/klook-links";

/**
 * Ginzan Onsen tour. Added 10 Nov 2026 (task-jtk-20261110-02), a winter page for the
 * snow-and-gas-lamp season. zao-snow-monsters-tour covers the frozen trees and the
 * ropeway; this page covers the onsen street, the winter entry rules and staying the night.
 *
 * Official reads on 10 Nov 2026:
 *   ginzanonsen.jp/winter/2026/   2026–27 winter traffic rules: 19 Dec 2026 to 7 Mar 2027
 *                                 (may be extended; an update in early Feb 2027). Cars park at
 *                                 Taisho Roman-kan and do not drive into the street. Shuttle
 *                                 out 9:00–18:00 at :00/:20/:40, back 9:10–19:30 at :10/:30/:50.
 *                                 Round-trip fares by outbound slot: 9–11 ¥1,000 advance /
 *                                 ¥1,300 on the day; 11–14 ¥700 / ¥1,000; 14–18 ¥1,200 / ¥1,500;
 *                                 ¥165 system fee per advance booking; elementary school and
 *                                 under free up to the number of adults; day-bathing fees not
 *                                 included. Advance booking closes 17:00 the day before; card
 *                                 only. 9–14 slots on sale 1 Nov 2026 for the whole period;
 *                                 14–18 slots: Dec on 1 Nov 2026, Jan on 1 Dec 2026, Feb–Mar on
 *                                 1 Jan 2027. Priority return 90 minutes after the outbound
 *                                 time. Do not walk from Taisho Roman-kan. Entry numbers are
 *                                 adjusted per time slot for everyone. Past evening waits of up
 *                                 to 3 hours. Route buses without an entry reservation drop at
 *                                 Taisho Roman-kan.
 *   ginzanonsen.jp/access/        From Sendai by car about 2 hours; Route 347 closes in winter;
 *                                 do not use prefectural road 29.
 *   yamagatakanko.com (STAY YAMAGATA) about 3 hours from Tokyo by shinkansen; bus from Oishida
 *                                 about 40 minutes to the final stop; Warashiyu footbath; winter
 *                                 night under the gas lamps.
 *   japan.travel (JNTO)           Tokyo to Oishida about 3 h 20 min on the Yamagata Shinkansen;
 *                                 bus about 35 minutes, every 60–90 minutes, not covered by the
 *                                 JR Pass.
 *   city.obanazawa.yamagata.jp    about 2 m of snow in winter.
 *
 * Not printed: the Oishida bus fare (no official page with the figure was found), the
 * shinkansen fare, bathing hours and fees, gas-lamp hours and any Klook price.
 */

const ROUTE = "/guides/attractions/ginzan-onsen-tour";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-10");

const accessRows = [
  {
    from: "Tokyo",
    route: "Yamagata Shinkansen to Oishida, then the bus to Ginzan Onsen (final stop)",
    time: "About 3 h to 3 h 20 min by train, then about 35–40 min by bus",
    note: "Buses run about every 60–90 minutes; the JR Pass covers the train, not the bus",
    source: "yamagatakanko.com; japan.travel",
  },
  {
    from: "Sendai",
    route: "Express bus towards Shinjo, change at Obanazawa, then the bus to Ginzan Onsen",
    time: "About 2 h, then about 40 min",
    note: "Most visitors from Sendai take a day tour instead",
    source: "ginzanonsen.jp",
  },
  {
    from: "Sendai, by car",
    route: "Route 48 to Higashine, Route 13 to Obanazawa IC",
    time: "About 2 h",
    note: "In winter, park at Taisho Roman-kan and take the shuttle. Route 347 closes in winter",
    source: "ginzanonsen.jp",
  },
  {
    from: "Taisho Roman-kan (winter)",
    route: "Timed shuttle bus to the onsen street",
    time: "Every 20 min, 9:00–18:00 out, 9:10–19:30 back",
    note: "Walking this stretch is not allowed in winter",
    source: "ginzanonsen.jp/winter/2026/",
  },
];

const shuttleRows = [
  { slot: "9:00–11:00", advance: "¥1,000", day: "¥1,300" },
  { slot: "11:00–14:00", advance: "¥700", day: "¥1,000" },
  { slot: "14:00–18:00", advance: "¥1,200", day: "¥1,500" },
];

const winterRows = [
  { rule: "Period", detail: "19 December 2026 to 7 March 2027; may be extended for snow, with an update in early February 2027" },
  { rule: "Private cars", detail: "Do not drive into the onsen street. Park at Taisho Roman-kan" },
  { rule: "Shuttle", detail: "Out at :00, :20 and :40 from 9:00 to 18:00; back at :10, :30 and :50 from 9:10 to 19:30" },
  { rule: "Booking", detail: "Advance tickets close at 17:00 the day before, card only, ¥300 off the day price plus a ¥165 fee per booking. Day tickets only if seats are left, from the machine at Taisho Roman-kan" },
  { rule: "Return", detail: "Priority boarding on the bus 90 minutes after your outbound time, printed on the ticket. Miss it and you wait for a free seat" },
  { rule: "Walking", detail: "Do not walk from Taisho Roman-kan. In the street, walk on the river side of the centre marker, away from snow falling off roofs" },
  { rule: "Entry numbers", detail: "Adjusted per time slot for everyone, guests and day visitors alike. Evening waits of up to 3 hours have happened" },
  { rule: "Route buses", detail: "The plan is that passengers without an entry reservation get off at Taisho Roman-kan and change to the shuttle" },
  { rule: "Children", detail: "Elementary school age and under ride free, up to the number of adults in the group" },
  { rule: "Not included", detail: "Day-bathing fees" },
];

const tourRows = [
  { tour: "Ginzan Onsen & Zao Snow Monsters day tour", from: "Sendai", days: "1 day", adds: "Zao Ropeway and the snow monsters; a lunch named in the title", night: "No", url: zaoGinzanDayTourFromSendai.url },
  { tour: "Ginzan Onsen, Zao & Fox Village tour", from: "Sendai", days: "1 day", adds: "Zao Ropeway and the Zao Fox Village; the listing says the Ginzan shuttle and the ropeway are paid on the day", night: "No", url: ginzanZaoFoxVillageTourFromSendai.url },
  { tour: "Yamadera & Ginzan Onsen day trip", from: "Sendai", days: "8 h 50 min", adds: "The Yamadera mountain temple instead of Zao; lunch on your own; minimum two people", night: "No", url: yamaderaGinzanDayTourFromSendai.url },
  { tour: "Ginzan Onsen, Zao & Fox Village 2-day tour", from: "Check the listing", days: "2 days, 1 night", adds: "Onsen hotel with breakfast and dinner, the snow monsters, the Fox Village", night: "Yes, hotel named on the listing", url: zaoGinzanTwoDayOnsenTour.url },
  { tour: "2-day tour from Tokyo with Yamadera", from: "Tokyo", days: "2 days", adds: "The snow monsters, Yamadera and the Fox Village", night: "Yes", url: zaoTwoDayTourFromTokyo.url },
  { tour: "2-day tour from Tokyo with a winery", from: "Tokyo", days: "2 days, 1 night", adds: "Hot-spring hotel with breakfast and dinner, Zao, a Yamagata winery, the Fox Village", night: "Yes", url: ginzanWineryTwoDayTourFromTokyo.url },
  { tour: "2-day tour with Nikko & Ouchijuku", from: "Shinjuku", days: "2 days", adds: "Zao ropeway, Nikko Toshogu and the post town of Ouchijuku", night: "Yes", url: ginzanNikkoTwoDayTourFromShinjuku.url },
];

const faqItems = [
  {
    q: "How do you get to Ginzan Onsen from Tokyo?",
    a: `Take the Yamagata Shinkansen from Tokyo to Oishida (about 3 hours to 3 hours 20 minutes), then the bus to its final stop, Ginzan Onsen (about 35–40 minutes). The buses run about every 60–90 minutes and are not covered by the JR Pass. Figures from Yamagata's official tourism site and JNTO, checked ${OWN}.`,
  },
  {
    q: "Can you visit Ginzan Onsen as a day trip?",
    a: "Yes. From Sendai, day tours combine Ginzan Onsen with the Zao snow monsters, the Zao Fox Village or Yamadera. Going on your own in winter, from 19 December 2026 to 7 March 2027 day visitors come in by timed shuttle from the Taisho Roman-kan car park, on a ticket best booked by 17:00 the day before.",
  },
  {
    q: "When is the best time to see Ginzan Onsen in snow?",
    a: "December to February. Obanazawa gets about 2 m of snow in winter, and the 2026–27 winter traffic rules run from 19 December 2026 to 7 March 2027, which is the stretch the town itself plans around.",
  },
  {
    q: "Do you need to stay overnight to see the gas lamps?",
    a: "No, but it is easier. The last winter shuttle into the street leaves at 18:00 and the last one back at 19:30, so a day visitor on a 14:00–18:00 ticket can be there after dark. The evening is the busiest time, entry is limited per time slot, and past evening waits have reached 3 hours. A night at a ryokan in the street avoids the queue.",
  },
  {
    q: "How much is the Ginzan Onsen winter shuttle?",
    a: "Round trip, by outbound time: 9:00–11:00 ¥1,000 in advance or ¥1,300 on the day; 11:00–14:00 ¥700 or ¥1,000; 14:00–18:00 ¥1,200 or ¥1,500. Advance bookings add a ¥165 fee per booking. Children of elementary school age and under ride free, up to the number of adults.",
  },
  {
    q: "Can day visitors use the hot springs?",
    a: "The official winter page states that the shuttle fare does not include day-bathing fees, so day bathing is a separate charge. Hours and fees are set by each bath or inn and are not printed here; check on the day. The Warashiyu footbath sits along the Ginzan River.",
  },
  {
    q: "Can you see Ginzan Onsen and the Zao snow monsters in one day?",
    a: "From Sendai, yes, on a tour: two Sendai day tours cover both. From Tokyo, the tours that combine them are two-day tours.",
  },
  {
    q: "Is Ginzan Onsen good with children?",
    a: "Children of elementary school age and under ride the winter shuttle free, up to the number of adults in the group. The street is snowy and you walk on the river side, away from the roofs, so boots with grip matter more than anything else.",
  },
];

const TITLE = "Ginzan Onsen Tour (2026–27): Day Trip, Winter and Gas Lamps";
const DESCRIPTION =
  "Ginzan Onsen tour guide: a Ginzan Onsen day trip from Sendai or a night stay, the Ginzan Onsen winter shuttle for 2026–27, and the route from Tokyo.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function GinzanOnsenTourPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Ginzan Onsen Tour", item: URL },
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
          <span className={styles.breadCurrent}>Ginzan Onsen Tour</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Ginzan Onsen Tour (2026–27):<br />Day Trip or Overnight, and the Winter Rules
          </h1>
          <p className={styles.heroSubtitle}>
            The snowbound hot-spring street of Obanazawa, Yamagata, under its gas lamps. How to get there, the
            2026–27 winter shuttle, and which tour fits your plan.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "2026–27 winter rules, dated", "Tokyo and Sendai routes", "Tours compared"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Where</p>
                <p className={styles.verdictStatValue}>Obanazawa, Yamagata</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Snow season</p>
                <p className={styles.verdictStatValue}>December to February</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Tokyo</p>
                <p className={styles.verdictStatValue}>About 3 h by shinkansen + 35–40 min bus</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Winter rules</p>
                <p className={styles.verdictStatValue}>Timed shuttle, 19 Dec 2026 – 7 Mar 2027</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Ginzan Onsen tour</strong> goes to the old hot-spring street of Obanazawa in Yamagata,
              best known for its <strong>snow and gas lamps from December to February</strong>. From Tokyo it is
              about <strong>3 hours on the Yamagata Shinkansen to Oishida</strong>, then a 35–40 minute bus
              (STAY YAMAGATA and JNTO, checked {OWN}). The usual <strong>Ginzan Onsen day trip</strong> is a tour
              from <strong>Sendai</strong>, often paired with the Zao snow monsters; to see the lamps after dark
              without the evening queue, <strong>stay the night</strong>. In winter, from 19 December 2026 to 7
              March 2027, day visitors come in by a timed shuttle from ¥700 round trip.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={zaoGinzanDayTourFromSendai.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Day tour from Sendai →
              </KlookLink>
              <KlookLink href={ginzanWineryTwoDayTourFromTokyo.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                2-day tour from Tokyo →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Access */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get to Ginzan Onsen from Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Take the <strong>Yamagata Shinkansen to Oishida</strong> (about 3 hours to 3 hours 20 minutes), then
            the <strong>bus to its final stop, Ginzan Onsen</strong> (about 35–40 minutes). The bus runs about
            every 60–90 minutes, so plan the train around it. From Sendai, the onsen&apos;s own page gives an
            express bus towards Shinjo and a change at Obanazawa.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["From", "Route", "Time", "Notes", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.from}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.from}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                      <td style={{ fontSize: "0.8rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            All checked {OWN}. The train time is about 3 hours on STAY YAMAGATA (Yamagata&apos;s official tourism
            site) and about 3 hours 20 minutes on JNTO; the bus is about 40 minutes on the first and 35 on the
            second. The shinkansen and bus fares are not printed here; check JR East and the bus operator before
            you travel. Drivers should note that Route 347 closes in winter and the onsen asks drivers not to use
            prefectural road 29.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Is a rail pass worth it?</strong> The Yamagata Shinkansen is a JR East line, so a trip that
            adds Sendai, Zao or Nikko may suit the JR EAST PASS. The{" "}
            <Link href="/guides/transport/jr-east-pass">JR East Pass guide</Link> does the arithmetic.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrEastPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR EAST PASS →
            </KlookLink>
          </div>
        </section>

        {/* Day trip */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Ginzan Onsen day trip</span>
          <h2 className={styles.sectionTitle}>Can You Visit Ginzan Onsen as a Day Trip?</h2>
          <p className={styles.bodyText}>
            <strong>Yes, and from Sendai a tour is the simple way.</strong> Day tours from Sendai pair Ginzan Onsen
            with the Zao snow monsters, the Zao Fox Village or the Yamadera mountain temple, and handle the drive
            on winter roads. From Tokyo a day trip is possible by train, but with about 3 hours each way and a bus
            every 60–90 minutes, the time in the street is short; the tours from Tokyo that include Ginzan are
            two-day tours.
          </p>
          <p className={styles.bodyText}>
            Going on your own in winter, plan around the shuttle described below: book a time slot in advance and
            note the priority return time on the ticket.
          </p>
        </section>

        {/* Winter rules */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Ginzan Onsen winter</span>
          <h2 className={styles.sectionTitle}>What Are the Ginzan Onsen Winter Rules for 2026–27?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>From 19 December 2026 to 7 March 2027</strong>, cars park at <strong>Taisho Roman-kan</strong> and
            visitors ride a <strong>timed shuttle</strong> into the street, every 20 minutes. Round-trip fares
            depend on the outbound time, and booking ahead saves ¥300.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Outbound time", "Advance (round trip)", "On the day (round trip)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shuttleRows.map((row) => (
                    <tr key={row.slot}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.slot}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.advance}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.day}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Rule", "What the official page says"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {winterRows.map((row) => (
                    <tr key={row.rule}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.rule}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ginzanonsen.jp, 2026–27 winter traffic page, checked {OWN}. Sales: the 9:00–14:00 slots for the whole
            period went on sale on 1 November 2026; the 14:00–18:00 slots open month by month (December on 1
            November 2026, January on 1 December 2026, February and March on 1 January 2027). The page asks
            visitors not to use unlicensed taxis or unofficial transfers.
          </p>
        </section>

        {/* Best time */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>When to go</span>
          <h2 className={styles.sectionTitle}>When Is the Best Time to See Ginzan Onsen in Snow?</h2>
          <p className={styles.bodyText}>
            <strong>December to February.</strong> Obanazawa&apos;s own site puts the winter snow at about 2 m, and
            the onsen&apos;s 2026–27 winter rules run from 19 December 2026 to 7 March 2027, the stretch the town
            plans around. STAY YAMAGATA singles out the winter night, when the snow-covered inns glow under the
            gas lamps, as the scene to photograph. Snow depth on a given day depends on the weather before it.
          </p>
          <p className={styles.bodyText}>
            <strong>Best time of day:</strong> the morning slots are quieter and the 11:00–14:00 slot is the
            cheapest; the 14:00–18:00 slots are the ones that reach dusk, and the evening is when waits are
            longest. The 14:00–18:00 slots for January go on sale on 1 December 2026 and for February on 1
            January 2027, so book on those dates for a weekend.
          </p>
        </section>

        {/* Gas lamps */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Night</span>
          <h2 className={styles.sectionTitle}>Do You Need to Stay Overnight to See the Gas Lamps?</h2>
          <p className={styles.bodyText}>
            <strong>No, but staying is the easier way.</strong> The last winter shuttle into the street leaves
            Taisho Roman-kan at 18:00 and the last one back leaves at 19:30, so a day visitor on a 14:00–18:00
            ticket can be in the street after dark. The catch is the crowd: entry numbers are adjusted per time
            slot, the official page says evening waits have reached 3 hours, and the priority return is 90
            minutes after your outbound time.
          </p>
          <p className={styles.bodyText}>
            A night at a ryokan in the street avoids all of that, and puts you under the lamps after the day
            visitors have gone. Winter weekends are the dates to settle first. Two-day tours also include a hotel night, but the hotel is not necessarily in Ginzan
            itself; check the listing for where it is and when the group is in the street.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ginzanOnsenRyokanMatsumoto.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Ryokan in Ginzan Onsen on Klook →
            </KlookLink>
            <KlookLink href={zaoGinzanTwoDayOnsenTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              2-day tour with onsen hotel →
            </KlookLink>
          </div>
        </section>

        {/* Tours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tours</span>
          <h2 className={styles.sectionTitle}>Which Ginzan Onsen Tour Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Pick by where you start, then by what you add.</strong> In Sendai: a day tour with Zao, the Fox
            Village or Yamadera. In Tokyo: a two-day tour, which adds a hotel night and avoids two long transfers
            in one day.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tour", "Departs", "Length", "What it adds", "Hotel night", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.tour}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.from}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.days}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.adds}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.night}</td>
                      <td style={{ fontSize: "0.85rem" }}>
                        <KlookLink href={row.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                          Check dates →
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
            Whether the winter shuttle fare is included, how long the group stays in the street, the meeting
            point and the cancellation window are set per listing; read them before you book. Tours run under
            the same winter rules as everyone else, and the official page says it makes no exception for tour
            groups.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ginzanOnsenDestinationUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              All Ginzan Onsen tours on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Zao + Ginzan */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Ginzan + Zao</span>
          <h2 className={styles.sectionTitle}>Can You See Ginzan Onsen and the Zao Snow Monsters in One Day?</h2>
          <p className={styles.bodyText}>
            <strong>From Sendai, yes, on a tour.</strong> Two Sendai day tours cover both: one with a lunch named
            in the title, one that adds the Zao Fox Village. On your own it is hard, because Zao Onsen and Ginzan
            Onsen are far apart and each has its own bus. From Tokyo, the tours that combine the two are two-day
            tours. For the ropeway fares, the season of the frozen trees and the night light-up, see the{" "}
            <Link href="/guides/attractions/zao-snow-monsters-tour">Zao snow monsters tour guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={zaoGinzanDayTourFromSendai.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Ginzan & Zao day tour (Sendai) →
            </KlookLink>
            <KlookLink href={ginzanZaoFoxVillageTourFromSendai.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Ginzan, Zao & Fox Village (Sendai) →
            </KlookLink>
          </div>
        </section>

        {/* Bathing */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Hot springs</span>
          <h2 className={styles.sectionTitle}>Can Day Visitors Use the Hot Springs?</h2>
          <p className={styles.bodyText}>
            <strong>Yes, for a separate fee.</strong> The official winter page states that the shuttle fare does
            not include day-bathing fees. Hours and fees are set by each bath or inn and change through the
            season, so they are not printed here; ask at the Ginzan Onsen information office (0237-28-3933) or
            check on the day. STAY YAMAGATA describes the Warashiyu footbath along the Ginzan River, fed straight
            from the source. Guests at a ryokan bathe in its own baths.
          </p>
        </section>

        {/* Weather */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Weather and cancellations</span>
          <h2 className={styles.sectionTitle}>What Happens in Heavy Snow or If a Tour Is Cancelled?</h2>
          <p className={styles.bodyText}>
            Winter roads set the pace. The official page says late arrivals are moved to the next bus with room,
            and that the rules may be extended past 7 March 2027 if the snow stays. On tours, what changes and
            what is refunded is set per listing: the Sendai Fox Village tour, for example, uses the Zao Chuo
            Ropeway when the Zao Ropeway is unavailable. Check the cancellation window on the listing before you
            book a weekend date, as those fill first.
          </p>
        </section>

        <KlookTripPrep
          label="Book with the tour"
          heading="Book These on the Same Day as Your Ginzan Onsen Tour"
          intro="A bed in the onsen street, the rail pass for going on your own, a hotel by Tokyo Station and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={ginzanOnsenTripPrep}
        />

        {/* Children and clothing */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Children and clothing</span>
          <h2 className={styles.sectionTitle}>Is Ginzan Onsen Good with Children, and What Should You Wear?</h2>
          <p className={styles.bodyText}>
            Children of elementary school age and under ride the winter shuttle free, up to the number of adults
            in the group. Each tour sets its own age rules. Dress for deep snow: a waterproof outer layer, gloves,
            a hat and boots with grip. In winter the official page asks everyone to walk on the river side of the
            centre marker, because snow slides off the roofs on the inn side.
          </p>
        </section>

        <BookingEsimCard lead="Timed shuttle tickets, bus times and tour messages all live on your phone. Get mobile data before you land." />

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
          heading="Ginzan Onsen Tours on Klook"
          intro="Three day tours from Sendai and two-day tours from Tokyo. Durations, meeting points and inclusions are on each listing."
          tours={[zaoGinzanDayTourFromSendai, ginzanZaoFoxVillageTourFromSendai, yamaderaGinzanDayTourFromSendai, ginzanWineryTwoDayTourFromTokyo, zaoTwoDayTourFromTokyo]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/zao-snow-monsters-tour", title: "Zao Snow Monsters Tour (2026–27): Season, Ropeway and Tours" },
              { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary" },
              { href: "/guides/attractions/jigokudani-snow-monkey-tour", title: "Jigokudani Snow Monkey Tour" },
              { href: "/guides/transport/jr-east-pass", title: "JR East Pass (2026): Price, Coverage and Is It Worth It?" },
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
            <h2 className={styles.ctaBannerTitle}>Snow and gas lamps, December to February</h2>
            <p className={styles.ctaBannerDesc}>
              From Sendai, one day with Zao. From Tokyo, two days with a hotel night.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={zaoGinzanDayTourFromSendai.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Day Tour from Sendai →
              </KlookLink>
              <KlookLink href={ginzanWineryTwoDayTourFromTokyo.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                2-Day Tour from Tokyo →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
