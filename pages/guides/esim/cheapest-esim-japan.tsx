import Head from "next/head";
import Link from "next/link";
import { EsimAltLinks } from "../../../components/EsimPageAnswer";
import styles from "../../../styles/BestEsimJapan.module.css";
import tools from "../../../styles/Tools.module.css";
import { ProviderCta } from "../../../components/EsimPlanTable";
import KlookLink from "../../../components/KlookLink";
import SimbyeOffer from "../../../components/SimbyeOffer";
import { klookEsim } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd, productOfferJsonLd } from "../../../lib/structured-data";
import {
  allEsimPlans,
  cheapestAtLeastGb,
  cheapestUnlimited,
  esimProviders,
  formatDate,
  formatUsd,
  getProvider,
  latestCheckedAt,
  plansFor,
  pricePerGb,
  type EsimPlan,
  type EsimPlanRow,
} from "../../../lib/esim-prices";

const AIRALO_URL = "https://airalo.pxf.io/c/7213504/1268485/15608";
const SAKURA_URL = "https://p.sakuramobile.jp/idevaffiliate.php?id=486";
const ESIMGO_URL = "https://breezesim.com?sca_ref=11082101.AF8vabyRKN";
const SIMBYE_URL = getProvider("simbye").affiliateUrl;
// Holafly runs no affiliate programme we can join (impact: Airalo only — checked 9 Oct 2026),
// so its purchase CTA points at Airalo's unlimited plans, the closest approved alternative.
const HOLAFLY_ALT_LABEL = "Get Airalo unlimited eSIM →";
const HOLAFLY_ALT_NOTE = "Holafly is not available through our links — Airalo is our recommended alternative.";

// Price comparison is drawn from data/esim-prices.json (refreshed daily by
// scripts/fetch-esim-prices.mjs): cheapest plan per provider at each data tier.
const pricesCheckedAt = formatDate(latestCheckedAt());
const TIERS = [1, 5, 10];
const priceTable = esimProviders.map((p) => ({
  id: p.id,
  provider: p.name,
  tiers: TIERS.map((gb) => cheapestAtLeastGb(p.id, gb)),
  unlimited: cheapestUnlimited(p.id),
}));
const cheapestOf = (rows: typeof allEsimPlans) => (rows.length ? rows.reduce((a, b) => (b.priceUsd < a.priceUsd ? b : a)) : null);
const cheapestOverall = cheapestOf(allEsimPlans);
const cheapestUnlimitedAny = cheapestOf(allEsimPlans.filter((p) => p.unlimited && p.days >= 7));
const cheapestLongStay = cheapestOf(allEsimPlans.filter((p) => p.days >= 30 && !p.unlimited && (p.gb ?? 0) >= 10));
const p = (plan: EsimPlan | null) => (plan ? `${formatUsd(plan.priceUsd)} / ${plan.name}` : "—");
const priceOf = (plan: EsimPlan | null) => (plan ? formatUsd(plan.priceUsd) : "—");
const simbyeCheapest = cheapestAtLeastGb("simbye", 1);
const simbye5 = cheapestAtLeastGb("simbye", 5);
const simbye10 = cheapestAtLeastGb("simbye", 10);
const airalo10 = cheapestAtLeastGb("airalo", 10);
const esimgoCheapest = cheapestAtLeastGb("esimgo", 1);
const airaloCheapest = cheapestAtLeastGb("airalo", 1);
const holaflyCheapest = cheapestUnlimited("holafly", 7);
const sakuraCheapest = cheapestAtLeastGb("sakura", 1);
const esimgo10 = cheapestAtLeastGb("esimgo", 10);

/**
 * Fixed-allowance plans only: unlimited plans have no price per GB, and a daily-capped plan's
 * headline total is not a pot of data you can spend in one go.
 */
const fixedPlans: EsimPlanRow[] = allEsimPlans.filter((row) => !row.unlimited && !row.dailyCapGb && row.gb);

/** The two cheapest fixed plans with at least `gb`, from different providers. */
function cheapestTwo(gb: number): EsimPlanRow[] {
  const sorted = fixedPlans.filter((row) => (row.gb ?? 0) >= gb).sort((a, b) => a.priceUsd - b.priceUsd);
  const second = sorted.find((row) => sorted[0] && row.providerId !== sorted[0].providerId);
  return second ? [sorted[0], second] : sorted.slice(0, 1);
}

const SIZE_ROWS = [1, 3, 5, 10, 20, 50].map((gb) => ({ gb, plans: cheapestTwo(gb) }));

/** Lowest price per gigabyte across every fixed plan on sale, best first. */
const perGbRows = [...fixedPlans].sort((a, b) => (pricePerGb(a) ?? 0) - (pricePerGb(b) ?? 0)).slice(0, 6);

const rowLabel = (row: EsimPlanRow | undefined) => (row ? `${row.provider} ${row.name}` : "—");
const SIMBYE_FIXED = plansFor("simbye").filter((plan) => !plan.unlimited);

const cell = (plan: EsimPlan | null) =>
  plan ? (
    <>
      {formatUsd(plan.priceUsd)}
      <span className={tools.tdNote}>{plan.name}</span>
    </>
  ) : (
    "✗"
  );

const picks = [
  {
    num: 1,
    name: "Simbye",
    badge: "Lowest Confirmed Price",
    badgeColor: "var(--sumi)",
    priceFrom: p(simbyeCheapest),
    network: getProvider("simbye").network,
    affiliateUrl: SIMBYE_URL,
    ctaLabel: "Get Simbye Japan eSIM →",
    pros: [
      "Lowest list price of the plans compared here at 1 GB, 5 GB and 10 GB",
      "NTT docomo, KDDI/au, SoftBank and Rakuten Mobile",
      "Tethering allowed on every Japan plan",
      "Top-up without changing the eSIM on fixed plans",
    ],
    cons: [
      "Data-only (no Japanese number, calls or SMS)",
      "Unlimited plans drop to 1 Mbps after 2 GB a day",
      "eSIM-compatible, unlocked phone required",
    ],
    summary:
      `First because the price says so: ${p(simbye10)} against ${p(esimgo10)} from eSIM Go and ${p(airalo10)} from Airalo at the 10 GB tier, and ${p(simbyeCheapest)} at the entry tier. The plan is data only, so it suits anyone who keeps messaging on apps.`,
  },
  {
    num: 2,
    name: "eSIM Go",
    badge: "Short Unlimited Plans",
    badgeColor: "var(--sumi)",
    priceFrom: p(esimgoCheapest),
    network: "NTT Docomo, KDDI, Rakuten Mobile, SoftBank",
    affiliateUrl: ESIMGO_URL,
    ctaLabel: "Get eSIM Go Japan →",
    pros: [
      "Unlimited plans from 1 day",
      "Docomo among its four carriers, for rural coverage",
      "Instant QR code activation",
      "Works in 190+ countries",
    ],
    cons: [
      "Data-only (no voice or SMS)",
      "Smaller brand — less community support",
      "Email-only customer service",
    ],
    summary:
      `eSIM Go (sold through its consumer brand Breeze) starts at ${p(esimgoCheapest)}${esimgo10 ? `, and its ${esimgo10.name} plan is ${priceOf(esimgo10)}` : ""}. It activates via QR code, and it sells allowances up to 200 GB plus unlimited plans from a single day.`,
  },
  {
    num: 3,
    name: "Airalo",
    badge: "Dearer, With Support",
    badgeColor: "var(--sumi)",
    priceFrom: p(airaloCheapest),
    network: "SoftBank (primary), plus two others Airalo does not name",
    affiliateUrl: AIRALO_URL,
    ctaLabel: "Get Airalo Japan eSIM →",
    pros: [
      "Trusted by 10M+ travellers worldwide",
      "Unlimited plans from 3 days",
      "24/7 live chat support",
      "Easy-to-use app",
    ],
    cons: [
      "Data-only (no voice calls or SMS)",
      "Dearer than Simbye and eSIM Go at most sizes",
      "eSIM-compatible phone required",
    ],
    summary:
      `Airalo's Japan plans start at ${p(airaloCheapest)}. It costs more than Simbye and eSIM Go at most sizes, and what the extra buys is 24/7 live chat and in-app top-ups.`,
  },
  {
    num: 4,
    name: "Holafly",
    badge: "Unlimited Only",
    badgeColor: "var(--accent)",
    priceFrom: p(holaflyCheapest),
    network: getProvider("holafly").network,
    affiliateUrl: AIRALO_URL,
    ctaLabel: HOLAFLY_ALT_LABEL,
    ctaNote: HOLAFLY_ALT_NOTE,
    pros: [
      "Unlimited on-device data",
      "Plans from 1 to 90 days, any length",
      "Easy QR code setup",
      "Popular with US & European travellers",
    ],
    cons: [
      "Data-only (no calls or SMS)",
      "Pricier than capped alternatives",
      "eSIM-only device required",
    ],
    summary:
      `If you stream constantly, use Google Maps all day, or simply want peace of mind about your data, Holafly's unlimited plans start at ${p(holaflyCheapest)}. Hotspot use is capped at 1 GB/day. It costs more than a capped plan, but on an unlimited plan, per-GB cost is irrelevant.`,
  },
  {
    num: 5,
    name: "Sakura Mobile",
    badge: "Cheapest with Voice",
    badgeColor: "var(--accent)",
    priceFrom: p(sakuraCheapest),
    network: "Docomo (3 GB/day) or au/KDDI (unlimited)",
    affiliateUrl: SAKURA_URL,
    ctaLabel: "Get Sakura Mobile SIM →",
    pros: [
      "Optional Japanese phone number on SIM plans",
      "Full English customer support by phone",
      "Physical SIM or eSIM available",
      "Best for stays of 1 month+",
    ],
    cons: [
      "Higher price than data-only options",
      "Requires advance order for physical SIM",
      "Not ideal for short trips",
    ],
    summary:
      `Sakura Mobile is the Japan-based option with English phone support and (on its SIM plans) a real Japanese phone number. Travel eSIMs start at ${p(sakuraCheapest)} with 3 GB of high-speed data per day, or go unlimited on au/KDDI. Pricier than the resellers, but the pick if you need local support or a number.`,
  },
];

const dealTips = [
  {
    trip: "Short trip (up to 7 days)",
    pick: simbyeCheapest ? `Simbye ${simbyeCheapest.name} — ${priceOf(simbyeCheapest)}` : "Simbye 1 GB",
    why: "Covers light tourist data use (maps, messaging) for the lowest outlay in this comparison.",
    url: SIMBYE_URL,
  },
  {
    trip: "Two-week trip",
    pick: simbye5 ? `Simbye ${simbye5.name} — ${priceOf(simbye5)}` : "Simbye 5 GB",
    why: "Plenty of data for navigation, translation apps, and social media over two weeks.",
    url: SIMBYE_URL,
  },
  {
    trip: "One-month stay",
    pick: `Simbye 10 GB (${priceOf(simbye10)}) or Sakura Mobile (from ${priceOf(sakuraCheapest)})`,
    why: "Simbye if data-only is fine; Sakura Mobile if you want English phone support or a Japanese number.",
    url: SIMBYE_URL,
  },
  {
    trip: "Heavy data user",
    pick: `Holafly Unlimited — from ${priceOf(holaflyCheapest)}`,
    why: "Stream video, use your phone as a hotspot, or simply stop worrying about data altogether.",
    url: AIRALO_URL,
  },
];

const faqItems = [
  {
    q: "What is the cheapest 10 GB eSIM for Japan?",
    a: `${rowLabel(cheapestTwo(10)[0])} at ${priceOf(cheapestTwo(10)[0] ?? null)}, ahead of ${rowLabel(cheapestTwo(10)[1])} at ${priceOf(cheapestTwo(10)[1] ?? null)}, as of ${pricesCheckedAt}. Both prices are list prices before any discount code, and both are data only.`,
  },
  {
    q: "Is an eSIM cheaper than a physical SIM in Japan?",
    a: `Yes, on published prices. Sakura Mobile's Travel SIM starts at ¥3,850 with tax and its Travel eSIM at ¥1,375 (read on sakuramobile.jp on 6 Nov 2026), and the cheapest eSIM compared here is ${cheapestOverall ? formatUsd(cheapestOverall.priceUsd) : "under $2"}. A physical SIM makes sense when your phone cannot take an eSIM; our airport SIM card guide lists where to buy one on arrival.`,
  },
  {
    q: "What is the cheapest eSIM for Japan?",
    a: `As of ${pricesCheckedAt}, ${cheapestOverall ? `${cheapestOverall.provider} is the cheapest Japan eSIM compared here, at ${priceOf(cheapestOverall)} for ${cheapestOverall.name}` : "Simbye is usually the cheapest Japan eSIM"}. eSIM Go starts at ${p(esimgoCheapest)} and Airalo at ${p(airaloCheapest)}. All three are data-only eSIMs installed from a QR code or link. Prices on this page are re-checked every day.`,
  },
  {
    q: "Is a cheap eSIM reliable in Japan?",
    a: "Yes. Cheap eSIMs like Simbye (NTT docomo, KDDI/au, SoftBank and Rakuten Mobile in its feed), eSIM Go (Docomo among its networks) and Airalo (SoftBank as the primary network on its Japan page, checked 1 November 2026) run on the same national networks used by expensive plans. Network quality in Japan is world-class regardless of which reseller you buy from — you're paying less for distribution, not for a worse connection.",
  },
  {
    q: "How much data do I need for 1 week in Japan?",
    a: "For typical tourist use — Google Maps, messaging apps, light social media — 1 GB is usually enough for a week. If you plan to stream video, use a hotspot, or navigate heavily, go for 3–5 GB. Heavy users (constant streaming, working remotely) should consider an unlimited plan like Holafly.",
  },
  {
    q: "Can I top up a cheap eSIM in Japan?",
    a: "Yes, with Airalo. You can purchase an additional plan from the Airalo app while in Japan and it tops up your existing profile without scanning a new QR code. eSIM Go also allows additional data purchases, though the process varies. Holafly's unlimited plan means you'll never need a top-up.",
  },
  {
    q: "Is eSIM cheaper than roaming in Japan?",
    a: `Almost always, yes. Most international roaming plans charge $10–15 per day. Simbye starts at ${p(simbyeCheapest)} — less than a single day of roaming. Even Holafly's unlimited plan at ${p(holaflyCheapest)} works out far cheaper than roaming charges for the same period.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/cheapest-esim-japan") } });

// Owns "cheapest eSIM Japan": the subject is price, sorted by size and per GB. "Best" belongs
// to best-esim-japan (a pick per trip) and the Reddit angle to best-esim-japan-reddit.
const FROM = cheapestOverall ? formatUsd(cheapestOverall.priceUsd) : "$1.99";
const TITLE = `Cheapest eSIM for Japan 2026: From ${FROM}, Ranked by Price`;
const H1 = "Cheapest eSIM for Japan 2026: Lowest Price at Every Data Size";
const DESCRIPTION = `The cheapest confirmed Japan eSIM plan is ${FROM}, checked daily. Lowest price at 1, 3, 5, 10, 20 and 50 GB, plus price per GB by trip length.`;

export default function CheapestEsimJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/cheapest-esim-japan" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/cheapest-esim-japan" />
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
              route: "/guides/esim/cheapest-esim-japan",
              headline: H1,
              updated,
            }),
          }}
        />
        {SIMBYE_FIXED.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: productOfferJsonLd({
                route: "/guides/esim/cheapest-esim-japan",
                name: "Simbye Japan eSIM",
                description: "Data-only Japan eSIM on NTT docomo, KDDI/au, SoftBank and Rakuten Mobile, the lowest list price in this comparison.",
                brand: "Simbye",
                currency: "USD",
                lowPrice: Math.min(...SIMBYE_FIXED.map((plan) => plan.priceUsd)),
                highPrice: Math.max(...SIMBYE_FIXED.map((plan) => plan.priceUsd)),
                offerCount: SIMBYE_FIXED.length,
              }),
            }}
          />
        )}
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
                { "@type": "ListItem", position: 4, name: "Cheapest eSIM for Japan", item: "https://www.japan-travel-kit.com/guides/esim/cheapest-esim-japan" },
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
          <span className={styles.breadCurrent}>Cheapest eSIM for Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Prices checked {pricesCheckedAt}
          </p>
          <h1 className={styles.heroTitle}>
            Cheapest eSIM for Japan 2026:<br />Lowest Price at Every Data Size
          </h1>
          <p className={styles.heroSubtitle}>
            Which Japan eSIM is cheapest at 1, 3, 5, 10, 20 and 50 GB, what each costs per gigabyte, and the cheapest plan for your trip length.
          </p>
          <div className={styles.heroBadges}>
            {["Prices checked daily", "5 eSIMs ranked on price", "Read from official sites"].map((t) => (
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

        {/* The answer, in the first sentence on the page. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            The <strong>cheapest eSIM for Japan</strong> is{" "}
            {cheapestOverall ? <strong>{cheapestOverall.provider} {cheapestOverall.name} at {FROM}</strong> : "Simbye"}, and
            at the size most tourists need it is <strong>{rowLabel(cheapestTwo(10)[0])} at {priceOf(cheapestTwo(10)[0] ?? null)}</strong>{" "}
            (list prices in USD, checked {pricesCheckedAt}). The lowest headline price is not always the lowest cost
            per gigabyte, so both are below. Cheap here does not mean a weaker network: the
            same Japanese carriers sit behind every plan. For picks by trip type rather than by price, see our{" "}
            <Link href="/guides/esim/best-esim-japan" className={tools.inlineLink}>best eSIM for Japan guide</Link>; for
            what travellers say, our{" "}
            <Link href="/guides/esim/best-esim-japan-reddit" className={tools.inlineLink}>Reddit advice check</Link>; and if
            you need no cap at all, the{" "}
            <Link href="/guides/esim/japan-esim-unlimited" className={tools.inlineLink}>unlimited eSIM comparison</Link>.
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer · prices checked {pricesCheckedAt}</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest Confirmed Plan</p>
                <p className={styles.verdictStatValue}>
                  {cheapestOverall ? `${cheapestOverall.provider} ${cheapestOverall.name} — ${formatUsd(cheapestOverall.priceUsd)}` : "—"}
                </p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest Unlimited (7+ days)</p>
                <p className={styles.verdictStatValue}>
                  {cheapestUnlimitedAny ? `${cheapestUnlimitedAny.provider} ${cheapestUnlimitedAny.name} — ${formatUsd(cheapestUnlimitedAny.priceUsd)}` : "—"}
                </p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest 30-Day (10 GB+)</p>
                <p className={styles.verdictStatValue}>
                  {cheapestLongStay ? `${cheapestLongStay.provider} ${cheapestLongStay.name} — ${formatUsd(cheapestLongStay.priceUsd)}` : "—"}
                </p>
              </div>
            </div>
            {cheapestOverall && (
              <ProviderCta providerId={cheapestOverall.providerId} className={styles.verdictBtn} label={`Get ${cheapestOverall.provider} Japan (from ${formatUsd(cheapestOverall.priceUsd)}) →`} />
            )}
          </div>
        </div>

        <SimbyeOffer />
        <div data-placement="esim-page-answer">
          <EsimAltLinks />
        </div>

        {/* Price Comparison Table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>At a glance</span>
          <h2 className={styles.sectionTitle} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
            Price Comparison
            <span className={tools.liveBadge}><span className={tools.liveDot} /> Prices checked daily</span>
          </h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Provider", "1 GB+", "5 GB+", "10 GB+", "Unlimited", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceTable.map((row) => (
                    <tr key={row.id}>
                      <td className={styles.tdProvider} style={{ fontWeight: 700 }}>{row.provider}</td>
                      {row.tiers.map((plan, i) => (
                        <td key={TIERS[i]} className={plan ? styles.tdPrice : tools.tdMuted}>{cell(plan)}</td>
                      ))}
                      <td className={row.unlimited ? styles.tdPrice : tools.tdMuted}>{cell(row.unlimited)}</td>
                      <td><ProviderCta providerId={row.id} label="Buy →" /></td>
                    </tr>
                  ))}
                  {/* Klook also sells a Japan eSIM. Its listing blocks automated price reads, so it
                      gets a row but no numbers — and it cannot be ranked on price against the five above. */}
                  <tr>
                    <td className={styles.tdProvider} style={{ fontWeight: 700 }}>{klookEsim.name}</td>
                    {[...TIERS, "unlimited"].map((tier) => (
                      <td key={String(tier)} className={tools.tdMuted}>{klookEsim.priceUnknownLabel}</td>
                    ))}
                    <td>
                      <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                        Open →
                      </KlookLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Each cell is the provider&apos;s cheapest plan with <em>at least</em> that much data, in USD, read from the provider&apos;s
            official site on {pricesCheckedAt}. All plans are eSIM-only. Klook&apos;s listing shows
            from US$1.05 (read {klookEsim.specsCheckedAt}) before you choose days and data and does not say
            which plan that is, so its row has no per-plan prices, it is not ranked here, and no claim
            is made about whether a given plan undercuts the five above.{" "}
            <Link href="/guides/esim/japan-esim-data-plans" className={tools.inlineLink}>See every plan sorted by price per GB →</Link>{" "}
            All providers&apos; prices — the five here plus Ubigi, Nomad, Jetpac, aloSIM, Yesim, Maya Mobile, Mobal, Japan
            Wireless and eSIM.net — are in our{" "}
            <Link href="/guides/esim/japan-esim-price-tracker" className={tools.inlineLink}>Japan eSIM price tracker</Link>, updated monthly.
          </p>
        </section>

        {/* Cheapest by data size, with the runner-up, then price per GB. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By size</span>
          <h2 className={styles.sectionTitle}>What Is the Cheapest Japan eSIM at Each Data Size?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["You need", "Cheapest", "Price", "Next cheapest", "Price"].map((h, i) => (
                      <th key={`${h}-${i}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SIZE_ROWS.map(({ gb, plans }) => (
                    <tr key={gb}>
                      <td className={styles.tdProvider}>{gb} GB or more</td>
                      <td className={styles.tdNetwork}>{rowLabel(plans[0])}</td>
                      <td className={styles.tdPrice}>{priceOf(plans[0] ?? null)}</td>
                      <td className={styles.tdNetwork}>{rowLabel(plans[1])}</td>
                      <td className={styles.tdPrice}>{priceOf(plans[1] ?? null)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <h2 className={styles.sectionTitle} style={{ marginTop: "2rem" }}>Which Japan eSIM Is Cheapest per GB?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Plan", "Price", "Per GB", "Valid for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {perGbRows.map((row) => (
                    <tr key={row.id}>
                      <td className={styles.tdProvider}>{row.provider} {row.gb} GB</td>
                      <td className={styles.tdPrice}>{formatUsd(row.priceUsd)}</td>
                      <td className={styles.tdPrice}>{formatUsd(pricePerGb(row) ?? 0)}</td>
                      <td className={styles.tdNetwork}>{row.days} days</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Fixed-allowance plans only, read from each provider&apos;s official site on {pricesCheckedAt}. Unlimited
            plans and Sakura Mobile&apos;s 3 GB/day plans are left out because a daily cap has no comparable price per GB.
            A plan&apos;s validity is part of its price: check it covers your whole trip before you buy the lowest figure.
          </p>
        </section>

        {/* The five, ranked on price */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Rankings</span>
          <h2 className={styles.sectionTitle}>The Five Cheapest Japan eSIMs, Ranked by Price</h2>

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

          {/* Fifth slot, outside the ranking — no verified price to rank it on. */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <h3 className={styles.sectionTitle} style={{ margin: 0, fontSize: "1.2rem" }}>
                {klookEsim.name}
                <span style={{
                  display: "inline-block",
                  marginLeft: "0.6rem",
                  background: "var(--text-muted)",
                  color: "#fff",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "var(--radius-sm)",
                  verticalAlign: "middle",
                }}>Unranked — price not verified</span>
              </h3>
            </div>
            <p className={styles.bodyText}>{klookEsim.note}</p>
            <KlookLink
              href={klookEsim.url}
              className={styles.pickCta}
              target="_blank"
              rel="sponsored noopener"
              style={{ marginTop: "0.5rem" }}
            >
              {klookEsim.ctaLabel}
            </KlookLink>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
              Listed on Klook as &ldquo;{klookEsim.listingTitle}&rdquo;. Last attempted read: {klookEsim.checkedAt}.
            </p>
          </div>
        </section>

        {/* Cheapest by trip length */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Buying guide</span>
          <h2 className={styles.sectionTitle}>Cheapest Japan eSIM by Trip Length</h2>
          <div className={styles.stepsList}>
            {dealTips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.trip}</p>
                  <p className={styles.stepDesc}>
                    <strong>{tip.pick}</strong> — {tip.why}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Are Cheap eSIMs Reliable */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Network quality</span>
          <h2 className={styles.sectionTitle}>Are Cheap eSIMs Reliable in Japan?</h2>
          <p className={styles.bodyText}>
            Yes — and here&apos;s why. Japan&apos;s mobile infrastructure is among the best in the world.
            Docomo and SoftBank — Docomo among eSIM Go&apos;s networks, SoftBank the primary network on
            Airalo&apos;s Japan page (checked 1 November 2026) — consistently rank among the world&apos;s top 10 for 4G coverage and download speeds.
          </p>
          <p className={styles.bodyText}>
            When you buy a cheap eSIM for Japan, you&apos;re not buying a worse network — you&apos;re buying
            the same Docomo or SoftBank signal at a lower price. The cost savings come from lower
            distribution overhead (no physical SIM cards, no airport kiosks) and competitive
            reseller pricing, not from degraded network access.
          </p>
          <p className={styles.bodyText}>
            In practice, Simbye, eSIM Go and Airalo all provide the same download speeds and coverage as
            plans that cost three times more. The main trade-off at lower price points is customer
            support quality — eSIM Go offers email-only support, while Airalo has 24/7 live chat.
            For most travellers who just need their eSIM to work, support rarely comes up.
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
            {/* "Cheapest" only means something once you know how much data the trip needs —
                /guides/esim/japan-esim-7-days and the 3, 5 and 10-day pages all 301 to the
                data-plans guide, which is where that sizing answer now lives. */}
            <Link href="/guides/esim/japan-esim-data-plans" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan eSIM Data Plans 2026: How Much Data Do You Need?</p>
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
            <Link href="/guides/esim/esim-go-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>eSIM Go Japan Review 2026: Best Budget eSIM?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/pocket-wifi-vs-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Pocket WiFi vs eSIM for Japan (2026): Which Is Better?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan-reddit" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan Reddit (2026): Which Advice Still Holds</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* The counterweight to a budget ranking: what the expensive option buys you. */}
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
              See how Simbye, eSIM Go, Airalo, Holafly, and Sakura Mobile compare on price, coverage, and features.
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
