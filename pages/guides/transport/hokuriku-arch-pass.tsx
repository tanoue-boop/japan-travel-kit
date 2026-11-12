import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  hokurikuArchPass,
  kanazawaHotels,
  klookEsim,
  shinkansenTokyoKanazawa,
  shirakawagoGokayamaKanazawaBusTour,
  shirakawagoTakayamaKanazawaDayTour,
  toyamaHotels,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * ---------------------------------------------------------------------------
 * /guides/transport/hokuriku-arch-pass — written 4 Nov 2026
 *
 * Sourcing, all read on 4 November 2026 unless a row carries its own date:
 *
 *   - westjr.co.jp/travel-information/en/tickets-passes/other/hokuriku-arch-pass/
 *     for the ¥35,000 / ¥17,500 price, validity, coverage, exclusions, eligibility,
 *     purchase and refund rules. Read directly.
 *   - jreast.co.jp answers automated reads with HTTP 403, so its pass page, its
 *     transportation conditions and its 28 January 2026 press release were read
 *     through a jreast.co.jp-restricted search index. That is the source for the
 *     Narita Express wording.
 *   - tickets.jr-odekake.net, JR West's e5489 Shinkansen e-Ticket page (purchases
 *     from 14 March 2026), for ¥14,400 Tokyo–Kanazawa and ¥8,970 Kanazawa–Nagano,
 *     normal season. Read directly.
 *   - westjr.co.jp HOKURIKU One-way Ticket and HARUKA One-way Ticket pages for
 *     ¥6,500 Kyoto–Kanazawa and ¥1,900 Kansai Airport–Osaka. Both are visitor
 *     discount tickets. The HARUKA page warns of a price change for tickets sold
 *     from 1 November 2026 without printing the new figure on the page read here.
 *
 * Carried from our own pages with their dates: the N'EX ¥3,140 / ¥5,200 and the
 * monorail ¥520 (tokyo-wide-pass), JR Pass prices (data/jr-fares.json), JR EAST
 * PASS prices (jr-east-pass) and the Tokaido fares (tokyo-to-osaka-shinkansen).
 *
 * Deliberately absent: the regular Kanazawa–Kyoto fare, Kyoto–Osaka and the
 * peak-season Hokuriku prices, none of which could be read from an operator.
 * The page says so where the sums would otherwise include them. The rounded
 * reference values in data/jr-fares.json are not operator figures and are not
 * used here. No Klook price appears.
 * ---------------------------------------------------------------------------
 */

const CHECKED = checkedLabel("2026-11-04");
const NEX_CHECKED = checkedLabel("2026-10-30");
const MONORAIL_CHECKED = checkedLabel("2026-10-25");
const JR_PASS_CHECKED = checkedLabel("2026-10-30");
const EAST_CHECKED = checkedLabel("2026-11-03");

const ROUTE = "/guides/transport/hokuriku-arch-pass";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const ADULT = "¥35,000";
const CHILD = "¥17,500";

const TITLE = "Hokuriku Arch Pass (2026): Price, Route and Is It Worth It?";
const DESCRIPTION =
  "Hokuriku Arch Pass price for 2026: ¥35,000 adult, ¥17,500 child for 7 days from Tokyo to Kanazawa and Osaka. What it covers and when it beats tickets.";

/** Table 1 — the price and who may hold it. */
const priceRows = [
  {
    item: "Adult (12 and over)",
    value: ADULT,
    note: `Seven-day pass. JR West and JR East both print this figure. A page quoting ¥30,000 or ¥25,500 is out of date. Checked ${CHECKED}.`,
  },
  {
    item: "Child (6 to 11)",
    value: CHILD,
    note: "Exactly half. Age is taken on the day the exchange order is issued or the pass is bought.",
  },
  {
    item: "Children 1 to 5",
    value: "Free, up to two",
    note: "Per adult or child pass holder. A third child needs a child pass, and so does any child using a reserved seat alone or travelling alone.",
  },
  {
    item: "Bought in advance vs in Japan",
    value: "One price",
    note: "JR West prints a single price with no separate advance and in-Japan rate. It sets the price by the date you buy, not the date you exchange or travel.",
  },
  {
    item: "Validity",
    value: "7 consecutive days",
    note: "Calendar days, 00:00 on the first day to 24:00 on the last, Japan time. The only length sold. Delays do not extend it.",
  },
  {
    item: "Who can use it",
    value: "Temporary Visitors",
    note: "A foreign-government passport and Temporary Visitor entry status. Japanese nationals cannot use it, including those with permanent residence abroad.",
  },
];

/** Table 2 — coverage. */
const coverageRows = [
  {
    service: "Hokuriku Shinkansen, Tokyo ⇄ Tsuruga",
    allowed: "✓ Included",
    note: "The spine of the pass, through Karuizawa, Nagano, Toyama and Kanazawa. Book seats before boarding. The Kagayaki is all-reserved, so it has no non-reserved car.",
  },
  {
    service: "Limited Express Thunderbird",
    allowed: "✓ Included",
    note: "Named by JR West. It carries you from Tsuruga into Kyoto and Osaka, and reserved seats must be booked before boarding.",
  },
  {
    service: "Limited Express Haruka (Kansai Airport)",
    allowed: "✓ Included",
    note: "Also named by JR West. This is what makes Kansai Airport the natural exit from the pass.",
  },
  {
    service: "Narita Express",
    allowed: "✓ Included",
    note: "JR East's conditions address pass holders boarding the N'EX, and Klook's listing names it. JR West's page does not mention it. Without a reservation, take any empty seat.",
  },
  {
    service: "Tokyo Monorail",
    allowed: "✓ Included",
    note: "Named by JR West, and the pass's link to Haneda.",
  },
  {
    service: "JR West and JR East Special Rapid, Rapid and Local trains",
    allowed: "✓ Inside the map area",
    note: "JR West lists Toyama, Ishikawa, Fukui, Shiga, Kyoto and Nara as destinations, and the exact limits are on its map image. Check the map for anywhere else, including Kobe and Himeji.",
  },
  {
    service: "IR Ishikawa, Ainokaze Toyama and Hapi-Line Fukui",
    allowed: "◐ Named segments only",
    note: "Kanazawa–Tsubata (IR Ishikawa), Toyama–Takaoka (Ainokaze) and Echizen-Hanando–Fukui (Hapi-Line), end to end. Getting off anywhere else is not covered.",
  },
  {
    service: "Tokaido Shinkansen, Tokyo ⇄ Shin-Osaka",
    allowed: "✗ Never",
    note: "The exclusion that decides the pass. The obvious Tokyo–Osaka train is the one you cannot take.",
  },
  {
    service: "Sanyo Shinkansen, Shin-Osaka ⇄ Hakata",
    allowed: "✗ Never",
    note: "So Hiroshima and Fukuoka are out, and a pass from JR West's wider range or the JR Pass is the route there.",
  },
  {
    service: "Hayabusa and Komachi",
    allowed: "✗ Extra ticket",
    note: "On the Tohoku and Yamagata Shinkansen inside the area, a separate limited express ticket is required.",
  },
  {
    service: "Green Car, GranClass and sleepers",
    allowed: "✗ Extra charge",
    note: "Green and GranClass need separate tickets, and sleeper cars cannot be used at all.",
  },
];

/** Table 3 — only fares an operator prints, one adult, normal season. */
const fareRows = [
  {
    journey: "Narita Airport → Tokyo, N'EX",
    fare: "¥3,140",
    source: `JR East, read ${NEX_CHECKED}`,
    note: "¥5,200 for the N'EX round-trip ticket.",
  },
  {
    journey: "Haneda ⇄ Hamamatsucho, Tokyo Monorail",
    fare: "¥520",
    source: `Tokyo Monorail, read ${MONORAIL_CHECKED}`,
    note: "The cheaper way into the route.",
  },
  {
    journey: "Tokyo → Kanazawa, reserved Ordinary",
    fare: "¥14,400",
    source: `JR West e5489 Shinkansen e-Ticket, ${CHECKED}`,
    note: "Normal season, for purchases from 14 March 2026. JR West states that peak, busy and off-peak prices differ.",
  },
  {
    journey: "Kanazawa ⇄ Nagano, reserved Ordinary",
    fare: "¥8,970",
    source: `JR West e5489 Shinkansen e-Ticket, ${CHECKED}`,
    note: "Normal season. Used only in the side-trip row below.",
  },
  {
    journey: "Kanazawa → Kyoto, HOKURIKU One-way Ticket",
    fare: "¥6,500",
    source: `JR West, ${CHECKED}`,
    note: "A visitor discount ticket covering the shinkansen to Tsuruga and the Thunderbird. ¥8,000 to Osaka. JR West's page dates its prices to February 2025. The regular fare is not listed here.",
  },
  {
    journey: "Osaka → Kansai Airport, HARUKA One-way Ticket",
    fare: "¥1,900",
    source: `JR West, ${CHECKED}`,
    note: "A visitor discount ticket, ¥2,700 from Kyoto. JR West warns of a change for tickets sold from 1 November 2026 and still printed this figure on the page checked.",
  },
  {
    journey: "Kyoto → Osaka",
    fare: "Not counted",
    source: "No operator figure read",
    note: "Left out of the sums. It is a short local hop on either side of the calculation.",
  },
];

/** Table 4 — the break-even, against ¥35,000. */
const scenarioRows = [
  {
    plan: "Narita in, Tokyo → Kanazawa → Kyoto → Osaka, Kansai Airport out",
    sum: "¥3,140 + ¥14,400 + ¥6,500 + ¥1,900",
    total: "¥25,940",
    verdict: "✗ ¥9,060 short",
  },
  {
    plan: "The same route, Haneda in",
    sum: "¥520 + ¥14,400 + ¥6,500 + ¥1,900",
    total: "¥23,320",
    verdict: "✗ ¥11,680 short",
  },
  {
    plan: "Narita in, Tokyo → Kanazawa and back, Narita out",
    sum: "¥5,200 + ¥14,400 + ¥14,400",
    total: "¥34,000",
    verdict: "✗ ¥1,000 short",
  },
  {
    plan: "The Narita-to-Kansai route plus a Kanazawa ⇄ Nagano day",
    sum: "¥25,940 + ¥8,970 + ¥8,970",
    total: "¥43,880",
    verdict: "✓ ¥8,880 saved",
  },
];

/** The judgement, in plain terms. */
const worthRows = [
  {
    plan: "A straight run from Tokyo through Kanazawa to Kansai",
    verdict: "✗ Buy tickets",
    why: "On every fare confirmed with an operator, single tickets come to about ¥26,000 against ¥35,000. The missing Kyoto–Osaka hop and the regular Kanazawa–Kyoto fare do not plausibly bridge ¥9,060.",
  },
  {
    plan: "That run with side trips on the Hokuriku Shinkansen",
    verdict: "✓ Can pay",
    why: "Long extra legs are what close the gap. One Kanazawa ⇄ Nagano return turns a ¥9,060 shortfall into an ¥8,880 saving.",
  },
  {
    plan: "Tokyo ⇄ Kanazawa and back, arriving at Narita",
    verdict: "◐ Close",
    why: "¥34,000 at normal-season prices. One more ride would tip it, and so could a busier season, since JR West prices those dates differently. The peak figures are not listed here.",
  },
  {
    plan: "You want not to think about each leg",
    verdict: "◐ Your call",
    why: "The extra money buys one ticket for the week, seat reservations from a single pass, and freedom to change trains. That is a fair reason to pay, as long as you know it is the reason.",
  },
  {
    plan: "Tokyo to Osaka the quick way",
    verdict: "✗ Wrong pass",
    why: "The Tokaido Shinkansen is excluded. A single reserved Nozomi is ¥14,720 at the window, far below the pass.",
  },
  {
    plan: "You also want Hiroshima, Hakone or Fukuoka by JR",
    verdict: "✗ Too narrow",
    why: "The Sanyo Shinkansen is out, so anything west of Shin-Osaka by bullet train means a separate ticket or the nationwide pass.",
  },
];

/** Table 5 — against its neighbours. */
const passRows = [
  {
    pass: "Hokuriku Arch Pass",
    price: `${ADULT} (7 days)`,
    covers: "Tokyo–Tsuruga on the Hokuriku Shinkansen, Thunderbird, Haruka, N'EX, Tokyo Monorail and JR in the map area",
    missing: "Tokaido and Sanyo Shinkansen",
    pick: "Tokyo to Kansai the long way, with more riding than a single run",
  },
  {
    pass: "JAPAN RAIL PASS",
    price: "¥50,000 official site, ¥53,000 overseas agency (7 days)",
    covers: "JR nationwide, including the Hokuriku and Tokaido Shinkansen",
    missing: "Nozomi and Mizuho without a supplement",
    pick: "A week that also needs the Tokaido or Sanyo line",
  },
  {
    pass: "JR EAST PASS",
    price: "¥35,000 (5 days), ¥50,000 (10 days)",
    covers: "JR East lines, with the Hokuriku Shinkansen only as far as Joetsumyoko",
    missing: "Toyama, Kanazawa and all of Kansai",
    pick: "Tohoku, Niigata or Nagano rather than Kanazawa",
  },
];

const buySteps = [
  {
    title: "Pick a channel",
    desc: `JR West lists three: an overseas travel agency (an exchange order or E-TICKET), JR-WEST Online Train Reservation, and a travel agency in Japan. JR East sells through JR-EAST Train Reservation and agencies outside Japan. Klook sells the overseas version. Checked ${CHECKED}.`,
  },
  {
    title: "Mind the two booking windows",
    desc: "An exchange order must be exchanged within 3 months of issue. JR-WEST Online opens one month before boarding, at 10:00 Japan time on the same date of the previous month. It takes credit cards only, and virtual or numberless cards are refused. A travel agency in Japan sells up to one month before your first day.",
  },
  {
    title: "Collect the pass on arrival, with your original passport",
    desc: "Take an exchange order and your passport to an exchange location. For an online booking, use a ticket machine or ticket office with the reservation number, your 4-digit ID, the card you paid with and your passport. Machines need a passport with an IC chip. JR East's January press release lists Narita and Haneda among its tentative pick-up points, and its conditions warn that a photocopy of the passport is not accepted. Open the exchange-location list linked from JR West's page before you land.",
  },
  {
    title: "Choose the start day carefully",
    desc: "Once exchanged, the start date, length and pass type cannot be changed. Seven consecutive days means the first day should be your first long train, not your landing day, unless you land and ride.",
  },
  {
    title: "Reserve seats before each train",
    desc: "Use a ticket machine or a ticket office, or the website if you bought online. From the 7th booking, JR West sends pass holders to a ticket office. Do the Kagayaki first, since it has no non-reserved car at all.",
  },
];

const faqItems = [
  {
    q: "How much is the Hokuriku Arch Pass?",
    a: `${ADULT} for an adult aged 12 or over and ${CHILD} for a child aged 6 to 11, for seven consecutive days. It is the only length sold. Up to two children aged 1 to 5 travel free with each pass holder. JR West prints one price with no separate advance and in-Japan rate, and sets it by the date you buy. Pages quoting ¥30,000 or ¥25,500 are out of date. Read off westjr.co.jp on ${CHECKED}.`,
  },
  {
    q: "Is the Hokuriku Arch Pass worth it?",
    a: `On a single run from Tokyo through Kanazawa to Kansai Airport, no. Using fares confirmed from operators, the N'EX (¥3,140), Tokyo to Kanazawa (¥14,400), Kanazawa to Kyoto (¥6,500) and Osaka to Kansai Airport (¥1,900) come to ¥25,940, which is ¥9,060 below the ${ADULT} pass. That sum leaves out Kyoto to Osaka and uses a discounted ticket for Kanazawa to Kyoto, so the true gap is a little smaller. It pays when you add long side trips: one Kanazawa to Nagano return adds ¥17,940 and leaves you ¥8,880 ahead. Fares are normal season, read ${CHECKED}.`,
  },
  {
    q: "Hokuriku Arch Pass vs JR Pass: which is cheaper?",
    a: `The Hokuriku Arch Pass, by ¥15,000 to ¥18,000. It is ${ADULT} for seven days, against ¥50,000 on the JR Group's official site or ¥53,000 through an overseas agency for a 7-day Ordinary JAPAN RAIL PASS, read ${JR_PASS_CHECKED}. The JR Pass covers far more, including the Tokaido and Sanyo Shinkansen, so it only makes sense if your week uses them. For a week spent between Tokyo, Kanazawa and Kansai, the Arch Pass is the better of the two, though single tickets can beat both.`,
  },
  {
    q: "Does the Hokuriku Arch Pass cover the Thunderbird?",
    a: "Yes. JR West names the Limited Express Thunderbird among the reserved-seat trains on the pass, and it is the train that links Tsuruga with Kyoto and Osaka. Book the seat before boarding at a ticket machine or a ticket office. A Green Car seat needs a separate ticket on top.",
  },
  {
    q: "Can I use the Hokuriku Arch Pass from Tokyo to Osaka?",
    a: "Yes, but only the long way round. You take the Hokuriku Shinkansen from Tokyo to Tsuruga, then change to the Thunderbird for Kyoto and Osaka. The Tokaido Shinkansen between Tokyo and Shin-Osaka, the direct route, is excluded. That is why the pass suits a trip with Kanazawa in the middle rather than one simply getting between the two cities.",
  },
  {
    q: "Where do I buy the Hokuriku Arch Pass?",
    a: "JR West lists overseas travel agencies, JR-WEST Online Train Reservation and travel agencies in Japan, and JR East sells it through JR-EAST Train Reservation and agencies outside Japan. Klook sells the overseas exchange-order version. You always collect the physical pass in Japan with your original passport. JR-WEST Online opens one month before boarding and an exchange order must be used within 3 months of issue.",
  },
  {
    q: "Does the Hokuriku Arch Pass cover the Narita Express and Haneda?",
    a: "Both airports are reachable. JR East's conditions tell pass holders they may take an empty seat on the N'EX without a reservation, and Klook's listing names the N'EX, though JR West's own page does not mention it. Haneda is reached on the Tokyo Monorail, which JR West names. The Haruka to Kansai Airport is named too.",
  },
  {
    q: "Does the Hokuriku Arch Pass cover Shirakawa-go or Takayama?",
    a: "Do not plan on it. JR West's pass page lists no bus, and the only Takayama and Shirakawa-go mention there belongs to a different ticket, the Takayama-Hokuriku Area Tourist Pass. From Kanazawa, a guided day tour or a separately booked bus is the practical way to reach Shirakawa-go.",
  },
  {
    q: "Who can use the Hokuriku Arch Pass?",
    a: "Holders of a passport issued by a foreign government who enter Japan with Temporary Visitor status. JR West states Japanese nationals cannot use it, including those with permanent residence abroad. You must carry your passport with the pass and show it if asked.",
  },
  {
    q: "Can I get a refund on the Hokuriku Arch Pass?",
    a: "Before use, yes, less a fee. JR West refunds the sale price minus 10%, with a minimum of ¥220 per pass. An unexchanged order goes back to the agency that sold it, and an exchanged pass can only be refunded at an exchange location's ticket counter in Japan. There is no refund after the pass starts, or for delays and disruption. Lost or stolen passes are not reissued. Klook's own cancellation terms are on its listing.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function HokurikuArchPassPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Hokuriku Arch Pass", item: URL },
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
          <span className={styles.breadCurrent}>Hokuriku Arch Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Hokuriku Arch Pass (2026):<br />Price, Route &amp; Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            Seven days of JR trains between Tokyo and Osaka by way of Kanazawa. Here is what it costs, where it stops,
            and the sums that show when it beats single tickets.
          </p>
          <div className={styles.heroBadges}>
            {[`Prices checked ${CHECKED}`, "Official JR West figures", "Break-even arithmetic"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Adult</p>
                <p className={styles.verdictStatValue}>{ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Child (6–11)</p>
                <p className={styles.verdictStatValue}>{CHILD}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Valid for</p>
                <p className={styles.verdictStatValue}>7 consecutive days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tokaido Shinkansen</p>
                <p className={styles.verdictStatValue}>Not covered</p>
              </div>
            </div>
            {/* Answer-first: this is the article's first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>Hokuriku Arch Pass</strong> is a <strong>7-day</strong> JR pass that links Tokyo, Kanazawa and
              Osaka on the <strong>Hokuriku Shinkansen</strong> and the <strong>Thunderbird</strong>, and it costs{" "}
              <strong>{ADULT}</strong> for an adult or <strong>{CHILD}</strong> for a child aged 6 to 11, at one price
              with no separate advance and station rate on JR West&apos;s page. It also covers the{" "}
              <strong>Haruka</strong> to Kansai Airport, the Tokyo Monorail to Haneda and the Narita Express, but not
              the Tokaido or Sanyo Shinkansen. It is ¥15,000 to ¥18,000 cheaper than a 7-day{" "}
              <strong>JR Pass</strong> (¥50,000 or ¥53,000 after the October 2026 change; see the{" "}
              <Link href="/guides/transport/jr-pass-guide">JR Pass price table</Link>), but on a single run from
              Narita through Kanazawa to Kansai Airport, confirmed single fares total about ¥25,940, so it only pays
              if you add long side trips. Read off JR West&apos;s pages on {CHECKED}.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink
                href={hokurikuArchPass.url}
                target="_blank"
                rel="sponsored noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                Hokuriku Arch Pass on Klook →
              </KlookLink>
              <KlookLink
                href={shinkansenTokyoKanazawa.url}
                target="_blank"
                rel="sponsored noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                Just Tokyo–Kanazawa Tickets →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Is the Hokuriku Arch Pass?</h2>
          <p className={styles.bodyText}>
            {ADULT} for an adult and {CHILD} for a child, for seven consecutive days. There is one length and one price
            on JR West&apos;s page. JR West&apos;s conditions say the price follows the date you buy, so it is worth
            buying once your dates are firm rather than expecting a cheaper rate at the station.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", "Figure", "The condition attached"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.value}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off JR West&apos;s pass page on {CHECKED}. JR East&apos;s 28 January 2026 press release
            gives the same ¥35,000 and ¥17,500.
          </p>
        </section>

        {/* Coverage */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What it covers</span>
          <h2 className={styles.sectionTitle}>What Does the Hokuriku Arch Pass Cover?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Think of it as an arch over the top of Honshu: Tokyo at one foot, Kanazawa at the crown, Osaka and Kansai
            Airport at the other foot. The Tokaido Shinkansen runs under the arch, and it is excluded.
          </p>
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
            Coverage read off JR West&apos;s pass page on {CHECKED}, with the Narita Express row from JR East&apos;s
            transportation conditions and Klook&apos;s listing. The limits of the valid area are drawn on JR West&apos;s
            map image rather than listed in text, so open it if your plan sits near an edge.
          </p>
        </section>

        {/* Worth it */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>Is the Hokuriku Arch Pass Worth It?</h2>
          <p className={styles.bodyText}>
            Only with more riding than a single run gives you. The table adds the fares for the classic route, using
            only figures an operator prints. Two of them are visitor discount tickets, because those are the published
            figures available, so a full-fare version of the sum would run a little higher. Kyoto to Osaka is left
            out, and so are peak-season shinkansen prices.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Journey (one adult, one way)", "Fare", "Source", "Detail"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.journey}>
                      <td className={styles.tdProvider}>{row.journey}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.tableWrap} style={{ marginTop: "1.5rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Trip", "The sum", "Single tickets", `Against ${ADULT}`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scenarioRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.sum}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.total}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.tableWrap} style={{ marginTop: "1.5rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your trip", "Verdict", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {worthRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Before you pay for either option, settle two things. Check <strong>your travel dates against JR West&apos;s
            seasons</strong>, because the ¥14,400 is the normal-season price. And check <strong>the listing&apos;s
            cancellation terms</strong>, because the discount tickets and the pass have different refund rules, and the
            week you commit to is hard to change once the pass is exchanged.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check the Hokuriku Arch Pass →
            </KlookLink>
            <KlookLink href={shinkansenTokyoKanazawa.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Price Tokyo–Kanazawa Tickets →
            </KlookLink>
          </div>
        </section>

        {/* vs JR Pass */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Hokuriku Arch Pass vs JR Pass: Which Is Cheaper?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The Arch Pass, by ¥15,000 against the official-site JR Pass and ¥18,000 against an overseas agency. The JR
            Pass earns the extra only if the week uses the Tokaido or Sanyo line. For the eastern side of the same map,
            see our{" "}
            <Link href="/guides/transport/jr-east-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              JR East Pass guide
            </Link>
            .
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Price (adult)", "Covers", "Does not cover", "Pick it for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.missing}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Arch Pass read {CHECKED}. JAPAN RAIL PASS prices read off japanrailpass.net on {JR_PASS_CHECKED}. JR EAST
            PASS prices from our guide, read {EAST_CHECKED}. Our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--text)", fontWeight: 600 }}>
              JR Pass guide
            </Link>{" "}
            has a break-even calculator for the nationwide pass.
          </p>
        </section>

        {/* Thunderbird */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Thunderbird</span>
          <h2 className={styles.sectionTitle}>Does the Hokuriku Arch Pass Cover the Thunderbird?</h2>
          <p className={styles.bodyText}>
            Yes. JR West names the Thunderbird among the reserved-seat limited expresses on the pass. Since the
            shinkansen now runs to Tsuruga, a Kanazawa to Kyoto or Osaka journey means a change there, from the
            shinkansen to the Thunderbird. Reserve both seats before you board. Green Car seats need separate tickets.
          </p>
        </section>

        {/* Tokyo to Osaka */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Route</span>
          <h2 className={styles.sectionTitle}>Can I Use the Hokuriku Arch Pass From Tokyo to Osaka?</h2>
          <p className={styles.bodyText}>
            Yes, by the northern route only: the Hokuriku Shinkansen to Tsuruga, then the Thunderbird. The direct Tokaido
            Shinkansen is excluded. If getting between the cities is all you want, a single reserved seat on it is
            ¥14,720 by Nozomi or ¥14,400 by Hikari at the window, read {CHECKED} in our{" "}
            <Link href="/guides/transport/tokyo-to-osaka-shinkansen" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo to Osaka shinkansen guide
            </Link>
            . The arch only makes sense with Kanazawa in the middle. See{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo to Kanazawa shinkansen
            </Link>{" "}
            for the first half of that trip: Kagayaki against Hakutaka, and the single fare this pass has to beat.
          </p>
        </section>

        {/* Buying */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Buying it</span>
          <h2 className={styles.sectionTitle}>Where Do I Buy the Hokuriku Arch Pass?</h2>
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
            <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              View the Hokuriku Arch Pass →
            </KlookLink>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              {klookEsim.ctaLabel}
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            The eSIM is there because seat bookings and any change of plan happen on your phone. Our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--text)", fontWeight: 600 }}>
              best eSIM for Japan
            </Link>{" "}
            comparison ranks the alternatives.
          </p>
        </section>

        {/* Where to stop */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The middle of the arch</span>
          <h2 className={styles.sectionTitle}>Where Should I Stay and What Should I Book in Kanazawa?</h2>
          <p className={styles.bodyText}>
            The pass buys the trains but not the reason for the detour, so book the night and the day first. Kanazawa
            is the usual stop. Toyama is one shinkansen stop towards Tokyo. Shirakawa-go is not on the pass, which makes
            a guided day from Kanazawa the simple answer. Compare it with the alternatives in our{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour" style={{ color: "var(--red)", fontWeight: 600 }}>
              Takayama and Shirakawa-go guide
            </Link>
            .
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kanazawaHotels.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Hotels in Kanazawa →
            </KlookLink>
            <KlookLink href={toyamaHotels.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Hotels in Toyama →
            </KlookLink>
            <KlookLink href={shirakawagoTakayamaKanazawaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Shirakawa-go Day From Kanazawa →
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
          intro="The pass covers the trains, and these listings cover the stop in the middle. Open a listing for the current price on your dates."
          tours={[hokurikuArchPass, shirakawagoTakayamaKanazawaDayTour, shirakawagoGokayamaKanazawaBusTour]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/transport/tokyo-to-kanazawa", title: "Tokyo to Kanazawa by Shinkansen" },
              { href: "/guides/transport/jr-east-pass", title: "JR East Pass (2026): Price, Coverage and Is It Worth It?" },
              { href: "/guides/transport/jr-pass-guide", title: "JR Pass Guide 2026: Prices, Is It Worth It and How to Buy" },
              { href: "/guides/attractions/takayama-shirakawago-tour", title: "Takayama and Shirakawa-go Tours" },
              { href: "/guides/attractions/karuizawa-day-trip-from-tokyo", title: "Karuizawa Day Trip From Tokyo" },
              { href: "/guides/attractions/japan-14-day-itinerary", title: "Japan 14-Day Itinerary" },
              { href: "/guides/transport/kintetsu-rail-pass", title: "Kintetsu Rail Pass (2026): Prices and Is It Worth It?" },
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
            <h2 className={styles.ctaBannerTitle}>Add up your legs first, then decide</h2>
            <p className={styles.ctaBannerDesc}>
              {ADULT} for seven days wins when the week has long side trips in it. A single run through Kanazawa is
              cheaper on tickets.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Hokuriku Arch Pass →
              </KlookLink>
              <KlookLink href={shinkansenTokyoKanazawa.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Tokyo–Kanazawa Tickets →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
