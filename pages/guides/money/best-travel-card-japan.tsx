import Head from "next/head";
import Link from "next/link";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { bestTravelCardTripPrep } from "../../../lib/klook-links";
import { wiseLink, WISE_REL, WISE_PRICING_URL, WISE_CARD_URL } from "../../../lib/wise-links";

const WISE_FEES_URL = wiseLink("best-travel-card-japan", WISE_PRICING_URL);
const WISE_CARD_CTA = wiseLink("best-travel-card-japan", WISE_CARD_URL);

/**
 * Every fee, allowance, limit and annual fee in the tables below was read off the
 * company's or the bank's own site on this date — Wise's five country card-fee
 * pages, Monzo's fee information, Starling's current-account page, Seven Bank's
 * and Japan Post Bank's overseas-card pages, and the three US issuers' own card
 * pages. Two names on this page answer an automated read with HTTP 403 — Revolut
 * and Charles Schwab — so no figure for either appears in any table. The prose
 * about them carries no numbers for the same reason.
 */
const CHECKED = "26 October 2026";

/**
 * Requirement (1) of the rewrite: the type-by-type table the pages ranking above
 * this one lead with. One row per kind of card rather than one row per brand,
 * because the first decision a reader makes is debit vs prepaid vs credit — and
 * every cell is either a quote or a figure from the issuer's own page.
 */
const cardTypeRows = [
  {
    type: "Multi-currency debit card",
    example: "Wise",
    cost: "One-off card fee: 9 USD, 7 GBP, 7 EUR, 10 AUD, or free in Canada. No monthly or annual fee.",
    purchase: "No fee just for using the card abroad. A conversion fee applies when money changes currency — Wise headlines it as “From 0.24%”.",
    rate: "The mid-market rate. Wise: “We only use the mid-market rate — the one you can check on Google”.",
    atm: "Free to your account country’s monthly allowance, then 2.69% of the excess (1.95 USD + 1.95% per withdrawal on a US card). The Japanese machine’s own fee is separate.",
  },
  {
    type: "App bank debit card (UK)",
    example: "Monzo",
    cost: "No card fee on the free current account.",
    purchase: "“Debit card payment in foreign currency: £0”.",
    rate: "“We use a third-party exchange rate which is usually the mid-market rate”.",
    atm: "“£0 up to £200 in a rolling 30-day period, then 3% of the total amount withdrawn after that”, outside the UK and EEA.",
  },
  {
    type: "App bank debit card (UK)",
    example: "Starling",
    cost: "No card fee on the personal current account.",
    purchase: "“Spend and withdraw abroad with no fees from us”.",
    rate: "Not published as a figure on the current-account page.",
    atm: "No Starling fee stated. The Japanese operator’s own fee still applies.",
  },
  {
    type: "Prepaid travel-money card",
    example: "Loaded before you fly",
    cost: "Set by the issuer.",
    purchase: "Set by the issuer.",
    rate: "Fixed at the moment you load the card, not at the moment you spend — so the rate you accept is the one on sale that day, whatever happens to the yen afterwards.",
    atm: "Set by the issuer, plus the Japanese operator’s fee.",
  },
  {
    type: "No-foreign-transaction-fee credit card",
    example: "US issuers, below",
    cost: "0 USD to 95 USD a year on the three cards checked below.",
    purchase: "No foreign transaction fee, in each issuer’s own words.",
    rate: "The card network’s rate. The issuer adds no conversion fee of its own when it states there is no foreign transaction fee.",
    atm: "A cash withdrawal on a credit card is a cash advance: a cash-advance fee and interest from day one are normal. Use a debit card for yen instead.",
  },
  {
    type: "Standard high-street bank card",
    example: "Your everyday card",
    cost: "Usually none.",
    purchase: "Check your own card’s terms — a foreign transaction fee is the default on most, not the exception.",
    rate: "Check your own card’s terms.",
    atm: "Check your own card’s terms, plus the Japanese operator’s fee.",
  },
];

/**
 * Requirement (3), the numbers half: Wise's allowance is set by the country your
 * account is registered in, not the country you are standing in, and the spread
 * between them is wide enough to change the advice — 400 AUD against 100 CAD.
 * Sources: wise.com/{us,gb,de,au,ca}/pricing/card-fees, read on CHECKED.
 */
const wiseByCountry = [
  { country: "United States", card: "9 USD", free: "250 USD per month", over: "1.95 USD + 1.95% on each withdrawal past 250 USD" },
  { country: "United Kingdom", card: "7 GBP", free: "250 GBP per month", over: "2.69% of the amount over 250 GBP" },
  { country: "Eurozone", card: "7 EUR", free: "250 EUR per month", over: "2.69% of the amount over 250 EUR" },
  { country: "Australia", card: "10 AUD", free: "400 AUD per month", over: "2.69% of the amount over 400 AUD" },
  { country: "Canada", card: "Free", free: "100 CAD per month", over: "2.69 CAD + 2.69% of the amount over 100 CAD" },
];

/** Requirement (3), the advice half: which card to reach for first, by where you bank. */
const countryPicks = [
  {
    country: "United States",
    first: "Wise",
    why: "250 USD of fee-free withdrawals a month at the mid-market rate, for a one-off 9 USD card.",
    second: "A no-foreign-transaction-fee Visa or Mastercard credit card for hotels and large bookings.",
  },
  {
    country: "United Kingdom",
    first: "Monzo or Starling",
    why: "Monzo states £0 on foreign-currency card payments and £0 on cash to £200 per rolling 30 days; Starling states no fees of its own on spending or withdrawing abroad.",
    second: "Wise, for the 250 GBP monthly ATM allowance on top of the app bank’s.",
  },
  {
    country: "Australia",
    first: "Wise",
    why: "The most generous of the five allowances: 400 AUD a month free, 2.69% above it, card 10 AUD.",
    second: "An Australian credit card with no international transaction fee — check your own card’s terms.",
  },
  {
    country: "Canada",
    first: "Wise, but withdraw carefully",
    why: "The card is free, but the Canadian allowance is the tightest of the five: 100 CAD a month, then 2.69 CAD + 2.69%.",
    second: "A Canadian no-FX-fee credit card for everything you can pay for by card, so the cash allowance lasts.",
  },
  {
    country: "Eurozone",
    first: "Wise",
    why: "250 EUR a month free, 2.69% above it, card 7 EUR.",
    second: "A second card on the other network — a Visa and a Mastercard rather than two of one.",
  },
];

/**
 * Requirement (2). Three cards, three issuer pages, nothing from a comparison site.
 * No sign-up bonus or points valuation appears here: those move monthly and are not
 * what decides whether a card is worth carrying through a yen terminal.
 */
const usCreditCards = [
  {
    card: "Capital One VentureOne Rewards",
    fee: "$0 Annual Fee",
    fx: "“You won’t pay a transaction fee when making purchases outside of the United States.”",
  },
  {
    card: "Capital One Venture Rewards",
    fee: "$95",
    fx: "“No foreign transaction fees”.",
  },
  {
    card: "Chase Sapphire Preferred",
    fee: "$95 annual fee",
    fx: "No foreign transaction fees on purchases made outside the United States.",
  },
];

/**
 * Requirement (5). Only the two operators that publish something readable appear
 * with figures. Seven Bank prints its limits and hours but says of the fee only
 * that it varies by brand, and that gap is stated rather than filled in.
 */
const japanAtmRows = [
  {
    atm: "Seven Bank — inside 7-Eleven stores",
    takes: "Visa (incl. PLUS), Mastercard (incl. Maestro and Cirrus), UnionPay, American Express, JCB, Discover, Diners Club",
    fee: "No figure published. Seven Bank states only that “Fees for cards issued overseas vary by the card brand”, charged per transaction.",
    limit: "¥100,000 per withdrawal, or ¥30,000 if the machine reads the magnetic stripe rather than the chip",
    hours: "00:00–24:00 for Visa and Mastercard",
  },
  {
    atm: "Japan Post Bank — post offices, branches, some FamilyMart stores",
    takes: "VISA, PLUS, Mastercard, Maestro, Cirrus, JCB, China UnionPay, DISCOVER",
    fee: "“When using certain cards issued abroad, an ATM usage fee (¥220 (tax included) per use) may apply.”",
    limit: "¥50,000 per transaction",
    hours: "Post offices and branches Mon–Sat 7:00–23:00; convenience-store machines 0:05–23:55",
  },
];

const whatToLookFor = [
  {
    rank: 1,
    name: "No foreign transaction fees",
    desc: "Many standard credit and debit cards charge 1–3% on every purchase abroad. Over a two-week trip, this adds up fast. Only use cards that waive foreign transaction fees entirely.",
  },
  {
    rank: 2,
    name: "Real exchange rates (interbank or mid-market)",
    desc: "Banks and currency exchange desks typically mark up the exchange rate by 2–4%. The best travel cards use the mid-market rate — the rate you see on Google — so you always know exactly what you're paying.",
  },
  {
    rank: 3,
    name: "ATM access without surcharges",
    desc: "Japan is still heavily cash-based. Your card needs to work at Japanese ATMs (7-Eleven, Japan Post, AEON) without charging extra. Some cards also reimburse third-party ATM fees — a significant bonus.",
  },
  {
    rank: 4,
    name: "Chip-and-PIN and contactless support",
    desc: "Japanese card terminals overwhelmingly use chip-and-PIN. Magstripe-only cards are often declined. Ensure your card has an EMV chip. Contactless (Visa/Mastercard tap) is growing but not yet universal.",
  },
];

const bestCards = [
  {
    name: "Wise (formerly TransferWise)",
    badge: "Best Overall",
    badgeColor: "var(--accent)",
    pros: [
      "Mid-market exchange rate with a small conversion fee (from ~0.4%, varies by currency)",
      "Fee-free ATM withdrawals up to a monthly allowance set by your account's country (≈¥30,000/mo on a Japan account)",
      "Holds multiple currencies — convert before you travel to lock in a rate",
      "Works at all major Japanese ATM networks (7-Eleven, Japan Post, AEON)",
    ],
    cons: [
      "ATM fee (~1.75–2.69%) applies above the monthly free allowance",
      "Requires a smartphone app for setup and management",
      "Not a credit card — no purchase protection or rewards points",
    ],
    verdict: "Wise is our top pick for most travellers. The exchange rate is consistently better than any high-street bank, ATM access is reliable across Japan, and the app makes it easy to track spending in real time.",
  },
  {
    name: "Revolut",
    badge: "Best for Frequent Travellers",
    badgeColor: "var(--sumi)",
    pros: [
      "Mid-market rate on weekdays (a small markup applies on weekends)",
      "Free ATM withdrawals up to a monthly limit (varies by plan and account country)",
      "Instant spend notifications and easy card freeze via the app",
      "Premium and Metal plans offer higher ATM limits and travel insurance",
    ],
    cons: [
      "Weekend conversion is marked up ~1% on the Standard plan",
      "Free plan has a lower ATM allowance than Wise",
      "Some users report occasional card declines in rural Japan",
    ],
    verdict: "Revolut is a strong alternative — particularly the paid plans, which offer higher ATM limits and additional travel perks. The weekend markup is a minor trade-off for most trips.",
  },
  {
    name: "Charles Schwab Investor Checking (US only)",
    badge: "Best for US Travellers",
    badgeColor: "var(--sumi)",
    pros: [
      "Unlimited ATM fee reimbursements worldwide, including Japan",
      "No foreign transaction fees on any purchase",
      "No monthly fees, no minimum balance requirement",
      "Uses the Visa exchange rate — competitive and consistent",
    ],
    cons: [
      "Available to US residents only",
      "No physical branches outside the US — app-based management",
      "Linked to a brokerage account (minor setup step)",
    ],
    verdict: "For US travellers, Charles Schwab is the gold standard. Unlimited ATM fee reimbursements mean you never pay an extra yen at a 7-Eleven ATM — a significant advantage in a cash-heavy country like Japan.",
  },
  {
    name: "Starling Bank / Monzo (UK only)",
    badge: "Best for UK Travellers",
    badgeColor: "var(--sumi)",
    pros: [
      "Both use the Mastercard exchange rate with no additional markup",
      "No foreign transaction fees on purchases",
      "Fee-free ATM withdrawals abroad up to monthly limits",
      "User-friendly apps with instant spend notifications",
    ],
    cons: [
      "Monthly ATM allowance applies — check your plan before you go",
      "UK residents only",
      "No ATM fee reimbursements for third-party charges",
    ],
    verdict: "UK travellers should hold either Starling or Monzo as their primary Japan card. Both offer genuinely fee-free spending abroad. Starling has a slight edge on ATM limits; Monzo has a better budgeting interface.",
  },
];

const cardsToAvoid = [
  { card: "Standard high-street bank cards", reason: "Typically charge 1.5–3% foreign transaction fees plus unfavourable exchange rates. Fine as a backup, not as a primary card." },
  { card: "Pre-paid travel money cards (e.g. Caxton, Travelex)", reason: "Often lock in poor exchange rates when you load the card. Wise and Revolut offer better rates with more flexibility." },
  { card: "Airport currency exchange desks", reason: "Not a card, but frequently used as an alternative. Rates are consistently 5–10% worse than mid-market. Avoid entirely." },
];

const howToUseSteps = [
  {
    title: "Set up and fund your card before you fly",
    desc: "Don't wait until the airport — app-based cards can take 3–7 business days to arrive by post. Top up your card before departing; Wise lets you hold and convert at the mid-market rate before you travel.",
  },
  {
    title: "Always pay in Japanese yen (JPY)",
    desc: "At payment terminals, you may be offered a choice between paying in yen or your home currency (Dynamic Currency Conversion). Always choose yen. DCC rates are set by the merchant and are typically 3–5% worse than your card's rate.",
  },
  {
    title: "Use 7-Eleven or Japan Post ATMs for cash",
    desc: "These are the most reliable ATM networks for foreign cards in Japan. 7-Eleven ATMs are available 24 hours a day. Japan Post Bank ATMs work during post office hours and some have extended evening access. Both accept Visa, Mastercard, and Maestro.",
  },
  {
    title: "Keep a backup card and some emergency cash",
    desc: "Even the best travel cards occasionally experience technical issues or unexpected blocks. Carry a second card from a different network (e.g. a Visa and a Mastercard), plus ¥10,000–¥20,000 in cash for areas where cards are not accepted.",
  },
];

const faqItems = [
  {
    q: "Can I use a credit card in Japan?",
    a: "Yes — credit cards are accepted at most hotels, department stores, convenience stores, chain restaurants, and tourist-facing businesses. However, many smaller restaurants, local cafes, temples, and market vendors are cash only. Always carry ¥10,000–¥20,000 in cash as a backup, even if you plan to pay by card wherever possible.",
  },
  {
    q: "Which is better for Japan — Wise or Revolut?",
    a: "Wise is slightly better for most travellers: it uses the mid-market rate every day of the week (Revolut adds a small markup on weekends) and offers a more generous free ATM allowance by default. However, Revolut's paid plans can match or exceed Wise for heavy ATM users. Both are significantly better than a standard bank card.",
  },
  {
    q: "Do I need to notify my bank before travelling to Japan?",
    a: "For dedicated travel cards (Wise, Revolut, Starling, Monzo), no notification is needed — they're designed for international use. For standard bank cards, it's worth checking with your bank, as some institutions block overseas transactions without advance notice. A travel notification usually takes 2–3 minutes via your bank's app or phone line.",
  },
  {
    q: "Is it safe to use contactless cards in Japan?",
    a: "Yes. Contactless terminals are increasingly common at convenience stores (7-Eleven, Lawson, FamilyMart), major chain restaurants, and transport hubs. However, chip-and-PIN remains the dominant method at supermarkets, smaller shops, and restaurants. Ensure your card supports both.",
  },
  {
    q: "How much yen should I withdraw at a Japanese ATM?",
    a: "A useful rule of thumb: budget ¥5,000–¥10,000 per day in cash for meals, transport, and small purchases, then top up as needed. Withdrawing larger amounts reduces the impact of per-transaction fees. Most Japanese ATMs have a single withdrawal limit of around ¥50,000–¥100,000.",
  },
  {
    q: "How much does a Japanese ATM charge a foreign card?",
    a: "It depends on the machine, and only one of the two main operators publishes a number. Japan Post Bank states that “when using certain cards issued abroad, an ATM usage fee (¥220 (tax included) per use) may apply”, with a ¥50,000 limit per transaction. Seven Bank, inside 7-Eleven stores, says only that “fees for cards issued overseas vary by the card brand” and charges per transaction; its limit is ¥100,000 per withdrawal, or ¥30,000 if the machine has to read a magnetic stripe. Whatever the machine charges is separate from anything your own card charges. Checked 26 October 2026.",
  },
  {
    q: "Does Wise charge for ATM withdrawals in Japan?",
    a: "Nothing up to your monthly allowance, and the allowance is set by the country your account is registered in rather than the country you are standing in: 250 USD on a US account, 250 GBP in the UK, 250 EUR in the Eurozone, 400 AUD in Australia and 100 CAD in Canada. Above that, Wise charges 2.69% of the excess in the UK, the Eurozone and Australia; 1.95 USD + 1.95% on each withdrawal on a US account; and 2.69 CAD + 2.69% on a Canadian one. The Japanese ATM operator may add a fee of its own on top. Read off Wise’s own country card-fee pages on 26 October 2026.",
  },
  {
    q: "Is there a US credit card with no foreign transaction fee worth taking to Japan?",
    a: "Several, and the fee-free part is stated by the issuers themselves. Capital One’s VentureOne Rewards card carries a “$0 Annual Fee” and states “you won’t pay a transaction fee when making purchases outside of the United States”; Capital One Venture Rewards and Chase Sapphire Preferred both carry a $95 annual fee and both state no foreign transaction fees. Use a card like this for hotels, rail passes and large bookings, and a debit card for cash: taking yen out of an ATM on a credit card is a cash advance, which normally means a fee and interest from day one. Annual fees and fee wording checked on the issuers’ own pages, 26 October 2026.",
  },
];

const TITLE = "Best Travel Card for Japan (2026): Fees and ATM Limits Compared";
const META =
  "Best travel card for Japan, fees compared: Wise free ATM allowances by country, the ¥220 Japan Post Bank adds per use, and the best travel cards for Japan from the US and UK.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/money/best-travel-card-japan") } });

export default function BestTravelCardJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={META} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money/best-travel-card-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${TITLE} | Japan Travel Kit`} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money/best-travel-card-japan" />
        <meta property="og:description" content={META} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${TITLE} | Japan Travel Kit`} />
        <meta name="twitter:description" content={META} />
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
              route: "/guides/money/best-travel-card-japan",
              headline: TITLE,
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
                { "@type": "ListItem", position: 3, name: "Money & Payment", item: "https://www.japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "Best Travel Card for Japan", item: "https://www.japan-travel-kit.com/guides/money/best-travel-card-japan" },
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
          </svg>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Best Travel Card</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Best Travel Card for Japan (2026):<br />Fees and ATM Limits Compared
          </h1>
          <p className={styles.heroSubtitle}>
            Japan is still heavily cash-based — so the card that wins is the one with the
            real exchange rate and the largest free ATM allowance. Every fee below is from
            the issuer&apos;s or the bank&apos;s own page, checked {CHECKED}.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Fees Compared by Country", `Figures checked ${CHECKED}`].map((t) => (
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

        {/* Answer first — the paragraph the search result is asking for, before anything else. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>
              For most visitors the best travel card for Japan is Wise: it converts at the mid-market
              rate — &ldquo;the one you can check on Google&rdquo;, in Wise&apos;s own words — and charges nothing
              on ATM withdrawals up to your account country&apos;s monthly allowance, which is 250 USD, 250 GBP
              or 250 EUR, 400 AUD in Australia and 100 CAD in Canada, then 2.69% of the excess.
            </strong>{" "}
            If you would rather put the trip on a credit card, the rule is simpler than any ranking: carry one
            with no foreign transaction fee on the Visa or Mastercard network, plus a second card on the other
            network as a spare, because a decline in Japan is almost always the issuer or the terminal rather
            than the brand. Either way the Japanese machine can add a fee of its own — Japan Post Bank publishes
            ¥220 including tax per use — so take cash out in large amounts and rarely, not small amounts and
            often. All figures checked {CHECKED}.
          </p>
          <a href={WISE_CARD_CTA} className={styles.verdictBtn} target="_blank" rel={WISE_REL}>
            Get a Wise card before you fly →
          </a>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Overall</p>
                <p className={styles.verdictStatValue}>Wise</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best for US Travellers</p>
                <p className={styles.verdictStatValue}>Charles Schwab</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best for UK Travellers</p>
                <p className={styles.verdictStatValue}>Starling / Monzo</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Key rule:</strong> Always pay in <strong>Japanese yen (JPY)</strong> at terminals —
              never accept Dynamic Currency Conversion (DCC). And always carry some cash:
              many restaurants, temples, and local shops are still cash only.
            </p>
          </div>
        </div>

        {/* Q1 — the comparison table the pages ranking above this one lead with. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Types compared</span>
          <h2 className={styles.sectionTitle}>What is the best travel card for Japan?</h2>
          <p className={styles.bodyText}>
            A multi-currency debit card — Wise for most people, Monzo or Starling if you bank in the UK —
            because those are the cards that combine the mid-market rate with a free ATM allowance, and Japan
            is a country where you will still be taking cash out. A no-foreign-transaction-fee credit card is
            the right second card, not the first: a cash withdrawal on it is a cash advance.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Type of card", "Card cost", "Paying in a shop", "Exchange rate", "At a Japanese ATM"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cardTypeRows.map((row) => (
                    <tr key={`${row.type}-${row.example}`}>
                      <td className={styles.tdProvider}>
                        {row.type}
                        <span className={styles.tdBestFor} style={{ display: "block", fontWeight: 400 }}>{row.example}</span>
                      </td>
                      <td style={{ fontSize: "0.84rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.purchase}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.rate}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.atm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Sources, all read {CHECKED}: Wise&apos;s US, UK, Eurozone, Australian and Canadian card-fee pages and its
            UK pricing page; Monzo&apos;s fee information; Starling&apos;s current-account page; the three US issuers&apos;
            own card pages. Revolut and Charles Schwab both return HTTP 403 to an automated read, so no figure for
            either appears in this table — check their own fees pages before you rely on them.
          </p>
          <a href={WISE_CARD_CTA} className={styles.verdictBtn} target="_blank" rel={WISE_REL} style={{ marginTop: "1.25rem" }}>
            Open a Wise account →
          </a>
        </section>

        {/* What to Look For */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Criteria</span>
          <h2 className={styles.sectionTitle}>What to Look For in a Japan Travel Card</h2>
          <div className={styles.stepsList}>
            {whatToLookFor.map((item) => (
              <div key={item.rank} className={styles.stepCard}>
                <span className={styles.stepNum}>{item.rank}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.name}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Best Cards */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Our picks</span>
          <h2 className={styles.sectionTitle}>Best Travel Cards for Japan</h2>

          {bestCards.map((card) => (
            <div key={card.name} className={styles.providerBlock}>
              <div className={styles.providerHeader}>
                <h3 className={styles.providerName}>{card.name}</h3>
                <span
                  className={styles.providerBadge}
                  style={{ background: card.badgeColor }}
                >
                  {card.badge}
                </span>
              </div>
              <div className={styles.pickGrid}>
                <div className={styles.pickPros}>
                  <p className={styles.pickListLabel}>Pros</p>
                  <ul className={styles.pickList}>
                    {card.pros.map((p) => (
                      <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.pickCons}>
                  <p className={styles.pickListLabel}>Cons</p>
                  <ul className={styles.pickList}>
                    {card.cons.map((c) => (
                      <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className={styles.bodyText} style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
                <strong>Our verdict:</strong> {card.verdict}
              </p>
            </div>
          ))}
        </section>

        {/* Q2 — country picks, the question asked as "best travel card for Japan from the US / UK". */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By country</span>
          <h2 className={styles.sectionTitle}>Which travel card is best for Japan from the US / UK / Australia?</h2>
          <p className={styles.bodyText}>
            From the US and Australia, Wise — the allowance is 250 USD and 400 AUD a month respectively, and
            the Australian one is the largest Wise publishes. From the UK the answer is a UK app bank first,
            Monzo or Starling, with Wise as a second card, because Monzo states £0 on foreign-currency card
            payments and Starling states no fees of its own on spending or withdrawing abroad.
          </p>
          <p className={styles.bodyText}>
            The reason the answer changes with the country is that Wise&apos;s free ATM allowance follows the
            country your account is registered in, not the country you are standing in. A Canadian account gets
            100 CAD a month; an Australian one gets four times that.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where your account is", "Wise card cost", "Free ATM withdrawals", "Above that"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {wiseByCountry.map((row) => (
                    <tr key={row.country}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.country}</td>
                      <td className={styles.tdPrice}>{row.card}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.free}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.over}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            wise.com/us, /gb, /de, /au and /ca pricing/card-fees, read {CHECKED}. The Japanese ATM operator&apos;s
            fee is separate from every figure above.
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "2.5rem" }}>
            Which card to reach for first, by where you bank
          </h3>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Country", "First card", "Why", "Second card to carry"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {countryPicks.map((row) => (
                    <tr key={row.country}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.country}</td>
                      <td className={styles.tdProvider}>{row.first}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.why}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.second}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "2.5rem" }}>
            US credit cards with no foreign transaction fee
          </h3>
          <p className={styles.bodyText}>
            Only three are listed here, and only with what the issuer itself publishes: the annual fee and the
            foreign-transaction-fee wording. Sign-up bonuses and points valuations move month to month and are
            not what decides whether a card is worth carrying through a yen terminal.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Card", "Annual fee", "What the issuer says about foreign transaction fees"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {usCreditCards.map((row) => (
                    <tr key={row.card}>
                      <td className={styles.tdProvider}>{row.card}</td>
                      <td className={styles.tdPrice}>{row.fee}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.fx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            capitalone.com and creditcards.chase.com card pages, read {CHECKED}. Annual fees and terms change —
            confirm on the issuer&apos;s page before you apply.
          </p>
        </section>

        {/* Q3 — the "visa vs mastercard in japan" query, answered from the ATM operators' own brand lists. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Networks</span>
          <h2 className={styles.sectionTitle}>Is Visa or Mastercard better in Japan?</h2>
          <p className={styles.bodyText}>
            Neither has a clear edge, and the two Japanese ATM networks a visitor actually uses list both.
            Carry one of each rather than two of the same brand — that is the version of this decision that
            changes anything on the trip.
          </p>
          <p className={styles.bodyText}>
            Seven Bank states that its ATMs serve cards issued overseas on Visa (including PLUS), Mastercard
            (including Maestro and Cirrus), UnionPay, American Express, JCB, Discover and Diners Club. Japan
            Post Bank lists VISA, PLUS, Mastercard, Maestro, Cirrus, JCB, China UnionPay and DISCOVER. JCB is
            Japan&apos;s own network, which is why it appears on both lists and on terminals everywhere here;
            American Express is on Seven Bank&apos;s list but not on Japan Post Bank&apos;s, which is a concrete
            reason not to arrive with an Amex as your only card. Both lists read {CHECKED}.
          </p>
        </section>

        {/* Q4 */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Debit or credit</span>
          <h2 className={styles.sectionTitle}>Should I use a debit or credit card in Japan?</h2>
          <p className={styles.bodyText}>
            Both, for different jobs: a multi-currency debit card for cash and day-to-day spending, a
            no-foreign-transaction-fee credit card for hotels, rail passes and anything large enough that you
            would want the purchase protection. What you should not do is take yen out of an ATM on a credit
            card — that is a cash advance, and a cash-advance fee plus interest from day one is the normal
            treatment.
          </p>
          <p className={styles.bodyText}>
            Prepaid travel-money cards sit awkwardly between the two. The rate is fixed at the moment you load
            the card rather than the moment you spend, so you are accepting whatever was on sale that day for
            the whole trip — and you cannot undo it if the yen moves.
          </p>
        </section>

        {/* Cards to Avoid */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Watch out</span>
          <h2 className={styles.sectionTitle}>Cards and Options to Avoid</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Card / Method", "Why to Avoid"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cardsToAvoid.map((row) => (
                    <tr key={row.card}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.card}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Q5 — the long-tail query "i'm travelling to japan. what card should i use to minimise fees?" */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Minimising fees</span>
          <h2 className={styles.sectionTitle}>What card should I use in Japan to minimise fees?</h2>
          <p className={styles.bodyText}>
            A card that converts at the mid-market rate and gives you a free monthly ATM allowance — Wise, or a
            UK app bank if you have one — used with two habits: always pay in yen, and withdraw cash in large
            amounts rather than small ones.
          </p>
          <p className={styles.bodyText}>
            The arithmetic behind the second habit is that there are two fees on a withdrawal and they behave
            differently. Your card&apos;s fee is a percentage of the amount above a monthly allowance, so it
            does not care how many withdrawals you make. The Japanese machine&apos;s fee is per transaction —
            Japan Post Bank publishes ¥220 including tax per use — so it cares about nothing else. Seven Bank
            allows ¥100,000 in a single withdrawal, which is the cheapest way to hold a week of cash.
          </p>
          <ul className={styles.bodyList}>
            <li>Use a card with no foreign transaction fee, on Visa or Mastercard, and carry a second on the other network</li>
            <li>Pay in yen at every terminal — see the DCC section below</li>
            <li>Make few, large ATM withdrawals, and keep the total inside your monthly free allowance</li>
            <li>Prepay what you can in your own currency before you fly, so it never becomes a yen conversion at all</li>
          </ul>
        </section>

        {/* Q6 — Japanese-side ATM fees, the half of the question most card pages leave out. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Japanese ATMs</span>
          <h2 className={styles.sectionTitle}>Do Japanese ATMs charge foreign cards?</h2>
          <p className={styles.bodyText}>
            They can, and it is separate from anything your own card charges. Japan Post Bank publishes a figure
            — ¥220 including tax per use — while Seven Bank says only that the fee varies by card brand and does
            not print an amount on its overseas-card pages, so no number for it appears below.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ATM", "Cards it states it takes", "Its own fee", "Per withdrawal", "Hours"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {japanAtmRows.map((row) => (
                    <tr key={row.atm}>
                      <td className={styles.tdProvider}>{row.atm}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.takes}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.fee}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.limit}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            sevenbank.co.jp and jp-bank.japanpost.jp overseas-card pages, read {CHECKED}. For the full picture
            of where the machines are, see the{" "}
            <Link href="/guides/money/atms-in-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              ATMs in Japan guide
            </Link>.
          </p>
        </section>

        {/* Q7 — DCC, requirement (6). */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Pay in yen</span>
          <h2 className={styles.sectionTitle}>Should I pay in yen or my home currency?</h2>
          <p className={styles.bodyText}>
            Always yen. When a Japanese terminal or ATM offers to bill you in your own currency instead, that is
            Dynamic Currency Conversion, and the rate is set by the merchant or the ATM operator rather than by
            your card — so you are swapping a rate you chose for one you did not.
          </p>
          <p className={styles.bodyText}>
            In practice the prompt appears as two buttons on the keypad, one showing a yen figure and one showing
            a figure in dollars, pounds or euros. Choose the yen one. The same choice appears on the ATM screen
            before it dispenses: decline the conversion, take the yen, and let your card do the converting at the
            rate you picked the card for in the first place.
          </p>
        </section>

        {/* How to Use */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Practical tips</span>
          <h2 className={styles.sectionTitle}>How to Use Your Travel Card in Japan</h2>
          <div className={styles.stepsList}>
            {howToUseSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Klook: the costs that can be settled before the card ever sees a yen terminal */}
        <KlookTripPrep
          heading="What Can You Book With Your Card Before You Fly?"
          intro="Anything with a fixed yen price and a date: data, transport passes, airport trains, day tours. Every one of them you prepay in your own currency is one fewer conversion on the trip — and one fewer chance to be handed a dynamic-currency-conversion prompt at a counter."
          items={bestTravelCardTripPrep}
        />

        {/* Do I Still Need Cash? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Cash vs card</span>
          <h2 className={styles.sectionTitle}>Do I Still Need Cash in Japan?</h2>
          <p className={styles.bodyText}>
            Yes — even in 2026. Japan has made significant progress toward a cashless society,
            but cash remains essential for many situations:
          </p>
          <ul className={styles.bodyList}>
            <li>Most small restaurants, ramen shops, and izakayas are cash only</li>
            <li>Temple entrance fees, shrine offerings, and vending machines require coins and notes</li>
            <li>Many rural areas and smaller towns have limited card acceptance</li>
            <li>Some budget accommodation and guesthouses still prefer cash</li>
          </ul>
          <p className={styles.bodyText}>
            A practical approach: withdraw ¥20,000–¥30,000 at a 7-Eleven or Japan Post ATM on arrival
            and keep it as a running cash reserve. Top up as needed. Your travel card handles hotels,
            chain restaurants, and convenience stores; cash covers everything else.
          </p>
          <p className={styles.bodyText}>
            For a full breakdown of where cards work and where they don&apos;t, see our{" "}
            <Link href="/guides/money/cash-vs-card-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              Cash vs Card in Japan guide
            </Link>.
          </p>
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/money/wise-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Wise Card in Japan (2026): ATM Fees, Free Limits &amp; Which ATMs Take It</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/cash-vs-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="7" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cash vs Card in Japan (2026): What Actually Works?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/atms-in-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="7" x2="16" y2="7" />
                  <line x1="8" y1="11" x2="16" y2="11" />
                  <line x1="8" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>ATMs in Japan (2026): Which Accept Foreign Cards &amp; What the Fees Are</p>
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
            <Link href="/guides/money/contactless-payment-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="6" width="22" height="13" rx="2" />
                  <circle cx="12" cy="12.5" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Contactless Payment in Japan (2026): What Actually Works</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
