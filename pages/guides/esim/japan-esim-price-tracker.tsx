import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import tools from "../../../styles/Tools.module.css";
import EsimPriceTrackerTable, { TrackerBuyButton, type BuyLink } from "../../../components/EsimPriceTrackerTable";
import raw from "../../../data/esim-prices.json";
import { buildRows, summarize, type TrackerRow } from "../../../lib/esim-tracker-core";
import { formatDate, getProvider } from "../../../lib/esim-prices";
import { klookEsim } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { ORGANIZATION_ID, SITE_NAME, SITE_URL, articleJsonLd } from "../../../lib/structured-data";

/**
 * Japan eSIM price tracker — the site's primary price data, laid out to be cited.
 *
 * Every number on this page is computed from data/esim-prices.json through
 * lib/esim-tracker-core.js; the same module writes public/data/japan-esim-prices.csv in
 * prebuild. The monthly update is: re-read the providers in `tracker.providers`, edit
 * the JSON, bump `checkedOn` and `fx`. Nothing in this file needs touching.
 */

const ROUTE = "/guides/esim/japan-esim-price-tracker";
const PAGE_URL = `${SITE_URL}${ROUTE}`;
const CSV_PATH = "/data/japan-esim-prices.csv";

type TrackerData = {
  tracker: {
    updatePolicy: string;
    fx: { date: string; source: string; sourceUrl: string; perUsd: Record<string, number> };
    autoFacts: Record<string, { name: string; factsCheckedOn: string }>;
    providers: { id: string; name: string; officialUrl: string; sourceUrl: string; checkedOn: string }[];
    unpriced: {
      id: string;
      name: string;
      officialUrl: string;
      checkedOn: string;
      carriers: string | null;
      tethering: string | null;
      phoneNumber: string | null;
      reason: string;
    }[];
  };
};

const data = raw as unknown as TrackerData;
const rows: TrackerRow[] = buildRows(raw);
const sum = summarize(rows);
const fx = data.tracker.fx;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const lastChecked = sum.lastChecked ?? "";
const monthLabel = lastChecked ? `${MONTHS[Number(lastChecked.slice(5, 7)) - 1]} ${lastChecked.slice(0, 4)}` : "";
const d = (iso: string | null) => formatDate(iso);
const usd = (n: number | null | undefined) => (n === null || n === undefined ? "—" : `$${n.toFixed(2)}`);
const names = (list: TrackerRow[]) => Array.from(new Set(list.map((r) => r.provider))).join(" and ");

/** Buttons: partner links for the three providers that pay, the official site for the rest. */
const PARTNER_IDS = new Set(["simbye", "sakura"]);
const links: Record<string, BuyLink> = {};
for (const r of rows) {
  if (links[r.providerId]) continue;
  if (PARTNER_IDS.has(r.providerId)) {
    const p = getProvider(r.providerId as "simbye" | "sakura");
    links[r.providerId] = { href: p.affiliateUrl, label: `Buy ${p.name} →`, kind: "partner" };
  } else {
    links[r.providerId] = { href: r.officialUrl, label: "Official site", kind: "official" };
  }
}
links.klook = { href: klookEsim.url, label: "Check Klook →", kind: "klook" };

/** One line per provider, ordered by its lowest price per GB (unlimited-only providers last, by 7-day price). */
type ProviderLine = {
  id: string;
  name: string;
  plans: number;
  cheapest: TrackerRow;
  bestPerGb: TrackerRow | null;
  unl7: TrackerRow | null;
  carriers: string | null;
  tethering: string | null;
  phoneNumber: string | null;
  checkedOn: string | null;
  sourceUrl: string;
};
const minBy = <T,>(list: T[], f: (x: T) => number) => (list.length ? list.reduce((a, b) => (f(b) < f(a) ? b : a)) : null);
const providerLines: ProviderLine[] = Array.from(new Set(rows.map((r) => r.providerId)))
  .map((id) => {
    const mine = rows.filter((r) => r.providerId === id);
    const first = mine[0];
    const carriers = Array.from(new Set(mine.map((r) => r.carriers).filter(Boolean))).join("; ") || null;
    return {
      id,
      name: first.provider,
      plans: mine.length,
      cheapest: minBy(mine, (r) => r.priceUsd)!,
      bestPerGb: minBy(mine.filter((r) => r.perGbUsd !== null), (r) => r.perGbUsd!),
      unl7: minBy(mine.filter((r) => r.unlimited && r.days === 7), (r) => r.priceUsd),
      carriers,
      tethering: first.tethering,
      phoneNumber: first.phoneNumber,
      checkedOn: first.checkedOn,
      sourceUrl: data.tracker.providers.find((p) => p.id === id)?.sourceUrl ?? first.sourceUrl,
    };
  })
  .sort(
    (a, b) =>
      (a.bestPerGb?.perGbUsd ?? Infinity) - (b.bestPerGb?.perGbUsd ?? Infinity) ||
      (a.unl7?.priceUsd ?? Infinity) - (b.unl7?.priceUsd ?? Infinity) ||
      a.cheapest.priceUsd - b.cheapest.priceUsd
  );

const unpriced = data.tracker.unpriced;
const providersListed = providerLines.length + unpriced.length;
const nonUsd = Array.from(new Set(rows.filter((r) => r.currency !== "USD").map((r) => r.currency)));
const perGbTop = sum.cheapestPerGb;
const unl7Top = sum.cheapestUnlimited7All;
const cheapest7Fixed = minBy(rows.filter((r) => r.days === 7 && !r.unlimited), (r) => r.priceUsd);

const ANSWER = `Lowest price per GB: ${perGbTop ? `${perGbTop.provider} ${perGbTop.plan} at ${usd(perGbTop.perGbUsd)}/GB` : "—"}. Cheapest 7-day unlimited: ${
  unl7Top.length ? `${names(unl7Top)} at ${usd(unl7Top[0].priceUsd)}` : "—"
} (checked ${d(sum.lastChecked)}).`;
const CITE = `${SITE_NAME}, "Japan eSIM Price Tracker", ${PAGE_URL} (prices checked ${d(sum.firstChecked)}–${d(sum.lastChecked)}).`;

const TITLE = `Japan eSIM Price Tracker (${monthLabel}): ${sum.providers} Providers per GB`;
const H1 = "Japan eSIM Price Tracker: Every Provider's Price per GB";
const DESCRIPTION = `${sum.plans} Japan eSIM plans from ${sum.providers} providers, read on official sites. Cheapest per GB: ${
  perGbTop ? `${perGbTop.provider} ${usd(perGbTop.perGbUsd)}` : "—"
}. Free CSV, re-checked monthly.`;

const faqItems = [
  {
    q: "Which Japan eSIM is cheapest per GB?",
    a: `${perGbTop ? `${perGbTop.provider}'s ${perGbTop.plan} plan, at ${usd(perGbTop.perGbUsd)} per GB (${usd(perGbTop.priceUsd)} in total)` : "—"}, of the ${sum.plans} plans read on ${sum.providers} providers' official sites between ${d(sum.firstChecked)} and ${d(sum.lastChecked)}. The median of each provider's lowest price per GB is ${usd(sum.medianBestPerGbByProvider)}. Large allowances always win on this measure, so check the plan's validity covers your trip.`,
  },
  {
    q: "What is the cheapest unlimited eSIM for Japan for a week?",
    a: `${unl7Top.length ? `${names(unl7Top)}, at ${usd(unl7Top[0].priceUsd)} for 7 days` : "—"}. The median 7-day unlimited plan across the ${sum.unlimited7Count} sold is ${usd(sum.medianUnlimited7)}. "Unlimited" means different things: most providers slow you down after a daily or total high-speed allowance, and the note under each plan in the table says what that provider publishes.`,
  },
  {
    q: "How are prices in yen converted to US dollars?",
    a: `Prices are recorded in the currency the provider's site shows. ${nonUsd.length ? `${nonUsd.join(" and ")} prices are converted at the European Central Bank reference rate of ${fx.date} (1 USD = ${nonUsd.map((c) => `${fx.perUsd[c]} ${c}`).join(", ")}).` : ""} The original price is shown under the USD figure and kept in the CSV.`,
  },
  {
    q: "How often is the tracker updated?",
    a: `${data.tracker.updatePolicy} Each row carries its own check date and a link to the page it was read from.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function JapanEsimPriceTracker({ updated }: { updated: PageUpdated }) {
  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Japan eSIM Price Tracker",
    description: `Prices of ${sum.plans} Japan eSIM plans from ${sum.providers} providers, read from each provider's official Japan page, with data allowance, validity, price in the original currency, USD conversion, USD per GB, network, tethering, phone number, check date and source PAGE_URL for every plan.`,
    url: PAGE_URL,
    keywords: ["Japan eSIM", "eSIM prices", "price per GB", "travel eSIM", "Japan mobile data"],
    dateModified: sum.lastChecked,
    temporalCoverage: `${sum.firstChecked}/${sum.lastChecked}`,
    spatialCoverage: { "@type": "Place", name: "Japan" },
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by/4.0/",
    creator: { "@type": "Organization", "@id": ORGANIZATION_ID, name: SITE_NAME, url: SITE_URL },
    publisher: { "@id": ORGANIZATION_ID },
    variableMeasured: ["data_gb", "days", "price", "currency", "price_usd", "usd_per_gb", "carriers", "tethering", "japanese_phone_number", "checked_on", "source_url"],
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "text/csv",
        contentUrl: `${SITE_URL}${CSV_PATH}`,
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: articleJsonLd({ route: ROUTE, headline: H1, updated }) }}
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
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: `${SITE_URL}/guides/esim` },
                { "@type": "ListItem", position: 4, name: "Japan eSIM Price Tracker", item: PAGE_URL },
              ],
            }),
          }}
        />
      </Head>

      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          <span className={styles.breadSep}>›</span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <span className={styles.breadSep}>›</span>
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <span className={styles.breadSep}>›</span>
          <span className={styles.breadCurrent}>Japan eSIM Price Tracker</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Prices checked {d(sum.firstChecked)}–{d(sum.lastChecked)}</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            {sum.plans} plans from {sum.providers} providers, each read on the provider&apos;s own Japan page, with the date
            and the link for every row. Sort it, filter it, or download the CSV.
          </p>
          <div className={styles.heroBadges}>
            {[`${sum.providers} providers priced`, `${sum.plans} plans`, "Free CSV download", "Re-checked monthly"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Simbye, Sakura Mobile and Klook pay us a commission on purchases through
            their buttons below. That changes the button, never the order: every table here is sorted by price, and the other
            providers get a plain link to their official site.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* The answer and the method, in the first two sentences. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            We read the Japan eSIM prices of <strong>{providersListed} providers</strong> on their own official sites between{" "}
            {d(sum.firstChecked)} and {d(sum.lastChecked)} and could record per-plan prices for{" "}
            <strong>{sum.providers} of them ({sum.plans} plans)</strong>. The lowest price per GB is{" "}
            <strong>
              {perGbTop ? `${perGbTop.provider} ${perGbTop.plan} at ${usd(perGbTop.perGbUsd)}/GB` : "—"}
            </strong>{" "}
            against a median of {usd(sum.medianBestPerGbByProvider)} for each provider&apos;s best plan, and the cheapest 7-day
            unlimited plan is{" "}
            <strong>{unl7Top.length ? `${usd(unl7Top[0].priceUsd)} from ${names(unl7Top)}` : "—"}</strong> (median{" "}
            {usd(sum.medianUnlimited7)} across {sum.unlimited7Count} plans).
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Summary · computed from the data below · {d(sum.lastChecked)}</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Lowest price per GB</p>
                <p className={styles.verdictStatValue}>
                  {perGbTop ? `${perGbTop.provider} — ${usd(perGbTop.perGbUsd)}/GB (${perGbTop.plan}, ${usd(perGbTop.priceUsd)})` : "—"}
                </p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest 7-day unlimited</p>
                <p className={styles.verdictStatValue}>
                  {unl7Top.length ? `${names(unl7Top)} — ${usd(unl7Top[0].priceUsd)}` : "—"}
                </p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest 7-day fixed plan</p>
                <p className={styles.verdictStatValue}>
                  {cheapest7Fixed ? `${cheapest7Fixed.provider} ${cheapest7Fixed.plan} — ${usd(cheapest7Fixed.priceUsd)}` : "—"}
                </p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Median price per GB (all fixed plans)</p>
                <p className={styles.verdictStatValue}>{usd(sum.medianPerGb)}</p>
              </div>
            </div>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By plan</span>
          <h2 className={styles.sectionTitle}>Japan eSIM Prices by Trip Length: 7, 15, 30 Days and Unlimited</h2>
          <p className={styles.bodyText}>
            Pick a trip length, then sort by any column. Plans start in price order; the unlimited view starts in price per day.
            Price per GB is left blank for unlimited plans and for daily-allowance plans, where a total has no comparable
            meaning.
          </p>
          <EsimPriceTrackerTable rows={rows} links={links} />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The date in each row links to the official page the price was read from.{" "}
            {nonUsd.length > 0 &&
              `${nonUsd.join(" and ")} prices are converted to USD at the ECB reference rate of ${fx.date} (1 USD = ${nonUsd
                .map((c) => `${fx.perUsd[c]} ${c}`)
                .join(", ")}); the price on the provider's site is shown underneath. `}
            List prices, before any discount code. Where a provider marks a price as a sale, the note says so.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By provider</span>
          <h2 className={styles.sectionTitle}>All {providersListed} Japan eSIM Providers Checked</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Provider", "Plans", "Lowest USD/GB", "7-day unlimited", "Cheapest plan", "Network", "Tethering", "Japanese number", "Checked", ""].map((h, i) => (
                      <th key={`${h}-${i}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {providerLines.map((p) => (
                    <tr key={p.id}>
                      <td className={styles.tdProvider} style={{ fontWeight: 700 }}>{p.name}</td>
                      <td className={styles.tdNetwork}>{p.plans}</td>
                      <td className={styles.tdPrice}>
                        {p.bestPerGb ? (
                          <>
                            {usd(p.bestPerGb.perGbUsd)}
                            <span className={tools.tdNote}>{p.bestPerGb.plan}</span>
                          </>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className={styles.tdPrice}>{p.unl7 ? usd(p.unl7.priceUsd) : ""}</td>
                      <td className={styles.tdPrice}>
                        {usd(p.cheapest.priceUsd)}
                        <span className={tools.tdNote}>{p.cheapest.plan}</span>
                      </td>
                      <td className={styles.tdNetwork}>{p.carriers ?? ""}</td>
                      <td className={styles.tdNetwork}>{p.tethering ?? ""}</td>
                      <td className={styles.tdNetwork}>{p.phoneNumber ?? ""}</td>
                      <td className={styles.tdNetwork}>
                        <a href={p.sourceUrl} target="_blank" rel="nofollow noopener noreferrer" style={{ color: "var(--text-muted)" }}>
                          {p.checkedOn}
                        </a>
                      </td>
                      <td>{links[p.id] && <TrackerBuyButton link={links[p.id]} />}</td>
                    </tr>
                  ))}
                  {unpriced.map((p) => (
                    <tr key={p.id}>
                      <td className={styles.tdProvider} style={{ fontWeight: 700 }}>
                        {p.name}
                        <span className={tools.tdNote}>No per-plan price recorded</span>
                      </td>
                      <td className={tools.tdMuted} />
                      <td className={tools.tdMuted} />
                      <td className={tools.tdMuted} />
                      <td className={tools.tdMuted} />
                      <td className={styles.tdNetwork}>{p.carriers ?? ""}</td>
                      <td className={styles.tdNetwork}>{p.tethering ?? ""}</td>
                      <td className={styles.tdNetwork}>{p.phoneNumber ?? ""}</td>
                      <td className={styles.tdNetwork}>
                        {/* Klook's own row: its button below is the link, carrying this page's ad id. */}
                        {p.id === "klook" ? (
                          p.checkedOn
                        ) : (
                          <a href={p.officialUrl} target="_blank" rel="nofollow noopener noreferrer" style={{ color: "var(--text-muted)" }}>
                            {p.checkedOn}
                          </a>
                        )}
                      </td>
                      <td>
                        <TrackerBuyButton link={links[p.id] ?? { href: p.officialUrl, label: "Official site", kind: "official" }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Ordered by each provider&apos;s lowest price per GB; providers that sell only unlimited plans follow, by 7-day price.
            A blank cell means the provider does not publish that fact on the page we read — we leave it blank rather than
            guess. Network, tethering and phone-number facts for Airalo, Holafly, eSIM Go, Sakura Mobile and Simbye were read
            on {d(data.tracker.autoFacts.airalo.factsCheckedOn)} ({d(data.tracker.autoFacts.simbye.factsCheckedOn)} for Simbye);
            their prices are re-read every day.
          </p>
          <ul className={styles.bodyText} style={{ fontSize: "0.85rem", paddingLeft: "1.2rem" }}>
            {unpriced.map((p) => (
              <li key={p.id} style={{ marginBottom: "0.4rem" }}>
                <strong>{p.name}:</strong> {p.reason}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Method</span>
          <h2 className={styles.sectionTitle}>How the Prices Were Collected</h2>
          <ul className={styles.bodyText} style={{ paddingLeft: "1.2rem" }}>
            <li>
              Only single-country Japan plans sold on each provider&apos;s own site. Regional Asia plans, marketplaces that resell
              other brands, and Mobal&apos;s monthly Voice + Data plans (billed per month, not for a fixed number of days) are left out.
              Maya Mobile&apos;s Japan page sells its global unlimited plans, so those are included and labelled.
            </li>
            <li>
              Airalo, Holafly, eSIM Go, Sakura Mobile and Simbye are read automatically once a day; their check date is the day of
              the last successful read. The other providers were read by hand and are re-checked on the 1st of every month.
            </li>
            <li>
              Prices are list prices in the currency the site shows. USD conversions use the European Central Bank reference rate
              of {fx.date} (<a href={fx.sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className={tools.inlineLink}>source</a>).
            </li>
            <li>Price per GB is price ÷ GB, rounded to the cent. No speed tests or experience claims: these are published prices and terms only.</li>
          </ul>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Data</span>
          <h2 className={styles.sectionTitle}>Download and Cite This Data</h2>
          <p className={styles.bodyText}>
            The full table — every plan, its original price and currency, the USD conversion and rate, price per GB, network,
            tethering, phone number, check date and source PAGE_URL — is a free CSV:{" "}
            <a href={CSV_PATH} className={tools.inlineLink} download>
              japan-esim-prices.csv
            </a>{" "}
            ({sum.plans} rows). You may reuse it under{" "}
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer license" className={tools.inlineLink}>
              CC BY 4.0
            </a>{" "}
            with a link back to this page.
          </p>
          <p className={styles.bodyText} style={{ marginBottom: "0.4rem" }}>
            <strong>Cite this data</strong>
          </p>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              background: "var(--paper-alt, #f6f5f2)",
              border: "1px solid var(--rule)",
              borderRadius: "var(--radius-sm)",
              padding: "0.8rem 1rem",
              fontSize: "0.85rem",
              userSelect: "all",
            }}
          >
            {CITE}
          </pre>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Short form: {ANSWER}
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Updates</span>
          <h2 className={styles.sectionTitle}>Last Checked and Update Policy</h2>
          <p className={styles.bodyText}>
            <strong>Last checked: {d(sum.lastChecked)}.</strong> {data.tracker.updatePolicy} When a provider changes a price
            between checks, its site is right and this table is out of date — the date and link on every row are there so you
            can see which.
          </p>
          <p className={styles.bodyText}>
            For a pick by trip type rather than raw price, read the{" "}
            <Link href="/guides/esim/best-esim-japan" className={tools.inlineLink}>best eSIM for Japan</Link>; for the lowest price at
            each data size, the <Link href="/guides/esim/cheapest-esim-japan" className={tools.inlineLink}>cheapest eSIM for Japan</Link>;
            for how much data a trip needs, the{" "}
            <Link href="/guides/esim/japan-esim-data-plans" className={tools.inlineLink}>Japan eSIM data plans guide</Link>; and for
            fair-use limits, the <Link href="/guides/esim/japan-esim-unlimited" className={tools.inlineLink}>unlimited eSIM comparison</Link>.
          </p>
        </section>

        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Common Questions</h2>
          <div className={styles.faqList}>
            {faqItems.map((item, i) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>
                    {i + 1}. {item.q}
                  </span>
                </summary>
                <div className={styles.faqBody}>{item.a}</div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
