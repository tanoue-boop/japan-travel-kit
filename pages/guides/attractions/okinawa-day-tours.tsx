import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookLink from "../../../components/KlookLink";
import styles from "../../../styles/BestEsimJapan.module.css";
import {
  churaumiAquariumTicket,
  churaumiKouriNorthernDayTour,
  nahaAirportCarRental,
  nahaToursListUrl,
  okinawaChuraumiKouriFullDayTour,
  okinawaChuraumiStayAreas,
  okinawaChurashimaBusDayTour,
  okinawaDayToursPrep,
  okinawaManzamoKouriChuraumiTour,
  okinawaNorthSouthBusTour,
  okinawaToursListUrl,
  shuriCastlePeaceWalkingTour,
  southernOkinawaDayTrip,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";

/**
 * Okinawa Day Tours, written for the exact phrase. Added 5 Nov 2026 (task
 * jtk-20261105-01), the second Okinawa page after okinawa-churaumi-aquarium-tickets.
 *
 * Tour facts come from the www.klook.com search index, read 5 Nov 2026, because Klook
 * answers automated reads of /activity/ pages with HTTP 403:
 *   134350  north, Naha and Chatan, about 10 hours, three pick-up points, aquarium and
 *           Manzamo tickets in the bus package, 3–3.5 hours at the aquarium, Chinese guide
 *           with an English-commentary package on some dates.
 *   91094   north, from Naha, 9 hours 35 minutes to 11 hours 30 minutes.
 *   28134   north, hotel pick-ups (LOISIR HOTEL NAHA 8:20; Hilton Okinawa Chatan Resort);
 *           Churaumi and Nago Pineapple Park admission on the en-CA listing, departs from
 *           one person; full refund up to 24 hours; operator weather cancellation gives
 *           a reschedule or a full refund.
 *   6489    Naha or Chatan, 11 hours, English / Chinese / Japanese / Korean.
 *   142932  north or south route, no attraction tickets, guide or meals; 3 hours at
 *           Churaumi.
 *   2405    south, about 8 hours, 9:30 departure, no guide, Japanese-speaking driver,
 *           minimum four participants.
 *   160735  Shuri Castle and Tamaudun on foot, about 4 hours with a local guide.
 *   158983  north; a typhoon that stops normal travel cancels and fully refunds; the
 *           operator sends the meeting details 16:00–21:00 the day before; under-3s free
 *           if notified in advance.
 *   168838  north; weather cancellation notified by 17:00 the day before; minimum five.
 *           Seen only without an en-US locale, so described, not linked.
 *
 * Official reads, 5 Nov 2026:
 *   oki-park.jp/shurijo/ticket_guide/11413       Seiden public from 23 Nov 2026; fees from
 *                                                that date; interior needs a timed ticket.
 *   oki-park.jp/shurijo/en/qa/                   ¥400 / ¥300 / ¥160 until 22 Nov 2026.
 *   oki-park.jp/shurijo/information/detail/10917 hours by season.
 *   yui-rail.co.jp/yuirail/plan/                 Naha City to Maeda, Urasoe City; 17 km.
 *   yui-rail.co.jp/en/routemap/tedakouranishi/   19 stations, 37 minutes end to end.
 *   visitokinawajapan.com typhoon precautions    June–September; flights, ships, buses,
 *                                                monorail and attractions may stop.
 *   pref.okinawa.jp                              land transport with no rail system,
 *                                                dependent on road traffic.
 *
 * The queue's brief said Yui Rail runs "only inside Naha City". Its operator shows it
 * ending in Urasoe, so the page says that instead.
 *
 * Churaumi figures are carried from okinawa-churaumi-aquarium-tickets (3 Nov 2026).
 * Nothing here is first-hand and no Klook price appears.
 */
const ROUTE = "/guides/attractions/okinawa-day-tours";
const CHECKED = checkedLabel("2026-11-05");
const CHURAUMI_READ = checkedLabel("2026-11-03");

/** Column order: what a reader compares first. */
const tourRows = [
  {
    tour: "Northern: Churaumi, Kouri Island, Cape Manzamo, American Village",
    url: churaumiKouriNorthernDayTour.url,
    route: "North",
    hours: "About 10 hours",
    from: "Naha and Chatan, three pick-up points",
    includes: "Coach; aquarium and Manzamo tickets in the bus package; 3–3.5 hours at the aquarium",
    guide: "Chinese guide; English commentary on some dates, by package",
  },
  {
    tour: "Cape Manzamo, Kouri Island & Churaumi Aquarium",
    url: okinawaManzamoKouriChuraumiTour.url,
    route: "North",
    hours: "9 hours 35 minutes – 11 hours 30 minutes",
    from: "Naha",
    includes: "Check the option you pick",
    guide: "Check the option you pick",
  },
  {
    tour: "Churaumi Aquarium & Kouri Island full-day tour",
    url: okinawaChuraumiKouriFullDayTour.url,
    route: "North",
    hours: "Full day",
    from: "Named hotel pick-ups, such as LOISIR HOTEL NAHA at 8:20",
    includes: "Coach; Churaumi and Nago Pineapple Park admission on the listing we read; departs from one person",
    guide: "Check the option you pick",
  },
  {
    tour: "Churashima Okinawa bus day tour",
    url: okinawaChurashimaBusDayTour.url,
    route: "Check the option: northern and southern stops are both named",
    hours: "11 hours",
    from: "Naha or Chatan",
    includes: "Admission to the attractions on the route you pick",
    guide: "English, Chinese, Japanese or Korean, by option",
  },
  {
    tour: "Okinawa sightseeing bus, north and south routes",
    url: okinawaNorthSouthBusTour.url,
    route: "North or south, by option",
    hours: "Full day; 3 hours at Churaumi on the north route",
    from: "Naha",
    includes: "The bus only: no attraction tickets, guide or meals",
    guide: "None",
  },
  {
    tour: "Southern Okinawa day trip",
    url: southernOkinawaDayTrip.url,
    route: "South",
    hours: "About 8 hours, from 9:30",
    from: "Naha",
    includes: "Coach, Cape Chinen, the Nirai Kanai Bridge. Needs four participants to run",
    guide: "No guide; Japanese-speaking driver",
  },
  {
    tour: "Shuri Castle peace walking tour",
    url: shuriCastlePeaceWalkingTour.url,
    route: "Naha",
    hours: "About 4 hours",
    from: "On foot, in Naha",
    includes: "Shurijo Castle and Tamaudun with a local guide",
    guide: "Local guide",
  },
];

const choiceRows = [
  { want: "Churaumi Aquarium, your first time here", pick: "A northern tour with the aquarium ticket in the package" },
  { want: "An English-speaking guide", pick: "Churashima (6489), and pick the English option at checkout" },
  { want: "Hotel pick-up rather than a meeting point", pick: "The Churaumi & Kouri Island full-day tour (28134)" },
  { want: "Caves, sea views and an easier day", pick: "The southern trip: about 8 hours against 10 or more" },
  { want: "Shuri Castle's restored main hall", pick: "The walking tour, or your own visit by monorail from 23 November 2026" },
  { want: "A bus and no group", pick: "The north and south sightseeing bus: bring your own tickets" },
];

const shuriRows = [
  { what: "Adult admission to the paid area", now: "¥400", from: "¥1,000" },
  { what: "High-school student", now: "¥300", from: "¥760" },
  { what: "Elementary and junior-high student", now: "¥160", from: "¥370" },
  { what: "Under 6", now: "Free", from: "Free" },
  { what: "Seiden main hall interior", now: "Not open", from: "Needs a date-and-time ticket; choosing a slot costs nothing extra" },
];

const shuriHoursRows = [
  { when: "Until 30 November", paid: "8:30–19:00, ticket sales to 18:30", free: "8:00–19:30" },
  { when: "1 December – 31 March", paid: "8:30–18:00, ticket sales to 17:30", free: "8:00–18:30" },
];

const carRows = [
  { factor: "Who drives", tour: "Nobody in your group", car: "One of you, on the left" },
  { factor: "Naha Airport to Churaumi", tour: "Included in a day of about 10 hours", car: "About 2 hours each way by expressway" },
  { factor: "Time at each stop", tour: "Fixed: 3–3.5 hours at the aquarium", car: "As long as you like" },
  { factor: "Paperwork", tour: "None", car: "Passport, your licence, an international driving permit, a credit card" },
  { factor: "Best for", tour: "One day out, non-drivers, solo travellers", car: "Families, several days, or a night in Motobu" },
];

const typhoonRows = [
  { q: "When is the risk highest?", a: "Typhoons mainly affect Okinawa from June to September, and the Japan Meteorological Agency says the number approaching Okinawa peaks in August." },
  { q: "Who cancels?", a: "Usually the operator. One northern listing (158983) cancels and fully refunds if a typhoon stops normal travel. Another (28134) offers a reschedule or a full refund if the operator cancels for extreme weather." },
  { q: "When will I know?", a: "One northern listing says by 17:00 the day before. Another sends meeting details between 16:00 and 21:00 the day before, so check your messages that evening." },
  { q: "Can I cancel myself?", a: "On 28134, for a full refund up to 24 hours before the activity date, but not after a late arrival or a no-show. Terms differ by listing, and bad weather that does not stop the tour may not count." },
  { q: "What else can stop?", a: "Visit Okinawa warns that flights, buses and the monorail may be suspended, attractions may close and ship services are disrupted for longest. The aquarium also says it can close for typhoons." },
];

const faqItems = [
  {
    q: "What is the best day tour in Okinawa?",
    a: `For a first visit, a northern tour from Naha with Churaumi Aquarium, Kouri Island and Cape Manzamo: it covers the most of what is hard to reach without a car. Choose by language first, because several run in Chinese only. Churashima lists an English option; the 134350 northern tour has English commentary on some dates only. Listings read on ${CHECKED}.`,
  },
  {
    q: "How long is an Okinawa north day tour?",
    a: `About 10 to 11.5 hours on the listings we read on ${CHECKED}: 9 hours 35 minutes to 11 hours 30 minutes on one, about 10 on another and 11 on a third. One lists an 8:20 hotel pick-up in Naha, and the aquarium is about two hours from Naha Airport by car, so plan on an evening return.`,
  },
  {
    q: "How long is a southern Okinawa day tour?",
    a: `About 8 to 9 hours. The Southern Okinawa day trip lists about 8 hours from a 9:30 departure, and one Chinese-guided southern tour lists 9. Half-day southern buses also exist, including one with Sefa-Utaki that ends around 13:00 at Naha Airport or the Prefectural Office.`,
  },
  {
    q: "Do I need a car in Okinawa?",
    a: `Not for Naha, and not for one or two days out. The main island has no rail network beyond the Yui Rail monorail, which runs 17 km from Naha Airport to Tedako-Uranishi in Urasoe, so the north and south need a tour, a bus or a car. A day tour covers a single trip; a car makes sense for several days or for a family.`,
  },
  {
    q: "Can I visit Churaumi Aquarium on a day tour from Naha?",
    a: `Yes. Most northern tours stop there, with about 3 to 3.5 hours on the 134350 listing and 3 hours on the north-route sightseeing bus. Check whether your option includes the ticket: the sightseeing bus does not. Adult admission is ¥2,180 at the aquarium's own price, read on ${CHURAUMI_READ}.`,
  },
  {
    q: "What happens if a typhoon cancels my tour?",
    a: `If the operator cancels, you normally get a refund or a reschedule. One northern listing fully refunds if a typhoon stops normal travel, and 28134 offers a reschedule or full refund for extreme weather. Check your own listing's terms, and book a tour early in your stay from June to September so there is a spare day.`,
  },
  {
    q: "Are Okinawa day tours OK for children?",
    a: `Generally yes, but it is a long day on a coach. One northern listing (158983) says under-3s are free if you tell customer service in advance. Rules differ, so check before you book. Churaumi admission is ¥710 for elementary and junior-high students and free under 6.`,
  },
  {
    q: "What should I do in Okinawa if it rains?",
    a: `Pick the stops that are under a roof. Churaumi Aquarium is indoors and Gyokusendo Cave at Okinawa World is underground, so both hold up well. Kouri Island and Cape Manzamo are the stops a wet day costs you. Each listing sets its own terms, and one Okinawa listing states that cancelling because of bad weather is not refunded, so read yours first.`,
  },
  {
    q: "Is Shuri Castle's main hall open?",
    a: `It opens to the public on 23 November 2026, after the 2019 fire, on Shurijo Castle Park's own notice read on ${CHECKED}. The same day the adult fee goes from ¥400 to ¥1,000, and seeing the interior needs a ticket for a set date and time. Check that a tour includes this before you assume you will get inside.`,
  },
];

const TITLE = "Okinawa Day Tours from Naha: North vs South Compared (2026)";
const DESCRIPTION =
  "Okinawa Day Tours from Naha run north to Churaumi and Kouri Island or south to Okinawa World, about 8 to 11 hours. Compare routes, inclusions and rules.";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 };

export default function OkinawaDayToursPage({ updated }: { updated: PageUpdated }) {
  const url = `https://www.japan-travel-kit.com${ROUTE}`;
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={url} />
        {hreflangLinks(ROUTE)}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={url} />
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
          dangerouslySetInnerHTML={{ __html: articleJsonLd({ route: ROUTE, headline: TITLE, updated }) }}
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
                { "@type": "ListItem", position: 4, name: "Okinawa Day Tours", item: url },
              ],
            }),
          }}
        />
      </Head>

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
          <span className={styles.breadCurrent}>Okinawa Day Tours</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Okinawa Day Tours from Naha:<br />North vs South Compared
          </h1>
          <p className={styles.heroSubtitle}>
            Two routes, seven tours side by side, and the rules that decide your day: language, pick-up and typhoons.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Tours compared", "Car or tour", "Typhoon rules"].map((t) => (
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
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links. We may earn a
            small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>Okinawa day tours</strong> from Naha follow two routes. Northern tours go to Churaumi
            Aquarium, Kouri Island and Cape Manzamo, some adding American Village or Nago Pineapple Park, and
            run <strong>about 10 to 11.5 hours</strong>. Southern tours cover Cape Chinen, the Nirai Kanai
            Bridge and Okinawa World&apos;s Gyokusendo Cave and run <strong>about 8 to 9 hours</strong>, and
            Shuri Castle is sold separately, as a half-day walk or a Shuri Castle and Okinawa World bus course. Pick the north for a first visit, and
            check the guide&apos;s language before anything else, because several of these tours run in Chinese
            only. All durations are from Klook&apos;s listings, read on {CHECKED}.
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>North</p>
                <p className={styles.verdictStatValue}>About 10–11.5 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>South</p>
                <p className={styles.verdictStatValue}>About 8–9 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Depart from</p>
                <p className={styles.verdictStatValue}>Naha, some also Chatan</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Watch for</p>
                <p className={styles.verdictStatValue}>Guide language, typhoons</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> a northern tour is the one to book first, early in your stay if you
              travel between June and September, so a typhoon cancellation leaves you a spare day.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={churaumiKouriNorthernDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check the northern day tour →
              </KlookLink>
              <KlookLink href={southernOkinawaDayTrip.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check the southern day trip →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Which Okinawa Day Tours Can You Book From Naha?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Seven worth comparing, and the differences that matter are the guide&apos;s language, the pick-up and
            what the price covers. Prices move by date, so we do not print them.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tour", "Route", "Duration", "Departs from", "What is included", "Guide"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.url}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>
                        <KlookLink href={row.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--red)", fontWeight: 600 }}>
                          {row.tour}
                        </KlookLink>
                      </td>
                      <td style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.from}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.includes}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.guide}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read from Klook&apos;s listings through the klook.com search index on {CHECKED}, because the product
            pages block automated reads, so confirm the details on the listing at checkout. Options within a
            listing can differ.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Which to pick</span>
          <h2 className={styles.sectionTitle}>What Is the Best Day Tour in Okinawa?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            A northern tour for a first visit. Nothing else puts the aquarium, Kouri Island and Cape Manzamo in
            one day without a car. From there, let what you need decide:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["If you want", "Book"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {choiceRows.map((row) => (
                    <tr key={row.want}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.want}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={okinawaChurashimaBusDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Churashima bus day tour →
            </KlookLink>
            <KlookLink href={okinawaChuraumiKouriFullDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Churaumi & Kouri full-day tour →
            </KlookLink>
            <KlookLink href={okinawaToursListUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              All Okinawa tours on Klook →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>North</span>
          <h2 className={styles.sectionTitle}>How Long Is an Okinawa North Day Tour?</h2>
          <p className={styles.bodyText}>
            About 10 to 11.5 hours, and most of that is the coach. The aquarium is about two hours from Naha
            Airport by car on its own access page, so a named pick-up like the 8:20 at LOISIR HOTEL NAHA means
            an evening return. Allow for that when you book dinner or a flight: a northern tour is not one to
            take on the day you fly out.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Aquarium</span>
          <h2 className={styles.sectionTitle}>Can You Visit Churaumi Aquarium on a Day Tour From Naha?</h2>
          <p className={styles.bodyText}>
            Yes, and it is the main reason to take one. Listings allow about 3 to 3.5 hours there, which is
            enough for the Kuroshio Sea tank. Check whether the ticket is in the price: the north
            and south sightseeing bus leaves it to you, and the aquarium&apos;s own adult price is ¥2,180, read on{" "}
            {CHURAUMI_READ}. Prices, hours and the feeding schedule are all in our{" "}
            <Link href="/guides/attractions/okinawa-churaumi-aquarium-tickets" style={linkStyle}>
              Okinawa Churaumi Aquarium tickets guide
            </Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={okinawaManzamoKouriChuraumiTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Manzamo, Kouri & Churaumi tour →
            </KlookLink>
            <KlookLink href={churaumiAquariumTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Churaumi ticket only →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book for the same trip"
          heading="What Else Should You Book Around an Okinawa Day Tour?"
          intro="A day tour fills one day of your stay. These are what the days either side of it usually need."
          items={okinawaDayToursPrep}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>South and Shuri</span>
          <h2 className={styles.sectionTitle}>What Do Southern Okinawa Tours and Shuri Castle Cover?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Southern day tours are the shorter option, built around Cape Chinen, the Nirai Kanai Bridge and
            Okinawa World&apos;s Gyokusendo Cave. A half-day southern bus with Sefa-Utaki also exists, and Klook
            lists a Shuri Castle and Okinawa World sightseeing-bus course on its Naha tour page. Shuri Castle is
            the one with a date on it: the rebuilt Seiden main hall opens to the public on{" "}
            <strong>23 November 2026</strong>, and the fees change the same day.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Shurijo Castle Park", "Until 22 Nov 2026", "From 23 Nov 2026"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shuriRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal" }}>{row.now}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal" }}>{row.from}</td>
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
                    {["Season", "Paid area", "Free area"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shuriHoursRows.map((row) => (
                    <tr key={row.when}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.paid}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.free}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off Shurijo Castle Park&apos;s own pages at oki-park.jp on {CHECKED}. Timed Seiden tickets for
            January 2027 onward go on sale at 13:00 on the first of the month, two months before your visit.
            Check that any tour includes this ticket before you assume you will get inside.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shuriCastlePeaceWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Shuri Castle walking tour →
            </KlookLink>
            <KlookLink href={nahaToursListUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              All Naha tours on Klook →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Car or tour</span>
          <h2 className={styles.sectionTitle}>Do You Need a Car in Okinawa?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Not for Naha, and not for one day out. The island has no rail network beyond the Yui Rail monorail,
            which runs 17 km over 19 stations from Naha Airport to Tedako-Uranishi in Urasoe, 37 minutes end to
            end. It stops well short of both tour routes, so past Urasoe your options are a tour, a bus or a
            car. The aquarium is about three hours from Naha Airport by express bus.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Day tour", "Rental car"].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {carRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.tour}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.car}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Monorail figures read off yui-rail.co.jp on {CHECKED}; drive and bus times from the aquarium&apos;s
            access page, read on {CHURAUMI_READ}. Okinawa Prefecture itself describes land transport on the
            island as depending on road traffic.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nahaAirportCarRental.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Naha Airport car rentals →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Typhoons</span>
          <h2 className={styles.sectionTitle}>What Happens if a Typhoon Cancels Your Tour?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            If the operator cancels, you normally get a refund or a reschedule, though each listing sets its own
            terms. From June to September, book the tour for early in your stay so a cancelled day still has a
            second chance.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Question", `Answer (read ${CHECKED})`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {typhoonRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={okinawaChuraumiKouriFullDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tour with 24-hour free cancellation →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Children</span>
          <h2 className={styles.sectionTitle}>Can You Take Children on an Okinawa Day Tour?</h2>
          <p className={styles.bodyText}>
            Generally yes, though the north is a long day to spend on a coach. One northern listing says under-3s
            are free if you tell customer service in advance, and rules differ, so check before you book. If your
            children are small, the southern trip is the shorter day, and a car means you can stop when you need
            to. Churaumi admission is ¥710 for elementary and junior-high students and free under 6.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Rain</span>
          <h2 className={styles.sectionTitle}>What Should You Do in Okinawa When It Rains?</h2>
          <p className={styles.bodyText}>
            Choose the route with a roof. Churaumi Aquarium is indoors and Gyokusendo Cave is underground, so
            either route keeps its main stop. What rain costs you is the view from Cape Manzamo and the water at
            Kouri Island. One Okinawa listing states that cancelling because of bad weather is not
            refunded, so read your own listing&apos;s terms rather than expecting a refund.
          </p>
        </section>

        <KlookStayAreas
          heading="Where Should You Stay for Okinawa Day Tours?"
          intro="In Naha, near the monorail, because that is where pick-ups are and where the tours bring you back. A night by the aquarium only makes sense if you are driving."
          areas={okinawaChuraumiStayAreas}
        />

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
          heading="Okinawa Tours to Start With"
          intro="One for each kind of day: the north with the aquarium, the south for the coast and the cave, and Shuri Castle on foot."
          tours={[churaumiKouriNorthernDayTour, southernOkinawaDayTrip, shuriCastlePeaceWalkingTour]}
        />

        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/okinawa-churaumi-aquarium-tickets", title: "Okinawa Churaumi Aquarium Tickets 2026: Price, Hours, Access" },
              { href: "/guides/attractions/japan-14-day-itinerary", title: "Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day" },
              { href: "/guides/attractions/japan-10-day-itinerary", title: "Japan 10 Day Itinerary (2026): 10 Days in Japan, Day by Day" },
              { href: "/guides/attractions", title: "More Things to Do in Japan →" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18l6-13 5 8 3-4 4 9z" />
                    <line x1="2" y1="21" x2="22" y2="21" />
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
            <h2 className={styles.ctaBannerTitle}>Pick your route, then your language</h2>
            <p className={styles.ctaBannerDesc}>
              North for the aquarium, south for the shorter day. Check the guide&apos;s language and the cancellation
              terms on the listing before you book.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={okinawaToursListUrl} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Okinawa Day Tours on Klook →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
