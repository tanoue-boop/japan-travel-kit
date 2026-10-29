import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { klookEsim, homeInternetGapPrep } from "../../../lib/klook-links";
import { pocketWifi, ratesCheckedAt, specsCheckedAt } from "../../../lib/pocket-wifi";
import { siteCheapestFrom, pricesCheckedLabel } from "../../../lib/esim-prices";

/**
 * Japan Home Internet for Foreigners — written 29 Oct 2026 for the exact phrase.
 *
 * The site's eSIM section has always answered the mobile question. This is the
 * first page about the line in the wall, and it exists because the reader who
 * moves to Japan hits a problem no mobile plan solves: a Japanese tenancy almost
 * never starts with a live connection, a fibre order is measured in weeks, and
 * the standard domestic fixed-line offer is a two-year tie-in signed in Japanese.
 *
 * It does not re-argue pages/guides/esim/japan-sim-card-long-term-stay.tsx (the
 * resident-versus-travel case for a SIM) or the new
 * japan-sim-card-working-holiday.tsx (the residence-card sequence). Those two own
 * the phone. This page owns the three-way choice between a plug-in home router,
 * a fibre installation and a monthly pocket WiFi, and the wait that separates
 * them.
 *
 * Everything below was read off its own source on 29 October 2026:
 *
 *   www.sakuramobile.jp/monthly/home-internet/ and /home-internet/
 *       the three options with their monthly prices and initial fees — Home WiFi
 *       6,980 JPY/month (7,678 tax incl.), initial fee 5,500 JPY, installation
 *       "Right away"; Fiber Internet 1 Gbps 6,980 JPY/month (7,678 tax incl.),
 *       initial fee 5,500–25,300 JPY, installation "1 week to 1 month"; Fiber
 *       Internet 10 Gbps 9,480 JPY/month (10,428 tax incl.), same initial fee
 *       range, installation "2 weeks to 1 month". Also: "No annual contract";
 *       "no subsidized device, no early-termination penalty" on Home WiFi;
 *       fibre covering "over 90% of Japan" and Home WiFi the "majority of
 *       Japan"; the fibre package including modem and router plus the ISP;
 *       a bridge rental offered while a fibre installation is pending; English
 *       support throughout, with a bilingual team for landlord questions; and
 *       the company's own caveat that "actual customer speeds are not
 *       guaranteed".
 *
 *   www.sakuramobile.jp/monthly/wifi/ and /monthly/price/
 *       monthly Pocket WiFi at 4,980 JPY/month (5,478 tax incl.) for 100 GB and
 *       6,480 JPY/month (7,128 tax incl.) for 200 GB, a 5,500 JPY activation
 *       fee, SoftBank 4G/LTE, a 74 x 74 x 17 mm device with a 20-hour battery
 *       and up to 15 simultaneous connections, delivery or airport-counter
 *       collection on a passport, and "no two-year contract".
 *
 *   www.sakuramobile.jp/monthly/price/
 *       the resident mobile grid this page compares against — Data Only at
 *       100 GB is 10,480 JPY/month (11,528 tax incl.), which is the figure that
 *       settles the "can I just tether my phone" question.
 *
 *   www.sakuramobile.jp/info/payment/
 *       "We accept most credit and debit cards, including international ones.
 *       Accepted brands: VISA, MasterCard, Discover, JCB, AMEX, and Diners
 *       Club."; Smart Pit cash payment at Lawson, Family Mart and Mini Stop,
 *       with a deposit of two months' fees on the data and WiFi plans.
 *
 * The two Klook pocket WiFi rentals come from lib/pocket-wifi.ts, which carries
 * its own two check dates; eSIM prices come from data/esim-prices.json, re-read
 * daily. No Klook price appears anywhere — Klook answers automated reads of its
 * product pages with HTTP 403.
 *
 * Nothing here is first-hand. Every figure is published by the company that
 * sells the thing, and labelled with the date it was read.
 */

/** The date every Sakura Mobile figure and rule on this page was read. */
const CHECKED = "29 Oct 2026";

/** Sakura Mobile's own affiliate link — the same one the review page uses. */
const SAKURA_AFFILIATE = "https://p.sakuramobile.jp/idevaffiliate.php?id=486";
/** Sakura is its own programme, not Klook's. */
const SAKURA_REL = "sponsored noopener noreferrer nofollow";

const HOME_WIFI = "¥6,980";
const HOME_WIFI_TAX = "¥7,678";
const FIBRE_10G = "¥9,480";
const FIBRE_10G_TAX = "¥10,428";
const WIFI_100GB = "¥4,980";
const WIFI_200GB = "¥6,480";
const MOBILE_100GB = "¥10,480";

const AIRPORT_WIFI = pocketWifi("ninja-wifi");
const HOTEL_WIFI = pocketWifi("hotel-delivery");
const CHEAPEST_ESIM_FROM = siteCheapestFrom();
const PRICES_CHECKED = pricesCheckedLabel();

/**
 * The comparison the page exists for. Five columns because five things decide
 * it, and the one most readers underweight is the third: a connection you
 * cannot use for a month is not a connection.
 */
const optionRows = [
  {
    option: "Home WiFi (plug-in home router)",
    price: `${HOME_WIFI}/month (${HOME_WIFI_TAX} tax incl.)`,
    upfront: "¥5,500 initial fee",
    wait: 'Stated as "Right away" — from the moment the device arrives',
    install: "None. It is a rental device you plug into a power socket",
    suits: "A one-year lease, a sharehouse room, anything where you cannot or will not arrange building work",
  },
  {
    option: "Fiber Internet, 1 Gbps",
    price: `${HOME_WIFI}/month (${HOME_WIFI_TAX} tax incl.)`,
    upfront: "¥5,500–25,300 initial fee, depending on the property",
    wait: '"1 week to 1 month"',
    install: "Remote or physical, depending on the building; some properties skip it entirely",
    suits: "Two years or more in one flat, or a household where several people work from it at once",
  },
  {
    option: "Fiber Internet, 10 Gbps",
    price: `${FIBRE_10G}/month (${FIBRE_10G_TAX} tax incl.)`,
    upfront: "¥5,500–25,300 initial fee",
    wait: '"2 weeks to 1 month"',
    install: "As above, and not available in every building",
    suits: "Large uploads, multiple 4K streams, a home office that bills by the hour",
  },
  {
    option: "Monthly Pocket WiFi, 100 GB",
    price: `${WIFI_100GB}/month (¥5,478 tax incl.)`,
    upfront: "¥5,500 activation fee",
    wait: "Delivered, or collected on a passport at an airport counter",
    install: "None, and it leaves the flat with you",
    suits: "A six-month stay, a move you expect, or a building that refuses a line",
  },
  {
    option: "Monthly Pocket WiFi, 200 GB",
    price: `${WIFI_200GB}/month (¥7,128 tax incl.)`,
    upfront: "¥5,500 activation fee",
    wait: "Same",
    install: "None",
    suits: "The same reader with a laptop on it all day, where 100 GB would not last the month",
  },
  {
    option: "Tethering a mobile data plan",
    price: `${MOBILE_100GB}/month for 100 GB (¥11,528 tax incl.)`,
    upfront: "¥5,500 activation fee",
    wait: "None",
    install: "None",
    suits: "Nobody, as a home line — it is the most expensive row here and the allowance is capped",
  },
];

/** What "no installation" and "no annual contract" actually mean, as published. */
const termRows = [
  {
    item: "Contract length",
    detail: 'All of the home options are published with "No annual contract", and Home WiFi adds "no subsidized device, no early-termination penalty".',
    why: "The standard Japanese fixed-line offer is a two-year tie-in with a cancellation fee, which is the single worst clause to sign on a one-year visa. This is the specification to compare any alternative against.",
  },
  {
    item: "Coverage",
    detail: 'Fibre is published as reaching "over 90% of Japan"; the Home WiFi service the "majority of Japan".',
    why: "Neither is universal, and the gap is the reason to check your exact address before you plan around either — a rural placement is a different question from a Tokyo ward.",
  },
  {
    item: "What is in the box",
    detail: "The fibre package is published as including the wireless router, the modem and the ISP. Home WiFi is a rental device with nothing to buy.",
    why: "In Japan the line and the internet provider are normally two separate contracts in Japanese. One bill covering both is most of what the extra monthly cost buys.",
  },
  {
    item: "Speed, as published",
    detail: 'Maximum speeds of 1 Gbps and 10 Gbps on the two fibre tiers, with the company\'s own caveat that "actual customer speeds are not guaranteed".',
    why: "Worth quoting because a headline figure on a shared building line is a ceiling, not a rate. Treat it as the difference between the tiers rather than as what you will measure.",
  },
  {
    item: "Language",
    detail: "English support throughout, and a bilingual team offered for questions and concerns involving your landlord.",
    why: "The part of a Japanese fibre order that actually stalls is rarely the paperwork — it is the phone call to a management company that needs permission for a drilled wall.",
  },
  {
    item: "The gap before it is live",
    detail: "A bridge rental is offered while a fibre installation is pending.",
    why: "Ask for it when you order rather than when you notice. A month without a line in a flat you work from is the one cost no price table shows.",
  },
];

/** How you pay, which is the other foreigner-specific obstacle. */
const paymentRows = [
  {
    method: "International credit or debit card",
    detail:
      'Published as "most credit and debit cards, including international ones", naming VISA, MasterCard, Discover, JCB, AMEX and Diners Club.',
    note: "No Japanese card and no Japanese bank account — which is what makes this orderable in your first month rather than your third.",
  },
  {
    method: "Cash at a convenience store (Smart Pit)",
    detail: "Monthly payment with a Smart Pit number at Lawson, Family Mart, Mini Stop and others.",
    note: "It carries a deposit of two months' fees on the data and WiFi plans, so the card route is cheaper to start.",
  },
  {
    method: "Japanese bank account",
    detail: "Not required for any of the monthly plans.",
    note: "Useful to know in the order you do things: the account usually needs a residence card and a phone number first anyway.",
  },
];

const steps = [
  {
    title: "Find out what the building already has",
    desc: "Ask the agent or the management company two questions before anything else: is the building already wired for fibre, and is there an existing in-room socket. A pre-wired building is where a fibre order is a one-week remote job; a building that needs new cabling is where it becomes a month and a landlord conversation.",
  },
  {
    title: "Count the months you will live there",
    desc: `Under a year with any chance of a move, the no-installation options win on arithmetic alone: Home WiFi at ${HOME_WIFI}/month with a ¥5,500 initial fee, or the monthly Pocket WiFi at ${WIFI_100GB} for 100 GB. Two years or more in the same flat, and fibre's installation fee — ¥5,500 to ¥25,300 depending on the property — amortises away.`,
  },
  {
    title: "Order before you move in, not after",
    desc: 'Fibre is published at "1 week to 1 month" for 1 Gbps and "2 weeks to 1 month" for 10 Gbps, and that clock starts when the order is accepted, not when you get the keys. If the tenancy start date is known, the order can be too.',
  },
  {
    title: "Ask for the bridge",
    desc: "A bridge rental is offered while a fibre installation is pending. It is the difference between a month of working from a café and a month of working from the flat you are paying for, and it is easier to arrange at the point of ordering.",
  },
  {
    title: "Get the landlord question answered in writing",
    desc: "Physical installation can mean drilling, and a Japanese management company will want to approve it. The bilingual team is offered for exactly this conversation — use it, and get the answer before the engineer is booked rather than on the day.",
  },
  {
    title: "Keep a mobile fallback for the first fortnight",
    desc: `A travel eSIM costs from ${CHEAPEST_ESIM_FROM} across the four providers we price and needs no contract, which is the cheapest way to have the flat online on the night you get the keys. If several devices need it at once, an airport-counter pocket WiFi rental covers up to ${AIRPORT_WIFI.maxDevices} and the hotel-delivery one up to ${HOTEL_WIFI.maxDevices}.`,
  },
];

const faqItems = [
  {
    q: "How can a foreigner get home internet in Japan?",
    a: `Through an English-language provider that sells the line and the internet service as one monthly contract, rather than through the usual Japanese route of a fibre carrier plus a separate ISP on a two-year tie-in. The option we link is Sakura Mobile, which publishes three: Home WiFi, a plug-in rental router at ${HOME_WIFI}/month (${HOME_WIFI_TAX} tax included) with a ¥5,500 initial fee and installation stated as "Right away"; Fiber Internet 1 Gbps at the same ${HOME_WIFI}/month with an initial fee of ¥5,500 to ¥25,300 and a wait of "1 week to 1 month"; and Fiber Internet 10 Gbps at ${FIBRE_10G}/month (${FIBRE_10G_TAX} tax included) with a wait of "2 weeks to 1 month". All three are published with "No annual contract", the fibre package includes the router, the modem and the ISP, and no Japanese bank account or Japanese credit card is needed — international cards are accepted. Read off sakuramobile.jp on ${CHECKED}.`,
  },
  {
    q: "How long does fiber installation take in Japan?",
    a: `On Sakura Mobile's own published figures, "1 week to 1 month" for the 1 Gbps service and "2 weeks to 1 month" for 10 Gbps — and the variable is the building rather than the carrier. A block already wired for fibre with a socket in the room can sometimes be activated remotely, which is the one-week end; a building that needs new cabling means an engineer visit, a management-company approval and the far end of that range. Two practical consequences. Order on the day the tenancy is confirmed rather than the day you move in, because the clock starts when the order is accepted. And ask for the bridge rental the company offers while an installation is pending, because a month without a line in a flat you work from costs more than any price difference on this page. Read on ${CHECKED}.`,
  },
  {
    q: "Is a home router better than fiber for a 1-year stay?",
    a: `For most one-year stays, yes — and the reason is the initial fee and the wait rather than the monthly price, which is identical. Home WiFi and Fiber Internet 1 Gbps are both published at ${HOME_WIFI}/month (${HOME_WIFI_TAX} tax included). What differs is that Home WiFi carries a flat ¥5,500 initial fee, needs no installation and is working from the moment the device arrives, while the fibre order carries ¥5,500 to ¥25,300 depending on the property, a one-week-to-one-month wait and, in some buildings, a landlord conversation about drilling. Over twelve months that is up to about ¥20,000 and three weeks of your tenancy for a line that is faster on paper. Fibre wins where you will stay two years or more, where several people work from the flat at once, or where you upload large files for a living. Read on ${CHECKED}.`,
  },
  {
    q: "Can I get internet in Japan without a Japanese credit card?",
    a: `Yes. Sakura Mobile's payment page states it accepts "most credit and debit cards, including international ones", naming VISA, MasterCard, Discover, JCB, AMEX and Diners Club, and the monthly plans do not require a Japanese bank account. The alternative is cash at a convenience store through a Smart Pit number — accepted at Lawson, Family Mart, Mini Stop and others — which carries a deposit of two months' fees on the data and WiFi plans, so the card route is cheaper to start with. This matters more than it sounds: a Japanese bank account normally wants a residence card and a contactable phone number first, so if home internet needed a domestic card it could not be the thing you arrange in your first month — it is, in fact, the one item on an arrival checklist you can order with a foreign card on day one. Read on ${CHECKED}.`,
  },
  {
    q: "Do I need my landlord's permission for home internet in Japan?",
    a: "For a fibre line, often yes; for a plug-in home router or a pocket WiFi, no. The reason is physical: a fibre installation in a building that is not already wired can mean running cable and drilling, which is a change to someone else's property and therefore a management company's decision. Some buildings are pre-wired and some installations are done remotely with no visit at all, which is why the published lead time is a range rather than a date. Sakura Mobile offers a bilingual team for questions involving your landlord, which is the part of this that actually stalls — not the form, the phone call. If permission looks slow or unlikely, the home router and the monthly pocket WiFi both sidestep it entirely.",
  },
  {
    q: "What about a six-month lease or a sharehouse?",
    a: `Take one of the no-installation options and do not look back. Home WiFi at ${HOME_WIFI}/month with a ¥5,500 initial fee and no installation, or the monthly Pocket WiFi at ${WIFI_100GB}/month for 100 GB and ${WIFI_200GB} for 200 GB on SoftBank 4G/LTE, published with "no two-year contract" and a ¥5,500 activation fee. The pocket router has one property the others do not: it is a device, not an address, so it moves with you — which is worth something on a six-month stay that might become a different room. And check the obvious thing first: most Japanese sharehouses include a shared line in the rent, in which case the whole question is whether that line is fast enough for how you work, not what to buy. Read on ${CHECKED}.`,
  },
  {
    q: "Can I just tether my phone instead?",
    a: `You can, and it is the most expensive answer on this page. Sakura Mobile's resident Data Only plan tops out at 100 GB for ${MOBILE_100GB}/month (¥11,528 tax included) — roughly ¥3,500 a month more than unlimited Home WiFi, for an allowance that has a ceiling. The 60 GB tier at ¥6,480 is close to the home price with a cap attached. A tethered phone also has to be in the flat, charged and not in your pocket somewhere else, which is fine for a week of waiting and poor as an arrangement. The one case where it genuinely wins is a stay short enough that no monthly home contract makes sense at all. Read on ${CHECKED}.`,
  },
  {
    q: "What do I use while I wait for the line?",
    a: `A bridge rental is offered by the provider itself while a fibre installation is pending, and that is the first thing to ask for. Beyond it, two options need nothing from anyone: a travel eSIM, from ${CHEAPEST_ESIM_FROM} across the four providers we price, installed before you fly and working the moment you land; or a pocket WiFi rental, which is the better answer when a laptop, a TV stick and two phones all need the same connection — the airport-counter rental covers up to ${AIRPORT_WIFI.maxDevices} devices and the hotel-delivery one up to ${HOTEL_WIFI.maxDevices}, posted back in a prepaid envelope. eSIM prices checked ${PRICES_CHECKED}; rental specs read ${specsCheckedAt} and daily rates ${ratesCheckedAt}.`,
  },
  {
    q: "Is the unlimited home internet really unlimited?",
    a: 'Sakura Mobile publishes its Home Internet as an unlimited service and its fibre tiers with maximum speeds of 1 Gbps and 10 Gbps, adding its own caveat that "actual customer speeds are not guaranteed". That caveat is the honest part and it is worth reading literally: a published maximum on a shared building line is a ceiling, not a rate, and the figure you measure in the evening on a fibre tier in a busy block will be lower. What the unlimited label does rule out is the thing that makes a mobile plan unusable as a home line — a monthly allowance you can exhaust in a fortnight of video calls. Read on ' + CHECKED + ".",
  },
  {
    q: "What does the first month actually cost?",
    a: `Add the initial fee to the first monthly charge, because that is the number that surprises people. Home WiFi: ¥5,500 plus ${HOME_WIFI_TAX} tax included, so about ¥13,200 to be connected and running. Fiber 1 Gbps: ¥5,500 to ¥25,300 plus ${HOME_WIFI_TAX}, so anywhere from about ¥13,200 to ¥33,000 depending on what the building needs. Fiber 10 Gbps: the same initial-fee range plus ${FIBRE_10G_TAX}. Monthly Pocket WiFi: ¥5,500 activation plus ¥5,478 for 100 GB. After that it is the monthly figure alone, with no annual contract and, on Home WiFi, no early-termination penalty. All figures published by Sakura Mobile and read on ${CHECKED}; the fibre range is the company's own, because the work a property needs is what moves it.`,
  },
];

const TITLE = "Japan Home Internet for Foreigners: Prices & Setup";
const DESCRIPTION =
  "Japan Home Internet for Foreigners: Sakura Mobile's home router from ¥6,980/month with no installation, or fibre at the same price with a 1-month wait.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/esim/japan-home-internet-for-foreigners") },
});

export default function JapanHomeInternetForForeignersPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-home-internet-for-foreigners" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-home-internet-for-foreigners" />
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
              route: "/guides/esim/japan-home-internet-for-foreigners",
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
                  name: "Japan Home Internet for Foreigners",
                  item: "https://www.japan-travel-kit.com/guides/esim/japan-home-internet-for-foreigners",
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
          <span className={styles.breadCurrent}>Home Internet for Foreigners</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan Home Internet for Foreigners:<br />Router, Fibre or Pocket WiFi
          </h1>
          <p className={styles.heroSubtitle}>
            The monthly prices are almost identical. What separates these three is the initial fee, the wait
            before it works and whether your landlord has to say yes.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices, dated", "Installation lead times", "No annual contract"].map((t) => (
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
            <strong>Japan home internet for foreigners</strong> comes down to three products, and the
            English-language provider we link is <strong>Sakura Mobile</strong>: a plug-in{" "}
            <strong>Home WiFi</strong> router at <strong>{HOME_WIFI}/month</strong> ({HOME_WIFI_TAX} tax
            included) with a <strong>¥5,500</strong> initial fee and installation stated as{" "}
            <strong>&ldquo;Right away&rdquo;</strong>; <strong>Fiber Internet 1 Gbps</strong> at the same{" "}
            {HOME_WIFI}/month but with a <strong>¥5,500–25,300</strong> initial fee and a wait of{" "}
            <strong>&ldquo;1 week to 1 month&rdquo;</strong>; and <strong>Fiber Internet 10 Gbps</strong> at{" "}
            <strong>{FIBRE_10G}/month</strong> ({FIBRE_10G_TAX} tax included), <strong>
            &ldquo;2 weeks to 1 month&rdquo;</strong>. All three are published with{" "}
            <strong>&ldquo;No annual contract&rdquo;</strong> — which is the clause that matters, because the
            standard Japanese fixed-line offer is a two-year tie-in. For a stay of a year or less, or a
            building that will not take a line, the monthly <strong>Pocket WiFi</strong> is{" "}
            {WIFI_100GB}/month for 100 GB and {WIFI_200GB} for 200 GB. No Japanese bank account and no
            Japanese credit card are needed for any of them, and the provider offers a bridge rental while a
            fibre installation is pending. All figures read off sakuramobile.jp on {CHECKED}.
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
                <p className={styles.verdictStatLabel}>Fastest to working</p>
                <p className={styles.verdictStatValue}>Home WiFi, {HOME_WIFI}/mo</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Fibre wait</p>
                <p className={styles.verdictStatValue}>1 week to 1 month</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Contract</p>
                <p className={styles.verdictStatValue}>No annual contract</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Japanese card needed?</p>
                <p className={styles.verdictStatValue}>No — international card</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> on a one-year stay take the plug-in Home WiFi router — same monthly
              price as 1 Gbps fibre, a flat ¥5,500 initial fee instead of up to ¥25,300, nothing to install
              and no landlord to ask. Choose fibre if you will be in the same flat for two years or more, or
              if more than one person works from it. Choose the monthly pocket WiFi if you expect to move, or
              if the building refuses a line.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.verdictBtn}>
                See Sakura Mobile home internet →
              </a>
              <KlookLink href={AIRPORT_WIFI.affiliateUrl} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check a pocket WiFi for the wait →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Q1 — the comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>How Can a Foreigner Get Home Internet in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Through a provider that sells the line and the internet service as one English-language monthly
            contract, rather than the usual Japanese arrangement of a fibre carrier plus a separate ISP on a
            two-year tie-in. Here is the whole choice, with the column most people skip — the wait — in the
            middle.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Monthly", "Up front", "Time until it works", "Installation", "Who it suits"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {optionRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.option}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.84rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.upfront}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.wait}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.install}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.suits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Every figure is Sakura Mobile&apos;s own, read off its published home internet, pocket WiFi and
            monthly price pages on {CHECKED}; the initial-fee range on fibre is the company&apos;s, because
            what a property needs is what moves it. The tethering row uses the resident Data Only plan&apos;s
            published 100 GB price from the same list. Our{" "}
            <Link href="/guides/esim/japan-sim-card-long-term-stay" style={{ color: "var(--text)", fontWeight: 600 }}>
              long-term stay SIM guide
            </Link>{" "}
            covers the phone side, and{" "}
            <Link href="/guides/esim/best-pocket-wifi-japan" style={{ color: "var(--text)", fontWeight: 600 }}>
              best pocket WiFi for Japan
            </Link>{" "}
            compares the two short-term rentals we link.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              See Sakura Mobile home internet →
            </a>
          </div>
        </section>

        {/* Q2 — the wait */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The wait</span>
          <h2 className={styles.sectionTitle}>How Long Does Fibre Installation Take in Japan?</h2>
          <p className={styles.bodyText}>
            <strong>&ldquo;1 week to 1 month&rdquo;</strong> for the 1 Gbps service and{" "}
            <strong>&ldquo;2 weeks to 1 month&rdquo;</strong> for 10 Gbps, on the provider&apos;s own
            published figures — and the variable is the building, not the carrier. A block already wired for
            fibre with a socket in the room can sometimes be activated remotely, which is the one-week end of
            that range. A building that needs new cabling means an engineer visit, a management-company
            approval and the far end of it.
          </p>
          <p className={styles.bodyText}>
            Two things follow. First, order on the day the tenancy is confirmed rather than the day you move
            in: the clock starts when the order is accepted, and a Japanese lease start date is usually known
            weeks in advance. Second, ask for the <strong>bridge rental</strong> the provider offers while an
            installation is pending — it is far easier to arrange at the point of ordering than in week three
            of working from a café. Neither of those is a price decision, and both cost more than any price
            decision on this page if you get them wrong.
          </p>
          <p className={styles.bodyText}>
            It is also the strongest argument for the plug-in router on a shorter stay. Home WiFi is
            published as working <strong>&ldquo;Right away&rdquo;</strong> from the moment the device arrives,
            with no installation at all — which on a twelve-month tenancy means you are paying for twelve
            months of internet rather than eleven. Read on {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              Check the no-installation router →
            </a>
          </div>
        </section>

        {/* Q3 — the terms, which is where the two-year trap lives */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The small print</span>
          <h2 className={styles.sectionTitle}>What Should You Check Before You Sign?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Six clauses, and the first is the one that makes this a different product from a domestic
            Japanese fixed-line contract. Everything in the middle column is published by the provider; the
            right-hand column is why it matters to someone who did not grow up with Japanese tenancy
            paperwork.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What to check", `What is published (read ${CHECKED})`, "Why it matters"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {termRows.map((row) => (
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
            The landlord row is the one that catches people, and it is worth being concrete about why. A
            physical fibre installation can mean running cable into the flat, which is a change to somebody
            else&apos;s building and therefore a management company&apos;s decision rather than yours. Some
            buildings are pre-wired and some activations are remote, which is exactly why the published lead
            time is a range. If permission looks slow or unlikely, the plug-in router and the monthly pocket
            WiFi both avoid the question entirely.
          </p>
        </section>

        {/* Klook: the gap before the line is live. */}
        <KlookTripPrep
          label="While you wait"
          heading="What Covers the Flat Before the Line Is Live?"
          intro="A Japanese tenancy almost never starts with a working connection, and a fibre order is published at one week to one month. Ask the provider for its bridge rental first — then these are the no-contract ways to have the flat online on the night you get the keys."
          items={homeInternetGapPrep}
        />

        {/* Q4 — the 1-year decision */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The decision</span>
          <h2 className={styles.sectionTitle}>Is a Home Router Better Than Fibre for a 1-Year Stay?</h2>
          <p className={styles.bodyText}>
            For most one-year stays, <strong>yes</strong> — and not because of the monthly price, which is
            identical. Home WiFi and Fiber Internet 1 Gbps are both published at {HOME_WIFI}/month (
            {HOME_WIFI_TAX} tax included). The difference is everything around it: a flat{" "}
            <strong>¥5,500</strong> initial fee against <strong>¥5,500 to ¥25,300</strong>, nothing to install
            against a one-week-to-one-month wait, and no landlord conversation against a possible one.
          </p>
          <p className={styles.bodyText}>
            Across twelve months that is up to about ¥20,000 and as much as three weeks of a tenancy you are
            already paying rent on, in exchange for a line that is faster on paper. Both services are
            published with no annual contract, and Home WiFi adds &ldquo;no subsidized device, no
            early-termination penalty&rdquo; — so the shorter-commitment option is not being paid for with a
            worse exit.
          </p>
          <p className={styles.bodyText}>
            Fibre earns its place in three cases, and they are worth being honest about. Two years or more in
            the same flat, where the installation fee amortises and the stability is simply better. A
            household where two or three people work from it at the same time. And work that uploads large
            files — video, photography, backups — where the asymmetry of a wireless home router shows up
            fastest. If you are in one of those, the 10 Gbps tier at {FIBRE_10G}/month ({FIBRE_10G_TAX} tax
            included) is the one to price, remembering the published maximum is a ceiling and the provider
            states actual speeds are not guaranteed.
          </p>
        </section>

        {/* Q5 — paying for it without a Japanese card */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Paying</span>
          <h2 className={styles.sectionTitle}>Can You Get Internet in Japan Without a Japanese Credit Card?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, and it is the clause that decides whether this is something you arrange in your first month
            or your third — because a Japanese bank account normally wants a residence card and a contactable
            phone number before it will open.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["How you pay", `What is published (read ${CHECKED})`, "What it means"].map((h) => (
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
            If you are arriving on a working-holiday or student status, the order of operations is the real
            subject and we have written it out separately: our{" "}
            <Link href="/guides/esim/japan-sim-card-working-holiday">working holiday SIM card guide</Link>{" "}
            follows the residence card, the 14-day address registration and the bank account in the order
            they unlock each other, and our{" "}
            <Link href="/guides/esim/japan-sim-card-long-term-stay">long-term stay SIM guide</Link> makes the
            wider case for a resident plan over a travel one. Home internet is the one item on that list you
            can order with a foreign card on day one.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              See Sakura Mobile home internet →
            </a>
            <KlookLink href={HOTEL_WIFI.affiliateUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the hotel-delivery router →
            </KlookLink>
          </div>
        </section>

        {/* How to do it */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How Do You Get It Set Up, In Order?</h2>
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
              See Sakura Mobile home internet →
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
                  <rect x="7" y="2" width="10" height="20" rx="2" />
                  <path d="M11 18h2" />
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
            <Link href="/guides/esim/pocket-wifi-vs-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="6" width="8" height="12" rx="1.5" />
                  <rect x="13" y="6" width="8" height="12" rx="1.5" />
                  <path d="M6 10h2M16 10h2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Pocket WiFi vs eSIM for Japan (2026): Which Is Better?</p>
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
            <h2 className={styles.ctaBannerTitle}>Get the flat online without a two-year contract</h2>
            <p className={styles.ctaBannerDesc}>
              A plug-in router from {HOME_WIFI}/month that works the day it arrives, or fibre at the same
              price with a one-week-to-one-month wait — both published with no annual contract, both payable
              on an international card. A pocket WiFi covers the gap in between.
            </p>
            <div className={styles.pickCtaRow}>
              <a href={SAKURA_AFFILIATE} target="_blank" rel={SAKURA_REL} className={styles.ctaBannerBtn}>
                View Sakura Mobile home internet →
              </a>
              <KlookLink href={AIRPORT_WIFI.affiliateUrl} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View pocket WiFi rentals →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
