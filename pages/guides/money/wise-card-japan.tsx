import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookLink from "../../../components/KlookLink";
import { klookEsim, naritaExpressRoundTripUrl, tokyoSubwayTicket, wiseCardTripPrep } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { wiseLink, WISE_REL, WISE_PRICING_URL } from "../../../lib/wise-links";

// Tracked Wise links. pubref is this article's slug; the fees-page link deep-links
// to Wise's own pricing page, the CTAs land on the localised home page.
const WISE_URL = wiseLink("wise-card-japan");
const WISE_FEES_URL = wiseLink("wise-card-japan", WISE_PRICING_URL);

/**
 * Every Wise figure on this page was read off Wise's own country card-fee pages on
 * this date, and every Japanese figure off the ATM operator's own site. Nothing here
 * is inferred or estimated, which matters more on this page than on most: Wise
 * changed the ATM structure in May 2026, and the allowance is set by the country
 * your card was issued in rather than by the country you are standing in.
 */
const CHECKED = "26 October 2026";

/**
 * The table this page exists for. There is no single answer to "how much does Wise
 * charge at a Japanese ATM" — the allowance follows the country where your latest
 * card was issued. Each row is that country's own Wise card-fees page, read on
 * CHECKED: wise.com/{us,gb,de,au}/pricing/card-fees and wise.com/en-jp/pricing/card-fees.
 */
const atmAllowances = [
  {
    country: "United States",
    free: "250 USD per month",
    over: "1.95 USD + 1.95% on each withdrawal once you pass 250 USD in the month",
    card: "9 USD",
  },
  {
    country: "United Kingdom",
    free: "250 GBP per month",
    over: "2.69% of the amount over 250 GBP",
    card: "7 GBP",
  },
  {
    country: "Eurozone",
    free: "250 EUR per month",
    over: "2.69% of the amount over 250 EUR",
    card: "7 EUR",
  },
  {
    country: "Australia",
    free: "400 AUD per month",
    over: "2.69% of the amount over 400 AUD",
    card: "10 AUD",
  },
  {
    country: "Japan",
    free: "25,000 JPY per month",
    over: "100 JPY + 1.75% of the amount over 25,000 JPY",
    card: "1,200 JPY",
  },
];

/**
 * The Japanese side of the same withdrawal. Only two operators are named here with
 * figures, because only two publish them where they can be read: Japan Post Bank
 * prints its fee, and Seven Bank prints its limits and hours but says of the fee
 * only that it varies by card brand. The third row exists so the page does not
 * imply a guarantee it cannot source.
 */
const japanAtms = [
  {
    atm: "Seven Bank — inside 7-Eleven stores",
    takes: "Yes: Visa, Mastercard (incl. Maestro and Cirrus), UnionPay, American Express, JCB, Discover, Diners Club",
    limit: "¥100,000 per withdrawal, or ¥30,000 if the machine reads the magnetic stripe rather than the chip",
    fee: "Not published as a figure — Seven Bank states only that the fee differs by card brand and is charged per transaction",
  },
  {
    atm: "Japan Post Bank — post offices, and some FamilyMart stores",
    takes: "Yes: Visa, PLUS, Mastercard, Maestro, Cirrus, JCB, China UnionPay, DISCOVER",
    limit: "¥50,000 per withdrawal",
    fee: "¥220 including tax per use, in Japan Post Bank's own words",
  },
  {
    atm: "AEON Bank, Lawson, E-net and other convenience-store machines",
    takes: "No claim made here",
    limit: "—",
    fee: "Not published anywhere we could read it",
  },
];

/** Wise's own fee lines, each one a quote or a figure from a Wise page read on CHECKED. */
const feeRows = [
  {
    item: "Monthly / annual fee",
    detail: "None. Wise charges a one-off fee when the card is issued — 9 USD, 7 GBP, 7 EUR, 10 AUD or 1,200 JPY depending on your country.",
  },
  {
    item: "Exchange rate",
    detail: "The mid-market rate. Wise's pricing page puts it as \"the one you can check on Google\".",
  },
  {
    item: "Conversion fee",
    detail: "Varies by currency. Wise headlines it as \"From 0.23%\" on its US pricing page and \"From 0.24%\" on its UK one.",
  },
  {
    item: "Spending a yen balance",
    detail: "Free. Wise's UK pricing page lists paying with the card from a balance in the same currency as free — in store, online and abroad.",
  },
  {
    item: "ATM withdrawals",
    detail: "Free up to your country's monthly allowance, then 2.69% of the excess (1.95 USD + 1.95% per withdrawal on a US card, ¥100 + 1.75% on a Japanese one).",
  },
  {
    item: "Japanese ATM operator fee",
    detail: "Separate from Wise, and added by the machine. Wise's own Japan guide says that if you see an operator fee, \"it's charged by the ATM owner, not Wise\".",
  },
];

const howToSteps = [
  {
    title: "Order and fund the card before you fly",
    desc: "The Wise card is posted to you, so order well ahead of your trip. Add money to your account and, if you like, convert it to yen in advance to lock in the mid-market rate before you travel.",
  },
  {
    title: "Hold yen or let it auto-convert",
    desc: "You can convert money to JPY and hold it in your Wise account, or simply spend from another currency and let Wise convert at the time of payment. Wise's UK card page states that if you do not hold the currency, \"we'll auto-convert at our best rate\" — holding yen just lets you fix your rate ahead of time.",
  },
  {
    title: "Always choose to pay in yen (JPY)",
    desc: "At terminals and ATMs you may be offered your home currency instead of yen — this is Dynamic Currency Conversion (DCC), and the rate is set by the merchant rather than by Wise. Decline it and pay in JPY so Wise handles the conversion at the mid-market rate.",
  },
  {
    title: "Withdraw in large amounts, not small ones",
    desc: "Seven Bank states that an overseas-issued card can take out ¥100,000 per withdrawal (¥30,000 if the machine has to read a magnetic stripe), and Japan Post Bank ¥50,000. Because the Japanese operator fee is charged per transaction, one big withdrawal costs less than three small ones — and your Wise allowance is monthly, so a long trip and a short one share the same free limit.",
  },
];

const pros = [
  "Mid-market exchange rate — \"the one you can check on Google\", in Wise's own words",
  "No monthly or annual fee, just a one-off card cost (9 USD / 7 GBP / 7 EUR / 10 AUD)",
  "Free ATM withdrawals up to 250 USD, GBP or EUR, or 400 AUD, every month",
  "Spending a yen balance you already hold is listed as free",
  "Works at Seven Bank and Japan Post Bank ATMs — the two Wise names itself for Japan",
  "Adds to Apple Pay and Google Pay on US, UK, EEA, Australian and other listed cards",
];

const cons = [
  "The Japanese machine adds its own fee — Japan Post Bank publishes ¥220 including tax per use",
  "2.69% above the monthly allowance, or 1.95 USD + 1.95% per withdrawal on a US card",
  "The allowance is monthly, not per trip — a two-week trip gets the same 250 as a weekend",
  "Not a credit card, so no purchase protection and no rewards points",
  "Google Pay is not available if your Wise card was issued in Japan",
  "Requires the smartphone app to set up and manage",
];

const faqItems = [
  {
    q: "Does the Wise card work in Japan?",
    a: "Yes. Wise's UK card page says to use the physical card \"wherever they accept Visa\", and Wise's own Japan guide names Seven Bank ATMs inside 7-Eleven stores and Japan Post Bank ATMs for withdrawing yen. Japan is still partly a cash country, so use the card for hotels, chain stores and convenience stores and keep some cash for smaller venues. Checked 26 October 2026.",
  },
  {
    q: "How much does Wise charge for ATM withdrawals in Japan?",
    a: "Nothing up to your monthly allowance, which is set by the country your card was issued in: 250 USD on a US card, 250 GBP on a UK one, 250 EUR in the Eurozone, 400 AUD in Australia and 25,000 JPY on a Japan-issued card. Above that, Wise charges 2.69% of the excess in the UK, the Eurozone and Australia; 1.95 USD + 1.95% on each withdrawal on a US card; and 100 JPY + 1.75% on a Japanese one. The Japanese ATM operator may add a fee of its own on top. All figures read off Wise's own country card-fee pages on 26 October 2026.",
  },
  {
    q: "Do Japanese ATMs add their own fee on top of Wise?",
    a: "They can, and it is separate from anything Wise charges. Japan Post Bank states an ATM usage fee of ¥220 including tax per use for overseas-issued cards. Seven Bank says its fee differs by card brand and is charged per transaction, but does not publish the amount on its overseas-card page, so no figure for it appears on this page. Wise's own Japan guide confirms the principle: if you see an operator fee, \"it's charged by the ATM owner, not Wise\". Checked 26 October 2026.",
  },
  {
    q: "Does Wise work at 7-Eleven ATMs in Japan?",
    a: "Yes. Seven Bank states that its ATMs dispense yen to cards issued outside Japan on the Visa, Mastercard (including Maestro and Cirrus), UnionPay, American Express, JCB, Discover and Diners Club networks. The limit is ¥100,000 per withdrawal, or ¥30,000 if the machine has to read a magnetic stripe rather than the chip, and the Visa and Mastercard service runs 00:00–24:00. Checked 26 October 2026.",
  },
  {
    q: "Can I add my Wise card to Apple Pay or Google Pay for Japan?",
    a: "In most cases yes. Wise's help centre states you can add the card to Apple Pay if it was issued in Australia, Brazil, Canada, an EEA country where it is supported, Israel, Japan, Malaysia, New Zealand, Singapore, the US or the UK. Google Pay covers a similar list including the UK, the US, Australia and most of the EEA, but Wise states it \"is not currently available if your card was issued in Japan\". Checked 26 October 2026.",
  },
  {
    q: "How do I avoid fees with Wise at Japanese ATMs?",
    a: "Two habits. First, always choose to pay in yen rather than your home currency — declining Dynamic Currency Conversion keeps the conversion with Wise at the mid-market rate. Second, withdraw larger amounts less often: that keeps you inside the monthly free allowance (250 USD, GBP or EUR, or 400 AUD) and spreads the Japanese operator's per-transaction fee across more cash. Seven Bank allows up to ¥100,000 in one withdrawal.",
  },
  {
    q: "Should I hold yen in Wise before I travel?",
    a: "It's optional but useful. Converting to yen in advance lets you lock in the mid-market rate at a moment of your choosing, so currency movements during your trip don't affect what you've already converted. Alternatively, leave the money in your home currency and let Wise auto-convert at the point of payment — its UK card page states it converts at its best rate if you don't hold the currency.",
  },
  {
    q: "Is Wise better than a normal bank card for Japan?",
    a: "For most travellers, yes. A typical home-bank debit or credit card charges a foreign transaction fee plus a marked-up exchange rate. Wise uses the mid-market rate with a conversion fee it headlines as \"From 0.23%\" (US) or \"From 0.24%\" (UK), so on a two-week trip the difference is meaningful. It is still a debit product, so carry a backup card and some cash too.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/money/wise-card-japan") } });

const TITLE = "Wise Card in Japan (2026): ATM Fees Free to 250 USD/GBP/EUR, Then 2.69% | Japan Travel Kit";
const DESCRIPTION =
  "Yes, the Wise card works at Japanese ATMs. Withdrawals are free to 250 USD/GBP/EUR or 400 AUD a month, then 2.69%; Japan Post Bank adds ¥220 per use.";

export default function WiseCardJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money/wise-card-japan" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money/wise-card-japan" />
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
                { "@type": "ListItem", position: 4, name: "Wise Card in Japan", item: "https://www.japan-travel-kit.com/guides/money/wise-card-japan" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/money/wise-card-japan",
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
          <span className={styles.breadCurrent}>Wise Card in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Wise Card in Japan (2026):<br />ATM Fees, Free Limits &amp; Which ATMs Take It
          </h1>
          <p className={styles.heroSubtitle}>
            Free withdrawals to 250 USD, GBP or EUR a month, 2.69% above that, and a separate fee from the
            Japanese machine. Every figure below comes from Wise or the ATM operator itself.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Free to 250/mo", `Figures checked ${CHECKED}`].map((t) => (
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
            <strong>Not financial advice.</strong> This guide is general information only. Fees and limits change,
            and they depend on the country where your Wise account is registered — always confirm the latest on the
            official{" "}
            <a href={WISE_FEES_URL} target="_blank" rel={WISE_REL} style={{ color: "var(--text)", fontWeight: 600 }}>Wise fees page</a>{" "}
            before you rely on them. Some links on this page are affiliate links and we may earn a commission at no
            extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Answer first — the paragraph that has to settle the search before the reader scrolls */}
        <section className={styles.bodySection} style={{ marginBottom: "2.5rem" }}>
          <h2 className={styles.sectionTitle}>Does the Wise Card Work in Japan?</h2>
          <p className={styles.bodyText}>
            <strong>
              Yes — a Wise card withdraws yen at Seven Bank ATMs inside 7-Eleven and at Japan Post Bank ATMs, and
              spends anywhere Visa is accepted.
            </strong>{" "}
            Wise takes nothing on withdrawals up to 250 USD, 250 GBP, 250 EUR or 400 AUD a month depending on where
            your card was issued, then 2.69% of the excess — or 1.95 USD + 1.95% per withdrawal on a US card, and
            ¥100 + 1.75% on a Japan-issued one — while the Japanese machine charges separately, with Japan Post Bank
            publishing ¥220 including tax per use and Seven Bank stating only that its fee varies by card brand.
            That makes it a strong card for a visitor who wants the mid-market rate on card payments and two or
            three large cash withdrawals, and a poor one for anyone planning to take out ¥10,000 at a time.
          </p>
          <a href={WISE_URL} className={styles.verdictBtn} target="_blank" rel={WISE_REL} style={{ display: "inline-block", marginTop: "0.5rem" }}>
            Order a Wise card →
          </a>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Every Wise figure on this page was read off Wise&apos;s own country card-fee pages on {CHECKED}, and every
            Japanese figure off the ATM operator&apos;s own site on the same day. Where an operator does not publish a
            number, this page says so rather than guessing one.{" "}
            <a href="#atm-fees" style={{ color: "var(--accent)", fontWeight: 600 }}>Jump to the fee table ↓</a>
          </p>
        </section>

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
                <p className={styles.verdictStatLabel}>Free ATM allowance</p>
                <p className={styles.verdictStatValue}>250 USD/GBP/EUR a month</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Above the allowance</p>
                <p className={styles.verdictStatValue}>2.69%</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Wise is one of the best-value ways to spend in Japan — the mid-market rate,
              no monthly cost, and a free monthly ATM allowance. Two rules make it work: always{" "}
              <strong>pay in yen</strong> (decline DCC), and take out <strong>fewer, larger</strong> withdrawals,
              because the Japanese operator fee is charged per transaction.
            </p>
            <p className={styles.bodyText} style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
              Weighing it against Revolut? See our{" "}
              <Link href="/guides/money/wise-vs-revolut-japan" style={{ fontWeight: 600 }}>Wise vs Revolut for Japan</Link>{" "}
              comparison.
            </p>
          </div>
        </div>

        {/* The allowance table — the part a one-line AI answer cannot get right */}
        <section className={styles.comparisonSection} id="atm-fees">
          <span className={styles.sectionLabel}>Country by country</span>
          <h2 className={styles.sectionTitle}>How Much Does Wise Charge for ATM Withdrawals in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            Nothing up to your monthly allowance, then a percentage of the excess. The catch is that the allowance
            is not a Japanese figure at all — Wise sets it by the country your latest card was issued in, so two
            travellers standing at the same 7-Eleven machine can be on different terms.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Card issued in", "Free ATM withdrawals", "Fee above the allowance", "One-off card fee"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {atmAllowances.map((row) => (
                    <tr key={row.country}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.country}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.free}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.over}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.card}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Read off each country&apos;s own Wise card-fees page on {CHECKED}. Wise revised this structure on
            1 May 2026 and ties it to where your latest card was issued, which is normally the registered address
            on your account — so an older guide quoting a flat 1.75% or a ¥30,000 allowance is describing the
            previous scheme. The allowance resets monthly, not per trip.{" "}
            <a href={WISE_FEES_URL} target="_blank" rel={WISE_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              Check the current figures on Wise →
            </a>
          </p>
        </section>

        {/* Which ATMs */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ATM by ATM</span>
          <h2 className={styles.sectionTitle}>Which ATMs in Japan Accept the Wise Card?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            Seven Bank and Japan Post Bank, which are the two Wise names in its own Japan guide. Seven Bank is the
            easier of the pair to find — one inside almost every 7-Eleven — and it lets you take out twice as much
            in a single transaction.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ATM", "Takes an overseas-issued card?", "Maximum per withdrawal", "The operator's own fee"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {japanAtms.map((row) => (
                    <tr key={row.atm}>
                      <td className={styles.tdProvider}>{row.atm}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.takes}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.limit}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Hours differ too. Seven Bank runs its Visa and Mastercard service 00:00–24:00, with JCB and UnionPay
            00:10–23:50 and American Express 00:05–23:50. Japan Post Bank machines run 07:00–23:00 Monday to
            Saturday and 07:00–21:00 on Sundays and holidays, while its machines in FamilyMart stores run
            00:05–23:55. Both operators&apos; own pages, read {CHECKED}. For the wider picture — which machines are
            where, and what to do when one rejects a card — see our{" "}
            <Link href="/guides/money/atms-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>ATMs in Japan guide</Link>.
          </p>
        </section>

        {/* The Japanese side of the fee */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The other fee</span>
          <h2 className={styles.sectionTitle}>Do Japanese ATMs Add Their Own Fee?</h2>
          <p className={styles.bodyText}>
            Yes, and it is charged by the machine rather than by Wise — which is why staying inside your Wise
            allowance does not make a withdrawal free. Japan Post Bank states an ATM usage fee of{" "}
            <strong>¥220 including tax per use</strong> for overseas-issued cards. Seven Bank says its fee differs
            by card brand and is charged per transaction, but does not publish the amount on its overseas-card
            page, so no figure for it appears here. Wise puts the principle plainly in its own Japan guide: if you
            see an operator fee, &ldquo;it&apos;s charged by the ATM owner, not Wise&rdquo;.
          </p>
          <p className={styles.bodyText}>
            Because that charge is per transaction rather than per yen, the arithmetic favours fewer and larger
            withdrawals. Taking ¥100,000 once at a Seven Bank machine costs one operator fee; taking ¥20,000 five
            times costs five.
          </p>
          <p className={styles.bodyText}>
            It also favours needing less cash in the first place — and two of the things people queue at an
            arrivals-hall ATM for do not need yen at all, because they can be paid for on the card before you
            leave home. A{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Japan eSIM
            </KlookLink>{" "}
            means your data is live the moment you land rather than something to buy at a counter, and a{" "}
            <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Tokyo Subway Ticket
            </KlookLink>{" "}
            covers Tokyo Metro and Toei travel without an IC card balance to top up in cash. Both go to Klook,
            which pays us a commission at no extra cost to you; prices are Klook&apos;s and we do not quote them
            here, because its product pages block automated checks.
          </p>
          <a href={WISE_URL} className={styles.pickCta} target="_blank" rel={WISE_REL} style={{ marginTop: "0.5rem", display: "inline-block" }}>
            Visit Wise →
          </a>
        </section>

        {/* Wise's own fees */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Fees</span>
          <h2 className={styles.sectionTitle}>What Does the Wise Card Cost to Use?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            There is no monthly fee and no foreign transaction fee in the usual sense. What you pay is a one-off
            cost for the card, a conversion fee when money changes currency, and the ATM charges above.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Detail"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {feeRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.item}</td>
                      <td style={{ fontSize: "0.9rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Wise pages read {CHECKED}. The conversion fee is per currency rather than a single headline number,
            which is why Wise prints it as a &ldquo;from&rdquo; figure and shows the exact amount in the app before you
            convert. For how Wise compares with changing cash at an airport counter, see our{" "}
            <Link href="/guides/money/currency-exchange-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              currency exchange guide
            </Link>.
          </p>
        </section>

        {/* Wallets */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Phone payments</span>
          <h2 className={styles.sectionTitle}>Can You Use the Wise Card with Apple Pay, Google Pay or Suica in Japan?</h2>
          <p className={styles.bodyText}>
            Apple Pay and Google Pay, yes — Suica is a different question. Wise&apos;s help centre states you can add
            the card to <strong>Apple Pay</strong> if it was issued in Australia, Brazil, Canada, an EEA country
            where it is supported, Israel, Japan, Malaysia, New Zealand, Singapore, the US or the UK.{" "}
            <strong>Google Pay</strong> covers a similar list — the UK, the US, Australia, Canada, Brazil, Israel,
            Singapore and most of the EEA among others — with one exception Wise spells out: it &ldquo;is not
            currently available if your card was issued in Japan&rdquo;. Wise&apos;s UK card page also lists paying by
            QR code alongside Apple and Google Pay.
          </p>
          <p className={styles.bodyText}>
            A phone tap is still a card payment, though, and that is not the same thing as an IC card. Suica is
            issued by JR East rather than by Wise, and Wise does not list Suica or Mobile Suica anywhere in its
            card documentation — so this page will not tell you that a Wise card tops one up. Treat the two as
            separate tools: the Wise card for shops, hotels and ATM withdrawals, and an IC card for the ticket
            gates that take nothing else. Our{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              IC cards in Japan guide
            </Link>{" "}
            covers the deposits, refunds and top-up mechanics, and our{" "}
            <Link href="/guides/money/contactless-payment-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              contactless payment guide
            </Link>{" "}
            covers which gates a plain card tap now opens.
          </p>
        </section>

        {/* Wise or Revolut */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Head to head</span>
          <h2 className={styles.sectionTitle}>Wise or Revolut for Japan?</h2>
          <p className={styles.bodyText}>
            Wise if you want one rate and one published fee with nothing to manage; Revolut if you are willing to
            work around a plan structure to get a larger free ATM allowance. The two differ most in how they
            package it — Wise charges the same conversion fee whatever day of the week it is, while Revolut&apos;s
            allowances and weekend rate depend on the tier you are on.
          </p>
          <p className={styles.bodyText}>
            The comparison is long enough to deserve its own page, with both fee tables side by side:{" "}
            <Link href="/guides/money/wise-vs-revolut-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Wise vs Revolut for Japan
            </Link>. If you would rather see where both sit against the wider field, including the cards that
            charge nothing abroad at all, start with our{" "}
            <Link href="/guides/money/best-travel-card-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              best travel card for Japan guide
            </Link>.
          </p>
        </section>

        {/* What is Wise */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is the Wise Card?</h2>
          <p className={styles.bodyText}>
            Wise (formerly TransferWise) is a multi-currency account with a linked debit card. Rather than marking
            up the exchange rate like a traditional bank, Wise converts at the mid-market rate — in its own words,
            &ldquo;the one you can check on Google&rdquo; — and charges a stated fee on top.
          </p>
          <p className={styles.bodyText}>
            You can hold dozens of currencies in one account, including Japanese yen. That means you can convert to
            yen before your trip and spend from your JPY balance, or hold your home currency and let Wise convert
            as you spend. It&apos;s a debit product, not a credit card, so you spend money you&apos;ve loaded.
          </p>
        </section>

        {/* How to use */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>How to use it</span>
          <h2 className={styles.sectionTitle}>How to Use Wise in Japan</h2>
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
          <a href={WISE_URL} className={styles.pickCta} target="_blank" rel={WISE_REL} style={{ marginTop: "1.5rem", display: "inline-block" }}>
            Visit Wise →
          </a>
        </section>

        {/* Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Assessment</span>
          <h2 className={styles.sectionTitle}>Wise Pros &amp; Cons for Japan</h2>
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
            Even with a good card, Japan still runs on cash in plenty of places — small restaurants, izakayas,
            temples, shrines and market stalls are often cash only. One larger withdrawal on arrival, held as a
            running reserve, costs you less in operator fees than topping up every other day.
          </p>
          <p className={styles.bodyText}>
            The one thing worth settling before you need that reserve is the ride out of the airport, because it is
            among the few Japanese transport fares you can pay by card well in advance:{" "}
            <KlookLink href={naritaExpressRoundTripUrl} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              the Narita Express round trip
            </KlookLink>{" "}
            is bookable on Klook before you fly, which leaves the arrivals-hall ATM as something you choose rather
            than something you need. The link is an affiliate one and the price is Klook&apos;s.
          </p>
          <p className={styles.bodyText}>
            For which machines accept foreign cards and how to handle a rejected card, see our{" "}
            <Link href="/guides/money/atms-in-japan" style={{ color: "var(--red)", fontWeight: 600 }}>ATMs in Japan guide</Link>,
            and for where cards work at all, our{" "}
            <Link href="/guides/money/cash-vs-card-japan" style={{ color: "var(--red)", fontWeight: 600 }}>cash vs card guide</Link>.
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

        {/* Klook: the rest of the pre-trip setup */}
        <KlookTripPrep
          heading="The Rest of the Pre-Trip Setup"
          intro="Once the card is ordered, three other bookings are worth making while you are still at a desk rather than in an arrivals hall:"
          items={wiseCardTripPrep}
        />

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
                <p className={styles.relatedTitle}>Wise vs Revolut for Japan (2026): Which Travel Card Wins?</p>
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
            <Link href="/guides/money/cash-vs-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="7" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cash vs Card in Japan (2026): Where Cards Work and Where You Need Yen</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/revolut-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="6" width="22" height="13" rx="2" />
                  <circle cx="12" cy="12.5" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Revolut in Japan (2026): Fees, ATMs &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Get your Wise card before you go</h2>
            <p className={styles.ctaBannerDesc}>
              The card is posted to you, so order ahead. Land in Japan ready to spend at the mid-market rate and skip
              the airport exchange counters.
            </p>
            <a href={WISE_URL} className={styles.ctaBannerBtn} target="_blank" rel={WISE_REL}>
              Visit Wise →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
