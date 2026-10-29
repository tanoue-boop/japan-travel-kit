import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { howMuchYenTripPrep } from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { wiseLink, WISE_REL, WISE_CARD_URL } from "../../../lib/wise-links";

/** The one tracked Wise link on this page, placed after the "where do I get yen" answer. */
const WISE_CARD_CTA = wiseLink("how-much-yen-to-bring-japan", WISE_CARD_URL);

/**
 * Restored 29 Oct 2026 from the version the September merge absorbed (c6741d9^).
 *
 * The old page's numbers were a flat "budget / mid-range / comfortable" spending
 * table with no stated source, and its FAQ answered how much to *spend* rather
 * than how much to *carry* — which is the question the slug is asked. Every
 * figure here is either a published price or an official statement, with the date
 * it was read, and the arithmetic that turns prices into a cash float is spelled
 * out so it can be checked.
 *
 * Sources, all primary:
 *
 *   - JNTO (japan.travel): /en/plan/credit-cards/ for card acceptance and the
 *     short-distance fare caveat, /en/plan/currency/ for the ATM charge and hours
 *     warning, /en/plan/cashless-payments-in-japan/ for the rural cash advice,
 *     /en/plan/ic-card/ for the ¥500 IC deposit, and
 *     /en/plan/getting-around/luggage-storage/ for the coin-locker range.
 *   - Seven Bank (sevenbank.co.jp/intlcard/) for the overseas brand list and the
 *     28,000-machine count.
 *   - Japan Post Bank (jp-bank.japanpost.jp/en/ias/) for the ¥220 fee, the
 *     ¥50,000 single-transaction cap and the post-office ATM hours.
 *
 * Unit prices and the temple admissions are carried over from the pages on this
 * site that read them off the operators' own sites, with those pages' own check
 * dates rather than today's.
 */
const OFFICIAL = checkedLabel("2026-10-29");

/** Admissions read off each temple's and museum's own site by our day-trip guides. */
const ADMISSIONS_CHECKED = checkedLabel("2026-10-19");

/** Unit prices read off the chains' and operators' own sites by our budget guide. */
const PRICES_CHECKED = checkedLabel("2026-10-27");

/** The date our tax-free guide last read the National Tax Agency and JTA rules. */
const TAXFREE_CHECKED = checkedLabel("2026-10-28");

/**
 * The float, per day and per trip. These are not spending budgets — they are how
 * much yen to have in your pocket, on the assumption that the room, the
 * long-distance travel and the pre-booked tickets are already paid for and a card
 * covers the convenience stores, the chain restaurants and the hotels.
 *
 * The daily figures are built from the cash-only items below, rounded up to a
 * number that does not run dry mid-afternoon:
 *
 *   budget  — one counter meal (¥420–¥490 published), one gate (¥200–¥800),
 *             a bus or two (¥230 flat in Kyoto), a locker (¥300–¥600)
 *   mid     — two of each, plus a market stall and a short taxi
 *   eat out — the same again with an unreserved restaurant bill that may be
 *             cash-only, which is where the top of the range comes from
 */
const DAILY = {
  budget: "¥2,000–¥3,000",
  mid: "¥3,000–¥5,000",
  eatOut: "¥5,000–¥8,000",
} as const;

const tripFloat = [
  {
    trip: "Per day",
    budget: DAILY.budget,
    mid: DAILY.mid,
    eatOut: DAILY.eatOut,
    note: "What to have on you each morning. Anything prepaid comes off it.",
  },
  {
    trip: "3 days",
    budget: "¥6,000–¥9,000",
    mid: "¥9,000–¥15,000",
    eatOut: "¥15,000–¥24,000",
    note: "One withdrawal covers the whole trip at every tier — no ATM visit after the first.",
  },
  {
    trip: "7 days",
    budget: "¥14,000–¥21,000",
    mid: "¥21,000–¥35,000",
    eatOut: "¥35,000–¥56,000",
    note: "Still one Seven Bank withdrawal (¥100,000 cap) at every tier; two at Japan Post Bank's ¥50,000 cap if you eat out.",
  },
  {
    trip: "14 days",
    budget: "¥28,000–¥42,000",
    mid: "¥42,000–¥70,000",
    eatOut: "¥70,000–¥112,000",
    note: "Do not carry it. Take out a week at a time — the ATM fee is per withdrawal, not per yen.",
  },
];

/**
 * Where yen is the only thing that works, and what the alternative is when there
 * is one. The amount column is a published figure in every row; the alternative
 * column is an official statement or it says that nobody publishes one.
 */
const cashOnlyRows = [
  {
    where: "Temple and shrine gates",
    sub: "Admission, paid at the gate",
    amount:
      "¥200–¥800 at the sites we have checked: Todai-ji in Nara ¥800, Hase-dera in Kamakura ¥400, Kotoku-in ¥300, Itsukushima Shrine ¥300, the Hiroshima Peace Memorial Museum ¥200.",
    instead:
      "Nothing. No major temple or shrine publishes card or IC acceptance at the gate, so this is the one line that is cash by default rather than by statement. Admissions read off each site's own pages on " +
      ADMISSIONS_CHECKED +
      ".",
  },
  {
    where: "Coin lockers",
    sub: "Stations and attractions",
    amount: "¥300–¥600 a locker, which is JNTO's own range.",
    instead:
      "Often an IC card: JNTO states that “in many modern facilities it is possible to pay by various IC transit cards”. Coins otherwise, and it warns the lockers fill up fast in busy places. Checked " +
      OFFICIAL +
      ".",
  },
  {
    where: "Local city buses",
    sub: "Kyoto City Bus as the test case",
    amount: "A flat ¥230 an adult ride in Kyoto, paid as you get off.",
    instead:
      "A transport IC card, tapped on the reader by the driver — but a foreign contactless credit card generally is not accepted, and cash means exact coins in the fare box.",
  },
  {
    where: "Short-distance trains and subways",
    sub: "Single tickets and IC top-ups",
    amount: "From ¥178 a ride on the Tokyo Metro IC fare; a ¥500 deposit to buy the IC card itself.",
    instead:
      "An IC card covers the rides, and JNTO is explicit that a payment card may not: “you can’t always use them for short distance train/subway fares”. The ¥500 deposit is JNTO's figure too, and it notes Welcome Suica and TOURIST PASMO are issued without one. Checked " +
      OFFICIAL +
      ".",
  },
  {
    where: "Street stalls and market shops",
    sub: "Tsukiji Outer Market as the test case",
    amount: "Shop by shop — there is no single answer to quote.",
    instead:
      "Sometimes a card, sometimes not. Tsukiji Outer Market's own directory prints the methods per shop and they differ: one knife shop lists cash, credit card, phone payment and transit IC, one food shop lists cash and credit card with a ¥5,000 minimum on the card. Checked " +
      PRICES_CHECKED +
      ".",
  },
  {
    where: "Small restaurants and ticket-machine counters",
    sub: "The ¥420–¥490 bowl of noodles",
    amount:
      "¥420 for chuka soba at Hidakaya and ¥490 at Kourakuen, which is the published band an unbranded counter shop sits in.",
    instead:
      "No blanket rule exists to quote. JNTO's own advice is the honest version: “in Japan, there are still many places where cash is required”, and “always have some cash on hand”. Chain prices read " +
      PRICES_CHECKED +
      "; JNTO checked " +
      OFFICIAL +
      ".",
  },
  {
    where: "Rural accommodation and facilities",
    sub: "Outside the three big cities",
    amount: "Varies, and it is the row most likely to need the whole float at once.",
    instead:
      "Check before you go. JNTO warns that “many places, especially in rural areas, may still only accept cash, even hotels”, and asks visitors heading to the countryside to “check with accommodations and facilities prior to traveling and prepare some cash”. Checked " +
      OFFICIAL +
      ".",
  },
];

/** The other half of the answer: what the float does not have to cover. */
const cardFineRows = [
  {
    where: "Hotels",
    published:
      "Toyoko Inn states payment at check-in or check-out by cash, credit card, smartphone QR code payment, member points, or its own vouchers and gift cards — and takes ¥200 off when the card is charged online in advance. Checked " +
      PRICES_CHECKED +
      ".",
  },
  {
    where: "Convenience stores",
    published:
      "7-Eleven lists credit cards, brand debit and brand prepaid cards, transit IC money, nanaco, iD, QUICPay and Rakuten Edy, plus barcode apps including PayPay, Alipay+ and WeChat Pay. Checked " +
      PRICES_CHECKED +
      ".",
  },
  {
    where: "Shinkansen and airport express trains",
    published:
      "JNTO: “you can use cards to pay for Narita Express (JR) and shinkansen (JR) fares”. These are also the fares you can buy before you fly, which is what takes them off the float entirely. Checked " +
      OFFICIAL +
      ".",
  },
  {
    where: "City taxis",
    published:
      "km Taxi in Tokyo lists VISA, Mastercard, American Express, JCB, Diners Club and Saison; ten transport IC cards and iD; and ten code-payment apps. Checked " +
      PRICES_CHECKED +
      ".",
  },
  {
    where: "Department stores and chain shops",
    published:
      "JNTO: “credit, debit and prepaid cards of international brands are generally accepted throughout the country”. Checked " +
      OFFICIAL +
      ".",
  },
];

const faqItems = [
  {
    q: "How much yen should I bring to Japan?",
    a: `Bring ¥10,000–¥20,000 in cash for the flight and the first day, then withdraw the rest in Japan. The float you actually need is about ${DAILY.budget} a day on a budget trip, ${DAILY.mid} mid-range and ${DAILY.eatOut} if you are eating out properly — so ¥14,000–¥56,000 over a week, depending on the tier, not the whole trip budget. Exchanging large sums before you fly means paying a counter's spread on money that a 7-Eleven ATM would have given you at a rate closer to the market one.`,
  },
  {
    q: "Do I need cash in Japan?",
    a: `Yes, some. JNTO's own advice is to “always have some cash on hand” because “there are still many places where cash is required”. The places that matter to a visitor are specific and small in number: temple and shrine gates (¥200–¥800 at the sites we have checked, paid at the gate), coin lockers (¥300–¥600, JNTO's range), local city buses (a flat ¥230 in Kyoto), street stalls and small counter restaurants. Hotels, convenience stores, department stores, city taxis and shinkansen tickets all take cards. Official statements checked ${OFFICIAL}.`,
  },
  {
    q: "Is Japan more cash or card?",
    a: `By value it is now more cashless than cash: METI puts the cashless share of consumer spending at 58.0% for 2025 — ¥162.7 trillion, up from a restated 52.5% in 2024 — published 31 March 2026, with credit cards 82.7% of that. But the remaining share is concentrated exactly where a tourist walks: gates, stalls, local buses and rural businesses. So the practical answer is card for the large items and cash for the small ones, which is the opposite of how most countries work.`,
  },
  {
    q: "Where can I get yen in Japan?",
    a: `From a convenience-store or post-office ATM, not an exchange counter. JNTO states “you can withdraw cash at ATMs in Japan Post Bank and in Seven Bank”. Seven Bank's machines — over 28,000 of them, inside 7-Eleven stores and at airports — take VISA, PLUS, Mastercard, Maestro, Cirrus, UnionPay, American Express, JCB, DISCOVER and Diners Club, with the caveat that some cards carrying those marks may still not work. Japan Post Bank is the only network that publishes a fee: “an ATM usage fee (¥220 (tax included) per use) may apply”, with a single transaction capped at 50,000 yen and post-office machines closed overnight (Mon–Sat 7:00–23:00). Checked ${OFFICIAL}.`,
  },
  {
    q: "How much cash do I need per day in Japan?",
    a: `${DAILY.budget} on a budget trip, ${DAILY.mid} mid-range, ${DAILY.eatOut} if you eat out properly — as a float, not as a budget. The arithmetic behind the lowest tier: one counter meal in the published ¥420–¥490 band, one temple or shrine gate at ¥200–¥800, a bus ride or two at ¥230, and a ¥300–¥600 coin locker comes to roughly ¥1,250–¥2,130, so ¥2,000–¥3,000 covers a day without running dry. Everything else on a normal day — the room, the convenience store, the chain restaurant, the taxi — takes a card.`,
  },
  {
    q: "Can I pay for trains without cash?",
    a: `For long-distance trains yes, for short hops only with an IC card. JNTO states you can pay for Narita Express and shinkansen fares by card, but that “you can’t always use them for short distance train/subway fares”. A Suica or Pasmo solves the short hops — ¥500 deposit, or none at all on Welcome Suica and TOURIST PASMO — and the top-up itself usually takes coins and notes, which is the one place a train still needs yen. A prepaid 24, 48 or 72-hour subway ticket avoids both. Checked ${OFFICIAL}.`,
  },
  {
    q: "Should I exchange yen before I travel to Japan?",
    a: `Only a small float. Changing ¥10,000–¥20,000 at home covers the flight and the first hours, and JNTO notes that “all major airports have exchange points in their respective arrivals halls” if you bring nothing. Beyond that, withdraw in Japan: the cost of a withdrawal is per withdrawal rather than per yen, so a larger, less frequent one is cheaper, and JNTO's own warning is worth heeding — “ATMs often charge for withdrawals and this charge can vary depending on the time you're making a withdrawal. Not all ATMs are 24 hours.” Checked ${OFFICIAL}.`,
  },
  {
    q: "Does tax-free shopping change how much cash I need?",
    a: `From 1 November 2026, yes — upwards on the day you shop. Under the new system you pay the full tax-inclusive price at the till like a Japanese shopper and the 10% comes back after customs confirms the goods are leaving Japan, instead of coming off the price in the shop. The ¥5,000-before-tax minimum per shop per day on a non-resident passport is unchanged. So a shopping day needs about 10% more at the till than it used to, and the refund arrives later. Official rules read ${TAXFREE_CHECKED}.`,
  },
];

const tips = [
  "Break a ¥10,000 note at a convenience store early. Gates, lockers and fare boxes want coins and ¥1,000 notes, and a stall that cannot change ¥10,000 is a stall you cannot buy from.",
  "Keep one ¥10,000 note somewhere other than your wallet. It is the difference between a declined card being an inconvenience and being a problem.",
  "Withdraw rarely and in large amounts: the ATM's fee is charged per withdrawal, so four withdrawals of ¥25,000 cost four fees where one of ¥100,000 costs one.",
  "Take the cash out before you leave a city. The five networks that take foreign cards are convenience-store and post-office networks, and that density is what thins out in mountain towns and on smaller islands.",
  "Load the IC card with more than you think you need. It covers short train hops, many coin lockers, convenience stores and vending machines, and every yen on it is a yen you are not counting out at a fare box.",
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/money/how-much-yen-to-bring-japan") },
});

const TITLE = "How Much Yen to Bring to Japan 2026: Cash per Day";
const DESCRIPTION =
  "How Much Yen to Bring to Japan: carry ¥2,000–¥3,000 a day on a budget trip, ¥5,000–¥8,000 eating out — a float, not a budget. 3, 7 and 14-day totals.";
const CANONICAL = "https://www.japan-travel-kit.com/guides/money/how-much-yen-to-bring-japan";
const H1 = "How Much Yen to Bring to Japan (2026): The Cash Float, Day by Day";

export default function HowMuchYenToBringJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={CANONICAL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={CANONICAL} />
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
              route: "/guides/money/how-much-yen-to-bring-japan",
              headline: H1,
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
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Money & Payment", item: "https://www.japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "How Much Yen to Bring to Japan", item: CANONICAL },
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
          <span className={styles.breadCurrent}>How Much Yen to Bring to Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            Not how much the trip costs — how much yen to have in your pocket, which is a much
            smaller number once the room and the long-distance travel are paid for. Built from
            published prices and official statements, each with the date it was read.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Floats by trip length", `Official figures checked ${OFFICIAL}`].map((t) => (
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
          <span className={styles.disclosureIcon}>ℹ️</span>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> some links on this page are affiliate links. We may
            earn a commission if you buy through them, at no extra cost to you, and it does not change
            what is recommended here.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* The answer, before anything else. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>
              Carry about {DAILY.budget} a day on a budget trip, {DAILY.mid} mid-range and{" "}
              {DAILY.eatOut} if you are eating out properly — a float, not a budget, because a card
              covers the room, the convenience stores and the chain restaurants. Bring ¥10,000–¥20,000
              in cash for the flight and the first day, then withdraw the rest from a 7-Eleven or
              post-office ATM.
            </strong>{" "}
            Yen is the only option at temple and shrine gates (¥800 at Todai-ji in Nara, ¥400 at
            Hase-dera, ¥300 at Kotoku-in and at Itsukushima Shrine, all walk-up and paid at the gate),
            and it is the fallback at coin lockers (¥300–¥600, JNTO&apos;s own range), on local city buses (a
            flat ¥230 an adult ride in Kyoto, exact coins or a tapped IC card), at street stalls, and in
            rural areas, where JNTO warns that &ldquo;many places&hellip; may still only accept cash,
            even hotels&rdquo;. It is not needed for hotels, convenience stores, department stores or
            city taxis, and JNTO states you can pay for Narita Express and shinkansen fares by card —
            but also that &ldquo;you can&rsquo;t always use them for short distance train/subway
            fares&rdquo;, which an IC card rather than cash is the fix for.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Official statements and ATM figures read {OFFICIAL}; temple admissions {ADMISSIONS_CHECKED};
            chain and operator prices {PRICES_CHECKED}. Nothing on this page is written from experience,
            and where no source publishes a figure it is left out rather than estimated.
          </p>
        </section>

        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>
              Cash to carry per day
            </span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Budget trip</p>
                <p className={styles.verdictStatValue}>{DAILY.budget} / day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Mid-range</p>
                <p className={styles.verdictStatValue}>{DAILY.mid} / day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Eating out properly</p>
                <p className={styles.verdictStatValue}>{DAILY.eatOut} / day</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Bring ¥10,000–¥20,000, withdraw the rest here.</strong> Seven Bank allows ¥100,000
              per withdrawal, so even a fortnight&apos;s float is one or two ATM visits — and because
              the fee is charged per withdrawal rather than per yen, fewer and larger is cheaper. Never
              carry a 14-day float all at once: take out a week at a time.
            </p>
          </div>
        </div>

        {/* Q1 + table 1 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The float</span>
          <h2 className={styles.sectionTitle}>How much yen should I bring to Japan?</h2>
          <p className={styles.bodyText}>
            ¥10,000–¥20,000 in hand when you land, and then whatever the table below says for your trip
            length — withdrawn in Japan, not exchanged at home. The figures are floats: cash to spend on
            the things that take nothing else, on the assumption the room, the intercity travel and any
            booked tickets are already paid for.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Trip length", "Budget", "Mid-range", "Eating out properly", "What it means in practice"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tripFloat.map((row) => (
                    <tr key={row.trip} style={row.trip === "Per day" ? { fontWeight: 600 } : {}}>
                      <td className={styles.tdProvider} style={{ minWidth: "110px" }}>{row.trip}</td>
                      <td className={styles.ftEsim}>{row.budget}</td>
                      <td className={styles.ftSim}>{row.mid}</td>
                      <td className={styles.tdPrice}>{row.eatOut}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            How the daily figures are built, so they can be checked: one counter meal in the published
            ¥420–¥490 band (Hidakaya chuka soba ¥420, Kourakuen ¥490, read {PRICES_CHECKED}), one temple
            or shrine gate at ¥200–¥800 ({ADMISSIONS_CHECKED}), a bus ride or two at Kyoto&apos;s flat
            ¥230, and a ¥300–¥600 coin locker (JNTO, {OFFICIAL}) — roughly ¥1,250–¥2,130, rounded up to
            a float that does not run out mid-afternoon. The upper tiers double the meals and the gates
            and add a market stall, a short taxi and a restaurant bill that may be cash-only. Withdrawal
            caps: ¥100,000 per transaction at Seven Bank, 50,000 yen at Japan Post Bank, both read{" "}
            {OFFICIAL}.
          </p>
        </section>

        {/* Klook — directly after the "how much to carry" decision, which is what it shrinks. */}
        <KlookTripPrep
          heading="What You Can Pay for Before You Fly — and Take Off the Float"
          intro="Every figure above assumes the big items are already paid for. These are the yen costs that are normally settled out of the cash you carry and can be put on a card in your own currency instead, before you leave:"
          items={howMuchYenTripPrep}
        />

        {/* Q2 + table 2 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cash only</span>
          <h2 className={styles.sectionTitle}>Do I need cash in Japan?</h2>
          <p className={styles.bodyText}>
            Yes, but less than the reputation suggests and in specific places. JNTO&apos;s own advice is
            to &ldquo;always have some cash on hand&rdquo; because &ldquo;there are still many places
            where cash is required&rdquo;. Those places are the ones below — and the second column is
            the point of the table, because about half of them have an alternative and the rest do not.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where cash is needed", "Published amount", "What you can pay with instead"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cashOnlyRows.map((row) => (
                    <tr key={row.where}>
                      <td className={styles.tdProvider} style={{ minWidth: "160px" }}>
                        {row.where}
                        <span className={styles.tdBestFor} style={{ display: "block", fontWeight: 400 }}>{row.sub}</span>
                      </td>
                      <td style={{ fontSize: "0.82rem" }}>{row.amount}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.instead}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Sources: JNTO&apos;s own planning pages for the coin-locker range, the ¥500 IC deposit, the
            short-distance fare caveat and the rural-cash advice, all read {OFFICIAL}; the temple and
            museum admissions from each site&apos;s own pages, {ADMISSIONS_CHECKED}; the Tsukiji and
            chain-restaurant figures {PRICES_CHECKED}. The temple row carries no alternative because
            none is published — not because we did not look.
          </p>
        </section>

        {/* Where a card is fine */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Card is fine</span>
          <h2 className={styles.sectionTitle}>Where the Float Does Not Have to Reach</h2>
          <p className={styles.bodyText}>
            The reason the per-day figures are as low as they are: these five categories cover most of
            what a day costs, and every one of them publishes card acceptance.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Where</th>
                    <th>What the operator or JNTO publishes</th>
                  </tr>
                </thead>
                <tbody>
                  {cardFineRows.map((row) => (
                    <tr key={row.where}>
                      <td className={styles.tdProvider} style={{ minWidth: "160px" }}>{row.where}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.published}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Place by place, with the operators&apos; own statements for temples, taxis, vending machines
            and market stalls as well, is{" "}
            <Link href="/guides/money/cash-vs-card-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              cash vs card in Japan
            </Link>
            .
          </p>
        </section>

        {/* Q3 */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Cash or card</span>
          <h2 className={styles.sectionTitle}>Is Japan more cash or card?</h2>
          <p className={styles.bodyText}>
            More card, by value, and it stopped being close. METI puts the cashless share of consumer
            spending at 58.0% for 2025 — ¥162.7 trillion, against a restated 52.5% for 2024 — published
            31 March 2026, with credit cards 82.7% of the cashless total and code payments 10.2%.
          </p>
          <p className={styles.bodyText}>
            What that statistic hides is where the other 42% sits. It is not spread evenly: it
            concentrates in small, independent, often older businesses, which is a fair description of a
            temple gate, a market stall, a one-room noodle counter and a countryside bus. A visitor
            spends a larger share of their day in exactly those places than a resident does, so the
            cashless ratio understates how much cash a tourist needs — and the right conclusion is not
            &ldquo;Japan is a cash country&rdquo; but &ldquo;large payments by card, small payments in
            cash&rdquo;, which is the reverse of most countries.
          </p>
        </section>

        {/* Q4 + Wise CTA */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting yen</span>
          <h2 className={styles.sectionTitle}>Where can I get yen in Japan?</h2>
          <p className={styles.bodyText}>
            A convenience-store or post-office ATM, not an exchange counter. JNTO states plainly that
            &ldquo;you can withdraw cash at ATMs in Japan Post Bank and in Seven Bank&rdquo;, and Seven
            Bank — over 28,000 machines inside 7-Eleven stores and at airports — takes VISA, PLUS,
            Mastercard, Maestro, Cirrus, UnionPay, American Express, JCB, DISCOVER and Diners Club,
            adding the caveat that some cards carrying those marks may still not work. Japan Post Bank is
            the only one of the networks that publishes a price: &ldquo;an ATM usage fee (¥220 (tax
            included) per use) may apply&rdquo;, with a &ldquo;single transaction withdrawal limit
            is 50,000 yen&rdquo; and post-office machines open Monday to Saturday 7:00–23:00 and
            7:00–21:00 on Sundays and holidays. Both read {OFFICIAL}.
          </p>
          <p className={styles.bodyText}>
            JNTO adds the warning worth planning around: &ldquo;ATMs often charge for withdrawals and
            this charge can vary depending on the time you&rsquo;re making a withdrawal. Not all ATMs
            are 24 hours.&rdquo; The machine&apos;s fee is only half the bill, though — the other half is
            your own bank&apos;s, and that one is a percentage that repeats on every withdrawal and
            every purchase for the whole trip. A multi-currency debit card with the mid-market rate and
            a free monthly ATM allowance is the part of this you can decide before you fly.
          </p>
          <a href={WISE_CARD_CTA} className={styles.verdictBtn} target="_blank" rel={WISE_REL}>
            Get a Wise card before you fly →
          </a>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            The allowance and the fee above it differ by the country your account is registered in, so
            the figures live where they are checked:{" "}
            <Link href="/guides/money/wise-card-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              Wise card in Japan
            </Link>{" "}
            for the allowance and which Japanese ATMs take it, and{" "}
            <Link href="/guides/money/atms-in-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              ATMs in Japan
            </Link>{" "}
            for the five networks, their fees, hours and caps. One rule holds whatever you carry: a cash
            withdrawal on a credit card is a cash advance, normally a fee plus interest from day one.
            Take yen out on a debit card.
          </p>
        </section>

        {/* Q5 */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Per day</span>
          <h2 className={styles.sectionTitle}>How much cash do I need per day in Japan?</h2>
          <p className={styles.bodyText}>
            {DAILY.budget} on a budget trip, {DAILY.mid} mid-range, {DAILY.eatOut} eating out properly.
            The lowest tier is the one worth showing the working for: a counter meal at ¥420–¥490, one
            gate at ¥200–¥800, one or two ¥230 bus rides and a ¥300–¥600 locker is ¥1,250–¥2,130, so
            ¥2,000–¥3,000 is a day covered with room to spare.
          </p>
          <p className={styles.bodyText}>
            None of that is the same number as what the day costs. A budget day in Tokyo on published
            prices is about ¥1,570–¥1,850 before the room — three meals from a convenience store and a
            chain noodle shop, two or three ¥178 subway rides, and the free Tokyo Metropolitan Government
            Building decks — and most of it can go on a card. What the trip actually costs, line by line
            and tier by tier, is{" "}
            <Link href="/guides/money/japan-travel-budget" style={{ color: "var(--red)", fontWeight: 600 }}>
              the Japan travel budget guide
            </Link>
            ; this page is only about the share of it that has to be paper. Prices read {PRICES_CHECKED}.
          </p>
        </section>

        {/* Q6 */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Trains</span>
          <h2 className={styles.sectionTitle}>Can I pay for trains without cash?</h2>
          <p className={styles.bodyText}>
            Long-distance, yes. Short hops, only with an IC card. JNTO states you can use cards for
            Narita Express and shinkansen fares, and in the same breath that &ldquo;you can&rsquo;t
            always use them for short distance train/subway fares&rdquo;. A Suica or Pasmo closes that
            gap — JNTO puts the deposit at &ldquo;500 yen when purchasing the card&rdquo;, and notes that
            Welcome Suica and TOURIST PASMO are issued without one.
          </p>
          <p className={styles.bodyText}>
            The catch is one level down: the card removes cash from the gate but not from the top-up
            machine, which on most networks still wants coins and notes. Two ways round it — a prepaid 24,
            48 or 72-hour subway ticket bought before you fly, or the mobile version of the IC card
            topped up from a card in the app. Which IC card works in which city, and what each one can
            pay for beyond the gate, is{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              IC cards in Japan
            </Link>
            . Checked {OFFICIAL}.
          </p>
        </section>

        {/* Tax-free — the one thing that moves the float upwards from 1 Nov 2026. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>From 1 Nov 2026</span>
          <h2 className={styles.sectionTitle}>Tax-Free Shopping Now Needs More at the Till, Not Less</h2>
          <p className={styles.bodyText}>
            One change worth sizing the float for. From 1 November 2026 a tax-free purchase is rung up at
            the full tax-inclusive price, the same as for a Japanese shopper, and the 10% comes back after
            customs confirms at the airport that the goods are leaving — rather than coming off the price
            at the till. The ¥5,000-before-tax minimum per shop per day, on a non-resident passport, is
            unchanged. So a shopping day costs about 10% more up front than it did, and the money returns
            later. Rules read {TAXFREE_CHECKED}.
          </p>
          <p className={styles.bodyText}>
            That is a card day rather than a cash day, which is the useful conclusion: the refund has to
            be traceable to the purchase, and the amounts are large enough that paying them out of a cash
            float makes no sense. The procedure, the seven airports where the customs step can be done
            through Visit Japan Web, and what disqualifies a refund are in{" "}
            <Link href="/guides/money/tax-free-shopping-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              tax-free shopping in Japan
            </Link>
            .
          </p>
        </section>

        {/* Exchange */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you fly</span>
          <h2 className={styles.sectionTitle}>Should You Exchange Yen Before You Travel?</h2>
          <p className={styles.bodyText}>
            Change ¥10,000–¥20,000 at home and no more. That covers the flight, the train in and the
            first day in case a card or an ATM misbehaves; beyond it you are paying a counter&apos;s
            spread on money a Japanese ATM would hand you closer to the market rate. JNTO notes that
            &ldquo;all major airports have exchange points in their respective arrivals halls&rdquo;,
            so arriving with nothing is recoverable rather than a crisis. Checked {OFFICIAL}.
          </p>
          <p className={styles.bodyText}>
            Where the rate is worst, what the airport counters and the city exchange shops actually
            charge, and how they compare with withdrawing is{" "}
            <Link href="/guides/money/currency-exchange-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              currency exchange in Japan
            </Link>
            . If you are still choosing what to carry the money on,{" "}
            <Link href="/guides/money/best-travel-card-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              best travel card for Japan
            </Link>{" "}
            compares the fee structures that decide the cost of every withdrawal in the table above.
          </p>
        </section>

        {/* Tips */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tips</span>
          <h2 className={styles.sectionTitle}>Managing the Float Once You Are There</h2>
          <ul className={styles.bodyList}>
            {tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
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
            <Link href="/guides/money/currency-exchange-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h14l-3-3M21 16H7l3 3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Currency Exchange in Japan (2026): Best Ways to Get Yen</p>
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
            <Link href="/guides/money/atms-in-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="3" width="12" height="18" rx="2" />
                  <path d="M9 7h6M9 11h6" />
                  <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>ATMs in Japan (2026): Which Accept Foreign Cards &amp; What the Fees Are</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/japan-travel-budget" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l5-5 4 3 6-7" />
                  <path d="M3 21h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Travel Budget 2026: Trip to Tokyo Japan Cost &amp; How Much Things Cost</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <circle cx="8.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
                  <circle cx="15.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/tax-free-shopping-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 12l-8 8-8-8 8-8z" />
                  <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tax-Free Shopping in Japan (2026): The ¥5,000 Rule and the New Airport Refund</p>
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
      </div>
    </>
  );
}
