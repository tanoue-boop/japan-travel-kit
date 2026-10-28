import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProviderPlanTable from "../../../components/ProviderPlanTable";
import EsimAnswerTable from "../../../components/EsimAnswerTable";
import EsimRelatedCard from "../../../components/EsimRelatedCard";
import {
  cheapestAtLeastGb,
  cheapestPlan,
  formatUsd,
  getProvider,
  plansFor,
  priceAtLeastLabel,
  priceFrom,
  priceFromLabel,
  pricesCheckedLabel,
  unlimitedFromLabel,
  type EsimPlan,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { esimLink, esimSpec, SPECS_CHECKED_AT } from "../../../lib/esim-specs";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

// Two sources, two dates. Every USD figure comes from data/esim-prices.json, refreshed
// daily from each provider's own site (`pricesCheckedAt`). The tethering and
// phone-number clauses come from lib/esim-specs.ts, read off the providers' own pages
// and help centres on SPECS_CHECKED_AT. Nothing here is a speed test or a trip of ours.
const pricesCheckedAt = pricesCheckedLabel();

const dataLabel = (p: EsimPlan | null) => (p ? (p.unlimited ? "Unlimited" : `${p.gb} GB`) : "—");
const priceLabel = (p: EsimPlan | null) => (p ? formatUsd(p.priceUsd) : "—");

const NETWORK = getProvider("esimgo").network;
const ENTRY = cheapestPlan("esimgo");
const MONTH_20 = cheapestAtLeastGb("esimgo", 20);
const FROM = priceFromLabel("esimgo");
const TEN_GB = priceLabel(cheapestAtLeastGb("esimgo", 10));
const AIRALO_ENTRY = priceFrom("airalo");
const AIRALO_20 = priceLabel(cheapestAtLeastGb("airalo", 20));

/** The cheapest plan a provider sells that covers a seven-day trip with 5 GB or more. */
const weekPlan = (id: EsimProviderId): EsimPlan | null =>
  plansFor(id).find((p) => p.days >= 7 && (p.unlimited || (p.gb ?? 0) >= 5)) ?? null;

const TITLE = `eSIM Go Japan Review 2026: ${dataLabel(ENTRY)} ${priceLabel(ENTRY)}, ${dataLabel(MONTH_20)} ${priceLabel(MONTH_20)}`;
const DESCRIPTION =
  `The cheapest Japan eSIM: ${priceLabel(ENTRY)} for ${ENTRY?.name}, ${priceLabel(MONTH_20)} for ` +
  `${MONTH_20?.name} on ${NETWORK}. Tethering included, no phone number, email support.`;

const pros = [
  "Cheapest entry price and cheapest per GB of the four",
  "30-day validity the whole way up the range",
  "Tethering stated on every Japan plan, at no extra cost",
  "Docomo — the widest reach outside the cities",
  "One account covers 190+ countries on a multi-stop trip",
];

const cons = [
  "Data only — no voice, no SMS, no Japanese number",
  "No in-app top-up: running dry means a second profile",
  "Email support only, where Airalo has live chat",
  'Its unlimited tier is "Unlimited Essential" — speed drops after a daily allowance',
];

const whoFor = [
  {
    title: "Anyone buying on price",
    desc: `eSIM Go undercuts the other three at every tier we track: ${priceLabel(ENTRY)} to start, ${TEN_GB} for 10 GB and ${priceLabel(MONTH_20)} for ${dataLabel(MONTH_20)} over 30 days. If cost is the deciding factor, nothing here beats it.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
      </svg>
    ),
  },
  {
    title: "Anyone tethering a laptop",
    desc: "Tethering is stated on every eSIM Go Japan plan at no extra cost and with no separate hotspot allowance — the one spec where it beats Holafly's 1 GB/day cap and Sakura Mobile's per-plan allowance outright.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="12" rx="2" />
        <line x1="8" y1="20" x2="16" y2="20" />
      </svg>
    ),
  },
  {
    title: "Anyone leaving the big cities",
    desc: `Its Japan page names NTT docomo among the networks it covers, and docomo has the broadest reach outside the cities. A provider this cheap running on ${NETWORK} is unusual — the budget option is normally the one with the worst coverage.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

// Cheapest plan at each data tier, from the tracker.
const vsRows = [
  { feature: "Cheapest plan", esimgo: priceFromLabel("esimgo"), airalo: priceFromLabel("airalo") },
  { feature: "5 GB or more", esimgo: priceAtLeastLabel("esimgo", 5), airalo: priceAtLeastLabel("airalo", 5) },
  { feature: "10 GB or more", esimgo: priceAtLeastLabel("esimgo", 10), airalo: priceAtLeastLabel("airalo", 10) },
  { feature: "20 GB or more", esimgo: priceAtLeastLabel("esimgo", 20), airalo: priceAtLeastLabel("airalo", 20) },
  { feature: "Unlimited, 7 days", esimgo: unlimitedFromLabel("esimgo", 7), airalo: unlimitedFromLabel("airalo", 7) },
  { feature: "Network", esimgo: NETWORK, airalo: getProvider("airalo").network },
  { feature: "Top-up without a new profile", esimgo: "No", airalo: "Yes, from the app" },
  { feature: "Support", esimgo: "Email only", airalo: "24/7 live chat" },
];

const faqItems = [
  {
    q: "Is eSIM Go the cheapest eSIM for Japan?",
    a: `Yes, at every tier in our tracker. Its entry plan is ${priceLabel(ENTRY)} for ${ENTRY?.name} against Airalo's ${AIRALO_ENTRY}; 10 GB is ${TEN_GB} against Airalo's ${priceLabel(cheapestAtLeastGb("airalo", 10))}; ${dataLabel(MONTH_20)} over 30 days is ${priceLabel(MONTH_20)} against Airalo's ${AIRALO_20}. Prices read from the providers' own sites on ${pricesCheckedAt}.`,
  },
  {
    q: "Can you tether or use a hotspot on eSIM Go?",
    a: `Yes. ${esimSpec("esimgo").tethering}. That is the clearest difference between it and the other three: Holafly allows 1 GB of shareable data per day, Sakura Mobile sets a hotspot allowance by plan length, and Airalo's help centre says the personal hotspot works where your device and the network allow it. Clauses read ${SPECS_CHECKED_AT}.`,
  },
  {
    q: "Does eSIM Go give you a Japanese phone number?",
    a: `No. ${esimSpec("esimgo").phoneNumber} The same is true of Airalo and Holafly. If you need a Japanese number — for a bank account, a reservation line or a part-time job — the only route among the four is Sakura Mobile's separate Voice + Data eSIM.`,
  },
  {
    q: "What network does eSIM Go use in Japan?",
    a: `${NETWORK}, per its own Japan page, which names NTT docomo among the networks it covers. docomo has the broadest reach of the three national carriers outside the cities, which makes eSIM Go an unusually safe budget pick for an itinerary that leaves Tokyo, Kyoto and Osaka — Nikko, Shikoku, the Noto Peninsula and similar.`,
  },
  {
    q: "What does eSIM Go's \"unlimited\" actually mean?",
    a: `Not unmetered. The tier is sold as "Unlimited Essential" and its own plan note says speed is reduced after a daily high-speed allowance. An unlimited week is ${unlimitedFromLabel("esimgo", 7)} against ${unlimitedFromLabel("holafly", 7)} on Holafly, so it is the cheapest unlimited of the four as well — but a ${dataLabel(MONTH_20)} plan at ${priceLabel(MONTH_20)} is better value unless you genuinely cannot predict your usage.`,
  },
  {
    q: "What is the catch with eSIM Go?",
    a: "Two things, both about what happens when something goes wrong. Support is email only, where Airalo runs 24/7 live chat — a real difference if this is your first eSIM. And there is no in-app top-up: run out of data mid-trip and you buy and install a second profile rather than adding to the one you have. If either worries you, Airalo costs a little more and removes both.",
  },
  {
    q: "How long before the trip should you buy it?",
    a: "There is no advantage to buying weeks early and no penalty either. The practical sequence is: run the two compatibility checks first (an EID in Settings → About, and that the handset is not carrier-locked, which can take a home carrier 24–48 hours to clear), then buy, then install the profile at home with it switched off, and switch it on when you land.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/esim-go-japan-review") } });

export default function EsimGoJapanReviewPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/esim-go-japan-review" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/esim-go-japan-review" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/esim/esim-go-japan-review",
              headline: "eSIM Go Japan Review (2026): Prices, Networks and Tethering",
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://www.japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "eSIM Go Review", item: "https://www.japan-travel-kit.com/guides/esim/esim-go-japan-review" },
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>eSIM Go Japan Review</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Prices checked {pricesCheckedAt}</p>
          <h1 className={styles.heroTitle}>
            eSIM Go Japan Review (2026):<br />Prices, Networks and Tethering
          </h1>
          <p className={styles.heroSubtitle}>
            The cheapest Japan eSIM at every tier we track — and the two things it does not do.
          </p>
          <div className={styles.heroBadges}>
            {[`From ${priceLabel(ENTRY)}`, "Prices checked daily", "Tethering included"].map((t) => (
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

        {/* Quick Verdict — the whole answer, first */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Verdict</span>
            <div className={styles.verdictStarRow}>
              <div className={styles.verdictStars}>
                <span className={styles.starFull}>★</span>
                <span className={styles.starFull}>★</span>
                <span className={styles.starFull}>★</span>
                <span className={styles.starFull}>★</span>
                <span className={styles.starHalf}>★</span>
              </div>
              <span className={styles.verdictScore}>4.2 / 5</span>
            </div>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              <strong>
                Buy it if price or tethering decides this for you; buy Airalo instead if you want
                live chat and in-app top-up.
              </strong>{" "}
              eSIM Go — sold to consumers as Breeze — is the cheapest of the four providers we
              track at every tier: {priceLabel(ENTRY)} for {ENTRY?.name}, {TEN_GB} for 10 GB and{" "}
              {priceLabel(MONTH_20)} for {MONTH_20?.name}, against Airalo&apos;s {AIRALO_ENTRY}{" "}
              entry and {AIRALO_20} for 20 GB. It
              runs on {NETWORK}, which is unusual at this price, and tethering is stated on every
              Japan plan at no extra cost — where Holafly caps the hotspot at 1 GB/day. What you
              give up: no Japanese phone number, no in-app top-up, and email support rather than
              live chat. Prices checked {pricesCheckedAt}; tethering and phone-number clauses{" "}
              {SPECS_CHECKED_AT}.
            </p>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Price from</p>
                <p className={styles.verdictStatValue}>{priceLabel(ENTRY)} — {ENTRY?.name}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Network</p>
                <p className={styles.verdictStatValue}>{NETWORK}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Phone number</p>
                <p className={styles.verdictStatValue}>No — data only</p>
              </div>
            </div>
          </div>
        </div>

        {/* The table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>How Does eSIM Go Compare with the Other Three?</h2>
          <p className={styles.bodyText}>
            One week in Japan, 5 GB or more: the cheapest plan each provider sells that covers it,
            with the two clauses the price alone does not tell you.
          </p>
          <EsimAnswerTable
            pick={weekPlan}
            note="The cheapest plan each provider sells with at least 7 days' validity and 5 GB or more; Holafly sells unlimited only."
          />
        </section>

        {/* What is eSIM Go */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is eSIM Go, and Who Is Breeze?</h2>
          <p className={styles.bodyText}>
            eSIM Go is a global eSIM provider that sells to travellers under the Breeze brand at
            breezesim.com, covering 190+ countries with data-only plans. It has none of the brand
            recognition of Airalo or Holafly, and it undercuts both at every tier — which is the
            whole case for it.
          </p>
          <p className={styles.bodyText}>
            For Japan it runs on {NETWORK}; its Japan page names NTT docomo among the networks it
            covers. Plans run from {FROM} up to 100 GB, plus the &ldquo;Unlimited Essential&rdquo;
            daily tier, all delivered as a QR code by email. There is no app to install: the
            profile lives in your phone&apos;s own eSIM settings, which is why there is also no
            in-app top-up.
          </p>
        </section>

        {/* Plans table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>What Does eSIM Go Cost for Japan?</h2>
          <ProviderPlanTable providerId="esimgo" />
        </section>

        {/* Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Assessment</span>
          <h2 className={styles.sectionTitle}>What Are the Trade-offs?</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {pros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {cons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Fit</span>
          <h2 className={styles.sectionTitle}>Who Is eSIM Go Best For?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* eSIM Go vs Airalo */}
        <section className={styles.comparisonFeature}>
          <span className={styles.sectionLabel}>Head to head</span>
          <h2 className={styles.sectionTitle}>Is eSIM Go or Airalo Cheaper, Tier by Tier?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.featureTable}>
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>eSIM Go</th>
                    <th>Airalo</th>
                  </tr>
                </thead>
                <tbody>
                  {vsRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.ftFeature}>{row.feature}</td>
                      <td className={styles.ftEsim}>{row.esimgo}</td>
                      <td className={styles.ftSim}>{row.airalo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "1rem", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--sumi)" }}>Bottom line:</strong> eSIM Go is cheaper at
            every tier. The difference you are buying with Airalo is what happens when something
            goes wrong — live chat instead of email, and top-up from the app instead of a second
            profile. Prices checked {pricesCheckedAt}.
          </p>
        </section>

        {/* The part an AI answer can't do for you — and the CTA */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Before you buy</span>
          <h2 className={styles.sectionTitle}>Will It Work on Your Phone, and When Should You Buy?</h2>
          <p className={styles.bodyText}>
            eSIM Go has no app and no compatibility checker, so these three checks are yours to
            run — and the first two depend on the handset in your hand rather than on anything a
            summary can tell you.
          </p>
          <div className={styles.stepsList}>
            {[
              {
                title: "Check the hardware: is there an EID?",
                desc: "iPhone: Settings → General → About, scroll to EID. Android: About phone, same row. An EID means eSIM hardware — iPhone XS and later, Pixel 3 and later, Galaxy S20 and later. iPhones bought in mainland China shipped without it, whatever the model.",
              },
              {
                title: "Check the carrier lock before you pay",
                desc: "A handset bought on contract can refuse a third-party profile even with the hardware present, and eSIM Go's support is email-only — not what you want to discover at Narita. Our setup guide puts a home-carrier unlock at 24–48 hours, so ask first and buy second.",
              },
              {
                title: "Buy, install at home, switch on when you land",
                desc: "The QR code arrives by email straight after checkout, so there is nothing to wait for and no reason to buy weeks early. Install the profile before you fly, leave it toggled off so the plan is not burning days, and turn it on after landing.",
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
          <a
            href={esimLink("esimgo")}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Get eSIM Go Japan — from {priceLabel(ENTRY)} →
          </a>
        </section>

        {/* Verdict */}
        <section className={styles.verdictSection}>
          <span className={styles.sectionLabel}>Bottom line</span>
          <h2 className={styles.sectionTitle}>Verdict</h2>
          <p className={styles.verdictText}>
            For anyone choosing on price, eSIM Go is the straightforward answer: cheapest at every
            tier we track, from {priceLabel(ENTRY)}, on {NETWORK} — a network combination the
            budget option usually does not get. Tethering at no extra cost makes it the pick for a
            laptop too.
          </p>
          <p className={styles.verdictText}>
            The weakness is the recovery path. Airalo and Holafly both run live chat; eSIM Go is
            email-only, and there is no top-up without installing a second profile. For a second
            or third eSIM that is a non-issue. For a first one, Airalo removes both problems for
            a few dollars more.
          </p>
          <p className={styles.verdictText}>
            And if you need a Japanese phone number, none of this applies — no eSIM Go plan sells
            voice or SMS at any price, and Sakura Mobile&apos;s Voice + Data eSIM is the only route
            to a number among the four.
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
            <EsimRelatedCard href="/guides/esim/best-esim-japan">
              Best eSIM for Japan 2026: Top 4 Picks Compared
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/sakura-mobile-review">
              Sakura Mobile Review 2026: eSIM &amp; SIM Card Plans and Prices
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-sim-card-vs-esim-2026">
              Japan SIM Card vs eSIM (2026): Which Should You Choose?
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Compare all Japan eSIM options</h2>
            <p className={styles.ctaBannerDesc}>
              See how eSIM Go stacks up against Airalo, Holafly and Sakura Mobile on price, data
              and coverage.
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
