import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { klookEsim, studentSimArrivalPrep } from "../../../lib/klook-links";
import { siteCheapestFrom, pricesCheckedLabel } from "../../../lib/esim-prices";

/**
 * Japan SIM Card for Students — written 30 Oct 2026 for the exact phrase.
 *
 * This page is deliberately narrower than the two it sits between.
 *
 *   pages/guides/esim/japan-esim-students.tsx (the older page) is about travel
 *   eSIMs priced by the study month, in USD, for a short exchange or a term that
 *   fits inside the 90 days every travel product in Japan is capped at. It owns
 *   the eSIM-against-eSIM price comparison and none of it is re-argued here.
 *
 *   pages/guides/esim/japan-sim-card-long-term-stay.tsx owns the general
 *   resident-versus-travel argument for anyone staying 90+ days, and
 *   japan-sim-card-working-holiday.tsx owns the working-holiday sequence.
 *
 * What is here instead is the one reader neither covers: the international
 * student on a student status, staying longer than three months, who will hold a
 * residence card and therefore has access to a resident monthly plan — and who
 * has one thing no other long-stay reader has, a student ID that is worth
 * ¥1,100 off the activation fee. The scope line in the lead paragraph and the
 * cross-link to japan-esim-students are there so the two pages answer different
 * questions rather than competing for the same one.
 *
 * Sources, all read on 30 October 2026:
 *
 *   www.sakuramobile.jp/monthly/price/   the full tier grid for Voice + Data and
 *                                        Data Only, 5 GB to 100 GB, the 5,500 JPY
 *                                        activation fee on every tier, and the
 *                                        student discount — "Additional 1,100 JPY
 *                                        discount from activation fee" with the
 *                                        coupon code "studentdiscount"
 *   www.sakuramobile.jp/monthly/voice/   "All our phone numbers are normal
 *                                        Japanese phone numbers (070, 080, 090)
 *                                        that you can use to open your bank
 *                                        account and rent an apartment!"; "with no
 *                                        Japanese bank account required";
 *                                        "Month-to-month with no lock-in"; eSIM QR
 *                                        by email or SIM by delivery inside Japan,
 *                                        or "Pick up at our airport counters or
 *                                        Shinjuku office" on a pre-order
 *   www.sakuramobile.jp/monthly/voice/application-procedure/
 *                                        the four application steps and the three
 *                                        accepted documents — Residence Card and My
 *                                        Number Card must be valid and show the
 *                                        current address; passport is accepted for
 *                                        airport or office pickup only
 *   www.sakuramobile.jp/blog/plan-guides/sakura-mobile-japan-voice-and-data-sim-guide-the-essential-resident-plan-for-expats-students/
 *                                        "The minimum use is just one month. You can
 *                                        cancel anytime by submitting a request
 *                                        before the 25th."; the Residence Card
 *                                        "must be registered with your current
 *                                        address"; the "070, 080, or 090" number
 *                                        against a 050 VoIP one; the seven data
 *                                        tiers; and the lead times — standard
 *                                        orders "Ready in about 1-3 days after
 *                                        approval", MNP transfers about "5-7 days"
 *   www.sakuramobile.jp/travel/esim/     the travel eSIM as the company sells it:
 *                                        1 to 90 days, from 1,250 JPY (1,375 JPY,
 *                                        tax incl.), data only with no ID
 *                                        verification
 *   www.moj.go.jp/isa/ (Immigration Services Agency, "When you decide or change the
 *   place of residence")                 the place of residence must be notified at
 *                                        the municipal office within 14 days of the
 *                                        day it is decided, presenting the residence
 *                                        card — or the passport, where it was stamped
 *                                        "Residence card to be issued later"
 *   www.jp-bank.japanpost.jp/kaisetu/kat_gaikokujin.html
 *                                        presentation of the residence card is
 *                                        requested; an account cannot be opened
 *                                        where the period of stay expires within
 *                                        three months of the application date; a
 *                                        student ID is requested from students
 *
 * eSIM prices are not restated here: they come from data/esim-prices.json, which
 * is re-read daily and carries its own date. No Klook price appears anywhere —
 * Klook answers automated reads of its product pages with HTTP 403.
 *
 * Nothing on this page is first-hand, and nothing on it is immigration advice.
 * Where a company or an agency publishes a rule we quote it with the date we read
 * it; where a "from" price is published we label it as one.
 */

/** The date every figure and rule on this page was read off its own source. */
const CHECKED = "30 Oct 2026";

/** Sakura Mobile's own affiliate link — the same one the review page uses. */
const SAKURA_AFFILIATE = "https://p.sakuramobile.jp/idevaffiliate.php?id=486";
/** Sakura is its own programme, not Klook's; same rel as the review page. */
const SAKURA_REL = "sponsored noopener noreferrer nofollow";

const VOICE_FROM = "¥2,980";
const DATA_FROM = "¥2,480";
const ACTIVATION = "¥5,500";
const STUDENT_OFF = "¥1,100";
/** ¥5,500 − ¥1,100, the figure the coupon actually leaves you paying. */
const ACTIVATION_AFTER = "¥4,400";

const CHEAPEST_ESIM_FROM = siteCheapestFrom();
const PRICES_CHECKED = pricesCheckedLabel();

/**
 * The published tier grid, with the student discount applied where it applies —
 * to the activation fee, once, not to the monthly fee. The gap between the two
 * price columns is the price of a Japanese phone number at every size, which is
 * the decision this table exists to make.
 */
const tierRows = [
  { gb: "5 GB", voice: "¥2,980 (¥3,278)", data: "¥2,480 (¥2,728)", suits: "A phone with campus or dorm WiFi behind it" },
  { gb: "15 GB", voice: "¥3,480 (¥3,828)", data: "¥2,980 (¥3,278)", suits: "The usual first-term pick: maps, messaging, some video" },
  { gb: "30 GB", voice: "¥3,980 (¥4,378)", data: "¥3,480 (¥3,828)", suits: "Light laptop tethering a few evenings a week" },
  { gb: "40 GB", voice: "¥4,980 (¥5,478)", data: "¥4,480 (¥4,928)", suits: "A room with no internet of its own" },
  { gb: "60 GB", voice: "¥6,980 (¥7,678)", data: "¥6,480 (¥7,128)", suits: "Online classes tethered to a laptop daily" },
  { gb: "80 GB", voice: "¥8,980 (¥9,878)", data: "¥8,480 (¥9,328)", suits: "A shared room where the plan is the household line" },
  { gb: "100 GB", voice: "¥10,980 (¥12,078)", data: "¥10,480 (¥11,528)", suits: "Rarely the right answer — price home internet first" },
];

/**
 * The products a student can actually sign, and the four things that separate
 * them. Written to be read across rather than down: the travel rows fail the
 * phone-number test and the ceiling test, and the resident rows fail the
 * can-I-do-this-on-day-one test.
 */
const compareRows = [
  {
    product: "Sakura Mobile Voice + Data monthly (resident)",
    price: `From ${VOICE_FROM}/month (¥3,278 tax incl.), plus a ${ACTIVATION} activation fee — ${ACTIVATION_AFTER} with the student coupon`,
    number: "Yes — a Japanese 070, 080 or 090 number",
    needs: "A Residence Card or My Number Card, valid and showing your current address, for an eSIM by email or a SIM by delivery; a passport if you collect at an airport counter or the Shinjuku office",
    term: 'Published as "Month-to-month with no lock-in"; minimum use one month',
  },
  {
    product: "Sakura Mobile Data Only monthly (resident)",
    price: `From ${DATA_FROM}/month (¥2,728 tax incl.), same ${ACTIVATION} activation fee and same student coupon`,
    number: "No",
    needs: "The same documents as the Voice + Data plan",
    term: "One month minimum, then rolling monthly",
  },
  {
    product: "Sakura Mobile travel eSIM",
    price: "From ¥1,250 (¥1,375 tax incl.) on the company's own travel page",
    number: "No on the data-only eSIM; the company sells a separate prepaid Voice + Data eSIM that does carry a number",
    needs: "Nothing — the data-only travel eSIM states no ID verification is required",
    term: "1 to 90 days, which is the ceiling on every travel product in Japan",
  },
  {
    product: "A tourist eSIM (Klook, Airalo, Holafly, eSIM Go)",
    price: `From ${CHEAPEST_ESIM_FROM} across the four providers we price`,
    number: "No — every Japan plan we track is data only",
    needs: "An eSIM-capable handset and nothing else",
    term: "Plan lengths run in days; no contract to end",
  },
];

/**
 * The documents question, which is what most of these searches are really about.
 * The catch column is the part an AI answer does not finish: which route works on
 * which day of your first month.
 */
const documentRows = [
  {
    route: "eSIM QR by email, or a SIM delivered to your address",
    documents: "A valid Residence Card or My Number Card, showing your current address",
    catch:
      'Sakura Mobile\'s wording is that the card "must be registered with your current address". A card whose back is still blank — which is how it arrives at immigration — is the single most common reason a resident application stalls.',
  },
  {
    route: "Collection at an airport counter or the Shinjuku office",
    documents: "A passport, on a pre-order",
    catch:
      "The route that works before any address exists, because it is in-person verification rather than a document check. It needs ordering in advance rather than walking up.",
  },
  {
    route: "No residence card yet at all",
    documents: "Passport only",
    catch: `A travel product, then: a travel eSIM from ${CHEAPEST_ESIM_FROM} across the providers we price, or Sakura Mobile's own from ¥1,250 (¥1,375 tax incl.). Data only, capped at 90 days, nothing to cancel.`,
  },
];

/**
 * How long the whole thing takes, which is governed by the address rather than
 * by the carrier — the point of the table.
 */
const timingRows = [
  {
    stage: "Residence card in hand",
    howLong: "Usually at the airport, on the day you land",
    detail:
      'The Immigration Services Agency\'s own guidance for notifying a place of residence assumes you are carrying the card, and tells anyone whose passport was stamped "Residence card to be issued later" to present the passport instead. The address field on the back is blank either way.',
  },
  {
    stage: "Address registered at the ward or city office",
    howLong: "Within 14 days of deciding where you live",
    detail:
      "The Agency's rule is a deadline, not a suggestion: notify your place of residence at the municipal office of the municipality you live in within 14 days of the day you decide on it, presenting the residence card. The address is then printed on the reverse.",
  },
  {
    stage: "Application approved and the line ready",
    howLong: 'About 1–3 days after approval on a standard order; about 5–7 days if you are transferring a number in (MNP)',
    detail:
      "Sakura Mobile's own figure. An eSIM arrives as a QR code by email and a SIM card by delivery, so the clock after approval is short — it is the two rows above it that take the time.",
  },
  {
    stage: "Shortest realistic path end to end",
    howLong: "Roughly a week, if your address is fixed before you fly",
    detail:
      "A dormitory place confirmed by your university is the version of this that goes fast: register the address in your first days, apply the same week, and the line is live inside about a week of landing. Viewing sharehouses for a fortnight first makes it three or four weeks instead.",
  },
];

const steps = [
  {
    title: "Buy a travel eSIM before you fly, and install the profile at home",
    desc: `This is the only part of the sequence you can finish before leaving, and it is what stops arrival day being spent hunting an airport SSID with two cases. From ${CHEAPEST_ESIM_FROM} across the four providers we price, data only, no contract and nothing to cancel. Install the profile with the line switched off so it starts working when you land.`,
  },
  {
    title: "Check what is actually on the back of your residence card",
    desc: "The card is issued when landing permission is granted at the major airports, but the address field is blank, and that blank field is what a resident application cannot be approved against. Look at it on the day rather than assuming.",
  },
  {
    title: "Register the address inside 14 days of deciding on it",
    desc: "Take the residence card to the municipal office for where you live and file the notification of place of residence. The Immigration Services Agency's deadline is 14 days from the day you decide on the address, and the card comes back with it printed on the reverse. Your university's international office will usually walk the first intake through this.",
  },
  {
    title: "Decide whether you need the number, honestly",
    desc: `Voice + Data is ¥500 a month more than Data Only at every tier — ${VOICE_FROM} against ${DATA_FROM} at 5 GB, ¥10,980 against ¥10,480 at 100 GB. Sakura Mobile's own claim for what the number buys is specific: "normal Japanese phone numbers (070, 080, 090) that you can use to open your bank account and rent an apartment". A part-time job application and a clinic registration both ask for one too.`,
  },
  {
    title: "Upload the student ID for the discount — it is a step, not automatic",
    desc: `The discount is ${STUDENT_OFF} off the ${ACTIVATION} activation fee, applied with the coupon code "studentdiscount" on the monthly plan pages, and the document-submission step of the application has a box for uploading a student ID or other proof of student status. Miss the box and you pay the full ${ACTIVATION}; use it and the fee is ${ACTIVATION_AFTER}. It is a one-off either way — the monthly price does not change.`,
  },
  {
    title: "Pick the tier against your room, not against your phone",
    desc: "Both resident plans run 5 GB to 100 GB and the tier is changeable month to month. The one thing that moves the answer is whether the place you live has internet of its own: with a line in the room, a phone-only month sits comfortably in 15 GB; without one, a tethered laptop for online classes pushes the same month towards 60 GB, which is ¥6,980 against ¥3,480.",
  },
  {
    title: "Put the 25th of your departure month in a calendar now",
    desc: 'The published rule is one sentence: "The minimum use is just one month. You can cancel anytime by submitting a request before the 25th." Submit on the 26th or later and the contract runs one more month, because it renews automatically rather than expiring at the end of term. A study placement has a known end date, so this is the easiest reminder on the list to set on the day you sign up.',
  },
];

const faqItems = [
  {
    q: "What is the best SIM card for international students in Japan?",
    a: `For a placement longer than three months, a resident monthly plan rather than a travel eSIM — and of the English-language options the one we link is Sakura Mobile. Its resident Voice + Data SIM or eSIM is published from ${VOICE_FROM}/month (¥3,278 tax included) for 5 GB, rising through 15 GB at ¥3,480, 30 GB at ¥3,980, 40 GB at ¥4,980, 60 GB at ¥6,980 and 80 GB at ¥8,980 to 100 GB at ¥10,980, with a Japanese 070, 080 or 090 number, a ${ACTIVATION} activation fee and a minimum use of one month. Data Only is ¥500 a month cheaper at every tier, from ${DATA_FROM}. Students get ${STUDENT_OFF} off the activation fee with the coupon code "studentdiscount", so ${ACTIVATION_AFTER} rather than ${ACTIVATION}. If your term is shorter than 90 days and you need nothing but data, a travel eSIM is the cheaper answer and our eSIM guide for students prices those instead. All Sakura Mobile figures read off sakuramobile.jp on ${CHECKED}.`,
  },
  {
    q: "Can I get a SIM card in Japan without a bank account?",
    a: `Yes, and this is the clause that makes the whole thing possible in your first fortnight rather than your second month. Sakura Mobile's own monthly Voice page states the plan comes "with no Japanese bank account required", and the resident plan guide puts it plainly: "You do not need a Japanese bank account or a local credit card." The dependency actually runs the other way round. Japan Post Bank's page for foreign nationals asks for your residence card to be presented, requests a student ID from students, and states that an account cannot be opened where your period of stay expires within three months of the application date — so the phone tends to come first and the bank follows it. Read on ${CHECKED}.`,
  },
  {
    q: "Do I need a residence card to get a SIM in Japan?",
    a: `For a resident monthly plan, in practice yes — for a travel product, no. Sakura Mobile's application page accepts three documents: a Residence Card or a My Number Card, each valid and showing your current address, for an eSIM QR by email or a SIM by delivery; or a passport, where you collect at an airport counter or its Shinjuku office. Its resident plan guide adds the detail that catches people out — the card "must be registered with your current address", and the card handed over at immigration has a blank address field until the ward office prints one on it. A travel eSIM needs nothing at all: Sakura Mobile's own data-only travel eSIM states no ID verification is required, and no tourist eSIM we price asks for a document either. Read on ${CHECKED}.`,
  },
  {
    q: "How long does it take to get a SIM after arriving?",
    a: `The carrier's part is fast; the paperwork in front of it is not. Sakura Mobile puts a standard monthly order at about 1–3 days after approval, and about 5–7 days if you are transferring an existing number in by MNP, with the eSIM arriving as a QR code by email and a SIM card by delivery. What governs the real answer is the address: the Immigration Services Agency requires your place of residence to be notified at the municipal office within 14 days of the day you decide on it, and until that address is printed on the card a resident application cannot be approved. With a dormitory place confirmed before you fly, the whole thing can be about a week from landing. Spend a fortnight viewing sharehouses first and it is three or four — which is the gap a travel eSIM covers. Read on ${CHECKED}.`,
  },
  {
    q: "Can students get a phone number in Japan?",
    a: `Yes. A student status for a stay of more than 90 days is a mid- to long-term residence, which means a residence card, and a residence card is what a resident plan verifies against. Sakura Mobile's resident Voice + Data product issues what its own page calls "normal Japanese phone numbers (070, 080, 090) that you can use to open your bank account and rent an apartment", published from ${VOICE_FROM}/month (¥3,278 tax included) with a one-month minimum. Two things to know. It is a genuine mobile number rather than an 050 VoIP one, which the company notes is "often rejected for banking and apps". And it is the separate Voice + Data product, not an add-on — the Data Only plan and every tourist eSIM we price carry no number at any price. Read on ${CHECKED}.`,
  },
  {
    q: "Is there a student discount on a Japanese SIM card?",
    a: `On Sakura Mobile's monthly plans, yes, and it is the one thing a student gets that no other long-stay reader does — but it is smaller and narrower than the phrase suggests. The published figure is an "Additional 1,100 JPY discount from activation fee", applied with the coupon code "studentdiscount", which takes the one-off ${ACTIVATION} activation fee down to ${ACTIVATION_AFTER}. The monthly price is unchanged, so across a six-month placement it is ${STUDENT_OFF} rather than a percentage off your bill. It is also not automatic: the document-submission step of the application has a box for uploading a student ID or other proof of student status, and the condition is the company's to apply. Read on ${CHECKED}.`,
  },
  {
    q: "How is this different from the eSIM guide for students?",
    a: `Different reader, different product. Our eSIM guide for students prices travel eSIMs by the study month in US dollars — Airalo, eSIM Go, Holafly and Sakura Mobile's travel plans — and it is the right page for a short exchange, a summer programme or a term that fits inside 90 days with no Japanese number needed. This page is for a student status longer than three months: a residence card exists, a resident monthly plan is available, and the numbers that decide it are in yen with a one-month minimum rather than in dollars per gigabyte. The dividing line is the 90-day ceiling every travel product in Japan is sold under, Sakura Mobile's own included. If you are not sure which side of it you are on, your course length decides. eSIM prices checked ${PRICES_CHECKED}.`,
  },
  {
    q: "How much data does a student need per month in Japan?",
    a: `It depends on one thing, and it is not how much you use your phone. With internet in your room — a dormitory line, or campus WiFi you are on all day — a phone-only month sits comfortably in the 15 GB tier, ¥3,480 on Voice + Data or ¥2,980 on Data Only. Without one, a laptop tethered for online classes and coursework pushes the same month towards the 60 GB tier at ¥6,980, which is roughly ¥21,000 more across six months. Sakura Mobile publishes both plans at 5, 15, 30, 40, 60, 80 and 100 GB and lets the tier be changed month to month through your account, so the sensible move is to sign at 15 GB, watch one month, and move up if it runs dry. Our home internet guide is worth reading before you pick rather than after. Read on ${CHECKED}.`,
  },
  {
    q: "What happens to the contract at the end of term?",
    a: 'You end it with a form, and the only thing that can cost you is the date. The published rule is "The minimum use is just one month. You can cancel anytime by submitting a request before the 25th" — and because the contract renews automatically each month rather than expiring, submitting on the 26th or later runs it one more month. That is not a penalty, it is one more month\'s fee, which is a small amount of money and an irritating one to pay from the other side of the world after you have flown home. Set the reminder on the day you sign up, not in the week you are shipping boxes.',
  },
  {
    q: "Can I use my own phone, or do I need to buy one in Japan?",
    a: "Your own, as long as your operator has actually released the carrier lock. A resident plan here is a SIM or an eSIM profile rather than a handset contract, which is the practical difference between it and the big Japanese carriers' offers, where the phone and the line are sold together on a tie-in. Japan's three networks run on bands that mainstream handsets sold in Europe, North America and Australia support. Two things to check before you fly rather than after: that the lock is off, and that the handset takes an eSIM if you intend to arrive on a travel profile — our iPhone and Android guides go through that model by model.",
  },
];

const TITLE = "Japan SIM Card for Students: Plans & Residence Card";
const DESCRIPTION =
  "Japan SIM Card for Students: Sakura Mobile's resident plans from ¥2,980 a month with a Japanese number, a ¥1,100 student discount and a 1–3 day start.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/esim/japan-sim-card-for-students") },
});

export default function JapanSimCardForStudentsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-sim-card-for-students" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-sim-card-for-students" />
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
              route: "/guides/esim/japan-sim-card-for-students",
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
                  name: "Japan SIM Card for Students",
                  item: "https://www.japan-travel-kit.com/guides/esim/japan-sim-card-for-students",
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
          <span className={styles.breadCurrent}>SIM Card for Students</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan SIM Card for Students:<br />Monthly Plans and the Residence Card
          </h1>
          <p className={styles.heroSubtitle}>
            For a student status longer than three months, the product is a resident monthly plan — and the
            one thing that gates it is an address printed on the back of a card you land without.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices, dated", "¥1,100 student discount", "One-month minimum"].map((t) => (
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
            This page is for the student staying in Japan <strong>longer than three months</strong> on a
            student status, who will hold a <strong>residence card</strong> — if your term is shorter than
            that and you need nothing but data, our{" "}
            <Link href="/guides/esim/japan-esim-students">eSIM guide for students</Link> prices travel plans
            by the study month instead. For a <strong>Japan SIM card for students</strong> on a longer
            placement the product is a resident monthly plan, and the English-language option we link is{" "}
            <strong>Sakura Mobile</strong>: Voice + Data from <strong>{VOICE_FROM}/month</strong> (¥3,278 tax
            incl.) with a Japanese <strong>070, 080 or 090</strong> number, Data Only from{" "}
            <strong>{DATA_FROM}/month</strong> (¥2,728 tax incl.), tiers of{" "}
            <strong>5 to 100 GB</strong>, a <strong>{ACTIVATION}</strong> activation fee —{" "}
            <strong>{ACTIVATION_AFTER}</strong> with the student coupon, worth <strong>{STUDENT_OFF}</strong>{" "}
            — and a <strong>minimum use of one month</strong>. To sign you need a Residence Card or My Number
            Card <strong>showing your current address</strong>, no Japanese bank account, and the line is
            ready <strong>about 1–3 days after approval</strong> (5–7 if you port a number in). The catch is
            the order: the card arrives at immigration with the address field blank, the Immigration Services
            Agency gives you <strong>14 days</strong> from deciding where you live to register it, and until
            then you are on a travel eSIM. All Sakura Mobile figures read off sakuramobile.jp on {CHECKED}.
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
                <p className={styles.verdictStatValue}>From {VOICE_FROM}/month</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Activation, with student coupon</p>
                <p className={styles.verdictStatValue}>{ACTIVATION_AFTER} once</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Ready after approval</p>
                <p className={styles.verdictStatValue}>About 1–3 days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Minimum term</p>
                <p className={styles.verdictStatValue}>One month, then rolling</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> land on a travel eSIM, because no resident application can be
              approved against a card with a blank address field. Register the address at the ward office,
              then sign Voice + Data if anything in your year will ask for a phone number — a bank, a
              landlord, a part-time job, a clinic — and Data Only if nothing will. Upload the student ID
              during the application: the {STUDENT_OFF} comes off the activation fee, not the monthly bill.
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
          <h2 className={styles.sectionTitle}>What Is the Best SIM Card for International Students in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            A resident monthly plan, once you hold a card with an address on it. The table is the argument:
            the two travel rows fail the phone-number test and the 90-day test, and the two resident rows
            fail the can-I-do-this-on-day-one test — which is why the answer for a study year is both of
            them, in that order.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Product", "Price", "Japanese number", "What you must show", "Term and ceiling"].map((h) => (
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
                      <td style={{ fontSize: "0.84rem" }}>{row.needs}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.term}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Every Sakura Mobile figure is the company&apos;s own, read off sakuramobile.jp on {CHECKED}; each
            monthly price is a published &ldquo;from&rdquo; and the tier you pick moves it. Tourist eSIM
            prices come from our daily feed, checked {PRICES_CHECKED}. No Klook price appears on this page:
            Klook blocks automated reads of its product pages. Our{" "}
            <Link href="/guides/esim/sakura-mobile-review" style={{ color: "var(--text)", fontWeight: 600 }}>
              Sakura Mobile review
            </Link>{" "}
            goes through the travel plans in detail, and{" "}
            <Link href="/guides/esim/japan-sim-card-long-term-stay" style={{ color: "var(--text)", fontWeight: 600 }}>
              SIM cards for a long stay
            </Link>{" "}
            is the version of this page for a posting rather than a placement.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              See Sakura Mobile monthly plans →
            </a>
          </div>
        </section>

        {/* Q2 — the tier grid, which is the decision after the product */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tiers</span>
          <h2 className={styles.sectionTitle}>How Much Data Does a Student Need Per Month?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Both resident plans are published at seven tiers, and the gap between the two price columns is
            ¥500 at every one of them — that ¥500 is the price of a Japanese phone number. The tier is
            changeable month to month through your account, so sign low and move up rather than guessing high.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Data", "Voice + Data /month (tax incl.)", "Data Only /month (tax incl.)", "Who it suits"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tierRows.map((row) => (
                    <tr key={row.gb}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.gb}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.voice}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.data}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.suits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Both plans carry the same {ACTIVATION} activation fee at every tier, and the student discount is
            an &ldquo;Additional 1,100 JPY discount from activation fee&rdquo; applied with the coupon code{" "}
            &ldquo;studentdiscount&rdquo; — so {ACTIVATION_AFTER} once, with the monthly price unchanged. The
            figure that decides the tier is not your phone habit: it is whether the room you live in has
            internet of its own. Without one, a laptop tethered for online classes turns a 15 GB month into a
            60 GB one, which is ¥6,980 against ¥3,480 and roughly ¥21,000 across six months — enough that our{" "}
            <Link href="/guides/esim/japan-home-internet-for-foreigners">home internet guide for foreigners</Link>{" "}
            is worth reading before you pick a tier rather than after. Tiers and prices read {CHECKED}.
          </p>
        </section>

        {/* Q3 — the documents. The part an AI answer does not finish. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Documents</span>
          <h2 className={styles.sectionTitle}>Do I Need a Residence Card to Get a SIM in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For a resident monthly plan, in practice yes. For a travel product, no — Sakura Mobile&apos;s own
            data-only travel eSIM states no ID verification is required at all. The detail that catches
            students out is not the card but the address printed on it.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["How you get it", "What it accepts", "The catch"].map((h) => (
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
            The sequencing is the Immigration Services Agency&apos;s rather than the carrier&apos;s. Its
            guidance on deciding or changing a place of residence is that you notify the municipal office of
            the municipality you live in <strong>within 14 days of the day you decide on it</strong>,
            presenting the residence card — or the passport, if yours was stamped &ldquo;Residence card to be
            issued later&rdquo; on entry. The address goes on the back of the card at that visit, and that is
            the moment a resident application becomes approvable. Nothing on this page is immigration advice,
            and your university&apos;s international office is the right place to ask about your own case; the
            rule above is quoted as the Agency publishes it, read on {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Klook eSIM options →
            </KlookLink>
            <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              See Sakura Mobile monthly plans →
            </a>
          </div>
        </section>

        {/* Q4 — timing */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>How Long Does It Take to Get a SIM After Arriving?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            About a week if your address is fixed before you fly, three or four if you are house-hunting
            first. The carrier is the fastest link in the chain, which is the opposite of what most people
            expect.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Stage", "How long", "What governs it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timingRows.map((row) => (
                    <tr key={row.stage}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.stage}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.howLong}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            There is one route that shortcuts the address entirely, and it is worth knowing before you book
            flights rather than after. Sakura Mobile sells the monthly plan on a pre-order you collect in
            person — &ldquo;Pick up at our airport counters or Shinjuku office&rdquo; — verified against a
            passport instead of a card. It has to be ordered in advance rather than walked up to, which is
            exactly the sort of decision an AI summary will not make for you: if your term starts the week you
            land and you need a number for enrolment, that is the version to arrange from home. Lead times and
            pickup wording read {CHECKED}.
          </p>
        </section>

        {/* Q5 — the bank account */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Bank accounts</span>
          <h2 className={styles.sectionTitle}>Can I Get a SIM Card in Japan Without a Bank Account?</h2>
          <p className={styles.bodyText}>
            Yes — and this is the clause that makes a monthly plan possible in your first fortnight rather
            than your second month. Sakura Mobile&apos;s monthly Voice page states the plan comes{" "}
            <strong>&ldquo;with no Japanese bank account required&rdquo;</strong>, and its resident plan guide
            says it again: &ldquo;You do not need a Japanese bank account or a local credit card.&rdquo;
          </p>
          <p className={styles.bodyText}>
            The dependency runs the other way round, which is the useful thing to know on arrival. Japan Post
            Bank&apos;s own page for foreign nationals asks for the <strong>residence card</strong> to be
            presented, requests a <strong>student ID</strong> from students, notes that a Japanese-speaking
            companion may be asked for, and states that an account <strong>cannot be opened</strong> where
            the period of stay expires <strong>within three months</strong> of the application date. So a
            placement of a year has room for this and a one-term exchange may not — and Sakura Mobile&apos;s
            claim for what its number is for is specifically &ldquo;to open your bank account and rent an
            apartment&rdquo;. Both read on {CHECKED}. We are quoting published conditions, not advising on
            your application; the bank and your university decide the rest.
          </p>
        </section>

        {/* Klook: the arrival gap this page keeps pointing at. */}
        <KlookTripPrep
          label="Before you fly"
          heading="What Covers the Weeks Before a Monthly Plan?"
          intro="A resident application needs a card showing an address you will not have on the day you land, so the first fortnight is a travel product by necessity rather than by choice. The eSIM is the only item here you can finish before leaving home, and there is nothing to cancel afterwards."
          items={studentSimArrivalPrep}
        />

        {/* Q6 — the number */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Phone numbers</span>
          <h2 className={styles.sectionTitle}>Can Students Get a Phone Number in Japan?</h2>
          <p className={styles.bodyText}>
            Yes, on the resident Voice + Data plan and only there. Sakura Mobile&apos;s own wording is worth
            quoting because it names what the number is for:{" "}
            <strong>
              &ldquo;All our phone numbers are normal Japanese phone numbers (070, 080, 090) that you can use
              to open your bank account and rent an apartment!&rdquo;
            </strong>{" "}
            It is a mobile number rather than an 050 VoIP one — a distinction the company draws itself,
            noting that 050 numbers are &ldquo;often rejected for banking and apps&rdquo;.
          </p>
          <p className={styles.bodyText}>
            Being concrete about the ¥500: Voice + Data is ¥500 a month more than Data Only at every tier, so
            ¥3,000 across a six-month placement and ¥6,000 across a year. What that buys is the set of things
            a study year runs into whether you planned for them or not — a part-time job application that
            asks for a mobile number on the form and is answered by a phone call, a clinic registration, a
            parcel redelivery slot, a sharehouse manager, and the SMS codes that Japanese online services
            send and nothing else. Data Only earns its place for a placement with no work and no tenancy in
            it. If the number is the whole reason you are here, our{" "}
            <Link href="/guides/esim/japan-phone-number-for-foreigners">
              guide to getting a Japanese phone number as a foreigner
            </Link>{" "}
            compares every route that carries one. Read on {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              See Sakura Mobile Voice + Data plans →
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
            <Link href="/guides/esim/japan-sim-card-long-term-stay" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M9 18h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan SIM Card for Long Term Stay: 90+ Day Plans</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            <Link href="/guides/esim/japan-esim-android" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="3" width="12" height="18" rx="2" />
                  <path d="M10 6h4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan on Android (2026): Picks and Setup</p>
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
            <h2 className={styles.ctaBannerTitle}>Arrive on an eSIM, then sign the monthly plan</h2>
            <p className={styles.ctaBannerDesc}>
              A travel eSIM for the fortnight between landing and a registered address, then Voice + Data from{" "}
              {VOICE_FROM}/month with a Japanese number, a one-month minimum and {ACTIVATION_AFTER} activation
              with the student coupon. Remember the 25th when the term ends.
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
