import Head from "next/head";
import NextStepCards from "../../../components/NextStepCards";
import Link from "next/link";
import EsimPageAnswer from "../../../components/EsimPageAnswer";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import buyStyles from "../../../styles/EsimBuyBlocks.module.css";
import ProviderPlanTable from "../../../components/ProviderPlanTable";
import {
  cheapestAtLeastGb,
  cheapestPlan,
  cheapestUnlimited,
  formatUsd,
  getProvider,
  priceFromLabel,
  pricesCheckedLabel,
  unlimitedFromLabel,
  type EsimPlan,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { airaloTrackedUrl, ESIM_PLACEMENT, pageTag } from "../../../lib/esim-placement";
import { SIMBYE_DISCOUNT_CODE, SIMBYE_DISCOUNT_PERCENT, simbyeTrackedUrl } from "../../../lib/simbye";
import { airaloReviewPayBeforeLand, klookEsim } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { esimProductJsonLd } from "../../../lib/esim-picks";
import { EsimCtaTop } from "../../../components/EsimCta";

const ROUTE = "/guides/esim/airalo-japan-review";
const TAG = pageTag(ROUTE);
// The comparison table keeps the placement (and Klook ad id) of the block it replaced.
const PLACEMENT = ESIM_PLACEMENT.brandCompare;

// All prices below are read from data/esim-prices.json, the same file as the price tracker
// (refreshed daily). Airalo's were also read on its own Japan page on 23 Nov 2026 and matched.
const pricesCheckedAt = pricesCheckedLabel();
const FROM = priceFromLabel("airalo");
const UNLIMITED = unlimitedFromLabel("airalo", 7);
const AIRALO_OFFICIAL_URL = "https://www.airalo.com/japan-esim";
const AIRALO_READ_ON = "23 Nov 2026";
const LAST_CHECKED = "2026-11-23";

const A_FROM = cheapestPlan("airalo");
const A_5GB = cheapestAtLeastGb("airalo", 5);
const A_UNL7 = cheapestUnlimited("airalo", 7);

/** Cheapest plan lasting at least `days` with at least `gb` GB (null = unlimited only). */
function cheapestFor(id: EsimProviderId, days: number, gb: number | null): EsimPlan | null {
  const plans = getProvider(id).plans.filter(
    (p) => p.days >= days && (gb === null ? p.unlimited : p.unlimited || (p.gb ?? 0) >= gb)
  );
  return plans.reduce<EsimPlan | null>((a, b) => (!a || b.priceUsd < a.priceUsd ? b : a), null);
}

const COMPARED: { id: EsimProviderId; name: string }[] = [
  { id: "airalo", name: "Airalo" },
  { id: "simbye", name: "Simbye" },
  { id: "sakura", name: "Sakura Mobile" },
];

const BANDS: { label: string; days: number; gb: number | null }[] = [
  { label: "3 GB, 7 days", days: 7, gb: 3 },
  { label: "5 GB, 7 days", days: 7, gb: 5 },
  { label: "10 GB, 15 days", days: 15, gb: 10 },
  { label: "20 GB, 30 days", days: 30, gb: 20 },
  { label: "Unlimited, 7 days", days: 7, gb: null },
];

const compareRows = BANDS.map((band) => {
  const cells = COMPARED.map((c) => ({ ...c, plan: cheapestFor(c.id, band.days, band.gb) }));
  let winner: (typeof cells)[number] | null = null;
  for (const c of cells) if (c.plan && (!winner || c.plan.priceUsd < winner.plan!.priceUsd)) winner = c;
  return { ...band, cells, winner };
});

const simbyeCheaperRows = compareRows.filter((r) => {
  const a = r.cells.find((c) => c.id === "airalo")?.plan;
  const s = r.cells.find((c) => c.id === "simbye")?.plan;
  return a && s && s.priceUsd < a.priceUsd;
}).length;

/** "Simbye in all 5 rows" or "Simbye in 4 of 5 rows, Airalo in 1". */
function winnerSummary(): string {
  const counts = new Map<string, number>();
  for (const r of compareRows) if (r.winner) counts.set(r.winner.name, (counts.get(r.winner.name) ?? 0) + 1);
  const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 1) return `${sorted[0][0]} in all ${compareRows.length} rows`;
  return sorted.map(([n, c], i) => (i === 0 ? `${n} in ${c} of ${compareRows.length} rows` : `${n} in ${c}`)).join(", ");
}

/** The cheapest of the three priced providers for a plan picker, e.g. unlimited for 7 days. */
function cheapestOfThree(pick: (id: EsimProviderId) => EsimPlan | null): { name: string; plan: EsimPlan } | null {
  let best: { name: string; plan: EsimPlan } | null = null;
  for (const c of COMPARED) {
    const plan = pick(c.id);
    if (plan && (!best || plan.priceUsd < best.plan.priceUsd)) best = { name: c.name, plan };
  }
  return best;
}
const UNL7_BEST = cheapestOfThree((id) => cheapestUnlimited(id, 7));
const LOWEST = cheapestOfThree((id) => cheapestPlan(id));

function priceWithCode(plan: EsimPlan): string {
  return plan.discountedUsd ? `${formatUsd(plan.priceUsd)} (${formatUsd(plan.discountedUsd)} with code)` : formatUsd(plan.priceUsd);
}

const TITLE = "Airalo Japan eSIM Review 2026: Price, Network & Setup";
const DESCRIPTION = `Airalo's Japan eSIM costs ${A_FROM ? formatUsd(A_FROM.priceUsd) : "—"} for ${A_FROM?.name ?? ""}, ${A_5GB ? formatUsd(A_5GB.priceUsd) : "—"} for ${A_5GB?.name ?? ""}, on SoftBank, KDDI and Rakuten. Price vs Klook eSIM, Simbye and Sakura Mobile.`;

const pros = [
  "Airalo says over 30 million people have used it",
  "Instant activation before you land",
  `Plans from ${FROM} — including unlimited`,
  "5G on SoftBank, with KDDI and Rakuten as fallback networks",
  "Top-ups from the app, no new QR code",
];

const cons = [
  "Data-only (no voice calls or SMS)",
  "Requires eSIM-compatible phone",
  `Costs more than Simbye in ${simbyeCheaperRows} of ${compareRows.length} same-trip rows in the table above`,
];

const whoFor = [
  {
    title: "Short-trip travellers",
    desc: "1–4 week visits where you need data, not calling. Airalo's 7-day and 30-day plans cover most tourist itineraries.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    title: "First-time eSIM users",
    desc: "Airalo's app makes scanning and activating a QR code straightforward — even if you've never used an eSIM before.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Short, light-data trips",
    desc: `From ${FROM}, Airalo's small plans cover a few days of maps and messaging; for bigger allowances, compare the table at the top.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
      </svg>
    ),
  },
];

const setupSteps = [
  {
    title: "Download the Airalo app",
    desc: "Available free on iOS and Android, or buy on airalo.com. Create an account.",
  },
  {
    title: "Buy your Japan plan",
    desc: "Search for Japan, pick the days and data you need, and check out. The eSIM and its installation details appear in the app.",
  },
  {
    title: "Install it at home, on Wi-Fi",
    desc: "Install from the app, or via Settings → Cellular (or Mobile Data) → Add eSIM. Airalo's instructions: keep a stable internet connection, do not interrupt the installation, and do not delete the eSIM afterwards.",
  },
  {
    title: "Connect when you land in Japan",
    desc: "Turn the Airalo line on, select it for mobile data and switch on Data Roaming for it. The plan's validity starts when the eSIM first connects to a network in Japan, not when you install it.",
  },
];

/**
 * The four question H2s answered in a line each, and the page's FAQPage. Prices come from
 * the price file, network and install facts from airalo.com/japan-esim (read 23 Nov 2026).
 */
const answerFaq = [
  {
    q: "Does Airalo work in Japan?",
    a: `Yes. Airalo's Japan eSIM is a data-only 5G eSIM that uses SoftBank as its primary network and may switch to KDDI or Rakuten based on availability and speed, per Airalo's Japan page (checked ${AIRALO_READ_ON}). It has no Japanese phone number, so calls go through apps such as WhatsApp or LINE.`,
  },
  {
    q: "How much is Airalo for Japan?",
    a: `Airalo's Japan plans run from ${A_FROM ? `${formatUsd(A_FROM.priceUsd)} for ${A_FROM.name}` : "—"} to ${UNLIMITED} for its 7-day unlimited plan; 5 GB for 7 days is ${A_5GB ? formatUsd(A_5GB.priceUsd) : "—"} (prices in USD, checked ${pricesCheckedAt}).`,
  },
  {
    q: "Airalo vs Klook eSIM vs Simbye: which is cheaper?",
    a: `Of the plans with a published price, the cheapest for the same days and data is ${winnerSummary()} (list prices, checked ${pricesCheckedAt}); Simbye's code ${SIMBYE_DISCOUNT_CODE} takes a further ${SIMBYE_DISCOUNT_PERCENT}% off. Klook eSIM shows from US$1.05 before you choose days and data and names no plan at that price, so its price for each trip is on the Klook listing.`,
  },
  {
    q: "How do I install Airalo before landing?",
    a: "Buy the plan in the Airalo app or on airalo.com, then install the eSIM at home on Wi-Fi without interrupting the installation. Airalo says the validity period starts when the eSIM connects to a mobile network in its coverage area, so installing before the flight does not use up days; turn the line on and enable Data Roaming when you land.",
  },
];

const faqItems = [
  {
    q: "Is Airalo legit?",
    a: "Yes. Airalo is an eSIM store that sells data plans covering 200+ locations through its app and website, and its own site says over 30 million people have chosen it. In Japan its eSIM runs on SoftBank, with KDDI and Rakuten as the other networks it can use.",
  },
  {
    q: "Can I top up my Airalo eSIM in Japan?",
    a: "Yes, where a top-up package is offered: buy it in the Airalo app and it is added to the eSIM already on your phone, with no new QR code to scan. Airalo's Japan page describes the eSIM as rechargeable online.",
  },
  {
    q: "Can I use Airalo on iPhone?",
    a: "Yes, on any iPhone that supports eSIM and is not carrier-locked. Go to Settings → Cellular → Add eSIM, or install from the Airalo app. Airalo states that carrier- or network-locked phones cannot use its eSIMs, so check the lock with your home carrier first.",
  },
];

const worksInJapanFaq = [
  {
    q: "Which network does Airalo use in Japan?",
    a: `SoftBank is the primary network on Airalo's Japan page, and the full network list adds KDDI and Rakuten (checked ${AIRALO_READ_ON}). Airalo notes the eSIM may switch between these networks based on availability and speed, and that you can adjust this in your device settings.`,
  },
  {
    q: "Is Airalo better than buying a SIM at the airport?",
    a: "For most travellers, yes. An airport SIM means finding a counter or vending machine after landing, while Airalo is bought and installed from home and connects once you land, with nothing to collect.",
  },
];

const commonIssues = [
  {
    problem: "eSIM not connecting after arrival",
    fix: "Toggle airplane mode on and off. If still no signal, go to Settings → Cellular / Mobile Data and manually select your Airalo profile.",
  },
  {
    problem: "QR code won't scan",
    fix: "Make sure you haven't already scanned it — eSIM QR codes are single-use. Open the Airalo app and tap 'My eSIMs' to find an alternative installation option (manual details).",
  },
  {
    problem: "Data working but very slow",
    fix: "Check your APN settings. Go to Settings → Cellular → Cellular Data Options → APN and confirm the APN matches the details in the Airalo app. Alternatively, restart your phone.",
  },
  {
    problem: "eSIM shows as active but no internet",
    fix: "Ensure 'Data Roaming' is turned on for your Airalo profile. On iPhone: Settings → Cellular → Airalo plan → enable Data Roaming. On Android: Settings → Network → Mobile Data → Roaming.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function AiraloJapanReviewPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta
          name="description"
          content={DESCRIPTION}
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/airalo-japan-review" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/airalo-japan-review" />
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
              mainEntity: answerFaq.map((item) => ({
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
            __html: esimProductJsonLd("airalo", "/guides/esim/airalo-japan-review", "Airalo Japan eSIM", "Data-only Japan eSIM with fixed and unlimited plans, installed from Airalo's app."),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/esim/airalo-japan-review",
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Airalo Japan Review</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Prices checked {pricesCheckedAt}
          </p>
          <h1 className={styles.heroTitle}>
            Airalo Japan eSIM Review 2026: <br />Price, Network &amp; Setup
          </h1>
          <p className={styles.heroSubtitle}>
            Airalo&apos;s Japan plans and prices, the networks it uses, how it compares with Klook eSIM, Simbye and
            Sakura Mobile, and how to install it before you fly.
          </p>
          <div className={styles.heroBadges}>
            {["Prices checked daily", "Independently Reviewed", "Data-Only eSIM"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* The answer, before anything else (task jtk-20261123-03) */}
        <p className={styles.bodyText}>
          <strong>
            Airalo&apos;s Japan eSIM starts at {A_FROM ? `${formatUsd(A_FROM.priceUsd)} for ${A_FROM.name}` : "—"}, and{" "}
            {A_5GB ? `${formatUsd(A_5GB.priceUsd)} buys ${A_5GB.name}` : "—"}
          </strong>
          , per Airalo&apos;s own Japan page (checked {AIRALO_READ_ON}). It is a data-only 5G eSIM on{" "}
          <strong>SoftBank as the primary network</strong>, and it may switch to KDDI or Rakuten based on availability
          and speed. If you need unlimited data, {UNL7_BEST ? `${UNL7_BEST.name}'s 7-day unlimited plan at ${priceWithCode(UNL7_BEST.plan)} is the cheapest week of the three priced in the table below` : "see the table below"}{" "}
          (Airalo&apos;s is {A_UNL7 ? formatUsd(A_UNL7.priceUsd) : "—"}); for the lowest price overall,{" "}
          {LOWEST ? `${LOWEST.name}'s ${LOWEST.plan.name} is ${priceWithCode(LOWEST.plan)}` : "see the table below"}.
        </p>

        {/* Disclosure */}
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our review or verdict.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Airalo vs Klook eSIM vs Simbye (and Sakura Mobile), same trip side by side */}
        <section className={styles.comparisonSection} data-placement={PLACEMENT} id="airalo-vs-klook-vs-simbye">
          <span className={styles.sectionLabel}>Price comparison</span>
          <h2 className={styles.sectionTitle}>Airalo vs Klook eSIM vs Simbye: which is cheaper?</h2>
          <p className={styles.bodyText}>{answerFaq[2].a}</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Trip</th>
                    {COMPARED.map((c) => (
                      <th key={c.id}>{c.name}</th>
                    ))}
                    <th>Klook eSIM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>
                      <strong>Verdict</strong>
                    </td>
                    <td colSpan={COMPARED.length + 1}>
                      <strong>Cheapest list price: {winnerSummary()}.</strong> Airalo is the pick for its app and
                      in-app top-ups; Klook eSIM if you are already booking tickets or transfers on Klook.
                    </td>
                  </tr>
                  {compareRows.map((row) => (
                    <tr key={row.label}>
                      <td className={styles.tdProvider}>{row.label}</td>
                      {row.cells.map((c) => (
                        <td key={c.id}>
                          {c.plan ? (
                            <>
                              {row.winner?.id === c.id ? <strong>{formatUsd(c.plan.priceUsd)}</strong> : formatUsd(c.plan.priceUsd)}
                              {c.plan.discountedUsd ? ` (${formatUsd(c.plan.discountedUsd)} with code)` : ""}
                              <br />
                              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                                {c.plan.name}
                                {c.plan.dailyCapGb ? ` (${c.plan.dailyCapGb} GB/day)` : ""}
                              </span>
                            </>
                          ) : (
                            "—"
                          )}
                        </td>
                      ))}
                      <td>{klookEsim.priceUnknownLabel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
            Last checked: {LAST_CHECKED}. Each cell is that provider&apos;s cheapest plan with at least the row&apos;s days
            and data, in USD. Airalo prices read on{" "}
            <a href={AIRALO_OFFICIAL_URL} target="_blank" rel="noopener noreferrer nofollow">
              airalo.com/japan-esim
            </a>{" "}
            on {AIRALO_READ_ON}; Simbye (
            <a href="https://simbye.com/products/esim-japan" target="_blank" rel="noopener noreferrer nofollow">
              simbye.com/products/esim-japan
            </a>
            ) and Sakura Mobile (
            <a href={getProvider("sakura").sourceUrl} target="_blank" rel="noopener noreferrer nofollow">
              sakuramobile.jp/travel/esim
            </a>
            ) from the same daily price file as the{" "}
            <Link href="/guides/esim/japan-esim-price-tracker">Japan eSIM price tracker</Link>, fetched {pricesCheckedAt}.
            Klook eSIM shows from US$1.05 before you choose days and data and names no plan at that price (listing read{" "}
            {klookEsim.specsCheckedAt}), so no per-plan price is shown. Unlimited plans differ in their full-speed limits.
          </p>
          <div className={buyStyles.buttons}>
            <KlookLink
              href={klookEsim.url}
              adPlacement={PLACEMENT}
              className={buyStyles.buy}
              target="_blank"
              rel="sponsored nofollow noopener"
            >
              Check Klook eSIM →
            </KlookLink>
            <a href={simbyeTrackedUrl(PLACEMENT, TAG)} className={buyStyles.buy} target="_blank" rel="sponsored nofollow noopener">
              Get Simbye ({SIMBYE_DISCOUNT_PERCENT}% off with code) →
            </a>
            <a href={airaloTrackedUrl(PLACEMENT, TAG)} className={buyStyles.buySecondary} target="_blank" rel="sponsored nofollow noopener">
              Get Airalo Japan eSIM →
            </a>
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Code <strong>{SIMBYE_DISCOUNT_CODE}</strong> takes {SIMBYE_DISCOUNT_PERCENT}% off any Simbye eSIM plan; the
            Simbye button applies it for you. Affiliate links.
          </p>
        </section>

        {/* A29 (27 Nov 2026): the next step right under the answer — this page sent 0 affiliate_click
            in GA4 for 20–26 Nov. Cards per path in lib/next-step.ts. */}
        <NextStepCards />

        {/* Pay before you land (task jtk-20261123-03): directly under the comparison and its buttons. */}
        <div id="pay-before-you-land" data-placement="pay-before-you-land">
          <KlookTripPrep
            label="Pay before you land"
            heading="What Else Can You Pay for Before You Land?"
            intro="The eSIM is not the only thing you can settle at home. The airport ride and the first days of Tokyo subway rides are bookable on Klook before you fly; pick the line for the airport you land at:"
            items={airaloReviewPayBeforeLand}
            headingLevel={3}
          />
        </div>

        <EsimPageAnswer route={ROUTE} />

        {/* Quick Verdict */}
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
              <span className={styles.verdictScore}>4.5 / 5</span>
            </div>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best For</p>
                <p className={styles.verdictStatValue}>Short trips, first-time eSIM users</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Price From</p>
                <p className={styles.verdictStatValue}>{FROM}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Network</p>
                <p className={styles.verdictStatValue}>{getProvider("airalo").network}</p>
              </div>
            </div>
            <a href="https://airalo.pxf.io/c/7213504/1268485/15608" className={styles.verdictBtn} target="_blank" rel="noopener noreferrer nofollow">
              Get Airalo Japan eSIM →
            </a>
          </div>
        </div>

        <EsimCtaTop />

        {/* What is Airalo */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What is Airalo?</h2>
          <p className={styles.bodyText}>
            Airalo is an eSIM store covering 200+ locations, and its own site says over 30 million people have
            chosen it. It does not run a network of its own: its Japan eSIM uses SoftBank as the primary network,
            with KDDI and Rakuten in the full network list (Airalo&apos;s Japan page, checked {AIRALO_READ_ON}), and
            it sells data-only plans through its app and website.
          </p>
          <p className={styles.bodyText}>
            For Japan, Airalo sells plans under the &ldquo;Moshi Moshi&rdquo; name. Plans range from {FROM}{" "}
            up to 20 GB, plus unlimited plans (7 days: {UNLIMITED}); prices below were checked on {pricesCheckedAt}.
            All plans are data-only — there are no voice calls or SMS included.
          </p>
          <p className={styles.bodyText}>
            The key appeal is simplicity: buy and install before you fly, and the plan starts when the eSIM first
            connects to a network in Japan. There is nothing to collect at the airport.
          </p>
        </section>

        {/* Plans table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How much is Airalo for Japan?</h2>
          <p className={styles.bodyText}>{answerFaq[1].a}</p>
          <ProviderPlanTable providerId="airalo" />
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem" }}>
            Last checked: {LAST_CHECKED} on{" "}
            <a href={AIRALO_OFFICIAL_URL} target="_blank" rel="noopener noreferrer nofollow">
              airalo.com/japan-esim
            </a>{" "}
            (USD). Every Airalo price on this page for the same days and data is also in the{" "}
            <Link href="/guides/esim/japan-esim-price-tracker">Japan eSIM price tracker</Link>.
          </p>
        </section>

        {/* Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Assessment</span>
          <h2 className={styles.sectionTitle}>Pros &amp; Cons</h2>
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
          <h2 className={styles.sectionTitle}>Who Is Airalo Best For?</h2>
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

        {/* Setup steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup guide</span>
          <h2 className={styles.sectionTitle}>How do I install Airalo before landing?</h2>
          <p className={styles.bodyText}>{answerFaq[3].a}</p>
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
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Installing a provider&apos;s QR code instead of the app, or using an Android phone? The guide to{" "}
            <Link href="/guides/esim/how-to-set-up-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              how to set up an eSIM for Japan on iPhone and Android
            </Link>{" "}
            has the Settings paths for both and what to switch on when you land.
          </p>
        </section>

        {/* Verdict */}
        <section className={styles.verdictSection}>
          <span className={styles.sectionLabel}>Bottom line</span>
          <h2 className={styles.sectionTitle}>Verdict</h2>
          <p className={styles.verdictText}>
            Airalo Japan suits travellers who want a well-known app, SoftBank as the primary network and top-ups
            from the same eSIM, for a trip of a few days to a month.
          </p>
          <p className={styles.verdictText}>
            On price alone it is not the cheapest: Simbye costs less in {simbyeCheaperRows} of {compareRows.length}{" "}
            same-trip rows in the comparison at the top of this page. All plans are data-only, so calls go through
            WhatsApp or LINE.
          </p>
          <p className={styles.verdictText}>
            For the lowest price, compare Simbye; if you are booking transfers or tickets on Klook anyway, Klook
            eSIM keeps it in one checkout.
          </p>
          <a href="https://airalo.pxf.io/c/7213504/1268485/15608" className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
            Get Airalo Japan eSIM →
          </a>
        </section>

        {/* Does it work in Japan? */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>Does Airalo work in Japan?</span>
          <h2 className={styles.sectionTitle}>Does Airalo work in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            {answerFaq[0].a} Below: which network it uses, and the quickest fixes for the issues travellers run into.
          </p>
          <div className={styles.faqList}>
            {worksInJapanFaq.map((item, i) => (
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
          <div className={styles.tableWrap} style={{ marginTop: "1.5rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Problem</th>
                    <th>Fix</th>
                  </tr>
                </thead>
                <tbody>
                  {commonIssues.map((row) => (
                    <tr key={row.problem}>
                      <td className={styles.tdProvider}>{row.problem}</td>
                      <td>{row.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Comparing on price alone? The{" "}
            <Link href="/guides/esim/simbye-japan-review" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Simbye Japan eSIM review
            </Link>{" "}
            covers the lowest list prices compared here, and{" "}
            <Link href="/guides/esim/japan-esim-10-days" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Japan eSIM for 10 days
            </Link>{" "}
            shows which Airalo plan lasts a ten-day trip and how many GB it needs. Airalo&apos;s price on any day, beside
            every other provider and the date each price was read, is in the{" "}
            <Link href="/guides/esim/japan-esim-price-tracker" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Japan eSIM prices today tracker
            </Link>
            .
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
            <div className={styles.relatedCardSoon}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>eSIM vs SIM Card for Japan: Which Should You Get?</p>
                <span className={styles.relatedSoon}>Coming soon</span>
              </div>
            </div>
            <Link href="/guides/esim/airalo-vs-holafly-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airalo vs Holafly for Japan (2026): Which Should You Choose?</p>
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
              See how Airalo stacks up against Holafly, eSIM Go, and Sakura Mobile on price,
              coverage, and features.
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
