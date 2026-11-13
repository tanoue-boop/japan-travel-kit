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
  jrKansaiWideAreaPass,
  kinosakiAkaishiyaKlook,
  kinosakiCrabLunchDayTour,
  kinosakiHamasakaDayTour,
  kinosakiHotels,
  kinosakiOyadoHakusanKlook,
  kinosakiStayAreas,
  kinosakiTripPrep,
  klookEsim,
  konotoriTrainKlook,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Kinosaki Onsen as a day trip or one night out of Osaka. Added 13 Nov 2026
 * (task-jtk-20261113-02).
 *
 * Next to its neighbour: arima-onsen-day-trip is the hour-away onsen inside Kobe;
 * this page is the Sea of Japan side — the walk between public baths (soto-yu) and
 * the winter crab season — which is 2h40m away and often better as a night.
 *
 * Official reads on 13 Nov 2026:
 *   kinosaki-spa.gr.jp/access/       Osaka → Konotori → Kinosaki Onsen about 2h40m;
 *                                    Kyoto → Ltd. Exp. Kinosaki about 2h20m
 *   timetable.jr-odekake.net         Konotori 3: Osaka 9:10 → Kinosaki Onsen 11:52, daily
 *   jr-odekake.net (Kinosaki train)  Konotori / Kinosaki: ordinary cars all reserved
 *   zentanbus.co.jp                  Osaka (Hankyu Sanbangai) → Kinosaki Onsen Stn ¥4,100
 *     /highway_express_bus/          adult, child half, 7-day return 10% off; 7:20, 9:20,
 *     kinosaki-osaka/                13:20, 18:20 departures; back 12:00, 15:40, 17:40;
 *                                    some runs suspended (driver shortage); detour for
 *                                    road works 9–20 Nov
 *   kinosaki-spa.gr.jp/about/spa/    Six soto-yu, ¥800 adult / ¥400 child each, last entry
 *                                    30 min before closing; Yumepa day pass ¥1,500 / ¥750
 *   visitkinosaki.com                Satono-yu closed for rebuilding since 1 Apr 2024;
 *                                    Kono-yu renovation 11 May – 30 Oct 2026; tattoos of any
 *                                    size allowed at all public baths; most inns give a free
 *                                    bath pass valid to 13:00 on check-out day
 *   web.pref.hyogo.lg.jp             Snow crab fishing opens 6 November (2025 notice)
 *   kinosaki-spa.gr.jp/kani-kingdom/ Crab season in town from early November to end of March
 *   kinosaki-ropeway.jp              ¥1,200 / ¥600 return, 7 min; closed 2nd & 4th Thu;
 *                                    winter last trip up 16:30 (1 Nov 2026 – 31 Jan 2027)
 *   westjr.co.jp (Kansai WIDE)       ¥12,000 / ¥6,000 for 5 days, Kinosaki Onsen named,
 *                                    Konotori reserved seats included; Kansai Area Pass
 *                                    excludes limited expresses other than HARUKA
 *
 * Not printed: the JR base fare and limited-express charge (JR West's fare search is
 * dynamic and could not be read as text), the number of ryokan, any Klook price.
 */

const ROUTE = "/guides/attractions/kinosaki-onsen-day-trip";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-13");

const YUMEPA = "¥1,500";
const SINGLE = "¥800";
const BUS = "¥4,100";
const WIDE = "¥12,000";

/** Table 1: getting there — first row is the answer. */
const accessRows = [
  {
    route: "Osaka → Kinosaki Onsen, JR Limited Express Konotori",
    time: "About 2h40m (e.g. Osaka 9:10 → 11:52)",
    fare: "JR fare + limited express charge; all seats reserved",
    note: "The fastest and simplest from Osaka. Covered by the Kansai WIDE Area Pass",
    source: "kinosaki-spa.gr.jp; JR West timetable",
  },
  {
    route: "Kyoto → Kinosaki Onsen, JR Limited Express Kinosaki",
    time: "About 2h20m",
    fare: "JR fare + limited express charge; all seats reserved",
    note: "Direct from Kyoto Station",
    source: "kinosaki-spa.gr.jp; jr-odekake.net",
  },
  {
    route: "Osaka (Hankyu Sanbangai) → Kinosaki Onsen Stn, Zentan highway bus",
    time: "3h04m–3h27m (7:20, 9:20, 13:20, 18:20)",
    fare: `${BUS} adult one way, child half; return within 7 days 10% off`,
    note: "Seat reservation required. Back at 12:00, 15:40, 17:40. Some runs suspended",
    source: "zentanbus.co.jp",
  },
  {
    route: "Kobe (Sannomiya) → Kinosaki Onsen Stn, Zentan highway bus",
    time: "See the timetable",
    fare: "¥3,550 adult one way",
    note: "Seat reservation required",
    source: "zentanbus.co.jp",
  },
];

/** Table 2: the public baths. */
const bathRows = [
  { bath: "Yumepa day pass (all open soto-yu)", hours: "Each bath's own hours", closed: "—", price: `${YUMEPA} adult, ¥750 child — unlimited entry for the day`, note: "Sold at every bath's counter. The best buy if you visit two or more" },
  { bath: "Ichino-yu", hours: "7:00–23:00", closed: "Wednesday", price: `${SINGLE} / ¥400`, note: "Cave bath; family bath suspended" },
  { bath: "Goshono-yu", hours: "7:00–23:00", closed: "Thursday", price: `${SINGLE} / ¥400`, note: "" },
  { bath: "Jizo-yu", hours: "7:00–23:00", closed: "Monday", price: `${SINGLE} / ¥400`, note: "Closest to the station; family bath suspended" },
  { bath: "Mandara-yu", hours: "15:00–23:00", closed: "Wednesday", price: `${SINGLE} / ¥400`, note: "Afternoon opening" },
  { bath: "Yanagi-yu", hours: "15:00–23:00", closed: "Thursday", price: `${SINGLE} / ¥400`, note: "Afternoon opening" },
  { bath: "Kono-yu", hours: "7:00–23:00", closed: "Tuesday", price: `${SINGLE} / ¥400`, note: "Renovation was scheduled 11 May – 30 Oct 2026; check it has reopened" },
  { bath: "Satono-yu", hours: "—", closed: "Closed for rebuilding", price: "—", note: "Shut since 1 April 2024; no reopening date published" },
];

/** Table 3: day trip vs one night. */
const compareRows = [
  {
    option: "One night in a ryokan",
    time: "Arrive early afternoon, leave next day",
    baths: "Evening and morning baths; most inns give a free bath pass to 13:00 on check-out day",
    food: "Crab dinner at the inn in season (early Nov – end of March)",
    book: "Ryokan first, then the Konotori seats",
  },
  {
    option: "Day trip by train",
    time: "About 5h20m of travel; roughly 5 hours in town",
    baths: `Two or three baths on the ${YUMEPA} Yumepa`,
    food: "Crab lunch in town",
    book: "Konotori seats both ways",
  },
  {
    option: "Day trip by tour",
    time: "About 10h45m–11h15m door to door, as listed",
    baths: "Free time in town; bath entry paid separately on the crab-lunch listing",
    food: "Lunch included (crab course or seafood set, by listing)",
    book: "The tour only",
  },
];

const faqItems = [
  {
    q: "Can I do Kinosaki Onsen as a day trip from Osaka?",
    a: `Yes. The Konotori takes about 2 hours 40 minutes each way, so a day trip gives roughly five hours in town — enough for two or three baths on the ${YUMEPA} Yumepa pass and lunch. Join-in coach tours from Osaka are listed at 10h45m to 11h15m. Read on official sites ${OWN}.`,
  },
  {
    q: "How do I get to Kinosaki Onsen from Osaka?",
    a: `By JR Limited Express Konotori from Osaka Station, about 2h40m, all seats reserved (e.g. 9:10 → 11:52). The Zentan highway bus from Hankyu Sanbangai takes 3 to 3½ hours for ${BUS} one way and needs a reservation. From Kyoto, the Limited Express Kinosaki takes about 2h20m.`,
  },
  {
    q: "How much is the Kinosaki Onsen bath pass?",
    a: `The Yumepa one-day pass is ${YUMEPA} for adults and ¥750 for children, with unlimited entry to the open public baths for the day. A single entry is ${SINGLE} (¥400 child). Most ryokan give their guests a free pass at check-in. Read on kinosaki-spa.gr.jp ${OWN}.`,
  },
  {
    q: "Are tattoos allowed at Kinosaki Onsen?",
    a: "Yes at the public baths. Kinosaki's official visitor site says all seven public hot springs allow tattoos of any size with no need to cover them. Baths inside ryokan and hotels may have their own rules, so ask the inn.",
  },
  {
    q: "Are all seven baths open?",
    a: "No. Satono-yu has been closed for rebuilding since 1 April 2024. Kono-yu had renovation works scheduled from 11 May to 30 October 2026, so check it has reopened before you plan around it. Each bath also has one weekly closing day.",
  },
  {
    q: "When is crab season in Kinosaki?",
    a: "Snow crab fishing on Hyogo's Sea of Japan coast opens on 6 November, and the Kinosaki tourism association describes the crab season in town as running from early November to the end of March. Crab dinners at ryokan are booked with the room.",
  },
  {
    q: "Does the JR Kansai Area Pass cover Kinosaki Onsen?",
    a: `Not the Konotori: the Kansai Area Pass cannot be used on limited expresses other than the HARUKA. The Kansai WIDE Area Pass (${WIDE} for 5 days) names Kinosaki Onsen as an excursion and includes Konotori reserved seats.`,
  },
  {
    q: "Should I stay overnight in Kinosaki?",
    a: "If you can, yes. Most baths are open until 23:00, so the evening is when you can walk between them, and most inns include the bath pass until 13:00 the next day. A night also removes the 5-plus hours of round-trip travel from one day.",
  },
];

const TITLE = "Kinosaki Onsen Day Trip: From Osaka, Bath Pass & Ryokan";
const DESCRIPTION =
  "Kinosaki Onsen day trip: Kinosaki Onsen from Osaka is about 2h40m by Konotori, the bath pass is ¥1,500, and when a Kinosaki Onsen ryokan night is worth it.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const thStyle = { fontSize: "0.88rem" } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

export default function KinosakiOnsenDayTripPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Kinosaki Onsen Day Trip", item: URL },
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
          <span className={styles.breadCurrent}>Kinosaki Onsen Day Trip</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kinosaki Onsen Day Trip (2026):<br />Kinosaki Onsen From Osaka, Bath Pass and Ryokan
          </h1>
          <p className={styles.heroSubtitle}>
            The Sea of Japan onsen town where you walk from one public bath to the next — and, from November,
            eat snow crab. Far enough from Osaka that the real question is day or night.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official bath hours & prices", "Train and bus times", "Day vs overnight"].map((t) => (
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
                <p className={styles.verdictStatLabel}>From Osaka</p>
                <p className={styles.verdictStatValue}>Konotori, about 2h40m</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Bath pass (Yumepa)</p>
                <p className={styles.verdictStatValue}>{YUMEPA} adult, one day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Crab season</p>
                <p className={styles.verdictStatValue}>From 6 Nov to end of March</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tattoos</p>
                <p className={styles.verdictStatValue}>Allowed at the public baths</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Kinosaki Onsen day trip</strong> from Osaka works: the JR Limited Express{" "}
              <strong>Konotori</strong> takes about <strong>2 hours 40 minutes</strong> from Osaka Station to Kinosaki
              Onsen, all seats reserved. In town, the <strong>Yumepa</strong> pass at <strong>{YUMEPA}</strong> gets you
              into all the open public baths (soto-yu) for the day; the town has seven, and one is closed for
              rebuilding. Winter is <strong>snow crab</strong> season — fishing opens on <strong>6 November</strong>,
              and the town&apos;s crab season runs to the end of March. With 5-plus hours on the train, one night in a
              ryokan is the better trip if you have it. Read on official sites {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kinosakiCrabLunchDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Kinosaki Crab-Lunch Day Tour →
              </KlookLink>
              <KlookLink href={kinosakiHotels.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Kinosaki Onsen Ryokan →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What to Book for Kinosaki Onsen"
          intro="The day tour or the ryokan, the train seat or a pass, and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={kinosakiTripPrep}
        />

        <EsimCtaTop />

        {/* Access */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to Kinosaki Onsen From Osaka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            By the JR Limited Express Konotori from Osaka Station, about 2h40m. Every seat is reserved, so book
            both ways. The Zentan highway bus is slower (3 to 3½ hours) at {BUS} one way. From Kyoto, the Limited
            Express Kinosaki takes about 2h20m.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Time", "Fare", "Notes", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={thStyle}>{row.route}</td>
                      <td style={thStyle}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://kinosaki-spa.gr.jp/access/" target="_blank" rel="noopener">kinosaki-spa.gr.jp/access/</a>,{" "}
            <a href="https://www.jr-odekake.net/railroad/train/kinosaki/" target="_blank" rel="noopener">jr-odekake.net</a>,{" "}
            <a href="https://www.zentanbus.co.jp/highway_express_bus/kinosaki-osaka/" target="_blank" rel="noopener">zentanbus.co.jp</a>.
            The JR fare is not printed: JR West&apos;s fare search could not be read as a fixed figure. Zentan notes
            some runs are suspended for a driver shortage, and buses detour for road works from 9 to 20 November 2026.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={konotoriTrainKlook.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Konotori tickets →
            </KlookLink>
            <KlookLink href={jrKansaiWideAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kansai WIDE Area Pass →
            </KlookLink>
          </div>
        </section>

        {/* Day trip */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day or night</span>
          <h2 className={styles.sectionTitle}>Can I Do Kinosaki Onsen as a Day Trip?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, with about five hours in town — enough for two or three baths and a crab lunch. Take a morning
            Konotori (for example Osaka 9:10, arriving 11:52) and a late-afternoon train back. Two of the baths
            only open at 15:00, so a day visitor sees the 7:00 openers first.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Time", "Baths", "Food", "What to book"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={thStyle}>{row.option}</td>
                      <td style={thStyle}>{row.time}</td>
                      <td style={thStyle}>{row.baths}</td>
                      <td style={thStyle}>{row.food}</td>
                      <td style={thStyle}>{row.book}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}: train times from kinosaki-spa.gr.jp and JR West; the bath pass rule for inn guests
            from <a href="https://visitkinosaki.com/plan/visitor-info/faq/" target="_blank" rel="noopener">visitkinosaki.com</a>;
            tour durations from the Klook listings. &ldquo;Time in town&rdquo; is a planning figure, not an official one.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Tour or train?</strong> The coach tours do the planning and include lunch, but they are long days
            and the town time is fixed. The crab-lunch listing notes a Japanese-speaking guide with translation-device
            support and bath entry paid on your own. Check the cancellation terms for snow before paying — the
            route crosses the mountains in winter.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kinosakiCrabLunchDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Crab-lunch day tour →
            </KlookLink>
            <KlookLink href={kinosakiHamasakaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Day tour with Hamasaka seafood →
            </KlookLink>
          </div>
        </section>

        {/* Baths */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The seven baths</span>
          <h2 className={styles.sectionTitle}>How Much Is the Kinosaki Onsen Bath Pass?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The Yumepa one-day pass is <strong>{YUMEPA}</strong> for adults and ¥750 for children, with unlimited
            entry to the open public baths that day; a single entry is {SINGLE}. Buy it at any bath&apos;s counter.
            Each bath closes one day a week, and last entry is 30 minutes before closing.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Bath", "Hours", "Closed", "Price (adult / child)", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bathRows.map((row) => (
                    <tr key={row.bath}>
                      <td className={styles.tdProvider} style={thStyle}>{row.bath}</td>
                      <td style={thStyle}>{row.hours}</td>
                      <td style={thStyle}>{row.closed}</td>
                      <td className={styles.tdPrice} style={thStyle}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://kinosaki-spa.gr.jp/about/spa/" target="_blank" rel="noopener">kinosaki-spa.gr.jp/about/spa/</a>{" "}
            and{" "}
            <a href="https://visitkinosaki.com/about-kinosaki/the-7-mystic-onsen/" target="_blank" rel="noopener">visitkinosaki.com</a>.
            The two official sites define the child age band differently, so check it at the counter.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            Do Ryokan Guests Get the Bath Pass Free?
          </h3>
          <p className={styles.bodyText}>
            Usually. Kinosaki&apos;s official visitor site says most inns give guests a free pass at check-in, valid
            until 13:00 on the day of check-out — ask your inn, as not every one does.
          </p>
        </section>

        {/* Tattoos */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tattoos</span>
          <h2 className={styles.sectionTitle}>Are Tattoos Allowed at Kinosaki Onsen?</h2>
          <p className={styles.bodyText}>
            Yes at the public baths. Kinosaki&apos;s official visitor site says all seven public hot springs allow
            tattoos of all sizes, with no need to cover them. The baths inside ryokan and hotels may have different
            rules, so ask when you book. Read on{" "}
            <a href="https://visitkinosaki.com/plan/visitor-info/guides/tattoos-in-kinosaki-onsen/" target="_blank" rel="noopener">visitkinosaki.com</a>{" "}
            {OWN}. Compare{" "}
            <Link href="/guides/attractions/arima-onsen-day-trip">Arima Onsen</Link>, near Kobe, where the large day
            spa refuses tattoos.
          </p>
        </section>

        {/* Crab */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Winter</span>
          <h2 className={styles.sectionTitle}>When Is Crab Season in Kinosaki Onsen?</h2>
          <p className={styles.bodyText}>
            Snow crab (Matsuba-gani) fishing on Hyogo&apos;s Sea of Japan coast opens on <strong>6 November</strong>,
            per Hyogo Prefecture, and the Kinosaki tourism association describes the crab season in town as running
            from early November to the end of March. This is the busiest time for ryokan with crab dinners, so book
            the room first. JR West also sells a crab day-trip package from Osaka for 7 November 2026 to 31 March 2027.
            Read on{" "}
            <a href="https://web.pref.hyogo.lg.jp/ns01/20251031.html" target="_blank" rel="noopener">web.pref.hyogo.lg.jp</a>{" "}
            and{" "}
            <a href="https://kinosaki-spa.gr.jp/kani-kingdom/" target="_blank" rel="noopener">kinosaki-spa.gr.jp</a>, {OWN}.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            What Should I Wear in Kinosaki in Winter?
          </h3>
          <p className={styles.bodyText}>
            Warm layers you can take off quickly, and shoes you can slip on and off at each bath — you change
            in and out of them at every soto-yu you visit, and the walks between baths are outdoors.
          </p>
        </section>

        {/* Arima vs Kinosaki */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Which onsen</span>
          <h2 className={styles.sectionTitle}>Kinosaki or Arima Onsen From Osaka?</h2>
          <p className={styles.bodyText}>
            Arima is about an hour from Osaka by coach and fits in half a day; Kinosaki is 2h40m away on the Sea of
            Japan side, with the walk between public baths and the winter crab. Choose Arima for a short add-on to an
            Osaka or Kobe day, Kinosaki for a night. Our{" "}
            <Link href="/guides/attractions/arima-onsen-day-trip">Arima Onsen day trip guide</Link> has its baths
            and coaches, and the{" "}
            <Link href="/guides/attractions/himeji-castle-day-trip">Himeji Castle day trip</Link> is the other
            classic JR day west of Osaka.
          </p>
        </section>

        {/* Pass */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Rail pass</span>
          <h2 className={styles.sectionTitle}>Does the Kansai Area Pass Cover Kinosaki Onsen?</h2>
          <p className={styles.bodyText}>
            Not the train you need. JR West&apos;s Kansai Area Pass cannot be used on limited expresses other than
            the HARUKA, so the Konotori is out. The <strong>Kansai WIDE Area Pass</strong> ({WIDE} adult, ¥6,000
            child, 5 days) names Kinosaki Onsen as an excursion and includes reserved seats on the Konotori. It pays
            if Kinosaki is one of several long JR days in Kansai — Himeji by Sanyo Shinkansen, or Amanohashidate.
            Read on westjr.co.jp {OWN}. Our{" "}
            <Link href="/guides/attractions/kansai-area-pass">Kansai Area Pass guide</Link> has the sums.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrKansaiWideAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Kansai WIDE Area Pass →
            </KlookLink>
            <KlookLink href={konotoriTrainKlook.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Or book Konotori seats →
            </KlookLink>
          </div>
        </section>

        {/* Ryokan */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Which Kinosaki Onsen Ryokan Should I Book?</h2>
          <p className={styles.bodyText}>
            Any inn in the town puts the baths within a walk; the choices are the room, dinner and how far from the
            station you want to carry bags. In crab season, book the room as soon as your dates are fixed. Klook
            prices change by date, so open a listing for the figure on yours.
          </p>
        </section>

        <KlookStayAreas
          heading="Kinosaki Onsen Ryokan on Klook"
          intro="The town-wide hotel search, and two inns near the station."
          areas={kinosakiStayAreas}
        />

        {/* Other things */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>In town</span>
          <h2 className={styles.sectionTitle}>What Else Is There to Do in Kinosaki?</h2>
          <p className={styles.bodyText}>
            The Kinosaki Ropeway climbs to the summit of Mt. Daishi in about 7 minutes: ¥1,200 return for adults, ¥600
            for children. It runs at :10, :30 and :50 past the hour from 9:10, closes on the 2nd and 4th Thursday,
            and in winter (1 November 2026 – 31 January 2027) the last trip up is 16:30. Read on{" "}
            <a href="https://kinosaki-ropeway.jp/ropeway/" target="_blank" rel="noopener">kinosaki-ropeway.jp</a>, {OWN}.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Train seats, bath closing days and snow notices all reach you on your phone.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares the alternatives.
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
          heading="Kinosaki Tours and Ryokan on Klook"
          intro="Two join-in days from Osaka and two inns near the station. Durations, inclusions and room details are on each listing."
          tours={[kinosakiCrabLunchDayTour, kinosakiHamasakaDayTour, kinosakiAkaishiyaKlook, kinosakiOyadoHakusanKlook]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/arima-onsen-day-trip", title: "Arima Onsen Day Trip (2026): From Osaka or Kobe" },
              { href: "/guides/attractions/kansai-area-pass", title: "JR Kansai Area Pass 2026: Price, Coverage & Is It Worth It?" },
              { href: "/guides/attractions/himeji-castle-day-trip", title: "Himeji Castle Day Trip (2026)" },
              { href: "/guides/attractions/amanohashidate-ine-day-trip", title: "Amanohashidate Day Trip (2026): Ine Boathouses, Tours and Trains" },
              { href: "/guides/attractions/where-to-stay-in-osaka", title: "Where to Stay in Osaka 2026" },
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
            <h2 className={styles.ctaBannerTitle}>A day of baths, or a night of them</h2>
            <p className={styles.ctaBannerDesc}>
              Book the Konotori seats or a coach day for a day trip — or a ryokan, and the bath pass usually comes with it.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={kinosakiCrabLunchDayTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Day Tour →
              </KlookLink>
              <KlookLink href={kinosakiHotels.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Kinosaki Ryokan →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
