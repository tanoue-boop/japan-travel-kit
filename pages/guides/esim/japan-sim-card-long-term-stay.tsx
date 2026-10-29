import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { klookEsim, longStaySimPrep } from "../../../lib/klook-links";
import { pocketWifi, ratesCheckedAt, specsCheckedAt } from "../../../lib/pocket-wifi";
import { priceFrom, pricesCheckedLabel, siteCheapestFrom } from "../../../lib/esim-prices";
import { esimSpec, SPECS_CHECKED_AT } from "../../../lib/esim-specs";

/**
 * Japan SIM Card for Long Term Stay — written 28 Oct 2026 for the exact phrase,
 * and for a reader this site had no page for: the person moving to Japan for
 * three months or more on a working holiday, a study placement or a posting,
 * rather than visiting for two weeks.
 *
 * Everything on this site until now answered the visitor's question, where the
 * answer is almost always a travel eSIM. That answer is wrong here, and wrong in
 * a specific way: a travel product is capped at 90 days, carries no Japanese
 * number on most plans, and cannot be the line a bank, a landlord, a clinic or a
 * delivery company calls. So this page is about resident plans, and about the one
 * document that gates all of them.
 *
 * Every Sakura Mobile figure and rule below was read off www.sakuramobile.jp
 * itself on 28 October 2026:
 *
 *   /monthly/            the resident plans: Voice+Data SIM/eSIM "from 2,980
 *                        JPY/month (3,278 JPY/month, tax incl.)" with a Japanese
 *                        phone number, Data Only "from 2,480 JPY/month (2,728
 *                        JPY/month, tax incl.)", monthly Pocket WiFi "from 4,980
 *                        JPY/month (5,478 JPY/month, tax incl.)" and Home
 *                        Internet "from 6,980 JPY/month (7,678 JPY/month, tax
 *                        incl.)" with "No Annual Contract"; that no Japanese bank
 *                        account is needed and an international credit or debit
 *                        card is accepted
 *   / (home)             the split the company itself draws — travel plans "Up to
 *                        90 Days", resident plans "90+ Days" — and the travel
 *                        prices: Travel SIM from 3,500 JPY (3,850 tax incl.),
 *                        Travel eSIM from 1,250 JPY (1,375 tax incl.), Pocket
 *                        WiFi rental from 299 JPY/day (329 tax incl.); Home
 *                        Internet speeds up to 10 Gbps
 *   /blog/plan-guides/   the Voice + Data resident plan guide: the accepted
 *     (Voice + Data      documents — "Residence Card (Zairyu Card)", a Japanese
 *      resident plan)    driver's licence or a My Number Card, which "must be
 *                        registered with your current address", and a passport
 *                        for in-person collection; "The minimum use is just one
 *                        month"; the 5, 15, 30, 40, 60, 80 and 100 GB tiers; the
 *                        "070, 080, or 090" Japanese number; and the termination
 *                        rule — "Submit by the 25th to cancel that month. Submit
 *                        on the 26th or later and your contract runs one more
 *                        month."
 *
 * eSIM prices and the per-provider specs are not restated here: they come from
 * data/esim-prices.json, which is re-read daily, and from lib/esim-specs.ts, each
 * carrying its own date. The pocket WiFi figures come from lib/pocket-wifi.ts with
 * its two check dates. No Klook price appears anywhere, for the usual reason:
 * Klook answers automated reads of its product pages with HTTP 403.
 *
 * Nothing on this page is first-hand. Where Sakura Mobile publishes a rule we
 * quote it; where it publishes a "from" price we label it as one.
 */

/** The date every Sakura Mobile figure and rule on this page was read. */
const SAKURA_CHECKED = "28 Oct 2026";

/** Sakura Mobile's own affiliate link — the same one the review page uses. */
const SAKURA_AFFILIATE = "https://p.sakuramobile.jp/idevaffiliate.php?id=486";
/** Sakura is its own programme, not Klook's; same rel as the review page. */
const SAKURA_REL = "noopener noreferrer nofollow";

const VOICE_MONTH = "¥2,980";
const VOICE_MONTH_TAX = "¥3,278";
const DATA_MONTH = "¥2,480";
const DATA_MONTH_TAX = "¥2,728";
const HOME_MONTH = "¥6,980";
const HOME_MONTH_TAX = "¥7,678";
const WIFI_MONTH = "¥4,980";

const AIRPORT_WIFI = pocketWifi("ninja-wifi");
const SAKURA_ESIM_FROM = priceFrom("sakura");
const CHEAPEST_ESIM_FROM = siteCheapestFrom();
const PRICES_CHECKED = pricesCheckedLabel();

/**
 * The comparison the page exists for. Every row answers the four things a
 * long-stay reader has to decide between: phone number, minimum term, what
 * document it needs, and how you get out of it.
 */
const compareRows = [
  {
    product: "Sakura Mobile Voice + Data SIM or eSIM (resident)",
    price: `From ${VOICE_MONTH}/month (${VOICE_MONTH_TAX} tax incl.)`,
    number: "Yes — a Japanese 070, 080 or 090 number",
    term: "One month minimum, then rolling",
    needs: "Residence Card, Japanese driver's licence or My Number Card, registered to your current address — or a passport if you collect in person",
    exit: "Submit the termination form by the 25th to end that month",
  },
  {
    product: "Sakura Mobile Data Only SIM or eSIM (resident)",
    price: `From ${DATA_MONTH}/month (${DATA_MONTH_TAX} tax incl.)`,
    number: "No",
    term: "One month minimum, then rolling",
    needs: "Same documents as the Voice + Data plan",
    exit: "Same — by the 25th",
  },
  {
    product: "Sakura Mobile Home Internet",
    price: `From ${HOME_MONTH}/month (${HOME_MONTH_TAX} tax incl.)`,
    number: "No — it is a fixed line, not a phone",
    term: 'Stated as "No Annual Contract", with speeds up to 10 Gbps',
    needs: "A Japanese address, and an installation at it",
    exit: "No annual tie-in on the company's own page",
  },
  {
    product: "Sakura Mobile Pocket WiFi, monthly",
    price: `From ${WIFI_MONTH}/month (¥5,478 tax incl.)`,
    number: "No",
    term: "Monthly",
    needs: "A Japanese address for delivery",
    exit: "Monthly, same termination process",
  },
  {
    product: "Sakura Mobile Travel SIM or eSIM",
    price: `Travel SIM from ¥3,500 (¥3,850 tax incl.); Travel eSIM from ¥1,250 (¥1,375 tax incl.)`,
    number: "The Travel eSIM listing states a Japanese phone number is included; the data plans we price are data only",
    term: 'Sold as "Up to 90 Days" — the company\'s own ceiling',
    needs: "Nothing but a passport",
    exit: "It simply expires",
  },
  {
    product: "A tourist eSIM (Klook, Airalo, Holafly, eSIM Go)",
    price: `From ${CHEAPEST_ESIM_FROM} across the four providers we price`,
    number: `${esimSpec("airalo").phoneNumberShort} — and the same is true of every tourist eSIM in our comparison`,
    term: "No contract at all; plan lengths run in days",
    needs: "Nothing but an eSIM-capable handset",
    exit: "Nothing to cancel",
  },
  {
    product: "Airport pocket WiFi rental",
    price: `From $${AIRPORT_WIFI.fromUsdPerDay.toFixed(2)}/day on the listing`,
    number: "No",
    term: "By the day, for the length of the rental",
    needs: "A passport at the counter",
    exit: "Returned at an airport counter",
  },
];

/** What the resident plans actually give you that a travel product cannot. */
const residentRows = [
  {
    item: "A Japanese phone number",
    detail:
      "Sakura Mobile's Voice + Data resident plan carries a Japanese 070, 080 or 090 number. No tourist eSIM we price sells voice or SMS at any price.",
    why: "This is the line a bank, a landlord, a clinic, a delivery company and most online checkouts will ask for. It is the single reason a long stay is a different problem from a holiday.",
  },
  {
    item: "Data tiers sized for a month, not a trip",
    detail: "The resident plan is published with 5, 15, 30, 40, 60, 80 and 100 GB options.",
    why: "A travel plan is priced per trip and tops out at 90 days. A 100 GB month is a different product from a 20 GB fortnight.",
  },
  {
    item: "No fixed term",
    detail: 'Sakura Mobile states "The minimum use is just one month", then it rolls monthly.',
    why: "Japanese carriers have historically asked for a visa with a year or more left on it. A one-month minimum is what makes a six-month placement possible without a two-year contract.",
  },
  {
    item: "No Japanese bank account",
    detail:
      "Sakura Mobile's own monthly page says no Japanese bank account is needed and that an international credit or debit card is accepted.",
    why: "On arrival you have neither a bank account nor a hanko, and opening one often wants a phone number — which is the circle this breaks.",
  },
  {
    item: "A home line, if you need one",
    detail: `Home Internet from ${HOME_MONTH}/month (${HOME_MONTH_TAX} tax incl.), published with "No Annual Contract" and speeds up to 10 Gbps.`,
    why: "A mobile plan is not a substitute for a flat's internet if you work from it. The absence of an annual tie-in is the thing to check against any alternative.",
  },
];

/** The documents question, which is what most of these searches are really about. */
const documentRows = [
  {
    route: "eSIM, or a SIM delivered to your address",
    documents: "A Residence Card (Zairyu Card), a Japanese driver's licence or a My Number Card",
    catch: "Whichever you use must be registered with your current address. A card still showing the address you left is the most common reason an application stalls.",
  },
  {
    route: "Collecting in person at an airport or office",
    documents: "A passport",
    catch: "This is the route that works on the day you land, before any card exists — but it is the travel product, not the resident plan.",
  },
  {
    route: "No residence card at all",
    documents: "Passport only",
    catch: "You are limited to travel products: a travel SIM, a travel eSIM or a pocket WiFi rental. None of them is a resident plan and all of them stop at 90 days.",
  },
];

const steps = [
  {
    title: "Work out whether you will have a residence card — and when",
    desc: "A stay of more than 90 days on a work, student or working-holiday status gets a residence card, usually at the airport on arrival for a mid- or long-term status. But the address on it is registered at the ward office after you move in, and Sakura Mobile requires the card to show your current address. That gap of a few days or weeks is the whole planning problem.",
  },
  {
    title: "Cover the gap with a travel product, not a contract",
    desc: `Buy a travel eSIM before you fly and activate it on landing. It costs from ${CHEAPEST_ESIM_FROM} across the four providers we price, there is nothing to collect and nothing to cancel, and it carries you through the days between arrival and a registered address. Klook's own Japan eSIM is one option if you are already booking transport there.`,
  },
  {
    title: "Decide whether you need a Japanese number",
    desc: `If yes, the resident Voice + Data plan is the product — from ${VOICE_MONTH}/month (${VOICE_MONTH_TAX} tax incl.) with a 070, 080 or 090 number. If no, Data Only is ¥500 a month cheaper at ${DATA_MONTH} (${DATA_MONTH_TAX} tax incl.). Be honest about this one: almost everything administrative in Japan asks for a number, and it is tedious to add later.`,
  },
  {
    title: "Pick a data tier against how you will actually live",
    desc: "The resident plan is published at 5, 15, 30, 40, 60, 80 and 100 GB. The thing that changes the answer is whether the flat has its own internet: on a plan with no home line, tethering a laptop turns a 15 GB month into a 60 GB one.",
  },
  {
    title: "Apply once your card shows the right address",
    desc: "No Japanese bank account is needed — Sakura Mobile's own page states an international credit or debit card is accepted, which is what makes this applyable in your first fortnight rather than your second month.",
  },
  {
    title: "Note the 25th before you need it",
    desc: 'Sakura Mobile\'s rule is published plainly: "Submit by the 25th to cancel that month. Submit on the 26th or later and your contract runs one more month." Put your departure month\'s 25th in a calendar on the day you sign up, not the week you leave.',
  },
];

const faqItems = [
  {
    q: "What is the best SIM card for a long stay in Japan?",
    a: `A resident monthly plan rather than a tourist SIM, and of the English-language options the one we link is Sakura Mobile: its Voice + Data resident SIM or eSIM is published from ${VOICE_MONTH}/month (${VOICE_MONTH_TAX} tax included) with a Japanese 070, 080 or 090 number, data tiers from 5 GB to 100 GB, and a minimum use of just one month. The data-only version is from ${DATA_MONTH}/month (${DATA_MONTH_TAX} tax included). The reason it is not simply "buy the cheapest eSIM" is that every travel product in Japan — including Sakura Mobile's own — is sold up to 90 days and, on the plans we price, carries no phone number. For three months or more you are not buying data, you are buying a line that institutions can call. Prices and rules read off sakuramobile.jp on ${SAKURA_CHECKED}.`,
  },
  {
    q: "Can foreigners get a phone number in Japan?",
    a: `Yes, and it is more straightforward than its reputation — but it needs a resident plan rather than a travel one. Sakura Mobile's resident Voice + Data product issues a Japanese 070, 080 or 090 number on the docomo network, and its own page states no Japanese bank account is needed, with an international credit or debit card accepted. What you do need is one of a Residence Card (Zairyu Card), a Japanese driver's licence or a My Number Card, registered to your current address. The historical obstacle with the big carriers was a requirement for a visa with a long time left to run; a one-month minimum sidesteps it. Read on ${SAKURA_CHECKED}.`,
  },
  {
    q: "Do I need a residence card to get a SIM in Japan?",
    a: `For a resident monthly plan, effectively yes — for a travel plan, no. Sakura Mobile lists the accepted documents for its resident plan as a Residence Card (Zairyu Card), a Japanese driver's licence or a My Number Card, each of which "must be registered with your current address"; a passport is accepted where you collect the SIM in person at an airport or office. So the sequence matters more than the paperwork: a mid- or long-term status usually gets the card at the airport, but the address is registered at the ward office after you find somewhere to live, and until the card shows it, the resident application is the one thing you cannot finish. Plan to bridge that with a travel eSIM. Read on ${SAKURA_CHECKED}.`,
  },
  {
    q: "Is a tourist eSIM enough for 3 months?",
    a: `For data alone, just about — and for a life in Japan, no. The ceiling is the first problem: Sakura Mobile sells its travel products as "Up to 90 Days", which is the same 90-day line the immigration categories use, so a stay of "three months or more" runs out of travel product at exactly the point it becomes a long stay. The second is the number. Every tourist eSIM we price is data only — Sakura Mobile's own position is that a Japanese number comes only on its separate Voice + Data product — which rules out most of what a resident has to do: a bank, a lease, a delivery slot, a clinic, a two-factor code from a Japanese service. The third is cost. On a strict data basis a tourist eSIM can be cheaper for a single month, but renewing one three times is not cheaper than ${DATA_MONTH}/month with no cap on how long you keep it. Use the eSIM for the first fortnight; move to a resident plan for the rest. eSIM prices checked ${PRICES_CHECKED}; phone-number clauses ${SPECS_CHECKED_AT}.`,
  },
  {
    q: "What is the minimum contract for a Japanese SIM?",
    a: `On Sakura Mobile's resident plans, one month. Its own guide to the Voice + Data plan says "The minimum use is just one month", after which the contract rolls monthly and renews automatically until a termination form is received. That is the specification to compare any alternative against, because it is the clause that historically made Japanese mobile plans unusable for a six-month placement — a two-year tie-in with a cancellation fee attached to it. Home Internet is published separately as "No Annual Contract". Read on ${SAKURA_CHECKED}.`,
  },
  {
    q: "How do I cancel a Japanese SIM when I leave?",
    a: `By submitting the termination form, and the date is the thing to get right. Sakura Mobile publishes the rule in one line: "Submit by the 25th to cancel that month. Submit on the 26th or later and your contract runs one more month." Because the contract renews automatically each month, missing the 25th does not cost you a penalty, it costs you one more month's fee — which is the sort of thing that is easy to forget in the week you are packing and closing a bank account. Set the reminder on the day you sign up. Read on ${SAKURA_CHECKED}.`,
  },
  {
    q: "Which is cheaper over six months — a resident plan or renewing travel eSIMs?",
    a: `The resident plan, in almost every shape of that question. Data-only resident service is published from ${DATA_MONTH}/month (${DATA_MONTH_TAX} tax included), which is ¥14,880 over six months before tax; the cheapest tourist eSIM we price starts at ${CHEAPEST_ESIM_FROM} but that is an entry tier measured in days, and Sakura Mobile's own travel eSIM — ${SAKURA_ESIM_FROM} at its cheapest in our feed — stops at 90 days whatever you pay. There is one case where the arithmetic flips: a stay of three months or less where you genuinely need nothing but data and will tolerate renewing. Outside that, the comparison is not really about price, it is about whether the line can receive a call. eSIM prices checked ${PRICES_CHECKED}.`,
  },
  {
    q: "Can I get home internet for a short lease?",
    a: `Sakura Mobile publishes Home Internet from ${HOME_MONTH}/month (${HOME_MONTH_TAX} tax included), with speeds up to 10 Gbps and, explicitly, "No Annual Contract" — which is the clause that matters on a six- or nine-month lease, because the usual Japanese fixed-line offer is a two-year tie-in. The alternative for a short let is the monthly Pocket WiFi, from ${WIFI_MONTH}/month (¥5,478 tax included): no installation, no landlord permission, and it moves with you. The deciding question is usually whether you work from the flat — a router shared between a laptop, a TV stick and two phones is a different load from a phone in a pocket. Read on ${SAKURA_CHECKED}.`,
  },
  {
    q: "Can I keep my home number while on a Japanese plan?",
    a: "On a dual-SIM handset, yes, and it is the arrangement most long-stay residents end up with. Your home SIM — or its eSIM profile — stays in the phone for the number your family and your home bank already know, with data roaming switched off so it cannot connect by accident, while the Japanese plan carries the data and the Japanese number. Set the Japanese line as the default for data and for outgoing calls inside Japan. If your handset takes only one SIM, you are choosing, and the Japanese number is usually the one worth having on it for a stay of several months.",
  },
  {
    q: "What should I sort before I fly?",
    a: `Two things, and neither takes long. Install a travel eSIM profile at home with the line switched off, so you land with working data instead of hunting for airport wifi — that is what carries you through the ward-office gap before a resident application is possible. And if you are travelling with hold luggage and a family, an airport pocket WiFi rental covers up to ${AIRPORT_WIFI.maxDevices} devices and is collected and returned at a counter; its listing covers all of Japan's international airports. Rental specs read ${specsCheckedAt}, daily rates ${ratesCheckedAt}.`,
  },
];

const TITLE = "Japan SIM Card for Long Term Stay: 90+ Day Plans";
const DESCRIPTION =
  "Japan SIM Card for Long Term Stay: Sakura Mobile's resident plans from ¥2,980/month with a Japanese number, a one-month minimum and a residence card.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/esim/japan-sim-card-long-term-stay") },
});

export default function JapanSimCardLongTermStayPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-sim-card-long-term-stay" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-sim-card-long-term-stay" />
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
              route: "/guides/esim/japan-sim-card-long-term-stay",
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
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "eSIM & SIM Cards",
                  item: "https://www.japan-travel-kit.com/guides/esim",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Japan SIM Card for Long Term Stay",
                  item: "https://www.japan-travel-kit.com/guides/esim/japan-sim-card-long-term-stay",
                },
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM &amp; SIM Cards</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>SIM for a Long Stay</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan SIM Card for Long Term Stay:<br />Plans Beyond 90 Days
          </h1>
          <p className={styles.heroSubtitle}>
            Every travel SIM and eSIM in Japan stops at 90 days and carries no phone number. For a working
            holiday, a placement or a posting, that is the wrong product entirely.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices, dated", "Residence card rules", "One-month minimum"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Affiliate Disclosure */}
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our comparisons or recommendations.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Lead paragraph — the whole answer, before anything else on the page. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            A <strong>Japan SIM card for long term stay</strong> means a resident monthly plan, not a travel
            one — and the English-language option we link is{" "}
            <strong>Sakura Mobile</strong>, whose resident <strong>Voice + Data</strong> SIM or eSIM is
            published from <strong>{VOICE_MONTH}/month</strong> ({VOICE_MONTH_TAX} tax included) with a
            Japanese <strong>070, 080 or 090 number</strong>, data tiers from{" "}
            <strong>5 GB to 100 GB</strong>, and a <strong>minimum use of one month</strong>; data-only is from{" "}
            <strong>{DATA_MONTH}/month</strong> ({DATA_MONTH_TAX} tax included) and{" "}
            <strong>Home Internet</strong> from {HOME_MONTH}/month ({HOME_MONTH_TAX} tax included) with{" "}
            &ldquo;No Annual Contract&rdquo;. What a resident plan needs and a travel one does not is a{" "}
            <strong>Residence Card, Japanese driver&apos;s licence or My Number Card registered to your
            current address</strong> — no Japanese bank account, though: an international card is accepted.
            Cancelling is a form, and the deadline is the <strong>25th of the month</strong>. The reason none
            of this can be solved with a tourist eSIM: every travel product in Japan, Sakura Mobile&apos;s own
            included, is sold <strong>&ldquo;Up to 90 Days&rdquo;</strong> and the ones we price carry no
            number at all. All Sakura Mobile figures read off sakuramobile.jp on {SAKURA_CHECKED}.
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>With a Japanese number</p>
                <p className={styles.verdictStatValue}>From {VOICE_MONTH}/month</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Data only</p>
                <p className={styles.verdictStatValue}>From {DATA_MONTH}/month</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Minimum term</p>
                <p className={styles.verdictStatValue}>One month, then rolling</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>What you must have</p>
                <p className={styles.verdictStatValue}>Card with current address</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> fly in on a travel eSIM, because the resident application needs a card
              showing an address you do not have yet. Switch to a resident plan once the ward office has
              registered it — Voice + Data if anything in your life will ask for a phone number, which almost
              everything administrative in Japan does, and Data Only if it genuinely will not.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.verdictBtn}>
                See Sakura Mobile monthly plans →
              </a>
              <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Klook eSIM for the first weeks →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Q1 — the comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>What Is the Best SIM Card for a Long Stay in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            A resident monthly plan. The table below is the whole argument: the four columns on the right are
            the ones that separate a product you can live on from a product you can travel on, and the travel
            rows all fail at least one of them.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Product", "Price", "Japanese number", "Minimum term", "What you need", "Getting out"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.product}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.product}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.84rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.number}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.term}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.needs}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.exit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Every Sakura Mobile figure and rule is the company&apos;s own, read off sakuramobile.jp on{" "}
            {SAKURA_CHECKED}; each is a published &ldquo;from&rdquo; price rather than a quote, and the data
            tier you pick moves it. Tourist eSIM prices come from our daily feed, checked {PRICES_CHECKED}, and
            the phone-number clauses from the providers&apos; own pages, {SPECS_CHECKED_AT}. Pocket WiFi specs
            read {specsCheckedAt} and daily rates {ratesCheckedAt}. No Klook price appears on this page: Klook
            blocks automated reads of its product pages. Our{" "}
            <Link href="/guides/esim/sakura-mobile-review" style={{ color: "var(--text)", fontWeight: 600 }}>
              Sakura Mobile review
            </Link>{" "}
            goes through the travel plans in detail, and our{" "}
            <Link href="/guides/esim/japan-sim-card-vs-esim-2026" style={{ color: "var(--text)", fontWeight: 600 }}>
              SIM card vs eSIM guide
            </Link>{" "}
            is the version of this question for a two-week trip.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              See Sakura Mobile monthly plans →
            </a>
          </div>
        </section>

        {/* Q2 — the phone number */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Phone numbers</span>
          <h2 className={styles.sectionTitle}>Can Foreigners Get a Phone Number in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes — on a resident plan, and only on a resident plan. This is the hinge of the whole decision, so
            it is worth being concrete about what the resident product buys that a travel one does not.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What you get", `What Sakura Mobile publishes (read ${SAKURA_CHECKED})`, "Why it matters on a long stay"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {residentRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            One thing worth saying plainly, because it surprises people arriving from countries where a
            prepaid number is a vending-machine purchase: in Japan the number is the identity document of
            everyday life. Bank applications, residential leases, clinic registrations, parcel redeliveries and
            the two-factor codes from Japanese online services all assume a domestic mobile number. Buying
            three months of data without one is not a cheaper version of the same thing; it is a different
            thing.
          </p>
        </section>

        {/* Q3 — the documents. The part an AI answer does not finish: what gates
            the application, and in what order. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Documents</span>
          <h2 className={styles.sectionTitle}>Do I Need a Residence Card to Get a SIM in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For a resident plan, effectively yes. For a travel plan, no — a passport is enough. The detail
            that catches people out is not the card itself but the address on it.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["How you get the SIM", "What it accepts", "The catch"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {documentRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.documents}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.catch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Sakura Mobile&apos;s own wording for the resident plan is that the Residence Card, Japanese
            driver&apos;s licence or My Number Card &ldquo;must be registered with your current
            address&rdquo;. In practice a mid- or long-term status gets the residence card at the airport,
            but the address goes on it at the ward office after you have somewhere to live — which can be days
            after landing or several weeks. That window is why this page recommends arriving on a travel eSIM
            rather than waiting to sort a phone out: it is the one gap no resident plan can fill for you. Read
            on {SAKURA_CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Klook eSIM options →
            </KlookLink>
            <KlookLink href={AIRPORT_WIFI.affiliateUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the airport WiFi rental →
            </KlookLink>
          </div>
        </section>

        {/* Q4 — the tourist eSIM question */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The 90-day line</span>
          <h2 className={styles.sectionTitle}>Is a Tourist eSIM Enough for 3 Months?</h2>
          <p className={styles.bodyText}>
            For data on its own, nearly. For a stay, no — and the reason is a number rather than an opinion.
            Sakura Mobile sells its travel products as <strong>&ldquo;Up to 90 Days&rdquo;</strong> and its
            resident plans as <strong>&ldquo;90+ Days&rdquo;</strong>, which is the same line the immigration
            categories draw. A stay of &ldquo;three months or more&rdquo; therefore runs out of travel product
            at precisely the moment it becomes a long stay.
          </p>
          <p className={styles.bodyText}>
            The second problem is the one the price comparison hides. Every tourist eSIM we price is{" "}
            <strong>data only</strong> — Sakura Mobile states a Japanese number comes only on its separate
            Voice + Data product — so three months on a travel eSIM means three months in which no Japanese
            institution can reach you by phone. The
            third is simply that renewing is not cheap: data-only resident service at {DATA_MONTH}/month
            ({DATA_MONTH_TAX} tax included) is hard to beat with three consecutive travel plans, and it does
            not stop at 90 days.
          </p>
          <p className={styles.bodyText}>
            There is one honest exception. If the stay is genuinely under 90 days, you need nothing but data,
            and you would rather have no contract at all, a travel eSIM is the right answer — our{" "}
            <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> ranks them on current
            prices, and our{" "}
            <Link href="/guides/esim/japan-esim-students">eSIM guide for students</Link> is written for the
            study-abroad version of the same calculation. For everything longer, use the eSIM as the bridge
            rather than the plan. eSIM prices checked {PRICES_CHECKED}.
          </p>
        </section>

        {/* Klook: the arrival gap this page keeps pointing at. */}
        <KlookTripPrep
          label="For the first fortnight"
          heading="What Covers the Gap Before a Resident Plan?"
          intro="A resident application needs a card showing an address you will not have on the day you land, so the first week or two is a travel product by necessity rather than choice. There is nothing to cancel afterwards, which is the point."
          items={longStaySimPrep}
        />

        {/* Q5 — minimum term and cancelling */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Term and exit</span>
          <h2 className={styles.sectionTitle}>What Is the Minimum Term, and How Do You Cancel?</h2>
          <p className={styles.bodyText}>
            <strong>One month</strong>, and then a form by the <strong>25th</strong>. Sakura Mobile&apos;s own
            guide to the resident Voice + Data plan states that &ldquo;The minimum use is just one
            month&rdquo;, after which the contract rolls and renews automatically each month until a
            termination form is received.
          </p>
          <p className={styles.bodyText}>
            The cancellation rule is published in one sentence and is worth copying out exactly:{" "}
            <strong>&ldquo;Submit by the 25th to cancel that month. Submit on the 26th or later and your
            contract runs one more month.&rdquo;</strong> Missing it does not trigger a penalty — Japanese
            carriers have a reputation for those, and this is not one — it simply bills you another month. The
            practical advice is unglamorous: on the day you sign up, put the 25th of your departure month in a
            calendar, because the week you leave Japan is the week you will be closing a bank account, settling
            utilities and returning a key.
          </p>
          <p className={styles.bodyText}>
            For a flat rather than a phone, Home Internet is published at {HOME_MONTH}/month ({HOME_MONTH_TAX}{" "}
            tax included) with speeds up to 10 Gbps and, explicitly, &ldquo;No Annual Contract&rdquo; — which
            is the clause to compare against any Japanese fixed-line offer, since the standard one is a
            two-year tie-in. The monthly Pocket WiFi at {WIFI_MONTH}/month is the no-installation alternative
            for a short let. All read on {SAKURA_CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              See Sakura Mobile monthly plans →
            </a>
            <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              See Sakura Mobile home internet →
            </a>
          </div>
        </section>

        {/* How to do it */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How Do You Set This Up, In Order?</h2>
          <div className={styles.stepsList}>
            {steps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              See Sakura Mobile monthly plans →
            </a>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Klook eSIM options →
            </KlookLink>
          </div>
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
            <Link href="/guides/esim/japan-sim-card-working-holiday" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan SIM Card for Working Holiday: Plans &amp; Rules</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-home-internet-for-foreigners" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 10l9-7 9 7" />
                  <path d="M5 9v11h14V9" />
                  <path d="M10 20v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Home Internet for Foreigners: Prices &amp; Setup</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/sakura-mobile-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="7" y="2" width="10" height="20" rx="2" />
                  <path d="M11 18h2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sakura Mobile Review (2026): Plans, Prices and Who It Suits</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-sim-card-vs-esim-2026" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="6" width="8" height="12" rx="1.5" />
                  <rect x="13" y="6" width="8" height="12" rx="1.5" />
                  <path d="M6 10h2M16 10h2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan SIM Card vs eSIM (2026): Which Should You Choose?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-students" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-5 9 5-9 5-9-5z" />
                  <path d="M7 11v5c0 1 2 2 5 2s5-1 5-2v-5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan eSIM for Students (2026): Study-Month Plans Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h.01" />
                  <path d="M5 13a10 10 0 0 1 14 0M8.5 16.5a6 6 0 0 1 7 0M2 9.5a15 15 0 0 1 20 0" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan (2026): Prices Compared, Checked Daily</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-unlimited" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 12a3 3 0 1 1 4.2-2.8L15 15a3 3 0 1 0 2-5.2L13 14" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Unlimited eSIM (2026): What Unlimited Actually Means</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-pocket-wifi-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="12" height="16" rx="2" />
                  <path d="M10 8h4M9 12h6M11 16h2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Pocket WiFi for Japan (2026): Two Rentals Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/best-travel-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20M6 15h4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Travel Card for Japan (2026): Fees Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="18" rx="2" />
                  <path d="M9 7h6M9 11h6M9 15h3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>All eSIM &amp; SIM Card Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Bridge the gap, then sign the monthly plan</h2>
            <p className={styles.ctaBannerDesc}>
              A travel eSIM for the days between landing and a registered address, then a resident plan from{" "}
              {VOICE_MONTH}/month with a Japanese number and a one-month minimum. Remember the 25th when it is
              time to leave.
            </p>
            <div className={styles.pickCtaRow}>
              <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.ctaBannerBtn}>
                View Sakura Mobile monthly plans →
              </a>
              <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Klook eSIM options →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
