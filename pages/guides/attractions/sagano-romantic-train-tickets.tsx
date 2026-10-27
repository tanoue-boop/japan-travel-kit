import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import { GygCompareButton } from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  arashiyamaHozukyoHalfDayTour,
  arashiyamaSaganoOptionalTour,
  hozugawaRiverBoatTicket,
  saganoArashiyamaKiyomizuTour,
  saganoHozugawaGuaranteedTour,
  saganoRomanticTrainTicket,
} from "../../../lib/klook-links";
import { gygArashiyama, gygHozugawaKudari } from "../../../lib/gyg-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";

// CTA links. The headline CTA is the guided train-and-boat day (112332), not the
// bare torokko seat: a one-way rail ticket cannot be assumed to pay Klook's 6.5%
// tours band, so the ticket link sits beside a "Compare on GetYourGuide" button
// instead of carrying the page. See the Sagano block in lib/klook-links.ts.
const TOUR_URL = saganoHozugawaGuaranteedTour.url;
const TICKET_URL = saganoRomanticTrainTicket.url;
const BOAT_URL = hozugawaRiverBoatTicket.url;

// Every figure on this page was read on 25 October 2026:
//  - the ¥880 / ¥440 one-way fare, the 7.3 km / 25-minute run and the
//    1 March – 29 December 2026 season from Kyoto City's official tourism site
//    (ja.kyoto.travel) entry for 嵯峨野トロッコ列車;
//  - the group and student-group fares, the same-day counter opening times and
//    the standing-ticket rule from sagano-kanko.co.jp's own fare page;
//  - the one-month booking window, the car-and-seat selection, the car 5 rules
//    and the pet carriage fee from sagano-kanko.co.jp's FAQ and seating pages;
//  - the winter suspension dates from the operator's own English notice;
//  - the Hozugawa boat fares, duration and season from Kameoka City's official
//    page for 保津川下り.
const CHECKED = checkedLabel("2026-10-25");

const ADULT = "¥880";
const CHILD = "¥440";

const fareRows = [
  {
    ticket: "Adult, one way",
    price: ADULT,
    note: "Torokko Saga to Torokko Kameoka, or any shorter hop on the line — the fare is flat, not by distance.",
  },
  {
    ticket: "Child, one way (6 to 11)",
    price: CHILD,
    note: "Exactly half the adult fare. The operator defines a child as aged 6 or over and under 12.",
  },
  {
    ticket: "Group, 15 or more — adult",
    price: "¥800",
    note: "Child ¥400. The operator states there is no group discount on same-day tickets.",
  },
  {
    ticket: "Student group — adult",
    price: "¥710",
    note: "Child ¥360, on the operator's own fare table for school and student parties.",
  },
  {
    ticket: "Pet, in a carrier",
    price: "¥260",
    note: "A hand-luggage charge. The carrier must be within 70 cm long, about 90 cm in total dimensions and 10 kg.",
  },
];

const seasonRows = [
  {
    period: "1 March – 29 December 2026",
    status: "Running",
    note: "The 2026 season as Kyoto City's official tourism site publishes it, with departures from Torokko Saga between 09:02 and 16:02.",
  },
  {
    period: "30 December – end of February",
    status: "Suspended",
    note: "The winter shutdown. The operator's own notice for the last one gives Tuesday 30 December 2025 to Saturday 28 February 2026, with services resuming Sunday 1 March 2026.",
  },
  {
    period: "Scattered dates inside the season",
    status: "Check the calendar",
    note: "The train does not run every day of the season. The operator publishes a year operating calendar as a PDF on sagano-kanko.co.jp and marks the non-operating dates on it — check yours before you book anything else around it.",
  },
  {
    period: "From spring 2027",
    status: "New trains",
    note: "The operator states the current cars retire with the last service on 29 December 2026 and that new trains enter service in spring 2027; the announcement reported on 24 October 2026 gives 1 March 2027 as the start date, with a glass-sided design and a small premium cabin in car 4.",
  },
];

const carRows = [
  {
    car: "Cars 1 to 4 — standard",
    what: "Enclosed cars with windows you can slide open, four-person seat boxes, wooden benches and bare bulbs — converted freight wagons, and they sound like it.",
    pick: "The default, and the only sensible choice if rain is forecast. Seats are sold by car number and seat letter A to D.",
  },
  {
    car: "Car 5 — the Rich car",
    what: "Open-air: no windows at all and a glass ceiling, positioned closest to the locomotive. The operator says it may get wet inside in the rain, umbrellas are banned on board, and there is no refund for rain.",
    pick: "The one to book for the gorge, and the one to regret in a downpour. Bring a raincoat. You have to select \"No. 5\" on the reservation form — it is not assigned automatically.",
  },
];

const combinationRows = [
  {
    option: "Torokko one way only",
    cost: `${ADULT} adult, ${CHILD} child`,
    time: "About 25 minutes on the train",
    pick: "If Arashiyama is one stop on a full Kyoto day. Ride Saga to Kameoka, then walk 10 minutes to JR Umahori and take the JR Sagano Line back — the return leg is an ordinary train fare.",
  },
  {
    option: "Torokko one way + Hozugawa boat back",
    cost: `${ADULT} + ¥6,000 adult; ${CHILD} + ¥4,500 child`,
    time: "Roughly half a day — 25 minutes up, about 2 hours back down",
    pick: "The classic pairing, and the reason most people ride the train at all: the boat finishes at Arashiyama, so you end the morning where you started without a return train.",
  },
  {
    option: "A guided day that includes both",
    cost: "Check the listing for your date",
    time: "Half day or full day depending on the itinerary",
    pick: "If your date is in the autumn, or the boat's season does not line up, or you simply do not want to hold two separate reservations an hour apart. A guided departure also solves the transfer between Torokko Kameoka and the boat pier, which is not walking distance.",
  },
];

const steps = [
  {
    title: "Check your date against the operating calendar first",
    desc: `Nothing else matters if the train is not running. The 2026 season is 1 March to 29 December, there is a winter shutdown either side of it — 30 December 2025 to 28 February 2026 last time, on the operator's own notice — and there are non-operating dates inside the season too, published on the operator's year calendar. Checked ${CHECKED}.`,
  },
  {
    title: "Book online the moment the window opens — one month ahead, at midnight JST",
    desc: "The operator's FAQ states that tickets go on sale from its reservation page \"starting from midnight one month before the boarding date\". Every seat is reserved and numbered, so in the autumn foliage weeks the good dates go on the day they open. If you want car 5, this is the step where you get it.",
  },
  {
    title: "Pick the car and the seat, not just the date",
    desc: "The reservation form asks for a car number and a seat letter from A to D within a four-person box. Car 5, the open-air Rich car, has to be chosen explicitly — select \"No. 5\" on the form. The operator does not publish a river-side or mountain-side rule for cars 1 to 4, so if the view is the point, the open car is the answer rather than a seat letter.",
  },
  {
    title: "If it is sold out, turn up for a same-day ticket",
    desc: "Same-day tickets are sold first-come, first-served at the station counters — every station except Torokko Hozukyo. The operator gives opening times of about 08:35 at Torokko Saga, 08:50 at Torokko Arashiyama and 09:10 at Torokko Kameoka, and says a limited number of standing tickets go on sale once the reserved seats have gone.",
  },
  {
    title: "Book the boat separately, and in the right direction",
    desc: `The Hozugawa-kudari boat runs downstream from Kameoka to Arashiyama — the opposite direction to the train — which is why the pairing works. Kameoka City publishes ¥6,000 for an adult and ¥4,500 for a child aged 4 to elementary school, about two hours, with the main season 10 March to 30 November, heated winter boats from mid-December to 9 March, no service 29 December to 4 January, and suspension in bad weather or high water. Checked ${CHECKED}.`,
  },
];

const faqItems = [
  {
    q: "How much are Sagano Romantic Train tickets?",
    a: `${ADULT} for an adult and ${CHILD} for a child aged 6 to 11, one way, for the whole 7.3 km line between Torokko Saga and Torokko Kameoka — the fare is flat rather than by distance. Groups of 15 or more pay ¥800 and ¥400, and student groups ¥710 and ¥360, on the operator's own fare table; there is no group discount on same-day tickets. A pet in a carrier is a ¥260 hand-luggage charge. Figures checked ${CHECKED}.`,
  },
  {
    q: "How long is the Sagano Romantic Train ride, and how far does it go?",
    a: "About 25 minutes over 7.3 km, from Torokko Saga through Torokko Arashiyama and Torokko Hozukyo to Torokko Kameoka, following the Hozugawa gorge. Departures from Torokko Saga run roughly hourly from 09:02 to 16:02, with extra services at busy times of year. It is a one-way journey, not a loop — you have to plan how you are getting back before you book.",
  },
  {
    q: "When does the Sagano Romantic Train run, and when is it closed?",
    a: `The 2026 season runs from 1 March to 29 December 2026. Either side of that there is a winter shutdown: the operator's own notice for the last one gives Tuesday 30 December 2025 to Saturday 28 February 2026, with operations resuming on Sunday 1 March 2026. There are also non-operating dates inside the season, which the operator marks on a year calendar published on sagano-kanko.co.jp — so "it runs March to December" is not the same as "it runs on your date". Checked ${CHECKED}.`,
  },
  {
    q: "How far in advance should I book, and does it sell out?",
    a: "Online sales open at midnight Japan time one month before the boarding date, and that is the moment to book for the autumn foliage weeks and the cherry blossom fortnight, when reserved seats do go. Every seat on the train is reserved and numbered, so a sold-out date is genuinely sold out — there is no standing-room-by-default. What there is instead is a limited number of standing tickets released at the stations on the day, after the reserved seats have gone.",
  },
  {
    q: "Can you buy Sagano Romantic Train tickets on the day?",
    a: "Yes, at the counters of every torokko station except Torokko Hozukyo, first-come first-served. The operator gives counter opening times of about 08:35 at Torokko Saga, 08:50 at Torokko Arashiyama and 09:10 at Torokko Kameoka. That makes a same-day ticket a realistic plan on an ordinary weekday and a poor one on a November weekend, when the queue forms before the counter opens. If you cannot start your day queueing, book the month ahead or book a guided departure that holds the seat for you.",
  },
  {
    q: "Which side of the train should you sit on for the river?",
    a: "The operator publishes a seat map — cars 1 to 4 have windowed four-person boxes with seats lettered A to D — but it does not publish which side of the train faces the Hozugawa, so any confident claim about a left or right side is somebody's guess rather than the railway's. The answer that is actually in the operator's own material is car 5, the open-air \"Rich\" car: no windows, a glass ceiling, and the gorge on both sides. It has to be selected explicitly when you book.",
  },
  {
    q: "Is car 5, the open-air Rich car, worth it?",
    a: "It is the reason to ride the line rather than take the ordinary JR train through the same valley, and it is the only car where the view does not depend on which seat you drew. The trade-offs are published and real: no windows, so it may get wet inside in the rain; umbrellas are not allowed on board; and the operator states there is no refund for rain. Bring a raincoat and look at the forecast the day before. If the forecast is bad, a seat in cars 1 to 4 is the better booking.",
  },
  {
    q: "How do you get to Torokko Saga and Torokko Kameoka stations?",
    a: "Torokko Saga is adjacent to Saga-Arashiyama Station on the JR Sagano Line — about a five-minute walk — and also about five minutes from Randen Saga on the Keifuku Arashiyama line, or twenty minutes on foot from Hankyu Arashiyama. At the far end, Torokko Kameoka is about a ten-minute walk from Umahori Station on the JR Sanin (Sagano) Line, which is what makes a train-up, JR-back day easy to arrange.",
  },
  {
    q: "Should you add the Hozugawa River boat ride?",
    a: `It is the natural other half of the day, because the boat runs the opposite way: downstream from Kameoka to Arashiyama, so you finish where you started. Kameoka City publishes ¥6,000 for an adult and ¥4,500 for a child from 4 years old to elementary school, about two hours on the water, with the main season 10 March to 30 November and heated covered boats from mid-December to 9 March. There is no service 29 December to 4 January, and the boats are suspended in bad weather or high water — which is worth knowing before you build a non-refundable day around them. Checked ${CHECKED}.`,
  },
  {
    q: "Is the Sagano Romantic Train worth it with children?",
    a: `Yes, and the pricing is friendly to it: ${CHILD} a child against ${ADULT} an adult, with a 25-minute ride that is short enough not to outlast anyone's patience. Two practical notes from the operator's own material: pushchairs have to be folded on board, and there are two wheelchair spaces on the train. Guide dogs and assistance dogs may travel; other pets need a carrier and the ¥260 charge. Car 5 is the one children ask for and also the one with no windows, so decide that by the weather rather than by vote.`,
  },
];

const TITLE = "Sagano Romantic Train Tickets (2026): Prices, Seats & When It Runs";
const DESCRIPTION =
  "Sagano Romantic Train tickets are ¥880 adult and ¥440 child one way for the 25-minute, 7.3 km run through the Hozugawa gorge. The 2026 season, the winter shutdown, when booking opens, same-day tickets and the Hozugawa boat pairing.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/sagano-romantic-train-tickets") },
});

export default function SaganoRomanticTrainTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/sagano-romantic-train-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/sagano-romantic-train-tickets" />
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
              route: "/guides/attractions/sagano-romantic-train-tickets",
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
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Sagano Romantic Train Tickets",
                  item: "https://www.japan-travel-kit.com/guides/attractions/sagano-romantic-train-tickets",
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
          <span className={styles.breadCurrent}>Sagano Romantic Train Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Sagano Romantic Train Tickets (2026):<br />Prices, Seats &amp; When It Runs
          </h1>
          <p className={styles.heroSubtitle}>
            Kyoto&apos;s open-sided torokko train up the Hozugawa gorge. Every seat is reserved, the line
            shuts for the winter, and the boat back down is the half most people get wrong.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official operator fares", "Booking opens 1 month ahead"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Adult, one way</p>
                <p className={styles.verdictStatValue}>{ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Child (6–11)</p>
                <p className={styles.verdictStatValue}>{CHILD}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Ride</p>
                <p className={styles.verdictStatValue}>7.3 km, ~25 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Booking opens</p>
                <p className={styles.verdictStatValue}>1 month ahead, midnight JST</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              <strong>Sagano Romantic Train tickets</strong> cost <strong>{ADULT}</strong> for an adult and{" "}
              <strong>{CHILD}</strong> for a child aged 6 to 11, one way, for the full{" "}
              <strong>7.3 km</strong> run between <strong>Torokko Saga</strong> in Arashiyama and{" "}
              <strong>Torokko Kameoka</strong> — about <strong>25 minutes</strong> along the Hozugawa gorge,
              with departures from Torokko Saga roughly hourly from <strong>09:02 to 16:02</strong>. Every
              seat is reserved and numbered; online sales open at <strong>midnight Japan time one month
              before</strong> your date, and same-day tickets are sold first-come, first-served at every
              torokko station except Hozukyo. The <strong>2026 season runs 1 March to 29 December</strong>,
              with a winter shutdown either side of it — 30 December 2025 to 28 February 2026 last time. All
              figures read off the operator&apos;s own pages and Kyoto City&apos;s official tourism site on{" "}
              {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Train + Hozugawa Boat Day →
              </KlookLink>
              <KlookLink href={TICKET_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Torokko Ticket Only →
              </KlookLink>
              <GygCompareButton slug="sagano-romantic-train-tickets" listing={gygArashiyama} />
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is the Sagano Romantic Train?</h2>
          <p className={styles.bodyText}>
            It is a 7.3 km sightseeing railway along the old Sanin main line, running from{" "}
            <strong>Torokko Saga</strong> beside Saga-Arashiyama station, through{" "}
            <strong>Torokko Arashiyama</strong> and <strong>Torokko Hozukyo</strong>, to{" "}
            <strong>Torokko Kameoka</strong>. The rolling stock is converted freight wagons: wooden benches,
            bare bulbs, windows that slide open, and a lot of noise. Car 5, the &quot;Rich&quot; car, has no
            windows at all and a glass ceiling.
          </p>
          <p className={styles.bodyText}>
            Two things make it a booking decision rather than a sightseeing one. The first is that every seat
            is reserved and numbered, and the online window opens exactly one month ahead — so autumn dates
            are decided a month before you arrive. The second is that it is a <em>one-way</em> line with a
            seasonal shutdown. Working out how you get back, and whether the train is running at all on your
            date, matters more than which seat you pick.
          </p>
        </section>

        {/* Fares */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Are Sagano Romantic Train Tickets?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Fare", "What it means"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Fares checked {CHECKED} against the operator&apos;s own fare page and Kyoto City&apos;s official
            tourism site. Note what is <em>not</em> on this table: there is no premium charge for car 5, the
            open-air car — it costs the same {ADULT}, which is why it is the first thing to go when a date
            opens. For the Kyoto admissions a torokko day usually sits beside, our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>
            {" "}carries the check date for each one.
          </p>
        </section>

        {/* Season */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>When it runs</span>
          <h2 className={styles.sectionTitle}>When Does the Sagano Romantic Train Run — and When Is It Closed?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            This is the row of the page that ruins plans. The line shuts for two months of the winter, and
            there are non-operating dates inside the season as well.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Period", "Status", "What the operator says"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row.period}>
                      <td className={styles.tdProvider}>{row.period}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.status}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Season and suspension dates checked {CHECKED}. If your Kyoto dates fall in January or February,
            the torokko is simply not an option that trip — the{" "}
            <Link href="/guides/attractions/things-to-do-kyoto" style={{ color: "var(--text)", fontWeight: 600 }}>
              things to do in Kyoto
            </Link>
            {" "}round-up has the walk-in alternatives, and Arashiyama&apos;s bamboo grove is open and free all
            year regardless.
          </p>
          {/* An AI answer will not know whether the train runs on a given date, which is
              exactly what this CTA is for: a tour listing shows live availability. */}
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={arashiyamaSaganoOptionalTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check Your Date&apos;s Availability →
            </KlookLink>
            <GygCompareButton slug="sagano-romantic-train-tickets" listing={gygArashiyama} />
          </div>
        </section>

        {/* Cars and seats */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Seats</span>
          <h2 className={styles.sectionTitle}>Which Car and Which Seat Should You Book?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Car", "What it is", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {carRows.map((row) => (
                    <tr key={row.car}>
                      <td className={styles.tdProvider}>{row.car}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            On the question everyone asks — <strong>which side faces the river</strong> — the honest answer is
            that the operator does not publish one. Its seating material describes the car layout (four-person
            boxes, seats lettered A to D) and the rules for car 5, and stops there. So treat any left-or-right
            advice you read as a guess, and take the open car if the gorge is the reason you are on the train.
            Accessibility, from the same pages: two wheelchair spaces on the train, guide and assistance dogs
            welcome, pushchairs folded, and pets only in a carrier within roughly 70 cm and 10 kg for a ¥260
            charge. Checked {CHECKED}.
          </p>
        </section>

        {/* Getting there */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get to Torokko Saga and Torokko Kameoka?</h2>
          <p className={styles.bodyText}>
            <strong>Torokko Saga</strong> is adjacent to <strong>Saga-Arashiyama Station</strong> on the JR
            Sagano Line, about a five-minute walk. The operator also gives about five minutes from{" "}
            <strong>Randen Saga</strong> on the Keifuku Arashiyama line and about twenty minutes on foot from{" "}
            <strong>Hankyu Arashiyama</strong>. From Kyoto Station, the JR Sagano Line is the obvious approach
            and runs frequently.
          </p>
          <p className={styles.bodyText}>
            <strong>Torokko Kameoka</strong>, at the far end, is about a <strong>ten-minute walk</strong> from{" "}
            <strong>Umahori Station</strong> on the JR Sanin (Sagano) Line. That is what makes the cheapest
            version of this day work: ride the torokko one way, walk to Umahori, and come back on an ordinary
            JR train. It is also the detail that catches people out if they booked the Hozugawa boat — the
            boat pier is at Kameoka, not at Torokko Kameoka, and the two are not walking distance apart. Our{" "}
            <Link href="/guides/transport/kyoto-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              getting around Kyoto guide
            </Link>
            {" "}covers the JR, subway, Randen and bus layer this sits on, and the{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              Kansai Area Pass
            </Link>
            {" "}covers the JR legs if you are moving between Kansai cities the same week — it does not cover
            the torokko itself, which is a private railway.
          </p>
        </section>

        {/* Combination */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Train Only, Train Plus Boat, or a Guided Day?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Cost", "Time", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {combinationRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Three things no summary can answer for your date, and all three are reasons to open a listing
            rather than read one: whether the torokko is running at all that day, whether the reserved seats
            are gone, and what the cancellation terms are if the Hozugawa boats are suspended for high water.
            The boat fares above are Kameoka City&apos;s published figures (¥6,000 adult, ¥4,500 child aged 4
            to elementary school, about two hours), checked {CHECKED}; what they do not tell you is the
            availability on 18 November.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Guided Train + Boat Day →
            </KlookLink>
            <KlookLink href={BOAT_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Hozugawa Boat Ticket →
            </KlookLink>
            <GygCompareButton slug="sagano-romantic-train-tickets" listing={gygHozugawaKudari} />
          </div>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How Do You Book Sagano Romantic Train Tickets?</h2>
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
          heading="Guided Days That Include the Torokko"
          intro="All four hold the torokko seat for you, which is the part a month-ahead reservation window makes awkward. The first two pair the train with the Hozugawa boat; the third adds Kiyomizu-dera; the fourth has the ride as a selectable option, which is the one to open if your date falls near the winter shutdown. Open a listing for availability and the current price on your dates."
          tours={[saganoHozugawaGuaranteedTour, arashiyamaHozukyoHalfDayTour, saganoArashiyamaKiyomizuTour, arashiyamaSaganoOptionalTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/things-to-do-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Kyoto (2026): Temples, Timing and What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 3 4-3 3 5-3 2v11H8V10L5 8z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto Kimono Rental (2026): Which Area, What&apos;s Included, When to Return</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto and Nara Day Tour From Osaka (2026): Which Itinerary to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/arima-onsen-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 14h14v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" />
                  <path d="M9 10c0-2 1.5-2.5 1.5-4.5M14 10c0-2 1.5-2.5 1.5-4.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Arima Onsen Day Trip (2026): From Osaka or Kobe, and What the Baths Cost</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="12" rx="2" />
                  <path d="M3 11h18M7 21l1.5-4M17 21l-1.5-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026): Buses, Trains &amp; Taxis Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kansai-area-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kansai Area Pass (2026): Prices, What It Covers &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/nara-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nara Day Trip (2026): From Osaka or Kyoto, and What Todai-ji Costs</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Kyoto Osaka Itinerary (2026): 7 Days in Japan, Day by Day</p>
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
            <h2 className={styles.ctaBannerTitle}>Ride up, float back down</h2>
            <p className={styles.ctaBannerDesc}>
              The torokko one way and the Hozugawa boat the other is the one version of this day that ends
              where it started. Reserved seats open a month ahead and the line shuts for the winter, so check
              your date before you build the rest of the day around it.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Train + Boat Day →
              </KlookLink>
              <KlookLink href={TICKET_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Torokko Tickets →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
