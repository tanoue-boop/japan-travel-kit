import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import tools from "../../../styles/Tools.module.css";
import EsimPriceTrackerTable, { TrackerBuyButton, type BuyLink } from "../../../components/EsimPriceTrackerTable";
import raw from "../../../data/esim-prices.json";
import { buildRows, median, summarize, type TrackerRow } from "../../../lib/esim-tracker-core";
import { cheapestPlan, formatDate, getProvider } from "../../../lib/esim-prices";
import { klookEsim } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { ORGANIZATION_ID, SITE_NAME, SITE_URL, articleJsonLd } from "../../../lib/structured-data";
import BookingEsimCard from "../../../components/BookingEsimCard";

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
const simbyeFrom = cheapestPlan("simbye");
const cheapest7Fixed = minBy(rows.filter((r) => r.days === 7 && !r.unlimited), (r) => r.priceUsd);

const ANSWER = `Lowest price per GB: ${perGbTop ? `${perGbTop.provider} ${perGbTop.plan} at ${usd(perGbTop.perGbUsd)}/GB` : "—"}. Cheapest 7-day unlimited: ${
  unl7Top.length ? `${names(unl7Top)} at ${usd(unl7Top[0].priceUsd)}` : "—"
} (checked ${d(sum.lastChecked)}).`;
const CITE = `${SITE_NAME}, "Japan eSIM Price Tracker", ${PAGE_URL} (prices checked ${d(sum.firstChecked)}–${d(sum.lastChecked)}).`;

const rowLabel = (r: TrackerRow | null) => (r ? `${r.provider} ${r.plan} at ${usd(r.priceUsd)}` : "—");
const perDay = (r: TrackerRow) => r.priceUsd / r.days;
const isFixed = (r: TrackerRow) => !r.unlimited && !r.dailyCapGb;

/**
 * Cost by data size (R03, 22 Nov 2026): every plan with exactly that fixed allowance, or every
 * unlimited plan, with the lowest and median total, price per GB and price per day.
 */
type SizeLine = {
  label: string;
  plans: number;
  low: TrackerRow | null;
  medPrice: number | null;
  lowPerGb: number | null;
  medPerGb: number | null;
  lowPerDay: number | null;
  medPerDay: number | null;
};
const sizeLine = (label: string, mine: TrackerRow[]): SizeLine => {
  const gb = mine.map((r) => r.perGbUsd).filter((n): n is number => n !== null);
  const low = minBy(mine, (r) => r.priceUsd);
  const lowDay = minBy(mine, perDay);
  return {
    label,
    plans: mine.length,
    low,
    medPrice: median(mine.map((r) => r.priceUsd)),
    lowPerGb: gb.length ? Math.min(...gb) : null,
    medPerGb: median(gb),
    lowPerDay: lowDay ? perDay(lowDay) : null,
    medPerDay: median(mine.map(perDay)),
  };
};
const sizeLines: SizeLine[] = [
  ...[1, 3, 10, 20].map((gb) => sizeLine(`${gb} GB`, rows.filter((r) => isFixed(r) && r.gb === gb))),
  sizeLine("Unlimited", rows.filter((r) => r.unlimited)),
];
const fixedCount = rows.filter((r) => r.perGbUsd !== null).length;
const tenGb = sizeLines[2];

/**
 * Cost by trip length: plans sold for exactly that many days. 14 days also takes the 15-day
 * plans, because only a handful of providers sell a 14-day plan and most sell 15 days instead.
 */
type DayLine = {
  label: string;
  plans: number;
  low: TrackerRow | null;
  medPrice: number | null;
  lowUnl: TrackerRow | null;
  medUnl: number | null;
  medUnlPerDay: number | null;
};
const dayLines: DayLine[] = [
  { label: "5 days", days: [5] },
  { label: "7 days", days: [7] },
  { label: "10 days", days: [10] },
  { label: "14 days (14–15-day plans)", days: [14, 15] },
  { label: "30 days", days: [30] },
].map(({ label, days }) => {
  const mine = rows.filter((r) => days.includes(r.days));
  const unl = mine.filter((r) => r.unlimited);
  return {
    label,
    plans: mine.length,
    low: minBy(mine, (r) => r.priceUsd),
    medPrice: median(mine.map((r) => r.priceUsd)),
    lowUnl: minBy(unl, (r) => r.priceUsd),
    medUnl: median(unl.map((r) => r.priceUsd)),
    medUnlPerDay: median(unl.map(perDay)),
  };
});
const day7 = dayLines[1];
const day30 = dayLines[4];
const cheapestAll = sum.cheapestPlan;
const unlPerDayTop = sum.cheapestUnlimitedPerDay;

/**
 * Pocket WiFi and airport SIM, as sakuramobile.jp printed them on 22 Nov 2026: Pocket WiFi
 * unlimited ¥9,900 for 7 days (travel/wifi/), Travel SIM ¥3,850 and Travel eSIM ¥1,375,
 * tax included (travel/sim/, travel/esim/).
 */
const SAKURA_CHECKED = "2026-11-22";
const JPY = fx.perUsd.JPY;
const yenUsd = (yen: number) => `¥${yen.toLocaleString("en-US")}${JPY ? ` (about ${usd(yen / JPY)})` : ""}`;
const WIFI_7 = 9900;

// Split from cheapest-esim-japan (R04, 14 Nov 2026): this page owns the market price ("how much
// does it cost"), the cheapest page owns the single cheapest plan. R03 (22 Nov 2026): the landing
// queries are all "how much / cost", so title and H1 lead with the question; still one string.
const TITLE = "How Much Does an eSIM Cost in Japan? 2026 Price per GB & Day";
const H1 = TITLE;
const DESCRIPTION = `Japan eSIM cost: about ${usd(sum.medianPerGb)} price per GB, 7-day unlimited about ${usd(
  day7.medUnl
)} (${usd(day7.medUnlPerDay)} a day), cheapest ${usd(cheapestAll?.priceUsd)}. Updated ${d(sum.lastChecked)}. Buy via Simbye or Klook.`;

const faqItems = [
  {
    q: "How much does an eSIM cost in Japan?",
    a: `About ${usd(sum.medianPerGb)} per GB: that is the median of ${fixedCount} fixed-data Japan eSIM plans checked on the providers' official sites (last update ${d(sum.lastChecked)}). A 10 GB plan costs ${usd(tenGb.medPrice)} at the median and from ${usd(tenGb.low?.priceUsd)}; 7 days of unlimited data costs about ${usd(day7.medUnl)} (median of ${sum.unlimited7Count} plans, from ${usd(day7.lowUnl?.priceUsd)}). The cheapest plan of all is ${rowLabel(cheapestAll)}.`,
  },
  {
    q: "How much is an eSIM for Japan per day?",
    a: `About ${usd(day7.medUnlPerDay)} a day for unlimited data on a 7-day plan and ${usd(day30.medUnlPerDay)} a day on a 30-day plan (medians, checked ${d(sum.lastChecked)}). The lowest unlimited price per day is ${unlPerDayTop ? `${unlPerDayTop.provider} ${unlPerDayTop.plan}, ${usd(perDay(unlPerDayTop))} a day` : "—"}. A fixed 10 GB plan works out at ${usd(tenGb.medPerDay)} a day at the median.`,
  },
  {
    q: "Is a monthly eSIM cheaper for Japan?",
    a: `Per day, yes; in total, only if you stay long enough to use it. A 30-day unlimited plan costs ${usd(day30.medUnl)} at the median (${usd(day30.medUnlPerDay)} a day) against ${usd(day7.medUnl)} for 7 days (${usd(day7.medUnlPerDay)} a day), so for a one- or two-week trip the plan that matches your dates costs less.`,
  },
  {
    q: "Is an eSIM cheaper than a pocket WiFi or airport SIM in Japan?",
    a: `For one or two people, yes. Sakura Mobile's unlimited pocket WiFi is ${yenUsd(WIFI_7)} for 7 days per router, against ${usd(day7.medUnl)} for a median 7-day unlimited eSIM per person; split three ways, the router costs less per head. At the airport, Sakura Mobile's Travel SIM card is ¥3,850 against ¥1,375 for its Travel eSIM, tax included (sakuramobile.jp, ${SAKURA_CHECKED}).`,
  },
  {
    q: "When were these Japan eSIM prices last updated?",
    a: `The latest price check was ${d(sum.lastChecked)}. ${data.tracker.updatePolicy} Each row in the table carries its own check date and a link to the official page it was read from, so a row read on ${d(sum.firstChecked)} shows that date rather than today's.`,
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
            A daily Japan eSIM price tracker: {sum.plans} plans from {sum.providers} providers, each read on the
            provider&apos;s own Japan page, with the date and the link for every row.
          </p>
          <div className={styles.heroBadges}>
            {[`${sum.providers} providers priced`, `${sum.plans} plans`, "Free CSV download", "Re-checked daily or monthly"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* The answer in numbers, in the first paragraph of the body (R03, 22 Nov 2026). */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            A Japan travel eSIM costs about <strong>{usd(sum.medianPerGb)} per GB</strong> (the median of {fixedCount}{" "}
            fixed-data plans) and about <strong>{usd(day7.medUnl)} for 7 days of unlimited data</strong>, or{" "}
            {usd(day7.medUnlPerDay)} a day, on prices checked on the providers&apos; official sites up to{" "}
            {d(sum.lastChecked)}. The cheapest plan is <strong>{rowLabel(cheapestAll)}</strong>, and a 10 GB plan costs{" "}
            {usd(tenGb.medPrice)} at the median, from {usd(tenGb.low?.priceUsd)}. This page tracks the going rate; the
            single cheapest plan at each data size, with a pick, is in the{" "}
            <Link href="/guides/esim/cheapest-esim-japan" className={tools.inlineLink}>cheapest eSIM for Japan</Link> guide.
          </p>
        </section>

        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Simbye, Sakura Mobile and Klook pay us a commission on purchases through
            their buttons below. That changes the button, never the order: every table here is sorted by price, and the other
            providers get a plain link to their official site. The &quot;Answer&quot; row names our overall pick separately from
            the price ranking.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Klook eSIM (20%) and Simbye (25%) directly under the answer (R03, 22 Nov 2026); moved
            up from above the first table, so the pair still appears once in the first screens. */}
        <BookingEsimCard lead="Know the going rate? Set your eSIM up before you fly." />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By data size</span>
          <h2 className={styles.sectionTitle}>How much does an eSIM cost in Japan?</h2>
          <p className={styles.bodyText}>
            About {usd(sum.medianPerGb)} per GB and {usd(day7.medUnl)} for a week of unlimited data at the median. Bigger
            allowances cost less per GB: {usd(sizeLines[0].medPerGb)} per GB on a 1 GB plan against{" "}
            {usd(sizeLines[3].medPerGb)} on a 20 GB plan. How much data a trip needs is in the{" "}
            <Link href="/guides/esim/japan-esim-data-plans" className={tools.inlineLink}>Japan eSIM data plans guide</Link>.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Data", "Plans", "Lowest price", "Median price", "Price per GB (lowest – median)", "Price per day (median, lowest)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1 is the conclusion, with the Simbye button (25%) on the cheapest row. */}
                  <tr style={{ fontWeight: 700, background: "var(--paper)" }}>
                    <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>Answer</td>
                    <td colSpan={4} style={{ fontSize: "0.88rem" }}>
                      {`Japan eSIM cost: about ${usd(sum.medianPerGb)} per GB and ${usd(day7.medUnl)} for 7 days unlimited (medians). Cheapest plan: ${rowLabel(
                        cheapestAll
                      )}. Overall pick: Simbye${simbyeFrom ? ` (from ${usd(simbyeFrom.priceUsd)})` : ""}, on ${
                        getProvider("simbye").network
                      } — see the `}
                      <Link href="/guides/esim/best-esim-japan" className={tools.inlineLink}>best Japan eSIM guide</Link>.
                    </td>
                    <td>{links.simbye && <TrackerBuyButton link={links.simbye} />}</td>
                  </tr>
                  {sizeLines.map((l) => (
                    <tr key={l.label}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{l.label}</td>
                      <td className={styles.tdNetwork}>{l.plans}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>
                        {usd(l.low?.priceUsd)}
                        {l.low && <span className={tools.tdNote}>{`${l.low.provider} ${l.low.plan}`}</span>}
                      </td>
                      <td className={styles.tdPrice}>{usd(l.medPrice)}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>
                        {l.medPerGb === null ? "—" : `${usd(l.lowPerGb)} – ${usd(l.medPerGb)}`}
                      </td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>
                        {usd(l.medPerDay)}
                        <span className={tools.tdNote}>from {usd(l.lowPerDay)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {sum.lastChecked}. Plans with exactly that allowance, any validity; unlimited covers every
            unlimited plan, whatever its speed limit after a daily allowance. Price per day is the total price ÷ the
            plan&apos;s days. List prices before any discount code. Official pages:{" "}
            {providerLines.map((p, i) => (
              <span key={p.id}>
                {i > 0 ? ", " : ""}
                <a href={p.sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className={tools.inlineLink}>
                  {p.name}
                </a>
              </span>
            ))}
            .
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By trip length</span>
          <h2 className={styles.sectionTitle}>How much is an eSIM for Japan per day?</h2>
          <p className={styles.bodyText}>
            About {usd(day7.medUnlPerDay)} a day for unlimited data on a 7-day plan and {usd(day30.medUnlPerDay)} a day on a
            30-day plan, at the median; the lowest unlimited price per day is{" "}
            {unlPerDayTop ? `${unlPerDayTop.provider} ${unlPerDayTop.plan} (${usd(perDay(unlPerDayTop))} a day)` : "—"}. The
            plans for a{" "}
            <Link href="/guides/esim/japan-esim-10-days" className={tools.inlineLink}>10-day Japan eSIM</Link> and a{" "}
            <Link href="/guides/esim/japan-esim-2-weeks" className={tools.inlineLink}>2-week Japan eSIM</Link> are compared
            one by one on their own pages.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Trip length", "Plans", "Lowest price", "Median price", "Lowest unlimited", "Unlimited per day (median)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ fontWeight: 700, background: "var(--paper)" }}>
                    <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>Answer</td>
                    <td colSpan={5} style={{ fontSize: "0.88rem" }}>
                      {`A week costs ${usd(day7.medPrice)} at the median (from ${usd(day7.low?.priceUsd)}); unlimited data costs ${usd(
                        day7.medUnlPerDay
                      )} a day for 7 days and ${usd(day30.medUnlPerDay)} a day for 30.`}
                    </td>
                  </tr>
                  {dayLines.map((l) => (
                    <tr key={l.label}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{l.label}</td>
                      <td className={styles.tdNetwork}>{l.plans}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>
                        {usd(l.low?.priceUsd)}
                        {l.low && <span className={tools.tdNote}>{`${l.low.provider} ${l.low.plan}`}</span>}
                      </td>
                      <td className={styles.tdPrice}>{usd(l.medPrice)}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>
                        {usd(l.lowUnl?.priceUsd)}
                        {l.lowUnl && <span className={tools.tdNote}>{`${l.lowUnl.provider} ${l.lowUnl.plan}`}</span>}
                      </td>
                      <td className={styles.tdPrice}>{usd(l.medUnlPerDay)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {sum.lastChecked}. Plans sold for exactly that many days; few providers sell a 14-day plan, so that
            row also takes the 15-day plans. Each provider&apos;s official page is linked in the table above and on every row
            of the full table below.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Monthly</span>
          <h2 className={styles.sectionTitle}>Is a monthly eSIM cheaper for Japan?</h2>
          <p className={styles.bodyText}>
            Per day, yes; in total, only if you stay long enough to use it. A 30-day unlimited plan costs{" "}
            {usd(day30.medUnl)} at the median ({usd(day30.medUnlPerDay)} a day) against {usd(day7.medUnl)} for 7 days (
            {usd(day7.medUnlPerDay)} a day), so for a one- or two-week trip the plan that matches your dates costs less. The
            30-day plans here are data-only travel plans; for a contract with a Japanese number for a longer stay, see the{" "}
            <Link href="/guides/esim/japan-sim-card-long-term-stay" className={tools.inlineLink}>long-term stay SIM guide</Link>.
            Which unlimited plans slow down after a daily allowance is in the{" "}
            <Link href="/guides/esim/japan-esim-unlimited" className={tools.inlineLink}>Japan eSIM unlimited data</Link> comparison.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Alternatives</span>
          <h2 className={styles.sectionTitle}>Is an eSIM cheaper than a pocket WiFi or airport SIM in Japan?</h2>
          <p className={styles.bodyText}>
            For one or two people, yes. Sakura Mobile&apos;s unlimited pocket WiFi is {yenUsd(WIFI_7)} for 7 days per
            router, against {usd(day7.medUnl)} per person for a median 7-day unlimited eSIM; split three ways, the router
            costs less per head. At the airport, Sakura Mobile&apos;s Travel SIM card is ¥3,850 against ¥1,375 for its
            Travel eSIM, tax included (
            <a href="https://www.sakuramobile.jp/travel/wifi/" target="_blank" rel="nofollow noopener noreferrer" className={tools.inlineLink}>
              pocket WiFi
            </a>
            ,{" "}
            <a href="https://www.sakuramobile.jp/travel/sim/" target="_blank" rel="nofollow noopener noreferrer" className={tools.inlineLink}>
              SIM
            </a>{" "}
            and{" "}
            <a href="https://www.sakuramobile.jp/travel/esim/" target="_blank" rel="nofollow noopener noreferrer" className={tools.inlineLink}>
              eSIM
            </a>{" "}
            pages, checked {SAKURA_CHECKED}). Rental prices per day from other companies are in{" "}
            <Link href="/guides/esim/best-pocket-wifi-japan" className={tools.inlineLink}>pocket WiFi Japan</Link>, and the
            counters and vending machines at Narita, Haneda and Kansai in{" "}
            <Link href="/guides/esim/japan-airport-sim-cards" className={tools.inlineLink}>SIM card at the airport</Link>.
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
            meaning. To decide which one to buy rather than follow the price, the{" "}
            <Link href="/guides/esim/best-esim-japan" className={tools.inlineLink}>best eSIM for Japan</Link> comparison
            puts the network, phone number and tethering next to the 7-day and 15-day prices. Buying one for the first time? The
            4 steps from purchase to switching it on are in{" "}
            <Link href="/guides/esim" className={tools.inlineLink}>how to get an eSIM for Japan</Link>.
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
            A blank cell means the provider does not publish that fact on the page checked — it is left blank rather than
            guessed. Network, tethering and phone-number facts for Airalo, Holafly, eSIM Go, Sakura Mobile and Simbye were read
            on {d(data.tracker.autoFacts.airalo.factsCheckedOn)} ({d(data.tracker.autoFacts.simbye.factsCheckedOn)} for Simbye);
            their prices are re-read every day. The{" "}
            <Link href="/guides/esim/airalo-japan-review" className={tools.inlineLink}>
              Airalo Japan eSIM
            </Link>{" "}
            review puts Airalo&apos;s plans beside Klook eSIM, Simbye and Sakura Mobile for the same days and data, with the
            networks Airalo&apos;s Japan page lists.
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
            fair-use limits, the <Link href="/guides/esim/japan-esim-unlimited" className={tools.inlineLink}>Japan eSIM unlimited data</Link> comparison.
            To check forum advice against these prices, see the{" "}
            <Link href="/guides/esim/best-esim-japan-reddit" className={tools.inlineLink}>best eSIM for Japan reddit</Link> page.
            Weighing these prices against a{" "}
            <Link href="/guides/esim/japan-airport-sim-cards" className={tools.inlineLink}>SIM card at the airport</Link>{" "}
            in Narita, Haneda or Kansai? That guide has each terminal&apos;s counters, vending machines and hours.
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
