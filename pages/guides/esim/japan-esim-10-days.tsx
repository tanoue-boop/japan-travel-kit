import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import tools from "../../../styles/Tools.module.css";
import KlookLink from "../../../components/KlookLink";
import SimbyeOffer from "../../../components/SimbyeOffer";
import { klookEsim } from "../../../lib/klook-links";
import {
  esimSpec,
  esimLink,
  SIMBYE_SPECS_CHECKED_AT,
  SPECS_CHECKED_AT,
  HOLAFLY_ALT_LABEL,
  HOLAFLY_ALT_NOTE,
} from "../../../lib/esim-specs";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import {
  allEsimPlans,
  cheapestUnlimited,
  formatUsd,
  getProvider,
  pricesCheckedLabel,
  type EsimPlan,
  type EsimPlanRow,
  type EsimProviderId,
} from "../../../lib/esim-prices";

/**
 * Restored 1 Nov 2026 from 5fab7fa (the page as it stood before the September
 * consolidation 301'd it to japan-esim-data-plans) and rewritten from scratch.
 *
 * Why it is back. GSC for the 28 days to 2026-11-01 still shows 101 impressions, one
 * click and an average position of 10.68 on the old URL — a ranking page being
 * redirected away, not a duplicate. japan-esim-data-plans does not serve the intent: it
 * prices the whole catalogue by $/GB across six trip lengths, and a reader asking about
 * ten days specifically wants one number and one plan.
 *
 * What changed against 5fab7fa. The old version led on "we compare the best eSIM plans",
 * carried a per-activity MB table and an invented day-by-day data diary, and quoted
 * hard-coded prices ($14 eSIM Go, $18 Airalo, $27 Holafly) that were stale within weeks.
 * None of that survives. The first paragraph now answers the sizing question in GB, every
 * price is read live out of data/esim-prices.json, and every non-price claim carries the
 * date it was read off the provider's own page:
 *
 *   - prices: the daily job's own timestamp, `pricesCheckedLabel()`
 *   - tethering and phone-number clauses: lib/esim-specs.ts, SPECS_CHECKED_AT
 *   - throttling thresholds and validity start rules: SPECS_CHECKED below, the same
 *     reads recorded on japan-esim-data-plans and best-esim-japan
 *   - the Klook rows: `klookEsim.specsCheckedAt`, from Klook's search index, because
 *     Klook answers automated reads of /activity/109393 with HTTP 403
 *
 * Nothing here is from experience, and no figure is attributed to a trip anyone took.
 */
const pricesCheckedAt = pricesCheckedLabel();

/**
 * The day the provider *terms* on this page were read off each provider's own site:
 * airalo.com/japan-esim and Airalo's unlimited-data fair-use policy; breezesim.com
 * (eSIM Go's consumer brand); sakuramobile.jp/travel/esim. Separate from
 * `pricesCheckedAt`, which is the daily price job's timestamp, and from SPECS_CHECKED_AT,
 * which dates the tethering and phone-number clauses.
 */
const SPECS_CHECKED = "29 Oct 2026";

const TITLE = "Japan eSIM 10 Days: How Much Data Do You Need (2026)";
const DESCRIPTION =
  "Japan eSIM 10 Days: budget 5GB for maps and messaging, 10GB for normal use, 15GB if you tether. The plans that cover ten days on data and on validity.";
const H1 = "Japan eSIM 10 Days: How Much Data Do You Need?";
const ROUTE = "/guides/esim/japan-esim-10-days";

const TRIP_DAYS = 10;

/**
 * How much data ten days needs.
 *
 * The per-day figures are the site's own planning arithmetic, used unchanged on
 * japan-esim-data-plans so the two pages cannot disagree: 0.5 GB a day for maps,
 * messaging and a few photos, 1 GB once you add video calls and some streaming,
 * 1.5 GB for a tethered laptop or video on trains. They sit well inside what the
 * providers themselves treat as heavy use — Airalo's fair-use threshold is 3 GB in a
 * day, Sakura Mobile's daily cap is 3 GB — so a reader who buys to this table is not
 * close to any published limit.
 */
const LIGHT_PER_DAY = 0.5;
const NORMAL_PER_DAY = 1;
const HEAVY_PER_DAY = 1.5;

const LIGHT_GB = LIGHT_PER_DAY * TRIP_DAYS;
const NORMAL_GB = NORMAL_PER_DAY * TRIP_DAYS;
const HEAVY_GB = HEAVY_PER_DAY * TRIP_DAYS;

/**
 * Cheapest plan on sale that covers a ten-day trip needing `gb` GB.
 *
 * Holafly is excluded for the same reason it is excluded on best-esim-japan and
 * japan-esim-data-plans: it runs no affiliate programme this site can join, so naming it
 * as "the plan to buy" would be a recommendation with no path to act on. It is still
 * priced in the unlimited table below. Daily-capped plans (Sakura Mobile's 3 GB/day
 * family) are measured on cap × trip days rather than their headline total — the only
 * like-for-like way to set them beside a fixed allowance.
 */
function cheapestForTrip(gb: number): EsimPlanRow | null {
  const rows = allEsimPlans
    .filter((p) => {
      if (p.providerId === "holafly") return false;
      if (p.days < TRIP_DAYS) return false;
      if (p.unlimited) return true;
      if (p.dailyCapGb) return p.dailyCapGb * TRIP_DAYS >= gb;
      return (p.gb ?? 0) >= gb;
    })
    .sort((a, b) => a.priceUsd - b.priceUsd || a.days - b.days);
  return rows[0] ?? null;
}

const lightPick = cheapestForTrip(LIGHT_GB);
const normalPick = cheapestForTrip(NORMAL_GB);
const heavyPick = cheapestForTrip(HEAVY_GB);

const planName = (p: EsimPlanRow | null) => (p ? `${p.provider} ${p.name}` : "—");
const planPrice = (p: EsimPlanRow | null | EsimPlan) => (p ? formatUsd(p.priceUsd) : "—");

/** The cheapest capped plan from one provider that covers ten days at NORMAL_GB. */
function tenDayCapped(id: EsimProviderId): EsimPlanRow | null {
  const rows = allEsimPlans
    .filter((p) => p.providerId === id && !p.unlimited && p.days >= TRIP_DAYS)
    .filter((p) => (p.dailyCapGb ? p.dailyCapGb * TRIP_DAYS >= NORMAL_GB : (p.gb ?? 0) >= NORMAL_GB))
    .sort((a, b) => a.priceUsd - b.priceUsd);
  return rows[0] ?? null;
}

const simbyePick = tenDayCapped("simbye");
const esimgoPick = tenDayCapped("esimgo");
const airaloPick = tenDayCapped("airalo");
const sakuraPick = tenDayCapped("sakura");

/** Cheapest unlimited plan per provider that stays valid for the whole ten days. */
const unlimitedRows = (["simbye", "esimgo", "airalo", "holafly", "sakura"] as EsimProviderId[])
  .map((id) => ({ id, plan: cheapestUnlimited(id, TRIP_DAYS) }))
  .filter((r): r is { id: EsimProviderId; plan: EsimPlan } => Boolean(r.plan))
  .sort((a, b) => a.plan.priceUsd - b.plan.priceUsd);

const cheapestUnlimitedRow = unlimitedRows[0] ?? null;

/** How much more the cheapest unlimited plan costs than the capped plan most people need. */
const unlimitedPremium =
  cheapestUnlimitedRow && normalPick
    ? formatUsd(cheapestUnlimitedRow.plan.priceUsd - normalPick.priceUsd)
    : "—";

/**
 * Plans with enough data for ten days but too short a validity — the trap behind the
 * "10-day or 15-day" question. A 10 GB / 7 days plan looks like the right size and dies
 * three days early.
 */
const tooShort = allEsimPlans.filter(
  (p) => !p.unlimited && (p.gb ?? 0) >= NORMAL_GB && p.days < TRIP_DAYS,
).length;

/** Airalo prices validity in cents: the same 10 GB over 15 days instead of 7. */
const airalo10Short = allEsimPlans.find((p) => p.id === "airalo-10-gb-7-days") ?? null;
const validityUpcharge =
  airalo10Short && airaloPick ? formatUsd(airaloPick.priceUsd - airalo10Short.priceUsd) : "—";

/** Per-day usage, for the sizing table. Planning arithmetic, labelled as such. */
const usageRows = [
  {
    style: "Light — maps, messaging, a few photo uploads",
    perDay: `${LIGHT_PER_DAY} GB`,
    total: `${LIGHT_GB} GB`,
    pick: lightPick,
  },
  {
    style: "Normal — the above plus video calls and some streaming",
    perDay: `${NORMAL_PER_DAY} GB`,
    total: `${NORMAL_GB} GB`,
    pick: normalPick,
  },
  {
    style: "Heavy — a tethered laptop, or video on trains",
    perDay: `${HEAVY_PER_DAY} GB`,
    total: `${HEAVY_GB} GB`,
    pick: heavyPick,
  },
];

/**
 * The ten-day comparison table: the five things that decide which plan to buy for this
 * trip length, and which no single source carries.
 *
 * Data, validity and price come from the daily price feed (`pricesCheckedAt`); tethering
 * and the phone-number clause from lib/esim-specs.ts (SPECS_CHECKED_AT). The Klook row
 * carries no price on purpose — Klook blocks automated reads of its product page, so
 * there is no figure to verify, and an unverified one would be worse than none.
 */
type CompareRow = {
  provider: string;
  plan: string;
  valid: string;
  tethering: string;
  phone: string;
  price: string;
  /** The row with no verifiable price. */
  noPrice?: boolean;
};

const compareRows: CompareRow[] = [
  {
    provider: "Simbye",
    plan: simbyePick?.name ?? "—",
    valid: `${simbyePick?.days ?? "—"} days`,
    tethering: esimSpec("simbye").tetheringShort,
    phone: esimSpec("simbye").phoneNumberShort,
    price: planPrice(simbyePick),
  },
  {
    provider: "eSIM Go (Breeze)",
    plan: esimgoPick?.name ?? "—",
    valid: `${esimgoPick?.days ?? "—"} days`,
    tethering: esimSpec("esimgo").tetheringShort,
    phone: esimSpec("esimgo").phoneNumberShort,
    price: planPrice(esimgoPick),
  },
  {
    provider: "Airalo",
    plan: airaloPick?.name ?? "—",
    valid: `${airaloPick?.days ?? "—"} days`,
    tethering: esimSpec("airalo").tetheringShort,
    phone: esimSpec("airalo").phoneNumberShort,
    price: planPrice(airaloPick),
  },
  {
    provider: "Sakura Mobile",
    plan: sakuraPick ? `${sakuraPick.name} (3 GB/day)` : "—",
    valid: `${sakuraPick?.days ?? "—"} days`,
    tethering: esimSpec("sakura").tetheringShort,
    phone: esimSpec("sakura").phoneNumberShort,
    price: planPrice(sakuraPick),
  },
  {
    provider: klookEsim.name,
    plan: klookEsim.specData,
    valid: "Not stated in the listing data read",
    tethering: klookEsim.specTethering,
    phone: klookEsim.specPhoneNumber,
    price: klookEsim.priceUnknownLabel,
    noPrice: true,
  },
];

/**
 * When the validity clock starts, and therefore when to install.
 *
 * This is the part people get wrong on a ten-day trip, because installing early is right
 * on one provider and expensive on another. Each string is the provider's own wording,
 * read on SPECS_CHECKED.
 */
const timingRows = [
  {
    provider: "Simbye",
    starts: "“Your plan only starts counting when the eSIM first connects at your destination.”",
    install: "Yes — its Japan page says to install over Wi-Fi before you fly",
    checked: SIMBYE_SPECS_CHECKED_AT,
  },
  {
    provider: "eSIM Go (Breeze)",
    starts: "“Plan validity starts on first data use in Japan, not at purchase.”",
    install: "“Install before you fly.”",
    checked: SPECS_CHECKED,
  },
  {
    provider: "Airalo",
    starts:
      "“The validity period of your eSIM package starts when one of the following happens: When you connect to a supported network in its coverage area or When you install your eSIM.”",
    install: "Safe to install at home for most packages — check that package's Validity Policy first",
    checked: SPECS_CHECKED,
  },
  {
    provider: "Sakura Mobile",
    starts:
      "The 3 GB/day plans: “usage period starts once you install the eSIM”. The unlimited data-only plan: “the usage period starts once you arrive to Japan”.",
    install: "Install the 3 GB/day plans on arrival — installing at home burns days of a ten-day plan",
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
    q: "How much data do I need for 10 days in Japan?",
    a: `Budget ${LIGHT_GB} GB for ten days if your phone is doing maps, messaging and a few photo uploads, ${NORMAL_GB} GB once you add video calls and some streaming, and ${HEAVY_GB} GB if you tether a laptop or watch video on trains. ${NORMAL_GB} GB is the figure to buy on if you are not sure, and it is what the cheapest ten-day-capable plan on sale carries: ${planName(normalPick)} at ${planPrice(normalPick)} (prices checked ${pricesCheckedAt}). Those per-day figures are planning arithmetic rather than a provider claim, but they sit well inside what the providers treat as heavy use — Airalo's fair-use threshold is 3 GB in a day and Sakura Mobile's daily cap is 3 GB (checked ${SPECS_CHECKED}).`,
  },
  {
    q: "Is unlimited eSIM worth it for 10 days?",
    a: `For most ten-day trips, no. ${cheapestUnlimitedRow ? `The cheapest unlimited plan that stays valid for the full ten days is ${getProvider(cheapestUnlimitedRow.id).name}'s ${cheapestUnlimitedRow.plan.name} at ${formatUsd(cheapestUnlimitedRow.plan.priceUsd)}` : "The cheapest unlimited plan that lasts ten days"} — ${unlimitedPremium} more than ${planName(normalPick)} at ${planPrice(normalPick)}, which carries a gigabyte a day (checked ${pricesCheckedAt}). None of the unlimited plans is unmetered at full speed either: Simbye gives 2 GB a day at full speed and then 1 Mbps, Airalo runs full speed to 3 GB a day then 1 Mbps until the 24-hour reset, eSIM Go's cheaper Unlimited Essential tier reduces speed after a daily high-speed allowance and its Premium Unlimited publishes 60 GB over 10 days before the reduction, Holafly caps shareable hotspot data at 1 GB a day, and Sakura Mobile's unlimited plan is unlimited on the device but allows a fixed hotspot total by plan length. Unlimited is worth it for three readers: anyone tethering a laptop all day, anyone streaming video daily, and anyone who would rather not think about it at all.`,
  },
  {
    q: "Should I buy a 10-day or 15-day eSIM?",
    a: `Buy the longer validity, because almost nobody prices it as a premium. Airalo's 10 GB runs ${airalo10Short ? `${formatUsd(airalo10Short.priceUsd)} for 7 days against ${planPrice(airaloPick)} for 15` : "barely more for 15 days than for 7"} — ${validityUpcharge} to stop the plan expiring three days before you fly home. eSIM Go sells its fixed allowances on 30-day validity only, so the question does not arise there. ${tooShort} plans in the current catalogue hold ${NORMAL_GB} GB or more but run out before day 10, which is the actual trap: buying on allowance alone and landing on a 7-day plan with data still on it. Sakura Mobile is the one provider selling an exact ten-day term (${sakuraPick?.name ?? "30 GB / 10 days"}).`,
  },
  {
    q: "When should I install my Japan eSIM?",
    a: `Install before you fly and activate when you land — but check which of the two your provider counts, because on a ten-day plan a wrong guess costs a tenth of the trip. eSIM Go states "plan validity starts on first data use in Japan, not at purchase" and tells you to "install before you fly". Airalo's validity "starts when one of the following happens: When you connect to a supported network in its coverage area or When you install your eSIM", so the package's own Validity Policy decides. Sakura Mobile is the exception: on its 3 GB/day plans the "usage period starts once you install the eSIM", so install those on arrival rather than at home. Provider wording checked ${SPECS_CHECKED}.`,
  },
  {
    q: "Can I top up a Japan eSIM?",
    a: "Yes, for most providers — which is why starting at 10 GB rather than paying for unlimited is the safe choice on a ten-day trip. Simbye's fixed plans can be topped up without changing the eSIM. Airalo lets you top up by buying an additional package in the app, with no new QR code. eSIM Go (Breeze) allows top-ups through its website. Sakura Mobile allows data add-ons through its customer portal. Holafly's plans are unlimited, so there is nothing to top up. The practical catch is that a top-up needs a working connection to complete, so buy the extra data before you head into the mountains or out to the smaller islands, not after.",
  },
  {
    q: "Does a Japan eSIM come with a Japanese phone number?",
    a: `No — every ten-day eSIM on this page is data only, with one exception. Simbye, Airalo, eSIM Go and the Klook listing give you no Japanese number, no SMS and no voice calls. Sakura Mobile's separate Voice + Data eSIM is the only route to a Japanese number, and it needs an in-person ID check in Japan before the usage period starts. If you only need SMS for verification codes, keep your home SIM active in the other slot and let the eSIM carry the data. Clauses checked ${SPECS_CHECKED_AT}.`,
  },
  {
    q: "Can I tether a laptop to a Japan eSIM for 10 days?",
    a: `Yes on all four, but the terms differ and a tethered laptop is what pushes a ten-day trip from ${NORMAL_GB} GB to ${HEAVY_GB} GB or more. eSIM Go states tethering on every Japan plan at no extra cost. Airalo's help centre says the personal hotspot works where your device and the network allow it. Sakura Mobile's unlimited plans carry one hotspot allowance for the whole trip rather than a daily one. Holafly caps shareable data at 1 GB a day. The Klook listing states hotspot and tethering are supported. Tethering clauses checked ${SPECS_CHECKED_AT}; the Klook line comes from its listing data of ${klookEsim.specsCheckedAt}.`,
  },
];

/**
 * The Klook eSIM path. Klook's eSIM category pays 20%, the highest band on the dashboard,
 * and this page's reader is deciding which plan to buy and when to buy it — so the link
 * sits at exactly those two points, plus the answer box at the top: under the pick, under
 * the plan-comparison table, and beside the install-before-you-fly answer.
 *
 * No price, for the usual reason: Klook answers automated reads of the product page with
 * HTTP 403, so there is no figure to verify.
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

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function JapanEsim10DaysPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.japan-travel-kit.com${ROUTE}`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={`https://www.japan-travel-kit.com${ROUTE}`} />
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
                { "@type": "ListItem", position: 4, name: "Japan eSIM 10 Days", item: `https://www.japan-travel-kit.com${ROUTE}` },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: H1, description: DESCRIPTION, updated }),
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
          <span className={styles.breadCurrent}>Japan eSIM 10 Days</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Prices checked {pricesCheckedAt}</p>
          <h1 className={styles.heroTitle}>
            Japan eSIM 10 Days:<br />How Much Data Do You Need?
          </h1>
          <p className={styles.heroSubtitle}>
            {LIGHT_GB}–{HEAVY_GB} GB depending on how you travel, and the cheapest plan on sale that
            covers ten days on data <em>and</em> on validity.
          </p>
          <div className={styles.heroBadges}>
            <span className={`${tools.liveBadge} ${tools.liveBadgeOnDark}`}>
              <span className={tools.liveDot} /> Prices checked daily
            </span>
            {[`Updated ${updated.label}`, "Validity checked, not just GB", "Tethering & phone-number rules"].map((t) => (
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
            This doesn&apos;t affect the comparison — the table is ordered by the numbers, not by commission.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* The answer, first. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Ten days in Japan needs <strong>{LIGHT_GB} GB</strong> if your phone is doing maps,
            messaging and a few photo uploads, <strong>{NORMAL_GB} GB</strong> once you add video
            calls and some streaming, and <strong>{HEAVY_GB} GB</strong> if you tether a laptop or
            watch video on trains — so <strong>{NORMAL_GB} GB is the figure to buy on</strong> if you
            are not sure, and it is what the cheapest ten-day-capable plan carries:{" "}
            <strong>{planName(normalPick)} at {planPrice(normalPick)}</strong>. Those per-day figures
            are planning arithmetic rather than a provider claim, but they sit well inside what the
            providers treat as heavy use — Airalo&apos;s fair-use threshold is 3 GB in a day and
            Sakura Mobile&apos;s daily cap is 3 GB.
          </p>
          <p className={styles.bodyText}>
            <strong>Unlimited is only needed by three kinds of traveller:</strong> anyone tethering a
            laptop through the working day, anyone streaming video daily rather than on hotel WiFi,
            and anyone who would rather pay not to think about it. For everyone else it is{" "}
            {unlimitedPremium} of headroom nobody uses:{" "}
            {cheapestUnlimitedRow
              ? `the cheapest unlimited plan still valid on day ten is ${getProvider(cheapestUnlimitedRow.id).name}'s ${cheapestUnlimitedRow.plan.name} at ${formatUsd(cheapestUnlimitedRow.plan.priceUsd)}`
              : "the cheapest unlimited plan that lasts ten days costs considerably more"}
            , against {planPrice(normalPick)} for a gigabyte a day — and none of the unlimited plans
            is unmetered at full speed anyway.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Prices read off each provider&apos;s own site on {pricesCheckedAt} by the job that
            re-reads them daily. Fair-use thresholds, speed caps and validity start rules read on{" "}
            {SPECS_CHECKED}; tethering and phone-number clauses on {SPECS_CHECKED_AT}; the Klook rows
            come from its own listing data of {klookEsim.specsCheckedAt}, because Klook answers
            automated reads of the product page with HTTP 403.
          </p>
        </section>

        {/* Quick answer box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer · {pricesCheckedAt}</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>10-Day Trips</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Data for ten days</p>
                <p className={styles.verdictStatValue}>{LIGHT_GB}–{HEAVY_GB} GB ({NORMAL_GB} GB if unsure)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest plan that covers it</p>
                <p className={styles.verdictStatValue}>{planName(normalPick)} — {planPrice(normalPick)}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Unlimited, still valid on day 10</p>
                <p className={styles.verdictStatValue}>
                  {cheapestUnlimitedRow
                    ? `from ${formatUsd(cheapestUnlimitedRow.plan.priceUsd)}`
                    : "—"}
                </p>
              </div>
            </div>
            <p className={styles.bodyText} style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              If the tickets and transport for this trip are already going through one checkout,
              Klook sells a Japan eSIM of its own — tiers from 500 MB to 50 GB plus an unlimited
              option, so the sizing above still applies, and it is the one option here with no
              verified price to quote because the listing blocks automated reads.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink
                href={klookEsim.url}
                className={styles.verdictBtn}
                target="_blank"
                rel="sponsored noopener"
              >
                {klookEsim.ctaLabel}
              </KlookLink>
              <a
                href={esimLink("simbye")}
                className={styles.pickCtaInternal}
                target="_blank"
                rel="sponsored noopener"
              >
                Get Simbye {simbyePick?.name ?? "10 GB"} →
              </a>
              <a
                href={esimLink("esimgo")}
                className={styles.pickCtaInternal}
                target="_blank"
                rel="sponsored noopener"
              >
                Get eSIM Go {esimgoPick?.name ?? "10 GB"} →
              </a>
              <a
                href={esimLink("airalo")}
                className={styles.pickCtaInternal}
                target="_blank"
                rel="sponsored noopener"
              >
                Get Airalo {airaloPick?.name ?? "10 GB"} →
              </a>
            </div>
          </div>
        </div>

        {/* Sizing */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The arithmetic</span>
          <h2 className={styles.sectionTitle}>How much data do I need for 10 days in Japan?</h2>
          <p className={styles.bodyText}>
            {LIGHT_GB} GB light, {NORMAL_GB} GB normal, {HEAVY_GB} GB heavy. The per-day column is
            planning arithmetic — half a gigabyte a day for maps, messaging and photos, a gigabyte
            once video calls and some streaming are in the mix, and half as much again for a
            tethered laptop — and the plan column is the cheapest thing on sale that covers the
            total without expiring first.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>How you travel</th>
                    <th>Per day</th>
                    <th>10 days</th>
                    <th>Cheapest plan that covers it</th>
                  </tr>
                </thead>
                <tbody>
                  {usageRows.map((row) => (
                    <tr key={row.style}>
                      <td className={styles.ftFeature}>{row.style}</td>
                      <td className={styles.ftEsim}>{row.perDay}</td>
                      <td className={styles.ftSim} style={{ fontWeight: 700 }}>{row.total}</td>
                      <td>
                        {planName(row.pick)}
                        {row.pick ? ` — ${planPrice(row.pick)}` : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Two things pull a ten-day trip towards the heavy row rather than the light one. The
            first is navigation on arrival days: a city you have never walked uses far more map data
            than one you know, and a ten-day itinerary normally has three or four of those. The
            second is tethering — a laptop on hotel-free afternoons roughly triples a tourist day,
            which is why the hotspot clause in the table below matters more than the headline price
            if you are working while you travel.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Prices from the daily feed, checked {pricesCheckedAt}. For the same arithmetic across 3,
            5, 7, 14 and 30 days, and every plan sorted by price per GB, see{" "}
            <Link href="/guides/esim/japan-esim-data-plans" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Japan eSIM data plans compared
            </Link>.
          </p>
        </section>

        {/* The comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>10-day plans</span>
          <h2 className={styles.sectionTitle}>The Plans That Cover a Full 10 Days</h2>
          <p className={styles.bodyText}>
            Every row below holds at least {NORMAL_GB} GB of usable data <em>and</em> stays valid for
            at least ten days. Sakura Mobile&apos;s allowance is per day rather than per trip, so its
            row is measured on what you can actually use across ten days. Tethering and the
            phone-number clause are each provider&apos;s own published wording, not an inference.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Plan for ten days</th>
                    <th>Valid</th>
                    <th>Tethering</th>
                    <th>Japanese phone number</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider}>{row.provider}</td>
                      <td>{row.plan}</td>
                      <td className={styles.tdNetwork}>{row.valid}</td>
                      <td>{row.tethering}</td>
                      <td>{row.phone}</td>
                      <td className={row.noPrice ? tools.tdMuted : styles.tdPrice}>
                        {row.price}
                        {row.noPrice ? <span className={tools.tdNote}>No verified price — see note</span> : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Which one to buy.</strong> {planName(simbyePick)} at {planPrice(simbyePick)} has
            the lowest list price of the table, allows tethering, and has {simbyePick?.days ?? 30} days
            of validity so the clock is never the constraint.{" "}
            <Link href="/guides/esim/simbye-japan-review" className={tools.inlineLink}>Simbye in detail →</Link>{" "}
            {planName(esimgoPick)} at {planPrice(esimgoPick)} also states tethering on every plan at no
            extra cost, with {esimgoPick?.days ?? 30} days of validity; the trade-off is email-only
            support and no in-app top-up. {planName(airaloPick)} at{" "}
            {planPrice(airaloPick)} costs{" "}
            {airaloPick && esimgoPick ? formatUsd(airaloPick.priceUsd - esimgoPick.priceUsd) : "a little"}{" "}
            more for the same allowance and buys two things worth having on a ten-day trip: 24/7
            live chat, and in-app top-up so a bad estimate costs a few dollars rather than a second
            plan. {planName(sakuraPick)} is the expensive option and the only one with a route to a
            Japanese phone number — on its separate Voice + Data eSIM, which needs an in-person ID
            check in Japan.
          </p>
          <SimbyeOffer />
          <KlookEsimSlot why="Klook's own Japan eSIM sells the same sizes — 500 MB to 50 GB plus an unlimited tier — and its listing states tethering is supported and the service is data only, so the sizing above transfers. It is unpriced here because the listing blocks automated price reads, which is also why it sits outside the ordered comparison rather than in it." />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Data, validity and price from the daily price feed ({pricesCheckedAt}); tethering and
            phone-number clauses from each provider&apos;s own pages ({SPECS_CHECKED_AT}); the Klook
            row from its listing data of {klookEsim.specsCheckedAt}. Holafly is absent because it
            sells unlimited plans only — it is priced in the next section.
          </p>
        </section>

        {/* Unlimited */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Unlimited</span>
          <h2 className={styles.sectionTitle}>Is unlimited eSIM worth it for 10 days?</h2>
          <p className={styles.bodyText}>
            For most ten-day trips, no — it is {unlimitedPremium} more than a plan carrying a
            gigabyte a day, and no &quot;unlimited&quot; Japan plan is unmetered at full speed. Every
            one of them publishes a threshold, and on a ten-day trip those thresholds are what you
            are actually buying:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Cheapest unlimited valid for 10 days</th>
                    <th>Price</th>
                    <th>What &quot;unlimited&quot; means on it</th>
                  </tr>
                </thead>
                <tbody>
                  {unlimitedRows.map(({ id, plan }) => (
                    <tr key={id}>
                      <td className={styles.tdProvider}>{getProvider(id).name}</td>
                      <td>{plan.name}</td>
                      <td className={styles.tdPrice}>{formatUsd(plan.priceUsd)}</td>
                      <td>{plan.note ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            In the providers&apos; own wording, read on {SPECS_CHECKED}: Airalo runs at full speed to
            3 GB a day and then 1 Mbps &quot;for the rest of that day&quot;, resetting every 24 hours
            from activation; eSIM Go sells two unlimited tiers, and the one priced above is
            Essential, which reduces speed after a daily high-speed allowance — its Premium
            Unlimited publishes the threshold as 60 GB over 10 days, after which &quot;your data
            speed will be reduced (but is still suitable for streaming 720p video)&quot;; Sakura
            Mobile&apos;s unlimited plan is unlimited on the device itself but
            allows one hotspot total for the trip rather than a daily one; Holafly caps shareable
            data at 1 GB a day. On a ten-day trip, a 10 GB capped plan and an unlimited plan diverge
            only if you pass a gigabyte a day — and the capped one can be topped up if you do.
          </p>
          <p className={styles.bodyText}>
            Holafly is priced above but not linked: it runs no affiliate programme this site can
            join, so the nearest unlimited plan available through these links is Airalo&apos;s.
          </p>
          <a
            href={esimLink("airalo")}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
            style={{ marginTop: "0.75rem", display: "inline-flex" }}
          >
            {HOLAFLY_ALT_LABEL}
          </a>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
            {HOLAFLY_ALT_NOTE}
          </p>
        </section>

        {/* 10 vs 15 days */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Validity</span>
          <h2 className={styles.sectionTitle}>Should I buy a 10-day or 15-day eSIM?</h2>
          <p className={styles.bodyText}>
            Buy the 15-day plan, because almost nobody charges a real premium for the extra five
            days. Japan eSIMs are sold in 3, 5, 7, 15 and 30-day blocks, so an exact ten-day term is
            the exception rather than the rule — and the mistake that follows is buying on allowance
            alone: <strong>{tooShort} plans in the current catalogue hold {NORMAL_GB} GB or more but
            expire before day 10</strong>, leaving data on a dead profile three days before you fly
            home.
          </p>
          <p className={styles.bodyText}>
            The upcharge is small where the choice exists.{" "}
            {airalo10Short && airaloPick
              ? `Airalo's 10 GB costs ${formatUsd(airalo10Short.priceUsd)} on 7 days and ${planPrice(airaloPick)} on 15 — ${validityUpcharge} for eight more days of validity.`
              : "Airalo prices the same allowance within cents across its validity tiers."}{" "}
            eSIM Go sells its fixed allowances on 30-day validity only, so the question does not
            arise: {planName(esimgoPick)} is a ten-day plan with twenty days spare. Sakura Mobile is
            the one provider with an exact ten-day term —{" "}
            {sakuraPick ? `${sakuraPick.name} at ${planPrice(sakuraPick)}` : "its 10-day plan"} — and
            it is priced per day rather than per gigabyte, so it only makes sense if you need 3 GB a
            day or the phone number.
          </p>
          <p className={styles.bodyText}>
            The one case for buying short deliberately: your trip is ten days but your phone is only
            without home coverage for part of it — a work trip where the office provides WiFi, say.
            Then a 7-day plan plus an in-app top-up is cheaper than fifteen days of validity you do
            not use. Check the provider allows top-ups first; eSIM Go does not do them in-app.
          </p>
        </section>

        {/* Install timing */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>When should I install my Japan eSIM?</h2>
          <p className={styles.bodyText}>
            Buy it a few days before you fly, install it at home, and let it activate when you land —
            but check which event your provider counts as the start of the validity period, because
            on a ten-day plan getting it wrong costs a tenth of the trip. The install itself takes
            about two minutes and needs WiFi, which is the real reason not to leave it until the
            airport.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>When the clock starts</th>
                    <th>So install</th>
                    <th>Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {timingRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider}>{row.provider}</td>
                      <td>{row.starts}</td>
                      <td>{row.install}</td>
                      <td className={styles.tdNetwork}>{row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <KlookEsimSlot why="If you are buying before departure anyway and the trip's tickets, passes or airport transfer are already in a Klook basket, its Japan eSIM goes through the same checkout — one account, one confirmation email, and the QR code arrives as a voucher rather than a separate login." />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Whichever you buy, do the three compatibility checks before you pay rather than at the
            gate: the handset has to be eSIM-capable, carrier-unlocked, and able to show you an EID
            in its settings.{" "}
            <Link href="/guides/esim/how-to-set-up-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              The setup guide
            </Link>{" "}
            has the exact menu for iPhone and Android and the troubleshooting for a profile that
            will not install.
          </p>
        </section>

        {/* Top-ups */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Running out</span>
          <h2 className={styles.sectionTitle}>Can I top up a Japan eSIM?</h2>
          <p className={styles.bodyText}>
            Yes, on most providers — which is the whole argument for buying {NORMAL_GB} GB rather
            than paying for unlimited. Airalo lets you top up by buying an additional package in the
            app, with no new QR code. eSIM Go (Breeze) allows top-ups through its website rather than
            in an app. Sakura Mobile allows data add-ons through its customer portal. Holafly&apos;s
            plans are unlimited, so there is nothing to top up — but they are also fixed-length, so
            an eleventh day means a second purchase.
          </p>
          <p className={styles.bodyText}>
            The catch is practical rather than contractual: a top-up needs a working connection to
            complete. Buy the extra data while you still have some — before the train into the
            mountains, not after you arrive with 50 MB left. Japan&apos;s convenience-store and
            station WiFi will get a purchase through in an emergency, but it is slow and sign-up
            flows are often Japanese-only.
          </p>
        </section>

        {/* Data saving */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Making it last</span>
          <h2 className={styles.sectionTitle}>Four Ways to Make 10 GB Cover Ten Days</h2>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Download each city&apos;s map</p>
              <p className={styles.whoForDesc}>
                Google Maps offline areas cost nothing to use once downloaded, and arrival days in an
                unfamiliar city are the heaviest map days of a ten-day itinerary.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M3 9h18" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Stream on hotel WiFi only</p>
              <p className={styles.whoForDesc}>
                Video is the single biggest drain on any plan — an hour of it can cost more than a
                whole day of maps and messaging. Ten evenings of it will finish 10 GB on its own.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Queue photo uploads</p>
              <p className={styles.whoForDesc}>
                Turn off camera-roll backup over mobile data and let it run overnight on WiFi.
                Full-resolution uploads from ten days of photos are a plan&apos;s worth of data.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Watch the hotspot clause</p>
              <p className={styles.whoForDesc}>
                Tethering is where a ten-day plan goes from comfortable to short. eSIM Go states it
                on every plan at no extra cost; Holafly caps shareable data at 1 GB a day.
              </p>
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/esim/japan-esim-data-plans" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan eSIM Data Plans 2026: How Much Data Do You Need?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-2-weeks" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 10h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Japan eSIM for 2 Weeks: Plans That Last the Trip</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Compared by Price &amp; Network</p>
                <span className={styles.relatedArrow}>View comparison →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-unlimited" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Unlimited eSIM for Japan (2026): Top Picks for Heavy Users</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-10-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 10 Day Itinerary (2026): 10 Days in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/how-to-set-up-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>How to Set Up an eSIM in Japan (Step-by-Step)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/sakura-mobile-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sakura Mobile Review 2026: eSIM &amp; SIM Card Plans and Prices</p>
                <span className={styles.relatedArrow}>Read review →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Buying for a ten-day trip?</h2>
            <p className={styles.ctaBannerDesc}>
              {NORMAL_GB} GB covers almost every ten-day itinerary, and the cheapest plan that holds
              it without expiring is {planName(normalPick)} at {planPrice(normalPick)} as of{" "}
              {pricesCheckedAt}. Klook&apos;s own Japan eSIM is the one-checkout option if the rest
              of the trip is already booked there.
            </p>
            <KlookLink
              href={klookEsim.url}
              className={styles.ctaBannerBtn}
              target="_blank"
              rel="sponsored noopener"
            >
              {klookEsim.ctaLabel}
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
