import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { osakaAmazingPass, osakaMetroPassTripPrep } from "../../../lib/klook-links";

const METRO_URL =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1267428&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F11515-osaka-metro-1-2-day-pass-osaka%2F";

/** Prices, fares, discounts and the Amazing Pass: read off the official pages on this date. */
const CHECKED = "4 November 2026";
/** Osaka Tourism Bureau wording and the 26h/48h end of sale: not re-read in the November pass. */
const EARLIER_CHECK = "20 October 2026";

const TITLE = "Osaka Metro Pass 2026: Osaka Subway Pass ¥820, Worth It?";
const DESCRIPTION =
  "Osaka Metro Pass and Osaka Subway Pass price: ¥820 weekdays, ¥620 weekends, ¥310 children, subway plus city buses. See if it's worth it, then book it.";

const OFFICIAL_ECO_URL = "https://subway.osakametro.co.jp/en/guide/page/enjoy-eco.php";
const OFFICIAL_MAP_URL = "https://subway.osakametro.co.jp/en/guide/routemap.php";
const OFFICIAL_DISCOUNTS_URL = "https://subway.osakametro.co.jp/guide/page/waribiki_ichiran.php";
const OFFICIAL_ZONES_URL = "https://subway.osakametro.co.jp/guide/libray/kusuuhyou/kusuuhyou20261001.pdf";

const ECO_WEEKDAY = 820;
const ECO_WEEKEND = 620;
const ECO_CHILD = 310;
const AMAZING_1_DAY = 3500;
const AMAZING_2_DAY = 5000;

const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;

/** The first whole number of rides whose single fares cost more than the pass. */
const ridesToBeat = (pass: number, fare: number) => Math.floor(pass / fare) + 1;

const priceRows = [
  {
    pass: "Enjoy Eco Card (1 day)",
    sub: "Magnetic card from station machines",
    weekday: yen(ECO_WEEKDAY),
    weekend: yen(ECO_WEEKEND),
    child: yen(ECO_CHILD),
    valid: "The one date printed at your first gate",
  },
  {
    pass: "Osaka Metro / Osaka City Bus 1-day Pass",
    sub: "The same ticket as a QR code",
    weekday: yen(ECO_WEEKDAY),
    weekend: yen(ECO_WEEKEND),
    child: yen(ECO_CHILD),
    valid: "The day you start it, within 30 days of buying",
  },
  {
    pass: "Yoh-okoshi 30h Pass",
    sub: "The nearest thing to a 2-day pass; no buses",
    weekday: "¥1,200",
    weekend: "¥1,200",
    child: "¥600",
    valid: "30 hours from the start, within 30 days of buying",
  },
];

/** Official ordinary fares by zone (ku), barrier-free fee included. */
const fareRows = [
  { zone: "1-ku", distance: "Up to 3 km", adult: 190, child: 100 },
  { zone: "2-ku", distance: "3–7 km", adult: 240, child: 120 },
  { zone: "3-ku", distance: "7–13 km", adult: 290, child: 150 },
  { zone: "4-ku", distance: "13–19 km", adult: 340, child: 170 },
  { zone: "5-ku", distance: "Over 19 km", adult: 390, child: 200 },
];

const discountRows = [
  { place: "Umeda Sky Building Floating Garden Observatory", deal: "10% off general admission" },
  { place: "Osaka Castle Main Tower", deal: "Adult ¥1,200 → ¥1,080" },
  { place: "Osaka Museum of History", deal: "Adult ¥600 → ¥540 (permanent exhibits)" },
  { place: "Tempozan Giant Ferris Wheel", deal: "¥1,000 → ¥900" },
  { place: "Santa Maria sightseeing cruise", deal: "Adult ¥2,000 → ¥1,600" },
  { place: "Harukas 300 observatory", deal: "10% off same-day admission" },
  { place: "Shitennoji main hall", deal: "Adult ¥500 → ¥400" },
];

const comparisonRows = [
  {
    label: "Price",
    eco: `${yen(ECO_WEEKDAY)} weekdays, ${yen(ECO_WEEKEND)} Sat, Sun & holidays`,
    oneDay: yen(AMAZING_1_DAY),
    twoDay: yen(AMAZING_2_DAY),
  },
  {
    label: "Children",
    eco: yen(ECO_CHILD),
    oneDay: "No child price; same as adults",
    twoDay: "No child price; same as adults",
  },
  {
    label: "Transport",
    eco: "Osaka Metro except Yumeshima Station, and Osaka City Bus (some routes excluded)",
    oneDay: "Osaka Metro, New Tram, Osaka City Bus (some routes excluded), plus Hankyu, Hanshin, Keihan, Kintetsu and Nankai trains mainly within Osaka City",
    twoDay: "The same as the 1-day pass, on two consecutive days",
  },
  {
    label: "Attraction entry",
    eco: "None included; discounts at about 20 spots",
    oneDay: "About 40 attractions included, each once",
    twoDay: "About 40 attractions included, each once across both days",
  },
  {
    label: "One day means",
    eco: "The date printed at your first gate",
    oneDay: "03:00 to 02:59 the next morning",
    twoDay: "Two consecutive days, each 03:00 to 02:59",
  },
  {
    label: "Where to buy",
    eco: "Osaka Metro stations",
    oneDay: "SURUTTO QRtto online, or the Kansai Tourist Information Center; a smartphone is required",
    twoDay: "SURUTTO QRtto online, or the Kansai Tourist Information Center; a smartphone is required",
  },
];

const vsRows = [
  { scenario: "One day, on a weekend or holiday", pick: "Enjoy Eco Card", note: `At ${yen(ECO_WEEKEND)} it pays for itself on the third ¥240 ride, and anyone can buy it at a station machine.` },
  { scenario: "One day, on a weekday",            pick: "Enjoy Eco Card", note: `${yen(ECO_WEEKDAY)} pays for itself on the fourth ¥240 ride, and it carries the same discounts as the digital 1-day pass.` },
  { scenario: "Travelling with children",         pick: "Enjoy Eco Card", note: `The child price is ${yen(ECO_CHILD)} every day of the week. The Osaka Amazing Pass has no child price at all.` },
  { scenario: "An afternoon arrival plus a full next day", pick: "Yoh-okoshi 30h Pass", note: "30 hours from your first tap covers a late start and the whole of the following day, which a calendar-day pass cannot." },
  { scenario: "A day built around paid sights", pick: "Osaka Amazing Pass", note: `${yen(AMAZING_1_DAY)} with about 40 attractions included. It costs ${yen(AMAZING_1_DAY - ECO_WEEKDAY)} more than a weekday Enjoy Eco Card, so add up your admissions first.` },
  { scenario: "Only 2–3 rides in a day",          pick: "ICOCA / Suica",  note: "Pay-as-you-go is cheaper than any day pass at this level of use." },
];

const passPoints = [
  {
    title: "The 26-hour and 48-hour tickets are gone",
    desc: `Most pages still quoting a ¥1,000 1-day or ¥1,800 2-day "Osaka Metro Pass" are describing the Osaka Metro 26-hour and 48-hour tickets. Osaka Metro ended sales of both on 30 September 2026. If you see those prices quoted for 2026 travel, the page is out of date. Checked ${EARLIER_CHECK}.`,
  },
  {
    title: "The Yoh-okoshi 30h Pass replaced them at ¥1,200",
    desc: `From 1 October 2026 Osaka Metro sells the Yoh-okoshi 30h Pass at ¥1,200 for adults and ¥600 for children, on sale until 30 September 2027. It runs for 30 hours from your first tap rather than to the last train, so an afternoon arrival still gets a full second day out of it. Checked ${CHECKED}.`,
  },
  {
    title: "It reaches Yumeshima, but it does not touch the buses",
    desc: `The 30h Pass covers all Osaka Metro lines including Yumeshima Station on the extended Chuo Line. The trade-off is that Osaka City Bus, the Imazato Liner and on-demand buses are all excluded — the 1-day pass is the one that includes buses. Checked ${CHECKED}.`,
  },
];

const faqItems = [
  {
    q: "How much is the Osaka Metro Pass?",
    a: "The 1-day Osaka Metro Pass costs ¥820 for adults on weekdays and ¥620 on Saturdays, Sundays and public holidays, with a child price of ¥310 on any day — that is the Enjoy Eco Card, sold either as a magnetic card or as a digital QR ticket. For longer coverage, the Yoh-okoshi 30h Pass is ¥1,200 for adults and ¥600 for children and runs 30 hours from your first tap. Osaka Metro ended sales of the older 26-hour (¥1,000) and 48-hour (¥1,800) tickets on 30 September 2026, so those prices are no longer current. Prices checked 4 November 2026 on subway.osakametro.co.jp.",
  },
  {
    q: "Is there an Osaka Metro pass for tourists?",
    a: "Not a tourist-only one for the plain 1-day ticket: the Enjoy Eco Card is sold to everyone at the same price, with no passport needed. Klook sells an Osaka Metro voucher for visitors, which is exchanged with your passport, and the Osaka Amazing Pass adds about 40 attractions for ¥3,500 a day. Checked 4 November 2026.",
  },
  {
    q: "Is it worth it to get an Osaka pass?",
    a: "Yes, if you will take four or more ¥240 rides on a weekday, or three at the weekend, on the ¥820 and ¥620 Enjoy Eco Card. The ¥3,500 Osaka Amazing Pass only makes sense if the admissions you would otherwise pay come to more than the ¥2,680 it costs over a weekday Enjoy Eco Card. For two or three rides, use an ICOCA instead. Prices checked 4 November 2026.",
  },
  {
    q: "Can I get a refund on the Osaka Metro Pass?",
    a: "Only if it is unused. Osaka Metro refunds an unused Enjoy Eco Card at the place of sale, less a ¥220 fee per ticket. The card cannot be shared: it is valid for one person, so each traveller needs their own. Checked 4 November 2026.",
  },
  {
    q: "Where do I pick up the Osaka Metro Pass?",
    a: "If you want the physical 1-day card, buy it on the spot at any Osaka Metro station — the ticket machines, the commuter pass sales offices and the station stands all sell it, so nothing needs collecting. The digital versions, including the Yoh-okoshi 30h Pass, are bought through the SURUTTO QRtto website or the e METRO app and arrive as a QR code with nothing to collect at all. If you book a voucher through a reseller such as Klook instead, you exchange it at an Osaka Metro ticket office or at the Kansai Tourist Information Center in Terminal 1 at Kansai International Airport, and you will be asked for your passport. Station and digital sales checked 4 November 2026; the Klook exchange details checked 20 October 2026.",
  },
  {
    q: "Does the Osaka Metro Pass cover Universal Studios Japan buses?",
    a: "No. Osaka Tourism Bureau lists buses bound for Universal Studios Japan among the routes excluded from the 1-day pass, alongside buses to IKEA Tsuruhama, airport buses and on-demand buses. The Yoh-okoshi 30h Pass excludes every bus route outright. Universal Studios Japan is reached by JR to Universal City Station, which no Osaka Metro pass covers, so budget that fare separately on an ICOCA. Checked 20 October 2026.",
  },
  {
    q: "Osaka Metro Pass or Enjoy Eco Card — which should tourists buy?",
    a: "For a single day there is nothing to choose between them, because the 1-day Osaka Metro Pass is the Enjoy Eco Card: same ¥820 weekday price, same ¥620 weekend price, same ¥310 child price. Buy the card at a station machine if you want to decide on the day, or the QR version if you would rather have it on your phone. The real decision is whether to step up to the ¥1,200 Yoh-okoshi 30h Pass, which is worth it when your sightseeing straddles two calendar days and you can live without the buses.",
  },
  {
    q: "How long is one day on the Osaka Metro Pass?",
    a: "It is a calendar day, not 24 hours. Osaka Tourism Bureau defines the 1-day pass as valid from the first service to the last service on the day you use it, and the 2-day version of a pass as valid from the first service on your first day to the last service the following day. An evening start therefore wastes most of a 1-day pass — which is the gap the 30-hour pass is designed to fill, since its clock starts when you do.",
  },
  {
    q: "Does the Osaka Metro Pass reach Yumeshima?",
    a: "The 1-day pass does not, but the 30-hour pass does. Osaka Metro excludes Yumeshima Station from the Enjoy Eco Card and the digital 1-day pass, because including it would mean repricing the ticket around the ¥90 surcharge on the Cosmosquare–Yumeshima section. With a 1-day pass you pay that section separately — ¥330 for a 2-ku adult ride including the surcharge. The Yoh-okoshi 30h Pass covers all Osaka Metro lines including Yumeshima Station. Coverage checked 4 November 2026; the surcharge figures checked 20 October 2026.",
  },
  {
    q: "Can I use ICOCA instead of a day pass?",
    a: "Yes, and for light days it is cheaper. An ICOCA (or a Suica from Tokyo — they are interchangeable) works on the Osaka Metro, JR, private railways and buses on a pay-as-you-go basis, and it is the only option that covers the JR run out to Universal Studios Japan. It is the better choice if you will only take two or three rides. A day pass wins once you are making four or more journeys.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/transport/osaka-metro-pass") } });

export default function OsakaMetroPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/osaka-metro-pass" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/osaka-metro-pass" />
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
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home",      item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",    item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Osaka Metro Pass", item: "https://www.japan-travel-kit.com/guides/transport/osaka-metro-pass" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/transport/osaka-metro-pass",
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
          <span className={styles.breadCurrent}>Osaka Metro Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Osaka Metro Pass 2026: Osaka Subway Pass<br />Price, Coverage &amp; Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            The 1-day pass is ¥820, or ¥620 at weekends. Here is what it covers, how many rides
            it takes to pay off, and when the Osaka Amazing Pass is the better buy.
          </p>
          <div className={styles.heroBadges}>
            {[`Prices checked ${CHECKED}`, "Official Sources", "Break-Even Maths"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* The answer, before anything else */}
        <p className={styles.bodyText}>
          The 1-day Osaka Metro pass, sold as the Enjoy Eco Card, costs <strong>¥820 for adults on weekdays, ¥620 on
          Saturdays, Sundays and holidays, and ¥310 for children</strong> (Osaka Metro&apos;s official prices, checked{" "}
          {CHECKED}). It gives unlimited rides on the Osaka subway, except Yumeshima Station, and on Osaka City Bus, and
          at the ¥240 fare for a 3–7 km trip it pays for itself on the fourth ride on a weekday or the third at the
          weekend. If you will also pay to enter sights, buy the Osaka Amazing Pass; if you only need the subway, buy the
          Enjoy Eco Card.
        </p>

        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>1-day price</p>
                <p className={styles.verdictStatValue}>¥820 / ¥620 weekends</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Two-day option</p>
                <p className={styles.verdictStatValue}>30h Pass, ¥1,200</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Child price</p>
                <p className={styles.verdictStatValue}>¥310 (1-day)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Bottom line:</strong> The 1-day <strong>Osaka Metro Pass is the Enjoy Eco Card</strong> — the same
              ticket at the same ¥820 weekday / ¥620 weekend price, sold as a card at station machines or as a QR code
              on your phone, with children at ¥310. There is no longer a 2-day version: Osaka Metro stopped selling the
              26-hour and 48-hour tickets on 30 September 2026 and replaced them with the{" "}
              <strong>Yoh-okoshi 30h Pass at ¥1,200</strong> (¥600 for children), which runs 30 hours from your first
              tap and covers Yumeshima but no buses. Buy the ¥620–820 1-day card for a single day; step up to the
              ¥1,200 30-hour pass when your sightseeing straddles two calendar days. Only taking two or three rides?
              Use a pay-as-you-go <strong>ICOCA</strong>.
            </p>
            <KlookLink
              href={METRO_URL}
              className={styles.verdictBtn}
              target="_blank"
              rel="sponsored noopener"
              style={{ marginTop: "1rem", display: "inline-block" }}
            >
              Check Osaka Metro Pass prices on Klook →
            </KlookLink>
            <p className={styles.bodyText} style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
              Prices and conditions checked {CHECKED} on subway.osakametro.co.jp and osaka-amazing-pass.com.
              For the full rundown on lines, hubs and IC cards, see our{" "}
              <Link href="/guides/transport/osaka-transportation" style={{ fontWeight: 600 }}>getting around Osaka guide</Link>.
            </p>
          </div>
        </div>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How Much Is the Osaka Metro Pass?</h2>
          <p className={styles.bodyText}>
            The 1-day pass is ¥820 for adults on weekdays, ¥620 on Saturdays, Sundays and holidays, and ¥310 for children.
            &quot;Osaka Metro Pass&quot; is a label travellers use rather than a product name, so these are the tickets
            actually on sale. The adult prices include a ¥20 station barrier-free fee, and a pass bought at the old ¥800
            or ¥600 price stays valid.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", padding: "0.6rem 0.75rem", fontSize: "0.82rem", color: "var(--text-muted)", textAlign: "left" }}>
                  Official Osaka Metro prices, checked {CHECKED}.
                </caption>
                <thead>
                  <tr>
                    {["Ticket", "Adult, weekdays", "Adult, Sat, Sun & holidays", "Child", "Valid for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>
                        {row.pass}
                        <span style={{ display: "block", fontWeight: 400, fontSize: "0.8rem", color: "var(--text-muted)" }}>
                          {row.sub}
                        </span>
                      </td>
                      <td>{row.weekday}</td>
                      <td>{row.weekend}</td>
                      <td>{row.child}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.valid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Source:{" "}
            <a href={OFFICIAL_ECO_URL} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>
              Osaka Metro&apos;s Enjoy Eco Card page
            </a>
            . Weekend pricing follows the calendar, not the train timetable.
          </p>
        </section>

        {/* Worth it */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>Is the Osaka Metro Pass Worth It?</h2>
          <p className={styles.bodyText}>
            Yes, once you take four ¥240 rides on a weekday or three at the weekend. Fares go by distance, so the table
            shows the ride on which the pass beats paying each time.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", padding: "0.6rem 0.75rem", fontSize: "0.82rem", color: "var(--text-muted)", textAlign: "left" }}>
                  Official ordinary fares including the barrier-free fee, checked {CHECKED}. Ride counts are our arithmetic.
                </caption>
                <thead>
                  <tr>
                    {["Zone", "Distance", "Adult fare", `Beats ${yen(ECO_WEEKDAY)} on ride`, `Beats ${yen(ECO_WEEKEND)} on ride`, "Child fare", `Beats ${yen(ECO_CHILD)} on ride`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.zone}>
                      <td className={styles.tdProvider}>{row.zone}</td>
                      <td>{row.distance}</td>
                      <td>{yen(row.adult)}</td>
                      <td>{ridesToBeat(ECO_WEEKDAY, row.adult)}</td>
                      <td>{ridesToBeat(ECO_WEEKEND, row.adult)}</td>
                      <td>{yen(row.child)}</td>
                      <td>{ridesToBeat(ECO_CHILD, row.child)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Umeda to Namba on the Midosuji Line is a 2-ku ride at ¥240, so a day that goes between the two and adds a
            couple of side trips clears the card. Check any other pair of stations in{" "}
            <a href={OFFICIAL_ZONES_URL} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>
              Osaka Metro&apos;s zone table
            </a>{" "}
            (PDF, in Japanese). Only taking two or three rides? Pay as you go on an ICOCA instead.
          </p>
        </section>

        {/* Tourists */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>For visitors</span>
          <h2 className={styles.sectionTitle}>Is There an Osaka Metro Pass for Tourists?</h2>
          <p className={styles.bodyText}>
            There is no tourist-only 1-day ticket to hunt for: the Enjoy Eco Card is sold to everyone at the same price,
            with no passport needed. Its digital twin, the Osaka Metro / Osaka City Bus 1-day Pass, costs the same and
            lives on your phone as a QR code. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            The products aimed at visitors are the Klook voucher, exchanged with your passport, and the Osaka Amazing
            Pass, which adds about 40 attractions to the rides. Both are covered below.
          </p>
        </section>

        {/* Discounts */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Discounts</span>
          <h2 className={styles.sectionTitle}>Which Sights Give a Discount With the Pass?</h2>
          <p className={styles.bodyText}>
            Show the card on the day it is valid for an admission discount at about 20 sightseeing spots in Osaka City.
            These are some of the best known, and our{" "}
            <Link href="/guides/attractions/things-to-do-osaka" style={{ fontWeight: 600 }}>
              things to do in Osaka
            </Link>{" "}
            guide covers which are worth the entry fee.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", padding: "0.6rem 0.75rem", fontSize: "0.82rem", color: "var(--text-muted)", textAlign: "left" }}>
                  From Osaka Metro&apos;s discount list, checked {CHECKED}. Discounts can change without notice.
                </caption>
                <thead>
                  <tr>
                    {["Sight", "Discount"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {discountRows.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider}>{row.place}</td>
                      <td>{row.deal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Full list:{" "}
            <a href={OFFICIAL_DISCOUNTS_URL} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>
              Osaka Metro&apos;s discount facilities
            </a>{" "}
            (in Japanese).
          </p>
        </section>

        {/* Amazing Pass comparison, then the booking slots */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compared</span>
          <h2 className={styles.sectionTitle}>Osaka Metro Pass or Osaka Amazing Pass?</h2>
          <p className={styles.bodyText}>
            Buy the Enjoy Eco Card for rides alone, and the Osaka Amazing Pass only if you will enter enough paid sights
            to cover the difference. The Amazing Pass is now {yen(AMAZING_1_DAY)} for one day and {yen(AMAZING_2_DAY)} for
            two, on sale until 31 March 2027. Older pages quoting ¥2,500 and ¥3,300 are out of date.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", padding: "0.6rem 0.75rem", fontSize: "0.82rem", color: "var(--text-muted)", textAlign: "left" }}>
                  From subway.osakametro.co.jp and osaka-amazing-pass.com, checked {CHECKED}.
                </caption>
                <thead>
                  <tr>
                    {["", "Enjoy Eco Card", "Amazing Pass, 1 day", "Amazing Pass, 2 days"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.label}>
                      <td className={styles.tdProvider}>{row.label}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.eco}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.oneDay}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.twoDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The sum to do: the 1-day Amazing Pass costs {yen(AMAZING_1_DAY - ECO_WEEKDAY)} more than a weekday Enjoy Eco
            Card, and {yen(AMAZING_1_DAY - ECO_WEEKEND)} more than a weekend one. The 2-day pass costs{" "}
            {yen(AMAZING_2_DAY - ECO_WEEKDAY * 2)} more than two weekday cards. If the admissions you would pay anyway come
            to more than that, take the Amazing Pass; if not, take the Enjoy Eco Card. Check the conditions first: on
            Osaka Amazing Pass&apos;s own list, Umeda Sky Building entry applies only until 15:00, with 10% off after that.
            Our{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={{ fontWeight: 600 }}>
              Osaka Amazing Pass guide
            </Link>{" "}
            goes through what is included.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem" }}>
            <KlookLink href={osakaAmazingPass.url} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              Check the Osaka Amazing Pass on Klook →
            </KlookLink>
            <KlookLink href={METRO_URL} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              Check Osaka Metro Pass prices on Klook →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book with the pass"
          heading="What to Book for the Same Day"
          intro="The pass sorts out the rides inside the city. These are what the rest of the day needs: lunch, a bed on the Midosuji Line, the airport train the pass does not cover, and data on your phone."
          items={osakaMetroPassTripPrep}
        />
        <p className={styles.bodyText}>
          No Osaka Metro pass covers the train in from Kansai Airport. To choose between the two airport trains by
          hotel station, see{" "}
          <Link href="/guides/transport/haruka-vs-nankai-rapit">Haruka vs Nankai Rapit</Link>.
        </p>

        {/* Osaka Metro Pass / 30h */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>The two-day question</span>
          <h2 className={styles.sectionTitle}>There Is No 2-Day Osaka Metro Pass Any More</h2>
          <div className={styles.stepsList}>
            {passPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <KlookLink
            href={METRO_URL}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Check Osaka Metro Pass prices on Klook →
          </KlookLink>
        </section>

        {/* How long is a day */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Validity</span>
          <h2 className={styles.sectionTitle}>How Long &quot;One Day&quot; Actually Lasts</h2>
          <p className={styles.bodyText}>
            This is the detail that catches people out. Osaka Tourism Bureau defines a 1-day pass as valid{" "}
            <strong>from the first service to the last service on the day you use it</strong> — not 24 hours from your
            first tap. Where a pass is sold in a two-day form, it runs from the first service on your first day of use
            to the last service the following day, and the two days have to be consecutive. Checked {EARLIER_CHECK}.
          </p>
          <p className={styles.bodyText}>
            On the physical Enjoy Eco Card, the date is printed on the card the moment you put it through a gate, and it
            is valid only for that printed date, with no expiry before then. On a bus, put the card through the slot as
            you get off. The digital 1-day pass behaves the same way but adds a purchase window: you have 30 days from
            buying it to start using it. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            The <strong>Yoh-okoshi 30h Pass</strong> is the exception, and the reason it is worth knowing about. Its
            30 hours count from your first tap, so a 4pm start on day one still leaves you covered until 10pm on day
            two. If you land at lunchtime and want to start sightseeing straight away — or you are building a trip
            around a{" "}
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" style={{ fontWeight: 600 }}>
              Kyoto and Nara day tour from Osaka
            </Link>{" "}
            with Osaka Metro rides at both ends of it — the rolling clock is worth the extra ¥380 over a weekday 1-day
            card.
          </p>
        </section>

        {/* What it does not cover */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Coverage</span>
          <h2 className={styles.sectionTitle}>What Does the Osaka Subway Pass Cover?</h2>
          <p className={styles.bodyText}>
            The 1-day pass covers every Osaka Metro line except Yumeshima Station, plus Osaka City Bus apart from a few
            named routes. For the coverage map, use{" "}
            <a href={OFFICIAL_MAP_URL} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>
              Osaka Metro&apos;s official route map
            </a>
            , which has a PDF download. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Osaka Tourism Bureau lists the excluded buses as those bound for{" "}
            <strong>IKEA Tsuruhama and Universal Studios Japan, airport buses and on-demand buses</strong>; Osaka Metro
            words it as buses bound for IKEA Tsuruhama and other specific routes set out in the Osaka City Bus
            regulations. Checked {EARLIER_CHECK}.
          </p>
          <p className={styles.bodyText}>
            Trains that run through onto the subway from Hankyu, Kita-Osaka Kyuko and Kintetsu are not covered beyond
            Osaka Metro: buy a ticket to the connecting station, and pay any fare outside the valid area at your exit
            station. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Universal Studios Japan is the exclusion that costs people money, because the park is reached by JR to
            Universal City Station rather than by Osaka Metro at all. No Osaka Metro pass covers that leg, so put it on
            an ICOCA and budget for it separately — our{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass" style={{ fontWeight: 600 }}>
              USJ tickets and Express Pass guide
            </Link>{" "}
            covers what the park day itself costs.
          </p>
          <p className={styles.bodyText}>
            <strong>Yumeshima Station</strong> is the other gap. Osaka Metro excludes it from the Enjoy Eco Card and the
            digital 1-day pass, because folding it in would mean repricing the ticket around the ¥90 surcharge on the
            Cosmosquare–Yumeshima section of the Chuo Line. With a 1-day pass you pay that section separately: ¥330 for a
            2-ku adult ride, surcharge included. The Yoh-okoshi 30h Pass does include Yumeshima, but excludes Osaka City
            Bus, the Imazato Liner and on-demand buses outright. Checked {EARLIER_CHECK}.
          </p>
        </section>

        {/* Which to use */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Which to use</span>
          <h2 className={styles.sectionTitle}>Which Pass Fits Your Trip?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your trip looks like", "Best choice", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vsRows.map((row) => (
                    <tr key={row.scenario}>
                      <td className={styles.tdProvider}>{row.scenario}</td>
                      <td style={{ fontWeight: 700, color: "var(--sumi)", whiteSpace: "nowrap" }}>{row.pick}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Where to buy */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to buy</span>
          <h2 className={styles.sectionTitle}>Where Can I Buy the Osaka Metro Pass?</h2>
          <p className={styles.bodyText}>
            Buy the <strong>Enjoy Eco Card</strong> at any Osaka Metro station, with no advance booking and nothing to
            collect: the ticket machines, the commuter pass sales offices and the station stands all sell it. Decide on
            the day, based on how much you plan to move around. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Each card is for one person and cannot be shared. Osaka Metro refunds an unused card at the place of sale,
            less a ¥220 fee per ticket; once it has been through a gate, it cannot be refunded. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            The <strong>digital 1-day pass</strong> and the <strong>Yoh-okoshi 30h Pass</strong> are sold through the
            SURUTTO QRtto website and the e METRO app, and arrive as a QR code you hold over the gate reader — again,
            nothing to pick up. The 30h Pass is on sale from 1 October 2026 until 30 September 2027.
          </p>
          <p className={styles.bodyText}>
            If you would rather pay in your own currency before you fly, resellers list a voucher version. Klook sells
            an Osaka Metro 1-day / 2-day tourist pass under activity 11515, and exchange happens at an Osaka Metro
            ticket office or at the Kansai Tourist Information Center in Terminal 1 at Kansai International Airport, with
            your passport. Because the underlying tickets changed on 1 October 2026, check on the product page which
            ticket and which price you are actually buying before you book.
          </p>
          <KlookLink
            href={METRO_URL}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
            style={{ marginTop: "0.5rem", display: "inline-block" }}
          >
            Check Osaka Metro Pass prices on Klook →
          </KlookLink>
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/osaka-castle-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 21V9l2-2 2 2V5l4-3 4 3v4l2-2 2 2v12z" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Castle Tickets (2026): Prices, Hours and What the Pass Covers</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/umeda-sky-building-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="6" width="5" height="15" />
                  <rect x="15" y="6" width="5" height="15" />
                  <path d="M4 6h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Umeda Sky Building Tickets (2026): Prices, Hours and the Best Time to Go</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 11V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
                  <path d="M4 11H2v5l2 2h16l2-2v-5H4Z" />
                  <circle cx="7.5" cy="16.5" r="1.5" />
                  <circle cx="16.5" cy="16.5" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Osaka (2026): Subway, Trains &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-attractions-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7h18v10H3z" />
                  <path d="M8 7v10M16 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Amazing Pass (2026): Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-2-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka 2 Day Itinerary (2026): Day by Day, and What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Kyoto 3 Day Itinerary (2026): Day by Day &amp; Bookings</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Osaka (2026): Best Areas, Compared by Line and Airport</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kansai-area-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7h18v10H3z" />
                  <path d="M8 7v10M16 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kansai Area Pass (2026): Prices, What It Covers and Whether It Pays</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Two days in Osaka?</h2>
            <p className={styles.ctaBannerDesc}>
              Compare the voucher price against the ¥1,200 Yoh-okoshi 30h Pass before you book, and check which ticket
              the listing covers.
            </p>
            <KlookLink href={METRO_URL} className={styles.ctaBannerBtn} target="_blank" rel="sponsored noopener">
              Check Osaka Metro Pass prices on Klook →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
