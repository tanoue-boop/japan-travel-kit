import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";
import EsimPageAnswer from "../../../components/EsimPageAnswer";
import EsimBrandCompare from "../../../components/EsimBrandCompare";
import KlookLink from "../../../components/KlookLink";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProviderPlanTable from "../../../components/ProviderPlanTable";
import {
  cheapestUnlimited,
  formatUsd,
  getProvider,
  latestCheckedAt,
  plansFor,
  priceFromLabel,
  pricesCheckedLabel,
  type EsimPlan,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { klookEsim } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { SIMBYE_DISCOUNT_CODE, SIMBYE_DISCOUNT_PERCENT, SIMBYE_JAPAN_DISCOUNT_URL } from "../../../lib/simbye";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaTop } from "../../../components/EsimCta";

const ROUTE = "/guides/esim/holafly-japan-review";

/**
 * 2026-11-15 (task-jtk-20261115-R02): this page is the one Holafly page. "Holafly review",
 * "does Holafly work in Japan", "Holafly unlimited" and "Holafly price" all land here;
 * /guides/esim/holafly-vs-esim-go-japan and /guides/esim/does-holafly-work-in-japan 301 here
 * (lib/redirects.js). airalo-vs-holafly-japan keeps only the "Airalo vs Holafly" comparison.
 *
 * Holafly runs no affiliate programme this site can join (impact: Airalo only, checked
 * 9 Oct 2026; Holafly not pursued, 23 Oct 2026). Holafly is described from its own Japan
 * page and never linked; the buttons are Simbye, Klook eSIM and Sakura Mobile.
 */
const TITLE = "Holafly Japan Review 2026: eSIM Price, Speed & Alternatives";
const H1 = "Holafly Japan Review 2026: Holafly eSIM Japan Unlimited Price, Speed & Alternatives";

/** Holafly's Japan page (esim.holafly.com/esim-japan/), Simbye's and Sakura Mobile's Japan pages, read on this date. */
const FACTS_CHECKED = "2026-11-15";
const FACTS_CHECKED_LABEL = "15 Nov 2026";
const HOLAFLY_OFFICIAL = "esim.holafly.com/esim-japan";

const pricesCheckedAt = pricesCheckedLabel();
const pricesCheckedIso = (latestCheckedAt() ?? "").slice(0, 10);
const usd = (p: EsimPlan | null | undefined) => (p ? formatUsd(p.priceUsd) : "—");

/** The unlimited plan of exactly `days` days, or null. */
const unlimitedFor = (id: EsimProviderId, days: number) =>
  plansFor(id).find((p) => p.unlimited && p.days === days) ?? null;

const holaflyPlans = plansFor("holafly");
const H_MIN = holaflyPlans[0] ?? null;
const H_MAX = holaflyPlans[holaflyPlans.length - 1] ?? null;
const H7 = unlimitedFor("holafly", 7);
const H15 = unlimitedFor("holafly", 15);
const H30 = unlimitedFor("holafly", 30);
const S7 = unlimitedFor("simbye", 7);
const S15 = unlimitedFor("simbye", 15);
const K7 = unlimitedFor("sakura", 7);
const K15 = unlimitedFor("sakura", 15);
const S_CHEAPEST_UNL = cheapestUnlimited("simbye", 7);
const sakura = getProvider("sakura");

const withCode = (p: EsimPlan | null) =>
  p?.discountedUsd ? ` (${formatUsd(p.discountedUsd)} with code ${SIMBYE_DISCOUNT_CODE})` : "";

// Meta description: answer + where the buttons are. 120–155 characters.
const DESC = `Holafly Japan review: the Holafly eSIM is unlimited on KDDI/SoftBank, ${usd(H7)} for 7 days, hotspot 1 GB/day, no number. Cheaper alternatives below.`;

const inline = { color: "var(--accent)", fontWeight: 600 } as const;
const muted = { marginTop: "0.9rem", fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6 } as const;

// ---------------------------------------------------------------------------
// Buttons: existing affiliate constants only. Holafly gets no link.
// ---------------------------------------------------------------------------
type Cta = "simbye" | "klook" | "sakura" | "none";

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
  if (cta === "simbye") {
    return (
      <a href={SIMBYE_JAPAN_DISCOUNT_URL} className={styles.tdLink} target="_blank" rel="sponsored nofollow noopener">
        Get Simbye eSIM →
      </a>
    );
  }
  return <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Not a partner — no link</span>;
}

// (1) Holafly Japan eSIM at a glance. The first row is the conclusion.
const glanceRows: { item: string; value: ReactNode }[] = [
  {
    item: "Bottom line",
    value: `Works in Japan with unlimited data on the phone; it costs more per day than Simbye's unlimited plan, and the hotspot is capped at 1 GB a day.`,
  },
  { item: "Price range (USD)", value: `${usd(H_MIN)} (${H_MIN?.days ?? "—"} days) to ${usd(H_MAX)} (${H_MAX?.days ?? "—"} days)` },
  { item: "7 days / 15 days", value: `${usd(H7)} / ${usd(H15)}` },
  { item: "Data", value: "Unlimited only — Holafly sells no fixed-GB Japan plan" },
  { item: "Networks", value: `${getProvider("holafly").network}; 5G where available, otherwise 4G/LTE` },
  {
    item: "Speed policy",
    value: "No daily full-speed threshold published; a Fair Usage Policy can reduce speed for no more than one day, then it resets",
  },
  { item: "Hotspot / tethering", value: "Yes, 1 GB of shareable data per day" },
  { item: "Phone number", value: "No — data only, no local number for calls or SMS" },
  { item: "Plan starts", value: "When you arrive and turn the eSIM on" },
];

// (2) Holafly vs the alternatives, same 7 and 15 days of unlimited. First row = "not sure".
type AltRow = {
  name: string;
  d7: ReactNode;
  d15: ReactNode;
  speed: string;
  hotspot: string;
  number: string;
  cta: Cta;
};
const altRows: AltRow[] = [
  {
    name: "Not sure? Simbye",
    d7: `${usd(S7)}${withCode(S7)}`,
    d15: `${usd(S15)}${withCode(S15)}`,
    speed: "2 GB a day at full speed, then unlimited at 1 Mbps",
    hotspot: "Allowed",
    number: "No — data only",
    cta: "simbye",
  },
  {
    name: "Klook eSIM",
    d7: klookEsim.priceUnknownLabel,
    d15: klookEsim.priceUnknownLabel,
    speed: "Unlimited plans: high speed up to 10 GB a day, then 128 kbps",
    hotspot: "Supported",
    number: "No — data only",
    cta: "klook",
  },
  {
    name: "Sakura Mobile (unlimited, au)",
    d7: usd(K7),
    d15: usd(K15),
    speed: "High speed: unlimited (au 5G)",
    hotspot: "Up to 6 GB on 7 days, 15 GB on 15 days",
    number: "No on data eSIMs; a separate Voice + Data eSIM adds one",
    cta: "sakura",
  },
  {
    name: "Holafly",
    d7: usd(H7),
    d15: usd(H15),
    speed: "No daily threshold published; Fair Usage Policy can slow it for up to 1 day",
    hotspot: "1 GB a day",
    number: "No — data only",
    cta: "none",
  },
];

// Question headings: each answered in the first one or two sentences.
const faqItems = [
  {
    q: "What is Holafly's digital SIM card for Japan?",
    a: `It is Holafly's Japan eSIM — a digital SIM you install from a QR code or the Holafly app instead of a plastic card. It gives unlimited data only on ${getProvider("holafly").network} (5G where available), shares 1 GB a day by hotspot, has no Japanese phone number, and costs ${usd(H_MIN)} for ${H_MIN?.days ?? 3} days to ${usd(H_MAX)} for ${H_MAX?.days ?? 30} (Holafly's Japan page, checked ${FACTS_CHECKED}).`,
  },
  {
    q: "Does the Holafly Japan eSIM include a phone number?",
    a: "No. Holafly's Japan page states the eSIM comes with cellular data only and no local number for calls or SMS; calls go through apps such as WhatsApp or LINE. Of the alternatives compared here, only Sakura Mobile's separate Voice + Data eSIM adds a Japanese number.",
  },
  {
    q: "Can I use Holafly for a whole month in Japan?",
    a: `Yes. Holafly's 30-day Japan plan is ${usd(H30)}, still unlimited with 1 GB of hotspot a day (prices checked ${pricesCheckedAt}). Simbye's 30-day unlimited plan is ${usd(unlimitedFor("simbye", 30))}, with 2 GB a day at full speed and then 1 Mbps.`,
  },
  {
    q: "Is Holafly better than Airalo for Japan?",
    a: `Only if you need no daily full-speed threshold on the phone itself. Airalo's 7-day unlimited plan is ${usd(unlimitedFor("airalo", 7))} against ${usd(H7)} on Holafly, and Airalo also sells small fixed-data plans; the head-to-head is in our Airalo vs Holafly Japan comparison.`,
  },
  {
    q: "Is there a cheaper alternative to Holafly for Japan?",
    a: `Yes. For the same 7 days of unlimited, Simbye is ${usd(S7)}${withCode(S7)} against Holafly's ${usd(H7)}, and for 15 days ${usd(S15)} against ${usd(H15)} (prices checked ${pricesCheckedAt}). Klook eSIM's unlimited plans run at high speed up to 10 GB a day; check its price on Klook.`,
  },
];

const setupSteps = [
  {
    title: "Check your phone takes an eSIM and is carrier-unlocked",
    desc: "Holafly, like every eSIM here, needs an eSIM-compatible phone that is not locked to your home carrier.",
  },
  {
    title: "Buy and install before you fly",
    desc: "Holafly installs from the app or an emailed QR code: Settings → Cellular (or Mobile Data) → Add eSIM. Install on Wi-Fi at home.",
  },
  {
    title: "Turn it on when you land",
    desc: "Holafly's Japan page says the plan begins once you arrive and turn the eSIM on, and that data roaming must be enabled on the eSIM line.",
  },
  {
    title: "Keep your home SIM for calls only",
    desc: "Set the eSIM as the data line. Leaving your home SIM's data on can trigger roaming charges from your home carrier.",
  },
];

const commonIssues = [
  { problem: "No signal on arrival", fix: "Check data roaming is on for the eSIM line, then toggle airplane mode off and on to force it onto a network." },
  { problem: "Slow speed for a day", fix: "Holafly says a Fair Usage Policy can reduce speed for no more than one day; it resets the next day." },
  { problem: "Laptop hotspot stops working", fix: "Hotspot sharing is capped at 1 GB a day on Holafly. For a tethered laptop, a plan with a larger hotspot allowance fits better." },
  { problem: "Can't install", fix: "Your phone may be carrier-locked or not eSIM-compatible. Ask your home carrier to unlock it before you travel." },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const th = { textAlign: "left" } as const;

export default function HolaflyJapanReviewPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={`https://www.japan-travel-kit.com${ROUTE}`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={`https://www.japan-travel-kit.com${ROUTE}`} />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
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
            __html: articleJsonLd({ route: ROUTE, headline: H1, description: DESC, updated }),
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
          <span className={styles.breadCurrent}>Holafly Japan Review</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Prices checked {pricesCheckedAt}</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            What Holafly&apos;s unlimited Japan eSIM includes, what it costs by trip length, and the cheaper plans for
            the same days.
          </p>
          <div className={styles.heroBadges}>
            {["Prices checked daily", "Official terms side by side", "Not a Holafly partner"].map((t) => (
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
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links (Simbye, Klook,
            Sakura Mobile, Airalo). This site may earn a commission at no extra cost to you. Holafly is not a partner
            and is not linked.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        <EsimPageAnswer route={ROUTE} />

        <EsimCtaTop />

        {/* (1) At a glance */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>At a glance</span>
          <h2 className={styles.sectionTitle}>Holafly Japan eSIM: price, data, speed and hotspot</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th style={th}>Holafly Japan eSIM</th>
                    <th style={th}>What Holafly&apos;s Japan page says</th>
                  </tr>
                </thead>
                <tbody>
                  {glanceRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={muted}>
            <strong>Last checked: {FACTS_CHECKED}</strong> (terms and prices on Holafly&apos;s Japan page; prices
            re-read daily, latest {pricesCheckedIso}). Official page: {HOLAFLY_OFFICIAL} (not linked — Holafly is not a
            partner of this site).
          </p>
        </section>

        {/* Q1 */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Coverage</span>
          <h2 className={styles.sectionTitle}>Does Holafly work in Japan?</h2>
          <p className={styles.bodyText}>
            Yes. Holafly&apos;s Japan eSIM runs on {getProvider("holafly").network}, on 5G where available and 4G/LTE
            elsewhere, and its page says actual speed depends on location, device and local coverage (checked{" "}
            {FACTS_CHECKED_LABEL}).
          </p>
          <p className={styles.bodyText}>
            KDDI (au) and SoftBank cover the cities and the main tourist routes. Simbye adds NTT docomo and Rakuten
            Mobile to those two, which is the wider choice if your route leaves the main corridors; the networks are
            compared in{" "}
            <Link href="/guides/esim/does-esim-work-in-japan" style={inline}>does an eSIM work in Japan</Link>.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1.2rem" }}>
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

        {/* Q2 */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Unlimited</span>
          <h2 className={styles.sectionTitle}>Is Holafly unlimited really unlimited in Japan?</h2>
          <p className={styles.bodyText}>
            On the phone itself, yes, with two limits: hotspot sharing is capped at 1 GB a day, and Holafly&apos;s
            Japan page says a Fair Usage Policy can reduce speed for no more than one day before it resets (checked{" "}
            {FACTS_CHECKED_LABEL}).
          </p>
          <p className={styles.bodyText}>
            So it suits one phone that streams a lot, not a laptop tethered all day. Simbye&apos;s unlimited plan gives
            2 GB a day at full speed and then 1 Mbps; Sakura Mobile&apos;s au plan lists high speed as unlimited with a
            hotspot allowance by plan length. Every unlimited plan&apos;s threshold is in the{" "}
            <Link href="/guides/esim/japan-esim-unlimited" style={inline}>Japan eSIM unlimited data comparison</Link>.
          </p>
        </section>

        {/* Q3 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How much is Holafly for Japan in 2026?</h2>
          <p className={styles.bodyText}>
            Holafly charges {usd(H_MIN)} for {H_MIN?.days ?? 3} days up to {usd(H_MAX)} for {H_MAX?.days ?? 30} days,
            with {usd(H7)} for a week and {usd(H15)} for 15 days (USD, checked {pricesCheckedAt}). Every plan is
            unlimited, and longer plans cost less per day.
          </p>
          <ProviderPlanTable providerId="holafly" />
        </section>

        {/* Q4 */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Verdict</span>
          <h2 className={styles.sectionTitle}>Is Holafly worth it for Japan?</h2>
          <p className={styles.bodyText}>
            It is worth it if you want no daily full-speed threshold on your phone and will pay more for it: a week is{" "}
            {usd(H7)} on Holafly against {usd(S7)} on Simbye&apos;s unlimited plan. For maps, messaging and social media,
            a fixed-data plan covers most trips for less — see the{" "}
            <Link href="/guides/esim/cheapest-esim-japan" style={inline}>cheapest eSIM for Japan</Link>.
          </p>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>In Holafly&apos;s favour</p>
              <ul className={styles.pickList}>
                <li><span className={styles.proIcon}>+</span>No daily full-speed threshold published for the phone</li>
                <li><span className={styles.proIcon}>+</span>Two networks: {getProvider("holafly").network}</li>
                <li><span className={styles.proIcon}>+</span>Plan starts when you turn it on in Japan</li>
                <li><span className={styles.proIcon}>+</span>24/7 customer support, per its Japan page</li>
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Against it</p>
              <ul className={styles.pickList}>
                <li><span className={styles.conIcon}>−</span>Unlimited only, so no cheap small plan</li>
                <li><span className={styles.conIcon}>−</span>Hotspot capped at 1 GB a day</li>
                <li><span className={styles.conIcon}>−</span>Fair Usage Policy can slow it for up to a day</li>
                <li><span className={styles.conIcon}>−</span>Data only, no Japanese phone number</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Q5 — (2) Alternatives table */}
        <section className={styles.comparisonFeature}>
          <span className={styles.sectionLabel}>Alternatives</span>
          <h2 className={styles.sectionTitle}>What is a cheaper alternative to Holafly in Japan?</h2>
          <p className={styles.bodyText}>
            Simbye: {usd(S7)} for 7 days of unlimited and {usd(S15)} for 15, against {usd(H7)} and {usd(H15)} on Holafly,
            and code {SIMBYE_DISCOUNT_CODE} takes {SIMBYE_DISCOUNT_PERCENT}% off. If your tickets are already on Klook,
            its eSIM keeps everything in one account; if you need a Japanese number or a large hotspot allowance, Sakura
            Mobile.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>eSIM (unlimited)</th>
                    <th>7 days</th>
                    <th>15 days</th>
                    <th>Full speed</th>
                    <th>Hotspot</th>
                    <th>Phone number</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {altRows.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider}>{row.name}</td>
                      <td className={styles.tdPrice}>{row.d7}</td>
                      <td className={styles.tdPrice}>{row.d15}</td>
                      <td>{row.speed}</td>
                      <td>{row.hotspot}</td>
                      <td>{row.number}</td>
                      <td><CtaLink cta={row.cta} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={muted}>
            <strong>Last checked: {FACTS_CHECKED}</strong> (Holafly, Simbye and Sakura Mobile terms on their Japan pages);
            prices in USD, re-read daily, latest {pricesCheckedIso}. Klook eSIM terms from its listing &ldquo;
            {klookEsim.listingTitle}&rdquo;, read {klookEsim.specsCheckedAt}; Klook prices change by plan and date, so
            open the listing for today&apos;s price. Official pages: {HOLAFLY_OFFICIAL} · simbye.com/products/esim-japan ·
            sakuramobile.jp/travel/esim. Affiliate links except Holafly.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Which to pick: Simbye for the lowest unlimited price on four networks; Klook eSIM if the rest of the trip is
            booked there; Sakura Mobile for a phone number (Voice + Data eSIM) or a bigger hotspot. All six providers are
            ranked in the{" "}
            <Link href="/guides/esim/best-esim-japan" style={inline}>best eSIM for Japan</Link> guide.
          </p>
        </section>

        <EsimBrandCompare brand="holafly" />

        {/* Holafly vs Airalo, short — the head-to-head lives on its own page */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>Holafly vs Airalo for Japan</h2>
          <p className={styles.bodyText}>
            Airalo&apos;s 7-day unlimited plan is {usd(unlimitedFor("airalo", 7))} against {usd(H7)} on Holafly, and
            Airalo also sells fixed-data plans from {priceFromLabel("airalo")}. The full head-to-head is in{" "}
            <Link href="/guides/esim/airalo-vs-holafly-japan" style={inline}>Airalo vs Holafly Japan</Link>.
          </p>
          <a href={getProvider("airalo").affiliateUrl} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
            Get Airalo unlimited eSIM →
          </a>
        </section>

        {/* Setup steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup guide</span>
          <h2 className={styles.sectionTitle}>How to set up a Holafly eSIM for Japan</h2>
          <div className={styles.stepsList}>
            {setupSteps.map((step, i) => (
              <div key={step.title} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={muted}>
            Step-by-step screenshots for any eSIM:{" "}
            <Link href="/guides/esim/how-to-set-up-esim-japan" style={inline}>how to set up an eSIM for Japan</Link>.
          </p>
        </section>

        {/* Choose-and-book block */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Before you fly</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              Buy and install the eSIM at home on Wi-Fi, then switch it on when you land. Unlimited for a week starts at{" "}
              {usd(S_CHEAPEST_UNL)} on Simbye{withCode(S_CHEAPEST_UNL)}.
            </p>
            <a href={SIMBYE_JAPAN_DISCOUNT_URL} className={styles.verdictBtn} target="_blank" rel="sponsored nofollow noopener">
              Get Simbye unlimited →
            </a>
            <p style={muted}>
              Or{" "}
              <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" style={inline}>
                {klookEsim.ctaLabel}
              </KlookLink>{" "}
              ·{" "}
              <a href={sakura.affiliateUrl} target="_blank" rel="sponsored nofollow noopener" style={inline}>
                Get Sakura Mobile →
              </a>
              . Affiliate links.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Holafly Japan FAQ</h2>
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
            {[
              { href: "/guides/esim/best-esim-japan", title: "Best eSIM for Japan 2026" },
              { href: "/guides/esim/japan-esim-unlimited", title: "Japan eSIM with unlimited data, compared" },
              { href: "/guides/esim/airalo-vs-holafly-japan", title: "Airalo vs Holafly Japan" },
              { href: "/guides/esim/simbye-japan-review", title: "Simbye Japan review" },
              { href: "/guides/esim/sakura-mobile-review", title: "Sakura Mobile review" },
              { href: "/guides/esim", title: "Japan eSIM guide" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{r.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
