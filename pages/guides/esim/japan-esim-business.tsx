import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import EsimAnswerTable from "../../../components/EsimAnswerTable";
import EsimRelatedCard from "../../../components/EsimRelatedCard";
import {
  cheapestAtLeastGb,
  formatUsd,
  getProvider,
  plansFor,
  priceFrom,
  pricesCheckedLabel,
  unlimitedFromLabel,
  type EsimPlan,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { esimLink, esimSpecs, SPECS_CHECKED_AT } from "../../../lib/esim-specs";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

// Written 28 Oct 2026 for the "japan esim business" searches, which had no page of their
// own: the existing guides price a tourist week, and a business trip turns on two
// clauses a tourist never reads — the hotspot allowance and whether a Japanese number
// comes with it.
//
// Two sources, two dates. USD prices come from data/esim-prices.json, refreshed daily
// from each provider's own site (`pricesCheckedAt`). The tethering and phone-number
// clauses come from lib/esim-specs.ts, read off the providers' own pages and help
// centres on SPECS_CHECKED_AT. The data estimates below are planning figures, labelled
// as such; nothing here is a measurement of ours.
const pricesCheckedAt = pricesCheckedLabel();

const dataLabel = (p: EsimPlan | null) => (p ? (p.unlimited ? "Unlimited" : `${p.gb} GB`) : "—");
const priceLabel = (p: EsimPlan | null) => (p ? formatUsd(p.priceUsd) : "—");

const WORK_WEEK = cheapestAtLeastGb("esimgo", 10);
const WORK_MONTH = cheapestAtLeastGb("esimgo", 20);

/** The cheapest plan a provider sells that covers a working week: 7 days, 10 GB or more. */
const workWeekPlan = (id: EsimProviderId): EsimPlan | null =>
  plansFor(id).find((p) => p.days >= 7 && (p.unlimited || (p.gb ?? 0) >= 10)) ?? null;

const TITLE = "Best eSIM for Japan Business Travel 2026: Tether a Laptop";
const DESCRIPTION =
  `For business travel the tethering terms decide it: eSIM Go states tethering on every Japan ` +
  `plan, ${WORK_MONTH?.name} ${priceLabel(WORK_MONTH)}; Holafly caps hotspot at 1 GB/day.`;

const dataEstimates = [
  { activity: "Email, calendar, messaging", perDay: "~200 MB" },
  { activity: "Video calls (1 hour)", perDay: "~1 GB" },
  { activity: "Cloud documents and file sync", perDay: "~500 MB" },
  { activity: "Maps, trains, ride-hailing", perDay: "~100 MB" },
  { activity: "Laptop tethered for a working day", perDay: "~2–3 GB" },
  { activity: "Total for a working day with a laptop", perDay: "~3–4 GB" },
];

const faqItems = [
  {
    q: "Which eSIM is best for business travel in Japan?",
    a: `eSIM Go, on the one spec business travel turns on: tethering is stated on every one of its Japan plans at no extra cost and with no separate hotspot allowance, so a tethered laptop draws on the same pool as the phone. A working week is ${priceLabel(WORK_WEEK)} for ${WORK_WEEK?.name} and a month ${priceLabel(WORK_MONTH)} for ${WORK_MONTH?.name}. Airalo from ${priceFrom("airalo")} is the alternative if 24/7 live chat matters more than price. Prices checked ${pricesCheckedAt}; tethering clauses ${SPECS_CHECKED_AT}.`,
  },
  {
    q: "Can I tether a laptop to a Japan eSIM?",
    a: `Yes on all four providers, but the terms differ and this is the fine print to read rather than the headline price. eSIM Go states tethering on every Japan plan at no extra cost. Holafly allows 1 GB of shareable data per day, which is the one to avoid if the laptop is the point. Sakura Mobile sets a hotspot allowance by plan length — 2 GB on 1–3 day plans up to 30 GB on a month. Airalo's help centre says the personal hotspot works where your device and the network allow it. Clauses read ${SPECS_CHECKED_AT}.`,
  },
  {
    q: "How much data does a business trip to Japan need?",
    a: `Budget 3–4 GB a day if you are tethering a laptop and taking video calls, against roughly 1 GB a day for tourist use — those are planning estimates, not measurements. That puts a five-day trip at 15–20 GB, so the plan to buy is ${WORK_MONTH?.name} at ${priceLabel(WORK_MONTH)} rather than a 5 GB tourist plan. An unlimited week is ${unlimitedFromLabel("esimgo", 7)} on eSIM Go if the schedule is unpredictable.`,
  },
  {
    q: "Can I get a Japanese phone number for business calls?",
    a: "Not from a travel eSIM — every Japan travel eSIM from these four providers is data only, with no voice and no SMS. Sakura Mobile's separate Voice + Data eSIM adds a Japanese number and domestic calls, and it is the only route among the four. It matters more than people expect on a business trip: restaurant reservations, a courier, a taxi dispatcher and a hotel front desk all want a domestic number to call back on.",
  },
  {
    q: "Which network should I pick for a regional business trip?",
    a: `docomo, if the itinerary leaves Tokyo, Osaka and Nagoya. It has the broadest reach of the three national carriers outside the cities, and eSIM Go runs on ${getProvider("esimgo").network} — unusual for the cheapest provider, since the budget option is normally the one on the narrowest footprint. Airalo and Holafly both sit on ${getProvider("airalo").network}, which is strong in the cities and along the main corridors.`,
  },
  {
    q: "Is it worth buying unlimited for a business trip?",
    a: `Only if the alternative is running out mid-meeting. An unlimited week is ${unlimitedFromLabel("esimgo", 7)} on eSIM Go and ${unlimitedFromLabel("holafly", 7)} on Holafly, against ${priceLabel(WORK_MONTH)} for ${WORK_MONTH?.name} with 30 days' validity. The allowance plan is better value on the numbers — but note that none of the unlimited tiers is unmetered: eSIM Go's drops speed after a daily allowance, Airalo applies a fair-use policy, and Holafly's hotspot cap applies regardless.`,
  },
  {
    q: "I travel to Japan several times a year — should I buy per trip?",
    a: `Yes, per trip, because validity is counted in days from activation rather than held as a balance. The exception worth knowing is plan length: eSIM Go's ${WORK_MONTH?.name} plan at ${priceLabel(WORK_MONTH)} stays valid for 30 days, so two short trips inside a month can share one purchase if they fall inside that window. Install the profile once and it stays in the phone between trips; only the plan expires.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/japan-esim-business") } });

export default function JapanEsimBusinessPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-business" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-business" />
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
              route: "/guides/esim/japan-esim-business",
              headline: "Best eSIM for Japan for Business Travel (2026)",
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://www.japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "eSIM for Business Travel", item: "https://www.japan-travel-kit.com/guides/esim/japan-esim-business" },
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
          <span className={styles.breadCurrent}>eSIM for Business Travel</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Best eSIM for Japan for Business Travel (2026)
          </h1>
          <p className={styles.heroSubtitle}>
            Priced for a tethered laptop and a week of video calls, not a tourist&apos;s maps —
            and the only route to a Japanese phone number.
          </p>
          <div className={styles.heroBadges}>
            {[
              `Updated ${updated.label}`,
              `${WORK_MONTH?.name} for ${priceLabel(WORK_MONTH)}`,
              "Tethering terms compared",
            ].map((t) => (
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
            This doesn&apos;t affect our recommendations.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer — the whole answer, first */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              <strong>
                Buy eSIM Go&apos;s {dataLabel(WORK_MONTH)} / 30-day plan at{" "}
                {priceLabel(WORK_MONTH)} — tethering is stated on every one of its Japan plans at
                no extra cost, and {dataLabel(WORK_MONTH)} covers a working week with a laptop.
              </strong>{" "}
              A business trip is not a tourist week scaled up; it turns on two clauses a tourist
              never reads. <strong>The hotspot allowance</strong>: budget 3–4 GB a day with a
              tethered laptop and video calls rather than the tourist&apos;s 1 GB, and note that
              Holafly caps shareable data at 1 GB a day while Sakura Mobile sets a hotspot
              allowance by plan length — eSIM Go is the only one of the four with neither limit.
              <strong> A Japanese phone number</strong>: no travel eSIM carries one, and
              restaurant reservations, couriers, taxi dispatchers and hotel desks all want a
              domestic number, so Sakura Mobile&apos;s Voice + Data eSIM is the only product here
              that answers it. If you would rather have 24/7 live chat than the lowest price,
              Airalo from {priceFrom("airalo")} is the alternative. Prices checked{" "}
              {pricesCheckedAt}; tethering and phone-number clauses {SPECS_CHECKED_AT}.
            </p>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best for a tethered laptop</p>
                <p className={styles.verdictStatValue}>eSIM Go — {priceLabel(WORK_MONTH)}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Need a Japanese number</p>
                <p className={styles.verdictStatValue}>Sakura Mobile Voice + Data</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Budget per working day</p>
                <p className={styles.verdictStatValue}>3–4 GB with a laptop</p>
              </div>
            </div>
          </div>
        </div>

        {/* The table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>Which Plan Covers a Working Week?</h2>
          <p className={styles.bodyText}>
            One row per provider: the cheapest plan each sells that covers seven days with 10 GB or
            more — the size a working week needs rather than a sightseeing one. The two right-hand
            columns are the ones that decide a business trip.
          </p>
          <EsimAnswerTable
            pick={workWeekPlan}
            note="The cheapest plan each provider sells with at least 7 days' validity and 10 GB or more; Holafly sells unlimited only."
          />
          <div className={styles.pickCtaRow} style={{ marginTop: "1.2rem" }}>
            <a href={esimLink("esimgo")} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Get eSIM Go — {priceLabel(WORK_MONTH)} / {dataLabel(WORK_MONTH)} →
            </a>
            <a href={esimLink("sakura")} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Get Sakura Mobile — Japanese number →
            </a>
          </div>
        </section>

        {/* Tethering detail */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The fine print</span>
          <h2 className={styles.sectionTitle}>What Does Each Provider Say About Tethering?</h2>
          <p className={styles.bodyText}>
            Every provider answers &ldquo;can I tether?&rdquo; with yes. What separates them is the
            sentence after the yes, which is where a tethered laptop either works for a week or
            stops on day two.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Provider", "Tethering / hotspot", "Japanese phone number", "Unlimited available"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {esimSpecs.map((spec) => (
                    <tr key={spec.id}>
                      <td className={styles.tdProvider}>{spec.label}</td>
                      <td style={{ fontSize: "0.85rem" }}>{spec.tethering}</td>
                      <td style={{ fontSize: "0.85rem" }}>{spec.phoneNumber}</td>
                      <td style={{ fontSize: "0.85rem" }}>{spec.dataRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Each clause is what the named provider publishes on its own pages and help centre,
            read on {SPECS_CHECKED_AT}. Nothing here is a measurement of ours.
          </p>
        </section>

        {/* Data estimates */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Sizing the plan</span>
          <h2 className={styles.sectionTitle}>How Much Data Does a Working Day Need?</h2>
          <p className={styles.bodyText}>
            Planning estimates rather than measurements — the figures we use to size a plan. The
            line that matters is the last one: a tethered laptop roughly triples a tourist day,
            which is why a 5 GB trip plan is the wrong purchase for a business week.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Activity", "Estimated data per day"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataEstimates.map((row) => (
                    <tr key={row.activity}>
                      <td className={styles.tdProvider}>{row.activity}</td>
                      <td style={{ fontWeight: 700, color: "var(--accent)" }}>{row.perDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Five working days at 3–4 GB is 15–20 GB, so {WORK_MONTH?.name} at{" "}
            {priceLabel(WORK_MONTH)} is the plan with headroom; {WORK_WEEK?.name} at{" "}
            {priceLabel(WORK_WEEK)} is enough if the laptop stays on hotel Wi-Fi. If the schedule
            is unpredictable, an unlimited week is {unlimitedFromLabel("esimgo", 7)} on eSIM Go —
            but none of the unlimited tiers is genuinely unmetered, so buy it to stop watching a
            counter rather than to get more data.
          </p>
        </section>

        {/* Phone number */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Phone number</span>
          <h2 className={styles.sectionTitle}>Do You Need a Japanese Phone Number?</h2>
          <p className={styles.bodyText}>
            More often on business than on holiday. A restaurant taking a reservation for a client
            dinner, a courier delivering to a hotel, a taxi dispatcher and a hotel front desk all
            want a domestic number to call back on, and a foreign one is frequently refused on the
            form rather than merely inconvenient.
          </p>
          <p className={styles.bodyText}>
            No travel eSIM provides one. Every Japan plan from these four providers is data only,
            with no voice and no SMS, at any price. The single exception is Sakura Mobile&apos;s
            separate Voice + Data eSIM, which adds a Japanese number and domestic calls — the
            reason it appears on this page at all, given it is the dearest per GB of the four.
            Plans, networks and yen prices are broken down in our{" "}
            <Link href="/guides/esim/sakura-mobile-review" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Sakura Mobile review
            </Link>
            .
          </p>
          <a
            href={esimLink("sakura")}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            See Sakura Mobile&apos;s Voice + Data plans →
          </a>
        </section>

        {/* Network */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Coverage</span>
          <h2 className={styles.sectionTitle}>Which Network for a Regional Trip?</h2>
          <p className={styles.bodyText}>
            For Tokyo, Osaka and Nagoya it does not matter: all three national carriers are strong
            in the cities and along the Shinkansen corridors. It starts to matter the moment the
            itinerary includes a factory, a supplier or a site visit outside them.
          </p>
          <p className={styles.bodyText}>
            docomo has the broadest reach of the three outside the cities, and eSIM Go runs on{" "}
            {getProvider("esimgo").network} — an unusual combination, because the cheapest
            provider is normally the one on the narrowest footprint. Airalo and Holafly both sit on{" "}
            {getProvider("airalo").network}. Sakura Mobile splits them: {getProvider("sakura").network}.
            Networks as each provider states them; see{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              the full provider comparison
            </Link>{" "}
            for the carrier-by-carrier breakdown.
          </p>
        </section>

        {/* The part an AI answer can't do for you — and the CTA */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Before you buy</span>
          <h2 className={styles.sectionTitle}>Will It Work on Your Phone, and When Should You Buy?</h2>
          <p className={styles.bodyText}>
            On a business trip the device checks are the ones worth doing early, because a work
            handset is the most likely of any phone to fail them — and an IT department is slower
            than a consumer carrier.
          </p>
          <div className={styles.stepsList}>
            {[
              {
                title: "Check the handset for an EID",
                desc: "iPhone: Settings → General → About, scroll to EID. Android: About phone, same row. An EID means eSIM hardware — iPhone XS and later, Pixel 3 and later, Galaxy S20 and later. No EID and the answer is a physical SIM card instead.",
              },
              {
                title: "Check whether the company phone allows it",
                desc: "A corporate handset can be carrier-locked, or under a device-management profile that blocks adding a cellular plan — a restriction no amount of provider support can clear. Ask IT before you buy rather than at the gate. A home-carrier unlock alone typically takes 24–48 hours.",
              },
              {
                title: "Buy late, install at home, switch on when you land",
                desc: "The QR code arrives by email immediately after checkout, so there is no advantage to buying weeks early. Scan it at home where there is Wi-Fi, leave the line switched off so the plan is not spending days, and enable it after landing. The profile stays in the phone between trips — only the plan expires.",
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
              Get eSIM Go — tethering at no extra cost →
            </a>
            <a href={esimLink("airalo")} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Get Airalo — 24/7 live chat →
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
            <EsimRelatedCard href="/guides/esim/japan-sim-card-vs-esim-2026">
              Japan SIM Card vs eSIM (2026): Which Should You Choose?
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-esim-students">
              Best eSIM for Japan for Students (2026): Priced by the Study Month
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-esim-family-group">
              Japan eSIM for Family &amp; Group Travel (2026): Cost Per Head
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-esim-unlimited">
              Best Unlimited eSIM for Japan (2026): Top Picks for Heavy Users
            </EsimRelatedCard>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Compare all Japan eSIM options</h2>
            <p className={styles.ctaBannerDesc}>
              eSIM Go, Airalo, Holafly and Sakura Mobile on price, data, network and support —
              prices checked daily.
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
