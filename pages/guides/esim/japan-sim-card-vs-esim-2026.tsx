import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import EsimAnswerTable from "../../../components/EsimAnswerTable";
import EsimRelatedCard from "../../../components/EsimRelatedCard";
import {
  getProvider,
  plansFor,
  priceFrom,
  priceFromLabel,
  pricesCheckedLabel,
  siteCheapest,
  siteCheapestFrom,
  unlimitedFromLabel,
  type EsimPlan,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { esimLink, esimSpec, HOLAFLY_ALT_LABEL, HOLAFLY_ALT_NOTE, SPECS_CHECKED_AT } from "../../../lib/esim-specs";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

// Three sources, three dates.
//
// - USD prices: data/esim-prices.json, refreshed daily from each provider's own site
//   (`pricesCheckedAt`).
// - Phone-number and tethering clauses: lib/esim-specs.ts, read off the providers' own
//   pages on SPECS_CHECKED_AT.
// - SAKURA_OFFICIAL_CHECKED is the day the Sakura Mobile plan lengths, the Voice + Data
//   product and the install timing were read off www.sakuramobile.jp itself.
//
// No price is quoted for a generic "Japan tourist SIM": there is no publisher to check
// one against. Sakura Mobile is the only physical tourist SIM we link, so it is the only
// one costed here.
const pricesCheckedAt = pricesCheckedLabel();
const SAKURA_OFFICIAL_CHECKED = "25 Oct 2026";

const ESIM_FROM = siteCheapestFrom();
const ESIM_FROM_PLAN = siteCheapest();
/** Sakura Mobile is the only physical tourist SIM we link, so it sets the SIM-side floor. */
const SAKURA_ENTRY = priceFrom("sakura");
const SAKURA_ENTRY_PLAN = plansFor("sakura")[0];

/** The cheapest plan a provider sells that covers a seven-day trip with 5 GB or more. */
const weekPlan = (id: EsimProviderId): EsimPlan | null =>
  plansFor(id).find((p) => p.days >= 7 && (p.unlimited || (p.gb ?? 0) >= 5)) ?? null;

const TITLE = `Japan SIM Card vs eSIM 2026: eSIM From ${ESIM_FROM}`;
const DESCRIPTION =
  `eSIM wins unless you need a Japanese phone number or your phone predates 2018 — from ` +
  `${ESIM_FROM} for ${ESIM_FROM_PLAN?.name}. Prices checked ${pricesCheckedAt}.`;

const comparisonRows = [
  { feature: "How you get it", esim: "QR code by email — install before you fly", physicalSim: "Collected or delivered inside Japan" },
  { feature: "Phone requirement", esim: "An eSIM-capable, unlocked handset", physicalSim: "Any unlocked phone, however old" },
  { feature: "Japanese phone number", esim: "No — every Japan travel eSIM is data only", physicalSim: "Only on Sakura Mobile's Voice + Data product" },
  { feature: "Voice calls and SMS", esim: "No", physicalSim: "On the Voice + Data plan" },
  { feature: "Cheapest we can price", esim: `${ESIM_FROM} — ${ESIM_FROM_PLAN?.name}`, physicalSim: `${SAKURA_ENTRY} — Sakura Mobile, ${SAKURA_ENTRY_PLAN?.name}` },
  { feature: "Plan lengths sold", esim: "1 to 30 days across the four providers", physicalSim: "4 to 93 days (Sakura Mobile's own SIM pages)" },
  { feature: "Your home SIM", esim: "Stays in the phone and keeps working", physicalSim: "Comes out while the Japan card is in" },
  { feature: "Best for", esim: "Almost every visitor", physicalSim: "A Japanese number, or a pre-2018 handset" },
];

const esimPros = [
  "Installed before you fly — online the moment you land",
  "Nothing to collect, nothing to lose, nothing to return",
  `Cheapest option by a wide margin: from ${ESIM_FROM}`,
  "Your home SIM stays in the phone for calls and texts",
  "One account covers a multi-country trip",
];

const esimCons = [
  "Needs an eSIM-capable, unlocked handset",
  "Data only — no voice, no SMS, no Japanese number",
  "Support quality varies: live chat on some, email on others",
];

const simPros = [
  "Works in any unlocked phone, whatever its age",
  "The Voice + Data product carries a Japanese number and domestic calls",
  "English-speaking support on Sakura Mobile",
  "Sold in lengths up to 93 days, so a long stay is one purchase",
];

const simCons = [
  `Dearest entry point: ${SAKURA_ENTRY} against ${ESIM_FROM} for an eSIM`,
  "Has to be collected or delivered inside Japan",
  "Your home SIM comes out of the phone",
  "A physical card can be lost or damaged",
];

const esimPicks = [
  {
    rank: 1,
    badge: "Best Budget eSIM",
    badgeClass: "pickBadgeGreen" as const,
    name: "eSIM Go",
    summary: `The cheapest Japan eSIM, from ${priceFromLabel("esimgo")} on ${getProvider("esimgo").network} — the network with the broadest rural reach, which is unusual at this price. Tethering is stated on every Japan plan at no extra cost. Sold to consumers as Breeze.`,
    bestFor: "Anyone choosing on price, and anyone tethering a laptop",
    pros: [`Cheapest entry price at ${priceFrom("esimgo")}`, "docomo — widest rural coverage", "Tethering at no extra cost"],
    cons: ["Email-only support", "No in-app top-up", "Data only — no Japanese number"],
    href: esimLink("esimgo"),
    cta: "Get eSIM Go Japan →",
  },
  {
    rank: 2,
    badge: "Best Balance",
    badgeClass: "pickBadgeBlue" as const,
    name: "Airalo",
    summary: `Plans from ${priceFromLabel("airalo")} on ${getProvider("airalo").network}, with the only iOS app here that installs the profile for you and the only in-app top-up. Costs more per GB than eSIM Go; what you are paying for is the recovery path when something goes wrong.`,
    bestFor: "A first eSIM, or anyone who cannot predict their usage",
    pros: ["App installs the profile for you", "Top up without a new profile", "24/7 live chat support"],
    cons: ["Dearer than eSIM Go per GB", "Data only — no Japanese number"],
    href: esimLink("airalo"),
    cta: "Get Airalo Japan eSIM →",
  },
  {
    rank: 3,
    badge: "Unlimited Data",
    badgeClass: "pickBadgeOrange" as const,
    name: "Holafly",
    summary: `Unlimited on-device data from ${unlimitedFromLabel("holafly")}, with nothing to monitor. Two things to know: Airalo (${unlimitedFromLabel("airalo")}) and eSIM Go (${unlimitedFromLabel("esimgo")}) now sell unlimited Japan plans for less, and its hotspot is capped at 1 GB of shareable data a day.`,
    bestFor: "Heavy data users who will not be tethering",
    pros: ["Unlimited on-device data", "Nothing to top up", "Plain QR install on any eSIM phone"],
    cons: ["Dearest unlimited of the four", "Hotspot capped at 1 GB/day", "Data only — no Japanese number"],
    href: esimLink("airalo"),
    cta: HOLAFLY_ALT_LABEL,
    ctaNote: HOLAFLY_ALT_NOTE,
  },
];

const simPick = {
  rank: 1,
  badge: "Best Physical SIM",
  badgeClass: "pickBadgeBlue" as const,
  name: "Sakura Mobile",
  summary: `The only Japan tourist SIM we link, and the only product on this page that can come with a Japanese phone number: ${esimSpec("sakura").phoneNumber}. Its own pages sell the SIM card in lengths from 4 to 93 days, on docomo for the 3 GB/day plans and au/KDDI for unlimited, with English-speaking support (read ${SAKURA_OFFICIAL_CHECKED}).`,
  bestFor: "A Japanese number, a stay measured in months, or a handset with no eSIM",
  pros: [
    "Voice + Data product carries a Japanese number and domestic calls",
    "English-speaking support team",
    "Sold in lengths up to 93 days",
    "Works in any unlocked phone",
  ],
  cons: [
    `Entry price ${SAKURA_ENTRY} against ${ESIM_FROM} for an eSIM`,
    "Collected or delivered inside Japan",
    "Your home SIM comes out",
  ],
  href: esimLink("sakura"),
  cta: "Get Sakura Mobile SIM →",
};

const scenarios = [
  { trip: "A week or less", recommendation: "eSIM", reason: `Nothing physical competes at ${ESIM_FROM}, and there is nothing to collect on arrival` },
  { trip: "Two to four weeks", recommendation: "eSIM", reason: "Still cheaper, and 15- and 30-day plans cover the trip in one purchase" },
  { trip: "A month or more", recommendation: "Physical SIM", reason: "Sakura Mobile sells up to 93 days in one go; stacked eSIM months cost more and install three times" },
  { trip: "You need a Japanese number", recommendation: "Physical SIM", reason: "No Japan travel eSIM sells voice or SMS at any price — this is the one requirement an eSIM cannot meet" },
  { trip: "Handset made before about 2018", recommendation: "Physical SIM", reason: "No eSIM hardware, so there is no comparison to make — any unlocked phone takes a card" },
  { trip: "iPhone bought in mainland China", recommendation: "Physical SIM", reason: "Those models shipped without eSIM whatever the generation, so the hardware check fails" },
  { trip: "Two or more sharing one connection", recommendation: "Neither — Pocket WiFi", reason: "One flat rental beats an eSIM each from two people up; the arithmetic is on our family and group page" },
];

const faqItems = [
  {
    q: "Is an eSIM better than a SIM card for Japan?",
    a: `For almost every visitor, yes. It is cheaper (from ${ESIM_FROM} for ${ESIM_FROM_PLAN?.name} against ${SAKURA_ENTRY} for the cheapest physical travel plan we link), it installs before you fly, and your home SIM stays in the phone. There are exactly two situations where cost is irrelevant and a card is the only option: you need a Japanese phone number, or your handset has no eSIM hardware. Prices checked ${pricesCheckedAt}.`,
  },
  {
    q: "Which is cheaper for Japan, an eSIM or a SIM card?",
    a: `An eSIM, clearly, at the short end. The cheapest Japan eSIM is ${ESIM_FROM} for ${ESIM_FROM_PLAN?.name}; the cheapest physical travel plan we can price is ${SAKURA_ENTRY} from Sakura Mobile, and that buys ${SAKURA_ENTRY_PLAN?.name} rather than a week. The gap closes on a long stay, because Sakura Mobile sells a single plan up to 93 days while an eSIM month has to be re-bought and re-installed each time. We quote no figure for a generic "tourist SIM" — there is no publisher to check one against.`,
  },
  {
    q: "Can I get a Japanese phone number with an eSIM?",
    a: `Not from a travel eSIM. ${esimSpec("esimgo").phoneNumber} ${esimSpec("holafly").phoneNumber}, and Airalo's Japan plans are data only too. The one exception among the four providers is Sakura Mobile's separate Voice + Data eSIM, which adds a Japanese number and domestic calls. Clauses read ${SPECS_CHECKED_AT}.`,
  },
  {
    q: "How do I know whether my phone takes an eSIM?",
    a: "Two checks. First the hardware: on an iPhone, Settings → General → About and scroll to EID; on Android, the same EID row under About phone. An EID means the hardware is there — iPhone XS and later, Pixel 3 and later, Galaxy S20 and later. iPhones bought in mainland China shipped without eSIM whatever the model. Second the carrier lock: a handset bought on contract can refuse a third-party profile even with the hardware present, and a home carrier typically needs 24–48 hours to unlock it.",
  },
  {
    q: "Can I buy a physical SIM at a Japanese airport?",
    a: `Physical SIM cards and eSIM QR codes are sold from counters and vending machines at the major airports — Narita, Haneda, Kansai and Chubu among them. The catch is that you are buying at the counter price after a long flight rather than the pre-order price, and the counter's opening hours bind an early or late arrival. Pre-ordering is both cheaper and faster; the eSIM route skips the counter entirely.`,
  },
  {
    q: "Can I keep my home number while using a Japan eSIM?",
    a: "Yes, and this is one of the real advantages over a card. On a dual-SIM handset the home SIM stays in place for calls and texts while the Japan eSIM carries the data. Set the eSIM as the default data line and turn data roaming off on the home SIM so it cannot connect by accident. With a physical Japan SIM, your home SIM has to come out.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/japan-sim-card-vs-esim-2026") } });

export default function JapanSimCardVsEsim2026Page({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-sim-card-vs-esim-2026" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-sim-card-vs-esim-2026" />
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
              route: "/guides/esim/japan-sim-card-vs-esim-2026",
              headline: "Japan SIM Card vs eSIM (2026): Which Should You Choose?",
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
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://www.japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "SIM Card vs eSIM", item: "https://www.japan-travel-kit.com/guides/esim/japan-sim-card-vs-esim-2026" },
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
          <span className={styles.breadCurrent}>SIM Card vs eSIM</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan SIM Card vs eSIM (2026):<br />Which Should You Choose?
          </h1>
          <p className={styles.heroSubtitle}>
            eSIM for almost everyone — unless you need a Japanese phone number,
            or your handset cannot take one. Those are the only two real reasons.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, `eSIM from ${ESIM_FROM}`, "Prices checked daily"].map((t) => (
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

        {/* Quick Answer Box — the whole answer, first */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>Buy an eSIM unless one of two things is true.</strong> On price it is not
              close: the cheapest Japan eSIM is {ESIM_FROM} for {ESIM_FROM_PLAN?.name}, against{" "}
              {SAKURA_ENTRY} for the cheapest physical travel plan we can price, and
              the eSIM installs before you fly with nothing to collect at the airport. But cost is
              not what decides this. There are exactly two situations where the price comparison is
              irrelevant and a physical SIM is the only option: <strong>you need a Japanese phone
              number</strong> — no Japan travel eSIM sells voice or SMS at any price, and only
              Sakura Mobile&apos;s Voice + Data product carries one — or <strong>your handset has
              no eSIM hardware</strong>, which covers anything made before about 2018 and every
              iPhone bought in mainland China. If neither applies, buy an eSIM and stop reading.
              Prices checked {pricesCheckedAt}; phone-number and tethering clauses{" "}
              {SPECS_CHECKED_AT}.
            </p>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>For most visitors</p>
                <p className={styles.verdictStatValue}>eSIM — from {ESIM_FROM}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Need a Japanese number?</p>
                <p className={styles.verdictStatValue}>Sakura Mobile Voice + Data</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Phone with no EID?</p>
                <p className={styles.verdictStatValue}>Physical SIM, no choice</p>
              </div>
            </div>
          </div>
        </div>

        {/* The table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>What Does a Week in Japan Cost Either Way?</h2>
          <p className={styles.bodyText}>
            One week, 5 GB or more: the cheapest plan each provider sells that covers it, with the
            phone-number and tethering clauses that actually decide this comparison. Sakura
            Mobile&apos;s row is the one to read if you need a number — it is the only provider of
            the four that can supply one.
          </p>
          <EsimAnswerTable
            pick={weekPlan}
            note="The cheapest plan each provider sells with at least 7 days' validity and 5 GB or more; Holafly sells unlimited only."
          />
        </section>

        {/* Comparison Table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Format</span>
          <h2 className={styles.sectionTitle}>What Is Actually Different Between the Two?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Feature", "eSIM", "Physical SIM"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.tdProvider}>{row.feature}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.esim}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.physicalSim}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The physical-SIM column describes Sakura Mobile, the only Japan tourist SIM we link —
            plan lengths, networks and the Voice + Data product read off sakuramobile.jp on{" "}
            {SAKURA_OFFICIAL_CHECKED}, prices from our daily feed, checked {pricesCheckedAt}. No
            figure appears here for a generic &ldquo;Japan tourist SIM&rdquo;, because there is no
            publisher to check one against.
          </p>
        </section>

        {/* eSIM Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>eSIM</span>
          <h2 className={styles.sectionTitle}>eSIM: What Do You Gain and Give Up?</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {esimPros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {esimCons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Physical SIM Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Physical SIM</span>
          <h2 className={styles.sectionTitle}>Physical SIM: What Do You Gain and Give Up?</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {simPros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {simCons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Best eSIMs */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>Top eSIM picks</span>
          <h2 className={styles.sectionTitle}>Which eSIM Should You Buy?</h2>
          <div className={styles.picksList}>
            {esimPicks.map((pick) => (
              <div key={pick.rank} className={styles.pickCard}>
                <div className={styles.pickCardHeader}>
                  <div className={styles.pickRank}>
                    <span className={styles.pickNumber}>{pick.rank}</span>
                    <div className={styles.pickMeta}>
                      <span className={`${styles.pickBadge} ${styles[pick.badgeClass]}`}>{pick.badge}</span>
                      <span className={styles.pickName}>{pick.name}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.pickCardBody}>
                  <p className={styles.pickSummary}>{pick.summary}</p>
                  <div className={styles.pickTarget}>
                    <span className={styles.pickTargetLabel}>Best for:</span>
                    <span>{pick.bestFor}</span>
                  </div>
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
                    href={pick.href}
                    className={styles.pickCta}
                    target="_blank"
                    rel={pick.ctaNote ? "sponsored noopener" : "noopener noreferrer nofollow"}
                  >
                    {pick.cta}
                  </a>
                  {pick.ctaNote && (
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
                      {pick.ctaNote}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Best Physical SIM */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>Top SIM pick</span>
          <h2 className={styles.sectionTitle}>Which Physical SIM Should You Buy?</h2>
          <div className={styles.picksList}>
            <div className={styles.pickCard}>
              <div className={styles.pickCardHeader}>
                <div className={styles.pickRank}>
                  <span className={styles.pickNumber}>{simPick.rank}</span>
                  <div className={styles.pickMeta}>
                    <span className={`${styles.pickBadge} ${styles[simPick.badgeClass]}`}>{simPick.badge}</span>
                    <span className={styles.pickName}>{simPick.name}</span>
                  </div>
                </div>
              </div>
              <div className={styles.pickCardBody}>
                <p className={styles.pickSummary}>{simPick.summary}</p>
                <div className={styles.pickTarget}>
                  <span className={styles.pickTargetLabel}>Best for:</span>
                  <span>{simPick.bestFor}</span>
                </div>
                <div className={styles.pickGrid}>
                  <div className={styles.pickPros}>
                    <p className={styles.pickListLabel}>Pros</p>
                    <ul className={styles.pickList}>
                      {simPick.pros.map((p) => (
                        <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.pickCons}>
                    <p className={styles.pickListLabel}>Cons</p>
                    <ul className={styles.pickList}>
                      {simPick.cons.map((c) => (
                        <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <a
                  href={simPick.href}
                  className={styles.pickCta}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  {simPick.cta}
                </a>
                <p className={styles.bodyText} style={{ marginTop: "0.9rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  Yen prices, the daily cap, hotspot allowances and the Voice + Data plan are
                  broken down in our{" "}
                  <Link href="/guides/esim/sakura-mobile-review" style={{ color: "var(--accent)", fontWeight: 600 }}>
                    Sakura Mobile review
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Which Should You Choose */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Decision guide</span>
          <h2 className={styles.sectionTitle}>Which Should You Choose for Your Trip?</h2>
          <p className={styles.bodyText}>
            Find your row. Trip length decides it on cost; the last four rows override cost
            entirely, because in each of them one of the two options simply cannot do the job.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your situation", "Buy", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scenarios.map((row) => (
                    <tr key={row.trip}>
                      <td className={styles.tdProvider}>{row.trip}</td>
                      <td style={{ fontWeight: 700, color: "var(--sumi)" }}>{row.recommendation}</td>
                      <td style={{ fontSize: "0.83rem" }}>{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* The part an AI answer can't do for you — and the CTA */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Before you buy</span>
          <h2 className={styles.sectionTitle}>Will It Work on Your Phone, and When Should You Buy?</h2>
          <p className={styles.bodyText}>
            This whole comparison collapses into one question about your own handset, and nothing
            but the handset can answer it. Three checks, about two minutes.
          </p>
          <div className={styles.stepsList}>
            {[
              {
                title: "Is there an EID?",
                desc: "iPhone: Settings → General → About, scroll to EID. Android: About phone, same row. An EID means eSIM hardware — iPhone XS and later, Pixel 3 and later, Galaxy S20 and later. No EID row, and the eSIM column of every table above is unavailable to you: buy the card.",
              },
              {
                title: "Is the handset carrier-locked?",
                desc: "A phone bought on contract can refuse a third-party eSIM profile even with the hardware present. Ask your home carrier to unlock it before you fly — our setup guide puts that at 24–48 hours for most carriers — because an unlock request from Japan is a bad week.",
              },
              {
                title: "When do the days start counting?",
                desc: `eSIM: buy any time, install at home with the profile switched off, turn it on when you land. Physical SIM: it is collected or delivered inside Japan, so it has to be ordered before you fly. Sakura Mobile's 3 GB/day plan is the one exception on the eSIM side — its own guide says that one installs on the day you want it to start, and the days run from install (read ${SAKURA_OFFICIAL_CHECKED}).`,
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
          <p className={styles.bodyText} style={{ marginTop: "1.2rem" }}>
            Full walkthroughs:{" "}
            <Link href="/guides/esim/does-esim-work-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              the compatibility checks
            </Link>
            ,{" "}
            <Link href="/guides/esim/japan-esim-android" style={{ color: "var(--accent)", fontWeight: 600 }}>
              where to tap on Android
            </Link>{" "}
            and{" "}
            <Link href="/guides/esim/how-to-set-up-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              the install steps per phone
            </Link>
            .
          </p>
          <div className={styles.pickCtaRow}>
            <a href={esimLink("esimgo")} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Get an eSIM — from {ESIM_FROM} →
            </a>
            <a href={esimLink("sakura")} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Get a Sakura Mobile SIM →
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
            <EsimRelatedCard href="/guides/esim/sakura-mobile-review">
              Sakura Mobile Review 2026: eSIM &amp; SIM Card Plans and Prices
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/esim-go-japan-review">
              eSIM Go Japan Review 2026: Prices, Networks and Tethering
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-esim-android">
              Best eSIM for Japan on Android (2026): Picks and Setup
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
            <EsimRelatedCard href="/guides/esim/pocket-wifi-vs-esim-japan">
              Pocket WiFi vs eSIM for Japan (2026): Which Is Better?
            </EsimRelatedCard>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Compare all Japan connectivity options</h2>
            <p className={styles.ctaBannerDesc}>
              eSIM, physical SIM, Pocket WiFi — every way to stay connected in Japan, priced
              side by side.
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
