import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import FxFeeComparison from "../../../components/FxFeeComparison";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { currencyExchangePayBeforeLand } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { wiseLink, WISE_REL, WISE_PRICING_URL, WISE_CARD_URL, WISE_VERIFIED } from "../../../lib/wise-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

const WISE_URL = wiseLink("currency-exchange-japan", WISE_CARD_URL);
const WISE_FEES_URL = wiseLink("currency-exchange-japan", WISE_PRICING_URL);

// F (28 Nov 2026, task jtk-20261128-03): Bing shows this page 155 times a week at 5.79 (CTR
// 0.65%), so a short exact-match title (brand dropped to stay inside 60 characters) and a
// meta that carries the same-day airport / city / mid-market figures.
const TITLE = "Currency Exchange in Japan (2026): Best Rates & Where";
const H1_TEXT = "Currency Exchange in Japan (2026): Best Rates & Where to Exchange";
const DESCRIPTION =
  "Currency exchange in Japan: on 27 Nov 2026 $1 bought ¥154.86 at Narita and ¥155.39 in Tokyo vs ¥159.5 mid-market. Best rate: a 7-Eleven ATM + a Wise card.";

/**
 * Date the official pages behind the options table were read: narita-airport.jp
 * (service/exchange/currency), tokyo-haneda.com (service/facilities/exchange.html),
 * gpa-net.co.jp (passenger-service/rate), tokyo-card.co.jp/wcs/rate.php (World
 * Currency Shop), wise.com currency converter and /gb/card/, sevenbank.co.jp/intlcard/
 * and /intlcard/service.html, jp-bank.japanpost.jp (en_ias_index.html). Revolut's site
 * answers automated reads with 403, so its figures stay the ones the Revolut guide on
 * this site carries, with that guide's own date.
 */
const CHECKED = "28 November 2026";
const CHECKED_ISO = "2026-11-28";
const REVOLUT_CHECKED = "4 November 2026";

const NARITA_EXCHANGE_URL = "https://www.narita-airport.jp/en/service/exchange/currency";
const HANEDA_EXCHANGE_URL = "https://www.tokyo-haneda.com/en/service/facilities/exchange.html";
const GPA_RATE_URL = "https://www.gpa-net.co.jp/en/passenger-service/rate/";
const WCS_RATE_URL = "https://www.tokyo-card.co.jp/wcs/rate.php";
const WISE_MID_URL = "https://wise.com/gb/currency-converter/usd-to-jpy-rate";
const SEVEN_BANK_URL = "https://www.sevenbank.co.jp/intlcard/service.html";
const JAPAN_POST_URL = "https://www.jp-bank.japanpost.jp/en/ias/en_ias_index.html";

/**
 * Same-day rates for buying yen with foreign cash. GPA (the Narita Airport group's own
 * exchange stores) posted its board at 2026-11-27 11:09 and World Currency Shop (Tokyo
 * city stores) at 2026-11-27 11:01; the mid-market figure is Wise's converter as read on
 * 2026-11-28 (a Saturday, so it is Friday's close). Gaps are rate ÷ mid-market − 1.
 */
const RATES = {
  usd: { airport: "¥154.86", city: "¥155.39", mid: "¥159.5", airportGap: "2.9%", cityGap: "2.6%" },
  eur: { airport: "¥168.67", city: "¥169.31", mid: "¥174.5", airportGap: "3.3%", cityGap: "3.0%" },
  gbp: { airport: "¥195.62", city: "¥195.87", mid: "¥209.0", airportGap: "6.4%", cityGap: "6.3%" },
} as const;

/**
 * The options table, best first. Rates and gaps are the operators' own posted figures
 * above; where an operator posts no fee, the fee column says how the cost is charged
 * instead of guessing a number.
 */
const optionRows = [
  {
    option: "Wise or Revolut card at a 7-Eleven / Japan Post ATM",
    verdict: "Best rate",
    rate: `Mid-market (${RATES.usd.mid} per $1 on Wise, 28 Nov) plus the card's conversion fee shown in the app`,
    fees: `Wise UK: ATM withdrawals free up to 250 GBP a month, then 2.69%. Revolut UK Standard: £200 or 5 withdrawals a month, then 2% (Revolut's figures, ${REVOLUT_CHECKED}). The ATM's own fee is separate.`,
    hours: "As the ATM below",
  },
  {
    option: "Seven Bank ATM (7-Eleven), any foreign card",
    verdict: "Best place to get cash",
    rate: "Billed in yen, your card converts it at its own rate; on Visa and Mastercard the ATM also offers to fix the amount in your home currency (DCC) at its own rate",
    fees: "A fee per withdrawal where one applies; Seven Bank publishes no single figure. Limit ¥100,000 per withdrawal (¥30,000 on a magnetic stripe).",
    hours: "Visa and Mastercard 00:00–24:00; more than 28,000 ATMs",
  },
  {
    option: "Japan Post Bank ATM",
    verdict: "Second ATM network",
    rate: "Your card network's rate",
    fees: "¥220 (tax included) per use may apply on overseas cards. Limit ¥50,000 per transaction.",
    hours: "Post office ATMs: Mon–Sat 7:00–23:00, Sundays and holidays 7:00–21:00 (hours vary by machine)",
  },
  {
    option: "City exchange bureau (World Currency Shop, Tokyo)",
    verdict: "Cash only if you must",
    rate: `${RATES.usd.city} per $1 — ${RATES.usd.cityGap} under mid-market (27 Nov, 11:01)`,
    fees: "No separate commission; the cost is the rate. Board not updated on weekends and holidays.",
    hours: "Shop hours vary by store",
  },
  {
    option: "Airport counter (GPA, Narita)",
    verdict: "Small arrival float only",
    rate: `${RATES.usd.airport} per $1 — ${RATES.usd.airportGap} under mid-market (27 Nov, 11:09)`,
    fees: "GPA states it charges no commission; the cost is the rate. Other Narita and Haneda operators post rates at the counter only.",
    hours: "Narita T1 1F GPA 07:00–22:00; Haneda T3 arrival lobby (Japan Airport Terminal) 24 hours",
  },
];

const bestWays = [
  {
    rank: 1,
    title: "ATM Withdrawal (Best Rate)",
    body: "Withdrawing yen directly from a Japanese ATM gives you the closest rate to the interbank exchange rate — far better than any counter. The two best networks for foreign cards are 7-Eleven ATMs (found inside every 7-Eleven convenience store) and Japan Post ATMs (at post offices nationwide). Both accept Visa, Mastercard, Maestro, Cirrus, and most international cards. Use them with a travel card that charges no foreign transaction fees (Wise, Revolut, Charles Schwab) and your total cost is often under 0.5% — the closest thing to a perfect rate available to travellers.",
  },
  {
    rank: 2,
    title: "Wise / Revolut (Pre-loaded Card)",
    body: "Load your Wise or Revolut card with yen before you fly — both convert at the mid-market rate (the rate you see on Google) with minimal fees. Wise charges a small conversion fee that varies by currency (from around 0.4%); Revolut offers fee-free conversion up to a weekday monthly limit that depends on your plan and account country, with a roughly 1% markup at weekends on the Standard plan. Once loaded, use the card at ATMs or directly at shops. This approach works especially well if you want to lock in a rate before travelling or if you prefer a debit card over carrying cash.",
  },
  {
    rank: 3,
    title: "Currency Exchange Counters (Last Resort)",
    body: "Banks, post offices, and authorised exchange bureaux (both in your home country and in Japan) can exchange cash, but the cost is inside the rate. On 27 November 2026 GPA at Narita paid ¥154.86 for $1 and World Currency Shop in Tokyo ¥155.39 — 2.9% and 2.6% under the ¥159.5 mid-market rate — and for pounds both were about 6.3–6.4% under. The airport-to-city gap was 0.1–0.4%, so a counter is a counter wherever it is: use one only for a small float.",
  },
];

const avoidTable = [
  { location: "Airport exchange counters",   why: "2.9% under mid-market on the dollar and 6.4% on the pound at GPA Narita (27 Nov 2026) — the cost is in the rate" },
  { location: "Hotel front desk",            why: "Convenience mark-up; expect 5–10% worse than ATM" },
  { location: '"No commission" booths',      why: "Commission hidden in the exchange rate — often the worst overall" },
  { location: "Department store exchanges",  why: "Below-market rates; fine as a last resort, not a first choice" },
  { location: "Foreign bank ATMs in Japan",  why: "International network fees vary widely; use 7-Eleven or Japan Post instead" },
];

/**
 * What can come off the exchange question before you fly, and what cannot. The
 * "cash?" column is deliberately blunt — the point of the table is that the yen you
 * exchange only has to cover the bottom rows.
 */
const prepayRows = [
  {
    item: "Airport train or limousine bus into the city",
    cash: "No",
    how: "Buy the ticket online in your own currency; the counter or gate takes a voucher or QR code.",
  },
  {
    item: "City transport pass (e.g. Tokyo Subway Ticket)",
    cash: "No",
    how: "A 24, 48 or 72-hour pass is bought before departure and exchanged on arrival.",
  },
  {
    item: "IC card (Suica / Pasmo) top-ups",
    cash: "Yes",
    how: "Cannot be prepaid from abroad — most top-up machines take cash only, so budget yen for this.",
  },
  {
    item: "Attraction tickets and day tours",
    cash: "No",
    how: "Prebooked online and scanned at the gate; also removes the ticket-window queue.",
  },
  {
    item: "Mobile data",
    cash: "No",
    how: "An eSIM installed before you fly, instead of paying an airport SIM counter after landing.",
  },
  {
    item: "Hotel room",
    cash: "Usually no",
    how: "Prepay at booking. Small ryokan and family-run inns are the exception — some still settle on site.",
  },
  {
    item: "Convenience stores, chains, department stores",
    cash: "No",
    how: "Card and contactless are reliably accepted; nothing to arrange in advance.",
  },
  {
    item: "Small restaurants, temples, markets, coin lockers, some buses",
    cash: "Yes",
    how: "No prepay route exists. This is what the yen you exchange is actually for.",
  },
];

const cards = [
  {
    name: "Wise – Best Overall",
    desc: "Wise converts at the mid-market rate and charges a small transparent fee that varies by currency (from around 0.4%). You can hold yen in your Wise account and spend directly, or convert on the fly. Available in most countries. The Wise card works at ATMs worldwide; fee-free withdrawals are capped at a monthly allowance that depends on your account's registration country (around ¥30,000/month on a Japan-registered account; roughly £250 / $250 / €250 elsewhere), after which a fee of about 1.75–2.69% applies. Wise revised this structure on 1 May 2026 — confirm current limits in the app.",
  },
  {
    name: "Charles Schwab – Best for US Travellers",
    desc: "The Charles Schwab Investor Checking account reimburses all ATM fees worldwide — including the fee charged by the Japanese ATM itself. Combined with no foreign transaction fees, this is effectively free yen at the best available rate. The only catch: you need a US address to open an account.",
  },
  {
    name: "Starling / Monzo – Best for UK Travellers",
    desc: "Both Starling and Monzo offer fee-free foreign currency spending and ATM withdrawals up to their monthly limits (Starling: unlimited; Monzo: £200/month free). Starling has a slight edge for international use due to no monthly withdrawal cap. Both use the Mastercard exchange rate, which is very close to the mid-market rate.",
  },
];

/**
 * Five questions, all in FAQPage. How much cash to carry, card vs cash and the travel
 * cards themselves have their own guides; this list keeps to where and when to change money.
 */
const faqItems = [
  {
    q: "Where is the best place to exchange money in Japan?",
    a: "A 7-Eleven (Seven Bank) or Japan Post ATM, used with a card such as Wise or Revolut that converts at the mid-market rate. On 27 November 2026 an exchange counter paid ¥154.86 (GPA, Narita Airport) or ¥155.39 (World Currency Shop, Tokyo) for $1, against a mid-market rate of ¥159.5 on Wise's converter on 28 November — 2.6–2.9% less. Japan Post Bank charges up to ¥220 per withdrawal on overseas cards; Seven Bank publishes no single fee.",
  },
  {
    q: "Is it cheaper to exchange money at the airport in Japan?",
    a: "Barely different from the city, and both cost more than an ATM. On 27 November 2026 GPA's Narita counters paid ¥154.86 per $1 and World Currency Shop in Tokyo ¥155.39 — a 0.3% gap, or ¥530 on $1,000. For euros the gap was 0.4% and for pounds 0.1%, while both counters sat 2.6–6.4% under the mid-market rate depending on the currency.",
  },
  {
    q: "Can I exchange money at the airport in Japan at night?",
    a: "At Haneda, yes: Haneda's own page lists the Japan Airport Terminal Foreign Currency Exchange shops in the Terminal 3 arrival and departure lobbies as open 24 hours, though even 24-hour counters close briefly overnight for maintenance. At Narita the GPA counter in Terminal 1 North Wing 1F opens 07:00–22:00, and an automated exchange machine in the Terminal 2 main building runs 00:00–24:00 (checked 28 November 2026). A Seven Bank ATM takes Visa and Mastercard 24 hours.",
  },
  {
    q: "How much can I withdraw at a 7-Eleven ATM in Japan with a foreign card?",
    a: "Seven Bank states the limit per withdrawal for an overseas-issued card is ¥100,000, or ¥30,000 for a magnetic-stripe transaction, and that Visa and Mastercard can be used 00:00–24:00. A fee is charged per transaction where one applies, with no single figure published. At a Japan Post Bank ATM the single-transaction limit is ¥50,000 and a ¥220 (tax included) fee per use may apply. Both checked 28 November 2026; your card issuer's own limits and fees apply as well.",
  },
  {
    q: "Should I get yen before going to Japan?",
    a: "Only a float of ¥10,000–¥20,000 for the first hours, then withdraw the rest at a 7-Eleven or Japan Post ATM. Counters charge through the rate — 2.6–6.4% under mid-market on 27 November 2026 in both Narita and Tokyo — while a mid-market card at an ATM adds only the card's fee and the ATM's. Airport trains, passes, tours and an eSIM can be paid by card before you fly, which shrinks the float further.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/money/currency-exchange-japan") } });

export default function CurrencyExchangeJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money/currency-exchange-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money/currency-exchange-japan" />
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
                { "@type": "ListItem", position: 3, name: "Money & Payment", item: "https://www.japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "Currency Exchange", item: "https://www.japan-travel-kit.com/guides/money/currency-exchange-japan" },
              ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/money/currency-exchange-japan",
              headline: H1_TEXT,
              updated,
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
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Currency Exchange</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Currency Exchange in Japan (2026): <br />Best Rates &amp; Where to Exchange
          </h1>
          <p className={styles.heroSubtitle}>
            Same-day airport and city rates, the ATM limits and fees the banks themselves publish — and what to
            pay for before you land so you need less yen at all.
          </p>
          <div className={styles.heroBadges}>
            {[`Checked ${CHECKED}`, "Options Compared", "Fee Comparison Tool"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Disclaimer */}
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Not financial advice.</strong> This guide is general information only. Card fees and free ATM/FX
            allowances are current as of 2026, can change, and depend on the country where your account is registered
            (Wise revised its ATM fee structure on 1 May 2026). Always confirm the latest on the official{" "}
            <a href={WISE_FEES_URL} target="_blank" rel={WISE_REL} style={{ color: "var(--text)", fontWeight: 600 }}>Wise</a>{" "}
            and{" "}
            <a href="https://www.revolut.com/" target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--text)", fontWeight: 600 }}>Revolut</a>{" "}
            fees pages before you rely on them.
          </p>
        </div>

        {/* Answer first (task jtk-20261128-03): same-day posted rates, then the ATM route. */}
        <section className={styles.bodySection} style={{ marginBottom: "2rem" }}>
          <p className={styles.bodyText}>
            <strong>
              The best rate for currency exchange in Japan is a 7-Eleven (Seven Bank) or Japan Post ATM used
              with a mid-market card such as Wise, not a counter: on 27 November 2026 $1 in cash bought{" "}
              {RATES.usd.airport} at GPA&apos;s Narita Airport counters and {RATES.usd.city} at World Currency
              Shop in Tokyo, {RATES.usd.airportGap} and {RATES.usd.cityGap} under the {RATES.usd.mid} mid-market
              rate.
            </strong>{" "}
            A city exchange bureau beats the airport by only about 0.3% on the dollar (¥530 on $1,000) and 0.1%
            on the pound, where both counters sat about 6.3–6.4% under mid-market. At the ATM the card converts
            at mid-market plus its own fee, and Japan Post Bank adds up to ¥220 per withdrawal on overseas
            cards.
          </p>
          <p className={styles.bodyText}>
            The cash itself is needed mainly for small restaurants, temples, coin lockers and IC card top-ups —
            how much is in our{" "}
            <Link href="/guides/money/how-much-yen-to-bring-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              how much yen to bring guide
            </Link>
            . Every rate and hour is in the{" "}
            <a href="#options" style={{ color: "var(--accent)", fontWeight: 600 }}>
              comparison table ↓
            </a>
          </p>
        </section>

        {/* Pay before you land (task jtk-20261128-03): directly under the answer. Klook eSIM (20%),
            airport access and the Tokyo Subway Ticket (5%), one day tour (6.5%). */}
        <div id="pay-before-you-land">
          <KlookTripPrep
            label="Pay before you land"
            heading="What Can You Pay For Before You Change Any Money?"
            intro="Every one of these is booked on Klook in your own currency before you fly, so none of it comes out of the yen you change at a 2.6–6.4% counter margin. Pick the airport line for the airport you land at:"
            items={currencyExchangePayBeforeLand}
            headingLevel={3}
          />
        </div>

        <EsimCtaTop />

        {/* Options compared — official figures only, dated, best first */}
        <section className={styles.comparisonSection} id="options">
          <span className={styles.sectionLabel}>Options compared</span>
          <h2 className={styles.sectionTitle}>Airport, City Bureau or ATM: Which Gives the Best Rate in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            An ATM with a mid-market card, then a counter only for a float. The ATMs publish their limits and
            fees; the counters charge through the rate, which GPA and World Currency Shop post daily.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Verdict", "Rate (USD cash → yen)", "Fees and limits", "Hours"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {optionRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td style={{ fontSize: "0.86rem", fontWeight: 700 }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.rate}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.fees}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Last checked: {CHECKED_ISO}. Same-day counter rates for other currencies (27 Nov, about 11:00): euro{" "}
            {RATES.eur.airport} at GPA Narita and {RATES.eur.city} at World Currency Shop against {RATES.eur.mid}{" "}
            mid-market ({RATES.eur.airportGap} and {RATES.eur.cityGap} under); pound {RATES.gbp.airport} and{" "}
            {RATES.gbp.city} against {RATES.gbp.mid} ({RATES.gbp.airportGap} and {RATES.gbp.cityGap} under). Both
            shops state their posted rates are for reference and to check at the counter. Sources:{" "}
            <a href={GPA_RATE_URL} target="_blank" rel="noopener noreferrer nofollow">GPA today&apos;s rate</a>,{" "}
            <a href={WCS_RATE_URL} target="_blank" rel="noopener noreferrer nofollow">World Currency Shop rates</a>,{" "}
            <a href={WISE_MID_URL} target="_blank" rel="noopener noreferrer nofollow">Wise mid-market rate</a>,{" "}
            <a href={NARITA_EXCHANGE_URL} target="_blank" rel="noopener noreferrer nofollow">Narita Airport exchange</a>,{" "}
            <a href={HANEDA_EXCHANGE_URL} target="_blank" rel="noopener noreferrer nofollow">Haneda Airport exchange</a>,{" "}
            <a href={SEVEN_BANK_URL} target="_blank" rel="noopener noreferrer nofollow">Seven Bank</a>,{" "}
            <a href={JAPAN_POST_URL} target="_blank" rel="noopener noreferrer nofollow">Japan Post Bank</a> and{" "}
            <a href={WISE_URL} target="_blank" rel={WISE_REL}>Wise card</a>. Revolut&apos;s figures are from{" "}
            <Link href="/guides/money/revolut-card-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              our Revolut guide
            </Link>{" "}
            ({REVOLUT_CHECKED}). Which ATMs take a foreign card, and where they are, is in our{" "}
            <Link href="/guides/money/atms-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              ATMs in Japan guide
            </Link>
            ; which card to carry is in{" "}
            <Link href="/guides/money/best-travel-card-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              best travel card for Japan
            </Link>
            .
          </p>
        </section>

        {/* eSIM card after the table keeps its own placement id (#booking-esim-card). */}
        <BookingEsimCard lead="Exchange plan sorted? Get mobile data before you land." />

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best option</p>
                <p className={styles.verdictStatValue}>7-Eleven ATM with a no-fee card</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Second best</p>
                <p className={styles.verdictStatValue}>Japan Post ATM</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Avoid</p>
                <p className={styles.verdictStatValue}>Airport exchange counters &amp; hotels</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Bring</p>
                <p className={styles.verdictStatValue}>A travel card with no foreign fees</p>
              </div>
            </div>
            <a href="#fx-comparison" className={styles.verdictBtn}>
              Compare fees on my amount ↓
            </a>
          </div>
        </div>

        {/* Fee comparison tool */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Fee comparison</span>
          <h2 className={styles.sectionTitle}>How Much Does Each Way of Getting Yen Actually Cost?</h2>
          <p className={styles.bodyText}>
            From about 0.5% of what you convert on a mid-market card to 2.6–6.4% at a counter — the range the
            GPA and World Currency Shop boards showed on 27 November 2026 for the dollar, euro and pound. The
            tool below works from typical published fees (September 2026) rather than that day&apos;s boards:
            enter what you plan to convert in USD, EUR or GBP and see how much each method gives you, and how
            much disappears in fees and spread.
          </p>
          <FxFeeComparison />
        </section>

        {/* Best Ways to Get Yen */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Ranked options</span>
          <h2 className={styles.sectionTitle}>Where Is the Best Place to Exchange Money in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            A 7-Eleven or Japan Post ATM, used with a card that charges no foreign transaction fee — that
            combination lands closest to the mid-market rate of anything available to a visitor. Pre-loading a
            Wise or Revolut card is the next best option, and a counter of any kind is the last.
          </p>
          <div className={styles.stepsList}>
            {bestWays.map((item) => (
              <div key={item.rank} className={styles.stepCard}>
                <span className={styles.stepNum}>{item.rank}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Where NOT to Exchange */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What to avoid</span>
          <h2 className={styles.sectionTitle}>Can I Exchange Money at the Airport in Japan?</h2>
          <p className={styles.bodyText}>
            Yes — Narita and Haneda both have staffed counters and automated machines, and Haneda&apos;s Terminal 3
            arrival-lobby counter is open 24 hours; the cost is the rate, which at GPA&apos;s Narita stores was{" "}
            {RATES.usd.airport} per $1 on 27 November 2026, {RATES.usd.airportGap} under mid-market.
          </p>
          <p className={styles.bodyText}>
            Narita&apos;s page lists GPA, Chiba Bank, Keiyo Bank and Travelex (GPA in Terminal 1 North Wing 1F
            opens 07:00–22:00, and an automated machine in the Terminal 2 main building runs 00:00–24:00).
            Haneda&apos;s lists Japan Airport Terminal Foreign Currency Exchange, Travelex and Shinhan Bank Japan,
            and notes that even its 24-hour counters close briefly overnight for maintenance (both checked{" "}
            {CHECKED}). Seven Bank lists ATMs at Narita, Haneda, Kansai, New Chitose, Chubu, Fukuoka and Naha
            airports, which is the cheaper way to get the first yen. Hotel front desks and &ldquo;no
            commission&rdquo; booths charge the same way, through the rate they quote.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Location", "Why to Avoid"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {avoidTable.map((row) => (
                    <tr key={row.location}>
                      <td className={styles.tdProvider}>{row.location}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Airport and city counters were within 0.1–0.4% of each other on 27 November 2026; the real gap is
            between any counter and an ATM with a mid-market card.
          </p>
        </section>

        {/* Keeping the cost below a counter's — the Wise route */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Cheaper than a counter</span>
          <h2 className={styles.sectionTitle}>How Do You Pay Less Than an Exchange Desk Charges?</h2>
          <p className={styles.bodyText}>
            By making the cost visible: use a card whose rate is the public one and whose fee is printed
            separately, then keep cash withdrawals inside the card&apos;s free ATM allowance.
          </p>
          <p className={styles.bodyText}>
            A counter&apos;s cost is hidden in its rate, so you cannot see what you paid. A multi-currency card
            inverts that: the rate is the public one and the fee is printed separately. Wise states on its
            pricing page that it uses {WISE_VERIFIED.rateClaim} — no markup buried in the rate
            (checked {WISE_VERIFIED.checkedAt}).
          </p>
          <p className={styles.bodyText}>
            For the cash you still need, the card&apos;s free ATM allowance is what matters, and it depends on the
            country where your account is registered — Wise&apos;s UK card page gives free withdrawals up to{" "}
            {WISE_VERIFIED.freeAtmUk}, with {WISE_VERIFIED.overAtmFeeUk} on anything above that allowance
            (checked {WISE_VERIFIED.checkedAt}). Check your own country&apos;s figure in the app before you fly,
            then withdraw in larger amounts to stay inside it.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <a href={WISE_URL} className={styles.pickCta} target="_blank" rel={WISE_REL}>
              Get a Wise card →
            </a>
            <Link href="/guides/money/wise-card-japan" className={styles.pickCtaInternal}>
              Read our Wise card guide →
            </Link>
          </div>
        </section>

        {/* How Much Yen — summary only; the tables live in how-much-yen-to-bring-japan (28 Nov 2026). */}
        <section className={styles.bodySection} id="how-much-yen">
          <span className={styles.sectionLabel}>Planning</span>
          <h2 className={styles.sectionTitle}>How Much Yen Should I Change for Japan?</h2>
          <p className={styles.bodyText}>
            About ¥10,000–¥20,000 on arrival, then roughly ¥2,000–¥8,000 a day in cash depending on travel style,
            topped up from ATMs rather than changed all at once. The per-day table and the places that still
            want cash are in our{" "}
            <Link href="/guides/money/how-much-yen-to-bring-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              how much yen to bring to Japan
            </Link>{" "}
            guide; a Tokyo trip priced line by line is in the{" "}
            <Link href="/guides/money/tokyo-trip-cost" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Tokyo trip cost guide
            </Link>
            .
          </p>
        </section>

        {/* Best Cards */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Recommended cards</span>
          <h2 className={styles.sectionTitle}>Which Card Is Best for Getting Yen in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            Wise for most travellers, Charles Schwab if you can open a US account (it reimburses the ATM&apos;s
            own fee), and Starling or Monzo for UK residents. All four avoid foreign transaction fees; they
            differ mainly in how much cash you can pull out before a fee starts.
          </p>
          <div className={styles.stepsList}>
            {cards.map((card) => (
              <div key={card.name} className={styles.stepCard}>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{card.name}</p>
                  <p className={styles.stepDesc}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Note: the Japanese ATM usually charges its own fee on top, separate from anything your bank takes.
            Japan Post Bank&apos;s international ATM page states a fee of ¥220 (tax included) per use may apply;
            Seven Bank charges per transaction where a fee applies but publishes no single figure (both checked
            {" "}{CHECKED}). A Wise or Charles Schwab card eliminates your bank&apos;s fees; the ATM&apos;s own
            fee is harder to avoid.
          </p>
        </section>

        {/* Before or After */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Strategy</span>
          <h2 className={styles.sectionTitle}>Is It Better to Exchange Money Before Going to Japan?</h2>
          <p className={styles.bodyText}>
            Only a small float — ¥10,000 to ¥20,000 — and only so you are not hunting for an ATM in the first
            hour. Changing the bulk of your money before you fly costs you several percent for nothing. Our{" "}
            <Link href="/guides/money/how-much-yen-to-bring-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              how much yen to bring guide
            </Link>{" "}
            sizes that float by trip length.
          </p>
          <p className={styles.bodyText}>
            That float covers the first purchases before you reach an ATM — and less of it is needed if the
            airport train, the subway pass and the eSIM are already{" "}
            <a href="#pay-before-you-land" style={{ color: "var(--accent)", fontWeight: 600 }}>paid before you land</a>.
            For the rest, withdraw at a 7-Eleven (Seven Bank) ATM, which takes Visa and Mastercard 00:00–24:00 in
            more than 28,000 locations, or a Japan Post ATM.
          </p>
          <p className={styles.bodyText}>
            Withdraw larger amounts less often: Japan Post Bank&apos;s fee is per use (¥220 where it applies), so
            one ¥50,000 withdrawal costs the same machine fee as one ¥10,000 withdrawal.
          </p>
        </section>

        {/* Banks */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Banks</span>
          <h2 className={styles.sectionTitle}>Can I Exchange Money at a Japanese Bank?</h2>
          <p className={styles.bodyText}>
            At some, but a bank counter is not the easy option it is in many countries. The clearest place to find
            one is the airport: Narita&apos;s page lists Chiba Bank and Keiyo Bank exchange counters alongside GPA
            and Travelex, and Haneda&apos;s lists Shinhan Bank Japan (checked {CHECKED}). In the city, not every
            branch handles foreign cash, so check the bank&apos;s branch list before going.
          </p>
          <p className={styles.bodyText}>
            For withdrawing rather than exchanging, the bank that matters is Seven Bank, inside 7-Eleven, plus
            Japan Post Bank at post offices — those are the two networks the table above lists for overseas-issued
            cards.
          </p>
        </section>

        {/* Card vs cash, and the prepay table — the part a rate comparison can't answer */}
        <section className={styles.bodySection} id="prepay">
          <span className={styles.sectionLabel}>Cutting the amount down</span>
          <h2 className={styles.sectionTitle}>Can I Pay by Card Instead of Cash in Japan?</h2>
          <p className={styles.bodyText}>
            For a growing share of your spending, yes — convenience stores, chain restaurants, department
            stores, hotels and most transport tickets take cards. What stays stubbornly cash-only is the small
            end: independent restaurants, temple entries, market stalls, coin lockers and some local buses. Our{" "}
            <Link href="/guides/money/cash-vs-card-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              cash vs card guide
            </Link>{" "}
            goes through it place by place.
          </p>
          <p className={styles.bodyText}>
            That split is what decides how much the exchange rate matters to you. Everything marked
            &ldquo;No&rdquo; in the table below can be settled in your own currency before you leave, which
            means the yen you change on arrival only has to cover the two rows marked &ldquo;Yes&rdquo;.
          </p>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.75rem" }}>
            How much cash do you actually need if you prepay?
          </h3>
          <p className={styles.bodyText}>
            Only the bottom rows of the table below. Prepay the airport train, the transport pass, the tickets,
            the data and the room, and what is left is food at small restaurants, temple entries, coin lockers
            and IC card top-ups — the ¥2,000–¥8,000 a day in the{" "}
            <a href="#how-much-yen" style={{ color: "var(--accent)", fontWeight: 600 }}>summary above</a>.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1.25rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Cash needed?", "How you can pay ahead"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {prepayRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td className={styles.tdPrice}>{row.cash}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Two caveats. Tapping in with a foreign contactless card does not work on every line yet, so a pass or
            an IC card is still useful —{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              see our IC card guide
            </Link>
            {" "}for how the top-ups work. And a prepaid hotel room is not universal: confirm at booking, because
            some small inns still take payment on site.
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/money/how-much-yen-to-bring-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <circle cx="12" cy="12" r="2.5" />
                  <path d="M6 12h.01M18 12h.01" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>How Much Yen to Bring to Japan 2026: Cash per Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/cash-vs-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cash vs Card in Japan (2026): Where Cards Work and Where You Need Yen</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/best-travel-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
                  <path d="M6 15h2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Travel Card for Japan (2026): Fees and ATM Limits Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/atms-in-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>ATMs in Japan (2026): Which Accept Foreign Cards &amp; What the Fees Are</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/tokyo-trip-cost" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path d="M6 10h12M6 14h8" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Trip to Tokyo Cost (2026): Per Day, 5-Day and 7-Day Totals</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>All Japan Money &amp; Payment Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Planning your Japan trip budget?</h2>
            <p className={styles.ctaBannerDesc}>
              See our full breakdown of what Japan costs — accommodation, food, transport, and activities — for every budget level.
            </p>
            <Link href="/guides/money/japan-travel-budget" className={styles.ctaBannerBtn}>
              View Japan Travel Budget Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
