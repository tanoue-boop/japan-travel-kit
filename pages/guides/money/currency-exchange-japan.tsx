import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import FxFeeComparison from "../../../components/FxFeeComparison";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { currencyExchangeTripPrep } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { wiseLink, WISE_REL, WISE_PRICING_URL, WISE_CARD_URL, WISE_VERIFIED } from "../../../lib/wise-links";

const WISE_URL = wiseLink("currency-exchange-japan", WISE_CARD_URL);
const WISE_FEES_URL = wiseLink("currency-exchange-japan", WISE_PRICING_URL);

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
    body: "Banks, post offices, and authorised exchange bureaux (both in your home country and in Japan) can exchange cash, but the spread between the buy and sell rate is typically 3–8%. Airport counters in Japan (Narita, Haneda) are the most convenient but the most expensive. If you must use a counter, Travelex and airport bank branches in Japan generally offer better rates than hotel desks or standalone booths claiming 'no commission'. Exchange currency at home only as a last resort.",
  },
];

const avoidTable = [
  { location: "Airport exchange counters",   why: "Worst rates on the market — fees built into the spread" },
  { location: "Hotel front desk",            why: "Convenience mark-up; expect 5–10% worse than ATM" },
  { location: '"No commission" booths',      why: "Commission hidden in the exchange rate — often the worst overall" },
  { location: "Department store exchanges",  why: "Below-market rates; fine as a last resort, not a first choice" },
  { location: "Foreign bank ATMs in Japan",  why: "International network fees vary widely; use 7-Eleven or Japan Post instead" },
];

const dailyRows = [
  { category: "Accommodation", budget: "¥3,000",  mid: "¥10,000", comfort: "¥20,000" },
  { category: "Food",          budget: "¥1,500",  mid: "¥4,000",  comfort: "¥8,000"  },
  { category: "Transport",     budget: "¥500",    mid: "¥1,500",  comfort: "¥3,000"  },
  { category: "Activities",    budget: "¥500",    mid: "¥2,000",  comfort: "¥5,000"  },
  { category: "Total / day",   budget: "¥5,500",  mid: "¥17,500", comfort: "¥36,000" },
];

const budgetRows = [
  { length: "1 week",  budget: "¥50,000",  mid: "¥150,000", comfortable: "¥300,000" },
  { length: "2 weeks", budget: "¥100,000", mid: "¥300,000", comfortable: "¥600,000" },
  { length: "3 weeks", budget: "¥150,000", mid: "¥450,000", comfortable: "¥900,000" },
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

const faqItems = [
  {
    q: "How much do I lose exchanging money at a Japanese airport instead of using a Wise or Revolut card?",
    a: "Roughly 5–7% of your money. Airport counters at Narita, Haneda and Kansai build their margin into the exchange rate, while Wise converts at the mid-market rate for a fee of around 0.5% and Revolut is fee-free on weekdays up to your plan's monthly allowance. On $1,000, that's the difference between receiving about ¥138,000 at the airport and roughly ¥146,000 with a Wise card at a 7-Eleven ATM or shop terminal. Use the comparison tool on this page to see the numbers for your own amount and currency.",
  },
  {
    q: "Is it cheaper to exchange money at the airport in Japan?",
    a: "No — on the published-fee data behind the comparison tool on this page (September 2026), an airport counter at Narita, Haneda or Kansai prices its convenience in with a spread of roughly 5–7%, against about 2–3% at a city exchange bureau and around 0.45–0.55% for a Wise card converting at the mid-market rate. On $1,000 at ¥147 to the dollar that is about ¥138,200 from the airport counter versus about ¥146,200 on the card — roughly ¥8,000 for changing cash in the arrivals hall. The one case for the airport counter is a small arrival float if you have no card that avoids foreign transaction fees.",
  },
  {
    q: "Where is the best place to exchange money in Japan?",
    a: "The best place to get yen in Japan is a 7-Eleven ATM or Japan Post ATM, used with a travel card that charges no foreign transaction fees (Wise, Revolut, or Charles Schwab). These give you the mid-market exchange rate with minimal charges. Currency exchange counters — including those at airports — offer significantly worse rates and should be avoided if possible.",
  },
  {
    q: "Should I get yen before going to Japan?",
    a: "We recommend bringing a small amount of yen (¥10,000–¥20,000) for immediate needs on arrival — transport from the airport, vending machines, or small purchases before you find an ATM. For the bulk of your spending, withdraw yen from a 7-Eleven or Japan Post ATM on arrival for a much better rate than you'll get at a foreign exchange counter.",
  },
  {
    q: "Is it better to use card or cash in Japan?",
    a: "Both. Japan remains more cash-reliant than most developed countries — many restaurants, smaller shops, temples, and vending machines are cash-only. That said, card acceptance has improved significantly, especially in cities and at convenience stores. The practical approach: carry ¥10,000–¥20,000 in cash at all times and use your card where accepted to minimise ATM trips.",
  },
  {
    q: "Can I exchange money at Japanese convenience stores?",
    a: "You cannot exchange currency at convenience store counters, but you can withdraw yen using a foreign card at the ATM inside. 7-Eleven ATMs in Japan are among the best in the country for foreign card acceptance — they take Visa, Mastercard, Maestro, American Express, and most international networks. The ATM interface is available in English.",
  },
  {
    q: "Can I use a foreign card at Japanese ATMs?",
    a: "Yes, at the two networks built for them. Seven Bank's own international-card pages state that cards carrying the Visa, PLUS, Mastercard, Maestro, Cirrus, UnionPay, American Express, JCB, Discover or Diners Club marks can be used at its ATMs in over 28,000 7-Eleven stores, that the limit per withdrawal for an overseas-issued card is ¥100,000 (¥30,000 for a magnetic-stripe card), that Visa and Mastercard are accepted 00:00–24:00, and that the screens run in ten languages including English. Japan Post Bank's international ATM page lists Visa, PLUS, Mastercard, Maestro, Cirrus, JCB, China UnionPay and Discover, a single-transaction withdrawal limit of ¥50,000, and an ATM usage fee of ¥220 (tax included) per use that may apply; balance inquiries are not available. Seven Bank does not publish a single figure for overseas cards — it states the fee differs by card brand — and both banks note your own card issuer may charge on top. Both pages checked 22 October 2026. Most ordinary Japanese bank ATMs (Mizuho, MUFG, SMBC) will not take a foreign card at all.",
  },
  {
    q: "What is the best exchange rate app for Japan?",
    a: "For checking the current yen rate, Google (type 'USD to JPY') shows the mid-market rate in real time. The Wise app shows you exactly what rate you'll get and what fee you'll pay. XE Currency and OANDA are good secondary references. The rate shown on Google is the interbank rate — your actual cost will be slightly higher regardless of which method you use.",
  },
  {
    q: "How much yen should I bring for 2 weeks in Japan?",
    a: "It depends on your travel style. Budget travellers can manage with around ¥70,000–¥100,000 for 14 days, mid-range travellers should plan for ¥240,000–¥300,000 total spending (though much can go on card), and comfortable travellers up to ¥500,000–¥600,000. You don't need to carry all of it as cash — bring ¥30,000–¥50,000 to start and top up from 7-Eleven ATMs as you go.",
  },
  {
    q: "How much cash do I need per day in Japan?",
    a: "Budget travellers typically spend ¥5,000–¥8,000 per day, mid-range travellers ¥10,000–¥15,000, and comfortable travellers ¥20,000–¥30,000. Not all of that needs to be cash — but plan to have at least a few thousand yen on hand each day for cash-only restaurants, temples, and small shops.",
  },
  {
    q: "What is the best way to carry money in Japan?",
    a: "A combination works best: a travel card like Wise or Revolut for card payments and fee-free ATM withdrawals, plus enough physical cash for daily cash-only spending. Keep an emergency ¥10,000 note separate from your main wallet, and load an IC card (Suica/Pasmo) to handle small purchases and transport without fumbling for coins.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/money/currency-exchange-japan") } });

export default function CurrencyExchangeJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Currency Exchange in Japan 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="Where should you exchange money in Japan? We rank the best options from ATMs to airport counters — and explain which to avoid to get the best yen rate."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money/currency-exchange-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Currency Exchange in Japan 2026: Best Ways to Get Yen" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money/currency-exchange-japan" />
        <meta property="og:description" content="Where should you exchange money in Japan? We rank the best options from ATMs to airport counters — and explain which to avoid to get the best yen rate." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Currency Exchange in Japan 2026: Best Ways to Get Yen" />
        <meta name="twitter:description" content="Where should you exchange money in Japan? We rank the best options from ATMs to airport counters — and explain which to avoid to get the best yen rate." />
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
              headline: "Currency Exchange in Japan (2026): Best Ways to Get Yen",
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
          </svg>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
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
            Currency Exchange in Japan (2026):<br />Best Ways to Get Yen
          </h1>
          <p className={styles.heroSubtitle}>
            Where you exchange your money makes a big difference. Here&apos;s how to get the best yen rate — and what to avoid.
          </p>
          <div className={styles.heroBadges}>
            {["Fee Comparison Tool", "Best Rates", "How Much Yen to Bring"].map((t) => (
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

        {/* Answer first — the one thing the page exists to settle */}
        <section className={styles.bodySection} style={{ marginBottom: "2.5rem" }}>
          <p className={styles.bodyText}>
            <strong>
              The cheapest way to get yen is not an exchange desk at all — it is a card that converts at the
              mid-market rate, used to pay directly or to withdraw from a 7-Eleven or Japan Post ATM.
            </strong>{" "}
            On the published-fee data behind the tool below (September 2026), a Wise card costs roughly
            0.45–0.55% of the amount converted and Revolut is fee-free on weekdays up to its plan allowance,
            against a spread of about 2–3% at a city exchange bureau and 5–7% at an airport counter.
            On $1,000 at ¥147 to the dollar, that is about ¥146,200 on the card versus about ¥138,200 at the
            airport — roughly ¥8,000 for the convenience of changing cash in the arrivals hall.
          </p>
          <p className={styles.bodyText}>
            The second half of the answer is the part a rate comparison cannot give you: how much yen you need
            at all. Airport trains, transport passes, tickets, mobile data and most hotel rooms can be paid for
            in your own currency before you leave, which shrinks the amount the exchange rate applies to.{" "}
            <a href="#prepay" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Jump to what you can prepay ↓
            </a>
          </p>
        </section>

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
            Between roughly 0.5% and 7% of whatever you convert, depending on the method — a mid-market card at
            the low end, an airport counter at the high end. Percentages are abstract, though, and yen in your
            hand isn&apos;t: enter what you plan to convert in USD, EUR or GBP and see how much each method
            actually gives you, and how much disappears in fees and spread.
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
          <h2 className={styles.sectionTitle}>Which Places Should You Avoid Exchanging Money?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            Airport counters, hotel front desks and &ldquo;no commission&rdquo; booths — all three bury their
            margin in the rate they quote, so you never see what you paid.
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
            The golden rule: the more convenient the exchange location, the worse the rate. Airport counters bank on travellers being in a hurry.
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

        {/* How Much Yen */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Planning</span>
          <h2 className={styles.sectionTitle}>How Much Yen Should I Bring to Japan?</h2>
          <p className={styles.bodyText}>
            Bring ¥10,000–¥20,000 in hand for the first day and plan on roughly ¥5,500 per day at the budget
            end, ¥17,500 mid-range and ¥36,000 comfortably — then top up from ATMs rather than carrying the
            whole trip in cash. Japan is still a heavily cash-reliant country, especially outside major cities.
            Here&apos;s the daily breakdown by travel style, followed by totals per trip length.
          </p>
          <div className={styles.tableWrap} style={{ marginBottom: "1.25rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Per day", "Budget", "Mid-range", "Comfortable"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dailyRows.map((row) => (
                    <tr key={row.category}>
                      <td className={styles.tdProvider}>{row.category}</td>
                      <td className={styles.tdPrice}>{row.budget}</td>
                      <td className={styles.tdPrice}>{row.mid}</td>
                      <td className={styles.tdPrice}>{row.comfort}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Trip Length", "Budget", "Mid-range", "Comfortable"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {budgetRows.map((row) => (
                    <tr key={row.length}>
                      <td className={styles.tdProvider}>{row.length}</td>
                      <td className={styles.tdPrice}>{row.budget}</td>
                      <td className={styles.tdPrice}>{row.mid}</td>
                      <td className={styles.tdPrice}>{row.comfortable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            These are total yen estimates including accommodation, food, transport, and activities. Actual spending depends heavily on your itinerary and accommodation choices.
            You don&apos;t need to carry it all as cash: start with ¥30,000–¥50,000, keep an emergency ¥10,000 note separate, put small purchases on a Suica/Pasmo IC card, and top up from 7-Eleven ATMs as you go.
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
            Seven Bank does not publish a single figure and states the fee differs by card brand (both checked
            22 October 2026). A Wise or Charles Schwab card eliminates your bank&apos;s fees; the ATM&apos;s own
            fee is harder to avoid.
          </p>
        </section>

        {/* Before or After */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Strategy</span>
          <h2 className={styles.sectionTitle}>Should I Exchange Money Before Going to Japan?</h2>
          <p className={styles.bodyText}>
            Only a small float — ¥10,000 to ¥20,000 — and only so you are not hunting for an ATM in the first
            hour. Changing the bulk of your money before you fly costs you several percent for nothing.
          </p>
          <p className={styles.bodyText}>
            That float covers your airport transfer, any immediate purchases, and gives you breathing room before you find an ATM. The rate at a bank or post office in your home country is rarely great, but it&apos;s usually better than a dedicated airport exchange counter.
          </p>
          <p className={styles.bodyText}>
            For the bulk of your spending money, withdraw yen from a 7-Eleven or Japan Post ATM in Japan. The rate is significantly better than any over-the-counter exchange, and ATMs are available 24/7 at convenience stores across the country — you will never be far from one in any city or major tourist area.
          </p>
          <p className={styles.bodyText}>
            One practical tip: withdraw larger amounts less frequently to minimise ATM fees. A single ¥50,000 withdrawal costs the same machine fee as a ¥10,000 withdrawal.
          </p>
        </section>

        {/* Card vs cash, and the prepay table — the part a rate comparison can't answer */}
        <section className={styles.bodySection} id="prepay">
          <span className={styles.sectionLabel}>Cutting the amount down</span>
          <h2 className={styles.sectionTitle}>Can I Pay by Card Instead of Cash in Japan?</h2>
          <p className={styles.bodyText}>
            For a growing share of your spending, yes — convenience stores, chain restaurants, department
            stores, hotels and most transport tickets take cards. What stays stubbornly cash-only is the small
            end: independent restaurants, temple entries, market stalls, coin lockers and some local buses.
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
            Less than the daily totals above suggest. Prepay the airport train, the transport pass, the tickets,
            the data and the room, and the accommodation and transport lines of that table are already settled —
            what is left is mostly the food line, which runs ¥1,500 a day at the budget end, ¥4,000 mid-range
            and ¥8,000 comfortably, plus small entries and incidentals.
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
            Two caveats. Foreign contactless cards do not open Tokyo Metro or Toei ticket gates, so a pass or an
            IC card is still needed —{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              see our IC card guide
            </Link>
            {" "}for how the top-ups work. And a prepaid hotel room is not universal: confirm at booking, because
            some small inns still take payment on site.
          </p>
        </section>

        {/* Klook: things better paid for before the exchange desk */}
        <KlookTripPrep
          heading="Pay for These Before You Change Money"
          intro="These are the rows above you can settle in your own currency, booked before you leave. Each one shrinks the amount the arrival-day exchange rate applies to:"
          items={currencyExchangeTripPrep}
        />

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
            <Link href="/guides/money/cash-vs-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cash vs Card in Japan (2026): What Actually Works?</p>
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
                <p className={styles.relatedTitle}>Best Travel Card for Japan (2026): Top Picks for Foreign Visitors</p>
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
                <p className={styles.relatedTitle}>ATMs in Japan (2026): Where to Find Them &amp; How to Use Them</p>
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
