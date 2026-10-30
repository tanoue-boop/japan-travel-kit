import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { klookEsim, workingHolidayArrivalPrep } from "../../../lib/klook-links";
import { siteCheapestFrom, pricesCheckedLabel } from "../../../lib/esim-prices";

/**
 * Japan SIM Card for Working Holiday — written 29 Oct 2026 for the exact phrase.
 *
 * This is deliberately a narrower page than
 * pages/guides/esim/japan-sim-card-long-term-stay.tsx (28 Oct 2026), which
 * answers "what plan do I buy for 90+ days" for everyone — a posting, a study
 * placement, a long sabbatical. That page owns the resident-versus-travel
 * argument, the 90-day ceiling and the headline "from" prices, and none of it is
 * re-argued here.
 *
 * What is here instead is the one reader that page could only gesture at: the
 * person arriving on a working-holiday visa, for whom the question is not which
 * product but in what order, because three things gate each other —
 *
 *   residence card  ->  registered address  ->  Japanese phone number  ->  bank
 *
 * — and a working holiday is the status that hits all four inside its first
 * month, with a part-time job application sitting at the end of the chain.
 *
 * So the new material on this page is: the full published price grid by GB tier
 * for both resident plans (the long-stay page quotes only the "from" prices), the
 * ¥5,500 activation fee, the passport-verification route that lets a resident
 * plan start before a residence card exists, the payment methods including the
 * Smart Pit convenience-store deposits, the Immigration Services Agency's
 * 14-day address-notification rule, and Japan Post Bank's own period-of-stay
 * condition on opening an account.
 *
 * Sources, all read on 29 October 2026:
 *
 *   www.sakuramobile.jp/monthly/price/   the full tier grid for Voice + Data and
 *                                        Data Only, 5 GB to 100 GB, and the
 *                                        5,500 JPY activation fee on every tier
 *   www.sakuramobile.jp/monthly/voice/   the two verification routes — "Residence
 *                                        Card / My Number Card" with a registered
 *                                        Japanese address, or "Verify with your
 *                                        passport" without one; "Month-to-month
 *                                        with no lock-in"; "no Japanese bank
 *                                        account required"; eSIM QR by email, SIM
 *                                        by delivery, or pickup at an airport
 *                                        counter or the Shinjuku office
 *   www.sakuramobile.jp/monthly/data-only/  the same activation fee, the
 *                                        "studentdiscount" coupon worth 1,100 JPY,
 *                                        and airport pickup at Narita, Haneda,
 *                                        Kansai or Fukuoka on a pre-order
 *   www.sakuramobile.jp/info/payment/    "We accept most credit and debit cards,
 *                                        including international ones. Accepted
 *                                        brands: VISA, MasterCard, Discover, JCB,
 *                                        AMEX, and Diners Club."; Smart Pit cash
 *                                        payment at Lawson, Family Mart and Mini
 *                                        Stop, with a 20,000 JPY deposit on
 *                                        Voice + Data and two months' fees on the
 *                                        data and WiFi plans
 *   www.sakuramobile.jp/blog/plan-guides/sakura-mobile-japan-voice-and-data-sim-guide-the-essential-resident-plan-for-expats-students/
 *                                        the accepted documents, which "must be
 *                                        registered with your current address";
 *                                        "The minimum use is just one month. You
 *                                        can cancel anytime by submitting a
 *                                        request before the 25th."; the "070,
 *                                        080, or 090" number; "You do not need a
 *                                        Japanese bank account or a local credit
 *                                        card."
 *   www.moj.go.jp/isa/ (Immigration Services Agency)
 *                                        the residence card is issued on landing
 *                                        at New Chitose, Narita, Haneda, Chubu,
 *                                        Kansai, Hiroshima and Fukuoka and posted
 *                                        to you after the moving-in notification
 *                                        anywhere else; the place of residence
 *                                        must be notified at the municipal office
 *                                        within 14 days of the day it is decided,
 *                                        bringing the residence card
 *   www.jp-bank.japanpost.jp/kaisetu/kat_gaikokujin.html
 *                                        a residence card must be presented, and
 *                                        an account cannot be opened where the
 *                                        period of stay expires within three
 *                                        months of the application date
 *
 * eSIM prices are not restated: they come from data/esim-prices.json, re-read
 * daily, and carry their own date. No Klook price appears anywhere — Klook
 * answers automated reads of its product pages with HTTP 403.
 *
 * Nothing here is first-hand. Where a company or an agency publishes a rule we
 * quote it; where a "from" price is published we label it as one.
 */

/** The date every figure and rule on this page was read off its own source. */
const CHECKED = "29 Oct 2026";

/** Sakura Mobile's own affiliate link — the same one the review page uses. */
const SAKURA_AFFILIATE = "https://p.sakuramobile.jp/idevaffiliate.php?id=486";
/** Sakura is its own programme, not Klook's; same rel as the review page. */
const SAKURA_REL = "sponsored noopener noreferrer nofollow";

const ACTIVATION = "¥5,500";
const VOICE_FROM = "¥2,980";
const DATA_FROM = "¥2,480";

const CHEAPEST_ESIM_FROM = siteCheapestFrom();
const PRICES_CHECKED = pricesCheckedLabel();

/**
 * The published tier grid for both resident plans. The long-stay guide quotes
 * only the two "from" prices, which is the figure that gets a reader to the
 * right product — this is the figure that decides which tier they sign, and the
 * gap between the two columns is the price of a phone number at every size.
 */
const tierRows = [
  { gb: "5 GB", voice: "¥2,980 (¥3,278)", data: "¥2,480 (¥2,728)" },
  { gb: "15 GB", voice: "¥3,480 (¥3,828)", data: "¥2,980 (¥3,278)" },
  { gb: "30 GB", voice: "¥3,980 (¥4,378)", data: "¥3,480 (¥3,828)" },
  { gb: "40 GB", voice: "¥4,980 (¥5,478)", data: "¥4,480 (¥4,928)" },
  { gb: "60 GB", voice: "¥6,980 (¥7,678)", data: "¥6,480 (¥7,128)" },
  { gb: "80 GB", voice: "¥8,980 (¥9,878)", data: "¥8,480 (¥9,328)" },
  { gb: "100 GB", voice: "¥10,980 (¥12,078)", data: "¥10,480 (¥11,528)" },
];

/**
 * The order the whole page exists for. Each row is gated by the one above it,
 * which is why "just get a SIM when you arrive" is not advice a working-holiday
 * arrival can act on.
 */
const sequenceRows = [
  {
    step: "1. Land, and collect the residence card",
    when: "At the airport, on the day you arrive",
    detail:
      "The Immigration Services Agency issues the residence card when landing permission is granted at New Chitose, Narita, Haneda, Chubu, Kansai, Hiroshima and Fukuoka. Arrive anywhere else and the card is posted to you after step 2 instead.",
    blocks: "Nothing — but the card has no address on it yet",
  },
  {
    step: "2. Register the address at the ward or city office",
    when: "Within 14 days of deciding where you live",
    detail:
      "The Agency's rule is a deadline, not a suggestion: notify your place of residence at the municipality's office within 14 days of the day you decide on it, bringing the residence card. The address is then printed on the back of the card.",
    blocks: "The Voice + Data application, and the bank",
  },
  {
    step: "3. Sign the Voice + Data plan",
    when: "Once the card shows that address",
    detail: `Sakura Mobile's resident Voice + Data plan is published from ${VOICE_FROM}/month with a Japanese 070, 080 or 090 number and a ${ACTIVATION} activation fee, and its accepted documents "must be registered with your current address".`,
    blocks: "The bank, most job applications, most Japanese checkouts",
  },
  {
    step: "4. Open the bank account",
    when: "After the number exists",
    detail:
      "Japan Post Bank asks for the residence card and states it cannot open an account where your period of stay expires within three months of the application date — which is a reason to do this early in a one-year working holiday, not late.",
    blocks: "Getting paid by a Japanese employer",
  },
  {
    step: "5. Apply for the job",
    when: "With a number and an account in hand",
    detail:
      "A part-time application in Japan asks for a mobile number on the form and is answered by a phone call, often the same week. This is the end of the chain, and it is why the number is worth hurrying.",
    blocks: "—",
  },
];

/**
 * The documents question as a working holiday actually meets it — which is a
 * different question from the long-stay page's, because the answer changes on
 * the day of the month you land rather than on the product you choose.
 */
const documentRows = [
  {
    route: "Resident plan, verified with a residence card",
    documents: 'A Residence Card or My Number Card with "a registered Japanese address"',
    catch:
      "The full product: a Japanese number, any tier from 5 GB to 100 GB, eSIM QR by email or a SIM delivered. Needs step 2 done first.",
  },
  {
    route: "Resident plan, verified with a passport",
    documents: "A passport, where you have no registered Japanese address yet",
    catch:
      'Sakura Mobile\'s own plan page offers this as the alternative route — "Verify with your passport" — which is what makes a monthly plan possible in week one. Collect at an airport counter or the Shinjuku office.',
  },
  {
    route: "Travel eSIM, bought before you fly",
    documents: "Nothing but an eSIM-capable handset",
    catch: `From ${CHEAPEST_ESIM_FROM} across the four providers we price, installed at home, working the moment you land. Data only, and capped at 90 days — the bridge, not the plan.`,
  },
  {
    route: "Monthly Pocket WiFi",
    documents: "A passport at the airport counter, or an address for delivery",
    catch:
      "Published from ¥4,980/month for 100 GB and ¥6,480 for 200 GB, on SoftBank 4G/LTE, with no two-year contract — the option if your handset cannot take an eSIM at all.",
  },
];

/** How you pay, which is the other thing nobody has sorted in week one. */
const paymentRows = [
  {
    method: "International credit or debit card",
    detail:
      'Sakura Mobile states it accepts "most credit and debit cards, including international ones", naming VISA, MasterCard, Discover, JCB, AMEX and Diners Club.',
    note: "The route that works before a Japanese bank account exists. Approval still sits with your card issuer.",
  },
  {
    method: "Cash at a convenience store (Smart Pit)",
    detail:
      "Monthly payments made with a Smart Pit number at Lawson, Family Mart, Mini Stop and others.",
    note:
      "It carries a deposit on the resident plans: ¥20,000 on Voice + Data, or two months' fees on Data Only and Pocket WiFi.",
  },
  {
    method: "Japanese bank account",
    detail:
      'Not required. The company states plainly: "You do not need a Japanese bank account or a local credit card."',
    note: "Which is the clause that breaks the circle — the bank wants the number, and the number does not want the bank.",
  },
];

const steps = [
  {
    title: "Buy a travel eSIM before you fly, and install it at home",
    desc: `Install the profile with the line switched off so you land with working data rather than hunting an airport SSID with two cases. It costs from ${CHEAPEST_ESIM_FROM} across the four providers we price, there is no contract and nothing to cancel. This is the only part of the whole sequence you can finish before leaving.`,
  },
  {
    title: "Collect the residence card at immigration, and check what is on it",
    desc: "At the seven airports the Immigration Services Agency names, the card is issued when landing permission is granted. Look at the back: the address field is blank, and that blank field is what stops a Voice + Data application today.",
  },
  {
    title: "Decide whether you can wait for the number",
    desc: 'If your sharehouse or dorm address is already fixed, the fastest path is to register it, then apply once. If it is not — a fortnight in a hostel while you view rooms is the normal working-holiday arrival — take the passport-verification route on the monthly plan, or run a travel eSIM and apply later. Sakura Mobile publishes both: "Residence Card / My Number Card" with an address, or "Verify with your passport" without one.',
  },
  {
    title: "Register the address inside 14 days",
    desc: "Take the residence card to the ward or city office for the municipality you live in and file the notification of place of residence. The Agency's deadline is 14 days from the day you decide on the address, and the card comes back with it printed on the reverse. Everything downstream — the plan, the bank, the job — unlocks here.",
  },
  {
    title: "Pick the tier against a year, not a fortnight",
    desc: `Both resident plans run 5 GB to 100 GB. The thing that moves the answer on a working holiday is whether the flat has its own internet: on a plan with no home line, a tethered laptop turns a 15 GB month into a 60 GB one, and 60 GB of Voice + Data is ¥6,980/month against ¥3,480 for 15 GB. Factor the ${ACTIVATION} activation fee in once, at the start.`,
  },
  {
    title: "Note the 25th on the day you sign up",
    desc: 'The published rule is one sentence — "The minimum use is just one month. You can cancel anytime by submitting a request before the 25th." — and submitting on the 26th or later runs the contract one more month. A working holiday has a known end date, so put the 25th of your departure month in a calendar now rather than in the week you are shipping boxes home.',
  },
];

const faqItems = [
  {
    q: "What SIM card should I get for a working holiday in Japan?",
    a: `A resident monthly plan with a Japanese phone number, not a tourist eSIM — and of the English-language options the one we link is Sakura Mobile, whose Voice + Data SIM or eSIM is published from ${VOICE_FROM}/month (¥3,278 tax included) for 5 GB, rising through 15 GB at ¥3,480, 30 GB at ¥3,980, 40 GB at ¥4,980, 60 GB at ¥6,980 and 80 GB at ¥8,980 to 100 GB at ¥10,980, with a ${ACTIVATION} activation fee on every tier and a minimum use of one month. The reason a travel eSIM is the wrong answer here is not price: a working holiday is a stay of a year or close to it, every travel product in Japan is sold up to 90 days, and the plans we price carry no number — so nothing a travel eSIM gives you can receive the call from the bar you applied to. Prices read off sakuramobile.jp on ${CHECKED}.`,
  },
  {
    q: "Can I get a Japanese phone number on a working holiday visa?",
    a: `Yes. A working holiday is a mid- to long-term status, which means a residence card, and a residence card is what a resident plan verifies against. Sakura Mobile's resident Voice + Data product issues a Japanese 070, 080 or 090 number on the docomo network, and the documents it accepts — a Residence Card, a Japanese driver's licence or a My Number Card — "must be registered with your current address". The historical obstacle with the big carriers was a two-year contract and a demand for a long remaining period of stay; a one-month minimum sidesteps both, which is the whole reason a one-year visa can use this plan at all. Read on ${CHECKED}.`,
  },
  {
    q: "Do I need a bank account to get a SIM card in Japan?",
    a: `No, and it is worth knowing before you arrive, because the order runs the other way round. Sakura Mobile's own wording is "You do not need a Japanese bank account or a local credit card", and its payment page lists most international credit and debit cards — VISA, MasterCard, Discover, JCB, AMEX and Diners Club — plus cash at a convenience store through Smart Pit, which carries a ¥20,000 deposit on Voice + Data or two months' fees on the data and WiFi plans. The dependency is the opposite one: Japan Post Bank asks for your residence card and states it cannot open an account where your period of stay expires within three months of the application date, so the phone comes first and the bank follows. Read on ${CHECKED}.`,
  },
  {
    q: "What can I use before I have a residence card address?",
    a: `Three things, in order of how much they cost you. A travel eSIM is the cheapest and the only one you can finish before you fly — from ${CHEAPEST_ESIM_FROM} across the four providers we price, no contract, no collection, data only. The monthly Pocket WiFi is published from ¥4,980/month for 100 GB and is collected on a passport at an airport counter, which is the answer if your handset cannot take an eSIM. And the resident plan itself has a second route: Sakura Mobile's Voice + Data page offers "Verify with your passport" for anyone without a registered Japanese address, collected at an airport counter or its Shinjuku office. What you cannot do is wait — the Immigration Services Agency gives you 14 days from deciding on an address to register it, and the fortnight before that is the gap every working-holiday arrival has to cover. eSIM prices checked ${PRICES_CHECKED}; everything else read ${CHECKED}.`,
  },
  {
    q: "How long does it take to get a Japanese phone number after I land?",
    a: `It is governed by the address, not by the carrier. The residence card itself is handed over at immigration at the seven airports the Immigration Services Agency names — New Chitose, Narita, Haneda, Chubu, Kansai, Hiroshima and Fukuoka — but it arrives with the address field blank. You then have 14 days from deciding where you live to file the notification at the ward or city office, and the card comes back the same visit with the address printed on the reverse. If you have a room on day one, the whole thing can be a week; if you are viewing sharehouses for a fortnight first, it is three or four. Sakura Mobile's side of it is fast by comparison — an eSIM QR arrives by email, a SIM card by delivery. Read on ${CHECKED}.`,
  },
  {
    q: "How much data do I need for a year in Japan?",
    a: `The tier grid is published 5 GB to 100 GB, and the honest answer is that it depends on one thing: whether the place you live has its own internet. With a home line, a phone-only month sits comfortably in 15 GB — ¥3,480 on Voice + Data, ¥2,980 on Data Only. Without one, a tethered laptop for work or study pushes the same month towards 60 GB, which is ¥6,980 against ¥6,480. That is roughly a ¥42,000 difference across a year, which is why our guide to home internet for foreigners is worth reading before you pick a tier rather than after. Read on ${CHECKED}.`,
  },
  {
    q: "Can I use my own phone, or do I need to buy one in Japan?",
    a: "Your own, as long as it is carrier-unlocked. Japan's three networks run on bands that mainstream handsets sold in Europe, North America and Australia support, and a resident plan is a SIM or an eSIM profile rather than a handset contract — which is the practical difference between it and the big carriers' offers, where the phone and the line are sold together on a tie-in. Two things to check before you fly rather than after: that your operator has actually released the lock, and that the handset takes an eSIM if you intend to arrive on a travel profile. Our iPhone and Android guides cover the second one model by model.",
  },
  {
    q: "Is there a student discount, and does a working holiday count?",
    a: `Sakura Mobile publishes a student discount of ¥1,100 off the ${ACTIVATION} activation fee, applied with the coupon code "studentdiscount" on its monthly plan pages. A working-holiday visa is not a student status, so take that as a figure for anyone combining the year with a language school on a student visa rather than as something to count on — the condition is the company's to apply, and the activation fee is otherwise the same ${ACTIVATION} on every tier of both resident plans. Read on ${CHECKED}.`,
  },
  {
    q: "What happens to the contract when I leave Japan?",
    a: 'You end it with a form, and the date is the only thing that can cost you. The published rule is "The minimum use is just one month. You can cancel anytime by submitting a request before the 25th" — submit on the 26th or later and the contract runs one more month, because it renews automatically rather than expiring. Missing it is not a penalty, it is one more month\'s fee, which is a small amount of money and an irritating one to pay from the other side of the world. A working holiday has a departure date printed on it, so this is the easiest reminder on the whole list to set.',
  },
  {
    q: "Should I get the data-only plan and save the ¥500?",
    a: `On a working holiday, almost certainly not. The gap is ¥500 a month at the bottom of the grid — ${VOICE_FROM} against ${DATA_FROM} for 5 GB — and ¥500 at the top too, ¥10,980 against ¥10,480 for 100 GB, so roughly ¥6,000 across a year. What the number buys in return is the thing the year is for: a part-time application that asks for a mobile number and is answered by a phone call, a bank that wants a contactable line, a landlord or sharehouse manager, a clinic, a delivery redelivery slot, and two-factor codes from Japanese services that send SMS and nothing else. Data Only earns its place for a stay with no work in it. Read on ${CHECKED}.`,
  },
];

const TITLE = "Japan SIM Card for Working Holiday: Plans & Rules";
const DESCRIPTION =
  "Japan SIM Card for Working Holiday: Sakura Mobile's Voice + Data from ¥2,980/month with a Japanese number, the ¥5,500 activation fee and the 14-day rule.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/esim/japan-sim-card-working-holiday") },
});

export default function JapanSimCardWorkingHolidayPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-sim-card-working-holiday" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-sim-card-working-holiday" />
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
              route: "/guides/esim/japan-sim-card-working-holiday",
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
                  name: "Japan SIM Card for Working Holiday",
                  item: "https://www.japan-travel-kit.com/guides/esim/japan-sim-card-working-holiday",
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
          <span className={styles.breadCurrent}>SIM for a Working Holiday</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan SIM Card for Working Holiday:<br />The Order It Has to Happen In
          </h1>
          <p className={styles.heroSubtitle}>
            The residence card gates the address, the address gates the phone number, and the number gates
            the bank and the job. Here is what to buy at each step, and what to use while you wait.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices, dated", "Every tier, 5–100 GB", "14-day address rule"].map((t) => (
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
            The <strong>Japan SIM card for a working holiday</strong> is a resident monthly plan with a
            Japanese phone number, and the English-language option we link is <strong>Sakura Mobile</strong>:
            its <strong>Voice + Data</strong> SIM or eSIM is published from <strong>{VOICE_FROM}/month</strong>{" "}
            (¥3,278 tax included) for 5 GB up to <strong>¥10,980</strong> for 100 GB, with a{" "}
            <strong>{ACTIVATION} activation fee</strong> on every tier, a Japanese{" "}
            <strong>070, 080 or 090 number</strong> and a <strong>one-month minimum</strong>. What a working
            holiday has to plan around is not the price but the order: the Immigration Services Agency issues
            your <strong>residence card at immigration</strong> at seven airports, you must notify your place
            of residence at the ward or city office <strong>within 14 days</strong> of deciding on it, and only
            then does the card show the address a resident plan verifies against — which is also what Japan
            Post Bank wants before it opens an account. Cover the fortnight in between with a travel eSIM from{" "}
            {CHEAPEST_ESIM_FROM}, or take Sakura Mobile&apos;s own{" "}
            <strong>&ldquo;Verify with your passport&rdquo;</strong> route and start the monthly plan in week
            one. No Japanese bank account is needed either way: international cards are accepted. All figures
            read off sakuramobile.jp, moj.go.jp/isa and jp-bank.japanpost.jp on {CHECKED}.
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
                <p className={styles.verdictStatLabel}>Plan to get</p>
                <p className={styles.verdictStatValue}>Voice + Data, from {VOICE_FROM}/mo</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>One-off activation</p>
                <p className={styles.verdictStatValue}>{ACTIVATION}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Address deadline</p>
                <p className={styles.verdictStatValue}>14 days to register it</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Bank account needed?</p>
                <p className={styles.verdictStatValue}>No — international card</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> fly in on a travel eSIM, register your address inside the 14-day
              window, then sign the Voice + Data plan — because the number is what the bank, the sharehouse
              and the part-time job all ask for, and it is the one thing no travel product in Japan sells. If
              your address will not be fixed for a few weeks, the passport-verification route on the same
              monthly plan starts it sooner.
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

        {/* Q1 — the plan, with the full grid */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The plan</span>
          <h2 className={styles.sectionTitle}>What SIM Card Should You Get for a Working Holiday in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            A resident Voice + Data plan. Below is the full published grid for both of Sakura Mobile&apos;s
            resident plans, because a working holiday signs a tier for a year rather than buying a plan for a
            trip — and the second column is what a Japanese phone number costs at every size.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Monthly data", "Voice + Data (tax incl.)", "Data Only (tax incl.)", "Price of the number"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tierRows.map((row) => (
                    <tr key={row.gb}>
                      <td className={styles.tdProvider}>{row.gb}</td>
                      <td className={styles.tdPrice}>{row.voice}</td>
                      <td>{row.data}</td>
                      <td>¥500/month</td>
                    </tr>
                  ))}
                  <tr>
                    <td className={styles.tdProvider}>Activation (one-off)</td>
                    <td className={styles.tdPrice}>{ACTIVATION}</td>
                    <td>{ACTIVATION}</td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Every figure is Sakura Mobile&apos;s own, read off its published monthly price list on {CHECKED};
            both plans are stated as &ldquo;Month-to-month with no lock-in&rdquo; with a minimum use of one
            month. The activation fee applies once per line, and the company publishes a ¥1,100 student
            discount on it against the coupon code &ldquo;studentdiscount&rdquo;. Our{" "}
            <Link href="/guides/esim/japan-sim-card-long-term-stay" style={{ color: "var(--text)", fontWeight: 600 }}>
              long-term stay guide
            </Link>{" "}
            makes the wider resident-versus-travel case for any stay over 90 days, and the{" "}
            <Link href="/guides/esim/sakura-mobile-review" style={{ color: "var(--text)", fontWeight: 600 }}>
              Sakura Mobile review
            </Link>{" "}
            goes through the travel plans in detail.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              See Sakura Mobile monthly plans →
            </a>
          </div>
        </section>

        {/* Q2 — the order. The part an AI answer does not finish. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The sequence</span>
          <h2 className={styles.sectionTitle}>Can You Get a Japanese Phone Number on a Working Holiday Visa?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes — a working holiday is a mid- to long-term status, so it comes with a residence card, and a
            residence card is exactly what a resident plan verifies against. The catch is never eligibility.
            It is that each row below is locked by the row above it.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Step", "When", `What the official source says (read ${CHECKED})`, "What it unlocks"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sequenceRows.map((row) => (
                    <tr key={row.step}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.step}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.blocks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            One point worth making plainly, because it is the thing that surprises people arriving from
            countries where a prepaid number is a supermarket purchase: in Japan the mobile number is the
            identity document of everyday life. A part-time job application asks for one on the form and is
            answered by a phone call. A sharehouse contract asks for one. So does a clinic, a parcel
            redelivery and the two-factor code from every Japanese online service. A year of data without a
            number is not a cheaper version of the same year.
          </p>
        </section>

        {/* Q3 — the documents, including the passport route */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Documents</span>
          <h2 className={styles.sectionTitle}>What Can You Use Before You Have a Residence Card Address?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            There are four routes, and only one of them is finished before you fly. Which you need depends on
            a single question: is your Japanese address already fixed, or are you arriving to look for one?
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "What it verifies with", "What you get, and the catch"].map((h) => (
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
            The honest planning advice is to decide between rows two and three before you book the flight,
            because they imply different arrival days. The passport route gets the monthly plan and the number
            started in week one but needs you at an airport counter or the Shinjuku office to collect; a travel
            eSIM needs nothing and nobody, but it is data only and runs out at 90 days — which is less than a
            quarter of a working-holiday year. Rental specs and eSIM prices carry their own dates: eSIM prices
            checked {PRICES_CHECKED}, everything else read {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Klook eSIM options →
            </KlookLink>
            <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              See the passport-verification plan →
            </a>
          </div>
        </section>

        {/* Klook: the arrival week this page keeps pointing at. */}
        <KlookTripPrep
          label="Your arrival week"
          heading="What Should You Book Before You Land?"
          intro="A working-holiday arrival is not a holiday arrival: you come with a year of luggage, no address on your card and a two-week clock already running. These are the three things worth having in hand before immigration rather than after it."
          items={workingHolidayArrivalPrep}
        />

        {/* Q4 — paying for it */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Paying</span>
          <h2 className={styles.sectionTitle}>Do You Need a Bank Account to Get a SIM Card in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            No — and the direction of that dependency is the single most useful thing on this page. The bank
            wants the phone; the phone does not want the bank.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["How you pay", `What is published (read ${CHECKED})`, "What it means in week one"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paymentRows.map((row) => (
                    <tr key={row.method}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.method}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The bank side has a condition worth reading before you arrive. Japan Post Bank&apos;s own guidance
            for foreign customers asks for the residence card and states that an account cannot be opened
            where your period of stay expires within three months of the application date. A one-year working
            holiday clears that comfortably at the start and not at all at the end — so if you want a Japanese
            account for wages, open it in your first months, not your last. Read on jp-bank.japanpost.jp on{" "}
            {CHECKED}. Our{" "}
            <Link href="/guides/money/best-travel-card-japan">travel card guide</Link> covers what to use for
            spending in the meantime.
          </p>
        </section>

        {/* Q5 — how much data, which leads to the home internet question */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Sizing it</span>
          <h2 className={styles.sectionTitle}>Which Tier Should You Sign for a Year?</h2>
          <p className={styles.bodyText}>
            The grid runs 5 GB to 100 GB on both plans, and one question moves the answer more than any
            other: does the place you live have its own internet? With a home line, a phone-only month sits
            inside 15 GB — <strong>¥3,480</strong> on Voice + Data. Without one, a tethered laptop for work,
            study or job applications pushes the same month towards 60 GB, which is <strong>¥6,980</strong>.
            Across a working-holiday year that difference is about ¥42,000, which is more than the gap between
            any two sensible home-internet decisions.
          </p>
          <p className={styles.bodyText}>
            So make the home decision first. A sharehouse usually includes a line in the rent; a private flat
            on a one-year lease usually does not, and a Japanese fibre order takes weeks rather than days. Our{" "}
            <Link href="/guides/esim/japan-home-internet-for-foreigners">
              guide to home internet for foreigners
            </Link>{" "}
            has the published prices and installation lead times for that side, including the no-installation
            router that is the usual answer on a one-year tenancy. Then size the SIM around what is left.
          </p>
          <p className={styles.bodyText}>
            The other half of sizing is the activation fee, which is {ACTIVATION} once per line and does not
            scale with the tier. It makes switching tiers mid-year cheap — you are changing a plan, not
            opening a line — so there is no reason to over-buy on day one. Start at a tier you are confident
            in and move up once you know what a real month looks like.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              See every data tier on Sakura Mobile →
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
            <Link href="/guides/esim/japan-phone-number-for-foreigners" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Phone Number for Foreigners: 070/080/090 Plans</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-sim-card-for-students" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-5 9 5-9 5-9-5z" />
                  <path d="M7 11v5c0 1 2 2 5 2s5-1 5-2v-5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan SIM Card for Students: Plans &amp; Residence Card</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-sim-card-long-term-stay" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="7" y="2" width="10" height="20" rx="2" />
                  <path d="M11 18h2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan SIM Card for Long Term Stay: 90+ Day Plans</p>
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
            <h2 className={styles.ctaBannerTitle}>Arrive connected, then get the number</h2>
            <p className={styles.ctaBannerDesc}>
              A travel eSIM for the fortnight between landing and a registered address, then Voice + Data
              from {VOICE_FROM}/month with a Japanese 070, 080 or 090 number, a {ACTIVATION} activation fee
              and a one-month minimum. Remember the 25th when the year is up.
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
