import Head from "next/head";
import Link from "next/link";
import EsimPageAnswer from "../../../components/EsimPageAnswer";
import EsimDaysTable from "../../../components/EsimDaysTable";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import {
  formatUsd,
  getProvider,
  priceFrom,
  priceFromLabel,
  pricesCheckedLabel,
  siteCheapest,
  unlimitedFromLabel,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { klookEsim } from "../../../lib/klook-links";
import { cheapestPerDay, ratesCheckedAt as wifiRatesCheckedAt } from "../../../lib/pocket-wifi";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaTop } from "../../../components/EsimCta";
import BookingEsimCard from "../../../components/BookingEsimCard";
import SimbyeOffer from "../../../components/SimbyeOffer";
import { SIMBYE_SPECS_CHECKED_AT } from "../../../lib/esim-specs";

// Networks, prices and affiliate links come from data/esim-prices.json (refreshed daily).
const link = (id: EsimProviderId) => getProvider(id).affiliateUrl;
const pricesCheckedAt = pricesCheckedLabel();

// Pocket WiFi rates are hand-checked off the Klook listings — see lib/pocket-wifi.ts.
const cheapestWifi = cheapestPerDay();

const cheapestEsim = siteCheapest();
const cheapestEsimLabel = cheapestEsim
  ? `${formatUsd(cheapestEsim.priceUsd)} (${cheapestEsim.provider} ${cheapestEsim.name})`
  : "—";

/**
 * The date the non-price facts on this page were last read off a primary source:
 * Apple's eSIM support pages, Google's Pixel eSIM page, Sakura Mobile's travel eSIM
 * page, Airalo's Japan page and AT&T's Japan roaming page. Prices have their own
 * check dates (data/esim-prices.json for eSIMs, lib/pocket-wifi.ts for routers).
 */
const FACTS_CHECKED = "21 Oct 2026";

// Holafly runs no affiliate programme we can join (impact: Airalo only — checked 9 Oct 2026),
// so its purchase CTA points at Airalo's unlimited plans, the closest approved alternative.
const HOLAFLY_ALT_LABEL = "Get Airalo unlimited eSIM →";
const HOLAFLY_ALT_NOTE = "Holafly is not available through our links — Airalo is our recommended alternative.";

/**
 * The date the band lists, the phone lists and the unlock steps below were read off the
 * carriers', Apple's, Google's and Samsung's own pages.
 */
const BANDS_CHECKED = "2026-11-14";

/**
 * Each carrier's domestic bands, as the carrier itself marks them on a handset's frequency
 * sheet: docomo's spec page lists only docomo bands in its domestic table (and flags 8, 26
 * and 41 as "not usable on docomo"); au shades "frequencies au provides"; SoftBank stars
 * "frequency bands SoftBank provides". au's sheet shades n78 too but footnotes it as not
 * usable with an au SIM, so it is left out.
 */
const bandRows = [
  {
    carrier: "NTT docomo",
    lte: "1, 3, 19, 21, 28, 42",
    nr: "n1, n28, n78, n79, n257",
    source: "docomo spec page, Galaxy A54 5G SC-53D (info as of 30 Sep 2024)",
    url: "https://www.docomo.ne.jp/support/product/sc53d/spec.html",
  },
  {
    carrier: "KDDI (au)",
    lte: "1, 3, 11, 18, 26, 28, 41, 42",
    nr: "n3, n28, n41, n77, n257",
    source: "au frequency sheet, Galaxy S24 Ultra SCG26 (Apr 2024)",
    url: "https://www.au.com/content/dam/au-com/mobile/product/smartphone/galaxy_s24_ultra/pdf/galaxy_s24_ultra_syuuhasu.pdf",
  },
  {
    carrier: "SoftBank",
    lte: "1, 3, 8, 11, 28, 41, 42",
    nr: "n3, n28, n77, n257",
    source: "SoftBank frequency sheet, AQUOS R8 pro (May 2023)",
    url: "https://www.softbank.jp/mobile/set/common/pdf/products/aquos-r8-pro/spectrum.pdf",
  },
];

/** The eSIM phone lists as Apple, Google and Samsung publish them, plus the unlock check. */
const deviceRows = [
  {
    maker: "Apple iPhone",
    phones: "iPhone XS, iPhone XS Max, iPhone XR, or later",
    watch:
      "Bought in mainland China: only iPhone 18 Pro, 18 Pro Max, iPhone Duo, 17e and iPhone Air support eSIM. Hong Kong and Macao: certain models have two nano-SIM slots instead.",
    unlock: "Settings → General → About: “No SIM restrictions” next to Carrier Lock means it is unlocked.",
    source: "https://support.apple.com/en-us/118227",
  },
  {
    maker: "Google Pixel",
    phones: "Pixel 4 and later — all of them",
    watch:
      "Pixel 3a: not if bought with Verizon service or in Japan. Pixel 3: only some US and Canadian carriers' phones, and not if bought in Australia, Taiwan or Japan.",
    unlock: "Ask the carrier that sold the phone to confirm it is unlocked.",
    source: "https://support.google.com/pixelphone/answer/7086887?hl=en",
  },
  {
    maker: "Samsung Galaxy",
    phones: "Galaxy S20, S20+, S20 Ultra and every S series since (S21–S26); Galaxy Fold, Z Flip, Z Fold2 and every Z model since; S23 FE to S26 FE",
    watch: "Galaxy A models take eSIM only in the regions Samsung names (for example A54: Europe, North America, Korea, Japan).",
    unlock: "Ask the carrier that sold the phone to confirm it is unlocked.",
    source: "https://www.samsung.com/uk/support/mobile-devices/galaxy-esim-and-supported-network-carriers/",
  },
];

/**
 * Travel eSIMs by the networks they name. Networks for the five feed providers come from
 * data/esim-prices.json; Klook's from the listing (lib/klook-esim-facts.ts).
 */
const travelEsimNetworks = [
  { provider: "Simbye", network: getProvider("simbye").network, checked: SIMBYE_SPECS_CHECKED_AT },
  { provider: "Klook eSIM", network: "SoftBank 5G / IIJ (docomo)", checked: klookEsim.checkedAt },
  { provider: "Airalo", network: getProvider("airalo").network, checked: pricesCheckedAt },
  { provider: "eSIM Go", network: getProvider("esimgo").network, checked: pricesCheckedAt },
  { provider: "Holafly", network: getProvider("holafly").network, checked: pricesCheckedAt },
  { provider: "Sakura Mobile", network: getProvider("sakura").network, checked: pricesCheckedAt },
];

/**
 * eSIM against the three alternatives, on the four things that actually differ.
 * Every "price" cell names where its figure comes from, because the four are
 * sourced four different ways: eSIMs from data/esim-prices.json (scraped daily),
 * routers from the Klook listings in lib/pocket-wifi.ts (hand-checked), the
 * physical SIM from Sakura Mobile's own site, roaming from a carrier tariff page.
 */
const connectivityOptions = [
  {
    option: "Travel eSIM",
    live:
      "Install at home over WiFi before you fly; the plan starts when the phone first registers on a Japanese network after landing",
    number: "No — data-only on almost every travel plan",
    tethering: "Yes on most plans (Holafly caps hotspot at 1 GB/day)",
    price: `From ${cheapestEsimLabel}`,
    priceSource: `provider sites via data/esim-prices.json, read ${pricesCheckedAt}`,
  },
  {
    option: "Physical SIM card",
    live:
      "On arrival — insert the card from an airport counter or vending machine, or pre-order one for airport or hotel collection",
    number: "Only on a voice plan, which needs ID verification in person",
    tethering: "Yes",
    price: "Sakura Mobile sells prepaid SIM cards alongside its eSIMs",
    priceSource: `sakuramobile.jp, checked ${FACTS_CHECKED}`,
  },
  {
    option: "Pocket WiFi router",
    live:
      "On arrival — collect the router at an airport counter, or have it delivered to your hotel before you check in",
    number: "No — it is a hotspot, not a phone line",
    tethering: `It is nothing but tethering: up to ${cheapestWifi.maxDevices} devices share it`,
    price: `From ${formatUsd(cheapestWifi.fromUsdPerDay)}/day (${cheapestWifi.name})`,
    priceSource: `the Klook listing, hand-checked ${wifiRatesCheckedAt}`,
  },
  {
    option: "Home-carrier roaming",
    live: "Already live — nothing to install, nothing to collect",
    number: "Keeps your own number, calls and texts included",
    tethering: "Usually, but check your plan's hotspot allowance",
    price: "AT&T International Day Pass: $12/day/line, $6 per extra line",
    priceSource: `att.com (Japan named as a destination), checked ${FACTS_CHECKED}`,
  },
];

const preflightChecks = [
  "Phone is eSIM-compatible (see list below)",
  "Phone is carrier-unlocked",
  "iOS or Android is up to date",
  "eSIM purchased and QR code saved as a screenshot",
  "Plan activation timing confirmed (some activate on first use, others on a fixed date)",
];

const whereItWorks = [
  {
    title: "Major cities",
    desc: "Tokyo, Osaka, Kyoto, Yokohama, Nagoya, Sapporo, Fukuoka — full 4G/5G across the entire city footprint, including subways and underground malls.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" /><line x1="9" y1="9" x2="9" y2="9" /><line x1="9" y1="13" x2="9" y2="13" /><line x1="9" y1="17" x2="9" y2="17" />
      </svg>
    ),
    works: true,
  },
  {
    title: "Regional cities",
    desc: "Hiroshima, Sendai, Kanazawa, Kumamoto, Nagasaki — reliable coverage throughout each city and on the JR lines connecting them.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" /><path d="M5 21V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v13" /><line x1="9" y1="9" x2="9" y2="13" /><line x1="15" y1="9" x2="15" y2="13" />
      </svg>
    ),
    works: true,
  },
  {
    title: "Rural & mountain areas",
    desc: "Coverage is strong on popular tourist routes (Hakone, Nikko, Takayama), but pockets of weak signal exist deep in the mountains. Docomo-based providers handle this best.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 18 9 12 14 17 21 10" /><polyline points="14 10 21 10 21 17" />
      </svg>
    ),
    works: true,
  },
  {
    title: "Shinkansen (bullet train)",
    desc: "Yes — works comfortably for browsing and messaging. Brief drops happen in long tunnels but signal returns within seconds.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="16" height="10" rx="2" /><line x1="8" y1="20" x2="8" y2="18" /><line x1="16" y1="20" x2="16" y2="18" />
      </svg>
    ),
    works: true,
  },
  {
    title: "Mt. Fuji climbing routes",
    desc: "Lower stations and most of the trail have working signal. Coverage near the summit is patchy and weather-dependent. Don't rely on data above the 8th station.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20l5-8 4 5 3-4 6 7H3z" /><circle cx="17" cy="6" r="2" />
      </svg>
    ),
    works: true,
  },
];

/** The five questions that go into FAQPage; they lead the on-page FAQ too. */
const faqSchemaItems = [
  {
    q: "Is eSIM available in Japan?",
    a: "Yes. Travel eSIMs for Japan are sold online to anyone and delivered as a QR code or app install, so you can buy one at home before you fly. They connect to NTT docomo, KDDI (au) or SoftBank. No ID check is needed for a data-only plan; only a plan with a Japanese phone number needs in-person ID verification after you land.",
  },
  {
    q: "Do most travel eSIMs work on Japanese networks?",
    a: `Yes. Every travel eSIM compared on this site names docomo or SoftBank on at least one of its Japan plans: Simbye lists ${getProvider("simbye").network}; Airalo ${getProvider("airalo").network}; eSIM Go ${getProvider("esimgo").network}; Holafly ${getProvider("holafly").network}; Sakura Mobile ${getProvider("sakura").network}; Klook eSIM SoftBank 5G / IIJ (docomo). You do not choose the network yourself.`,
  },
  {
    q: "Do travel eSIMs work on Japan's LTE bands?",
    a: "Yes, on any phone that supports LTE Bands 1 and 3: both are on docomo's, KDDI's and SoftBank's own band lists. docomo also uses Bands 19, 21, 28 and 42; KDDI 11, 18, 26, 28, 41 and 42; SoftBank 8, 11, 28, 41 and 42 (carrier frequency sheets, checked 14 Nov 2026).",
  },
  {
    q: "Do I need an eSIM for Japan?",
    a: "You need some way to get data, and an eSIM is the only option you can set up before you leave home. A physical SIM, a pocket WiFi router or your home carrier's roaming also work; roaming keeps your own number but AT&T's International Day Pass is $12 a day per line.",
  },
  {
    q: "Which phones support eSIM in Japan?",
    a: "iPhone XS, XS Max, XR or later (Apple); Pixel 4 and later (Google, with exceptions for Pixel 3 and 3a); Galaxy S20 and later and the Galaxy Fold and Z series (Samsung). The phone must also be carrier-unlocked: on an iPhone, Settings → General → About shows “No SIM restrictions” next to Carrier Lock.",
  },
];

const faqItems = [
  ...faqSchemaItems,
  {
    q: "Does eSIM work in rural Japan?",
    a: "Generally, yes. eSIM providers in Japan run on Docomo, SoftBank or au/KDDI — all three have strong nationwide coverage, including most rural and tourist areas. Docomo has the broadest reach, especially in mountainous regions. Very remote villages or deep mountains may have weak signal regardless of carrier.",
  },
  {
    q: "Does eSIM work on the Shinkansen?",
    a: "Yes. eSIMs work reliably on the Shinkansen because Docomo, SoftBank and au/KDDI have tower coverage along the entire high-speed rail network. You may briefly lose signal inside long tunnels (especially on the Tokaido and Sanyo lines), but it reconnects automatically within seconds. Onboard WiFi is also available as a fallback.",
  },
  {
    q: "Which eSIM has the best coverage in Japan?",
    a: "Providers on Docomo (eSIM Go, Sakura Mobile's 3 GB/day plans) have the widest rural coverage. Providers on SoftBank (Holafly, and Airalo, whose Japan page shows SoftBank as the primary network plus two unnamed others — checked 1 November 2026) are excellent in cities and tourist areas but slightly weaker in remote mountains. For city-only trips, the difference isn't noticeable.",
  },
  {
    q: "Can I use eSIM at Japanese airports?",
    a: "Yes — and that's the whole point. If you activate your eSIM before flying, you'll have a live 4G/5G signal the moment you turn off airplane mode at Narita, Haneda, Kansai, New Chitose, Fukuoka, or any other Japanese airport. No need to queue at airport SIM vending machines.",
  },
  {
    q: "Does eSIM work in Kyoto and Osaka?",
    a: "Yes, excellently. Kyoto and Osaka have dense Docomo, SoftBank and au/KDDI 4G/5G coverage including all temples, tourist districts, subway lines, and Universal Studios Japan. Any major eSIM provider will work reliably.",
  },
  {
    q: "Do I get a Japanese phone number with an eSIM?",
    a: "Not with a standard travel eSIM — those are data-only, so calls and texts go over apps like LINE, WhatsApp or FaceTime instead. If a Japanese number is genuinely required (a restaurant booking system, a delivery locker, a bank), Sakura Mobile sells a Travel Voice + Data eSIM that includes one for stays of up to 90 days, but its own site states that it needs in-person ID verification after you arrive, at a select airport counter or its Shinjuku office — so it cannot be switched on before you land (checked 21 Oct 2026).",
  },
  {
    q: "Do I need a passport or ID to buy a Japan eSIM?",
    a: "No. Japan has no SIM-registration requirement for the data-only travel eSIMs tourists buy, and Sakura Mobile's own site confirms its data-only eSIMs need no identity check. The exception is a plan with a Japanese phone number attached, which does require ID verification in person (checked 21 Oct 2026).",
  },
  {
    q: "Can I keep my own number while using a Japan eSIM?",
    a: "Yes, and this is the normal setup. Apple's travel eSIM page says an iPhone with a SIM tray can use a physical SIM and an eSIM together, and Apple and Google both state that iPhone 13 and later and Pixel 7 and later can run two eSIMs. Leave your home line as the voice line with data roaming switched off, and set the Japan eSIM as the data line. Your number still rings; no data goes through it, which is where the roaming bill comes from.",
  },
  {
    q: "Should I activate my eSIM before I leave or after I land?",
    a: "Install before, activate on arrival. Apple's guidance is that an iPhone needs WiFi to install a travel eSIM, which is far easier at home than at a crowded arrivals hall — and Airalo's instructions say the same. Most Japan plans then start counting from the moment the phone first connects to a Japanese network, so installing early costs you no validity. Sakura Mobile states this explicitly: you install from your country of departure, and the usage period starts once you arrive in Japan (checked 21 Oct 2026).",
  },
];

const TITLE = "Does eSIM Work in Japan? Yes — Networks, Bands & Phone Check";
const DESCRIPTION =
  "Does eSIM work in Japan? Yes: travel eSIMs run on docomo, au and SoftBank. Check your phone takes eSIM and is unlocked, then get Simbye or Klook eSIM.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/does-esim-work-in-japan") } });

export default function DoesEsimWorkInJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/does-esim-work-in-japan" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/does-esim-work-in-japan" />
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://www.japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "Does eSIM Work in Japan", item: "https://www.japan-travel-kit.com/guides/esim/does-esim-work-in-japan" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/esim/does-esim-work-in-japan",
              headline: TITLE,
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
              mainEntity: faqSchemaItems.map((item) => ({
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM &amp; SIM Cards</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Does eSIM Work in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Does eSIM Work in Japan?<br />Is eSIM Available in Japan? Does Japan Have eSIM? Yes
          </h1>
          <p className={styles.heroSubtitle}>
            The networks and LTE/5G bands, the phones that take an eSIM, and how to check
            yours is unlocked — each from the carrier&apos;s or maker&apos;s own page.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Band table", "Phone check"].map((t) => (
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
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our review or verdict.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        <p className={styles.bodyText}>
          <strong>Yes — eSIM works in Japan: travel eSIMs connect to NTT docomo, KDDI (au) and
          SoftBank, the three carriers whose own band lists are in the table below.</strong>{" "}
          What you need is a phone that supports eSIM (iPhone XS or XR and later, Pixel 4 and
          later, Galaxy S20 and later, per Apple, Google and Samsung) and is carrier-unlocked.
          Buy and install the eSIM at home before you fly, and it connects once you land and
          turn off airplane mode.
        </p>

        <BookingEsimCard lead="Is your phone ready? Get the eSIM before you fly" />

        <EsimPageAnswer route="/guides/esim/does-esim-work-in-japan" />

        <EsimDaysTable />

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>Yes ✓</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              <strong>Yes — an eSIM works anywhere in Japan, on two conditions: the phone
              must have eSIM hardware and must be carrier-unlocked.</strong>{" "}
              Travel eSIMs sold for Japan run on the three tier-one networks — Docomo,
              SoftBank and au/KDDI, which is what the four providers on this page state on
              their own plan pages ({pricesCheckedAt}) — and they are data-only: you keep
              your home number for calls and texts, and you get no Japanese phone number
              unless you buy a voice plan, which needs an in-person ID check after you land.
              You buy and install it at home over WiFi days before the flight, and the plan
              starts counting the first time your phone registers on a Japanese network after
              you turn off airplane mode — nothing has to be shown to anyone, and there is no
              SIM registration in Japan for data-only plans.
            </p>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              <strong>What actually goes wrong is at your end, not Japan&apos;s</strong> — a
              carrier-locked handset, a phone with no eSIM hardware, or a device bought in a
              market where Apple disabled eSIM. The three checks below are the whole risk.
            </p>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Check 1 — hardware</p>
                <p className={styles.verdictStatValue}>An EID in Settings → About</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Check 2 — carrier lock</p>
                <p className={styles.verdictStatValue}>The #1 cause of failure</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Check 3 — where you bought it</p>
                <p className={styles.verdictStatValue}>Mainland China: no eSIM at all</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest way to test it</p>
                <p className={styles.verdictStatValue}>eSIM Go, from {priceFrom("esimgo")}</p>
              </div>
            </div>
            <a
              href={link("airalo")}
              className={styles.verdictBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get a Japan eSIM →
            </a>
          </div>
        </div>

        <EsimCtaTop />

        {/* Yes, eSIM works */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The short answer</span>
          <h2 className={styles.sectionTitle}>Why Japan Is an Easy Place to Use an eSIM</h2>
          <p className={styles.bodyText}>
            Some countries make prepaid data awkward for visitors — mandatory SIM registration,
            ID checks at a carrier shop, plans that can only be bought in-country. Japan does none
            of that for eSIMs. You buy online from abroad, install over WiFi at home, and switch
            the profile on when you land. Nothing has to be shown to anyone.
          </p>
          <p className={styles.bodyText}>
            Coverage is not the limiting factor either. Every Japan eSIM sold to tourists runs on
            Docomo, SoftBank or KDDI, all of which have effectively universal 4G and expanding 5G.
            That holds in the places tourists actually are: city streets, underground stations,
            temples, the popular hiking routes, and the Shinkansen between cities.
          </p>
          <p className={styles.bodyText}>
            Which leaves your handset as the only real variable — and the rest of this page is
            about checking it. Once your phone passes, see our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              full comparison of the four Japan eSIM providers
            </Link>{" "}
            for which plan to buy. Prices on this page checked {pricesCheckedAt}.
          </p>
        </section>

        {/* Networks: which carrier each travel eSIM names */}
        <section className={styles.comparisonSection} id="networks">
          <span className={styles.sectionLabel}>Networks</span>
          <h2 className={styles.sectionTitle}>Do Most Travel eSIMs Work on Japanese Networks?</h2>
          <p className={styles.bodyText}>
            Yes. All six travel eSIMs below name docomo or SoftBank on at least one Japan plan,
            so the eSIM connects to the same radio network the people around you are using.
            Which carrier matters less than whether your phone passes the two checks further
            down.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Travel eSIM</th>
                    <th>Japanese network(s) it names</th>
                    <th>Checked</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Conclusion</td>
                    <td colSpan={2} style={{ fontWeight: 700, color: "var(--sumi)" }}>
                      Most travel eSIMs run on docomo or SoftBank; three also name KDDI (au)
                    </td>
                  </tr>
                  {travelEsimNetworks.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider}>{row.provider}</td>
                      <td className={styles.tdNetwork}>{row.network}</td>
                      <td>{row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
            Last checked: {BANDS_CHECKED} (table compiled); each row&apos;s network is as the
            provider states it on its own Japan plan page, or on the Klook eSIM listing, on the
            date shown. Official pages: https://www.airalo.com/japan-esim ·
            https://esim.holafly.com/esim-japan/ · https://www.sakuramobile.jp/travel/esim/
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Simbye is the one that names all four Japanese networks — {getProvider("simbye").network}{" "}
            — and its Japan page says you never pick a network by hand. How the six compare on
            price, data and tethering is in the{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              best eSIM for Japan comparison
            </Link>.
          </p>
          <SimbyeOffer />
        </section>

        {/* Bands: each carrier's own list */}
        <section className={styles.comparisonSection} id="bands">
          <span className={styles.sectionLabel}>LTE and 5G bands</span>
          <h2 className={styles.sectionTitle}>Do Travel eSIMs Work on Japan&apos;s LTE Bands?</h2>
          <p className={styles.bodyText}>
            Yes, on any phone with LTE Bands 1 and 3: both appear on docomo&apos;s, KDDI&apos;s
            and SoftBank&apos;s own band lists. The table is each carrier&apos;s list as it marks
            it on a handset frequency sheet, so you can hold it against your phone&apos;s spec page.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Carrier</th>
                    <th>4G LTE bands</th>
                    <th>5G bands</th>
                    <th>Carrier source</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Conclusion</td>
                    <td colSpan={3} style={{ fontWeight: 700, color: "var(--sumi)" }}>
                      Bands 1 and 3 are on all three lists; most travel eSIMs use docomo or SoftBank
                    </td>
                  </tr>
                  {bandRows.map((row) => (
                    <tr key={row.carrier}>
                      <td className={styles.tdProvider}>{row.carrier}</td>
                      <td>{row.lte}</td>
                      <td>{row.nr}</td>
                      <td>
                        <a href={row.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                          {row.source}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
            Last checked: {BANDS_CHECKED}. docomo&apos;s domestic table lists docomo bands only
            (it marks 8, 26 and 41 as not usable on docomo); au shades &ldquo;frequencies au
            provides&rdquo; and footnotes n78 as not usable with an au SIM; SoftBank stars
            &ldquo;frequency bands SoftBank provides&rdquo;. Official pages:{" "}
            {bandRows.map((row, i) => (
              <span key={row.carrier}>
                {i > 0 && " · "}
                <a href={row.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                  {row.url}
                </a>
              </span>
            ))}
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            An eSIM changes nothing about bands — it is the phone&apos;s radio that has to
            support them. Phones sold for one market can miss a band used elsewhere, so check
            your exact model number on the maker&apos;s spec page if it is a regional variant.
          </p>
        </section>

        {/* Phone compatibility */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Check 1 &amp; 3 — hardware and market</span>
          <h2 className={styles.sectionTitle}>Does My Phone Support eSIM?</h2>
          <p className={styles.bodyText}>
            If it is an iPhone XS or XR or later, a Pixel 4 or later, or a Galaxy S20 or later,
            yes — those are the cut-offs Apple, Google and Samsung publish. The second check is
            the carrier lock, and the table gives the place to look.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Maker</th>
                    <th>Phones with eSIM (maker&apos;s list)</th>
                    <th>Watch out for</th>
                    <th>Is it unlocked?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Conclusion</td>
                    <td colSpan={3} style={{ fontWeight: 700, color: "var(--sumi)" }}>
                      iPhone XS/XR, Pixel 4 and Galaxy S20 onward take an eSIM — if the phone is unlocked
                    </td>
                  </tr>
                  {deviceRows.map((row) => (
                    <tr key={row.maker}>
                      <td className={styles.tdProvider}>{row.maker}</td>
                      <td>{row.phones}</td>
                      <td>{row.watch}</td>
                      <td>{row.unlock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
            Last checked: {BANDS_CHECKED}. Official pages:{" "}
            {deviceRows.map((row, i) => (
              <span key={row.maker}>
                {i > 0 && " · "}
                <a href={row.source} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                  {row.source}
                </a>
              </span>
            ))}{" "}
            · https://support.apple.com/en-us/109316 (iPhone carrier lock)
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>How to check the SIM lock:</strong> on an iPhone, open Settings → General →
            About and look at Carrier Lock — &ldquo;No SIM restrictions&rdquo; means unlocked.
            Apple states that only your carrier can unlock an iPhone, and that it can take the
            carrier a few days, so ask well before the flight. On a Pixel or Galaxy, ask the
            carrier that sold the phone. Which plan suits an iPhone, and the screens to tap, are
            in{" "}
            <Link href="/guides/esim/japan-esim-iphone" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Japan eSIM for iPhone
            </Link>.
          </p>

          <BookingEsimCard lead="Phone passes both checks? Pick your Japan eSIM" />

          <p className={styles.bodyText} style={{ marginTop: "1.5rem" }}>
            The lists below are the same cut-offs in more detail (Apple and Google pages read{" "}
            {FACTS_CHECKED}, Samsung&apos;s {BANDS_CHECKED}).
          </p>
          <div className={styles.pickGrid} style={{ marginTop: "1rem" }}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>iPhone (all supported)</p>
              <ul className={styles.pickList}>
                <li><span className={styles.proIcon}>+</span>iPhone XS, XS Max, XR (2018) and later</li>
                <li><span className={styles.proIcon}>+</span>iPhone 11 through the 18 series, and iPhone Air</li>
                <li><span className={styles.proIcon}>+</span>iPhone SE (2nd gen and later), iPhone 16e, 17e</li>
                <li><span className={styles.proIcon}>+</span>U.S. iPhone 14 and later — eSIM-only</li>
                <li><span className={styles.proIcon}>+</span>iPhone 13 and later run two eSIMs at once</li>
              </ul>
            </div>
            <div className={styles.pickPros} style={{ background: "var(--paper)", borderColor: "var(--rule)" }}>
              <p className={styles.pickListLabel}>Android (major models)</p>
              <ul className={styles.pickList}>
                <li><span className={styles.proIcon}>+</span>Google Pixel 4 and later (all of them)</li>
                <li><span className={styles.proIcon}>+</span>Pixel 3a: not if bought with Verizon or in Japan</li>
                <li><span className={styles.proIcon}>+</span>Pixel 7 and later run two eSIMs at once</li>
                <li><span className={styles.proIcon}>+</span>Samsung Galaxy S20 and later (S20–S26)</li>
                <li><span className={styles.proIcon}>+</span>Samsung Galaxy Fold, Z Flip and Z Fold2 onward</li>
              </ul>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>One important caveat, and it is about where the phone was sold, not where
            you are going.</strong> Apple states that in mainland China only the iPhone 18 Pro,
            18 Pro Max, iPhone Duo, 17e and iPhone Air support eSIM at all, and that in Hong Kong and Macao
            certain models ship with two nano-SIM slots instead of an eSIM. An iPhone bought in
            those markets may therefore have no eSIM hardware whatever its generation — check the
            model number against Apple&apos;s list before you buy a plan (Apple support, checked{" "}
            {BANDS_CHECKED}). For Android, the equivalent trap is regional variants, so
            check your exact model number on the manufacturer&apos;s compatibility page.
          </p>
        </section>

        {/* Question-led answers, one heading per search phrasing. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Asked another way</span>

          <h2 className={styles.sectionTitle}>Is eSIM Available in Japan?</h2>
          <p className={styles.bodyText}>
            Yes — and you do not have to be in Japan to get one. Every provider on this page
            sells its Japan plan online to anyone, anywhere, and delivers it as a QR code or an
            in-app install, so the usual answer is that you buy it at home a few days before
            departure. Buying after you land works too: the purchase needs an internet
            connection, not a Japanese one, so airport or hotel WiFi is enough. For what the
            counters and vending machines at Narita, Haneda and Kansai sell, and their hours, see
            our{" "}
            <Link href="/guides/esim/japan-airport-sim-cards" style={{ color: "var(--accent)", fontWeight: 600 }}>
              guide to buying a SIM card or eSIM at a Japanese airport
            </Link>.
          </p>
          <p className={styles.bodyText}>
            What is <em>not</em> freely available is a Japanese phone number. Sakura
            Mobile&apos;s Travel Voice + Data eSIM includes one for stays of up to 90 days, but
            its own page states the service needs in-person ID verification at a select airport
            counter or its Shinjuku office before it starts — so a number cannot be arranged
            from abroad (checked {FACTS_CHECKED}).
          </p>

          <h2 className={styles.sectionTitle} style={{ marginTop: "2rem" }}>Does Japan Have eSIM?</h2>
          <p className={styles.bodyText}>
            Yes. All three tier-one Japanese carriers — NTT Docomo, SoftBank and au/KDDI — carry
            eSIM traffic, and the four travel providers compared on this site name one or more of
            them as the network behind their Japan plans: {getProvider("airalo").network} for
            Airalo, {getProvider("esimgo").network} for eSIM Go,{" "}
            {getProvider("holafly").network} for Holafly and {getProvider("sakura").network} for
            Sakura Mobile (read off their own plan pages, {pricesCheckedAt}). You are not on a
            second-tier reseller network: it is the same radio the people around you are using.
          </p>

          <h2 className={styles.sectionTitle} style={{ marginTop: "2rem" }}>Do I Need an eSIM for Japan?</h2>
          <p className={styles.bodyText}>
            You need <em>some</em> way to get data — Japan&apos;s free public WiFi is patchy and
            sign-up-heavy, and the things you will actually lean on (Google Maps for the subway,
            IC-card top-ups, restaurant queue apps, train disruption alerts) all want a live
            connection. An eSIM is the cheapest and the only one of the four options you can set
            up before leaving home, but it is not the only option, and it is the wrong one if
            your phone fails either check above or if your group would rather share one device.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Option</th>
                    <th>When it goes live</th>
                    <th>Japanese phone number</th>
                    <th>Tethering</th>
                    <th>Price (and where the figure comes from)</th>
                  </tr>
                </thead>
                <tbody>
                  {connectivityOptions.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td>{row.live}</td>
                      <td>{row.number}</td>
                      <td>{row.tethering}</td>
                      <td>
                        {row.price}
                        <span style={{ display: "block", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem", fontWeight: 500 }}>
                          Source: {row.priceSource}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The roaming row is the one worth doing the arithmetic on. One day of AT&amp;T&apos;s
            Day Pass costs more than most whole-trip Japan eSIM plans, and a fortnight of it is
            capped at $120 — against {cheapestEsimLabel} for the cheapest eSIM in our catalogue.
            Roaming earns its price only when you must keep your own number reachable for calls
            and texts, and even then the usual answer is to keep the home line for voice and put
            the data on an eSIM. Full workings in{" "}
            <Link href="/guides/esim/japan-sim-card-vs-esim-2026" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Japan SIM card vs eSIM
            </Link>{" "}
            and{" "}
            <Link href="/guides/esim/pocket-wifi-vs-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              pocket WiFi vs eSIM
            </Link>
            ; if a group will share one connection instead, the{" "}
            <Link href="/guides/esim/best-pocket-wifi-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              best pocket WiFi in Japan
            </Link>{" "}
            compares the rentals on devices, battery and pickup.
          </p>

          <h2 className={styles.sectionTitle} style={{ marginTop: "2rem" }}>How Does an eSIM Work in Japan?</h2>
          <p className={styles.bodyText}>
            An eSIM is a carrier profile downloaded into a chip already soldered into your phone,
            so &ldquo;working in Japan&rdquo; means the profile holds an agreement with a Japanese
            network and your phone is allowed to use it. In practice there are four moments.
            First, you buy online and get a QR code or an app install. Second, you add the profile
            over WiFi at home — Apple&apos;s own instruction is that the iPhone &ldquo;must be
            connected to a WiFi network or hotspot&rdquo; for this, which is why doing it in an
            arrivals hall is a bad idea. Third, you land, turn off airplane mode, and the profile
            registers on Docomo, SoftBank or au/KDDI; most plans start their clock at that moment,
            not at purchase. Fourth, you set the eSIM as your data line and turn data roaming
            <em> off</em> on your home line, which is the toggle that produces surprise bills.
          </p>
          <p className={styles.bodyText}>
            Because the eSIM sits alongside your existing SIM rather than replacing it, your home
            number keeps ringing throughout. Apple supports one physical SIM plus one eSIM from
            iPhone XS onwards and two eSIMs from iPhone 13 onwards; Google lists eSIM on every
            Pixel from Pixel 4 and two eSIMs at once from Pixel 7 (checked {BANDS_CHECKED}).
            Step-by-step screens for both platforms are in{" "}
            <Link href="/guides/esim/how-to-set-up-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              how to set up an eSIM in Japan
            </Link>.
          </p>

          <h2 className={styles.sectionTitle} style={{ marginTop: "2rem" }}>How to Get an eSIM for Japan?</h2>
          <p className={styles.bodyText}>
            Four steps, and the whole thing takes about ten minutes at home. There is no shop to
            visit, no passport to show and nothing that sells out, which is the main practical
            difference from a physical SIM.
          </p>
          <div className={styles.pickGrid} style={{ marginTop: "1rem" }}>
            <div className={styles.pickPros} style={{ gridColumn: "1 / -1" }}>
              <p className={styles.pickListLabel}>How to buy an eSIM for Japan</p>
              <ul className={styles.pickList}>
                <li>
                  <span className={styles.proIcon}>1</span>
                  Check the two conditions: an EID in Settings → General → About, and
                  &ldquo;No SIM Restrictions&rdquo; next to Carrier Lock on the same screen —
                  Apple&apos;s own way of confirming the phone is unlocked.
                </li>
                <li>
                  <span className={styles.proIcon}>2</span>
                  Pick a plan by trip length and data, not by headline price: a cheap plan whose
                  validity expires before you fly home is no use.
                </li>
                <li>
                  <span className={styles.proIcon}>3</span>
                  Buy online and install the profile over home WiFi, ideally a day or two before
                  the flight. Save the QR code as a screenshot in case you need to reinstall.
                </li>
                <li>
                  <span className={styles.proIcon}>4</span>
                  On landing, switch the Japan eSIM on as your data line, enable data roaming for
                  that profile only, and turn data roaming off on your home line.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pre-flight checks */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Check 2 — carrier lock</span>
          <h2 className={styles.sectionTitle}>What You Need to Check Before Flying</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros} style={{ gridColumn: "1 / -1" }}>
              <p className={styles.pickListLabel}>Checklist</p>
              <ul className={styles.pickList}>
                {preflightChecks.map((c) => (
                  <li key={c}><span className={styles.proIcon}>✓</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The most common reason a Japan eSIM doesn&apos;t work is that the phone is carrier-locked
            — not a fault with the eSIM itself. If you&apos;re unsure, contact your home carrier and
            ask whether your handset is fully unlocked for international use.
          </p>
        </section>

        {/* Where does eSIM work */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Coverage map</span>
          <h2 className={styles.sectionTitle}>Where Does eSIM Work in Japan?</h2>
          <div className={styles.whoForGrid}>
            {whereItWorks.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Best eSIMs */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Recommended providers</span>
          <h2 className={styles.sectionTitle}>What eSIM to Get for Japan?</h2>
          <p className={styles.bodyText}>
            Buy the cheapest plan whose <em>validity</em> outlasts your trip and whose allowance
            covers roughly 1 GB a day, and install it two days before you fly. That rule picks the
            plan for almost everyone; the four providers below differ mainly in what they charge
            for it and whether they sell voice.
          </p>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1rem", marginBottom: "0.5rem" }}>
            Airalo — Best Overall
          </h3>
          <p className={styles.bodyText}>
            The most popular Japan eSIM. Tiered plans from 1 GB up to 20 GB plus unlimited, on{" "}
            {getProvider("airalo").network}, and an iOS app that installs the profile for you —
            useful if you are not confident navigating your phone&apos;s eSIM menus.
            From {priceFromLabel("airalo")}.
          </p>
          <a
            href={link("airalo")}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.5rem", display: "inline-flex" }}
          >
            Get Airalo Japan eSIM →
          </a>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
            eSIM Go — Best Budget
          </h3>
          <p className={styles.bodyText}>
            The cheapest way to find out whether your handset takes a Japan eSIM at all: plans
            start at {priceFromLabel("esimgo")} on {getProvider("esimgo").network}, which also
            gives it the broadest rural reach of the four. Choose this if price is your priority
            and you only need a small data allowance.
          </p>
          <a
            href={link("esimgo")}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.5rem", display: "inline-flex" }}
          >
            Get eSIM Go Japan eSIM →
          </a>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
            Unlimited data — Airalo or Holafly
          </h3>
          <p className={styles.bodyText}>
            If you would rather not track usage at all, both sell unlimited Japan plans:
            Airalo from {unlimitedFromLabel("airalo")} and Holafly from {unlimitedFromLabel("holafly")}.
            Neither is unmetered in the strict sense — Airalo applies a fair-use policy and Holafly
            caps hotspot use at 1 GB/day — so read the plan note before buying if you intend to tether.
          </p>
          <a
            href={link("airalo")}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
            style={{ marginTop: "0.5rem", display: "inline-flex" }}
          >
            {HOLAFLY_ALT_LABEL}
          </a>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
            {HOLAFLY_ALT_NOTE}
          </p>

          <h3 id="klook-japan-esim" style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
            Also available — {klookEsim.name}
          </h3>
          <p className={styles.bodyText}>{klookEsim.note}</p>
          <KlookLink
            href={klookEsim.url}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
            style={{ marginTop: "0.5rem", display: "inline-flex" }}
          >
            {klookEsim.ctaLabel}
          </KlookLink>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
            Listed on Klook as &ldquo;{klookEsim.listingTitle}&rdquo;. No price or data allowance
            is quoted here because Klook prices change by date (listing checked{" "}
            {klookEsim.checkedAt}), so it is not ranked against the four above.
          </p>
        </section>

        {/* How much data — the question this page's cluster ranks for, answered then handed off. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Sizing the plan</span>
          <h2 className={styles.sectionTitle}>How Much Data Do I Need for a Two-Week Trip to Japan?</h2>
          <p className={styles.bodyText}>
            About 10 GB, and a plan whose validity runs at least 14 days. Moderate use — Google
            Maps all day, messaging, social media, photos uploaded over hotel WiFi — comes to
            roughly 600 MB a day, so a fortnight lands near 8–9 GB and 10 GB gives you headroom
            without overpaying. Light users get away with 4–5 GB; stream video or share a hotspot
            daily and you want 14 GB or an unlimited plan.
          </p>
          <p className={styles.bodyText}>
            The trap is validity, not allowance: several plans in the current catalogue hold 10 GB
            or more but expire before day 14. Our{" "}
            <Link href="/guides/esim/japan-esim-2-weeks" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Japan eSIM for 2 weeks guide
            </Link>{" "}
            filters the whole catalogue down to the plans that clear both bars, with a day-by-day
            usage estimate. For other trip lengths, the per-GB rankings are in{" "}
            <Link href="/guides/esim/japan-esim-data-plans" style={{ color: "var(--accent)", fontWeight: 600 }}>
              every Japan eSIM data plan compared
            </Link>.
          </p>
          <div className={styles.pickGrid} style={{ marginTop: "1rem" }}>
            <div className={styles.pickPros} style={{ gridColumn: "1 / -1", background: "var(--paper)", borderColor: "var(--rule)" }}>
              <p className={styles.pickListLabel}>Which eSIM, how many days, bought when</p>
              <ul className={styles.pickList}>
                <li><span className={styles.proIcon}>✓</span>Match the plan&apos;s validity to your trip, then its data to ~1 GB per day</li>
                <li><span className={styles.proIcon}>✓</span>Install it two days before departure, over home WiFi, not at the airport</li>
                <li><span className={styles.proIcon}>✓</span>Only buy unlimited if you stream or hotspot daily — see the notes above</li>
                <li><span className={styles.proIcon}>✓</span>Buying tickets or transport on Klook already? Its own Japan eSIM keeps it to one checkout</li>
              </ul>
              <KlookLink
                href={klookEsim.url}
                className={styles.pickCta}
                target="_blank"
                rel="sponsored noopener"
                style={{ marginTop: "0.75rem", display: "inline-flex" }}
              >
                {klookEsim.ctaLabel}
              </KlookLink>
            </div>
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

        {/* Related Articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related Guides</span>
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
            <Link href="/guides/esim/how-to-set-up-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>How to Set Up an eSIM in Japan (Step-by-Step)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-iphone" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan on iPhone (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-data-plans" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Every Japan eSIM Data Plan Compared</p>
                <span className={styles.relatedArrow}>View comparison →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-sim-card-vs-esim-2026" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan SIM Card vs eSIM (2026): Which Should You Choose?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Ready to pick a Japan eSIM?</h2>
            <p className={styles.ctaBannerDesc}>
              See how Airalo, Holafly, eSIM Go, and Sakura Mobile compare on price, coverage,
              and features — with our top picks for every type of trip.
            </p>
            <Link href="/guides/esim/best-esim-japan" className={styles.ctaBannerBtn}>
              View Full eSIM Comparison →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
