import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import tools from "../../../styles/Tools.module.css";
import EsimPlanFinder from "../../../components/EsimPlanFinder";
import EsimPlanTable, { ProviderCta } from "../../../components/EsimPlanTable";
import EsimPriceStatus from "../../../components/EsimPriceStatus";
import KlookLink from "../../../components/KlookLink";
import { klookEsim } from "../../../lib/klook-links";
import { esimSpec, SPECS_CHECKED_AT } from "../../../lib/esim-specs";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import {
  allEsimPlans,
  bestValuePlan,
  esimProviders,
  findPlansForTrip,
  formatDate,
  formatUsd,
  getProvider,
  latestCheckedAt,
  type EsimPlanRow,
  type EsimProviderId,
} from "../../../lib/esim-prices";

/**
 * Rank pass, 30 Oct 2026.
 *
 * Why. Over the 28 days to 29 October this page took 27 Google impressions at an
 * average position of 22.07, and 11 on Bing at 5.91 for no clicks at all. The
 * queries behind those numbers — "how much data do I need in Japan", "is 1GB a day
 * enough" — are exactly the ones an AI answer finishes on its own, because they are
 * arithmetic. A page that opened with a plan finder and a sortable table answered
 * none of them above the fold.
 *
 * So the first body paragraph is now the arithmetic itself: a per-day figure, the
 * total for 3, 5, 7, 10, 14 and 30 days, and the cheapest plan on sale that covers
 * each. The sections after it are the parts an AI answer cannot finish — which plan
 * to buy, what "unlimited" slows to, when the validity clock starts, whether a
 * phone number comes with it, and whether you can top up.
 *
 * Everything below is computed from data/esim-prices.json at build time, so the
 * copy (and the FAQ structured data) never drifts from the table. The provider
 * *terms* that no price feed carries — throttling thresholds, hotspot caps, when
 * the clock starts — are the same reads recorded in pages/guides/esim/
 * best-esim-japan.tsx on SPECS_CHECKED; the tethering and phone-number clauses come
 * from lib/esim-specs.ts and carry its own date. All three dates are printed under
 * the tables they appear in.
 */
const checkedAt = latestCheckedAt();
const checkedLabel = formatDate(checkedAt);

/**
 * The day the provider *terms* on this page were read off each provider's own site:
 * airalo.com/japan-esim and Airalo's unlimited-data fair-use policy page;
 * breezesim.com/products/esim-japan (eSIM Go's consumer brand); sakuramobile.jp/travel/esim.
 * Separate from `checkedLabel`, which is the daily price job's own timestamp, and from
 * SPECS_CHECKED_AT in lib/esim-specs.ts, which dates the tethering and phone-number
 * clauses. The Klook rows are older again and carry `klookEsim.specsCheckedAt`, because
 * Klook answers automated reads of /activity/109393 with HTTP 403.
 */
const SPECS_CHECKED = "29 Oct 2026";

const TITLE = "Japan eSIM Data Plans 2026: How Much Data Do You Need?";
const DESCRIPTION =
  "Japan eSIM Data Plans compared: how many GB you need for 3, 5, 7, 10, 14 or 30 days, with data, validity, network, speed caps and tethering per provider.";

const cheapestOf = (rows: EsimPlanRow[]) => (rows.length ? rows.reduce((a, b) => (b.priceUsd < a.priceUsd ? b : a)) : null);
const cheapestOverall = cheapestOf(allEsimPlans);
// 7+ days so a 1-day plan can't "win" the unlimited headline.
const cheapestUnlimitedAny = cheapestOf(allEsimPlans.filter((p) => p.unlimited && p.days >= 7));
const cheapest5gb = cheapestOf(allEsimPlans.filter((p) => !p.unlimited && (p.gb ?? 0) >= 5));
const cheapest10gb = cheapestOf(allEsimPlans.filter((p) => !p.unlimited && (p.gb ?? 0) >= 10));
const bestValue = bestValuePlan();

const label = (p: EsimPlanRow | null) => (p ? `${p.provider} ${p.name} (${formatUsd(p.priceUsd)})` : "—");

/**
 * Cheapest plan on sale that actually covers a trip of `days` days needing `gb` GB.
 *
 * Holafly is excluded for the same reason it is excluded on best-esim-japan: it runs
 * no affiliate programme we can join, so naming it as "the plan to buy" would be a
 * recommendation with no path to act on. It stays in the sortable table below, where
 * it is priced rather than recommended. Daily-capped plans (Sakura's 3 GB/day family)
 * are measured on cap × trip days, not their headline total — the only like-for-like
 * way to put them beside a fixed allowance.
 */
function cheapestForTrip(days: number, gb: number): EsimPlanRow | null {
  const rows = allEsimPlans
    .filter((p) => {
      if (p.providerId === "holafly") return false;
      if (p.days < days) return false;
      if (p.unlimited) return true;
      if (p.dailyCapGb) return p.dailyCapGb * days >= gb;
      return (p.gb ?? 0) >= gb;
    })
    .sort((a, b) => a.priceUsd - b.priceUsd || a.days - b.days);
  return rows[0] ?? null;
}

/** "eSIM Go 10 GB / 30 days — $13.99", or "—" when nothing on sale covers the trip. */
const tripLabel = (days: number, gb: number): string => {
  const p = cheapestForTrip(days, gb);
  return p ? `${p.provider} ${p.name} — ${formatUsd(p.priceUsd)}` : "—";
};

/**
 * How much data a Japan trip needs, by day count.
 *
 * The per-day figures are planning arithmetic, not a provider claim: 0.5 GB a day for
 * maps, messaging and a few photos, 1 GB a day once you add video calls and some
 * streaming, 1.5 GB a day for a tethered laptop or video on trains. They are
 * deliberately modest against what the providers themselves treat as heavy — Airalo's
 * fair-use threshold is 3 GB in a day, Sakura Mobile's daily cap is 3 GB, and the
 * Klook listing's unlimited tier runs 10 GB a day at full speed — so a reader who
 * buys to this table is well inside all three.
 *
 * The plan column is live price data, so the arithmetic and the recommendation can
 * never drift apart.
 */
const LIGHT_PER_DAY = 0.5;
const NORMAL_PER_DAY = 1;
const HEAVY_PER_DAY = 1.5;

const dayRows = [3, 5, 7, 10, 14, 30].map((days) => ({
  days,
  light: days * LIGHT_PER_DAY,
  normal: days * NORMAL_PER_DAY,
  heavy: days * HEAVY_PER_DAY,
}));

/** The plan the answer paragraph names, so prose and table agree. */
const TEN_DAY_PICK = cheapestForTrip(10, 10);
const MONTH_PICK = cheapestForTrip(30, 30);

const planName = (p: EsimPlanRow | null) => (p ? `${p.provider} ${p.name}` : "—");
const planPrice = (p: EsimPlanRow | null) => (p ? formatUsd(p.priceUsd) : "—");

const dataUsage = [
  { activity: "Google Maps navigation", perDay: "~50 MB" },
  { activity: "Social media browsing", perDay: "~150 MB" },
  { activity: "Streaming video (SD)", perDay: "~500 MB" },
  { activity: "Video calls", perDay: "~300 MB" },
  { activity: "Light use total", perDay: "~300 MB" },
  { activity: "Heavy use total", perDay: "~1.5 GB" },
];

// "Average" traveller: ~0.7 GB/day, matching the finder's default preset.
const byTripLength = [3, 7, 14, 30].map((days) => {
  const gb = Math.ceil(0.7 * days * 10) / 10;
  const pick = findPlansForTrip(days, gb)[0] ?? null;
  const unlimited = findPlansForTrip(days, Infinity)[0] ?? null;
  return { days, gb, pick, unlimited };
});

const providerSummaries = esimProviders.map((p) => {
  const capped = p.plans.filter((x) => !x.unlimited);
  const cheapestCapped = capped.length ? capped.reduce((a, b) => (b.priceUsd < a.priceUsd ? b : a)) : null;
  const unlimited = p.plans.filter((x) => x.unlimited);
  const cheapestUnl = unlimited.length ? unlimited.reduce((a, b) => (b.priceUsd < a.priceUsd ? b : a)) : null;
  const perGbBest = capped.length
    ? capped.reduce((a, b) => (b.priceUsd / (b.gb ?? 1) < a.priceUsd / (a.gb ?? 1) ? b : a))
    : null;
  return { ...p, cheapestCapped, cheapestUnl, perGbBest };
});

/** "3–30 days", from the live feed, for a subset of one provider's plans. */
function validityRange(plans: EsimPlanRow[]): string {
  if (!plans.length) return "—";
  const days = plans.map((p) => p.days);
  const min = Math.min(...days);
  const max = Math.max(...days);
  return min === max ? `${min} days` : `${min}–${max} days`;
}

const plansOf = (id: EsimProviderId) => allEsimPlans.filter((p) => p.providerId === id);

/**
 * The plan-comparison table: the six things that decide which Japan eSIM data plan to
 * buy and which no single source carries.
 *
 * Data, validity and network come from the daily price feed, so they carry
 * `checkedLabel`. Tethering and the phone-number clause come from lib/esim-specs.ts and
 * carry SPECS_CHECKED_AT. The speed-limit column is the only one written here: each
 * string is the provider's own published threshold, read on SPECS_CHECKED — the same
 * reads recorded in best-esim-japan.tsx, quoted where the wording matters.
 *
 * No price column, on purpose. Prices are in the sortable table further down, which is
 * re-read every day; Klook's listing blocks automated price reads, so a price column
 * would mean either an unverifiable figure or an empty cell on the one row this page is
 * meant to make comparable.
 *
 * Holafly is absent for two reasons: there is no link to it on this site, and nothing of
 * its fine print was re-read on SPECS_CHECKED. It is still priced in the sortable table.
 */
type ComparisonRow = {
  provider: string;
  data: string;
  validity: string;
  network: string;
  speed: string;
  tethering: string;
  phone: string;
  /** Set on the one row that carries no price, so the cell can say so. */
  klook?: boolean;
};

const comparisonRows: ComparisonRow[] = [
  {
    provider: "Airalo",
    data: esimSpec("airalo").dataRange,
    validity: validityRange(plansOf("airalo")),
    network: getProvider("airalo").network,
    speed:
      "Fixed allowances run at full speed until they are used up. Unlimited runs at full speed to 3 GB a day, then 1 Mbps “for the rest of that day”, resetting every 24 hours from activation.",
    tethering: esimSpec("airalo").tetheringShort,
    phone: esimSpec("airalo").phoneNumberShort,
  },
  {
    provider: "eSIM Go (Breeze)",
    data: esimSpec("esimgo").dataRange,
    validity: validityRange(plansOf("esimgo")),
    network: getProvider("esimgo").network,
    speed:
      "Fixed allowances are not throttled. Premium Unlimited gives 30 GB over 5 days, 60 GB over 10 or 90 GB over 15 at full speed, after which “your data speed will be reduced (but is still suitable for streaming 720p video)”.",
    tethering: esimSpec("esimgo").tetheringShort,
    phone: esimSpec("esimgo").phoneNumberShort,
  },
  {
    provider: "Sakura Mobile",
    data: esimSpec("sakura").dataRange,
    validity: validityRange(plansOf("sakura")),
    network: getProvider("sakura").network,
    speed:
      "On the 3 GB/day plans, “your speed will be limited to 200 Kbps after using 3 GB of data per day”. The unlimited plan is unlimited on the device itself, with no on-device threshold published on the page read.",
    tethering: esimSpec("sakura").tetheringShort,
    phone: esimSpec("sakura").phoneNumberShort,
  },
  {
    provider: klookEsim.name,
    data: klookEsim.specData,
    validity: "Not stated in the listing data read",
    network: klookEsim.specNetwork,
    speed: "The unlimited tier runs 10 GB a day at full speed, then 128 kbps, per the listing.",
    tethering: klookEsim.specTethering,
    phone: klookEsim.specPhoneNumber,
    klook: true,
  },
];

/**
 * When the validity clock starts, and therefore when to install.
 *
 * This is the part people get wrong, and the reason the "when do I activate" question
 * is on the page at all: installing early is right on one provider and expensive on
 * another, because one starts the period on first connection in Japan and another on
 * install. Each string is the provider's own wording, read on SPECS_CHECKED.
 */
const timingRows = [
  {
    provider: "Airalo",
    starts:
      "“The validity period of your eSIM package starts when one of the following happens: When you connect to a supported network in its coverage area or When you install your eSIM.” The package's own Validity Policy says which applies.",
    install: "Safe to install at home for most packages — check that package's Validity Policy first",
    checked: SPECS_CHECKED,
  },
  {
    provider: "eSIM Go (Breeze)",
    starts: "“Plan validity starts on first data use in Japan, not at purchase.”",
    install: "“Install before you fly.”",
    checked: SPECS_CHECKED,
  },
  {
    provider: "Sakura Mobile",
    starts:
      "Unlimited data-only: “the usage period starts once you arrive to Japan”. The 3 GB/day plans: “usage period starts once you install the eSIM”. Voice + Data: after arrival and the in-person ID check.",
    install: "Install on arrival for the 3 GB/day plans — installing at home starts the clock",
    checked: SPECS_CHECKED,
  },
  {
    provider: klookEsim.name,
    starts: `Sold as a QR-code voucher (“${klookEsim.listingTitle}”); no start rule stated in the listing data read`,
    install: "Not stated — check the listing",
    checked: klookEsim.specsCheckedAt,
  },
];

const faqItems = [
  {
    q: "How much data do I need in Japan per day?",
    a: `Budget 0.5 GB a day if your phone is doing maps, messaging and a few photo uploads, 1 GB a day once you add video calls and some streaming, and 1.5 GB a day if you tether a laptop or watch video on trains. In total that is 1.5–4.5 GB for 3 days, 3.5–10.5 GB for a week, 7–21 GB for two weeks and 15–45 GB for a month. Those figures are planning arithmetic, not a provider claim — but they sit well inside what the providers themselves treat as heavy use: Airalo's fair-use threshold is 3 GB in a day and Sakura Mobile's daily cap is 3 GB (checked ${SPECS_CHECKED}).`,
  },
  {
    q: "Is 1GB a day enough in Japan?",
    a: `For almost every tourist, yes. 1 GB a day covers Google Maps navigation (~50 MB a day), messaging, social media (~150 MB) and a video call or two (~300 MB) with headroom left. It stops being enough in three cases: you stream video on the Shinkansen, you tether a laptop for work, or you upload full-resolution photos and video every evening. At 1 GB a day the plan to buy for a ten-day trip is ${planName(TEN_DAY_PICK)} at ${planPrice(TEN_DAY_PICK)}, and for a month ${planName(MONTH_PICK)} at ${planPrice(MONTH_PICK)} (prices checked ${checkedLabel}).`,
  },
  {
    q: "Should I get an unlimited eSIM for Japan?",
    a: `Only if you genuinely cannot predict your usage, because no "unlimited" Japan plan is unmetered at full speed. ${cheapestUnlimitedAny ? `The cheapest unlimited plan we track for a week or longer is ${cheapestUnlimitedAny.provider}'s ${cheapestUnlimitedAny.name} at ${formatUsd(cheapestUnlimitedAny.priceUsd)} (checked ${checkedLabel}).` : "Compare the unlimited plans in the table above."} Each one publishes a threshold: Airalo runs full speed to 3 GB a day then 1 Mbps until the 24-hour reset; eSIM Go's Premium Unlimited gives 30 GB over 5 days, 60 GB over 10 or 90 GB over 15 before the speed is reduced; Sakura Mobile's unlimited plan is unlimited on the device but caps the hotspot at 2–30 GB depending on plan length; the Klook listing's unlimited tier runs 10 GB a day then 128 kbps. Provider terms checked ${SPECS_CHECKED}; the Klook figures come from its listing data of ${klookEsim.specsCheckedAt}.`,
  },
  {
    q: "When should I install and activate my Japan eSIM?",
    a: `Install before you fly, activate when you land — but check which of the two your provider counts. eSIM Go states "plan validity starts on first data use in Japan, not at purchase" and tells you to "install before you fly". Airalo's validity "starts when one of the following happens: When you connect to a supported network in its coverage area or When you install your eSIM", so the package's own Validity Policy decides. Sakura Mobile is the exception that costs money if you get it wrong: on its 3 GB/day plans the "usage period starts once you install the eSIM", so install those on arrival rather than at home. Checked ${SPECS_CHECKED}.`,
  },
  {
    q: "Do Japan eSIM data plans include a phone number?",
    a: `No — every Japan eSIM data plan on this page is data only, with one exception. Airalo, eSIM Go and the Klook listing give you no Japanese number, no SMS and no voice calls. Sakura Mobile's separate Voice + Data eSIM is the only route to a Japanese number, and it needs an in-person ID check in Japan before the usage period starts. If you only need SMS for verification codes, keep your home SIM active in the other slot and let the eSIM carry the data. Clauses checked ${SPECS_CHECKED_AT}.`,
  },
  {
    q: "Can I top up a Japan eSIM?",
    a: "Yes, for most providers. Airalo lets you top up by buying an additional package in the app — no new QR code required. eSIM Go (Breeze) allows top-ups through its website. Sakura Mobile allows data add-ons via its customer portal. Holafly's plans are unlimited, so there is nothing to top up, but they are fixed-length. The practical catch is that a top-up needs an internet connection to complete, so buy the extra data before you head into the mountains or out to the smaller islands, not after.",
  },
  {
    q: "Which Japan eSIM has the best value per GB?",
    a: bestValue
      ? `As of ${checkedLabel}, the lowest cost per GB among fixed-allowance plans is ${bestValue.provider}'s ${bestValue.name} at ${formatUsd(bestValue.priceUsd)} — about ${formatUsd(bestValue.perGb ?? 0)} per GB. (Sakura Mobile's 3 GB/day plans show an even lower nominal $/GB, but a daily cap can't be saved up, so we don't count them here.) Big plans always win on per-GB price, but only buy what you'll actually use: a plan that matches your trip is better value than a huge one you use a third of.`
      : "Sort the comparison table above by Price / GB to see the current best-value plan.",
  },
  {
    q: "What is the cheapest Japan eSIM right now?",
    a: cheapestOverall
      ? `The cheapest plan we track is ${cheapestOverall.provider}'s ${cheapestOverall.name} at ${formatUsd(cheapestOverall.priceUsd)} (checked ${checkedLabel}). ${cheapest5gb ? `If you need more data, the cheapest 5 GB+ plan is ${label(cheapest5gb)}` : ""}${cheapest10gb ? ` and the cheapest 10 GB+ plan is ${label(cheapest10gb)}.` : "."}`
      : "Use the comparison table above, sorted by price, to see the cheapest current plan.",
  },
  {
    q: "Is 5 GB enough for 2 weeks in Japan?",
    a: "For most travellers, yes. 5 GB over 14 days is about 350 MB per day — enough for navigation, messaging, social media, and occasional photo uploads. If you plan to stream video, make frequent video calls, or use your phone as a hotspot for a laptop, use the plan finder above with the \"Heavy\" preset, or pick an unlimited plan.",
  },
  {
    q: "How often are these prices updated?",
    a: `Every day. A script fetches the current Japan plans from each provider's official website (Airalo, Holafly, eSIM Go/Breeze and Sakura Mobile) and updates this page automatically. If a provider's site can't be read on a given day, we keep the last verified prices and show the date they were last checked, so you can always see how fresh each number is. Last successful check: ${checkedLabel}.`,
  },
];

/**
 * The Klook eSIM path. Klook's eSIM category pays 20%, the highest band on the
 * dashboard, and this is the one page on the site whose reader is deciding *which plan
 * to buy* rather than reading about one — so the link sits at the three points where
 * that decision is actually made: under the "if you don't want to work it out" pick,
 * under the plan-comparison table, and beside the install-and-activate answer.
 *
 * No price, for the usual reason: Klook answers automated reads of the product page
 * with HTTP 403, so there is no figure to verify.
 */
function KlookEsimSlot({ why }: { why: string }) {
  return (
    <div className={styles.pickTarget} style={{ marginTop: "1.25rem", flexWrap: "wrap", gap: "0.6rem" }}>
      <span className={styles.pickTargetLabel}>Also on Klook:</span>
      <span>
        {why}{" "}
        <KlookLink
          href={klookEsim.url}
          target="_blank"
          rel="sponsored noopener"
          style={{ color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" }}
        >
          {klookEsim.ctaLabel}
        </KlookLink>
      </span>
    </div>
  );
}

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/japan-esim-data-plans") } });

export default function JapanEsimDataPlansPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-data-plans" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-data-plans" />
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
              route: "/guides/esim/japan-esim-data-plans",
              headline: "Japan eSIM Data Plans (2026): How Much Data Do You Need?",
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
                { "@type": "ListItem", position: 4, name: "Japan eSIM Data Plans", item: "https://www.japan-travel-kit.com/guides/esim/japan-esim-data-plans" },
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
          <span className={styles.breadCurrent}>Japan eSIM Data Plans</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Prices checked {checkedLabel}
          </p>
          <h1 className={styles.heroTitle}>
            Japan eSIM Data Plans (2026):<br />How Much Data Do You Need?
          </h1>
          <p className={styles.heroSubtitle}>
            How many GB a 3, 5, 7, 10, 14 or 30-day trip actually needs — and the cheapest plan on sale that
            covers it, from prices re-read every day.
          </p>
          <div className={styles.heroBadges}>
            <span className={`${tools.liveBadge} ${tools.liveBadgeOnDark}`}>
              <span className={tools.liveDot} /> Prices checked daily
            </span>
            {[`${allEsimPlans.length} plans tracked`, "4 providers", "Sortable by $/GB"].map((t) => (
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
            This doesn&apos;t affect our rankings or comparisons — the table is sorted by the numbers, not by commission.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* The answer, before the tools — the arithmetic and the plan, with the numbers in it. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Budget <strong>0.5 GB a day</strong> for maps, messaging and a few photos, <strong>1 GB a day</strong>{" "}
            once you add video calls and some streaming, and <strong>1.5 GB a day</strong> if you tether a laptop
            — so a <strong>3-day</strong> trip needs 1.5–4.5 GB, <strong>5 days</strong> 2.5–7.5 GB,{" "}
            <strong>7 days</strong> 3.5–10.5 GB, <strong>10 days</strong> 5–15 GB, <strong>14 days</strong> 7–21 GB
            and <strong>30 days</strong> 15–45 GB. Those are planning figures, not provider claims, and they sit
            well inside what the providers treat as heavy use — Airalo&apos;s fair-use threshold is 3 GB in a day
            and Sakura Mobile&apos;s daily cap is 3 GB.
          </p>
          <p className={styles.bodyText}>
            <strong>If you don&apos;t want to work it out:</strong> buy{" "}
            <strong>{planName(TEN_DAY_PICK)} at {planPrice(TEN_DAY_PICK)}</strong> for any trip of ten days or
            less, and <strong>{planName(MONTH_PICK)} at {planPrice(MONTH_PICK)}</strong> for anything up to a
            month. Both are a gigabyte a day or better, both are 30-day plans so validity is not the constraint,
            and both are the cheapest thing on sale that covers the trip as of {checkedLabel}.
          </p>
          <KlookEsimSlot why="Klook sells a Japan eSIM of its own in tiers from 500 MB to 50 GB plus an unlimited option, which covers the same sizing — worth a look if the tickets and transport for this trip are already in a Klook basket, since it goes on the same checkout. It is unranked here because the listing blocks automated price reads." />
          <p className={styles.bodyText} style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Prices read off each provider&apos;s own site on {checkedLabel} by the job that re-reads them daily.
            Fair-use thresholds, speed caps and start rules read on {SPECS_CHECKED}; tethering and phone-number
            clauses on {SPECS_CHECKED_AT}; the Klook rows come from its own listing data of{" "}
            {klookEsim.specsCheckedAt}, because Klook answers automated reads of the product page with HTTP 403.
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer · {checkedLabel}</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest plan</p>
                <p className={styles.verdictStatValue}>{label(cheapestOverall)}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best value per GB</p>
                <p className={styles.verdictStatValue}>
                  {bestValue ? `${bestValue.provider} ${bestValue.name} — ${formatUsd(bestValue.perGb ?? 0)}/GB` : "—"}
                </p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest unlimited (7+ days)</p>
                <p className={styles.verdictStatValue}>{label(cheapestUnlimitedAny)}</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Most travellers should buy:</strong> {cheapest5gb ? label(cheapest5gb) : "a 5 GB plan"} — 5 GB covers two weeks of
              maps, messaging and social media. Need a Japanese phone number or English phone support? Sakura Mobile is the
              only provider here that offers both.
            </p>
            <a href="#plan-finder" className={styles.verdictBtn}>
              Find my cheapest plan ↓
            </a>
          </div>
        </div>

        {/* Q: How much data do I need in Japan per day? */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Per day</span>
          <h2 className={styles.sectionTitle}>How much data do I need in Japan per day?</h2>
          <p className={styles.bodyText}>
            <strong>0.5 GB a day</strong> if your phone is doing maps, messaging and a few photo uploads;{" "}
            <strong>1 GB a day</strong> once you add video calls and some streaming; <strong>1.5 GB a day</strong>{" "}
            if you tether a laptop or watch video on trains. Multiply by the nights you are away and buy the next
            plan up — the table below has done both for you, with the cheapest plan on sale against each row.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Trip length</th>
                    <th>Light — 0.5 GB/day</th>
                    <th>Average — 1 GB/day</th>
                    <th>Heavy — 1.5 GB/day</th>
                    <th>Cheapest plan that covers 1 GB/day</th>
                  </tr>
                </thead>
                <tbody>
                  {dayRows.map((row) => (
                    <tr key={row.days}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.days} days</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.light} GB</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.normal} GB</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.heavy} GB</td>
                      <td style={{ fontSize: "0.85rem", minWidth: "220px" }}>{tripLabel(row.days, row.normal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            The GB columns are arithmetic on the per-day figures above, not a provider claim. The plan column is the
            cheapest plan on sale that covers the whole trip at 1 GB a day, from prices read {checkedLabel}; Holafly is
            left out of it because there is no link on this site to buy it through, and daily-capped plans are measured
            on cap × trip days rather than their headline total. Planning a fortnight?{" "}
            <Link href="/guides/esim/japan-esim-2-weeks" className={tools.inlineLink}>
              Best Japan eSIM for 2 weeks →
            </Link>
          </p>
        </section>

        {/* Q: Is 1GB a day enough in Japan? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The usual question</span>
          <h2 className={styles.sectionTitle}>Is 1GB a day enough in Japan?</h2>
          <p className={styles.bodyText}>
            For almost every tourist, yes. A day of Google Maps navigation is about 50 MB, social media browsing
            about 150 MB and a video call about 300 MB, so 1 GB a day leaves headroom even on a day that includes
            all three.
          </p>
          <p className={styles.bodyText}>
            It stops being enough in three cases: you stream video on the Shinkansen, you tether a laptop for work,
            or you upload full-resolution photos and video every evening. Any of those pushes you to 1.5 GB a day or
            an unlimited plan. What 1 GB a day does <em>not</em> buy you is a Japanese phone number or a hotspot
            allowance — those are separate questions, answered further down.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Estimated Per Day</th>
                  </tr>
                </thead>
                <tbody>
                  {dataUsage.map((row) => (
                    <tr key={row.activity} style={row.activity.includes("total") ? { fontWeight: 700, background: "var(--paper)" } : {}}>
                      <td className={styles.tdProvider}>{row.activity}</td>
                      <td className={styles.tdPrice}>{row.perDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Planning estimates for a typical day of each activity, not measurements of a specific handset — your own
            figure moves with video quality, how often maps re-routes and whether photos back up over mobile data.
          </p>
        </section>

        {/* Plan comparison: the six columns that decide it */}
        <section className={styles.comparisonSection} id="plan-comparison">
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Japan eSIM Data Plans Compared: Data, Validity, Network and Limits</h2>
          <p className={styles.bodyText}>
            Price is further down, in a table re-read every day. This one holds the six things a price feed does not
            carry and which decide the choice once two plans cost the same: how much data each provider actually
            sells, how long it lasts, which Japanese carrier it rides, what happens when you pass the threshold,
            whether you can tether and whether a Japanese number comes with it.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Provider", "Data sold", "Valid for", "Network", "Speed limit", "Tethering", "Japanese phone number"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider} style={{ minWidth: "130px" }}>
                        {row.provider}
                        {row.klook ? <span className={tools.tdNote}>No price — see note below</span> : null}
                      </td>
                      <td style={{ fontWeight: 700, minWidth: "150px" }}>{row.data}</td>
                      <td className={styles.tdNetwork} style={{ whiteSpace: "nowrap" }}>{row.validity}</td>
                      <td className={styles.tdNetwork} style={{ minWidth: "150px" }}>{row.network}</td>
                      <td style={{ fontSize: "0.82rem", minWidth: "260px" }}>{row.speed}</td>
                      <td style={{ fontSize: "0.85rem", minWidth: "140px" }}>{row.tethering}</td>
                      <td style={{ fontSize: "0.85rem", minWidth: "140px" }}>{row.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Data, validity and network come from the daily price feed, read {checkedLabel}. Speed limits are each
            provider&apos;s own published threshold, read on {SPECS_CHECKED}; tethering and phone-number clauses were
            read off the same providers&apos; pages and help centres on {SPECS_CHECKED_AT}. The Klook row carries no
            price and no validity: Klook answers automated reads of its listing with HTTP 403, so its figures come
            from its own listing data of {klookEsim.specsCheckedAt} and nothing beyond that is claimed here. Holafly
            is priced in the sortable table below but absent from this one — there is no link to it on this site, and
            none of its fine print was re-read on {SPECS_CHECKED}.
          </p>
          <KlookEsimSlot why="Klook's own Japan eSIM is the last row of this comparison and is complete in everything but price: SoftBank 5G on its per-day plans and docomo 4G LTE on its total-data plans, tethering supported, data only, 500 MB to 50 GB plus an unlimited tier that runs 10 GB a day before 128 kbps. Open the listing for the current prices." />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Want the picks rather than the specification?{" "}
            <Link href="/guides/esim/best-esim-japan" className={tools.inlineLink}>
              Best eSIM for Japan 2026, compared by price and network →
            </Link>
          </p>
        </section>

        {/* Plan finder */}
        <section className={styles.comparisonSection} id="plan-finder">
          <span className={styles.sectionLabel}>Tool</span>
          <h2 className={styles.sectionTitle}>Tell Us Your Trip — We&apos;ll Pick the Plan</h2>
          <EsimPlanFinder />
        </section>

        {/* Full sortable comparison */}
        <section className={styles.comparisonSection} id="all-plans">
          <span className={styles.sectionLabel}>Every plan</span>
          <h2 className={styles.sectionTitle} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
            Every Japan eSIM Plan, Sorted by Price per GB
            <span className={tools.liveBadge}>
              <span className={tools.liveDot} /> Prices checked daily
            </span>
          </h2>
          <p className={styles.bodyText}>
            Click any column header to re-sort. Unlimited plans have no per-GB price, so they sit at the bottom when
            sorting by data or $/GB — sort by <strong>Price</strong> or <strong>Validity</strong> to compare them directly.
          </p>
          <EsimPlanTable />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Prices in USD as listed on each provider&apos;s official site, checked automatically every day. All plans are data-only.
            Sakura Mobile&apos;s 3 GB/day plans are shown with their total high-speed allowance (3 GB × days). Prices at
            checkout can differ slightly due to your local currency or promotions.
          </p>
        </section>

        {/* Price update status */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Freshness</span>
          <h2 className={styles.sectionTitle}>When Was Each Price Last Verified?</h2>
          <p className={styles.bodyText}>
            A script reads each provider&apos;s official pricing page once a day. If a page can&apos;t be read, we keep the last
            verified numbers rather than guessing — so the &ldquo;checked&rdquo; date below tells you exactly how fresh each row is.
          </p>
          <EsimPriceStatus />
        </section>

        {/* Provider snapshot */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By provider</span>
          <h2 className={styles.sectionTitle}>Provider Snapshot</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Provider", "Network", "Cheapest plan", "Best $/GB", "Cheapest unlimited", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {providerSummaries.map((p) => (
                    <tr key={p.id}>
                      <td className={styles.tdProvider}>{p.name}</td>
                      <td className={styles.tdNetwork}>{p.network}</td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        {p.cheapestCapped ? (
                          <>
                            <span className={styles.tdPrice}>{formatUsd(p.cheapestCapped.priceUsd)}</span>{" "}
                            <span className={tools.tdMuted}>{p.cheapestCapped.name}</span>
                          </>
                        ) : (
                          <span className={tools.tdMuted}>unlimited only</span>
                        )}
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        {p.perGbBest ? (
                          <>
                            <span className={styles.tdPrice}>{formatUsd(p.perGbBest.priceUsd / (p.perGbBest.gb ?? 1))}/GB</span>{" "}
                            <span className={tools.tdMuted}>{p.perGbBest.name}</span>
                          </>
                        ) : (
                          <span className={tools.tdMuted}>—</span>
                        )}
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        {p.cheapestUnl ? (
                          <>
                            <span className={styles.tdPrice}>{formatUsd(p.cheapestUnl.priceUsd)}</span>{" "}
                            <span className={tools.tdMuted}>{p.cheapestUnl.name}</span>
                          </>
                        ) : (
                          <span className={tools.tdMuted}>—</span>
                        )}
                      </td>
                      <td>
                        <ProviderCta providerId={p.id} label={`Get ${p.name} →`} />
                      </td>
                    </tr>
                  ))}
                  {/* Klook sells a Japan eSIM too, but its listing blocks automated price reads,
                      so it stays out of the sortable plan table and appears here without numbers. */}
                  <tr>
                    <td className={styles.tdProvider}>{klookEsim.name}</td>
                    <td className={tools.tdMuted}>Not stated on the listing</td>
                    <td className={tools.tdMuted}>{klookEsim.priceUnknownLabel}</td>
                    <td className={tools.tdMuted}>—</td>
                    <td className={tools.tdMuted}>—</td>
                    <td>
                      <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                        {klookEsim.ctaLabel}
                      </KlookLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Klook&apos;s own Japan eSIM is listed last and without figures: the four providers above are read
            automatically from their pricing pages every day, and Klook&apos;s listing could not be read on{" "}
            {klookEsim.checkedAt}. It is therefore absent from the sortable table and the plan finder, which
            only work on verified prices.
          </p>
        </section>

        {/* Q: Should I get an unlimited eSIM for Japan? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Unlimited</span>
          <h2 className={styles.sectionTitle}>Should I get an unlimited eSIM for Japan?</h2>
          <p className={styles.bodyText}>
            Only if you genuinely cannot predict your usage — because no &ldquo;unlimited&rdquo; Japan plan is
            unmetered at full speed.{" "}
            {cheapestUnlimitedAny
              ? `The cheapest one we track for a week or longer is ${cheapestUnlimitedAny.provider}'s ${cheapestUnlimitedAny.name} at ${formatUsd(cheapestUnlimitedAny.priceUsd)} (checked ${checkedLabel}),`
              : "Compare the unlimited plans in the sortable table above,"}{" "}
            against {planName(TEN_DAY_PICK)} at {planPrice(TEN_DAY_PICK)} for ten days at a gigabyte a day. On the
            numbers the allowance usually wins.
          </p>
          <p className={styles.bodyText}>
            Every unlimited plan publishes a threshold, and they are not the same threshold. Airalo runs at full
            speed to 3 GB a day, then 1 Mbps until the 24-hour reset. eSIM Go&apos;s Premium Unlimited gives 30 GB
            over 5 days, 60 GB over 10 or 90 GB over 15 before the speed is reduced. Sakura Mobile&apos;s unlimited
            plan is unlimited on the device but caps the hotspot at 2–30 GB depending on plan length. The Klook
            listing&apos;s unlimited tier runs 10 GB a day at full speed, then 128 kbps. Thresholds read{" "}
            {SPECS_CHECKED}; the Klook figures from its listing data of {klookEsim.specsCheckedAt}.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
            The case for unlimited is a tethered laptop, daily video calls or a trip you cannot plan the days of.{" "}
            <Link href="/guides/esim/japan-esim-unlimited" className={tools.inlineLink}>
              Best unlimited eSIM for Japan, with the fine print →
            </Link>
          </p>
        </section>

        {/* Q: When should I install and activate my Japan eSIM? */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>When should I install and activate my Japan eSIM?</h2>
          <p className={styles.bodyText}>
            <strong>Install before you fly, activate when you land</strong> — but check which of the two your
            provider counts, because one of them starts the validity clock on install rather than on arrival. Get
            that wrong on a 3-day plan and you have paid for a day you spent in an aeroplane.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>When the validity clock starts</th>
                    <th>So install…</th>
                    <th>Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {timingRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider} style={{ minWidth: "130px" }}>{row.provider}</td>
                      <td style={{ fontSize: "0.82rem", minWidth: "300px" }}>{row.starts}</td>
                      <td style={{ fontSize: "0.85rem", minWidth: "200px" }}>{row.install}</td>
                      <td className={tools.tdMuted} style={{ whiteSpace: "nowrap" }}>{row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Each line is the provider&apos;s own wording, read on {SPECS_CHECKED}; the Klook row is from its listing
            data of {klookEsim.specsCheckedAt}. On an iPhone the install itself takes about two minutes in Settings →
            Cellular → Add eSIM — see{" "}
            <Link href="/guides/esim/japan-esim-iphone" className={tools.inlineLink}>
              the iPhone compatibility and setup guide →
            </Link>
          </p>
          <KlookEsimSlot why="Buying late? Klook's Japan eSIM is delivered as a QR-code voucher, so it can be bought after you have booked everything else and scanned at the gate — the listing states no start rule, so open it and read the plan you pick before you install it." />
        </section>

        {/* Q: Do Japan eSIM data plans include a phone number? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Phone number</span>
          <h2 className={styles.sectionTitle}>Do Japan eSIM data plans include a phone number?</h2>
          <p className={styles.bodyText}>
            No — every Japan eSIM data plan on this page is <strong>data only</strong>, with one exception. Airalo,
            eSIM Go and the Klook listing give you no Japanese number, no SMS and no voice calls.
          </p>
          <p className={styles.bodyText}>
            Sakura Mobile&apos;s separate <strong>Voice + Data eSIM</strong> is the only route to a Japanese number,
            and it comes with a condition: an in-person ID check in Japan, after which the usage period starts. If
            all you need is SMS for verification codes, there is a cheaper answer — keep your home SIM active in the
            other slot for texts and let the data eSIM carry everything else. Clauses checked {SPECS_CHECKED_AT}.
          </p>
        </section>

        {/* Q: Can I top up a Japan eSIM? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Running out</span>
          <h2 className={styles.sectionTitle}>Can I top up a Japan eSIM?</h2>
          <p className={styles.bodyText}>
            Yes, for most providers. Airalo lets you top up by buying an additional package in the app — no new QR
            code required. eSIM Go (Breeze) allows top-ups through its website, and Sakura Mobile allows data add-ons
            through its customer portal. Holafly&apos;s plans are unlimited, so there is nothing to top up, but they
            are fixed-length.
          </p>
          <p className={styles.bodyText}>
            The practical catch is that a top-up needs an internet connection to complete. Buy the extra data before
            you head into the mountains or out to the smaller islands, not after — and if you expect to be close to
            the line, the next plan up is almost always cheaper per GB than a top-up on top of a small one.
          </p>
        </section>

        {/* By Trip Length — derived from live data */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>By trip length</span>
          <h2 className={styles.sectionTitle}>Best Plan by Trip Length (Average User)</h2>
          <div className={styles.stepsList}>
            {byTripLength.map((row, i) => (
              <div key={row.days} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>
                    {row.days} days (~{row.gb} GB) → {row.pick ? `${row.pick.provider} ${row.pick.name} at ${formatUsd(row.pick.priceUsd)}` : "no single plan"}
                  </p>
                  <p className={styles.stepDesc}>
                    {row.pick
                      ? `Cheapest plan that covers ${row.days} days with at least ${row.gb} GB.`
                      : `No single plan currently covers ${row.days} days at this usage — buy a 30-day plan and top up.`}{" "}
                    {row.unlimited && `Prefer unlimited? ${row.unlimited.provider} ${row.unlimited.name} is ${formatUsd(row.unlimited.priceUsd)}.`}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Based on ~0.7 GB/day. Use the finder at the top of the page to change the trip length or usage level.
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/esim/japan-esim-2-weeks" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 10h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Japan eSIM for 2 Weeks: Plans That Don&apos;t Expire Early</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            <Link href="/guides/esim/cheapest-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cheapest eSIM for Japan 2026: Best Budget Picks</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-unlimited" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Unlimited eSIM for Japan (2026): Top Picks for Heavy Users</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-iphone" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="7" y="2" width="10" height="20" rx="2" />
                  <path d="M11 18h2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan eSIM for iPhone: Which Models Work and How to Set It Up</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/how-to-set-up-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>How to Set Up an eSIM in Japan (Step-by-Step)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
