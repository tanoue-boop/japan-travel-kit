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
  kantoKansaiLuggageDelivery,
  klookEsim,
  luggageDeliveryCards,
  tokyoOsakaFareTablePrep,
  osakaAmazingPass,
  shinkansenTokyoOsaka,
  tokyoOsakaArrivalPrep,
  osakaArrivalShinkansenPrep,
  tokyoOsakaArrivalStayAreas,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";
import { hreflangLinks } from "../../../components/Hreflang";

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
 * the Nozomi figure; corrected to 14400 on 12 Nov 2026. No flight time,
 * bus fare or Klook price is printed.
 *
 * 21 Nov 2026 (task-jtk-20261121-R04), title "Price, Time & How to Book". Every fare and
 * time was re-read on official pages that day, and jr-group.jp was dropped as a source
 * (it describes itself as a private site):
 *  - smartEX price PDFs under smart-ex.jp/en/product/plan/service/pdf/ (reserved, green,
 *    non_reserved; "As of April 1, 2025"): Tokyo–Shin-Osaka Nozomi ¥14,520 reserved /
 *    ¥19,390 Green, Hikari-Kodama ¥14,200 / ¥19,070, non-reserved ¥13,870;
 *  - JR Central / JR West release 000046069.pdf: Nozomi window ¥14,720 → ¥15,420 and
 *    Green ¥19,590 → ¥23,290. Its charge tables give the current Nozomi reserved charge
 *    (¥6,510 − ¥700 = ¥5,810) and the Nozomi addition over the Hikari charge
 *    (¥1,020 − ¥700 = ¥320), so the Hikari window price is ¥14,720 − ¥320 = ¥14,400 and
 *    Hikari Green ¥19,590 − ¥320 = ¥19,270, each ¥200 over its smartEX figure;
 *  - traininfo.jr-central.co.jp departure_info_1_2.json and train_info JSON for 21 Nov
 *    2026: 160 Nozomi from Tokyo reach Shin-Osaka, 141 to 150 minutes (median 147), first
 *    06:00 and last 21:24; 28 Hikari, 168 to 186 minutes; 11 Kodama, 222 to 234 minutes;
 *  - japanrailpass.net price and special-ticket pages: ¥50,000 / ¥53,000, ¥4,960;
 *  - global.jr-central.co.jp/en/info/oversized-baggage/: 161–250 cm needs a reserved
 *    oversized-baggage seat, ¥1,000 without one; Mt Fuji seat E (Ordinary) / D (Green),
 *    from JR Central's guides through the global.jr-central.co.jp search index.
 * Klook's "2h 14m" and "345 direct trains" figures are gone: JR's own data contradicts them.
 */

const OWN = checkedLabel("2026-11-21");
const EARLIER = checkedLabel("2026-11-04");

const tokyoOsaka = fares.segments.find((s) => s.id === "tokyo-shin-osaka")!;
const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;

const WINDOW_NOZOMI = "¥14,720";
const WINDOW_HIKARI = yen(tokyoOsaka.fareYen); // ¥14,400, from JR Central's 16 Oct 2026 charge tables
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
    train: "Nozomi — fastest, the one to book",
    time: "2h 21m fastest, 2h 27m typical",
    nonReserved: NON_RESERVED,
    reserved: `${WINDOW_NOZOMI} (${SMART_NOZOMI} smartEX)`,
    green: "¥19,590 (¥19,390 smartEX)",
    pass: `No, needs the ${NOZOMI_TICKET} ticket`,
  },
  {
    train: "Hikari — the JR Pass train",
    time: "2h 48m to 3h 06m",
    nonReserved: NON_RESERVED,
    reserved: `${WINDOW_HIKARI} (${SMART_HIKARI} smartEX)`,
    green: "¥19,270 (¥19,070 smartEX)",
    pass: "Yes",
  },
  {
    train: "Kodama (all stops)",
    time: "3h 42m to 3h 54m",
    nonReserved: NON_RESERVED,
    reserved: `${WINDOW_HIKARI} (${SMART_HIKARI} smartEX)`,
    green: "¥19,270 (¥19,070 smartEX)",
    pass: "Yes",
  },
];

const frequencyRows = [
  {
    item: "Nozomi, Tokyo → Shin-Osaka",
    value: "160 trains, 2h 21m – 2h 30m",
    detail: "Every Nozomi from Tokyo that reaches Shin-Osaka on 21 Nov 2026; the typical (median) run is 2h 27m, with no transfer",
    source: "JR Central timetable data",
  },
  {
    item: "First and last Nozomi",
    value: "06:00 and 21:24",
    detail: "Tokyo departures on 21 Nov 2026. Holiday timetables move the last trains, so check your own date",
    source: "JR Central timetable data",
  },
  {
    item: "Hikari and Kodama",
    value: "28 and 11 trains",
    detail: "Hikari 2h 48m to 3h 06m, Kodama 3h 42m to 3h 54m on the same date — the trains a JR Pass covers",
    source: "JR Central timetable data",
  },
  {
    item: "Whole-line frequency",
    value: "Up to 18 trains an hour",
    detail: "So a missed train is rarely a long wait",
    source: "global.jr-central.co.jp",
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
  {
    route: "JR Pass (7-day Ordinary)",
    price: `${JR_PASS_ONLINE} online, ${JR_PASS_ORDER} from an overseas agency; Nozomi ${NOZOMI_TICKET} extra per ride`,
    when: "Hikari and Kodama seats are reserved free with the pass; the Nozomi ticket is sold at JR stations in Japan from one month before boarding",
    cancel: "Only pays if the same 7 days add Hiroshima, Kanazawa or Tohoku — see the JR Pass table above",
  },
];

const altRows = [
  {
    option: "Shinkansen, non-reserved",
    time: "2h 21m to 3h 54m, by train",
    cost: `${NON_RESERVED}, the same on every day of the year`,
    verdict: "The cheapest shinkansen seat. No seat choice, no oversized-bag seats, and no Nozomi non-reserved cars in the peak periods.",
    source: `smart-ex.jp price table, ${OWN}`,
  },
  {
    option: "Shinkansen, reserved on smartEX",
    time: "2h 21m fastest",
    cost: `${SMART_HIKARI} Hikari, ${SMART_NOZOMI} Nozomi`,
    verdict: "¥200 under the window price on every reserved seat. smartEX also sells limited-seat early-booking fares, priced on smart-ex.jp.",
    source: `smart-ex.jp and JR Central, ${OWN}`,
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
    a: `${WINDOW_NOZOMI} one way for a reserved Ordinary seat on the Nozomi at the station window, or ${SMART_NOZOMI} on JR's smartEX. The Hikari and Kodama are ${WINDOW_HIKARI} reserved (${SMART_HIKARI} on smartEX), and a non-reserved seat on any of them is ${NON_RESERVED}. Those are one adult in the regular season: reserved seats cost ¥200 more on peak dates, ¥400 more in the top season and ¥200 less off-peak. Green Car is ¥19,590 on the Nozomi (¥19,390 on smartEX). Checked on JR Central's and smartEX's own pages, ${OWN}.`,
  },
  {
    q: "How long is the bullet train from Tokyo to Osaka?",
    a: `2 hours 21 minutes at the fastest and 2 hours 27 minutes on a typical Nozomi from Tokyo Station to Shin-Osaka, with no transfer: 160 Nozomi made the run on 21 Nov 2026 in JR Central's own timetable data, the first at 06:00 and the last at 21:24. The Hikari takes 2h 48m to 3h 06m and the all-stops Kodama 3h 42m to 3h 54m. Checked ${OWN}.`,
  },
  {
    q: "Do I need to reserve the shinkansen from Tokyo to Osaka?",
    a: `Usually no, and on some dates yes. On an ordinary day a non-reserved ticket (${NON_RESERVED}) works because trains run up to 18 an hour. In these periods every Nozomi car is reserved: ${nozomiAllReservedPeriods.join("; ")}. The Hikari and Kodama keep non-reserved cars then, though JR warns they may be overcrowded. Always reserve for a bag of 161 to 250 cm (¥1,000 if you board without an oversized-baggage seat), a fixed connection or the Mt Fuji seat. Checked on JR Central's site, ${OWN}.`,
  },
  {
    q: "Is the JR Pass worth it for Tokyo to Osaka only?",
    a: `No. Two reserved Nozomi seats on smartEX are ¥29,040, against ${JR_PASS_ONLINE} for a 7-day Ordinary pass online or ${JR_PASS_ORDER} from an overseas agency (prices since 1 October 2026). The pass also does not cover the Nozomi without a ${NOZOMI_TICKET} ticket per ride, sold only at JR stations in Japan. It starts to pay when the same week reaches Hiroshima, Kanazawa or Tohoku. Checked on japanrailpass.net, ${OWN}.`,
  },
  {
    q: "Which side to sit to see Mt Fuji from Tokyo to Osaka?",
    a: "The right-hand side going west: Seat E in an Ordinary car, or Seat D in the Green Car, which are the seats JR Central's own guides name. Non-reserved cars cannot guarantee either, so reserve the seat, and JR Central notes the mountain may not be visible, depending on the weather. Checked on global.jr-central.co.jp, 21 Nov 2026.",
  },
];

const TITLE = "Tokyo to Osaka Shinkansen 2026: Price, Time & How to Book";
const DESCRIPTION =
  "Shinkansen Tokyo to Osaka price: ¥14,720 reserved Nozomi, ¥13,870 non-reserved. The bullet train takes 2h21m. smartEX, Klook or JR Pass: how to book.";
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Tokyo to Osaka Shinkansen</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo to Osaka Shinkansen 2026: <br />Price, Time &amp; How to Book
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
            The fastest <strong>Tokyo to Osaka Shinkansen</strong>, the Nozomi, takes{" "}
            <strong>2 hours 21 minutes</strong> from Tokyo Station to Shin-Osaka (2 hours 27 minutes on a typical
            one), and 160 Nozomi made the run on 21 November 2026. A reserved Nozomi seat costs{" "}
            <strong>{WINDOW_NOZOMI}</strong> one way at the station or {SMART_NOZOMI} on JR&apos;s own smartEX,
            and a non-reserved seat on any train is <strong>{NON_RESERVED}</strong>. A JR Pass covers the Hikari
            ({WINDOW_HIKARI} reserved, about 3 hours) but not the Nozomi without a {NOZOMI_TICKET} ticket, so
            for one return trip two single tickets are cheaper. Fares and times checked on JR Central&apos;s and
            smartEX&apos;s own pages, {OWN}.
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
              <KlookLink href={shinkansenTokyoOsaka.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check Tokyo → Osaka Tickets on Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          headingLevel={3}
          label="Book with the train"
          heading="What to Book in Osaka With Your Seat"
          intro="The Nozomi ends at Shin-Osaka. The bed, the city pass and a park date are the parts of the same trip that are easiest to settle while the train is open in the next tab."
          items={osakaArrivalShinkansenPrep}
        />

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
            date="2026-11-21"
            sources={[
              { label: "JR Central / JR West release, 16 Oct 2026 (window fares)", href: "https://jr-central.co.jp/news/release/_pdf/000046069.pdf" },
              { label: "smartEX reserved-seat prices (PDF)", href: "https://smart-ex.jp/en/product/plan/service/pdf/service_fares_reserved.pdf" },
              { label: "smartEX Service", href: "https://smart-ex.jp/en/product/plan/service/" },
              { label: "JR Central train information", href: "https://traininfo.jr-central.co.jp/shinkansen/sp/en/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Times are the fastest and slowest runs from Tokyo to Shin-Osaka on 21 Nov 2026 in JR Central&apos;s
            timetable data. The Hikari and Green window prices are worked from the charge tables in JR
            Central&apos;s release, and each is ¥200 above its smartEX price. No Klook price appears here,
            because Klook&apos;s prices change by date.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoOsaka.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo → Osaka tickets on Klook →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          headingLevel={3}
          label="Same day in Osaka"
          heading="What to Book for the Day You Reach Osaka"
          intro="The seat is the 2-hour part of the day. These four settle the rest of it before you leave Tokyo: a guided first day, the city pass, a room by the USJ gates if the park is the point, and data on your phone."
          items={tokyoOsakaFareTablePrep}
        />

        {/* Time */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Time</span>
          <h2 className={styles.sectionTitle}>How Long Is the Bullet Train From Tokyo to Osaka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            2 hours 21 minutes on the fastest Nozomi and 2 hours 27 minutes on a typical one, with no transfer.
            The Hikari takes 2h 48m to 3h 06m and the Kodama 3h 42m to 3h 54m, because they stop more often,
            and the Nozomi to Shin-Osaka leave Tokyo from 06:00 to 21:24.
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
            date="2026-11-21"
            sources={[
              { label: "JR Central train information (timetable for 21 Nov 2026)", href: "https://traininfo.jr-central.co.jp/shinkansen/sp/en/" },
              { label: "JR Central Tokaido Shinkansen", href: "https://global.jr-central.co.jp/en/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Train counts are for one Saturday; weekday and holiday timetables differ. The Mt Fuji side, the luggage rule and the system as a whole are in
            our <Link href="/guides/transport/shinkansen-guide">shinkansen guide for first-timers</Link>.
          </p>
        </section>

        {/* JR Pass */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>JR Pass</span>
          <h2 className={styles.sectionTitle}>Is the JR Pass Worth It for Tokyo to Osaka Only?</h2>
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
            date="2026-11-21"
            sources={[
              { label: "japanrailpass.net prices", href: "https://japanrailpass.net/en/purchase/price/" },
              { label: "japanrailpass.net NOZOMI/MIZUHO ticket", href: "https://japanrailpass.net/en/use/special-ticket/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            14- and 21-day Ordinary passes are ¥80,000 / ¥100,000 online and ¥84,000 / ¥105,000 from an agency.
            Our <Link href="/guides/transport/jr-pass-guide">JR Pass price</Link> guide has the October 2026
            price rise and works the break-even against your own legs. Going the long way through Kanazawa
            instead? The{" "}
            <Link href="/guides/transport/hokuriku-arch-pass">Hokuriku Arch Pass</Link> covers Tokyo to Osaka by
            the Hokuriku Shinkansen and the Thunderbird for seven days, but not the Tokaido Shinkansen.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              JAPAN RAIL PASS (7/14/21 day) →
            </KlookLink>
            <KlookLink href={shinkansenTokyoOsaka.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
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
            date="2026-11-21"
            sources={[
              { label: "smartEX non-reserved prices (PDF)", href: "https://smart-ex.jp/en/product/plan/service/pdf/service_fares_non_reserved.pdf" },
              { label: "smartEX Service", href: "https://smart-ex.jp/en/product/plan/service/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Stopping in Kyoto on the way? The{" "}
            <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto guide</Link> compares the bus and the
            train for that leg, and the{" "}
            <Link href="/guides/transport/kyoto-to-tokyo-shinkansen">Kyoto to Tokyo shinkansen guide</Link> covers
            the ride back. For every other leg, the{" "}
            <Link href="/guides/transport/shinkansen-guide">how to buy shinkansen tickets</Link> table compares
            smartEX, the station, Klook and the JR Pass, with the big-luggage seat rules.
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            Can I Stop in Nagoya on the Way From Tokyo to Osaka?
          </h3>
          <p className={styles.bodyText}>
            Yes, on a basic fare ticket for more than 100 km: JR Central allows a stopover (leaving the gates
            and coming back in) at a station between origin and destination, with no backtracking. The
            shinkansen&apos;s limited express ticket cannot be used for a stopover, so buy one for Tokyo →
            Nagoya and another for Nagoya → Shin-Osaka; on smartEX no stopover is allowed and the unridden
            section becomes invalid once you get off. Rules read on JR Central&apos;s{" "}
            <a href="https://global.jr-central.co.jp/en/tickets/type/stopovers.html" target="_blank" rel="noopener">
              stopovers page
            </a>{" "}
            and smart-ex.jp, 13 Nov 2026. What to do with the day there is in our{" "}
            <Link href="/guides/transport/tokyo-to-nagoya-shinkansen">Tokyo to Nagoya shinkansen guide</Link>.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tickets</span>
          <h2 className={styles.sectionTitle}>How Do You Book the Tokyo to Osaka Shinkansen?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            smartEX for the lowest reserved price and free changes; Klook if you would rather pick the train and
            seat class in one checkout with the rest of the trip; the station if you are already in Japan and
            travelling today; the JR Pass only when the same week goes well beyond Osaka.
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
            date="2026-11-21"
            sources={[
              { label: "smartEX Service", href: "https://smart-ex.jp/en/product/plan/service/" },
              { label: "JR Central / JR West release (window fares)", href: "https://jr-central.co.jp/news/release/_pdf/000046069.pdf" },
              { label: "japanrailpass.net NOZOMI/MIZUHO ticket", href: "https://japanrailpass.net/en/use/special-ticket/" },
              { label: "Klook's terms are shown at its checkout" },
            ]}
          />
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoOsaka.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Pick a train and seat class on Klook →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            Do I Need to Reserve the Shinkansen From Tokyo to Osaka?
          </h3>
          <p className={styles.bodyText}>
            Not on an ordinary day, but yes on these dates: every Nozomi car is reserved, so a walk-up Nozomi
            non-reserved ticket does not exist and seats on the morning trains go first. The Hikari and Kodama keep non-reserved cars, though JR warns they may be
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
            reserved seat with an oversized baggage area (¥1,000 if you board without one, and bags over 250 cm
            cannot come aboard); a fixed connection; or the Mt Fuji view. Non-reserved cars have neither seat.
            Baggage rules read on JR Central&apos;s{" "}
            <a href="https://global.jr-central.co.jp/en/info/oversized-baggage/" target="_blank" rel="noopener noreferrer">
              oversized baggage page
            </a>
            , {OWN}.
          </p>
          <p className={styles.bodyText}>
            If the case is the problem rather than the seat, it can travel separately: LuggAgent&apos;s
            same-day service on Klook carries bags from a hotel in the Tokyo area to one in the Osaka area.
            Check that both hotels are covered and the morning drop-off cut-off on the listing before you book.
            The slower and cheaper route is Yamato&apos;s TA-Q-BIN, priced by size on our{" "}
            <Link href="/guides/transport/japan-luggage-delivery" style={{ color: "var(--red)", fontWeight: 600 }}>
              Japan luggage delivery
            </Link>{" "}
            page.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
            <KlookLink href={kantoKansaiLuggageDelivery.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Same-day Tokyo → Osaka luggage delivery →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            Which Side Should You Sit On to See Mt Fuji From Tokyo to Osaka?
          </h3>
          <p className={styles.bodyText}>
            The right-hand side going west: <strong>Seat E</strong> in an Ordinary car or <strong>Seat D</strong>{" "}
            in the Green Car, the seats JR Central&apos;s own guides name. Pick it on the smartEX seat map or ask
            for it at the ticket office; the view depends on the weather, and JR Central notes the mountain may
            not be visible. Read on{" "}
            <a href="https://global.jr-central.co.jp/en/goldenroute/shinkansen/" target="_blank" rel="noopener noreferrer">
              JR Central&apos;s Shinkansen Perfect Guide
            </a>
            , {OWN}.
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
            <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Osaka Amazing Pass →
            </KlookLink>
            <KlookLink href={dotonboriDaytimeFoodTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
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
          intro="The train is the one part of this day JR has already solved. These are what the rest of it needs: lunch at the other end, a way around the city, a bed, data on your phone and, if you fly home from Kansai, a bag service for the last morning."
          items={[...tokyoOsakaArrivalPrep, luggageDeliveryCards.tokyoToOsakaFlyHome]}
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
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
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
              { href: "/guides/transport/jr-pass-guide", title: "JR Pass Price 2026: New Prices From Oct 1 & Is It Worth It?" },
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
              <KlookLink href={shinkansenTokyoOsaka.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View Tokyo → Osaka Tickets →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
