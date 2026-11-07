import Head from "next/head";
import Link from "next/link";
import KlookLink from "../../../components/KlookLink";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  bieiFuranoLavenderDayTour,
  bieiWinterBluePondShirahigeTour,
  furanoBieiBluePondDayTour,
  furanoBieiIlluminationTour,
  furanoBieiTripPrep,
  furanoBieiWinterDayTour,
  sapporoBluePondOrZooRouteTour,
  sapporoFuranoAreaPass,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

/**
 * Furano and Biei as a day out of Sapporo. Added 7 Nov 2026, so that it is live before
 * the winter tours start to sell.
 *
 * Read on 7 November 2026:
 *
 *   biei-hokkaido.jp/ja/27188      2026-27 light-up: Blue Pond and Birke no Mori 22 Oct
 *                                  2026 to 21 Apr 2027, monthly start times, to 21:00;
 *                                  Shirahige Falls all year from sunset; parking ¥1,000
 *   biei-hokkaido.jp               Blue Pond page: snow hides the blue, 20 min from JR
 *                                  Biei by car or Dohoku Bus; Shikisai-no-oka winter page
 *   princehotels.com, .co.jp       Ningle Terrace closed 5 to 26 Nov 2026, reopens 27 Nov
 *                                  at noon; winter 12:00-20:45, summer 11:00-19:45
 *   jrhokkaido.co.jp               Furano model route: lavender timing; regular fares
 *                                  (read 3 Nov); 2025 winter Furano Line notice; timetable
 *                                  notice of 29 May 2026 for June to September
 *   furanotourism.com              lavender FAQ, snow clothing guide
 *
 * Gaps left open on purpose: no winter 2026-27 Furano Line timetable or crowding notice
 * could be found, so the page says those figures are last winter's or this summer's.
 * Klook rows come from the www.klook.com search index because Klook answers automated
 * reads with HTTP 403. No Klook price appears. Activity 130175 is out because no en-US
 * form was indexed.
 */

const OWN = checkedLabel("2026-11-07");
const RAIL_FARES = checkedLabel("2026-11-03");

const seasonRows = [
  {
    stop: "Shirogane Blue Pond",
    winter: "Snow covers the water, so you see lit trees and snow rather than blue. Light-up 22 Oct 2026 to 21 Apr 2027",
    summer: "The blue water, by day",
    source: "biei-hokkaido.jp",
  },
  {
    stop: "Shirahige Falls",
    winter: "Lit from sunset to 21:00",
    summer: "Lit from sunset to 21:00 as well: the falls are lit all year",
    source: "biei-hokkaido.jp",
  },
  {
    stop: "Ningle Terrace",
    winter: "12:00 to 20:45. Closed 5 to 26 Nov 2026, reopens 27 Nov at noon",
    summer: "11:00 to 19:45, or 10:00 to 20:45 in July and August",
    source: "princehotels.co.jp, princehotels.com",
  },
  {
    stop: "Shikisai-no-oka",
    winter: "Snow activities including snowmobiles. 9:10 to 16:30 in Nov and Dec, 9:10 to 17:00 from Jan to Apr. Closed 31 Dec and 1 Jan",
    summer: "The flower hills. Entry is free from October to June, so check the fee for July to September",
    source: "biei-hokkaido.jp",
  },
  {
    stop: "Lavender farms, Furano",
    winter: "No lavender",
    summer: "Lavender from late June, peak in mid-July, late fields to early August. Farm Tomita is open 9:30 to 16:30",
    source: "jrhokkaido.co.jp, farm-tomita.co.jp",
  },
];

const lightRows = [
  { month: "October and November", on: "17:00 to 21:00" },
  { month: "December", on: "16:30 to 21:00" },
  { month: "January", on: "17:00 to 21:00" },
  { month: "February", on: "17:30 to 21:00" },
  { month: "March", on: "18:00 to 21:00" },
  { month: "April, to the 21st", on: "18:30 to 21:00" },
];

const tourRows = [
  {
    tour: furanoBieiIlluminationTour,
    name: "Ningle Terrace, Blue Pond & Shirahige Falls illumination",
    from: "Sapporo",
    time: "10 hours 10 minutes",
    season: "Winter",
    stops: "Ningle Terrace, Blue Pond, Shirahige Falls",
    lunch: "Not included. Choose Biei Station's front area or snow play at Shikisai-no-oka",
  },
  {
    tour: bieiWinterBluePondShirahigeTour,
    name: "Winter Blue Pond & Shirahige Falls light-up",
    from: "Sapporo, 08:55",
    time: "About 11.6 hours, back around 20:30",
    season: "Winter",
    stops: "Blue Pond, Shirahige Falls, Christmas Tree, White Birch Forest, Ningle Terrace",
    lunch: "A Furano lunch is on the route. Read whether your package includes it",
  },
  {
    tour: furanoBieiWinterDayTour,
    name: "Furano & Biei winter day tour",
    from: "Central Sapporo, round trip",
    time: "About 10 hours",
    season: "Winter",
    stops: "Christmas Tree, Shikisai-no-oka, Shirahige Falls, Ningle Terrace. No Blue Pond named",
    lunch: "Corn chowder included. Snow activities are paid on site",
  },
  {
    tour: sapporoBluePondOrZooRouteTour,
    name: "Blue Pond light-up or Asahiyama Zoo route",
    from: "Sapporo, late departure on the light-up route",
    time: "1 day. Hours by route are not shown",
    season: "Check by date",
    stops: "Blue Pond and Ningle Terrace, or Asahiyama Zoo and Ningle Terrace",
    lunch: "Read the listing",
  },
  {
    tour: furanoBieiBluePondDayTour,
    name: "Blue Pond & Shikisai-no-oka day trip",
    from: "Sapporo",
    time: "About 10 hours",
    season: "Check by date",
    stops: "Blue Pond, Shikisai-no-oka, lavender pillow workshop",
    lunch: "Depends on the package. Buffet is an option",
  },
  {
    tour: bieiFuranoLavenderDayTour,
    name: "Biei & Furano lavender day tour",
    from: "Sapporo",
    time: "11 hours",
    season: "Lavender season",
    stops: "Lavender, cheese factory",
    lunch: "The listing describes a Furano wagyu beef stew lunch",
  },
];

const trainRows = [
  {
    route: "Sapporo → Asahikawa, Ltd. Exp. Lilac or Kamui",
    time: "1 hour 25 minutes",
    fare: "¥5,440 with reserved seat",
    note: "All seats reserved since JR Hokkaido's change announced in Nov 2025",
    source: `jrhokkaido.co.jp, ${RAIL_FARES}`,
  },
  {
    route: "Asahikawa → Biei, Furano Line local",
    time: "About 35 minutes",
    fare: "¥680",
    note: "8 trains left Asahikawa between 9:00 and 16:59 on the timetable for June to September 2026",
    source: `jrhokkaido.co.jp, ${OWN}`,
  },
  {
    route: "Asahikawa → Furano, Furano Line local",
    time: "About 1 hour 20 minutes",
    fare: "¥1,380",
    note: "Not every local continues past Biei. Check before you board",
    source: `jrhokkaido.co.jp, ${OWN}`,
  },
  {
    route: "JR Biei Station → Blue Pond, Dohoku Bus",
    time: "About 20 minutes",
    fare: "See Dohoku Bus. A 1-day pass for the area is sold there",
    note: "The same 20 minutes by car",
    source: `biei-hokkaido.jp, ${OWN}`,
  },
  {
    route: "Sapporo → Furano, Furano Lavender Express",
    time: "2 hours",
    fare: "¥5,440 with reserved seat",
    note: "Seasonal, so not a winter option",
    source: `jrhokkaido.co.jp, ${RAIL_FARES}`,
  },
];

const faqItems = [
  {
    q: "Is a Furano Biei tour worth it in winter?",
    a: `Yes, if you want snow scenery and light-ups without driving on snow. No, if you want blue water, because snow covers the Blue Pond in winter. The Blue Pond light-up runs from 22 October 2026 to 21 April 2027, Shirahige Falls is lit all year, and Ningle Terrace is open from noon to 20:45 in winter. Read ${OWN}.`,
  },
  {
    q: "How long is a Furano Biei day tour from Sapporo?",
    a: "About 10 to 11.6 hours on the Klook listings we read. One winter tour runs from 08:55 to around 20:30. One listing gives the drive to Furano as about 2.5 hours each way, so expect at least 5 hours on the coach. Snow can make the return later.",
  },
  {
    q: "Can you see the Blue Pond in winter?",
    a: `You can visit, but you will not see the blue. Biei's tourism association says snow covers the water, which is why the pond is lit in winter. Lights run from 22 October 2026 to 21 April 2027, starting between 16:30 and 18:30 by month and ending at 21:00. They can be cancelled in bad weather. Read ${OWN}.`,
  },
  {
    q: "Should I take a tour or the train to Biei?",
    a: `For one day with both Biei and Furano, take a tour. The train to Biei is workable: 1 hour 25 minutes to Asahikawa, then about 35 minutes on the local, for ¥6,120 each way. But you still need a bus to the Blue Pond, and the stops are spread out. Take the train if you are staying a night inland. Fares read ${RAIL_FARES}.`,
  },
  {
    q: "When is lavender season in Furano?",
    a: `Lavender starts in late June and peaks in mid-July, according to JR Hokkaido. Late fields last to early August, but some farms start cutting back in August. The Furano Tourism Association's FAQ names mid to late July as the best time. Check its bloom status page before you book. Read ${OWN}.`,
  },
  {
    q: "Is Ningle Terrace open in November?",
    a: `Not for most of it in 2026. Shin Furano Prince Hotel's notice closes Ningle Terrace from 5 to 26 November and reopens it on 27 November at noon. One Klook tour replaces it with a Furano cheese factory during the closure. Individual shops also have irregular closing days. Read ${OWN}.`,
  },
  {
    q: "What should I wear on a winter Furano Biei tour?",
    a: "Layers, a windproof insulated jacket, insulated trousers, a hat and gloves, plus snow boots at ankle height or higher. Furano's tourism association says the inland area can reach minus 30°C, and Biei's snow tour pages say sneakers and jeans are not suitable.",
  },
  {
    q: "Can you do this tour with children?",
    a: "Yes, but plan for 10 hours or more, mostly on a coach, and a return after dark on winter light-up tours. We could not read the age bands on every listing, so check them before you pay. A tour with snow play at Shikisai-no-oka gives children more to do than a light-up tour.",
  },
];

const TITLE = "Furano Biei Tour from Sapporo (2026): Winter vs Summer";
const H1_LINE = "Furano Biei Tour from Sapporo (2026):";
const DESCRIPTION =
  "Furano Biei Tour guide: a Furano Biei day tour from Sapporo takes about 10 to 11.6 hours. Compare winter light-ups, summer lavender, tours and the train.";

const ROUTE = "/guides/attractions/furano-biei-tour";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const relatedGuides = [
  { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "Hokkaido 7 Day Itinerary: 7 Days in Hokkaido, Day by Day" },
  { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary: 12 Days, Day by Day (2027)" },
  { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "Otaru Day Trip from Sapporo (2027): ¥800, 33 Min by JR" },
  { href: "/guides/attractions/sapporo-snow-festival-tours", title: "Sapporo Snow Festival Tours (2027): 4–11 Feb, Free Sites" },
  { href: "/guides/transport/hokkaido-rail-pass", title: "Hokkaido Rail Pass (2026): Price and Is It Worth It?" },
  { href: "/guides/attractions/niseko-ski-tours", title: "Niseko Ski Tours (2027): Transfers, Lessons & 4 Areas" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function FuranoBieiTourPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Furano Biei Tour", item: URL },
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
          <span className={styles.breadCurrent}>Furano Biei Tour</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            {H1_LINE}<br />Winter Light-Ups or Summer Lavender
          </h1>
          <p className={styles.heroSubtitle}>
            The same two towns make two different days. Choose the season first, then the tour.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official dates, checked", "Six tours compared", "Tour or train"].map((t) => (
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

        {/* Lead paragraph: the whole answer, in the body rather than the hero. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            A <strong>Furano Biei Tour</strong> from Sapporo is a coach day of{" "}
            <strong>about 10 to 11.6 hours</strong> on Klook&apos;s listings, with a drive of about 2.5 hours each
            way. From December to March it covers the Blue Pond light-up, Shirahige Falls and Ningle Terrace. In
            summer it covers the lavender farms and the Shikisai-no-oka flower hills. Snow hides the Blue
            Pond&apos;s colour in winter, so book for blue water outside the snow season. Read {OWN} from Klook,
            Biei&apos;s tourism association and JR Hokkaido.
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
                <p className={styles.verdictStatLabel}>Tour day from Sapporo</p>
                <p className={styles.verdictStatValue}>About 10 to 11.6 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Blue Pond light-up</p>
                <p className={styles.verdictStatValue}>22 Oct 2026 to 21 Apr 2027</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Ningle Terrace</p>
                <p className={styles.verdictStatValue}>Reopens 27 Nov 2026</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Lavender peak</p>
                <p className={styles.verdictStatValue}>Mid-July</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> in winter, start with the illumination tour. Choose the winter day tour
              for snow play, and the Blue Pond day trip or the lavender tour in summer.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={furanoBieiIlluminationTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Winter Illumination Tour →
              </KlookLink>
              <KlookLink href={furanoBieiBluePondDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Blue Pond &amp; Flower Hills Tour →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Season */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Season</span>
          <h2 className={styles.sectionTitle}>What Do You See on a Furano Biei Tour in Winter and Summer?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            In winter you are paying for snow scenery and lights. In summer you are paying for colour: flowers
            and blue water. Check the dates below against the listing, because tours change stops by season.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Stop", "Winter", "Summer", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row.stop}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.stop}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.winter}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.summer}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}, {OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Shop hours at Ningle Terrace vary, and shops have irregular closing days. Weather or road conditions
            can also close it. The Shin Furano Prince Hotel notice is subject to change.
          </p>
        </section>

        {/* Winter worth it */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Winter</span>
          <h2 className={styles.sectionTitle}>Is a Furano Biei Tour Worth It in Winter?</h2>
          <p className={styles.bodyText}>
            Yes, if snow and light-ups are what you came for, and you would rather not drive on snow. Note the
            late finish: one tour returns around 20:30, and winter tours warn that snow, road closures or traffic
            can make the return later. November is the weak month this year, because Ningle Terrace is closed
            until the 26th. One tour replaces it with a Furano cheese factory, and with Furano Winery on 10 to 12
            November.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={furanoBieiIlluminationTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Illumination tour →
            </KlookLink>
            <KlookLink href={bieiWinterBluePondShirahigeTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Blue Pond light-up tour →
            </KlookLink>
          </div>
        </section>

        {/* Blue Pond */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Blue Pond</span>
          <h2 className={styles.sectionTitle}>Can You See the Blue Pond in Winter?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            You can visit it, but you will not see the blue. Biei&apos;s tourism association says snow covers the
            water, and the light-up is there so the site can still be enjoyed. Do not walk onto the pond. The
            lights can be cancelled in bad weather, and the town posts any notice on its website.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Month", "Blue Pond lights, 2026-27", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lightRows.map((row) => (
                    <tr key={row.month}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.month}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.on}</td>
                      <td style={{ fontSize: "0.82rem" }}>biei-hokkaido.jp, {OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Driving yourself? The car park next to the pond costs ¥1,000 for a standard car on the
            association&apos;s notice of 21 October 2026.
          </p>
        </section>

        {/* Tours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare tours</span>
          <h2 className={styles.sectionTitle}>Which Furano Biei Tour Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For a winter light-up, pick the illumination tour or the longer Blue Pond tour. For snow play with
            children, pick the winter day tour. It does not name the Blue Pond. From June to August, pick by
            whether you want the Blue Pond or the lavender farms first.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tour", "Leaves from", "Length", "Season", "Stops", "Lunch and extras", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>
                        <KlookLink href={row.tour.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                          {row.name}
                        </KlookLink>
                      </td>
                      <td style={{ fontSize: "0.86rem" }}>{row.from}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.season}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.stops}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.lunch}</td>
                      <td style={{ fontSize: "0.82rem" }}>{OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook blocks automated reads of its product pages, so these rows come from the listings as they
            appear in search results, and we could not read every field. Stops can change with the date, so open
            the listing for the current price, the meeting point and what your package includes.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={furanoBieiWinterDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Winter day tour with snow play →
            </KlookLink>
            <KlookLink href={sapporoBluePondOrZooRouteTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Blue Pond or Asahiyama Zoo route →
            </KlookLink>
            <KlookLink href={bieiFuranoLavenderDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Lavender day tour →
            </KlookLink>
          </div>
        </section>

        {/* Length */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The day</span>
          <h2 className={styles.sectionTitle}>How Long Is a Furano Biei Day Tour From Sapporo?</h2>
          <p className={styles.bodyText}>
            About 10 to 11.6 hours on the listings we read. One gives the drive to Furano as about 2.5 hours
            each way, so at least 5 hours of the day is on the coach. A late start suits the light-up routes,
            because the Blue Pond lights do not come on until 16:30 to 18:30 depending on the month.
          </p>
        </section>

        {/* Tour or train */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tour or train</span>
          <h2 className={styles.sectionTitle}>Should I Take a Tour or the Train to Biei?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For one day that covers both towns, take the tour. By train you change at Asahikawa, then need a bus
            for the Blue Pond, and the sights are spread out. The train suits a night inland, or a trip that
            stops in Asahikawa anyway.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Time", "Fare", "Good to know", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trainRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Going by train in winter?</strong> Trains are few, at about one an hour by day on the summer timetable, and we could not find a Furano Line
            timetable for this winter, so check JR Hokkaido&apos;s before you plan. The Furano Lavender Express is
            a summer train, and the Norokko sightseeing train made its last run in September 2026. JR
            Hokkaido says Biei-bound locals are usually one car. Last winter it reported crowding on evening
            trains from Biei, and added a train and extra cars through February.
          </p>
          <p className={styles.bodyText}>
            On the Furano Line between Asahikawa and Furano you cannot use Kitaca or other IC cards. Last
            winter&apos;s notice says fares on board are cash only, with no ¥5,000 or ¥10,000 notes and no change
            for them. A return from Sapporo to Biei comes to ¥12,240, so the ¥11,000 Sapporo-Furano Area Pass
            pays for itself on one return trip.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={sapporoFuranoAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Sapporo-Furano Area Pass →
            </KlookLink>
            <KlookLink href={furanoBieiIlluminationTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Or take the tour →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Times for the locals come from JR Hokkaido&apos;s notice for June to September 2026, read {OWN}. Winter
            times can differ. Regular fares and the pass price were read {RAIL_FARES}.
          </p>
        </section>

        {/* Lavender */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Summer</span>
          <h2 className={styles.sectionTitle}>When Is Lavender Season in Furano?</h2>
          <p className={styles.bodyText}>
            Late June to early August, with the peak in mid-July. That is JR Hokkaido&apos;s summary, and the Furano
            Tourism Association&apos;s FAQ names mid to late July as the best time. Some farms start cutting back in
            August, so do not leave it late. Bloom dates move with the weather, so check the association&apos;s bloom
            status page before you pay. Read {OWN}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={bieiFuranoLavenderDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Biei &amp; Furano lavender tour →
            </KlookLink>
            <KlookLink href={furanoBieiBluePondDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Blue Pond &amp; Shikisai-no-oka →
            </KlookLink>
          </div>
        </section>

        {/* Clothing */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Packing</span>
          <h2 className={styles.sectionTitle}>What Should You Wear on a Winter Furano Biei Tour?</h2>
          <p className={styles.bodyText}>
            Dress for standing outside after dark. Furano&apos;s tourism association recommends thermal base
            layers, a fleece, insulated trousers, winter socks, a windproof insulated jacket and a hat, and says
            the inland area can reach minus 30°C. Biei&apos;s snow tour pages recommend snow boots at ankle height or
            higher, and say sneakers are not suitable and jeans get wet and cold. Klook&apos;s winter listing asks
            for warm, non-slip shoes.
          </p>
        </section>

        {/* Children */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Families</span>
          <h2 className={styles.sectionTitle}>Can You Do a Furano Biei Tour With Children?</h2>
          <p className={styles.bodyText}>
            Yes, if they cope with 10 hours or more, mostly on a coach. We could not read the age bands on every
            listing, so check them before you pay. For younger children, a route with Shikisai-no-oka gives them
            snow to play in, while a light-up tour means a late return in the cold. Shikisai-no-oka&apos;s snow
            activities are paid on site.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>When Should You Book a Furano Biei Tour?</h2>
          <p className={styles.bodyText}>
            Book once your Sapporo dates are fixed, and pick the date first, because stops change by season. We
            cannot give a sell-out date, as availability is per tour and per day. Tours can also miss a minimum:
            one needs 12 people, and if it falls short you can move to another date or take a full refund. We
            could not read every cancellation policy, so read yours before you pay. Terms read {OWN}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={furanoBieiIlluminationTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check your date on Klook →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Before you go"
          heading="What Should You Book Around a Furano Biei Tour?"
          intro="Your tour starts and ends in Sapporo, so the hotel matters as much as the tour. Open a listing for the price on your dates."
          items={furanoBieiTripPrep}
        />

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
          heading="Furano and Biei Tours on Klook"
          intro="The four listings most readers will choose between. Open one for the current price, the meeting point and the package options on your date."
          tours={[
            furanoBieiIlluminationTour,
            bieiWinterBluePondShirahigeTour,
            furanoBieiWinterDayTour,
            furanoBieiBluePondDayTour,
          ]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {relatedGuides.map((guide) => (
              <Link key={guide.href} href={guide.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                    <path d="M9 21v-6h6v6" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{guide.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Snow and lights, or lavender and blue water</h2>
            <p className={styles.ctaBannerDesc}>
              A tour covers Furano and Biei from Sapporo in about 10 to 11.6 hours, with no changes to plan.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={furanoBieiIlluminationTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Winter Tour →
              </KlookLink>
              <KlookLink href={furanoBieiBluePondDayTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Summer Tour →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
