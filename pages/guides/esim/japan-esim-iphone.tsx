import Head from "next/head";
import Link from "next/link";
import EsimPageAnswer from "../../../components/EsimPageAnswer";
import EsimDaysTable from "../../../components/EsimDaysTable";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import {
  cheapestAtLeastGb,
  formatUsd,
  getProvider,
  priceAtLeastLabel,
  priceFrom,
  priceFromLabel,
  pricesCheckedLabel,
  unlimitedFromLabel,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { klookEsim } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaTop } from "../../../components/EsimCta";
import BookingEsimCard from "../../../components/BookingEsimCard";
import SimbyeOffer from "../../../components/SimbyeOffer";
import { esimSpec } from "../../../lib/esim-specs";

// Prices and affiliate links come from data/esim-prices.json (refreshed daily).
const link = (id: EsimProviderId) => getProvider(id).affiliateUrl;
const pricesCheckedAt = pricesCheckedLabel();

/**
 * The date the Apple facts in the three tables and the opening answer were re-read off
 * Apple's own support pages (SIM type by model, Using Dual SIM with an eSIM, Set up eSIM
 * on iPhone, Use eSIM while traveling internationally, unlock your iPhone), and the
 * install methods off Airalo's, Simbye's and Sakura Mobile's own help pages.
 */
const CHECKED = "14 Nov 2026";
const CHECKED_ISO = "2026-11-14";

const APPLE_URLS = [
  "https://support.apple.com/en-us/118569",
  "https://support.apple.com/en-us/109317",
  "https://support.apple.com/en-us/118227",
  "https://support.apple.com/en-us/109316",
];

/**
 * The date the remaining iOS facts (EID row, Apple Wallet transit cards, the "can't set
 * up eSIM" troubleshooting order, the iPad eSIM list) were last read off Apple support.
 */
const FACTS_CHECKED = "26 Oct 2026";

const TITLE = "Best eSIM for Japan iPhone (2026): Setup & Compatible Models";
const DESCRIPTION =
  "Best eSIM for Japan iPhone: any unlocked iPhone XS/XR or later works. iPhone eSIM Japan setup in 5 steps, Apple model list, and which eSIM to buy.";

// Holafly runs no affiliate programme we can join (impact: Airalo only — checked 9 Oct 2026),
// so its purchase CTA points at Airalo's unlimited plans, the closest approved alternative.
const HOLAFLY_ALT_LABEL = "Get Airalo unlimited eSIM →";
const HOLAFLY_ALT_NOTE = "Holafly is not available through our links — Airalo is our recommended alternative.";

/**
 * Apple's "Learn which type SIM your iPhone uses" list (118569), with the active-eSIM
 * count from "Using Dual SIM with an eSIM" (109317): a physical SIM plus an eSIM on any
 * iPhone XS or later, and two eSIMs on iPhone 13 models and later. The newer rows differ
 * by the market the handset was sold in, which is the part travellers get wrong.
 */
const iphoneModels = [
  {
    model: "iPhone XS, XS Max, XR",
    esim: "Yes — eSIM + nano-SIM",
    lines: "1 eSIM (plus a physical SIM)",
    note: "XS Max and XR bought in China mainland, Hong Kong or Macao: two nano-SIM slots instead",
  },
  {
    model: "iPhone 11 and 12 series; iPhone SE (3rd gen)",
    esim: "Yes — eSIM + nano-SIM",
    lines: "1 eSIM (plus a physical SIM)",
    note: "Some models bought in China mainland, Hong Kong or Macao have two nano-SIM slots instead",
  },
  {
    model: "iPhone 13 series",
    esim: "Yes — eSIM + nano-SIM",
    lines: "2 eSIMs",
    note: "First generation Apple lists for two eSIMs at once",
  },
  {
    model: "iPhone 14, 15, 16 series and 16e",
    esim: "Yes — eSIM only if bought in the US; eSIM + nano-SIM elsewhere",
    lines: "2 eSIMs",
    note: "US models have no SIM tray, so a physical SIM is not an option",
  },
  {
    model: "iPhone 17, 17e, 17 Pro, 17 Pro Max, 18 Pro, 18 Pro Max",
    esim: "Yes — eSIM only if bought in the US, USVI, Canada, Mexico, Japan, Guam, UAE, Saudi Arabia, Bahrain, Kuwait, Qatar or Oman; eSIM + nano-SIM elsewhere",
    lines: "2 eSIMs",
    note: "Bought in China mainland: only 17e, 18 Pro and 18 Pro Max support eSIM",
  },
  {
    model: "iPhone Air, iPhone Duo",
    esim: "Yes — eSIM only",
    lines: "2 eSIMs",
    note: "No SIM tray in any market",
  },
  {
    model: "iPhone X, 8, SE (2nd gen) and earlier",
    esim: "No — nano-SIM only",
    lines: "0",
    note: "Cannot take a Japan eSIM; use a physical SIM",
  },
];

/**
 * The iOS setup in order, as a numbered table. Settings paths are Apple's (118669,
 * 109317); the Data Roaming step for the travel line is stated by Airalo and Simbye in
 * their own iPhone install guides.
 */
const iosSteps = [
  {
    step: "Buy",
    where: "Provider's website or app",
    what: "Check Settings → General → About → Carrier Lock reads “No SIM restrictions” first, then buy the Japan eSIM before you fly.",
  },
  {
    step: "Install",
    where: "Settings → Cellular → Add eSIM → Use QR Code (or the provider's app)",
    what: "On Wi-Fi, scan the QR code, or on iOS 17.4 or later touch and hold the QR code in the email and tap Add eSIM. Apple requires Wi-Fi or a hotspot to activate.",
  },
  {
    step: "Name the line",
    where: "Settings → Cellular → tap the plan → Cellular Plan Label",
    what: "Label it “Japan” so it is not confused with your home line.",
  },
  {
    step: "Switch mobile data",
    where: "Settings → Cellular → Cellular Data",
    what: "After landing, select the Japan line, and turn off Allow Cellular Data Switching so data stays on it.",
  },
  {
    step: "Data Roaming ON",
    where: "Settings → Cellular → Japan line → Data Roaming",
    what: "Turn it on for the Japan line (travel eSIMs connect as roaming; the plan is prepaid). Keep Data Roaming off on your home line.",
  },
];

type IphoneEsimRow = {
  provider: string;
  install: string;
  price: string;
  number: string;
};

/** Table 2. Install methods: each provider's own iPhone help page, read on CHECKED. */
const iphoneEsimRows: (IphoneEsimRow & { cta: "simbye" | "klook" | "airalo" | "esimgo" | "sakura" })[] = [
  {
    provider: "Simbye",
    install: "QR code by email; on iOS 17.4+ touch and hold it → Add eSIM; or enter details manually",
    price: (() => {
      const p = cheapestAtLeastGb("simbye", 10);
      return p ? `${formatUsd(p.priceUsd)} (${p.name})${p.discountedUsd ? `; ${formatUsd(p.discountedUsd)} with code` : ""}` : "—";
    })(),
    number: esimSpec("simbye").phoneNumberShort,
    cta: "simbye",
  },
  {
    provider: "Klook eSIM",
    install: "QR-code voucher",
    price: "Not quoted — Klook prices change by date",
    number: klookEsim.specPhoneNumber,
    cta: "klook",
  },
  {
    provider: "Airalo",
    install: "Airalo iOS app installs it directly; QR code or manual entry also offered",
    price: priceAtLeastLabel("airalo", 10),
    number: esimSpec("airalo").phoneNumberShort,
    cta: "airalo",
  },
  {
    provider: "eSIM Go",
    install: "QR code (no iOS app)",
    price: priceAtLeastLabel("esimgo", 10),
    number: esimSpec("esimgo").phoneNumberShort,
    cta: "esimgo",
  },
  {
    provider: "Sakura Mobile",
    install: "QR code (scan or touch and hold); the 3GB/day plan is installed only after you arrive in Japan",
    price: `${priceAtLeastLabel("sakura", 10)} — smallest plan of 10 GB+`,
    number: esimSpec("sakura").phoneNumberShort,
    cta: "sakura",
  },
];

/** The five questions that go into FAQPage; they lead the on-page FAQ too. */
const faqSchemaItems = [
  {
    q: "What is the best eSIM for Japan on iPhone?",
    a: `For a short trip with data only, a travel eSIM that installs by QR code is enough on any unlocked iPhone XS or later: Simbye has the lowest 10 GB price compared here (${(() => { const p = cheapestAtLeastGb("simbye", 10); return p ? `${formatUsd(p.priceUsd)} for ${p.name}` : "see the table"; })()}, prices checked ${pricesCheckedAt}), Airalo installs from its own iOS app, and Klook eSIM keeps it in one checkout with Klook bookings. If you need a Japanese phone number, Sakura Mobile's Voice + Data eSIM is the one that includes it.`,
  },
  {
    q: "Is my iPhone eSIM compatible in Japan?",
    a: `Yes if it is an iPhone XS, XS Max, XR or later and not carrier-locked. Apple lists iPhone 14 and later bought in the US as eSIM only, and iPhone 13 and later can keep two eSIMs active. iPhone X, 8, SE (2nd gen) and earlier take a nano-SIM only. Check Carrier Lock under Settings → General → About: “No SIM restrictions” means unlocked (Apple Support, checked ${CHECKED}).`,
  },
  {
    q: "How do I set up a Japan eSIM on iPhone?",
    a: "Before you fly, on Wi-Fi: Settings → Cellular → Add eSIM → Use QR Code (or install from the provider's app), then label the line “Japan”. After landing, select it under Settings → Cellular → Cellular Data, turn off Allow Cellular Data Switching, and turn Data Roaming on for the Japan line only.",
  },
  {
    q: "Can I keep my home number on iPhone while using a Japan eSIM?",
    a: "Yes. Apple states that with a travel eSIM for data, FaceTime and iMessage keep working on your home line, and Dual SIM lets both lines stay on. Keep Data Roaming off on the home line; your home carrier may still charge for calls or texts received abroad.",
  },
  {
    q: "Should I use an eSIM or a physical SIM on iPhone in Japan?",
    a: "An eSIM on any iPhone that has one: Apple notes it cannot be lost or removed and you install it before you leave. US iPhone 14 and later have no SIM tray, so eSIM is the only option. A physical SIM is for iPhone X, 8, SE (2nd gen) and earlier, or a model sold without eSIM support.",
  },
];

const picks = [
  {
    num: 1,
    name: "Airalo",
    badge: "Best Overall for iPhone",
    badgeColor: "var(--sumi)",
    priceFrom: priceFromLabel("airalo"),
    network: getProvider("airalo").network,
    affiliateUrl: link("airalo"),
    ctaLabel: "Get Airalo Japan eSIM →",
    pros: [
      "Dedicated iOS app installs the profile for you — no QR scan needed",
      "Top up from the app without touching iPhone Settings",
      "24/7 live chat support",
      "Trusted by 10M+ travellers worldwide",
    ],
    cons: [
      "Data-only (no voice calls or SMS)",
      "Requires eSIM-compatible iPhone (XS or later)",
    ],
    summary:
      `Airalo is the smoothest eSIM experience on iPhone, because it is the only one of the four with a native iOS app that can install the profile directly — you never open Settings → Cellular at all. Plans start at ${priceFromLabel("airalo")}.`,
  },
  {
    num: 2,
    name: "Holafly",
    badge: "Best Unlimited for iPhone",
    badgeColor: "var(--accent)",
    priceFrom: unlimitedFromLabel("holafly"),
    network: getProvider("holafly").network,
    affiliateUrl: link("airalo"),
    ctaLabel: HOLAFLY_ALT_LABEL,
    ctaNote: HOLAFLY_ALT_NOTE,
    pros: [
      "Unlimited on-device data — nothing to monitor in Settings → Cellular",
      "Plain QR-code install, so it works on every eSIM iPhone back to the XS",
      "Popular with US & European travellers",
    ],
    cons: [
      "Data-only (no voice calls or SMS)",
      "Hotspot capped at 1 GB/day — poor for tethering an iPad",
      "Pricier than capped alternatives",
    ],
    summary:
      `If you stream, use FaceTime Video heavily, or simply do not want to watch iOS's data meter, an unlimited plan removes the question. Holafly unlimited starts at ${unlimitedFromLabel("holafly")} — but note the 1 GB/day hotspot cap if you plan to tether an iPad or Mac.`,
  },
  {
    num: 3,
    name: "eSIM Go",
    badge: "Best Budget for iPhone",
    badgeColor: "var(--sumi)",
    priceFrom: priceFromLabel("esimgo"),
    network: getProvider("esimgo").network,
    affiliateUrl: link("esimgo"),
    ctaLabel: "Get eSIM Go Japan →",
    pros: [
      `Cheapest Japan eSIM at ${priceFromLabel("esimgo")}`,
      "Docomo network — excellent rural coverage",
      "Instant QR code activation via iPhone Settings",
      "Works in 190+ countries",
    ],
    cons: [
      "Data-only (no voice or SMS)",
      "No iOS app — install is QR-code only",
      "Email-only customer support",
    ],
    summary:
      `eSIM Go has no iOS app, so you install it the manual way: Settings → Cellular → Add eSIM → Use QR Code. That is two minutes of work for the lowest price of the four, from ${priceFromLabel("esimgo")}.`,
  },
  {
    num: 4,
    name: "Sakura Mobile",
    badge: "Best for Long Stay",
    badgeColor: "var(--accent)",
    priceFrom: priceFromLabel("sakura"),
    network: getProvider("sakura").network,
    affiliateUrl: link("sakura"),
    ctaLabel: "Get Sakura Mobile eSIM →",
    pros: [
      "Voice calls & SMS available (on their physical SIM plans)",
      "English phone & email support",
      "Physical SIM or eSIM available",
      "Best for stays of 1 month+",
    ],
    cons: [
      "Higher price than data-only eSIMs",
      "3GB/day plan: Sakura says install it only after you arrive in Japan",
      "Not ideal for short trips",
    ],
    summary:
      `For longer stays, Sakura Mobile is the only tourist option with real English phone support and a voice-call option. One iPhone-specific caveat from Sakura's own setup page (checked ${CHECKED}): its Unlimited eSIM can be installed before you fly, but the 3GB/day plan starts on installation, so Sakura says to install that one only after you arrive. Plans from ${priceFromLabel("sakura")}.`,
  },
];


const faqItems = [
  ...faqSchemaItems,
  {
    q: "Can I use two eSIMs at once on iPhone?",
    a: "Yes on iPhone 13 and later, which Apple says support Dual SIM with two eSIMs in addition to a physical SIM and an eSIM — so your home eSIM and a Japan eSIM can both be active. iPhone XS through iPhone 12 run one active eSIM plus one physical nano-SIM. In every case only one line carries data at a time, and you choose which under Settings → Cellular → Cellular Data.",
  },
  {
    q: "When should I install the eSIM — before or after landing?",
    a: "Before. Apple's setup instructions require the iPhone to be connected to a WiFi network or hotspot to activate an eSIM, which is exactly what you will not have between the aircraft door and passport control. Install it at home a day or two early, label it, and leave the line switched off; an installed profile that is toggled off cannot be billed, and switching it on after landing takes one tap.",
  },
  {
    q: "Will my iPhone charge roaming if I forget to switch lines?",
    a: "Data follows whichever line is selected under Settings → Cellular → Cellular Data, so if that is still your home line and its Data Roaming is on, your home carrier's roaming rates apply. Turn it off at Settings → Cellular → tap the home line → Cellular Data Options → Data Roaming. The related toggle is Allow Cellular Data Switching, which Apple describes as letting iOS use either line depending on coverage — leave it off if you want data pinned to the Japan plan. Apple's own advice on fees is to ask your carrier what its plan includes.",
  },
  {
    q: "Can I use the same eSIM on an iPad?",
    a: "No — an eSIM profile is installed on one device, and Apple's eSIM Quick Transfer moves a plan between two iPhones, not from an iPhone to an iPad. Either buy the iPad its own Japan plan (Apple lists eSIM-only cellular models including iPad Pro with M4 or M5, iPad Air with M2, M3 or M4, iPad with A16 and iPad mini with A17 Pro) or share the iPhone's connection over Personal Hotspot, which costs nothing extra as long as your plan allows tethering.",
  },
  {
    q: "My iPhone 14 has no SIM tray — does that change anything in Japan?",
    a: "Only for the better. Apple lists iPhone 14, 15 and 16 models bought in the United States as eSIM only, and from the iPhone 17 generation that extends to twelve markets including Canada, Mexico and Japan. There is no tray to fiddle with, the device can hold more than one Japan profile, and iPhone 13 and later keep two of them active at once.",
  },
  {
    q: "The eSIM installed but my iPhone says \"No Service\" in Japan — what now?",
    a: "Work through it in this order: confirm the Japan plan's line is on (Settings → Cellular), confirm it is selected under Cellular Data, then toggle Airplane Mode off and on — Apple's first troubleshooting step too — to force a fresh network search. If it still shows no service, restart the iPhone, then reset network settings via Settings → General → Transfer or Reset iPhone → Reset → Reset Network Settings. Apple's last resort is to contact the issuer with your IMEI or EID. Also check Data Roaming is on for the Japan line: Airalo and Simbye both say a travel eSIM will not connect without it.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/japan-esim-iphone") } });

export default function JapanEsimIphonePage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-iphone" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-iphone" />
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
              mainEntity: faqSchemaItems.map((item) => ({
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
              route: "/guides/esim/japan-esim-iphone",
              headline: TITLE,
              updated,
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Japan eSIM for iPhone</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Best eSIM for Japan iPhone (2026):<br />iPhone eSIM Japan Setup &amp; Compatible Models
          </h1>
          <p className={styles.heroSubtitle}>
            Apple&apos;s model list, which Japan eSIM to buy for an iPhone, and the iOS screens in order.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Compatible models table", "5-step iOS setup"].map((t) => (
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
          <strong>Every iPhone XS, XS Max, XR or later supports eSIM, so it can take a Japan eSIM
          (Apple Support, checked {CHECKED}).</strong>{" "}
          iPhone 14 and later models bought in the United States are eSIM only, with no SIM tray,
          and iPhone 13 and later can keep two eSIMs active at once.{" "}
          Check the iPhone is unlocked at Settings → General → About: &ldquo;No SIM
          restrictions&rdquo; next to Carrier Lock means any Japan eSIM will install.{" "}
          Install the eSIM before you fly, by QR code or the provider&apos;s app over Wi-Fi, then
          turn Data Roaming on for the Japan line (not your home line) after you land.
        </p>

        <BookingEsimCard lead="iPhone unlocked? Get your Japan eSIM before you fly" />

        <p className={styles.bodyText} style={{ fontSize: "0.88rem" }}>
          Need a Japanese phone number or staying a month or more? Sakura Mobile&apos;s Voice +
          Data eSIM is the one here that includes a number.{" "}
          <a href={link("sakura")} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)", fontWeight: 600 }}>
            Get Sakura Mobile eSIM →
          </a>
        </p>

        <EsimPageAnswer route="/guides/esim/japan-esim-iphone" />

        <EsimDaysTable />

        {/* Quick Verdict Box — the answer-first paragraph for "best esim for japan iphone". */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Short answer for iPhone</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              <strong>Any iPhone XS, XS Max, XR or later takes a Japan eSIM — that is the
              cut-off Apple states — provided the handset is not locked to your home carrier,
              which Settings → General → About reports as &ldquo;No SIM restrictions&rdquo;.</strong>{" "}
              For a short trip where you only need data, buy a data-only travel eSIM: Airalo if
              you want its iOS app to do the install, Simbye for the lowest list price compared here, or Klook&apos;s
              own Japan eSIM if you are already booking tickets and transport there. If you need
              a Japanese phone number or you are staying a month or more, Sakura Mobile is the
              one to look at instead. Apple facts checked {CHECKED}; prices
              checked {pricesCheckedAt}.
            </p>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Easiest install on iOS</p>
                <p className={styles.verdictStatValue}>Airalo — from {priceFrom("airalo")}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest (QR install)</p>
                <p className={styles.verdictStatValue}>eSIM Go — from {priceFrom("esimgo")}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Two eSIMs at once</p>
                <p className={styles.verdictStatValue}>iPhone 13 and later</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Data Roaming</p>
                <p className={styles.verdictStatValue}>ON for the Japan line only</p>
              </div>
            </div>
            <a href={link("airalo")} className={styles.verdictBtn} target="_blank" rel="noopener noreferrer nofollow">
              Get Airalo Japan eSIM →
            </a>
          </div>
        </div>

        <EsimCtaTop />

        {/* Table 2 — which Japan eSIM to buy for an iPhone, conclusion in row 1. */}
        <section className={styles.comparisonSection} id="best-esim-iphone">
          <span className={styles.sectionLabel}>Which to buy</span>
          <h2 className={styles.sectionTitle}>What Is the Best eSIM for Japan on iPhone?</h2>
          <p className={styles.bodyText}>
            For a short trip with data only, Simbye has the lowest 10 GB price compared here and
            Klook eSIM keeps it in one checkout with your Klook bookings; Airalo is the one that
            installs from its own iOS app. If you need a Japanese phone number, Sakura Mobile&apos;s
            Voice + Data eSIM is the only one below that includes one.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Japan eSIM</th>
                    <th>How it installs on iPhone</th>
                    <th>Around 10 GB</th>
                    <th>Japanese phone number</th>
                    <th>Buy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Conclusion</td>
                    <td colSpan={4} style={{ fontWeight: 700, color: "var(--sumi)" }}>
                      Data only: Simbye (lowest 10 GB price) or Klook eSIM (one checkout with Klook
                      bookings). Need a Japanese number: Sakura Mobile Voice + Data.
                    </td>
                  </tr>
                  {iphoneEsimRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider}>{row.provider}</td>
                      <td>{row.install}</td>
                      <td>{row.price}</td>
                      <td>{row.number}</td>
                      <td>
                        {row.cta === "klook" ? (
                          <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 700 }}>
                            Check Klook eSIM →
                          </KlookLink>
                        ) : (
                          <a href={link(row.cta)} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)", fontWeight: 700 }}>
                            Get {row.provider} →
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
            Last checked: {CHECKED_ISO} (install methods, from each provider&apos;s iPhone help
            page). Prices: data/esim-prices.json, checked {pricesCheckedAt}; the cheapest plan
            with at least 10 GB. Phone numbers: provider pages, as recorded on this site. Klook
            listing details confirmed {klookEsim.specsCheckedAt}. Official pages:
            https://simbye.com/blogs/blog/how-to-install-and-activate-esim-on-iphone-step-guide-2025 ·
            https://www.airalo.com/help/getting-started-with-airalo ·
            https://www.sakuramobile.jp/info/setting/travel-esim/
          </p>
          <SimbyeOffer />
        </section>

        {/* Table 1 — compatibility, Apple's own list only. */}
        <section className={styles.comparisonSection} id="compatible-models">
          <span className={styles.sectionLabel}>Compatibility</span>
          <h2 className={styles.sectionTitle}>Is My iPhone eSIM Compatible in Japan?</h2>
          <p className={styles.bodyText}>
            Yes if it is an iPhone XS, XS Max, XR or later and not locked to a carrier — that is
            Apple&apos;s own cut-off. The exceptions below are about the market the handset was
            sold in, not about Japan; the third column is how many eSIMs can be active at once,
            which on iPhone 13 and later is two.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>iPhone model</th>
                    <th>eSIM support</th>
                    <th>eSIMs active at once</th>
                    <th>Watch out for</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Conclusion</td>
                    <td colSpan={3} style={{ fontWeight: 700, color: "var(--sumi)" }}>
                      iPhone XS / XR and later: yes, if unlocked. iPhone X, 8, SE (2nd gen) and earlier: no.
                    </td>
                  </tr>
                  {iphoneModels.map((row) => (
                    <tr key={row.model}>
                      <td className={styles.tdProvider}>{row.model}</td>
                      <td>{row.esim}</td>
                      <td style={{ color: "var(--accent)", fontWeight: 700 }}>{row.lines}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
            Last checked: {CHECKED_ISO}. Apple Support only — SIM type by model, Dual SIM with an
            eSIM, and travelling with eSIM. Official pages:{" "}
            {APPLE_URLS.slice(0, 3).map((u, i) => (
              <span key={u}>
                {i > 0 && " · "}
                <a href={u} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>{u}</a>
              </span>
            ))}
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>The twelve eSIM-only markets</strong>, as Apple lists them, are the United
            States, the US Virgin Islands, Canada, Mexico, Japan, Guam, the United Arab Emirates,
            Saudi Arabia, Bahrain, Kuwait, Qatar and Oman. An iPhone 17 or 18 Pro bought in any
            of them has no SIM tray at all, which for a traveller is simply one less thing to
            lose. The same model bought in Europe, the UK or Australia supports eSIM and a
            nano-SIM.
          </p>
          <p className={styles.bodyText}>
            <strong>Two markets are the real trap.</strong> In China mainland, Apple lists only
            iPhone Duo, iPhone 18 Pro, iPhone 18 Pro Max, iPhone 17e and iPhone Air as supporting
            eSIM — an iPhone 15 or 16 bought there cannot take one, whatever its generation. In
            Hong Kong and Macao certain models ship with Dual SIM using two nano-SIM cards instead
            of an eSIM, though iPhone 13 and later sold there do support two eSIMs. If your iPhone
            came from one of those three markets, check the model number against Apple&apos;s own
            SIM-type list before buying any plan — and if it has no eSIM hardware, a{" "}
            <Link href="/guides/esim/sakura-mobile-review" style={{ color: "var(--accent)", fontWeight: 600 }}>
              physical tourist SIM card
            </Link>{" "}
            is the way round it. All model facts above: Apple support, checked {CHECKED}.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Fastest check on your own device: Settings → General → About → scroll to EID. If an
            EID is listed, the iPhone has eSIM hardware.
          </p>
        </section>

        {/* Carrier lock — question heading, plus the whole tap-order checklist. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Carrier lock</span>
          <h2 className={styles.sectionTitle}>Do I Need to Unlock My iPhone for a Japan eSIM?</h2>
          <p className={styles.bodyText}>
            Yes — unless the Japan plan comes from the carrier you are already with. Apple states
            plainly that your iPhone cannot be locked to a carrier if you want to use another
            carrier&apos;s eSIM, and that to run two carriers at once &ldquo;your carrier must
            unlock your iPhone, or both plans must be from the same carrier&rdquo;.
          </p>
          <p className={styles.bodyText}>
            Checking takes ten seconds and no app: <strong>Settings → General → About → Carrier
            Lock</strong>. If it reads <strong>&ldquo;No SIM restrictions&rdquo;</strong> the
            handset is unlocked and any Japan eSIM will install. Anything else means you must ask
            your home carrier to unlock it — Apple is explicit that only the carrier can do this
            and that Apple itself cannot. US iPhone 14 and later, being eSIM-only, ship without a
            tray but are still subject to whatever lock your carrier applied, so check the row
            rather than assuming (Apple support, checked {CHECKED}).
          </p>
        </section>

        {/* Best eSIMs for iPhone */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Rankings</span>
          <h2 className={styles.sectionTitle}>Best Japan eSIMs for iPhone</h2>

          {picks.map((pick) => (
            <div key={pick.num} style={{ marginBottom: "2.5rem", paddingBottom: "2.5rem", borderBottom: "1px solid var(--rule)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "var(--radius-sm)",
                  background: pick.badgeColor,
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  flexShrink: 0,
                }}>{pick.num}</span>
                <h3 className={styles.sectionTitle} style={{ margin: 0, fontSize: "1.2rem" }}>
                  {pick.name}
                  <span style={{
                    display: "inline-block",
                    marginLeft: "0.6rem",
                    background: pick.badgeColor,
                    color: "#fff",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "var(--radius-sm)",
                    verticalAlign: "middle",
                  }}>{pick.badge}</span>
                </h3>
              </div>

              <div style={{ display: "flex", gap: "1.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  <strong style={{ color: "var(--sumi)" }}>From:</strong> {pick.priceFrom}
                </span>
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  <strong style={{ color: "var(--sumi)" }}>Network:</strong> {pick.network}
                </span>
              </div>

              <p className={styles.bodyText}>{pick.summary}</p>

              <div className={styles.pickGrid}>
                <div className={styles.pickPros}>
                  <p className={styles.pickListLabel}>Pros</p>
                  <ul className={styles.pickList}>
                    {pick.pros.map((p) => (
                      <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.pickCons}>
                  <p className={styles.pickListLabel}>Cons</p>
                  <ul className={styles.pickList}>
                    {pick.cons.map((c) => (
                      <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={pick.affiliateUrl}
                className={styles.pickCta}
                target="_blank"
                rel={pick.ctaNote ? "sponsored noopener" : "noopener noreferrer nofollow"}
                style={{ marginTop: "1rem" }}
              >
                {pick.ctaLabel}
              </a>
              {pick.ctaNote && (
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
                  {pick.ctaNote}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* Which one — the reader split, then the first Klook CTA. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Which one</span>
          <h2 className={styles.sectionTitle}>Short Trip or Long Stay: Which Japan eSIM Fits Your iPhone?</h2>
          <p className={styles.bodyText}>
            For a short trip where all you need is data, any data-only eSIM above will do the job
            and the choice comes down to how you want to install it — Airalo for its iOS app,
            Simbye for the lowest list price compared here, or Klook&apos;s own Japan eSIM if your tickets and
            transport are already going on one Klook booking. If you need a Japanese phone number,
            or you are staying a month or more, Sakura Mobile is the one to look at instead.
          </p>
          <div className={styles.pickGrid} style={{ marginTop: "1rem" }}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Short trip, data only</p>
              <ul className={styles.pickList}>
                <li><span className={styles.proIcon}>+</span>Airalo — installs from its iOS app, no QR scan, no Settings</li>
                <li><span className={styles.proIcon}>+</span>Simbye — lowest list price here, installed from a link or QR code</li>
                <li><span className={styles.proIcon}>+</span>eSIM Go — larger allowances, QR install takes two minutes</li>
                <li><span className={styles.proIcon}>+</span>Klook eSIM — one checkout if you are booking tickets there anyway</li>
                <li><span className={styles.proIcon}>+</span>Keeps your home number live for calls and SMS codes</li>
              </ul>
            </div>
            <div className={styles.pickPros} style={{ background: "var(--paper)", borderColor: "var(--rule)" }}>
              <p className={styles.pickListLabel}>You need a phone number, or a long stay</p>
              <ul className={styles.pickList}>
                <li><span className={styles.proIcon}>+</span>Sakura Mobile — English phone support, voice option, 1 month+</li>
                <li><span className={styles.proIcon}>+</span>Voice + Data eSIM adds a Japanese number and domestic calls</li>
                <li><span className={styles.proIcon}>+</span>Physical SIM available — the fallback for an iPhone with no eSIM</li>
                <li><span className={styles.proIcon}>+</span>Restaurant bookings and deliveries that demand a local number</li>
              </ul>
            </div>
          </div>

          <h3 id="klook-japan-esim" style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            Short trip, data only — also worth a look: {klookEsim.name}
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
            Listed on Klook as &ldquo;{klookEsim.listingTitle}&rdquo;, on {klookEsim.specNetwork},
            and {klookEsim.specPhoneNumber.toLowerCase()} — so it sits in the same data-only
            category as Airalo and eSIM Go, and the dual-SIM steps below apply to it unchanged.
            No price is quoted here because Klook prices change by date (listing checked
            {" "}{klookEsim.checkedAt}), which is also why it is not ranked against the four above
            (listing details confirmed {klookEsim.specsCheckedAt}).
          </p>
        </section>

        {/* Dual SIM — keeping the home number, iMessage and SMS codes. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Dual SIM</span>
          <h2 className={styles.sectionTitle}>Can I Keep My Home Number on iPhone While Using a Japan eSIM?</h2>
          <p className={styles.bodyText}>
            Yes, and it is the normal setup. Apple states that FaceTime and iMessage carry on
            working on your home line while a travel eSIM handles data, so your own number still
            rings, SMS two-factor codes still arrive — texts ride the carrier network, not your
            data plan — and nothing has to be re-registered when you get home.
          </p>
          <p className={styles.bodyText}>
            Four settings do the whole job, all under <strong>Settings → Cellular</strong>:
          </p>
          <ul className={styles.bodyList}>
            <li>
              <strong>Default voice line: your home number.</strong> Apple&apos;s own step is
              &ldquo;choose a number to be your default&rdquo; after the second plan activates.
            </li>
            <li>
              <strong>Cellular Data: the Japan eSIM.</strong> Tap Cellular Data, then tap the line
              you want carrying data — this is the single setting that decides who bills you for it.
            </li>
            <li>
              <strong>Data Roaming: off on the home line.</strong> Tap the home line → Cellular
              Data Options → turn Data Roaming off. Apple&apos;s advice on what roaming would
              otherwise cost is to ask your carrier what its plan includes.
            </li>
            <li>
              <strong>Allow Cellular Data Switching: off.</strong> Apple describes it as letting
              iOS use either line depending on coverage and availability; leave it off and data
              stays pinned to the Japan plan.
            </li>
          </ul>
          <p className={styles.bodyText}>
            Label the plans while you are in there — Apple suggests doing it as soon as the second
            plan is active, and &ldquo;Japan&rdquo; against &ldquo;Secondary&rdquo; is the
            difference between a confident tap and a guess on arrival. All iOS steps above: Apple
            support, checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            The full dual-SIM walkthrough — including the Android equivalents and what to do when
            a profile disappears after a restart — is in our{" "}
            <Link href="/guides/esim/how-to-set-up-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              step-by-step eSIM setup guide for Japan
            </Link>. If you are still at the stage of asking{" "}
            <Link href="/guides/esim/does-esim-work-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              whether eSIM works in Japan at all
            </Link>, start there: it covers the carrier-lock check, the markets where Apple ships
            iPhones without eSIM, and how a Japan plan compares with roaming and pocket WiFi.
          </p>
        </section>

        {/* eSIM or physical SIM — the iPhone-specific answer. */}
        <section className={styles.bodySection} id="esim-or-physical-sim">
          <span className={styles.sectionLabel}>eSIM or SIM card</span>
          <h2 className={styles.sectionTitle}>Should I Use an eSIM or a Physical SIM on iPhone in Japan?</h2>
          <p className={styles.bodyText}>
            An eSIM, on any iPhone that has one. Apple points out that an eSIM cannot be removed if
            the iPhone is lost or stolen and that there is no card to obtain, carry or swap, and
            US iPhone 14 and later have no SIM tray at all, so for them eSIM is the only option.
          </p>
          <p className={styles.bodyText}>
            A physical SIM card is the answer only when the iPhone cannot take an eSIM: iPhone X,
            8, SE (2nd gen) and earlier, or a model sold in a market where Apple ships it with two
            nano-SIM slots. Sakura Mobile sells a prepaid physical SIM for that case (Apple
            Support, checked {CHECKED}).{" "}
            <a href={link("sakura")} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Sakura Mobile →
            </a>
          </p>
        </section>

        {/* Second Klook CTA — immediately before the setup steps, for the reader who
            has decided and wants the profile in hand before working through them. */}
        <div className={styles.pickGrid} style={{ marginBottom: "2.5rem" }}>
          <div className={styles.pickPros} style={{ gridColumn: "1 / -1", background: "var(--paper)", borderColor: "var(--rule)" }}>
            <p className={styles.pickListLabel}>Buying it before you work through the steps?</p>
            <ul className={styles.pickList}>
              <li><span className={styles.proIcon}>✓</span>Short trip, data only, already booking on Klook — its own Japan eSIM keeps it to one checkout</li>
              <li><span className={styles.proIcon}>✓</span>Delivered as a QR-code voucher, which is install route one below</li>
              <li><span className={styles.proIcon}>✓</span>Need a Japanese number instead? Use the Sakura Mobile link above, not this one</li>
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

        {/* Setup Steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup guide</span>
          <h2 className={styles.sectionTitle}>How Do I Set Up a Japan eSIM on iPhone?</h2>
          <p className={styles.bodyText}>
            In five steps: buy, install over Wi-Fi at <strong>Settings → Cellular → Add
            eSIM</strong>, name the line, then after landing switch Cellular Data to it and turn
            Data Roaming on for that line. Apple requires Wi-Fi or a hotspot to activate an eSIM,
            so do the first three at home. These steps are iPhone-specific; for the setup on any
            phone and what to do when it fails, use the{" "}
            <Link href="/guides/esim/how-to-set-up-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Japan eSIM setup guide for any phone
            </Link>
            , and for which plan to buy on a Pixel or Galaxy, the{" "}
            <Link href="/guides/esim/japan-esim-android" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Japan eSIM for Android guide
            </Link>.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Step</th>
                    <th>Where on iPhone</th>
                    <th>What to do</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>—</td>
                    <td className={styles.tdProvider}>Conclusion</td>
                    <td colSpan={2} style={{ fontWeight: 700, color: "var(--sumi)" }}>
                      Steps 1–3 at home on Wi-Fi; steps 4–5 after you land. Data Roaming ON for the
                      Japan line, OFF for your home line.
                    </td>
                  </tr>
                  {iosSteps.map((row, i) => (
                    <tr key={row.step}>
                      <td style={{ fontWeight: 800, color: "var(--accent)" }}>{i + 1}</td>
                      <td className={styles.tdProvider}>{row.step}</td>
                      <td>{row.where}</td>
                      <td>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
            Last checked: {CHECKED_ISO}. Settings paths: Apple Support (Set up eSIM on iPhone;
            Using Dual SIM with an eSIM). Data Roaming on for the travel line: Airalo and Simbye
            iPhone install guides. Sakura Mobile&apos;s 3GB/day eSIM is the exception to installing at
            home: Sakura says to install it after you arrive. Official pages:{" "}
            <a href="https://support.apple.com/en-us/118669" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>https://support.apple.com/en-us/118669</a>
            {" · "}
            <a href={APPLE_URLS[1]} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>{APPLE_URLS[1]}</a>
          </p>
          <BookingEsimCard lead="Ready to install? Pick the eSIM first" />

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            Moving or reinstalling the eSIM later
          </h3>
          <p className={styles.bodyText}>
            Changing iPhones before the trip does not mean buying the plan twice — if the issuer
            supports it. Apple&apos;s <strong>eSIM Quick Transfer</strong> moves a plan from the old
            handset: on the new iPhone, Settings → Cellular → Set Up Cellular or Add eSIM, then
            choose a plan to transfer from another iPhone and follow the prompts on the old one.
            Both devices need iOS 18.4 or later, Bluetooth switched on, and the same Apple Account
            signed in. Whether a given travel eSIM can be transferred at all is the issuer&apos;s
            call, so ask before you wipe the old phone. Apple also documents converting a physical
            SIM into an eSIM on the same iPhone where the carrier supports it, and if an install
            simply fails, its own first moves are to toggle Airplane Mode off and on, restart the
            iPhone, and then contact the issuer with your IMEI or EID (Apple support,
            checked {FACTS_CHECKED}).
          </p>
        </section>

        {/* Suica — the other thing iPhone owners ask before a Japan trip. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Apple Wallet</span>
          <h2 className={styles.sectionTitle}>Can I Add Suica to Apple Wallet with a Foreign iPhone?</h2>
          <p className={styles.bodyText}>
            Yes. Apple&apos;s requirement for adding a Suica, PASMO or ICOCA card is an iPhone 8
            or later signed in to an Apple Account with two-factor authentication, plus an
            eligible payment card already in Apple Wallet — not an iPhone bought in Japan. The
            only Japan-purchase condition Apple attaches is to older hardware: an iPhone 7 or
            Apple Watch Series 2 must have been bought in Japan to hold a Suica.
          </p>
          <p className={styles.bodyText}>
            The route is <strong>Wallet → + → Transit Card → choose Suica, PASMO or ICOCA → Add
            New Card</strong>, then pick an amount to load and confirm. Set the card to Express
            Mode and you can tap through a ticket gate without waking or unlocking the iPhone, and
            use it at the shops showing the same logos. None of this depends on which eSIM is
            carrying your data — but loading money does need an internet connection, which is the
            other reason to have the Japan plan installed before you reach the station (Apple
            support, checked {FACTS_CHECKED}).
          </p>
        </section>

        {/* Question-led answers, one heading per search phrasing. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Asked another way</span>

          <h2 className={styles.sectionTitle}>Is eSIM Available in Japan?</h2>
          <p className={styles.bodyText}>
            Yes — and you do not have to be in Japan to get one. Japan has no SIM registration and
            no ID check for data-only plans, so every provider on this page sells its Japan eSIM
            online to anyone, anywhere, as a QR code or an in-app install. Buy it at home, install
            it over WiFi, and the plan starts counting the first time your iPhone registers on a
            Japanese network after you turn off airplane mode. Does Japan have eSIM coverage worth
            having? The travel plans run on Docomo, SoftBank or au/KDDI, which is what the
            providers state on their own plan pages ({pricesCheckedAt}) — the{" "}
            <Link href="/guides/esim/does-esim-work-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              full answer on networks and coverage
            </Link>{" "}
            has the per-provider breakdown.
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="9" y1="16" x2="13" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/how-to-set-up-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>How to Set Up an eSIM in Japan (Step-by-Step)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/does-esim-work-in-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 1.9-2 3" />
                  <circle cx="12" cy="17" r="0.75" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Does eSIM Work in Japan? Everything You Need to Know</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/airalo-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airalo Japan Review 2026: Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* An iPhone bought in China mainland, Hong Kong or Macao may have no eSIM at all —
                the Sakura Mobile review is where that reader finds a physical SIM card instead. */}
            <Link href="/guides/esim/sakura-mobile-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <line x1="12" y1="6" x2="12" y2="18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sakura Mobile Review 2026: Prices, Plans &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Compare all Japan eSIM options</h2>
            <p className={styles.ctaBannerDesc}>
              See how Airalo, Holafly, eSIM Go, and Sakura Mobile compare on price, coverage, and features.
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
