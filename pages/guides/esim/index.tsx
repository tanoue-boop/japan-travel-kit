import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";
import BookingEsimCard from "../../../components/BookingEsimCard";
import EsimPageAnswer from "../../../components/EsimPageAnswer";
import GuideHub from "../../../components/GuideHub";
import KlookLink from "../../../components/KlookLink";
import PartnerPick, { PartnerTextLink } from "../../../components/PartnerPick";
import {
  cheapestAtLeastGb,
  cheapestUnlimited,
  findPlansForTrip,
  formatUsd,
  getProvider,
  latestCheckedAt,
  plansFor,
  pricesCheckedLabel,
  siteCheapest,
  type EsimPlan,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { esimArticles, esimCategory } from "../../../lib/guides-esim";
import { klookEsim } from "../../../lib/klook-links";
import { articleDates, pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { SIMBYE_DISCOUNT_CODE, SIMBYE_DISCOUNT_PERCENT, SIMBYE_JAPAN_DISCOUNT_URL } from "../../../lib/simbye";
import { articleJsonLd, hubItemListJsonLd } from "../../../lib/structured-data";
import styles from "../../../styles/BestEsimJapan.module.css";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/esim"), dates: articleDates(esimArticles.map((a) => a.href)) },
});

const ROUTE = "/guides/esim";
// Title and H1 share the same word order (title ≤ 60 characters, no site-name suffix).
const TITLE = "Japan eSIM Guide 2026: How to Get an eSIM in Japan & Compare";
const H1 = "Japan eSIM Guide 2026: How to Get an eSIM in Japan & Japan eSIM Comparison";

/**
 * Facts read on the official pages on this date (15 Nov 2026): Sakura Mobile's travel eSIM
 * and pickup pages, Kansai Airport's Wi-Fi rental / SIM page, Holafly's and Simbye's Japan
 * eSIM pages (phone number terms). Airalo's and eSIM Go's data-only terms are the ones
 * best-esim-japan read on SPECS_CHECKED_OTHERS.
 */
const FACTS_CHECKED = "2026-11-15";
const SPECS_CHECKED_OTHERS = "2026-10-29";

const sakura = getProvider("sakura");
const pricesChecked = pricesCheckedLabel();
const pricesCheckedIso = (latestCheckedAt() ?? "").slice(0, 10);

const label = (p: EsimPlan | null) => (p ? `${formatUsd(p.priceUsd)} (${p.name})` : "—");
const tripPlan = (days: number, gb: number) => findPlansForTrip(days, gb)[0] ?? null;
const providerPlan = (p: (EsimPlan & { provider?: string }) | null) =>
  p ? `${formatUsd(p.priceUsd)} (${p.provider ? `${p.provider} ` : ""}${p.name})` : "—";

const WEEK = tripPlan(7, 5);
const TWO_WEEKS = tripPlan(14, 10);
const MONTH = tripPlan(30, 20);
const CHEAPEST = siteCheapest();
const S10 = cheapestAtLeastGb("simbye", 10);
const S_UNL = cheapestUnlimited("simbye", 7);
const S_LONG = cheapestAtLeastGb("simbye", 50);

// Meta description: the answer plus where the buttons are. 120–155 characters.
const DESC = `How to get an eSIM in Japan: buy before you fly, scan the QR code, switch it on when you land. Japan eSIM comparison from ${
  CHEAPEST ? formatUsd(CHEAPEST.priceUsd) : "a few dollars"
}, by trip type.`;

// ---------------------------------------------------------------------------
// Buttons: existing affiliate constants only (Simbye 25%, Klook eSIM 20%, Sakura Mobile).
// ---------------------------------------------------------------------------
type Cta = "simbye" | "klook" | "sakura";

function CtaLink({ cta }: { cta: Cta }) {
  if (cta === "klook") {
    return (
      <KlookLink href={klookEsim.url} className={styles.tdLink} target="_blank" rel="sponsored nofollow noopener">
        {klookEsim.ctaLabel}
      </KlookLink>
    );
  }
  if (cta === "sakura") {
    return (
      <a href={sakura.affiliateUrl} className={styles.tdLink} target="_blank" rel="sponsored nofollow noopener">
        Get Sakura Mobile →
      </a>
    );
  }
  return (
    <a href={SIMBYE_JAPAN_DISCOUNT_URL} className={styles.tdLink} target="_blank" rel="sponsored nofollow noopener">
      Get Simbye eSIM →
    </a>
  );
}

const inline = { color: "var(--text)", fontWeight: 600 } as const;
const muted = { marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" } as const;

// (1) Pick by use — the first row is the "not sure" answer.
type UseRow = { use: string; pick: string; why: ReactNode; read: ReactNode; cta: Cta };
const useRows: UseRow[] = [
  {
    use: "Not sure? Start here",
    pick: "Simbye",
    why: `${label(S10)}, data on NTT docomo, KDDI/au, SoftBank and Rakuten Mobile; ${SIMBYE_DISCOUNT_CODE} takes ${SIMBYE_DISCOUNT_PERCENT}% off.`,
    read: <Link href="/guides/esim/best-esim-japan" style={inline}>Best eSIM for Japan</Link>,
    cta: "simbye",
  },
  {
    use: "Short sightseeing trip (up to 2 weeks)",
    pick: "Simbye, or Klook eSIM if your tickets are on Klook",
    why: `A week with 5 GB from ${providerPlan(WEEK)}; unlimited for a week from Simbye ${label(S_UNL)}.`,
    read: <Link href="/guides/esim/cheapest-esim-japan" style={inline}>Cheapest eSIM for Japan</Link>,
    cta: "klook",
  },
  {
    use: "Long stay, or you need a Japanese phone number",
    pick: "Sakura Mobile (number); Simbye (data only)",
    why: `Sakura Mobile's Voice + Data eSIM adds a Japanese phone number; its other eSIMs are data only. Data only for months: Simbye ${label(S_LONG)}.`,
    read: <Link href="/guides/esim/sakura-mobile-review" style={inline}>Sakura Mobile review</Link>,
    cta: "sakura",
  },
  {
    use: "Student on a study trip, exchange or language course (up to 3 months)",
    pick: "Simbye (data only); Sakura Mobile if you need a Japanese number",
    why: `A month on campus WiFi fits in 20 GB: Simbye ${label(cheapestAtLeastGb("simbye", 20))}. A whole term: Simbye ${label(S_LONG)}. Staying longer with a residence card moves you to a monthly SIM.`,
    read: <Link href="/guides/esim/japan-esim-students" style={inline}>Japan eSIM for students</Link>,
    cta: "simbye",
  },
  {
    use: "Osaka or landing at Kansai Airport (KIX)",
    pick: "Any eSIM bought before you fly; Sakura Mobile pickup at KIX T1",
    why: "eSIMs run on the national networks, so Osaka needs no special plan. At KIX Terminal 1 (1F), SIM vending machines are open 24 hours and the Sakura Mobile counter (06:00–23:00) hands over pre-ordered SIMs and eSIM QR codes; Terminal 2 has no Sakura counter.",
    read: (
      <>
        <Link href="/guides/transport/osaka-airport-transfer" style={inline}>KIX to Osaka</Link> ·{" "}
        <Link href="/guides/esim/japan-airport-sim-cards" style={inline}>Airport SIM cards</Link>
      </>
    ),
    cta: "simbye",
  },
  {
    use: "Family or group",
    pick: "One eSIM each (Klook keeps the family's bookings in one account) or a shared pocket WiFi",
    why: "Sakura Mobile takes 10% off when you buy 2 or more eSIMs; a pocket WiFi only pays off once several devices share it.",
    read: <Link href="/guides/esim/japan-esim-family-group" style={inline}>eSIM for families and groups</Link>,
    cta: "klook",
  },
];

// (2) Summary of the Japan eSIM comparison: five providers, price band, data, phone number.
type SummaryRow = { id: EsimProviderId; number: string; cta?: Cta };
const summaryRows: SummaryRow[] = [
  { id: "simbye", number: "No — data only", cta: "simbye" },
  { id: "esimgo", number: "No — data only" },
  { id: "airalo", number: "No — data only" },
  { id: "holafly", number: "No — data only" },
  { id: "sakura", number: "Yes — Voice + Data eSIM", cta: "sakura" },
];

function priceBand(id: EsimProviderId): string {
  const plans = plansFor(id);
  if (!plans.length) return "—";
  const prices = plans.map((p) => p.priceUsd);
  return `${formatUsd(Math.min(...prices))}–${formatUsd(Math.max(...prices))}`;
}

function dataRange(id: EsimProviderId): string {
  const plans = plansFor(id);
  const fixed = plans.filter((p) => !p.unlimited && p.gb).map((p) => p.gb as number);
  const hasUnlimited = plans.some((p) => p.unlimited);
  const parts: string[] = [];
  if (fixed.length) parts.push(`${Math.min(...fixed)}–${Math.max(...fixed)} GB`);
  if (hasUnlimited) parts.push("unlimited");
  return parts.join(" or ") || "—";
}

// (3) Airport on arrival vs an eSIM before you fly. First row is the conclusion.
const airportRows: { what: string; airport: string; esim: string }[] = [
  {
    what: "Bottom line",
    airport: "Only if your phone cannot take an eSIM",
    esim: "Easiest: online the moment you land",
  },
  {
    what: "What you get",
    airport: "A physical SIM from a vending machine or counter, or a pocket WiFi rental",
    esim: "An eSIM by email or app, installed from a QR code",
  },
  {
    what: "When you can get it at KIX",
    airport: "Terminal 1 (1F): SIM vending machines 24 hours; counters about 06:00–23:00",
    esim: "Any time before you fly",
  },
  {
    what: "Phone needed",
    airport: "Unlocked, with a SIM slot",
    esim: "Unlocked and eSIM-capable",
  },
  {
    what: "Japanese phone number",
    airport: "Sakura Mobile Voice + Data (pre-order, collect at the counter)",
    esim: "Sakura Mobile Voice + Data eSIM",
  },
];

const faqItems = [
  {
    q: "How do I get an eSIM in Japan?",
    a: `Buy a Japan data eSIM online before you fly, install it from the QR code or the provider's app while you still have Wi-Fi, and switch the line on (and data roaming for it) when you land. On prices checked ${pricesChecked}, a week with 5 GB costs from ${providerPlan(WEEK)} and two weeks with 10 GB from ${providerPlan(TWO_WEEKS)}.`,
  },
  {
    q: "Which Japan eSIM is cheapest in 2026?",
    a: `Simbye has the lowest list prices of the five compared here: ${CHEAPEST ? providerPlan(CHEAPEST) : "—"} is the cheapest plan and 10 GB is ${label(S10)} (prices checked ${pricesChecked}). Code ${SIMBYE_DISCOUNT_CODE} takes another ${SIMBYE_DISCOUNT_PERCENT}% off.`,
  },
  {
    q: "Can I buy an eSIM in Osaka or at the airport?",
    a: `Kansai Airport's own listing names SIM card vending machines (Terminal 1, 1F, two open 24 hours) and rental counters, not eSIM sales. Sakura Mobile's counter in KIX Terminal 1 (Arrival Lobby 1F, 06:00–23:00) hands over SIMs and eSIM QR codes ordered in advance; there is no Sakura counter in Terminal 2. The simplest route is an eSIM bought before you fly, which works in Osaka like anywhere else in Japan. Checked ${FACTS_CHECKED}.`,
  },
  {
    q: "Do I need Sakura Mobile for a phone number?",
    a: `Of the five compared here, only Sakura Mobile sells an eSIM with a Japanese phone number: its Voice + Data eSIM. Its data eSIMs, and Simbye's, Holafly's, Airalo's and eSIM Go's, have no phone number. If you only need messaging and calls through apps, a data eSIM is enough. Checked on sakuramobile.jp ${FACTS_CHECKED}.`,
  },
  {
    q: "Will my phone work with a Japan eSIM?",
    a: "Yes, if it is carrier-unlocked and supports eSIM. Check both before you buy: an eSIM profile cannot be installed on a locked phone or one without eSIM. If yours cannot take an eSIM, buy a physical SIM instead, by post or at the airport.",
  },
];

export default function GuidesEsimPage({ updated, dates }: { updated: PageUpdated; dates: Record<string, string> }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
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
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: hubItemListJsonLd(esimCategory, DESC) }}
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
          dangerouslySetInnerHTML={{ __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated }) }}
        />
      </Head>

      <GuideHub
        category={esimCategory}
        heading={H1}
        heroDesc="How to get an eSIM in Japan, which one to buy for your trip, and every Japan eSIM guide on this site — prices read from each provider daily."
        dates={dates}
        lead={
          <>
            <section className={styles.bodySection} style={{ marginBottom: "2rem" }}>
              <p className={styles.bodyText}>
                To <strong>get an eSIM in Japan</strong>, buy a Japan data eSIM online before you fly, install it from
                the QR code or the provider&apos;s app while you still have Wi-Fi, and switch the line on when you land.
                On prices checked {pricesChecked}, a one-week trip with 5 GB costs from{" "}
                <strong>{providerPlan(WEEK)}</strong>, two weeks with 10 GB from <strong>{providerPlan(TWO_WEEKS)}</strong>{" "}
                and a month with 20 GB from <strong>{providerPlan(MONTH)}</strong>. If you need a Japanese phone number,
                the only eSIM with one in this Japan eSIM comparison is <strong>Sakura Mobile&apos;s Voice + Data eSIM</strong>.
              </p>
              <p className={styles.bodyText} style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
                Prices read off each provider&apos;s own site on {pricesChecked}; Sakura Mobile, Kansai Airport,
                Holafly and Simbye terms read on {FACTS_CHECKED}. Klook prices change by date, so open its listing
                for yours.
              </p>
            </section>
            <BookingEsimCard lead="Get your Japan eSIM before you fly" />
            <p className={styles.bodyText} style={{ fontSize: "0.85rem", margin: "-1rem 0 2.5rem" }}>
              Need a Japanese phone number?{" "}
              <a href={sakura.affiliateUrl} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                Sakura Mobile Voice + Data eSIM →
              </a>{" "}
              <span style={{ color: "var(--text-muted)" }}>(affiliate link)</span>
            </p>
          </>
        }
        picks={
          <>
          <EsimPageAnswer route="/guides/esim" />

          {/* (1) Pick by use */}
          <section className={styles.comparisonSection} style={{ marginTop: "2.5rem" }}>
            <span className={styles.sectionLabel}>Pick by trip</span>
            <h2 className={styles.sectionTitle}>Which Japan eSIM should I get for my trip?</h2>
            <p className={styles.bodyText}>
              Simbye if you are not sure, because it has the lowest list prices compared here; Sakura Mobile if you need
              a Japanese phone number. Each row links to the guide that goes deeper.
            </p>
            <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Your trip</th>
                      <th>Pick</th>
                      <th>Why (prices checked {pricesChecked})</th>
                      <th>Read next</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {useRows.map((row) => (
                      <tr key={row.use}>
                        <td className={styles.tdProvider} style={{ minWidth: "160px" }}>{row.use}</td>
                        <td className={styles.tdBestFor} style={{ minWidth: "170px" }}>{row.pick}</td>
                        <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "260px" }}>{row.why}</td>
                        <td style={{ fontSize: "0.82rem", minWidth: "150px" }}>{row.read}</td>
                        <td><CtaLink cta={row.cta} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className={styles.bodyText} style={muted}>
              Last checked: {pricesCheckedIso} (prices); {FACTS_CHECKED} (Sakura Mobile phone number, 2+ eSIM discount
              and KIX pickup; Kansai Airport SIM machines and counters). Official pages: simbye.com/products/esim-japan ·
              sakuramobile.jp/travel/esim · sakuramobile.jp/travel/pickup-return ·
              kansai-airport.or.jp/en/service/internet/rental-wifi-sim · the Klook listing &ldquo;{klookEsim.listingTitle}&rdquo;.
              Affiliate links.
            </p>
          </section>

          {/* (2) Summary of the comparison — the full one lives on best-esim-japan. */}
          <section className={styles.comparisonSection}>
            <span className={styles.sectionLabel}>Japan eSIM comparison</span>
            <h2 className={styles.sectionTitle}>Which Japan eSIM is cheapest in 2026?</h2>
            <p className={styles.bodyText}>
              Simbye: {CHEAPEST ? providerPlan(CHEAPEST) : "—"} is the cheapest plan of the five below, and its 10 GB
              plan is {label(S10)}. Only Sakura Mobile sells a phone number. Network, tethering and the pick for each
              kind of trip are in the{" "}
              <Link href="/guides/esim/best-esim-japan" style={inline}>Best eSIM for Japan</Link> comparison.
            </p>
            <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>eSIM</th>
                      <th>Price range</th>
                      <th>Data</th>
                      <th>Japanese phone number</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryRows.map((row) => (
                      <tr key={row.id}>
                        <td className={styles.tdProvider} style={{ minWidth: "120px" }}>{getProvider(row.id).name}</td>
                        <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "120px" }}>{priceBand(row.id)}</td>
                        <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "140px" }}>{dataRange(row.id)}</td>
                        <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "160px" }}>{row.number}</td>
                        <td>
                          {row.cta ? (
                            <CtaLink cta={row.cta} />
                          ) : (
                            <Link href="/guides/esim/best-esim-japan" className={styles.tdLink}>Compare →</Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className={styles.bodyText} style={muted}>
              Last checked: {pricesCheckedIso} (prices); phone-number terms {FACTS_CHECKED} (Simbye, Holafly, Sakura
              Mobile) and {SPECS_CHECKED_OTHERS} (Airalo, eSIM Go). Official pages: simbye.com/products/esim-japan ·
              breezesim.com/products/esim-japan · airalo.com/japan-esim · esim.holafly.com/esim-japan ·
              sakuramobile.jp/travel/esim. Klook eSIM is left out because its from-price names no plan; see{" "}
              <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                the Klook listing
              </KlookLink>{" "}
              for your dates. Every plan in price order is in the{" "}
              <Link href="/guides/esim/cheapest-esim-japan" style={inline}>cheapest eSIM for Japan</Link> ranking, and
              day-by-day prices in the{" "}
              <Link href="/guides/esim/japan-esim-price-tracker" style={inline}>Japan eSIM price tracker</Link>.
              Holafly is not a partner of this site; its unlimited terms and the cheaper plans for the same days are in
              the <Link href="/guides/esim/holafly-japan-review" style={inline}>Holafly Japan review</Link>.
            </p>
          </section>

          {/* (3) Airport vs before you fly */}
          <section className={styles.comparisonSection}>
            <span className={styles.sectionLabel}>Osaka &amp; airports</span>
            <h2 className={styles.sectionTitle}>Can I buy an eSIM in Osaka or at the airport?</h2>
            <p className={styles.bodyText}>
              Not over the counter: Kansai Airport&apos;s listing names SIM card vending machines and rental counters, not
              eSIM sales, so buy the eSIM before you fly and it works in Osaka as anywhere else in Japan. Sakura Mobile can
              hand over a pre-ordered SIM or eSIM QR code at its KIX Terminal 1 counter.
            </p>
            <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Buy at the airport on arrival</th>
                      <th>eSIM before you fly</th>
                    </tr>
                  </thead>
                  <tbody>
                    {airportRows.map((row) => (
                      <tr key={row.what}>
                        <td className={styles.tdProvider} style={{ minWidth: "140px" }}>{row.what}</td>
                        <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "220px" }}>{row.airport}</td>
                        <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "200px" }}>{row.esim}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className={styles.bodyText} style={muted}>
              Last checked: {FACTS_CHECKED}. Official pages: kansai-airport.or.jp/en/service/internet/rental-wifi-sim ·
              sakuramobile.jp/travel/pickup-return. Narita and Haneda counters and hours are in the{" "}
              <Link href="/guides/esim/japan-airport-sim-cards" style={inline}>Japan airport SIM cards</Link> guide;
              getting from KIX into the city is in{" "}
              <Link href="/guides/transport/osaka-airport-transfer" style={inline}>Kansai Airport to Osaka</Link>.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "1rem" }}>
              <CtaLink cta="simbye" />
              <CtaLink cta="klook" />
              <CtaLink cta="sakura" />
            </div>
          </section>

          {/* Question sections, each answered in the first sentence */}
          <section className={styles.bodySection}>
            <h2 className={styles.sectionTitle}>How do I get an eSIM in Japan?</h2>
            <p className={styles.bodyText}>{faqItems[0].a}</p>
            <p className={styles.bodyText}>
              Step by step, with the screens for iPhone and Android, is in{" "}
              <Link href="/guides/esim/how-to-set-up-esim-japan" style={inline}>how to set up an eSIM for Japan</Link>.
            </p>
          </section>
          <section className={styles.bodySection}>
            <h2 className={styles.sectionTitle}>Do I need Sakura Mobile for a phone number?</h2>
            <p className={styles.bodyText}>{faqItems[3].a}</p>
          </section>
          <section className={styles.bodySection}>
            <h2 className={styles.sectionTitle}>Will my phone work with a Japan eSIM?</h2>
            <p className={styles.bodyText}>
              {faqItems[4].a} How to check, network by network, is in{" "}
              <Link href="/guides/esim/does-esim-work-in-japan" style={inline}>Does eSIM work in Japan?</Link>; on an
              iPhone, see <Link href="/guides/esim/japan-esim-iphone" style={inline}>eSIM for Japan on iPhone</Link>.
            </p>
          </section>

          <PartnerPick
            label="Booking other things on Klook?"
            heading="One checkout for your eSIM and tickets"
            cta={{ href: klookEsim.url, label: klookEsim.ctaLabel }}
          >
            If you are already booking tickets or transport on Klook, its{" "}
            <PartnerTextLink href={klookEsim.url}>{klookEsim.name}</PartnerTextLink> keeps everything in one account.
            We leave it out of our rankings because its from-price names no plan, so compare it with
            the prices in our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--text)", fontWeight: 600 }}>best eSIM for Japan</Link>{" "}
            comparison (which one to pick for each kind of trip) or every provider&apos;s price per GB in the{" "}
            <Link href="/guides/esim/japan-esim-price-tracker" style={{ color: "var(--text)", fontWeight: 600 }}>Japan eSIM price tracker</Link>{" "}
            before you buy. Then pick by what matters most: the{" "}
            <Link href="/guides/esim/cheapest-esim-japan" style={{ color: "var(--text)", fontWeight: 600 }}>cheapest eSIM for Japan</Link>, an{" "}
            <Link href="/guides/esim/japan-esim-unlimited" style={{ color: "var(--text)", fontWeight: 600 }}>unlimited eSIM</Link>, a{" "}
            pocket WiFi rental for a group (per-day prices in{" "}
            <Link href="/guides/esim/best-pocket-wifi-japan" style={{ color: "var(--text)", fontWeight: 600 }}>pocket WiFi Japan</Link>), or a{" "}
            <Link href="/guides/esim/japan-airport-sim-cards" style={{ color: "var(--text)", fontWeight: 600 }}>SIM card at the airport</Link> if your
            phone cannot take an eSIM. Not sure it can?{" "}
            <Link href="/guides/esim/does-esim-work-in-japan" style={{ color: "var(--text)", fontWeight: 600 }}>Does eSIM work in Japan?</Link>{" "}
            lists each carrier&apos;s bands, the phones that take an eSIM and how to check yours is unlocked. On an iPhone, the{" "}
            <Link href="/guides/esim/japan-esim-iphone" style={{ color: "var(--text)", fontWeight: 600 }}>eSIM for Japan on iPhone</Link>{" "}
            guide has Apple&apos;s model list, which plan to buy and the iOS setup screens. On a Samsung or Pixel, the{" "}
            <Link href="/guides/esim/japan-esim-android" style={{ color: "var(--text)", fontWeight: 600 }}>Japan eSIM for Android guide</Link>{" "}
            lists which models take an eSIM (Pixel 3 and Galaxy S20 onward) and the menu to install it from. Staying a month or more, or need a Japanese phone number? Read our{" "}
            <Link href="/guides/esim/sakura-mobile-review" style={{ color: "var(--text)", fontWeight: 600 }}>Sakura Mobile review</Link>.
            Read advice on a forum? The{" "}
            <Link href="/guides/esim/best-esim-japan-reddit" style={{ color: "var(--text)", fontWeight: 600 }}>best eSIM for Japan reddit</Link>{" "}
            page tests common Japan eSIM advice against today&apos;s prices.
          </PartnerPick>

          <section className={styles.faqSection} style={{ marginTop: "3rem" }}>
            <span className={styles.sectionLabel}>FAQ</span>
            <h2 className={styles.sectionTitle}>Japan eSIM FAQ</h2>
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
          </>
        }
      />
    </>
  );
}
