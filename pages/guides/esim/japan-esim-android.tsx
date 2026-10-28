import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import EsimAnswerTable from "../../../components/EsimAnswerTable";
import EsimRelatedCard from "../../../components/EsimRelatedCard";
import {
  cheapestPlan,
  formatUsd,
  plansFor,
  priceAtLeastLabel,
  priceFrom,
  pricesCheckedLabel,
  type EsimPlan,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { esimLink, esimSpec, SPECS_CHECKED_AT } from "../../../lib/esim-specs";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

// Written 28 Oct 2026 for the "japan esim android" searches, which until now landed on
// the iPhone guide or on the generic setup walkthrough. The counterpart page is
// japan-esim-iphone; the shared install steps stay in how-to-set-up-esim-japan.
//
// Two sources, two dates. USD prices come from data/esim-prices.json, refreshed daily
// from each provider's own site (`pricesCheckedAt`). The tethering and phone-number
// clauses come from lib/esim-specs.ts, read off the providers' own pages on
// SPECS_CHECKED_AT. The Settings paths below are the menu labels Samsung, Google and
// Sony use; the EID check is what decides compatibility on any handset, which is why the
// model list is presented as a shortcut rather than as an authority.
const pricesCheckedAt = pricesCheckedLabel();

const dataLabel = (p: EsimPlan | null) => (p ? (p.unlimited ? "Unlimited" : `${p.gb} GB`) : "—");
const priceLabel = (p: EsimPlan | null) => (p ? formatUsd(p.priceUsd) : "—");

const ENTRY = cheapestPlan("esimgo");

/** The cheapest plan a provider sells that covers a seven-day trip with 5 GB or more. */
const weekPlan = (id: EsimProviderId): EsimPlan | null =>
  plansFor(id).find((p) => p.days >= 7 && (p.unlimited || (p.gb ?? 0) >= 5)) ?? null;

const TITLE = "Best eSIM for Japan on Android 2026: Setup & Picks";
const DESCRIPTION =
  `Pixel 3 and Galaxy S20 and later take an eSIM. The cheapest Japan plan is ` +
  `${priceLabel(ENTRY)} for ${ENTRY?.name} on eSIM Go, plus where to tap on Pixel and Samsung.`;

const phoneModels = [
  { model: "Google Pixel 3 and later", esim: "Yes", note: "Settings → Network & internet → SIMs" },
  { model: "Samsung Galaxy S20 and later", esim: "Yes", note: "Settings → Connections → SIM Manager" },
  { model: "Sony Xperia 10 III and later", esim: "Yes", note: "Settings → Network & internet → SIMs" },
  { model: "OnePlus 12 and later", esim: "Yes", note: "Settings → Mobile network" },
  { model: "Motorola Razr series", esim: "Yes", note: "Settings → Network & internet → SIMs" },
  { model: "Anything older, or a budget model", esim: "Check the EID", note: "No EID row under About phone means no eSIM hardware" },
];

const tabletModels = [
  { model: "Samsung Galaxy Tab S9 / S9+ / S9 Ultra", esim: "Yes" },
  { model: "Samsung Galaxy Tab S8 / S8+ / S8 Ultra", esim: "Yes" },
  { model: "Samsung Galaxy Tab S7 FE (5G version)", esim: "Yes" },
  { model: "Google Pixel Tablet", esim: "Yes" },
  { model: "Lenovo Tab P12 Pro", esim: "Yes" },
  { model: "Galaxy Tab S6 and earlier", esim: "No" },
  { model: "Any Wi-Fi-only tablet", esim: "No — there is no modem to carry a plan" },
];

const samsungSteps = [
  {
    title: "Settings → Connections → SIM Manager",
    desc: "On Galaxy phones the eSIM controls live under Connections rather than under a Network menu. The exact wording shifts a little between One UI versions, but SIM Manager is the screen you want.",
  },
  {
    title: "Tap \"Add mobile plan\" → \"Add eSIM\"",
    desc: "Samsung offers to scan a QR code or, on some carriers, to search for a plan. Scan the code your provider emailed you — hold the phone up to the code displayed on a laptop or a printout.",
  },
  {
    title: "Name the profile \"Japan\" and leave it off",
    desc: "Naming it makes the SIM Manager screen readable once you have two lines. Leave the new line switched off until you land so the plan is not spending days you are not in Japan for.",
  },
  {
    title: "On arrival: turn it on, set it as the data SIM",
    desc: "Back in SIM Manager, switch the Japan line on, then set Preferred SIM for mobile data to it. Leave your home line on for calls and texts, with its data roaming off.",
  },
];

const pixelSteps = [
  {
    title: "Settings → Network & internet → SIMs",
    desc: "Pixel phones and the Pixel Tablet keep everything on one SIMs screen. If you have only ever used one SIM, this screen shows your home carrier and little else.",
  },
  {
    title: "Tap \"+\" or \"Download a SIM instead?\"",
    desc: "Google's wording varies by Android version: on recent Pixels it is a plus button at the top of the SIMs screen, on older ones a \"Download a SIM instead?\" link under the carrier.",
  },
  {
    title: "Scan the QR code and wait",
    desc: "Point the camera at the code. The profile downloads and installs in a minute or two; the phone will ask you to confirm the plan details before it finishes.",
  },
  {
    title: "On arrival: Settings → SIMs → turn it on",
    desc: "Switch the Japan profile on and set it as the SIM for mobile data. Signal bars normally appear within a few seconds of enabling it.",
  },
];

const faqItems = [
  {
    q: "Which Android phones work with a Japan eSIM?",
    a: "As a shortcut: Google Pixel 3 and later, Samsung Galaxy S20 and later, Sony Xperia 10 III and later, OnePlus 12 and later and the Motorola Razr line. The definitive check is on the handset itself — Settings → About phone and look for an EID row. If an EID is listed, the hardware is there whatever the model name; if it is not, no provider can sell you a plan that works and you want a physical SIM card instead.",
  },
  {
    q: "Which is the best Japan eSIM for Android?",
    a: `The same one as on an iPhone, because the plan is identical — what differs is where you tap. eSIM Go is the cheapest at every tier: ${priceLabel(ENTRY)} for ${ENTRY?.name}, ${priceAtLeastLabel("esimgo", 10)} for 10 GB. Airalo costs a little more (from ${priceFrom("airalo")}) and adds live chat and in-app top-up. The one Android-specific point: Airalo's automatic profile install is an iOS feature, so on Android you scan a QR code whichever provider you choose. Prices checked ${pricesCheckedAt}.`,
  },
  {
    q: "Where do I add an eSIM on a Samsung Galaxy?",
    a: "Settings → Connections → SIM Manager → Add mobile plan, then Add eSIM and scan your QR code. Samsung is the odd one out here: most Android phones put eSIM under a Network & internet menu, while One UI keeps it under Connections. Everything after the scan is the same — name the profile, leave it switched off until you land, then set it as the preferred SIM for mobile data.",
  },
  {
    q: "Can I use a Japan eSIM and keep my home SIM on Android?",
    a: "Yes, and that is the normal setup. Your physical home SIM stays in its tray for calls and texts while the Japan eSIM carries the data. Under Settings → Network & internet → SIMs, set the Japan profile as the preferred SIM for mobile data and turn data roaming off on the home line so it cannot connect by accident and bill you.",
  },
  {
    q: "Can I tether or share a hotspot from an Android eSIM?",
    a: `Yes, on all four providers, but the allowances differ and that is where to look rather than at the headline price. ${esimSpec("esimgo").tethering}. ${esimSpec("holafly").tethering}. Sakura Mobile sets a hotspot allowance by plan length. Airalo's help centre says the personal hotspot works where your device and the network allow it. Clauses read ${SPECS_CHECKED_AT}.`,
  },
  {
    q: "I have signal but no data — what's wrong?",
    a: "Almost always the data line rather than the eSIM. Go to Settings → Network & internet → SIMs, select the Japan profile and check it is the preferred SIM for mobile data with mobile data switched on. If that is right and there is still nothing, the APN is next: Airalo, eSIM Go and Holafly all configure it automatically, but Sakura Mobile needs 'plus.4g' entered by hand. Restarting the phone clears most remaining provisioning errors.",
  },
  {
    q: "Does an Android eSIM give me a Japanese phone number?",
    a: `No, and this has nothing to do with Android. ${esimSpec("esimgo").phoneNumber} The same applies to Airalo and Holafly: every Japan travel eSIM is data only. If you need a Japanese number, Sakura Mobile's separate Voice + Data eSIM is the only route among the four providers here.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/japan-esim-android") } });

export default function JapanEsimAndroidPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-android" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-android" />
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
              route: "/guides/esim/japan-esim-android",
              headline: "Best eSIM for Japan on Android (2026): Picks and Setup",
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://www.japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "Japan eSIM on Android", item: "https://www.japan-travel-kit.com/guides/esim/japan-esim-android" },
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
          <span className={styles.breadCurrent}>Japan eSIM on Android</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Best eSIM for Japan on Android (2026):<br />Picks and Setup
          </h1>
          <p className={styles.heroSubtitle}>
            Which plan to buy, whether your handset can take it, and the exact menu to open on
            Samsung, Pixel and Xperia.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, `From ${priceLabel(ENTRY)}`, "Per-make menu paths"].map((t) => (
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
            This doesn&apos;t affect our recommendations.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer — the whole answer, first */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              <strong>
                Buy eSIM Go at {priceLabel(ENTRY)} for {ENTRY?.name} — the cheapest Japan plan at
                every tier — or Airalo from {priceFrom("airalo")} if you would rather have
                live chat and in-app top-up.
              </strong>{" "}
              There is no Android-specific eSIM: all four providers sell the same Japan plans to
              any handset, and nothing about the plan changes with the operating system. Two
              things do. <strong>Compatibility</strong> is per handset rather than per brand:
              Pixel 3 and later, Galaxy S20 and later, Xperia 10 III and later are safe, but the
              answer for any phone is an EID row under Settings → About phone.{" "}
              <strong>Installation</strong> is always a QR-code scan on Android, because the
              automatic profile install Airalo advertises is an iOS feature — and the menu it
              lives in moves: Connections → SIM Manager on Samsung, Network &amp; internet → SIMs
              on Pixel. Prices checked {pricesCheckedAt}; tethering and phone-number clauses{" "}
              {SPECS_CHECKED_AT}.
            </p>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest plan</p>
                <p className={styles.verdictStatValue}>eSIM Go — {priceLabel(ENTRY)}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Compatibility check</p>
                <p className={styles.verdictStatValue}>An EID under About phone</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Install method</p>
                <p className={styles.verdictStatValue}>QR scan, every provider</p>
              </div>
            </div>
          </div>
        </div>

        {/* The table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>Which Japan eSIM Is Best on Android?</h2>
          <p className={styles.bodyText}>
            The cheapest plan each provider sells that covers a week with 5 GB or more. Every row
            installs on Android by QR code; the two right-hand columns are what actually separates
            them once the price is on the table.
          </p>
          <EsimAnswerTable
            pick={weekPlan}
            note="The cheapest plan each provider sells with at least 7 days' validity and 5 GB or more; Holafly sells unlimited only."
          />
          <div className={styles.pickCtaRow} style={{ marginTop: "1.2rem" }}>
            <a href={esimLink("esimgo")} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Get eSIM Go — from {priceLabel(ENTRY)} →
            </a>
            <a href={esimLink("airalo")} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Get Airalo Japan eSIM →
            </a>
          </div>
        </section>

        {/* Compatibility */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compatibility</span>
          <h2 className={styles.sectionTitle}>Which Android Phones Take an eSIM?</h2>
          <p className={styles.bodyText}>
            Android has no single answer the way the iPhone line does, because eSIM hardware
            arrived at different points across manufacturers and was left out of plenty of budget
            models long after the flagships had it. Treat the list below as a shortcut and the EID
            check as the answer.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Handset", "eSIM", "Where the setting lives"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {phoneModels.map((row) => (
                    <tr key={row.model}>
                      <td className={styles.tdProvider}>{row.model}</td>
                      <td style={{ fontWeight: 700, color: "var(--accent)", whiteSpace: "nowrap" }}>{row.esim}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>The check that settles it:</strong> Settings → About phone, and look for an
            <strong> EID</strong> row. An EID is the eSIM chip&apos;s own identifier, so its
            presence means the hardware is there and its absence means no provider can sell you a
            plan that will work. The second check is the carrier lock: a handset bought on contract
            can refuse a third-party profile even with the hardware present. Both are walked
            through in{" "}
            <Link href="/guides/esim/does-esim-work-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              does eSIM work in Japan
            </Link>
            .
          </p>
        </section>

        {/* Samsung steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Samsung Galaxy</span>
          <h2 className={styles.sectionTitle}>Where Do You Add an eSIM on a Galaxy?</h2>
          <div className={styles.stepsList}>
            {samsungSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pixel steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Google Pixel &amp; most other Android</span>
          <h2 className={styles.sectionTitle}>Where Do You Add an eSIM on a Pixel?</h2>
          <div className={styles.stepsList}>
            {pixelSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Sony Xperia, Motorola and most other Android makers follow the Pixel path with the
            same labels. OnePlus puts it under Settings → Mobile network instead. Full
            walkthroughs for every device, including tablets and iOS, are in{" "}
            <Link href="/guides/esim/how-to-set-up-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              how to set up an eSIM in Japan
            </Link>
            .
          </p>
        </section>

        {/* Tablets */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tablets</span>
          <h2 className={styles.sectionTitle}>Which Android Tablets Can Use a Japan eSIM?</h2>
          <p className={styles.bodyText}>
            Fewer than people expect, and the trap is the Wi-Fi-only variant: the same tablet name
            is sold in two versions, and the cheaper one has no modem at all, so there is nothing
            for a plan to attach to.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tablet", "eSIM"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tabletModels.map((row) => (
                    <tr key={row.model}>
                      <td className={styles.tdProvider}>{row.model}</td>
                      <td style={{ fontWeight: 700, color: "var(--accent)" }}>{row.esim}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            A tablet that cannot take an eSIM is not a problem — tether it to your phone, which is
            free on eSIM Go and allowance-limited on the others, or put the whole group on one
            rented router. The{" "}
            <Link href="/guides/esim/japan-esim-family-group" style={{ color: "var(--accent)", fontWeight: 600 }}>
              family and group page
            </Link>{" "}
            prices both.
          </p>
        </section>

        {/* Troubleshooting */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>If it doesn&apos;t work</span>
          <h2 className={styles.sectionTitle}>Signal but No Data — What Is Wrong?</h2>
          <p className={styles.bodyText}>
            On Android this is nearly always the data line rather than the eSIM. Having two lines
            installed does not tell the phone which one to route data through, and the default is
            frequently still your home carrier — which, with roaming off, means bars and nothing
            else.
          </p>
          <p className={styles.bodyText}>
            Go to Settings → Network &amp; internet → SIMs (Connections → SIM Manager on Samsung),
            select the Japan profile, and check two things: that mobile data is on for that line,
            and that it is set as the preferred SIM for mobile data. If both are right, the APN is
            next — Airalo, eSIM Go and Holafly all configure it automatically, while Sakura Mobile
            needs <strong>plus.4g</strong> entered by hand. A reboot clears most of what is left.
          </p>
        </section>

        {/* The part an AI answer can't do for you — and the CTA */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Before you buy</span>
          <h2 className={styles.sectionTitle}>Will It Work on Your Phone, and When Should You Buy?</h2>
          <p className={styles.bodyText}>
            Three checks, about two minutes, and the first two are the reason no summary can
            answer this for you: they depend on the handset in your hand and on a carrier you
            have to ask.
          </p>
          <div className={styles.stepsList}>
            {[
              {
                title: "Find the EID",
                desc: "Settings → About phone, scroll for an EID row. Present means eSIM hardware; absent means no provider can help and you want a physical SIM card. On some makes it sits under About phone → Status information.",
              },
              {
                title: "Ask your carrier about the lock",
                desc: "A phone bought on contract may refuse a third-party eSIM profile with the hardware present. Our setup guide puts a home-carrier unlock at 24–48 hours, so this is a call to make before you buy a plan rather than after.",
              },
              {
                title: "Buy, scan at home, switch on when you land",
                desc: "The QR code arrives by email straight after checkout, so buying weeks early gains you nothing. Install the profile at home where there is Wi-Fi — a QR scan needs a working connection, which is exactly what you do not have on arrival — leave the line switched off, then turn it on after landing.",
              },
            ].map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.2rem" }}>
            <a href={esimLink("esimgo")} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Get eSIM Go — {priceLabel(ENTRY)} / {dataLabel(ENTRY)} →
            </a>
            <a href={esimLink("airalo")} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Get Airalo — live chat and top-up →
            </a>
            <a href={esimLink("sakura")} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Get Sakura Mobile — the only Japanese number →
            </a>
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
            <EsimRelatedCard href="/guides/esim/best-esim-japan">
              Best eSIM for Japan 2026: Top 4 Picks Compared
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-esim-iphone">
              Best eSIM for Japan on iPhone (2026): Setup &amp; Picks
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/how-to-set-up-esim-japan">
              How to Set Up an eSIM in Japan (Step-by-Step)
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/sakura-mobile-review">
              Sakura Mobile Review 2026: eSIM &amp; SIM Card Plans and Prices
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/esim-go-japan-review">
              eSIM Go Japan Review 2026: Prices, Networks and Tethering
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-sim-card-vs-esim-2026">
              Japan SIM Card vs eSIM (2026): Which Should You Choose?
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-esim-business">
              Best eSIM for Japan for Business Travel (2026)
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-esim-students">
              Best eSIM for Japan for Students (2026): Priced by the Study Month
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-esim-family-group">
              Japan eSIM for Family &amp; Group Travel (2026): Cost Per Head
            </EsimRelatedCard>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Compare all Japan eSIM options</h2>
            <p className={styles.ctaBannerDesc}>
              eSIM Go, Airalo, Holafly and Sakura Mobile on price, data, network and support —
              prices checked daily.
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
