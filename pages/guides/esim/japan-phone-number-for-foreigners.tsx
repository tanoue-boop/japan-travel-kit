import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { klookEsim, phoneNumberDataPrep } from "../../../lib/klook-links";
import { siteCheapestFrom, pricesCheckedLabel } from "../../../lib/esim-prices";
import { esimSpec, SPECS_CHECKED_AT } from "../../../lib/esim-specs";
import { wiseLink, WISE_REL, WISE_VERIFIED } from "../../../lib/wise-links";

/**
 * Japan Phone Number for Foreigners — written 30 Oct 2026 for the exact phrase.
 *
 * The question behind the search is not "which eSIM is cheapest". It is a
 * yes-or-no about a thing a traveller assumes comes with a SIM and does not: a
 * Japanese 070, 080 or 090 number that a bank, a landlord, a delivery company or
 * a LINE registration can use. GSC shows "japan esim with phone number" at 19
 * impressions and position 5.47 with no page on this site written for it, so this
 * one answers it directly and the eSIM comparison pages link into it.
 *
 * It is deliberately narrower than the three resident-plan pages around it:
 *
 *   japan-sim-card-long-term-stay.tsx owns the resident-versus-travel argument
 *   for 90+ day stays; japan-sim-card-working-holiday.tsx owns the
 *   working-holiday sequence; japan-sim-card-for-students.tsx (30 Oct 2026) owns
 *   the student status and the ¥1,100 activation-fee discount.
 *
 * What is only here is the number itself: which products carry one and which do
 * not, 070/080/090 against 050 VoIP, the prepaid Voice + Data travel eSIM as the
 * one route that does not need a residence card, and what the number is and is
 * not required for — including the bank-account question, where Japan Post Bank's
 * own published conditions name a residence card and a period of stay but not a
 * phone number.
 *
 * Sources, all read on 30 October 2026:
 *
 *   www.sakuramobile.jp/monthly/voice/   "All our phone numbers are normal
 *                                        Japanese phone numbers (070, 080, 090)
 *                                        that you can use to open your bank
 *                                        account and rent an apartment!"; "with no
 *                                        Japanese bank account required";
 *                                        "Month-to-month with no lock-in"; the
 *                                        three accepted documents, and the
 *                                        passport route for anyone with no
 *                                        registered Japanese address; "Pick up at
 *                                        our airport counters or Shinjuku office"
 *   www.sakuramobile.jp/monthly/price/   the tier grid for Voice + Data and Data
 *                                        Only, 5 GB to 100 GB, and the 5,500 JPY
 *                                        activation fee on every tier
 *   www.sakuramobile.jp/travel/esim/     the travel eSIM, 1 to 90 days, from 1,250
 *                                        JPY (1,375 JPY, tax incl.), data only
 *                                        with no ID verification — and the
 *                                        separate prepaid Voice + Data eSIM, which
 *                                        "also gives you a Japanese phone number",
 *                                        includes domestic calls and SMS with
 *                                        allowances from "up to 120 min" on the
 *                                        shorter plans to "up to 480 min" at 61+
 *                                        days, and requires in-person ID
 *                                        verification at an airport counter or the
 *                                        Shinjuku office
 *   www.sakuramobile.jp/blog/plan-guides/sakura-mobile-japan-voice-and-data-sim-guide-the-essential-resident-plan-for-expats-students/
 *                                        the "070, 080, or 090" number against an
 *                                        050 VoIP one, which the company says is
 *                                        "often rejected for banking and apps";
 *                                        "The minimum use is just one month. You
 *                                        can cancel anytime by submitting a request
 *                                        before the 25th."; standard orders "Ready
 *                                        in about 1-3 days after approval" and MNP
 *                                        transfers about "5-7 days"
 *   www.jp-bank.japanpost.jp/kaisetu/kat_gaikokujin.html
 *                                        presentation of the residence card is
 *                                        requested; no account where the period of
 *                                        stay expires within three months of the
 *                                        application date; a student or employee ID
 *                                        is requested; a Japanese-speaking
 *                                        companion may be asked for; the bankbook
 *                                        may be posted rather than issued same-day
 *   www.moj.go.jp/isa/ (Immigration Services Agency, "When you decide or change the
 *   place of residence")                 notify the place of residence at the
 *                                        municipal office within 14 days of the day
 *                                        it is decided, presenting the residence
 *                                        card
 *
 * The four tourist providers' phone-number clauses come from lib/esim-specs.ts,
 * read off their own pages on its own check date, and their prices from
 * data/esim-prices.json, re-read daily. The Wise figures come from
 * lib/wise-links.ts with its own check date. No Klook price appears anywhere —
 * Klook answers automated reads of its product pages with HTTP 403.
 *
 * Nothing here is first-hand and nothing here is immigration or banking advice.
 * Where a company or an agency publishes a rule we quote it with the date we read
 * it; where a "from" price is published we label it as one.
 */

/** The date every figure and rule on this page was read off its own source. */
const CHECKED = "30 Oct 2026";

/** Sakura Mobile's own affiliate link — the same one the review page uses. */
const SAKURA_AFFILIATE = "https://p.sakuramobile.jp/idevaffiliate.php?id=486";
/** Sakura is its own programme, not Klook's; same rel as the review page. */
const SAKURA_REL = "sponsored noopener noreferrer nofollow";

/** Wise, with this page's own Partnerize reporting key. */
const WISE_CTA = wiseLink("japan-phone-number-for-foreigners");

const VOICE_FROM = "¥2,980";
const DATA_FROM = "¥2,480";
const ACTIVATION = "¥5,500";

const CHEAPEST_ESIM_FROM = siteCheapestFrom();
const PRICES_CHECKED = pricesCheckedLabel();

/**
 * The whole page in one table: which products carry a Japanese number, what each
 * one demands before it will issue one, and how long you are tied in. The three
 * "No" rows are here because they are what most readers have already bought.
 */
const numberRows = [
  {
    product: "Sakura Mobile Voice + Data monthly (resident)",
    number: "Yes — a 070, 080 or 090 mobile number",
    card: "Yes for an eSIM by email or a SIM by delivery: a Residence Card or My Number Card showing your current address. No, if you collect in person — the company offers passport verification at an airport counter or its Shinjuku office",
    term: 'Minimum use one month, then rolling; published as "Month-to-month with no lock-in"',
    price: `From ${VOICE_FROM}/month (¥3,278 tax incl.) plus a ${ACTIVATION} activation fee`,
  },
  {
    product: "Sakura Mobile prepaid Voice + Data travel eSIM",
    number: "Yes — the listing states it “also gives you a Japanese phone number”, with domestic calls and SMS",
    card: "No — but in-person ID verification is required, at a select airport counter or the Shinjuku office",
    term: "1 to 90 days, the ceiling on every travel product in Japan; nothing to cancel",
    price: "Priced separately from the data-only travel eSIM, which is from ¥1,250 (¥1,375 tax incl.) — we quote no figure for the voice version because the company publishes none we could read",
  },
  {
    product: "Sakura Mobile Data Only monthly (resident)",
    number: "No",
    card: "Same documents as the Voice + Data monthly plan",
    term: "One month minimum, then rolling",
    price: `From ${DATA_FROM}/month (¥2,728 tax incl.) plus the same ${ACTIVATION} activation fee`,
  },
  {
    product: "Sakura Mobile data-only travel eSIM",
    number: "No",
    card: "No — the listing states no ID verification is required",
    term: "1 to 90 days",
    price: "From ¥1,250 (¥1,375 tax incl.)",
  },
  {
    product: "Klook Japan eSIM",
    number: `${klookEsim.specPhoneNumber} — as the listing states it`,
    card: "No",
    term: "Sold by the day; nothing to cancel",
    price: "Check on Klook — its product pages block automated price reads, so we quote none",
  },
  {
    product: "Airalo, Holafly and eSIM Go Japan plans",
    number: `${esimSpec("airalo").phoneNumberShort} — all three, on their own pages`,
    card: "No",
    term: "Plan lengths run in days; no contract",
    price: `From ${CHEAPEST_ESIM_FROM} across the four providers we price`,
  },
];

/**
 * What the number is actually needed for, which is the question under the
 * question — and the one place this page is careful to separate a published
 * requirement from a thing that is merely difficult without one.
 */
const useRows = [
  {
    task: "Opening a Japan Post Bank account",
    published:
      "Its page for foreign nationals asks for the residence card to be presented and states an account cannot be opened where your period of stay expires within three months of the application date. A student or employee ID is requested from students and employees, a Japanese-speaking companion may be asked for, and the bankbook may be posted rather than handed over.",
    verdict:
      "A phone number is not among the published conditions. Sakura Mobile's own claim for its number is that you “can use” it “to open your bank account”, which is a different statement from a bank requiring one — treat the number as the thing that makes the form fillable rather than as a legal precondition.",
  },
  {
    task: "Registering your address at the ward or city office",
    published:
      "The Immigration Services Agency requires the place of residence to be notified at the municipal office within 14 days of the day you decide on it, presenting the residence card.",
    verdict:
      "No phone number in the rule. But this is the step that puts an address on the card, and the address is what a resident phone plan verifies against — so the paperwork comes before the number, not after it.",
  },
  {
    task: "Renting a flat or a sharehouse room",
    published:
      "Sakura Mobile states its numbers are ones “you can use to open your bank account and rent an apartment”.",
    verdict:
      "Letting agents and guarantor companies in Japan contact applicants by phone, and the application forms have a mobile field. We quote no agency's own rule here because there is no single published one to quote.",
  },
  {
    task: "A part-time job application",
    published: "Nothing published centrally — this one varies by employer.",
    verdict:
      "In practice the form asks for a mobile number and the answer arrives as a phone call, often the same week, which is why a data-only plan makes a job search slower rather than impossible.",
  },
  {
    task: "SMS verification codes from Japanese services",
    published: "Nothing published centrally.",
    verdict:
      "This is where a data-only plan hurts most predictably: a one-time code sent to a mobile number cannot arrive on a plan that carries no number and no SMS. A number you already hold abroad may receive it, but not every Japanese service will send to an international one.",
  },
  {
    task: "An 050 internet-telephony number instead",
    published:
      "Sakura Mobile draws the distinction itself: a 070, 080 or 090 number supports calls, SMS and emergency services “unlike 050 VoIP numbers, which are often rejected for banking and apps”.",
    verdict:
      "Cheap and quick to get, and genuinely useful as a callback line. Not a substitute where the thing you are signing up to checks the prefix — which, on the company's own account of it, is often.",
  },
];

const steps = [
  {
    title: "Work out whether you need a number at all, before you buy anything",
    desc: `If the trip is a holiday and the list is maps, messaging, translation and email, the answer is no, and a data eSIM from ${CHEAPEST_ESIM_FROM} across the providers we price is the cheapest way to have all four working on landing. If anything on your list is a bank, a tenancy, a job, a clinic or a Japanese SMS code, the answer is yes and the rest of these steps apply.`,
  },
  {
    title: "Check whether you will hold a residence card",
    desc: "This is the fork. A mid- to long-term status — work, study, a working holiday, a family stay — comes with a residence card, which is what a resident monthly plan verifies against. A short-stay visitor status does not, and no amount of paying more changes that.",
  },
  {
    title: "If you have no card: use the in-person route, and arrange it from home",
    desc: 'Sakura Mobile sells both the monthly Voice + Data plan and a prepaid Voice + Data travel eSIM on pre-orders you verify in person — "Pick up at our airport counters or Shinjuku office" — with a passport instead of a card. The in-person step is the whole point of the route, so it has to be booked in advance rather than walked up to on arrival.',
  },
  {
    title: "If you have a card: register the address first, then apply",
    desc: "The Immigration Services Agency gives you 14 days from deciding where you live to notify the municipal office, presenting the card; the address is printed on the reverse at that visit. Applying before that is the single most common reason a resident application stalls, because the card you are uploading does not yet show where you live.",
  },
  {
    title: "Pick Voice + Data over Data Only, and know what the ¥500 buys",
    desc: `The two resident plans are ¥500 a month apart at every tier — ${VOICE_FROM} against ${DATA_FROM} at 5 GB, ¥10,980 against ¥10,480 at 100 GB. That is ¥6,000 across a year for a line that can be rung. If you are reading this page at all, you have already decided you need that.`,
  },
  {
    title: "Allow 1–3 days after approval, and 5–7 if you are porting a number",
    desc: "Sakura Mobile's own figures. The eSIM arrives as a QR by email and a SIM card by delivery, so the carrier is the fast part; an MNP transfer needs a reservation number from your existing carrier before you apply, which is what stretches it. Neither figure includes the days the address registration takes.",
  },
  {
    title: "Note the 25th on the day you sign up",
    desc: 'The published rule is "The minimum use is just one month. You can cancel anytime by submitting a request before the 25th." Submit on the 26th or later and the contract runs one more month, because it renews automatically rather than expiring. Not a penalty — one more month\'s fee, from the other side of the world.',
  },
];

const faqItems = [
  {
    q: "Can a foreigner get a Japanese phone number?",
    a: `Yes, and there are two routes — the difference between them is a residence card. With one, a resident monthly plan is the normal answer: Sakura Mobile's Voice + Data SIM or eSIM is published from ${VOICE_FROM}/month (¥3,278 tax included) with a ${ACTIVATION} activation fee, a minimum use of one month, and what its own page calls "normal Japanese phone numbers (070, 080, 090) that you can use to open your bank account and rent an apartment". It verifies against a Residence Card or My Number Card showing your current address. Without a card there is still a route: the company offers passport verification in person, and sells a prepaid Voice + Data travel eSIM that "also gives you a Japanese phone number", collected at a select airport counter or its Shinjuku office. What does not work is upgrading a data-only plan — the number comes on a separate product, not as an add-on. Read on ${CHECKED}.`,
  },
  {
    q: "Does a travel eSIM come with a Japanese phone number?",
    a: `Almost never, and this is the single most common surprise in Japan travel planning. Every Japan plan from the four providers we track is data only: eSIM Go's plans state "No SMS or voice calls included. Data only."; Airalo's Japan plans are data only; Holafly's Japan page states there is no local phone number; and the Klook Japan eSIM listing states the service type is data only. Sakura Mobile is the exception and only on a specific product — its data-only travel eSIM carries no number, while its separate prepaid Voice + Data travel eSIM does, with domestic calls and SMS and an allowance the listing puts at up to 120 minutes on the shorter plans rising to up to 480 minutes at 61 days and over. That one requires in-person ID verification. Provider clauses read ${SPECS_CHECKED_AT}; Sakura Mobile read ${CHECKED}.`,
  },
  {
    q: "Do I need a Japanese phone number to open a bank account?",
    a: `Not according to the published conditions, which is worth knowing before you panic about the order. Japan Post Bank's own page for foreign nationals asks for the residence card to be presented, requests a student or employee ID from students and employees, notes that a Japanese-speaking companion may be asked for and that the bankbook may be posted rather than issued on the day, and states plainly that an account cannot be opened where your period of stay expires within three months of the application date. A phone number is not in that list. What is true is that Sakura Mobile advertises its number as one you "can use to open your bank account", that application forms have a contact-number field, and that a bank which cannot reach you is a bank that takes longer. Different banks publish different conditions, so check your own branch — this is a quote, not advice. Read on ${CHECKED}.`,
  },
  {
    q: "How much does a Japanese phone number cost per month?",
    a: `On Sakura Mobile's resident plans, ¥500 a month more than the same plan without one, at every tier. The Voice + Data grid is published at ${VOICE_FROM} for 5 GB, ¥3,480 for 15 GB, ¥3,980 for 30 GB, ¥4,980 for 40 GB, ¥6,980 for 60 GB, ¥8,980 for 80 GB and ¥10,980 for 100 GB; Data Only runs ${DATA_FROM}, ¥2,980, ¥3,480, ¥4,480, ¥6,480, ¥8,480 and ¥10,480 against those. Add a one-off ${ACTIVATION} activation fee on either, and note that calls and SMS are charged on top of the monthly fee rather than included on the resident plan. So the number itself is ¥500 a month — ¥6,000 across a year — and the data tier is the part that actually moves your bill. Prices read on ${CHECKED}.`,
  },
  {
    q: "Can tourists get a Japanese phone number?",
    a: `Yes, but not on the product most tourists buy. A short-stay visitor status does not come with a residence card, so the resident monthly plans are out — and every data eSIM, Sakura Mobile's own included, carries no number. The route that is open is the prepaid Voice + Data travel eSIM: sold for 1 to 90 days with domestic calls and SMS, and verified in person with a passport at a select airport counter or the Shinjuku office rather than against a card. Two honest caveats. It has to be pre-ordered, because the in-person verification is the mechanism rather than an inconvenience. And for most holidays it is unnecessary: restaurant bookings, hotels and taxis in Japan are reachable through apps and your hotel's front desk, and a data plan carries messaging and internet calls. Read on ${CHECKED}.`,
  },
  {
    q: "Can I keep my home number and add a Japanese one?",
    a: "On a dual-SIM handset, yes, and it is the arrangement most long-stay residents settle on. Your home SIM — or its eSIM profile — stays in the phone for the number your family and your home bank already know, with data roaming switched off so it cannot connect by accident, while the Japanese line carries the data and the Japanese number. Set the Japanese line as the default for data and for outgoing calls inside Japan. If the handset takes only one SIM you are choosing, and for a stay of several months the Japanese number is usually the one worth having on it. Our iPhone and Android guides cover where the dual-SIM settings live, model by model.",
  },
  {
    q: "What is the difference between a 070/080/090 number and an 050 one?",
    a: 'Which services will accept it. Sakura Mobile draws the line itself: a 070, 080 or 090 number is a mobile number supporting calls, SMS and emergency services, "unlike 050 VoIP numbers, which are often rejected for banking and apps". An 050 number is internet telephony — quick to get, cheap, no residence card, and perfectly good as a line someone can ring you back on. What it is not is interchangeable: where the thing you are signing up to validates the prefix, or sends an SMS code, a 050 number can fail in a way that is hard to diagnose because the form simply refuses it. If the number exists to unblock a bank, a tenancy or a Japanese app, get the mobile one.',
  },
  {
    q: "How long until the number is live?",
    a: `Sakura Mobile puts a standard monthly order at about 1–3 days after approval, and about 5–7 days if you are porting an existing number in by MNP, which also needs a reservation number from your current carrier before you apply. The eSIM arrives as a QR code by email and a SIM card by delivery. What those figures do not include is the step in front of them: if you are verifying against a residence card, the Immigration Services Agency's 14-day window for notifying your address at the municipal office sits before the application, because the card has to show where you live. With an address already fixed, about a week from landing is realistic; house-hunting first makes it three or four. Read on ${CHECKED}.`,
  },
  {
    q: "Do I need a Japanese number for LINE?",
    a: `Not necessarily — LINE registers against a mobile number that can receive an SMS code, and that number does not have to be a Japanese one. The practical problem is the reverse of what people expect: if you register on a foreign number and later want to move the account onto a Japanese one, or you arrive on a data-only eSIM that can receive no SMS at all, you are stuck at the verification step with no way through it. So the sequence that works is to set the account up before you fly, on a number that still works, and to treat a Japanese number as something you add for banks, landlords and employers rather than for messaging. Nothing on this is quoted from LINE's own terms, which is why there is no figure or date attached to it.`,
  },
  {
    q: "What should I do about money while I have no Japanese bank account?",
    a: `Use a card that does not need one. Japan Post Bank's conditions put a residence card and a period of stay of more than three months in front of an account, so for the first weeks — and for a shorter trip, for all of it — a multi-currency card is the practical answer. Wise converts at what it describes as "${WISE_VERIFIED.rateClaim}" and publishes free ATM withdrawals up to ${WISE_VERIFIED.freeAtmUk} on a UK-registered account, with ${WISE_VERIFIED.overAtmFeeUk} above that; allowances differ by the country your account is registered in, so check yours. Our travel card and ATM guides compare it against the alternatives. Wise figures read ${WISE_VERIFIED.checkedAt}; Japan Post Bank read ${CHECKED}.`,
  },
];

const TITLE = "Japan Phone Number for Foreigners: 070/080/090 Plans";
const DESCRIPTION =
  "Japan Phone Number for Foreigners: travel eSIMs carry none. A Sakura Mobile voice plan from ¥2,980 a month gives a 070, 080 or 090 number in 1–3 days.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/esim/japan-phone-number-for-foreigners") },
});

export default function JapanPhoneNumberForForeignersPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-phone-number-for-foreigners" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-phone-number-for-foreigners" />
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
              route: "/guides/esim/japan-phone-number-for-foreigners",
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
                  name: "Japan Phone Number for Foreigners",
                  item: "https://www.japan-travel-kit.com/guides/esim/japan-phone-number-for-foreigners",
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
          <span className={styles.breadCurrent}>Japanese Phone Number</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan Phone Number for Foreigners:<br />Which Plans Actually Carry One
          </h1>
          <p className={styles.heroSubtitle}>
            Almost every Japan eSIM sold to travellers is data only, and no amount of paying more adds a
            number to it. There are exactly two routes that do — and one of them needs a residence card.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "070 / 080 / 090 explained", "Official rules, dated", "Residence card or passport"].map((t) => (
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
            A <strong>Japan phone number for foreigners</strong> does not come with a traveller&apos;s data
            eSIM: every Japan plan from the four providers we track is <strong>data only</strong>, and the
            number is a separate product rather than an add-on. Two routes carry one. With a{" "}
            <strong>residence card</strong>, the resident monthly plan — Sakura Mobile&apos;s Voice + Data SIM
            or eSIM from <strong>{VOICE_FROM}/month</strong> (¥3,278 tax incl.) plus a{" "}
            <strong>{ACTIVATION}</strong> activation fee, with a genuine{" "}
            <strong>070, 080 or 090</strong> mobile number, a <strong>one-month minimum</strong> and the line
            ready <strong>about 1–3 days after approval</strong> (5–7 if you port a number in). Without a
            card, the in-person route: Sakura Mobile verifies with a <strong>passport</strong> at an airport
            counter or its Shinjuku office, and sells a prepaid <strong>Voice + Data travel eSIM</strong> for{" "}
            <strong>1 to 90 days</strong> that includes domestic calls and SMS. What a number is not is a
            published requirement for a bank account — Japan Post Bank asks for a residence card and a period
            of stay longer than three months, and names no phone number at all. All Sakura Mobile and Japan
            Post Bank figures read on {CHECKED}.
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
                <p className={styles.verdictStatLabel}>Number on a travel data eSIM</p>
                <p className={styles.verdictStatValue}>No, on all four</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Resident voice plan</p>
                <p className={styles.verdictStatValue}>From {VOICE_FROM}/month</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Ready after approval</p>
                <p className={styles.verdictStatValue}>About 1–3 days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>No residence card?</p>
                <p className={styles.verdictStatValue}>Passport, in person</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> if the trip is a holiday and the list is maps, messaging and
              translation, buy a data eSIM and stop reading — you do not need a number. If the list includes a
              bank, a tenancy, a job or a Japanese SMS code, you need the Voice + Data product, and which
              version depends on one thing: whether your status comes with a residence card.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.verdictBtn}>
                See Sakura Mobile voice plans →
              </a>
              <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Klook eSIM (data only) →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Q1 — the table the page exists for */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Can a Foreigner Get a Japanese Phone Number?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes — on two of the six products below, and the column that decides which one applies to you is
            the residence card. Everything else on the row is the price of that decision.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Product", "Japanese number?", "Residence card needed?", "Term", "Price"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {numberRows.map((row) => (
                    <tr key={row.product}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.product}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.number}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.card}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.term}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.84rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Sakura Mobile figures are the company&apos;s own, read off sakuramobile.jp on {CHECKED}; each
            monthly price is a published &ldquo;from&rdquo; and the data tier moves it. The Airalo, Holafly and
            eSIM Go phone-number clauses come from their own pages, {SPECS_CHECKED_AT}, and their prices from
            our daily feed, checked {PRICES_CHECKED}. The Klook row quotes its listing&apos;s own stated
            service type; no Klook price appears anywhere on this site because Klook blocks automated reads of
            its product pages. Our{" "}
            <Link href="/guides/esim/sakura-mobile-review" style={{ color: "var(--text)", fontWeight: 600 }}>
              Sakura Mobile review
            </Link>{" "}
            goes through the travel plans in detail, and{" "}
            <Link href="/guides/esim/japan-sim-card-vs-esim-2026" style={{ color: "var(--text)", fontWeight: 600 }}>
              SIM card vs eSIM
            </Link>{" "}
            is the version of this comparison for a two-week trip.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              See Sakura Mobile voice plans →
            </a>
          </div>
        </section>

        {/* Q2 — the travel eSIM question, which is how most readers arrive here */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Travel eSIMs</span>
          <h2 className={styles.sectionTitle}>Does a Travel eSIM Come With a Japanese Phone Number?</h2>
          <p className={styles.bodyText}>
            No, with one narrow exception. The four providers we price publish this plainly on their own
            pages: eSIM Go&apos;s Japan plans state{" "}
            <strong>&ldquo;No SMS or voice calls included. Data only.&rdquo;</strong>; Airalo&apos;s Japan
            plans are data only; Holafly&apos;s Japan page states there is no local phone number; and the
            Klook Japan eSIM listing gives its service type as <strong>{klookEsim.specPhoneNumber}</strong>.
            So does Sakura Mobile&apos;s own data-only travel eSIM, which is from ¥1,250 (¥1,375 tax incl.)
            for 1 to 90 days and states that no ID verification is required.
          </p>
          <p className={styles.bodyText}>
            The exception is a different product from the same company: a prepaid{" "}
            <strong>Voice + Data travel eSIM</strong>, which the travel page says{" "}
            &ldquo;also gives you a Japanese phone number&rdquo; and sells with domestic calls and SMS —
            allowances the listing puts at up to 120 minutes on the shorter stays, rising to up to 480 minutes
            at 61 days and over. The thing to plan around is not the price but the process:{" "}
            <strong>in-person ID verification is required</strong>, at a select airport counter or the
            Shinjuku office. That makes it a pre-order rather than a download, which is precisely the kind of
            detail an AI summary will tell you exists and will not tell you to arrange before you fly.
          </p>
          <p className={styles.bodyText}>
            If you have read this far and concluded that maps, messaging, translation and email are the whole
            of your list — which for most holidays they are — then a data eSIM is the right and much cheaper
            answer. Our{" "}
            <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> ranks them on today&apos;s
            prices, and{" "}
            <Link href="/guides/esim/does-esim-work-in-japan">does eSIM work in Japan</Link> covers the
            handset checks to make before buying one. Provider clauses read {SPECS_CHECKED_AT}; Sakura Mobile
            read {CHECKED}; prices checked {PRICES_CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Klook eSIM options →
            </KlookLink>
            <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              See Sakura Mobile plans →
            </a>
          </div>
        </section>

        {/* Q3 — what the number is for, published versus practical */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What it unlocks</span>
          <h2 className={styles.sectionTitle}>Do I Need a Japanese Phone Number to Open a Bank Account?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Not according to any condition we could find published. The table separates what an institution
            actually states in writing from what is merely difficult without a number, because the two get
            run together everywhere else and they are not the same thing.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What you are trying to do", `What is published (read ${CHECKED})`, "What that means in practice"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {useRows.map((row) => (
                    <tr key={row.task}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.task}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.published}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            One thing worth saying plainly, because it is the actual shape of the problem: the bank&apos;s
            published gate is not a phone number, it is a <strong>residence card</strong> and a{" "}
            <strong>period of stay that does not expire within three months</strong> of the application date.
            Different banks publish different conditions and branches apply them differently, so treat the
            above as quotations rather than as advice about your own application. Nothing on this page is
            banking or immigration advice.
          </p>
        </section>

        {/* Money, for the weeks with no Japanese account — the Wise slot. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before the account exists</span>
          <h2 className={styles.sectionTitle}>What Do You Use Instead of a Japanese Bank Account?</h2>
          <p className={styles.bodyText}>
            A card that does not need one. Since the bank&apos;s own gate is a residence card and a period of
            stay longer than three months, there is a stretch at the start of every long stay — and the whole
            of every short one — where a Japanese account is simply not available. A multi-currency card
            covers it: <strong>Wise</strong> converts at what it describes as &ldquo;
            {WISE_VERIFIED.rateClaim}&rdquo;, and publishes free ATM withdrawals up to{" "}
            <strong>{WISE_VERIFIED.freeAtmUk}</strong> on a UK-registered account with{" "}
            <strong>{WISE_VERIFIED.overAtmFeeUk}</strong> above that allowance. Allowances differ by the
            country your account is registered in, so read yours rather than ours. Figures read{" "}
            {WISE_VERIFIED.checkedAt}.
          </p>
          <p className={styles.bodyText}>
            It is not a replacement for a Japanese account if you are being paid by a Japanese employer —
            payroll goes to a domestic account, and that is the thing the residence card unlocks. It is a
            replacement for carrying a month of cash while you wait. Our{" "}
            <Link href="/guides/money/best-travel-card-japan">best travel card for Japan</Link> guide compares
            it against the alternatives on fees, and{" "}
            <Link href="/guides/money/atms-in-japan">ATMs in Japan</Link> covers which machines take foreign
            cards at all.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={WISE_CTA} target="_blank" rel={WISE_REL} className={styles.pickCta}>
              See Wise&apos;s current fees →
            </a>
          </div>
        </section>

        {/* Q4 — the price of the number */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Cost</span>
          <h2 className={styles.sectionTitle}>How Much Does a Japanese Phone Number Cost Per Month?</h2>
          <p className={styles.bodyText}>
            <strong>¥500 a month</strong>, as cleanly as that question is ever answered. Sakura Mobile
            publishes its two resident plans side by side at seven identical data tiers, and the Voice + Data
            column is ¥500 above the Data Only column at every single one: {VOICE_FROM} against {DATA_FROM} at
            5 GB, ¥3,480 against ¥2,980 at 15 GB, ¥3,980 against ¥3,480 at 30 GB, ¥4,980 against ¥4,480 at
            40 GB, ¥6,980 against ¥6,480 at 60 GB, ¥8,980 against ¥8,480 at 80 GB and ¥10,980 against ¥10,480
            at 100 GB. Across a year that is ¥6,000.
          </p>
          <p className={styles.bodyText}>
            Two things sit outside that figure. There is a <strong>{ACTIVATION}</strong> activation fee on
            every tier of both plans, charged once — and if you are a student, the company publishes an
            &ldquo;Additional 1,100 JPY discount from activation fee&rdquo; with the coupon code
            &ldquo;studentdiscount&rdquo;, which our{" "}
            <Link href="/guides/esim/japan-sim-card-for-students">SIM card guide for students</Link> goes
            through. And calls and SMS on the resident plan are charged on top of the monthly fee rather than
            bundled into it, so a line used heavily for voice costs more than the grid suggests. The data tier
            is still the part that moves your bill most: 15 GB to 60 GB is ¥3,500 a month, seven times the
            price of the number itself. All read {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              See Sakura Mobile Voice + Data plans →
            </a>
          </div>
        </section>

        {/* Q5 — tourists */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tourists</span>
          <h2 className={styles.sectionTitle}>Can Tourists Get a Japanese Phone Number?</h2>
          <p className={styles.bodyText}>
            Yes, but not on the product almost every tourist buys. A short-stay visitor status does not come
            with a residence card, which closes the resident monthly plans — and the data eSIM you bought
            before flying carries no number at any price. The route that stays open is the prepaid{" "}
            <strong>Voice + Data travel eSIM</strong>, sold for 1 to 90 days with domestic calls and SMS and
            verified against a <strong>passport in person</strong> at a select airport counter or the Shinjuku
            office. The monthly plan has the same passport route for anyone with no registered Japanese
            address.
          </p>
          <p className={styles.bodyText}>
            The honest version of the advice, though, is that most holidays do not need one. Hotels, tours and
            restaurant bookings in Japan are reachable through apps, your accommodation&apos;s front desk and
            email; a data plan carries messaging, internet calls and translation. The cases where a tourist
            genuinely wants a number are narrow and specific — a long trip with domestic bookings made by
            phone, a work visit with Japanese colleagues who will ring you, a stay where someone has to be
            able to reach you without wifi. If that is you, pre-order it before you fly, because the in-person
            verification is the mechanism and not an inconvenience you can skip on arrival. Read{" "}
            {CHECKED}.
          </p>
        </section>

        {/* Klook: the honest slot for the reader who worked out they do not need a number. */}
        <KlookTripPrep
          label="If data is all you need"
          heading="What If You Only Need Data After All?"
          intro="Most people who search for a Japanese phone number turn out to need maps, messaging and translation rather than a line anyone will ring. If that is the conclusion you have reached on this page, the cheapest way to have all three working the moment you land is a data eSIM installed before you fly."
          items={phoneNumberDataPrep}
        />

        {/* How to do it */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How Do You Get a Japanese Number, In Order?</h2>
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
              See Sakura Mobile voice plans →
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
            <Link href="/guides/esim/does-esim-work-in-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h.01" />
                  <path d="M5 13a10 10 0 0 1 14 0M8.5 16.5a6 6 0 0 1 7 0M2 9.5a15 15 0 0 1 20 0" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Does eSIM Work in Japan? Everything You Need to Know</p>
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
            <Link href="/guides/esim/japan-esim-business" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan for Business Travel (2026)</p>
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
            <h2 className={styles.ctaBannerTitle}>The number is a separate product — pick the right one</h2>
            <p className={styles.ctaBannerDesc}>
              With a residence card, Voice + Data from {VOICE_FROM}/month and a 070, 080 or 090 number, ready
              about 1–3 days after approval. Without one, the passport route in person. And if data is all you
              actually need, an eSIM installed before you fly costs a fraction of either.
            </p>
            <div className={styles.pickCtaRow}>
              <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.ctaBannerBtn}>
                View Sakura Mobile voice plans →
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
