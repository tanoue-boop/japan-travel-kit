import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import { shinkansenTokyoKyoto, tokyoToKyotoTripPrep } from "../../../lib/klook-links";

/**
 * Tokyo to Kyoto: how to make the journey, and what to book around it. Rebuilt on
 * 7 Nov 2026 (task-jtk-20261107-03) because a plain "Tokyo to Kyoto" answer ends
 * in the AI summary; which train, which seat and what to reserve in Kyoto does not.
 *
 * kyoto-to-tokyo-shinkansen covers the eastbound questions and
 * kyoto-day-trip-from-tokyo plans a day there and back. This page is the
 * comparison of ways to travel and links to both instead of repeating them.
 *
 * Read on 7 November 2026:
 *  - smartEX adult one-way prices, regular season, from the price lists smart-ex.jp
 *    links (dated 1 April 2025): reserved Nozomi ¥13,970, Hikari/Kodama ¥13,650;
 *    Green Nozomi ¥18,840, Hikari/Kodama ¥18,520; non-reserved ¥13,320. JR's
 *    16 Oct 2026 release still gives Tokyo–Shin-Osaka as ¥14,720 at the window,
 *    ¥200 over the same list, so the list has not moved.
 *  - From that release: the Nozomi reserved charge for Tokyo–Kyoto goes up ¥700 on
 *    purchases from 1 July 2027, non-reserved is unchanged, and Green charges go
 *    up from travel on 15 December 2027.
 *  - Journey times of about 2h15, 2h40 and 3h40 from JR Central Tours.
 *  - Bus fares from West JR Bus, bus times from the JR Bus Kanto timetable
 *    (revised 1 April 2025). Pass prices from japanrailpass.net.
 *
 * Two rows of the old table are gone. The ¥2,270 local-train fare could not be
 * confirmed from any JR page, nor could the journey time, and the rental-car row
 * had no official source. Willer is no longer named because its fares could not
 * be read. No Klook price appears, as Klook blocks automated reads.
 */

const CHECKED = checkedLabel("2026-11-07");

const NOZOMI_RESERVED = "¥13,970";
const HIKARI_RESERVED = "¥13,650";
const NON_RESERVED = "¥13,320";
const NOZOMI_GREEN = "¥18,840";
const HIKARI_GREEN = "¥18,520";
const NOZOMI_TICKET = "¥4,960";
const BUS_FROM = "¥2,500";
const ROUND_TRIP_NOZOMI = "¥27,940";
const ROUND_TRIP_HIKARI = "¥27,300";

const SMARTEX_SOURCE = `smartEX price lists (dated 1 April 2025), read ${CHECKED}`;

const optionsTable = [
  {
    option: "Nozomi Shinkansen",
    time: "About 2h 15min",
    price: `${NOZOMI_RESERVED} reserved`,
    best: "Most travellers: the fastest train and only ¥320 more than the Hikari",
    source: `Time: JR Central Tours. Fare: ${SMARTEX_SOURCE}`,
  },
  {
    option: "Hikari Shinkansen",
    time: "About 2h 40min",
    price: `${HIKARI_RESERVED} reserved`,
    best: "JR Pass holders, who ride it at no extra charge",
    source: `Time: JR Central Tours. Fare: ${SMARTEX_SOURCE}`,
  },
  {
    option: "Kodama Shinkansen",
    time: "About 3h 40min",
    price: `${HIKARI_RESERVED} reserved`,
    best: "Rarely worth it: same price as the Hikari, one hour slower",
    source: `Time: JR Central Tours. Fare: ${SMARTEX_SOURCE}`,
  },
  {
    option: "Night bus, 4-across seats (Seishun Eco Dream)",
    time: "About 7–8 hours",
    price: "¥3,300–¥12,500, or ¥2,500–¥2,900 on the limited Super Tokuwari fare",
    best: "The lowest fare, and it saves a night's hotel",
    source: `Fare: West JR Bus, read ${CHECKED}. Time: JR Bus Kanto timetable revised 1 April 2025`,
  },
  {
    option: "Night bus, 3-across seats (Grand Dream)",
    time: "About 7–8 hours",
    price: "¥5,000–¥14,500, or ¥4,400–¥14,000 on the limited Tokuwari fare",
    best: "Night travel with more room",
    source: `Fare: West JR Bus, read ${CHECKED}. Time: JR Bus Kanto timetable revised 1 April 2025`,
  },
];

/** Shinkansen fares by seat. The non-reserved fare is the same on every train. */
const seatTable = [
  { seat: "Non-reserved", nozomi: NON_RESERVED, hikari: NON_RESERVED, note: "No guaranteed seat" },
  { seat: "Reserved Ordinary", nozomi: NOZOMI_RESERVED, hikari: HIKARI_RESERVED, note: "Your own seat on a named train" },
  { seat: "Green Car", nozomi: NOZOMI_GREEN, hikari: HIKARI_GREEN, note: "Reserved only, with a wider seat" },
];

const passTable = [
  { days: "7 days", agent: "¥53,000", site: "¥50,000" },
  { days: "14 days", agent: "¥84,000", site: "¥80,000" },
  { days: "21 days", agent: "¥105,000", site: "¥100,000" },
];

/** Still to come, from JR Central's list of periods running to March 2027. */
const nozomiAllReservedPeriods = [
  "21–23 November 2026",
  "25 December 2026 – 5 January 2027",
  "9–11 January 2027",
  "20–22 March 2027",
];

const faqItems = [
  {
    q: "What is the cheapest way from Tokyo to Kyoto?",
    a: `The overnight highway bus. West JR Bus lists its limited Super Tokuwari fare at ¥2,500–¥2,900 on the 4-across Seishun Eco Dream, and its ordinary fares on that bus at ¥3,300–¥12,500, depending on the date. Read on ${CHECKED}. The low fares are limited in number and cannot be changed after purchase.`,
  },
  {
    q: "Can I use the JR Pass on the Shinkansen to Kyoto?",
    a: `Yes, on the Hikari and Kodama at no extra charge. The pass alone is not valid on the Nozomi. A pass holder can ride one by buying a special ticket, which is ${NOZOMI_TICKET} for Tokyo to Kyoto, one ticket per ride, and it can only be bought in Japan.`,
  },
  {
    q: "How long does the Shinkansen take from Tokyo to Kyoto?",
    a: "About 2 hours 15 minutes on the Nozomi, about 2 hours 40 minutes on the Hikari and about 3 hours 40 minutes on the Kodama, according to JR Central Tours. All three run on the same Tokaido Shinkansen line with no transfer.",
  },
  {
    q: "Is the Nozomi faster than the Hikari?",
    a: `Yes, by about 25 minutes, because it makes fewer stops. On smartEX a reserved seat is ${NOZOMI_RESERVED} on the Nozomi and ${HIKARI_RESERVED} on the Hikari, a ¥320 difference. The Nozomi is not covered by the JR Pass without the special ticket.`,
  },
  {
    q: "Can I take a night bus from Tokyo to Kyoto?",
    a: "Yes. The Dream buses run by JR Bus Kanto and West JR Bus leave Tokyo Station at night and reach Kyoto Station's Karasuma side early the next morning. On the timetable revised on 1 April 2025, the Tokyo–Kyoto journey took about 7 to 8 hours, with arrivals between 05:16 and 07:02. Times change, so check your date before booking.",
  },
  {
    q: "Can I buy Shinkansen tickets with a foreign credit card?",
    a: "Yes, on smartEX, which takes bookings from inside and outside Japan. It accepts Visa, Mastercard, JCB, American Express, Diners Club and Discover. Your card must work with 3-D Secure, and debit or prepaid cards may be refused by the issuer. Your card company may add a foreign transaction fee.",
  },
  {
    q: "How far in advance can I book the Shinkansen from Tokyo to Kyoto?",
    a: "smartEX sells seats from 5:30 am one year before the boarding date, up to 4 minutes before departure. JR Pass holders can reserve from 10:00 am one month before the train leaves.",
  },
  {
    q: "Is the Tokyo to Kyoto Shinkansen price going up?",
    a: "Yes, for reserved Nozomi seats. JR Central and JR West said on 16 October 2026 that the Tokyo–Kyoto reserved charge will rise by ¥700 on tickets bought from 1 July 2027. The non-reserved charge does not change. Green Car charges rise for travel from 15 December 2027.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/transport/tokyo-to-kyoto") } });

export default function TokyoToKyotoPage({ updated }: { updated: PageUpdated }) {
  const metaTitle = "Tokyo to Kyoto 2026: Shinkansen Price, Time and Cheapest Way";
  const metaDescription =
    "Tokyo to Kyoto Shinkansen Price: ¥13,970 reserved on a Nozomi, about 2h15. Night bus from ¥2,500. Why the ¥53,000 JR Pass loses, and what to book next.";
  const canonical = "https://www.japan-travel-kit.com/guides/transport/tokyo-to-kyoto";

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:url" content={canonical} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport & Getting Around", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Tokyo to Kyoto", item: "https://www.japan-travel-kit.com/guides/transport/tokyo-to-kyoto" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/transport/tokyo-to-kyoto",
              headline: metaTitle,
              description: metaDescription,
              updated,
            }),
          }}
        />
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
          <span className={styles.breadCurrent}>Tokyo to Kyoto</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Tokyo to Kyoto 2026:<br />Shinkansen Price, Time and the Cheapest Way
          </h1>
          <p className={styles.heroSubtitle}>
            Which train and seat to book, when to reserve, and what to line up before you reach Kyoto.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Dated JR and bus fares", "Mt. Fuji seat", "What to book"].map((t) => (
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
            This doesn&apos;t affect our advice or rankings.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>Tokyo → Kyoto</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Fastest</p>
                <p className={styles.verdictStatValue}>Nozomi, about 2h 15min, {NOZOMI_RESERVED}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest</p>
                <p className={styles.verdictStatValue}>Night bus, from {BUS_FROM}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Pass</p>
                <p className={styles.verdictStatValue}>7 days ¥53,000: not for a round trip alone</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              <strong>Tokyo to Kyoto</strong> takes <strong>about 2 hours 15 minutes</strong> on a Nozomi
              Shinkansen, and a reserved seat is <strong>{NOZOMI_RESERVED}</strong> one way on JR&apos;s
              smartEX service (adult, regular season, read on {CHECKED}). The cheapest way is the overnight
              highway bus, <strong>from {BUS_FROM}</strong> on West JR Bus&apos;s limited lowest fare. A 7-day
              JR Pass is <strong>¥53,000</strong> from an overseas agent, so it does not pay for a Tokyo–Kyoto
              round trip alone, which is {ROUND_TRIP_NOZOMI} on smartEX.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Tokyo → Kyoto tickets →
              </KlookLink>
              <KlookLink
                href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264855&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1420-7-day-whole-japan-rail-pass-jr-pass%2F"
                className={styles.verdictBtn}
                target="_blank"
                rel="sponsored noopener"
              >
                Check JR Pass prices on Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>What is the best way to get from Tokyo to Kyoto?</h2>
          <p className={styles.bodyText}>
            For most people it is a reserved seat on the Nozomi: the fastest train, no transfer, and only ¥320
            more than the Hikari. Take the Hikari if you hold a JR Pass, and the night bus if the fare matters
            more than a night&apos;s sleep. All prices are one way for one adult, read on {CHECKED}.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Time", "Price", "Best For", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {optionsTable.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td className={styles.ftEsim}>{row.time}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td className={styles.tdBestFor}>{row.best}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change, so confirm before buying. Local trains and rental cars are not listed because
            no operator figure for this route could be confirmed.
          </p>
        </section>

        <KlookTripPrep
          label="Book ahead"
          heading="What to Book for Tokyo to Kyoto"
          intro="Start with the train, then the hotel at the other end. The tours and eSIM are the bookings that shape your first days in Kyoto."
          items={tokyoToKyotoTripPrep}
        />

        {/* Shinkansen fares */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Shinkansen fares</span>
          <h2 className={styles.sectionTitle}>How much is the Shinkansen from Tokyo to Kyoto?</h2>
          <p className={styles.bodyText}>
            On smartEX, <strong>{NOZOMI_RESERVED}</strong> for a reserved Nozomi seat and{" "}
            <strong>{HIKARI_RESERVED}</strong> on the Hikari or Kodama. Off-peak dates take ¥200 off a reserved
            or Green seat, peak dates add ¥200 and the busiest dates add ¥400.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Seat", "Nozomi", "Hikari / Kodama", "What you get"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seatTable.map((row) => (
                    <tr key={row.seat}>
                      <td className={styles.tdProvider}>{row.seat}</td>
                      <td className={styles.tdPrice}>{row.nozomi}</td>
                      <td className={styles.tdPrice}>{row.hikari}</td>
                      <td className={styles.tdBestFor}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Adult, one way, regular season. Source: {SMARTEX_SOURCE}.
          </p>
          <p className={styles.bodyText}>
            Tickets from a station window cost a little more. On Tokyo–Shin-Osaka, JR gives ¥14,720 for a
            reserved Nozomi seat against ¥14,520 on smartEX, so allow about ¥200 extra for Kyoto. JR does not
            publish a Tokyo–Kyoto window fare in a readable table, so none is printed here.
          </p>
          <p className={styles.bodyText}>
            <strong>Prices change in 2027.</strong> JR Central and JR West announced on 16 October 2026 that
            the reserved Nozomi charge for Tokyo–Kyoto will rise by ¥700 on tickets bought from 1 July 2027.
            Non-reserved stays the same, and Green Car charges rise for travel from 15 December 2027.
          </p>
          <p className={styles.bodyText}>
            <strong>Foreign cards on smartEX.</strong> smartEX accepts Visa, Mastercard, JCB, American Express,
            Diners Club and Discover, and you can book from outside Japan. The card must work with 3-D Secure,
            and debit or prepaid cards may be refused. If yours will not register, Klook sells the same route
            by date and seat class.
          </p>
          <p className={styles.bodyText}>
            Going further along the line? Our{" "}
            <Link href="/guides/transport/tokyo-to-osaka-shinkansen">Tokyo to Osaka Shinkansen guide</Link>{" "}
            covers the next stop, and the{" "}
            <Link href="/guides/transport/kyoto-to-tokyo-shinkansen">Kyoto to Tokyo Shinkansen guide</Link>{" "}
            covers the trip back.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Pick a train and seat on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Reservations */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Reservations</span>
          <h2 className={styles.sectionTitle}>Do I need to reserve Shinkansen seats from Tokyo to Kyoto?</h2>
          <p className={styles.bodyText}>
            Not on most days, but we suggest you do. Klook&apos;s route page showed 433 trains on 13 November
            2026, from 06:00 to 21:31, so a later train is rarely far away. A reserved seat costs{" "}
            {NOZOMI_RESERVED}, only ¥650 more than non-reserved on the Nozomi, and JR Central&apos;s own advice
            is to book one if you want a guaranteed seat.
          </p>
          <p className={styles.bodyText}>
            On the dates below, it is not a choice. Every Nozomi car is reserved, and only the Hikari and Kodama
            keep non-reserved cars, which JR Central warns may be overcrowded. Read on {CHECKED}:
          </p>
          <ul className={styles.bodyList}>
            {nozomiAllReservedPeriods.map((period) => (
              <li key={period}><strong>{period}</strong></li>
            ))}
          </ul>
          <p className={styles.bodyText}>
            On other days, the non-reserved cars are 1–2 on the Nozomi, 1–5 on the Hikari, and 1–6 and 13–16 on
            the Kodama, though JR Central says these may change. Oversized bags need a reserved seat with a
            baggage area, which our <Link href="/guides/transport/kyoto-to-tokyo-shinkansen">Kyoto to Tokyo
            guide</Link> explains.
          </p>
        </section>

        {/* JR Pass on the Nozomi */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>JR Pass rules</span>
          <h2 className={styles.sectionTitle}>Can I use the JR Pass on the Nozomi?</h2>
          <p className={styles.bodyText}>
            Not with the pass alone. JR says the pass is not valid for any seat on the Nozomi or Mizuho, so use
            the Hikari or Kodama, which it covers. Reserving a seat on those trains costs nothing extra.
          </p>
          <p className={styles.bodyText}>
            If you want the Nozomi, buy the special ticket for pass holders. For Tokyo or Shinagawa to Kyoto it
            is <strong>{NOZOMI_TICKET}</strong>, the same for Green, reserved and non-reserved seats, and you
            need one for each ride. It goes on sale one month before travel and can only be bought in Japan, at
            JR machines, ticket offices and some travel agencies. Read on {CHECKED}.
          </p>
        </section>

        {/* JR Pass worth it */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Pass Maths</span>
          <h2 className={styles.sectionTitle}>Is the JR Pass Worth It for Tokyo–Kyoto?</h2>
          <p className={styles.bodyText}>
            No, not for a Tokyo–Kyoto round trip on its own. Two reserved seats cost {ROUND_TRIP_NOZOMI} on the
            Nozomi or {ROUND_TRIP_HIKARI} on the Hikari on smartEX, well under the cheapest pass.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ordinary pass", "Overseas agent", "Official website"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passTable.map((row) => (
                    <tr key={row.days}>
                      <td className={styles.tdProvider}>{row.days}</td>
                      <td className={styles.tdPrice}>{row.agent}</td>
                      <td className={styles.tdPrice}>{row.site}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Adult prices from japanrailpass.net, read on {CHECKED}. The overseas agent price applies to an
            Exchange Order.
          </p>
          <p className={styles.bodyText}>
            The pass starts to pay when the same week adds much more rail travel, such as Hiroshima or Kanazawa.
            Our <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> works out the break-even for
            your own route.
          </p>
          <KlookLink
            href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264855&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1420-7-day-whole-japan-rail-pass-jr-pass%2F"
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
            style={{ marginTop: "0.5rem", display: "inline-flex" }}
          >
            Get the JR Pass on Klook →
          </KlookLink>
        </section>

        {/* Highway bus */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Budget Option</span>
          <h2 className={styles.sectionTitle}>What is the cheapest way from Tokyo to Kyoto?</h2>
          <p className={styles.bodyText}>
            The overnight highway bus, from <strong>{BUS_FROM}</strong>. That is West JR Bus&apos;s Super Tokuwari
            fare on the 4-across Seishun Eco Dream. Seats at that fare are limited, it is for adults only, and
            you cannot change it after buying. The ordinary fare on the same bus is ¥3,300–¥12,500, depending on
            the date.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Who runs it:</strong> JR Bus Kanto and West JR Bus, sold through Kousoku Bus Net</li>
            <li><strong>Seats:</strong> 4-across on Seishun Eco Dream, or 3-across on Grand Dream from ¥5,000 (¥4,400 on the limited fare)</li>
            <li><strong>Daytime buses:</strong> West JR Bus lists these from ¥2,700</li>
            <li><strong>When tickets go on sale:</strong> usually from 10:00 one month and one day before travel</li>
          </ul>
          <p className={styles.bodyText}>
            On the JR Bus Kanto timetable revised on 1 April 2025, buses left Tokyo Station between 21:50 and
            23:20 and reached Kyoto Station&apos;s Karasuma side between 05:16 and 07:02, about 7 to 8 hours later.
            Your hotel will probably not let you in that early, so plan where to leave your bags. Fares were
            read from West JR Bus on {CHECKED}.
          </p>
        </section>

        {/* Mt. Fuji */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The view</span>
          <h2 className={styles.sectionTitle}>Which side of the Shinkansen has the Mt. Fuji view?</h2>
          <p className={styles.bodyText}>
            The right side going from Tokyo to Kyoto. JR Central&apos;s advice is to choose{" "}
            <strong>Seat E in Standard Class or Seat D in Green Class</strong>, and its Mt. Fuji page places the
            mountain on the right. JR Central also says Mt. Fuji may not be visible, depending on the weather.
            Read on {CHECKED}. You need a reserved seat to pick the letter, so non-reserved will not get you
            this view for sure.
          </p>
        </section>

        {/* What to book */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you arrive</span>
          <h2 className={styles.sectionTitle}>What should I book before arriving in Kyoto?</h2>
          <p className={styles.bodyText}>
            Your train and first hotel, then any tour with a fixed start time. A Nozomi from Tokyo gets you to
            Kyoto about 2 hours 15 minutes later, so a morning departure leaves the afternoon free. After a night
            bus, keep the first morning light.
          </p>
          <p className={styles.bodyText}>
            To choose a base, see <Link href="/guides/attractions/where-to-stay-in-kyoto">where to stay in
            Kyoto</Link>. Our <Link href="/guides/attractions/kyoto-3-day-itinerary">3-day Kyoto itinerary</Link>{" "}
            shows how to order the sights, and{" "}
            <Link href="/guides/transport/kyoto-transportation">getting around Kyoto</Link> covers the buses and
            trains. Only have one day? This page compares ways to travel, while our{" "}
            <Link href="/guides/attractions/kyoto-day-trip-from-tokyo">Kyoto day trip from Tokyo</Link> plans the
            sightseeing.
          </p>
        </section>

        <KlookTripPrep
          label="Your first days"
          heading="Bookings for Your First Days in Kyoto"
          intro="The same short list, in the order most trips need it: train, hotel, guided days, then data."
          items={tokyoToKyotoTripPrep}
        />

        {/* Tips */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Travel Tips</span>
          <h2 className={styles.sectionTitle}>Tips for the Tokyo–Kyoto Journey</h2>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" /><path d="M9 9v.01M9 12v.01M9 15v.01" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Kyoto Station has two sides</p>
              <p className={styles.whoForDesc}>
                JR&apos;s night buses stop on the Karasuma side, while the shinkansen gates are on the Hachijo
                side. Check which side your hotel is on before you set off with your bags.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Send luggage ahead</p>
              <p className={styles.whoForDesc}>
                Use a takkyubin (宅急便) courier to forward large bags from your Tokyo hotel to Kyoto a day
                ahead. You&apos;ll travel light and avoid dragging suitcases through busy stations.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>IC cards don&apos;t cover the Shinkansen</p>
              <p className={styles.whoForDesc}>
                A Suica or Pasmo won&apos;t pay for the bullet train — you need a separate Shinkansen ticket.
                Buy at a machine, ticket office, or online before you travel.
              </p>
            </div>
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

        {/* Related Articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related Guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 5 Nov 2026: this journey there and back in one day. */}
            <Link href="/guides/attractions/kyoto-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto Day Trip from Tokyo: Train, Cost &amp; Plan (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 5 Nov 2026: this journey as Day 4 of a five-day trip. */}
            <Link href="/guides/attractions/japan-5-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 5 Day Itinerary: Tokyo and Kyoto, Day by Day (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto to Tokyo Shinkansen: Times, Fares, JR Pass</p>
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
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Kyoto Osaka Itinerary (2026): 7 Days in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-14-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 10h18M5 10V7l7-4 7 4v3" />
                  <path d="M6 10v10M18 10v10M3 20h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto and Nara Day Tour From Osaka (2026): Which Itinerary to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M6 15h4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" /><path d="M4 11h16M8 21l2-4M16 21l-2-4" /><circle cx="8.5" cy="14" r="0.5" fill="currentColor" /><circle cx="15.5" cy="14" r="0.5" fill="currentColor" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide 2026: Tickets, Passes &amp; Tips</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Compare Japan Transport Options</p>
                <span className={styles.relatedArrow}>View comparison →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-subway-bus-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="16" rx="2" />
                  <path d="M4 11h16M8 19l-1 2M16 19l1 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Is the Kyoto Subway &amp; Bus 1-Day Pass Worth It? (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Planning your Japan rail trip?</h2>
            <p className={styles.ctaBannerDesc}>
              Compare the JR Pass against individual tickets and see whether it pays off for your
              itinerary — with 2026 prices and real route examples.
            </p>
            <Link href="/guides/transport/jr-pass-guide" className={styles.ctaBannerBtn}>
              Read the JR Pass Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
