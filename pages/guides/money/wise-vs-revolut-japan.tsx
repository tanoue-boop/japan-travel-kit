import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { klookEsim, wiseVsRevolutTripPrep } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { wiseLink, WISE_REL, WISE_PRICING_URL } from "../../../lib/wise-links";

// Wise is tracked (see lib/wise-links.ts). The Revolut programme is still
// unapproved, so that one stays a plain link.
// TODO: replace REVOLUT_URL with an approved affiliate link once accepted.
const WISE_URL = wiseLink("wise-vs-revolut-japan");
const WISE_FEES_URL = wiseLink("wise-vs-revolut-japan", WISE_PRICING_URL);
const REVOLUT_URL = "https://www.revolut.com/";

const REVOLUT_JP_PLANS_URL = "https://www.revolut.com/en-JP/our-pricing-plans/";
const REVOLUT_JP_CASH_URL = "https://help.revolut.com/en-JP/help/inactive-faqs/why-did-the-atm-charge-a-fee-for-my-cash-withdrawal/";
const REVOLUT_JP_FX_URL = "https://help.revolut.com/en-JP/help/wealth/exchanging-money/how-much-does-it-cost-to-make-an-exchange/will-i-be-charged-for-exchanging-foreign-currencies/";
const REVOLUT_UK_CASH_URL = "https://help.revolut.com/help/inactive-faqs/why-did-the-atm-charge-a-fee-for-my-cash-withdrawal/";
const REVOLUT_JP_CARD_URL = "https://help.revolut.com/en-JP/help/cards/card-order/fees-for-ordering-a-card/";
const WISE_APPLE_PAY_URL = "https://wise.com/help/articles/2935788/how-do-i-use-my-wise-card-with-apple-pay";
const WISE_SUICA_URL = "https://wise.com/au/blog/how-to-get-a-suica-card";
const APPLE_TRANSIT_URL = "https://support.apple.com/en-us/120474";

/**
 * Wise's figures were read directly from wise.com/{gb,us,de,jp}/pricing/card-fees and
 * wise.com/{gb,us}/pricing on this date; Japan Post Bank, Seven Bank and Apple likewise.
 * Every revolut.com and help.revolut.com page answers an automated read with HTTP 403,
 * so Revolut's figures are from those pages' search-index entries on the same date, as
 * on the Revolut guide, and the page says so where they appear.
 */
const CHECKED = "5 November 2026";

const TITLE = "Wise vs Revolut Japan 2026: Which Card Wins?";
const DESCRIPTION =
  "Wise vs Revolut Japan: free ATM to £250 on Wise, £200 on Revolut Standard, then 2.69% vs 2%. Exchange from 0.24% on Wise; Revolut adds 1% at weekends.";

const ATM_OPERATOR_FEE = "Separate. Japan Post Bank says ¥220 may apply; Seven Bank publishes no amount.";

const compareRows = [
  {
    feature: "Monthly fee",
    wise: "None",
    revolut: "None on Standard",
  },
  {
    feature: "Exchange fee",
    wise: "Mid-market rate plus a fee that varies by currency: from 0.24% on Wise's UK page, from 0.23% on its US page. Spending a yen balance you hold is free.",
    revolut: "Mon–Fri, no extra fee to £1,000 a month (UK), then 1%, or to ¥300,000 a month (Japan account), then 0.5%. No Revolut fee from a yen balance.",
  },
  {
    feature: "Weekend markup",
    wise: "None listed on Wise's pricing pages",
    revolut: "+1% (5pm Friday to 6pm Sunday US Eastern Time)",
  },
  {
    feature: "Free ATM allowance (per month)",
    wise: "250 GBP, 250 USD or 250 EUR; 25,000 JPY on a Japan-issued card. Set by amount, with no withdrawal count listed.",
    revolut: "£200 or 5 withdrawals, whichever comes first (UK); ¥25,000 (Japan account)",
  },
  {
    feature: "Above the ATM allowance",
    wise: "2.69% of the excess (UK, Eurozone); 1.95 USD + 1.95% per withdrawal (US); ¥100 + 1.75% of the excess (Japan)",
    revolut: "2% (£1 minimum on the UK figures)",
  },
  {
    feature: "Card issue cost",
    wise: "One-off 7 GBP, 9 USD, 7 EUR or 1,200 JPY",
    revolut: "No fee for the first Standard card, but delivery is charged: ¥500 regular or ¥2,000 express on a Japan account. The app shows yours before you order.",
  },
  {
    feature: "Japanese ATM's own fee",
    wise: ATM_OPERATOR_FEE,
    revolut: ATM_OPERATOR_FEE,
  },
];

const atmRows = [
  { account: "United Kingdom", wise: "250 GBP", standard: "£200 or 5 withdrawals", premium: "£400", metal: "£800" },
  { account: "Japan", wise: "25,000 JPY", standard: "¥25,000", premium: "¥50,000", metal: "¥100,000" },
];

const chooseWise = [
  {
    title: "You want the same terms every day",
    desc: "Wise converts at the mid-market rate seven days a week, with a fee from 0.24% that varies by currency, and its pricing pages list no weekend surcharge. You never have to think about what day it is before you tap your card.",
  },
  {
    title: "You'll spend over the weekend",
    desc: "Revolut Standard adds 1% to exchanges at weekends, and Plus adds 0.5%. If your trip includes weekend shopping, dining or ATM trips and you have not moved money into yen beforehand, Wise avoids that surcharge.",
  },
  {
    title: "You prefer simplicity over features",
    desc: "Wise is a straightforward multi-currency account and card. Hold yen, spend yen, done. There's no plan ladder to weigh up and no monthly fee.",
  },
];

const chooseRevolut = [
  {
    title: "You'll take out a lot of cash",
    desc: "Revolut charges 2% once the allowance is used, against 2.69% on a UK or Eurozone Wise card. Premium doubles Standard's free allowance and Metal quadruples it, and on UK figures Ultra goes to £2,000 a month.",
  },
  {
    title: "You'll exchange on weekdays",
    desc: "On Standard, Revolut adds no extra fee Monday to Friday up to a monthly limit: ¥300,000 on a Japan-registered account, £1,000 in the UK. Move money into yen on a weekday and weekend spending draws on that balance, so there is no weekend exchange to charge for.",
  },
  {
    title: "You want app features and budgeting",
    desc: "Revolut leans into its app: instant spend notifications, spending analytics, budgets, and easy card freezing. If you like managing money in-app, it's the richer experience.",
  },
];

const faqItems = [
  {
    q: "Is Wise or Revolut better for Japan?",
    a: `Wise is the simpler pick for card payments and exchange: mid-market rate every day, a conversion fee from 0.24%, no monthly fee and no weekend surcharge listed. Revolut suits heavy cash users, because it charges 2% above the free ATM allowance against 2.69% on a UK or Eurozone Wise card and paid plans raise the allowance. Revolut Standard can also beat Wise on exchange if you convert Monday to Friday inside its monthly limit. Checked ${CHECKED}.`,
  },
  {
    q: "Does Revolut really charge more on weekends?",
    a: `On Standard and Plus, yes. Revolut adds 1% on Standard and 0.5% on Plus to exchanges between 5pm Friday and 6pm Sunday US Eastern Time, which in Japan runs from Saturday morning to Monday morning. Premium, Metal and Ultra add nothing. Wise's pricing pages list no weekend fee. If you move money into yen on a weekday, weekend spending draws on that balance and no exchange takes place. Checked ${CHECKED}.`,
  },
  {
    q: "Which is cheaper for ATM withdrawals in Japan?",
    a: `It depends on how much you take out and where your account is registered. On UK figures, Wise is free to 250 GBP a month, then 2.69% of the excess; Revolut Standard is free to £200 or 5 withdrawals, then 2%. Wise is cheaper for smaller totals and Revolut for larger ones, and Premium (£400) or Metal (£800) raise Revolut's allowance further. On a Japan-registered account both start at ¥25,000, with Wise at ¥100 + 1.75% of the excess and Revolut at 2%. A US Wise card pays 1.95 USD + 1.95% per withdrawal after 250 USD. Checked ${CHECKED}.`,
  },
  {
    q: "Does Wise limit the number of free ATM withdrawals?",
    a: `Wise's card-fee pages set the free allowance by amount, for example 250 GBP or 25,000 JPY a month, and list no withdrawal count. Revolut's UK Standard allowance does have one: £200 or 5 withdrawals, whichever comes first. Checked ${CHECKED}.`,
  },
  {
    q: "Do Japanese ATMs charge a fee on top of Wise or Revolut?",
    a: `They can, and neither card's free allowance covers it. Japan Post Bank says an ATM usage fee of ¥220 including tax per use may apply to certain cards issued abroad. Seven Bank says its fee differs by card brand and publishes no amount on its overseas-card page. Checked ${CHECKED}.`,
  },
  {
    q: "Can I use Wise or Revolut with Suica or Apple Pay in Japan?",
    a: `Apple Pay, yes: Wise lists it for cards issued in the UK, US, Japan, Australia and several other countries, and Revolut lists Japan among its Apple Pay countries. Suica is less certain. Wise's Australian Suica guide says you can use Apple Pay to top up a digital Suica but warns not every card will work, and we found no Revolut statement either way. Apple does not name eligible cards, so keep yen cash for a station ticket machine. Checked ${CHECKED}.`,
  },
  {
    q: "Do I need both Wise and Revolut for Japan?",
    a: "No, one is enough for most trips, but two cards from different providers give you a backup if one is declined or blocked, and let you use each one's free ATM allowance. Seven Bank ATMs in 7-Eleven list Visa and Mastercard, so try those first with either card.",
  },
  {
    q: "Do I still need cash if I have Wise or Revolut?",
    a: "Yes. Japan is still partly cash-based — many small restaurants, izakayas, temples, shrines, and market stalls accept cash only. Use your card for hotels, chain stores, and convenience stores, and keep ¥10,000–¥20,000 in cash for everywhere else. Withdraw yen from a 7-Eleven or Japan Post ATM on arrival.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/money/wise-vs-revolut-japan") } });

export default function WiseVsRevolutJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money/wise-vs-revolut-japan" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money/wise-vs-revolut-japan" />
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
                { "@type": "ListItem", position: 4, name: "Wise vs Revolut", item: "https://www.japan-travel-kit.com/guides/money/wise-vs-revolut-japan" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/money/wise-vs-revolut-japan",
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
          <span className={styles.breadCurrent}>Wise vs Revolut</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Wise vs Revolut Japan (2026):<br />Which Travel Card Wins?
          </h1>
          <p className={styles.heroSubtitle}>
            Two of the best travel cards for Japan — but they win in different situations. Here&apos;s how to pick.
          </p>
          <div className={styles.heroBadges}>
            {[`Fees checked ${CHECKED}`, "ATM Limits Compared", "Weekend Fee Explained"].map((t) => (
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
          <strong>For card payments and exchange in Japan, Wise is the simpler pick:</strong> it converts at the
          mid-market rate with a fee from 0.24% and lists no weekend surcharge, while Revolut Standard adds 1% at
          weekends (though nothing extra Monday to Friday inside its monthly limit).{" "}
          <strong>If you will take out a lot of cash, Revolut is cheaper:</strong> it charges 2% above the allowance
          against Wise&apos;s 2.69%, and paid plans raise the limit. Free ATM withdrawals are{" "}
          <strong>Wise 250 GBP, USD or EUR a month</strong> with no withdrawal count listed (¥25,000 on a Japan-issued
          card), and <strong>Revolut £200 or 5 withdrawals on UK Standard, £400 on Premium and £800 on Metal</strong>{" "}
          (¥25,000, ¥50,000 and ¥100,000 on a Japan account). On both, the Japanese ATM&apos;s own fee is separate.
          Figures checked {CHECKED}.
        </p>

        {/* Disclaimer */}
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Not financial advice.</strong> This guide is general information only. Fees, limits, and plans were
            checked on {CHECKED}, can change, and depend on the country where your account is registered — always confirm the latest on the official{" "}
            <a href={WISE_FEES_URL} target="_blank" rel={WISE_REL} style={{ color: "var(--text)", fontWeight: 600 }}>Wise</a>{" "}
            and{" "}
            <a href={REVOLUT_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--text)", fontWeight: 600 }}>Revolut</a>{" "}
            fees pages before you rely on them. Some links on this page are affiliate links and we may earn a commission
            at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
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
                <p className={styles.verdictStatLabel}>Card payments and exchange</p>
                <p className={styles.verdictStatValue}>Wise</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Lots of ATM cash</p>
                <p className={styles.verdictStatValue}>Revolut</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Weekend spending</p>
                <p className={styles.verdictStatValue}>Wise</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Bottom line:</strong> <strong>Wise</strong> wins for simplicity and weekend spending, because its
              terms do not change with the day of the week. <strong>Revolut</strong> wins for heavy cash users and
              weekday exchange inside its limit (¥300,000 a month on a Japan account, £1,000 in the UK).
            </p>
            <a href={WISE_URL} className={styles.verdictBtn} target="_blank" rel={WISE_REL}>
              Open a Wise account →
            </a>
            <p className={styles.bodyText} style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
              Comparing more than these two? See our{" "}
              <Link href="/guides/money/best-travel-card-japan" style={{ fontWeight: 600 }}>best travel card for Japan</Link>{" "}
              roundup, which also covers Charles Schwab, Starling, and Monzo.
            </p>
          </div>
        </div>

        {/* Head-to-head table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Head-to-head</span>
          <h2 className={styles.sectionTitle}>Is Wise or Revolut better for Japan?</h2>
          <p className={styles.bodyText}>
            Wise for most card spending, because one set of terms applies all week; Revolut if you can exchange on
            weekdays or need more cash from ATMs. The table compares Wise with Revolut&apos;s free Standard plan, and your
            figures follow the country your account is registered in, not Japan.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", padding: "0.6rem 0.75rem", fontSize: "0.82rem", color: "var(--text-muted)", textAlign: "left" }}>
                  Fees checked {CHECKED}. Your app shows your own allowance and limits.
                </caption>
                <thead>
                  <tr>
                    {["", "Wise", "Revolut (Standard)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.tdProvider}>{row.feature}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.wise}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.revolut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Wise figures:{" "}
            <a href={WISE_FEES_URL} target="_blank" rel={WISE_REL} style={{ fontWeight: 600 }}>Wise&apos;s pricing pages</a>,
            read directly. Revolut figures:{" "}
            <a href={REVOLUT_JP_PLANS_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ fontWeight: 600 }}>Japan plans</a>,{" "}
            <a href={REVOLUT_JP_FX_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ fontWeight: 600 }}>exchange fees</a> and{" "}
            <a href={REVOLUT_JP_CARD_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ fontWeight: 600 }}>card order fees</a>.
            Revolut blocks automated page reads, so its figures were read from those pages&apos; search-index entries on{" "}
            {CHECKED}, not from the live pages. Plus adds 0.5% at weekends; Premium, Metal and Ultra add nothing.
          </p>
        </section>

        {/* ATM table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ATMs</span>
          <h2 className={styles.sectionTitle}>Which is cheaper for ATM withdrawals in Japan?</h2>
          <p className={styles.bodyText}>
            Wise for smaller monthly totals on the free plans, Revolut for larger ones. On UK figures Wise gives you £50
            more free, but charges 2.69% above that against Revolut&apos;s 2%, and a paid Revolut plan moves the free limit
            well past Wise&apos;s.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", padding: "0.6rem 0.75rem", fontSize: "0.82rem", color: "var(--text-muted)", textAlign: "left" }}>
                  Free ATM withdrawals per month, checked {CHECKED}. Above these, Revolut charges 2% on every plan.
                </caption>
                <thead>
                  <tr>
                    {["Account registered in", "Wise", "Revolut Standard", "Revolut Premium", "Revolut Metal"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {atmRows.map((row) => (
                    <tr key={row.account}>
                      <td className={styles.tdProvider}>{row.account}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.wise}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.standard}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.premium}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.metal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            On the UK figures the two free options cross at about £395 withdrawn in a month: below that Wise costs less,
            above it Revolut Standard does. That is our own arithmetic. It assumes Revolut&apos;s 2% falls only on the excess,
            and it ignores Revolut&apos;s £1 minimum and its 5-withdrawal cap, so more than five small withdrawals favours Wise.
            On a Japan-registered account both allowances are ¥25,000, and above it Wise charges ¥100 + 1.75% of the
            excess against Revolut&apos;s 2%.
          </p>
          <p className={styles.bodyText}>
            The machine&apos;s own fee is separate on both cards, so fewer and larger withdrawals help either way. Seven Bank
            allows ¥100,000 per withdrawal (¥30,000 on a magnetic-stripe read) and Japan Post Bank ¥50,000. Our{" "}
            <Link href="/guides/money/atms-in-japan" style={{ fontWeight: 600 }}>ATMs in Japan guide</Link> covers which
            networks take foreign cards, and{" "}
            <Link href="/guides/money/how-much-yen-to-bring-japan" style={{ fontWeight: 600 }}>how much yen to bring</Link>{" "}
            helps you size the withdrawal against your allowance.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Sources:{" "}
            <a href={WISE_FEES_URL} target="_blank" rel={WISE_REL} style={{ fontWeight: 600 }}>Wise</a>, read directly;{" "}
            Revolut&apos;s{" "}
            <a href={REVOLUT_UK_CASH_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ fontWeight: 600 }}>UK</a> and{" "}
            <a href={REVOLUT_JP_CASH_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ fontWeight: 600 }}>Japan</a>{" "}
            cash withdrawal pages, read from search-index entries. All on {CHECKED}. Accounts in other countries have their
            own schedules, and Wise changed its ATM structure on 1 May 2026, so older guides may quote different figures.
          </p>
        </section>

        {/* Suica and Apple Pay */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Phone payments</span>
          <h2 className={styles.sectionTitle}>Can I use Wise or Revolut with Suica or Apple Pay in Japan?</h2>
          <p className={styles.bodyText}>
            Apple Pay, yes, on both. Suica is less clear, so do not rely on either card for it.{" "}
            <a href={WISE_APPLE_PAY_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ fontWeight: 600 }}>Wise&apos;s help centre</a>{" "}
            lists Apple Pay for cards issued in Australia, Brazil, Canada, EEA countries where it is supported, Israel,
            Japan, Malaysia, New Zealand, Singapore, the US and the UK. Revolut lists Japan among its Apple Pay countries,
            and its Japan help page says to choose Visa rather than iD or QUICPay at the terminal.
          </p>
          <p className={styles.bodyText}>
            On Suica,{" "}
            <a href={WISE_SUICA_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ fontWeight: 600 }}>Wise&apos;s Australian Suica guide</a>{" "}
            says you can add the card to Apple Pay &ldquo;to top up your digital Suica&rdquo;, then warns that &ldquo;Not
            every Australian-issued payment card will necessarily work&rdquo;. We found no Revolut statement either way.{" "}
            <a href={APPLE_TRANSIT_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ fontWeight: 600 }}>Apple&apos;s transit card page</a>{" "}
            describes topping up through Apple Pay but does not name eligible cards. Plan to top up with yen cash at a
            station ticket machine; our{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ fontWeight: 600 }}>IC cards guide</Link> covers how.
            Checked {CHECKED}; Revolut&apos;s wording is from search-index entries.
          </p>
        </section>

        {/* Choose Wise */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Pick Wise if…</span>
          <h2 className={styles.sectionTitle}>When Wise Wins</h2>
          <div className={styles.stepsList}>
            {chooseWise.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a href={WISE_URL} className={styles.pickCta} target="_blank" rel={WISE_REL} style={{ marginTop: "1.5rem", display: "inline-block" }}>
            Visit Wise →
          </a>
        </section>

        {/* Choose Revolut */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Pick Revolut if…</span>
          <h2 className={styles.sectionTitle}>When Revolut Wins</h2>
          <div className={styles.stepsList}>
            {chooseRevolut.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a href={REVOLUT_URL} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow" style={{ marginTop: "1.5rem", display: "inline-block" }}>
            Visit Revolut →
          </a>
        </section>

        {/* Verdict */}
        <section className={styles.verdictSection}>
          <span className={styles.sectionLabel}>Bottom line</span>
          <h2 className={styles.sectionTitle}>Do I need both Wise and Revolut for Japan?</h2>
          <p className={styles.verdictText}>
            No. For a typical Japan trip, <strong>Wise</strong> alone is the easier recommendation: the mid-market rate
            every day of the week, no monthly fee, and nothing to time before you tap your card.{" "}
            <strong>Revolut</strong> alone makes sense if you will withdraw a lot of cash, can exchange on weekdays, or
            value its app.
          </p>
          <p className={styles.verdictText}>
            Carrying both is still a reasonable move: you get a backup card and can use each provider&apos;s free ATM
            allowance. Either way you will want some yen, so see our{" "}
            <Link href="/guides/money/cash-vs-card-japan" style={{ fontWeight: 600 }}>cash vs card guide</Link> for where
            each works.
          </p>
        </section>

        <KlookTripPrep
          heading="What to Pay by Card Before You Fly"
          intro="Whichever card you pick, some of the trip does not have to wait until you land. Paying for these before you leave keeps them off the weekend and out of your ATM allowance:"
          items={wiseVsRevolutTripPrep}
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
          <h2 className={styles.sectionTitle}>Keep Your Card App Online From Landing</h2>
          <p className={styles.bodyText}>
            Balances, spend alerts and card freezes live in the Wise and Revolut apps, so set up data before you fly.
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
            <Link href="/guides/money/revolut-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Revolut in Japan (2026): Fees, ATMs &amp; Is It Worth It?</p>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Set up your card before you fly</h2>
            <p className={styles.ctaBannerDesc}>
              App-based cards can take several days to arrive by post. Order ahead so you land in Japan ready to spend
              at the mid-market rate.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <a href={WISE_URL} className={styles.ctaBannerBtn} target="_blank" rel={WISE_REL}>
                Visit Wise →
              </a>
              <a href={REVOLUT_URL} className={styles.ctaBannerBtn} target="_blank" rel="noopener noreferrer nofollow">
                Visit Revolut →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
