import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  ghibliParkNagoyaBusTour,
  ghibliParkTicket,
  ghibliParkTicketHotelPackage,
  ghibliParkTripPrep,
  nagoyaParkStayAreas,
  shinkansenNagoyaOsaka,
  shinkansenTokyoNagoya,
  shoryudoHighwayBusPass,
} from "../../../lib/klook-links";
import { gygGhibliPark, gygNagoyaEntryTickets } from "../../../lib/gyg-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Ghibli Park Tickets — rebuilt 12 Nov 2026 (task jtk-20261112-R04) around the
 * searches that land here: "ghibli park tickets", "ghibli park ticket sale date",
 * "how to buy ghibli park tickets", "ghibli park from nagoya".
 *
 * Sources checked on 12 Nov 2026:
 *   ghibli-park.jp/en/ticket/     the two O-Sanpo Day Passes and their weekday and
 *                                 weekend prices; ages; the sale rule (two months
 *                                 ahead, the 10th, 14:00 JST) and the January 2027
 *                                 release on 10 Nov 2026; LAWSON TICKET and Klook for
 *                                 overseas buyers; Sunrise Tours (JTB) hotel bundles;
 *                                 Grand Warehouse entry times; ID rule; no refunds;
 *                                 same-day building tickets and their prices
 *   ghibli-park.jp/ticket/        Boo-Woo Ticket online and Lawson / Ministop Loppi
 *                                 for domestic buyers; the Japanese pass names
 *   ghibli-park.jp/calendar/      hours and the Tuesday closure
 *   ghibli-park.jp/en/directions/ Linimo to Ai-Chikyuhaku Kinen Koen, Exit 2; the
 *   ghibli-park.jp/access/        Meitetsu direct bus (stop 24, 4F Meitetsu Bus
 *                                 Center; service counts; cashless)
 *
 * Carried from the 26 Oct 2026 read and dated as such on the page: Meitetsu's own
 * 40 minutes and ¥1,200 / ¥600 for the direct bus.
 * No Linimo journey time and no Klook or GetYourGuide price appear on this page.
 *
 * Re-read 19 Nov 2026 (task jtk-20261119-R07, title moved to "How to Buy ... Release Dates"):
 *   ghibli-park.jp/en/ticket/ and /ticket/  prices, sale rule and the January 2027 release
 *                                 unchanged; the Japanese page also lists area tickets
 *                                 (Satoyama Sanpo etc.) sold only through Boo-Woo Ticket
 *   ghibli-park.jp/en/directions/, /access/  bus stop, service counts, cashless trips unchanged
 *   linimo.jp fare table + the 1 Sep 2026 revision PDF  Fujigaoka → Ai-Chikyuhaku Kinen Koen
 *                                 ¥400 adult / ¥200 child in the revised table too
 *   kotsu.city.nagoya.jp          subway fares by distance ¥210–¥340 (adult); Higashiyama first
 *                                 train Nagoya 5:38 → Fujigaoka 6:05 (27 min). The Nagoya →
 *                                 Fujigaoka distance band was not published in a readable
 *                                 form, so no single subway fare is printed.
 *   Release months after January 2027 are the park's stated rule applied forward and are
 *   labelled that way; the park itself had announced only January 2027 on 19 Nov 2026.
 * Carried from sibling pages with their own dates: Tokyo → Nagoya 1h33m fastest NOZOMI (JR
 * Central, 18 Nov 2026) and smartEX ¥11,100 (28 Oct 2026); Nagoya ↔ Shin-Osaka 47 min and
 * ¥6,480 (14 Nov 2026); Nagoya Castle ¥1,000, 9:00–16:30 (14 Nov 2026); Aonami Line 24 min /
 * ¥360 (26 Oct 2026).
 */

/** Today's read of the park's own pages. */
const CHECKED_ISO = "2026-11-19";
const OWN = checkedLabel(CHECKED_ISO);
/** The earlier read of the Meitetsu bus figures. */
const OPERATOR = checkedLabel("2026-10-26");
const HOTEL_NAGOYA_URL = nagoyaParkStayAreas[0].url;

const officialLink = { color: "var(--text)", fontWeight: 600 } as const;

function LastChecked({ date = CHECKED_ISO, sources }: { date?: string; sources: { label: string; href: string }[] }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      Last checked: {date}. Official source{sources.length > 1 ? "s" : ""}:{" "}
      {sources.map((s, i) => (
        <span key={s.href}>
          {i > 0 ? ", " : ""}
          <a href={s.href} target="_blank" rel="noopener" style={officialLink}>
            {s.label}
          </a>
        </span>
      ))}
      .
    </p>
  );
}

const TICKET_PAGE = { label: "ghibli-park.jp/en/ticket/", href: "https://ghibli-park.jp/en/ticket/" };

/** Table 1 — the answer row first. */
const priceRows = [
  {
    pass: "O-Sanpo Day Pass Standard (most visitors)",
    covers: "Ghibli's Grand Warehouse, Mononoke Village and Valley of Witches",
    adult: "¥3,300 weekday / ¥3,800 weekend & holiday",
    child: "¥1,650 / ¥1,900",
  },
  {
    pass: "O-Sanpo Day Pass Premium",
    covers:
      "All five areas, plus the interiors of World Emporium, Satsuki and Mei's House, Okino Residence, Howl's Castle and The House of Witches",
    adult: "¥7,300 weekday / ¥7,800 weekend & holiday",
    child: "¥3,650 / ¥3,900",
  },
  {
    pass: "Same-day building tickets (Standard holders, inside Valley of Witches)",
    covers: "Howl's Castle ¥1,000; Okino Residence ¥400; The House of Witches ¥400",
    adult: "As listed",
    child: "¥500 / ¥200 / ¥200",
  },
  {
    pass: "Children aged 0–3",
    covers: "Free on both passes, and not counted as a party member",
    adult: "—",
    child: "Free",
  },
  {
    pass: "Area tickets, e.g. Satoyama Sanpo (Japan purchase only)",
    covers:
      "Listed only on the park's Japanese ticket page and sold through Boo-Woo Ticket; the English overseas page sells just the two day passes above",
    adult: "See the Japanese page",
    child: "—",
  },
];

/** Release months after January 2027 follow the park's stated rule; only January had been announced on 19 Nov 2026. */
const RULE_NOTE = "By the park's two-month rule; not yet announced on its ticket page";

/** Table 2 — the sale schedule, only what the park itself publishes. */
const saleRows = [
  {
    what: "Any month (the rule)",
    when: "The 10th of the month, two months before your visit month, at 14:00 Japan time (JST)",
    note: "One release per month: every date in that month opens at the same moment. The park notes sale dates may change",
  },
  {
    what: "January 2027 visits",
    when: "On sale since Tuesday 10 November 2026, 14:00 JST",
    note: "The release the park's ticket page lists on 19 Nov 2026",
  },
  {
    what: "February 2027 visits",
    when: "Thursday 10 December 2026, 14:00 JST",
    note: RULE_NOTE,
  },
  {
    what: "March 2027 visits",
    when: "Sunday 10 January 2027, 14:00 JST",
    note: RULE_NOTE,
  },
  {
    what: "April 2027 visits",
    when: "Wednesday 10 February 2027, 14:00 JST",
    note: RULE_NOTE,
  },
  {
    what: "Aichi Prefectural Residents' Day (27 Jan 2027)",
    when: "Lottery: applications 25–29 Oct 2026, results 5 Nov 2026",
    note: "Listed on the park's Japanese ticket page; a separate lottery, not the general sale",
  },
];

/** Table 3 — who sells the ticket. */
const sellerRows = [
  {
    seller: "LAWSON TICKET or Klook (overseas buyers)",
    how: "Online, in English; the two sellers the park's English ticket page names for buyers outside Japan",
  },
  {
    seller: "Boo-Woo Ticket, or Loppi in Lawson / Ministop (in Japan)",
    how: "The park's Japanese ticket page: Boo-Woo Ticket online, or the Loppi terminals in Lawson and Ministop stores",
  },
  {
    seller: "Ticket + hotel bundles",
    how: "The park lists accommodation bundles arranged by Sunrise Tours (JTB) and sold through JTB, Viator, KKday and other agencies",
  },
  {
    seller: "At the park",
    how: "Not possible: park tickets are not sold at any area entrance or inside the park",
  },
];

/** Table 4 — access, fastest first. */
const accessRows = [
  {
    route: "Meitetsu direct bus from Nagoya Station (fastest)",
    time: "40 min (operator figure)",
    fare: "¥1,200 adult / ¥600 child",
    catch:
      "From stop 24, 4th floor of the Meitetsu Bus Center. 9 weekday departures (7 non-stop) and 10 at weekends and holidays (all non-stop). Runs only on park opening days, and some trips are cashless only",
  },
  {
    route: "Higashiyama subway Nagoya → Fujigaoka, then the Linimo",
    time: "Subway 27 min on the first-train timetable (5:38 → 6:05); Linimo publishes no journey time",
    fare: "Subway ¥210–¥340 by distance + Linimo ¥400 adult / ¥200 child",
    catch: "Get off the Linimo at Ai-Chikyuhaku Kinen Koen; the park is immediately outside Exit 2",
  },
  {
    route: "From Tokyo or Osaka",
    time: "Tokaido Shinkansen to Nagoya, then one of the two above",
    fare: "See the shinkansen guide",
    catch: "A Tuesday arrival is a closed day, and the direct bus does not run on closed days either",
  },
];

/** Table 4 — the Nagoya trip around the park day. Figures carried from sibling pages with their own dates. */
const nagoyaRows = [
  {
    plan: "Best fit: one night at Nagoya Station",
    what: "Park day from the Meitetsu Bus Center (stop 24) — the shinkansen arrives in the same station",
    figure: "Bus 40 min / ¥1,200",
    guide: { href: "/guides/attractions/nagoya-2-day-itinerary", label: "Nagoya 2 day itinerary" },
  },
  {
    plan: "Day before or after: Nagoya Castle",
    what: "The rebuilt Hommaru Palace is open while the keep is closed; tickets at the gate",
    figure: "¥1,000 adult, 9:00–16:30 (checked 14 Nov 2026)",
    guide: { href: "/guides/attractions/nagoya-castle-tickets", label: "Nagoya Castle tickets" },
  },
  {
    plan: "Second park day: LEGOLAND Japan",
    what: "Aonami Line from Nagoya Station to Kinjofuto",
    figure: "24 min / ¥360 (checked 26 Oct 2026)",
    guide: { href: "/guides/attractions/legoland-japan-tickets", label: "LEGOLAND Japan tickets" },
  },
  {
    plan: "Arriving from Tokyo",
    what: "Tokaido Shinkansen NOZOMI to Nagoya",
    figure: "1h33m fastest (18 Nov 2026); smartEX ¥11,100 reserved (28 Oct 2026)",
    guide: { href: "/guides/transport/tokyo-to-nagoya-shinkansen", label: "Tokyo to Nagoya shinkansen" },
  },
  {
    plan: "To or from Osaka",
    what: "Tokaido Shinkansen NOZOMI between Nagoya and Shin-Osaka",
    figure: "Nagoya → Shin-Osaka 47 min fastest; smartEX ¥6,480 reserved (14 Nov 2026)",
    guide: { href: "/guides/transport/shinkansen-guide", label: "Shinkansen guide" },
  },
];

const faqItems = [
  {
    q: "How do I buy Ghibli Park tickets from overseas?",
    a: `Online from LAWSON TICKET or Klook, the two sellers Ghibli Park's English ticket page names for overseas buyers; inside Japan the park's Japanese page names Boo-Woo Ticket and the Loppi terminals in Lawson and Ministop. Tickets are not sold at the park. Book the date, the pass (Standard or Premium) and a Grand Warehouse entry time, and travel with the passport that matches the name on the booking: ID can be checked at random, buying for other people is prohibited, and there are no refunds or changes. Checked on ${OWN}.`,
  },
  {
    q: "When do Ghibli Park tickets go on sale?",
    a: `On the 10th of the month, two months before the month you want to visit, at 14:00 Japan time. January 2027 dates went on sale on Tuesday 10 November 2026 at 14:00 JST. It is one release per month, not a rolling daily one, and the park notes that sale dates may change. Checked on ${OWN}.`,
  },
  {
    q: "Which Ghibli Park ticket should I buy?",
    a: `Buy the Premium O-Sanpo Day Pass (¥7,300 weekday / ¥7,800 weekend for an adult) if you want to go inside Howl's Castle, Satsuki and Mei's House or the other building interiors, or to see Hill of Youth and Dondoko Forest at all. Buy the Standard pass (¥3,300 / ¥3,800) if Ghibli's Grand Warehouse, Mononoke Village and Valley of Witches are enough; Standard holders can add same-day tickets for three buildings inside Valley of Witches, but those are limited and first come, first served. Checked on ${OWN}.`,
  },
  {
    q: "How do you get to Ghibli Park from Nagoya?",
    a: `The fastest way is Meitetsu's direct bus from stop 24 on the 4th floor of the Meitetsu Bus Center at Nagoya Station: 40 minutes and ¥1,200 for an adult on the operator's own figures (checked ${OPERATOR}), running only on days the park is open. The rail route is the Higashiyama subway from Nagoya to Fujigaoka (27 minutes on the first-train timetable, fare ¥210–¥340 by distance), then the Linimo to Ai-Chikyuhaku Kinen Koen for ¥400, where the park is outside Exit 2. Checked on ${OWN}.`,
  },
  {
    q: "Can I visit Ghibli Park as a day trip from Tokyo or Osaka?",
    a: `From Osaka, yes: the fastest NOZOMI between Nagoya and Shin-Osaka takes 47 minutes, and the direct bus adds 40 minutes each way. From Tokyo it is possible but long — 1h33m on the fastest NOZOMI each way plus the bus — and a 9 a.m. Grand Warehouse slot means a very early train out of Tokyo, so a night in Nagoya is the easier plan from Tokyo. The park closes at 17:00 and every Tuesday, and the direct bus does not run on closed days. Rail times from JR Central's timetable (18 Nov 2026 for Tokyo, 14 Nov 2026 for Osaka).`,
  },
];

const TITLE = "Ghibli Park Tickets 2026: How to Buy, Prices & Release Dates";
const DESCRIPTION =
  "Ghibli Park tickets: Standard ¥3,300–¥3,800, Premium ¥7,300–¥7,800 (adult). On sale 2 months ahead on the 10th, 14:00 JST, via Klook or LAWSON TICKET.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/ghibli-park-tickets") } });

export default function GhibliParkTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/ghibli-park-tickets" />
        {hreflangLinks("/guides/attractions/ghibli-park-tickets")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/ghibli-park-tickets" />
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
              route: "/guides/attractions/ghibli-park-tickets",
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
                  name: "Ghibli Park Tickets",
                  item: "https://www.japan-travel-kit.com/guides/attractions/ghibli-park-tickets",
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Ghibli Park Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Ghibli Park Tickets 2026: <br />How to Buy, Prices &amp; Release Dates
          </h1>
          <p className={styles.heroSubtitle}>
            The Standard and Premium pass prices, the release date for each month, how to buy from overseas,
            and the way there from Nagoya Station.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Sale date & time"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Answer first */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Ghibli Park tickets for overseas visitors are two O-Sanpo Day Passes: Standard costs ¥3,300 on a
            weekday and ¥3,800 at a weekend for an adult (¥1,650 / ¥1,900 for ages 4–12), and Premium, which
            adds every building interior, costs ¥7,300 / ¥7,800 (¥3,650 / ¥3,900 for children), with under-4s
            free. Each month&apos;s dates go on sale online at 14:00 Japan time on the 10th, two months ahead —
            January 2027 opened on 10 November 2026 — and no tickets are sold at the park. From overseas, buy
            from LAWSON TICKET or Klook, the two sellers the park&apos;s English page names, or as a
            ticket-plus-hotel package arranged by Sunrise Tours (JTB) and sold through JTB, Viator, KKday and
            other agencies. Official figures, checked {OWN}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ghibliParkTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check Ghibli Park tickets on Klook →
            </KlookLink>
            <KlookLink href={ghibliParkNagoyaBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the bus tour from Nagoya →
            </KlookLink>
            <KlookLink href={HOTEL_NAGOYA_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check Nagoya Station hotels →
            </KlookLink>
            <KlookLink href={shinkansenTokyoNagoya.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check Tokyo → Nagoya shinkansen →
            </KlookLink>
          </div>
        </section>

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
                <p className={styles.verdictStatLabel}>Standard pass (adult)</p>
                <p className={styles.verdictStatValue}>¥3,300 / ¥3,800</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Premium pass (adult)</p>
                <p className={styles.verdictStatValue}>¥7,300 / ¥7,800</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>On sale</p>
                <p className={styles.verdictStatValue}>2 months ahead, 10th, 14:00 JST</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Gate sales</p>
                <p className={styles.verdictStatValue}>None at all</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> buy online from LAWSON TICKET or Klook — the two sellers the park
              names for overseas buyers — at 14:00 JST on the 10th, two months before your date. Weekday prices
              are the lower figure. Premium is the only pass that opens the building interiors, Hill of Youth
              and Dondoko Forest.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={ghibliParkNagoyaBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check the Nagoya Ghibli Park tour →
              </KlookLink>
              <KlookLink href={ghibliParkTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
                Check Ghibli Park tickets →
              </KlookLink>
              <GygCompareButton slug="ghibli-park-tickets" listing={gygGhibliPark} />
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How much are Ghibli Park tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>¥3,300 to ¥3,800 for an adult Standard pass and ¥7,300 to ¥7,800 for Premium</strong>, the
            lower figure on weekdays. Children aged 4 to 12 pay half, and under-4s are free.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "What it opens", "Adult", "Child (4–12)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.covers}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.child}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked sources={[TICKET_PAGE]} />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Prices include tax; the park states a service charge is added when the ticket is issued but gives
            no figure. No refunds and no changes to dates, times, ticket types or quantities, and reselling is
            prohibited. These sit alongside every other attraction in our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices">Japan attraction ticket prices table</Link>.
          </p>
        </section>

        {/* Sale dates */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Sale dates</span>
          <h2 className={styles.sectionTitle}>When do Ghibli Park tickets go on sale?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>At 14:00 Japan time on the 10th, two months before the month you want to visit.</strong>{" "}
            January 2027 dates opened on Tuesday 10 November 2026, and by the same rule February 2027 dates
            open on Thursday 10 December 2026; every date in a month opens at the same moment.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Release", "When", "Note"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {saleRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider}>{row.what}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[TICKET_PAGE, { label: "ghibli-park.jp/ticket/ (Japanese)", href: "https://ghibli-park.jp/ticket/" }]}
          />
          <p className={styles.bodyText}>
            <strong>What the sale rule does not tell you.</strong> The passes are date- and slot-specified with
            no gate sales, so a popular date is gone once its allocation is, and there is no later release to
            wait for. The same-day building tickets inside Valley of Witches are first come, first served, with
            exchange vouchers handed out from 10:00 (9:00 at weekends and holidays) and sales that can pause
            when it is crowded. If your date has gone, the ticket-plus-hotel package and the guided bus day
            from Nagoya are booked as separate listings — check them for your date before you move the trip.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ghibliParkTicketHotelPackage.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check the ticket + Nagoya hotel package →
            </KlookLink>
            <KlookLink href={ghibliParkNagoyaBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the Nagoya bus tour with park entry →
            </KlookLink>
            <GygCompareButton slug="ghibli-park-tickets" listing={gygNagoyaEntryTickets} label="Compare Nagoya tickets on GetYourGuide →" />
          </div>
        </section>

        {/* How to buy */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>How to buy</span>
          <h2 className={styles.sectionTitle}>How do I buy Ghibli Park tickets from overseas?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Online from LAWSON TICKET or Klook</strong>, the two sellers Ghibli Park&apos;s English
            ticket page names for buyers outside Japan. Pick the date, the pass and a Grand Warehouse entry
            time, in the name on your passport.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where", "How it works"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sellerRows.map((row) => (
                    <tr key={row.seller}>
                      <td className={styles.tdProvider}>{row.seller}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[TICKET_PAGE, { label: "ghibli-park.jp/ticket/ (Japanese)", href: "https://ghibli-park.jp/ticket/" }]}
          />
          <p className={styles.bodyText}>
            <strong>The rules that catch people out.</strong> Ghibli&apos;s Grand Warehouse has entry times
            of 9:00 (only on days the park opens at 9), 10, 11, 12, 13 and 14:00; you cannot enter early and
            must be inside within one hour of your slot. ID can be checked at random, the named ticket holder
            must be present, and buying for other people is prohibited — the park asks you to bring your
            passport. Tickets from auctions or other unofficial channels may be refused, and lost tickets are
            not reissued.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ghibliParkTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check Ghibli Park tickets on Klook →
            </KlookLink>
            <KlookLink href={ghibliParkTicketHotelPackage.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the ticket + Nagoya hotel package →
            </KlookLink>
            <GygCompareButton slug="ghibli-park-tickets" listing={gygGhibliPark} />
          </div>
        </section>

        <BookingEsimCard lead="Ghibli Park booked? Get mobile data before you land." />

        {/* Which pass */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Which pass</span>
          <h2 className={styles.sectionTitle}>Which Ghibli Park ticket should I buy?</h2>
          <p className={styles.bodyText}>
            <strong>Premium if you want to go inside the buildings; Standard if the Grand Warehouse is the
            point.</strong> Premium is the only pass that covers Hill of Youth and Dondoko Forest, and the
            interiors of World Emporium, Satsuki and Mei&apos;s House, Okino Residence, Howl&apos;s Castle and
            The House of Witches.
          </p>
          <p className={styles.bodyText}>
            Standard covers Ghibli&apos;s Grand Warehouse, Mononoke Village and Valley of Witches. Inside
            Valley of Witches, Standard holders can buy same-day tickets for Howl&apos;s Castle (¥1,000),
            Okino Residence (¥400) and The House of Witches (¥400), but the park states numbers are limited
            and they are first come, first served — so if Howl&apos;s Castle is the reason for the trip,
            Premium is the safer booking. Prices from the park&apos;s ticket page, checked {OWN}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ghibliParkTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check Standard and Premium on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How do you get to Ghibli Park from Nagoya?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Take Meitetsu&apos;s direct bus from Nagoya Station: 40 minutes and ¥1,200</strong> on the
            operator&apos;s own figures, on park opening days only. The rail alternative is the Higashiyama
            subway from Nagoya to Fujigaoka (27 minutes on the first-train timetable) and the Linimo (¥400) to
            Ai-Chikyuhaku Kinen Koen.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Time", "Fare", "What to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider}>{row.route}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.catch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[
              { label: "ghibli-park.jp/en/directions/", href: "https://ghibli-park.jp/en/directions/" },
              { label: "ghibli-park.jp/access/", href: "https://ghibli-park.jp/access/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The 40-minute time and ¥1,200 / ¥600 bus fare are Meitetsu Bus&apos;s own figures, last checked{" "}
            {OPERATOR} (meitetsu-bus.co.jp). The ¥400 / ¥200 Linimo fare is Aichi Rapid Transit&apos;s fare
            table, unchanged in its 1 September 2026 revision, and the subway&apos;s ¥210–¥340 distance fares and
            Higashiyama Line first-train times are the Nagoya City Transportation Bureau&apos;s, both checked{" "}
            {OWN} (
            <a href="https://www.linimo.jp/use/2018020913465509.html" target="_blank" rel="noopener" style={officialLink}>
              linimo.jp
            </a>
            ,{" "}
            <a href="https://www.kotsu.city.nagoya.jp/rp/subway/trp0000172.htm" target="_blank" rel="noopener" style={officialLink}>
              kotsu.city.nagoya.jp
            </a>
            ). Linimo publishes no journey time for its leg, so none is given here.
          </p>
          <p className={styles.bodyText}>
            Coming from Tokyo, the first leg is the Tokaido Shinkansen to Nagoya — our{" "}
            <Link href="/guides/transport/tokyo-to-nagoya-shinkansen">Tokyo to Nagoya shinkansen guide</Link>{" "}
            has the times, fares and whether a JR Pass pays, and the{" "}
            <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link> covers seats and luggage.
            Book the Ghibli date first, then the train.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoNagoya.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check Tokyo → Nagoya shinkansen tickets →
            </KlookLink>
            <KlookLink href={ghibliParkNagoyaBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the guided day from Nagoya →
            </KlookLink>
          </div>
        </section>

        {/* Nagoya trip around the park day */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Nagoya trip</span>
          <h2 className={styles.sectionTitle}>How do I fit Ghibli Park into a Nagoya trip?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Sleep at Nagoya Station and give the park its own day</strong>: the direct bus, the subway
            and the shinkansen all start there, and Nagoya Castle or LEGOLAND Japan fill the day either side.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Plan", "What it is", "Time / price", "Guide"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {nagoyaRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.what}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.figure}</td>
                      <td style={{ fontSize: "0.85rem" }}>
                        <Link href={row.guide.href}>{row.guide.label}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            date="2026-11-18 (Tokyo rail time; castle and Osaka rail 2026-11-14, Tokyo fare 2026-10-28, bus and Aonami Line 2026-10-26)"
            sources={[
              { label: "nagoyajo.city.nagoya.jp", href: "https://www.nagoyajo.city.nagoya.jp/en/" },
              { label: "smart-ex.jp", href: "https://smart-ex.jp/en/" },
              { label: "aonamiline.co.jp", href: "https://www.aonamiline.co.jp/" },
            ]}
          />
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HOTEL_NAGOYA_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check Nagoya Station hotels →
            </KlookLink>
            <KlookLink href={ghibliParkTicketHotelPackage.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the ticket + Nagoya hotel package →
            </KlookLink>
          </div>
        </section>

        {/* Day trip */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Day trip</span>
          <h2 className={styles.sectionTitle}>Can I visit Ghibli Park as a day trip from Tokyo or Osaka?</h2>
          <p className={styles.bodyText}>
            <strong>From Osaka, yes; from Tokyo, it is possible but a very long day.</strong> The fastest NOZOMI
            takes 47 minutes between Nagoya and Shin-Osaka and 1h33m from Tokyo, and the direct bus adds 40
            minutes each way on top.
          </p>
          <p className={styles.bodyText}>
            The ticket decides it more than the distance. A 9 a.m. Grand Warehouse slot exists only on 9 a.m.
            opening days and you must be inside within an hour of it, which from Tokyo means a very early train; the
            park closes at 17:00. A night at Nagoya Station turns that into a normal morning — and if the park is
            the only reason for the trip, the guided bus day from Nagoya removes the Linimo connection entirely.
            Rail times from JR Central&apos;s timetable as carried on our{" "}
            <Link href="/guides/transport/tokyo-to-nagoya-shinkansen">Tokyo to Nagoya shinkansen guide</Link> (18
            Nov 2026) and{" "}
            <Link href="/guides/attractions/nagoya-castle-tickets">Nagoya Castle guide</Link> (14 Nov 2026).
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoNagoya.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check Tokyo → Nagoya shinkansen →
            </KlookLink>
            <KlookLink href={shinkansenNagoyaOsaka.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check Nagoya → Osaka shinkansen →
            </KlookLink>
            <KlookLink href={ghibliParkNagoyaBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the guided day from Nagoya →
            </KlookLink>
          </div>
        </section>

        {/* Hours and closures */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Hours</span>
          <h2 className={styles.sectionTitle}>What time does Ghibli Park open, and when is it closed?</h2>
          <p className={styles.bodyText}>
            <strong>10:00 to 17:00 on weekdays, 9:00 to 17:00 at weekends and on public holidays</strong>, and
            closed <strong>every Tuesday</strong> — the following weekday when a Tuesday falls on a public
            holiday — plus the New Year period and designated maintenance days. The park&apos;s own calendar,
            checked {OWN}, notes that dates and hours can change.
          </p>
          <p className={styles.bodyText}>
            The 9:00 Grand Warehouse slot exists only on days the park opens at 9, which means weekends and
            holidays, and the Meitetsu direct bus does not run on closed days — so a Tuesday is no visit at
            all, not a quieter one.
          </p>
        </section>

        {/* Klook supporting block */}
        <KlookTripPrep
          label="Booked alongside"
          heading="What Else Does a Ghibli Park Day Need Booked?"
          intro="The ticket is only one of the bookings this day takes, and the other two are decided by your entry time: a 9 a.m. Grand Warehouse slot is a different morning from a 2 p.m. one, and the direct bus does not run on the days the park is shut."
          items={ghibliParkTripPrep}
        />

        <EsimCtaBottom />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Ghibli Park Tickets: Common Questions</h2>
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

        {/* Second seller */}
        <GygCompare
          slug="ghibli-park-tickets"
          heading="If Your Date Has Gone, Where Else Is It Sold?"
          intro="The park names two sellers for overseas buyers, and a date- and slot-specified pass with no gate sales is exactly the kind of ticket that disappears. GetYourGuide lists the Premium pass and the guided versions of the same day — it states on its own listing that tickets are limited and cannot be guaranteed at booking, which is the honest position for any reseller of this park."
          listings={[gygGhibliPark, gygNagoyaEntryTickets]}
        />

        {/* Klook tours */}
        <KlookTourPicks
          heading="The Rest of a Nagoya Trip"
          intro="Ghibli Park is a full day with a hard 17:00 close, which leaves the travel days around it open. These are the bookings that follow from that — a guided version of the park day itself, a night by the gates, and the regional pass if Chubu is more than one stop."
          tours={[ghibliParkNagoyaBusTour, ghibliParkTicketHotelPackage, shoryudoHighwayBusPass]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Fitting Ghibli Park into a longer trip: the{" "}
            <Link href="/guides/attractions/japan-10-day-itinerary">Japan 10 day itinerary</Link> passes
            through Nagoya on the Tokaido Shinkansen between Tokyo and Kyoto, and{" "}
            <Link href="/guides/attractions/things-to-do-tokyo">things to do in Tokyo</Link> covers the
            Tokyo end, including the Ghibli Museum in Mitaka. How the park&apos;s price and its no-gate-sales rule
            compare with Disney, teamLab and the Tokyo decks is in one table on our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices">Japan attraction ticket prices</Link> page.
          </p>
          <div className={styles.relatedGrid}>
            {/* Added 17 Nov 2026: the two-day Nagoya route this page is one day of. */}
            <Link href="/guides/attractions/nagoya-2-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nagoya 2 Day Itinerary (2026): Ghibli Park or LEGOLAND</p>
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
            <Link href="/guides/attractions/nagoya-castle-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nagoya Castle Tickets 2026: Price, Hours &amp; Can You Go Inside</p>
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
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 15V7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8" />
                  <path d="M4 15h16M7 19l-2 2M17 19l2 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide (2026): How to Book, Seat Classes and Luggage Rules</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-14-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 14 Day Itinerary (2026): Two Weeks, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-disney-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Disney Tickets (2026): Disneyland &amp; DisneySea — How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/sanrio-puroland-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sanrio Puroland Tickets 2026: Prices by Date &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-attraction-ticket-prices" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M3 12h18M3 18h12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Attraction Ticket Prices 2026: Official Prices and Booking Rules</p>
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
            <h2 className={styles.ctaBannerTitle}>Be ready at 14:00 JST on the 10th</h2>
            <p className={styles.ctaBannerDesc}>
              Two months ahead, one release, no gate sales. Decide Standard or Premium first, know which
              Grand Warehouse slot you want, and have the seller open before the hour.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={ghibliParkNagoyaBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Nagoya Ghibli Park tour →
              </KlookLink>
              <KlookLink href={ghibliParkTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
                View Ghibli Park tickets →
              </KlookLink>
              <GygCompareButton slug="ghibli-park-tickets" listing={gygGhibliPark} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
