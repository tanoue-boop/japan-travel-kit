import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { osakaAmazingPass, osakaMetroPassChooserPrep, osakaMetroPassTripPrep } from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

const METRO_URL =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1267428&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F11515-osaka-metro-1-2-day-pass-osaka%2F";

/** Prices, fares, discounts and the Amazing Pass: read off the official pages on this date. */
const CHECKED = "4 November 2026";
/** Osaka Tourism Bureau wording and the 26h/48h end of sale: not re-read in the November pass. */
const EARLIER_CHECK = "20 October 2026";
/**
 * Re-read on 20 Nov 2026: Enjoy Eco Card ¥820 / ¥620 / ¥310, ¥220 refund fee and exclusions
 * (subway.osakametro.co.jp/en/guide/page/enjoy-eco.php); the digital 1-day pass and the
 * Yoh-okoshi 30h Pass ¥1,200 / ¥600, Yumeshima included, no buses (digital_joshaken.php);
 * the 1–5 ku fares ¥190–¥390 (en/guide/fare/fare/price.php); the Amazing Pass ¥3,500 /
 * ¥5,000, no child pass, lines and counter sale (osaka-amazing-pass.com/en/); and the
 * sample-day legs on Osaka Metro's own route & fare search (kensaku.osakametro.co.jp):
 * Namba–Tanimachi 4-chome ¥240, Tanimachi 4-chome–Higashi-Umeda ¥240, Umeda–Tennoji ¥290,
 * Tennoji–Namba ¥240, Umeda–Namba ¥240, Namba–Osakako ¥290 (all adult, 2- or 3-ku).
 */
const PRICE_CHECKED = "20 November 2026";
const PRICE_CHECKED_ISO = "2026-11-20";

const TITLE = "Osaka Metro Pass 2026: 1-Day Pass Price & Is It Worth It?";
const DESCRIPTION =
  "Osaka Metro pass 2026: the 1-day pass (Enjoy Eco Card) is ¥820 weekdays, ¥620 weekends. Osaka subway pass vs Amazing Pass and ICOCA, with a day that pays.";

const OFFICIAL_ECO_URL = "https://subway.osakametro.co.jp/en/guide/page/enjoy-eco.php";
const OFFICIAL_AMAZING_URL = "https://osaka-amazing-pass.com/en/";
const OFFICIAL_DIGITAL_URL =
  "https://subway.osakametro.co.jp/guide/fare/category_digital_tickets/digital_tickets/digital_joshaken.php";
const OFFICIAL_FARES_URL = "https://subway.osakametro.co.jp/en/guide/fare/fare/price.php";
const OFFICIAL_ROUTE_SEARCH_URL = "https://kensaku.osakametro.co.jp/route/en/web/dia/";
const OFFICIAL_ICOCA_URL = "https://www.westjr.co.jp/global/en/howto/icoca/";
const OFFICIAL_MAP_URL = "https://subway.osakametro.co.jp/en/guide/routemap.php";
const OFFICIAL_DISCOUNTS_URL = "https://subway.osakametro.co.jp/guide/page/waribiki_ichiran.php";
const OFFICIAL_ZONES_URL = "https://subway.osakametro.co.jp/guide/libray/kusuuhyou/kusuuhyou20261001.pdf";

const ECO_WEEKDAY = 820;
const ECO_WEEKEND = 620;
const ECO_CHILD = 310;
const AMAZING_1_DAY = 3500;
const AMAZING_2_DAY = 5000;

/** The cheapest adult single fare (1-ku) and the fare for most central hops (2-ku). */
const FARE_1KU = 190;
const FARE_2KU = 240;

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
    label: "Buy it if",
    eco: `You mainly need rides: it pays off from the 4th ¥240 ride on a weekday, the 3rd at weekends`,
    oneDay: `The paid admissions you plan that day come to more than ${yen(AMAZING_1_DAY - ECO_WEEKDAY)} (the gap over a weekday Enjoy Eco Card)`,
    twoDay: `Two full sightseeing days whose admissions exceed ${yen(AMAZING_2_DAY - ECO_WEEKDAY * 2)} over two weekday cards`,
  },
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

/** The "which Osaka subway pass" table: one column per option, the verdict first. */
const chooserCols = ["Enjoy Eco Card (1-day pass)", "Osaka Amazing Pass", "Yoh-okoshi 30h Pass", "ICOCA (pay per ride)"];
const chooserRows: { label: string; cells: string[] }[] = [
  {
    label: "Verdict",
    cells: [
      `Best for most visitors: rides only, and it pays off from the ${ridesToBeat(ECO_WEEKDAY, FARE_2KU)}th ${yen(FARE_2KU)} ride on a weekday`,
      `Only for a day of paid sights worth more than the ${yen(AMAZING_1_DAY - ECO_WEEKDAY)} it costs over a weekday card`,
      "An afternoon arrival plus a full next day, if you can do without buses",
      "Two or three rides a day, and any day that includes JR",
    ],
  },
  {
    label: "Adult price",
    cells: [
      `${yen(ECO_WEEKDAY)} weekdays, ${yen(ECO_WEEKEND)} Sat, Sun & holidays (child ${yen(ECO_CHILD)})`,
      `${yen(AMAZING_1_DAY)} for 1 day, ${yen(AMAZING_2_DAY)} for 2 days (no child pass)`,
      "¥1,200 (child ¥600)",
      "No pass price: each ride is charged at the ordinary fare",
    ],
  },
  {
    label: "Where it works",
    cells: [
      "All Osaka Metro lines except Yumeshima Station, plus Osaka City Bus (some routes excluded); one calendar day",
      "Osaka Metro, Osaka City Bus (some routes excluded), New Tram, and Hankyu, Hanshin, Keihan, Kintetsu and Nankai trains mainly within Osaka City",
      "All Osaka Metro lines including Yumeshima, for 30 hours from first use; no Osaka City Bus",
      "Osaka Metro, JR and other railways and buses, pay-as-you-go",
    ],
  },
  {
    label: "Extras",
    cells: [
      "Discounts at more than 20 sightseeing spots in Osaka City",
      "About 40 attractions included, each once",
      "Rides only",
      "Also pays in shops that show the IC mark",
    ],
  },
  {
    label: "Where to buy",
    cells: [
      "Ticket machines at any Osaka Metro station; the QR version in the e METRO app",
      "SURUTTO QRtto online (smartphone needed), or the counter at the Kansai Tourist Information Center",
      "e METRO app or SURUTTO QRtto, then start it within 30 days",
      "Station ticket machines, or ICOCA on Apple Pay",
    ],
  },
];

/** Sample Osaka subway days, adult single fares from Osaka Metro's route & fare search. */
const routeRows = [
  {
    route: "Namba → Osaka Castle → Umeda → Tennoji → Namba",
    legs: "Namba–Tanimachi 4-chome ¥240, Tanimachi 4-chome–Higashi-Umeda ¥240, Umeda–Tennoji ¥290, Tennoji–Namba ¥240",
    total: 1010,
  },
  {
    route: "Namba → Osaka Castle → Umeda → Namba",
    legs: "Namba–Tanimachi 4-chome ¥240, Tanimachi 4-chome–Higashi-Umeda ¥240, Umeda–Namba ¥240",
    total: 720,
  },
  {
    route: "Namba → Osakako (Kaiyukan aquarium) → Namba",
    legs: "Namba–Osakako ¥290 each way",
    total: 580,
  },
];

const passVerdict = (total: number, pass: number) =>
  total > pass ? `Pass saves ${yen(total - pass)}` : total === pass ? "No difference" : `Pay per ride, ${yen(pass - total)} cheaper`;

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
    q: "How much is the Osaka Metro 1-day pass?",
    a: "The Osaka Metro 1-day pass, the Enjoy Eco Card, costs ¥820 for adults on weekdays and ¥620 on Saturdays, Sundays and public holidays, and ¥310 for children on any day. The adult prices include a ¥20 station barrier-free fee, and the QR-code version in the e METRO app costs the same. Osaka Metro ended sales of the old 26-hour (¥1,000) and 48-hour (¥1,800) tickets on 30 September 2026; the nearest longer option is the Yoh-okoshi 30h Pass at ¥1,200. Prices checked 20 November 2026 on subway.osakametro.co.jp.",
  },
  {
    q: "Is the Osaka Metro pass worth it?",
    a: "Yes, from the 4th ¥240 ride on a weekday or the 3rd at the weekend. With the cheapest fare at ¥190, it takes 5 rides on a weekday and 4 at the weekend. A day of Namba, Osaka Castle, Umeda and Tennoji costs ¥1,010 in single fares, so the ¥820 card saves ¥190 on a weekday and ¥390 at the weekend; a there-and-back trip to the Kaiyukan aquarium is ¥580, which is cheaper than either card. Fares checked 20 November 2026 on Osaka Metro's route and fare search.",
  },
  {
    q: "Enjoy Eco Card vs Osaka Amazing Pass: which should I buy?",
    a: "Buy the Enjoy Eco Card if the day is mostly rides, and the Osaka Amazing Pass only if the paid sights you will enter add up to more than the difference. The Amazing Pass is ¥3,500 for one day and ¥5,000 for two, with about 40 attractions included and no child price, so it costs ¥2,680 more than a weekday Enjoy Eco Card. It also covers Hankyu, Hanshin, Keihan, Kintetsu and Nankai trains mainly within Osaka City, which the Enjoy Eco Card does not. Checked 20 November 2026 on osaka-amazing-pass.com.",
  },
  {
    q: "Can I use the Osaka subway pass on JR lines?",
    a: "No. The Enjoy Eco Card covers Osaka Metro (except Yumeshima Station) and Osaka City Bus only, and JR is not among the Osaka Amazing Pass's participating lines either. JR trips such as the Osaka Loop Line or the ride to Universal City Station for Universal Studios Japan need a separate ticket or an ICOCA, and trains that run through from Hankyu, Kita-Osaka Kyuko or Kintetsu are charged beyond the Osaka Metro section. Checked 20 November 2026 on subway.osakametro.co.jp and osaka-amazing-pass.com.",
  },
  {
    q: "Where do I buy the Osaka Metro pass?",
    a: "At the ticket machines in any Osaka Metro station, on the day, with no passport and nothing to collect; the commuter pass sales offices and station stands sell it too. The QR-code version and the Yoh-okoshi 30h Pass are sold in the e METRO app and on SURUTTO QRtto and must be started within 30 days of purchase. A Klook voucher is exchanged at an Osaka Metro ticket office or the Kansai Tourist Information Center at Kansai Airport with your passport. Station and app sales checked 20 November 2026; the voucher exchange checked 20 October 2026.",
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
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
            Osaka Metro Pass 2026: 1-Day Pass Price &amp; Is It Worth It? <br />Enjoy Eco Card vs Amazing Pass, the Osaka Subway Pass Options Compared
          </h1>
          <p className={styles.heroSubtitle}>
            The Osaka subway pass for one day is the Enjoy Eco Card. Here is what it costs, how many rides it
            takes to pay off, and when the Osaka Amazing Pass, the 30-hour pass or an ICOCA is the better buy.
          </p>
          <div className={styles.heroBadges}>
            {[`Prices checked ${PRICE_CHECKED}`, "Official Sources", "Break-Even Maths"].map((t) => (
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
          The Osaka Metro 1-day pass, the Enjoy Eco Card, costs <strong>{yen(ECO_WEEKDAY)} for adults on weekdays and{" "}
          {yen(ECO_WEEKEND)} on Saturdays, Sundays and holidays</strong>, with children at {yen(ECO_CHILD)} (Osaka
          Metro&apos;s official prices, checked {PRICE_CHECKED}). With the cheapest single fare at {yen(FARE_1KU)}, the
          pass pays for itself on the {ridesToBeat(ECO_WEEKDAY, FARE_1KU)}th ride on a weekday or the{" "}
          {ridesToBeat(ECO_WEEKEND, FARE_1KU)}th at the weekend, and at the {yen(FARE_2KU)} fare most central hops cost,
          such as Umeda to Namba, on the {ridesToBeat(ECO_WEEKDAY, FARE_2KU)}th or {ridesToBeat(ECO_WEEKEND, FARE_2KU)}rd.
          Choose the Osaka Amazing Pass ({yen(AMAZING_1_DAY)} for one day, {yen(AMAZING_2_DAY)} for two, about 40
          attractions included) only if the sights you will pay to enter that day cost more than the{" "}
          {yen(AMAZING_1_DAY - ECO_WEEKDAY)} it adds over a weekday card; for two or three rides, an ICOCA is cheaper
          than either.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", margin: "0.25rem 0 1.5rem" }}>
          <KlookLink href={METRO_URL} className={styles.verdictBtn} target="_blank" rel="sponsored nofollow noopener">
            Check Osaka Metro Pass prices on Klook →
          </KlookLink>
          <KlookLink href={osakaAmazingPass.url} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
            Check the Osaka Amazing Pass on Klook →
          </KlookLink>
        </div>

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
              rel="sponsored nofollow noopener"
              style={{ marginTop: "1rem", display: "inline-block" }}
            >
              Check Osaka Metro Pass prices on Klook →
            </KlookLink>
            <p className={styles.bodyText} style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
              Enjoy Eco Card, 30h Pass and Amazing Pass prices checked {PRICE_CHECKED} on subway.osakametro.co.jp and
              osaka-amazing-pass.com; other conditions checked {CHECKED}. This page is about choosing a pass; for the
              lines, hubs and IC cards themselves, see our{" "}
              <Link href="/guides/transport/osaka-transportation" style={{ fontWeight: 600 }}>getting around Osaka guide</Link>.
            </p>
          </div>
        </div>

        {/* Which pass: the comparison table, then the booking block straight under it */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Which Osaka Subway Pass Should I Buy?</h2>
          <p className={styles.bodyText}>
            For most visitors, the {yen(ECO_WEEKDAY)} / {yen(ECO_WEEKEND)} Enjoy Eco Card: it is the cheapest unlimited
            Osaka subway pass and pays off from the {ridesToBeat(ECO_WEEKDAY, FARE_2KU)}th {yen(FARE_2KU)} ride on a
            weekday. The Amazing Pass is for sightseeing-heavy days, the 30h Pass for an afternoon arrival, and an ICOCA
            for light days or anything on JR.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th></th>
                    {chooserCols.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {chooserRows.map((row, i) => (
                    <tr key={row.label}>
                      <td className={styles.tdProvider}>{row.label}</td>
                      {row.cells.map((c, j) => (
                        <td key={j} style={{ fontSize: "0.85rem", fontWeight: i === 0 ? 700 : undefined }}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Last checked: {PRICE_CHECKED_ISO}. Sources:{" "}
            <a href={OFFICIAL_ECO_URL} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>Osaka Metro Enjoy Eco Card</a>,{" "}
            <a href={OFFICIAL_DIGITAL_URL} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>Osaka Metro digital tickets (30h Pass, in Japanese)</a>,{" "}
            <a href={OFFICIAL_AMAZING_URL} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>Osaka Amazing Pass official site</a>{" "}
            and{" "}
            <a href={OFFICIAL_ICOCA_URL} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>JR West ICOCA</a>.
          </p>
        </section>

        <KlookTripPrep
          label="Book the pass"
          heading="Book the Pass, Then the Rest of the Day"
          intro="The voucher and the Amazing Pass first, then what a pass day in Osaka still needs: a guided day over the same stops, the airport train no Osaka subway pass covers, and data for the fare search."
          items={osakaMetroPassChooserPrep}
        />

        {/* Sample day: single fares vs the pass */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Sample days</span>
          <h2 className={styles.sectionTitle}>Does a Typical Osaka Subway Day Beat the 1-Day Pass?</h2>
          <p className={styles.bodyText}>
            A four-stop day of Namba, Osaka Castle, Umeda and Tennoji costs {yen(routeRows[0].total)} in single fares,
            so the 1-day pass saves {yen(routeRows[0].total - ECO_WEEKDAY)} on a weekday and{" "}
            {yen(routeRows[0].total - ECO_WEEKEND)} at the weekend. Drop a stop or go out and back to one sight, and
            paying per ride can win.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Day", "Rides (adult single fares)", "Single fares total", `vs ${yen(ECO_WEEKDAY)} weekday pass`, `vs ${yen(ECO_WEEKEND)} weekend pass`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routeRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider}>{row.route}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.legs}</td>
                      <td>{yen(row.total)}</td>
                      <td>{passVerdict(row.total, ECO_WEEKDAY)}</td>
                      <td>{passVerdict(row.total, ECO_WEEKEND)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Last checked: {PRICE_CHECKED_ISO}. Fares from{" "}
            <a href={OFFICIAL_ROUTE_SEARCH_URL} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>
              Osaka Metro&apos;s route &amp; fare search
            </a>{" "}
            and{" "}
            <a href={OFFICIAL_FARES_URL} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>
              fare table
            </a>
            ; Osaka Castle is Tanimachi 4-chome Station. Admissions are extra on the Enjoy Eco Card — the castle day is
            priced in our{" "}
            <Link href="/guides/attractions/osaka-castle-tickets" style={{ fontWeight: 600 }}>Osaka Castle tickets</Link>{" "}
            guide, the aquarium in our{" "}
            <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets" style={{ fontWeight: 600 }}>Kaiyukan tickets</Link>{" "}
            guide.
          </p>
        </section>

        <EsimCtaTop />

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How Much Is the Osaka Metro 1-Day Pass?</h2>
          <p className={styles.bodyText}>
            The 1-day pass, the Enjoy Eco Card, is ¥820 for adults on weekdays, ¥620 on Saturdays, Sundays and holidays,
            and ¥310 for children. The QR-code version costs the same, and the cheapest step up to two days is the
            ¥1,200 Yoh-okoshi 30h Pass.
            &quot;Osaka Metro Pass&quot; is a label travellers use rather than a product name, so these are the tickets
            actually on sale. The adult prices include a ¥20 station barrier-free fee, and a pass bought at the old ¥800
            or ¥600 price stays valid.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", padding: "0.6rem 0.75rem", fontSize: "0.82rem", color: "var(--text-muted)", textAlign: "left" }}>
                  Official Osaka Metro prices for the Enjoy Eco Card, the digital 1-day pass and the 30h Pass, checked {PRICE_CHECKED}.
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
            Last checked: {PRICE_CHECKED_ISO}. Source:{" "}
            <a href={OFFICIAL_ECO_URL} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>
              Osaka Metro&apos;s Enjoy Eco Card page
            </a>
            . Weekend pricing follows the calendar, not the train timetable.
          </p>
          <KlookLink href={METRO_URL} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener" style={{ marginTop: "0.5rem", display: "inline-block" }}>
            Check Osaka Metro Pass prices on Klook →
          </KlookLink>
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
                  Official ordinary fares including the barrier-free fee, checked {PRICE_CHECKED}. Ride counts are our arithmetic.
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
            (PDF, in Japanese). Only taking two or three rides? Pay as you go on an ICOCA instead — where to buy one
            and how the deposit works is in our{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ fontWeight: 600 }}>IC card Japan</Link> guide.
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
          <h2 className={styles.sectionTitle}>Enjoy Eco Card vs Osaka Amazing Pass: Which Should I Buy?</h2>
          <p className={styles.bodyText}>
            Buy the Enjoy Eco Card for rides alone, and the Osaka Amazing Pass only if you will enter enough paid sights
            to cover the difference. The Amazing Pass is now {yen(AMAZING_1_DAY)} for one day and {yen(AMAZING_2_DAY)} for
            two, on sale until 31 March 2027. Older pages quoting ¥2,500 and ¥3,300 are out of date.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", padding: "0.6rem 0.75rem", fontSize: "0.82rem", color: "var(--text-muted)", textAlign: "left" }}>
                  From subway.osakametro.co.jp and osaka-amazing-pass.com. Prices checked {PRICE_CHECKED}; coverage and
                  where-to-buy checked {CHECKED}.
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
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Last checked: {PRICE_CHECKED_ISO}. Sources:{" "}
            <a href={OFFICIAL_ECO_URL} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>Osaka Metro Enjoy Eco Card</a>
            {" "}and{" "}
            <a href={OFFICIAL_AMAZING_URL} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>Osaka Amazing Pass official site</a>.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The sum to do: the 1-day Amazing Pass costs {yen(AMAZING_1_DAY - ECO_WEEKDAY)} more than a weekday Enjoy Eco
            Card, and {yen(AMAZING_1_DAY - ECO_WEEKEND)} more than a weekend one. The 2-day pass costs{" "}
            {yen(AMAZING_2_DAY - ECO_WEEKDAY * 2)} more than two weekday cards. If the admissions you would pay anyway come
            to more than that, take the Amazing Pass; if not, take the Enjoy Eco Card. Check the conditions first: on
            Osaka Amazing Pass&apos;s own list, Umeda Sky Building entry applies only until 15:00, with 10% off after that.
            Our{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={{ fontWeight: 600 }}>
              Osaka Amazing Pass
            </Link>{" "}
            guide goes through what is included.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem" }}>
            <KlookLink href={osakaAmazingPass.url} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              Check the Osaka Amazing Pass on Klook →
            </KlookLink>
            <KlookLink href={METRO_URL} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
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
          <h2 className={styles.sectionTitle}>Is There a 2-Day Osaka Metro Pass?</h2>
          <p className={styles.bodyText}>
            No longer: Osaka Metro stopped selling the 2-day (48-hour) ticket on 30 September 2026, and the nearest
            replacement is the ¥1,200 Yoh-okoshi 30h Pass (¥600 for children). For two full calendar days, two Enjoy
            Eco Cards cost ¥1,640 on weekdays or ¥1,240 at the weekend. Checked {CHECKED}.
          </p>
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
            rel="sponsored nofollow noopener"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Check Osaka Metro Pass prices on Klook →
          </KlookLink>
        </section>

        {/* How long is a day */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Validity</span>
          <h2 className={styles.sectionTitle}>How Long Does a 1-Day Osaka Metro Pass Last?</h2>
          <p className={styles.bodyText}>
            One calendar day, not 24 hours: the Enjoy Eco Card is valid from the first train to the last train on the
            date printed at your first gate. Osaka Tourism Bureau defines a 1-day pass as valid{" "}
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

        {/* JR */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>JR lines</span>
          <h2 className={styles.sectionTitle}>Can I Use the Osaka Subway Pass on JR Lines?</h2>
          <p className={styles.bodyText}>
            No. The Enjoy Eco Card and the 30h Pass are Osaka Metro tickets, and JR is not among the Osaka Amazing
            Pass&apos;s participating lines either, which list Osaka Metro, Osaka City Bus, the New Tram and the Hankyu,
            Hanshin, Keihan, Kintetsu and Nankai trains mainly within Osaka City. Checked {PRICE_CHECKED}.
          </p>
          <p className={styles.bodyText}>
            So the Osaka Loop Line, JR to Universal City and JR out to Kyoto, Nara or Kobe go on an ICOCA or a separate
            ticket. If most of a day is on JR, a JR West pass may be the better fit — see the{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={{ fontWeight: 600 }}>Kansai Area Pass guide</Link>.
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
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Leaving Osaka for Kyoto, Nara or Kobe on the same trip? No Osaka Metro pass reaches them; our{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={{ fontWeight: 600 }}>Kansai Area Pass guide</Link>{" "}
            works out whether a JR West regional pass pays for those days instead.
          </p>
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
            rel="sponsored nofollow noopener"
            style={{ marginTop: "0.5rem", display: "inline-block" }}
          >
            Check Osaka Metro Pass prices on Klook →
          </KlookLink>
        </section>

        <EsimCtaBottom />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Osaka Metro Pass: Common Questions</h2>
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
                <p className={styles.relatedTitle}>Where to Stay in Osaka 2026: Namba vs Umeda vs USJ, the Best Areas Compared</p>
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
            <KlookLink href={METRO_URL} className={styles.ctaBannerBtn} target="_blank" rel="sponsored nofollow noopener">
              Check Osaka Metro Pass prices on Klook →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
