import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import {
  getProvider,
  priceFrom,
  priceFromLabel,
  pricesCheckedLabel,
  unlimitedFromLabel,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { klookEsim } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

// Prices and affiliate links come from data/esim-prices.json (refreshed daily).
const link = (id: EsimProviderId) => getProvider(id).affiliateUrl;
const pricesCheckedAt = pricesCheckedLabel();

/**
 * The date every iOS fact on this page was read off Apple's own support pages:
 * the SIM-type list by model, "Using Dual SIM with an eSIM", "Set up eSIM on iPhone",
 * "Use eSIM while traveling internationally", "How to unlock your iPhone for use with
 * a different carrier", the China mainland eSIM note, the data-roaming options page and
 * "Add a transit card to Apple Wallet in Japan". Nothing in the tables or the step list
 * below comes from anywhere else — where Apple does not state a figure (how many eSIM
 * profiles a device can store, for instance), this page does not print one. Prices have
 * their own check date from data/esim-prices.json.
 */
const FACTS_CHECKED = "26 Oct 2026";

// Holafly runs no affiliate programme we can join (impact: Airalo only — checked 9 Oct 2026),
// so its purchase CTA points at Airalo's unlimited plans, the closest approved alternative.
const HOLAFLY_ALT_LABEL = "Get Airalo unlimited eSIM →";
const HOLAFLY_ALT_NOTE = "Holafly is not available through our links — Airalo is our recommended alternative.";

/**
 * Apple's SIM-type list is organised by what the hardware takes, not by year, and the
 * newer rows differ by the market the handset was sold in — which is the part travellers
 * get wrong. iPhone SE is deliberately absent: Apple files the SE generations in a
 * different part of that list and we could not read one unambiguous answer for them.
 */
const iphoneModels = [
  {
    model: "iPhone XS, XS Max, XR",
    esim: "eSIM + nano-SIM",
    lines: "One eSIM active",
  },
  {
    model: "iPhone 11 and 12 series",
    esim: "eSIM + nano-SIM",
    lines: "One eSIM active",
  },
  {
    model: "iPhone 13 series",
    esim: "eSIM + nano-SIM",
    lines: "Two eSIMs active",
  },
  {
    model: "iPhone 14, 15 and 16 series",
    esim: "eSIM only if bought in the US — eSIM + nano-SIM elsewhere",
    lines: "Two eSIMs active",
  },
  {
    model: "iPhone 17, 17e, 17 Pro, 17 Pro Max, 18 Pro, 18 Pro Max",
    esim: "eSIM only in 12 markets incl. US, Canada, Mexico, Japan — eSIM + nano-SIM elsewhere",
    lines: "Two eSIMs active",
  },
  {
    model: "iPhone Air, iPhone Duo",
    esim: "eSIM only",
    lines: "Two eSIMs active",
  },
  {
    model: "iPhone X, 8, 8 Plus and earlier",
    esim: "No eSIM — nano-SIM only",
    lines: "Cannot take a Japan eSIM",
  },
];

/**
 * The tap-order checklist. Every Settings path here is one Apple documents; the
 * "what you should see" column is what Apple says the screen reports, which is the
 * only way a reader can confirm a step without buying anything first.
 */
const checklist = [
  {
    todo: "Confirm the iPhone has eSIM hardware",
    where: "Settings → General → About → scroll to EID",
    see: "An EID row is listed",
  },
  {
    todo: "Confirm it is not locked to a carrier",
    where: "Settings → General → About → Carrier Lock",
    see: "“No SIM restrictions”",
  },
  {
    todo: "Install the profile at home, on WiFi",
    where: "Settings → Cellular → Add eSIM",
    see: "Apple requires a WiFi network or hotspot to activate",
  },
  {
    todo: "Label the new plan",
    where: "Settings → Cellular → tap the plan, then set its label",
    see: "A label you will recognise at 30,000 feet — “Japan”",
  },
  {
    todo: "Leave the Japan line off until you land",
    where: "Settings → Cellular → tap the Japan plan",
    see: "The line shows as turned off",
  },
  {
    todo: "Point data at the Japan line after landing",
    where: "Settings → Cellular → Cellular Data",
    see: "“Japan” selected, not your home line",
  },
  {
    todo: "Stop the home line using data",
    where: "Settings → Cellular → home line → Cellular Data Options",
    see: "Data Roaming off",
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
      "The only provider here needing a manual APN entry on iPhone (plus.4g)",
      "Not ideal for short trips",
    ],
    summary:
      `For longer stays, Sakura Mobile is the only tourist option with real English phone support and a voice-call option. One iPhone-specific caveat: it is the only provider on this page that may need a manual APN (plus.4g) under Settings → Cellular → Cellular Data Network. Plans from ${priceFromLabel("sakura")}.`,
  },
];

// iPhone-only install flow, every Settings path as Apple words it. The multi-device
// walkthrough (Android, iPad, Samsung, Pixel, troubleshooting) lives in
// how-to-set-up-esim-japan — we link rather than repeat it.
const setupSteps = [
  {
    title: "Check for an EID first (Settings → General → About)",
    desc: "Scroll to the bottom of the About screen. If an \"EID\" row is listed your iPhone has eSIM hardware; if it is missing, the handset cannot take a Japan eSIM at all and no amount of setup will change that.",
  },
  {
    title: "Check Carrier Lock on the same screen",
    desc: "Still in Settings → General → About, look for Carrier Lock. Apple's instruction is that it should read \"No SIM restrictions\"; anything else means the handset is tied to your home carrier and only that carrier can unlock it.",
  },
  {
    title: "Install over WiFi at home, not at the airport",
    desc: "Apple states the iPhone must be connected to a WiFi network or hotspot to activate an eSIM (with a narrow exception for some eSIM-only models in some countries). The one place you will not have WiFi is the arrivals hall, so do this days before you fly.",
  },
  {
    title: "Settings → Cellular → Add eSIM, then pick your install route",
    desc: "Three routes, all documented by Apple: scan the provider's QR code with the Camera app and tap the \"Cellular Plan Detected\" notification; install from the provider's own iOS app; or tap the \"Carrier Cellular Plan Ready to Be Installed\" notification if the seller pushed the plan to your device. Airalo users can stay in the Airalo app and skip Settings entirely.",
  },
  {
    title: "Label it \"Japan\" when iOS asks",
    desc: "Apple's own wording is to label your plans once the second one is active. iOS defaults to names like \"Secondary\" or the carrier's own label, which gets confusing once two plans are listed — naming it \"Japan\" makes the arrival-day toggle obvious.",
  },
  {
    title: "Leave the plan toggled OFF until you land",
    desc: "An installed-but-off profile costs nothing and cannot be charged. Switch it on after the cabin crew clears flight mode, then set it under Settings → Cellular → Cellular Data as the line that carries data.",
  },
];

const faqItems = [
  {
    q: "Which iPhones can use a Japan eSIM?",
    a: `Apple puts the cut-off at "an iPhone XS, iPhone XS Max, iPhone XR, or later", so every iPhone from 2018 onwards qualifies. iPhone XS to 12 run one eSIM alongside a physical nano-SIM; iPhone 13 and later support Dual SIM with two eSIMs. The exceptions are about the market the handset was sold in: in China mainland Apple lists only iPhone Duo, iPhone 18 Pro, iPhone 18 Pro Max, iPhone 17e and iPhone Air as supporting eSIM, and in Hong Kong and Macao certain models ship with two nano-SIM slots instead. iPhone X, 8 and earlier have no eSIM at all (Apple support, checked ${FACTS_CHECKED}).`,
  },
  {
    q: "Can I use two eSIMs at once on iPhone?",
    a: "Yes on iPhone 13 and later, which Apple says support Dual SIM with two eSIMs in addition to a physical SIM and an eSIM — so your home eSIM and a Japan eSIM can both be active. iPhone XS through iPhone 12 run one active eSIM plus one physical nano-SIM. In every case only one line carries data at a time, and you choose which under Settings → Cellular → Cellular Data.",
  },
  {
    q: "When should I install the eSIM — before or after landing?",
    a: "Before. Apple's setup instructions require the iPhone to be connected to a WiFi network or hotspot to activate an eSIM, which is exactly what you will not have between the aircraft door and passport control. Install it at home a day or two early, label it, and leave the line switched off; an installed profile that is toggled off cannot be billed, and switching it on after landing takes one tap.",
  },
  {
    q: "Should I keep my home line on the default voice line while in Japan?",
    a: "Yes, for most travellers. Keep your home number as the default voice line so calls and SMS two-factor codes still arrive — texts ride the carrier network, not your data plan — and set the Japan eSIM under Settings → Cellular → Cellular Data so all data goes through it. Apple confirms FaceTime and iMessage keep working on the home line while a travel eSIM carries the data. Your home carrier may still charge for calls or texts received abroad, so check its roaming terms before you fly.",
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
    a: "Work through it in this order: confirm the Japan plan's line is on (Settings → Cellular), confirm it is selected under Cellular Data, then toggle Airplane Mode off and on — Apple's first troubleshooting step too — to force a fresh network search. If it still shows no service, restart the iPhone, then reset network settings via Settings → General → Transfer or Reset iPhone → Reset → Reset Network Settings. Apple's last resort is to contact the issuer with your IMEI or EID. A Sakura Mobile eSIM may additionally need its APN typed in by hand as plus.4g.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/japan-esim-iphone") } });

export default function JapanEsimIphonePage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Best eSIM for Japan on iPhone (2026): Japan eSIM iPhone Setup &amp; Picks</title>
        <meta
          name="description"
          content="Best eSIM for Japan on iPhone: which iPhones take a Japan eSIM, the carrier-lock check, and Japan eSIM iPhone setup tap by tap — plus which plan to buy."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-iphone" />
        <meta property="og:title" content="Best eSIM for Japan on iPhone (2026): Japan eSIM iPhone Setup &amp; Picks" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-iphone" />
        <meta property="og:description" content="Best eSIM for Japan on iPhone: which iPhones take a Japan eSIM, the carrier-lock check, and Japan eSIM iPhone setup tap by tap — plus which plan to buy." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best eSIM for Japan on iPhone (2026): Japan eSIM iPhone Setup &amp; Picks" />
        <meta name="twitter:description" content="Best eSIM for Japan on iPhone: which iPhones take a Japan eSIM, the carrier-lock check, and Japan eSIM iPhone setup tap by tap — plus which plan to buy." />
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
              route: "/guides/esim/japan-esim-iphone",
              headline: "Best eSIM for Japan on iPhone (2026): Japan eSIM iPhone Setup & Picks",
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
            Best eSIM for Japan on iPhone (2026):<br />Japan eSIM iPhone Setup &amp; Picks
          </h1>
          <p className={styles.heroSubtitle}>
            Which Japan eSIM installs cleanly on an iPhone, and exactly where to tap in iOS to do it.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "iPhone XS to iPhone 18 Pro", "Steps from Apple support"].map((t) => (
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
              you want its iOS app to do the install, eSIM Go for the lowest price, or Klook&apos;s
              own Japan eSIM if you are already booking tickets and transport there. If you need
              a Japanese phone number or you are staying a month or more, Sakura Mobile is the
              one to look at instead. Apple facts checked {FACTS_CHECKED}; prices
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
                <p className={styles.verdictStatLabel}>Needs manual APN</p>
                <p className={styles.verdictStatValue}>Sakura Mobile only (plus.4g)</p>
              </div>
            </div>
            <a href={link("airalo")} className={styles.verdictBtn} target="_blank" rel="noopener noreferrer nofollow">
              Get Airalo Japan eSIM →
            </a>
          </div>
        </div>

        {/* Compatibility — question heading, answer in the first two sentences. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compatibility</span>
          <h2 className={styles.sectionTitle}>Does My iPhone Support eSIM in Japan?</h2>
          <p className={styles.bodyText}>
            Almost certainly yes. Apple&apos;s cut-off is &ldquo;an iPhone XS, iPhone XS Max,
            iPhone XR, or later&rdquo;, so every iPhone released since 2018 can take a Japan
            eSIM — and the exceptions below are about the market the handset was sold in, not
            about Japan. The right-hand column is the number that matters on an iPhone: how
            many eSIM profiles can be <em>active at once</em>, which on iPhone 13 and later is
            two, so your home line and a Japan line can both be live.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>iPhone Model</th>
                    <th>What the hardware takes</th>
                    <th>Active lines</th>
                  </tr>
                </thead>
                <tbody>
                  {iphoneModels.map((row) => (
                    <tr key={row.model}>
                      <td className={styles.tdProvider}>{row.model}</td>
                      <td>{row.esim}</td>
                      <td style={{ color: "var(--accent)", fontWeight: 700 }}>{row.lines}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
            is the way round it. All model facts above: Apple support, checked {FACTS_CHECKED}.
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
            rather than assuming (Apple support, checked {FACTS_CHECKED}).
          </p>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            Everything to do, in tap order
          </h3>
          <p className={styles.bodyText}>
            Seven rows, first two before you spend anything, the last two after you land.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>What to do</th>
                    <th>Where on iPhone</th>
                    <th>What you should see</th>
                  </tr>
                </thead>
                <tbody>
                  {checklist.map((row) => (
                    <tr key={row.todo}>
                      <td className={styles.tdProvider}>{row.todo}</td>
                      <td>{row.where}</td>
                      <td style={{ fontWeight: 700, color: "var(--sumi)" }}>{row.see}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
          <h2 className={styles.sectionTitle}>What Is the Best eSIM for Japan on iPhone?</h2>
          <p className={styles.bodyText}>
            For a short trip where all you need is data, any data-only eSIM above will do the job
            and the choice comes down to how you want to install it — Airalo for its iOS app,
            eSIM Go for the lowest price, or Klook&apos;s own Japan eSIM if your tickets and
            transport are already going on one Klook booking. If you need a Japanese phone number,
            or you are staying a month or more, Sakura Mobile is the one to look at instead.
          </p>
          <div className={styles.pickGrid} style={{ marginTop: "1rem" }}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Short trip, data only</p>
              <ul className={styles.pickList}>
                <li><span className={styles.proIcon}>+</span>Airalo — installs from its iOS app, no QR scan, no Settings</li>
                <li><span className={styles.proIcon}>+</span>eSIM Go — cheapest here, QR install takes two minutes</li>
                <li><span className={styles.proIcon}>+</span>Klook eSIM — one checkout if you are booking tickets there anyway</li>
                <li><span className={styles.proIcon}>+</span>Keeps your home number live for calls and SMS codes</li>
              </ul>
            </div>
            <div className={styles.pickPros} style={{ background: "var(--paper)", borderColor: "var(--rule)" }}>
              <p className={styles.pickListLabel}>You need a phone number, or a long stay</p>
              <ul className={styles.pickList}>
                <li><span className={styles.proIcon}>+</span>Sakura Mobile — English phone support, voice option, 1 month+</li>
                <li><span className={styles.proIcon}>+</span>The only pick here that may need a manual APN (plus.4g)</li>
                <li><span className={styles.proIcon}>+</span>Physical SIM available — the fallback for an iPhone with no eSIM</li>
                <li><span className={styles.proIcon}>+</span>Restaurant bookings and deliveries that demand a local number</li>
              </ul>
            </div>
          </div>

          <h3 id="klook-japan-esim" style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            Short trip, data only — also worth a look: {klookEsim.name}
          </h3>
          <p className={styles.bodyText}>{klookEsim.note}</p>
          <a
            href={klookEsim.url}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
            style={{ marginTop: "0.5rem", display: "inline-flex" }}
          >
            {klookEsim.ctaLabel}
          </a>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
            Listed on Klook as &ldquo;{klookEsim.listingTitle}&rdquo;, on {klookEsim.specNetwork},
            and {klookEsim.specPhoneNumber.toLowerCase()} — so it sits in the same data-only
            category as Airalo and eSIM Go, and the dual-SIM steps below apply to it unchanged.
            No price is quoted here because the listing could not be read automatically
            on {klookEsim.checkedAt}, which is also why it is not ranked against the four above
            (listing details confirmed {klookEsim.specsCheckedAt}).
          </p>
        </section>

        {/* Dual SIM — keeping the home number, iMessage and SMS codes. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Dual SIM</span>
          <h2 className={styles.sectionTitle}>Can I Keep My Home Number and iMessage with a Japan eSIM?</h2>
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
            support, checked {FACTS_CHECKED}.
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
            <a
              href={klookEsim.url}
              className={styles.pickCta}
              target="_blank"
              rel="sponsored noopener"
              style={{ marginTop: "0.75rem", display: "inline-flex" }}
            >
              {klookEsim.ctaLabel}
            </a>
          </div>
        </div>

        {/* Setup Steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup guide</span>
          <h2 className={styles.sectionTitle}>How Do I Set Up a Japan eSIM on iPhone?</h2>
          <p className={styles.bodyText}>
            On WiFi at home, in about two minutes: <strong>Settings → Cellular → Add eSIM</strong>,
            then install by QR code, from the provider&apos;s app, or by tapping the carrier
            notification. Apple requires the iPhone to be connected to a WiFi network or hotspot
            to activate an eSIM, which is the one thing the arrivals hall cannot give you — so
            this is a job for the sofa, not the airport. These six steps are iPhone-specific; for
            Android, iPad, Galaxy Tab or Pixel Tablet, use the{" "}
            <Link href="/guides/esim/how-to-set-up-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              multi-device setup guide
            </Link>{" "}
            instead.
          </p>
          <div className={styles.stepsList}>
            {setupSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

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
                <p className={styles.relatedTitle}>Sakura Mobile Review 2026: eSIM &amp; SIM Card Plans and Prices</p>
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
