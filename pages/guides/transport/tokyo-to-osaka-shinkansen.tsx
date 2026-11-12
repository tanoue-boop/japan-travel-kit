import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import KlookLink from "../../../components/KlookLink";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import fares from "../../../data/jr-fares.json";
import {
  dotonboriDaytimeFoodTour,
  jrPassWholeJapan,
  klookEsim,
  osakaAmazingPass,
  shinkansenTokyoOsaka,
  tokyoOsakaArrivalPrep,
  tokyoOsakaArrivalStayAreas,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Tokyo to Osaka on the Tokaido Shinkansen, added 4 Nov 2026 and rebuilt 12 Nov 2026
 * (task jtk-20261112-R02) around the searches that land here: "shinkansen tokyo to
 * osaka", "price", "time", "bullet train" and "JR Pass worth it". This page owns the
 * Tokyo ⇄ Osaka fare, time and booking question; shinkansen-guide owns the system as a
 * whole, tokyo-to-kyoto the Kyoto leg with the bus comparison, and
 * kyoto-to-tokyo-shinkansen the trip back.
 *
 * Sources, each with the date it was checked:
 *  - jr-group.jp/hikari-ryokin/ (JR Group, "as of October 2026"), checked 12 Nov 2026:
 *    Tokyo–Shin-Osaka Hikari/Kodama ¥13,870 non-reserved, ¥14,400 reserved, ¥19,270
 *    Green; ±¥200 / +¥400 season rule for reserved; non-reserved the same all year;
 *    smartEX ¥200 off every reserved seat;
 *  - the JR Central / JR West release of 16 Oct 2026 (jr-central.co.jp/news/release/
 *    _pdf/000046069.pdf), re-checked 12 Nov 2026 through Impress Watch's report of it:
 *    Nozomi reserved ¥14,720 → ¥15,420 for tickets bought from 1 July 2027, Green
 *    ¥19,590 → ¥23,290 for boarding from 15 Dec 2027, non-reserved unchanged;
 *  - japanrailpass.net price page and special-ticket page, checked 12 Nov 2026: pass
 *    prices, ¥4,960 Tokyo–Shin-Osaka NOZOMI/MIZUHO ticket, where and when it is sold,
 *    and the seat types it covers;
 *  - railway.jr-central.co.jp/nozomi/, checked 12 Nov 2026: all-reserved Nozomi periods;
 *  - smart-ex.jp/en/product/plan/service/, checked 12 Nov 2026: on sale from 5:30 one
 *    year ahead, seats confirmed after 8:00 one month ahead, free changes to 4 minutes
 *    before departure within 3 months of purchase, ¥320 refund fee;
 *  - from 4 Nov 2026 and unchanged here: 2h21m and the Mt Fuji seat wording (JR Central
 *    Perfect Guide), up to 18 trains an hour (JR Central), "about 2h30 / 3 hours / 4
 *    hours" (JR Tokai Tours), the smartEX Green figures, the baggage rule, the 10 Nov
 *    sample-date train count and first/last train (Klook's rail page), the night-bus
 *    time (kosokubus.com, a booking site, labelled).
 *
 * data/jr-fares.json had 14720 for the Tokyo–Shin-Osaka Hikari reference fare, which is
 * the Nozomi figure; corrected to the JR Group's 14400 on 12 Nov 2026. No flight time,
 * bus fare or Klook price is printed.
 */

const OWN = checkedLabel("2026-11-12");
const EARLIER = checkedLabel("2026-11-04");

const tokyoOsaka = fares.segments.find((s) => s.id === "tokyo-shin-osaka")!;
const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;

const WINDOW_NOZOMI = "¥14,720";
const WINDOW_HIKARI = yen(tokyoOsaka.fareYen); // ¥14,400, JR Group, Oct 2026
const SMART_NOZOMI = "¥14,520";
const SMART_HIKARI = "¥14,200";
const NON_RESERVED = "¥13,870";
const NOZOMI_TICKET = "¥4,960";
const JR_PASS_ONLINE = "¥50,000";
const JR_PASS_ORDER = "¥53,000";

/** Only the periods still ahead on the date this page was checked. */
const nozomiAllReservedPeriods = [
  "21 – 23 November 2026",
  "25 December 2026 – 5 January 2027",
  "9 – 11 January 2027",
  "20 – 22 March 2027",
];

/** Table 1: the answer row first. */
const fareRows = [
  {
    train: "Nozomi (fastest)",
    time: "2h 21m fastest, about 2h 30m typical",
    nonReserved: NON_RESERVED,
    reserved: `${WINDOW_NOZOMI} (${SMART_NOZOMI} smartEX)`,
    green: "¥19,590 (¥19,390 smartEX)",
    pass: `No, needs the ${NOZOMI_TICKET} ticket`,
  },
  {
    train: "Hikari",
    time: "About 3 hours",
    nonReserved: NON_RESERVED,
    reserved: `${WINDOW_HIKARI} (${SMART_HIKARI} smartEX)`,
    green: "¥19,270 (¥19,070 smartEX)",
    pass: "Yes",
  },
  {
    train: "Kodama (all stops)",
    time: "About 4 hours",
    nonReserved: NON_RESERVED,
    reserved: `${WINDOW_HIKARI} (${SMART_HIKARI} smartEX)`,
    green: "¥19,270 (¥19,070 smartEX)",
    pass: "Yes",
  },
];

const frequencyRows = [
  {
    item: "Whole-line frequency",
    value: "Up to 18 trains an hour",
    detail: "About 383 trains a day across the Tokaido Shinkansen in FY2024, so a missed train is rarely a long wait",
    source: "global.jr-central.co.jp",
  },
  {
    item: "First and last train",
    value: "06:00 and 21:31",
    detail: "On Klook's sample date of 10 Nov 2026. Holiday timetables move the last trains, so check your own date",
    source: "klook.com rail page",
  },
  {
    item: "Direct trains on that date",
    value: "345",
    detail: "Tokyo to Osaka on the same sample date, with no transfer on any of them",
    source: "klook.com rail page",
  },
];

/** Table 2: the answer row first. */
const passRows = [
  {
    item: "One Tokyo–Osaka return",
    answer: "Buy tickets, not the pass",
    cost: `¥29,040 for two reserved Nozomi on smartEX, against ${JR_PASS_ONLINE} for the cheapest 7-day pass`,
  },
  {
    item: "7-day Ordinary JR Pass",
    answer: "Price since 1 October 2026",
    cost: `${JR_PASS_ONLINE} on the official website, ${JR_PASS_ORDER} as an Exchange Order from an overseas agency`,
  },
  {
    item: "Hikari and Kodama",
    answer: "Covered by the pass",
    cost: "No extra charge for reserved or non-reserved Ordinary seats",
  },
  {
    item: "Nozomi",
    answer: "Not covered on its own",
    cost: `${NOZOMI_TICKET} per ride, Tokyo–Shin-Osaka, for reserved, non-reserved or Green alike (Green only for Green pass holders)`,
  },
  {
    item: "Where the pass pays",
    answer: "Four or more long legs in 7 days",
    cost: "At smartEX prices it takes four Nozomi one-ways to pass ¥50,000, so add Hiroshima, Kanazawa or Tohoku",
  },
];

/** Table 3: the answer row first. */
const bookingRows = [
  {
    route: "smartEX (JR's own site or app) — the default",
    price: `${SMART_NOZOMI} Nozomi reserved, ¥200 off every reserved seat`,
    when: "From 5:30 one year before boarding to 4 minutes before departure. Seats are confirmed after 8:00 one month ahead",
    cancel: "Free changes, as often as you like, to 4 minutes before departure and within 3 months of purchase. Refunds cost ¥320",
  },
  {
    route: "Klook's Tokyo → Osaka rail page",
    price: "Shown by date at checkout",
    when: "Pick the date, train and seat class: non-reserved, reserved or Green Car",
    cancel: "Klook's own terms, shown before you pay",
  },
  {
    route: "Station machine or ticket office",
    price: `Window price: ${WINDOW_NOZOMI} Nozomi, ${WINDOW_HIKARI} Hikari reserved`,
    when: "On the day at Tokyo Station, or reserved seats from 10:00 one month before the train leaves its first station",
    cancel: `Ask at the ticket office. Also where a JR Pass holder buys the ${NOZOMI_TICKET} Nozomi ticket`,
  },
];

const altRows = [
  {
    option: "Shinkansen, non-reserved",
    time: "2h 21m to about 4h, by train",
    cost: `${NON_RESERVED}, the same on every day of the year`,
    verdict: "The cheapest shinkansen seat. No seat choice, no oversized-bag seats, and no Nozomi non-reserved cars in the peak periods.",
    source: `jr-group.jp, ${OWN}`,
  },
  {
    option: "Shinkansen, reserved on smartEX",
    time: "2h 21m fastest",
    cost: `${SMART_HIKARI} Hikari, ${SMART_NOZOMI} Nozomi`,
    verdict: "¥200 under the window price on every reserved seat. smartEX also sells limited-seat early-booking fares, priced on smart-ex.jp.",
    source: `jr-group.jp and smart-ex.jp, ${OWN}`,
  },
  {
    option: "Overnight highway bus",
    time: "About 8 to 9 hours",
    cost: "Varies by date, operator and seat; check the listing",
    verdict: "The lowest fares, and it saves a hotel night if you can sleep on a coach. A bad fit with large cases.",
    source: `kosokubus.com, a booking site rather than an operator, ${EARLIER}`,
  },
  {
    option: "Flight, Haneda to Itami or Kansai",
    time: "No figure printed",
    cost: "Varies by date and airline",
    verdict: "ANA's and JAL's own pages give no published flight time, so none is printed. Add airport transfers at both ends before comparing.",
    source: `ana.co.jp and jal.co.jp, ${EARLIER}`,
  },
];

const faqItems = [
  {
    q: "How much is the shinkansen from Tokyo to Osaka?",
    a: `${WINDOW_NOZOMI} one way for a reserved Ordinary seat on the Nozomi at the station window, or ${SMART_NOZOMI} on JR's smartEX. The Hikari and Kodama are ${WINDOW_HIKARI} reserved (${SMART_HIKARI} on smartEX), and a non-reserved seat on any of them is ${NON_RESERVED}. Those are one adult in the regular season: reserved seats cost ¥200 more on peak dates, ¥400 more in the top season and ¥200 less off-peak. Green Car is ¥19,590 on the Nozomi and ¥19,270 on the Hikari. Checked on JR's own pages, ${OWN}.`,
  },
  {
    q: "How long is the bullet train from Tokyo to Osaka?",
    a: `2 hours 21 minutes at the fastest, on JR Central's own figure for a Nozomi from Tokyo Station to Shin-Osaka, with no transfer. Most Nozomi take about 2 hours 30 minutes, the Hikari about 3 hours and the all-stops Kodama about 4 hours. JR Central runs up to 18 trains an hour on the line. Checked ${EARLIER}.`,
  },
  {
    q: "Is the JR Pass worth it for Tokyo to Osaka?",
    a: `Not for a return. Two reserved Nozomi seats on smartEX are ¥29,040, against ${JR_PASS_ONLINE} for a 7-day Ordinary pass online or ${JR_PASS_ORDER} from an overseas agency. The pass also does not cover the Nozomi without a ${NOZOMI_TICKET} ticket per ride, sold only at JR stations in Japan. It starts to pay when the same week reaches Hiroshima, Kanazawa or Tohoku. Checked on japanrailpass.net, ${OWN}.`,
  },
  {
    q: "Is there a cheaper way to get from Tokyo to Osaka than the shinkansen?",
    a: `The overnight highway bus is the low-cost option, at about 8 to 9 hours, with fares that change by date and seat. On the shinkansen itself, a non-reserved seat is the cheapest at ${NON_RESERVED} on any train, and smartEX takes ¥200 off every reserved seat. smartEX also sells limited-seat early-booking fares, priced on smart-ex.jp. Checked ${OWN}.`,
  },
  {
    q: "Do I need to book the Tokyo to Osaka shinkansen in advance?",
    a: `Usually no, and on some dates yes. On an ordinary day a non-reserved ticket works because trains run up to 18 an hour. In these periods every Nozomi car is reserved: ${nozomiAllReservedPeriods.join("; ")}. The Hikari and Kodama keep non-reserved cars then, though JR warns they may be overcrowded. Book ahead for an oversized bag, a fixed connection or the Mt Fuji seat (E). Checked on JR Central's site, ${OWN}.`,
  },
];

const TITLE = "Tokyo to Osaka Shinkansen 2026: Price, Time & Tickets";
const DESCRIPTION =
  "Tokyo to Osaka Shinkansen price: ¥14,720 reserved Nozomi (¥14,520 on smartEX), 2h21m fastest. Bullet train times, JR Pass rules and where to book tickets.";
const ROUTE = "/guides/transport/tokyo-to-osaka-shinkansen";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function LastChecked({ date, sources }: { date: string; sources: { label: string; href?: string }[] }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      Last checked: {date}.{" "}
      {sources.map((s, i) => (
        <span key={s.label}>
          {i > 0 ? " · " : ""}
          {s.href ? (
            <a href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ) : (
            s.label
          )}
        </span>
      ))}
    </p>
  );
}

export default function TokyoToOsakaShinkansenPage({ updated }: { updated: PageUpdated }) {
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
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Transport & Getting Around",
                  item: "https://www.japan-travel-kit.com/guides/transport",
                },
                { "@type": "ListItem", position: 4, name: "Tokyo to Osaka Shinkansen", item: URL },
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
          <span className={styles.breadCurrent}>Tokyo to Osaka Shinkansen</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo to Osaka Shinkansen 2026:<br />Price, Time &amp; Tickets
          </h1>
          <p className={styles.heroSubtitle}>
            What each seat costs on the Nozomi, Hikari and Kodama, how long the bullet train takes, whether a
            JR Pass pays, and where to book.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "JR's own fares, dated", "JR Pass break-even", "Booking options compared"].map((t) => (
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

        {/* Lead paragraph: the whole answer, before anything else. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            A <strong>Tokyo to Osaka Shinkansen</strong> ticket costs <strong>{WINDOW_NOZOMI}</strong> one way for
            a reserved seat on the Nozomi ({SMART_NOZOMI} on JR&apos;s own smartEX), and the fastest bullet train
            takes <strong>2 hours 21 minutes</strong> from Tokyo Station to Shin-Osaka, with up to 18 trains an
            hour on the line. The Hikari and Kodama cost {WINDOW_HIKARI} reserved and take about 3 and 4 hours,
            and a non-reserved seat on any of the three is <strong>{NON_RESERVED}</strong>. A JR Pass covers the
            Hikari but not the Nozomi without a {NOZOMI_TICKET} ticket, so for one return trip two single tickets
            are cheaper. Fares checked on JR&apos;s own pages, {OWN}.
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
                <p className={styles.verdictStatLabel}>Price, reserved Nozomi</p>
                <p className={styles.verdictStatValue}>{WINDOW_NOZOMI}, or {SMART_NOZOMI} on smartEX</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Fastest time</p>
                <p className={styles.verdictStatValue}>2h 21m, no transfer</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest seat</p>
                <p className={styles.verdictStatValue}>{NON_RESERVED} non-reserved</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Pass on the Nozomi</p>
                <p className={styles.verdictStatValue}>Needs a {NOZOMI_TICKET} ticket</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> book a reserved Nozomi seat each way unless your week also reaches
              Hiroshima, Kanazawa or Tohoku. Two singles are ¥29,040 on smartEX against {JR_PASS_ONLINE} for the
              cheapest 7-day pass.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={shinkansenTokyoOsaka.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Tokyo → Osaka Tickets on Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        <BookingEsimCard />

        <EsimCtaTop />

        {/* Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How Much Is the Shinkansen From Tokyo to Osaka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            {WINDOW_NOZOMI} one way for a reserved Nozomi seat, or {SMART_NOZOMI} on smartEX, for one adult in
            the regular season. Non-reserved is {NON_RESERVED} on all three trains and does not change with the
            season; reserved seats cost ¥200 more on peak dates, ¥400 more in the top season and ¥200 less
            off-peak.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Train", "Tokyo → Shin-Osaka", "Non-reserved", "Reserved (window / smartEX)", "Green Car", "On a JR Pass?"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.train}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.train}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.nonReserved}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.reserved}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.green}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.pass}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            date="2026-11-12"
            sources={[
              { label: "JR Group Hikari/Kodama fares (as of Oct 2026)", href: "https://jr-group.jp/hikari-ryokin/" },
              { label: "JR Central / JR West release, 16 Oct 2026 (Nozomi)", href: "https://jr-central.co.jp/news/release/_pdf/000046069.pdf" },
              { label: "smartEX Service", href: "https://smart-ex.jp/en/product/plan/service/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Times are JR Central&apos;s 2h 21m and JR Tokai Tours&apos; &ldquo;about 2h30 / 3 hours / 4
            hours&rdquo;, and the smartEX Green figures are from smart-ex.jp&apos;s tables, all read {EARLIER}. No
            Klook price appears here, because Klook&apos;s prices change by date.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoOsaka.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Osaka tickets on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Time */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Time</span>
          <h2 className={styles.sectionTitle}>How Long Is the Bullet Train From Tokyo to Osaka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            2 hours 21 minutes on the fastest Nozomi and about 2 hours 30 on most of them, with no transfer.
            The Hikari takes about 3 hours and the Kodama about 4, because they stop more often, and trains run
            from about 06:00 to 21:30.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Value", "What it means", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {frequencyRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            date="2026-11-04"
            sources={[
              { label: "JR Central Tokaido Shinkansen", href: "https://global.jr-central.co.jp/en/" },
              { label: "Klook's Tokyo → Osaka rail page (sample date 10 Nov 2026)" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook&apos;s page also gives 2h 14m as its shortest time, which no JR source supports, so the headline
            figure here is JR Central&apos;s. The Mt Fuji side, the luggage rule and the system as a whole are in
            our <Link href="/guides/transport/shinkansen-guide">shinkansen guide for first-timers</Link>.
          </p>
        </section>

        {/* JR Pass */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>JR Pass</span>
          <h2 className={styles.sectionTitle}>Is the JR Pass Worth It for Tokyo to Osaka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Not for one return trip: two reserved Nozomi seats are ¥29,040 on smartEX and the cheapest 7-day pass
            is {JR_PASS_ONLINE}. The pass covers the Hikari and Kodama, but every Nozomi ride needs a separate{" "}
            {NOZOMI_TICKET} ticket that is sold only at JR stations in Japan, from one month before boarding.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Question", "Answer", "What it costs"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.answer}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            date="2026-11-12"
            sources={[
              { label: "japanrailpass.net prices", href: "https://japanrailpass.net/en/purchase/price/" },
              { label: "japanrailpass.net NOZOMI/MIZUHO ticket", href: "https://japanrailpass.net/en/use/special-ticket/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            14- and 21-day Ordinary passes are ¥80,000 / ¥100,000 online and ¥84,000 / ¥105,000 from an agency.
            Our <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> works the break-even against
            your own legs.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JAPAN RAIL PASS (7/14/21 day) →
            </KlookLink>
            <KlookLink href={shinkansenTokyoOsaka.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Or single tickets on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Cheaper */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cheaper options</span>
          <h2 className={styles.sectionTitle}>Is There a Cheaper Train From Tokyo to Osaka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            On the shinkansen, a non-reserved seat at {NON_RESERVED} is the cheapest regular fare, and smartEX
            takes ¥200 off any reserved seat. Below that, the overnight highway bus is the low-cost way, at about
            8 to 9 hours.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Time", "Cost", "Verdict", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {altRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.option}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            date="2026-11-12"
            sources={[
              { label: "JR Group Hikari/Kodama fares", href: "https://jr-group.jp/hikari-ryokin/" },
              { label: "smartEX Service", href: "https://smart-ex.jp/en/product/plan/service/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Stopping in Kyoto on the way? The{" "}
            <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto guide</Link> compares the bus and the
            train for that leg, and the{" "}
            <Link href="/guides/transport/kyoto-to-tokyo-shinkansen">Kyoto to Tokyo shinkansen guide</Link> covers
            the ride back.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tickets</span>
          <h2 className={styles.sectionTitle}>Where Should You Book Tokyo to Osaka Shinkansen Tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            smartEX for the lowest reserved price and free changes; Klook if you would rather pick the train and
            seat class in one checkout with the rest of the trip; the station if you are already in Japan and
            travelling today.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where", "Price", "When you can book", "Changes and refunds"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.cancel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            date="2026-11-12"
            sources={[
              { label: "smartEX Service", href: "https://smart-ex.jp/en/product/plan/service/" },
              { label: "Klook's terms are shown at its checkout" },
            ]}
          />
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoOsaka.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Pick a train and seat class on Klook →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            When Do Tokyo to Osaka Trains Sell Out?
          </h3>
          <p className={styles.bodyText}>
            On these dates every Nozomi car is reserved, so a walk-up Nozomi ticket does not exist and seats on
            the morning trains go first. The Hikari and Kodama keep non-reserved cars, though JR warns they may be
            overcrowded. Checked on JR Central&apos;s site, {OWN}.
          </p>
          <ul className={styles.pickList}>
            {nozomiAllReservedPeriods.map((period) => (
              <li key={period}>
                <span className={styles.proIcon}>▸</span>
                <span><strong>{period}</strong></span>
              </li>
            ))}
          </ul>
          <p className={styles.bodyText}>
            Outside those dates, book ahead only for three reasons: a bag of 161 to 250 cm, which needs a
            reserved seat with an oversized baggage area (¥1,000 if you board without one); a fixed connection;
            or the Mt Fuji view, which is <strong>Seat E</strong> in Ordinary or <strong>Seat D</strong> in Green
            Car going west. Non-reserved cars have neither. Baggage and seat rules read on JR Central&apos;s own
            pages, {EARLIER}.
          </p>
        </section>

        {/* 2027 */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Fare change</span>
          <h2 className={styles.sectionTitle}>Is the Tokyo to Osaka Shinkansen Price Going Up?</h2>
          <p className={styles.bodyText}>
            Yes, from 2027. JR Central and JR West announced on 16 October 2026 that the Nozomi reserved price
            rises for <strong>tickets bought from 1 July 2027</strong>, taking Tokyo to Shin-Osaka from{" "}
            {WINDOW_NOZOMI} to <strong>¥15,420</strong>. Green Car goes from ¥19,590 to <strong>¥23,290</strong>{" "}
            for boarding from 15 December 2027. The non-reserved charge is not changing, and a trip booked before
            those dates is unaffected. The release gives window prices, not smartEX ones. Checked {OWN}.
          </p>
        </section>

        {/* Arrival */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Arrival</span>
          <h2 className={styles.sectionTitle}>Where Should You Stay in Osaka After the Shinkansen?</h2>
          <p className={styles.bodyText}>
            Umeda or Namba, both on the Midosuji Line from Shin-Osaka. The shinkansen does not reach Osaka Station,
            so this last subway leg is part of every trip; Umeda is two stops away and Namba a few more on the same
            train. <Link href="/guides/attractions/where-to-stay-in-osaka">Where to stay in Osaka</Link> compares
            the neighbourhoods in full. If you arrive by mid-morning, an Osaka Amazing Pass at{" "}
            {PRICES.osakaAmazingPass.adult} for one day covers the subway and the sights (operator price, read{" "}
            {checkedLabel(PRICES.osakaAmazingPass.checked)}); the{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass break-even table</Link> has
            the sums, and the <Link href="/guides/attractions/osaka-2-day-itinerary">Osaka 2-day itinerary</Link>{" "}
            plans what follows.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka Amazing Pass →
            </KlookLink>
            <KlookLink href={dotonboriDaytimeFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Dotonbori food tour →
            </KlookLink>
          </div>
        </section>

        <KlookStayAreas
          heading="Hotels in Osaka Near the Midosuji Line"
          intro="All three sit on the Midosuji Line from Shin-Osaka, so the choice is about what comes next rather than how you get there."
          areas={tokyoOsakaArrivalStayAreas}
        />

        <KlookTripPrep
          label="Book with the train"
          heading="What to Book for the Day You Arrive"
          intro="The train is the one part of this day JR has already solved. These four are what the rest of it needs: lunch at the other end, a way around the city, a bed, and data on your phone."
          items={tokyoOsakaArrivalPrep}
        />

        <KlookTourPicks
          heading="What to Book for the First Afternoon"
          intro="If you arrive by lunchtime, these two fill the day. Open a listing for availability and the current price on your dates."
          tours={[dotonboriDaytimeFoodTour, osakaAmazingPass]}
        />

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

        {/* Before you go */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you go</span>
          <h2 className={styles.sectionTitle}>One Thing to Sort Before You Board</h2>
          <p className={styles.bodyText}>
            Data. A smartEX change, a QR ticket and a delay notice all happen on your phone, and you will want a
            map the moment you step out at Shin-Osaka.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it with the
            alternatives.
          </p>
        </section>

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/japan-first-time-itinerary", title: "First Time Japan Itinerary (2026): 9 Days, Day by Day" },
              { href: "/guides/transport/shinkansen-guide", title: "Shinkansen Guide 2026: Tickets, Passes & Tips for First-Timers" },
              { href: "/guides/transport/tokyo-to-kyoto", title: "Tokyo to Kyoto (2026): Cheapest & Fastest Ways to Get There" },
              { href: "/guides/transport/kyoto-to-tokyo-shinkansen", title: "Kyoto to Tokyo Shinkansen" },
              { href: "/guides/transport/tokyo-to-nagoya-shinkansen", title: "Tokyo to Nagoya Shinkansen: Times, Fares, JR Pass" },
              { href: "/guides/transport/jr-pass-guide", title: "JR Pass Cost 2026: New Prices & Is It Worth It?" },
            ].map((card) => (
              <Link key={card.href} href={card.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="3" width="16" height="14" rx="3" />
                    <line x1="4" y1="10" x2="20" y2="10" />
                    <path d="M7 21l2-4M17 21l-2-4" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{card.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book the seat, then the rest of Osaka</h2>
            <p className={styles.ctaBannerDesc}>
              Seat E for Mt Fuji, a reserved car if you have a large bag, and the Hikari if you hold a JR Pass.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={shinkansenTokyoOsaka.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Tokyo → Osaka Tickets →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
