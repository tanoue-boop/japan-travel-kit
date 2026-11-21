import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import { shinkansenGuideSameDayPrep, shinkansenTokyoKyoto, shinkansenTokyoOsaka } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * 17 Nov 2026 (task jtk-20261117-03, daily PDCA queue F): answer-first rebuild around
 * "how to buy shinkansen tickets", with the bookings an AI answer cannot make for the
 * reader — the Klook shinkansen ticket (2%) and, directly under it, the Kyoto / Osaka
 * tours and hotels (6.5%), the Kansai passes (5%) and the Klook eSIM (20%).
 *
 * Read on 17 Nov 2026:
 *  - smart-ex.jp/en/product/plan/service/ and its price-list PDFs ("As of April 1, 2025",
 *    still the current lists): Nozomi reserved from Tokyo ¥11,100 Nagoya, ¥13,970 Kyoto,
 *    ¥14,520 Shin-Osaka, ¥19,560 Hiroshima; Shin-Osaka–Hiroshima ¥10,750; Hikari/Kodama
 *    reserved ¥10,890 Nagoya, ¥13,650 Kyoto, ¥14,200 Shin-Osaka; non-reserved Tokyo–Kyoto
 *    ¥13,320. On sale from 5:30 one year ahead to 4 minutes before departure, seats
 *    confirmed after 8:00 one month ahead, free changes within 3 months of purchase,
 *    ¥320 refund fee, QR ticket or IC card boarding, ±¥200 / +¥400 season rule;
 *  - smart-ex.jp/en/faq/: membership is registered with a credit card;
 *  - japanrailpass.net price page: 7-day Ordinary ¥50,000 online, ¥53,000 from an overseas
 *    agency (14-day ¥80,000 / ¥84,000, 21-day ¥100,000 / ¥105,000), paid in yen online;
 *    special-ticket page: NOZOMI/MIZUHO ticket ¥4,180 Tokyo–Nagoya, ¥4,960 Tokyo–Kyoto
 *    and Tokyo–Shin-Osaka, ¥6,500 Tokyo–Hiroshima, sold from one month before boarding at
 *    JR station machines and ticket offices;
 *  - global.jr-central.co.jp/en/info/oversized-baggage/: 160 cm or less in racks or the
 *    deck storage, 161–250 cm needs a "seat with an oversized baggage area" (no extra
 *    charge), ¥1,000 including tax without one, over 250 cm not allowed.
 * Taken from the route guides, with their own check dates: the window fares (¥14,400
 * Hikari, ¥14,720 Nozomi, JR Group / JR Central, 12 Nov), the all-reserved Nozomi
 * periods (JR Central, 12 Nov), the Tokyo–Kanazawa fare (JR West, 11 Nov) and the
 * journey times. No Klook price is printed.
 */

const CHECKED = "2026-11-17";

/** Table 1 — ways to buy. First row is the answer. */
const buyRows = [
  {
    way: "Best for most visitors: smartEX (JR's own site and app)",
    language: "English",
    payment: "Registered credit card, charged when you book",
    seat: "Yes, from a seat map; ¥200 under the window price on reserved seats",
    change: "Free changes until 4 min before departure (within 3 months of purchase); refund fee ¥320",
  },
  {
    way: "JR ticket office (Midori-no-madoguchi) or ticket machine",
    language: "Staffed counter or machine; English help varies by station",
    payment: "Paid at the station",
    seat: "Yes; reserved seats go on sale at 10:00 one month before",
    change: "Handled at the ticket office",
  },
  {
    way: "Klook (shinkansen rail pages)",
    language: "English, booked before you fly",
    payment: "At Klook's checkout",
    seat: "Pick the date, train and seat class (non-reserved, reserved, Green Car)",
    change: "Klook's own terms, shown before you pay",
  },
  {
    way: "JAPAN RAIL PASS (7, 14 or 21 days)",
    language: "English (japanrailpass.net)",
    payment: "¥50,000 for 7 days online, paid in yen; ¥53,000 from an overseas agency",
    seat: "Hikari and Kodama included; Nozomi/Mizuho need a ¥4,180–¥6,500 ticket per ride",
    change: "Per the pass terms on japanrailpass.net",
  },
];

/** Table 2 — main routes. First row is the answer (the busiest route). */
const routeRows = [
  {
    route: "Tokyo → Shin-Osaka",
    href: "/guides/transport/tokyo-to-osaka-shinkansen",
    anchor: "Tokyo to Osaka shinkansen",
    time: "2h 21m fastest (Nozomi), about 3h Hikari",
    nozomi: "¥14,520",
    hikari: "¥14,200",
    pass: "Hikari yes; Nozomi + ¥4,960",
  },
  {
    route: "Tokyo → Kyoto",
    href: "/guides/transport/kyoto-to-tokyo-shinkansen",
    anchor: "Kyoto to Tokyo shinkansen",
    time: "About 2h 15m (Nozomi), about 2h 40m Hikari",
    nozomi: "¥13,970",
    hikari: "¥13,650",
    pass: "Hikari yes; Nozomi + ¥4,960",
  },
  {
    route: "Tokyo → Hiroshima",
    href: "/guides/transport/tokyo-to-hiroshima-shinkansen",
    anchor: "Tokyo to Hiroshima shinkansen",
    time: "3h 39m fastest, direct Nozomi",
    nozomi: "¥19,560",
    hikari: "—",
    pass: "Hikari + Sakura with a change; Nozomi + ¥6,500",
  },
  {
    route: "Tokyo → Nagoya",
    href: "/guides/transport/tokyo-to-nagoya-shinkansen",
    anchor: "Tokyo to Nagoya shinkansen",
    time: "1h 33m fastest (Nozomi)",
    nozomi: "¥11,100",
    hikari: "¥10,890",
    pass: "Hikari yes; Nozomi + ¥4,180",
  },
  {
    route: "Tokyo → Kanazawa (Hokuriku line)",
    href: "/guides/transport/tokyo-to-kanazawa",
    anchor: "Tokyo to Kanazawa shinkansen",
    time: "About 2h 30m (Kagayaki, all reserved)",
    nozomi: "¥14,400 reserved (JR East/West line, not on smartEX)",
    hikari: "—",
    pass: "Yes, Kagayaki and Hakutaka",
  },
  {
    route: "Shin-Osaka → Hiroshima",
    href: "/guides/transport/osaka-to-hiroshima-shinkansen",
    anchor: "Osaka to Hiroshima shinkansen",
    time: "1h 20m fastest (Nozomi / Mizuho)",
    nozomi: "¥10,750",
    hikari: "—",
    pass: "Sakura and Hikari yes; Nozomi/Mizuho need the extra ticket",
  },
];

/** Table 3 — luggage. First row is the answer. */
const luggageRows = [
  {
    size: "161–250 cm (length + width + height): a large suitcase",
    rule: "Reserve a “seat with an oversized baggage area” (Tokaido, Sanyo and Kyushu Shinkansen)",
    cost: "No extra charge; ¥1,000 including tax if you board without one",
  },
  {
    size: "160 cm or less",
    rule: "Overhead rack, at your feet, or the baggage storage on the deck",
    cost: "No reservation needed",
  },
  {
    size: "Over 250 cm",
    rule: "Not allowed on board",
    cost: "Cannot be carried on, with or without a reservation",
  },
];

/** The Nozomi all-reserved periods still ahead, as JR Central listed them (read 12 Nov 2026). */
const nozomiAllReservedPeriods = [
  "21–23 November 2026",
  "25 December 2026 – 5 January 2027",
  "9–11 January 2027",
  "20–22 March 2027",
];

const shinkansenLines = [
  { line: "Tokaido", route: "Tokyo – Osaka", speed: "285 km/h" },
  { line: "Sanyo", route: "Osaka – Fukuoka", speed: "300 km/h" },
  { line: "Tohoku", route: "Tokyo – Sapporo", speed: "320 km/h" },
  { line: "Hokuriku", route: "Tokyo – Kanazawa", speed: "260 km/h" },
  { line: "Kyushu", route: "Fukuoka – Kagoshima", speed: "260 km/h" },
];

const ticketTypes = [
  {
    rank: 1,
    name: "Non-reserved (自由席 — Jiyuuseki)",
    desc: "Sit in any unreserved carriage on a first-come, first-served basis. Slightly cheaper than reserved, but you may have to stand during peak periods. Not available on Nozomi or Mizuho services. Fine for off-peak travel.",
  },
  {
    rank: 2,
    name: "Reserved (指定席 — Shiteiseki)",
    desc: "A specific seat on a specific train is guaranteed. Only slightly more expensive than non-reserved — worth it for long routes, peak travel, or anyone travelling with luggage. Strongly recommended for first-timers.",
  },
  {
    rank: 3,
    name: "Green Car (グリーン車)",
    desc: "Japan's equivalent of business class. Wider seats, more legroom, and quieter carriages. A 50–100% premium over standard reserved fares. Good for longer routes like Tokyo–Fukuoka if you want extra comfort.",
  },
  {
    rank: 4,
    name: "Gran Class (グランクラス)",
    desc: "Premium first class with fully reclining seats, meal service, and dedicated attendants. Available only on select Tohoku and Hokuriku Shinkansen services. Treat this as a splurge — prices are significantly higher.",
  },
];

const jrPassPros = [
  "Multiple long-distance routes in one trip (e.g. Tokyo + Kyoto + Hiroshima + Osaka)",
  "Unlimited travel flexibility without budgeting per journey",
  "Also covers most JR local trains, buses, and the Narita Express",
  "Reservation of Hikari and Kodama seats at no extra charge",
];

const jrPassCons = [
  "Nozomi and Mizuho (the fastest Tokaido / Sanyo services) are excluded",
  "The 7-day Ordinary pass is ¥50,000 online (¥53,000 from an overseas agency) — more than a Tokyo–Kyoto–Hiroshima–Tokyo loop at smartEX prices",
  "A Nozomi ride on the pass needs a separate ticket: ¥4,960 Tokyo–Kyoto or Shin-Osaka, ¥6,500 Tokyo–Hiroshima",
  "Hikari takes about 3 hours Tokyo–Shin-Osaka against 2h 21m on the fastest Nozomi — a trade-off for pass users",
];

const buyingSteps = [
  {
    title: "Book online before you fly",
    desc: "Klook and the official JR website both allow advance seat reservation. Online booking opens months ahead — useful for Golden Week, summer holidays, and New Year.",
  },
  {
    title: "Buy at a Midori no Madoguchi (ticket office)",
    desc: "Every major JR station has a staffed ticket counter (みどりの窓口). English-speaking staff are available at large stations. You can book here on the day, but popular services fill quickly.",
  },
  {
    title: "Use a self-service ticket machine (券売機)",
    desc: "Most JR stations have self-service machines with English interfaces. Non-reserved tickets and same-day reserved seats can be purchased here. Accepts cash; some machines accept credit cards.",
  },
  {
    title: "Pass through the Shinkansen gate",
    desc: "Insert your paper ticket or pass into the gate — it returns automatically. A Suica or Pasmo balance does not pay a Shinkansen fare on its own; a smartEX booking boards with its QR ticket or with the IC card you link to it.",
  },
];

const firstTimerTips = [
  {
    title: "Book reserved seats early for peak dates",
    desc: "Shinkansen services fill up quickly on weekends, public holidays, and during peak seasons (Golden Week in late April–May, Obon in mid-August, New Year). Book as soon as your dates are confirmed.",
  },
  {
    title: "Sit in seat E for Mount Fuji views",
    desc: "Travelling from Tokyo toward Kyoto or Osaka on the Tokaido Shinkansen? Mount Fuji appears on the right side of the train, so ask for the E (window) seat when you reserve. It is best seen around Shin-Fuji station.",
  },
  {
    title: "Buy ekiben and drinks before boarding",
    desc: "Station bento boxes (ekiben) are one of Japan's great food traditions. Buy them in the station building or on the platform — the selection is better and you have more time to browse than on the train. Budget ¥800–¥1,500.",
  },
  {
    title: "Oversized luggage requires advance booking",
    desc: "Bags with a total dimension over 160cm (length + width + height) need a reserved seat with an oversized baggage area. It costs nothing extra, but those seats are limited per train, and boarding without one costs ¥1,000.",
  },
];

const faqItems = [
  {
    q: "How do I buy shinkansen tickets as a tourist?",
    a: "Book on JR's own smartEX site or app for the Tokaido, Sanyo and Kyushu lines (English, a registered credit card, QR-ticket boarding, ¥200 off every reserved seat), buy at a JR ticket office or machine at the station, or book on Klook before you fly. A reserved Nozomi seat from Tokyo costs ¥13,970 to Kyoto and ¥14,520 to Shin-Osaka on smartEX. Checked on smart-ex.jp, 17 Nov 2026.",
  },
  {
    q: "Can I buy shinkansen tickets on the day?",
    a: "Yes. smartEX sells seats until 4 minutes before departure, and stations sell reserved and non-reserved tickets on the day. Non-reserved seats need no booking, except that every Nozomi car is reserved-only in JR Central's peak periods (next: 21–23 Nov 2026, 25 Dec 2026 – 5 Jan 2027, 9–11 Jan and 20–22 Mar 2027). Book ahead for a large suitcase, a group or a fixed connection.",
  },
  {
    q: "Is the JR Pass still worth it in 2026?",
    a: "Only for several long legs in one week. The 7-day Ordinary pass is ¥50,000 online (¥53,000 from an overseas agency), and a Nozomi ride needs a ¥4,960 ticket (Tokyo–Kyoto or Shin-Osaka) or ¥6,500 (Tokyo–Hiroshima) on top. A Tokyo–Kyoto return is ¥27,940 and a Tokyo–Kyoto–Hiroshima–Tokyo loop ¥45,270 on smartEX's reserved Nozomi prices, both under the pass. Checked on japanrailpass.net and smart-ex.jp, 17 Nov 2026.",
  },
  {
    q: "Do I need to reserve oversized luggage space?",
    a: "Yes, if the bag's length + width + height is 161 to 250 cm. On the Tokaido, Sanyo and Kyushu Shinkansen you must reserve a seat with an oversized baggage area; it costs nothing extra, and boarding without one costs ¥1,000 including tax. Bags of 160 cm or less need no reservation, and anything over 250 cm cannot be carried on. Checked on JR Central's luggage page, 17 Nov 2026.",
  },
  {
    q: "How early should I book the shinkansen?",
    a: "smartEX opens at 5:30 one year before the travel date and confirms the seat after 8:00 one month before; station and other reserved-seat sales start at 10:00 one month before. On an ordinary weekday a few days ahead is usually enough; book as soon as sales open for New Year, the peak periods above, or a seat with an oversized baggage area, which is limited per train.",
  },
];

const TITLE = "How to Buy Shinkansen Tickets 2026: Shinkansen Guide";
const H1 = "Shinkansen Guide 2026: How to Buy Shinkansen Tickets, Prices & JR Pass";
const DESCRIPTION =
  "Shinkansen guide: how to buy shinkansen tickets on smartEX, at stations or on Klook. Tokyo–Kyoto ¥13,970, about 2h15. JR Pass from ¥50,000 vs single fares.";
const ROUTE = "/guides/transport/shinkansen-guide";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function LastChecked({ sources }: { sources: { label: string; href: string }[] }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      Last checked: {CHECKED}.{" "}
      {sources.map((src, i) => (
        <span key={src.href}>
          {i > 0 ? " · " : ""}
          <a href={src.href} target="_blank" rel="noopener noreferrer">
            {src.label}
          </a>
        </span>
      ))}
    </p>
  );
}

export default function ShinkansenGuidePage({ updated }: { updated: PageUpdated }) {
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
            __html: articleJsonLd({
              route: ROUTE,
              headline: H1,
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
                { "@type": "ListItem", position: 3, name: "Transport & Getting Around", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Shinkansen Guide", item: URL },
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
          <span className={styles.breadCurrent}>Shinkansen Guide</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Shinkansen Guide 2026: <br />How to Buy Shinkansen Tickets, Prices &amp; JR Pass
          </h1>
          <p className={styles.heroSubtitle}>
            Where to buy, what each main route costs on JR&apos;s own smartEX, whether the JR Pass pays,
            and when a seat has to be booked ahead.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "JR's own fares, dated", "How-to-buy table", "Big-luggage rules"].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our recommendations.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Lead paragraph: the whole answer, before anything else. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            To <strong>buy shinkansen tickets</strong> as a tourist, book on JR&apos;s own <strong>smartEX</strong>{" "}
            site or app (English, credit card, QR-ticket boarding, from one year ahead to 4 minutes before
            departure), at a JR ticket office or machine at the station, or on <strong>Klook</strong> before you
            fly. On smartEX a reserved Nozomi seat from Tokyo costs <strong>¥13,970 to Kyoto</strong> (about 2h 15m),{" "}
            <strong>¥14,520 to Shin-Osaka</strong> (2h 21m) and <strong>¥19,560 to Hiroshima</strong> (3h 39m). The
            7-day JR Pass is now <strong>¥50,000</strong> online and leaves out the Nozomi, so a Tokyo–Kyoto return
            (¥27,940) and even a Tokyo–Kyoto–Hiroshima–Tokyo loop (¥45,270) cost less as single tickets. Fares
            checked on smart-ex.jp and japanrailpass.net, 17 Nov 2026.
          </p>
        </section>

        {/* Quick Answer Box — main Klook shinkansen CTA */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest way to book</p>
                <p className={styles.verdictStatValue}>smartEX, ¥200 off reserved</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tokyo → Kyoto, Nozomi</p>
                <p className={styles.verdictStatValue}>About 2h 15m, ¥13,970</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>7-day JR Pass</p>
                <p className={styles.verdictStatValue}>¥50,000 online</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Suitcase over 160 cm</p>
                <p className={styles.verdictStatValue}>Reserve the seat, or pay ¥1,000</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>What an answer box cannot do for you:</strong> hold the seat. Every Nozomi car is reserved-only
              on 21–23 Nov, 25 Dec – 5 Jan, 9–11 Jan and 20–22 Mar, and seats with an oversized baggage area are
              limited per train — book those dates and bags first.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Book Tokyo → Kyoto Shinkansen on Klook →
              </KlookLink>
              <KlookLink href={shinkansenTokyoOsaka.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
                Tokyo → Osaka tickets on Klook →
              </KlookLink>
              <KlookLink
                href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264855&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1420-7-day-whole-japan-rail-pass-jr-pass%2F"
                className={styles.pickCta}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Check the JR Pass on Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          headingLevel={3}
          label="Book the same day"
          heading="What to Book for Your Arrival City the Same Day"
          intro="The Tokaido Shinkansen from Tokyo stops at Kyoto and ends at Shin-Osaka. Tours in Kyoto and Osaka, the hotel by the station, a Kansai pass and the eSIM are the bookings to settle while the train is open in the next tab."
          items={shinkansenGuideSameDayPrep}
        />

        <BookingEsimCard />

        <EsimCtaTop />

        {/* Q1 — how to buy */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>How Do I Buy Shinkansen Tickets as a Tourist?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Use smartEX for the Tokyo–Kyoto–Osaka–Hiroshima line: it is in English, takes ¥200 off every reserved
            seat and lets you change trains free until 4 minutes before departure. Buy at the station if you are
            already in Japan and flexible, and on Klook if you want the seat settled before you fly.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Way to buy", "Language", "Payment", "Seat choice", "Changes & refunds"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyRows.map((row) => (
                    <tr key={row.way}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.way}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.language}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.payment}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.seat}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[
              { label: "smartEX Service (JR Central / JR West / JR Kyushu)", href: "https://smart-ex.jp/en/product/plan/service/" },
              { label: "JAPAN RAIL PASS prices", href: "https://japanrailpass.net/en/purchase/price/" },
              { label: "NOZOMI/MIZUHO ticket for pass holders", href: "https://japanrailpass.net/en/use/special-ticket/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The station sale time (10:00 one month before) is from JR Central, read 12 Nov 2026. smartEX covers the
            Tokaido, Sanyo and Kyushu Shinkansen only; the Hokuriku and Tohoku lines are booked through JR East or
            JR West. No Klook price is printed here, because Klook&apos;s prices change by date.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo → Kyoto tickets on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Q2 — routes, time and fare */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price &amp; time</span>
          <h2 className={styles.sectionTitle}>How Much Is the Shinkansen and How Long Does It Take?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ¥14,520 and 2h 21m from Tokyo to Shin-Osaka on a reserved Nozomi seat booked on smartEX, the route most
            visitors ride first. The Hikari is a few hundred yen cheaper and slower, and it is the train a JR Pass
            covers without an extra ticket. Prices are one adult, regular season; reserved seats cost ¥200 more on
            peak dates, ¥400 more in the top season and ¥200 less off-peak.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Time", "Nozomi reserved (smartEX)", "Hikari reserved (smartEX)", "On a JR Pass?"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routeRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>
                        <Link href={row.href} style={{ color: "var(--red)", fontWeight: 600 }} title={row.anchor}>
                          {row.route}
                        </Link>
                      </td>
                      <td style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.nozomi}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.hikari}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.pass}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[
              { label: "smartEX price lists (reserved, “As of April 1, 2025”)", href: "https://smart-ex.jp/en/product/plan/service/pdf/service_fares_reserved.pdf" },
              { label: "JAPAN RAIL PASS NOZOMI/MIZUHO ticket", href: "https://japanrailpass.net/en/use/special-ticket/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Times and the Tokyo–Kanazawa fare come from each route guide, where the source and date are listed:
            the{" "}
            <Link href="/guides/transport/tokyo-to-osaka-shinkansen">Tokyo to Osaka shinkansen guide</Link>,{" "}
<Link href="/guides/transport/kyoto-to-tokyo-shinkansen">Kyoto to Tokyo train</Link> guide,{" "}
            <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen">Tokyo to Hiroshima shinkansen guide</Link>,{" "}
            <Link href="/guides/transport/tokyo-to-nagoya-shinkansen">Tokyo to Nagoya shinkansen guide</Link>,{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa">Tokyo to Kanazawa guide</Link> and{" "}
            <Link href="/guides/transport/osaka-to-hiroshima-shinkansen">Osaka to Hiroshima shinkansen guide</Link>.
            A non-reserved seat Tokyo–Kyoto is ¥13,320 on smartEX.
          </p>
        </section>

        {/* Q3 — luggage */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Luggage</span>
          <h2 className={styles.sectionTitle}>Do I Need to Reserve Oversized Luggage Space?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, if your suitcase measures 161 to 250 cm in length + width + height: on the Tokaido, Sanyo and
            Kyushu Shinkansen you must reserve a seat with an oversized baggage area. It costs nothing extra, but
            board without one and JR charges ¥1,000, and when those seats are gone the answer is another train — or
            sending the case ahead by courier, which our{" "}
            <Link href="/guides/transport/japan-luggage-delivery" style={{ color: "var(--red)", fontWeight: 600 }}>
              Japan luggage delivery
            </Link>{" "}
            guide prices by size.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Bag size (3 sides)", "Where it goes", "Reservation & cost"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {luggageRows.map((row) => (
                    <tr key={row.size}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.size}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.rule}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[
              { label: "JR Central luggage information", href: "https://global.jr-central.co.jp/en/info/oversized-baggage/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Ask for the seat by name at a ticket office, choose it on a reserved-seat machine, or pick it in smartEX.
            If you miss the reserved train, a non-reserved seat on a later train does not allow the oversized bag.
          </p>
        </section>

        {/* Q4 — on the day / how early */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>Can I Buy Shinkansen Tickets on the Day, and How Early Should I Book?</h2>
          <p className={styles.bodyText}>
            Yes on most days: smartEX sells until 4 minutes before departure and every station sells on the day.
            Book as soon as sales open — 5:30 one year ahead on smartEX, 10:00 one month ahead at stations — for
            the dates when every Nozomi car is reserved-only ({nozomiAllReservedPeriods.join("; ")}, as JR Central
            listed them on 12 Nov 2026), for a seat with an oversized baggage area, and for a group that wants to
            sit together.
          </p>
        </section>

        {/* What Is the Shinkansen? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is the Shinkansen?</h2>
          <p className={styles.bodyText}>
            The Shinkansen (新幹線) is Japan&apos;s high-speed rail network, operating since 1964.
            It connects Japan&apos;s major cities at speeds of up to 320 km/h — among the fastest commercial
            trains in the world. The network covers most of the main island of Honshu, with extensions
            into Kyushu and Hokkaido.
          </p>
          <p className={styles.bodyText}>
            What makes the Shinkansen remarkable isn&apos;t just speed: it&apos;s reliability.
            The average delay across the entire network is under one minute per departure.
            Trains depart and arrive to the second. For travellers used to European or American rail,
            it&apos;s a genuinely different experience.
          </p>
          <p className={styles.bodyText}>
            How a shinkansen fare compares with the subway, the airport trains and the highway bus is in the{" "}
            <Link href="/guides/transport" style={{ color: "var(--text)", fontWeight: 600 }}>Japan transportation guide</Link>,
            with a table of which rail pass suits which route.
          </p>
          <p className={styles.bodyText}>
            For most tourist itineraries — Tokyo to Kyoto, Kyoto to Hiroshima, Osaka to Fukuoka —
            the Shinkansen is faster door-to-door than flying, once you factor in airport travel and check-in.
            It also drops you directly into city centres rather than 40 minutes outside them. Even on the
            longest common leg, the{" "}
            <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo to Hiroshima shinkansen
            </Link>{" "}
            reaches Hiroshima Station within half an hour of the first flight plus its airport bus. For the
            return leg east, our{" "}
            <Link href="/guides/transport/kyoto-to-tokyo-shinkansen" style={{ color: "var(--red)", fontWeight: 600 }}>
              Kyoto to Tokyo train guide
            </Link>{" "}
            sets the Nozomi, Hikari and Kodama side by side and covers the Kyoto Station platforms.
          </p>
          <p className={styles.bodyText}>
            It is fast enough to turn some of those routes into day trips. Kansai to{" "}
            <Link href="/guides/attractions/hiroshima-miyajima-day-trip" style={{ color: "var(--red)", fontWeight: 600 }}>
              Hiroshima and Miyajima
            </Link>{" "}
            is around 90 minutes from Osaka and 100 to 120 from Kyoto, which makes both UNESCO sites
            reachable and back in a single day — with the Nozomi exclusion below deciding which train you
            board. The{" "}
            <Link href="/guides/transport/osaka-to-hiroshima-shinkansen" style={{ color: "var(--red)", fontWeight: 600 }}>
              Osaka to Hiroshima Shinkansen guide
            </Link>{" "}
            has the Shin-Osaka fares and the JR West pass that covers that leg.
          </p>
        </section>

        {/* Main Lines */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Network</span>
          <h2 className={styles.sectionTitle}>Main Shinkansen Lines</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Line", "Route", "Top Speed"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shinkansenLines.map((row) => (
                    <tr key={row.line}>
                      <td className={styles.tdProvider}>{row.line}</td>
                      <td className={styles.tdNetwork}>{row.route}</td>
                      <td className={styles.tdPrice}>{row.speed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            The Tokaido Shinkansen (Tokyo–Osaka) is the world&apos;s busiest high-speed rail corridor and the most useful line for most tourist itineraries.
            The Tohoku Shinkansen connects Tokyo to Sendai, Aomori, and — via the Hokkaido Shinkansen — Sapporo.
          </p>
        </section>

        {/* Ticket Types */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Ticket types</span>
          <h2 className={styles.sectionTitle}>Shinkansen Ticket Types Explained</h2>
          <div className={styles.stepsList}>
            {ticketTypes.map((type) => (
              <div key={type.rank} className={styles.stepCard}>
                <span className={styles.stepNum}>{type.rank}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{type.name}</p>
                  <p className={styles.stepDesc}>{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* JR Pass vs Individual Tickets */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>JR Pass</span>
          <h2 className={styles.sectionTitle}>Is the JR Pass Still Worth It in 2026?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.5rem" }}>
            Only for several long legs in the same week. The 7-day Ordinary pass is ¥50,000 online and ¥53,000
            from an overseas agency, while a Tokyo–Kyoto return is ¥27,940 and a Tokyo–Kyoto–Hiroshima–Tokyo loop
            ¥45,270 on smartEX&apos;s reserved Nozomi prices — and the pass needs a ¥4,960 or ¥6,500 ticket on top
            for each Nozomi ride. Checked on japanrailpass.net and smart-ex.jp, 17 Nov 2026.
          </p>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>JR Pass makes sense if…</p>
              <ul className={styles.pickList}>
                {jrPassPros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Buy individual tickets if…</p>
              <ul className={styles.pickList}>
                {jrPassCons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.5rem" }}>
            Add Kanazawa, Tohoku or a second Hiroshima trip and the sum can pass ¥50,000. Use the{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--red)", fontWeight: 600 }}>
              JR Pass price
            </Link>{" "}
            guide, with the October 2026 price rise, to price your own legs against the pass.
          </p>
        </section>

        {/* How to Buy */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>How to Buy Shinkansen Tickets, Step by Step</h2>
          <div className={styles.stepsList}>
            {buyingSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <KlookLink
            href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264855&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1420-7-day-whole-japan-rail-pass-jr-pass%2F"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Check the JR Pass on Klook →
          </KlookLink>
        </section>

        {/* Tips for First-Timers */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>First-timer tips</span>
          <h2 className={styles.sectionTitle}>Tips for First-Time Shinkansen Riders</h2>
          <div className={styles.stepsList}>
            {firstTimerTips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.title}</p>
                  <p className={styles.stepDesc}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Shinkansen Ticket Questions</h2>
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

        <EsimCtaBottom />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/transport/tokyo-to-osaka-shinkansen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Osaka Shinkansen: Times, Fares, JR Pass</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-to-tokyo-shinkansen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M12 5v12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto to Tokyo Shinkansen: Times, Fares, JR Pass</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-to-nagoya-shinkansen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M9 9h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Nagoya Shinkansen: Times, Fares, JR Pass</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M9 9h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Hiroshima Shinkansen 2026: Bullet Train Price, Time</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-to-hiroshima-shinkansen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M9 9h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka to Hiroshima Shinkansen (2026): Time and Price</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-to-kanazawa" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Kanazawa (2026): Kagayaki Times, Seats and Whether a Pass Pays</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/ghibli-park-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3c4 0 7 3 7 7 0 5-7 11-7 11S5 15 5 10c0-4 3-7 7-7z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Ghibli Park Tickets (2026): Prices, When They Go On Sale and How to Buy From Overseas</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/legoland-japan-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="9" width="16" height="11" rx="2" />
                  <path d="M8 9V6h8v3M9 13h.01M15 13h.01" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>LEGOLAND Japan Tickets (2026): Prices, Hours and Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="7" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Is It Worth It for Your Japan Trip?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <line x1="9" y1="3" x2="9" y2="10" />
                  <line x1="15" y1="3" x2="15" y2="10" />
                  <circle cx="8.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
                  <circle cx="15.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
                  <path d="M7 21l2-4" />
                  <path d="M17 21l-2-4" />
                  <line x1="7" y1="21" x2="17" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                  <line x1="9" y1="14" x2="9" y2="14" />
                  <line x1="12" y1="14" x2="12" y2="14" />
                  <line x1="15" y1="14" x2="15" y2="14" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>All Japan Transport Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-to-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Kyoto (2026): Cheapest &amp; Fastest Ways to Get There</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book your Shinkansen tickets now</h2>
            <p className={styles.ctaBannerDesc}>
              Reserve your seats before you fly — all Nozomi cars are reserved-only on peak dates, and oversized-baggage seats are limited per train.
            </p>
            <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
              Book Shinkansen Tickets on Klook →
            </KlookLink>{" "}
            <KlookLink
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264855&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1420-7-day-whole-japan-rail-pass-jr-pass%2F"
              className={styles.ctaBannerBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Check the JR Pass on Klook →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
