import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  iseFutamiBusTourOsaka,
  iseShrineOkageGuidedTour,
  jrKansaiAreaPass,
  kintetsuRailPass,
  klookEsim,
  kyotoNaraKiyomizuTour,
  naraHotels,
  osakaStayAreas,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * ---------------------------------------------------------------------------
 * /guides/transport/kintetsu-rail-pass — written 4 Nov 2026
 *
 * Sourcing, all read on 4 November 2026:
 *
 *   - kintetsu.co.jp/foreign/english/ticket/ and its krp_1day, krp_2day, krp_5day,
 *     krp_5dayplus, get, conditions and eticket pages, plus /faq/ — prices, age
 *     rules, zones, buses, limited express rule, activation, 180-day start rule.
 *   - kintetsu.co.jp/railway/Dia/pdf/price_limited_express_{a,b,c,d,e}.pdf — basic
 *     fares and limited express charges between limited express stops. These PDFs
 *     were produced in 2023, so they were cross-checked against
 *     kintetsu.co.jp/gyoumu/kippu/pdf/kirotei_20260314.pdf, Kintetsu's fare table
 *     as of 14 March 2026. Its distance bands agree with the PDF fares we print
 *     (¥680 for 31–35 km, ¥760 for 36–40 km, ¥2,170 for 131–140 km), and no fare
 *     revision after 2023 could be found.
 *
 * Carried from our own pages with their dates: WEST QR Kansai Area Pass prices
 * (kansai-area-pass) and the Kyoto–Nara journey times (japan-first-time-itinerary).
 *
 * Deliberately absent: bus fares, which is why the 5day Plus has no break-even
 * row, and any JR single fare to Nara, which no operator page we read prints.
 * No Klook price appears.
 * ---------------------------------------------------------------------------
 */

const CHECKED = checkedLabel("2026-11-04");
const KANSAI_CHECKED = checkedLabel("2026-11-03");

const ROUTE = "/guides/transport/kintetsu-rail-pass";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const TITLE = "Kintetsu Rail Pass (2026): Prices and Is It Worth It?";
const DESCRIPTION =
  "Kintetsu Rail Pass prices for 2026: ¥1,900 for 1 day, ¥3,700 for 2, ¥4,900 for 5, ¥6,700 for 5day Plus. What it covers and which trips pay it back.";

/** Table 1 — the four passes. */
const priceRows = [
  {
    pass: "1day",
    adult: "¥1,900",
    child: "¥950",
    valid: "The date of use",
    zone: "Osaka-Namba–Kintetsu-Nara, Kyoto–Tsutsui, Nagata–Ikoma, Toriimae–Ikomasanjo",
    bus: "Nara Kotsu: Nara Park, Nishinokyo, Horyuji",
  },
  {
    pass: "2day",
    adult: "¥3,700",
    child: "¥1,850",
    valid: "2 consecutive days",
    zone: "All Kintetsu lines in Osaka, Nara and Kyoto prefectures",
    bus: "Nara Kotsu: the above plus Asuka, Muro and Yamanobe-no-Michi",
  },
  {
    pass: "5day",
    adult: "¥4,900",
    child: "¥2,450",
    valid: "5 consecutive days",
    zone: "All Kintetsu lines plus the Iga Tetsudo line, so Nagoya, Ise and Shima too",
    bus: "None",
  },
  {
    pass: "5day Plus",
    adult: "¥6,700",
    child: "¥3,350",
    valid: "5 consecutive days",
    zone: "All Kintetsu lines plus the Iga Tetsudo line",
    bus: "Nara Kotsu, Mie Kotsu and Toba City Kamome buses in their zones",
  },
];

/** Table 2 — coverage. */
const coverageRows = [
  {
    service: "Kintetsu local and express trains",
    allowed: "✓ Inside your zone",
    note: "Kintetsu confirms EXPRESS and LOCAL types can be boarded on a pass or basic fare ticket alone. The zone depends on the pass.",
  },
  {
    service: "Limited Express trains",
    allowed: "✗ Separate ticket",
    note: "Kintetsu says the pass alone does not let you board. All seats are reserved, and you buy a Limited Express ticket on top. The pass replaces the basic fare only.",
  },
  {
    service: "Special seats on tourist trains",
    allowed: "✗ Extra charge",
    note: "Shimakaze, HINOTORI, Blue Symphony and AONIYOSHI are limited express types, so the same rule applies, and premium seats cost more again.",
  },
  {
    service: "Iga Tetsudo line",
    allowed: "✓ 5day and Plus",
    note: "Named on both 5-day pages. Show the mini ticket to staff rather than scanning.",
  },
  {
    service: "Cable cars",
    allowed: "✓ Where named",
    note: "Kintetsu's digital ticket guide explains boarding the cable car by showing the mini ticket to staff. The 1day zone names Toriimae–Ikomasanjo.",
  },
  {
    service: "Ropeways",
    allowed: "✗ Never",
    note: "Kintetsu says passes cannot be used on ropeways, so the Gozaisho Ropeway is not on the 5day Plus, even though its buses are.",
  },
  {
    service: "Buses",
    allowed: "◐ Depends on pass",
    note: "1day and 2day: Nara Kotsu only. 5day: none. 5day Plus: Nara Kotsu, Mie Kotsu and the Toba Kamome bus.",
  },
  {
    service: "Osaka Metro, Kyoto subway and Hanshin",
    allowed: "✗ Not covered",
    note: "If a through train leaves Kintetsu, stop at the last Kintetsu station (Nagata, Osaka-Namba or Takeda) or buy a regular ticket at your boarding station.",
  },
  {
    service: "JR lines and Kansai Airport trains",
    allowed: "✗ Not covered",
    note: "This is a Kintetsu product and it reaches neither airport train. Plan the airport run separately.",
  },
];

/** Table 3 — fares, adult, from Kintetsu's own fare tables. */
const fareRows = [
  { journey: "Osaka-Namba → Kintetsu-Nara", basic: "¥680", express: "¥520", total: "¥1,200" },
  { journey: "Kyoto → Kintetsu-Nara", basic: "¥760", express: "¥520", total: "¥1,280" },
  { journey: "Osaka-Namba → Kyoto", basic: "¥1,140", express: "¥920", total: "¥2,060" },
  { journey: "Osaka-Namba → Ise-shi", basic: "¥2,170", express: "¥1,340", total: "¥3,510" },
  { journey: "Osaka-Namba → Kashikojima", basic: "¥2,770", express: "¥1,640", total: "¥4,410" },
  { journey: "Kyoto → Ise-shi", basic: "¥2,430", express: "¥1,640", total: "¥4,070" },
  { journey: "Kintetsu-Nagoya → Ise-shi", basic: "¥1,740", express: "¥1,340", total: "¥3,080" },
  { journey: "Kintetsu-Nagoya → Kashikojima", basic: "¥2,370", express: "¥1,640", total: "¥4,010" },
  { journey: "Osaka-Namba → Kintetsu-Nagoya", basic: "¥2,860", express: "¥1,930", total: "¥4,790" },
];

/** Table 4 — break-even on basic fares, since the pass never pays the express charge. */
const worthRows = [
  {
    plan: "Osaka ⇄ Nara and back",
    sum: "¥680 × 2 = ¥1,360",
    pass: "1day ¥1,900",
    verdict: "✗ ¥540 short",
  },
  {
    plan: "Kyoto ⇄ Nara and back",
    sum: "¥760 × 2 = ¥1,520",
    pass: "1day ¥1,900",
    verdict: "✗ ¥380 short",
  },
  {
    plan: "Osaka → Nara → Kyoto → Osaka in one day",
    sum: "¥680 + ¥760 + ¥1,140 = ¥2,580",
    pass: "1day ¥1,900",
    verdict: "✓ ¥680 saved",
  },
  {
    plan: "That triangle plus another Nara return from Osaka the next day",
    sum: "¥2,580 + ¥1,360 = ¥3,940",
    pass: "2day ¥3,700",
    verdict: "✓ ¥240 saved",
  },
  {
    plan: "Osaka ⇄ Ise-shi return",
    sum: "¥2,170 × 2 = ¥4,340",
    pass: "5day ¥4,900",
    verdict: "✗ ¥560 short",
  },
  {
    plan: "Osaka ⇄ Kashikojima return",
    sum: "¥2,770 × 2 = ¥5,540",
    pass: "5day ¥4,900",
    verdict: "✓ ¥640 saved",
  },
  {
    plan: "Nagoya ⇄ Kashikojima return",
    sum: "¥2,370 × 2 = ¥4,740",
    pass: "5day ¥4,900",
    verdict: "✗ ¥160 short",
  },
  {
    plan: "Osaka → Ise-shi → Nagoya, plus an Osaka ⇄ Nara return",
    sum: "¥2,170 + ¥1,740 + ¥1,360 = ¥5,270",
    pass: "5day ¥4,900",
    verdict: "✓ ¥370 saved",
  },
];

/** Table 5 — Kintetsu or JR for Nara. */
const compareRows = [
  {
    item: "Price",
    kintetsu: "¥1,900 for 1 day, or ¥680 single from Osaka-Namba",
    jr: `¥2,700 for 1 day to ¥6,700 for 4 days, read ${KANSAI_CHECKED}`,
  },
  {
    item: "Station in Nara",
    kintetsu: "Kintetsu-Nara, the closer of the two to Nara Park on foot",
    jr: "JR Nara, a little further from the park",
  },
  {
    item: "Nara from Kyoto",
    kintetsu: "About 34 minutes by limited express (a surcharge the pass does not cover)",
    jr: "About 41 minutes by JR Rapid",
  },
  {
    item: "Kansai Airport",
    kintetsu: "Not covered",
    jr: "The Haruka is on the pass",
  },
  {
    item: "Buses in Nara",
    kintetsu: "Nara Kotsu on the 1day, 2day and 5day Plus, not on the 5day",
    jr: "Not covered",
  },
  {
    item: "Further reach",
    kintetsu: "Ise, Shima and Nagoya on the 5-day passes",
    jr: "Kobe, Himeji and the rest of JR West's Kansai area",
  },
  {
    item: "Pick it if",
    kintetsu: "You are staying near Namba or are heading to Ise or Yoshino",
    jr: "You land at Kansai Airport or the trip is mostly on JR",
  },
];

const buySteps = [
  {
    title: "Buy online, or through an agency abroad",
    desc: `Kintetsu sells the pass as a digital ticket online, 24 hours a day, and through overseas travel agencies, Klook among them. A reservation holds up to four tickets. Checked ${CHECKED}.`,
  },
  {
    title: "There is nothing to pick up",
    desc: "The pass is a live QR code on your phone, so there is no paper ticket to collect at a counter. Kintetsu's own version opens from your voucher in a browser, and Klook's blog describes activating in its app. Follow your voucher's instructions if the listing says otherwise.",
  },
  {
    title: "Start within 180 days, and activate on the day",
    desc: "Kintetsu says the pass must start within 180 days of purchase. Tap Activate Tickets on your first day. It cannot be undone, and activating one mini ticket activates them all.",
  },
  {
    title: "Scan a live screen at the gate",
    desc: "Screenshots do not work, since the QR code refreshes every 5 minutes, and you need an internet connection. Turn off browser auto-translate and dark mode. For a group on one phone, the others go through first and the phone holder last.",
  },
  {
    title: "Buy limited express seats separately",
    desc: "Book them on Kintetsu's site or at a limited express counter or machine. You can buy the limited express ticket alone and use the pass in place of the basic fare. Tickets bought through a site are changed through that site.",
  },
  {
    title: "Carry your passport",
    desc: "The pass is for foreign visitors with Temporary Visitor status, cannot be transferred, and Kintetsu asks you to carry your passport so you can show it.",
  },
];

const faqItems = [
  {
    q: "How much is the Kintetsu Rail Pass?",
    a: `¥1,900 for the 1day, ¥3,700 for the 2day, ¥4,900 for the 5day and ¥6,700 for the 5day Plus, for an adult aged 12 or over. Children aged 6 to 11 pay ¥950, ¥1,850, ¥2,450 and ¥3,350, and under-6s ride free. The 2day and both 5-day passes run on consecutive days. Limited express tickets are extra on all four. Read off kintetsu.co.jp on ${CHECKED}.`,
  },
  {
    q: "Is the Kintetsu Rail Pass worth it?",
    a: `Only if you ride more than one return trip. An Osaka-Namba to Nara return is ¥1,360 and a Kyoto to Nara return ¥1,520, both below the ¥1,900 1day. It wins when you make a triangle of Osaka, Nara and Kyoto in a day (¥2,580), or on the 5day when you go to Kashikojima and back (¥5,540 against ¥4,900). An Ise-shi return from Osaka is ¥4,340, which falls ¥560 short, unless you add a Nara day. These sums use basic fares, because the pass never covers the limited express charge. Read ${CHECKED}.`,
  },
  {
    q: "Does the Kintetsu Rail Pass include limited express trains?",
    a: "No. Kintetsu states the pass alone does not let you board a limited express train, so you must buy a limited express ticket on top. All limited express seats are reserved. The pass stands in for the basic fare, so you pay only the charge: ¥520 for Osaka-Namba to Nara, ¥1,340 for Osaka-Namba to Ise-shi and ¥1,640 to Kashikojima. Express and local trains need no extra ticket.",
  },
  {
    q: "Kintetsu Rail Pass or Kansai Area Pass for Nara?",
    a: `Kintetsu if you are staying near Namba and only going to Nara, and even then a pair of ¥680 singles beats the ¥1,900 pass. The JR Kansai Area Pass suits a trip that starts or ends at Kansai Airport, since it includes the Haruka, at ¥2,700 for one day or ¥6,700 for four, read ${KANSAI_CHECKED}. Kintetsu-Nara is the closer station to Nara Park. Neither pass covers the other company's trains.`,
  },
  {
    q: "Can I use the Kintetsu Rail Pass to Ise?",
    a: "Yes, on the 5day or 5day Plus. The 1day and 2day stop at their Osaka, Nara and Kyoto zones. You can ride express trains on the pass alone, or buy a limited express ticket on top, which is ¥1,340 from Osaka-Namba or Kintetsu-Nagoya to Ise-shi. Only the 5day Plus adds the Mie Kotsu and Toba Kamome buses around Ise, Toba and Shima.",
  },
  {
    q: "Where do I pick up the Kintetsu Rail Pass?",
    a: "You do not. It is a digital ticket, so you open the QR code on your phone and scan it at the gate. Kintetsu says it can be used immediately after online payment, but you must tap Activate Tickets on your first day and that cannot be undone. At gates without a reader, show the ticket to staff. You will need data on your phone, since screenshots of the code are refused.",
  },
  {
    q: "What is included in the 5day Plus?",
    a: "Everything on the 5day, meaning all Kintetsu lines and the Iga Tetsudo line, plus buses: Nara Kotsu in its zone, and Mie Kotsu and Toba City Kamome buses around Matsusaka, Ise, Toba and Shima, Nabari to Akame, Yunoyama Onsen and Kuwana to Nabana-no-sato. The extra is ¥1,800 over the 5day. The Gozaisho Ropeway itself is not included.",
  },
  {
    q: "Does the Kintetsu Rail Pass work on the Osaka Metro?",
    a: "No. Kintetsu says the pass does not cover the Osaka Metro, the Kyoto Municipal Subway or Hanshin. If your train continues onto one of them, stop at the last Kintetsu station, which is Nagata, Osaka-Namba or Takeda, or buy a regular ticket for the whole ride at your boarding station.",
  },
  {
    q: "Who can buy the Kintetsu Rail Pass?",
    a: "Kintetsu describes it as exclusively for foreign visitors, for people visiting for sightseeing with Temporary Visitor status, and asks you to carry your passport when using it. The pass is for the holder only. Klook's listing states it is not available to Japanese passport holders or residents.",
  },
  {
    q: "Can I get a refund on the Kintetsu Rail Pass?",
    a: "Kintetsu's conditions state refunds for passes bought online or through an agent cannot be given at a station ticket office, and none is given for delays. Activation also cannot be cancelled. If you buy through Klook, its cancellation terms on the listing apply, so read them before you pay.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KintetsuRailPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={URL} />
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
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Kintetsu Rail Pass", item: URL },
              ],
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
          <span className={styles.breadCurrent}>Kintetsu Rail Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kintetsu Rail Pass (2026):<br />Prices &amp; Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            Four digital passes for Kintetsu trains around Osaka, Nara, Kyoto, Nagoya and Ise-Shima. Here is what each
            one costs and the fares that show which trips pay it back.
          </p>
          <div className={styles.heroBadges}>
            {[`Prices checked ${CHECKED}`, "Official Kintetsu figures", "Break-even arithmetic"].map((t) => (
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
                <p className={styles.verdictStatLabel}>1day / 2day</p>
                <p className={styles.verdictStatValue}>¥1,900 / ¥3,700</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>5day / 5day Plus</p>
                <p className={styles.verdictStatValue}>¥4,900 / ¥6,700</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Children (6–11)</p>
                <p className={styles.verdictStatValue}>Half price</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Limited express</p>
                <p className={styles.verdictStatValue}>Extra ticket</p>
              </div>
            </div>
            {/* Answer-first: this is the article's first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>Kintetsu Rail Pass</strong> gives unlimited rides on Kintetsu trains around Osaka, Kyoto and
              Nara, and with the 5-day versions Nagoya and Ise-Shima too. Adult prices are <strong>¥1,900 for 1 day</strong>,{" "}
              <strong>¥3,700 for 2 days</strong>, <strong>¥4,900 for 5 days</strong> and <strong>¥6,700 for the 5day
              Plus</strong> (children ¥950, ¥1,850, ¥2,450 and ¥3,350). The 5-day passes cover <strong>all Kintetsu
              lines</strong>, but no pass includes limited express trains, which need a separate ticket. Only the Plus
              adds Mie Kotsu and Toba buses as well as Nara Kotsu. It pays on a triangle of Osaka, Nara and Kyoto in a
              day (¥2,580 in fares) or a return to Kashikojima (¥5,540), not on a plain Nara return (¥1,360). Read off
              kintetsu.co.jp on {CHECKED}.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink
                href={kintetsuRailPass.url}
                target="_blank"
                rel="sponsored noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                Kintetsu Rail Pass on Klook →
              </KlookLink>
              <KlookLink
                href={kyotoNaraKiyomizuTour.url}
                target="_blank"
                rel="sponsored noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                Or a Guided Nara Day →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Is the Kintetsu Rail Pass?</h2>
          <p className={styles.bodyText}>
            Four passes, and the difference between them is mostly how far they reach. The 1day and 2day stay around
            Osaka, Nara and Kyoto. The 5-day passes reach Nagoya, Ise and Shima. Adults are 12 and over, children are 6
            to 11, and under-6s ride free.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Adult", "Child", "Valid", "Kintetsu zone", "Buses"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.child}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.valid}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.zone}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.bus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off Kintetsu&apos;s pass pages on {CHECKED}. Each pass also carries benefits at about 40 facilities
            (1day and 2day) or about 70 (5-day passes), one use per facility.
          </p>
        </section>

        {/* Coverage */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What it covers</span>
          <h2 className={styles.sectionTitle}>What Does the Kintetsu Rail Pass Cover?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Service", "On the pass?", "What that means"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coverageRows.map((row) => (
                    <tr key={row.service}>
                      <td className={styles.tdProvider}>{row.service}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.allowed}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off Kintetsu&apos;s pass, conditions, digital ticket and FAQ pages on {CHECKED}.
          </p>
        </section>

        {/* Limited express */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Limited express</span>
          <h2 className={styles.sectionTitle}>Does the Kintetsu Rail Pass Include Limited Express Trains?</h2>
          <p className={styles.bodyText}>
            No. Kintetsu says the pass alone does not let you board one, and all limited express seats are reserved. In
            practice the pass replaces the basic fare, and you add the charge in the third column of the table below.
            Express and local trains need nothing extra. So the choice on any trip is whether the time saved is worth
            the charge, not whether the pass allows it.
          </p>
          <p className={styles.bodyText}>
            You can buy a Limited Express-only ticket online, choosing your seat, or at a station counter or machine.
            The online ticket allows up to three free train changes. A ticket otherwise changes once, before departure.
            Refunds are only before the train leaves, less a handling charge.
          </p>
        </section>

        {/* Break-even */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>Is the Kintetsu Rail Pass Worth It?</h2>
          <p className={styles.bodyText}>
            Add up the basic fares for your own days. The limited express charge does not belong in this sum, because
            you pay it with or without a pass. All fares below are adult, one way, from Kintetsu&apos;s own tables. Half
            the adult fare, rounded up to the nearest ¥10, gives the child fare.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Journey (one way)", "Basic fare", "Limited express charge", "Both"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.journey}>
                      <td className={styles.tdProvider}>{row.journey}</td>
                      <td className={styles.tdPrice}>{row.basic}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.express}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            From Kintetsu&apos;s limited express fare tables, cross-checked on {CHECKED} against its fare table as of 14
            March 2026. The limited express figures are the standard charge, and premium seats cost more.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1.5rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your trip", "Basic fares", "Pass", "Verdict"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {worthRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.sum}</td>
                      <td style={{ fontSize: "0.85rem", whiteSpace: "nowrap" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>The pattern:</strong> one out-and-back rarely pays, and two connected journeys usually do. Facility
            benefits and buses can tip a close call, but the bus fares are not confirmed here, so they are not in these sums.
            That also means the <strong>5day Plus</strong> has no row here. Its ¥1,800 on top of the 5day is worth paying
            only if you will ride the Ise, Toba and Shima buses several times, so price your bus days first.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kintetsuRailPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check the Kintetsu Rail Pass →
            </KlookLink>
          </div>
        </section>

        {/* Kintetsu or JR */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Kintetsu Rail Pass or Kansai Area Pass for Nara?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For a Nara day alone, neither: buy two singles. Once a pass makes sense, choose by where you sleep and how you
            land. A Namba hotel favours Kintetsu, while an arrival at Kansai Airport favours JR, because the{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              Kansai Area Pass
            </Link>{" "}
            includes the Haruka.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Kintetsu Rail Pass", "JR Kansai Area Pass"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.kintetsu}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.jr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Kyoto–Nara journey times are from Nara&apos;s official travel guide, as used in the{" "}
            <Link href="/guides/attractions/japan-first-time-itinerary" style={{ color: "var(--text)", fontWeight: 600 }}>
              first-time Japan itinerary
            </Link>
            . See{" "}
            <Link href="/guides/attractions/nara-day-trip" style={{ color: "var(--text)", fontWeight: 600 }}>
              our Nara day trip guide
            </Link>{" "}
            for what to do when you arrive.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kintetsuRailPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              View the Kintetsu Rail Pass →
            </KlookLink>
            <KlookLink href={jrKansaiAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              View the Kansai Area Pass →
            </KlookLink>
          </div>
        </section>

        {/* Ise */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Ise-Shima</span>
          <h2 className={styles.sectionTitle}>Can I Use the Kintetsu Rail Pass to Ise?</h2>
          <p className={styles.bodyText}>
            Yes, on either 5-day pass. The 1day and 2day do not reach it. From Osaka-Namba the basic fare to Ise-shi is
            ¥2,170 each way and from Kintetsu-Nagoya ¥1,740, with a ¥1,340 limited express charge on top if you want the
            fast train. A plain return does not repay the ¥4,900 pass, but a run through to Kashikojima does, as does
            carrying on from Ise to Nagoya with a Nara day added.
          </p>
          <p className={styles.bodyText}>
            If you would rather not plan the day, a guided visit covers Ise itself, and a coach tour replaces the train
            altogether. Note that the coach tour below is listed as Japanese-language, with a translator device and a
            20-person minimum.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={iseShrineOkageGuidedTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Ise Guided Tour →
            </KlookLink>
            <KlookLink href={iseFutamiBusTourOsaka.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Ise Bus Tour From Osaka →
            </KlookLink>
          </div>
        </section>

        {/* Buying */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Buying it</span>
          <h2 className={styles.sectionTitle}>Where Do I Pick Up the Kintetsu Rail Pass?</h2>
          <p className={styles.bodyText}>You do not pick it up. Here is how buying and using it works.</p>
          <div className={styles.stepsList}>
            {buySteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kintetsuRailPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              View the Kintetsu Rail Pass →
            </KlookLink>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              {klookEsim.ctaLabel}
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Data matters on this pass more than most, because the gate reads a live screen and screenshots are refused.
            Our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--text)", fontWeight: 600 }}>
              best eSIM for Japan
            </Link>{" "}
            comparison ranks the alternatives.
          </p>
        </section>

        {/* Stay */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should I Stay to Use the Kintetsu Rail Pass?</h2>
          <p className={styles.bodyText}>
            Namba, since the Osaka-Namba terminus is where the Nara trains start and Kintetsu&apos;s line meets the Osaka
            Metro. If you want an early start at the temples, a night in Nara works too. Our{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={{ color: "var(--red)", fontWeight: 600 }}>
              Osaka area guide
            </Link>{" "}
            compares the neighbourhoods.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={osakaStayAreas[1].url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Hotels in Namba →
            </KlookLink>
            <KlookLink href={naraHotels.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Hotels in Nara →
            </KlookLink>
          </div>
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
          heading="What to Book Around the Pass"
          intro="The pass covers the trains. These listings cover the days at the other end. Open a listing for the current price on your dates."
          tours={[kintetsuRailPass, kyotoNaraKiyomizuTour, iseShrineOkageGuidedTour]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/nara-day-trip", title: "Nara Day Trip (2026)" },
              { href: "/guides/attractions/kansai-area-pass", title: "Kansai Area Pass (2026): Prices, What It Covers & Is It Worth It?" },
              { href: "/guides/attractions/osaka-2-day-itinerary", title: "Osaka 2-Day Itinerary" },
              { href: "/guides/attractions/osaka-kyoto-3-day-itinerary", title: "Osaka and Kyoto 3-Day Itinerary" },
              { href: "/guides/transport/osaka-transportation", title: "Getting Around Osaka" },
              { href: "/guides/transport/hokuriku-arch-pass", title: "Hokuriku Arch Pass (2026): Price, Route and Is It Worth It?" },
              { href: "/guides/transport", title: "More Transport Guides →" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                    <path d="M12 7v10" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{item.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Two connected journeys, and the pass starts to pay</h2>
            <p className={styles.ctaBannerDesc}>
              ¥1,900 a day around Osaka, Nara and Kyoto, or ¥4,900 for five days out to Ise and Nagoya. For one Nara
              return, buy two singles.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={kintetsuRailPass.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Kintetsu Rail Pass →
              </KlookLink>
              <KlookLink href={kyotoNaraKiyomizuTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View a Guided Nara Day →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
