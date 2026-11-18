import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd, productOfferJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { japanTravelInsuranceTripPrep } from "../../../lib/klook-links";

// SafetyWing is the only approved insurance affiliate. Heymondo and World Nomads stay plain.
const SAFETYWING_URL = "https://safetywing.com/nomad-insurance?referenceID=26614156&utm_source=26614156&utm_medium=Ambassador";
const HEYMONDO_URL = "https://heymondo.com/";
const WORLDNOMADS_URL = "https://www.worldnomads.com/";

const SPONSORED_REL = "sponsored nofollow noopener noreferrer";
const PLAIN_REL = "noopener noreferrer nofollow";

/**
 * Rebuilt 6 Nov 2026 (task jtk-20261106-A24) around the queries in Search Console: "japan
 * travel insurance", "travel insurance japan", "best travel insurance for japan" and "how much
 * is travel insurance to japan" drew over 2,500 impressions in three months at positions 60–80.
 * The page now answers who should buy what, what it costs, when you need it in Japan, and ski
 * cover, in that order.
 *
 * Read on 6 Nov 2026:
 *   safetywing.com/nomad-insurance      US$62.72 per 4 weeks at ages 10–39; US$177.50 a month
 *                                       at 18–39; limits; age bands in the calculator.
 *   safetywing.com/nomad-insurance/faq  no deductible; fixed dates 5–364 days; subscription
 *                                       auto-extends every 28 days to 364; add-ons on
 *                                       subscriptions only; Complete is a 12-month commitment;
 *                                       Essential sold to age 69; children free; exclusions.
 *   heymondo.com/travel-insurance-international/  limits, no published price.
 *   jnto.go.jp/emergency/eng/mi_guide.html        the two cost cases, entry warning, hotline.
 *   mhlw.go.jp/stf/newpage_46516.html             the recommendation and the screening warning.
 *
 * Read on 9 Nov 2026 off SafetyWing's own pricing calculator (safetywing.com/nomad-insurance,
 * Essential, no add-ons, no US cover):
 *   4-week subscription: 40–49 US$102.76, 50–59 US$161.28, 60–69 US$218.96.
 *   Fixed dates, paid upfront: 7 days at 10–39 US$15.68; 14 days at 10–39 US$31.36,
 *   40–49 US$51.38, 50–59 US$80.64, 60–69 US$109.48.
 *
 * Read on 11 Nov 2026 (task jtk-20261111-R06):
 *   safetywing.com/nomad-insurance      US$62.72 per 4 weeks at 10–39 and US$177.50 a month for
 *                                       Complete at 18–39 unchanged; Essential and Complete do not
 *                                       cover pre-existing conditions.
 *   safetywing.com/nomad-insurance/faq  "no deductible on either plan"; COVID-19 treatment, tests
 *                                       and mandated quarantine covered like any other illness;
 *                                       Essential 180-day lookback for pre-existing conditions; pay
 *                                       and claim, direct billing on request.
 *   heymondo.com/travel-insurance-international/  pre-existing conditions not covered; 24/7
 *                                       assistance platform that usually handles the bill; COVID
 *                                       not named; no price.
 *   jnto.go.jp/emergency/eng/mi_guide.html  cards only at major hospitals, clinics generally cash
 *                                       only; no payment needed with cash-free insurance.
 *   hokeniryo.metro.tokyo.lg.jp (medical_info_eng/insurance)  "medical expenses can become
 *                                       extremely high"; sufficient private cover "essential".
 *
 * Read on 18 Nov 2026 (task jtk-20261118-R02):
 *   safetywing.com/nomad-insurance      US$62.72 per 4 weeks at 10–39, US$177.50 a month Complete at
 *                                       18–39, Essential US$250,000 limit, evacuation US$100,000
 *                                       lifetime, luggage US$500 per item / US$3,000 per plan. Complete
 *                                       lists trip cancellation US$300 per trip. All unchanged.
 *   safetywing.com/nomad-insurance/faq  Essential to age 69; fixed dates 5–364 days; one child (14 days
 *                                       to 9 years) free per adult, at most two per group (the page said
 *                                       "two per adult" before; corrected); skiing and snowboarding
 *                                       covered except off-piste; Essential has no search and rescue.
 *   heymondo.com/travel-insurance-international/  medical up to US$10,000,000, luggage US$2,500,
 *                                       cancellation US$7,000 if bought within 7 days of the first
 *                                       booking, search and rescue US$10,000; skiing not named.
 *   jnto.go.jp/emergency/eng/mi_guide.html  ¥7.5 million and ¥10 million cases; cannot choose the
 *                                       hospital an ambulance takes you to; clinics generally cash only.
 *   hokeniryo.metro.tokyo.lg.jp medical_info_eng/system  foreign travellers are not covered by Japan's
 *                                       public health insurance.
 *   mhlw.go.jp/content/10800000/001694667.pdf  guidebook for hospitals: visitors' care is uninsured
 *                                       (jiyu shinryo), priced by each hospital, and even one visit can be
 *                                       costly; pay-and-claim policyholders pay in full at the hospital.
 *   pref.ibaraki.jp ... sentei_ryoyohi.html  since 2 Dec 2024, 23 large hospitals charge ¥2,200–¥13,200
 *                                       (¥7,700 at 19 of them) after a non-urgent ambulance call; the
 *                                       ambulance itself is not charged; non-residents included.
 * /guides/money/japan-travel-insurance was a 301 to this page until 13 Nov 2026, when it was restored
 * (task-jtk-20261113-03) as the requirements-and-cost page: "do I need it, is it mandatory, what
 * does care cost". This page keeps "which policy". Ski cover is the ski page's query.
 */
const CALC_CHECKED = checkedLabel("2026-11-09");
const CHECKED = checkedLabel("2026-11-18");
const RECHECKED = checkedLabel("2026-11-18");
const LAST_CHECKED = "2026-11-18";

const SW_PLAN_URL = "https://safetywing.com/nomad-insurance";
const SW_FAQ_URL = "https://safetywing.com/nomad-insurance/faq";
const HEYMONDO_PLAN_URL = "https://heymondo.com/travel-insurance-international/";

type Row = {
  who: string;
  pick: string;
  cover: string;
  price: string;
  url: string;
  urlLabel: string;
  button: boolean;
  ski?: boolean;
  conclusion?: boolean;
};

/**
 * Use-case table. Row 1 is the conclusion. The SafetyWing button is left off the rows whose need
 * SafetyWing does not meet; ski rows also link to the ski insurance guide.
 */
const answerRows: Row[] = [
  {
    who: "Our pick for most trips",
    pick: "SafetyWing Essential",
    cover: "US$250,000 medical, US$100,000 evacuation, no deductible",
    price: "US$31.36 for 14 days (ages 10–39)",
    url: SW_PLAN_URL,
    urlLabel: "safetywing.com",
    button: true,
    conclusion: true,
  },
  {
    who: "Short trip, 1 to 3 weeks",
    pick: "SafetyWing Essential, fixed dates",
    cover: "Paid upfront for 5 to 364 days; lost luggage US$500 per item",
    price: "US$15.68 for 7 days, US$31.36 for 14 days (ages 10–39)",
    url: SW_PLAN_URL,
    urlLabel: "safetywing.com",
    button: true,
  },
  {
    who: "Long stay or digital nomad",
    pick: "SafetyWing Essential, subscription",
    cover: "Renews every 28 days up to 364 days; you can start it after leaving home",
    price: "US$62.72 per 4 weeks (ages 10–39); Complete US$177.50 a month (18–39)",
    url: SW_PLAN_URL,
    urlLabel: "safetywing.com",
    button: true,
  },
  {
    who: "Skiing or snowboarding on marked runs",
    pick: "SafetyWing Essential",
    cover: "Skiing and snowboarding covered except off-piste; no search and rescue on Essential",
    price: "Same as the trip price above (US$31.36 for 14 days at 10–39)",
    url: SW_FAQ_URL,
    urlLabel: "SafetyWing FAQ",
    button: true,
    ski: true,
  },
  {
    who: "Backcountry or off-piste",
    pick: "World Nomads Explorer",
    cover: "SafetyWing excludes off-piste on every plan, even with the add-on",
    price: "No published price. Quote only",
    url: WORLDNOMADS_URL,
    urlLabel: "worldnomads.com",
    button: false,
    ski: true,
  },
  {
    who: "Family with young children",
    pick: "SafetyWing Essential",
    cover: "One child aged 14 days to 9 years free per adult, at most two per group",
    price: "Adults pay their age price; those children pay nothing",
    url: SW_FAQ_URL,
    urlLabel: "SafetyWing FAQ",
    button: true,
  },
  {
    who: "Expensive prepaid trip (cancellation cover)",
    pick: "Heymondo",
    cover: "Medical up to US$10,000,000; cancellation up to US$7,000 if bought within 7 days of your first booking",
    price: "No published price. Quote only",
    url: HEYMONDO_PLAN_URL,
    urlLabel: "heymondo.com",
    button: false,
  },
  {
    who: "Aged 70 or over",
    pick: "Get a quote and check the age limit",
    cover: "SafetyWing Essential is sold up to age 69",
    price: "Quote only",
    url: SW_FAQ_URL,
    urlLabel: "SafetyWing FAQ",
    button: false,
  },
  {
    who: "You have a pre-existing condition",
    pick: "Ask each insurer in writing",
    cover: "Neither SafetyWing nor Heymondo covers pre-existing conditions",
    price: "Quote only",
    url: SW_FAQ_URL,
    urlLabel: "SafetyWing FAQ",
    button: false,
  },
];

const priceRows = [
  { plan: "SafetyWing Essential, fixed dates", age: "10–39", period: "7 days", price: "US$15.68" },
  { plan: "SafetyWing Essential, fixed dates", age: "10–39", period: "14 days", price: "US$31.36" },
  { plan: "SafetyWing Essential, fixed dates", age: "40–49", period: "14 days", price: "US$51.38" },
  { plan: "SafetyWing Essential, fixed dates", age: "50–59", period: "14 days", price: "US$80.64" },
  { plan: "SafetyWing Essential, fixed dates", age: "60–69", period: "14 days", price: "US$109.48" },
  { plan: "SafetyWing Essential, subscription", age: "10–39", period: "4 weeks", price: "US$62.72" },
  { plan: "SafetyWing Essential, subscription", age: "40–49", period: "4 weeks", price: "US$102.76" },
  { plan: "SafetyWing Essential, subscription", age: "50–59", period: "4 weeks", price: "US$161.28" },
  { plan: "SafetyWing Essential, subscription", age: "60–69", period: "4 weeks", price: "US$218.96" },
  { plan: "SafetyWing Essential", age: "Under 10", period: "4 weeks", price: "Free: one per adult, at most two per group" },
  { plan: "SafetyWing Complete", age: "18–39", period: "Month, 12-month commitment", price: "US$177.50" },
  { plan: "Adventure sports add-on", age: "Any", period: "4 weeks, subscriptions only", price: "+US$10" },
  { plan: "Heymondo", age: "Any", period: "Any", price: "No published price. Quote only" },
  { plan: "World Nomads", age: "Any", period: "Any", price: "No published price. Quote only" },
];

/** Japan's medical costs for visitors, public sources only. Row 1 is the conclusion. */
const japanRows = [
  {
    what: "Worst case on record (inpatient)",
    figure: "¥10 million for a heart attack: surgery, 45 days in hospital, doctor escort and a business-class flight home",
    source: "JNTO, Tokyo Metropolitan Government",
  },
  {
    what: "Inpatient, injury",
    figure: "¥7.5 million after a bicycle collision (collapsed lung, broken ribs): surgery, 19 days in hospital, doctor escort and a flight home",
    source: "JNTO, Tokyo Metropolitan Government",
  },
  {
    what: "Outpatient (clinic or hospital visit)",
    figure: "Visitors are not covered by Japan's public health insurance, so every visit is uninsured care priced by the hospital itself; a single visit can be expensive",
    source: "Tokyo Metropolitan Government, MHLW guidebook for hospitals",
  },
  {
    what: "Ambulance (call 119)",
    figure: "You cannot choose which hospital the ambulance takes you to",
    source: "JNTO",
  },
  {
    what: "Ambulance, non-urgent call (Ibaraki)",
    figure: "The ride itself is not charged, but 23 large hospitals charge ¥2,200–¥13,200 (¥7,700 at 19 of them) if the call was not urgent, visitors from outside the prefecture included",
    source: "Ibaraki Prefecture",
  },
  {
    what: "Paying the bill",
    figure: "Credit cards are accepted only at major hospitals; clinics generally accept cash only",
    source: "JNTO",
  },
  {
    what: "With cash-free insurance",
    figure: "If your policy includes a cash-free payment service, there is no need for you to pay the hospital",
    source: "JNTO",
  },
  {
    what: "With pay-and-claim insurance",
    figure: "Hospitals treat you as a self-pay patient and ask for the full amount on the spot; many card-linked policies work this way",
    source: "MHLW guidebook for hospitals",
  },
  {
    what: "Unpaid hospital bills",
    figure: "JNTO warns that visitors who do not pay may be denied entry in future. The health ministry warns of stricter immigration screening",
    source: "JNTO, MHLW",
  },
  {
    what: "Finding a hospital",
    figure: "Japan Visitor Hotline, 050-3816-2787, 24 hours a day, 365 days a year",
    source: "JNTO",
  },
];

/** Cover by item: medical, evacuation, belongings, cancellation, winter sports first. Row 1 is the conclusion. */
const compareRows = [
  { factor: "Best for", safetywing: "Our pick: most trips up to 69", heymondo: "Trip cancellation cover", worldnomads: "Backcountry skiing (Explorer)" },
  { factor: "Medical", safetywing: "US$250,000 (Essential), no deductible", heymondo: "Up to US$10,000,000", worldnomads: "Shown after you enter your residence" },
  { factor: "Evacuation", safetywing: "US$100,000 lifetime", heymondo: "Medical transport included", worldnomads: "By plan" },
  { factor: "Belongings (lost luggage)", safetywing: "US$500 per item, US$3,000 per plan", heymondo: "Up to US$2,500", worldnomads: "By plan" },
  { factor: "Trip cancellation", safetywing: "Not listed on Essential (Complete: US$300 per trip)", heymondo: "Up to US$7,000, buy within 7 days of your first trip booking", worldnomads: "By plan" },
  { factor: "Winter sports", safetywing: "Skiing and snowboarding on piste; off-piste excluded", heymondo: "Skiing not named on the plan page", worldnomads: "On every plan; backcountry on Explorer" },
  { factor: "Search and rescue", safetywing: "Not on Essential", heymondo: "Up to US$10,000 if lost during the trip", worldnomads: "By plan" },
  { factor: "Published price", safetywing: "US$62.72 per 4 weeks, ages 10–39", heymondo: "None", worldnomads: "None" },
  { factor: "Deductible", safetywing: "None on either plan", heymondo: "“Our Heymondo insurances don't have a deductible”", worldnomads: "Varies by plan" },
  { factor: "COVID-19", safetywing: "Treatment, tests and mandated quarantine covered like any illness", heymondo: "Not named on the plan page", worldnomads: "Check the policy wording" },
  { factor: "Pre-existing conditions", safetywing: "Not covered (Essential looks back 180 days)", heymondo: "Not covered", worldnomads: "Check the policy wording" },
  { factor: "Paying the hospital", safetywing: "Pay and claim; direct billing on request", heymondo: "24/7 assistance usually handles the bill", worldnomads: "Check the policy wording" },
];

const faqItems = [
  {
    q: "What is the best travel insurance for Japan?",
    a: `For most visitors it is SafetyWing Essential: a US$250,000 medical limit, US$100,000 for evacuation, no deductible, and US$31.36 for a 14-day trip at ages 10–39. Use the same plan as a 4-week subscription (US$62.72 at 10–39) for a long stay, and it covers skiing on marked runs. Choose Heymondo for trip cancellation cover and World Nomads Explorer for backcountry skiing. Read on ${RECHECKED}.`,
  },
  {
    q: "Do I need travel insurance for Japan?",
    a: `You should have it. Japan's health ministry strongly recommends private medical insurance for visitors, travellers are not covered by Japan's public health insurance, and JNTO lists hospital cases of ¥7.5 million and ¥10 million, flights home included. JNTO also warns that visitors who do not pay their medical bills may be denied entry in future. Read on ${CHECKED}.`,
  },
  {
    q: "How much is travel insurance to Japan?",
    a: `For a typical two-week trip, SafetyWing Essential with fixed dates costs US$31.36 at ages 10–39, US$51.38 at 40–49, US$80.64 at 50–59 and US$109.48 at 60–69; one week at 10–39 is US$15.68. As a 4-week subscription it is US$62.72 at 10–39, rising to US$218.96 at 60–69. Heymondo and World Nomads publish no price. Read off SafetyWing's calculator on ${CALC_CHECKED}; the 4-week price was rechecked on ${RECHECKED}.`,
  },
  {
    q: "Does travel insurance cover skiing in Japan?",
    a: `On marked runs, usually yes. SafetyWing covers skiing and snowboarding except off-piste, and its Essential plan does not cover search and rescue. Heymondo's plan page does not name skiing. World Nomads Explorer is the option for backcountry. Our Japan ski insurance guide compares the wording of each insurer. Read on ${RECHECKED}.`,
  },
  {
    q: "What travel insurance suits an expensive long-haul Japan trip?",
    a: `One that pays for the flight home and protects what you prepaid. JNTO's ¥10 million heart-attack case included a doctor escort and a business-class flight home, so check the medical and evacuation limits first: SafetyWing Essential lists US$250,000 and US$100,000, Heymondo up to US$10,000,000 for medical. For prepaid flights and hotels, Heymondo lists cancellation up to US$7,000 if bought within 7 days of your first booking; SafetyWing Essential lists no cancellation cover. Read on ${RECHECKED}.`,
  },
];

/** Asked often enough to answer under a question heading, but kept out of FAQPage (3–5 there). */
const moreQuestions = [
  {
    q: "Can you buy travel insurance after arriving in Japan?",
    a: `Yes. JNTO says private medical insurance you can buy after entering Japan provides sufficient cover during your stay, and SafetyWing lets you sign up during your travels. Anything you already have when you buy will not be covered. Read on ${CHECKED}.`,
  },
  {
    q: "What is the best travel health insurance for Japan?",
    a: `Check the medical limit and evacuation line first. SafetyWing Essential lists US$250,000 for treatment and hospital stays and US$100,000 lifetime for evacuation. Heymondo lists medical expenses up to US$10,000,000. Both clear the ¥10 million case JNTO publishes. Read on ${RECHECKED}.`,
  },
  {
    q: "Does Japan travel insurance cover COVID-19?",
    a: `SafetyWing's FAQ says medically necessary COVID-19 treatment and tests, and quarantine ordered by a health authority, are covered like any other illness; antibody tests are not. Heymondo's plan page does not name COVID-19, so ask before you buy. Read on ${RECHECKED}.`,
  },
  {
    q: "Is credit card travel insurance enough for Japan?",
    a: `Check your own card's limit and evacuation cover against the ¥10 million case JNTO publishes, and whether the trip must be paid on that card. A guidebook for Japanese hospitals on the health ministry's website notes that many card-linked policies are pay-and-claim, so the hospital asks you to pay in full first. Card benefits vary, so there is no single answer. Read on ${RECHECKED}.`,
  },
  {
    q: "Does SafetyWing cover Japan if I live there?",
    a: `No. SafetyWing's FAQ says your destination cannot be your home country, where you principally live. It is for visitors. Read on ${CHECKED}.`,
  },
];

const TITLE = "Best Travel Insurance for Japan 2026: Plans Compared by Cost";
const DESCRIPTION =
  "Best travel insurance for Japan by trip: SafetyWing Essential US$31.36 for 2 weeks (10–39), long-stay and ski picks, Japan hospital costs. Get a quote.";
const ROUTE = "/guides/money/best-travel-insurance-japan";
const PAGE_URL = `https://www.japan-travel-kit.com${ROUTE}`;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function SafetyWingButton({ label, className }: { label: string; className: string }) {
  return (
    <a href={SAFETYWING_URL} target="_blank" rel={SPONSORED_REL} className={className} data-placement="insurance-answer">
      {label}
    </a>
  );
}

export default function BestTravelInsuranceJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={PAGE_URL} />
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
          dangerouslySetInnerHTML={{ __html: articleJsonLd({ route: ROUTE, headline: TITLE, updated }) }}
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
                { "@type": "ListItem", position: 4, name: "Best Travel Insurance for Japan", item: PAGE_URL },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: productOfferJsonLd({
              route: ROUTE,
              name: "SafetyWing Nomad Insurance Essential",
              description: "Travel medical insurance with a US$250,000 overall limit, billed every 4 weeks; the published price is for ages 10–39.",
              brand: "SafetyWing",
              currency: "USD",
              lowPrice: 62.72,
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Best Travel Insurance</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Best Travel Insurance for Japan 2026: <br />Plans Compared by Cost and Medical Cover
          </h1>
          <p className={styles.heroSubtitle}>
            Which policy to buy for a short trip, a long stay or a ski holiday in Japan, what each costs, and what
            a hospital in Japan can charge a visitor, from the insurers&apos; own pages and Japan&apos;s public sources.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Published prices only", "JNTO and MHLW figures"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Not insurance advice.</strong> This is general information. Cover and prices vary by age,
            trip length, residence and plan, so read the policy wording before you buy. SafetyWing links are
            affiliate links; we may earn a commission at no extra cost to you. Heymondo and World Nomads links
            are not. <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* The answer first, with the button. */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              The best travel insurance for Japan for a short trip is <strong>SafetyWing Essential</strong> with
              fixed dates: <strong>US$31.36 for 14 days</strong> at ages 10–39, a US$250,000 medical limit and no
              deductible. For a long stay take the same plan as a subscription (US$62.72 per 4 weeks, up to 364
              days); for skiing it covers marked runs, and backcountry riders need World Nomads Explorer. Cover
              matters because visitors are outside Japan&apos;s public health insurance and JNTO lists hospital
              bills of ¥7.5 million and ¥10 million (read on {RECHECKED}).
            </p>
            <SafetyWingButton label="Check SafetyWing for your dates →" className={styles.verdictBtn} />
          </div>
        </div>

        <EsimCtaTop />

        {/* 1. Conclusion, by traveller. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The answer</span>
          <h2 className={styles.sectionTitle}>Which Travel Insurance Is Best for Your Japan Trip?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            SafetyWing Essential fits short trips, long stays, families and skiing on marked runs. Heymondo fits an
            expensive prepaid trip that needs cancellation cover, and World Nomads Explorer fits the backcountry.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your trip", "Plan", "Main cover", "Price guide", "Official page", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {answerRows.map((row) => (
                    <tr key={row.who} style={row.conclusion ? { fontWeight: 700, background: "var(--paper)" } : {}}>
                      <td className={styles.tdProvider}>{row.who}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pick}</td>
                      <td style={{ fontSize: "0.88rem" }}>
                        {row.cover}
                        {row.ski && (
                          <>
                            {" "}
                            <Link href="/guides/money/japan-ski-travel-insurance">Ski insurance guide →</Link>
                          </>
                        )}
                      </td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.82rem" }}>
                        <a href={row.url} target="_blank" rel={PLAIN_REL}>{row.urlLabel}</a>
                      </td>
                      <td style={{ fontSize: "0.88rem" }}>
                        {row.button && <SafetyWingButton label="Check SafetyWing →" className={styles.pickCta} />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED} on{" "}
            <a href={SW_PLAN_URL} target="_blank" rel={PLAIN_REL}>safetywing.com/nomad-insurance</a>,{" "}
            <a href={SW_FAQ_URL} target="_blank" rel={PLAIN_REL}>SafetyWing&apos;s FAQ</a> and{" "}
            <a href={HEYMONDO_PLAN_URL} target="_blank" rel={PLAIN_REL}>Heymondo&apos;s plan page</a>; 7-day and
            14-day prices from SafetyWing&apos;s calculator on 2026-11-09. World Nomads from its own pages on
            2026-10-25. SafetyWing has no button on four rows because it does not meet that need. Quotes:{" "}
            <a href={HEYMONDO_URL} target="_blank" rel={PLAIN_REL}>Heymondo</a> and{" "}
            <a href={WORLDNOMADS_URL} target="_blank" rel={PLAIN_REL}>World Nomads</a>.
          </p>
        </section>

        {/* Arrival-day bookings next to the answer (task jtk-20261118-P01): airport trains 5%, Klook eSIM 20%. */}
        <KlookTripPrep
          label="Book on the same trip"
          heading="What Else to Book Before You Fly to Japan"
          intro="Insurance covers the trip going wrong. These cover arrival day: a reserved train from the airport and data on your phone for the assistance line and the hospital search."
          items={japanTravelInsuranceTripPrep}
          headingLevel={3}
        />

        {/* 2. Prices. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost</span>
          <h2 className={styles.sectionTitle}>How Much Is Travel Insurance to Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            A two-week Japan trip on SafetyWing Essential costs US$31.36 at ages 10–39 and US$109.48 at 60–69 with
            fixed dates paid upfront. The 4-week subscription is US$62.72 at 10–39. Prices rise with age.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Plan", "Age", "Period", "Price"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={`${row.plan}-${row.age}-${row.period}`}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.age}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.period}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Conditions: SafetyWing&apos;s own pricing calculator, in US dollars, read on {CALC_CHECKED}, Essential plan
            without add-ons or US cover. Fixed-date prices are for the length shown; other lengths and your exact
            quote come from SafetyWing&apos;s calculator. Not a personal quote.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED} (4-week and Complete prices; age-band and fixed-date prices from the
            calculator on 2026-11-09). Source:{" "}
            <a href="https://safetywing.com/nomad-insurance" target="_blank" rel={PLAIN_REL}>safetywing.com/nomad-insurance</a>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <SafetyWingButton label="Get your price from SafetyWing →" className={styles.verdictBtn} />
          </div>
        </section>

        {/* 3. When you need it, public sources only. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>In Japan</span>
          <h2 className={styles.sectionTitle}>How Much Does a Hospital Cost in Japan Without Insurance?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Up to ¥10 million: JNTO publishes ¥7.5 million after a bicycle collision and ¥10 million after a heart
            attack, each including the flight home. Visitors are outside Japan&apos;s public health insurance, so even
            an outpatient visit is priced by the hospital, and without cash-free insurance you pay it yourself.
            Whether a policy is required for entry, and what it should cover, is answered in{" "}
            <Link href="/guides/money/japan-travel-insurance">Do you need travel insurance for Japan?</Link>
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Situation", "What the official source says", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {japanRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.figure}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED}. Sources:{" "}
            <a href="https://www.jnto.go.jp/emergency/eng/mi_guide.html" target="_blank" rel={PLAIN_REL}>JNTO, guide for travellers who fall ill</a>,{" "}
            <a href="https://www.mhlw.go.jp/stf/newpage_46516.html" target="_blank" rel={PLAIN_REL}>MHLW (Ministry of Health, Labour and Welfare)</a>,{" "}
            <a href="https://www.mhlw.go.jp/content/10800000/001694667.pdf" target="_blank" rel={PLAIN_REL}>MHLW-funded guidebook for hospitals on foreign visitor patients (Japanese, PDF)</a>,{" "}
            <a href="https://www.hokeniryo.metro.tokyo.lg.jp/iryo/iryo_hoken/medical_info_eng/insurance" target="_blank" rel={PLAIN_REL}>Tokyo Metropolitan Government, medical insurance</a>,{" "}
            <a href="https://www.hokeniryo.metro.tokyo.lg.jp/iryo/iryo_hoken/medical_info_eng/system" target="_blank" rel={PLAIN_REL}>Tokyo Metropolitan Government, Japan&apos;s medical system</a>{" "}
            and{" "}
            <a href="https://www.pref.ibaraki.jp/hokenfukushi/iryo/iryo/isei/sentei_ryoyohi.html" target="_blank" rel={PLAIN_REL}>Ibaraki Prefecture, fees after non-urgent ambulance calls (Japanese)</a>.
            Each hospital sets its own price for visitors, so there is no single outpatient fee to quote.
            If you may need to pay a hospital yourself and claim later, see our{" "}
            <Link href="/guides/money/best-travel-card-japan">best travel card for Japan</Link> guide, carry some
            yen (<Link href="/guides/money/how-much-yen-to-bring-japan">how much yen to bring</Link>), and keep every
            receipt.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <SafetyWingButton label="Check SafetyWing medical cover →" className={styles.verdictBtn} />
          </div>
        </section>

        {/* 4. Ski and snowboard. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Winter</span>
          <h2 className={styles.sectionTitle}>Does Travel Insurance Cover Skiing and Snowboarding in Japan?</h2>
          <p className={styles.bodyText}>
            On marked runs, usually yes. SafetyWing covers skiing and snowboarding on piste if you wear a
            helmet. It excludes off-piste on every plan, and Essential does not cover search and rescue. Our guide to{" "}
            <Link href="/guides/money/japan-ski-travel-insurance">travel insurance for skiing in Japan</Link>{" "}
            compares the wording of each insurer, including off-piste, rescue and family trips to Hokkaido.
          </p>
          <p className={styles.bodyText}>
            Planning the trip itself? See our guides to{" "}
            <Link href="/guides/attractions/niseko-ski-tours">Niseko ski tours</Link>, a{" "}
            <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo">Gala Yuzawa day trip from Tokyo</Link>{" "}
            and a <Link href="/guides/attractions/hokkaido-7-day-itinerary">7-day Hokkaido itinerary</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <SafetyWingButton label="Check SafetyWing for a ski trip →" className={styles.verdictBtn} />
          </div>
        </section>

        {/* Side by side. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>What Does Each Policy Cover? SafetyWing vs Heymondo vs World Nomads</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            SafetyWing is the only one of the three that publishes a price, and it has no deductible. Heymondo lists
            the higher medical limit (US$10,000,000) and cancellation cover up to US$7,000. For winter sports,
            SafetyWing covers marked runs and World Nomads Explorer the backcountry. Neither SafetyWing nor
            Heymondo covers pre-existing conditions.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "SafetyWing", "Heymondo", "World Nomads"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.safetywing}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.heymondo}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.worldnomads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED} for SafetyWing and Heymondo (
            <a href="https://safetywing.com/nomad-insurance/faq" target="_blank" rel={PLAIN_REL}>safetywing.com</a>,{" "}
            <a href="https://heymondo.com/travel-insurance-international/" target="_blank" rel={PLAIN_REL}>heymondo.com</a>
            ); World Nomads from its own pages on 2026-10-25 (
            <a href={WORLDNOMADS_URL} target="_blank" rel={PLAIN_REL}>worldnomads.com</a>). For those two insurers
            head to head, see{" "}
            <Link href="/guides/money/safetywing-vs-heymondo-japan">SafetyWing vs Heymondo for Japan</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <SafetyWingButton label="Get a SafetyWing quote for Japan →" className={styles.verdictBtn} />
          </div>
        </section>

        {/* Question headings outside FAQPage. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>More questions</span>
          <h2 className={styles.sectionTitle}>More Questions About Japan Travel Insurance</h2>
          {moreQuestions.map((item) => (
            <div key={item.q}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "1.25rem 0 0.5rem" }}>{item.q}</h3>
              <p className={styles.bodyText}>{item.a}</p>
            </div>
          ))}
          <p className={styles.bodyText}>
            Planning your first trip? Our{" "}
            <Link href="/guides/attractions/japan-first-time-itinerary">first-time Japan itinerary</Link> lays out the
            days this cover would run for.
          </p>
        </section>

        <EsimCtaBottom />

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
            {[
              { href: "/guides/money/japan-ski-travel-insurance", title: "Best Travel Insurance for Skiing in Japan (2026)" },
              { href: "/guides/money/safetywing-vs-heymondo-japan", title: "SafetyWing vs Heymondo for Japan (2026): Which to Pick" },
              { href: "/guides/money/best-travel-card-japan", title: "Best Travel Card for Japan (2026): Fees and ATM Limits" },
              { href: "/guides/money/japan-travel-budget", title: "Japan Travel Budget 2026: Trip to Tokyo Cost, Day by Day" },
              { href: "/guides/money", title: "All Japan Money & Payment Guides →" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className={styles.relatedCard}>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{item.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
