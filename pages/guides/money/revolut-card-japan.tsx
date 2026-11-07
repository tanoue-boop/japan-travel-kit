import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { klookEsim, revolutCardTripPrep } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

// NOTE: Revolut affiliate programme not yet approved — plain link for now.
// TODO: replace with approved affiliate link once accepted.
const REVOLUT_URL = "https://www.revolut.com/";

const REVOLUT_JP_PLANS_URL = "https://www.revolut.com/en-JP/our-pricing-plans/";
const REVOLUT_JP_CASH_URL = "https://help.revolut.com/en-JP/help/inactive-faqs/why-did-the-atm-charge-a-fee-for-my-cash-withdrawal/";
const REVOLUT_JP_FX_URL = "https://help.revolut.com/en-JP/help/wealth/exchanging-money/how-much-does-it-cost-to-make-an-exchange/will-i-be-charged-for-exchanging-foreign-currencies/";
const REVOLUT_ATM_JAPAN_URL = "https://www.revolut.com/cards/atm-withdrawals-in-japan/";
const SEVEN_BANK_URL = "https://www.sevenbank.co.jp/intlcard/card.html";
const JAPAN_POST_URL = "https://www.jp-bank.japanpost.jp/en/ias/en_ias_index.html";
const ENET_URL = "https://www.enetcom.co.jp/intl/";

/**
 * Every revolut.com and help.revolut.com page answers an automated read with HTTP
 * 403, so Revolut's figures below were read from those pages' search-index entries,
 * the same fallback lib/klook-links.ts uses for Klook, and the page says so where
 * they appear. Seven Bank, Japan Post Bank, E-net and Apple were read directly.
 * JR East's own pages also answer 403, so its Apple Pay wording is from the index.
 */
const CHECKED = "4 November 2026";

const TITLE = "Revolut in Japan 2026: Fees, ATMs & Is It Worth It?";
const DESCRIPTION =
  "Revolut in Japan works at 7-Eleven ATMs. Free ATM limit: £200 on UK Standard, ¥25,000 on a Japan account, then 2%. Weekend FX +1%. ATM fees are extra.";

const YEN_BALANCE = "No Revolut fee in your base currency or from a yen balance.";

const planRows = [
  {
    plan: "Standard",
    atmUk: "£200 or 5 withdrawals, whichever comes first",
    atmJp: "¥25,000",
    over: "2%",
    weekend: "+1%",
    card: `${YEN_BALANCE} Japan accounts: exchange free Mon–Fri to ¥300,000 a month, then 0.5%.`,
  },
  {
    plan: "Plus",
    atmUk: "£200",
    atmJp: "Not listed",
    over: "2%",
    weekend: "+0.5%",
    card: `${YEN_BALANCE} Exchange limit shown in your app.`,
  },
  {
    plan: "Premium",
    atmUk: "£400",
    atmJp: "¥50,000",
    over: "2%",
    weekend: "None",
    card: `${YEN_BALANCE} Japan accounts: no additional exchange fees.`,
  },
  {
    plan: "Metal",
    atmUk: "£800",
    atmJp: "¥100,000",
    over: "2%",
    weekend: "None",
    card: `${YEN_BALANCE} Japan accounts: no additional exchange fees.`,
  },
  {
    plan: "Ultra",
    atmUk: "£2,000",
    atmJp: "Not listed",
    over: "2%",
    weekend: "None",
    card: `${YEN_BALANCE} Exchange limit shown in your app.`,
  },
];

const atmRows = [
  {
    atm: "Seven Bank",
    sub: "Inside 7-Eleven stores",
    accepts: "Yes: Visa and Mastercard are listed, though Seven Bank warns some cards with those marks may not work.",
    fee: "No amount published. Seven Bank says the fee differs by overseas card brand.",
    url: SEVEN_BANK_URL,
    source: "Seven Bank",
  },
  {
    atm: "Japan Post Bank",
    sub: "At post offices",
    accepts: "Yes: Visa and Mastercard are listed.",
    fee: "“An ATM usage fee (¥220 (tax included) per use) may apply” with certain cards issued abroad.",
    url: JAPAN_POST_URL,
    source: "Japan Post Bank",
  },
  {
    atm: "E-net",
    sub: "In FamilyMart and Don Quijote",
    accepts: "Yes: Visa and Mastercard are listed, with the same warning as Seven Bank.",
    fee: "No amount published. The fee differs by handling bank, and the card issuer may add its own.",
    url: ENET_URL,
    source: "E-net",
  },
];

const howToSteps = [
  {
    title: "Order the card and set up the app",
    desc: "Revolut is app-first. Sign up, order the physical card, and open the plan screen in the app before you travel: that is where your own ATM allowance and exchange limit are shown.",
  },
  {
    title: "Exchange into yen on a weekday",
    desc: "Revolut's advice is that if you hold enough of the local currency, you should not pay additional exchange fees. On Standard, move money into yen before the weekend window opens (5pm Friday to 6pm Sunday US Eastern Time, which is Saturday morning to Monday morning in Japan) and your weekend spending draws on that balance instead of a new exchange.",
  },
  {
    title: "Always choose to pay in yen (JPY)",
    desc: "At terminals and ATMs you may be offered your home currency. This is Dynamic Currency Conversion (DCC), and Revolut warns it can bring fees and a poor rate. Decline it and pay in JPY.",
  },
  {
    title: "Use 7-Eleven (Seven Bank) ATMs for cash",
    desc: "Seven Bank's Visa and Mastercard service runs 00:00–24:00, it offers an English menu, and it allows ¥100,000 per withdrawal (¥30,000 on a magnetic-stripe read). The screen shows any operator fee before you confirm.",
  },
];

const pros = [
  "No Revolut fee on yen card payments from a yen balance",
  "Feature-rich app: instant notifications, budgets, card freeze",
  "Premium, Metal and Ultra add no weekend exchange fee",
  "Works at Seven Bank and Japan Post Bank ATMs, the two Revolut itself points to",
];

const cons = [
  "Standard adds 1% to weekend exchanges, and Plus adds 0.5%",
  "Revolut charges 2% once your free ATM allowance is used",
  "ATM operator fees apply on top of Revolut's",
  "Allowances differ by plan and by the country of your account",
];

const faqItems = [
  {
    q: "Does Revolut work in Japan?",
    a: `Yes. Revolut's card works at terminals accepting Visa or Mastercard and at Japanese ATMs, and Revolut's own Japan guides point to Seven Bank (inside 7-Eleven) and Japan Post ATMs. Japan is still partly cash-based, so keep some yen for smaller venues. Checked ${CHECKED}.`,
  },
  {
    q: "Which ATMs accept Revolut in Japan?",
    a: `Seven Bank ATMs in 7-Eleven, Japan Post Bank ATMs at post offices and E-net ATMs in FamilyMart and Don Quijote all list Visa and Mastercard. Seven Bank and E-net warn that some cards with those marks may still not work, so try a second network if one refuses you. Operators' pages read ${CHECKED}.`,
  },
  {
    q: "Does Revolut charge ATM fees in Japan?",
    a: `Not within your plan's free allowance; above it Revolut charges 2%. The allowance depends on your plan and your account's country: £200 or 5 withdrawals a month on UK Standard, £200 on Plus, £400 on Premium, £800 on Metal and £2,000 on Ultra; on a Japan-registered account ¥25,000 on Standard, ¥50,000 on Premium and ¥100,000 on Metal. The minimum on the UK figures is £1. The ATM operator may add its own fee: Japan Post Bank says ¥220 may apply, while Seven Bank and E-net publish no amount. Checked ${CHECKED}; your app shows your own allowance.`,
  },
  {
    q: "What are Revolut's fees in Japan?",
    a: `It depends on your plan and your account's country. ATM withdrawals are free up to your allowance, then 2%. Exchanges between 5pm Friday and 6pm Sunday US Eastern Time cost 1% more on Standard and 0.5% more on Plus, with nothing added on Premium, Metal or Ultra. On a Japan-registered Standard account, exchange is free Monday to Friday up to ¥300,000 a month, then 0.5%. Card payments in your base currency, or from a yen balance you already hold, carry no Revolut exchange fee. Checked ${CHECKED}.`,
  },
  {
    q: "Is the Revolut weekend fee a problem for Japan trips?",
    a: "Only if you exchange during the weekend window on Standard or Plus. The window is 5pm Friday to 6pm Sunday US Eastern Time, which in Japan runs from Saturday morning (6am in US summer time, 7am in winter) to Monday morning (7am or 8am). Move money into yen on a weekday and weekend spending draws on that balance, with no exchange at the weekend to charge for.",
  },
  {
    q: "Is Revolut Premium or Metal worth it for Japan?",
    a: "Weigh the monthly fee against how much you expect to withdraw and exchange. Both remove the weekend fee and double or quadruple Standard's free ATM allowance in the same currency schedule, but a Standard user who exchanges on weekdays and withdraws within the allowance pays Revolut nothing on those transactions. Confirm the current plan price in your app.",
  },
  {
    q: "Revolut or Wise for Japan?",
    a: "Wise has no weekend markup, which makes it the simpler choice if you do not want to think about the calendar. Revolut suits travellers who can exchange on weekdays, or who already pay for a plan with no weekend fee. See our Wise vs Revolut comparison for the full breakdown.",
  },
  {
    q: "Can I use Revolut for Suica or Pasmo?",
    a: `We could not confirm it. Apple says a Suica or PASMO in Wallet needs "an eligible payment card" but does not name which ones, and neither JR East nor Revolut says a Revolut card qualifies. Plan to top up with yen cash at a station ticket machine, and treat any card top-up that works as a bonus. Checked ${CHECKED}.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/money/revolut-card-japan") } });

export default function RevolutCardJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money/revolut-card-japan" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money/revolut-card-japan" />
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
                { "@type": "ListItem", position: 1, name: "Home",            item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",          item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Money & Payment", item: "https://www.japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "Revolut in Japan", item: "https://www.japan-travel-kit.com/guides/money/revolut-card-japan" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/money/revolut-card-japan",
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
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Revolut in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Revolut in Japan (2026):<br />Fees, ATMs &amp; Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            A feature-packed travel card that&apos;s great value on weekdays — with one catch to watch at the weekend.
          </p>
          <div className={styles.heroBadges}>
            {[`Fees checked ${CHECKED}`, "Plans Compared", "Weekend Fee Explained"].map((t) => (
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
          Yes: a Revolut card works in Japan, for Visa and Mastercard card payments and at ATMs such as Seven Bank in
          7-Eleven. Free ATM withdrawals depend on your plan and your account&apos;s country:{" "}
          <strong>£200 or 5 withdrawals a month on UK Standard, £400 on Premium and £800 on Metal</strong>, or ¥25,000,
          ¥50,000 and ¥100,000 on a Japan-registered account. <strong>Above that Revolut charges 2%.</strong> Standard
          also adds <strong>1% to weekend exchanges</strong> (Plus adds 0.5%; Premium and Metal add nothing), and the
          Japanese ATM&apos;s own fee is separate. Revolut&apos;s figures checked {CHECKED}.
        </p>

        {/* Disclaimer */}
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Not financial advice.</strong> This guide is general information only. Fees, limits, and plans were
            checked on {CHECKED}, can change, and depend on the country where your Revolut account is registered — always confirm the latest on the official{" "}
            <a href={REVOLUT_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--text)", fontWeight: 600 }}>Revolut fees page</a>{" "}
            before you rely on them.
          </p>
        </div>

        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Works in Japan?</p>
                <p className={styles.verdictStatValue}>Yes</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Over the ATM allowance</p>
                <p className={styles.verdictStatValue}>2%</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Weekend exchange, Standard</p>
                <p className={styles.verdictStatValue}>+1%</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Revolut works well if you <strong>exchange on weekdays</strong> and withdraw
              within your plan&apos;s allowance, with a strong app. The catch on Standard is the <strong>1% weekend
              fee</strong>: avoid it by holding yen before the weekend or using a plan without it.
            </p>
            <p className={styles.bodyText} style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
              Weighing it against Wise? See our{" "}
              <Link href="/guides/money/wise-vs-revolut-japan" style={{ fontWeight: 600 }}>Wise vs Revolut for Japan</Link>{" "}
              comparison.
            </p>
          </div>
        </div>

        {/* Can I use it */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Can I Use Revolut in Japan?</h2>
          <p className={styles.bodyText}>
            Yes. A Revolut card works at Japanese terminals that accept Visa or Mastercard, and at ATMs that take cards
            issued abroad. Hotels, chain stores and convenience stores are the easy cases; small restaurants, temples and
            market stalls are where you will still want cash.
          </p>
          <p className={styles.bodyText}>
            Revolut is an app-based account with a linked debit card, sold on free and paid plans. What changes between
            them is how much you can withdraw and exchange before fees begin, and that also depends on the country your
            account is registered in, not on Japan.
          </p>
        </section>

        {/* Fee table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Fees</span>
          <h2 className={styles.sectionTitle}>Does Revolut Charge ATM Fees in Japan?</h2>
          <p className={styles.bodyText}>
            Not within your plan&apos;s free allowance, which resets monthly; above it Revolut charges 2% of each
            withdrawal. The Japanese ATM operator may charge separately, and Revolut&apos;s allowance does not cover that.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", padding: "0.6rem 0.75rem", fontSize: "0.82rem", color: "var(--text-muted)", textAlign: "left" }}>
                  Revolut&apos;s figures, checked {CHECKED}. &quot;Not listed&quot; means Revolut&apos;s Japan pages did not show that plan.
                </caption>
                <thead>
                  <tr>
                    {["Plan", "Free ATM, UK account (per month)", "Free ATM, Japan account (per month)", "Over the allowance", "Weekend exchange", "Card payments"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {planRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.atmUk}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.atmJp}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.over}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.weekend}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.card}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            The 2% carries a £1 minimum on the UK figures. ATM withdrawals that involve an exchange also count toward your
            exchange limit. The weekend window is 5pm Friday to 6pm Sunday US Eastern Time. Accounts in other countries
            have their own schedules: Revolut&apos;s US pages, for one, show Premium at $800 and Metal at $1,200 a month.
            Your app&apos;s plan screen is the final word.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Sources:{" "}
            <a href={REVOLUT_JP_PLANS_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ fontWeight: 600 }}>Revolut Japan plans</a>,{" "}
            <a href={REVOLUT_JP_CASH_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ fontWeight: 600 }}>cash withdrawal limits</a>,{" "}
            <a href={REVOLUT_JP_FX_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ fontWeight: 600 }}>exchange fees</a> and{" "}
            <a href={REVOLUT_ATM_JAPAN_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ fontWeight: 600 }}>ATMs in Japan</a>.
            Revolut blocks automated page reads, so these were read from its pages&apos; search-index entries on {CHECKED},
            not from the live pages.
          </p>
        </section>

        {/* ATM table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ATMs</span>
          <h2 className={styles.sectionTitle}>Which ATMs Accept Revolut in Japan?</h2>
          <p className={styles.bodyText}>
            Seven Bank in 7-Eleven is the first one to try, followed by Japan Post Bank; those are the two Revolut itself
            names, and both, along with E-net, list Visa and Mastercard. Only Japan Post Bank publishes a fee amount.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", padding: "0.6rem 0.75rem", fontSize: "0.82rem", color: "var(--text-muted)", textAlign: "left" }}>
                  Read from each operator&apos;s own page on {CHECKED}. None of them names Revolut.
                </caption>
                <thead>
                  <tr>
                    {["ATM", "Takes a Revolut card?", "ATM-side fee", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {atmRows.map((row) => (
                    <tr key={row.atm}>
                      <td className={styles.tdProvider}>
                        {row.atm}
                        <span style={{ display: "block", fontWeight: 400, fontSize: "0.8rem", color: "var(--text-muted)" }}>
                          {row.sub}
                        </span>
                      </td>
                      <td style={{ fontSize: "0.85rem" }}>{row.accepts}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.fee}</td>
                      <td style={{ fontSize: "0.85rem" }}>
                        <a href={row.url} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>{row.source}</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            AEON Bank and Lawson Bank are left out because their fees could not be confirmed on their own sites. Our{" "}
            <Link href="/guides/money/atms-in-japan" style={{ fontWeight: 600 }}>ATMs in Japan guide</Link> covers hours and
            limits for all five networks.
          </p>
        </section>

        {/* Wise */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Compared</span>
          <h2 className={styles.sectionTitle}>Is Revolut or Wise Better for Japan?</h2>
          <p className={styles.bodyText}>
            Wise is the simpler choice because it has no weekend markup; Revolut suits you if you can exchange on weekdays
            or already pay for a plan without the weekend fee. Our{" "}
            <Link href="/guides/money/wise-vs-revolut-japan" style={{ fontWeight: 600 }}>Wise vs Revolut comparison</Link>{" "}
            has the full breakdown, and the{" "}
            <Link href="/guides/money/wise-card-japan" style={{ fontWeight: 600 }}>Wise card in Japan guide</Link>{" "}
            covers Wise&apos;s own ATM limits.
          </p>
        </section>

        {/* Suica */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Transit cards</span>
          <h2 className={styles.sectionTitle}>Can I Use Revolut for Suica or Pasmo?</h2>
          <p className={styles.bodyText}>
            We could not confirm that a Revolut card can top up Suica or PASMO, so plan on yen cash at a station ticket
            machine. Apple says a Suica or PASMO in Wallet needs &quot;an eligible payment card&quot; without naming which
            cards qualify, and neither JR East nor Revolut says Revolut is one of them.
          </p>
          <p className={styles.bodyText}>
            JR East&apos;s Welcome Suica Mobile app, for overseas visitors on iPhone, accepts a credit card registered to
            Apple Pay or cash at a ticket machine. Whether Revolut counts is the same open question. Sources checked{" "}
            {CHECKED}; see our{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ fontWeight: 600 }}>IC cards guide</Link> for the
            cash route.
          </p>
        </section>

        {/* How to use */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>How to use it</span>
          <h2 className={styles.sectionTitle}>How to Use Revolut in Japan</h2>
          <div className={styles.stepsList}>
            {howToSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a href={REVOLUT_URL} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow" style={{ marginTop: "1.5rem", display: "inline-block" }}>
            Visit Revolut →
          </a>
        </section>

        <BookingEsimCard lead="Revolut ready? Get mobile data before you land." />

        {/* Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Assessment</span>
          <h2 className={styles.sectionTitle}>Revolut Pros &amp; Cons for Japan</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {pros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {cons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Cash reminder */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Don&apos;t forget cash</span>
          <h2 className={styles.sectionTitle}>You&apos;ll Still Need Some Cash</h2>
          <p className={styles.bodyText}>
            Revolut handles hotels, chain stores, and convenience stores well, but Japan is still partly cash-based —
            small restaurants, izakayas, temples, shrines, and market stalls are often cash only. Withdraw
            ¥20,000–¥30,000 from a 7-Eleven ATM on arrival and keep it topped up as a reserve.
          </p>
          <p className={styles.bodyText}>
            For more on getting the best yen rate, see our{" "}
            <Link href="/guides/money/currency-exchange-japan" style={{ color: "var(--red)", fontWeight: 600 }}>currency exchange guide</Link>,
            and for which machines accept foreign cards, our{" "}
            <Link href="/guides/money/atms-in-japan" style={{ color: "var(--red)", fontWeight: 600 }}>ATMs in Japan guide</Link>.
          </p>
        </section>

        <KlookTripPrep
          heading="What to Pay by Card Before You Fly"
          intro="Once you know how much cash you need, the rest of the trip is a question of when each payment is made. Bookings you make on a weekday before you leave stay out of Revolut's weekend window, and anything already paid for does not have to come out of your free ATM allowance."
          items={revolutCardTripPrep}
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

        {/* eSIM */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Stay connected</span>
          <h2 className={styles.sectionTitle}>Keep the Revolut App Online From Landing</h2>
          <p className={styles.bodyText}>
            Your allowance, spend alerts and card freeze all live in the app, so set up data before you fly.
          </p>
          <KlookLink href={klookEsim.url} className={styles.pickCta} target="_blank" rel="sponsored noopener" style={{ marginTop: "0.5rem", display: "inline-block" }}>
            {klookEsim.ctaLabel}
          </KlookLink>
        </section>

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/money/wise-vs-revolut-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Wise vs Revolut Japan (2026): Which Travel Card Wins?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/best-travel-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="7" y1="15" x2="12" y2="15" />
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
            <Link href="/guides/money/currency-exchange-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Currency Exchange in Japan (2026): Best Ways to Get Yen</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/wise-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="6" width="22" height="13" rx="2" />
                  <circle cx="12" cy="12.5" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Wise Card in Japan (2026): ATM Fees, Free Limits &amp; Which ATMs Take It</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Set up Revolut before you fly</h2>
            <p className={styles.ctaBannerDesc}>
              Order the card and top up in the app so you land in Japan ready to spend — and remember to time bigger
              conversions for weekdays on the Standard plan.
            </p>
            <a href={REVOLUT_URL} className={styles.ctaBannerBtn} target="_blank" rel="noopener noreferrer nofollow">
              Visit Revolut →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
